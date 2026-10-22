const fs=require('fs'),assert=require('assert/strict'),make=require('./full-harness.cjs');
const old=JSON.parse(fs.readFileSync('reference-sheets/zombie-completion/before.json','utf8'));
const e=make({extraSetup:`globalThis.__outbreakTest={zombieRulesOf,zombieStagesOf,zombieAvailable,startOutbreak,zombieSlotRestore,zombieSave,slot:ZOMBIE_SLOT,completion:OUTBREAK_COMPLETION,allies:ALLIES,resolveAttack,deployFull:()=>allyDeployFull(),setStage:i=>selectedStage=i,setDeck:d=>deck=d,bases:data.bases,atlas:NEW_ATLASES,setWave:v=>game.inWave=v,setSurge:v=>game.inSurge=v};`});
const t=globalThis.__outbreakTest;delete globalThis.__outbreakTest;
for(const c of [1,2,3,5,6,7,8])assert.equal(t.zombieStagesOf(c).length,48);
assert.equal(t.completion.size,37);
for(const b of old.allRules)if(b.rules)assert.deepEqual(JSON.parse(JSON.stringify(t.zombieRulesOf(b.i))),b.rules);
for(const [id,s]of Object.entries(old.units))assert.deepEqual(JSON.parse(JSON.stringify(e.units[id])),s,'existing unit changed '+id);
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
// Simulate each previously absent outbreak itself, not its ordinary counterpart.
const results=[],deck=['red','yellow','garnet','iron','grey','acid','fuchsia','platinum','vanilla','rainbow'];
for(const [i,d]of t.completion){t.zombieSlotRestore();t.startOutbreak(i);const slot=e.stageList[t.slot];assert.equal(slot.zombieOf,i);assert.equal(slot.hp,d.hp);assert.equal(slot.maxEnemies,d.max);assert.equal(slot.allyLimit,d.limit);
 const r=e.simulate(t.slot,1,deck,1,180,'smart2');for(const v of [r.seconds,r.allyHp,r.enemyHp])assert(Number.isFinite(v));results.push({i,name:d.name,chapter:d.chapter,...r});
}
fs.writeFileSync('docs/simulations/zombie-completion-2026-10-22.json',JSON.stringify({counts:336,new:37,results},null,2));
console.log('PASS: all seven chapters 48/48, 299 existing maps and all prior stats unchanged, Moon gates, four enemies, revival/Z-kill, Zuche damage shares, Zapy immunity/warp, 37 real outbreak smoke battles.');
console.log(results.filter(r=>r.win).length+' wins; '+results.filter(r=>r.timeout).length+' timeouts (180s); balance not certified.');process.exit(0);
