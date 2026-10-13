// 3단계: 장마다 '모든 스테이지를 깰 수 있는 세팅(덱 10종 + 필요한 레벨 + 출격 방식)'을 찾는다.
// - 기준 덱 → 못 깬 스테이지만 모아 한 칸씩 갈아 끼우는 국소 탐색(티어 점수가 낮은 칸부터)
// - 방식: auto(야옹컴) < smart(위기 때 아껴 두지 않음) < smart2(위기 때 싼 유닛부터). 스테이지마다 하나라도 이기면 '깰 수 있음'.
// - 찾은 덱은 레벨 10·15·20·25·30(경제 최대)로 낮춰 가며 최소 레벨을 잰다.
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const POLICIES=['auto','smart','smart2'];
const ONLY=process.env.ONLY?process.env.ONLY.split(','):null;
const MAX_ROUNDS=+(process.env.ROUNDS||6);
(async()=>{
 const e=mk();
 const scores=fs.existsSync(path.join(root,'docs/simulations/tier-scores-2026-10-13.json'))?JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/tier-scores-2026-10-13.json'),'utf8')):{};
 const val=t=>scores[t]?.score??0;
 const grade=t=>e.gradeOf(t);
 const allowed=(t,crown)=>crown===4?['ex','rare'].includes(grade(t)):true;
 const seeds={
  base:['red','yellow','brick','indigo','ribbonorange','rainbow','cornflower','khaki','silver','fusioncream'],
  four:['white','brown','brick','moss','silver','navy','lava','magenta','ribbonorange','garnet'],
  core:['garnet','lapis','selenite','topaz','ribbonorange','obsidian','cornflower','khaki','rainbow','red'],
  ultra:['rainbow','prism','amber','iron','grey','carmine','bronze','royalblue','emerald','night']
 };
 const topDeck=crown=>e.roster.filter(t=>allowed(t,crown)).sort((a,b)=>val(b)-val(a)).slice(0,10);
 // ---- 장 목록
 const sets=[];
 const rng=(a,b)=>Array.from({length:b-a+1},(_,k)=>a+k);
 const mains=[['W1','세계편 1장',0,47],['W2','세계편 2장',48,95],['W3','세계편 3장',96,143],['F1','미래편 1장',159,206],['F2','미래편 2장',353,400],['F3','미래편 3장',459,506],['C1','우주편 1장',507,554]];
 for(const [key,label,a,b] of mains)sets.push({key,label,crown:1,idx:rng(a,b)});
 e.legendSubs.forEach((sc,n)=>{
  const idx=rng(sc.start,sc.start+sc.len-1).map(k=>e.legendIdx(k));
  for(const c of [1,2,3,4])sets.push({key:`L${n+1}-${c}`,label:`레전드 ${n+1}장 ${sc.name} ★${c}`,crown:c,idx});
 });
 const todo=ONLY?sets.filter(s=>ONLY.includes(s.key)||ONLY.includes(s.key.split('-')[0])):sets;
 const enemyMax=i=>e.stageList[i].hp;
 const evalDeck=async(deck,set,idxList,level=30,adv=false)=>{
  const profile=adv?{level,trueFormsAll:true}:{level};
  const jobs=[];for(const i of idxList)for(const p of POLICIES)jobs.push({i,crown:set.crown,deck,seed:1,policy:p,profile});
  const res=await runJobs(jobs,{chunk:8});
  const per={};idxList.forEach(i=>per[i]={policies:{},progress:0,clear:false});
  jobs.forEach((j,k)=>{const r=res[k];if(r.error)throw Error(r.error);const o=per[j.i];o.policies[j.policy]={win:r.win,sec:r.seconds,ally:r.allyHp};const pr=r.win?1:1-r.enemyHp/enemyMax(j.i);if(pr>o.progress)o.progress=pr;if(r.win)o.clear=true});
  return per;
 };
 const summarize=per=>{const v=Object.values(per);return {cleared:v.filter(x=>x.clear).length,total:v.length,progress:v.reduce((a,x)=>a+x.progress,0)}};
 const out=[];
 const outFile=path.join(root,'docs/simulations/chapter-settings-2026-10-13.json');
 for(const set of todo){
  const t0=Date.now();
  const log=[];
  const runSearch=async(adv)=>{
  // 1) 기준 덱들
  const cand=[];
  const decks=set.crown===4?{four:seeds.four,top:topDeck(4)}:{base:seeds.base,core:seeds.core,ultra:seeds.ultra,top:topDeck(set.crown)};
  for(const [name,deck] of Object.entries(decks)){
   const d=deck.filter(t=>e.roster.includes(t)&&allowed(t,set.crown));
   const per=await evalDeck(d,set,set.idx,30,adv);
   cand.push({name,deck:d,per,sum:summarize(per)});
  }
  cand.sort((a,b)=>b.sum.cleared-a.sum.cleared||b.sum.progress-a.sum.progress);
  let best=cand[0];log.push(`${adv?'3진 ':''}seed ${best.name}: ${best.sum.cleared}/${best.sum.total}`);
  // 2) 국소 탐색
  for(let round=0;round<MAX_ROUNDS&&best.sum.cleared<best.sum.total;round++){
   const fails=set.idx.filter(i=>!best.per[i].clear);
   const slotOrder=best.deck.map((t,s)=>[s,val(t)]).sort((a,b)=>a[1]-b[1]).slice(0,3).map(x=>x[0]);
   const pool=e.roster.filter(t=>allowed(t,set.crown)&&!best.deck.includes(t));
   const variants=[];
   for(const s of slotOrder)for(const c of pool){const d=[...best.deck];d[s]=c;variants.push(d)}
   // 못 깬 스테이지에서만 먼저 걸러 상위 12개만 전체 장에서 다시 확인
   const jobs=[];for(const d of variants)for(const i of fails)for(const p of POLICIES)jobs.push({i,crown:set.crown,deck:d,seed:1,policy:p,profile:{level:30,trueFormsAll:adv}});
   const res=await runJobs(jobs,{chunk:32});
   const vs=variants.map(()=>({cleared:0,progress:0,perStage:{}}));
   const vi=new Map();variants.forEach((d,k)=>vi.set(d,k));
   let k=0;for(const d of variants){for(const i of fails){let ok=false,pr=0;for(const p of POLICIES){const r=res[k++];if(r.error)throw Error(r.error);if(r.win){ok=true;pr=1}else pr=Math.max(pr,1-r.enemyHp/enemyMax(i))}const v=vs[vi.get(d)];if(ok)v.cleared++;v.progress+=pr}}
   const ranked=variants.map((d,k)=>({d,...vs[k]})).sort((a,b)=>b.cleared-a.cleared||b.progress-a.progress).slice(0,12);
   let improved=false;
   for(const r of ranked){
    const per=await evalDeck(r.d,set,set.idx,30,adv);const sum=summarize(per);
    if(sum.cleared>best.sum.cleared||(sum.cleared===best.sum.cleared&&sum.progress>best.sum.progress+.05)){best={name:'search',deck:r.d,per,sum};improved=true;break}
   }
   log.push(`${adv?'3진 ':''}round ${round+1}: ${best.sum.cleared}/${best.sum.total}`);
   if(!improved)break;
  }
  return best;
  };
  let best=await runSearch(false),needs3=false;
  if(best.sum.cleared<best.sum.total){const b2=await runSearch(true);if(b2.sum.cleared>best.sum.cleared){best=b2;needs3=true}}
  // 3) 최소 레벨 (모든 스테이지가 그대로 깨지는 가장 낮은 레벨)
  let minLevel=null;
  if(best.sum.cleared===best.sum.total){
   for(const lv of [10,15,20,25,30]){const per=await evalDeck(best.deck,set,set.idx,lv,needs3);const s=summarize(per);if(s.cleared===s.total){minLevel=lv;break}}
  }
  // 방식 요약: 자동만으로 다 깨는지
  const autoAll=set.idx.every(i=>best.per[i].policies.auto?.win);
  const unclear=set.idx.filter(i=>!best.per[i].clear);
  const rec={key:set.key,label:set.label,crown:set.crown,stages:set.idx.length,cleared:best.sum.cleared,deck:best.deck,deckNames:best.deck.map(t=>e.names[t]),minLevel,autoAll,needs3,
   unclear:unclear.map(i=>({i,name:e.stageList[i].name,progress:+best.per[i].progress.toFixed(2)})),
   perStage:set.idx.map(i=>({i,name:e.stageList[i].name,policies:best.per[i].policies,clear:best.per[i].clear})),
   log,seconds:(Date.now()-t0)/1000|0};
  out.push(rec);
  console.log(`${set.key} ${set.label}: ${rec.cleared}/${rec.stages}${minLevel?` Lv${minLevel}`:''}${autoAll?' 자동':''}${needs3?' 3진':''} [${log.join(' → ')}] ${rec.seconds}s`);
  fs.writeFileSync(outFile,JSON.stringify(out));
 }
 console.log('done');process.exit(0);
})();
