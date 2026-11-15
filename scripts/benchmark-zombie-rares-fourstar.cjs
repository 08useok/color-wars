// Real four-star rules: every deck member must be EX or rare, <=10 slots.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),make=require('./full-harness.cjs'),{runJobs,close}=require('./sim-pool.cjs');
const root=path.resolve(__dirname,'..'),e=make({extraSetup:'globalThis.__fourstar={select:(i,c)=>{selectedStage=i;legendCrown=c;},allowed:allyStageAllowed};'}),check=globalThis.__fourstar;delete globalThis.__fourstar;
const maps=[590,595,607,613,848,887,911,922].map(i=>({i,name:e.stageList[i].name,hp:e.stageList[i].hp,multiplier:e.legendCrownMult(4,e.legendSubOf(e.stageList[i].legend.k))}));
const cores={second:{name:'2진 지원 덱',deck:['white','mintcyan','magenta','ribbonorange'],trueForms:[]},third:{name:'3진 포함 덱',deck:['white','mintcyan','garnet','selenite','magenta','indigo','ribbonorange'],trueForms:['magenta','indigo']}};
const variants={baseline:[],slate:['slate'],smoke:['smoke'],ash:['ash'],team:['slate','smoke','ash']},policies=['auto','smart2'],seeds=[1,2,3];
const hashes=()=>Object.fromEntries(['game.js',...make.DEFAULT_ADDONS].map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex')])),before=hashes();
for(const m of maps){check.select(m.i,4);for(const core of Object.values(cores))for(const extra of Object.values(variants)){
 const deck=[...core.deck,...extra];if(deck.length>10||deck.some(id=>!check.allowed(id)))throw Error('Illegal four-star deck: '+deck);
}}
const jobs=[],meta=[];
for(const m of maps)for(const [core,s]of Object.entries(cores))for(const [variant,extra]of Object.entries(variants))for(const seed of seeds)for(const policy of policies){jobs.push({i:m.i,crown:4,deck:[...s.deck,...extra],seed,policy,profile:{level:30,maxIncome:true,trueForms:s.trueForms,forms:{}}});meta.push({map:m.i,core,variant,seed,policy});}
const mean=a=>a.length?a.reduce((n,v)=>n+v,0)/a.length:null;
(async()=>{
 console.log('START four-star',jobs.length,'games / 8 maps / 2 legal cores / 5 variants / 3 seeds / 2 policies');
 const raw=await runJobs(jobs,{chunk:8,onProgress:(n,t)=>console.log('PROGRESS',n+'/'+t)});if(raw.some(r=>r.error))throw Error(JSON.stringify(raw.filter(r=>r.error).slice(0,3)));
 const best=new Map();raw.forEach((r,i)=>{const m=meta[i],st=maps.find(x=>x.i===m.map),hp=st.hp,score=r.win?2-Math.min(300,r.seconds)/300:Math.max(0,Math.min(1,1-r.enemyHp/hp)),v={...m,...r,score},key=[m.map,m.core,m.variant,m.seed].join('|');if(!best.has(key)||score>best.get(key).score)best.set(key,v);});
 const pairs=[];
 for(const m of maps)for(const core of Object.keys(cores))for(const variant of Object.keys(variants).filter(v=>v!=='baseline'))for(const seed of seeds){const b=best.get([m.i,core,'baseline',seed].join('|')),c=best.get([m.i,core,variant,seed].join('|'));pairs.push({map:m.i,core,variant,seed,baseline:b,candidate:c,gain:c.score-b.score,secondsSaved:b.win&&c.win?b.seconds-c.seconds:null});}
 const summary=ps=>({n:ps.length,baselineWins:ps.filter(p=>p.baseline.win).length,wins:ps.filter(p=>p.candidate.win).length,gainedWins:ps.filter(p=>!p.baseline.win&&p.candidate.win).length,lostWins:ps.filter(p=>p.baseline.win&&!p.candidate.win).length,secondsSaved:mean(ps.map(p=>p.secondsSaved).filter(v=>v!==null)),bothWin:ps.filter(p=>p.secondsSaved!==null).length,closeWins:ps.filter(p=>!p.baseline.win&&p.candidate.win&&p.candidate.seconds>=290).length});
 const summaries=Object.keys(cores).flatMap(core=>Object.keys(variants).filter(v=>v!=='baseline').map(variant=>({core,variant,...summary(pairs.filter(p=>p.core===core&&p.variant===variant))})));
 const after=hashes();if(JSON.stringify(before)!==JSON.stringify(after))throw Error('Combat files changed while measuring; no results saved');
 const output={date:'2026-11-15',method:{crown:4,level:30,maxIncome:true,treasures:'complete',limit:300,seeds,policies,cores,variants,totalGames:jobs.length,selection:'best auto/smart2 per seed; support add-slot comparison; legal EX/rare decks <=10 slots'},maps,summaries,pairs,raw:raw.map((r,i)=>({...meta[i],...r})),combatFiles:before};
 fs.writeFileSync(path.join(root,'docs/simulations/zombie-rares-fourstar-2026-11-15.json'),JSON.stringify(output,null,2)+'\n');
 const label={slate:'슬레이트',smoke:'스모크',ash:'애쉬',team:'3명 동시'},format=n=>n===null?'—':n.toFixed(1);
 const lines=['### ★4 좀비 맵 비교 (2026-11-15)','','EX·레어만 출격하는 실제 ★4 제한을 적용했다. 앞선 ★1 덱의 레드·옐로우·블루·퍼플·그레이는 사용하지 않았다. Lv.30·보물 완성·수입 만렙·300초 제한, 시드 3개 × auto/smart2 두 방식 중 나은 결과이며 총 '+jobs.length+'판이다. 각 덱·후보는 8맵 × 3시드 = 24조건이다.','','- 2진 지원 덱: 화이트·민트시안·마젠타·리본 오렌지. 전원 2진.','- 3진 포함 덱: 화이트·민트시안·가넷·셀레나이트·마젠타·인디고·리본 오렌지. 마젠타·인디고만 3진이며 다른 아군·후보는 2진.','- 후보 1명 또는 신규 3명을 추가한다. 최대 10칸이며 모든 아군의 EX·레어 출격 가능 여부를 검사했다.','','| 기준 덱 | 추가 편성 | 기준 승리 | 추가 후 승리 | 새 승리 / 승리 상실 | 양쪽 승리 평균 단축 |','| --- | --- | --- | --- | --- | --- |',...summaries.map(s=>'| '+cores[s.core].name+' | '+label[s.variant]+' | '+s.baselineWins+'/24 | '+s.wins+'/24 | '+s.gainedWins+' / '+s.lostWins+' | '+format(s.secondsSaved)+'초 ('+s.bothWin+'조건) |'),''];
 for(const core of Object.keys(cores)){
  lines.push('**'+cores[core].name+' 맵별 승리**','','| 맵 | 기준 | 슬레이트 | 스모크 | 애쉬 | 3명 동시 |','| --- | --- | --- | --- | --- | --- |');
  for(const m of maps){const rows=Object.keys(variants).filter(v=>v!=='baseline').map(v=>summary(pairs.filter(p=>p.core===core&&p.variant===v&&p.map===m.i)));lines.push('| '+m.name+' | '+rows[0].baselineWins+'/3 | '+rows.map(r=>r.wins+'/3').join(' | ')+' |');}lines.push('');
 }
 lines.push('기준 덱 구성이 달라 ★1 수치와 직접 비교하지 않는다. 슬롯 추가 시험이므로 완성 덱의 교체 성능을 의미하지 않는다. 좀비 킬러·영혼 공격은 세 명 모두 없고, 밀치기 무효·잠복·적 성 뒤 밀치기 규칙도 그대로다. 시드 3개의 간이 비교이며 새 승리 중 290초 이후에 끝난 조건은 안정적인 공략으로 단정하지 않는다. 별도 대포 변경이나 능력치·가격 조정은 하지 않았다.','','[★4 원자료](../simulations/zombie-rares-fourstar-2026-11-15.json).','');
 const dir=path.join(root,'work/zombie-rares-fourstar');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'report.md'),lines.join('\n'));
 console.log('DONE',JSON.stringify(summaries));close();process.exit(0);
})().catch(err=>{console.error(err.stack);close();process.exit(1);});
