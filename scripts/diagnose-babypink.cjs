const fs=require('fs'),make=require('./full-harness.cjs');
const setup=`
let diag={};const diagRow=id=>diag[id]||(diag[id]={attacks:0,damage:0,kills:0,blocked:0});
const diagAttack=attack;attack=function(u,t){if(u.ally)diagRow(u.type).attacks++;return diagAttack.apply(this,arguments)};
const diagDamage=damage;damage=function(v,amount,from){const hp=v.hp,r=diagDamage.apply(this,arguments);if(from?.ally&&!v.ally){const row=diagRow(from.type);row.damage+=Math.max(0,hp-v.hp);if(hp>0&&v.hp<=0)row.kills++;}return r;};
const diagCan=canEngage;canEngage=function(t){const r=diagCan(t);if(!r)diagRow('all').blocked++;return r;};
globalThis.__babyDiag={take:()=>JSON.parse(JSON.stringify(diag)),clear:()=>{diag={}},noLocks:()=>{canEngage=()=>true;}};
`;
const rows=[];
for(const variant of ['second','third','thirdWindup','secondNoLocks','thirdNoLocks']){
const e=make({extraSetup:setup}),h=globalThis.__babyDiag;delete globalThis.__babyDiag;
if(variant.endsWith('NoLocks'))h.noLocks();if(variant==='thirdWindup'){e.trueBonus.babypink.windup=.35;e.trueBonus.babypink.attackDuration=.8;}
for(let seed=1;seed<=+(process.env.SEEDS||3);seed++)for(const policy of (process.env.POLICIES||'auto,smart2').split(',')){e.setProfile({level:30,maxIncome:true,trueForms:variant.startsWith('second')?[]:['babypink']});h.clear();const r=e.simulate(405,3,['red','yellow','blue','purple','babypink'],seed,300,policy);rows.push({variant,seed,policy,...r,trace:h.take()});}
}
fs.writeFileSync(process.env.OUT||'docs/simulations/babypink-diagnosis-2026-10-30.json',JSON.stringify(rows,null,2));
for(const variant of [...new Set(rows.map(r=>r.variant))]){const best=[1,2,3].map(seed=>rows.filter(r=>r.variant===variant&&r.seed===seed).sort((a,b)=>a.seconds-b.seconds)[0]);console.log(variant,JSON.stringify({seconds:best.reduce((s,r)=>s+r.seconds,0)/3,rows:best.map(r=>({seed:r.seed,policy:r.policy,seconds:r.seconds,deployments:r.deployments,trace:r.trace}))}));}process.exit(0);
