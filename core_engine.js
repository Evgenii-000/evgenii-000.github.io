// Synth Wave Defense -- core_engine.js
// Изолированное ядро симуляции (Headless Core)
// Только физика, тайминги, геометрия и баланс. Никакой графики и аудио.

const TILE_SIZE = 70;
let COLS = 10;
let ROWS = 7;
let currentLevel = 1;
let gold = 100;
let baseHp = 10;
let matchStartBaseHp = 10;
let wave = 1;
let waveInProgress = false;
let autoWaveTimeRemaining = 0;
let waveTimerActive = false;
let victoryDelayTimer = 0;

let grid = [];
let activePathTiles = [];
let pathCells = [];
let obstacleCells = [];
let WAYPOINTS = [];

let towers = [];
let enemies = [];
let projectiles = [];
let lightningBolts = [];
let spawnQueue = [];
let spawnTimer = 0;

// Переменная upgradeTreeData уже объявлена в data.js, поэтому здесь мы её не создаем заново

const MINIBOSS_BASE_DAMAGE_TIER_LEVEL = 21;
const BOSS_BASE_DAMAGE_TIER_LEVEL = 30;

function getBaseDamageFor(e) {
  if (e.isBoss) return currentLevel >= BOSS_BASE_DAMAGE_TIER_LEVEL ? 10 : 5;
  if (e.isMiniBoss) return currentLevel >= MINIBOSS_BASE_DAMAGE_TIER_LEVEL ? 4 : 2;
  return 1;
}

function buildLevelGeometry(pathNodes, colsCount, rowsCount, blockedCells) {
  COLS = colsCount || 10;
  ROWS = rowsCount || 7;
  grid = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
  activePathTiles = pathNodes;
  pathCells = [];
  obstacleCells = [];

  for (let i = 0; i < pathNodes.length - 1; i++) {
    const p1 = pathNodes[i];
    const p2 = pathNodes[i + 1];
    const cStep = Math.sign(p2.c - p1.c);
    const rStep = Math.sign(p2.r - p1.r);
    let curC = p1.c;
    let curR = p1.r;

    while (curC !== p2.c || curR !== p2.r) {
      if (curR >= 0 && curR < ROWS && curC >= 0 && curC < COLS) grid[curR][curC] = 1;
      pathCells.push({ c: curC, r: curR, dirX: cStep, dirY: rStep });
      curC += cStep;
      curR += rStep;
    }
  }

  const lastNode = pathNodes[pathNodes.length - 1];
  const prevCell = pathCells[pathCells.length - 1];
  if (lastNode.r >= 0 && lastNode.r < ROWS && lastNode.c >= 0 && lastNode.c < COLS) {
    grid[lastNode.r][lastNode.c] = 1;
  }
  pathCells.push({ c: lastNode.c, r: lastNode.r, dirX: prevCell ? prevCell.dirX : 0, dirY: prevCell ? prevCell.dirY : 1 });

  WAYPOINTS = pathNodes.map(p => ({
    x: p.c * TILE_SIZE + TILE_SIZE / 2,
    y: p.r * TILE_SIZE + TILE_SIZE / 2
  }));

  if (Array.isArray(blockedCells)) {
    blockedCells.forEach(bc => {
      if (bc.r >= 0 && bc.r < ROWS && bc.c >= 0 && bc.c < COLS && grid[bc.r][bc.c] === 0) {
        grid[bc.r][bc.c] = 3;
      }
    });
  }
}

