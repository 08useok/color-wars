// 특정 캐릭터(예: 카민·사파이어)의 대체제 찾기: 좋은 덱에서 그 칸만 다른 캐릭터로 바꿔 성능이 얼마나 유지되는지 잰다.
// 사용: TARGETS=carmine,sapphire node scripts/substitute.cjs   → docs/simulations/substitute-2026-10-16.json
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const TARGETS=(process.env.TARGETS||'carmine,sapphire').split(',');
const NCOND=+(process.env.NCOND||70);
const POL=['auto','smart2'];
(async()=>{
 const e=mk();
 const T=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/tier-test-2026-10-13-best.json'),'utf8'));
 const base=['red','yellow','brick','ribbonorange','rainbow','prism','carmine','sapphire','night','white'];
 const conds=T.chosen.filter(c=>c.crown<=3).slice(0,NCOND);
 console.log('조건',conds.length,'대상',TARGETS.join(','));
 const cands=e.roster.filter(t=>!base.includes(t)&&e.gradeOf(t)!=='uber');
 const jobs=[],meta=[];
 for(const target of TARGETS){
  const variants=[{id:'__orig',deck:base},{id:'__empty',deck:base.filter(t=>t!==target)},...cands.map(c=>({id:c,deck:base.map(t=>t===target?c:t)}))];
  for(const v of variants)for(const c of conds)for(const p of POL){jobs.push({i:c.i,crown:c.crown,deck:v.deck,seed:1,policy:p});meta.push({target,v:v.id,i:c.i,crown:c.crown})}
 }
 console.log('jobs',jobs.length);
 const t0=Date.now();
 const res=await runJobs(jobs,{chunk:24,onProgress:(d,n)=>{if(d%2000===0)console.log(d,'/',n,((Date.now()-t0)/1000|0)+'s')}});
 const perf=(r,hp)=>r.win?1+(1-Math.min(300,r.seconds)/300):Math.max(0,Math.min(.95,1-r.enemyHp/hp));
 const best=new Map();
 res.forEach((r,k)=>{if(r.error)throw Error(r.error);const m=meta[k];const hp=e.stageList[m.i].hp;const key=[m.target,m.v,m.i,m.crown].join('|');const v={perf:perf(r,hp),win:r.win};const b=best.get(key);if(!b||v.perf>b.perf)best.set(key,v)});
 const out={};
 for(const target of TARGETS){
  const rows=[];
  const ids=['__orig','__empty',...cands];
  for(const id of ids){let wins=0,sum=0;for(const c of conds){const v=best.get([target,id,c.i,c.crown].join('|'));wins+=v.win?1:0;sum+=v.perf}rows.push({id,name:id==='__orig'?e.names[target]+'(원래)':id==='__empty'?'(빈 칸)':e.names[id],grade:id.startsWith('__')?'-':e.gradeOf(id),wins,meanPerf:+(sum/conds.length).toFixed(4)})}
  const orig=rows.find(r=>r.id==='__orig'),empty=rows.find(r=>r.id==='__empty');
  for(const r of rows)r.keep=+(((r.meanPerf-empty.meanPerf)/Math.max(1e-6,orig.meanPerf-empty.meanPerf))*100).toFixed(1);// 원래 캐릭터가 더한 성능 중 몇 %를 유지하나
  out[target]=rows;
 }
 fs.writeFileSync(path.join(root,'docs/simulations/substitute-2026-10-16.json'),JSON.stringify({base,conds:conds.length,out}));
 for(const target of TARGETS){const rows=out[target].filter(r=>!r.id.startsWith('__')).sort((a,b)=>b.keep-a.keep);const o=out[target].find(r=>r.id==='__orig'),em=out[target].find(r=>r.id==='__empty');
  console.log('== '+e.names[target],'원래 승',o.wins,'평균',o.meanPerf,'/ 빈 칸 승',em.wins,'평균',em.meanPerf);
  for(const r of rows.slice(0,12))console.log('  ',String(r.keep).padStart(6)+'%',r.grade.padEnd(5),r.name,'승',r.wins);}
 console.log('done');process.exit(0);
})();
