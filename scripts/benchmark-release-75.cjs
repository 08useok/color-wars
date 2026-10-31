const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs'),{runJobs}=require('./sim-pool.cjs');
const e=make(),anchor=require('../docs/simulations/tier-arena-current-2026-10-30.json'),old=require('../docs/simulations/tier-arena-speed-buff-2026-10-30.json');
const core=['red','yellow','blue','purple'],ids=['heliotrope','wisteria','blossom','almondblossom'];
const candidates=ids.flatMap(id=>[1,2].map(form=>({id,form}))).concat([{id:'verdigris',form:3}]);
const maps=e.stageList.flatMap((s,i)=>s.tierArena?[{i,name:s.name,id:s.tierArena}]:[]),jobs=[],meta=[];
for(const map of maps)for(let seed=1;seed<=3;seed++)for(const policy of ['auto','smart2'])for(const c of [{id:null,form:2},...candidates]){
 jobs.push({i:map.i,crown:1,deck:c.id?[...core,c.id]:core,seed,policy,profile:{level:30,maxIncome:true,trueForms:c.form===3?[c.id]:[],forms:c.form===1?{[c.id]:1}:{}}});meta.push({map:map.i,seed,policy,...c});
}
(async()=>{console.log('START',jobs.length,'battles',candidates.length,'forms');const raw=await runJobs(jobs,{chunk:6,onProgress:(n,total)=>{if(n%54===0||n===total)console.log(n+'/'+total)}});assert(!raw.some(r=>r.error));
for(let n=0;n<meta.length;n++)if(!meta[n].id){const m=meta[n],j=old.meta.findIndex(v=>v.map===m.map&&!v.present&&v.base.length===4&&v.seed===m.seed&&v.policy===m.policy);assert(j>=0);for(const k of ['win','seconds','timeout','enemyHp','allyHp'])assert.equal(raw[n][k],old.raw[j][k],'baseline '+m.map+' '+k);}
const score=r=>r.win?2-r.seconds/300:0,best=(map,c,seed)=>Math.max(...meta.flatMap((m,n)=>m.map===map&&m.id===c.id&&m.form===c.form&&m.seed===seed?[score(raw[n])]:[]));
const perMap=[];for(const map of maps)for(const c of candidates){const perSeed=[1,2,3].map(seed=>best(map.i,c,seed)-best(map.i,{id:null,form:2},seed)),gain=perSeed.reduce((a,b)=>a+b,0)/3,ref=anchor.perMap.filter(r=>r.map===map.i);const pct=(ref.filter(r=>r.gain<gain-1e-9).length+ref.filter(r=>Math.abs(r.gain-gain)<=1e-9).length/2)/ref.length;perMap.push({map:map.i,...c,gain,pct,perSeed});}
const composed=candidates.map(c=>({...c,name:e.names[c.id]+' '+c.form+'진',grade:e.gradeOf(c.id),score:perMap.filter(r=>r.id===c.id&&r.form===c.form).reduce((a,b)=>a+b.pct/9,0),coreMember:false}));
const reversals=candidates.map(c=>({...c,maps:maps.filter(map=>[1,2,3].some(seed=>{const diff=policy=>{const at=(id,form)=>{const n=meta.findIndex(m=>m.map===map.i&&m.id===id&&m.form===form&&m.seed===seed&&m.policy===policy);return score(raw[n])};return at(c.id,c.form)-at(null,2)};return diff('auto')*diff('smart2')<0;})).map(m=>m.name)}));
fs.writeFileSync('docs/simulations/release-75-tier-2026-10-31.json',JSON.stringify({date:'2026-10-31',maps,core,candidates,meta,raw,perMap,composed,reversals,baselineChecks:54,anchor:'tier-arena-current-2026-10-30.json'},null,2));console.log('DONE',composed);process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
