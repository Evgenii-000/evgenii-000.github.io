// data.js v1.8 — requirements.md pass (in-match physics, meta gating, early-call):
// - Block 4a: Removed splashResist (swarm) and flatArmor (goliath/titan_core/
//   emp_overlord) entirely from ENEMY_CONFIGS and the two hard-coded boss spawn
//   objects (L40 titan_core, L50 emp_overlord). Tower effectiveness against a
//   given mob now comes purely from geometry/speed/delivery-method interactions
//   (implemented in index.html: Lock-on Delay, Locked Target for Laser/Melter,
//   Melter's heat-reset-on-switch), not flat damage-reduction stats.
// - Block 4b: Swarm's declared spawn `interval` bumped from ~0.28-0.35 to the
//   spec value of 0.15s for documentation accuracy -- NOTE: index.html's swarm
//   expansion already hard-codes individual-unit spacing to 0.045s regardless of
//   this field (see spawnInterval in processSpawnGroup), so this was already
//   denser than spec at runtime; this change only makes the source data honest
//   about intent, it does not change live behavior. Tank intervals below the
//   spec's 1.2-1.4s band (1.147, 1.08) bumped to 1.2; one Goliath interval above
//   the 1.4-1.6s band (1.615) trimmed to 1.6.
// - Block 6: Railgun retuned to hit the spec's damage table exactly: damage
//   85->120, damageMultiplier 1.4->1.5, powerDmg 0.08->0.10, fireRate 1.8->2.2s.
//   Verified against spec: 0-meta Lv1/Lv3 = 120/270, 10-meta Lv1/Lv3 = 240/540 --
//   all four match exactly with this combination. Gatling/Tesla/Mortar/Laser
//   were already exact matches for their damage tables, no changes needed there.
// - Melter reworked for the exponential-ramp mechanic (see index.html): baseDps
//   38->10 to match the spec table's pre-ramp Lv1 baseline; powerRate 0.04->0.05
//   so the ramp-to-peak time at max meta upgrade lands at 4.0/1.5=~2.67s, close
//   to the spec's "~2.6s at max upgrade" callout. NOTE: the spec table's peak-DPS
//   entries (10->588 at 0 meta, 18->1058 at 10 meta) imply a ~58x jump from Lv1
//   to Lv3 that isn't reachable through the shared per-level damageMultiplier
//   system every other tower uses (that system tops out around 2x for 2 levels)
//   without making Melter absurdly front-loaded relative to its build cost --
//   implemented the x40-at-4s ramp curve faithfully (Math.pow(40, t/4)) on top of
//   the standard damageMultiplier scaling instead, which lands Melter's peak DPS
//   in the same order of magnitude as the table (roughly 400-730 depending on
//   level/meta) rather than hitting the exact figures. Flagging this the way the
//   rest of this changelog does: worth a dedicated playtest + follow-up pass if
//   the exact peak numbers matter.
// - Added UPGRADE_STEPS_PER_SECTOR (=2) for the sector-gated meta upgrade cap
//   (Block 3a): index.html now caps each branch's purchasable step at
//   min(10, currentSector * UPGRADE_STEPS_PER_SECTOR).
//
// data.js v1.7 — balance pass: L7-L9 eased (feedback: L8 was borderline unplayable
// unless spamming only level-1 towers; the peak was always wave 2, right when
// cumulative gold is lowest -- this punishes players who like investing gold in
// local tower upgrades rather than spreading thin across cheap towers). Bumped
// startGold (145/150/175 -> 160/175/195) and trimmed baseHpScale (70/80/74 ->
// 66/70/76, also fixing L9 previously being lower than L8 despite coming later).
// New wave-2 peak ratio: L7 0.66, L8 0.63, L9 0.68 (was 0.76/0.81/0.72) -- still a
// real step up in difficulty, just not a wall.
//
// data.js v1.6 — upgrade tree redesign (17 branches -> 9):
// - Each of the 7 towers now has ONE combined "Power" branch (was 2: Damage+Rate)
//   that scales damage, fire rate, AND range together per step, via new
//   powerDmg/powerRate/powerRange fields on TOWER_CONFIGS. This also finally gives
//   offensive towers a permanent range upgrade path (previously only Stasis had a
//   range branch, and even that one was wired up but never actually consumed
//   anywhere in index.html -- see v2.3.4 changelog there).
// - Stasis's Power branch boosts range + slow strength (powerRange/powerSlow)
//   instead of damage, since it deals none.
// - Removed the "skills" tab entirely (skill_slow) -- wasn't part of the agreed
//   upgrade list. Base tab keeps Base HP + Bounty (money from kills only; there
//   was never an actual "starting gold" upgrade in the code, base_gold already
//   only affected kill bounty and the wave-skip gold bonus).
// - Total branches: 7 tower + base_hp + base_gold = 9, all still 10 steps at a
//   flat 1 diamond/step (100 diamonds to max the whole tree, down from 170).
//   Actual diamond income vs this cost still needs a full pass -- flagged, not
//   done yet.
//
// data.js v1.5 — balance pass #2 (difficulty curve, L9-L29):
// - L9/L10 eased: these sat at required/available-DPS ratio ~1.0-1.01 (the edge of
//   failure) right before global upgrades unlock at L11 -- risk of hard-walling new
//   players before they have any progression tool. Reduced baseHpScale/bossHp,
//   small startGold bump. New peak ratio ~0.75-0.77, in line with L5-8.
// - Sector 2 (L11-19) and Sector 3 (L21-29) generator loops previously called
//   createEnemySpawn() without hpMult, so enemy HP never scaled with level within
//   a sector -- only wave-to-wave count and a slow +3 gold/level trickle did
//   anything, so difficulty quietly *fell* as gold outpaced flat HP. Added a
//   sectorHpMult that grows with level in both loops so difficulty actually climbs
//   through the sector (L11-19 ratio ~0.12-0.28 -> ~0.21-0.32; L21-29 ~0.06-0.09 ->
//   ~0.26-0.34, tuned to sit above sector 2 so the curve stays roughly monotonic).
// - Known follow-up, not yet applied: L20 and L30 (the boss levels bookending these
//   two sectors) have the same no-hpMult gap on their non-boss spawns, so they now
//   sit slightly below the regular levels right before them in relative toughness.
//   Worth a matching pass once the above is playtested.
//
// data.js v1.4 — balance pass #1 (scope + tutorial fixes):
// - Scope cut to 50 levels for v1 (TOTAL_LEVELS 60->50, TOTAL_SECTIONS 6->5).
//   Removed the procedural levels 51-60 block (BOSS_CYCLE / LEVEL_MAP_SEQUENCE /
//   generateStandardLevel loop) entirely — dead weight for the first release.
// - startHp normalized to 10 on L1-L3 (was 5) so base HP is a flat 10 by default
//   on every level, matching the rest of the game.
// - Removed the tutorial miniboss spawns on L1 (wave 2) and L2 (wave 3): tutorial
//   levels (1-2) should have no miniboss per design; L3 keeps its miniboss.
//
// data.js v1.3 — fix: restored missing createEnemySpawn() function (deleted during
// map rework — caused a ReferenceError at load time, which silently halted the entire
// script before showStartScreen() ever ran, so nothing rendered at all: no menu
// background, no field, nothing. Also fixed LEVEL_MAP_SEQUENCE for levels 51-60,
// which pointed at L41R-L50R reversed maps that no longer exist in this map set —
// now reuses L41-L50 directly.
// Debug: This file should load before the main game script
if (typeof console !== 'undefined') {
  console.log('[data.js] Loading game data...');
}

const TOTAL_LEVELS = 50;
const LEVELS_PER_SECTION = 10;
const TOTAL_SECTIONS = 5;

const UPGRADE_BRANCH_SPECS = {
  towers: [
    { title: 'Gatling', icon: 'gun', branches: [{ key: 'gun_power', name: 'Power', stepVal: 8, unit: '%', prefix: '+' }] },
    { title: 'Laser', icon: 'laser', branches: [{ key: 'laser_power', name: 'Power', stepVal: 8, unit: '%', prefix: '+' }] },
    { title: 'Mortar', icon: 'mortar', branches: [{ key: 'mortar_power', name: 'Power', stepVal: 8, unit: '%', prefix: '+' }] },
    { title: 'Tesla', icon: 'tesla', branches: [{ key: 'tesla_power', name: 'Power', stepVal: 5, unit: '%', prefix: '+' }] },
    { title: 'Stasis', icon: 'stasis', branches: [{ key: 'stasis_power', name: 'Power', stepVal: 5, unit: '%', prefix: '+' }] },
    { title: 'Melter', icon: 'melter', branches: [{ key: 'melter_power', name: 'Power', stepVal: 5, unit: '%', prefix: '+' }] },
    { title: 'Railgun', icon: 'railgun', branches: [{ key: 'railgun_power', name: 'Power', stepVal: 8, unit: '%', prefix: '+' }] }
  ],
  base: [
    {
      title: 'Base',
      branches: [
        { key: 'base_hp', name: 'Base HP', stepVal: 1, unit: ' HP', prefix: '+' },
        { key: 'base_gold', name: 'Bounty', stepVal: 5, unit: '%', prefix: '+' }
      ]
    }
  ]
};

const upgradeTreeData = {
  gun_power: 0, laser_power: 0, mortar_power: 0, tesla_power: 0,
  stasis_power: 0, melter_power: 0, railgun_power: 0,
  base_hp: 0, base_gold: 0
};

const TOWER_NAMES = {
  gun: 'Gatling',
  laser: 'Laser',
  mortar: 'Mortar',
  tesla: 'Tesla',
  stasis: 'Stasis',
  melter: 'Melter',
  railgun: 'Railgun'
};

// === Tower visual language (Visual Direction "Turn 8") ============================
// ONE geometry spec, rendered two ways: as an SVG string for every 2D UI surface
// (build panel, loadout grid, mini-icons, inspector, upgrades list) via
// buildTowerIconSvg() below, and onto the canvas for the battlefield via
// drawTowerModel() in ui.js. Both read these same numbers, so the field model and
// the menu icon can't drift apart -- that was the explicit ask: all 3 display
// surfaces (field / build-panel icon / loadout mini-icon) must look like the same
// tower.
//
// Shared chrome for every tower (drawn by the renderers, not listed per-tower):
//   - ring r=17 (stroke 1.6) + inner ring r=11 (stroke 1, opacity .35), always
//   - L2 adds a ring at r=22, L3 adds another at r=26 (same brightness as inner)
//   - core dots show the level AND, at L3, the firing direction:
//       L1 -> 1 dot centred; L2 -> 2 dots across the barrel axis;
//       L3 -> 3 dots in a triangle pointing along the barrel
//   - Stasis is the exception: no barrel, no dots. It gets snowflakes instead
//     (1 / 2 / 3 by level, first one largest) because it's the one non-directional
//     tower -- same reason it doesn't rotate on the field.
//
// Barrel ops are authored pointing along +x; the renderers rotate them to the
// turret angle. Fill codes: 'c' = the tower's own colour, 'd' = dark (#0a0e1c).
const TOWER_GLYPH_DARK = '#0a0e1c';

const TOWER_GLYPH_SPECS = {
  gun:     { barrel: [ { t: 'rect', x: 9, y: -5, w: 15, h: 2.6, r: 1.3, f: 'c' },
                       { t: 'rect', x: 9, y: 2.4, w: 15, h: 2.6, r: 1.3, f: 'c' } ] },
  laser:   { barrel: [ { t: 'poly', pts: [9, -5.5, 25, -1.6, 25, 1.6, 9, 5.5], f: 'c' } ] },
  // Mortar fires in an arc, so its barrel is ELEVATED, not swivelled. Seen from
  // directly above, an elevated barrel appears FORESHORTENED along the facing
  // axis -- it gets shorter, not rotated. (The previous `tilt: -22` rotated it
  // within the 2D plane, which just made it look like it was aiming off to one
  // side.) `elevationDeg` drives three things that sell the raise from a top-down
  // camera, applied by both renderers:
  //   - barrel length scaled by cos(elevation): the higher it points, the more
  //     of its length is pointing at the camera and the stubbier it looks
  //   - an elliptical muzzle opening at the tip: we're looking into the bore at
  //     an angle, so the circular opening projects as an ellipse
  //   - a short shadow cast back along the barrel's base
  // It's also the launch angle used for the shell's arc (see engine.js).
  mortar:  { elevationDeg: 55,
             barrel: [ { t: 'rect', x: 9, y: -6, w: 14, h: 12, r: 3, f: 'c' } ],
             muzzle: { atX: 23, rx: 3.0, ry: 5.2 } },
  tesla:   { barrel: [ { t: 'rect', x: 9, y: -7.5, w: 19, h: 15, r: 3, f: 'd', s: 'c', sw: 1.6 },
                       { t: 'bolt', cx: 18.5, rot: 90, scale: 0.62,
                         pts: [2.5, -12, -6.5, 1.5, -0.5, 1.5, -3.5, 12, 7, -2.5, 1, -2.5], f: 'c' } ] },
  stasis:  { barrel: [], flakes: true },
  melter:  { barrel: [ { t: 'pline', pts: [9, -7, 22, 0, 9, 7], sw: 2.6 },
                       { t: 'circle', cx: 24, cy: 0, r: 2.6, f: 'c' } ] },
  railgun: { barrel: [ { t: 'rect', x: 9, y: -2.2, w: 19, h: 4.4, f: 'c', s: 'd', sw: 1 },
                       { t: 'rect', x: 12, y: -6, w: 2.8, h: 12, r: 1, f: 'c', s: 'd', sw: 1 },
                       { t: 'rect', x: 18, y: -6, w: 2.8, h: 12, r: 1, f: 'c', s: 'd', sw: 1 } ] }
};

// Level -> extra ring radii, core-dot layout, and Stasis snowflake layout.
const TOWER_GLYPH_RINGS = { 1: [], 2: [22], 3: [22, 26] };
const TOWER_GLYPH_CORES = {
  1: [{ cx: 0, cy: 0, r: 3.2 }],
  2: [{ cx: 0, cy: -4.2, r: 3 }, { cx: 0, cy: 4.2, r: 3 }],
  3: [{ cx: -3.4, cy: -4.2, r: 3 }, { cx: -3.4, cy: 4.2, r: 3 }, { cx: 4.2, cy: 0, r: 3 }]
};
// Stasis snowflakes stand in for the core dots. NOTE: the Turn 8 header text says
// "first one large, the rest smaller", but the actual mockup draws L3 as three
// EQUAL flakes in the same triangle the other towers use for their L3 dots. The
// mockup wins -- it keeps Stasis consistent with the level language everywhere
// else, and the descending-column version looked like a different mechanic.
const TOWER_GLYPH_FLAKES = {
  1: [{ cx: 0, cy: 0, scale: 1.0, sw: 1.9 }],
  2: [{ cx: 0, cy: -4.5, scale: 0.95, sw: 2.0 }, { cx: 0, cy: 5, scale: 0.95, sw: 2.0 }],
  3: [{ cx: -3.5, cy: -5, scale: 0.85, sw: 2.24 }, { cx: -4, cy: 5.5, scale: 0.85, sw: 2.24 },
      { cx: 5.5, cy: 0.5, scale: 0.85, sw: 2.24 }]
};