function buildTowerAt(type, c, r) {
  const conf = TOWER_CONFIGS[type];
  if (grid[r][c] === 0 && gold >= conf.cost) {
    gold -= conf.cost;
    grid[r][c] = 2;

    const powerLvl = upgradeTreeData[`${type}_power`] || 0;
    const dmgBonus = 1 + powerLvl * (conf.powerDmg || 0);
    const rateBonus = 1 + powerLvl * (conf.powerRate || 0);
    const rangeBonus = 1 + powerLvl * (conf.powerRange || 0);
    const calcDamage = (conf.damage || conf.dps || conf.baseDps || 0) * dmgBonus;
    const calcFireRate = conf.fireRate ? (conf.fireRate / rateBonus) : 0;

    const baseLockOnDelay = (type === 'laser' || type === 'melter') ? 0.5 : 0.1;
    const calcLockOnDelay = (type === 'mortar') ? baseLockOnDelay : (baseLockOnDelay / rateBonus);

    const newTower = {
      c, r,
      x: c * TILE_SIZE + TILE_SIZE / 2,
      y: r * TILE_SIZE + TILE_SIZE / 2,
      type: type,
      level: 1,
      totalInvested: conf.cost,
      damage: calcDamage,
      range: conf.range * rangeBonus,
      fireRate: calcFireRate,
      lastFire: 0,
      target: null,
      angle: 0,
      lockOnDelay: calcLockOnDelay,
      lockOnTimer: 0,
      disabledTimer: 0,
      melterFireTimer: 0,
      melterCoolingTimer: 0
    };
    towers.push(newTower);
    return true;
  }
  return false;
}

function getUpgradeCost(type, level) {
  const conf = TOWER_CONFIGS[type];
  const costMult = conf.costMultiplier || 1.3;
  return Math.floor(conf.cost * Math.pow(costMult, level));
}

function upgradeTower(t) {
  if (t.level >= 3) return;
  const cost = getUpgradeCost(t.type, t.level);
  if (gold >= cost) {
    const conf = TOWER_CONFIGS[t.type];
    const dmgMult = conf.damageMultiplier || 1.4;
    const rngMult = conf.rangeMultiplier || 1.1;

    gold -= cost;
    t.level++;
    t.totalInvested += cost;
    t.damage *= dmgMult;
    t.range *= rngMult;
  }
}

function getAutoWaveDelay() {
  if (currentLevel >= 40) return 9.0;
  if (currentLevel >= 30) return 7.0;
  return 5.0;
}

function getMinibossPreDelay() { return 1.5; }
function getBossPreDelay(lvl) {
  const clamped = Math.max(10, Math.min(50, lvl));
  return 2.5 + ((clamped - 10) / 40) * 2.5;
}

function startWave() {
  const lvlConfig = LEVELS_DATA[currentLevel];
  const maxW = lvlConfig ? lvlConfig.totalWaves : 10;
  if (wave > maxW) return;

  waveInProgress = true;
  waveTimerActive = false;
  autoWaveTimeRemaining = 0;
  spawnTimer = 0.15;
  spawnQueue = [];

  const waveData = lvlConfig ? lvlConfig.waves.find(w => w.wave === wave) : null;
  if (waveData && waveData.spawns) {
    waveData.spawns.forEach(grp => {
      if ((grp.isBoss || grp.isMiniBoss) && spawnQueue.length > 0) {
        const preDelay = grp.isBoss ? getBossPreDelay(currentLevel) : getMinibossPreDelay();
        spawnQueue[spawnQueue.length - 1].interval += preDelay;
      }

      const proto = ENEMY_CONFIGS[grp.type] || ENEMY_CONFIGS.grunt;
      const isSwarm = grp.type === 'swarm';
      const swarmClumps = isSwarm ? Math.max(1, grp.clumps || 3) : 0;
      
      const clumpSize = (typeof swarmClumpSizeFor === 'function') ? swarmClumpSizeFor(currentLevel) : 8; 
      const spawnCount = isSwarm ? (swarmClumps * clumpSize) : grp.count;
      const baseRadius = proto.size * (grp.isBoss ? 1.75 : (grp.isMiniBoss ? 1.35 : 1.0));
      const finalRadius = isSwarm ? baseRadius * 0.5 : baseRadius;
      
      const SWARM_CLUMP_INTERVAL = (typeof globalThis.SWARM_CLUMP_INTERVAL !== 'undefined') ? globalThis.SWARM_CLUMP_INTERVAL : 0.045;
      const SWARM_CLUMP_GAP = (typeof globalThis.SWARM_CLUMP_GAP !== 'undefined') ? globalThis.SWARM_CLUMP_GAP : 2.5;
      const SWARM_BOUNTY_SCALE = (typeof globalThis.SWARM_BOUNTY_SCALE !== 'undefined') ? globalThis.SWARM_BOUNTY_SCALE : 0.35;
      
      const spawnInterval = isSwarm ? SWARM_CLUMP_INTERVAL : (grp.interval || 0.8);

      for (let i = 0; i < spawnCount; i++) {
        const isLeft = (i % 2 === 0);
        const laneOffset = isSwarm ? (isLeft ? -6 : 6) : 0;
        const startsNewClump = isSwarm && i > 0 && (i % clumpSize === 0);
        const interval = startsNewClump ? SWARM_CLUMP_GAP : spawnInterval;

        spawnQueue.push({
          type: grp.type,
          isBoss: grp.isBoss, isMiniBoss: grp.isMiniBoss,
          hp: isSwarm ? Math.max(6, Math.round(grp.hp * 0.65)) : grp.hp,
          speed: grp.speed,
          bounty: isSwarm ? Math.max(1, Math.round(grp.bounty * SWARM_BOUNTY_SCALE)) : grp.bounty,
          radius: finalRadius,
          interval: interval,
          laneOffset: laneOffset
        });
      }
    });
  }
}

