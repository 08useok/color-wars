// Cannon selection is independent of progression and existing upgrade save keys.
const CANNON_LOADOUT_KEY='red-battle-cannon-loadout-v1';
const CANNON_LOADOUTS={basic:{name:'냥코 대포'},thunder:{name:'천둥포'},slow:{name:'슬로우포'},breaker:{name:'캐논 브레이크포'},holy:{name:'천사포'}};
let equippedCannon='basic';
try{const saved=localStorage.getItem(CANNON_LOADOUT_KEY);if(CANNON_LOADOUTS[saved])equippedCannon=saved;}catch{}
function cannonSwapAllowed(){return !(game.running&&!game.ended)&&!game.assetsLoading;}
function equipCannon(id){
 if(!CANNON_LOADOUTS[id]||!cannonSwapAllowed())return false;
 if(id===equippedCannon)return true;
 equippedCannon=id;
 try{localStorage.setItem(CANNON_LOADOUT_KEY,id);}catch{}
 cannonState();game.cannonCharge=0;
 for(const wave of game.cannonWaves)wave.el?.remove();game.cannonWaves=[];
 if(typeof clearCannonEffects==='function')clearCannonEffects();
 renderBaseUpgrade();renderCannonButton();
 if(typeof prepareBattleImages==='function')prepareBattleImages();
 return true;
}
{const before=cannonChargeTime;cannonChargeTime=function(...args){const sec=before(...args);return equippedCannon==='basic'?sec:Math.max(10,sec+10);};}
{const before=fireCannon;fireCannon=function(){
 if(equippedCannon==='basic')return before.apply(this,arguments);
 if(!cannonUsable()||!cannonReady())return false;
 game.cannonCharge=0;
 for(const v of [...game.units]){
  if(v.ally||v.hp<=0||v.emerging)continue;
  if(equippedCannon==='thunder'){
   if(v.stats?.immune?.freeze)continue;
   v.freezeUntil=Math.max(v.freezeUntil||0,game.elapsed+2);
  }else if(equippedCannon==='slow'){
   if(v.stats?.immune?.slow)continue;
   v.slowUntil=Math.max(v.slowUntil||0,game.elapsed+4);
  }else if(equippedCannon==='breaker'){
   if(!v.stats?.barrier||v.barrierBroken)continue;
   v.barrierBroken=true;v.el.classList.remove('barrier-on');
  }else if(equippedCannon==='holy'){
   if(!hasTrait(v.stats||data.units[v.type],'zombie'))continue;
   damage(v,cannonPower(),{type:'red',ally:true,x:data.bases.ally.frontX,hp:1,max:1,stats:{zombieKiller:true}});
  }
 }
 $('#battleNotice').textContent=CANNON_LOADOUTS[equippedCannon].name+' 발사!';game.noticeTime=1.2;
 renderCannonButton();return true;
};}
function cannonLoadoutDescription(){
 const power=cannonPower().toLocaleString(),descriptions={
  basic:'범위 안의 적에게 '+power+' 피해를 주고 밀어냅니다.',
  thunder:'필드에 나온 적을 피해·밀치기 없이 2초 정지시킵니다. 정지 무효 제외.',
  slow:'필드에 나온 적을 피해·밀치기 없이 4초 느리게 합니다. 느리게 무효 제외.',
  breaker:'필드에 나온 적의 베리어를 확정 파괴합니다. 피해·밀치기는 없으며 실드는 대상이 아닙니다.',
  holy:'필드에 나온 좀비에게 '+power+' 피해를 줍니다. 직접 처치하면 좀비 킬러로 부활을 막습니다. 다른 속성에는 피해가 없습니다.'
 };
 return descriptions[equippedCannon]+' 충전 '+cannonChargeTime()+'초.'+(equippedCannon==='basic'?'':' 땅속·부활 대기 중인 적은 제외됩니다.')+(['basic','holy'].includes(equippedCannon)?'':' 위력 강화는 피해 대포에만 적용됩니다.');
}
{const before=renderBaseUpgrade;renderBaseUpgrade=function(){
 before.apply(this,arguments);
 const grid=$('#baseGrid');if(!grid)return;
 const card=document.createElement('article');card.className='training-card';card.id='cannonLoadoutCard';
 const title=document.createElement('h3');title.textContent='대포 갈아끼우기';card.append(title);
 const label=document.createElement('label');label.textContent='사용할 대포 ';
 const select=document.createElement('select');select.id='cannonLoadoutSelect';select.setAttribute('aria-label','사용할 대포');
 for(const [id,s]of Object.entries(CANNON_LOADOUTS)){const option=document.createElement('option');option.value=id;option.textContent=s.name;select.append(option);}
 select.value=equippedCannon;select.disabled=!cannonSwapAllowed();
 select.onchange=()=>{if(!equipCannon(select.value))select.value=equippedCannon;};label.append(select);card.append(label);
 const description=document.createElement('p');description.id='cannonLoadoutDescription';description.textContent=cannonLoadoutDescription();card.append(description);
 const note=document.createElement('small');note.id='cannonLoadoutNote';note.textContent='전투를 시작하기 전에 선택하세요. 교체하면 충전이 초기화됩니다.';card.append(note);
 grid.prepend(card);
};}
{const before=renderCannonButton;renderCannonButton=function(){
 before.apply(this,arguments);const b=$('#cannonBtn');
 if(b?.firstChild)b.firstChild.nodeValue=CANNON_LOADOUTS[equippedCannon].name;
 if(b)b.title=CANNON_LOADOUTS[equippedCannon].name+': '+cannonLoadoutDescription();
 if(b)b.dataset.cannon=equippedCannon;
 const select=document.querySelector('#cannonLoadoutSelect');if(select){select.disabled=!cannonSwapAllowed();select.value=equippedCannon;}
 const note=document.querySelector('#cannonLoadoutNote');if(note){const text=cannonSwapAllowed()?'전투를 시작하기 전에 선택하세요. 교체하면 충전이 초기화됩니다.':'전투 중에는 대포를 바꿀 수 없습니다. 일시정지 중에도 교체할 수 없습니다.';if(note.textContent!==text)note.textContent=text;}
};}
{const style=document.createElement('style');style.textContent='.cannon-btn[data-cannon="thunder"]{border-color:#87d8ff}.cannon-thunder-flash{position:absolute;left:50%;bottom:0;width:10px;height:150px;pointer-events:none;background:linear-gradient(90deg,transparent,#fff,#8cdeff,transparent);filter:drop-shadow(0 0 8px #67cfff);z-index:8}#cannonLoadoutSelect{font:inherit;padding:8px;max-width:100%;border-radius:8px}';document.head.append(style);}
renderBaseUpgrade();renderCannonButton();
