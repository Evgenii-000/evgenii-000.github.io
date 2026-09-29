// Synth Wave Defense -- ui.js
// Presentation layer: renders screens, HUD, canvas graphics, and user input.

function showNewTowerBanner(type) {
  const banner = document.getElementById('newTowerBanner');
  if (!banner) return;
  const iconBox = document.getElementById('newTowerBannerIcon');
  const nameEl = document.getElementById('newTowerBannerName');
  if (iconBox) iconBox.innerHTML = TOWER_ICONS[type] || '';
  if (nameEl) nameEl.textContent = TOWER_NAMES[type] || type;
  banner.classList.add('visible');
  newTowerBannerHideTimer = 4.5;
}

function hideNewTowerBanner() {
  const banner = document.getElementById('newTowerBanner');
  if (banner) banner.classList.remove('visible');
  newTowerBannerHideTimer = 0;
}

function showIncomingAlert(type) {
  const banner = document.getElementById('incomingAlertBanner');
  const textEl = document.getElementById('incomingAlertText');
  if (!banner || !textEl) return;

  banner.className = 'incoming-alert-banner';
  if (type === 'boss') {
    banner.classList.add('boss');
    textEl.textContent = '⚠️ BOSS INCOMING ⚠️';
  } else if (type === 'miniboss') {
    banner.classList.add('miniboss');
    textEl.textContent = '⚡ MINI BOSS INCOMING ⚡';
  } else {
    return;
  }

  banner.classList.add('visible');
  activeBossAlertType = type;
  bossAlertShown = true;
  bossAlertHideTimer = 3.0; // 2.0 секунды до спауна + 1.0 секунда после спауна
}

function hideIncomingAlert() {
  const banner = document.getElementById('incomingAlertBanner');
  if (banner) banner.classList.remove('visible');
  activeBossAlertType = null;
}

function resizeCanvasAndCamera() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  FIELD_WIDTH = COLS * TILE_SIZE;
  FIELD_HEIGHT = ROWS * TILE_SIZE;

  const topHudEl = document.getElementById('topHud');
  const bottomEl = document.getElementById('controlsWrapper');
  const topH = (topHudEl && !topHudEl.classList.contains('hidden')) ? topHudEl.getBoundingClientRect().height : 76;
  const bottomH = (bottomEl && !bottomEl.classList.contains('hidden')) ? bottomEl.getBoundingClientRect().height : 110;

  const availW = Math.max(300, window.innerWidth - 32);
  const availH = Math.max(260, window.innerHeight - topH - bottomH - 32);

  baseZoom = Math.min(availW / FIELD_WIDTH, availH / FIELD_HEIGHT);
  minZoom = baseZoom;
  maxZoom = baseZoom * 2.2;

  if (camZoom < minZoom || !camZoom) camZoom = minZoom;
  if (camZoom > maxZoom) camZoom = maxZoom;

  clampCamera();
}

function clampCamera() {
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const viewFieldW = FIELD_WIDTH * camZoom;
  const viewFieldH = FIELD_HEIGHT * camZoom;

  const topHudEl = document.getElementById('topHud');
  const bottomEl = document.getElementById('controlsWrapper');
  const topH = (topHudEl && !topHudEl.classList.contains('hidden')) ? topHudEl.getBoundingClientRect().height : 76;
  const bottomH = (bottomEl && !bottomEl.classList.contains('hidden')) ? bottomEl.getBoundingClientRect().height : 110;

  if (viewFieldW <= screenW) {
    camX = (screenW - viewFieldW) / 2;
  } else {
    camX = Math.max(screenW - viewFieldW, Math.min(0, camX));
  }

  const centerTargetY = topH + (screenH - topH - bottomH - viewFieldH) / 2;
  if (viewFieldH <= (screenH - topH - bottomH)) {
    camY = Math.max(topH + 8, centerTargetY);
  } else {
    camY = Math.max(screenH - bottomH - viewFieldH, Math.min(topH, camY));
  }
}

function screenToWorld(sx, sy) {
  return {
    x: (sx - camX) / camZoom,
    y: (sy - camY) / camZoom
  };
}

function worldToScreen(wx, wy) {
  return {
    x: wx * camZoom + camX,
    y: wy * camZoom + camY
  };
}

window.addEventListener('resize', resizeCanvasAndCamera);
window.addEventListener('load', resizeCanvasAndCamera);

function initTutorialForLevel(lvl) {
  tutorialActive = false;
  tutorialLevel = null;
  tutorialStep = -1;
  tutorialTargetTower = null;
  tutorialDestCell = null;
  hideTutorialUI();

  if (lvl === 1 && !tutorialSeen.l1 && !hasClearedLevelBefore(1)) {
    tutorialActive = true;
    tutorialLevel = 1;
    tutorialStep = 0;
    tutorialDestCell = findTutorialBuildCell();
    const skipBtn = document.getElementById('tutorialSkipBtn');
    if (skipBtn) skipBtn.classList.remove('hidden');
  } else if (lvl === 2 && !tutorialSeen.l2 && !hasClearedLevelBefore(2)) {
    tutorialActive = true;
    tutorialLevel = 2;
    tutorialStep = -1;
    const skipBtn = document.getElementById('tutorialSkipBtn');
    if (skipBtn) skipBtn.classList.remove('hidden');
  }
}

function hideTutorialUI() {
  const layer = document.getElementById('tutorialLayer');
  if (layer) layer.classList.add('hidden');
  const skipBtn = document.getElementById('tutorialSkipBtn');
  if (skipBtn) skipBtn.classList.add('hidden');
}

function completeTutorial(lvl) {
  tutorialActive = false;
  tutorialLevel = null;
  tutorialStep = -1;
  tutorialTargetTower = null;
  if (lvl === 1) tutorialSeen.l1 = true;
  if (lvl === 2) tutorialSeen.l2 = true;
  hideTutorialUI();
  saveGameSoon();
  safeTrack('tutorial_step_complete', { level: lvl });
}

function skipTutorial() {
  if (!tutorialActive || !tutorialLevel) return;
  completeTutorial(tutorialLevel);
}

function buildDiagnostics() {
  const probe = (label, fn) => {
    try { return { label, ok: true, value: fn() }; }
    catch (e) { return { label, ok: false, value: 'ERROR: ' + (e && e.message ? e.message : e) }; }
  };

  function audioReport() {
    const rows = [];
    rows.push(probe('audio.js loaded', () => typeof SFX !== 'undefined' && !!SFX));
    rows.push(probe('music.js loaded', () => typeof MusicManager !== 'undefined' && !!MusicManager));
    rows.push(probe('settings.sfxVolume', () => settings.sfxVolume));
    rows.push(probe('settings.musicVolume', () => settings.musicVolume));
    rows.push(probe('SFX.isEnabled()', () => SFX.isEnabled()));
    rows.push(probe('MUSIC.isEnabled()', () => MusicManager.isEnabled()));
    rows.push(probe('MUSIC.current()', () => MusicManager.current()));
    rows.push(probe('AudioContext state', () => {
      const c = SFX._ctx && SFX._ctx();
      return c ? c.state : 'no context yet (needs a tap)';
    }));
    rows.push(probe('sample pack loaded', () => {
      const n = SFX.sampleNames ? SFX.sampleNames() : [];
      return n.length ? n.length + ' samples' : 'none (using synth ticks)';
    }));
    return rows;
  }

  function generalReport() {
    return [
      probe('game booted', () => !!window.__gameBooted),
      probe('gameState', () => gameState),
      probe('currentLevel / maxUnlocked', () => `${currentLevel} / ${maxUnlockedLevel}`),
      probe('devMode', () => devMode),
      probe('perfMode', () => perfMode),
      probe('towers / enemies / projectiles', () => `${towers.length} / ${enemies.length} / ${projectiles.length}`),
      probe('data.js levels', () => Object.keys(LEVELS_DATA).length),
      probe('save present', () => !!localStorage.getItem('sectorDefenseTD_save_v1')),
      probe('selectedLoadout', () => selectedLoadout.join(', '))
    ];
  }

  function print(title, rows) {
    console.group('%c' + title, 'color:#00e5ff;font-weight:bold');
    rows.forEach(r => {
      const bad = !r.ok || r.value === false;
      console.log('%c' + (bad ? '✗' : '✓') + ' ' + r.label + ':',
        'color:' + (bad ? '#ff2a85' : '#8ef3ff'), r.value);
    });
    console.groupEnd();
  }

  const diag = function () {
    print('Synth Wave Defense — diagnostics', generalReport());
    print('Audio', audioReport());
    console.log('%cTip: diag.audio() for audio only, diag.fix() to force-restart audio, diag.silent() to check why nothing is audible.', 'color:#6f7c96');
    return undefined;
  };

  diag.audio = function () { print('Audio', audioReport()); };
  diag.game = function () { print('Game', generalReport()); };

  diag.silent = function () {
    const reasons = [];
    try {
      if (typeof SFX === 'undefined' || !SFX) reasons.push('audio.js did not load');
      else {
        if (!SFX.isEnabled()) reasons.push('SFX disabled — sound volume is at 0 in Settings');
        const c = SFX._ctx && SFX._ctx();
        if (!c) reasons.push('AudioContext not created yet — browser requires a gesture');
        else if (c.state === 'suspended') reasons.push('AudioContext suspended — tap page once or call diag.fix()');
      }
      if (typeof MusicManager === 'undefined' || !MusicManager) reasons.push('music.js did not load');
      else {
        if (!MusicManager.isEnabled()) reasons.push('music disabled — music volume is at 0 in Settings');
        if (!MusicManager.current()) reasons.push('no music category active right now');
      }
    } catch (e) { reasons.push('probe threw: ' + e.message); }

    if (!reasons.length) console.log('%c✓ Nothing is muting audio — it should be audible.', 'color:#8ef3ff');
    else reasons.forEach(r => console.log('%c✗ ' + r, 'color:#ff2a85'));
  };

  diag.fix = function () {
    try { SFX.unlock(); } catch (e) { console.log('SFX.unlock failed:', e.message); }
    try { musicUnlock(); } catch (e) { console.log('musicUnlock failed:', e.message); }
    try {
      applySfxVolume(settings.sfxVolume != null ? settings.sfxVolume : 100, false);
      applyMusicVolume(settings.musicVolume != null ? settings.musicVolume : 70, false);
    } catch (e) { console.log('volume reapply failed:', e.message); }
    try {
      const want = (gameState === 'PLAYING' || gameState === 'PAUSED') ? 'battle' : 'menu';
      MusicManager.play(want);
      console.log('%c✓ audio re-armed, music category: ' + want, 'color:#8ef3ff');
    } catch (e) { console.log('music restart failed:', e.message); }
  };

  diag.testSound = function () {
    try {
      SFX.unlock();
      ['tap', 'gun', 'explosion'].forEach((n, i) => setTimeout(() => SFX.play(n), i * 260));
      console.log('%cPlaying test audio ticks…', 'color:#8ef3ff');
    } catch (e) { console.log('test failed:', e.message); }
  };

  return diag;
}
window.diag = buildDiagnostics();

window.resetTutorial = function () {
  tutorialSeen.l1 = false;
  tutorialSeen.l2 = false;
  tutorialSeen.l3 = false;
  Object.keys(tutorialSeen).forEach(k => {
    if (k.startsWith('towerUnlock_l')) tutorialSeen[k] = false;
  });
  saveGameSoon();
  console.log('Tutorial flags reset.');
};

function findTutorialBuildCell() {
  const centerC = (COLS - 1) / 2;
  const centerR = (ROWS - 1) / 2;
  let best = null;
  let bestDist = Infinity;
  for (let r = 0; r < ROWS; r++) {
    if (!grid[r]) continue;
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] !== 0) continue;
      const d = Math.hypot(c - centerC, r - centerR);
      if (d < bestDist) {
        bestDist = d;
        best = { c, r };
      }
    }
  }
  return best;
}

function applyTutorialHighlight(rect, text, mode) {
  const pad = 10;
  const spotlight = document.getElementById('tutorialSpotlight');
  spotlight.style.left = (rect.x - pad) + 'px';
  spotlight.style.top = (rect.y - pad) + 'px';
  spotlight.style.width = (rect.w + pad * 2) + 'px';
  spotlight.style.height = (rect.h + pad * 2) + 'px';
  spotlight.classList.remove('hidden');

  const cx = rect.x + rect.w / 2;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const placeAbove = rect.y > vh * 0.5;

  const bubble = document.getElementById('tutorialBubble');
  document.getElementById('tutorialBubbleText').textContent = text;
  bubble.style.left = Math.min(Math.max(cx, 116), vw - 116) + 'px';
  bubble.style.top = placeAbove ? (rect.y - pad - 54) + 'px' : (rect.y + rect.h + pad + 16) + 'px';
  bubble.classList.remove('hidden');

  if (mode === 'tap') {
    const tapPulse = document.getElementById('tutorialTapPulse');
    tapPulse.style.left = cx + 'px';
    tapPulse.style.top = (rect.y + rect.h / 2) + 'px';
    tapPulse.classList.remove('hidden');
    document.getElementById('tutorialPointer').classList.add('hidden');
    document.getElementById('tutorialDropRing').classList.add('hidden');
  }
}

function positionTutorialTapOnElement(el, text) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  applyTutorialHighlight({ x: r.left, y: r.top, w: r.width, h: r.height }, text, 'tap');
}

function positionTutorialTapAtWorld(wx, wy, text) {
  const screen = worldToScreen(wx, wy);
  const radius = 26 * camZoom;
  applyTutorialHighlight({ x: screen.x - radius, y: screen.y - radius, w: radius * 2, h: radius * 2 }, text, 'tap');
}

