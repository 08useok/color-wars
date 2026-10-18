// Measure only four new allies plus one old anchor, preserving the existing full roster results.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const{runJobs}=require('./sim-pool.cjs'),make=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..'),read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const A=read('docs/simulations/char-analysis-2026-10-17.json'),F=read('docs/simulations/bench20-final-2026-10-17.json');
const types=['herbmint','kendonavy','alchemypurple','rhythmpink'],core=F.core9,policies=F.policies,seeds=F.seeds,[i,crown]=A.map.split(':').map(Number),e=make();
if(!e.stageList[i].name.includes('황제'))throw Error('Stage ID moved: '+e.stageList[i].name);
const jobs=[],meta=[];for(const t of ['__ref',...types,'garnet'])for(let seed=1;seed<=seeds;seed++)for(const policy of policies){jobs.push({i,crown,deck:t==='__ref'?core:[...core,t],seed,policy,profile:{level:30,trueForms:[]}});meta.push({t,seed,policy})}
const mean=a=>a.reduce((a,b)=>a+b,0)/a.length;
const bands=['OP','SSS','SS','S','A','B','C','D','E','F','X'],edges=[70,62,54,46,38,30,22,14,10,6];
const band=x=>bands[edges.findIndex(e=>x>=e)<0?10:edges.findIndex(e=>x>=e)];
(async()=>{const raw=await runJobs(jobs,{chunk:6,onProgress:(n,t)=>console.log(n+'/'+t)}),best={};raw.forEach((r,k)=>{if(r.error)throw Error(r.error);const m=meta[k],perf=r.win?2-Math.min(300,r.seconds)/300:Math.max(0,Math.min(.95,1-r.enemyHp/e.stageList[i].hp)),key=m.t+'|'+m.seed;if(!best[key]||perf>best[key].perf)best[key]={...r,perf,policy:m.policy}});
const result=t=>{const perSeed=Array.from({length:seeds},(_,k)=>(best[t+'|'+(k+1)].perf-best['__ref|'+(k+1)].perf)*300),gain=mean(perSeed),se=Math.sqrt(perSeed.reduce((s,x)=>s+(x-gain)**2,0)/(seeds-1))/Math.sqrt(seeds);return{type:t,name:e.names[t],gain,se,perSeed,tier:band(gain),near:edges.some(x=>Math.abs(x-gain)<Math.max(2,se)),ci:[gain-1.96*se,gain+1.96*se],wins:Array.from({length:seeds},(_,k)=>best[t+'|'+(k+1)].win).filter(Boolean).length}};
const anchor=result('garnet'),oldAnchor=A.gain.garnet*300,valid=Math.abs(anchor.gain-oldAnchor)<=1.5,rows=types.map(result).sort((a,b)=>b.gain-a.gain);
const baseline=Array.from({length:seeds},(_,k)=>best['__ref|'+(k+1)]);
const hash=crypto.createHash('sha256');for(const f of ['game.js','cyclone-advents.js','scripts/full-harness.cjs'])hash.update(fs.readFileSync(path.join(root,f)));
const payload={date:'2026-10-18',map:A.map,mapName:e.stageList[i].name,crown,level:30,seeds,core,policies,baseline,anchor:{...anchor,previousGain:oldAnchor,valid},rows,meta,raw,codeHash:hash.digest('hex')};
fs.writeFileSync(path.join(root,'docs/simulations/subspecies-tier-2026-10-18.json'),JSON.stringify(payload,null,2));
console.log(JSON.stringify({map:A.map,baseline:mean(baseline.map(x=>x.seconds)),anchor:payload.anchor,rows},null,2));process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
