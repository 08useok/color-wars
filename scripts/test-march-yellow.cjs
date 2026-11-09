const assert=require('node:assert/strict'),fs=require('node:fs'),make=require('./full-harness.cjs');
const added=['assets/march-yellow-motion/motion-atlases.js','march-yellow.js','clionel-atlas.js','clionel-advent.js'];
const setup=`gachaOwns=id=>gacha.owned.includes(id);globalThis.__march={event:CLIONEL_EVENT,atlases:NEW_ATLASES,profiles:PROFILE_ART,sel:i=>selectedStage=i,base:data.bases.enemy,setRand:f=>Math.random=f,finish,giveSpecialItem,specialDropOpen,owns:gacha.owned,unlocked:allyUnlocked,stageOpen:cycloneStageOpen,FUTURE_END,clears:cycloneClears,loadSaved:()=>JSON.parse(localStorage.getItem('red-battle-cyclone-v1')||'[]')};`;
const e=make({extraSetup:setup}),h=globalThis.__march;delete globalThis.__march;
const baseline=make({addons:make.DEFAULT_ADDONS.filter(f=>!added.includes(f))});
assert.equal(e.roster.length,baseline.roster.length+1);
assert.equal(e.stageList.length,baseline.stageList.length+1);
assert.deepEqual(e.stageList.filter((_,i)=>i!==h.event.index),baseline.stageList,'existing stage contents stay fixed');
assert.deepEqual(e.stageList.slice(0,h.event.index),baseline.stageList.slice(0,h.event.index),'previously published stage IDs stay fixed');
for(const id of baseline.roster)for(const form of [1,2]){
 e.setProfile({level:30,forms:{[id]:form}});baseline.setProfile({level:30,forms:{[id]:form}});
 assert.deepEqual(e.unitStats(id),baseline.unitStats(id),id+' form '+form);
}
e.setProfile({level:30});h.sel(h.event.index);
let s=e.unitStats('marchyellow');
assert.equal(e.gradeOf('marchyellow'),'sr');assert.equal(s.hp,18000);assert.equal(s.atk,1200);
assert.equal(s.cost,750);assert.equal(s.cooldown,8);assert.equal(s.range,150*.034);
assert.equal(s.interval,.8);assert.equal(s.area,undefined);assert.deepEqual(s.resistVs,['angel']);assert(s.immune.slow);
for(const a of [h.atlases.marchyellow,h.atlases.marchyellow.evolved]){
 for(const [k,n]of Object.entries({idle:60,walk:18,attack:24,hurt:24}))assert.equal(a[k].length,n);
 assert(fs.existsSync(a.sheet.split('?')[0]));
}
for(const p of h.profiles.marchyellow)assert(fs.existsSync(p.split('?')[0]));
for(const r of e.spawnList[h.event.index])assert(e.units[r.type],r.type);
assert.equal(e.units.clionel.range,600*.034);assert.equal(e.units.clionel.zoneMin,400*.034);assert.equal(e.units.clionel.zoneMax,1200*.034);
// Unlock condition and one-time ownership reward.
e.setCleared([]);assert(!h.stageOpen(h.event));e.setCleared([h.FUTURE_END-1]);assert(h.stageOpen(h.event));
h.giveSpecialItem('marchyellow',1);h.giveSpecialItem('marchyellow',1);assert.equal(h.owns.filter(id=>id==='marchyellow').length,1);
// Actual damage path: angel resistance and slow immunity; non-angel damage remains normal.
e.setProfile({level:30});h.sel(h.event.index);e.reset();const g=e.getGame();g.running=true;g.tutorial=99;g.money=1e9;g.spawnRules=[];
e.addUnit('marchyellow');e.addUnit('red');e.addUnit('clionel');const u=g.units.find(v=>v.type==='marchyellow'),red=g.units.find(v=>v.type==='red'),boss=g.units.find(v=>v.type==='clionel');
u.hp=red.hp=1e6;u.max=red.max=1e6;u.stats.knockbacks=red.stats.knockbacks=1;h.setRand(()=>0);
e.damage(u,100,boss);e.damage(red,100,boss);assert(1e6-u.hp<1e6-red.hp);assert(!(u.slowUntil>g.elapsed));assert(red.slowUntil>g.elapsed);
// Boss gate cannot be bypassed by rushing the castle. Save/reload uses the real browser (the harness replaces finish).
h.base.hp=0;assert.equal(h.base.hp,1);boss.hp=1;e.damage(boss,1e9,u);assert(g.cyBossDown);h.base.hp=0;assert.equal(h.base.hp,0);
console.log('PASS March Yellow: SR, 30 FPS motions, approved stats, angel resistance/slow immunity, append-only stage, unlock/reward and boss gate; existing roster unchanged');
process.exit(0);
