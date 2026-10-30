const fs=require('fs'),make=require('./full-harness.cjs'),rows=[];
for(const mode of ['old','attackOnly','speed20','speed30']){
const setup=`
const mode=${JSON.stringify(mode)};const ds=unitStats;unitStats=function(id,...args){const s=ds(id,...args);if(id==='kendonavy'&&s.evolved&&!s.trueForm){s.critChance=mode==='speed30'?.3:.2;if(mode==='old'||mode==='attackOnly')s.speed/=1.2;if(mode==='old')s.interval/=.85;}return s;};
let trace={attacks:0,damage:0,hits:0,crits:0,deaths:0,deathX:[],life:[]};const birth=addUnit;addUnit=function(id){const n=game.units.length,r=birth.apply(this,arguments);if(id==='kendonavy'&&game.units.length>n)game.units.at(-1).diagBirth=game.elapsed;return r;};
const da=attack;attack=function(u){if(u.type==='kendonavy'&&u.ally)trace.attacks++;return da.apply(this,arguments);};
const dd=damage;damage=function(v,amount,from){const hp=v.hp,crit=v.critFxUntil;if(from?.type==='kendonavy'&&from.ally)v.critFxUntil=-1;const r=dd.apply(this,arguments);if(from?.type==='kendonavy'&&from.ally){trace.hits++;trace.damage+=Math.max(0,hp-v.hp);if(v.critFxUntil!==-1)trace.crits++;}if(v.type==='kendonavy'&&v.ally&&hp>0&&v.hp<=0){trace.deaths++;trace.deathX.push(v.x);trace.life.push(game.elapsed-(v.diagBirth??0));}return r;};
globalThis.__kendo={clear:()=>{trace={attacks:0,damage:0,hits:0,crits:0,deaths:0,deathX:[],life:[]}},take:()=>structuredClone(trace)};
`;
// The harness deliberately supplies a small global environment; clone JSON here.
const e=make({extraSetup:setup.replace('structuredClone(trace)','JSON.parse(JSON.stringify(trace))')}),h=globalThis.__kendo;delete globalThis.__kendo;
for(const i of [752,756])for(let seed=1;seed<=12;seed++){e.setProfile({level:30,maxIncome:true,trueForms:[]});h.clear();const r=e.simulate(i,1,['red','yellow','blue','purple','kendonavy'],seed,300,'auto');rows.push({mode,i,seed,...r,trace:h.take()});}
}
fs.writeFileSync('docs/simulations/kendonavy-diagnosis-2026-10-30.json',JSON.stringify(rows,null,2));for(const mode of ['old','attackOnly','speed20','speed30'])for(const i of [752,756]){const rs=rows.filter(r=>r.mode===mode&&r.i===i),mean=k=>rs.reduce((s,r)=>s+(r.trace[k]||0),0)/rs.length;console.log({mode,i,wins:rs.filter(r=>r.win).length,seconds:rs.reduce((s,r)=>s+r.seconds,0)/rs.length,attacks:mean('attacks'),damage:mean('damage'),crits:mean('crits'),deaths:mean('deaths')});}process.exit(0);