function positionTutorialCloseStep() {
  const topLeft = worldToScreen(0, 0);
  const bottomRight = worldToScreen(FIELD_WIDTH, FIELD_HEIGHT);
  const pad = 6;
  const fieldWidth = Math.max(0, (bottomRight.x - topLeft.x) - pad * 2);
  const fieldHeight = Math.max(0, (bottomRight.y - topLeft.y) - pad * 2);

  const fieldEl = document.getElementById('tutorialFieldHighlight');
  if (fieldEl) {
    fieldEl.style.left = (topLeft.x + pad) + 'px';
    fieldEl.style.top = (topLeft.y + pad) + 'px';
    fieldEl.style.width = fieldWidth + 'px';
    fieldEl.style.height = fieldHeight + 'px';
    fieldEl.classList.remove('hidden');
  }

  const spotlight = document.getElementById('tutorialSpotlight');
  if (spotlight) {
    spotlight.style.left = (topLeft.x + pad) + 'px';
    spotlight.style.top = (topLeft.y + pad) + 'px';
    spotlight.style.width = fieldWidth + 'px';
    spotlight.style.height = fieldHeight + 'px';
    spotlight.classList.remove('hidden');
  }

  const cx = topLeft.x + (bottomRight.x - topLeft.x) / 2;
  const cy = topLeft.y + (bottomRight.y - topLeft.y) / 2;
  const vw = window.innerWidth;

  const bubble = document.getElementById('tutorialBubble');
  const bubbleText = document.getElementById('tutorialBubbleText');
  if (bubbleText) bubbleText.textContent = 'Tap the field to close';
  if (bubble) {
    bubble.style.left = Math.min(Math.max(cx, 116), vw - 116) + 'px';
    bubble.style.top = Math.max(16, cy - 30) + 'px';
    bubble.classList.remove('hidden');
  }

  const tapPulse = document.getElementById('tutorialTapPulse');
  if (tapPulse) {
    tapPulse.style.left = cx + 'px';
    tapPulse.style.top = cy + 'px';
    tapPulse.classList.remove('hidden');
  }

  const pointer = document.getElementById('tutorialPointer');
  if (pointer) pointer.classList.add('hidden');
  const dropRing = document.getElementById('tutorialDropRing');
  if (dropRing) dropRing.classList.add('hidden');
}

function updateTutorialOverlay(now) {
  const layer = document.getElementById('tutorialLayer');
  if (!layer) return;
  if (!tutorialActive || gameState !== 'PLAYING' || tutorialStep < 0) {
    layer.classList.add('hidden');
    return;
  }
  layer.classList.remove('hidden');

  const fieldEl = document.getElementById('tutorialFieldHighlight');
  if (fieldEl && !(tutorialLevel === 2 && tutorialStep === 2)) fieldEl.classList.add('hidden');

  if (tutorialLevel === 1 && tutorialStep === 0) {
    positionTutorialDrag(now);
  } else if (tutorialLevel === 1 && tutorialStep === 1) {
    positionTutorialTapOnElement(document.getElementById('waveBtn'), 'Tap GO to start the wave');
  } else if (tutorialLevel === 2 && tutorialStep === 0 && tutorialTargetTower) {
    positionTutorialTapAtWorld(tutorialTargetTower.x, tutorialTargetTower.y, 'Tap your tower');
  } else if (tutorialLevel === 2 && tutorialStep === 1) {
    positionTutorialTapOnElement(document.getElementById('inspectUpgradeBtn'), 'Upgrade it here');
  } else if (tutorialLevel === 2 && tutorialStep === 2) {
    positionTutorialCloseStep();
  }
}

function positionTutorialDrag(now) {
  const srcEl = document.getElementById('btn-gun');
  if (!srcEl || !tutorialDestCell) return;
  const srcRect = srcEl.getBoundingClientRect();
  applyTutorialHighlight({ x: srcRect.left, y: srcRect.top, w: srcRect.width, h: srcRect.height }, 'Drag a tower onto the field', 'drag');

  const destWorld = {
    x: tutorialDestCell.c * TILE_SIZE + TILE_SIZE / 2,
    y: tutorialDestCell.r * TILE_SIZE + TILE_SIZE / 2
  };
  const destScreen = worldToScreen(destWorld.x, destWorld.y);
  const tileScreenSize = TILE_SIZE * camZoom;

  const dropRing = document.getElementById('tutorialDropRing');
  dropRing.style.left = (destScreen.x - tileScreenSize * 0.36) + 'px';
  dropRing.style.top = (destScreen.y - tileScreenSize * 0.36) + 'px';
  dropRing.style.width = (tileScreenSize * 0.72) + 'px';
  dropRing.style.height = (tileScreenSize * 0.72) + 'px';
  dropRing.classList.remove('hidden');

  const srcCx = srcRect.left + srcRect.width / 2;
  const srcCy = srcRect.top + srcRect.height / 2;

  const period = 2200;
  const t = (now % period) / period;
  let px, py, opacity;
  if (t < 0.12) {
    px = srcCx; py = srcCy; opacity = 1;
  } else if (t < 0.55) {
    const localT = (t - 0.12) / 0.43;
    const eased = localT < 0.5 ? 2 * localT * localT : 1 - Math.pow(-2 * localT + 2, 2) / 2;
    px = srcCx + (destScreen.x - srcCx) * eased;
    py = srcCy + (destScreen.y - srcCy) * eased;
    opacity = 1;
  } else if (t < 0.75) {
    px = destScreen.x; py = destScreen.y; opacity = 1;
  } else if (t < 0.85) {
    px = destScreen.x; py = destScreen.y;
    opacity = 1 - (t - 0.75) / 0.10;
  } else {
    px = srcCx; py = srcCy; opacity = 0;
  }

  const pointer = document.getElementById('tutorialPointer');
  pointer.style.left = px + 'px';
  pointer.style.top = py + 'px';
  pointer.style.opacity = opacity;
  pointer.classList.remove('hidden');

  document.getElementById('tutorialTapPulse').classList.add('hidden');
}

function setGlow(color, blur) {
  if (perfMode === 'low') {
    ctx.shadowBlur = 0;
    return;
  }
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
}

const MAX_PARTICLES = 260;
function pushParticle(p) {
  particles.push(p);
  if (particles.length > MAX_PARTICLES) {
    particles.splice(0, particles.length - MAX_PARTICLES);
  }
}

function updateDiamondUI() {
  const el = document.getElementById('globalDiamondsVal');
  if (el) el.textContent = diamonds;
  const elLevels = document.getElementById('levelsDiamondVal');
  if (elLevels) elLevels.textContent = diamonds;
  const elUpgrades = document.getElementById('upgradesDiamondVal');
  if (elUpgrades) elUpgrades.textContent = diamonds;
  const badge = document.getElementById('hudDiamondBadge');
  if (badge) {
    if (devMode) {
      badge.classList.add('interactive');
      badge.title = "Click: +50 / Hold: set amount (Dev Mode)";
    } else {
      badge.classList.remove('interactive');
      badge.removeAttribute('title');
    }
  }
}

// --- Dev Mode Resource Management (Click vs Long Press) ---
let devHoldTimer = null;
let devHoldTriggered = false;
let devHoldStartPos = { x: 0, y: 0 };

function promptDevDiamonds() {
  if (!devMode) return;
  devInputOpen = true;
  const val = prompt("Set Diamonds:", diamonds);
  devInputOpen = false;
  suppressBackgroundPause();
  if (val !== null) {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      diamonds = parsed;
      updateDiamondUI();
      renderUpgradeTree();
      saveGameSoon();
    }
  }
}

function promptDevGold() {
  if (!devMode) return;
  devInputOpen = true;
  const val = prompt("Set Gold:", gold);
  devInputOpen = false;
  suppressBackgroundPause();
  if (val !== null) {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      gold = parsed;
      updateUI();
    }
  }
}

function promptDevHp() {
  if (!devMode) return;
  devInputOpen = true;
  const val = prompt("Set Lives (HP):", baseHp);
  devInputOpen = false;
  suppressBackgroundPause();
  if (val !== null) {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      baseHp = parsed;
      updateUI();
    }
  }
}

function initDevResourceHold() {
  const setupHold = (id, promptFn) => {
    const el = document.getElementById(id);
    if (!el || el.dataset.holdBound) return;
    el.dataset.holdBound = '1';

    el.addEventListener('pointerdown', (e) => {
      if (!devMode) return;
      devHoldTriggered = false;
      devHoldStartPos = { x: e.clientX, y: e.clientY };
      clearTimeout(devHoldTimer);
      devHoldTimer = setTimeout(() => {
        devHoldTriggered = true;
        if (navigator.vibrate) { try { navigator.vibrate(35); } catch(e){} }
        promptFn();
      }, 500);
    });

    el.addEventListener('pointermove', (e) => {
      if (!devHoldTimer) return;
      if (Math.hypot(e.clientX - devHoldStartPos.x, e.clientY - devHoldStartPos.y) > 10) {
        clearTimeout(devHoldTimer);
        devHoldTimer = null;
      }
    });

    const cancel = () => {
      clearTimeout(devHoldTimer);
      devHoldTimer = null;
    };
    el.addEventListener('pointerup', cancel);
    el.addEventListener('pointercancel', cancel);
  };

  setupHold('hudDiamondBadge', promptDevDiamonds);
  setupHold('goldHalf', promptDevGold);
  setupHold('hpHalf', promptDevHp);
}

function handleDevDiamondClick() {
  if (!devMode) return;
  if (devHoldTriggered) {
    devHoldTriggered = false;
    return;
  }
  diamonds += 50;
  updateDiamondUI();
  renderUpgradeTree();
  saveGameSoon();
}

function handleDevGoldClick() {
  if (!devMode) return;
  if (devHoldTriggered) {
    devHoldTriggered = false;
    return;
  }
  gold += 200;
  updateUI();
}

function handleDevHpClick() {
  if (!devMode) return;
  if (devHoldTriggered) {
    devHoldTriggered = false;
    return;
  }
  baseHp = Math.min(99, baseHp + 5);
  updateUI();
}

const BASE_BRANCH_ICONS = {
  base_hp: `<svg width="25" height="25" viewBox="-32 -32 64 64"><circle cx="0" cy="0" r="17" fill="none" stroke="#ff2a85" stroke-width="1.6"/><circle cx="0" cy="0" r="11" fill="none" stroke="#ff2a85" stroke-width="1" opacity=".35"/><path d="M0,7 C-10,0 -10,-9 -2.5,-9 C0,-9 0,-6 0,-6 C0,-6 0,-9 2.5,-9 C10,-9 10,0 0,7 Z" fill="#ff2a85"/></svg>`,
  base_gold: `<svg width="25" height="25" viewBox="-32 -32 64 64"><circle cx="0" cy="0" r="17" fill="none" stroke="#f59e0b" stroke-width="1.6"/><circle cx="0" cy="0" r="11" fill="none" stroke="#f59e0b" stroke-width="1" opacity=".35"/><circle cx="0" cy="0" r="8" fill="#f59e0b"/><text x="0" y="4" font-size="11" font-weight="900" fill="#0a0e1c" text-anchor="middle" font-family="Montserrat, sans-serif">$</text></svg>`
};
const BASE_BRANCH_COLORS = { base_hp: '#ff2a85', base_gold: '#f59e0b' };

function renderUpgradeTree() {
  updateDiamondUI();
  const container = document.getElementById('upgradesTreeBody');
  if (!container) return;
  container.innerHTML = '';

  const maxStep = devMode ? 10 : getMaxUpgradeStep();

  const towerRows = UPGRADE_BRANCH_SPECS.towers.map(card => {
    const towerType = card.icon;
    const isLockedCard = !devMode && getLoadoutReferenceLevel() < getTowerUnlockLevel(towerType);
    return {
      key: card.branches[0].key,
      label: card.title,
      iconHtml: TOWER_ICONS[towerType] || '',
      color: (TOWER_CONFIGS[towerType] && TOWER_CONFIGS[towerType].color) || '#00e5ff',
      isLockedCard,
      lockedLabel: isLockedCard ? `${card.title} (Lv.${getTowerUnlockLevel(towerType)})` : card.title
    };
  });
  const baseRows = (UPGRADE_BRANCH_SPECS.base[0].branches || []).map(br => ({
    key: br.key,
    label: br.name,
    iconHtml: BASE_BRANCH_ICONS[br.key] || '',
    color: BASE_BRANCH_COLORS[br.key] || '#00e5ff',
    isLockedCard: false,
    lockedLabel: br.name
  }));

  const addGroupLabel = (text) => {
    const label = document.createElement('div');
    label.className = 'upgrades-row-group-label';
    label.textContent = text;
    container.appendChild(label);
  };

  const addRow = (row) => {
    const currentLvl = upgradeTreeData[row.key] || 0;
    const isMaxed = currentLvl >= 10;
    const nextStep = currentLvl + 1;
    const isSectorGated = !row.isLockedCard && !isMaxed && !devMode && nextStep > maxStep;

    const card = document.createElement('div');
    card.className = 'upgrade-row-card' + (row.isLockedCard ? ' locked-row' : '');

    const iconWrap = document.createElement('div');
    iconWrap.className = 'upgrade-row-icon' + (row.isLockedCard ? ' locked-icon' : '');
    iconWrap.style.borderColor = row.isLockedCard ? 'rgba(140,200,255,0.18)' : row.color;
    iconWrap.innerHTML = row.iconHtml;
    card.appendChild(iconWrap);

    const info = document.createElement('div');
    info.className = 'upgrade-row-info';

    const head = document.createElement('div');
    head.className = 'upgrade-row-head';
    const nameEl = document.createElement('span');
    nameEl.className = 'upgrade-row-name' + (row.isLockedCard ? ' locked-name' : '');
    nameEl.textContent = row.isLockedCard ? row.lockedLabel : row.label;
    const lvlEl = document.createElement('span');
    lvlEl.className = 'upgrade-row-level';
    lvlEl.style.color = row.isLockedCard ? '#5d6a85' : row.color;
    lvlEl.textContent = row.isLockedCard ? 'LOCKED' : `${currentLvl}/10`;
    head.appendChild(nameEl);
    head.appendChild(lvlEl);
    info.appendChild(head);

    const segs = document.createElement('div');
    segs.className = 'upgrade-row-segments';
    for (let s = 1; s <= 10; s++) {
      const seg = document.createElement('div');
      seg.className = 'upgrade-row-seg' + (row.isLockedCard ? ' locked-seg' : '');
      if (!row.isLockedCard && s <= currentLvl) seg.style.background = row.color;
      segs.appendChild(seg);
    }
    info.appendChild(segs);
    card.appendChild(info);

    if (devMode && !row.isLockedCard && currentLvl > 0) {
      const minusBtn = document.createElement('button');
      minusBtn.className = 'upgrade-row-dev-minus';
      minusBtn.textContent = '−';
      minusBtn.onclick = () => handleNodeClick(row.key, currentLvl);
      card.appendChild(minusBtn);
    }

    const buyBtn = document.createElement('button');
    buyBtn.className = 'upgrade-row-buy';
    if (row.isLockedCard) {
      buyBtn.classList.add('locked-buy');
      buyBtn.innerHTML = `<span style="font-size:12px; filter:grayscale(1) brightness(.7);">🔒</span>`;
    } else if (isMaxed) {
      buyBtn.classList.add('max-buy');
      buyBtn.innerHTML = `<span class="upgrade-row-buy-cost" style="color:#8ea3c4;">MAX</span>`;
    } else if (isSectorGated) {
      buyBtn.classList.add('locked-buy');
      let lvlNeeded = 11;
      if (nextStep > 8) lvlNeeded = 41;
      else if (nextStep > 6) lvlNeeded = 31;
      else if (nextStep > 3) lvlNeeded = 21;
      buyBtn.innerHTML = `<span style="font-size:11px; filter:grayscale(1) brightness(.7);">🔒</span><span class="upgrade-row-buy-cost" style="color:#8ea3c4; font-size:10px;">L${lvlNeeded}</span>`;
      buyBtn.onclick = () => showHintToast(`Unlocks on Level ${lvlNeeded}`);
    } else {
      const canAfford = diamonds >= nextStep;
      buyBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2.2" stroke-linejoin="round" style="flex:none;"><polygon points="6 3 18 3 22 9 12 22 2 9" fill="rgba(0,229,255,.25)"/><polyline points="2 9 12 13 22 9"/><line x1="12" y1="22" x2="12" y2="13"/></svg><span class="upgrade-row-buy-cost" style="color:${canAfford ? '#ffffff' : '#f87171'};">${nextStep}</span>`;
      buyBtn.onclick = () => handleNodeClick(row.key, nextStep);
    }
    card.appendChild(buyBtn);
    container.appendChild(card);
  };

  addGroupLabel('Towers');
  towerRows.forEach(addRow);
  addGroupLabel('Base');
  baseRows.forEach(addRow);
}

