const fs=require('fs'),path=require('path'),crypto=require('crypto');
const{runJobs}=require('./sim-pool.cjs'),make=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..'),read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const A=read('docs/simulations/char-analysis-2026-10-17.json'),F=read('docs/simulations/bench20-final-2026-10-17.json'),e=make();
const changed=A.order.filter(t=>Math.abs(A.feat[t].range-(e.units[t].range||0))>1e-8);
const[stage,crown]=A.map.split(':').map(Number),core=F.core9,seeds=F.seeds,policies=F.policies;
if(!e.stageList[stage].name.includes('황제'))throw Error('map changed');
const jobs=[],meta=[];for(const key of ['__ref',...changed,'garnet','salmon:3'])for(let seed=1;seed<=seeds;seed++)for(const policy of policies){const t=key.split(':')[0],tf=key.endsWith(':3');jobs.push({i:stage,crown,deck:key==='__ref'?core:[...core,t],seed,policy,profile:{level:30,trueForms:tf?[t]:[]}});meta.push({key,seed,policy})}
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length,bands=['OP','SSS','SS','S','A','B','C','D','E','F','X'],edges=[70,62,54,46,38,30,22,14,10,6];const band=g=>bands[edges.findIndex(x=>g>=x)<0?10:edges.findIndex(x=>g>=x)];
(async()=>{const raw=await runJobs(jobs,{chunk:6,onProgress:(n,total)=>console.log(n+'/'+total)}),best={};raw.forEach((r,k)=>{if(r.error)throw Error(r.error);const m=meta[k],key=m.key+'|'+m.seed,perf=r.win?2-Math.min(300,r.seconds)/300:Math.max(0,Math.min(.95,1-r.enemyHp/e.stageList[stage].hp));if(!best[key]||best[key].perf<perf)best[key]={...r,perf,policy:m.policy}});
const result=key=>{const t=key.split(':')[0],perSeed=Array.from({length:seeds},(_,i)=>(best[key+'|'+(i+1)].perf-best['__ref|'+(i+1)].perf)*300),gain=mean(perSeed),se=Math.sqrt(perSeed.reduce((s,x)=>s+(x-gain)**2,0)/(seeds-1)/seeds);return{type:t,name:e.names[t],form:key.endsWith(':3')?3:2,rangeBefore:A.feat[t]?.range,rangeNow:e.units[t]?.range,oldGain:A.gain[t]*300,gain,se,perSeed,oldTier:band(A.gain[t]*300),tier:band(gain)}};
const anchor=result('garnet');anchor.valid=Math.abs(anchor.gain-anchor.oldGain)<=1.5;if(!anchor.valid)throw Error('anchor drift '+JSON.stringify(anchor));
const rows=changed.map(result),salmon3=result('salmon:3'),salmon=rows.find(r=>r.type==='salmon');
const delta=salmon3.perSeed.map((x,i)=>(x-salmon.perSeed[i])/300),m=mean(delta),se=Math.sqrt(delta.reduce((s,x)=>s+(x-m)**2,0)/(seeds-1)/seeds);
const payload={date:'2026-10-18',map:A.map,mapName:e.stageList[stage].name,seeds,policies,core,level:30,anchor,rows,salmonTrue:{...salmon3,delta:m,deltaSe:se,deltaPerSeed:delta},baseline:Array.from({length:seeds},(_,i)=>best['__ref|'+(i+1)]),raw,meta,codeHash:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'game.js'))).digest('hex')};
fs.writeFileSync(path.join(root,'docs/simulations/range-tier-refresh-2026-10-18.json'),JSON.stringify(payload,null,2));console.log(JSON.stringify({anchor,rows,salmonTrue:payload.salmonTrue},null,2));process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
