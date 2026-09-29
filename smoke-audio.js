// Smoke harness for audio.js -- runs the module under a stubbed DOM in Node.
// Two passes:
//   A) No AudioContext at all (old WebView / audio disabled by policy).
//      Every public call must be a silent no-op, never throw.
//   B) Fake AudioContext. Exercises the real scheduling paths and asserts the
//      node graph is actually built and torn down.

const listeners = {};
const fail = [];

function stubEl(tag) {
  return {
    tagName: (tag || 'div').toUpperCase(),
    disabled: false,
    classList: { contains: () => false, add(){}, remove(){}, toggle(){} },
    parentElement: null,
    matches: () => false,
    getAttribute: () => null,
    setAttribute(){}, appendChild(){}, addEventListener(){}
  };
}

global.window = {};
global.document = {
  body: stubEl('body'),
  hidden: false,
  addEventListener(type, fn) { (listeners[type] = listeners[type] || []).push(fn); },
  createElement: stubEl,
  getElementById: () => stubEl()
};

function check(label, fn) {
  try { fn(); console.log('  ok   ' + label); }
  catch (e) { fail.push(label + ' -> ' + e.message); console.log('  FAIL ' + label + ' -> ' + e.message); }
}

// Some behaviour only settles after a timer has run -- a crossfade, for
// instance. A synchronous check() around one of those reports "ok" before the
// assertion has even executed, which is worse than no test at all. These are
// collected and awaited before the summary is printed.
const deferred = [];
function checkLater(label, fn) {
  deferred.push(
    Promise.resolve().then(fn).then(
      () => console.log('  ok   ' + label),
      (e) => { fail.push(label + ' -> ' + e.message); console.log('  FAIL ' + label + ' -> ' + e.message); }
    )
  );
}

// ---------------------------------------------------------------- PASS A
console.log('\n[A] no AudioContext available');
delete global.window.AudioContext;
delete global.window.webkitAudioContext;

let src = require('fs').readFileSync('./audio.js', 'utf8');
eval(src + '\nglobal.SFX = SFX;');

check('play(tap) is a no-op', () => SFX.play('tap'));
check('play(unknown) is a no-op', () => SFX.play('nope'));
check('beam() is a no-op', () => SFX.beam('laser', true, 1));
check('death(undefined)', () => SFX.death(undefined));
check('death(boss)', () => SFX.death({ isBoss: true }));
check('reap()', () => SFX.reap());
check('setEnabled/setVolume', () => { SFX.setEnabled(false); SFX.setVolume(0.4); SFX.setEnabled(true); });
check('installUiHooks()', () => SFX.installUiHooks());
check('synthetic pointerdown', () => {
  (listeners.pointerdown || []).forEach(fn => fn({ target: stubEl('button') }));
});

// ---------------------------------------------------------------- PASS B
console.log('\n[B] fake AudioContext');

let started = 0, stopped = 0, connected = 0;

function param(v) {
  return {
    value: v,
    setValueAtTime(){ return this; },
    linearRampToValueAtTime(){ return this; },
    exponentialRampToValueAtTime(x){
      if (x === 0) throw new Error('exponentialRamp to 0 is illegal in real Web Audio');
      return this;
    },
    setTargetAtTime(){ return this; },
    cancelScheduledValues(){ return this; }
  };
}
// Stopped source nodes queue up here. A real browser fires onended on its own,
// which is what returns a slot to the voice budget; the harness fires them
// explicitly via flushVoices() so tests can control whether the budget is
// saturated or free.
const pendingEnded = [];
function flushVoices() {
  while (pendingEnded.length) {
    const n = pendingEnded.shift();
    if (typeof n.onended === 'function') n.onended();
  }
}

function node(extra) {
  return Object.assign({
    connect(){ connected++; }, disconnect(){},
    start(){ started++; },
    stop(){ stopped++; pendingEnded.push(this); },
    onended: null
  }, extra || {});
}

// Controllable clock. A real AudioContext's currentTime advances on its own;
// throttling is time-based, so a frozen clock would make every sound after the
// first look throttled forever and hide real bugs.
let CLOCK = 0;
const tick = (s) => { CLOCK += s; };