function navLevelSection(dir) {
  const target = currentLevelSection + dir;
  if (target < 1 || target > TOTAL_SECTIONS) return;
  const isTargetUnlocked = devMode || maxUnlockedLevel > (target - 1) * LEVELS_PER_SECTION;
  if (!isTargetUnlocked) return;
  currentLevelSection = target;
  renderLevelsGrid();
}

function renderLevelsGrid() {
  const levelsGrid = document.getElementById('levelsGrid');
  if (!levelsGrid) return;
  levelsGrid.innerHTML = '';

  const partLabel = document.getElementById('partNavLabel');
  const topChapter = document.getElementById('levelsTopChapter');
  const prevBtn = document.getElementById('partNavPrev');
  const nextBtn = document.getElementById('partNavNext');
  const nextSecUnlocked = devMode || maxUnlockedLevel > currentLevelSection * LEVELS_PER_SECTION;

  if (partLabel) partLabel.textContent = `CHAPTER ${currentLevelSection}`;
  if (topChapter) topChapter.textContent = `CHAPTER ${currentLevelSection}`;

  if (prevBtn) {
    const canGoPrev = currentLevelSection > 1;
    prevBtn.disabled = !canGoPrev;
  }
  if (nextBtn) {
    const canGoNext = currentLevelSection < TOTAL_SECTIONS && nextSecUnlocked;
    nextBtn.disabled = !canGoNext;
  }

  const startLvl = (currentLevelSection - 1) * LEVELS_PER_SECTION + 1;
  const endLvl = currentLevelSection * LEVELS_PER_SECTION;

  for (let lvl = startLvl; lvl <= endLvl; lvl++) {
    const btn = document.createElement('button');
    const isUnlocked = devMode || lvl <= maxUnlockedLevel;
    const earnedStars = levelStars[lvl] || 0;
    const isCleared = clearedLevels.includes(lvl) || earnedStars > 0;
    const isCurrent = lvl === maxUnlockedLevel && !isCleared;

    if (isUnlocked) {
      btn.className = 'level-card-btn' + (isCurrent ? ' current' : (isCleared ? ' cleared' : ''));
      btn.innerHTML = `
        <span class="level-num">${lvl}</span>
        <div class="level-card-stars">
          <span class="mini-star ${earnedStars >= 1 ? 'filled' : 'empty'}">★</span>
          <span class="mini-star ${earnedStars >= 2 ? 'filled' : 'empty'}">★</span>
          <span class="mini-star ${earnedStars >= 3 ? 'filled' : 'empty'}">★</span>
        </div>
      `;
      btn.onclick = () => startSpecificLevel(lvl);
    } else {
      btn.className = 'level-card-btn locked';
      btn.disabled = true;
      btn.innerHTML = `<span class="level-num">🔒</span>`;
    }
    levelsGrid.appendChild(btn);
  }
}

function toggleDevMode(enabled) {
  devMode = enabled;
  const checkbox = document.getElementById('devModeCheckbox');
  if (checkbox && checkbox.checked !== enabled) checkbox.checked = enabled;

  const speedContainer = document.getElementById('speedContainer');
  const livePauseBtn = document.getElementById('livePauseBtn');
  const devClearSaveBtn = document.getElementById('devClearSaveBtn');
  const devLevelSelect = document.getElementById('devLevelSelect');
  const devWaveSelect = document.getElementById('devWaveSelect');
  const devCustomSpawner = document.getElementById('devCustomSpawner');
  const levelText = document.getElementById('levelText');
  const waveText = document.getElementById('waveText');
  const hudStaticLabels = Array.from(document.querySelectorAll('.hud-static-label'));
  const goldHalf = document.getElementById('goldHalf');
  const hpHalf = document.getElementById('hpHalf');

  if (devMode) {
    if (gameState === 'PLAYING' || gameState === 'PAUSED') {
      if (speedContainer) speedContainer.classList.remove('hidden');
      if (livePauseBtn) livePauseBtn.classList.remove('hidden');
      if (devCustomSpawner) devCustomSpawner.classList.remove('hidden');
    }
    if (devClearSaveBtn) devClearSaveBtn.classList.remove('hidden');
    if (devLevelSelect) devLevelSelect.classList.remove('hidden');
    if (devWaveSelect) devWaveSelect.classList.remove('hidden');
    if (levelText) levelText.classList.add('hidden');
    if (waveText) waveText.classList.add('hidden');
    hudStaticLabels.forEach(el => el.classList.add('hidden'));
    if (goldHalf) {
      goldHalf.classList.add('interactive');
      goldHalf.title = "Click: +200 / Hold: set amount (Dev Mode)";
    }
    if (hpHalf) {
      hpHalf.classList.add('interactive');
      hpHalf.title = "Click: +5 / Hold: set amount (Dev Mode)";
    }
    refreshDevDropdowns();
    initDevResourceHold();
  } else {
    if (speedContainer) speedContainer.classList.add('hidden');
    if (livePauseBtn) livePauseBtn.classList.add('hidden');
    if (devClearSaveBtn) devClearSaveBtn.classList.add('hidden');
    if (devLevelSelect) devLevelSelect.classList.add('hidden');
    if (devWaveSelect) devWaveSelect.classList.add('hidden');
    if (devCustomSpawner) devCustomSpawner.classList.add('hidden');
    if (levelText) levelText.classList.remove('hidden');
    if (waveText) waveText.classList.remove('hidden');
    hudStaticLabels.forEach(el => el.classList.remove('hidden'));
    setGameSpeed(1);
    if (speedContainer) speedContainer.value = "1";
    if (isLivePaused) {
      isLivePaused = false;
      if (livePauseBtn) {
        livePauseBtn.innerHTML = '<span>⏸ Pause</span>';
        livePauseBtn.classList.remove('paused');
      }
    }
  }

  renderLevelsGrid();
  updateUI();
  updateUpgradeButtonsLock();
}

function handleClearSaveClick() {
  if (!devMode) return;
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {
    console.warn('SectorDefenseTD: could not clear localStorage', e);
  }

  diamonds = 0;
  maxUnlockedLevel = 1;
  clearedLevels = [];
  levelStars = {};
  Object.keys(upgradeTreeData).forEach(key => { upgradeTreeData[key] = 0; });
  selectedLoadout = [];
  loadoutSyncedUpToLevel = 0;
  settings.showEnemyHp = true;
  settings.perfModeOverride = null;
  perfMode = 'high';
  perfDecided = false;
  perfSampleFrames = 0;
  perfSampleTime = 0;
  tutorialSeen.l1 = false;
  tutorialSeen.l2 = false;
  tutorialSeen.l3 = false;
  hasClaimedX2ThisLevel = false;

  showStartScreen();
  renderLevelsGrid();
  updateDiamondUI();
  updateUpgradeButtonsLock();
  showHintToast('Save cleared');
}

function refreshDevDropdowns() {
  ['devLevelSelect', 'devWaveSelect'].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.dataset.pauseGuard) {
      el.dataset.pauseGuard = '1';
      el.addEventListener('focus', () => suppressBackgroundPause(1500));
      el.addEventListener('change', () => suppressBackgroundPause(1500));
      el.addEventListener('blur', () => suppressBackgroundPause());
    }
  });
  const lvlSelect = document.getElementById('devLevelSelect');
  if (!lvlSelect) return;
  lvlSelect.innerHTML = '';
  for (let l = 1; l <= TOTAL_LEVELS; l++) {
    const opt = document.createElement('option');
    opt.value = l;
    opt.textContent = `${l}`;
    if (l === currentLevel) opt.selected = true;
    lvlSelect.appendChild(opt);
  }

  const lvlConfig = LEVELS_DATA[currentLevel];
  const maxW = lvlConfig ? lvlConfig.totalWaves : 10;
  const waveSelect = document.getElementById('devWaveSelect');
  if (!waveSelect) return;
  waveSelect.innerHTML = '';
  for (let w = 1; w <= maxW; w++) {
    const opt = document.createElement('option');
    opt.value = w;
    opt.textContent = `${w}/${maxW}`;
    if (w === wave) opt.selected = true;
    waveSelect.appendChild(opt);
  }
}

function devJumpToWave(targetWave) {
  const lvlConfig = LEVELS_DATA[currentLevel];
  const maxW = lvlConfig ? lvlConfig.totalWaves : 10;
  if (targetWave < 1 || targetWave > maxW) return;

  enemies = [];
  projectiles = [];
  spawnQueue = [];
  waveInProgress = false;
  waveTimerActive = false;
  autoWaveTimeRemaining = 0;
  wave = targetWave;
  startWave();
}

function setGameSpeed(speed) { gameTimeScale = speed; }

function toggleLivePause() {
  isLivePaused = !isLivePaused;
  const btn = document.getElementById('livePauseBtn');
  if (isLivePaused) {
    btn.innerHTML = '<span>▶ Play</span>';
    btn.classList.add('paused');
  } else {
    btn.innerHTML = '<span>⏸ Pause</span>';
    btn.classList.remove('paused');
  }
}

function updateStartChapterLabel(show) {
  const el = document.getElementById('startChapterLabel');
  if (!el) return;
  if (show) {
    const sector = Math.max(1, Math.min(TOTAL_SECTIONS,
      Math.ceil(Math.min(maxUnlockedLevel, TOTAL_LEVELS) / LEVELS_PER_SECTION)));
    el.textContent = `CHAPTER ${sector}`;
    el.classList.remove('hidden');
  } else {
    el.classList.add('hidden');
  }
}

function showStartScreen() {
  music('menu');
  if (reviveTimerInterval) { clearInterval(reviveTimerInterval); reviveTimerInterval = null; }
  document.getElementById('pauseScreen').classList.add('hidden');
  document.getElementById('levelsScreen').classList.add('hidden');
  document.getElementById('settingsScreen').classList.add('hidden');
  document.getElementById('upgradesScreen').classList.add('hidden');
  document.getElementById('victoryScreen').classList.add('hidden');
  document.getElementById('defeatScreen').classList.add('hidden');
  const revSc = document.getElementById('reviveScreen');
  if (revSc) revSc.classList.add('hidden');
  document.getElementById('startScreen').classList.remove('hidden');

  document.getElementById('econHpSplitBadge').classList.add('hidden');
  document.getElementById('levelWaveSplitBadge').classList.add('hidden');
  document.getElementById('hudRightGroup').classList.add('hidden');
  updateStartChapterLabel(true);
  document.getElementById('controlsWrapper').classList.add('hidden');

  const waveBtn = document.getElementById('waveBtn');
  if (waveBtn) waveBtn.classList.add('hidden');

  document.getElementById('speedContainer').classList.add('hidden');
  document.getElementById('livePauseBtn').classList.add('hidden');
  
  const customSpawner = document.getElementById('devCustomSpawner');
  if (customSpawner) customSpawner.classList.add('hidden');

  const startTopZone = document.querySelector('.start-screen-top-zone');
  if (startTopZone) {
    startTopZone.style.marginTop = 'clamp(140px, 22vh, 200px)';
  }
  const startSubTitle = document.querySelector('.start-sub-title');
  if (startSubTitle) {
    startSubTitle.style.textShadow = '0 0 14px rgba(2, 3, 8, 0.95), 0 2px 8px rgba(2, 3, 8, 0.95)';
  }
  const startMainTitle = document.querySelector('.start-main-title');
  if (startMainTitle) {
    startMainTitle.style.textShadow = '0 0 24px rgba(0, 229, 255, 0.9), 0 0 12px rgba(2, 3, 8, 0.95), 0 3px 10px rgba(2, 3, 8, 0.95)';
  }

  const l1 = MAP_CATALOG['L1'];
  if (l1) buildLevelGeometry(l1.path, l1.cols, l1.rows, l1.blocked);
  resizeCanvasAndCamera();
  gameState = 'START';
  updateUpgradeButtonsLock();
}

function updateUpgradeButtonsLock() {
  const unlockLevel = getLoadoutStartLevel();
  const isUpgradesUnlocked = devMode || getLoadoutReferenceLevel() >= unlockLevel;
  ['mainUpgradesBtn', 'victoryUpgradesBtn', 'defeatUpgradesBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.classList.toggle('no-press-feedback', !isUpgradesUnlocked);
    btn.classList.toggle('btn-locked', !isUpgradesUnlocked);
    btn.disabled = false;
    btn.innerHTML = isUpgradesUnlocked
      ? '<span>TECH TREE</span>'
      : '<span class="btn-lock-glyph">🔒</span><span>TECH TREE</span>';
  });
}

