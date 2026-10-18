// 냥코 대포 (v6.2.0): 아군 성에서 쏘는 광역 공격. 해금 없이 처음부터 쓸 수 있다.
// 전투가 시작되면 0에서 충전되고, 가득 차면 버튼(또는 야옹컴 자동 출격)으로 발사한다.
// 맞은 적은 정해진 피해(스테이지 배율과 무관)를 받고 뒤로 밀려난다. 기지 강화에서 위력·충전 속도를 올린다.
const CANNON={
 maxLevel:10,
 chargeBase:30,chargeStep:2,// 충전 시간(초): Lv.1 30초 → Lv.10 12초
 powerBase:6000,powerStep:3000,// 피해: Lv.1 6,000 → Lv.10 33,000
 reach:55,// 아군 성 앞에서 이만큼(필드 %)까지 닿는다
 push:16,// 맞은 적이 밀려나는 거리
 beamSpeed:140,// 파동이 퍼지는 속도(필드 %/초)
 upgradeCost:[1000,2000,4000,8000,16000,32000,43000,58000,78000]// XP, Lv.1→2 … Lv.9→10
};
function cannonPower(l=training.cannonPower){return CANNON.powerBase+CANNON.powerStep*(l-1)+CHAPTER_BONUS.cannonPower*(chapterBonusCount()+futureTreasureCount())}
function cannonChargeTime(l=training.cannonCharge){return Math.max(1,CANNON.chargeBase-CANNON.chargeStep*(l-1)-CHAPTER_BONUS.cannonCharge*chapterBonusCount()-10*futureTreasureCount())}
for(const k of ['cannonPower','cannonCharge']){
 const v=SUBSPECIES_SAVED_TRAINING?.[k];// 저장된 강화 단계 복원 (game.js가 모르는 키라 따로 읽는다)
 training[k]=Number.isInteger(v)?Math.max(1,Math.min(CANNON.maxLevel,v)):1;
}
function cannonState(){if(game.cannonCharge===undefined){game.cannonCharge=0;game.cannonWaves=[]}}
function cannonReady(){cannonState();return game.cannonCharge>=cannonChargeTime()}
function cannonUsable(){return !!game.running&&!game.ended&&!game.paused&&!game.assetsLoading&&game.tutorial>=6}
function fireCannon(){
 if(!cannonUsable()||!cannonReady())return false;
 game.cannonCharge=0;
 const el=document.createElement('span');el.className='cannon-beam';unitsEl.append(el);
 const x=data.bases.ally.frontX;el.style.left=x+'%';
 game.cannonWaves.push({x,end:Math.max(0,x-CANNON.reach),el,hit:new Set(),power:cannonPower()});
 $('#battleNotice').textContent='냥코 대포 발사!';game.noticeTime=1.2;
 return true;
}
function updateCannon(dt){
 cannonState();
 if(cannonUsable())game.cannonCharge=Math.min(cannonChargeTime(),game.cannonCharge+dt);
 for(const w of [...game.cannonWaves]){
  w.x-=CANNON.beamSpeed*dt;w.el.style.left=Math.max(w.end,w.x)+'%';
  for(const v of [...game.units]){
   if(game.ended)return;
   if(v.ally||v.hp<=0||v.emerging||w.hit.has(v)||v.x<w.x)continue;
   w.hit.add(v);
   damage(v,w.power);
   if(v.hp>0&&!(v.kbTime>0)&&!(v.stats?.knockbackImmune||data.units[v.type].knockbackImmune))startHitback(v,CANNON.push,'push');
  }
  if(w.x<=w.end){w.el.remove();game.cannonWaves.splice(game.cannonWaves.indexOf(w),1)}
 }
}
// 야옹컴/자동 모드: 충전되면 성 가까이 적이 몰렸을 때 대포를 쏜다.
function cannonAuto(){
 if(!cannonUsable()||!cannonReady())return;
 const front=data.bases.ally.frontX,inReach=game.units.filter(v=>!v.ally&&v.hp>0&&!v.emerging&&v.x>=front-CANNON.reach);
 if(inReach.length&&(inReach.length>=3||inReach.some(v=>v.x>=front-30)))fireCannon();
}
const _cannonUpdate=update;
update=function(dt){_cannonUpdate.apply(this,arguments);if(!game.ended)updateCannon(dt)};
const _cannonAutoDeploy=autoDeploy;
autoDeploy=function(){cannonAuto();return _cannonAutoDeploy.apply(this,arguments)};
// 버튼 (아래쪽 출격 줄 맨 앞)
const cannonBtn=document.createElement('button');
cannonBtn.id='cannonBtn';cannonBtn.className='upgrade-btn cannon-btn';
cannonBtn.innerHTML='냥코 대포<br><small></small>';
cannonBtn.onclick=()=>{fireCannon();renderCannonButton()};
$('.controls').prepend(cannonBtn);
function renderCannonButton(){
 cannonState();
 const need=cannonChargeTime(),p=Math.min(1,game.cannonCharge/need),ready=p>=1,b=$('#cannonBtn');
 if(!b)return;
 b.disabled=!cannonUsable()||!ready;
 b.querySelector('small').textContent=ready?'발사!':`충전 ${Math.floor(p*100)}%`;
 b.style.background=`linear-gradient(to top,${ready?'#ffbf00':'#8a6a1d'} ${p*100}%,#2a3350 ${p*100}%)`;
 b.title=`냥코 대포 Lv.${training.cannonPower}: 범위 안의 모든 적에게 ${cannonPower().toLocaleString()} 피해 + 넉백 · 충전 ${need}초 (충전 Lv.${training.cannonCharge})`;
}
const _cannonRender=render;
render=function(){_cannonRender.apply(this,arguments);renderCannonButton()};
{
 const s=document.createElement('style');
 s.textContent='.cannon-btn{min-width:84px;color:#fff;border:2px solid #ffbf00;transition:none}.cannon-btn:disabled{opacity:.85}.cannon-btn small{display:block;color:#ffe46b}.cannon-beam{position:absolute;bottom:15%;width:16px;height:96px;z-index:7;pointer-events:none;translate:-50% 0;border-radius:50%;background:radial-gradient(ellipse at center,#fffbe0 0 25%,#ffbf00 55%,rgba(255,191,0,0) 75%);filter:drop-shadow(0 0 10px #ffbf00)}';
 document.head.append(s);
}
// 기지 강화 화면: 대포 위력·충전 카드
const _cannonBaseUpgrade=renderBaseUpgrade;
renderBaseUpgrade=function(){
 _cannonBaseUpgrade.apply(this,arguments);
 const grid=$('#baseGrid');if(!grid)return;
 for(const [k,title,desc,fmt] of [['cannonPower','대포 위력','냥코 대포가 주는 피해',l=>cannonPower(l).toLocaleString()],['cannonCharge','대포 충전','발사 뒤 다시 충전되는 시간',l=>cannonChargeTime(l)+'초']]){
  const lv=training[k],max=CANNON.maxLevel,cost=CANNON.upgradeCost[lv-1],c=document.createElement('article');
  c.className='training-card';
  c.innerHTML=`<h3>${title} <small>Lv.${lv} / ${max}</small></h3><p>${desc}<br>${fmt(lv)}${lv<max?' → '+fmt(lv+1):''}</p>`;
  const b=document.createElement('button');
  b.textContent=lv>=max?'최대 레벨':cost.toLocaleString()+' XP · 강화';
  b.disabled=lv>=max||training.xp<cost;
  b.onclick=()=>{if(training[k]>=max||training.xp<cost)return;training.xp-=cost;training[k]++;saveTraining();renderBaseUpgrade();renderTraining()};
  c.append(b);grid.append(c);
 }
};
renderBaseUpgrade();renderCannonButton();