// Builds the SVG form of a tower glyph. Used for every non-canvas surface.
// `angleDeg` lets a caller point the barrel somewhere other than "right"; the UI
// always uses the default, the field uses the canvas renderer instead.
function buildTowerIconSvg(type, level = 1, size = 28, angleDeg = 0) {
  const spec = TOWER_GLYPH_SPECS[type];
  const conf = TOWER_CONFIGS[type];
  if (!spec || !conf) return '';
  const c = conf.color;
  const lvl = Math.max(1, Math.min(3, level));
  const fillOf = (f) => (f === 'd' ? TOWER_GLYPH_DARK : c);

  let out = `<svg width="${size}" height="${size}" viewBox="-32 -32 64 64">`;
  out += `<circle cx="0" cy="0" r="17" fill="none" stroke="${c}" stroke-width="1.6"/>`;
  out += `<circle cx="0" cy="0" r="11" fill="none" stroke="${c}" stroke-width="1" opacity=".35"/>`;
  TOWER_GLYPH_RINGS[lvl].forEach(r => {
    out += `<circle cx="0" cy="0" r="${r}" fill="none" stroke="${c}" stroke-width="1.6"/>`;
  });

  const rot = angleDeg ? ` transform="rotate(${angleDeg})"` : '';
  out += `<g${rot}>`;
  // Barrel-only elevation foreshortening (Mortar). Core dots stay unscaled so
  // they still read as a level indicator.
  const fore = spec.elevationDeg ? Math.cos(spec.elevationDeg * Math.PI / 180) : 1;
  if (spec.elevationDeg) out += `<g transform="scale(${fore.toFixed(3)},1)">`;
  spec.barrel.forEach(op => {
    const stroke = op.s ? ` stroke="${fillOf(op.s)}" stroke-width="${op.sw || 1}"` : '';
    if (op.t === 'rect') {
      out += `<rect x="${op.x}" y="${op.y}" width="${op.w}" height="${op.h}"${op.r ? ` rx="${op.r}"` : ''} fill="${fillOf(op.f)}"${stroke}/>`;
    } else if (op.t === 'poly') {
      out += `<polygon points="${op.pts.join(' ')}" fill="${fillOf(op.f)}"${stroke}/>`;
    } else if (op.t === 'circle') {
      out += `<circle cx="${op.cx}" cy="${op.cy}" r="${op.r}" fill="${fillOf(op.f)}"${stroke}/>`;
    } else if (op.t === 'pline') {
      out += `<polyline points="${op.pts.join(' ')}" fill="none" stroke="${c}" stroke-width="${op.sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
    } else if (op.t === 'bolt') {
      out += `<g transform="translate(${op.cx},0) rotate(${op.rot}) scale(${op.scale})"><polygon points="${op.pts.join(' ')}" fill="${fillOf(op.f)}"/></g>`;
    }
  });
  if (spec.elevationDeg) {
    out += `</g>`;
    if (spec.muzzle) {
      const mx = spec.muzzle.atX * fore;
      // Bright rim + dark bore: reads as looking into a raised tube.
      out += `<ellipse cx="${mx.toFixed(2)}" cy="0" rx="${spec.muzzle.rx}" ry="${spec.muzzle.ry}" fill="${TOWER_GLYPH_DARK}" stroke="${c}" stroke-width="1.6"/>`;
    }
  }
  if (spec.flakes) {
    TOWER_GLYPH_FLAKES[lvl].forEach(fl => {
      out += `<g transform="translate(${fl.cx},${fl.cy}) scale(${fl.scale})" stroke="${c}" stroke-width="${fl.sw}" stroke-linecap="round">`;
      out += `<line x1="-5" y1="0" x2="5" y2="0"/><line x1="-5" y1="0" x2="5" y2="0" transform="rotate(60)"/><line x1="-5" y1="0" x2="5" y2="0" transform="rotate(120)"/></g>`;
    });
  } else {
    TOWER_GLYPH_CORES[lvl].forEach(d => {
      out += `<circle cx="${d.cx}" cy="${d.cy}" r="${d.r}" fill="${c}"/>`;
    });
  }
  out += `</g></svg>`;
  return out;
}

const TOWER_CONFIGS = {
  gun: { cost: 50, range: 165, damage: 16, fireRate: 0.52, color: '#00e5ff', glow: '#00e5ff', type: 'projectile', costMultiplier: 1.3, damageMultiplier: 1.7, rateMultiplier: 0.8, rangeMultiplier: 1.1, powerDmg: 0.08, powerRate: 0.06, powerRange: 0.04 },
  laser: { cost: 70, range: 150, dps: 44, color: '#ff2a85', glow: '#ff2a85', type: 'beam', costMultiplier: 1.3, damageMultiplier: 1.85, rangeMultiplier: 1.1, powerDmg: 0.08, powerRate: 0.06, powerRange: 0.04 },
  mortar: { cost: 85, range: 195, damage: 32, splash: 80, fireRate: 1.5, color: '#ff9100', glow: '#ff9100', type: 'mortar', costMultiplier: 1.3, damageMultiplier: 1.6, rateMultiplier: 0.9, rangeMultiplier: 1.1, powerDmg: 0.08, powerRate: 0.06, powerRange: 0.04 },
  tesla: { cost: 75, range: 145, damage: 22, chainTargets: 3, jumpRadius: 90, fireRate: 0.85, color: '#00ffcc', glow: '#00ffcc', type: 'chain', costMultiplier: 1.3, damageMultiplier: 1.55, rateMultiplier: 0.85, rangeMultiplier: 1.1, powerDmg: 0.05, powerRate: 0.04, powerRange: 0.03 },
  // Stasis: скромная база, умеренное замедление, растущий радиус
  stasis: { 
    cost: 65, 
    range: 115,            // было 135
    damage: 0, 
    fireRate: 1.6,         // было 1.1 (стреляет реже на старте)
    slowFactor: 0.30,      // было 0.50 (30% на старте)
    slowDuration: 1.4,     // было 1.8
    color: '#38bdf8', glow: '#38bdf8', type: 'stasis', 
    costMultiplier: 1.3, 
    damageMultiplier: 1.0, 
    rateMultiplier: 0.88,  // ускорение тика на 12% за уровень
    rangeMultiplier: 1.15, // хороший прирост радиуса
    powerRange: 0.05, powerSlow: 0.04, powerDuration: 0.06 
  },
  // Melter: базовая фаза 4.0с огня / 4.0с остывания (50/50)
  melter: { 
    cost: 95, 
    range: 140, 
    baseDps: 10, 
    rampCap: 40, 
    rampTime: 4.0, 
    cooldownTime: 4.0,     // время базового кулдауна
    color: '#ef4444', glow: '#f87171', type: 'melter', 
    costMultiplier: 1.35, 
    damageMultiplier: 1.55, 
    rangeMultiplier: 1.1, 
    powerDmg: 0.05, powerRate: 0.05, powerRange: 0.03 
  },
  railgun: { cost: 115, range: 220, damage: 120, fireRate: 2.2, color: '#a855f7', glow: '#c084fc', type: 'railgun', costMultiplier: 1.35, damageMultiplier: 1.5, rangeMultiplier: 1.1, powerDmg: 0.10, powerRate: 0.06, powerRange: 0.04 }
};

// Block 3a (requirements.md): meta upgrade branches unlock at most this many
// steps per completed/current campaign sector -- e.g. in Sector 2 the max
// purchasable step is 2 * UPGRADE_STEPS_PER_SECTOR = 4. Consumed in index.html's
// getMaxUpgradeStep().
// NOTE: must be declared AFTER TOWER_CONFIGS -- buildTowerIconSvg() reads each
// tower's colour from it, and `const` has no hoisting (temporal dead zone).
// Level-1 icons for the UI surfaces. Kept as a lookup so existing call sites
// (TOWER_ICONS[type]) keep working unchanged.
const TOWER_ICONS = {
  gun: buildTowerIconSvg('gun'),
  laser: buildTowerIconSvg('laser'),
  mortar: buildTowerIconSvg('mortar'),
  tesla: buildTowerIconSvg('tesla'),
  stasis: buildTowerIconSvg('stasis'),
  melter: buildTowerIconSvg('melter'),
  railgun: buildTowerIconSvg('railgun')
};

// One-line pitch per tower, shown on the "New Tower" milestone screen. Kept here
// with the rest of the tower content rather than in ui.js.
const TOWER_UNLOCK_BLURBS = {
  gun: 'Reliable single-target fire. Cheap, accurate, good against steady lines of enemies.',
  laser: 'Locks onto one target and burns it down. Excellent against slow, heavily armoured units.',
  mortar: 'Lobs shells that explode on impact. Strong against tight groups \u2014 but slow, and useless against spread-out swarms.',
  tesla: 'Chains lightning between nearby enemies. The answer to swarms: one shot can clear a whole clump at once.',
  stasis: 'Deals no damage \u2014 it slows everything in range instead, buying your other towers precious extra seconds.',
  melter: 'Heats up the longer it holds one target, ramping to devastating damage. Loses all heat the moment it switches.',
  railgun: 'Fires a piercing beam down a straight line, hitting every enemy it crosses. Slow, but devastating in long corridors.'
};

// Swarm walks in separated clumps instead of one continuous ribbon. The gap is
// what makes Mortar a bad answer to Swarm: its 80px splash has to fit entirely
// inside the empty path between clumps, so a shell aimed at the gap does nothing.
// 3.2s at the slowest swarm speed (95 px/s) = ~304px of empty path, leaving
// ~152px from mid-gap to the nearest unit -- comfortably outside the 80px splash
// even at the higher swarm speeds of late levels. (2.0s/190px still let a shell
// clip the clump edges once speed scaling was taken into account.)
// Units inside a clump are packed tighter (0.03s) so the clump itself stays a
// single dense Tesla target rather than a short line.
const SWARM_CLUMP_SIZE = 10;
// Swarm's debut level gets smaller clumps so the mechanic is introduced gently;
// every later level uses the full SWARM_CLUMP_SIZE.
const SWARM_CLUMP_SIZE_DEBUT = 8;
const SWARM_DEBUT_LEVEL = 11;
function swarmClumpSizeFor(lvl) {
  return lvl === SWARM_DEBUT_LEVEL ? SWARM_CLUMP_SIZE_DEBUT : SWARM_CLUMP_SIZE;
}
const SWARM_CLUMP_INTERVAL = 0.03;
const SWARM_CLUMP_GAP = 3.2;
// With 10 per clump instead of 6, total swarm units per wave went up a lot, so
// per-unit bounty comes down to keep wave income roughly where it was.
const SWARM_BOUNTY_SCALE = 0.62;

// Clump COUNT by level/wave. Swarm debuts at L11 with 3 clumps (18 units) and
// grows slowly; size per clump never changes, so the Mortar-proof gap survives
// at every level. Boss waves pass an explicit count instead.
function swarmClumpsFor(lvl, w) {
  return Math.min(4, 2 + Math.floor(Math.max(0, lvl - 11) / 10) + (w > 5 ? 1 : 0));
}

const UPGRADE_STEPS_PER_SECTOR = 2;

// Block 4d/4e (requirements.md): universal Lock-on Delay before a tower's first
// shot on a newly-acquired target, and which tower types "lock" onto a target
// (ignoring other, further-along enemies) until it dies or leaves range. Light
// weapons get 0.1s, heavy beam weapons get 0.5s; the delay itself is then
// shortened by that tower's own powerRate meta upgrade (except Mortar, whose
// powerRate instead speeds up its arc Travel Time -- see MORTAR_BASE_TRAVEL_TIME).
const LOCK_ON_DELAY_LIGHT = 0.1;
const LOCK_ON_DELAY_HEAVY = 0.5;
const LOCKED_TARGET_TOWERS = ['laser', 'melter'];
const MORTAR_BASE_TRAVEL_TIME = 1.0;

const ENEMY_CONFIGS = {
  grunt: { shape: 'circle', color: '#ff2a85', glow: '#ff2a85', size: 11, baseSpeed: 55, baseHp: 40, baseBounty: 7 },
  scout: { shape: 'triangle', color: '#ff9100', glow: '#ffaa33', size: 11, baseSpeed: 110, baseHp: 24, baseBounty: 6 },
  tank:  { shape: 'square', color: '#a855f7', glow: '#c084fc', size: 13, baseSpeed: 38, baseHp: 100, baseBounty: 12 },
  swarm: { shape: 'diamond', color: '#00ffcc', glow: '#00ffcc', size: 8, baseSpeed: 170, baseHp: 16, baseBounty: 3 },
  blinker: { shape: 'hexagon', color: '#3b82f6', glow: '#60a5fa', size: 12, baseSpeed: 62, baseHp: 65, baseBounty: 8 },
  goliath: { shape: 'octagon', color: '#f97316', glow: '#fb923c', size: 15, baseSpeed: 30, baseHp: 260, baseBounty: 18 },
  emp_bomber: { shape: 'triangle_inverted', color: '#38bdf8', glow: '#0284c7', size: 13, baseSpeed: 40, baseHp: 170, baseBounty: 14 },
  hive_empress: { shape: 'diamond', color: '#00ffcc', glow: '#00ffcc', size: 15, baseSpeed: 38, baseHp: 2200, baseBounty: 60 },
  chronos_warp: { shape: 'hexagon', color: '#3b82f6', glow: '#60a5fa', size: 16, baseSpeed: 40, baseHp: 4200, baseBounty: 85 },
  titan_core: { shape: 'octagon', color: '#f97316', glow: '#fb923c', size: 17, baseSpeed: 28, baseHp: 5800, baseBounty: 110 },
  emp_overlord: { shape: 'triangle_inverted', color: '#38bdf8', glow: '#0284c7', size: 17, baseSpeed: 30, baseHp: 7200, baseBounty: 140 }
};

const MAP_CATALOG = {
  L1: { name: "Straight Path", cols: 5, rows: 7, path: [{c: 2, r: 0}, {c: 2, r: 6}] },
  L2: { name: "First Turn", cols: 6, rows: 6, path: [{c: 4, r: 1}, {c: 4, r: 4}, {c: 1, r: 4}] },
  L3: { name: "Double Zigzag", cols: 6, rows: 7, path: [{c: 3, r: 0}, {c: 3, r: 2}, {c: 2, r: 2}, {c: 2, r: 6}] },
  L4: { name: "Centered Angle", cols: 7, rows: 7, path: [{c: 4, r: 0}, {c: 4, r: 3}, {c: 2, r: 3}, {c: 2, r: 6}] },
  L5: { name: "Side Runner", cols: 7, rows: 8, path: [{c: 1, r: 0}, {c: 1, r: 6}, {c: 3, r: 6}, {c: 3, r: 5}, {c: 5, r: 5}] },
  L6: { name: "Twin Bend", cols: 5, rows: 8, path: [{c: 3, r: 0}, {c: 3, r: 6}, {c: 1, r: 6}, {c: 1, r: 0}] },
  L7: { name: "Smooth Curve", cols: 7, rows: 8, path: [{c: 0, r: 6}, {c: 6, r: 6}, {c: 6, r: 3}, {c: 3, r: 3}, {c: 3, r: 0}] },
  L8: { name: "Loop Start", cols: 8, rows: 7, path: [{c: 1, r: 6}, {c: 1, r: 0}, {c: 6, r: 0}, {c: 6, r: 6}] },
  L9: { name: "Mirror Path", cols: 6, rows: 9, path: [{c: 0, r: 3}, {c: 2, r: 3}, {c: 2, r: 7}, {c: 4, r: 7}, {c: 4, r: 0}] },
  L10: { name: "Prime Boss", cols: 7, rows: 9, path: [{c: 3, r: 8}, {c: 3, r: 1}, {c: 1, r: 1}, {c: 1, r: 3}, {c: 6, r: 3}] },
  L11: { name: "Canyon Run", cols: 7, rows: 10, path: [{c: 6, r: 9}, {c: 0, r: 9}, {c: 0, r: 0}] },
  L12: { name: "Wall Trace", cols: 7, rows: 10, path: [{c: 6, r: 0}, {c: 6, r: 9}, {c: 0, r: 9}, {c: 0, r: 7}, {c: 1, r: 7}, {c: 1, r: 6}, {c: 2, r: 6}, {c: 2, r: 5}, {c: 3, r: 5}, {c: 3, r: 4}, {c: 4, r: 4}, {c: 4, r: 0}] },
  L13: { name: "Spiral In", cols: 7, rows: 10, path: [{c: 6, r: 9}, {c: 6, r: 5}, {c: 0, r: 5}, {c: 0, r: 3}, {c: 6, r: 3}, {c: 6, r: 0}] },
  L14: { name: "Crossroads", cols: 7, rows: 11, path: [{c: 0, r: 10}, {c: 0, r: 0}, {c: 6, r: 0}, {c: 6, r: 10}, {c: 2, r: 10}] },
  L15: { name: "Pocket Maze", cols: 4, rows: 11, path: [{c: 1, r: 10}, {c: 1, r: 2}, {c: 0, r: 2}, {c: 0, r: 0}, {c: 3, r: 0}, {c: 3, r: 2}, {c: 2, r: 2}, {c: 2, r: 10}] },
  L16: { name: "Offset Line", cols: 7, rows: 11, path: [{c: 0, r: 10}, {c: 6, r: 10}, {c: 6, r: 0}, {c: 0, r: 0}, {c: 0, r: 6}, {c: 4, r: 6}, {c: 4, r: 2}, {c: 2, r: 2}, {c: 2, r: 4}, {c: 3, r: 4}] },
  L17: { name: "Fold Twice", cols: 7, rows: 11, path: [{c: 6, r: 10}, {c: 0, r: 10}, {c: 0, r: 6}, {c: 6, r: 6}, {c: 6, r: 4}, {c: 0, r: 4}, {c: 0, r: 0}, {c: 6, r: 0}] },
  L18: { name: "Flow Pattern", cols: 7, rows: 11, path: [{c: 0, r: 0}, {c: 0, r: 4}, {c: 1, r: 4}, {c: 1, r: 6}, {c: 0, r: 6}, {c: 0, r: 10}, {c: 6, r: 10}, {c: 6, r: 6}, {c: 5, r: 6}, {c: 5, r: 4}, {c: 6, r: 4}, {c: 6, r: 0}] },
  L19: { name: "Loop Pocket", cols: 7, rows: 11, path: [{c: 6, r: 10}, {c: 0, r: 10}, {c: 0, r: 4}, {c: 6, r: 4}, {c: 6, r: 7}, {c: 2, r: 7}, {c: 2, r: 0}] },
  L20: { name: "Echo Boss", cols: 7, rows: 11, path: [{c: 6, r: 10}, {c: 5, r: 10}, {c: 5, r: 9}, {c: 4, r: 9}, {c: 4, r: 8}, {c: 3, r: 8}, {c: 3, r: 7}, {c: 2, r: 7}, {c: 2, r: 6}, {c: 1, r: 6}, {c: 1, r: 5}, {c: 0, r: 5}, {c: 0, r: 4}, {c: 1, r: 4}, {c: 1, r: 3}, {c: 2, r: 3}, {c: 2, r: 2}, {c: 3, r: 2}, {c: 3, r: 1}, {c: 4, r: 1}, {c: 4, r: 0}, {c: 5, r: 0}] },
  L21: { name: "Corridor East", cols: 7, rows: 12, path: [{c: 6, r: 11}, {c: 6, r: 7}, {c: 1, r: 7}, {c: 1, r: 9}, {c: 4, r: 9}, {c: 4, r: 10}, {c: 0, r: 10}, {c: 0, r: 5}, {c: 6, r: 5}, {c: 6, r: 0}, {c: 2, r: 0}, {c: 2, r: 2}, {c: 4, r: 2}, {c: 4, r: 3}, {c: 0, r: 3}, {c: 0, r: 0}] },
  L22: { name: "Zigzag Wide", cols: 7, rows: 13, path: [{c: 0, r: 12}, {c: 0, r: 7}, {c: 6, r: 7}, {c: 6, r: 11}, {c: 1, r: 11}, {c: 1, r: 1}, {c: 6, r: 1}, {c: 6, r: 5}, {c: 0, r: 5}, {c: 0, r: 0}] },
  L23: { name: "Box Track", cols: 6, rows: 14, path: [{c: 1, r: 13}, {c: 1, r: 10}, {c: 4, r: 10}, {c: 4, r: 12}, {c: 2, r: 12}, {c: 2, r: 7}, {c: 4, r: 7}, {c: 4, r: 9}, {c: 1, r: 9}, {c: 1, r: 4}, {c: 3, r: 4}, {c: 3, r: 6}, {c: 0, r: 6}, {c: 0, r: 1}, {c: 5, r: 1}, {c: 5, r: 3}, {c: 1, r: 3}] },
  L24: { name: "Double Fold", cols: 7, rows: 13, path: [{c: 6, r: 12}, {c: 6, r: 0}, {c: 4, r: 0}, {c: 4, r: 2}, {c: 5, r: 2}, {c: 5, r: 4}, {c: 4, r: 4}, {c: 4, r: 6}, {c: 5, r: 6}, {c: 5, r: 8}, {c: 4, r: 8}, {c: 4, r: 10}, {c: 5, r: 10}, {c: 5, r: 12}, {c: 0, r: 12}, {c: 0, r: 6}, {c: 2, r: 6}, {c: 2, r: 5}, {c: 0, r: 5}, {c: 0, r: 0}] },
  L25: { name: "Weave Path", cols: 7, rows: 14, path: [{c: 0, r: 0}, {c: 0, r: 13}, {c: 3, r: 13}, {c: 3, r: 10}, {c: 1, r: 10}, {c: 1, r: 12}, {c: 6, r: 12}, {c: 6, r: 6}, {c: 1, r: 6}, {c: 1, r: 4}, {c: 6, r: 4}, {c: 6, r: 0}] },
  L26: { name: "Staircase", cols: 8, rows: 14, path: [{c: 0, r: 13}, {c: 7, r: 13}, {c: 7, r: 11}, {c: 0, r: 11}, {c: 0, r: 7}, {c: 7, r: 7}, {c: 7, r: 5}, {c: 0, r: 5}, {c: 0, r: 2}, {c: 7, r: 2}, {c: 7, r: 0}, {c: 0, r: 0}] },
  L27: { name: "Reverse Flow", cols: 7, rows: 15, path: [{c: 4, r: 11}, {c: 4, r: 8}, {c: 2, r: 8}, {c: 2, r: 10}, {c: 6, r: 10}, {c: 6, r: 0}, {c: 0, r: 0}, {c: 0, r: 3}, {c: 4, r: 3}, {c: 4, r: 1}, {c: 2, r: 1}, {c: 2, r: 5}, {c: 0, r: 5}, {c: 0, r: 14}, {c: 6, r: 14}] },
  L28: { name: "Spiral Tight", cols: 8, rows: 16, path: [{c: 0, r: 0}, {c: 0, r: 4}, {c: 3, r: 4}, {c: 3, r: 0}, {c: 1, r: 0}, {c: 1, r: 3}, {c: 7, r: 3}, {c: 7, r: 0}, {c: 4, r: 0}, {c: 4, r: 15}, {c: 7, r: 15}, {c: 7, r: 11}, {c: 0, r: 11}, {c: 0, r: 15}, {c: 3, r: 15}, {c: 3, r: 8}, {c: 0, r: 8}] },
  L29: { name: "Loop Maze", cols: 8, rows: 16, path: [{c: 0, r: 15}, {c: 7, r: 15}, {c: 7, r: 0}, {c: 0, r: 0}, {c: 0, r: 13}, {c: 5, r: 13}, {c: 5, r: 2}, {c: 2, r: 2}, {c: 2, r: 11}] },
  L30: { name: "Chaos Boss", cols: 8, rows: 16, path: [{c: 0, r: 15}, {c: 7, r: 15}, {c: 7, r: 6}, {c: 1, r: 6}, {c: 1, r: 11}, {c: 5, r: 11}, {c: 5, r: 9}, {c: 2, r: 9}, {c: 2, r: 7}, {c: 6, r: 7}, {c: 6, r: 12}, {c: 0, r: 12}, {c: 0, r: 4}, {c: 7, r: 4}, {c: 7, r: 0}, {c: 0, r: 0}, {c: 0, r: 3}, {c: 6, r: 3}, {c: 6, r: 1}, {c: 1, r: 1}] },
  L31: { name: "Branch Left", cols: 7, rows: 14, path: [{c: 1, r: 0}, {c: 1, r: 4}, {c: 4, r: 4}, {c: 4, r: 8}, {c: 1, r: 8}, {c: 1, r: 13}, {c: 5, r: 13}, {c: 5, r: 10}, {c: 3, r: 10}, {c: 3, r: 12}], blocked: [{c: 3, r: 2}, {c: 2, r: 6}, {c: 3, r: 9}] },
  L32: { name: "Branch Right", cols: 7, rows: 14, path: [{c: 3, r: 0}, {c: 3, r: 4}, {c: 6, r: 4}, {c: 6, r: 7}, {c: 4, r: 7}, {c: 4, r: 9}, {c: 0, r: 9}, {c: 0, r: 11}, {c: 2, r: 11}, {c: 2, r: 13}], blocked: [{c: 5, r: 2}, {c: 4, r: 3}, {c: 2, r: 7}, {c: 3, r: 6}, {c: 3, r: 10}] },
  L33: { name: "Grid Cross", cols: 6, rows: 14, path: [{c: 4, r: 0}, {c: 4, r: 4}, {c: 0, r: 4}, {c: 0, r: 7}, {c: 5, r: 7}, {c: 5, r: 9}, {c: 0, r: 9}, {c: 0, r: 13}, {c: 5, r: 13}, {c: 5, r: 11}], blocked: [{c: 1, r: 5}, {c: 2, r: 6}, {c: 3, r: 5}, {c: 3, r: 8}, {c: 1, r: 8}, {c: 2, r: 10}, {c: 3, r: 11}, {c: 1, r: 11}, {c: 2, r: 12}, {c: 4, r: 10}] },
  L34: { name: "Offset Grid", cols: 6, rows: 13, path: [{c: 4, r: 0}, {c: 4, r: 4}, {c: 1, r: 4}, {c: 1, r: 7}, {c: 5, r: 7}, {c: 5, r: 10}, {c: 2, r: 10}, {c: 2, r: 12}, {c: 0, r: 12}, {c: 0, r: 9}, {c: 2, r: 9}], blocked: [{c: 2, r: 6}, {c: 3, r: 5}, {c: 4, r: 6}, {c: 5, r: 5}, {c: 3, r: 3}, {c: 2, r: 2}, {c: 1, r: 1}, {c: 3, r: 9}, {c: 4, r: 8}, {c: 2, r: 8}, {c: 1, r: 10}, {c: 3, r: 11}, {c: 0, r: 6}, {c: 0, r: 5}] },
  L35: { name: "Spiral Out", cols: 7, rows: 14, path: [{c: 5, r: 0}, {c: 5, r: 4}, {c: 2, r: 4}, {c: 2, r: 9}, {c: 6, r: 9}, {c: 6, r: 12}, {c: 2, r: 12}, {c: 2, r: 10}, {c: 0, r: 10}, {c: 0, r: 13}, {c: 2, r: 13}], blocked: [{c: 3, r: 8}, {c: 3, r: 7}, {c: 3, r: 6}, {c: 3, r: 5}, {c: 5, r: 5}, {c: 5, r: 6}, {c: 5, r: 7}, {c: 5, r: 8}, {c: 3, r: 10}, {c: 3, r: 11}, {c: 5, r: 11}, {c: 5, r: 10}, {c: 1, r: 11}, {c: 1, r: 12}, {c: 3, r: 13}, {c: 5, r: 13}, {c: 1, r: 9}, {c: 1, r: 8}, {c: 1, r: 7}, {c: 1, r: 6}, {c: 1, r: 5}, {c: 1, r: 4}, {c: 1, r: 3}, {c: 1, r: 2}, {c: 1, r: 1}, {c: 1, r: 0}, {c: 3, r: 3}, {c: 3, r: 2}, {c: 3, r: 1}, {c: 3, r: 0}] },
  L36: { name: "Wide Loop", cols: 7, rows: 14, path: [{c: 1, r: 0}, {c: 1, r: 3}, {c: 4, r: 3}, {c: 4, r: 7}, {c: 0, r: 7}, {c: 0, r: 10}, {c: 4, r: 10}, {c: 4, r: 8}, {c: 6, r: 8}, {c: 6, r: 11}, {c: 4, r: 11}, {c: 4, r: 13}], blocked: [{c: 3, r: 1}, {c: 2, r: 5}, {c: 3, r: 8}, {c: 5, r: 9}, {c: 4, r: 2}, {c: 2, r: 0}, {c: 2, r: 2}, {c: 4, r: 0}, {c: 5, r: 1}, {c: 6, r: 0}, {c: 6, r: 1}, {c: 6, r: 2}, {c: 6, r: 3}, {c: 6, r: 4}, {c: 6, r: 5}, {c: 6, r: 6}, {c: 6, r: 7}, {c: 0, r: 13}, {c: 1, r: 13}, {c: 2, r: 13}, {c: 2, r: 12}, {c: 1, r: 12}, {c: 0, r: 12}, {c: 6, r: 13}, {c: 0, r: 6}, {c: 0, r: 5}, {c: 0, r: 4}, {c: 0, r: 3}, {c: 0, r: 2}, {c: 0, r: 1}, {c: 0, r: 0}, {c: 3, r: 4}, {c: 1, r: 4}, {c: 3, r: 6}, {c: 1, r: 6}, {c: 5, r: 3}, {c: 5, r: 5}, {c: 5, r: 7}, {c: 2, r: 9}, {c: 1, r: 8}, {c: 1, r: 11}, {c: 3, r: 11}, {c: 3, r: 13}, {c: 5, r: 12}] },
  L37: { name: "Double Spiral", cols: 7, rows: 14, path: [{c: 1, r: 0}, {c: 1, r: 5}, {c: 6, r: 5}, {c: 6, r: 8}, {c: 1, r: 8}, {c: 1, r: 10}, {c: 4, r: 10}, {c: 4, r: 13}, {c: 2, r: 13}, {c: 2, r: 11}, {c: 0, r: 11}, {c: 0, r: 13}], blocked: [{c: 3, r: 3}, {c: 3, r: 2}, {c: 3, r: 1}, {c: 3, r: 0}, {c: 4, r: 1}, {c: 4, r: 0}, {c: 4, r: 2}, {c: 4, r: 3}, {c: 5, r: 3}, {c: 6, r: 3}, {c: 6, r: 2}, {c: 5, r: 2}, {c: 5, r: 1}, {c: 6, r: 1}, {c: 6, r: 0}, {c: 5, r: 0}, {c: 0, r: 0}, {c: 0, r: 1}, {c: 2, r: 0}, {c: 0, r: 2}, {c: 0, r: 3}, {c: 0, r: 4}, {c: 0, r: 5}, {c: 0, r: 6}, {c: 0, r: 7}, {c: 0, r: 8}, {c: 0, r: 9}, {c: 0, r: 10}, {c: 5, r: 13}, {c: 6, r: 13}, {c: 6, r: 12}, {c: 6, r: 11}, {c: 6, r: 10}, {c: 5, r: 10}, {c: 5, r: 11}, {c: 5, r: 12}, {c: 6, r: 9}, {c: 5, r: 9}, {c: 4, r: 9}, {c: 1, r: 13}, {c: 6, r: 4}, {c: 5, r: 4}, {c: 2, r: 4}, {c: 5, r: 6}, {c: 5, r: 7}, {c: 1, r: 6}, {c: 1, r: 7}, {c: 2, r: 6}, {c: 2, r: 7}] },
  L38: { name: "Needle Eye", cols: 7, rows: 14, path: [{c: 1, r: 0}, {c: 1, r: 12}, {c: 5, r: 12}, {c: 5, r: 1}, {c: 2, r: 1}, {c: 2, r: 11}], blocked: [{c: 0, r: 12}, {c: 1, r: 13}, {c: 2, r: 13}, {c: 3, r: 13}, {c: 4, r: 13}, {c: 5, r: 13}, {c: 6, r: 12}, {c: 0, r: 10}, {c: 0, r: 0}, {c: 2, r: 0}, {c: 3, r: 0}, {c: 4, r: 0}, {c: 5, r: 0}, {c: 6, r: 1}, {c: 6, r: 10}, {c: 6, r: 7}, {c: 6, r: 4}, {c: 0, r: 7}, {c: 0, r: 3}, {c: 3, r: 11}, {c: 4, r: 10}, {c: 4, r: 2}, {c: 3, r: 3}, {c: 3, r: 8}, {c: 4, r: 8}, {c: 4, r: 7}, {c: 4, r: 6}, {c: 4, r: 5}, {c: 3, r: 5}, {c: 3, r: 6}, {c: 3, r: 7}, {c: 4, r: 4}, {c: 3, r: 9}] },
  L39: { name: "Complex Maze", cols: 7, rows: 14, path: [{c: 0, r: 13}, {c: 6, r: 13}, {c: 6, r: 0}, {c: 0, r: 0}, {c: 0, r: 12}, {c: 5, r: 12}, {c: 5, r: 7}, {c: 4, r: 7}, {c: 4, r: 5}, {c: 5, r: 5}, {c: 5, r: 1}, {c: 1, r: 1}, {c: 1, r: 5}, {c: 2, r: 5}, {c: 2, r: 7}, {c: 1, r: 7}, {c: 1, r: 11}, {c: 3, r: 11}, {c: 3, r: 2}], blocked: [{c: 2, r: 9}, {c: 4, r: 9}] },
  L40: { name: "Ultimate Boss", cols: 7, rows: 14, path: [{c: 0, r: 13}, {c: 3, r: 13}, {c: 3, r: 9}, {c: 0, r: 9}, {c: 0, r: 12}, {c: 6, r: 12}, {c: 6, r: 13}, {c: 4, r: 13}, {c: 4, r: 6}, {c: 6, r: 6}, {c: 6, r: 8}, {c: 0, r: 8}, {c: 0, r: 4}, {c: 3, r: 4}, {c: 3, r: 6}, {c: 1, r: 6}, {c: 1, r: 1}, {c: 6, r: 1}, {c: 6, r: 4}, {c: 4, r: 4}, {c: 4, r: 0}], blocked: [{c: 0, r: 0}, {c: 1, r: 0}, {c: 2, r: 0}, {c: 3, r: 0}, {c: 5, r: 0}, {c: 6, r: 0}, {c: 0, r: 1}, {c: 0, r: 2}, {c: 0, r: 3}, {c: 2, r: 3}, {c: 3, r: 2}, {c: 6, r: 5}, {c: 5, r: 5}, {c: 3, r: 7}, {c: 2, r: 10}, {c: 1, r: 11}, {c: 6, r: 9}, {c: 6, r: 10}, {c: 6, r: 11}] },
  L41: { name: "Expansion Alpha", cols: 8, rows: 15, path: [{c: 0, r: 13}, {c: 7, r: 13}, {c: 7, r: 11}, {c: 0, r: 11}, {c: 0, r: 8}, {c: 7, r: 8}, {c: 7, r: 4}, {c: 0, r: 4}, {c: 0, r: 0}, {c: 7, r: 0}], blocked: [{c: 0, r: 14}, {c: 7, r: 14}, {c: 4, r: 12}, {c: 0, r: 12}, {c: 1, r: 14}, {c: 6, r: 14}, {c: 7, r: 9}, {c: 7, r: 10}, {c: 7, r: 3}, {c: 7, r: 2}, {c: 7, r: 1}, {c: 0, r: 7}, {c: 0, r: 6}, {c: 0, r: 5}, {c: 1, r: 6}, {c: 2, r: 6}, {c: 3, r: 6}, {c: 4, r: 6}, {c: 5, r: 6}, {c: 2, r: 2}, {c: 3, r: 2}, {c: 4, r: 2}, {c: 5, r: 2}, {c: 6, r: 2}] },
  L42: { name: "Expansion Beta", cols: 8, rows: 16, path: [{c: 0, r: 15}, {c: 7, r: 15}, {c: 7, r: 11}, {c: 0, r: 11}, {c: 0, r: 14}, {c: 6, r: 14}, {c: 6, r: 9}, {c: 0, r: 9}, {c: 0, r: 7}, {c: 2, r: 7}, {c: 2, r: 10}, {c: 7, r: 10}, {c: 7, r: 4}, {c: 0, r: 4}, {c: 0, r: 6}, {c: 6, r: 6}, {c: 6, r: 0}, {c: 0, r: 0}, {c: 0, r: 3}, {c: 7, r: 3}, {c: 7, r: 1}, {c: 1, r: 1}], blocked: [{c: 7, r: 0}, {c: 0, r: 10}, {c: 1, r: 12}, {c: 1, r: 13}, {c: 5, r: 13}, {c: 5, r: 12}, {c: 6, r: 8}, {c: 6, r: 7}, {c: 1, r: 5}] },
  L43: { name: "Growth Gamma", cols: 9, rows: 16, path: [{c: 0, r: 15}, {c: 8, r: 15}, {c: 8, r: 8}, {c: 6, r: 8}, {c: 6, r: 5}, {c: 8, r: 5}, {c: 8, r: 0}, {c: 5, r: 0}, {c: 5, r: 1}, {c: 3, r: 1}, {c: 3, r: 0}, {c: 0, r: 0}, {c: 0, r: 5}, {c: 3, r: 5}, {c: 3, r: 8}, {c: 0, r: 8}, {c: 0, r: 10}, {c: 6, r: 10}, {c: 6, r: 13}, {c: 0, r: 13}], blocked: [{c: 8, r: 7}, {c: 8, r: 6}, {c: 7, r: 6}, {c: 7, r: 7}, {c: 4, r: 0}, {c: 2, r: 6}, {c: 2, r: 7}, {c: 1, r: 7}, {c: 0, r: 7}, {c: 0, r: 6}, {c: 1, r: 6}, {c: 7, r: 1}, {c: 1, r: 1}, {c: 7, r: 14}, {c: 0, r: 14}, {c: 0, r: 12}, {c: 0, r: 11}, {c: 5, r: 12}, {c: 1, r: 14}, {c: 1, r: 9}, {c: 2, r: 9}, {c: 1, r: 11}, {c: 1, r: 12}, {c: 5, r: 11}, {c: 1, r: 4}, {c: 7, r: 4}, {c: 6, r: 3}, {c: 6, r: 2}, {c: 2, r: 2}, {c: 2, r: 3}] },
  L44: { name: "Growth Delta", cols: 9, rows: 18, path: [{c: 0, r: 17}, {c: 4, r: 17}, {c: 4, r: 12}, {c: 5, r: 12}, {c: 5, r: 17}, {c: 8, r: 17}, {c: 8, r: 8}, {c: 4, r: 8}, {c: 4, r: 7}, {c: 8, r: 7}, {c: 8, r: 0}, {c: 5, r: 0}, {c: 5, r: 4}, {c: 4, r: 4}, {c: 4, r: 0}, {c: 0, r: 0}, {c: 0, r: 7}, {c: 3, r: 7}, {c: 3, r: 8}, {c: 0, r: 8}, {c: 0, r: 16}], blocked: [{c: 2, r: 16}, {c: 1, r: 16}, {c: 1, r: 15}, {c: 2, r: 14}, {c: 1, r: 14}, {c: 1, r: 13}, {c: 1, r: 12}, {c: 2, r: 12}, {c: 3, r: 15}, {c: 3, r: 13}, {c: 1, r: 9}, {c: 2, r: 10}, {c: 3, r: 10}, {c: 4, r: 10}, {c: 5, r: 10}, {c: 6, r: 10}, {c: 1, r: 11}, {c: 7, r: 10}, {c: 7, r: 11}, {c: 6, r: 12}, {c: 7, r: 13}, {c: 6, r: 14}, {c: 7, r: 15}, {c: 6, r: 16}, {c: 3, r: 11}, {c: 5, r: 11}, {c: 3, r: 9}, {c: 5, r: 9}, {c: 7, r: 9}, {c: 1, r: 6}, {c: 1, r: 5}, {c: 1, r: 4}, {c: 1, r: 3}, {c: 1, r: 2}, {c: 1, r: 1}, {c: 2, r: 6}, {c: 3, r: 5}, {c: 4, r: 6}, {c: 5, r: 5}, {c: 6, r: 6}, {c: 7, r: 5}, {c: 6, r: 4}, {c: 7, r: 3}, {c: 6, r: 2}, {c: 7, r: 1}, {c: 2, r: 4}, {c: 3, r: 3}, {c: 2, r: 2}, {c: 3, r: 1}] },
  L45: { name: "Growth Large", cols: 9, rows: 17, path: [{c: 0, r: 16}, {c: 8, r: 16}, {c: 8, r: 8}, {c: 1, r: 8}, {c: 1, r: 14}, {c: 6, r: 14}, {c: 6, r: 13}, {c: 2, r: 13}, {c: 2, r: 9}, {c: 3, r: 9}, {c: 3, r: 12}, {c: 7, r: 12}, {c: 7, r: 15}, {c: 0, r: 15}, {c: 0, r: 6}, {c: 8, r: 6}, {c: 8, r: 0}, {c: 0, r: 0}, {c: 0, r: 4}, {c: 7, r: 4}, {c: 7, r: 1}, {c: 1, r: 1}, {c: 1, r: 3}, {c: 6, r: 3}], blocked: [{c: 8, r: 7}, {c: 0, r: 5}, {c: 1, r: 7}, {c: 7, r: 5}, {c: 4, r: 11}, {c: 5, r: 10}, {c: 6, r: 9}, {c: 7, r: 11}, {c: 4, r: 2}, {c: 3, r: 5}, {c: 4, r: 5}, {c: 4, r: 7}, {c: 5, r: 7}] },
  L46: { name: "Extended Path", cols: 9, rows: 18, path: [{c: 8, r: 0}, {c: 7, r: 0}, {c: 7, r: 1}, {c: 6, r: 1}, {c: 6, r: 2}, {c: 2, r: 2}, {c: 2, r: 3}, {c: 1, r: 3}, {c: 1, r: 4}, {c: 0, r: 4}, {c: 0, r: 5}, {c: 1, r: 5}, {c: 1, r: 6}, {c: 2, r: 6}, {c: 2, r: 7}, {c: 6, r: 7}, {c: 6, r: 8}, {c: 7, r: 8}, {c: 7, r: 9}, {c: 8, r: 9}, {c: 8, r: 10}, {c: 7, r: 10}, {c: 7, r: 11}, {c: 6, r: 11}, {c: 6, r: 12}, {c: 2, r: 12}, {c: 2, r: 13}, {c: 1, r: 13}, {c: 1, r: 14}, {c: 0, r: 14}, {c: 0, r: 15}, {c: 1, r: 15}, {c: 1, r: 16}, {c: 2, r: 16}, {c: 2, r: 17}, {c: 4, r: 17}, {c: 4, r: 0}], blocked: [{c: 8, r: 17}, {c: 7, r: 17}, {c: 8, r: 16}, {c: 7, r: 16}, {c: 8, r: 15}, {c: 7, r: 15}, {c: 8, r: 14}, {c: 7, r: 14}, {c: 6, r: 17}, {c: 6, r: 16}, {c: 6, r: 15}, {c: 6, r: 14}, {c: 0, r: 11}, {c: 1, r: 11}, {c: 1, r: 10}, {c: 0, r: 10}, {c: 0, r: 9}, {c: 1, r: 9}, {c: 2, r: 9}, {c: 2, r: 10}, {c: 0, r: 8}, {c: 1, r: 8}, {c: 8, r: 6}, {c: 7, r: 6}, {c: 7, r: 5}, {c: 8, r: 5}, {c: 8, r: 4}, {c: 8, r: 3}, {c: 7, r: 3}, {c: 7, r: 4}, {c: 6, r: 4}, {c: 6, r: 5}, {c: 0, r: 1}, {c: 1, r: 0}, {c: 0, r: 0}, {c: 2, r: 0}, {c: 6, r: 0}, {c: 3, r: 0}, {c: 5, r: 0}, {c: 5, r: 6}, {c: 5, r: 3}, {c: 3, r: 6}, {c: 3, r: 3}, {c: 0, r: 2}, {c: 1, r: 1}, {c: 3, r: 8}, {c: 3, r: 11}, {c: 5, r: 10}, {c: 5, r: 9}, {c: 8, r: 13}, {c: 7, r: 13}, {c: 8, r: 12}, {c: 8, r: 7}, {c: 5, r: 13}, {c: 5, r: 17}, {c: 3, r: 13}, {c: 3, r: 16}, {c: 5, r: 15}, {c: 0, r: 12}, {c: 0, r: 16}, {c: 0, r: 17}, {c: 1, r: 17}, {c: 8, r: 2}, {c: 0, r: 7}] },
  L47: { name: "Extended Wide", cols: 10, rows: 20, path: [{c: 5, r: 19}, {c: 5, r: 8}, {c: 4, r: 8}, {c: 4, r: 9}, {c: 3, r: 9}, {c: 3, r: 7}, {c: 2, r: 7}, {c: 2, r: 10}, {c: 4, r: 10}, {c: 4, r: 11}, {c: 1, r: 11}, {c: 1, r: 6}, {c: 4, r: 6}, {c: 4, r: 7}, {c: 5, r: 7}, {c: 5, r: 6}, {c: 8, r: 6}, {c: 8, r: 11}, {c: 6, r: 11}, {c: 6, r: 10}, {c: 7, r: 10}, {c: 7, r: 9}, {c: 6, r: 9}, {c: 6, r: 8}, {c: 7, r: 8}, {c: 7, r: 7}, {c: 6, r: 7}, {c: 6, r: 0}], blocked: [{c: 9, r: 19}, {c: 8, r: 19}, {c: 6, r: 19}, {c: 7, r: 19}, {c: 8, r: 18}, {c: 9, r: 18}, {c: 9, r: 17}, {c: 4, r: 19}, {c: 3, r: 19}, {c: 2, r: 19}, {c: 0, r: 19}, {c: 1, r: 19}, {c: 0, r: 18}, {c: 1, r: 18}, {c: 0, r: 17}, {c: 1, r: 17}, {c: 2, r: 18}, {c: 0, r: 16}, {c: 0, r: 15}, {c: 1, r: 16}, {c: 2, r: 17}, {c: 3, r: 18}, {c: 7, r: 18}, {c: 8, r: 17}, {c: 9, r: 16}, {c: 9, r: 15}, {c: 0, r: 14}, {c: 0, r: 12}, {c: 0, r: 13}, {c: 9, r: 12}, {c: 9, r: 14}, {c: 9, r: 13}, {c: 9, r: 4}, {c: 9, r: 3}, {c: 9, r: 2}, {c: 9, r: 1}, {c: 9, r: 0}, {c: 7, r: 0}, {c: 8, r: 0}, {c: 8, r: 1}, {c: 5, r: 0}, {c: 4, r: 0}, {c: 3, r: 0}, {c: 2, r: 0}, {c: 1, r: 0}, {c: 0, r: 0}, {c: 0, r: 1}, {c: 0, r: 2}, {c: 0, r: 3}, {c: 0, r: 4}, {c: 0, r: 5}, {c: 1, r: 1}, {c: 1, r: 2}, {c: 2, r: 1}, {c: 4, r: 1}, {c: 3, r: 1}, {c: 2, r: 2}, {c: 3, r: 2}, {c: 1, r: 3}, {c: 2, r: 3}, {c: 1, r: 4}, {c: 9, r: 5}, {c: 4, r: 12}, {c: 6, r: 12}, {c: 7, r: 5}, {c: 5, r: 5}, {c: 1, r: 15}, {c: 1, r: 14}, {c: 1, r: 13}, {c: 1, r: 12}] },
  L48: { name: "Extended Deep", cols: 10, rows: 20, path: [{c: 1, r: 16}, {c: 1, r: 13}, {c: 4, r: 13}, {c: 4, r: 17}, {c: 0, r: 17}, {c: 0, r: 12}, {c: 5, r: 12}, {c: 5, r: 18}, {c: 0, r: 18}, {c: 0, r: 19}, {c: 9, r: 19}, {c: 9, r: 18}, {c: 6, r: 18}, {c: 6, r: 12}, {c: 9, r: 12}, {c: 9, r: 17}, {c: 8, r: 17}, {c: 8, r: 0}, {c: 1, r: 0}, {c: 1, r: 10}, {c: 6, r: 10}, {c: 6, r: 2}, {c: 3, r: 2}, {c: 3, r: 8}, {c: 5, r: 8}, {c: 5, r: 7}, {c: 4, r: 7}, {c: 4, r: 6}, {c: 5, r: 6}, {c: 5, r: 5}, {c: 4, r: 5}], blocked: [{c: 2, r: 16}, {c: 3, r: 16}, {c: 7, r: 17}, {c: 7, r: 16}, {c: 9, r: 11}, {c: 9, r: 9}, {c: 9, r: 10}, {c: 9, r: 8}, {c: 9, r: 7}, {c: 9, r: 6}, {c: 9, r: 5}, {c: 9, r: 4}, {c: 9, r: 3}, {c: 9, r: 2}, {c: 9, r: 0}, {c: 9, r: 1}, {c: 0, r: 0}, {c: 0, r: 1}, {c: 0, r: 2}, {c: 0, r: 3}, {c: 0, r: 4}, {c: 0, r: 6}, {c: 0, r: 5}, {c: 0, r: 7}, {c: 0, r: 8}, {c: 0, r: 9}, {c: 0, r: 10}, {c: 0, r: 11}, {c: 5, r: 9}, {c: 4, r: 9}, {c: 2, r: 9}, {c: 3, r: 9}, {c: 2, r: 1}, {c: 7, r: 1}, {c: 7, r: 11}, {c: 7, r: 10}, {c: 1, r: 11}, {c: 2, r: 11}, {c: 6, r: 11}, {c: 5, r: 11}, {c: 4, r: 11}, {c: 3, r: 11}, {c: 7, r: 9}, {c: 6, r: 1}, {c: 5, r: 1}, {c: 4, r: 1}, {c: 3, r: 1}, {c: 2, r: 2}, {c: 7, r: 2}, {c: 7, r: 3}, {c: 2, r: 3}, {c: 2, r: 4}, {c: 7, r: 4}, {c: 7, r: 5}, {c: 2, r: 5}] },
  L49: { name: "Extended Complex", cols: 10, rows: 20, path: [{c: 4, r: 4}, {c: 4, r: 5}, {c: 5, r: 5}, {c: 5, r: 3}, {c: 3, r: 3}, {c: 3, r: 6}, {c: 6, r: 6}, {c: 6, r: 2}, {c: 2, r: 2}, {c: 2, r: 7}, {c: 6, r: 7}, {c: 6, r: 17}, {c: 2, r: 17}, {c: 2, r: 12}, {c: 5, r: 12}, {c: 5, r: 16}, {c: 3, r: 16}, {c: 3, r: 13}, {c: 4, r: 13}, {c: 4, r: 15}], blocked: [{c: 9, r: 19}, {c: 9, r: 18}, {c: 9, r: 17}, {c: 9, r: 16}, {c: 9, r: 15}, {c: 9, r: 14}, {c: 9, r: 13}, {c: 9, r: 12}, {c: 9, r: 7}, {c: 9, r: 5}, {c: 9, r: 4}, {c: 9, r: 3}, {c: 9, r: 2}, {c: 9, r: 1}, {c: 9, r: 0}, {c: 5, r: 11}, {c: 5, r: 10}, {c: 5, r: 9}, {c: 5, r: 8}, {c: 7, r: 8}, {c: 7, r: 9}, {c: 7, r: 11}, {c: 7, r: 10}, {c: 4, r: 8}, {c: 3, r: 8}, {c: 2, r: 8}, {c: 1, r: 8}, {c: 0, r: 8}, {c: 0, r: 11}, {c: 1, r: 11}, {c: 2, r: 11}, {c: 3, r: 11}, {c: 4, r: 11}, {c: 0, r: 0}, {c: 0, r: 19}] },
  L50: { name: "Final Apex", cols: 20, rows: 17, path: [{c: 0, r: 16}, {c: 0, r: 11}, {c: 6, r: 11}, {c: 6, r: 16}, {c: 1, r: 16}, {c: 1, r: 12}, {c: 5, r: 12}, {c: 5, r: 15}, {c: 2, r: 15}, {c: 2, r: 10}, {c: 19, r: 10}, {c: 19, r: 16}, {c: 14, r: 16}, {c: 14, r: 11}, {c: 18, r: 11}, {c: 18, r: 15}, {c: 15, r: 15}, {c: 15, r: 12}, {c: 17, r: 12}, {c: 17, r: 2}, {c: 14, r: 2}, {c: 14, r: 5}, {c: 18, r: 5}, {c: 18, r: 1}, {c: 13, r: 1}, {c: 13, r: 6}, {c: 19, r: 6}, {c: 19, r: 0}, {c: 0, r: 0}, {c: 0, r: 6}, {c: 6, r: 6}, {c: 6, r: 1}, {c: 1, r: 1}, {c: 1, r: 5}, {c: 5, r: 5}, {c: 5, r: 2}, {c: 2, r: 2}, {c: 2, r: 8}, {c: 10, r: 8}], blocked: [{c: 0, r: 10}, {c: 1, r: 10}, {c: 1, r: 9}, {c: 1, r: 8}, {c: 1, r: 7}, {c: 0, r: 7}, {c: 0, r: 8}, {c: 0, r: 9}, {c: 7, r: 16}, {c: 8, r: 16}, {c: 9, r: 16}, {c: 10, r: 16}, {c: 11, r: 16}, {c: 12, r: 16}, {c: 13, r: 16}, {c: 13, r: 15}, {c: 13, r: 14}, {c: 13, r: 13}, {c: 13, r: 12}, {c: 13, r: 11}, {c: 12, r: 11}, {c: 11, r: 11}, {c: 10, r: 11}, {c: 9, r: 11}, {c: 8, r: 11}, {c: 7, r: 11}, {c: 7, r: 12}, {c: 7, r: 13}, {c: 7, r: 14}, {c: 7, r: 15}, {c: 8, r: 15}, {c: 9, r: 15}, {c: 10, r: 15}, {c: 11, r: 15}, {c: 12, r: 15}, {c: 12, r: 14}, {c: 11, r: 14}, {c: 10, r: 14}, {c: 9, r: 14}, {c: 8, r: 14}, {c: 8, r: 13}, {c: 9, r: 13}, {c: 10, r: 13}, {c: 11, r: 13}, {c: 12, r: 12}, {c: 12, r: 13}, {c: 11, r: 12}, {c: 10, r: 12}, {c: 9, r: 12}, {c: 8, r: 12}, {c: 7, r: 1}, {c: 8, r: 1}, {c: 9, r: 1}, {c: 10, r: 1}, {c: 11, r: 1}, {c: 12, r: 1}, {c: 12, r: 2}, {c: 12, r: 3}, {c: 12, r: 4}, {c: 12, r: 5}, {c: 12, r: 6}, {c: 11, r: 6}, {c: 10, r: 6}, {c: 9, r: 6}, {c: 8, r: 6}, {c: 7, r: 6}, {c: 7, r: 5}, {c: 7, r: 4}, {c: 7, r: 3}, {c: 7, r: 2}, {c: 8, r: 2}, {c: 9, r: 2}, {c: 10, r: 2}, {c: 11, r: 2}, {c: 11, r: 3}, {c: 10, r: 3}, {c: 9, r: 3}, {c: 8, r: 3}, {c: 8, r: 4}, {c: 9, r: 4}, {c: 10, r: 4}, {c: 11, r: 4}, {c: 11, r: 5}, {c: 10, r: 5}, {c: 9, r: 5}, {c: 8, r: 5}, {c: 18, r: 9}, {c: 19, r: 9}, {c: 19, r: 8}, {c: 19, r: 7}, {c: 18, r: 7}, {c: 18, r: 8}, {c: 16, r: 9}, {c: 16, r: 8}, {c: 16, r: 7}, {c: 15, r: 7}, {c: 14, r: 7}, {c: 14, r: 8}, {c: 15, r: 8}, {c: 15, r: 9}, {c: 14, r: 9}, {c: 13, r: 9}, {c: 13, r: 8}, {c: 13, r: 7}, {c: 12, r: 7}, {c: 12, r: 8}, {c: 12, r: 9}, {c: 2, r: 9}, {c: 3, r: 7}, {c: 4, r: 7}, {c: 5, r: 7}, {c: 6, r: 7}, {c: 7, r: 7}, {c: 3, r: 9}, {c: 4, r: 9}, {c: 5, r: 9}, {c: 6, r: 9}, {c: 7, r: 9}, {c: 8, r: 9}, {c: 8, r: 7}] },
};

// Continuous difficulty scaling for the whole L11-L50 range (from when global
// upgrades unlock through to the finale), replacing the old per-sector multipliers
// that reset at each sector boundary. Applies to regular escort spawns; named boss
// units keep their own explicit HP values (see each LEVELS_DATA[10k] block) since
// those are tuned individually, but scale on the same curve.
function getLevelSpeedMult(lvl) {
  const t = Math.max(0, Math.min(1, (lvl - 11) / 39));
  return 1.0 + t * 0.35; // 1.0 at L11 -> 1.35 at L50
}
function getLevelCountBonus(lvl) {
  const t = Math.max(0, Math.min(1, (lvl - 11) / 39));
  return Math.floor(t * 6); // +0 at L11 -> +6 at L50
}

function createEnemySpawn(type, count, opts = {}) {
  const cfg = ENEMY_CONFIGS[type] || ENEMY_CONFIGS.grunt;
  const isBoss = !!opts.isBoss;
  const isMiniBoss = !!opts.isMiniBoss;
  const hpMult = opts.hpMult ?? (isBoss ? 3.5 : (isMiniBoss ? 2.0 : 1.0));
  const speedMult = opts.speedMult ?? (isBoss ? 0.72 : (isMiniBoss ? 0.85 : 1.0));
  const bountyMult = opts.bountyMult ?? (isBoss ? 4.5 : (isMiniBoss ? 2.5 : 1.0));
  const calculatedHp = opts.hp !== undefined ? opts.hp : Math.round(cfg.baseHp * hpMult);
  const calculatedSpeed = opts.speed !== undefined ? opts.speed : Math.round(cfg.baseSpeed * speedMult);
  return {
    type,
    isBoss,
    isMiniBoss,
    count,
    hp: calculatedHp,
    speed: calculatedSpeed,
    interval: opts.interval ?? (type === 'swarm' ? 0.15 : (type === 'scout' ? 0.48 : (type === 'tank' ? 1.3 : (type === 'goliath' ? 1.5 : 0.7)))),
    // Swarm only: how many SWARM_CLUMP_SIZE-unit clumps this group arrives in.
    clumps: opts.clumps,
    bounty: Math.max(1, Math.round(cfg.baseBounty * bountyMult))
  };
}

// `tune` lets a single level dial its trash mobs and its miniboss independently.
// Used by L8/L9, where the wave chaff was doing most of the killing and the
// miniboss was a pushover -- the fix is weaker mobs + a much beefier miniboss, so
// the level is won by positioning a few well-upgraded towers rather than by
// out-spamming a swarm of cheap ones.
function generateStandardLevel(lvl, mapId, wavesCount, sGold, baseHpScale, bossHpVal, bossType, tune = {}) {
  const mobHpMult = tune.mobHpMult ?? 1.0;
  const miniBossHpMult = tune.miniBossHpMult ?? 1.0;
  const wavesArr = [];
  const isBossLevel = (lvl % 10 === 0);



  for (let w = 1; w <= wavesCount; w++) {
    const isLastWave = (w === wavesCount);
    const spawns = [];
    const count = 6 + w * 2;
    const hpScale = (baseHpScale / ENEMY_CONFIGS.grunt.baseHp) * Math.pow(1.08, w - 1);
    const bountyScale = Math.max(0.45, 1 - (lvl - 1) * 0.035 - (w - 1) * 0.025);

    if (w % 2 === 0) {
      const heavyType = lvl > 40 ? 'emp_bomber' : (lvl > 30 ? 'goliath' : (lvl > 20 ? 'blinker' : (lvl > 10 ? 'swarm' : 'tank')));
      // Block 5 spec bands: Tank 1.2-1.4s, Goliath 1.4-1.6s singles; Blinker/
      // EMP Bomber have no numeric spawn-interval target, keep their prior pacing.
      const heavyInterval = heavyType === 'tank' ? 1.3 : (heavyType === 'goliath' ? 1.5 : (heavyType === 'swarm' ? 0.15 : 0.95));
      spawns.push(createEnemySpawn(heavyType, Math.max(1, Math.floor(count * 0.3)), {
        clumps: heavyType === 'swarm' ? swarmClumpsFor(lvl, w) : undefined,
        hpMult: hpScale * 2.0 * mobHpMult,
        speedMult: 1.0,
        bountyMult: bountyScale,
        interval: heavyInterval
      }));
      spawns.push(createEnemySpawn('scout', Math.floor(count * 0.5), {
        hpMult: hpScale * 0.52 * mobHpMult,
        speedMult: 1.0,
        bountyMult: bountyScale,
        interval: 0.6
      }));
    } else {
      const standardType = lvl > 40 ? (w > 4 ? 'emp_bomber' : 'goliath') : (lvl > 20 ? (w > 3 ? 'blinker' : 'grunt') : (lvl > 10 ? (w > 3 ? 'swarm' : 'grunt') : 'grunt'));
      spawns.push(createEnemySpawn(standardType, count, {
        clumps: standardType === 'swarm' ? swarmClumpsFor(lvl, w) : undefined,
        hpMult: hpScale * mobHpMult,
        speedMult: 1.0,
        bountyMult: bountyScale,
        interval: 0.65
      }));
      if (w > 2) {
        spawns.push(createEnemySpawn('scout', Math.floor(count * 0.35), {
          hpMult: hpScale * 0.5 * mobHpMult,
          speedMult: 1.0,
          bountyMult: bountyScale,
          interval: 0.65
        }));
      }
    }

    if (isLastWave) {
      if (isBossLevel) {
        const bossBase = ENEMY_CONFIGS[bossType] || ENEMY_CONFIGS.grunt;
        spawns.push({
          type: bossType,
          isBoss: true,
          isMiniBoss: false,
          count: 1,
          hp: bossHpVal,
          speed: Math.round(bossBase.baseSpeed * 0.75),
          interval: 1.2,
          bounty: Math.max(35, Math.round(bossBase.baseBounty * 5.0))
        });
      } else {
        const miniBossType = (lvl % 3 === 0) ? 'tank' : ((lvl % 2 === 0) ? 'scout' : 'grunt');
        const miniBossBase = ENEMY_CONFIGS[miniBossType] || ENEMY_CONFIGS.grunt;
        spawns.push({
          type: miniBossType,
          isBoss: false,
          isMiniBoss: true,
          count: 1,
          hp: Math.round(miniBossBase.baseHp * 2.8 * (1 + lvl * 0.08) * miniBossHpMult),
          speed: Math.round(miniBossBase.baseSpeed * 0.85),
          interval: 1.2,
          bounty: Math.max(15, Math.round(miniBossBase.baseBounty * 2.5))
        });
      }
    }

    wavesArr.push({ wave: w, spawns });
  }

  const unlockedTowers = ['gun', 'laser', 'mortar', 'tesla', 'stasis', 'melter', 'railgun'];

  return {
    mapId: mapId,
    startHp: 10,
    startGold: sGold,
    totalWaves: wavesCount,
    unlockedTowers: unlockedTowers,
    canUpgrade: true,
    waves: wavesArr
  };
}

const LEVELS_DATA = {
  "1": {
    "mapId": "L1",
    "startHp": 10,
    "startGold": 90,
    "totalWaves": 2,
    "unlockedTowers": [
      "gun"
    ],
    "canUpgrade": false,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 32,
            "speed": 50,
            "interval": 1.045,
            "bounty": 7,
            "hpMult": 0.8,
            "speedMult": 0.91,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 40,
            "speed": 50,
            "interval": 0.88,
            "bounty": 7,
            "hpMult": 1,
            "speedMult": 0.91,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "2": {
    "mapId": "L2",
    "startHp": 10,
    "startGold": 115,
    "totalWaves": 2,
    "unlockedTowers": [
      "gun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 6,
            "hp": 60,
            "hpMult": 1.5,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.75,
            "bounty": 7,
            "bountyMult": 1,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 6,
            "hp": 100,
            "hpMult": 1.5,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.75,
            "bounty": 7,
            "bountyMult": 1,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      }
    ]
  },
  "3": {
    "mapId": "L3",
    "startHp": 10,
    "startGold": 110,
    "totalWaves": 4,
    "unlockedTowers": [
      "gun",
      "laser"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 38,
            "speed": 55,
            "interval": 0.825,
            "bounty": 7,
            "speedMult": 1,
            "hpMult": 0.95,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "scout",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 24,
            "speed": 110,
            "interval": 0.6,
            "bounty": 6,
            "speedMult": 1,
            "hpMult": 1,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 40,
            "speed": 55,
            "interval": 0.825,
            "bounty": 12,
            "hpMult": 1,
            "speedMult": 1,
            "bountyMult": 1.71
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 180,
            "speed": 55,
            "interval": 1.3,
            "bounty": 54,
            "speedMult": 1,
            "hpMult": 4.5,
            "bountyMult": 3.09
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "4": {
    "mapId": "L4",
    "startHp": 10,
    "startGold": 125,
    "totalWaves": 5,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 40,
            "speed": 55,
            "interval": 0.77,
            "bounty": 7,
            "speedMult": 1,
            "hpMult": 1,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "scout",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 25,
            "speed": 110,
            "interval": 0.562,
            "bounty": 7,
            "hpMult": 1.04,
            "speedMult": 1,
            "bountyMult": 1.17
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 48,
            "speed": 55,
            "interval": 0.77,
            "bounty": 7,
            "hpMult": 1.2,
            "speedMult": 1,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 115,
            "speed": 38,
            "interval": 1.282,
            "bounty": 12,
            "speedMult": 1,
            "hpMult": 1.15,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "grunt",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 380,
            "speed": 44,
            "interval": 1.3,
            "bounty": 35,
            "speedMult": 0.8,
            "hpMult": 9.5,
            "bountyMult": 2
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "5": {
    "mapId": "L5",
    "startHp": 10,
    "startGold": 135,
    "totalWaves": 6,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 5,
            "hp": 45,
            "hpMult": 1.13,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 15,
            "bountyMult": 2.14,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 7,
            "hp": 29,
            "hpMult": 1.21,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 9,
            "bountyMult": 1.5,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 3,
            "hp": 284,
            "hpMult": 2.84,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 35,
            "bountyMult": 2.92,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 6,
            "hp": 162,
            "hpMult": 4.05,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 13,
            "bountyMult": 1.86,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 7,
            "hp": 86,
            "hpMult": 3.58,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 14,
            "bountyMult": 2.33,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 1,
            "hp": 711,
            "hpMult": 7.11,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 45,
            "bountyMult": 3.75,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 1,
            "hp": 1851,
            "hpMult": 46.28,
            "speed": 47,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 60,
            "bountyMult": 2,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "6": {
    "mapId": "L6",
    "startHp": 10,
    "startGold": 145,
    "totalWaves": 6,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 6,
            "hp": 66,
            "hpMult": 1.65,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 14,
            "bountyMult": 2,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 5,
            "hp": 207,
            "hpMult": 2.07,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 14,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 8,
            "hp": 53,
            "hpMult": 2.21,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 14,
            "bountyMult": 2.33,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 7,
            "hp": 210,
            "hpMult": 5.25,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 14,
            "bountyMult": 2,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 7,
        "spawns": [
          {
            "type": "tank",
            "count": 4,
            "hp": 499,
            "hpMult": 4.99,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 15,
            "bountyMult": 1.25,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 6,
            "hp": 225,
            "hpMult": 5.63,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 8,
            "bountyMult": 1.14,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 14,
            "hp": 130,
            "hpMult": 3.25,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.6,
            "bounty": 4,
            "bountyMult": 0.57,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 1,
            "hp": 1166,
            "hpMult": 48.58,
            "speed": 94,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 69,
            "bountyMult": 4.6,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "7": {
    "mapId": "L7",
    "startHp": 10,
    "startGold": 160,
    "totalWaves": 7,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 8,
            "hp": 25,
            "hpMult": 1.04,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 12,
            "bountyMult": 2,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 7,
            "hp": 127,
            "hpMult": 3.18,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 11,
            "bountyMult": 1.57,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 8,
            "hp": 62,
            "hpMult": 2.58,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 16,
            "bountyMult": 2.67,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 10,
            "hp": 261,
            "hpMult": 2.61,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 11,
            "bountyMult": 0.92,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 8,
            "hp": 79,
            "hpMult": 3.29,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 8,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 12,
            "hp": 123,
            "hpMult": 3.08,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 6,
            "bountyMult": 0.86,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 9,
            "hp": 107,
            "hpMult": 4.46,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "tank",
            "count": 12,
            "hp": 262,
            "hpMult": 2.62,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 7,
            "bountyMult": 0.58,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 9,
            "hp": 135,
            "hpMult": 5.63,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 9,
            "bountyMult": 1.5,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "tank",
            "count": 1,
            "hp": 5803,
            "hpMult": 58.03,
            "speed": 32,
            "speedMult": 0.84,
            "interval": 1.2,
            "bounty": 79,
            "bountyMult": 2.63,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "8": {
    "mapId": "L8",
    "startHp": 10,
    "startGold": 175,
    "totalWaves": 7,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 7,
            "hp": 73,
            "hpMult": 1.83,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 15,
            "bountyMult": 2.14,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 6,
            "hp": 222,
            "hpMult": 2.22,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 15,
            "bountyMult": 1.25,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 9,
            "hp": 64,
            "hpMult": 2.67,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 16,
            "bountyMult": 2.67,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 8,
            "hp": 222,
            "hpMult": 5.55,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 16,
            "bountyMult": 2.29,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 5,
            "hp": 411,
            "hpMult": 4.11,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 17,
            "bountyMult": 1.42,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 9,
            "hp": 75,
            "hpMult": 3.13,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 16,
            "hp": 194,
            "hpMult": 4.85,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 10,
            "bountyMult": 1.43,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 6,
            "hp": 584,
            "hpMult": 5.84,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 16,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 1,
            "hp": 3767,
            "hpMult": 94.18,
            "speed": 47,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 89,
            "bountyMult": 2.97,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "9": {
    "mapId": "L9",
    "startHp": 10,
    "startGold": 190,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 1,
            "hp": 966,
            "hpMult": 9.66,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 115,
            "bountyMult": 9.58,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 2,
            "hp": 935,
            "hpMult": 9.35,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 50,
            "bountyMult": 4.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 3,
            "hp": 849,
            "hpMult": 8.49,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 53,
            "bountyMult": 4.42,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 4,
            "hp": 990,
            "hpMult": 9.9,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 35,
            "bountyMult": 2.92,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 5,
            "hp": 596,
            "hpMult": 5.96,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 21,
            "bountyMult": 1.75,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 7,
            "hp": 298,
            "hpMult": 7.45,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 9,
            "bountyMult": 1.29,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 6,
            "hp": 650,
            "hpMult": 6.5,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 20,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 10,
            "hp": 133,
            "hpMult": 5.54,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 7,
            "hp": 719,
            "hpMult": 7.19,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 21,
            "bountyMult": 1.75,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 7,
            "hp": 475,
            "hpMult": 11.88,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 9,
            "bountyMult": 1.29,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 8,
        "delayAfter": 15,
        "spawns": [
          {
            "type": "tank",
            "count": 8,
            "hp": 654,
            "hpMult": 6.54,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 18,
            "bountyMult": 1.5,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 1,
            "hp": 2507,
            "hpMult": 104.46,
            "speed": 94,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 86,
            "bountyMult": 5.73,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "10": {
    "mapId": "L10",
    "startHp": 10,
    "startGold": 200,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 7,
            "hp": 147,
            "hpMult": 3.68,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 17,
            "bountyMult": 2.43,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 7,
            "hp": 305,
            "hpMult": 3.05,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 16,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "scout",
            "count": 10,
            "hp": 107,
            "hpMult": 4.46,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 17,
            "bountyMult": 2.83,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 7,
            "hp": 404,
            "hpMult": 4.04,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 14,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 8,
            "hp": 267,
            "hpMult": 6.68,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 7,
            "bountyMult": 1,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 6,
            "hp": 589,
            "hpMult": 5.89,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 20,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 10,
            "hp": 119,
            "hpMult": 4.96,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 6,
            "bountyMult": 1,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 7,
            "hp": 647,
            "hpMult": 6.47,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 20,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 8,
            "hp": 383,
            "hpMult": 9.58,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 8,
            "bountyMult": 1.14,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "tank",
            "count": 6,
            "hp": 924,
            "hpMult": 9.24,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 26,
            "bountyMult": 2.17,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 10,
            "hp": 190,
            "hpMult": 7.92,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 8,
        "delayAfter": 5,
        "spawns": [
          {
            "type": "grunt",
            "count": 8,
            "hp": 489,
            "hpMult": 12.23,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 15,
            "bountyMult": 2.14,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 10,
            "hp": 196,
            "hpMult": 8.17,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 4,
            "bountyMult": 0.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "tank",
            "count": 1,
            "hp": 9493,
            "hpMult": 94.93,
            "speed": 29,
            "speedMult": 0.76,
            "interval": 1.2,
            "bounty": 100,
            "bountyMult": 1.67,
            "isBoss": true,
            "isMiniBoss": false
          }
        ]
      }
    ]
  },
  "11": {
    "mapId": "L11",
    "startHp": 10,
    "startGold": 125,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 10,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "grunt",
            "count": 7,
            "hp": 75,
            "hpMult": 1.88,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 10,
            "bountyMult": 1.43,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "swarm",
            "count": 14,
            "hp": 1,
            "hpMult": 0.06,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 6,
            "bountyMult": 2,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "grunt",
            "count": 8,
            "hp": 122,
            "hpMult": 3.05,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 12,
            "bountyMult": 1.71,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "scout",
            "count": 12,
            "hp": 45,
            "hpMult": 1.88,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 10,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "grunt",
            "count": 9,
            "hp": 140,
            "hpMult": 3.5,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 10,
            "bountyMult": 1.43,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "swarm",
            "count": 18,
            "hp": 14,
            "hpMult": 0.88,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 3,
            "bountyMult": 1,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "grunt",
            "count": 10,
            "hp": 111,
            "hpMult": 2.78,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 9,
            "bountyMult": 1.29,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 12,
            "hp": 55,
            "hpMult": 2.29,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "scout",
            "count": 12,
            "hp": 96,
            "hpMult": 4,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 10,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "swarm",
            "count": 20,
            "hp": 27,
            "hpMult": 1.69,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 4,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 8,
        "delayAfter": 7,
        "earlyBonus": 20,
        "spawns": [
          {
            "type": "scout",
            "count": 12,
            "hp": 111,
            "hpMult": 4.63,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 10,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 1,
            "hp": 3572,
            "hpMult": 89.3,
            "speed": 47,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 130,
            "bountyMult": 18.57,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "12": {
    "mapId": "L12",
    "startHp": 10,
    "startGold": 135,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "delayAfter": 7,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "swarm",
            "count": 14,
            "hp": 5,
            "hpMult": 0.31,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 5,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 2,
        "delayAfter": 7,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "grunt",
            "count": 8,
            "hp": 104,
            "hpMult": 2.6,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 11,
            "bountyMult": 1.57,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 3,
        "delayAfter": 10,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "tank",
            "count": 5,
            "hp": 80,
            "hpMult": 0.8,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 21,
            "bountyMult": 1.75,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 4,
        "delayAfter": 7,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "swarm",
            "count": 18,
            "hp": 26,
            "hpMult": 1.63,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 4,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "grunt",
            "count": 15,
            "hp": 80,
            "hpMult": 2,
            "speed": 55,
            "speedMult": 1,
            "interval": 0.65,
            "bounty": 6,
            "bountyMult": 0.86,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 5,
        "delayAfter": 7,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "scout",
            "count": 12,
            "hp": 80,
            "hpMult": 3.33,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 7,
            "bountyMult": 1.17,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 6,
        "delayAfter": 15,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "swarm",
            "count": 20,
            "hp": 40,
            "hpMult": 2.5,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 4,
            "bountyMult": 1.33,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "tank",
            "count": 6,
            "hp": 544,
            "hpMult": 5.44,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 18,
            "bountyMult": 1.5,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 7,
        "delayAfter": 15,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "scout",
            "count": 12,
            "hp": 185,
            "hpMult": 7.71,
            "speed": 110,
            "speedMult": 1,
            "interval": 0.55,
            "bounty": 9,
            "bountyMult": 1.5,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "tank",
            "count": 6,
            "hp": 798,
            "hpMult": 7.98,
            "speed": 38,
            "speedMult": 1,
            "interval": 1.3,
            "bounty": 20,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          }
        ]
      },
      {
        "wave": 8,
        "delayAfter": 7,
        "earlyBonus": 25,
        "spawns": [
          {
            "type": "swarm",
            "count": 20,
            "hp": 93,
            "hpMult": 5.81,
            "speed": 170,
            "speedMult": 1,
            "interval": 0.045,
            "clumps": 2,
            "bounty": 5,
            "bountyMult": 1.67,
            "isBoss": false,
            "isMiniBoss": false
          },
          {
            "type": "scout",
            "count": 1,
            "hp": 3763,
            "hpMult": 156.79,
            "speed": 94,
            "speedMult": 0.85,
            "interval": 1.2,
            "bounty": 180,
            "bountyMult": 30,
            "isBoss": false,
            "isMiniBoss": true
          }
        ]
      }
    ]
  },
  "13": {
    "mapId": "L13",
    "startHp": 10,
    "startGold": 145,
    "totalWaves": 8,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 10, "earlyBonus": 25, "spawns": [
        { "type": "tank", "count": 4, "hp": 363, "hpMult": 3.63, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 20, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "swarm", "count": 16, "hp": 13, "hpMult": 0.81, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "tank", "count": 5, "hp": 216, "hpMult": 2.16, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 13, "bountyMult": 1.08, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 11, "hp": 60, "hpMult": 2.5, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 5, "bountyMult": 0.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 10, "earlyBonus": 25, "spawns": [
        { "type": "tank", "count": 5, "hp": 239, "hpMult": 2.39, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 17, "bountyMult": 1.42, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 18, "hp": 26, "hpMult": 1.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 3, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "grunt", "count": 10, "hp": 244, "hpMult": 6.1, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 8, "bountyMult": 1.14, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 536, "hpMult": 5.36, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 16, "bountyMult": 1.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 10, "earlyBonus": 25, "spawns": [
        { "type": "grunt", "count": 11, "hp": 224, "hpMult": 5.6, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 9, "bountyMult": 1.29, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 572, "hpMult": 5.72, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 19, "bountyMult": 1.58, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "grunt", "count": 11, "hp": 361, "hpMult": 9.03, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 912, "hpMult": 9.12, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "tank", "count": 7, "hp": 865, "hpMult": 8.65, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 20, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 6638, "hpMult": 66.38, "speed": 32, "speedMult": 0.84, "interval": 1.2, "bounty": 175, "bountyMult": 14.58, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "14": {
    "mapId": "L14",
    "startHp": 10,
    "startGold": 155,
    "totalWaves": 8,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "grunt", "count": 8, "hp": 121, "hpMult": 3.03, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 10, "earlyBonus": 30, "spawns": [
        { "type": "grunt", "count": 10, "hp": 56, "hpMult": 1.4, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 5, "bountyMult": 0.71, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 5, "hp": 159, "hpMult": 1.59, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 11, "bountyMult": 0.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "scout", "count": 24, "hp": 44, "hpMult": 1.83, "speed": 110, "speedMult": 1.0, "interval": 0.5, "bounty": 5, "bountyMult": 0.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "tank", "count": 6, "hp": 225, "hpMult": 2.25, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 15, "bountyMult": 1.25, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 11, "hp": 127, "hpMult": 3.18, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 6, "bountyMult": 0.86, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "scout", "count": 26, "hp": 84, "hpMult": 3.5, "speed": 110, "speedMult": 1.0, "interval": 0.5, "bounty": 7, "bountyMult": 1.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 10, "earlyBonus": 30, "spawns": [
        { "type": "grunt", "count": 11, "hp": 225, "hpMult": 5.63, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 9, "bountyMult": 1.29, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 539, "hpMult": 5.39, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "tank", "count": 7, "hp": 771, "hpMult": 7.71, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 11, "hp": 308, "hpMult": 7.7, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 12, "bountyMult": 1.71, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "grunt", "count": 12, "hp": 386, "hpMult": 9.65, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 12, "bountyMult": 1.71, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 6970, "hpMult": 174.25, "speed": 47, "speedMult": 0.85, "interval": 1.2, "bounty": 206, "bountyMult": 29.43, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "15": {
    "mapId": "L15",
    "startHp": 10,
    "startGold": 170,
    "totalWaves": 8,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "swarm", "count": 16, "hp": 48, "hpMult": 3.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "scout", "count": 13, "hp": 70, "hpMult": 2.92, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 9, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "swarm", "count": 18, "hp": 90, "hpMult": 5.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "scout", "count": 14, "hp": 140, "hpMult": 5.83, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 13, "bountyMult": 2.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "swarm", "count": 22, "hp": 150, "hpMult": 9.38, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 10, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "scout", "count": 15, "hp": 229, "hpMult": 9.54, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 18, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "swarm", "count": 24, "hp": 195, "hpMult": 12.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 13, "bountyMult": 4.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 30, "spawns": [
        { "type": "swarm", "count": 24, "hp": 152, "hpMult": 9.5, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 6569, "hpMult": 273.71, "speed": 94, "speedMult": 0.85, "interval": 1.2, "bounty": 198, "bountyMult": 33.0, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "16": {
    "mapId": "L16",
    "startHp": 10,
    "startGold": 185,
    "totalWaves": 9,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "swarm", "count": 16, "hp": 23, "hpMult": 1.44, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 20, "earlyBonus": 35, "spawns": [
        { "type": "grunt", "count": 11, "hp": 104, "hpMult": 2.6, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 5, "bountyMult": 0.71, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 5, "hp": 225, "hpMult": 2.25, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 13, "bountyMult": 1.08, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "scout", "count": 13, "hp": 135, "hpMult": 5.63, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 11, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "grunt", "count": 12, "hp": 192, "hpMult": 4.8, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 8, "bountyMult": 1.14, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 489, "hpMult": 4.89, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 15, "bountyMult": 1.25, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "swarm", "count": 22, "hp": 153, "hpMult": 9.56, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 11, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 20, "earlyBonus": 35, "spawns": [
        { "type": "tank", "count": 7, "hp": 505, "hpMult": 5.05, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 12, "hp": 326, "hpMult": 8.15, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "scout", "count": 14, "hp": 383, "hpMult": 15.96, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 25, "bountyMult": 4.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "tank", "count": 8, "hp": 1069, "hpMult": 10.69, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 26, "bountyMult": 2.17, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 13, "hp": 505, "hpMult": 12.63, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 16, "bountyMult": 2.29, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 14, "earlyBonus": 35, "spawns": [
        { "type": "swarm", "count": 24, "hp": 217, "hpMult": 13.56, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 16280, "hpMult": 162.8, "speed": 32, "speedMult": 0.84, "interval": 1.2, "bounty": 293, "bountyMult": 24.42, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "17": {
    "mapId": "L17",
    "startHp": 10,
    "startGold": 200,
    "totalWaves": 9,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 24, "earlyBonus": 40, "spawns": [
        { "type": "swarm", "count": 16, "hp": 12, "hpMult": 0.75, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "scout", "count": 14, "hp": 44, "hpMult": 1.83, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 5, "bountyMult": 0.83, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 18, "hp": 13, "hpMult": 0.81, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 3, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "scout", "count": 13, "hp": 88, "hpMult": 3.67, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 7, "bountyMult": 1.17, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 20, "hp": 53, "hpMult": 3.31, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 4, "bountyMult": 1.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 20, "earlyBonus": 40, "spawns": [
        { "type": "grunt", "count": 12, "hp": 188, "hpMult": 4.7, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 9, "bountyMult": 1.29, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 361, "hpMult": 3.61, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 17, "bountyMult": 1.42, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "scout", "count": 14, "hp": 178, "hpMult": 7.42, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 11, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 22, "hp": 80, "hpMult": 5.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "scout", "count": 16, "hp": 147, "hpMult": 6.13, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 12, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 24, "hp": 67, "hpMult": 4.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 20, "earlyBonus": 40, "spawns": [
        { "type": "grunt", "count": 13, "hp": 546, "hpMult": 13.65, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 13, "bountyMult": 1.86, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 7, "hp": 899, "hpMult": 8.99, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 31, "bountyMult": 2.58, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "grunt", "count": 14, "hp": 536, "hpMult": 13.4, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 15, "bountyMult": 2.14, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 8, "hp": 864, "hpMult": 8.64, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 31, "bountyMult": 2.58, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 14, "earlyBonus": 40, "spawns": [
        { "type": "scout", "count": 16, "hp": 362, "hpMult": 15.08, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 26, "hp": 234, "hpMult": 14.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 15066, "hpMult": 376.65, "speed": 47, "speedMult": 0.85, "interval": 1.2, "bounty": 250, "bountyMult": 35.71, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "18": {
    "mapId": "L18",
    "startHp": 10,
    "startGold": 110,
    "totalWaves": 9,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "swarm", "count": 16, "hp": 16, "hpMult": 1.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 3, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "grunt", "count": 12, "hp": 46, "hpMult": 1.15, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 148, "hpMult": 1.48, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "scout", "count": 14, "hp": 54, "hpMult": 2.25, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 7, "bountyMult": 1.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 20, "earlyBonus": 15, "spawns": [
        { "type": "grunt", "count": 13, "hp": 47, "hpMult": 1.18, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 179, "hpMult": 1.79, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "swarm", "count": 22, "hp": 16, "hpMult": 1.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 20, "earlyBonus": 15, "spawns": [
        { "type": "tank", "count": 7, "hp": 141, "hpMult": 1.41, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 14, "hp": 78, "hpMult": 1.95, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "scout", "count": 16, "hp": 84, "hpMult": 3.5, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 6, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "swarm", "count": 26, "hp": 58, "hpMult": 3.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 14, "earlyBonus": 15, "spawns": [
        { "type": "tank", "count": 8, "hp": 364, "hpMult": 3.64, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 15, "bountyMult": 1.25, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 1840, "hpMult": 76.67, "speed": 94, "speedMult": 0.85, "interval": 1.2, "bounty": 180, "bountyMult": 30.0, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "19": {
    "mapId": "L19",
    "startHp": 10,
    "startGold": 230,
    "totalWaves": 10,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 1, "hp": 2742, "hpMult": 27.42, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 110, "bountyMult": 9.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 2, "hp": 1626, "hpMult": 16.26, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 73, "bountyMult": 6.08, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 3, "hp": 2301, "hpMult": 23.01, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 62, "bountyMult": 5.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 4, "hp": 1700, "hpMult": 17.0, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 59, "bountyMult": 4.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 5, "hp": 2504, "hpMult": 25.04, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 59, "bountyMult": 4.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 6, "hp": 2307, "hpMult": 23.07, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 61, "bountyMult": 5.08, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 7, "hp": 3216, "hpMult": 32.16, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 64, "bountyMult": 5.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 8, "hp": 2542, "hpMult": 25.42, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 66, "bountyMult": 5.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 20, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 9, "hp": 3629, "hpMult": 36.29, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 69, "bountyMult": 5.75, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 14, "earlyBonus": 45, "spawns": [
        { "type": "tank", "count": 10, "hp": 1990, "hpMult": 19.9, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 35, "bountyMult": 2.92, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 29844, "hpMult": 298.44, "speed": 32, "speedMult": 0.84, "interval": 1.2, "bounty": 370, "bountyMult": 30.83, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "20": {
    "mapId": "L20",
    "startHp": 10,
    "startGold": 250,
    "totalWaves": 10,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 24, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 18, "hp": 65, "hpMult": 4.06, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 2, "bountyMult": 0.67, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 72, "hpMult": 0.72, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 13, "bountyMult": 1.08, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 20, "hp": 62, "hpMult": 3.88, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 3, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 13, "hp": 24, "hpMult": 0.6, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 7, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 20, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 20, "hp": 94, "hpMult": 5.88, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 4, "bountyMult": 1.33, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 7, "hp": 169, "hpMult": 1.69, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 17, "bountyMult": 1.42, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 22, "hp": 83, "hpMult": 5.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 4, "bountyMult": 1.33, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 14, "hp": 56, "hpMult": 1.4, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 12, "bountyMult": 1.71, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 22, "hp": 115, "hpMult": 7.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 4, "bountyMult": 1.33, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 7, "hp": 296, "hpMult": 2.96, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 17, "bountyMult": 1.42, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 20, "hp": 116, "hpMult": 7.25, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 14, "hp": 110, "hpMult": 2.75, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 7, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 20, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 24, "hp": 139, "hpMult": 8.69, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 8, "hp": 476, "hpMult": 4.76, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 22, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 26, "hp": 148, "hpMult": 9.25, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 15, "hp": 257, "hpMult": 6.43, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 14, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 20, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 26, "hp": 202, "hpMult": 12.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 9, "hp": 583, "hpMult": 5.83, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 24, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 14, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 18, "hp": 300, "hpMult": 12.5, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 28, "hp": 300, "hpMult": 18.75, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 9, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "hive_empress", "count": 1, "hp": 29840, "hpMult": 13.56, "speed": 38, "speedMult": 1.0, "interval": 1.2, "bounty": 400, "bountyMult": 6.67, "isBoss": true, "isMiniBoss": false }
      ]}
    ]
  },
  "21": {
    "mapId": "L21",
    "startHp": 10,
    "startGold": 160,
    "totalWaves": 9,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "grunt", "count": 8, "hp": 138, "hpMult": 3.45, "speed": 55, "speedMult": 1.0, "interval": 0.66, "bounty": 14, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "blinker", "count": 2, "hp": 360, "hpMult": 5.54, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 50, "bountyMult": 6.25, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 14, "hp": 13, "hpMult": 0.81, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 2, "bountyMult": 0.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "grunt", "count": 9, "hp": 178, "hpMult": 4.45, "speed": 55, "speedMult": 1.0, "interval": 0.66, "bounty": 16, "bountyMult": 2.29, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 10, "hp": 120, "hpMult": 5.0, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 17, "bountyMult": 2.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "blinker", "count": 2, "hp": 800, "hpMult": 12.31, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 70, "bountyMult": 8.75, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 9, "hp": 78, "hpMult": 1.95, "speed": 55, "speedMult": 1.0, "interval": 0.66, "bounty": 7, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "blinker", "count": 2, "hp": 1000, "hpMult": 15.38, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 72, "bountyMult": 9.0, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 11, "hp": 118, "hpMult": 4.92, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 9, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 16, "hp": 137, "hpMult": 8.56, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 9, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 3, "hp": 733, "hpMult": 11.28, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 49, "bountyMult": 6.13, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 11, "hp": 380, "hpMult": 15.83, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 22, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 16, "hp": 112, "hpMult": 7.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 7, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "blinker", "count": 3, "hp": 1166, "hpMult": 17.94, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 60, "bountyMult": 7.5, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 7500, "hpMult": 115.38, "speed": 53, "speedMult": 0.85, "interval": 1.2, "bounty": 240, "bountyMult": 30.0, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "22": {
    "mapId": "L22",
    "startHp": 10,
    "startGold": 170,
    "totalWaves": 9,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 11, "hp": 85, "hpMult": 3.54, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 15, "hp": 55, "hpMult": 3.44, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 9, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "blinker", "count": 3, "hp": 480, "hpMult": 7.38, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 52, "bountyMult": 6.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 11, "hp": 120, "hpMult": 5.0, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 15, "hp": 58, "hpMult": 3.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 12, "hp": 175, "hpMult": 7.29, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 13, "bountyMult": 2.17, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 2, "hp": 450, "hpMult": 6.92, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 32, "bountyMult": 4.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 18, "hp": 115, "hpMult": 7.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 12, "hp": 170, "hpMult": 7.08, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 13, "hp": 260, "hpMult": 10.83, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 15, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 3, "hp": 750, "hpMult": 11.54, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 42, "bountyMult": 5.25, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "swarm", "count": 20, "hp": 210, "hpMult": 13.13, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 14, "bountyMult": 4.67, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 3, "hp": 600, "hpMult": 9.23, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 35, "bountyMult": 4.38, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 7, "earlyBonus": 50, "spawns": [
        { "type": "scout", "count": 14, "hp": 310, "hpMult": 12.92, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 15, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 6200, "hpMult": 258.33, "speed": 94, "speedMult": 0.85, "interval": 1.2, "bounty": 255, "bountyMult": 42.5, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "23": {
    "mapId": "L23",
    "startHp": 10,
    "startGold": 185,
    "totalWaves": 10,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 4, "hp": 380, "hpMult": 3.8, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 30, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "grunt", "count": 10, "hp": 155, "hpMult": 3.88, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 14, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 5, "hp": 290, "hpMult": 2.9, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 8, "hp": 75, "hpMult": 1.88, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 6, "bountyMult": 0.86, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "blinker", "count": 3, "hp": 650, "hpMult": 10.0, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 65, "bountyMult": 8.13, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 6, "hp": 380, "hpMult": 3.8, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 25, "bountyMult": 2.08, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 2, "hp": 550, "hpMult": 8.46, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 42, "bountyMult": 5.25, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 6, "hp": 460, "hpMult": 4.6, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 28, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 10, "hp": 180, "hpMult": 4.5, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "blinker", "count": 3, "hp": 850, "hpMult": 13.08, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 55, "bountyMult": 6.88, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 580, "hpMult": 5.8, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 28, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 7, "hp": 720, "hpMult": 7.2, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 38, "bountyMult": 3.17, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 3, "hp": 720, "hpMult": 11.08, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 44, "bountyMult": 5.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "grunt", "count": 11, "hp": 340, "hpMult": 8.5, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 18, "bountyMult": 2.57, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 8, "hp": 920, "hpMult": 9.2, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 35, "bountyMult": 2.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 8, "hp": 1100, "hpMult": 11.0, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 35, "bountyMult": 2.92, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 9500, "hpMult": 95.0, "speed": 32, "speedMult": 0.84, "interval": 1.2, "bounty": 290, "bountyMult": 24.17, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "24": {
    "mapId": "L24",
    "startHp": 10,
    "startGold": 200,
    "totalWaves": 10,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "grunt", "count": 11, "hp": 150, "hpMult": 3.75, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 5, "hp": 380, "hpMult": 3.8, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 29, "bountyMult": 2.42, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "blinker", "count": 2, "hp": 780, "hpMult": 12.0, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 60, "bountyMult": 7.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 16, "hp": 26, "hpMult": 1.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 3, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 6, "hp": 410, "hpMult": 4.1, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 22, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 11, "hp": 150, "hpMult": 3.75, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 7, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "scout", "count": 13, "hp": 220, "hpMult": 9.17, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 19, "bountyMult": 3.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "blinker", "count": 3, "hp": 850, "hpMult": 13.08, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 60, "bountyMult": 7.5, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 13, "hp": 160, "hpMult": 6.67, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 9, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 10, "earlyBonus": 55, "spawns": [
        { "type": "tank", "count": 7, "hp": 680, "hpMult": 6.8, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 35, "bountyMult": 2.92, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 2, "hp": 750, "hpMult": 11.54, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 57, "bountyMult": 7.13, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "swarm", "count": 22, "hp": 165, "hpMult": 10.31, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 19, "bountyMult": 6.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "blinker", "count": 3, "hp": 1300, "hpMult": 20.0, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 95, "bountyMult": 11.88, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 12, "hp": 380, "hpMult": 9.5, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 19, "bountyMult": 2.71, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 7, "earlyBonus": 55, "spawns": [
        { "type": "grunt", "count": 14, "hp": 480, "hpMult": 12.0, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 22, "bountyMult": 3.14, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 11200, "hpMult": 280.0, "speed": 47, "speedMult": 0.85, "interval": 1.2, "bounty": 302, "bountyMult": 43.14, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "25": {
    "mapId": "L25",
    "startHp": 10,
    "startGold": 215,
    "totalWaves": 10,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 60, "spawns": [
        { "type": "grunt", "count": 12, "hp": 150, "hpMult": 3.75, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 60, "spawns": [
        { "type": "blinker", "count": 3, "hp": 800, "hpMult": 12.31, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 52, "bountyMult": 6.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 60, "spawns": [
        { "type": "scout", "count": 14, "hp": 150, "hpMult": 6.25, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 13, "bountyMult": 2.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 60, "spawns": [
        { "type": "swarm", "count": 20, "hp": 160, "hpMult": 10.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 11, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 10, "earlyBonus": 60, "spawns": [
        { "type": "tank", "count": 9, "hp": 722, "hpMult": 7.22, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 30, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 7, "earlyBonus": 60, "spawns": [
        { "type": "blinker", "count": 3, "hp": 1166, "hpMult": 17.94, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 65, "bountyMult": 8.13, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 13, "hp": 177, "hpMult": 4.43, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 7, "earlyBonus": 60, "spawns": [
        { "type": "scout", "count": 15, "hp": 320, "hpMult": 13.33, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 16, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 22, "hp": 145, "hpMult": 9.06, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 7, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 10, "earlyBonus": 60, "spawns": [
        { "type": "tank", "count": 9, "hp": 933, "hpMult": 9.33, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 36, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 4, "hp": 900, "hpMult": 13.85, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 35, "bountyMult": 4.38, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 7, "earlyBonus": 60, "spawns": [
        { "type": "blinker", "count": 4, "hp": 1875, "hpMult": 28.85, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 70, "bountyMult": 8.75, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 24, "hp": 312, "hpMult": 19.5, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 11, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 7, "earlyBonus": 60, "spawns": [
        { "type": "blinker", "count": 4, "hp": 1625, "hpMult": 25.0, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 75, "bountyMult": 9.38, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 16000, "hpMult": 246.15, "speed": 53, "speedMult": 0.85, "interval": 1.2, "bounty": 360, "bountyMult": 45.0, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "26": {
    "mapId": "L26",
    "startHp": 10,
    "startGold": 235,
    "totalWaves": 11,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 18, "hp": 48, "hpMult": 3.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 7, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "scout", "count": 15, "hp": 85, "hpMult": 3.54, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 11, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 22, "hp": 80, "hpMult": 5.0, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 10, "hp": 85, "hpMult": 3.54, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 6, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 24, "hp": 110, "hpMult": 6.88, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 10, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "scout", "count": 16, "hp": 180, "hpMult": 7.5, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 11, "bountyMult": 1.83, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 22, "hp": 90, "hpMult": 5.63, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 5, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "blinker", "count": 4, "hp": 650, "hpMult": 10.0, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 50, "bountyMult": 6.25, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 24, "hp": 120, "hpMult": 7.5, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "scout", "count": 18, "hp": 280, "hpMult": 11.67, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 23, "bountyMult": 3.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 26, "hp": 190, "hpMult": 11.88, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 11, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 16, "hp": 210, "hpMult": 8.75, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 13, "bountyMult": 2.17, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 30, "hp": 280, "hpMult": 17.5, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 20, "bountyMult": 6.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "scout", "count": 20, "hp": 390, "hpMult": 16.25, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 20, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 30, "hp": 260, "hpMult": 16.25, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 10, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 11, "delayAfter": 7, "earlyBonus": 65, "spawns": [
        { "type": "swarm", "count": 30, "hp": 340, "hpMult": 21.25, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 15, "bountyMult": 5.0, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 13500, "hpMult": 562.5, "speed": 94, "speedMult": 0.85, "interval": 1.2, "bounty": 375, "bountyMult": 62.5, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "27": {
    "mapId": "L27",
    "startHp": 10,
    "startGold": 255,
    "totalWaves": 11,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 140, "hpMult": 5.83, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 140, "hpMult": 5.83, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 140, "hpMult": 5.83, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 140, "hpMult": 5.83, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 140, "hpMult": 5.83, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 140, "hpMult": 5.83, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.45, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 1, "hp": 140, "hpMult": 5.83, "speed": 55, "speedMult": 0.5, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 400, "hpMult": 4.0, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 400, "hpMult": 4.0, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 400, "hpMult": 4.0, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 400, "hpMult": 4.0, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 400, "hpMult": 4.0, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 1, "hp": 200, "hpMult": 5.0, "speed": 55, "speedMult": 1.0, "interval": 0.5, "bounty": 10, "bountyMult": 1.43, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 400, "hpMult": 4.0, "speed": 55, "speedMult": 1.45, "interval": 0.5, "bounty": 20, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 70, "spawns": [
        { "type": "swarm", "count": 1, "hp": 80, "hpMult": 5.0, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 445, "hpMult": 6.85, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 80, "hpMult": 5.0, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 445, "hpMult": 6.85, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 80, "hpMult": 5.0, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 445, "hpMult": 6.85, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 80, "hpMult": 5.0, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 445, "hpMult": 6.85, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 80, "hpMult": 5.0, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 445, "hpMult": 6.85, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 80, "hpMult": 5.0, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 445, "hpMult": 6.85, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 80, "hpMult": 5.0, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 445, "hpMult": 6.85, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 1, "hp": 80, "hpMult": 5.0, "speed": 62, "speedMult": 0.36, "interval": 0.45, "bounty": 6, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 445, "hpMult": 6.85, "speed": 62, "speedMult": 1.0, "interval": 0.45, "bounty": 23, "bountyMult": 2.88, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 70, "spawns": [
        { "type": "grunt", "count": 5, "hp": 250, "hpMult": 6.25, "speed": 65, "speedMult": 1.18, "interval": 0.45, "bounty": 12, "bountyMult": 1.71, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 5, "hp": 190, "hpMult": 7.92, "speed": 65, "speedMult": 0.59, "interval": 0.45, "bounty": 15, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 5, "hp": 720, "hpMult": 7.2, "speed": 65, "speedMult": 1.71, "interval": 0.45, "bounty": 23, "bountyMult": 1.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "blinker", "count": 10, "hp": 550, "hpMult": 8.46, "speed": 68, "speedMult": 1.1, "interval": 0.45, "bounty": 20, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 5, "hp": 240, "hpMult": 6.0, "speed": 68, "speedMult": 1.24, "interval": 0.45, "bounty": 11, "bountyMult": 1.57, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 5, "hp": 160, "hpMult": 6.67, "speed": 68, "speedMult": 0.62, "interval": 0.45, "bounty": 10, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "swarm", "count": 12, "hp": 150, "hpMult": 9.38, "speed": 72, "speedMult": 0.42, "interval": 0.4, "bounty": 9, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 6, "hp": 330, "hpMult": 13.75, "speed": 72, "speedMult": 0.65, "interval": 0.4, "bounty": 22, "bountyMult": 3.67, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 6, "hp": 1000, "hpMult": 10.0, "speed": 72, "speedMult": 1.89, "interval": 0.4, "bounty": 21, "bountyMult": 1.75, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "tank", "count": 8, "hp": 1000, "hpMult": 10.0, "speed": 65, "speedMult": 1.71, "interval": 0.45, "bounty": 30, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 8, "hp": 560, "hpMult": 8.62, "speed": 65, "speedMult": 1.05, "interval": 0.45, "bounty": 25, "bountyMult": 3.13, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "grunt", "count": 6, "hp": 350, "hpMult": 8.75, "speed": 76, "speedMult": 1.38, "interval": 0.4, "bounty": 18, "bountyMult": 2.57, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 6, "hp": 250, "hpMult": 10.42, "speed": 76, "speedMult": 0.69, "interval": 0.4, "bounty": 18, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 6, "hp": 180, "hpMult": 11.25, "speed": 76, "speedMult": 0.45, "interval": 0.4, "bounty": 12, "bountyMult": 4.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 6, "hp": 1720, "hpMult": 26.46, "speed": 76, "speedMult": 1.23, "interval": 0.4, "bounty": 40, "bountyMult": 5.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "tank", "count": 6, "hp": 1400, "hpMult": 14.0, "speed": 78, "speedMult": 2.05, "interval": 0.4, "bounty": 40, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 6, "hp": 350, "hpMult": 14.58, "speed": 78, "speedMult": 0.71, "interval": 0.4, "bounty": 20, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 6, "hp": 1100, "hpMult": 16.92, "speed": 78, "speedMult": 1.26, "interval": 0.4, "bounty": 35, "bountyMult": 4.38, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 6, "hp": 230, "hpMult": 14.38, "speed": 78, "speedMult": 0.46, "interval": 0.4, "bounty": 10, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 10, "earlyBonus": 70, "spawns": [
        { "type": "tank", "count": 5, "hp": 1800, "hpMult": 18.0, "speed": 82, "speedMult": 2.16, "interval": 0.38, "bounty": 50, "bountyMult": 4.17, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 5, "hp": 1200, "hpMult": 18.46, "speed": 82, "speedMult": 1.32, "interval": 0.38, "bounty": 40, "bountyMult": 5.0, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 5, "hp": 500, "hpMult": 12.5, "speed": 82, "speedMult": 1.49, "interval": 0.38, "bounty": 25, "bountyMult": 3.57, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 5, "hp": 400, "hpMult": 16.67, "speed": 82, "speedMult": 0.75, "interval": 0.38, "bounty": 20, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 5, "hp": 300, "hpMult": 18.75, "speed": 82, "speedMult": 0.48, "interval": 0.38, "bounty": 14, "bountyMult": 4.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 11, "delayAfter": 7, "earlyBonus": 70, "spawns": [
        { "type": "tank", "count": 6, "hp": 600, "hpMult": 6.0, "speed": 85, "speedMult": 2.24, "interval": 0.35, "bounty": 30, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 6, "hp": 500, "hpMult": 7.69, "speed": 85, "speedMult": 1.37, "interval": 0.35, "bounty": 25, "bountyMult": 3.13, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 6, "hp": 450, "hpMult": 18.75, "speed": 85, "speedMult": 0.77, "interval": 0.35, "bounty": 25, "bountyMult": 4.17, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 6, "hp": 450, "hpMult": 28.13, "speed": 85, "speedMult": 0.5, "interval": 0.35, "bounty": 15, "bountyMult": 5.0, "isBoss": false, "isMiniBoss": false },
        { "type": "hive_empress", "count": 1, "hp": 20000, "hpMult": 9.09, "speed": 40, "speedMult": 1.05, "interval": 1.2, "bounty": 260, "bountyMult": 4.33, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "28": {
    "mapId": "L28",
    "startHp": 10,
    "startGold": 135,
    "totalWaves": 11,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "swarm", "count": 18, "hp": 40, "hpMult": 2.5, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 2, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "grunt", "count": 14, "hp": 90, "hpMult": 2.25, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 2, "hp": 260, "hpMult": 4.0, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "scout", "count": 16, "hp": 95, "hpMult": 3.96, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 14, "bountyMult": 2.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 10, "earlyBonus": 25, "spawns": [
        { "type": "tank", "count": 8, "hp": 280, "hpMult": 2.8, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 3, "hp": 340, "hpMult": 5.23, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "swarm", "count": 24, "hp": 115, "hpMult": 7.19, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 14, "bountyMult": 4.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "blinker", "count": 4, "hp": 480, "hpMult": 7.38, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 15, "hp": 110, "hpMult": 4.58, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 10, "earlyBonus": 25, "spawns": [
        { "type": "grunt", "count": 16, "hp": 220, "hpMult": 5.5, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 15, "bountyMult": 2.14, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 8, "hp": 520, "hpMult": 5.2, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 30, "bountyMult": 2.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "swarm", "count": 28, "hp": 175, "hpMult": 10.94, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 20, "bountyMult": 6.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "blinker", "count": 4, "hp": 900, "hpMult": 13.85, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 15, "hp": 280, "hpMult": 7.0, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 0, "bountyMult": 0.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "scout", "count": 20, "hp": 480, "hpMult": 20.0, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 40, "bountyMult": 6.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 11, "delayAfter": 7, "earlyBonus": 25, "spawns": [
        { "type": "blinker", "count": 5, "hp": 1600, "hpMult": 24.62, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 75, "bountyMult": 9.38, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 1, "hp": 19500, "hpMult": 300.0, "speed": 53, "speedMult": 0.85, "interval": 1.2, "bounty": 560, "bountyMult": 70.0, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "29": {
    "mapId": "L29",
    "startHp": 10,
    "startGold": 295,
    "totalWaves": 12,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 1, "hp": 3500, "hpMult": 35.0, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 155, "bountyMult": 12.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 2, "hp": 2400, "hpMult": 24.0, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 95, "bountyMult": 7.92, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 3, "hp": 2066, "hpMult": 20.66, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 77, "bountyMult": 6.42, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 4, "hp": 1950, "hpMult": 19.5, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 70, "bountyMult": 5.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 5, "hp": 1920, "hpMult": 19.2, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 68, "bountyMult": 5.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 6, "hp": 1333, "hpMult": 13.33, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 45, "bountyMult": 3.75, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 4, "hp": 875, "hpMult": 13.46, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 35, "bountyMult": 4.38, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 7, "hp": 2000, "hpMult": 20.0, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 70, "bountyMult": 5.83, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 8, "hp": 1375, "hpMult": 13.75, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 45, "bountyMult": 3.75, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 4, "hp": 1250, "hpMult": 19.23, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 55, "bountyMult": 6.88, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 9, "hp": 2111, "hpMult": 21.11, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 76, "bountyMult": 6.33, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 10, "hp": 2250, "hpMult": 22.5, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 80, "bountyMult": 6.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 11, "delayAfter": 20, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 11, "hp": 1636, "hpMult": 16.36, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 55, "bountyMult": 4.58, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 5, "hp": 1600, "hpMult": 24.62, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 63, "bountyMult": 7.88, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 12, "delayAfter": 14, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 12, "hp": 1166, "hpMult": 11.66, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 45, "bountyMult": 3.75, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 1, "hp": 24000, "hpMult": 240.0, "speed": 32, "speedMult": 0.84, "interval": 1.2, "bounty": 520, "bountyMult": 43.33, "isBoss": false, "isMiniBoss": true }
      ]}
    ]
  },
  "30": {
    "mapId": "L30",
    "startHp": 10,
    "startGold": 320,
    "totalWaves": 12,
    "unlockedTowers": ["gun", "laser", "mortar", "tesla", "stasis"],
    "canUpgrade": true,
    "waves": [
      { "wave": 1, "delayAfter": 7, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 5, "hp": 576, "hpMult": 8.86, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 27, "bountyMult": 3.38, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 24, "hp": 30, "hpMult": 1.88, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 2, "bountyMult": 0.67, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 2, "delayAfter": 7, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 5, "hp": 700, "hpMult": 10.77, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 30, "bountyMult": 3.75, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 14, "hp": 107, "hpMult": 2.68, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 5, "bountyMult": 0.71, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 3, "delayAfter": 10, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 9, "hp": 528, "hpMult": 5.28, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 20, "bountyMult": 1.67, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 4, "hp": 510, "hpMult": 7.85, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 19, "bountyMult": 2.38, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 4, "delayAfter": 7, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 5, "hp": 1232, "hpMult": 18.95, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 43, "bountyMult": 5.38, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 16, "hp": 165, "hpMult": 6.88, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 6, "bountyMult": 1.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 5, "delayAfter": 7, "earlyBonus": 75, "spawns": [
        { "type": "swarm", "count": 30, "hp": 230, "hpMult": 14.38, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 8, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 6, "hp": 766, "hpMult": 11.78, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 23, "bountyMult": 2.88, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 6, "delayAfter": 10, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 6, "hp": 1450, "hpMult": 22.31, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 45, "bountyMult": 5.63, "isBoss": false, "isMiniBoss": false },
        { "type": "tank", "count": 10, "hp": 580, "hpMult": 5.8, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 18, "bountyMult": 1.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 7, "delayAfter": 7, "earlyBonus": 75, "spawns": [
        { "type": "scout", "count": 18, "hp": 600, "hpMult": 25.0, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 18, "bountyMult": 3.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 6, "hp": 1200, "hpMult": 18.46, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 36, "bountyMult": 4.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 8, "delayAfter": 7, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 7, "hp": 1928, "hpMult": 29.66, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 55, "bountyMult": 6.88, "isBoss": false, "isMiniBoss": false },
        { "type": "grunt", "count": 18, "hp": 500, "hpMult": 12.5, "speed": 55, "speedMult": 1.0, "interval": 0.65, "bounty": 14, "bountyMult": 2.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 9, "delayAfter": 10, "earlyBonus": 75, "spawns": [
        { "type": "tank", "count": 12, "hp": 1166, "hpMult": 11.66, "speed": 38, "speedMult": 1.0, "interval": 1.3, "bounty": 32, "bountyMult": 2.67, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 7, "hp": 2000, "hpMult": 30.77, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 52, "bountyMult": 6.5, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 10, "delayAfter": 7, "earlyBonus": 75, "spawns": [
        { "type": "swarm", "count": 30, "hp": 550, "hpMult": 34.38, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 12, "bountyMult": 4.0, "isBoss": false, "isMiniBoss": false },
        { "type": "blinker", "count": 8, "hp": 2062, "hpMult": 31.72, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 65, "bountyMult": 8.13, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 11, "delayAfter": 7, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 8, "hp": 2437, "hpMult": 37.49, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 63, "bountyMult": 7.88, "isBoss": false, "isMiniBoss": false },
        { "type": "scout", "count": 21, "hp": 928, "hpMult": 38.67, "speed": 110, "speedMult": 1.0, "interval": 0.55, "bounty": 24, "bountyMult": 4.0, "isBoss": false, "isMiniBoss": false }
      ]},
      { "wave": 12, "delayAfter": 14, "earlyBonus": 75, "spawns": [
        { "type": "blinker", "count": 8, "hp": 1000, "hpMult": 15.38, "speed": 62, "speedMult": 1.0, "interval": 0.8, "bounty": 45, "bountyMult": 5.63, "isBoss": false, "isMiniBoss": false },
        { "type": "swarm", "count": 30, "hp": 200, "hpMult": 12.5, "speed": 170, "speedMult": 1.0, "interval": 0.045, "clumps": 3, "bounty": 10, "bountyMult": 3.33, "isBoss": false, "isMiniBoss": false },
        { "type": "chronos_warp", "count": 1, "hp": 36000, "hpMult": 8.57, "speed": 40, "speedMult": 1.0, "interval": 1.2, "bounty": 500, "bountyMult": 5.88, "isBoss": true, "isMiniBoss": false }
      ]}
    ]
  },
  "31": {
    "mapId": "L31",
    "startHp": 10,
    "startGold": 175,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 14,
            "hp": 30,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 1.88,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 190,
            "speed": 45,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.18,
            "hpMult": 1.9,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 494,
            "speed": 35,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.17,
            "hpMult": 1.9,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 124,
            "speed": 73,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.18,
            "hpMult": 1.91,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 18,
            "hp": 30,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 1.88,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 190,
            "speed": 45,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.18,
            "hpMult": 1.9,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 494,
            "speed": 35,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.17,
            "hpMult": 1.9,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 124,
            "speed": 73,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.18,
            "hpMult": 1.91,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 30,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 1.88,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 190,
            "speed": 45,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.18,
            "hpMult": 1.9,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 494,
            "speed": 35,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.17,
            "hpMult": 1.9,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 124,
            "speed": 73,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.18,
            "hpMult": 1.91,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 26,
            "hp": 30,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 1.88,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 190,
            "speed": 45,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.18,
            "hpMult": 1.9,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 494,
            "speed": 35,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.17,
            "hpMult": 1.9,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 124,
            "speed": 73,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.18,
            "hpMult": 1.91,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 950,
            "speed": 26,
            "interval": 1.2,
            "bounty": 45,
            "speedMult": 0.87,
            "hpMult": 3.65,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "32": {
    "mapId": "L32",
    "startHp": 10,
    "startGold": 179,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 14,
            "hp": 34,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.13,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 211,
            "speed": 45,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.18,
            "hpMult": 2.11,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 549,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.11,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 137,
            "speed": 74,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.19,
            "hpMult": 2.11,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 18,
            "hp": 34,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.13,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 211,
            "speed": 45,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.18,
            "hpMult": 2.11,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 549,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.11,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 137,
            "speed": 74,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.19,
            "hpMult": 2.11,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 34,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.13,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 211,
            "speed": 45,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.18,
            "hpMult": 2.11,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 549,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.11,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 137,
            "speed": 74,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.19,
            "hpMult": 2.11,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 26,
            "hp": 34,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.13,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 211,
            "speed": 45,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.18,
            "hpMult": 2.11,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 549,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.11,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 137,
            "speed": 74,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.19,
            "hpMult": 2.11,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 760,
            "speed": 53,
            "interval": 1.2,
            "bounty": 20,
            "speedMult": 0.85,
            "hpMult": 11.69,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "33": {
    "mapId": "L33",
    "startHp": 10,
    "startGold": 183,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 14,
            "hp": 37,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.31,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 232,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.32,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 604,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.32,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 151,
            "speed": 74,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.19,
            "hpMult": 2.32,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 18,
            "hp": 37,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.31,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 232,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.32,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 604,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.32,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 151,
            "speed": 74,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.19,
            "hpMult": 2.32,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 37,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.31,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 232,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.32,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 604,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.32,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 151,
            "speed": 74,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.19,
            "hpMult": 2.32,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 26,
            "hp": 37,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.31,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 232,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.32,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 604,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.32,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 151,
            "speed": 74,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.19,
            "hpMult": 2.32,
            "bountyMult": 1
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1200,
            "speed": 32,
            "interval": 1.2,
            "bounty": 30,
            "speedMult": 0.84,
            "hpMult": 12,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "34": {
    "mapId": "L34",
    "startHp": 10,
    "startGold": 187,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 14,
            "hp": 41,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.56,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 254,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.54,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 660,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.54,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 165,
            "speed": 75,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.21,
            "hpMult": 2.54,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 18,
            "hp": 41,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.56,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 254,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.54,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 660,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.54,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 165,
            "speed": 75,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.21,
            "hpMult": 2.54,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 41,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.56,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 254,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.54,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 660,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.54,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 165,
            "speed": 75,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.21,
            "hpMult": 2.54,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 26,
            "hp": 41,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.56,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 254,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.54,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 660,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.54,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 165,
            "speed": 75,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.21,
            "hpMult": 2.54,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1150,
            "speed": 26,
            "interval": 1.2,
            "bounty": 45,
            "speedMult": 0.87,
            "hpMult": 4.42,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "35": {
    "mapId": "L35",
    "startHp": 10,
    "startGold": 191,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 14,
            "hp": 44,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.75,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 275,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 715,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.75,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 179,
            "speed": 75,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.21,
            "hpMult": 2.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 18,
            "hp": 44,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.75,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 275,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 715,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.75,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 179,
            "speed": 75,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.21,
            "hpMult": 2.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 44,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.75,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 275,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 715,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.75,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 179,
            "speed": 75,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.21,
            "hpMult": 2.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 26,
            "hp": 44,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.75,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 275,
            "speed": 46,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.21,
            "hpMult": 2.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 715,
            "speed": 36,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.2,
            "hpMult": 2.75,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 179,
            "speed": 75,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.21,
            "hpMult": 2.75,
            "bountyMult": 1
          },
          {
            "type": "scout",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 880,
            "speed": 94,
            "interval": 1.2,
            "bounty": 15,
            "speedMult": 0.85,
            "hpMult": 36.67,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "36": {
    "mapId": "L36",
    "startHp": 10,
    "startGold": 195,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 14,
            "hp": 47,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.94,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 296,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 2.96,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 770,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 2.96,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 193,
            "speed": 76,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.23,
            "hpMult": 2.97,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 18,
            "hp": 47,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.94,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 296,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 2.96,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 770,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 2.96,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 193,
            "speed": 76,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.23,
            "hpMult": 2.97,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 47,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.94,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 296,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 2.96,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 770,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 2.96,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 193,
            "speed": 76,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.23,
            "hpMult": 2.97,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 26,
            "hp": 47,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 2.94,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 296,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 2.96,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 770,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 2.96,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 193,
            "speed": 76,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.23,
            "hpMult": 2.97,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1350,
            "speed": 26,
            "interval": 1.2,
            "bounty": 45,
            "speedMult": 0.87,
            "hpMult": 5.19,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "37": {
    "mapId": "L37",
    "startHp": 10,
    "startGold": 199,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 15,
            "hp": 51,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.19,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 318,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 3.18,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 826,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 3.18,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 206,
            "speed": 76,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.23,
            "hpMult": 3.17,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 19,
            "hp": 51,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.19,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 318,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 3.18,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 826,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 3.18,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 206,
            "speed": 76,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.23,
            "hpMult": 3.17,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 51,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.19,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 318,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 3.18,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 826,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 3.18,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 206,
            "speed": 76,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.23,
            "hpMult": 3.17,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 27,
            "hp": 51,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.19,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 318,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 3.18,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 826,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 3.18,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 206,
            "speed": 76,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.23,
            "hpMult": 3.17,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 880,
            "speed": 53,
            "interval": 1.2,
            "bounty": 20,
            "speedMult": 0.85,
            "hpMult": 13.54,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "38": {
    "mapId": "L38",
    "startHp": 10,
    "startGold": 203,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 15,
            "hp": 54,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.38,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 339,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 3.39,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 881,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 3.39,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 220,
            "speed": 77,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.24,
            "hpMult": 3.38,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 19,
            "hp": 54,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.38,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 339,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 3.39,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 881,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 3.39,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 220,
            "speed": 77,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.24,
            "hpMult": 3.38,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 54,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.38,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 339,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 3.39,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 881,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 3.39,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 220,
            "speed": 77,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.24,
            "hpMult": 3.38,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 27,
            "hp": 54,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.38,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 339,
            "speed": 47,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.24,
            "hpMult": 3.39,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 881,
            "speed": 37,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.23,
            "hpMult": 3.39,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 220,
            "speed": 77,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.24,
            "hpMult": 3.38,
            "bountyMult": 1
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1450,
            "speed": 32,
            "interval": 1.2,
            "bounty": 30,
            "speedMult": 0.84,
            "hpMult": 14.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "39": {
    "mapId": "L39",
    "startHp": 10,
    "startGold": 207,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 15,
            "hp": 58,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.63,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 360,
            "speed": 48,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.26,
            "hpMult": 3.6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 936,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 234,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 3.6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 19,
            "hp": 58,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.63,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 360,
            "speed": 48,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.26,
            "hpMult": 3.6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 936,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 234,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 3.6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 58,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.63,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 360,
            "speed": 48,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.26,
            "hpMult": 3.6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 936,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 234,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 3.6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 27,
            "hp": 58,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.63,
            "bountyMult": 1.61
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 360,
            "speed": 48,
            "interval": 1.215,
            "bounty": 12,
            "speedMult": 1.26,
            "hpMult": 3.6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 936,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 234,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 3.6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1600,
            "speed": 26,
            "interval": 1.2,
            "bounty": 45,
            "speedMult": 0.87,
            "hpMult": 6.15,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "40": {
    "mapId": "L40",
    "startHp": 10,
    "startGold": 220,
    "totalWaves": 10,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 1092,
            "speed": 38,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 273,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 12,
            "hp": 67,
            "speed": 170,
            "interval": 0.15,
            "clumps": 2,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.19,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 1092,
            "speed": 38,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 273,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 14,
            "hp": 67,
            "speed": 170,
            "interval": 0.15,
            "clumps": 2,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.19,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1092,
            "speed": 38,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 273,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 67,
            "speed": 170,
            "interval": 0.15,
            "clumps": 3,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.19,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1092,
            "speed": 38,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 273,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 18,
            "hp": 67,
            "speed": 170,
            "interval": 0.15,
            "clumps": 3,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.19,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1092,
            "speed": 38,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 273,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 67,
            "speed": 170,
            "interval": 0.15,
            "clumps": 3,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.19,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1092,
            "speed": 38,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 273,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 67,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.19,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1092,
            "speed": 38,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 273,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 24,
            "hp": 67,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.19,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1092,
            "speed": 38,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 273,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 26,
            "hp": 67,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.19,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 9,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1092,
            "speed": 38,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 273,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 28,
            "hp": 67,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.19,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 10,
        "spawns": [
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1092,
            "speed": 38,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 273,
            "speed": 78,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.26,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 420,
            "speed": 48,
            "interval": 1.2,
            "bounty": 12,
            "speedMult": 1.26,
            "hpMult": 4.2,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 24,
            "hp": 67,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.19,
            "bountyMult": 1.61
          },
          {
            "type": "titan_core",
            "isBoss": true,
            "isMiniBoss": false,
            "count": 1,
            "hp": 10000,
            "speed": 28,
            "interval": 1.2,
            "bounty": 110,
            "speedMult": 1,
            "hpMult": 1.72,
            "bountyMult": 0.2
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "41": {
    "mapId": "L41",
    "startHp": 10,
    "startGold": 190,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 195,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 12,
            "hp": 48,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 510,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 780,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 195,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 48,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 510,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 780,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 195,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 19,
            "hp": 48,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 510,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 780,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 195,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 48,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 510,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 780,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3,
            "bountyMult": 1
          },
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1100,
            "speed": 34,
            "interval": 1.2,
            "bounty": 35,
            "speedMult": 0.85,
            "hpMult": 6.47,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "42": {
    "mapId": "L42",
    "startHp": 10,
    "startGold": 194,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 211,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 12,
            "hp": 52,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 553,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 845,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 211,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 52,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 553,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 845,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 211,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 19,
            "hp": 52,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 553,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 845,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 211,
            "speed": 79,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 52,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 553,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 845,
            "speed": 38,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.27,
            "hpMult": 3.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1650,
            "speed": 26,
            "interval": 1.2,
            "bounty": 45,
            "speedMult": 0.87,
            "hpMult": 6.35,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "43": {
    "mapId": "L43",
    "startHp": 10,
    "startGold": 198,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 228,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 12,
            "hp": 56,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 595,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 910,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 228,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 56,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 595,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 910,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 228,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 19,
            "hp": 56,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 595,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 910,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 228,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 22,
            "hp": 56,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 595,
            "speed": 51,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.27,
            "hpMult": 3.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 910,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.5,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 920,
            "speed": 53,
            "interval": 1.2,
            "bounty": 20,
            "speedMult": 0.85,
            "hpMult": 14.15,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "44": {
    "mapId": "L44",
    "startHp": 10,
    "startGold": 202,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 244,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 60,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 638,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 975,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 244,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 60,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 638,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 975,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 244,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 60,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 638,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 975,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 244,
            "speed": 80,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.29,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 60,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 3.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 638,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 975,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 3.75,
            "bountyMult": 1
          },
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1300,
            "speed": 34,
            "interval": 1.2,
            "bounty": 35,
            "speedMult": 0.85,
            "hpMult": 7.65,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "45": {
    "mapId": "L45",
    "startHp": 10,
    "startGold": 206,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 260,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 64,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 680,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1040,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 260,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 64,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 680,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1040,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 260,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 64,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 680,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1040,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 260,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 64,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 680,
            "speed": 52,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1040,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4,
            "bountyMult": 1
          },
          {
            "type": "tank",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1600,
            "speed": 32,
            "interval": 1.2,
            "bounty": 30,
            "speedMult": 0.84,
            "hpMult": 16,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "46": {
    "mapId": "L46",
    "startHp": 10,
    "startGold": 210,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 276,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 68,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 723,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1105,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 276,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 68,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 723,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1105,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 276,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 68,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 723,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1105,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4.25,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 276,
            "speed": 81,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.31,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 68,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.25,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 723,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1105,
            "speed": 39,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.3,
            "hpMult": 4.25,
            "bountyMult": 1
          },
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1450,
            "speed": 34,
            "interval": 1.2,
            "bounty": 35,
            "speedMult": 0.85,
            "hpMult": 8.53,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "47": {
    "mapId": "L47",
    "startHp": 10,
    "startGold": 214,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 293,
            "speed": 82,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.32,
            "hpMult": 4.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 72,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 765,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1170,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 293,
            "speed": 82,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.32,
            "hpMult": 4.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 72,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 765,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1170,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 293,
            "speed": 82,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.32,
            "hpMult": 4.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 72,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 765,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1170,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 293,
            "speed": 82,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.32,
            "hpMult": 4.51,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 72,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 765,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1170,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1900,
            "speed": 26,
            "interval": 1.2,
            "bounty": 45,
            "speedMult": 0.87,
            "hpMult": 7.31,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "48": {
    "mapId": "L48",
    "startHp": 10,
    "startGold": 218,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 309,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 76,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 808,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1235,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 309,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 76,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 808,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1235,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 309,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 76,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 808,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1235,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.75,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 309,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 76,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 4.75,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 808,
            "speed": 53,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.32,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1235,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 4.75,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 520,
            "speed": 53,
            "interval": 1.2,
            "bounty": 20,
            "speedMult": 0.85,
            "hpMult": 8,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "49": {
    "mapId": "L49",
    "startHp": 10,
    "startGold": 222,
    "totalWaves": 8,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 325,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 13,
            "hp": 80,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 850,
            "speed": 54,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1300,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 325,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 16,
            "hp": 80,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 850,
            "speed": 54,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1300,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 325,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 80,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 850,
            "speed": 54,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1300,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 5,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 11,
            "hp": 325,
            "speed": 83,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.34,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 23,
            "hp": 80,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 5,
            "bountyMult": 1.61
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 9,
            "hp": 850,
            "speed": 54,
            "interval": 1.17,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1300,
            "speed": 40,
            "interval": 1.6,
            "bounty": 18,
            "speedMult": 1.33,
            "hpMult": 5,
            "bountyMult": 1
          },
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": true,
            "count": 1,
            "hp": 1700,
            "speed": 34,
            "interval": 1.2,
            "bounty": 35,
            "speedMult": 0.85,
            "hpMult": 10,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      }
    ]
  },
  "50": {
    "mapId": "L50",
    "startHp": 10,
    "startGold": 230,
    "totalWaves": 10,
    "unlockedTowers": [
      "gun",
      "laser",
      "mortar",
      "tesla",
      "stasis",
      "melter",
      "railgun"
    ],
    "canUpgrade": true,
    "waves": [
      {
        "wave": 1,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 2,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 3,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 2,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 4,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 5,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 6,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 3,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 7,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 5,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 8,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 9,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 6,
            "hp": 1020,
            "speed": 54,
            "interval": 1.105,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 4,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          }
        ],
        "delayAfter": 5
      },
      {
        "wave": 10,
        "spawns": [
          {
            "type": "emp_bomber",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 8,
            "hp": 1020,
            "speed": 54,
            "interval": 1.04,
            "bounty": 14,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "goliath",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 7,
            "hp": 1560,
            "speed": 41,
            "interval": 1.53,
            "bounty": 18,
            "speedMult": 1.37,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "blinker",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 10,
            "hp": 390,
            "speed": 84,
            "interval": 0.688,
            "bounty": 8,
            "speedMult": 1.35,
            "hpMult": 6,
            "bountyMult": 1
          },
          {
            "type": "swarm",
            "isBoss": false,
            "isMiniBoss": false,
            "count": 20,
            "hp": 96,
            "speed": 170,
            "interval": 0.15,
            "clumps": 4,
            "bounty": 3,
            "speedMult": 1.43,
            "hpMult": 6,
            "bountyMult": 1.61
          },
          {
            "type": "emp_overlord",
            "isBoss": true,
            "isMiniBoss": false,
            "count": 1,
            "hp": 15000,
            "speed": 30,
            "interval": 1.2,
            "bounty": 140,
            "speedMult": 1,
            "hpMult": 2.08,
            "bountyMult": 0.2
          }
        ],
        "delayAfter": 5
      }
    ]
  }
};
for (let lvl = 5; lvl <= 10; lvl++) {
  LEVELS_DATA[lvl].unlockedTowers = ['gun', 'laser', 'mortar'];
}

const SECTOR_3_MINIBOSSES = [
  { type: 'blinker', hp: 380 }, { type: 'scout', hp: 580 }, { type: 'tank', hp: 950 },
  { type: 'blinker', hp: 440 }, { type: 'grunt', hp: 750 }, { type: 'tank', hp: 420 },
  { type: 'blinker', hp: 520 }, { type: 'tank', hp: 1100 }, { type: 'blinker', hp: 600 }
];
const SECTOR_3_MAPS = ['L21', 'L22', 'L23', 'L24', 'L25', 'L26', 'L27', 'L28', 'L29'];

for (let lvl = 21; lvl <= 29; lvl++) {
  const mapKey = SECTOR_3_MAPS[lvl - 21];
  const mb = SECTOR_3_MINIBOSSES[lvl - 21];
  const waves = [];
  const lvlHpMult = 1.8 + (lvl - 21) * 0.175; // 1.8 at L21 -> 3.2 at L29
  const lvlSpeedMult = getLevelSpeedMult(lvl);
  const countBonus = getLevelCountBonus(lvl);
  for (let w = 1; w <= 7; w++) {
    const spawns = [];
    const count = 8 + w * 2 + countBonus;
    if (w % 2 === 0) {
      spawns.push(createEnemySpawn('blinker', Math.max(2, Math.floor(count * 0.4)), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.75 }));
      spawns.push(createEnemySpawn('swarm', Math.floor(count * 0.8), { hpMult: lvlHpMult, interval: 0.15, clumps: swarmClumpsFor(lvl, w) }));
    } else {
      spawns.push(createEnemySpawn('grunt', count, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.66 }));
      if (w >= 3) spawns.push(createEnemySpawn('tank', Math.floor(count * 0.25), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.282 }));
    }
    if (w === 7) {
      spawns.push(createEnemySpawn(mb.type, 1, { isMiniBoss: true, hp: mb.hp, interval: 1.2 }));
    }
    waves.push({ wave: w, spawns });
  }
  LEVELS_DATA[lvl] = {
    mapId: mapKey, startHp: 10, startGold: 155 + (lvl - 21) * 3, totalWaves: 7,
    unlockedTowers: ['gun', 'laser', 'mortar', 'tesla', 'stasis'], canUpgrade: true, waves
  };
}

LEVELS_DATA[30] = {
  mapId: 'L30', startHp: 10, startGold: 195, totalWaves: 10,
  unlockedTowers: ['gun', 'laser', 'mortar', 'tesla', 'stasis'], canUpgrade: true,
  waves: (function() {
    const wArr = [];
    const lvlHpMult = 4.0;
    const lvlSpeedMult = getLevelSpeedMult(30);
    for (let w = 1; w <= 9; w++) {
      wArr.push({
        wave: w,
        spawns: [
          createEnemySpawn('blinker', 4 + Math.floor(w * 0.8), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.688 }),
          createEnemySpawn('tank', 2 + Math.floor(w * 0.5), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.215 }),
          createEnemySpawn('swarm', 8 + w * 2, { hpMult: lvlHpMult, interval: 0.15, clumps: Math.min(4, 2 + Math.floor(w / 3)) })
        ]
      });
    }
    wArr.push({
      wave: 10,
      spawns: [
        createEnemySpawn('blinker', 12, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.625 }),
        createEnemySpawn('tank', 8, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.2 }),
        createEnemySpawn('swarm', 20, { hpMult: lvlHpMult, interval: 0.15, clumps: 4 }),
        { type: 'chronos_warp', isBoss: true, isMiniBoss: false, count: 1, hp: 6500, speed: 40, interval: 1.2, bounty: 85 }
      ]
    });
    return wArr;
  })()
};

const SECTOR_4_MINIBOSSES = [
  { type: 'goliath', hp: 950 }, { type: 'blinker', hp: 760 }, { type: 'tank', hp: 1200 },
  { type: 'goliath', hp: 1150 }, { type: 'scout', hp: 880 }, { type: 'goliath', hp: 1350 },
  { type: 'blinker', hp: 880 }, { type: 'tank', hp: 1450 }, { type: 'goliath', hp: 1600 }
];
const SECTOR_4_MAPS = ['L31', 'L32', 'L33', 'L34', 'L35', 'L36', 'L37', 'L38', 'L39'];

for (let lvl = 31; lvl <= 39; lvl++) {
  const mapKey = SECTOR_4_MAPS[lvl - 31];
  const mb = SECTOR_4_MINIBOSSES[lvl - 31];
  const waves = [];
  const lvlHpMult = 1.9 + (lvl - 31) * 0.2125; // 1.9 at L31 -> 3.6 at L39
  const lvlSpeedMult = getLevelSpeedMult(lvl);
  const countBonus = getLevelCountBonus(lvl);
  for (let w = 1; w <= 8; w++) {
    const spawns = [];
    const count = 9 + w * 2 + countBonus;
    if (w % 2 === 0) {
      spawns.push(createEnemySpawn('goliath', Math.max(1, Math.floor(count * 0.3)), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.6 }));
      spawns.push(createEnemySpawn('blinker', Math.floor(count * 0.4), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.688 }));
    } else {
      spawns.push(createEnemySpawn('swarm', count, { hpMult: lvlHpMult, interval: 0.15, clumps: swarmClumpsFor(lvl, w) }));
      spawns.push(createEnemySpawn('tank', Math.max(1, Math.floor(count * 0.25)), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.215 }));
    }
    if (w === 8) {
      spawns.push(createEnemySpawn(mb.type, 1, { isMiniBoss: true, hp: mb.hp, interval: 1.2 }));
    }
    waves.push({ wave: w, spawns });
  }
  LEVELS_DATA[lvl] = {
    mapId: mapKey, startHp: 10, startGold: 175 + (lvl - 31) * 4, totalWaves: 8,
    unlockedTowers: ['gun', 'laser', 'mortar', 'tesla', 'stasis', 'melter'], canUpgrade: true, waves
  };
}

LEVELS_DATA[40] = {
  mapId: 'L40', startHp: 10, startGold: 220, totalWaves: 10,
  unlockedTowers: ['gun', 'laser', 'mortar', 'tesla', 'stasis', 'melter'], canUpgrade: true,
  waves: (function() {
    const wArr = [];
    const lvlHpMult = 4.2;
    const lvlSpeedMult = getLevelSpeedMult(40);
    for (let w = 1; w <= 9; w++) {
      wArr.push({
        wave: w,
        spawns: [
          createEnemySpawn('goliath', 2 + Math.floor(w * 0.4), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.53 }),
          createEnemySpawn('blinker', 4 + Math.floor(w * 0.5), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.688 }),
          createEnemySpawn('swarm', 10 + w * 2, { hpMult: lvlHpMult, interval: 0.15, clumps: Math.min(4, 2 + Math.floor(w / 3)) })
        ]
      });
    }
    wArr.push({
      wave: 10,
      spawns: [
        createEnemySpawn('goliath', 6, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.53 }),
        createEnemySpawn('blinker', 8, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.688 }),
        createEnemySpawn('tank', 6, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.2 }),
        createEnemySpawn('swarm', 24, { hpMult: lvlHpMult, interval: 0.15, clumps: 4 }),
        { type: 'titan_core', isBoss: true, isMiniBoss: false, count: 1, hp: 10000, speed: 28, interval: 1.2, bounty: 110 }
      ]
    });
    return wArr;
  })()
};

const SECTOR_5_MINIBOSSES = [
  { type: 'emp_bomber', hp: 1100 }, { type: 'goliath', hp: 1650 }, { type: 'blinker', hp: 920 },
  { type: 'emp_bomber', hp: 1300 }, { type: 'tank', hp: 1600 }, { type: 'emp_bomber', hp: 1450 },
  { type: 'goliath', hp: 1900 }, { type: 'blinker', hp: 520 }, { type: 'emp_bomber', hp: 1700 }
];
const SECTOR_5_MAPS = ['L41', 'L42', 'L43', 'L44', 'L45', 'L46', 'L47', 'L48', 'L49'];

for (let lvl = 41; lvl <= 49; lvl++) {
  const mapKey = SECTOR_5_MAPS[lvl - 41];
  const mb = SECTOR_5_MINIBOSSES[lvl - 41];
  const waves = [];
  const lvlHpMult = 3.0 + (lvl - 41) * 0.25; // 3.0 at L41 -> 5.0 at L49
  const lvlSpeedMult = getLevelSpeedMult(lvl);
  const countBonus = getLevelCountBonus(lvl);
  for (let w = 1; w <= 8; w++) {
    const spawns = [];
    const count = 10 + w * 2 + countBonus;
    if (w % 2 === 0) {
      spawns.push(createEnemySpawn('emp_bomber', Math.max(1, Math.floor(count * 0.3)), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.17 }));
      spawns.push(createEnemySpawn('goliath', Math.max(1, Math.floor(count * 0.2)), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.6 }));
    } else {
      spawns.push(createEnemySpawn('blinker', Math.floor(count * 0.4), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.688 }));
      spawns.push(createEnemySpawn('swarm', Math.floor(count * 0.8), { hpMult: lvlHpMult, interval: 0.15, clumps: swarmClumpsFor(lvl, w) }));
    }
    if (w === 8) {
      spawns.push(createEnemySpawn(mb.type, 1, { isMiniBoss: true, hp: mb.hp, interval: 1.2 }));
    }
    waves.push({ wave: w, spawns });
  }
  LEVELS_DATA[lvl] = {
    mapId: mapKey, startHp: 10, startGold: 190 + (lvl - 41) * 4, totalWaves: 8,
    unlockedTowers: ['gun', 'laser', 'mortar', 'tesla', 'stasis', 'melter', 'railgun'], canUpgrade: true, waves
  };
}

LEVELS_DATA[50] = {
  mapId: 'L50', startHp: 10, startGold: 230, totalWaves: 10,
  unlockedTowers: ['gun', 'laser', 'mortar', 'tesla', 'stasis', 'melter', 'railgun'], canUpgrade: true,
  waves: (function() {
    const wArr = [];
    const lvlHpMult = 6.0;
    const lvlSpeedMult = getLevelSpeedMult(50);
    for (let w = 1; w <= 9; w++) {
      wArr.push({
        wave: w,
        spawns: [
          createEnemySpawn('emp_bomber', 2 + Math.floor(w * 0.5), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.105 }),
          createEnemySpawn('goliath', 2 + Math.floor(w * 0.3), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.53 }),
          createEnemySpawn('blinker', 4 + Math.floor(w * 0.5), { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.688 })
        ]
      });
    }
    wArr.push({
      wave: 10,
      spawns: [
        createEnemySpawn('emp_bomber', 8, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.04 }),
        createEnemySpawn('goliath', 7, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 1.53 }),
        createEnemySpawn('blinker', 10, { hpMult: lvlHpMult, speedMult: lvlSpeedMult, interval: 0.688 }),
        createEnemySpawn('swarm', 20, { hpMult: lvlHpMult, interval: 0.15, clumps: 4 }),
        { type: 'emp_overlord', isBoss: true, isMiniBoss: false, count: 1, hp: 15000, speed: 30, interval: 1.2, bounty: 140 }
      ]
    });
    return wArr;
  })()
};

// Debug log: confirm data loaded




















// --- Ниже идут данные исключительно для Level Editor, игра их игнорирует ---
const EDITOR_META = {
  "templates": {},
  "bindings": {
    "1": "custom",
    "2": "custom",
    "3": "custom",
    "4": "custom",
    "5": "custom",
    "6": "custom",
    "7": "custom",
    "8": "custom",
    "9": "hard_proc",
    "10": "hard_proc",
    "11": "hard_proc",
    "12": "custom",
    "13": "hard_proc",
    "14": "hard_proc",
    "15": "hard_proc",
    "16": "hard_proc",
    "17": "hard_proc",
    "18": "hard_proc",
    "19": "hard_proc",
    "20": "hard_proc",
    "21": "hard_proc",
    "22": "hard_proc",
    "23": "hard_proc",
    "24": "hard_proc",
    "25": "hard_proc",
    "26": "hard_proc",
    "27": "hard_proc",
    "28": "hard_proc",
    "29": "hard_proc",
    "30": "hard_proc",
    "31": "hard_proc",
    "32": "hard_proc",
    "33": "hard_proc",
    "34": "hard_proc",
    "35": "hard_proc",
    "36": "hard_proc",
    "37": "hard_proc",
    "38": "hard_proc",
    "39": "hard_proc",
    "40": "hard_proc",
    "41": "hard_proc",
    "42": "hard_proc",
    "43": "hard_proc",
    "44": "hard_proc",
    "45": "hard_proc",
    "46": "hard_proc",
    "47": "hard_proc",
    "48": "hard_proc",
    "49": "hard_proc",
    "50": "hard_proc"
  }
};

if (typeof console !== 'undefined') {
  console.log('[data.js] Loaded successfully!', {
    totalMaps: Object.keys(MAP_CATALOG).length,
    totalLevels: TOTAL_LEVELS,
    levelsDataKeys: Object.keys(LEVELS_DATA).length
  });
}