function showSettings() {
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('settingsScreen').classList.remove('hidden');
  gameState = 'SETTINGS';
  const hpCheckbox = document.getElementById('settingShowHp');
  if (hpCheckbox) hpCheckbox.checked = !!settings.showEnemyHp;
  const perfCheckbox = document.getElementById('settingPerfMode');
  if (perfCheckbox) perfCheckbox.checked = (perfMode === 'low');
  applySfxVolume(settings.sfxVolume != null ? settings.sfxVolume : (settings.sfxEnabled === false ? 0 : 100), false);
  applyMusicVolume(settings.musicVolume != null ? settings.musicVolume : (settings.musicEnabled === false ? 0 : 70), false);
}

function closeSettings() {
  document.getElementById('settingsScreen').classList.add('hidden');
  document.getElementById('startScreen').classList.remove('hidden');
  gameState = 'START';
  music('menu');
}

function toggleSettingHp(isChecked) { settings.showEnemyHp = isChecked; saveGameSoon(); }

function applySfxVolume(pct, persist) {
  const v = Math.max(0, Math.min(100, Math.round(Number(pct) || 0)));
  settings.sfxVolume = v;
  settings.sfxEnabled = v > 0;
  sfxSetEnabled(settings.sfxEnabled);
  sfxSetVolume(v / 100);
  if (v === 0) sfxStopBeams();

  const slider = document.getElementById('settingSfxVol');
  if (slider && String(slider.value) !== String(v)) slider.value = v;
  if (slider) slider.classList.toggle('is-muted', v === 0);
  const label = document.getElementById('sfxVolLabel');
  if (label) {
    label.textContent = v === 0 ? 'OFF' : `${v}%`;
    label.classList.toggle('is-muted', v === 0);
  }
  if (persist) saveGameSoon();
}

function applyMusicVolume(pct, persist) {
  const v = Math.max(0, Math.min(100, Math.round(Number(pct) || 0)));
  settings.musicVolume = v;
  settings.musicEnabled = v > 0;
  musicSetEnabled(settings.musicEnabled);
  musicSetVolume(v / 100);

  const slider = document.getElementById('settingMusicVol');
  if (slider && String(slider.value) !== String(v)) slider.value = v;
  if (slider) slider.classList.toggle('is-muted', v === 0);
  const label = document.getElementById('musicVolLabel');
  if (label) {
    label.textContent = v === 0 ? 'OFF' : `${v}%`;
    label.classList.toggle('is-muted', v === 0);
  }
  if (persist) saveGameSoon();
}

function setSfxVolume(pct) { applySfxVolume(pct, true); }
function setMusicVolume(pct) { applyMusicVolume(pct, true); }

function toggleSettingSfx(isChecked) { applySfxVolume(isChecked ? (settings.sfxVolume || 100) : 0, true); }
function toggleSettingMusic(isChecked) { applyMusicVolume(isChecked ? (settings.musicVolume || 70) : 0, true); }

function toggleSettingPerf(isChecked) {
  perfMode = isChecked ? 'low' : 'high';
  settings.perfModeOverride = perfMode;
  perfDecided = true;
  saveGameSoon();
}

function showLevelSelect() {
  music('menu');
  if (reviveTimerInterval) { clearInterval(reviveTimerInterval); reviveTimerInterval = null; }
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('levelsScreen').classList.remove('hidden');
  document.getElementById('econHpSplitBadge').classList.add('hidden');
  document.getElementById('levelWaveSplitBadge').classList.add('hidden');
  document.getElementById('hudRightGroup').classList.add('hidden');
  updateStartChapterLabel(false);
  document.getElementById('controlsWrapper').classList.add('hidden');

  const waveBtn = document.getElementById('waveBtn');
  if (waveBtn) waveBtn.classList.add('hidden');

  const customSpawner = document.getElementById('devCustomSpawner');
  if (customSpawner) customSpawner.classList.add('hidden');
  
  currentLevelSection = Math.min(TOTAL_SECTIONS, Math.max(1, Math.ceil(currentLevel / LEVELS_PER_SECTION)));
  renderLevelsGrid();
  showLoadoutWidgetIn('loadoutAnchor-levels');
  gameState = 'LEVELS';
}

function showLevelSelectFromGame() {
  music('menu');
  if (reviveTimerInterval) { clearInterval(reviveTimerInterval); reviveTimerInterval = null; }
  document.getElementById('pauseScreen').classList.add('hidden');
  document.getElementById('victoryScreen').classList.add('hidden');
  document.getElementById('defeatScreen').classList.add('hidden');
  document.getElementById('upgradesScreen').classList.add('hidden');
  const revSc = document.getElementById('reviveScreen');
  if (revSc) revSc.classList.add('hidden');
  document.getElementById('levelsScreen').classList.remove('hidden');
  document.getElementById('econHpSplitBadge').classList.add('hidden');
  document.getElementById('levelWaveSplitBadge').classList.add('hidden');
  document.getElementById('hudRightGroup').classList.add('hidden');
  updateStartChapterLabel(false);
  document.getElementById('controlsWrapper').classList.add('hidden');

  const waveBtn = document.getElementById('waveBtn');
  if (waveBtn) waveBtn.classList.add('hidden');

  const customSpawner = document.getElementById('devCustomSpawner');
  if (customSpawner) customSpawner.classList.add('hidden');
  
  currentLevelSection = Math.min(TOTAL_SECTIONS, Math.max(1, Math.ceil(currentLevel / LEVELS_PER_SECTION)));
  renderLevelsGrid();
  showLoadoutWidgetIn('loadoutAnchor-levels');
  gameState = 'LEVELS';
}

let loadoutWidgetExpanded = false;

function showLoadoutWidgetIn(anchorId) {
  const widget = document.getElementById('loadoutWidget');
  const anchor = document.getElementById(anchorId);
  if (!widget || !anchor) return;

  refreshLoadoutForProgress();

  if (getLoadoutReferenceLevel() < getLoadoutStartLevel()) {
    widget.classList.add('hidden');
    return;
  }

  anchor.appendChild(widget);
  widget.classList.remove('hidden');
  loadoutWidgetExpanded = false;
  renderLoadoutWidgetBody();
}

function toggleLoadoutWidgetExpanded() {
  loadoutWidgetExpanded = !loadoutWidgetExpanded;
  renderLoadoutWidgetBody();
}

function renderLoadoutWidgetBody() {
  const miniIcons = document.getElementById('loadoutWidgetMiniIcons');
  const expandedBox = document.getElementById('loadoutWidgetExpanded');
  if (!miniIcons || !expandedBox) return;

  const countEl = document.getElementById('loadoutWidgetCount');
  if (countEl) {
    countEl.textContent = `${selectedLoadout.length}/${LOADOUT_SIZE}`;
    countEl.classList.toggle('is-full', selectedLoadout.length >= LOADOUT_SIZE);
  }

  if (loadoutWidgetExpanded) {
    miniIcons.innerHTML = '';
    expandedBox.classList.remove('hidden');
    renderLoadoutWidgetGrid();
  } else {
    const canonicalOrder = Object.keys(TOWER_CONFIGS);
    const orderedLoadout = canonicalOrder.filter(t => selectedLoadout.includes(t));
    miniIcons.innerHTML = orderedLoadout.map(t => {
      const col = (TOWER_CONFIGS[t] && TOWER_CONFIGS[t].color) || '#00e5ff';
      return `<span class="loadout-mini-icon" style="border-color:${col};">${TOWER_ICONS[t] || ''}</span>`;
    }).join('');
    expandedBox.classList.add('hidden');
  }
}

function renderLoadoutWidgetGrid() {
  const grid = document.getElementById('loadoutWidgetGrid');
  if (!grid) return;
  const ref = Math.min(getLoadoutReferenceLevel(), TOTAL_LEVELS);
  const pool = (LEVELS_DATA[ref] && LEVELS_DATA[ref].unlockedTowers) ? LEVELS_DATA[ref].unlockedTowers : ['gun'];

  const isFull = selectedLoadout.length >= LOADOUT_SIZE;
  grid.innerHTML = '';
  pool.forEach(type => {
    const conf = TOWER_CONFIGS[type];
    if (!conf) return;
    const isSelected = selectedLoadout.includes(type);
    const btn = document.createElement('div');
    btn.className = 'loadout-tower-btn'
      + (isSelected ? ' selected' : '')
      + (!isSelected && isFull ? ' blocked' : '');
    btn.innerHTML = `
      <div class="tower-btn-icon">${TOWER_ICONS[type] || ''}</div>
      <span class="tower-btn-title">${TOWER_NAMES[type] || type}</span>
    `;
    btn.onclick = (e) => { e.stopPropagation(); toggleLoadoutWidgetTower(type); };
    grid.appendChild(btn);
  });
}

function toggleLoadoutWidgetTower(type) {
  const idx = selectedLoadout.indexOf(type);
  if (idx !== -1) {
    selectedLoadout.splice(idx, 1);
  } else {
    if (selectedLoadout.length >= LOADOUT_SIZE) {
      showHintToast(`Deselect a tower first (${LOADOUT_SIZE} max)`);
      return;
    }
    selectedLoadout.push(type);
  }
  renderLoadoutWidgetBody();
  saveGameSoon();
}

let milestoneSteps = [];
let milestoneIndex = 0;
let milestoneOnComplete = null;
let pendingUpgradeUnlockFx = false;
let pendingLoadoutRevealFx = false;

function buildMilestoneSteps(clearedLevel) {
  const steps = [];
  const sector = Math.ceil(clearedLevel / LEVELS_PER_SECTION);
  const newTowers = getNewlyUnlockedTowers(clearedLevel + 1);
  const upgradesUnlockLevel = getLoadoutStartLevel();
  const upgradesJustUnlocked = (clearedLevel + 1) === upgradesUnlockLevel;
  const loadoutJustUnlocked = upgradesJustUnlocked;

  if (clearedLevel === LEVELS_PER_SECTION) {
    steps.push({
      kicker: `Sector ${sector}`,
      title: 'Complete',
      body: `You've cleared all ${LEVELS_PER_SECTION} levels of the first sector.<br><br>` +
            `<b>Global Upgrades</b> are now unlocked \u2014 spend diamonds there to permanently ` +
            `strengthen every tower and your base, for every battle from here on.`
    });
  } else {
    steps.push({
      kicker: `Sector ${sector}`,
      title: 'Complete',
      body: `Sector ${sector} cleared. The next sector brings tougher enemies \u2014 and a new tower.`
    });
  }

  newTowers.forEach(type => {
    steps.push({
      kicker: 'New Tower',
      title: TOWER_NAMES[type] || type,
      art: { type },
      body: TOWER_UNLOCK_BLURBS[type] || 'A new tower is now available in battle.'
    });
  });

  if (loadoutJustUnlocked) {
    steps.push({
      kicker: 'Choose Your',
      title: 'Loadout',
      body: `You now have more than ${LOADOUT_SIZE} towers \u2014 but only <b>${LOADOUT_SIZE}</b> can be ` +
            `taken into a battle.<br><br>Pick your three below. You can change them before every level.`,
      embed: 'loadout'
    });
  }
  return steps;
}

function showMilestoneSequence(clearedLevel, onComplete) {
  milestoneSteps = buildMilestoneSteps(clearedLevel);
  milestoneIndex = 0;
  milestoneOnComplete = onComplete;
  if (milestoneSteps.length === 0) {
    if (onComplete) onComplete();
    return;
  }
  document.getElementById('milestoneScreen').classList.remove('hidden');
  sfx('unlock');
  renderMilestoneStep();
}

function renderMilestoneStep() {
  const step = milestoneSteps[milestoneIndex];
  if (!step) return;
  const scr = document.getElementById('milestoneScreen');
  document.getElementById('milestoneKicker').textContent = step.kicker;
  document.getElementById('milestoneTitle').textContent = step.title;
  document.getElementById('milestoneBody').innerHTML = step.body || '';

  const art = document.getElementById('milestoneArt');
  if (step.art) {
    const conf = TOWER_CONFIGS[step.art.type];
    const col = (conf && conf.color) || '#00e5ff';
    art.innerHTML = `
      <div class="milestone-art-ring" style="border-color:${col}; box-shadow:0 0 30px ${col}66;">
        ${buildTowerIconSvg(step.art.type, 1, 58)}
      </div>`;
    art.classList.remove('hidden');
  } else {
    art.innerHTML = '';
    art.classList.add('hidden');
  }

  const embed = document.getElementById('milestoneEmbed');
  if (step.embed === 'loadout') {
    embed.classList.remove('hidden');
    renderMilestoneLoadoutGrid();
  } else {
    embed.classList.add('hidden');
  }

  scr.querySelectorAll('.seq-in, .milestone-art').forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
}

function renderMilestoneLoadoutGrid() {
  const grid = document.getElementById('milestoneLoadoutGrid');
  if (!grid) return;
  const ref = Math.min(getLoadoutReferenceLevel(), TOTAL_LEVELS);
  const pool = (LEVELS_DATA[ref] && LEVELS_DATA[ref].unlockedTowers) ? LEVELS_DATA[ref].unlockedTowers : ['gun'];
  const isFull = selectedLoadout.length >= LOADOUT_SIZE;
  grid.innerHTML = '';
  pool.forEach(type => {
    const conf = TOWER_CONFIGS[type];
    if (!conf) return;
    const isSelected = selectedLoadout.includes(type);
    const btn = document.createElement('div');
    btn.className = 'loadout-tower-btn'
      + (isSelected ? ' selected' : '')
      + (!isSelected && isFull ? ' blocked' : '');
    btn.innerHTML = `
      <div class="tower-btn-icon">${TOWER_ICONS[type] || ''}</div>
      <span class="tower-btn-title">${TOWER_NAMES[type] || type}</span>
    `;
    btn.onclick = (e) => {
      e.stopPropagation();
      toggleLoadoutWidgetTower(type);
      renderMilestoneLoadoutGrid();
    };
    grid.appendChild(btn);
  });
  const hint = document.getElementById('milestoneEmbedHint');
  if (hint) hint.textContent = `${selectedLoadout.length}/${LOADOUT_SIZE} selected \u2014 tap a selected tower to free a slot`;
}

function advanceMilestone() {
  milestoneIndex++;
  if (milestoneIndex < milestoneSteps.length) {
    renderMilestoneStep();
    return;
  }
  document.getElementById('milestoneScreen').classList.add('hidden');
  const done = milestoneOnComplete;
  milestoneOnComplete = null;
  milestoneSteps = [];
  if (done) done();
}

