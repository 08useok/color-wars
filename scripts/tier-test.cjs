// 2단계: 새 티어 — 같은 슬롯 비교.
// 기준 덱 9종에 후보 1종을 더한 덱(후보가 기준 덱 멤버면 그 멤버를 뺀 덱과 비교)을 어려운 조건 집합에서 돌려
// 승리 수·시간·성 체력 차이를 잰다. 스윕 결과(stage-sweep-2026-10-13.json)에서 어려운 조건을 고른다.
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const POLICIES=(process.env.TIER_POLICY||'auto,smart2').split(',');
const SEEDS=(process.env.TIER_SEEDS||'1,2,3').split(',').map(Number);
const MAXCOND=+(process.env.TIER_COND||180);
(async()=>{
 const e=mk();
 const sweep=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/stage-sweep-2026-10-13.json'),'utf8'));
 const core9=['garnet','lapis','selenite','topaz','ribbonorange','obsidian','cornflower','khaki','rainbow'];
 // 어려운 조건: 기준 덱들(base·core·ultra·four)이 방식 3가지 중 어느 것으로도 항상 이기지는 못하거나, 이겨도 오래 걸린 조건
 const by=new Map();
 for(const r of sweep.rows){const k=r.i+':'+r.crown;(by.get(k)||by.set(k,[]).get(k)).push(r)}
 const scored=[];
 for(const [k,rs] of by){
  const [i,crown]=k.split(':').map(Number);
  const wins=rs.filter(r=>r.win),anyWin=wins.length>0;
  const frac=wins.length/rs.length;
  const best=Math.min(...rs.map(r=>r.win?r.sec:300));
  const hard=(1-frac)*100+(anyWin?best/3:100);
  scored.push({i,crown,frac,best,hard,anyWin,name:sweep.names[i]});
 }
 // 한 번도 못 이긴 조건은 후보 비교에 쓸모가 없으므로 따로 둔다(캐릭터가 바꿔도 결과가 안 변함)
 const usable=scored.filter(s=>s.anyWin).sort((a,b)=>b.hard-a.hard);
 // 전체에서 가장 어려운 조건 + 장 묶음별로 가장 어려운 조건(초반 장 캐릭터가 전부 0점이 되지 않게)
 const grp=s=>{const i=s.i;if(i<=47)return 'W1';if(i<=95)return 'W2';if(i<=143)return 'W3';if(i>=159&&i<=206)return 'F1';if(i>=353&&i<=400)return 'F2';if(i>=459&&i<=506)return 'F3';if(i>=507&&i<=554)return 'C1';return e.stageList[i].legend?'L'+s.crown:'S'};
 const chosenMap=new Map();
 for(const s of usable.slice(0,Math.floor(MAXCOND*.45)))chosenMap.set(s.i+':'+s.crown,s);
 const groups={};for(const s of usable)(groups[grp(s)]=groups[grp(s)]||[]).push(s);
 const per=Math.ceil(MAXCOND*.55/Object.keys(groups).length);
 for(const g of Object.keys(groups))for(const s of groups[g].slice(0,per))chosenMap.set(s.i+':'+s.crown,s);
 const chosen=[...chosenMap.values()];
 console.log('conditions total',scored.length,'anyWin',usable.length,'chosen',chosen.length,'unwinnable',scored.length-usable.length,Object.fromEntries(Object.entries(groups).map(([g,v])=>[g,v.length])));
 const cands=e.roster.filter(t=>true);
 const jobs=[],meta=[];
 const mkDeck=(c,withIt)=>{
  const inCore=core9.includes(c);
  if(inCore)return withIt?core9:core9.filter(t=>t!==c);
  return withIt?[...core9,c]:core9;
 };
 for(const s of chosen){
  const allowed4=t=>['ex','rare'].includes(e.gradeOf(t));
  const emptyDeck=core9;
  for(const seed of SEEDS){
   for(const policy of POLICIES){jobs.push({i:s.i,crown:s.crown,deck:emptyDeck,seed,policy});meta.push({c:'__core9',i:s.i,crown:s.crown,seed,kind:'ref',policy});}
   for(const c of cands){
    if(s.crown===4&&!allowed4(c))continue;
    if(s.crown===4&&core9.some(t=>!allowed4(t))){/* 기준 덱에 울슈레가 있으면 ★4에서는 그 칸이 비는 채로 진행 */}
    const inCore=core9.includes(c);
    for(const policy of POLICIES){
     if(inCore){jobs.push({i:s.i,crown:s.crown,deck:core9.filter(t=>t!==c),seed,policy});meta.push({c,i:s.i,crown:s.crown,seed,kind:'without',policy})}
     else{jobs.push({i:s.i,crown:s.crown,deck:[...core9,c],seed,policy});meta.push({c,i:s.i,crown:s.crown,seed,kind:'with',policy})}
    }
   }
  }
 }
 console.log('jobs',jobs.length,'policy',POLICIES.join('+'),'seeds',SEEDS.join(','));
 const t0=Date.now();
 const res=await runJobs(jobs,{chunk:32,onProgress:(d,n)=>{if(d%2000===0)console.log(d,'/',n,((Date.now()-t0)/1000|0)+'s')}});
 const rows=res.map((r,k)=>({...meta[k],win:r.win,sec:r.seconds,ally:r.allyHp,enemy:r.enemyHp,error:r.error}));
 fs.writeFileSync(path.join(root,'docs/simulations/tier-test-2026-10-13-best.json'),JSON.stringify({policies:POLICIES,seeds:SEEDS,core9,chosen,names:Object.fromEntries(e.roster.map(t=>[t,e.names[t]])),grades:Object.fromEntries(e.roster.map(t=>[t,e.gradeOf(t)])),rows}));
 console.log('done',(Date.now()-t0)/1000|0,'s; errors',rows.filter(r=>r.error).length);
})();
