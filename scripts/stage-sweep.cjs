// 1단계: 기준 덱 4종 × 출격 방식 3종으로 모든 전투 조건을 한 번씩 돌린다.
// 출력: docs/simulations/stage-sweep-2026-10-13.json  (조건별·덱별·방식별 결과)
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
(async()=>{
 const e=mk();
 const exists=n=>e.roster.includes(n);
 const decks={
  base:['red','yellow','brick','indigo','ribbonorange','rainbow','cornflower','khaki','silver','fusioncream'],
  four:['white','brown','brick','moss','silver','navy','lava','magenta','ribbonorange','garnet'],
  core:['garnet','lapis','selenite','topaz','ribbonorange','obsidian','cornflower','khaki','rainbow','red'],
  ultra:['rainbow','prism','amber','iron','grey','carmine','bronze','royalblue','emerald','night']
 };
 for(const [k,d] of Object.entries(decks))for(const t of d)if(!exists(t))throw Error('no ally '+t+' in '+k);
 const conds=[];
 e.stageList.forEach((s,i)=>{if(s.legend)for(const c of [1,2,3,4])conds.push({i,crown:c});else conds.push({i,crown:1})});
 const policies=['auto','smart','smart2'];
 const jobs=[],meta=[];
 for(const c of conds)for(const [dk,deck] of Object.entries(decks)){
  if(c.crown===4&&dk!=='four')continue;           // ★4는 EX·레어만 출전 가능
  if(c.crown!==4&&dk==='four'&&c.i>=0&&!e.stageList[c.i].legend)continue; // 일반 스테이지는 four 덱 생략
  for(const p of policies){jobs.push({i:c.i,crown:c.crown,deck,seed:1,policy:p});meta.push({i:c.i,crown:c.crown,deck:dk,policy:p});}
 }
 console.log('conditions',conds.length,'jobs',jobs.length);
 const t0=Date.now();
 const res=await runJobs(jobs,{onProgress:(d,n)=>{if(d%1000===0)console.log(d,'/',n,((Date.now()-t0)/1000|0)+'s')}});
 const rows=res.map((r,k)=>({...meta[k],win:r.win,timeout:r.timeout,sec:r.seconds,ally:r.allyHp,enemy:r.enemyHp,error:r.error}));
 const out=path.join(root,'docs/simulations/stage-sweep-2026-10-13.json');
 fs.writeFileSync(out,JSON.stringify({decks,policies,names:Object.fromEntries(e.stageList.map((s,i)=>[i,s.name])),rows}));
 console.log('done',(Date.now()-t0)/1000|0,'s; errors',rows.filter(r=>r.error).length);
})();
