const assert=require('node:assert/strict'),fs=require('node:fs'),make=require('./full-harness.cjs');
const source=require('../reference-sheets/zombie-outbreak-original/sources.json');
const e=make({extraSetup:`globalThis.__out={entries:ZOMBIE_OUTBREAK_ORIGINAL,chapters:ZOMBIE_CHAPTERS,rules:zombieRulesOf,stages:zombieStagesOf,available:zombieAvailable,start:startOutbreak,restore:zombieSlotRestore,save:zombieSave,slot:ZOMBIE_SLOT,bases:data.bases,limit:allyDeployFull,select:i=>selectedStage=i,spawns:()=>game.spawnRules};`}),h=globalThis.__out;delete globalThis.__out;
const baseline=make({addons:make.DEFAULT_ADDONS.filter(f=>!['zombie-outbreak-original-data.js','zombie-outbreak-original.js'].includes(f))});
assert.deepEqual(e.stageList,baseline.stageList,'ordinary stage IDs/content unchanged');assert.deepEqual(e.units,baseline.units,'unit balance unchanged');
assert.equal(e.roster.length,baseline.roster.length);assert.equal(h.entries.size,336);
const allCleared=e.stageList.map((_,i)=>i);h.save.clear=[0,48,159];h.save.bonus=[1];h.save.tickets=7;const saved=JSON.stringify(h.save);
let rules=0;
for(const raw of source.stages){
 const [i,s]=[...h.entries].find(([,s])=>s.chapter===raw.chapter&&s.order===raw.order);assert.equal(s.name,raw.name);assert.equal(s.hp,raw.hp);assert.equal(s.max,raw.max);assert.equal(s.limit,raw.limit);assert.equal(s.width,raw.width);
 const rows=h.rules(i);assert.equal(rows.length,raw.rows.length);const f=raw.chapter===2?1.5:raw.chapter===3?4:1;
 raw.rows.forEach((r,k)=>{const x=rows[k];assert.equal(x.type,source.enemyMap[r.enemy]);assert(Math.abs(x.mag*f-r.mag)<1e-8);assert.deepEqual(x.at,r.hp===100?{t:r.first/30}:{hp:r.hp});assert.equal(x.firstDelay||0,r.hp!==100?r.first/30:0);assert.equal(x.count,r.count);assert.deepEqual(x.delay,r.delay?.map(v=>v/30));assert.equal(!!x.boss,!!r.boss);assert(e.units[x.type]);});rules+=rows.length;
 rows[0].at.t=123456;assert.notDeepEqual(h.rules(i)[0].at,rows[0].at,'fresh rule objects');
 if(i!==h.chapters[raw.chapter].final){h.restore();h.start(i);const slot=e.stageList[h.slot];assert.equal(slot.zombieOf,i);assert.equal(slot.hp,raw.hp);assert.equal(slot.maxEnemies,raw.max);assert.equal(slot.allyLimit,raw.limit);assert.equal(e.getGame().spawnRules.length,raw.rows.length);}
}
assert.equal(rules,2891);assert.equal(JSON.stringify(h.save),saved,'opening/rebuilding outbreaks preserves all clear/reward state');
for(const c of [1,2,3,5,6,7,8]){
 h.restore();assert.equal(h.stages(c).length,48);e.setCleared([]);const first=h.stages(c)[0],last=h.chapters[c].final;assert(!h.available(first));e.setCleared([last]);h.save.clear=[];assert(h.available(first));assert(!h.available(last));h.save.clear=h.stages(c).filter(i=>i!==last);assert(h.available(last));h.start(last);assert.equal(e.stageList[h.slot].zombieOf,last);
}
e.setCleared(allCleared);h.save.clear=[];
// World chapter multipliers must cancel exactly once for the same DB row.
for(const c of [1,2,3]){h.restore();const i=h.stages(c)[0];h.start(i);const r=h.rules(i).find(r=>r.type==='zoge'),g=e.getGame();g.running=true;g.tutorial=99;g.money=1e9;g.spawnRules=[];e.addUnit(r.type,false,r.mag/100);assert.equal(g.units.at(-1).max,Math.round(e.units.zoge.hp*[.2,.3,.5][c-1]),'world '+c+' raw magnification');}
// A buried zombie still occupies an outbreak enemy slot while it cannot be hit.
h.restore();h.start(0);let g=e.getGame();g.running=true;g.tutorial=99;g.spawnRules=[];e.stageList[h.slot].maxEnemies=1;e.addUnit('zoge');const z=g.units.at(-1);z.hp=z.max=1e9;z.burrowing=true;z.burrowLeft=100;
g.spawnRules=[{type:'dog',at:{t:0},triggered:true,clock:0,spawned:0,count:1,mag:100}];e.update(1/30);assert.equal(g.spawnRules[0].spawned,0,'buried unit is counted');assert.equal(g.units.filter(u=>!u.ally).length,1);
// Reviving corpses also hold their slots, and a released slot resumes spawning.
z.burrowing=false;z.hp=0;z.reviveAt=100;g.units=[];g.defeated=[z];e.update(1/30);assert.equal(g.spawnRules[0].spawned,0);g.defeated=[];e.update(1/30);assert.equal(g.spawnRules[0].spawned,1);
// Cosmos deploy limits count living warped allies as well as the visible line.
h.restore();h.start([...h.entries].find(([,s])=>s.chapter===8&&s.order===9)[0]);g=e.getGame();assert.equal(e.stageList[h.slot].allyLimit,5);
g.units=Array.from({length:5},()=>({ally:true,hp:1}));assert(h.limit());g.units.pop();assert(!h.limit());g.warped=[{ally:true,hp:1}];assert(h.limit());
// Normal story controls retain their published spawn tables and units.
h.restore();assert.deepEqual(Object.entries(e.spawnList).filter(([i])=>+i!==h.slot),Object.entries(baseline.spawnList).filter(([i])=>+i!==h.slot));
console.log('PASS original outbreaks: 336 stage identities, 2891 source rows, HP/caps/limits, world multipliers, fresh rule objects, chapter/finale gates, save preservation, buried/corpse slot census, ordinary story/unit invariants');process.exit(0);
