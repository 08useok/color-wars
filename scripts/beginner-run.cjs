// 새 계정(fresh)으로 세계편 1장(0~47)을 순서대로 깨 보는 초보자 모델. 어디서 막히는지, 왜 막히는지를 기록한다.
// 사용: MODEL=chars|econ|none DECK=all|red NOINCOME=1 SEEDS=3 node scripts/beginner-run.cjs   → docs/simulations/beginner-run-<MODEL>-2026-10-21.json
// 사람 모델(근사): 해금된 아군을 덱(최대 10)에 전부 넣고, 출격은 위기 때 싼 유닛부터(smart2)·아니면 비싼 것부터(smart)로 시도한다.
//   (야옹컴 'auto'는 처음엔 없는 아이템이라 쓰지 않는다.) 시도 = 시드 1..SEEDS × 두 방식. 하나라도 이기면 클리어.
//   XP 사용: none = 전혀 안 씀(레벨 1 그대로) / chars = 덱 안 캐릭터를 가장 낮은 레벨부터 올림 / econ = 돈 생산력·지갑을 먼저 2레벨씩 올린 뒤 캐릭터.
//   막히면(모든 시도 패배) 이미 깬 스테이지를 반복해(반복 보상은 절반) XP를 모아 레벨업 후 다시 도전한다(최대 MAXGRIND회).
const fs=require('fs'),path=require('path');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const MODEL=process.env.MODEL||'chars',SEEDS=+(process.env.SEEDS||3),MAXGRIND=+(process.env.MAXGRIND||60),LAST=+(process.env.LAST||47);
const NOINCOME=process.env.NOINCOME==='1';// 전투 중 '수입 업그레이드'를 한 번도 안 누르는 초보자
const extra=(NOINCOME?`const __ad=autoDeploy;autoDeploy=function(){const l=data.income[game.level],c=l.cost;l.cost=null;try{return __ad.apply(this,arguments)}finally{l.cost=c}};`:'')+`globalThis.__beg={awardXP,upgradeCharacter,upgradeEcon,upgradeBase,cleared,training,allyUnlocked,isUnlocked,STAGES,UNIT_NAMES,ECON_COST,upgradeCost,levelCapOf,baseHpCost,baseLevelCap,ALLIES,STAGE_SPAWNS,data,stageXP,studyXP,gradeOf,unitStats,unitCost,setDeck:d=>{deck=d},saveProgress,DECK_SIZE};`;
const e=mk({fresh:true,extraSetup:extra});const B=globalThis.__beg;
const name=t=>B.UNIT_NAMES[t]||t;
const log=[];const say=(...a)=>{log.push(a.join(' '))};
const unlocked=()=>B.ALLIES.filter(t=>B.allyUnlocked(t));
const DECKMODE=process.env.DECK||'all';// all = 해금된 아군을 전부 덱에 넣음 / red = 덱 세팅을 안 해서 레드만 씀(게임은 새로 해금된 아군을 덱에 자동으로 넣지 않는다)
const deckNow=()=>DECKMODE==='red'?['red']:unlocked().slice(0,B.DECK_SIZE);
function spend(){
 if(MODEL==='none')return;// XP를 전혀 쓰지 않는 초보자
 let spent=true;
 const econKeys=['prodLevel','walletLevel'];
 while(spent){spent=false;
  if(MODEL==='econ')for(const k of econKeys)if(B.training[k]<2&&B.upgradeEcon(k)){spent=true}
  // 캐릭터: 덱 안에서 가장 낮은 레벨, 같으면 싼 것
  const cand=deckNow().filter(t=>B.training.levels[t]<B.levelCapOf(t)&&B.training.xp>=B.upgradeCost(t)).sort((a,b)=>B.training.levels[a]-B.training.levels[b]||B.upgradeCost(a)-B.upgradeCost(b));
  if(cand.length){B.upgradeCharacter(cand[0]);spent=true}
 }
}
function attempt(i,deck){
 const res=[];
 for(let s=1;s<=SEEDS;s++)for(const pol of ['smart2','smart']){
  const r=e.simulate(i,1,deck,s,900,pol);
  res.push({s,pol,win:r.win,sec:r.seconds,allyHp:Math.round(r.allyHp),enemyHp:Math.round(r.enemyHp)});
  if(r.win)return {won:true,res,best:r};
 }
 return {won:false,res};
}
const rows=[];let grindTotal=0;
for(let i=0;i<=LAST;i++){
 if(!B.isUnlocked(i))break;
 spend();
 let deck=deckNow(),att=attempt(i,deck),grind=0,stuck=false,stuckInfo=null;
 if(!att.won){
  stuck=true;
  const stage=B.STAGES[i];const sp=(B.STAGE_SPAWNS[i]||[]);
  const comp={};for(const r of sp){comp[r.type]=(comp[r.type]||0)+(r.count||1)}
  stuckInfo={enemyHp:stage.hp,spawn:Object.entries(comp).map(([t,n])=>t+'×'+n).join(', '),tries:att.res.map(r=>r.pol+'#'+r.s+' '+(r.win?'승':'패')+' 적성 '+Math.round(r.enemyHp)+'/'+stage.hp+' 아군성 '+r.allyHp),levels:Object.fromEntries(deck.map(t=>[name(t),B.training.levels[t]])),xp:B.training.xp,base:B.training.baseLevel};
  // 반복해서 XP 모은 뒤 재도전
  while(!att.won&&grind<MAXGRIND){
   // 가장 어려운 이미 깬 스테이지 중 이길 수 있는 마지막 것을 반복(XP가 큰 쪽)
   const g=Math.max(0,i-1);
   const rr=e.simulate(g,1,deck,1+grind,900,'smart2');
   if(rr.win){B.cleared.includes(g)||B.cleared.push(g);const xp=B.awardXP();}
   grind++;grindTotal++;
   spend();deck=deckNow();
   if(grind%3===0)att=attempt(i,deck);
  }
  stuckInfo.grindRuns=grind;stuckInfo.afterLevels=Object.fromEntries(deck.map(t=>[name(t),B.training.levels[t]]));
 }
 const won=att.won;
 if(won){
  // 실제 게임처럼 finish 보상: awardXP는 selectedStage 기준이라 simulate 직후 호출
  const before=B.training.xp;B.awardXP();const gain=B.training.xp-before;
  if(!B.cleared.includes(i))B.cleared.push(i);
  const newUnits=unlocked().filter(t=>!deck.includes(t)).map(name);
  rows.push({i,name:B.STAGES[i].name,won:true,tries:att.res.length,sec:att.best.seconds,xpGain:gain,xp:B.training.xp,newUnits,stuck,grind,levels:Object.fromEntries(deckNow().map(t=>[name(t),B.training.levels[t]]))});
  say(String(i).padStart(2),B.STAGES[i].name.padEnd(8),'승',(att.best.seconds+'s').padStart(7),'시도',att.res.length,stuck?'막힘→반복 '+grind+'회':'','XP+'+gain,newUnits.length?'해금: '+newUnits.join(','):'');
 }else{
  rows.push({i,name:B.STAGES[i].name,won:false,stuck:true,grind,stuckInfo});
  say(String(i).padStart(2),B.STAGES[i].name.padEnd(8),'★ 막힘(반복 '+grind+'회 후에도 실패)');
  break;
 }
}
fs.writeFileSync(path.join(root,'docs/simulations/beginner-run-'+MODEL+(DECKMODE==='all'?'':'-'+DECKMODE+'deck')+(NOINCOME?'-noincome':'')+'-2026-10-21.json'),JSON.stringify({model:MODEL,seeds:SEEDS,rows,grindTotal},null,1));
console.log(log.join('\n'));console.log('총 반복 횟수',grindTotal);
process.exit(0);