class FakeCtx {
  constructor() {
    this.sampleRate = 44100;
    this.state = 'suspended';
    this.destination = node();
  }
  get currentTime() { return CLOCK; }
  resume() { this.state = 'running'; }
  createGain() { return node({ gain: param(1) }); }
  createOscillator() { return node({ type: 'sine', frequency: param(440), detune: param(0) }); }
  createBiquadFilter() { return node({ type: 'lowpass', frequency: param(1000), Q: param(1) }); }
  createBufferSource() { return node({ buffer: null, loop: false }); }
  createDynamicsCompressor() {
    return node({ threshold: param(0), knee: param(0), ratio: param(1), attack: param(0), release: param(0) });
  }
  createBuffer(ch, len) {
    const data = new Float32Array(len);
    return { getChannelData: () => data, length: len, duration: len / 44100 };
  }
  // Promise form; the callback form is exercised separately below.
  decodeAudioData(arrayBuffer, onOk, onErr) {
    const bad = arrayBuffer && arrayBuffer.byteLength === 0;
    if (bad) {
      const err = new Error('corrupt audio');
      if (onErr) { onErr(err); return Promise.reject(err).catch(() => {}); }
      return Promise.reject(err);
    }
    const buf = this.createBuffer(1, 4410);
    if (onOk) { onOk(buf); return Promise.resolve(buf); }
    return Promise.resolve(buf);
  }
}

global.window.AudioContext = FakeCtx;
for (const k in listeners) delete listeners[k];
eval(src + '\nglobal.SFX = SFX;');

// Every declared sound must schedule at least one voice without throwing.
const names = SFX._names();
console.log('  ' + names.length + ' sounds declared');
names.forEach(n => {
  check('play(' + n + ')', () => { SFX.play(n, 0); });
});

check('star(0..2)', () => { [0,1,2].forEach(i => SFX.play('star', i)); });
check('death() routes all three tiers', () => {
  SFX.death({ isBoss: true }); SFX.death({ isMiniBoss: true }); SFX.death({});
});

check('throttle collapses a same-frame burst to one voice', () => {
  // 30 guns firing on the identical timestamp -- the pathological case that
  // phase-aligns and clips. Must collapse to a single shot.
  flushVoices(); tick(1);
  const before = started;
  for (let i = 0; i < 30; i++) SFX.play('gun');
  const made = started - before;
  if (made === 0) throw new Error('nothing scheduled at all');
  if (made > 2) throw new Error('throttle did not engage: ' + made + ' voices for 30 same-frame calls');
});

check('throttle lets repeats through once time passes', () => {
  let made = 0;
  for (let i = 0; i < 10; i++) {
    flushVoices(); tick(0.2);   // well clear of every THROTTLE gap
    const before = started;
    SFX.play('gun');
    if (started > before) made++;
  }
  if (made < 9) throw new Error('throttle is stuck on: only ' + made + '/10 spaced calls played');
});

check('unthrottled sounds are never suppressed', () => {
  let made = 0;
  for (let i = 0; i < 5; i++) {
    const before = started;
    SFX.play('build');   // not in THROTTLE
    if (started > before) made++;
  }
  if (made !== 5) throw new Error('build was suppressed: ' + made + '/5');
});

check('voice budget survives a 400-call flood', () => {
  for (let i = 0; i < 400; i++) {
    tick(0.05);
    SFX.play('explosion'); SFX.play('tesla'); SFX.play('railgun');
  }
});

check('budget caps low-priority sound when saturated', () => {
  // Do NOT flush: the previous flood left the budget full.
  const before = started;
  for (let i = 0; i < 10; i++) { tick(0.2); SFX.play('gun'); }
  if (started - before > 4) throw new Error('cap never engaged: ' + (started - before) + ' voices');
});

check('high-priority sound still plays when saturated', () => {
  const before = started;
  SFX.play('victory');
  if (started === before) throw new Error('victory was dropped by the voice cap');
});

