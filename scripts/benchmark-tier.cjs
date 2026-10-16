// 기준 맵 한 곳에서 모든 아군의 성능을 시드를 늘려 잰다(기준 덱 9종 + 후보 1칸, 후보가 기준 덱 멤버면 그 멤버를 뺀 덱과 비교).
// 사용: MAPS=527:1 SEEDS=10 node scripts/benchmark-tier.cjs   (MAPS는 쉼표로 여러 개)
// 지표(perf): 승리 = 1 + (1 - 걸린 초/300), 패배 = 적 성을 깎은 비율(최대 0.95). 출격 방식은 야옹컴·싼 유닛부터 중 높은 쪽.
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const MAPS=(process.env.MAPS||'527:1').split(',');
const SEEDS=Array.from({length:+(process.env.SEEDS||10)},(_,k)=>k+1);
const POLICIES=(process.env.POLICIES||'auto,smart2').split(',');
(async()=>{
 const e=mk();
 const core9=['garnet','lapis','selenite','topaz','ribbonorange','obsidian','cornflower','khaki','rainbow'];
 const allies=e.roster;
 const jobs=[],meta=[];
 for(const m of MAPS){const [i,crown]=m.split(':').map(Number);
  for(const seed of SEEDS)for(const policy of POLICIES){
   jobs.push({i,crown,deck:core9,seed,policy});meta.push({m,c:'__ref',seed,policy});
   for(const c of allies){const inCore=core9.includes(c);jobs.push({i,crown,deck:inCore?core9.filter(t=>t!==c):[...core9,c],seed,policy});meta.push({m,c,seed,policy,kind:inCore?'without':'with'})}
  }}
 console.log('jobs',jobs.length,'maps',MAPS.join(','),'seeds',SEEDS.length);
 const t0=Date.now();
 const res=await runJobs(jobs,{chunk:24,onProgress:(d,n)=>{if(d%1000===0)console.log(d,'/',n,((Date.now()-t0)/1000|0)+'s')}});
 const perf=(r,hp)=>r.win?1+(1-Math.min(300,r.seconds)/300):Math.max(0,Math.min(.95,1-r.enemyHp/hp));
 const best=new Map();// m|c|seed → {perf,win,sec}
 res.forEach((r,k)=>{if(r.error)throw Error(r.error);const mt=meta[k];const hp=e.stageList[+mt.m.split(':')[0]].hp;const key=[mt.m,mt.c,mt.seed].join('|');const v={perf:perf(r,hp),win:r.win,sec:r.win?r.seconds:300};const b=best.get(key);if(!b||v.perf>b.perf)best.set(key,v)});
 const out={},perMap={};
 for(const c of allies){
  const inCore=core9.includes(c);const gains=[],winD=[],secD=[];
  for(const m of MAPS)for(const seed of SEEDS){
   const a=best.get([m,c,seed].join('|')),r=best.get([m,'__ref',seed].join('|'));
   const w=inCore?r:a,wo=inCore?a:r; // w = 후보가 있는 쪽
   (perMap[c]=perMap[c]||{})[m]=(perMap[c][m]||0)+(w.perf-wo.perf)/SEEDS.length;gains.push(w.perf-wo.perf);winD.push((w.win?1:0)-(wo.win?1:0));if(w.win&&wo.win)secD.push(wo.sec-w.sec);
  }
  const n=gains.length,mean=gains.reduce((a,b)=>a+b,0)/n,sd=Math.sqrt(gains.reduce((a,b)=>a+(b-mean)**2,0)/Math.max(1,n-1));
  out[c]={name:e.names[c],grade:e.gradeOf(c),n,gain:+mean.toFixed(4),se:+(sd/Math.sqrt(n)).toFixed(4),winGain:+(winD.reduce((a,b)=>a+b,0)/n*100).toFixed(1),secSaved:secD.length?+(secD.reduce((a,b)=>a+b,0)/secD.length).toFixed(1):null,core:inCore};
 }
 const refs=[];for(const m of MAPS)for(const seed of SEEDS){const r=best.get([m,'__ref',seed].join('|'));refs.push(r)}
 const refSummary={winRate:+(refs.filter(r=>r.win).length/refs.length*100).toFixed(1),meanSec:+(refs.reduce((a,r)=>a+r.sec,0)/refs.length).toFixed(1)};
 fs.writeFileSync(path.join(root,'docs/simulations/benchmark-tier-2026-10-16.json'),JSON.stringify({maps:MAPS,seeds:SEEDS.length,policies:POLICIES,core9,refSummary,out,perMap},null,1));
 const arr=Object.entries(out).sort((a,b)=>b[1].gain-a[1].gain);
 console.log('ref deck',JSON.stringify(refSummary));
 for(const [c,o] of arr)console.log(String(o.gain).padStart(8),('±'+o.se).padEnd(8),o.grade.padEnd(5),c.padEnd(13),o.name,'승률+'+o.winGain,'단축'+o.secSaved,o.core?'(기준 덱)':'');
 console.log('done');process.exit(0);
})();