function showUpgradesScreen(fromSource) {
  const unlockLevel = getLoadoutStartLevel();
  const isUpgradesUnlocked = devMode || getLoadoutReferenceLevel() >= unlockLevel;
  if (!isUpgradesUnlocked) {
    showHintToast(`Will be available on Level ${unlockLevel}`);
    return;
  }

  if (!fromSource) {
    if (gameState === 'VICTORY') fromSource = 'victory';
    else if (gameState === 'DEFEAT') fromSource = 'defeat';
    else if (gameState === 'LEVELS' || !document.getElementById('levelsScreen').classList.contains('hidden')) fromSource = 'levels';
    else fromSource = 'main';
  }
  upgradesPreviousSource = fromSource;

  const bgScreenId = fromSource === 'victory' ? 'victoryScreen'
    : (fromSource === 'defeat' ? 'defeatScreen'
    : (fromSource === 'levels' ? 'levelsScreen' : 'startScreen'));

  ['startScreen', 'victoryScreen', 'pauseScreen', 'levelsScreen', 'settingsScreen', 'defeatScreen', 'reviveScreen']
    .forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('screen-bg-only');
      if (id === bgScreenId) {
        el.classList.remove('hidden');
        el.classList.add('screen-bg-only');
      } else {
        el.classList.add('hidden');
      }
    });

  const controlsWrapper = document.getElementById('controlsWrapper');
  if (controlsWrapper) controlsWrapper.classList.add('hidden');
  const waveBtn = document.getElementById('waveBtn');
  if (waveBtn) waveBtn.classList.add('hidden');
  const devSpawner = document.getElementById('devCustomSpawner');
  if (devSpawner) devSpawner.classList.add('hidden');

  const upg = document.getElementById('upgradesScreen');
  const isResultBg = (bgScreenId === 'victoryScreen' || bgScreenId === 'defeatScreen');
  upg.classList.toggle('from-result', isResultBg);
  upg.classList.toggle('from-main', !isResultBg);
  upg.classList.remove('hidden');
  gameState = 'UPGRADES';
  renderUpgradeTree();
}

function closeUpgradesScreen() {
  document.getElementById('upgradesScreen').classList.add('hidden');
  
  ['startScreen', 'victoryScreen', 'defeatScreen', 'levelsScreen', 'pauseScreen', 'settingsScreen'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('screen-bg-only');
  });

  if (upgradesPreviousSource === 'victory') {
    document.getElementById('victoryScreen').classList.remove('hidden');
    gameState = 'VICTORY';
  } else if (upgradesPreviousSource === 'defeat') {
    document.getElementById('defeatScreen').classList.remove('hidden');
    gameState = 'DEFEAT';
  } else if (upgradesPreviousSource === 'levels') {
    document.getElementById('levelsScreen').classList.remove('hidden');
    gameState = 'LEVELS';
  } else {
    document.getElementById('startScreen').classList.remove('hidden');
    gameState = 'START';
  }
}

function renderVictoryStars(starsCount) {
  const row = document.getElementById('victoryStarsRow');
  if (!row) return;
  row.innerHTML = '';
  for (let s = 1; s <= 3; s++) {
    const isFilled = s <= starsCount;
    const slot = document.createElement('span');
    slot.className = `star-slot ${isFilled ? 'filled' : 'empty'}`;
    if (isFilled) setTimeout(() => sfx('star'), 160 + (s - 1) * 180);
    slot.innerHTML = `
      <svg viewBox="0 0 24 24">
        <polygon points="12,2 15.1,8.6 22,9.6 17,14.6 18.2,21.6 12,18.3 5.8,21.6 7,14.6 2,9.6 8.9,8.6"
          fill="${isFilled ? '#f59e0b' : 'rgba(16,21,40,.7)'}"
          stroke="${isFilled ? '#f59e0b' : '#334155'}"
          stroke-width="1.8"
          stroke-linejoin="round" />
      </svg>`;
    row.appendChild(slot);
  }
}

function isOverCancelZone(clientX, clientY) {
  if (clientX === undefined || clientY === undefined) return false;
  const wrapper = document.getElementById('controlsWrapper');
  if (!wrapper || wrapper.classList.contains('hidden')) return false;
  const rect = wrapper.getBoundingClientRect();
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}

function showCancelZoneVisual(show) {
  const overlay = document.getElementById('cancelZoneOverlay');
  const buildPanel = document.getElementById('buildPanel');
  if (show) {
    if (overlay) overlay.classList.remove('hidden');
    if (buildPanel) buildPanel.classList.add('drag-hidden');
  } else {
    if (overlay) {
      overlay.classList.add('hidden');
      overlay.classList.remove('hovered');
    }
    if (buildPanel) buildPanel.classList.remove('drag-hidden');
  }
}

function updateCancelZoneHover(clientX, clientY) {
  const overlay = document.getElementById('cancelZoneOverlay');
  if (!overlay || overlay.classList.contains('hidden')) return;
  if (isOverCancelZone(clientX, clientY)) {
    overlay.classList.add('hovered');
  } else {
    overlay.classList.remove('hovered');
  }
}

canvas.addEventListener('touchstart', (e) => {
  if (gameState !== 'PLAYING') return;
  if (e.touches.length === 1 && !draggingTower) {
    isPanning = true;
    panStartTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    panStartCam = { x: camX, y: camY };
  } else if (e.touches.length === 2) {
    isPanning = false;
    const t1 = e.touches[0];
    const t2 = e.touches[1];
    initialPinchDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    initialPinchZoom = camZoom;
    pinchCenterWorld = screenToWorld((t1.clientX + t2.clientX) / 2, (t1.clientY + t2.clientY) / 2);
  }
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
  if (e.touches.length === 1 && isPanning) {
    const dx = e.touches[0].clientX - panStartTouch.x;
    const dy = e.touches[0].clientY - panStartTouch.y;
    if (camZoom > baseZoom * 1.01) {
      camX = panStartCam.x + dx;
      camY = panStartCam.y + dy;
      clampCamera();
    }
  } else if (e.touches.length === 2 && initialPinchDist) {
    const t1 = e.touches[0];
    const t2 = e.touches[1];
    const curDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    camZoom = Math.min(maxZoom, Math.max(minZoom, initialPinchZoom * (curDist / initialPinchDist)));
    const centerScreen = { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
    camX = centerScreen.x - pinchCenterWorld.x * camZoom;
    camY = centerScreen.y - pinchCenterWorld.y * camZoom;
    clampCamera();
  }
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
  if (e.touches.length < 2) initialPinchDist = null;
  if (e.touches.length === 0) isPanning = false;
});

window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.code === 'KeyR' || e.key === 'r' || e.key === 'R')) {
    if (gameState === 'PLAYING' || gameState === 'PAUSED' || gameState === 'VICTORY' || gameState === 'DEFEAT') {
      e.preventDefault();
      retryLevel();
      return;
    }
  }

  if (e.code === 'Space' && gameState === 'PLAYING') {
    mouseSpacePressed = true;
    e.preventDefault();
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    mouseSpacePressed = false;
    isMousePanning = false;
  }
});