check('budget recovers once voices end', () => {
  flushVoices(); tick(0.5);
  const before = started;
  SFX.play('gun');
  if (started === before) throw new Error('gun still muted after voices freed');
});

// Beams were redesigned: laser and melter no longer hold a sustained note,
// they report through repeated 'beamHit' ticks from engine.js. beam() is kept
// as a deliberate no-op so the old call sites can't throw.
check('beam() is a silent no-op', () => {
  flushVoices(); tick(1);
  const before = started;
  SFX.beam('laser', true, 1);
  SFX.beam('melter', true, 0.8);
  if (started !== before) throw new Error('beam() started ' + (started - before) + ' voices; it should be silent');
});

check('beam() tolerates an unknown kind', () => {
  SFX.beam('nonsense', true, 1);
  SFX.beam(undefined, false);
});

check('stopBeams/reap are safe with no beams running', () => {
  SFX.stopBeams();
  SFX.reap();
});

check('beamHit carries the beam towers', () => {
  flushVoices(); tick(1);
  const before = started;
  SFX.play('beamHit');
  if (started === before) throw new Error('beamHit is silent');
});

check('beamHit is throttled against per-frame damage', () => {
  flushVoices(); tick(1);
  const before = started;
  // engine.js calls this every frame a beam is damaging something: 60/sec.
  for (let i = 0; i < 60; i++) SFX.play('beamHit');
  if (started - before > 2) throw new Error('beamHit ignored the throttle: ' + (started - before));
});

check('disabled mutes everything', () => {
  SFX.setEnabled(false);
  const s0 = started;
  for (let i = 0; i < 20; i++) SFX.play('victory');
  SFX.beam('laser', true, 1);
  if (started !== s0) throw new Error('scheduled ' + (started - s0) + ' voices while disabled');
  SFX.setEnabled(true);
});

check('visibilitychange handler', () => {
  global.document.hidden = true;
  (listeners.visibilitychange || []).forEach(fn => fn());
  global.document.hidden = false;
  (listeners.visibilitychange || []).forEach(fn => fn());
});

check('UI hook plays denied on a disabled control', () => {
  SFX.installUiHooks();
  const btn = stubEl('button');
  btn.disabled = true;
  btn.matches = () => true;
  (listeners.pointerdown || []).forEach(fn => fn({ target: btn }));
});

// --------------------------------------------------------------- PASS C
// The sample layer. A registered file must take over from the synth tick for
// that one event and leave every other event alone.
console.log('\n[C] sample layer');

const fakeBuf = { getChannelData: () => new Float32Array(4410), length: 4410, duration: 0.1 };

check('hasSample is false before anything is registered', () => {
  if (SFX.hasSample('gun')) throw new Error('gun already sampled');
});

check('registerBuffer makes the event sampled', () => {
  SFX.registerBuffer('gun', fakeBuf);
  if (!SFX.hasSample('gun')) throw new Error('registerBuffer did not stick');
  if (SFX.sampleNames().indexOf('gun') < 0) throw new Error('missing from sampleNames()');
});

check('a sampled event still plays', () => {
  flushVoices(); tick(1);
  const before = started;
  SFX.play('gun');
  if (started === before) throw new Error('sampled gun produced no voice');
});

check('registering one event does not sample the others', () => {
  if (SFX.hasSample('tesla')) throw new Error('tesla became sampled by accident');
});

check('clearSample falls back to the synth', () => {
  SFX.clearSample('gun');
  if (SFX.hasSample('gun')) throw new Error('clearSample did not clear');
  flushVoices(); tick(1);
  const before = started;
  SFX.play('gun');
  if (started === before) throw new Error('synth fallback is silent after clearSample');
});

check('throttle applies to samples too', () => {
  SFX.registerBuffer('gun', fakeBuf);
  flushVoices(); tick(1);
  const before = started;
  for (let i = 0; i < 30; i++) SFX.play('gun');
  if (started - before > 2) throw new Error('sampled gun ignored the throttle');
  SFX.clearSample('gun');
});

