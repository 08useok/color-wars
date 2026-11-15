const fs=require('node:fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const source=require('../reference-sheets/zombie-outbreak-original/sources.json');
const e=make({extraSetup:'globalThis.__bossCheck={entries:ZOMBIE_OUTBREAK_ORIGINAL,start:startOutbreak,restore:zombieSlotRestore,save:zombieSave,slot:ZOMBIE_SLOT,base:data.bases.enemy,step:updateStageSpawns};'}),h=globalThis.__bossCheck;delete globalThis.__bossCheck;
h.save.clear=[...h.entries.keys()];
function setup(i,k){h.restore();h.start(i);const g=e.getGame();g.running=true;g.tutorial=99;g.units=[];g.defeated=[];g.elapsed=0;const r=g.spawnRules[k];g.spawnRules=[r];return {g,r};}
const rows=[];
for(const [i,s]of h.entries){const src=source.stages.find(x=>x.chapter===s.chapter&&x.order===s.order);
 for(let k=0;k<s.rules.length;k++){const rule=s.rules[k];if(!rule.boss)continue;const original=src.rows[k];assert(original.boss);assert.equal(rule.type,source.enemyMap[original.enemy]);
  const row={i,chapter:s.chapter,order:s.order,name:s.name,rule:k,enemy:rule.type,hp:rule.at.hp??null,delayFrames:original.hp<100?original.first:0,timeFrames:original.hp===100?original.first:null};
  if(rule.at.hp!==undefined){
   let {g,r}=setup(i,k);const cutoff=Math.floor(s.hp*rule.at.hp/100);g.elapsed=10000;h.base.hp=cutoff+1;h.step(0);row.aboveBlocked=!r.triggered&&r.spawned===0;
   h.base.hp=cutoff;h.step(0);row.exactActivated=r.triggered;row.immediateSpawn=r.spawned;
   let ticks=0;while(r.spawned===0&&ticks<=original.first+2){h.step(1/30);ticks++;}row.firstSpawnTick=ticks;row.delayMatches=ticks===original.first;row.actualUnitSpawned=g.units.some(u=>!u.ally&&u.type===rule.type);
   ({g,r}=setup(i,k));h.base.hp=Math.max(1,cutoff-1);h.step(0);row.belowActivated=r.triggered;
  }else{
   const {g,r}=setup(i,k);g.elapsed=Math.max(0,rule.at.t-1/30);h.step(0);row.beforeTimeBlocked=rule.at.t===0||!r.triggered;g.elapsed=rule.at.t;h.step(0);row.atTimeSpawned=r.spawned===1;row.actualUnitSpawned=g.units.some(u=>!u.ally&&u.type===rule.type);
  }
  if((rule.firstDelay||0)>0||(rule.at.t||0)>0){const {g,r}=setup(i,k);h.base.hp=0;row.lethalPreservesSchedule=!r.triggered&&r.spawned===0;row.lethalCastleProtected=h.base.hp===1;
   if(rule.at.hp!==undefined){h.step(0);let ticks=0;while(r.spawned===0&&ticks<=original.first+2){h.step(1/30);ticks++;}row.lethalDelayMatches=ticks===original.first&&g.units.some(u=>!u.ally&&u.type===rule.type);}
   else{g.elapsed=rule.at.t-1/30;h.step(0);row.lethalBeforeTimeBlocked=r.spawned===0;g.elapsed=rule.at.t;h.step(0);row.lethalAtTimeSpawned=r.spawned===1&&g.units.some(u=>!u.ally&&u.type===rule.type);}
  }
  rows.push(row);
 }
}
const failures=rows.filter(r=>r.aboveBlocked===false||r.exactActivated===false||r.belowActivated===false||r.delayMatches===false||r.beforeTimeBlocked===false||r.atTimeSpawned===false||r.lethalPreservesSchedule===false||r.actualUnitSpawned===false||r.lethalCastleProtected===false||r.lethalDelayMatches===false||r.lethalBeforeTimeBlocked===false||r.lethalAtTimeSpawned===false);
const report={date:'2026-11-15',scope:'All 336 original outbreaks, every boss spawn row; isolated actual updateStageSpawns and castle-guard boundary tests',bossRules:rows.length,hpRules:rows.filter(r=>r.hp!==null).length,timedRules:rows.filter(r=>r.timeFrames!==null).length,failures:failures.length,rows};
fs.writeFileSync('docs/simulations/outbreak-boss-triggers-2026-11-15.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({bossRules:report.bossRules,hpRules:report.hpRules,timedRules:report.timedRules,aboveFailures:rows.filter(r=>r.aboveBlocked===false).length,exactFailures:rows.filter(r=>r.exactActivated===false).length,delayFailures:rows.filter(r=>r.delayMatches===false).length,lethalFailures:rows.filter(r=>r.lethalPreservesSchedule===false).length}));
console.log(JSON.stringify(failures.slice(0,4)));process.exit(failures.length?1:0);
