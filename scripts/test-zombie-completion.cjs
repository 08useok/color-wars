const fs=require('fs'),assert=require('assert/strict'),make=require('./full-harness.cjs');
const old=JSON.parse(fs.readFileSync('reference-sheets/zombie-completion/before.json','utf8'));
const e=make({extraSetup:`globalThis.__outbreakTest={zombieRulesOf,zombieStagesOf,zombieAvailable,startOutbreak,zombieSlotRestore,zombieSave,slot:ZOMBIE_SLOT,completion:OUTBREAK_COMPLETION,allies:ALLIES,resolveAttack,deployFull:()=>allyDeployFull(),setStage:i=>selectedStage=i,setDeck:d=>deck=d,bases:data.bases,atlas:NEW_ATLASES,setWave:v=>game.inWave=v,setSurge:v=>game.inSurge=v,chapters:ZOMBIE_CHAPTERS,chapterOf,stageExtra:ZOMBIE_STAGE_EXTRA,maxEnemies};globalThis.__spawned={};const __updOutbreak=update;update=function(dt){const r=__updOutbreak.apply(this,arguments);if(game?.units)for(const u of game.units)if(!u.ally&&!u.__seen){u.__seen=1;globalThis.__spawned[u.type]=(globalThis.__spawned[u.type]||0)+1}return r};`});
const t=globalThis.__outbreakTest;delete globalThis.__outbreakTest;
for(const c of [1,2,3,5,6,7,8])assert.equal(t.zombieStagesOf(c).length,48);
assert.equal(t.completion.size,37);
// 원작(battlecats-db) 침공판 짝 맞춤(10-23): 놈놈놈은 좀비가 안 되고(미래편 2·3장·우주편 1장은 스릴러즈) 하마양이 좀비 하마양(zguys)이 된다.
// 세계편 1~3장 곰선생은 일반 적 그대로. 그 밖의 규칙은 예전 그대로여야 한다.
for(const b of old.allRules){
 if(!b.rules||t.completion.has(b.i))continue;
 const now=JSON.parse(JSON.stringify(t.zombieRulesOf(b.i))),src=e.spawnList[b.i],c=t.chapterOf(b.i),ch=t.chapters[c],f=ch.strength/ch.chapMag;
 const extra=t.stageExtra[b.i]||[];assert.equal(now.length,src.length+extra.length,'rule count '+b.i);
 src.forEach((r,k)=>{
  const was=b.rules[k],cur=now[k],zmag=Math.max(25,Math.round((r.mag||100)*f));
  if(r.type==='guys'){if([6,7,8].includes(c))assert.deepEqual(cur,{...JSON.parse(JSON.stringify(r)),type:'zthrillerz',mag:zmag},'thrillerz '+b.i);else assert.deepEqual(cur,JSON.parse(JSON.stringify(r)),'guys stays normal '+b.i);}
  else if(r.type==='hippo')assert.deepEqual(cur,{...JSON.parse(JSON.stringify(r)),type:'zguys',mag:zmag},'zombie hippo '+b.i);
  else if(r.type==='bear'&&c<=3)assert.deepEqual(cur,JSON.parse(JSON.stringify(r)),'bear stays normal '+b.i);
  else assert.deepEqual(cur,was,'unchanged rule '+b.i+':'+k);
 });
 extra.forEach((r,k)=>assert.deepEqual(now[src.length+k],JSON.parse(JSON.stringify(r))));
}
// 10-30: 원작 워프 5종은 날려버림 → 워프로 바뀜(test-enemy-consistency가 확인)
for(const [id,s]of Object.entries(old.units))if(!['zguys','shibalienelite','starpeng','painter','captainmogu','ribbo'].includes(id))assert.deepEqual(JSON.parse(JSON.stringify(e.units[id])),s,'existing unit changed '+id);
assert.equal(e.names.zguys,'좀비 하마양');assert(e.units.zguys.area);
for(const [i,d]of t.completion){assert(!old.allRules[i].rules);assert(d.rules.length);assert(d.rules.some(r=>e.units[r.type].trait==='zombie'||e.units[r.type].traits?.includes('zombie')));for(const r of d.rules)assert(e.units[r.type],r.type);}
// Newly completed chapters require all 47 non-final outbreaks before the Moon/Big Bang.
for(const c of [5,6,7,8]){
 const all=t.zombieStagesOf(c),last=all.at(-1);t.zombieSave.clear=[];assert(!t.zombieAvailable(last));t.zombieSave.clear=all.slice(0,-1);assert(t.zombieAvailable(last));
}
t.zombieSave.clear=[...new Set(Object.keys({1:1,2:1,3:1,5:1,6:1,7:1,8:1}).flatMap(c=>t.zombieStagesOf(+c)))];
function battle(){t.setStage(0);e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=999999;g.spawnRules=[];return g;}
function pair(enemy){const g=battle();e.addUnit(enemy);e.addUnit('red');assert.equal(g.units.length,2);const z=g.units.find(u=>!u.ally),a=g.units.find(u=>u.ally);z.x=40;a.x=44;a.hp=a.max=1e8;a.stats.hp=1e8;return {g,z,a};}
for(const id of ['cadaverbear','zuche','lilzyclone','zapy']){
 assert(t.atlas[id]?.sheet);let {g,z}=pair(id);e.damage(z,z.hp+1);assert(z.reviveAt!==undefined,id+' revives');
 ({g,z}=pair(id));e.damage(z,z.hp+1,{type:'iron',ally:true,stats:{zombieKiller:true}});assert(z.reviveAt===undefined,id+' zombie killer');
}
// Area multihit must total 17,000, not accidentally deal 34,000.
{const {z,a}=pair('zuche');const before=a.hp;t.resolveAttack(z,a,.5);assert.equal(before-a.hp,8500);a.kbTime=0;t.resolveAttack(z,a,.5);assert.equal(before-a.hp,17000);assert.equal(z.stats.atk,17000);}
// New Zapy resists wave/surge, then actually removes a warped target until 2 seconds.
{const {g,z,a}=pair('zapy');const hp=z.hp;t.setWave(true);e.damage(z,1000,a);assert.equal(z.hp,hp);t.setWave(false);t.setSurge(true);e.damage(z,1000,a);assert.equal(z.hp,hp);t.setSurge(false);
 z.stats.warpChance=1;e.damage(a,1,z);assert(!g.units.includes(a));assert(g.warped.includes(a));assert.equal(a.warpLeft,2);g.units=[];
 e.update(1);assert.equal(a.warpLeft,1);assert(!g.units.includes(a));e.update(1);assert(g.units.includes(a));assert.equal(a.x,44+1000/55);
}
// 하와이 침공(세계편 1~3장): 원작처럼 출현 상한 3마리(일반 판과 같음). 예전엔 상한이 빠져 43초에 좀비 619마리가 나왔다.
{const deck=['red','yellow','garnet','iron','grey','acid','fuchsia','platinum','vanilla','rainbow'];
 for(const i of [46,94,142]){
  assert.equal(e.stageList[i].name,'하와이');t.zombieSlotRestore();t.startOutbreak(i);assert.equal(e.stageList[t.slot].maxEnemies,3);assert.equal(t.maxEnemies(t.slot),3);
  const types=t.zombieRulesOf(i).map(r=>r.type);for(const k of ['guys','zguys','zpeng','zgory','zseal','leboin','zkangaroo','rhino','bear'])assert(types.includes(k),i+' has '+k);
  for(const k of ['hippo','zbear','zthrillerz'])assert(!types.includes(k),i+' lacks '+k);
  for(const k in globalThis.__spawned)delete globalThis.__spawned[k];
  e.simulate(t.slot,1,deck,1,60,'smart2');const n=Object.values(globalThis.__spawned).reduce((a,b)=>a+b,0);
  assert(n<=60,'Hawaii outbreak spawned '+n+' enemies in 60s');assert(!globalThis.__spawned.hippo);
 }
 // 일반 판도 상한이 그대로인지(원작 출현 최대수)
 for(const i of [0,6,43]){const z=t.zombieRulesOf(i);if(!z)continue;t.zombieSlotRestore();t.startOutbreak(i);assert.equal(t.maxEnemies(t.slot),t.maxEnemies(i));}
}
// Simulate each previously absent outbreak itself, not its ordinary counterpart.
const results=[],deck=['red','yellow','garnet','iron','grey','acid','fuchsia','platinum','vanilla','rainbow'];
for(const [i,d]of t.completion){t.zombieSlotRestore();t.startOutbreak(i);const slot=e.stageList[t.slot];assert.equal(slot.zombieOf,i);assert.equal(slot.hp,d.hp);assert.equal(slot.maxEnemies,d.max);assert.equal(slot.allyLimit,d.limit);
 const r=e.simulate(t.slot,1,deck,1,180,'smart2');for(const v of [r.seconds,r.allyHp,r.enemyHp])assert(Number.isFinite(v));results.push({i,name:d.name,chapter:d.chapter,...r});
}
fs.writeFileSync('docs/simulations/zombie-completion-2026-10-22.json',JSON.stringify({counts:336,new:37,results},null,2));
console.log('PASS: all seven chapters 48/48, 299 existing maps unchanged except the original pairing (guys normal / Thrillerz, hippo→좀비 하마양, 세계편 bear normal), Hawaii cap 3, Moon gates, four enemies, revival/Z-kill, Zuche damage shares, Zapy immunity/warp, 37 real outbreak smoke battles.');
console.log(results.filter(r=>r.win).length+' wins; '+results.filter(r=>r.timeout).length+' timeouts (180s); balance not certified.');process.exit(0);
