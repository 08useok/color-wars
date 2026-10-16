// 새(또는 조정한) 캐릭터 한 명을 기준 맵 5곳에서 재서, 기존 105종 분포(benchmark-tier-2026-10-16.json) 안의 위치를 구한다.
// 사용: UNIT=turquoise [MODS='{"turquoise":{"cost":3800}}'] node scripts/new-unit-tier.cjs
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const UNIT=process.env.UNIT,MODS=process.env.MODS?JSON.parse(process.env.MODS):null;
(async()=>{
 const e=mk();
 const B=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/benchmark-tier-2026-10-16.json'),'utf8'));
 const W=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/all-ally-tier-2026-10-16.json'),'utf8'));
 const maps=B.maps,core9=B.core9,seeds=Array.from({length:B.seeds},(_,k)=>k+1),policies=B.policies;
 const jobs=[],meta=[];
 for(const m of maps){const [i,crown]=m.split(':').map(Number);
  for(const seed of seeds)for(const policy of policies){
   jobs.push({i,crown,deck:[...core9,UNIT],seed,policy,unitMods:MODS||undefined});meta.push({m,seed,policy,kind:'with'});
   jobs.push({i,crown,deck:core9,seed,policy});meta.push({m,seed,policy,kind:'ref'});
  }}
 const res=await runJobs(jobs,{chunk:12});
 const perf=(r,hp)=>r.win?1+(1-Math.min(300,r.seconds)/300):Math.max(0,Math.min(.95,1-r.enemyHp/hp));
 const best=new Map();
 res.forEach((r,k)=>{if(r.error)throw Error(r.error);const mt=meta[k];const hp=e.stageList[+mt.m.split(':')[0]].hp;const key=[mt.m,mt.seed,mt.kind].join('|');const p=perf(r,hp);best.set(key,Math.max(best.get(key)??-1,p))});
 const gain={},pct={};
 for(const m of maps){let s=0;for(const seed of seeds)s+=best.get([m,seed,'with'].join('|'))-best.get([m,seed,'ref'].join('|'));gain[m]=s/seeds.length}
 // 기존 분포에서의 백분위(기존 105종 값과 비교, 동점은 절반)
 const others=Object.keys(B.perMap).filter(c=>c!==UNIT);
 for(const m of maps){const v=others.map(c=>B.perMap[c][m]);const less=v.filter(x=>x<gain[m]-0.004).length,tie=v.filter(x=>Math.abs(x-gain[m])<=0.004).length;pct[m]=(less+tie/2)/v.length}
 const wsum=maps.reduce((a,m)=>a+W.weight[m],0);
 const comp=maps.reduce((a,m)=>a+W.weight[m]*pct[m],0)/wsum;
 const arr=Object.values(W.res).map(o=>o.comp).sort((a,b)=>b-a);
 const rank=arr.filter(x=>x>comp).length+1;
 console.log(JSON.stringify({unit:UNIT,mods:MODS,gain:Object.fromEntries(maps.map(m=>[m,+gain[m].toFixed(4)])),pct:Object.fromEntries(maps.map(m=>[m,+pct[m].toFixed(2)])),comp:+comp.toFixed(3),rank:rank+'/'+(arr.length+1)}));
 process.exit(0);
})();
