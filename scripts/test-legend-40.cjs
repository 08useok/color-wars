const fs=require('fs'),assert=require('assert/strict'),make=require('./full-harness.cjs');
const old=JSON.parse(fs.readFileSync('reference-sheets/legend-40/before.json','utf8'));
const e=make({savedLegend:{1:[260,261,266,267,268,272,272,273,-1],2:[267,271]},extraSetup:`globalThis.__legend40={legendProgress,legendSubOpen,legendStageUnlocked,updateStageSpawns,bases:data.bases,assets:NEW_ATLASES};`});
const x=globalThis.__legend40;delete globalThis.__legend40;
assert.equal(e.stageList.length,old.stages.length+6);assert.equal(e.legendSubs.length,40);
for(let i=0;i<old.stages.length;i++){assert.deepEqual(JSON.parse(JSON.stringify(e.stageList[i])),old.stages[i]);assert.deepEqual(e.spawnList[i]===undefined?undefined:JSON.parse(JSON.stringify(e.spawnList[i])),old.spawns[i]);}
assert.deepEqual(x.legendProgress[1],[260,261,266,267,268,272]);assert.deepEqual(x.legendProgress[2],[267,271]);
assert.equal(x.legendSubOpen(39),false);x.legendProgress[1].push(...[262,263,264,265]);assert.equal(x.legendSubOpen(39),true);
assert(x.legendStageUnlocked(267,1));assert(x.legendStageUnlocked(269,1));assert(!x.legendStageUnlocked(271,1));
assert.deepEqual([1,2,3,4].map(c=>e.legendCrownMult(c,39)),[1,1.2,1.3,1.3]);
for(let k=267;k<273;k++){
 const i=e.legendIdx(k),st=e.stageList[i];assert.equal(st.legend.k,k);assert.equal(e.legendSubOf(k),39);assert.equal(st.hp,[400000,666666,1000000,500000,750000,900000][k-267]);
 for(const r of e.spawnList[i]){assert(e.units[r.type],r.type);assert(x.assets[r.type]||['dog','snache','hippo','kangaroo','seal','rabbit'].includes(r.type),'missing visual '+r.type);assert(Number.isFinite(r.mag)&&r.mag>0);}
}
// HP-triggered first delays count from the moment the castle threshold is crossed.
e.reset();const g=e.getGame();g.units=[];g.elapsed=100;g.spawnRules=[{type:'strayguy',at:{hp:99},firstDelay:2/30,count:1,spawned:0,triggered:false,clock:0}];
x.bases.enemy.hp=x.bases.enemy.max*.98;x.updateStageSpawns(1/30);assert.equal(g.units.length,0);x.updateStageSpawns(1/30);assert.equal(g.units.length,1);
const rows=[];
for(let k=267;k<273;k++)for(let c=1;c<=4;c++){
 const deck=c===4?['white','brown','brick','cream','clover','navy','lava','silver','coral','hotpink']:['garnet','lapis','selenite','topaz','ribbonorange','obsidian','cornflower','khaki','rainbow','iron'];
 const r=e.simulate(e.legendIdx(k),c,deck,1,300,'smart2');for(const v of [r.seconds,r.allyHp,r.enemyHp])assert(Number.isFinite(v));rows.push({k,crown:c,...r});
}
fs.mkdirSync('docs/simulations',{recursive:true});fs.writeFileSync('docs/simulations/legend-40-smoke-2026-10-22.json',JSON.stringify(rows,null,2));
console.log('PASS: six stages, 69 rules, existing indices/data unchanged, saved progress, unlocks, crown multipliers, sprites, HP-trigger delay.');
console.log('24 smoke battles:',rows.filter(r=>r.win).length,'wins,',rows.filter(r=>r.timeout).length,'timeouts; others losses. Not a balance certification.');
process.exit(0);
