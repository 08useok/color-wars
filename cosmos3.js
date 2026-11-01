// 우주편 3장(chapter 10) 등록 (8.0). 스테이지 48개와 출현표를 스테이지 목록 맨 끝에 붙인다(저장된 클리어 번호가 밀리지 않도록
// 다른 모든 스테이지 뒤: tier-test-stages.js보다 나중에 불러온다). 데이터는 cosmos3-data.js(scripts/build-cosmos3.cjs).
// game.js·gacha.js·catfruit.js는 chapter 9까지만 알고 있으므로, 여기서 해당 함수를 감싸 chapter 10을 더한다:
// 잠금(2장 빅뱅 다음), 탭, 별 에이리언 배율·억제기(과자 행성·빅뱅), 결과 문구, 위키 분류, 뽑기·개다래 보상, 우주편 보물 3/3.
let COSMOS3_START=1e9,COSMOS3_END=1e9;const ALIEN_SUPPRESSORS6=[];
(function(){
 if(typeof COSMOS3_DATA==='undefined')return;
 COSMOS3_START=STAGES.length;
 COSMOS3_DATA.forEach((t,k)=>{
  STAGES.push({name:t.name,flag:t.flag,hp:t.hp,gap:4,wave:0,...COSMOS_BG[t.bg],desc:t.desc,chapter:10,future:true,maxEnemies:t.max,xp:t.xp*FUTURE_XP_SCALE});
  STAGE_SPAWNS[COSMOS3_START+k]=t.rules;
 });
 COSMOS3_END=STAGES.length;
 ALIEN_SUPPRESSORS6.push(COSMOS3_START+23,COSMOS3_END-1);
 // game.js는 저장된 클리어 번호를 3장 범위를 모를 때 읽어 걸러낸다(우주편 2장과 같은 문제). 범위가 정해진 뒤 3장 번호만 다시 합친다.
 try{const saved=JSON.parse(localStorage.getItem('red-battle-progress-v1')||'[]');if(Array.isArray(saved))for(const x of saved)if(Number.isInteger(x)&&x>=COSMOS3_START&&x<COSMOS3_END&&!cleared.includes(x))cleared.push(x)}catch{}
})();
function inCosmos3(i){return i>=COSMOS3_START&&i<COSMOS3_END}
{
 const storyBefore=isStoryStage,chainBefore=isChainEnd,unlockBefore=isUnlocked,tagBefore=chapterTag,codexBefore=codexCatOf;
 isStoryStage=function(i){return inCosmos3(i)||storyBefore(i)};
 isChainEnd=function(i){return i===COSMOS3_END-1||chainBefore(i)};
 isUnlocked=function(i){return i===COSMOS3_START?cleared.includes(COSMOS2_END-1)||cleared.includes(i):unlockBefore(i)};
 chapterTag=function(i){return STAGES[i]?.chapter===10?' (우주편 3장)':tagBefore(i)};
 codexCatOf=function(i){return chapterOf(i)===10?'c3':codexBefore(i)};
 if(!CODEX_STAGE_CATS.some(c=>c[0]==='c3'))CODEX_STAGE_CATS.splice(CODEX_STAGE_CATS.findIndex(c=>c[0]==='special'),0,['c3','우주편 3장']);
 // 별 에이리언: 1·2장처럼 1600%에서 3장 억제기만큼 내려가고, 빅뱅을 깨면 억제기 5개분이 한꺼번에 완성된다.
 const supOfBefore=alienSuppressorsOf,supBefore=alienSuppressed,magBefore=alienMagnification;
 alienSuppressorsOf=function(ch){return ch===10?ALIEN_SUPPRESSORS6:supOfBefore(ch)};
 alienSuppressed=function(ch=chapterOf(selectedStage)){if(ch!==10)return supBefore(ch);const l=ALIEN_SUPPRESSORS6;return cleared.includes(l[l.length-1])?5:l.filter(i=>cleared.includes(i)).length};
 alienMagnification=function(ch,starred){
  const c=ch===undefined?chapterOf(selectedStage):ch;
  if(c!==10)return magBefore.apply(this,arguments);
  return (starred??true)?Math.max(1,16-alienSuppressed(10)):magBefore(10,false);
 };
 // 저장: 3장 등록(=저장 복원)이 끝나기 전에는 진행도를 덮어쓰지 않는다.
 const saveBefore=saveProgress;
 saveProgress=function(){if(COSMOS3_START>=1e9||COSMOS3_END<=COSMOS3_START)return;return saveBefore.apply(this,arguments)};
 // 우주편 보물: 1·2·3장 빅뱅 = 보물 1/3·2/3·3/3 (사용자 10-31)
 cosmosTreasureFinals=function(){return [COSMOS_END-1,COSMOS2_END-1,COSMOS3_END-1]};
}
if(typeof gachaStageReward==='function'){const before=gachaStageReward;gachaStageReward=function(i){return i===COSMOS3_END-1?{t1:0,t10:1}:before(i)}}
if(typeof CATFRUIT_FUTURE==='object')CATFRUIT_FUTURE[10]={seed:.55,fruit:.4};
{
 const finishBefore=finish;
 finish=function(win){
  const fresh=!game.ended,idx=selectedStage,was=cleared.includes(idx);
  const r=finishBefore.apply(this,arguments);
  if(fresh&&win){
   const d=$('#resultDetail');
   if(idx===COSMOS2_END-1&&d&&!d.textContent.includes('우주편 3장'))d.textContent=d.textContent.replace('우주편 2장을 모두 정복했어요!','우주편 2장을 모두 정복했어요! 우주편 3장이 열렸어요!');
   if(idx===COSMOS3_END-1&&d){const next=(STAGES[idx+1]||{}).name+' 스테이지가 열렸어요!';d.textContent=d.textContent.replace(next,'우주편 3장을 모두 정복했어요!')}
   if(idx===COSMOS3_END-1&&!was&&typeof addCatfruit==='function'){addCatfruit('epic',null,1);if(typeof gachaAppendDetail==='function')gachaAppendDetail(catfruitText('epic',null,1)+' 획득!')}
  }
  return r;
 };
}
{
 const menuBefore=renderStageMenu;
 renderStageMenu=function(){
  const r=menuBefore.apply(this,arguments);
  $('#cosmos3Tab')?.classList.toggle('active',stageChapterView===10);
  if(stageChapterView===10){
   const view=STAGES.map((s,i)=>i).filter(i=>chapterOf(i)===10);
   $('#chapterNote').textContent=`지구 ~ 빅뱅 · 원작 우주편 3장 · 별 에이리언 배율 ${alienMagnification(10)*100}% (우주편 3장 억제기 ${alienSuppressed(10)}/${ALIEN_SUPPRESSORS6.length}: 과자 행성·빅뱅) · 신규 적 미니스타 사이클론·붕장어 5형제·루퍼좀씨 · 최종 보스 파이널 기가 그랜드 신`+(cleared.includes(COSMOS2_END-1)?'':' · 우주편 2장 빅뱅을 클리어하면 열립니다');
   $('#progressText').textContent=`${view.filter(i=>cleared.includes(i)).length} / ${view.length} 스테이지 클리어 · 우주편 3장`;
  }
  return r;
 };
 if($('#cosmos3Tab'))$('#cosmos3Tab').onclick=()=>{stageChapterView=10;renderStageView()};
}
