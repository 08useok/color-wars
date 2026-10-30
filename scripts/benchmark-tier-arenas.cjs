// UNIT=id,id or ALL=1. Explicit full-roster switch avoids accidental long runs.
const fs=require('fs'),e=require('./full-harness.cjs')(),{runJobs}=require('./sim-pool.cjs');
if(!process.env.UNIT&&process.env.ALL!=='1'){console.log('UNIT=lilac,babypink,magenta,fusioncream,ocean,sea or ALL=1; SEEDS=3 (default). Runs 9 maps, both policies, second and owned third forms.');process.exit(0);}
const ids=process.env.ALL==='1'?e.roster:process.env.UNIT.split(',');for(const id of ids)if(!e.roster.includes(id))throw Error('Unknown ally '+id);
const maps=e.stageList.flatMap((s,i)=>s.tierArena?[{i,id:s.tierArena,name:s.name,weight:1/9}]:[]),seeds=+(process.env.SEEDS||3),core=['red','yellow','blue','purple'],jobs=[],meta=[],candidates=[];
const unique=new Map(),references=[];
for(const id of ids){candidates.push({id,form:2});e.setProfile({trueForms:[id]});if(e.unitStats(id).trueForm)candidates.push({id,form:3});}e.setProfile({});
// Both decks contain the same other units; a core member is compared with itself
// omitted. Mark these explicitly so that the different base deck is reviewable.
for(const map of maps)for(const c of candidates)for(let seed=1;seed<=seeds;seed++)for(const policy of ['auto','smart2'])for(const present of [false,true]){
 const base=core.filter(id=>id!==c.id),job={i:map.i,crown:1,deck:present?[...base,c.id]:base,seed,policy,profile:{level:30,maxIncome:true,trueForms:present&&c.form===3?[c.id]:[]}},key=JSON.stringify(job);
 if(!unique.has(key)){unique.set(key,jobs.length);jobs.push(job);}references.push(unique.get(key));meta.push({map:map.i,...c,seed,policy,present,base});
}
(async()=>{console.log('candidates',candidates.length,'jobs',jobs.length,'comparisons',meta.length);let last=0;const uniqueRaw=await runJobs(jobs,{chunk:12,onProgress:(n,total)=>{if(n-last>=500||n===total){last=n;console.log(n+'/'+total);}}});if(uniqueRaw.some(r=>r.error))throw Error(JSON.stringify(uniqueRaw.filter(r=>r.error)));const raw=references.map(i=>uniqueRaw[i]);
const score=r=>r.win?2-r.seconds/300:0; // All nonwins tie until enemy-progress scoring is validated.
const groups=new Map();for(let n=0;n<meta.length;n++){const m=meta[n],key=[m.map,m.id,m.form,m.seed,m.present].join('|');const s=score(raw[n]);groups.set(key,Math.max(groups.get(key)??-Infinity,s));}
const perMap=[];for(const map of maps)for(const c of candidates){const gains=[];for(let seed=1;seed<=seeds;seed++)gains.push(groups.get([map.i,c.id,c.form,seed,true].join('|'))-groups.get([map.i,c.id,c.form,seed,false].join('|')));perMap.push({map:map.i,...c,gain:gains.reduce((a,b)=>a+b,0)/seeds,perSeed:gains});}
for(const map of maps){const rs=perMap.filter(r=>r.map===map.i);for(const r of rs)r.pct=rs.length===1?.5:(rs.filter(v=>v.gain<r.gain-1e-9).length+(rs.filter(v=>Math.abs(v.gain-r.gain)<=1e-9).length-1)/2)/(rs.length-1);}
const composed=candidates.map(c=>({...c,score:perMap.filter(r=>r.id===c.id&&r.form===c.form).reduce((s,r)=>s+r.pct/9,0),coreMember:core.includes(c.id)})).sort((a,b)=>b.score-a.score);
fs.writeFileSync('docs/simulations/tier-arena-benchmark-2026-10-30.json',JSON.stringify({version:1,scope:process.env.ALL==='1'?'all':'subset',note:'Percentiles are only within the selected candidates. Nonwins tie at zero; no global grade labels before full-roster and failure-progress validation. Core members use a different omitted-member reference deck.',maps,seeds,core,meta,raw,perMap,composed},null,2));console.log(composed);process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