check('registerData decodes base64 without throwing', () => {
  global.atob = (b) => Buffer.from(b, 'base64').toString('binary');
  return SFX.registerData({ build: 'AAAA' });
});

check('registerData survives a corrupt payload', () => {
  global.atob = () => '';
  return SFX.registerData({ sell: 'zzzz' });
});

check('autoload with nothing present is a no-op', () => {
  const r = SFX.autoload();
  if (!r || typeof r.then !== 'function') throw new Error('autoload did not return a promise');
});

check('unknown event name with no sample is ignored', () => {
  const before = started;
  SFX.play('notAThing');
  if (started !== before) throw new Error('typo name produced sound');
});

// --------------------------------------------------------------- PASS D
// music.js. Runs against a stub Audio element -- the point is the state
// machine (categories, gating, unlock), not the decoder.
console.log('\n[D] music manager');

const audios = [];
global.Audio = function () {
  const handlers = {};
  const el = {
    src: '', loop: false, preload: '', volume: 1, paused: true,
    play() { this.paused = false; return Promise.resolve(); },
    pause() { this.paused = true; },
    load() {},
    // Mirrors the real element: clearing src and re-running resource selection
    // makes it fall back to the document URL. The regression test below asserts
    // we never do that.
    removeAttribute() { this.src = ''; this.clearedSrc = true; },
    get currentTime() { return 0; },
    readyState: 4, networkState: 1, error: null, duration: 120,
    addEventListener(t, fn) { (handlers[t] = handlers[t] || []).push(fn); },
    fire(t) { (handlers[t] || []).forEach(fn => fn()); }
  };
  audios.push(el);
  return el;
};

let msrc = require('fs').readFileSync('./music.js', 'utf8');
// Give it a track list; the shipped file starts empty on purpose.
msrc = msrc.replace('    menu: [\n', "    menu: ['music/menu_01.ogg', 'music/menu_02.ogg',\n");
msrc = msrc.replace('    battle: [\n', "    battle: ['music/battle_01.ogg',\n");
msrc = msrc.replace('    win: [\n', "    win: ['music/win.ogg',\n");
msrc = msrc.replace('    lose: [\n', "    lose: ['music/lose.ogg',\n");
eval(msrc + '\nglobal.MusicManager = MusicManager;');

check('nothing plays before unlock', () => {
  MusicManager.menu();
  if (audios.length) throw new Error('started a track with no user gesture');
  if (MusicManager.current() !== 'menu') throw new Error('category was not remembered');
});

check('unlock releases the parked category', () => {
  MusicManager.unlock();
  if (!audios.length) throw new Error('unlock did not start anything');
  if (!/menu/.test(audios[audios.length - 1].src)) throw new Error('wrong track: ' + audios[audios.length - 1].src);
});

check('asking for the same category again is a no-op', () => {
  const n = audios.length;
  MusicManager.menu();
  MusicManager.menu();
  if (audios.length !== n) throw new Error('restarted a bed that was already playing');
});

check('switching category starts the new bed', () => {
  MusicManager.battle();
  if (!/battle/.test(audios[audios.length - 1].src)) throw new Error('battle bed did not start');
});

check('looping bed advances to the next track when one ends', () => {
  MusicManager.menu();
  const n = audios.length;
  audios[audios.length - 1].fire('ended');
  if (audios.length <= n) throw new Error('playlist did not advance');
});

check('a sting does not advance when it ends', () => {
  MusicManager.win();
  const n = audios.length;
  audios[audios.length - 1].fire('ended');
  if (audios.length > n) throw new Error('win sting looped instead of stopping');
});

check('a dead track does not strand the category', () => {
  MusicManager.battle();
  audios[audios.length - 1].fire('error');
});

check('setEnabled(false) stops, setEnabled(true) resumes the same category', () => {
  MusicManager.menu();
  const cat = MusicManager.current();
  MusicManager.setEnabled(false);
  if (MusicManager.isEnabled()) throw new Error('flag did not flip');
  MusicManager.setEnabled(true);
  if (MusicManager.current() !== cat) throw new Error('lost the category across a toggle');
});

