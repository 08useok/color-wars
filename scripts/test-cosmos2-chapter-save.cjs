const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('node:assert/strict');
const base=fs.readFileSync(path.join(__dirname,'full-harness.cjs'),'utf8');
function boot(store,tail=''){let code=base.replace('const store={};','const store='+JSON.stringify(store)+';');code=code.replace("sources.join('\\n')+setup","sources.join('\\n')+"+JSON.stringify('\n'+tail+';return {cleared,store:Object.fromEntries(["red-battle-progress-v1","red-battle-cosmos2-clears-v1"].map(k=>[k,localStorage.getItem(k)])),start:COSMOS2_START,end:COSMOS2_END};'));const m=new Module(__filename,module);m.filename=__filename;m.paths=module.paths;m._compile(code,__filename);return m.exports();}
const primary='red-battle-progress-v1',chapter='red-battle-cosmos2-clears-v1',first=boot({});
const seeded=boot({[primary]:JSON.stringify([0,first.start,first.end-1])});assert.deepEqual(JSON.parse(seeded.store[chapter]),[0,47]);
const oldTab={...seeded.store,[primary]:'[0]'},restored=boot(oldTab);assert(restored.cleared.includes(restored.end-1));assert(restored.cleared.includes(restored.start));
const updated=boot(oldTab,'cleared.push(COSMOS2_START+23);saveProgress()');assert.deepEqual(JSON.parse(updated.store[chapter]),[0,23,47]);assert(JSON.parse(updated.store[primary]).includes(updated.end-1));
const shifted=boot({[primary]:'[0]',[chapter]:'[0,23,47,-1,48,"2",null]'});assert.deepEqual(shifted.cleared,[0,shifted.start,shifted.start+23,shifted.end-1]);
const empty=boot({[primary]:'[0]'});assert(!empty.cleared.includes(empty.end-1),'never invent missing progress');
console.log('PASS cosmos2 chapter backup: existing-save migration, older-tab overwrite recovery, new clears, relative offsets, invalid values, no invented clears');process.exit(0);