canvas.addEventListener('mousedown', (e) => {
  if (gameState !== 'PLAYING') return;
  if (e.button === 1 || (e.button === 0 && mouseSpacePressed)) {
    isMousePanning = true;
    panStartMouse = { x: e.clientX, y: e.clientY };
    panStartCam = { x: camX, y: camY };
    e.preventDefault();
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (!isMousePanning) return;
  const dx = e.clientX - panStartMouse.x;
  const dy = e.clientY - panStartMouse.y;
  camX = panStartCam.x + dx;
  camY = panStartCam.y + dy;
  clampCamera();
});

canvas.addEventListener('mouseup', () => {
  isMousePanning = false;
});

canvas.addEventListener('wheel', (e) => {
  if (gameState !== 'PLAYING') return;
  e.preventDefault();
  const mouseWorld = screenToWorld(e.clientX, e.clientY);
  const zoomSpeed = 0.15;
  camZoom = Math.min(maxZoom, Math.max(minZoom, camZoom * (1 - (e.deltaY > 0 ? zoomSpeed : -zoomSpeed))));
  camX = e.clientX - mouseWorld.x * camZoom;
  camY = e.clientY - mouseWorld.y * camZoom;
  clampCamera();
}, { passive: false });

let hintToastTimer = null;
function showHintToast(message) {
  const el = document.getElementById('hintToast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('visible');
  if (hintToastTimer) clearTimeout(hintToastTimer);
  hintToastTimer = setTimeout(() => { el.classList.remove('visible'); }, 2000);
}

function initBuildPanel() {
  const panel = document.getElementById('buildPanel');
  if (!panel || typeof TOWER_CONFIGS === 'undefined') return;
  panel.querySelectorAll('.tower-btn').forEach(b => b.remove());

  const canonicalOrder = Object.keys(TOWER_CONFIGS);
  const pool = getBuildPanelPool(currentLevel);
  const towerTypes = canonicalOrder.filter(t => pool.includes(t));

  towerTypes.forEach(type => {
    const conf = TOWER_CONFIGS[type];
    const btn = document.createElement('div');
    btn.className = 'tower-btn';
    btn.id = `btn-${type}`;
    btn.setAttribute('data-type', type);
    btn.innerHTML = `
      <div class="tower-btn-top-row">
        <div class="tower-btn-icon">
          ${TOWER_ICONS[type] || ''}
        </div>
        <span class="cost">
          <span class="cost-icon">
            <svg width="12" height="12" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ff9100" /><text x="12" y="16.5" font-size="14" font-weight="900" fill="#00" text-anchor="middle">$</text></svg>
          </span>
          ${conf.cost}
        </span>
      </div>
      <span class="tower-btn-title">${TOWER_NAMES[type] || type}</span>
    `;

    btn.addEventListener('mousedown', (e) => {
      if (gameState !== 'PLAYING') return;
      if (!isTowerActiveThisLevel(type)) {
        showHintToast(`Will be available on Level ${getTowerUnlockLevel(type)}`);
        return;
      }
      if (gold < TOWER_CONFIGS[type].cost || btn.classList.contains('disabled')) return;
      const worldPos = screenToWorld(e.clientX, e.clientY);
      draggingTower = { type: type, worldX: worldPos.x, worldY: worldPos.y, isTouch: false };
      showCancelZoneVisual(true);
    });

    btn.addEventListener('touchstart', (e) => {
      if (gameState !== 'PLAYING') return;
      if (!isTowerActiveThisLevel(type)) {
        showHintToast(`Will be available on Level ${getTowerUnlockLevel(type)}`);
        e.preventDefault();
        return;
      }
      if (gold < TOWER_CONFIGS[type].cost || btn.classList.contains('disabled')) return;
      const touch = e.touches[0];
      const worldPos = screenToWorld(touch.clientX, touch.clientY - TOUCH_OFFSET_Y);
      draggingTower = { type: type, worldX: worldPos.x, worldY: worldPos.y, isTouch: true };
      showCancelZoneVisual(true);
      e.preventDefault();
    }, { passive: false });

    panel.appendChild(btn);
  });
}

window.addEventListener('mousemove', (e) => {
  if (!draggingTower) return;
  const worldPos = screenToWorld(e.clientX, e.clientY);
  draggingTower.worldX = worldPos.x;
  draggingTower.worldY = worldPos.y;
  updateCancelZoneHover(e.clientX, e.clientY);
});

window.addEventListener('touchmove', (e) => {
  if (!draggingTower || e.touches.length > 1) return;
  const touch = e.touches[0];
  const worldPos = screenToWorld(touch.clientX, touch.clientY - TOUCH_OFFSET_Y);
  draggingTower.worldX = worldPos.x;
  draggingTower.worldY = worldPos.y;
  updateCancelZoneHover(touch.clientX, touch.clientY);
}, { passive: false });

window.addEventListener('mouseup', (e) => {
  if (draggingTower) handleDrop(draggingTower.worldX, draggingTower.worldY, e.clientX, e.clientY);
});

window.addEventListener('touchend', (e) => {
  if (draggingTower) {
    let cx, cy;
    if (e.changedTouches && e.changedTouches.length > 0) {
      cx = e.changedTouches[0].clientX;
      cy = e.changedTouches[0].clientY;
    }
    handleDrop(draggingTower.worldX, draggingTower.worldY, cx, cy);
  }
});

canvas.addEventListener('click', (e) => {
  if (gameState !== 'PLAYING' || isPanning) return;
  const worldPos = screenToWorld(e.clientX, e.clientY);
  const c = Math.floor(worldPos.x / TILE_SIZE);
  const r = Math.floor(worldPos.y / TILE_SIZE);
  const clickedTower = towers.find(t => t.c === c && t.r === r);
  if (clickedTower) {
    selectTower(clickedTower);
  } else {
    deselectTower();
  }
});

function armSellConfirm() {
  sellConfirmArmed = true;
  if (sellConfirmTimer) clearTimeout(sellConfirmTimer);
  sellConfirmTimer = setTimeout(() => {
    sellConfirmArmed = false;
    sellConfirmTimer = null;
    updateInspectUI();
  }, 3000);
  updateInspectUI();
}

function resetSellConfirm() {
  sellConfirmArmed = false;
  if (sellConfirmTimer) { clearTimeout(sellConfirmTimer); sellConfirmTimer = null; }
}

function selectTower(tower) {
  selectedTower = tower;
  resetSellConfirm();
  document.getElementById('buildPanel').classList.add('hidden');
  document.getElementById('inspectPanel').classList.remove('hidden');
  updateInspectUI();

  if (tutorialActive && tutorialLevel === 2 && tutorialStep === 0) {
    tutorialStep = 1;
  }
}

function deselectTower() {
  selectedTower = null;
  resetSellConfirm();
  document.getElementById('inspectPanel').classList.add('hidden');
  document.getElementById('buildPanel').classList.remove('hidden');

  if (tutorialActive && tutorialLevel === 2 && tutorialStep === 1) {
    tutorialStep = 0;
  } else if (tutorialActive && tutorialLevel === 2 && tutorialStep === 2) {
    completeTutorial(2);
  }
}

function updateInspectUI() {
  if (!selectedTower) return;
  const t = selectedTower;
  const lvlConfig = LEVELS_DATA[currentLevel];
  const canUpgradeLevel = !lvlConfig || lvlConfig.canUpgrade !== false;

  const iconBox = document.getElementById('inspectIconBox');
  if (iconBox) {
    iconBox.innerHTML = buildTowerIconSvg(t.type, t.level || 1, 28) || '';
    iconBox.style.borderColor = t.color || '#00e5ff';
    iconBox.style.boxShadow = `0 0 16px ${t.color || '#00e5ff'}55`;
  }

  const nameEl = document.getElementById('inspectName');
  if (nameEl) nameEl.textContent = TOWER_NAMES[t.type] || t.type;

  const statDmgEl = document.getElementById('inspectStatDamage');
  if (statDmgEl) {
    if (t.type === 'laser' || t.type === 'melter') {
      statDmgEl.textContent = `LV.${t.level} · DPS ${Math.round(t.damage)}`;
    } else if (t.type === 'stasis') {
      const stasisPowerLvl = upgradeTreeData.stasis_power || 0;
      const slowPct = Math.round(Math.min(0.9, TOWER_CONFIGS.stasis.slowFactor * (1 + stasisPowerLvl * (TOWER_CONFIGS.stasis.powerSlow || 0))) * 100);
      statDmgEl.textContent = `LV.${t.level} · SLOW ${slowPct}%`;
    } else {
      statDmgEl.textContent = `LV.${t.level} · DMG ${Math.round(t.damage)}`;
    }
  }

  for (let lvl = 1; lvl <= 3; lvl++) {
    const seg = document.getElementById(`lvlBar${lvl}`);
    if (seg) {
      if (lvl <= t.level) {
        seg.classList.add('active');
        seg.style.background = t.color || '#00e5ff';
        seg.style.boxShadow = `0 0 6px ${t.color || '#00e5ff'}99`;
      } else {
        seg.classList.remove('active');
        seg.style.background = 'rgba(140, 200, 255, 0.2)';
        seg.style.boxShadow = 'none';
      }
    }
  }

  const upgCost = getUpgradeCost(t.type, t.level);
  const upgBtn = document.getElementById('inspectUpgradeBtn');
  const upgValEl = document.getElementById('inspectUpgradeCostVal');
  const upgIconEl = document.getElementById('inspectUpgradeCostIcon');
  const upgStatusEl = document.getElementById('inspectUpgradeStatus');
  const sellValTextEl = document.getElementById('inspectSellValText');
  const sellTitleEl = document.getElementById('inspectSellTitle');

  if (!canUpgradeLevel) {
    upgBtn.disabled = true;
    if (upgValEl) upgValEl.textContent = '';
    if (upgIconEl) upgIconEl.style.display = 'none';
    if (upgStatusEl) upgStatusEl.textContent = 'LOCKED';
  } else if (t.level >= 3) {
    upgBtn.disabled = true;
    if (upgValEl) upgValEl.textContent = '';
    if (upgIconEl) upgIconEl.style.display = 'none';
    if (upgStatusEl) upgStatusEl.textContent = 'MAX';
  } else {
    const canAfford = gold >= upgCost;
    upgBtn.disabled = !canAfford;
    if (upgValEl) {
      upgValEl.textContent = `${upgCost}`;
      upgValEl.style.color = canAfford ? '#ffffff' : '#f87171';
    }
    if (upgIconEl) upgIconEl.style.display = 'inline-flex';
    if (upgStatusEl) upgStatusEl.textContent = 'UPGRADE';
  }

  const refund = Math.floor(t.totalInvested * 0.7);
  const sellBtn = document.getElementById('inspectSellBtn');
  const sellIconEl = sellBtn ? sellBtn.querySelector('.cost-icon') : null;
  if (sellConfirmArmed) {
    if (sellBtn) sellBtn.classList.add('confirm-armed');
    if (sellTitleEl) sellTitleEl.textContent = 'CONFIRM?';
    if (sellValTextEl) sellValTextEl.textContent = `+${refund}`;
    if (sellIconEl) sellIconEl.style.display = 'none';
  } else {
    if (sellBtn) sellBtn.classList.remove('confirm-armed');
    if (sellTitleEl) sellTitleEl.textContent = 'SELL';
    if (sellValTextEl) sellValTextEl.textContent = `${refund}`;
    if (sellIconEl) sellIconEl.style.display = '';
  }
}

function updateWaveCircle(dt) {
  const progEl = el('waveCircleProg');
  if (!progEl) return;
  const circumference = 207.35;
  let p = 0;
  let isCountdown = false;

  const lvlConfig = LEVELS_DATA[currentLevel];
  let totalDelay = 5.0;
  let baseBonus = 15;

  if (lvlConfig && lvlConfig.waves) {
    const currentWaveObj = lvlConfig.waves.find(w => w.wave === wave);
    if (currentWaveObj) {
      if (currentWaveObj.delayAfter !== undefined) {
        totalDelay = currentWaveObj.delayAfter;
      }
      if (currentWaveObj.earlyBonus !== undefined) {
        baseBonus = currentWaveObj.earlyBonus;
      }
    }
  }

  if (waveTimerActive && autoWaveTimeRemaining > 0) {
    p = totalDelay > 0 ? Math.max(0, Math.min(1, autoWaveTimeRemaining / totalDelay)) : 0;
    isCountdown = true;
  } else if (waveInProgress) {
    p = (spawnQueue.length === 0) ? 1.0 : Math.max(0, Math.min(1, waveSpawnElapsedTime / waveTotalSpawnTime));
  }

  if (p > 0.005) {
    progEl.style.opacity = '1';
    progEl.style.strokeDashoffset = (circumference * (1 - p)).toFixed(2);
  } else {
    progEl.style.opacity = '0';
    progEl.style.strokeDashoffset = circumference.toFixed(2);
  }
  progEl.classList.toggle('counting-down', isCountdown);

  const bonusEl = el('waveGoBonus');
  const bonusValEl = el('waveGoBonusVal');
  if (!bonusEl || !bonusValEl) return;

  const maxW = (lvlConfig && lvlConfig.totalWaves) || 10;
  let bonus = 0;
  if (isCountdown && wave < maxW) {
    const moneyMultiplier = 1 + (upgradeTreeData.base_gold || 0) * 0.05;
    const fractionSaved = totalDelay > 0 ? Math.min(1, Math.max(0, autoWaveTimeRemaining / totalDelay)) : 0;
    bonus = Math.round(fractionSaved * baseBonus * moneyMultiplier);
  }

  bonusValEl.textContent = bonus > 0 ? bonus : '0';
  bonusEl.classList.toggle('visible', bonus > 0);
}

function updateUI() {
  const lvlConfig = LEVELS_DATA[currentLevel];
  const maxW = lvlConfig ? lvlConfig.totalWaves : 10;

  document.getElementById('goldVal').textContent = gold;
  document.getElementById('hpVal').textContent = baseHp;
  document.getElementById('levelText').textContent = `${currentLevel}`;
  document.getElementById('waveText').textContent = `${Math.min(wave, maxW)}/${maxW}`;

  for (let key in TOWER_CONFIGS) {
    const btn = document.getElementById(`btn-${key}`);
    if (btn) {
      const isUnlocked = isTowerActiveThisLevel(key);
      const affordable = gold >= TOWER_CONFIGS[key].cost;
      if (!isUnlocked) {
        btn.className = 'tower-btn locked disabled';
      } else if (!affordable) {
        btn.className = 'tower-btn disabled';
      } else {
        btn.className = 'tower-btn ready';
      }
    }
  }

  const waveBtn = document.getElementById('waveBtn');
  if (waveBtn) {
    waveBtn.disabled = (waveInProgress || spawnQueue.length > 0 || wave >= maxW);
  }

  if (selectedTower) updateInspectUI();
}

function createSparks(x, y, color1, count = 6, color2 = null) {
  const c1 = color1 || '#00e5ff';
  const c2 = color2 || c1;
  const n = perfMode === 'low' ? Math.max(1, Math.round(count * 0.5)) : count;
  for (let i = 0; i < n; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 50 + Math.random() * 120;
    pushParticle({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: (color2 && i % 2 !== 0) ? c2 : c1,
      radius: 2 + Math.random() * 2.5,
      life: 0.22 + Math.random() * 0.22,
      maxLife: 0.44
    });
  }
}

function createSteamPuff(x, y) {
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.0;
  const speed = 12 + Math.random() * 16;
  pushParticle({
    x: x + (Math.random() - 0.5) * 7,
    y: y + (Math.random() - 0.5) * 3,
    vx: Math.cos(angle) * speed * 0.35,
    vy: Math.sin(angle) * speed,
    color: '#e2e8f0',
    radius: 3 + Math.random() * 3,
    life: 0.55 + Math.random() * 0.4,
    maxLife: 0.95,
    isSteam: true
  });
}

function createExplosion(x, y, radius, color1 = '#ff9100', color2 = null) {
  const c1 = color1;
  const c2 = color2 || color1;
  pushParticle({ x, y, vx: 0, vy: 0, color: c1, radius: radius * 0.4, life: 0.18, maxLife: 0.18, isFlash: true });
  const n = perfMode === 'low' ? 14 : 28;
  for (let i = 0; i < n; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 40 + Math.random() * 150;
    pushParticle({
      x, y,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      color: (i % 2 === 0) ? c1 : c2,
      radius: 3 + Math.random() * 3.5,
      life: 0.35 + Math.random() * 0.15, maxLife: 0.5
    });
  }
}

function createShockwave(x, y, maxRadius, color) {
  shockwaves.push({ x, y, maxRadius, color, duration: 0.32, elapsed: 0 });
}

const STAR_TINTS = ['#ffffff', '#cfe6ff', '#ffe2f5', '#d9fbff'];
let synthStars = [];
let lastStarUpdateTime = performance.now();

function createStar(randomizeLife = false) {
  const maxLife = Math.random() * 13.0 + 9.0;
  return {
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.5 + 0.6,
    baseAlpha: Math.random() * 0.55 + 0.4,
    twinkleSpeed: Math.random() * 0.9 + 0.4,
    twinklePhase: Math.random() * Math.PI * 2,
    color: STAR_TINTS[Math.floor(Math.random() * STAR_TINTS.length)],
    life: randomizeLife ? Math.random() * maxLife : 0,
    maxLife: maxLife
  };
}

function initSynthStars() {
  synthStars = [];
  const starCount = 85;
  for (let i = 0; i < starCount; i++) {
    synthStars.push(createStar(true));
  }
}
initSynthStars();

function updateAndDrawStars(w, h, now) {
  const dt = Math.min((now - lastStarUpdateTime) / 1000, 0.1);
  lastStarUpdateTime = now;
  const time = now / 1000;

  ctx.save();
  for (let i = 0; i < synthStars.length; i++) {
    const star = synthStars[i];
    star.life += dt;
    if (star.life >= star.maxLife) {
      synthStars[i] = createStar(false);
      continue;
    }

    const lifeProgress = star.life / star.maxLife;
    const fade = Math.sin(lifeProgress * Math.PI);
    const twinkle = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
    const alpha = star.baseAlpha * Math.max(0, twinkle) * fade;

    if (alpha > 0.01) {
      ctx.fillStyle = star.color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawCosmicNebulaBackground(w, h) {
  const baseGrad = ctx.createLinearGradient(0, 0, 0, h);
  baseGrad.addColorStop(0, '#0a0718');
  baseGrad.addColorStop(0.5, '#070a18');
  baseGrad.addColorStop(1, '#04050c');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  const rad1 = ctx.createRadialGradient(w * 0.25, h * 0.15, 10, w * 0.25, h * 0.15, w * 0.65);
  rad1.addColorStop(0, 'rgba(120, 40, 190, 0.55)');
  rad1.addColorStop(1, 'transparent');
  ctx.fillStyle = rad1;
  ctx.fillRect(0, 0, w, h);

  const rad2 = ctx.createRadialGradient(w * 0.85, h * 0.70, 10, w * 0.85, h * 0.70, w * 0.60);
  rad2.addColorStop(0, 'rgba(0, 120, 160, 0.45)');
  rad2.addColorStop(1, 'transparent');
  ctx.fillStyle = rad2;
  ctx.fillRect(0, 0, w, h);

  const rad3 = ctx.createRadialGradient(w * 0.55, h * 0.45, 10, w * 0.55, h * 0.45, w * 0.50);
  rad3.addColorStop(0, 'rgba(255, 42, 133, 0.18)');
  rad3.addColorStop(1, 'transparent');
  ctx.fillStyle = rad3;
  ctx.fillRect(0, 0, w, h);

  const vignette = ctx.createRadialGradient(w * 0.5, h * 0.45, w * 0.15, w * 0.5, h * 0.45, w * 0.85);
  vignette.addColorStop(0.4, 'transparent');
  vignette.addColorStop(1, 'rgba(2, 3, 8, 0.85)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

function drawSynthWaveTriangleLogo5C(w, horizonY, time) {
  const cx = w * 0.5;
  const floatOffset = Math.sin(time * 0.7) * 4;
  const tipY = horizonY - 24 + floatOffset;
  const topY = Math.max(82, horizonY * 0.22) + floatOffset;
  const halfW = Math.min(w * 0.35, (tipY - topY) * 0.65);

  const backTiers = [
    { color: '#5b6bff', width: 1.4, alpha: 0.18, scaleSpread: 1.24 },
    { color: '#8a3cff', width: 1.4, alpha: 0.22, scaleSpread: 1.18 },
    { color: '#c026a0', width: 1.4, alpha: 0.26, scaleSpread: 1.12 },
    { color: '#ff2fb0', width: 1.4, alpha: 0.30, scaleSpread: 1.06 },
    { color: '#eafcff', width: 2.8, alpha: 1.00, scaleSpread: 1.00, glow: true }
  ];

  backTiers.forEach(tier => {
    ctx.save();
    ctx.globalAlpha = tier.alpha;
    ctx.strokeStyle = tier.color;
    ctx.lineWidth = tier.width;
    if (tier.glow) {
      setGlow('#00e5ff', 16);
    }
    const curHalfW = halfW * tier.scaleSpread;
    const curTopY = topY - (tier.scaleSpread - 1) * 12;

    ctx.beginPath();
    ctx.moveTo(cx, tipY);
    ctx.lineTo(cx - curHalfW, curTopY);
    ctx.lineTo(cx + curHalfW, curTopY);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  });
}

function drawSynthWavePerspectiveScene(now) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const time = now / 1000;
  const horizonY = h * 0.51;
  const floorH = h - horizonY;
  const vpX = w * 0.5;

  drawCosmicNebulaBackground(w, h);
  updateAndDrawStars(w, h, now);

  ctx.save();
  const horizCount = 14;
  const bottomStep = Math.max(34, (floorH / horizCount) * 1.5);
  const targetBottomCellWidth = bottomStep * 1.1;
  const numLines = Math.ceil((w * 1.4) / targetBottomCellWidth);

  ctx.lineWidth = 1.0;
  ctx.strokeStyle = 'rgba(125, 165, 255, 0.30)';
  for (let i = -numLines; i <= numLines; i++) {
    const bottomX = vpX + (i + 0.5) * targetBottomCellWidth;
    const topX = vpX + (i + 0.5) * (targetBottomCellWidth * 0.32);
    ctx.beginPath();
    ctx.moveTo(topX, horizonY);
    ctx.lineTo(bottomX, h);
    ctx.stroke();
  }

  const roadTopHalfW = targetBottomCellWidth * 0.16;
  const roadBottomHalfW = targetBottomCellWidth * 0.50;

  ctx.fillStyle = 'rgba(6, 100, 112, 0.42)';
  ctx.beginPath();
  ctx.moveTo(vpX - roadTopHalfW, horizonY);
  ctx.lineTo(vpX + roadTopHalfW, horizonY);
  ctx.lineTo(vpX + roadBottomHalfW, h);
  ctx.lineTo(vpX - roadBottomHalfW, h);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = 'rgba(45, 212, 191, 0.75)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(vpX - roadTopHalfW, horizonY);
  ctx.lineTo(vpX - roadBottomHalfW, h);
  ctx.moveTo(vpX + roadTopHalfW, horizonY);
  ctx.lineTo(vpX + roadBottomHalfW, h);
  ctx.stroke();

  const railOffset = (time * 28) % 18;
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.55)';
  setGlow('#00e5ff', 4);
  ctx.lineWidth = 1.3;
  ctx.setLineDash([7, 11]);
  ctx.lineDashOffset = railOffset;
  const railTopHalfW = roadTopHalfW * 0.55;
  const railBottomHalfW = roadBottomHalfW * 0.55;
  ctx.beginPath();
  ctx.moveTo(vpX - railTopHalfW, horizonY);
  ctx.lineTo(vpX - railBottomHalfW, h);
  ctx.moveTo(vpX + railTopHalfW, horizonY);
  ctx.lineTo(vpX + railBottomHalfW, h);
  ctx.stroke();
  ctx.restore();

  const gridOffset = (time * 0.42) % 1;
  for (let j = 0; j < horizCount; j++) {
    const progress = (j + gridOffset) / horizCount;
    const currentY = horizonY + Math.pow(progress, 1.95) * floorH;
    const alpha = Math.min(0.32, progress * 0.35);
    ctx.strokeStyle = `rgba(125, 165, 255, ${alpha})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, currentY);
    ctx.lineTo(w, currentY);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  const fogGrad = ctx.createLinearGradient(0, horizonY, 0, horizonY + 80);
  fogGrad.addColorStop(0, 'rgba(0, 229, 255, 0.20)');
  fogGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = fogGrad;
  ctx.fillRect(0, horizonY, w, 80);

  ctx.strokeStyle = '#eafcff';
  setGlow('#00e5ff', 24);
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(w, horizonY);
  ctx.stroke();
  ctx.restore();

  drawSynthWaveTriangleLogo5C(w, horizonY, time);
}

function drawChevron(centerX, centerY, angle, size, color, glowColor) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3.2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (glowColor) {
    setGlow(glowColor, 10);
  }
  ctx.beginPath();
  ctx.moveTo(-size * 0.8, -size);
  ctx.lineTo(size * 0.9, 0);
  ctx.lineTo(-size * 0.8, size);
  ctx.stroke();
  ctx.restore();
}

function drawPathPortals() {
  if (!activePathTiles || activePathTiles.length < 2) return;
  const startTile = activePathTiles[0];
  const nextTile = activePathTiles[1];
  const spawnX = startTile.c * TILE_SIZE;
  const spawnY = startTile.r * TILE_SIZE;
  const spawnAngle = Math.atan2(nextTile.r - startTile.r, nextTile.c - startTile.c);

  const spawnOffsets = [-14, 0, 14];
  spawnOffsets.forEach(off => {
    const px = spawnX + 35 + Math.cos(spawnAngle) * off;
    const py = spawnY + 35 + Math.sin(spawnAngle) * off;
    drawChevron(px, py, spawnAngle, 13, '#00f0ff', '#00f0ff');
  });

  const prevTile = activePathTiles[activePathTiles.length - 2];
  const endTile = activePathTiles[activePathTiles.length - 1];
  const baseX = endTile.c * TILE_SIZE;
  const baseY = endTile.r * TILE_SIZE;
  const baseAngle = Math.atan2(endTile.r - prevTile.r, endTile.c - prevTile.c);

  const baseOffsets = [-14, 0, 14];
  baseOffsets.forEach(off => {
    const px = baseX + 35 + Math.cos(baseAngle) * off;
    const py = baseY + 35 + Math.sin(baseAngle) * off;
    drawChevron(px, py, baseAngle, 13, '#ff2a85', '#ff2a85');
  });
}

function renderCellRails(cell) {
  if (!cell.isTurn && cell.rails) {
    ctx.beginPath();
    ctx.moveTo(cell.rails[0].x1, cell.rails[0].y1);
    ctx.lineTo(cell.rails[0].x2, cell.rails[0].y2);
    ctx.moveTo(cell.rails[1].x1, cell.rails[1].y1);
    ctx.lineTo(cell.rails[1].x2, cell.rails[1].y2);
    ctx.stroke();
  } else if (cell.isTurn && cell.turnPivot) {
    ctx.beginPath();
    ctx.arc(cell.turnPivot.x, cell.turnPivot.y, cell.turnRadii[0], cell.turnAngles.start, cell.turnAngles.end, cell.turnAngles.anticlockwise);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cell.turnPivot.x, cell.turnPivot.y, cell.turnRadii[1], cell.turnAngles.start, cell.turnAngles.end, cell.turnAngles.anticlockwise);
    ctx.stroke();
  }
}

function drawPathRails(now) {
  if (!pathCells || pathCells.length <= 2) return;
  const totalCells = pathCells.length;
  const timeSeconds = now / 1000;
  const dashOffset = -(timeSeconds * 30);

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
  setGlow('#00e5ff', 4);
  ctx.lineWidth = 2.0;
  ctx.setLineDash([10, 8]);
  ctx.lineDashOffset = dashOffset;

  for (let i = 1; i < totalCells - 1; i++) {
    renderCellRails(pathCells[i]);
  }
  ctx.restore();
}

function drawTowerGlyphOps(ops, color, isDisabled, isCooling) {
  const fillOf = (f) => {
    if (f === 'd') return TOWER_GLYPH_DARK;
    return isDisabled ? '#475569' : color;
  };
  ops.forEach(op => {
    if (op.t === 'rect') {
      ctx.beginPath();
      if (op.r) ctx.roundRect(op.x, op.y, op.w, op.h, op.r);
      else ctx.rect(op.x, op.y, op.w, op.h);
      ctx.fillStyle = fillOf(op.f);
      ctx.fill();
      if (op.s) { ctx.strokeStyle = fillOf(op.s); ctx.lineWidth = op.sw || 1; ctx.stroke(); }
    } else if (op.t === 'poly' || op.t === 'bolt') {
      ctx.save();
      if (op.t === 'bolt') {
        ctx.translate(op.cx, 0);
        ctx.rotate(op.rot * Math.PI / 180);
        ctx.scale(op.scale, op.scale);
      }
      ctx.beginPath();
      ctx.moveTo(op.pts[0], op.pts[1]);
      for (let i = 2; i < op.pts.length; i += 2) ctx.lineTo(op.pts[i], op.pts[i + 1]);
      ctx.closePath();
      ctx.fillStyle = fillOf(op.f);
      ctx.fill();
      ctx.restore();
    } else if (op.t === 'circle') {
      ctx.beginPath();
      ctx.arc(op.cx, op.cy, op.r, 0, Math.PI * 2);
      ctx.fillStyle = fillOf(op.f);
      ctx.fill();
    } else if (op.t === 'pline') {
      ctx.beginPath();
      ctx.moveTo(op.pts[0], op.pts[1]);
      for (let i = 2; i < op.pts.length; i += 2) ctx.lineTo(op.pts[i], op.pts[i + 1]);
      ctx.strokeStyle = isDisabled ? '#475569' : (isCooling ? '#64748b' : color);
      ctx.lineWidth = op.sw;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  });
}

function drawTowerModel(type, angle, color, level = 1, glow = '#00e5ff', isDisabled = false, isCooling = false, isShooting = false, heatProgress = 0) {
  ctx.save();
  if (isDisabled) ctx.globalAlpha = 0.45;

  const spec = TOWER_GLYPH_SPECS[type];
  const lvl = Math.max(1, Math.min(3, level));
  const ringColor = isDisabled ? '#64748b' : glow;

  const radGrad = ctx.createRadialGradient(0, 0, 8, 0, 0, 32);
  radGrad.addColorStop(0, glow + '66');
  radGrad.addColorStop(0.6, glow + '1a');
  radGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = radGrad;
  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = TOWER_GLYPH_DARK;
  ctx.beginPath();
  ctx.arc(0, 0, 17, 0, Math.PI * 2);
  ctx.fill();

  setGlow(isDisabled ? 'transparent' : glow, isShooting ? 12 : 7);
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(0, 0, 17, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalAlpha *= 0.35;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 11, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = isDisabled ? 0.45 : 1;

  ctx.lineWidth = 1.6;
  TOWER_GLYPH_RINGS[lvl].forEach(r => {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
  });

  const effectiveAngle = (type === 'stasis') ? 0 : angle;
  ctx.rotate(effectiveAngle);

  if (spec) {
    const fore = spec.elevationDeg ? Math.cos(spec.elevationDeg * Math.PI / 180) : 1;
    if (spec.elevationDeg) {
      ctx.save();
      ctx.globalAlpha *= 0.35;
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.ellipse(6, 3, 11, 5.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.scale(fore, 1);
    }
    drawTowerGlyphOps(spec.barrel, color, isDisabled, isCooling);
    if (spec.elevationDeg) {
      ctx.restore();
      if (spec.muzzle) {
        const mx = spec.muzzle.atX * fore;
        ctx.beginPath();
        ctx.ellipse(mx, 0, spec.muzzle.rx, spec.muzzle.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = TOWER_GLYPH_DARK;
        ctx.fill();
        ctx.strokeStyle = isDisabled ? '#475569' : color;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
    }
  }

  setGlow(isDisabled ? 'transparent' : glow, 14);
  if (spec && spec.flakes) {
    ctx.strokeStyle = isDisabled ? '#475569' : color;
    ctx.lineCap = 'round';
    TOWER_GLYPH_FLAKES[lvl].forEach(fl => {
      ctx.save();
      ctx.translate(fl.cx, fl.cy);
      ctx.scale(fl.scale, fl.scale);
      ctx.lineWidth = fl.sw;
      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        ctx.moveTo(-5, 0);
        ctx.lineTo(5, 0);
        ctx.stroke();
        ctx.rotate(Math.PI / 3);
      }
      ctx.restore();
    });
  } else {
    ctx.fillStyle = isDisabled ? '#475569' : color;
    TOWER_GLYPH_CORES[lvl].forEach(d => {
      ctx.beginPath();
      ctx.arc(d.cx, d.cy, d.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  ctx.rotate(-effectiveAngle);

  if (type === 'melter' && heatProgress > 0) {
    const ringR = 13;
    const clampedHeat = Math.max(0, Math.min(1, heatProgress));
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.65)';
    ctx.lineWidth = 3;
    ctx.arc(0, 0, ringR, 0, Math.PI * 2);
    ctx.stroke();

    const isOverheated = clampedHeat >= 0.999;
    const heatColor = isOverheated ? '#ffffff' : (isCooling ? '#fb923c' : '#ef4444');
    ctx.beginPath();
    ctx.strokeStyle = heatColor;
    setGlow(heatColor, isOverheated ? 12 : 5);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.rotate(-Math.PI / 2);
    ctx.arc(0, 0, ringR, 0, Math.PI * 2 * clampedHeat);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

function drawEnemyModel(e, showHpBar = true) {
  ctx.save();
  ctx.translate(e.x, e.y);

  const isBlinkerShielded = (e.type === 'blinker' || e.type === 'chronos_warp') && e.isShielded;
  const renderColor = isBlinkerShielded ? '#64748b' : e.color;

  if (isBlinkerShielded) {
    ctx.save();
    ctx.strokeStyle = '#ffffff';
    setGlow('#ffffff', 8);
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, e.radius * 1.45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  if (e.slowTimer > 0) {
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, e.radius * 1.25, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (!isBlinkerShielded) {
    const glowGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, e.radius * 2.5);
    glowGrad.addColorStop(0, renderColor + (e.isBoss ? '88' : (e.isMiniBoss ? '66' : '55')));
    glowGrad.addColorStop(0.5, renderColor + (e.isBoss ? '30' : (e.isMiniBoss ? '20' : '15')));
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(0, 0, e.radius * 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  if (isBlinkerShielded) {
    ctx.globalAlpha = 0.52;
  }

  const strokeW = e.isBoss ? 5.0 : (e.isMiniBoss ? 3.6 : 2.4);
  ctx.fillStyle = isBlinkerShielded ? '#334155' : renderColor + (e.isBoss ? '28' : (e.isMiniBoss ? '22' : '18'));
  ctx.strokeStyle = renderColor;
  ctx.lineWidth = strokeW;
  setGlow(isBlinkerShielded ? 'transparent' : renderColor, isBlinkerShielded ? 0 : (e.isBoss ? 26 : (e.isMiniBoss ? 18 : 14)));

  if (e.shape === 'circle') {
    ctx.beginPath();
    ctx.arc(0, 0, e.radius, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  } else if (e.shape === 'triangle') {
    ctx.rotate(e.angle);
    const R = e.radius * 1.2;
    ctx.beginPath();
    ctx.moveTo(R, 0);
    ctx.lineTo(-R * 0.5, R * 0.866);
    ctx.lineTo(-R * 0.5, -R * 0.866);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.rotate(-e.angle);
  } else if (e.shape === 'trapezoid' || e.shape === 'triangle_inverted') {
    ctx.rotate(e.angle);
    ctx.beginPath();
    ctx.moveTo(e.radius * 1.2, -e.radius * 0.4);
    ctx.lineTo(e.radius * 1.2, e.radius * 0.4);
    ctx.lineTo(-e.radius * 0.8, e.radius * 0.9);
    ctx.lineTo(-e.radius * 0.8, -e.radius * 0.9);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.rotate(-e.angle);
  } else if (e.shape === 'kite') {
    ctx.rotate(e.angle);
    ctx.beginPath();
    ctx.moveTo(e.radius * 1.4, 0);
    ctx.lineTo(0, -e.radius * 0.9);
    ctx.lineTo(-e.radius * 1.1, 0);
    ctx.lineTo(0, e.radius * 0.9);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.rotate(-e.angle);
  } else if (e.shape === 'square') {
    const s = e.radius * 1.5;
    ctx.beginPath();
    ctx.roundRect(-s/2, -s/2, s, s, 3);
    ctx.fill(); ctx.stroke();
  } else if (e.shape === 'diamond') {
    ctx.beginPath();
    ctx.moveTo(0, -e.radius * 1.3); ctx.lineTo(e.radius * 1.1, 0);
    ctx.lineTo(0, e.radius * 1.3); ctx.lineTo(-e.radius * 1.1, 0);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
  } else if (e.shape === 'hexagon') {
    ctx.beginPath();
    for (let hx = 0; hx < 6; hx++) {
      const a = (hx * Math.PI) / 3;
      const hxX = Math.cos(a) * e.radius * 1.15;
      const hxY = Math.sin(a) * e.radius * 1.15;
      if (hx === 0) ctx.moveTo(hxX, hxY); else ctx.lineTo(hxX, hxY);
    }
    ctx.closePath();
    ctx.fill(); ctx.stroke();
  } else if (e.shape === 'octagon') {
    ctx.beginPath();
    for (let oc = 0; oc < 8; oc++) {
      const a = (oc * Math.PI) / 4;
      const ocX = Math.cos(a) * e.radius * 1.2;
      const ocY = Math.sin(a) * e.radius * 1.2;
      if (oc === 0) ctx.moveTo(ocX, ocY); else ctx.lineTo(ocX, ocY);
    }
    ctx.closePath();
    ctx.fill(); ctx.stroke();
  }

  ctx.restore();

  if (e.slowTimer > 0) {
    ctx.save();
    ctx.fillStyle = '#38bdf8';
    setGlow('#00e5ff', 6);
    ctx.font = 'bold 11px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('❄', e.radius * 0.85, -e.radius * 0.85);
    ctx.restore();
  }

  if (showHpBar && settings.showEnemyHp) {
    ctx.shadowBlur = 0;
    const barW = Math.max(22, e.radius * 2.2);
    const barH = e.isBoss ? 5 : (e.isMiniBoss ? 4 : 3);
    const hpPct = Math.max(0, e.hp / e.maxHp);
    ctx.fillStyle = 'rgba(7, 10, 20, 0.9)';
    ctx.fillRect(-barW/2, -e.radius - (e.isBoss ? 14 : (e.isMiniBoss ? 12 : 8)), barW, barH);
    ctx.fillStyle = e.isBoss ? (e.color || '#ff2a85') : (hpPct > 0.5 ? '#00e5ff' : '#ff9100');
    ctx.fillRect(-barW/2, -e.radius - (e.isBoss ? 14 : (e.isMiniBoss ? 12 : 8)), barW * hpPct, barH);
  }

  ctx.restore();
}

function drawJaggedLightning(x1, y1, x2, y3, color, alpha, progress = 1.0) {
  const fullDist = Math.hypot(x2 - x1, y3 - y1);
  if (fullDist <= 0 || progress <= 0) return;

  const currentDist = fullDist * Math.min(1.0, progress);
  const dirX = (x2 - x1) / fullDist;
  const dirY = (y3 - y1) / fullDist;
  const endX = x1 + dirX * currentDist;
  const endY = y1 + dirY * currentDist;

  const segments = Math.max(5, Math.floor(currentDist / 12));
  const normalX = -dirY;
  const normalY = dirX;

  const points = [{ x: x1, y: y1 }];
  const dx = (endX - x1) / segments;
  const dy = (endY - y1) / segments;

  for (let s = 1; s < segments; s++) {
    const jitter = (Math.random() - 0.5) * 22;
    points.push({
      x: x1 + dx * s + normalX * jitter,
      y: y1 + dy * s + normalY * jitter
    });
  }
  points.push({ x: endX, y: endY });

  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.strokeStyle = color || '#00ffcc';
  setGlow('#00e5ff', 18);
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  ctx.strokeStyle = '#ffffff';
  setGlow('#00e5ff', 6);
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  if (points.length >= 4) {
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = 'rgba(0, 255, 204, 0.85)';
    const numForks = Math.min(3, Math.floor(points.length / 3));
    for (let f = 0; f < numForks; f++) {
      const idx = 1 + Math.floor(Math.random() * (points.length - 2));
      const pt = points[idx];
      const forkAngle = Math.atan2(dirY, dirX) + (Math.random() > 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.7);
      const forkLen = 8 + Math.random() * 14;
      const forkMidX = pt.x + Math.cos(forkAngle) * (forkLen * 0.5) + (Math.random() - 0.5) * 6;
      const forkMidY = pt.y + Math.sin(forkAngle) * (forkLen * 0.5) + (Math.random() - 0.5) * 6;
      const forkEndX = pt.x + Math.cos(forkAngle) * forkLen;
      const forkEndY = pt.y + Math.sin(forkAngle) * forkLen;
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
      ctx.lineTo(forkMidX, forkMidY);
      ctx.lineTo(forkEndX, forkEndY);
      ctx.stroke();
    }
  }

  ctx.restore();
}

function render(now) {
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  const isUpgradesFromCombat = (gameState === 'UPGRADES' && (upgradesPreviousSource === 'victory' || upgradesPreviousSource === 'defeat'));

  if ((gameState === 'START' || gameState === 'SETTINGS' || gameState === 'LEVELS' || gameState === 'UPGRADES') && !isUpgradesFromCombat) {
    drawSynthWavePerspectiveScene(now);
    return;
  }

  drawCosmicNebulaBackground(window.innerWidth, window.innerHeight);
  updateAndDrawStars(window.innerWidth, window.innerHeight, now);

  ctx.save();
  ctx.translate(camX, camY);
  ctx.scale(camZoom, camZoom);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cellVal = grid[r] ? grid[r][c] : 0;
      ctx.fillStyle = (cellVal === 1) ? 'rgba(30, 20, 51, 0.42)' : (cellVal === 3 ? 'rgba(0, 0, 0, 0.7)' : 'rgba(12, 15, 29, 0.34)');
      ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = (cellVal === 1) ? 'rgba(61, 33, 102, 0.65)' : (cellVal === 3 ? 'rgba(0, 0, 0, 0.85)' : 'rgba(27, 36, 64, 0.45)');
      ctx.lineWidth = 1;
      ctx.strokeRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }

  drawPathRails(now);
  drawPathPortals();

  towers.forEach(t => {
    if (t.type === 'stasis') {
      ctx.save();
      const stasisGrad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.range);
      stasisGrad.addColorStop(0, 'rgba(56, 189, 248, 0.16)');
      stasisGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = stasisGrad;
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.range, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  });

  enemies.forEach(e => {
    if (e.type === 'emp_overlord') {
      ctx.save();
      const empGrad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, 180);
      empGrad.addColorStop(0, 'rgba(251, 146, 60, 0.16)');
      empGrad.addColorStop(1, 'rgba(251, 146, 60, 0)');
      ctx.fillStyle = empGrad;
      ctx.beginPath();
      ctx.arc(e.x, e.y, 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  });

  if (selectedTower) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(selectedTower.x, selectedTower.y, selectedTower.range, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 229, 255, 0.08)';
    ctx.fillRect(selectedTower.c * TILE_SIZE, selectedTower.r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
    ctx.strokeRect(selectedTower.c * TILE_SIZE, selectedTower.r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    ctx.restore();
  }

  towers.forEach(t => {
    ctx.save();
    ctx.translate(t.x, t.y);
    const isCooling = (t.type === 'melter' && t.melterCoolingTimer > 0);
    const isTeslaShooting = (t.type === 'tesla' && lightningBolts.some(lb => lb.x1 === t.x && lb.life > 0.04));
    const melterRampT = (t.type === 'melter') ? (t.melterRampTime || TOWER_CONFIGS.melter.rampTime || 4.0) : 4.0;
    const meltHeatProgress = (t.type === 'melter')
      ? (isCooling ? (t.melterCoolingTimer / melterRampT) : Math.min(1, (t.melterFireTimer || 0) / melterRampT))
      : 0;
    drawTowerModel(t.type, t.angle, t.color, t.level, t.glow, t.disabledTimer > 0, isCooling, isTeslaShooting, meltHeatProgress);

    if (t.disabledTimer > 0) {
      ctx.save();
      ctx.translate(16, -16);
      ctx.fillStyle = '#0a0e1c';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fb923c';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.strokeStyle = '#fb923c';
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(1, -4);
      ctx.lineTo(-3, 1);
      ctx.lineTo(0, 1);
      ctx.lineTo(-1, 4);
      ctx.lineTo(3, -1);
      ctx.lineTo(0, -1);
      ctx.closePath();
      ctx.fillStyle = '#fb923c';
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();

    if (t.type === 'laser' && t.target && t.isLockedOn && t.disabledTimer <= 0) {
      const muzzleX = t.x + Math.cos(t.angle) * 24;
      const muzzleY = t.y + Math.sin(t.angle) * 24;
      ctx.save();
      setGlow('#ff2a85', 14);
      ctx.beginPath();
      ctx.moveTo(muzzleX, muzzleY);
      ctx.lineTo(t.target.x, t.target.y);
      ctx.strokeStyle = '#ff2a85';
      ctx.lineWidth = 3.5 + Math.sin(Date.now() * 0.02) * 1.5;
      ctx.stroke();
      ctx.restore();
    }

    if (t.type === 'melter' && t.target && t.isLockedOn && t.disabledTimer <= 0 && t.melterCoolingTimer <= 0) {
      const muzzleX = t.x + Math.cos(t.angle) * 24;
      const muzzleY = t.y + Math.sin(t.angle) * 24;
      const beamW = 3.5;
      ctx.save();
      setGlow('#ef4444', 16);
      ctx.beginPath();
      ctx.moveTo(muzzleX, muzzleY);
      ctx.lineTo(t.target.x, t.target.y);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = beamW;
      ctx.stroke();
      ctx.restore();
    }
  });

  enemies.forEach(e => drawEnemyModel(e, true));

  projectiles.forEach(p => {
    ctx.save();
    if (p.type === 'bullet') {
      ctx.fillStyle = '#ffffff';
      setGlow('#00e5ff', 10);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.type === 'mortar_shell') {
      const tProg = Math.max(0, Math.min(1, p.elapsed / p.duration));
      const apex = p.arcApex || 45;
      const heightOffset = 4 * apex * tProg * (1 - tProg);
      const shadowScale = 1 - 0.45 * (heightOffset / Math.max(1, apex));
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, 5 * shadowScale, 2.6 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#ff9100';
      setGlow('#ff9100', 12);
      ctx.beginPath();
      ctx.arc(p.x, p.y - heightOffset, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });

  lightningBolts.forEach(lb => {
    if (lb.delay && lb.delay > 0) return;
    const alpha = lb.life / lb.maxLife;
    if (lb.isRail) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = TOWER_CONFIGS.railgun.glow;
      setGlow(TOWER_CONFIGS.railgun.color, 20);
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(lb.x1, lb.y1);
      ctx.lineTo(lb.x2, lb.y2);
      ctx.stroke();
      ctx.restore();
    } else {
      const prog = lb.travelTime ? Math.min(1.0, (lb.elapsed || 0) / lb.travelTime) : 1.0;
      drawJaggedLightning(lb.x1, lb.y1, lb.x2, lb.y2, lb.color || '#00ffcc', alpha, prog);
    }
  });

  shockwaves.forEach(sw => {
    const prog = sw.elapsed / sw.duration;
    const currentR = sw.maxRadius * Math.sin(prog * (Math.PI / 2));
    ctx.save();
    ctx.strokeStyle = sw.color;
    ctx.globalAlpha = Math.max(0, 1 - prog);
    setGlow(sw.color, 16);
    ctx.lineWidth = 2.5 * (1 - prog);
    ctx.beginPath();
    ctx.arc(sw.x, sw.y, currentR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  });

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  particles.forEach(pt => {
    const prog = pt.life / pt.maxLife;
    ctx.save();
    ctx.globalAlpha = prog;
    if (pt.isSteam) {
      const growProg = 1 - prog;
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = prog * 0.55;
      ctx.fillStyle = pt.color;
      setGlow(pt.color, 5);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.radius * (0.6 + growProg * 0.9), 0, Math.PI * 2);
      ctx.fill();
    } else if (pt.isFlash) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = pt.color;
      setGlow(pt.color, 12);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.radius * prog, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });
  ctx.restore();

  if (draggingTower) {
    const c = Math.floor(draggingTower.worldX / TILE_SIZE);
    const r = Math.floor(draggingTower.worldY / TILE_SIZE);
    const isValidCell = c >= 0 && c < COLS && r >= 0 && r < ROWS;
    const canBuild = isValidCell && grid[r][c] === 0;
    const conf = TOWER_CONFIGS[draggingTower.type];

    if (isValidCell) {
      ctx.fillStyle = canBuild ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 42, 133, 0.3)';
      ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      ctx.strokeStyle = canBuild ? '#00e5ff' : '#ff2a85';
      ctx.lineWidth = 2;
      ctx.strokeRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    ctx.beginPath();
    ctx.arc(draggingTower.worldX, draggingTower.worldY, conf.range, 0, Math.PI * 2);
    ctx.strokeStyle = canBuild ? 'rgba(0, 229, 255, 0.45)' : 'rgba(255, 42, 133, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.translate(draggingTower.worldX, draggingTower.worldY);
    drawTowerModel(draggingTower.type, 0, conf.color, 1, conf.glow);
    ctx.restore();
  }

  ctx.restore();

  updateTutorialOverlay(now);
}

if (typeof window !== 'undefined') {
  initDevResourceHold();
}