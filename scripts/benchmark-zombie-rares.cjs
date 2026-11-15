// Paired support benchmark on real stages; no stat/spawn modifications.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),make=require('./full-harness.cjs'),{runJobs,close}=require('./sim-pool.cjs');
const root=path.resolve(__dirname,'..'),e=make();
const hashCombat=()=>Object.fromEntries(['game.js',...make.DEFAULT_ADDONS].map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex')]));
const combatAtStart=hashCombat();
const maps=[590,595,607,613,848,887,911,922,498,433].map(i=>({i,name:e.stageList[i].name,hp:e.stageList[i].hp,zombie:i!==498&&i!==433}));
const cores={basic:['red','yellow','blue','purple'],killer:['red','yellow','grey']};
const variants={baseline:[],slate:['slate'],smoke:['smoke'],ash:['ash'],team:['slate','smoke','ash']};
const policies=['auto','smart2'],seeds=[1,2,3],jobs=[],meta=[];
for(const m of maps)for(const [core,deck]of Object.entries(cores))for(const [variant,extra]of Object.entries(variants))for(const seed of seeds)for(const policy of policies){
 jobs.push({i:m.i,crown:1,deck:[...deck,...extra],seed,policy,profile:{level:30,maxIncome:true,trueForms:[],forms:{}}});
 meta.push({map:m.i,core,variant,seed,policy});
}
const score=(r,m)=>r.win?2-Math.min(300,r.seconds)/300:Math.max(0,Math.min(1,1-r.enemyHp/m.hp));
const mean=a=>a.length?a.reduce((n,x)=>n+x,0)/a.length:null;
(async()=>{
 console.log('START',new Date().toISOString(),jobs.length,'games / 10 maps / 2 cores / 5 variants / 3 seeds / 2 policies');
 const raw=await runJobs(jobs,{chunk:8,onProgress:(n,total)=>console.log('PROGRESS',n+'/'+total)});
 const errors=raw.flatMap((r,i)=>r.error?[{meta:meta[i],error:r.error}]:[]);if(errors.length)throw Error(JSON.stringify(errors.slice(0,5)));
 const best=new Map(),byMode=new Map();
 raw.forEach((r,i)=>{
  const x=meta[i],m=maps.find(m=>m.i===x.map),v={...x,...r,score:score(r,m)},key=[x.map,x.core,x.variant,x.seed].join('|');
  byMode.set(key+'|'+x.policy,v);if(!best.has(key)||v.score>best.get(key).score)best.set(key,v);
 });
 const pairs=[];
 for(const m of maps)for(const core of Object.keys(cores))for(const variant of Object.keys(variants).filter(k=>k!=='baseline'))for(const seed of seeds){
  const key=[m.i,core,variant,seed].join('|'),bkey=[m.i,core,'baseline',seed].join('|'),r=best.get(key),b=best.get(bkey);
  const deltas=Object.fromEntries(policies.map(p=>[p,byMode.get(key+'|'+p).score-byMode.get(bkey+'|'+p).score]));
  pairs.push({map:m.i,core,variant,seed,baseline:b,candidate:r,gain:r.score-b.score,secondsSaved:b.win&&r.win?b.seconds-r.seconds:null,deltas,policyFlip:deltas.auto*deltas.smart2<0&&Math.abs(deltas.auto)>1e-4&&Math.abs(deltas.smart2)>1e-4});
 }
 const summarize=ps=>({n:ps.length,baselineWins:ps.filter(p=>p.baseline.win).length,wins:ps.filter(p=>p.candidate.win).length,gainedWins:ps.filter(p=>!p.baseline.win&&p.candidate.win).length,lostWins:ps.filter(p=>p.baseline.win&&!p.candidate.win).length,meanGain:mean(ps.map(p=>p.gain)),secondsSaved:mean(ps.map(p=>p.secondsSaved).filter(x=>x!==null)),bothWin:ps.filter(p=>p.secondsSaved!==null).length,policyFlips:ps.filter(p=>p.policyFlip).length});
 const summaries=Object.keys(variants).filter(k=>k!=='baseline').map(variant=>({variant,all:summarize(pairs.filter(p=>p.variant===variant)),zombie:summarize(pairs.filter(p=>p.variant===variant&&maps.find(m=>m.i===p.map).zombie)),control:summarize(pairs.filter(p=>p.variant===variant&&!maps.find(m=>m.i===p.map).zombie)),perMap:maps.map(m=>({i:m.i,name:m.name,...summarize(pairs.filter(p=>p.variant===variant&&p.map===m.i))}))}));
 const combatAtEnd=hashCombat();if(JSON.stringify(combatAtStart)!==JSON.stringify(combatAtEnd))throw Error('Combat files changed during the benchmark; results were not saved.');
 const output={date:'2026-11-15',method:{description:'Real stages, paired add-slot support comparison; best of auto/smart2 per seed, first/second forms only; 300s limit, losses use enemy castle progress. Not comparable to historic tier scores.',level:30,forms:2,maxIncome:true,treasures:'complete',seeds,policies,cores,variants,totalGames:jobs.length},combatFilesAtStart:combatAtStart,combatFilesAtReportTime:combatAtEnd,maps,summaries,pairs,raw:raw.map((r,i)=>({...meta[i],...r}))};
 fs.writeFileSync(path.join(root,'docs/simulations/zombie-rares-benchmark-2026-11-15.json'),JSON.stringify(output,null,2)+'\n');
 const label={slate:'슬레이트',smoke:'스모크',ash:'애쉬',team:'3명 동시'},f=n=>n===null?'—':n.toFixed(1);
 const lines=['### 좀비 레어 실전 비교 (2026-11-15)','','기존 실전 맵 10곳(좀비 8·다른 속성 2), ★1·Lv.30·2진·보물 완성·수입 만렙. 기준 덱은 레드·옐로우·블루·퍼플과 레드·옐로우·그레이 두 종류다. 후보 한 명 또는 세 명을 추가하고 시드 3개 × 출격 방식 2개로 총 '+jobs.length+'판을 쟀다. 표는 같은 시드마다 auto/smart2 중 성능이 나은 결과를 사용하므로 각 행은 좀비 맵 48조건이다.','','| 추가 편성 | 기준 덱 승리 | 추가 후 승리 | 새 승리 / 승리 상실 | 양쪽 승리 시 평균 단축 | 출격 방식별 이득 부호 반전 |','| --- | --- | --- | --- | --- | --- |',...summaries.map(s=>{const a=s.zombie;return '| '+label[s.variant]+' | '+a.baselineWins+'/'+a.n+' | '+a.wins+'/'+a.n+' | '+a.gainedWins+' / '+a.lostWins+' | '+f(a.secondsSaved)+'초 ('+a.bothWin+'조건) | '+a.policyFlips+'조건 |';}),'','| 맵 | 기준 덱 | 슬레이트 | 스모크 | 애쉬 | 3명 동시 |','| --- | --- | --- | --- | --- | --- |',...maps.map(m=>{const ms=summaries.map(s=>s.perMap.find(p=>p.i===m.i));return '| '+m.name+(m.zombie?'':' (대조군)')+' | '+ms[0].baselineWins+'/6 | '+ms.map(p=>p.wins+'/6').join(' | ')+' |';}),'','승리=2−시간/300, 패배=적 성 진행도로 평가했다. 속성 맵 위협 비율을 맞춰 설계한 시험이 아니라 실제 스테이지 표본이며, 기준 덱 3~4칸에 후보를 추가하는 방식이라 완성 덱 10칸의 교체 성능과는 다르다. 3명 동시는 슬롯·비용을 더 쓰므로 개별 캐릭터의 우열로 해석하지 않는다. 승리 시간이 양수면 빨라지고 음수면 느려진 것이다. 적 성 뒤 밀치기 규칙과 불살의 낚시터 출현 규칙은 변경하지 않았다.','','[상세 원자료](../simulations/zombie-rares-benchmark-2026-11-15.json). 기존 티어표와 다른 표본·방식이므로 이 결과로 옛 티어 등급을 붙이지 않는다.',''];
 const dir=path.join(root,'work/zombie-rares-benchmark');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'report.md'),lines.join('\n'));
 console.log('DONE',JSON.stringify(summaries.map(({variant,zombie,control})=>({variant,zombie,control}))));
 close();process.exit(0);
})().catch(err=>{console.error(err.stack);close();process.exit(1);});