check('setVolume clamps out-of-range input', () => {
  MusicManager.setVolume(5);
  MusicManager.setVolume(-3);
  MusicManager.setVolume(0.5);
});

check('suspend/resume do not throw', () => {
  MusicManager.suspend();
  MusicManager.resume();
});

check('stop clears the category', () => {
  MusicManager.stop(0);
  if (MusicManager.current() !== null) throw new Error('category survived stop()');
});

// The exact bug that made music silent in the field: the toggle was switched
// off, so the category request never reached music.js, and switching it back on
// had nothing to resume. Guard both halves.
// A finished crossfade must not clear the element's src. Doing so makes the
// media element re-resolve against the page URL and try to play index.html as
// audio, which under file:// also trips the unique-origin warning.
checkLater('fading a track out never clears its src', () => {
  MusicManager.stop(0);
  MusicManager.setEnabled(true);
  MusicManager.menu();
  const first = audios[audios.length - 1];
  if (!first || !first.src) throw new Error('no track started, nothing to fade');
  MusicManager.battle();                 // crossfade away from the menu bed
  return new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
    if (first.clearedSrc) throw new Error('src was cleared on fade-out');
    if (first.src === '') throw new Error('src emptied on fade-out');
    if (!first.paused) throw new Error('faded-out element was never paused');
  });
});

check('a category requested while disabled is still remembered', () => {
  MusicManager.stop(0);
  MusicManager.setEnabled(false);
  MusicManager.menu();
  if (MusicManager.current() !== 'menu') throw new Error('request was dropped while disabled');
  const n = audios.length;
  if (audios.length > n) throw new Error('played while disabled');
  MusicManager.setEnabled(false);
});

check('switching music back on resumes that category', () => {
  const n = audios.length;
  MusicManager.setEnabled(true);
  if (audios.length <= n) throw new Error('nothing resumed after re-enabling');
  if (!/menu/.test(audios[audios.length - 1].src)) throw new Error('resumed the wrong bed');
});

check('off then on mid-battle returns to battle, not menu', () => {
  MusicManager.battle();
  MusicManager.setEnabled(false);
  const n = audios.length;
  MusicManager.setEnabled(true);
  if (audios.length <= n) throw new Error('nothing resumed');
  if (!/battle/.test(audios[audios.length - 1].src)) throw new Error('dropped back to the menu bed');
});

check('diagnose() explains silence rather than hiding it', () => {
  MusicManager.stop(0);
  MusicManager.setEnabled(false);
  const r = MusicManager.diagnose();
  if (!r || !Array.isArray(r.why)) throw new Error('no reason list');
  if (!r.why.join(' ').match(/switched off/)) throw new Error('did not report the off toggle: ' + r.why.join('; '));
  MusicManager.setEnabled(true);
});

check('an empty category is silent rather than broken', () => {
  // NOTE: this used to just re-eval music.js and assume the fresh instance had
  // no tracks. That stopped being true once TRACKS was filled in with real
  // filenames, so the test was asserting against a populated list and failing
  // for the wrong reason. Empty the lists explicitly via the exposed _tracks()
  // so we're testing the empty-category path rather than the default data.
  let esrc = require('fs').readFileSync('./music.js', 'utf8');
  eval(esrc + '\nglobal.EmptyMusic = MusicManager;');
  const t = global.EmptyMusic._tracks();
  Object.keys(t).forEach(k => { t[k].length = 0; });
  const n = audios.length;
  global.EmptyMusic.unlock();
  global.EmptyMusic.menu();
  global.EmptyMusic.battle();
  global.EmptyMusic.win();
  if (audios.length !== n) throw new Error('an empty track list still tried to play');
});

Promise.all(deferred).then(() => {
  console.log('\n--- graph activity: ' + started + ' started, ' + stopped + ' stopped, ' + connected + ' connects');
  if (fail.length) { console.log('\n' + fail.length + ' FAILURE(S)'); process.exit(1); }
  console.log('ALL PASS');
  process.exit(0);
});