function triggerManualWave() {
  const lvlConfig = LEVELS_DATA[currentLevel];
  const maxW = lvlConfig ? lvlConfig.totalWaves : 10;

  if (waveTimerActive) {
    const secondsSaved = autoWaveTimeRemaining;
    waveTimerActive = false;
    autoWaveTimeRemaining = 0;
    if (wave < maxW) {
      wave++;
      const moneyMultiplier = 1 + (upgradeTreeData.base_gold || 0) * 0.05;
      const earlyCallBonus = Math.round(secondsSaved * 3 * moneyMultiplier);
      if (earlyCallBonus > 0) gold += earlyCallBonus;
      startWave();
    }
  } else if (!waveInProgress && enemies.length === 0 && spawnQueue.length === 0) {
    if (wave <= maxW) startWave();
  }
}

function updateCore(dt) {
  const lvlConfig = LEVELS_DATA[currentLevel];
  const maxW = lvlConfig ? lvlConfig.totalWaves : 10;

  if (waveTimerActive && autoWaveTimeRemaining > 0) {
    autoWaveTimeRemaining -= dt;
    if (autoWaveTimeRemaining <= 0) {
      autoWaveTimeRemaining = 0;
      waveTimerActive = false;
      if (wave < maxW) {
        wave++;
        const moneyMultiplier = 1 + (upgradeTreeData.base_gold || 0) * 0.05;
        gold += Math.round(15 * moneyMultiplier);
        startWave();
      }
    }
  }

  if (spawnQueue.length > 0) {
    spawnTimer -= dt;
    while (spawnTimer <= 0 && spawnQueue.length > 0) {
      const eData = spawnQueue.shift();
      if (WAYPOINTS && WAYPOINTS.length > 1) {
        let spawnX = WAYPOINTS[0].x;
        let spawnY = WAYPOINTS[0].y;
        if (eData.laneOffset) {
          const segDx = WAYPOINTS[1].x - WAYPOINTS[0].x;
          const segDy = WAYPOINTS[1].y - WAYPOINTS[0].y;
          const segLen = Math.hypot(segDx, segDy) || 1;
          spawnX += (-segDy / segLen) * eData.laneOffset;
          spawnY += (segDx / segLen) * eData.laneOffset;
        }

        enemies.push({
          x: spawnX, y: spawnY, laneOffset: eData.laneOffset || 0,
          angle: 0, wpIndex: 1, type: eData.type,
          isBoss: eData.isBoss, isMiniBoss: eData.isMiniBoss,
          hp: eData.hp, speed: eData.speed, baseSpeed: eData.speed,
          bounty: eData.bounty, radius: eData.radius,
          shieldTimer: 0, isShielded: false, warpTimer: 0, dashTimer: 0, empTimer: 0, slowTimer: 0
        });
      }
      spawnTimer += (eData.interval || 0.8);
      if (spawnQueue.length === 0) {
        waveInProgress = false;
        if (wave < maxW) {
          waveTimerActive = true;
          autoWaveTimeRemaining = getAutoWaveDelay();
        }
      }
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];

    if (e.type === 'blinker') {
      e.shieldTimer += dt;
      if (e.shieldTimer >= 3.0) e.shieldTimer -= 3.0;
      e.isShielded = e.shieldTimer < 1.0;
    }
    if (e.type === 'chronos_warp') {
      e.shieldTimer += dt;
      if (e.shieldTimer >= 3.0) e.shieldTimer -= 3.0;
      e.isShielded = e.shieldTimer < 1.2;
      e.warpTimer += dt;
      if (e.warpTimer >= 4.5) {
        e.warpTimer -= 4.5;
        let remainingJump = 50;
        while (remainingJump > 0 && e.wpIndex < WAYPOINTS.length) {
          const twp = WAYPOINTS[e.wpIndex];
          const distToWp = Math.hypot(twp.x - e.x, twp.y - e.y);
          if (distToWp <= remainingJump) {
            remainingJump -= distToWp;
            e.x = twp.x; e.y = twp.y;
            e.wpIndex++;
          } else {
            e.x += ((twp.x - e.x) / distToWp) * remainingJump;
            e.y += ((twp.y - e.y) / distToWp) * remainingJump;
            remainingJump = 0;
          }
        }
      }
    }
    if (e.type === 'titan_core') {
      e.dashTimer += dt;
      if (e.dashTimer >= 6.0) {
        e.dashTimer -= 6.0;
        e.speed = e.baseSpeed;
        e.slowTimer = 0;
        let dashRemaining = 40;
        while (dashRemaining > 0 && e.wpIndex < WAYPOINTS.length) {
          const twp = WAYPOINTS[e.wpIndex];
          const distToWp = Math.hypot(twp.x - e.x, twp.y - e.y);
          if (distToWp <= dashRemaining) {
            dashRemaining -= distToWp;
            e.x = twp.x; e.y = twp.y;
            e.wpIndex++;
          } else {
            e.x += ((twp.x - e.x) / distToWp) * dashRemaining;
            e.y += ((twp.y - e.y) / distToWp) * dashRemaining;
            dashRemaining = 0;
          }
        }
      }
    }
    if (e.type === 'hive_empress') {
      e.summonTimer = (e.summonTimer || 0) + dt;
      if (e.summonTimer >= 3.0) {
        e.summonTimer -= 3.0;
        for (let s = 0; s < 3; s++) {
          enemies.push({
            x: e.x + (Math.random() - 0.5) * 16, y: e.y + (Math.random() - 0.5) * 16,
            angle: e.angle, wpIndex: e.wpIndex, type: 'swarm', isBoss: false, isMiniBoss: false,
            hp: 20, speed: 95, baseSpeed: 95, bounty: 3, radius: 8, slowTimer: 0
          });
        }
      }
    }
    if (e.type === 'emp_overlord') {
      e.empTimer = (e.empTimer || 0) + dt;
      if (e.empTimer >= 5.0) {
        e.empTimer -= 5.0;
        towers.forEach(t => {
          if (Math.hypot(t.x - e.x, t.y - e.y) <= 180) t.disabledTimer = Math.max(t.disabledTimer || 0, 2.5);
        });
      }
    }

    if (e.slowTimer > 0) {
      e.slowTimer -= dt;
      if (e.slowTimer <= 0) e.speed = e.baseSpeed;
    }

    const targetWp = WAYPOINTS[e.wpIndex];
    if (!targetWp) continue;

    let targetX = targetWp.x;
    let targetY = targetWp.y;
    if (e.laneOffset) {
      const prevWp = WAYPOINTS[e.wpIndex - 1] || WAYPOINTS[0];
      const nextWp = WAYPOINTS[e.wpIndex + 1];
      const segDx = targetWp.x - prevWp.x;
      const segDy = targetWp.y - prevWp.y;
      const segLen = Math.hypot(segDx, segDy) || 1;
      let offX = -segDy / segLen;
      let offY = segDx / segLen;
      if (nextWp) {
        const seg2Dx = nextWp.x - targetWp.x;
        const seg2Dy = nextWp.y - targetWp.y;
        const seg2Len = Math.hypot(seg2Dx, seg2Dy) || 1;
        offX += -seg2Dy / seg2Len;
        offY += seg2Dx / seg2Len;
      }
      targetX += offX * e.laneOffset;
      targetY += offY * e.laneOffset;
    }

    const dx = targetX - e.x;
    const dy = targetY - e.y;
    const dist = Math.hypot(dx, dy);
    const step = e.speed * dt;
    e.angle = Math.atan2(dy, dx);

    if (dist <= step) {
      e.x = targetX; e.y = targetY;
      e.wpIndex++;
      if (e.wpIndex >= WAYPOINTS.length) {
        baseHp -= getBaseDamageFor(e);
        enemies.splice(i, 1);
        if (baseHp <= 0) {
          baseHp = 0;
          return 'FAIL';
        }
        continue;
      }
    } else {
      e.x += (dx / dist) * step;
      e.y += (dy / dist) * step;
    }
  }

  towers.forEach(t => {
    if (t.disabledTimer > 0) {
      t.disabledTimer -= dt;
      if (t.disabledTimer < 0) t.disabledTimer = 0;
      return;
    }

    let target = null;
    let maxDistProgress = -1;
    for (let e of enemies) {
      const d = Math.hypot(e.x - t.x, e.y - t.y);
      if (d <= t.range && WAYPOINTS[e.wpIndex]) {
        const progress = e.wpIndex * 1000 - Math.hypot(WAYPOINTS[e.wpIndex].x - e.x, WAYPOINTS[e.wpIndex].y - e.y);
        if (progress > maxDistProgress) {
          maxDistProgress = progress;
          target = e;
        }
      }
    }

    if (t.target !== target) {
      t.lockOnTimer = 0;
      t.target = target;
      if (t.type === 'melter') t.melterFireTimer = 0;
    } else if (target) {
      t.lockOnTimer = (t.lockOnTimer || 0) + dt;
    }
    const isLockedOn = !!target && (t.lockOnTimer >= t.lockOnDelay);
    
    if (target && t.type !== 'stasis') {
      t.angle = Math.atan2(target.y - t.y, target.x - t.x);
    }

    if (t.type === 'gun') {
      t.lastFire += dt;
      if (target && isLockedOn && t.lastFire >= t.fireRate) {
        t.lastFire = 0;
        projectiles.push({
          type: 'bullet', x: t.x + Math.cos(t.angle) * 22, y: t.y + Math.sin(t.angle) * 22,
          target: target, damage: t.damage, speed: 460
        });
      }
    }

    if (t.type === 'laser' && target && isLockedOn) {
      if (!target.isShielded) target.hp -= t.damage * dt;
    }

    if (t.type === 'mortar') {
      t.lastFire += dt;
      if (target && isLockedOn && t.lastFire >= t.fireRate) {
        t.lastFire = 0;
        const launchX = t.x + Math.cos(t.angle) * 20;
        const launchY = t.y + Math.sin(t.angle) * 20;
        projectiles.push({
          type: 'mortar_shell', x: launchX, y: launchY,
          targetX: target.x, targetY: target.y,
          damage: t.damage, splash: TOWER_CONFIGS.mortar.splash * (1 + (t.level - 1) * 0.15),
          duration: 1.0, elapsed: 0, startX: launchX, startY: launchY
        });
      }
    }

    if (t.type === 'tesla') {
      t.lastFire += dt;
      if (target && isLockedOn && t.lastFire >= t.fireRate) {
        t.lastFire = 0;
        const maxChains = (t.level === 1) ? 3 : (t.level === 2 ? 4 : 5);
        const hitTargets = [target];
        let currentChainSource = target;
        let chainDmg = t.damage;

        lightningBolts.push({
          targetRef: target, damage: chainDmg, delay: 0, travelTime: 0.05, life: 0.22
        });

        for (let c = 1; c < maxChains; c++) {
          let nextTarget = null;
          let minDist = TOWER_CONFIGS.tesla.jumpRadius;
          for (let e of enemies) {
            if (!hitTargets.includes(e)) {
              const d = Math.hypot(e.x - currentChainSource.x, e.y - currentChainSource.y);
              if (d < minDist) { minDist = d; nextTarget = e; }
            }
          }
          if (nextTarget) {
            chainDmg *= 0.65;
            lightningBolts.push({ targetRef: nextTarget, damage: chainDmg, delay: c * 0.045, travelTime: 0.05, life: 0.22 });
            hitTargets.push(nextTarget);
            currentChainSource = nextTarget;
          } else break;
        }
      }
    }

    if (t.type === 'stasis') {
      t.lastFire += dt;
      if (t.lastFire >= t.fireRate) {
        t.lastFire = 0;
        enemies.forEach(e => {
          if (Math.hypot(e.x - t.x, e.y - t.y) <= t.range && !e.isShielded) {
            const stasisPowerLvl = upgradeTreeData.stasis_power || 0;
            const boostedSlow = Math.min(0.9, TOWER_CONFIGS.stasis.slowFactor * (1 + stasisPowerLvl * (TOWER_CONFIGS.stasis.powerSlow || 0)));
            e.slowTimer = TOWER_CONFIGS.stasis.slowDuration * (1 + stasisPowerLvl * (TOWER_CONFIGS.stasis.powerDuration || 0));
            e.speed = e.baseSpeed * (1 - boostedSlow);
          }
        });
      }
    }

    if (t.type === 'melter') {
      const rampTime = TOWER_CONFIGS.melter.rampTime || 4.0;
      if (t.melterCoolingTimer > 0) {
        t.melterCoolingTimer -= dt;
        if (t.melterCoolingTimer <= 0) t.melterFireTimer = 0;
      } else if (target && isLockedOn) {
        t.melterFireTimer += dt;
        if (!target.isShielded) {
          const rampProgress = Math.min(t.melterFireTimer, rampTime) / rampTime;
          target.hp -= t.damage * Math.pow(40, rampProgress) * dt;
        }
        if (t.melterFireTimer >= rampTime) {
          t.melterCoolingTimer = rampTime;
          t.melterFireTimer = 0;
        }
      }
    }
  });

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    if (p.type === 'bullet') {
      if (!enemies.includes(p.target)) { projectiles.splice(i, 1); continue; }
      const dx = p.target.x - p.x;
      const dy = p.target.y - p.y;
      const dist = Math.hypot(dx, dy);
      const step = p.speed * dt;

      if (dist <= step) {
        if (!p.target.isShielded) p.target.hp -= p.damage;
        projectiles.splice(i, 1);
      } else {
        p.x += (dx / dist) * step;
        p.y += (dy / dist) * step;
      }
    } else if (p.type === 'mortar_shell') {
      p.elapsed += dt;
      if (p.elapsed >= p.duration) {
        enemies.forEach(e => {
          const d = Math.hypot(e.x - p.targetX, e.y - p.targetY);
          if (d <= p.splash && !e.isShielded) {
            e.hp -= p.damage * (1 - d / (p.splash * 1.3));
          }
        });
        projectiles.splice(i, 1);
      }
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    if (e.hp <= 0) {
      gold += Math.round(e.bounty * (1 + (upgradeTreeData.base_gold || 0) * 0.05));
      if (e.type === 'emp_bomber') {
        towers.forEach(t => {
          if (Math.hypot(t.x - e.x, t.y - e.y) <= 110) t.disabledTimer = Math.max(t.disabledTimer || 0, 3.0);
        });
      }
      enemies.splice(i, 1);
    }
  }

  for (let i = lightningBolts.length - 1; i >= 0; i--) {
    const lb = lightningBolts[i];
    if (lb.delay > 0) { lb.delay -= dt; continue; }
    lb.elapsed = (lb.elapsed || 0) + dt;
    lb.life -= dt;
    if (!lb.hasDealtDamage && lb.targetRef && lb.elapsed >= lb.travelTime) {
      lb.hasDealtDamage = true;
      if (!lb.targetRef.isShielded && enemies.includes(lb.targetRef)) lb.targetRef.hp -= lb.damage;
    }
    if (lb.life <= 0) lightningBolts.splice(i, 1);
  }

  if (wave >= maxW && spawnQueue.length === 0 && enemies.length === 0 && baseHp > 0) {
    if (victoryDelayTimer <= 0) victoryDelayTimer = 1.0;
    else {
      victoryDelayTimer -= dt;
      if (victoryDelayTimer <= 0) return 'WIN';
    }
  } else {
    victoryDelayTimer = 0;
  }
  
  return 'PLAYING';
}

