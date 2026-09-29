// export_game_data.js
//
// Runs the ACTUAL data.js in a sandboxed VM and dumps everything the Python
// balance simulator needs as JSON. This is the fix for the root problem in
// calc_metrics4.py: that script hand-copied TOWER_CONFIGS/ENEMY_CONFIGS/
// SECTOR_*_MINIBOSSES and reimplemented the per-sector wave-generation loops
// from data.js. Every time data.js gets a balance pass, that copy silently
// drifts out of sync (missing stasis/melter/railgun, stale railgun numbers,
// stale miniboss HP, no L1-L10 handling -- get_level_config()'s else-branch
// was applying the Sector-2 formula to levels 1-10 too, which have their own
// hand-authored LEVELS_DATA entries in data.js and don't match the formula
// at all).
//
// Usage:
//   node export_game_data.js > game_data.json
// Re-run this any time data.js changes, then rerun the Python simulator.
// This never needs edits when data.js's balance changes -- it just re-reads
// whatever LEVELS_DATA/TOWER_CONFIGS/etc. data.js computes for itself.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataJsPath = path.join(__dirname, 'data.js');
const src = fs.readFileSync(dataJsPath, 'utf8');

const sandbox = { console: { log: (...a) => console.error(...a) }, Math };
vm.createContext(sandbox);
// data.js declares everything with `const` at top level, which in a vm
// context does NOT attach to the sandbox object as an enumerable property.
// Explicitly copy out what we need at the end of the script.
vm.runInContext(src + `
this.__EXPORT = {
  TOWER_CONFIGS: TOWER_CONFIGS,
  ENEMY_CONFIGS: ENEMY_CONFIGS,
  MAP_CATALOG: MAP_CATALOG,
  LEVELS_DATA: LEVELS_DATA,
  TOTAL_LEVELS: TOTAL_LEVELS,
  LEVELS_PER_SECTION: LEVELS_PER_SECTION,
  TOTAL_SECTIONS: TOTAL_SECTIONS,
  UPGRADE_STEPS_PER_SECTOR: UPGRADE_STEPS_PER_SECTOR,
  LOCK_ON_DELAY_LIGHT: LOCK_ON_DELAY_LIGHT,
  LOCK_ON_DELAY_HEAVY: LOCK_ON_DELAY_HEAVY,
  LOCKED_TARGET_TOWERS: LOCKED_TARGET_TOWERS,
  MORTAR_BASE_TRAVEL_TIME: MORTAR_BASE_TRAVEL_TIME,
  SWARM_CLUMP_SIZE: SWARM_CLUMP_SIZE,
  SWARM_CLUMP_SIZE_DEBUT: SWARM_CLUMP_SIZE_DEBUT,
  SWARM_DEBUT_LEVEL: SWARM_DEBUT_LEVEL,
  SWARM_CLUMP_INTERVAL: SWARM_CLUMP_INTERVAL,
  SWARM_CLUMP_GAP: SWARM_CLUMP_GAP,
  SWARM_BOUNTY_SCALE: SWARM_BOUNTY_SCALE
};
`, sandbox);

const data = sandbox.__EXPORT;

// LEVELS_DATA[lvl].waves[i].spawns contains function closures? No -- they're
// plain objects built by createEnemySpawn()/generateStandardLevel(), already
// fully resolved numbers by the time data.js finishes loading. JSON.stringify
// will serialize them cleanly. Tower configs, enemy configs, and map catalog
// are likewise plain data by the time the script has run.
process.stdout.write(JSON.stringify(data, null, 2));
