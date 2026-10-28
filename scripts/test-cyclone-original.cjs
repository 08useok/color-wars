const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const source=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(source.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const setup='globalThis.__cycloneArt={atlases:NEW_ATLASES,stats:()=>JSON.stringify(ALLIES.map(t=>[t,[unitStats(t,30,1),unitStats(t,30,2)]]))};';
const previous=make({addons:addons.filter(s=>s!=='cyclone-original-atlases.js'),extraSetup:setup}),before=globalThis.__cycloneArt;
const current=make({extraSetup:setup}),after=globalThis.__cycloneArt;delete globalThis.__cycloneArt;
assert.deepEqual(current.units,previous.units);assert.deepEqual(current.stageList,previous.stageList);assert.deepEqual(current.spawnList,previous.spawnList);assert.equal(after.stats(),before.stats());
const changed=['redcyclone','whitecyclone','blackcyclone','angelcyclone'];
for(const [id,a]of Object.entries(after.atlases))if(!changed.includes(id))assert.deepEqual(a,before.atlases[id],id+' unaffected art');
for(const id of changed){const a=after.atlases[id];assert(a.sheet.startsWith('assets/anim_'+id));assert.equal(a.walk.length,37);assert.equal(a.attack.length,2);assert.equal(a.hurt.length,1);assert(fs.statSync(a.sheet.split('?')[0]).size>10000);}
console.log('PASS: four original rigs connected; all stats, stage IDs/spawns/rewards, all other atlases and first/second-form ally stats unchanged.');process.exit(0);
