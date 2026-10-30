const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const src=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(src.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const prev=make({addons:addons.filter(x=>!['legend-41-49.js','hurricane-73-atlas.js','stages-73.js'].includes(x))});
const setup=`globalThis.__l4149={progress:legendProgress,open:legendSubOpen,unlocked:legendStageUnlocked,assets:NEW_ATLASES,base:data.bases,select:i=>selectedStage=i,attack:resolveAttack,spawns:updateStageSpawns,stars:legendStars};`;
const e=make({savedLegend:{1:[272,273,323,323,324,-1],2:[273,322]},extraSetup:setup}),x=globalThis.__l4149;delete globalThis.__l4149;
assert.equal(e.stageList.length,prev.stageList.length+51+(addons.includes('stages-73.js')?2:0));assert.deepEqual(e.stageList.slice(0,prev.stageList.length),prev.stageList);
for(const [id,v]of Object.entries(prev.units))assert.deepEqual(e.units[id],v,id+' preserved');
for(const [id,v]of Object.entries(prev.spawnList))assert.deepEqual(e.spawnList[id],v,id+' spawns preserved');
for(let k=0;k<273;k++)assert.equal(e.legendIdx(k),prev.legendIdx(k));
assert.equal(e.legendSubs.length,49);assert.deepEqual(x.progress[1],[272,273,323]);assert.deepEqual(x.progress[2],[273,322]);
assert(!x.open(40));x.progress[1].push(267,268,269,270,271);assert(x.open(40));assert(x.unlocked(273,1));assert(x.unlocked(274,1));assert(!x.unlocked(275,1));
const db=JSON.parse(fs.readFileSync('reference-sheets/legend-41-49/stages.json','utf8')),map=JSON.parse(fs.readFileSync('reference-sheets/legend-41-49/enemy-map.json','utf8'));
let count=0;
for(const [j,s]of db.entries()){
 const k=273+j,i=e.legendIdx(k),st=e.stageList[i];assert.equal(st.legend.k,k);assert.equal(st.hp,s.castleHp);assert.equal(st.max,s.max);assert.equal(st.xp,s.xp);assert.equal(e.legendSubOf(k),s.sub);
 const expected=s.enemies.filter(r=>r[2].split('#')[1]!=='023').map(r=>{const hp=parseInt(r[5]),first=Number(r[6]),q={type:map[r[2].split('#')[1]],at:hp===100?{t:first/30}:{hp},mag:parseInt(r[3])};if(hp!==100&&first)q.firstDelay=first/30;if(r[4]&&r[4]!=='無制限')q.count=Number(r[4]);if(r[7]&&r[7]!=='-'){const d=r[7].split('～').map(Number);q.delay=[d[0]/30,(d[1]??d[0])/30]}if(r[0]==='BOSS')q.boss=true;return q;});
 assert.deepEqual(e.spawnList[i],expected);count+=expected.length;
 for(const r of expected){assert(e.units[r.type],r.type);assert(Number.isFinite(r.mag));assert(r.at.hp!==undefined||Number.isFinite(r.at.t));}
}
for(let s=40;s<49;s++)assert.deepEqual([1,2,3,4].map(c=>e.legendCrownMult(c,s)),[1,1.2,1.3,1]);
for(let s=0;s<40;s++)for(let c=1;c<=4;c++)assert.equal(e.legendCrownMult(c,s),prev.legendCrownMult(c,s));
for(const id of ['croakley','bigdream','angelbutta','hackey','mechabun']){const a=x.assets[id];assert(a.walk.length&&a.attack.length&&a.hurt.length);assert(fs.existsSync(a.sheet.split('?')[0]));for(const mode of ['walk','attack','hurt'])for(const r of a[mode])assert(r.every(Number.isFinite)&&r[2]>0&&r[3]>0);}
function duel(id,dist){x.select(e.legendIdx(323));e.reset();const g=e.getGame();g.running=true;g.paused=false;g.tutorial=99;g.spawnRules=[];g.money=1e9;e.addUnit('red');e.addUnit(id,true);const ally=g.units.find(v=>v.ally),enemy=g.units.find(v=>!v.ally);enemy.x=35;ally.x=35+dist;ally.emerging=enemy.emerging=false;ally.hp=ally.max=1e8;enemy.kbTime=ally.kbTime=0;return {g,ally,enemy};}
{const {g,ally,enemy}=duel('angelbutta',4);x.attack(enemy,ally);assert.equal(ally.atkDownUntil,g.elapsed+5);assert(Math.abs(ally.atkDownMult-.1)<1e-9);}
{const {g,ally,enemy}=duel('croakley',40);x.attack(enemy,ally);assert.equal(ally.slowUntil,g.elapsed+60);}
{const {ally,enemy}=duel('hackey',5);x.attack(enemy,ally);assert.equal(ally.hp,1e8,'blind spot');ally.x=enemy.x+45;x.attack(enemy,ally);assert(ally.hp<1e8);}
{const {ally,enemy}=duel('mechabun',-5);x.attack(enemy,ally);assert(ally.hp<1e8,'backside damage');}
{const {g,ally,enemy}=duel('bigdream',4);x.attack(enemy,ally);assert(g.waveFx.length>0,'level 3 wave emitted');assert.equal(enemy.stats.barrier,266000);}
const rows=[];const deck=['red','yellow','blue','purple','gold','garnet','lapis','selenite','rainbow','aqua'];
for(const sub of e.legendSubs.slice(40)){e.setProfile({level:30,trueForms:['gold','aqua']});const k=sub.start+sub.len-1,r=e.simulate(e.legendIdx(k),1,deck,1,300,'smart2');for(const v of [r.seconds,r.allyHp,r.enemyHp])assert(Number.isFinite(v));rows.push({chapter:e.legendSubOf(k)+1,k,name:e.stageList[e.legendIdx(k)].name,...r});}
fs.writeFileSync('docs/simulations/legend-41-49-2026-10-29.json',JSON.stringify({stages:51,rules:count,legacyPreserved:prev.stageList.length,sourceRulesMatched:true,checks:['old stage indices/stats/spawns','save restore/deduplication','sequential unlock','source crowns 1–4','five atlases','slow/weaken/blind spot/backside/wave'],rows},null,2));
console.log('PASS 51 stages, '+count+' source rules, 5 enemies, legacy/save/unlock checks; 9 smoke battles:',rows.map(r=>[r.chapter,r.win,r.seconds]));process.exit(0);
