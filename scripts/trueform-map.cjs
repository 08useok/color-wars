// 테스트 맵 한 곳에서 3진 효과를 잰다: 같은 덱·시드·방식으로 그 캐릭터만 3진 vs 2진의 성능 차이.
// 사용: MAP=405:3 BASE=red,yellow,blue,purple SEEDS=6 node scripts/trueform-map.cjs → docs/simulations/trueform-map-2026-10-17.json
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const MAP=process.env.MAP||'405:3',BASE=(process.env.BASE||'red,yellow,blue,purple').split(','),NS=+(process.env.SEEDS||6);
(async()=>{
 const e=mk();const [i,crown]=MAP.split(':').map(Number);
 // 3진이 실제로 적용되는 캐릭터만
 const eligible=[];
 for(const c of e.roster){e.setProfile({level:30,trueForms:[c]});const s=e.unitStats(c);if(s.trueForm)eligible.push(c)}
 e.setProfile({level:30});
 console.log('3진 가능',eligible.length,'/',e.roster.length);
 const jobs=[],meta=[];
 for(const c of eligible){const deck=BASE.includes(c)?BASE:[...BASE,c];
  for(let seed=1;seed<=NS;seed++)for(const p of ['auto','smart2']){
   jobs.push({i,crown,deck,seed,policy:p,profile:{level:30,trueForms:[c]}});meta.push({c,seed,p,f:3});
   jobs.push({i,crown,deck,seed,policy:p,profile:{level:30}});meta.push({c,seed,p,f:2});
  }}
 const res=await runJobs(jobs,{chunk:12});
 const perf=(r,hp)=>r.win?1+(1-Math.min(300,r.seconds)/300):Math.max(0,Math.min(.95,1-r.enemyHp/hp));
 const hp=e.stageList[i].hp;const best=new Map();
 res.forEach((r,k)=>{if(r.error)throw Error(r.error);const m=meta[k];const key=[m.c,m.seed,m.f].join('|');const v=perf(r,hp);best.set(key,Math.max(best.get(key)??-1,v))});
 const out={};
 for(const c of eligible){const d=[];for(let s=1;s<=NS;s++)d.push(best.get([c,s,3].join('|'))-best.get([c,s,2].join('|')));const m=d.reduce((a,b)=>a+b,0)/d.length,sd=Math.sqrt(d.reduce((a,b)=>a+(b-m)**2,0)/Math.max(1,d.length-1));out[c]={name:e.names[c],delta:m,se:sd/Math.sqrt(d.length),perSeed:d}}
 fs.writeFileSync(path.join(root,'docs/simulations/trueform-map-2026-10-17.json'),JSON.stringify({map:MAP,base:BASE,seeds:NS,eligible,out}));
 const arr=Object.entries(out).sort((a,b)=>b[1].delta-a[1].delta);
 console.log(arr.slice(0,10).map(([c,o])=>o.name+' +'+o.delta.toFixed(3)).join(' | '));
 console.log(arr.slice(-8).map(([c,o])=>o.name+' '+o.delta.toFixed(3)).join(' | '));
 console.log('done');process.exit(0);
})();