function runHeadlessSimulation(levelNum, startDiamonds, profileConfig) {
  currentLevel = levelNum;
  
  for (let key in upgradeTreeData) {
    delete upgradeTreeData[key];
  }
  
  const lvlConfig = LEVELS_DATA[currentLevel];
  gold = lvlConfig.startGold || 150;
  baseHp = matchStartBaseHp = 10;
  wave = 1;
  waveInProgress = false;
  waveTimerActive = false;
  autoWaveTimeRemaining = 0;
  towers = [];
  enemies = [];
  projectiles = [];
  lightningBolts = [];
  spawnQueue = [];
  
  const mapCfg = MAP_CATALOG[lvlConfig.mapId];
  buildLevelGeometry(mapCfg.path, mapCfg.cols, mapCfg.rows, mapCfg.blocked);

  // --- ИНТЕЛЛЕКТ БОТА: Анализ карты ---
  // Собираем все пустые клетки и вычисляем их дистанцию до ближайшей дороги
  let bestCells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c] === 0) {
        let minDist = 999;
        for (let p of pathCells) {
          let d = Math.abs(p.c - c) + Math.abs(p.r - r); // Манхэттенское расстояние
          if (d < minDist) minDist = d;
        }
        // Добавляем долю случайности, чтобы башни не строились в одну скучную линию
        bestCells.push({ c, r, d: minDist + Math.random() * 0.5 });
      }
    }
  }
  // Сортируем клетки: от самых близких к дороге до самых дальних
  bestCells.sort((a, b) => a.d - b.d);

  const parts = profileConfig.split('_');
  const meta = parts[1];
  const earlyCall = parts[3];

  let simTime = 0;
  const dt = 0.05;
  let isFinished = false;
  let resultStatus = 'TIMEOUT';
  let towersBuilt = 0;

  let hasSpawnedLastWave = false;
  const maxW = lvlConfig.totalWaves || 10;
  
  // Берем открытые башни. Если массив почему-то пуст, даем базу
  const unlockedTowers = (lvlConfig.unlockedTowers && lvlConfig.unlockedTowers.length > 0) ? lvlConfig.unlockedTowers : ['gun', 'mortar'];
  let towerIndex = 0; 

  while (!isFinished && simTime < 600) {
    
    // 1. Управление волнами
    if (wave === maxW && waveInProgress) {
      hasSpawnedLastWave = true;
    }

    if (!hasSpawnedLastWave) {
      if (!waveInProgress && !waveTimerActive) {
        triggerManualWave();
      } else if (waveTimerActive) {
        if (earlyCall === 'E1') triggerManualWave();
        else if (earlyCall === 'E2' && enemies.length === 0 && baseHp >= matchStartBaseHp) triggerManualWave();
      }
    }

    // 2. Умная застройка (вдоль дороги)
    const nextTower = unlockedTowers[towerIndex % unlockedTowers.length];
    const towerCost = TOWER_CONFIGS[nextTower] ? TOWER_CONFIGS[nextTower].cost : 50;

    if (gold >= towerCost && bestCells.length > 0) {
      for (let i = 0; i < bestCells.length; i++) {
        let cell = bestCells[i];
        if (grid[cell.r][cell.c] === 0) { // Ищем ближайшую свободную из отсортированного списка
          if (buildTowerAt(nextTower, cell.c, cell.r)) {
            towersBuilt++;
            towerIndex++; 
            break; // Построили одну, продолжаем симуляцию
          }
        }
      }
    }

    // 3. Жадный апгрейд
    if (towers.length > 0) {
      for (let i = 0; i < towers.length; i++) {
        if (towers[i].level < 3) {
          upgradeTower(towers[i]);
        }
      }
    }

    const stepResult = updateCore(dt);
    simTime += dt;

    if (stepResult === 'WIN' || stepResult === 'FAIL') {
      isFinished = true;
      resultStatus = stepResult;
    }
  }

  if (resultStatus === 'WIN' && meta === 'M1' && baseHp < matchStartBaseHp) {
    resultStatus = 'RETRY';
  }

  return {
    outcome: resultStatus,
    baseHpRemaining: baseHp,
    baseHpMax: matchStartBaseHp,
    goldEnd: Math.floor(gold),
    towersBuiltCount: towersBuilt,
    durationSec: parseFloat(simTime.toFixed(2))
  };
}