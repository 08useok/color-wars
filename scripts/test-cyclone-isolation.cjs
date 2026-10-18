const assert=require('assert/strict'),fs=require('fs'),make=require('./full-harness.cjs');
const source=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8');
const addons=JSON.parse(source.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const previous=make({addons:addons.filter(s=>!s.startsWith('cyclone-')&&!s.startsWith('subspecies-motion'))}),current=make();
assert.deepEqual(current.stageList.slice(0,-4),previous.stageList);
for(const i of Object.keys(previous.spawnList))assert.deepEqual(current.spawnList[i],previous.spawnList[i]);
for(const id of Object.keys(previous.units))assert.deepEqual(current.units[id],previous.units[id]);
console.log('PASS: all existing stage indexes, spawn rules and unit definitions unchanged by cyclone module.');
