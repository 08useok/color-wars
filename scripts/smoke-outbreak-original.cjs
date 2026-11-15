const fs=require('node:fs'),make=require('./full-harness.cjs');
const e=make({extraSetup:`globalThis.__outbreakSmoke={entries:ZOMBIE_OUTBREAK_ORIGINAL,start:startOutbreak,restore:zombieSlotRestore,save:zombieSave,slot:ZOMBIE_SLOT};let __peak=0;const __smokeUpdate=update;update=function(dt){const result=__smokeUpdate.apply(this,arguments);__peak=Math.max(__peak,game.units.filter(u=>!u.ally&&u.hp>0).length+game.defeated.filter(u=>!u.ally&&u.reviveAt!==undefined).length);return result;};globalThis.__outbreakSmoke.resetPeak=()=>__peak=0;globalThis.__outbreakSmoke.peak=()=>__peak;`});
const h=globalThis.__outbreakSmoke;delete globalThis.__outbreakSmoke;
const deck=['white','mintcyan','magenta','ribbonorange','iron','grey','slate','smoke','ash','amber'];
e.setProfile({level:30,maxIncome:true,trueForms:[],forms:{}});h.save.clear=[...h.entries.keys()];
const rows=[];console.log('START original outbreak smoke: 336 maps, 60s cap each; not a full-clear certification');
for(const [i,s]of h.entries){h.restore();h.start(i);h.resetPeak();const r=e.simulate(h.slot,1,deck,1,60,'smart2');
 if(![r.seconds,r.allyHp,r.enemyHp].every(Number.isFinite))throw Error('Non-finite battle result '+i);
 rows.push({i,chapter:s.chapter,order:s.order,name:s.name,max:s.max,allyLimit:s.limit,peakEnemyPopulation:h.peak(),...r});
 if(rows.length%48===0)console.log('PROGRESS',rows.length+'/336');
}
fs.writeFileSync('docs/simulations/outbreak-original-smoke-2026-11-15.json',JSON.stringify({date:'2026-11-15',description:'60-second executable-stage smoke test, not proof of 336 full clears',deck,profile:{level:30,maxIncome:true,form:2,treasures:'complete'},rows},null,2)+'\n');
console.log('DONE',rows.length,'maps; wins',rows.filter(r=>r.win).length,'timeouts',rows.filter(r=>r.timeout).length);process.exit(0);
