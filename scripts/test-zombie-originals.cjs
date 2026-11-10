const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),make=require('./full-harness.cjs');
const ids=['zbear','zcapy','zduche','zbore','zbrollow','zcamelle','zostrich','zdagshund','zthrillerz'];
const original=make({addons:make.DEFAULT_ADDONS.filter(x=>!['zombie-original-atlases.js','zombie-original-motion.js'].includes(x))});
const before=JSON.stringify({units:original.units,stages:original.stageList,spawns:original.spawnList});
const after=make({extraSetup:'globalThis.zombieOriginalQA=NEW_ATLASES;'}),atlases=globalThis.zombieOriginalQA;delete globalThis.zombieOriginalQA;
assert.equal(JSON.stringify({units:after.units,stages:after.stageList,spawns:after.spawnList}),before,'no stats/stage/spawn changes');
for(const id of ids){const a=atlases[id];assert(a&&!a.tint,id);assert(fs.existsSync(path.join(__dirname,'..',a.sheet.split('?')[0])),id+' sheet');for(const mode of ['walk','attack','hurt']){assert(a[mode]?.length,id+' '+mode);for(const r of a[mode])assert(r.slice(0,4).every(Number.isFinite)&&r[2]>0&&r[3]>0,id+' bounds');}}
console.log('PASS nine zombie original atlases; walk/attack/hurt present; all stats, stages and spawns unchanged');process.exit(0);
