// 8.3 reward ally. Register after range balancing so approved range 150 stays 150.
const MARCH_YELLOW_SPEC={grade:'sr',name:'행진 옐로',evolved:'퍼레이드 리더 옐로',color:'#f3c52d',
 hp:18000,atk:1200,interval:.8,range:150*.034,cost:750,cooldown:11,
 role:'천사 맷집 · 빠른 근접 딜러',
 extra:{speed:12,flatCost:true,resistVs:['angel'],immune:{slow:true},knockbacks:3,windup:.3,attackDuration:.8,attackClass:'개체'},
 profile:'여성. 남성인 옐로의 독립 아종인 퍼레이드 기수. 커다란 깃발로 행진을 이끌고 작은 황금 깃발을 던진다. 천사에게 받는 피해를 줄이고 느리게 효과를 무시하며 빠르게 전선에 합류한다.'};
CYCLONE_ALLIES.marchyellow=MARCH_YELLOW_SPEC;
for(const f of [1,2])CYCLONE_ATLASES['marchyellow_'+f]=MARCH_YELLOW_ATLASES[f];
registerCycloneAlly('marchyellow',MARCH_YELLOW_SPEC);
// Lv.30, 2nd form, complete treasures: 18,000 HP / 1,200 damage.
LV20_TARGET.marchyellow={hp:18000/4.025,atk:1200/4.025};
data.units.marchyellow.hp=Math.round(LV20_TARGET.marchyellow.hp/28);
data.units.marchyellow.atk=Math.round(LV20_TARGET.marchyellow.atk/9);
NEW_ATLASES.marchyellow={...MARCH_YELLOW_ATLASES[1],evolved:{...MARCH_YELLOW_ATLASES[2]}};
PROFILE_ART.marchyellow=[1,2].map(f=>'assets/march-yellow-motion/marchyellow_'+f+'-profile.webp?v=1');
EVOLUTION_TEXT.marchyellow='체력·공격력 15% 증가 · 사거리·공격 간격·천사 맷집·느리게 무효 유지';
EVO_BODY_H.marchyellow=104;
{const before=unitStats;unitStats=function(id,...args){const s=before(id,...args);if(id==='marchyellow')s.range=150*.034;return s;};}
{const before=allyUnlocked;allyUnlocked=function(id){return id==='marchyellow'?gachaOwns(id):before(id);};}
{const before=specialItemText;specialItemText=function(item,n){return item==='marchyellow'?'슈퍼 레어 행진 옐로 획득!':before(item,n);};}
{
 const before=animateAtlas;
 animateAtlas=function(u){
  if(u.type!=='marchyellow')return before(u);
  const a=u.stats?.evolved?NEW_ATLASES.marchyellow.evolved:NEW_ATLASES.marchyellow;
  const walk=a.walk,step=a.walkStep,hurt=a.hurt,stationary=u.marchLastX===u.x;
  u.marchLastX=u.x;
  try{
   if(u.hurtTime>0){
    const duration=u.marchHurtDuration||HITBACK_DURATION;
    const index=Math.min(hurt.length-1,Math.max(0,Math.floor((1-u.hurtTime/duration)*hurt.length)));
    a.hurt=[hurt[index]];
   }else if(u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=1/30;}
   before(u);
  }finally{a.walk=walk;a.walkStep=step;a.hurt=hurt;}
  const elapsed=(u.stats?.attackDuration||.8)-u.attackTime;
  const throwing=u.hurtTime<=0&&u.attackTime>0&&elapsed>=.3&&elapsed<22/30;
  if(throwing&&!u.marchFlag){
   u.marchFlag=document.createElement('i');u.marchFlag.className='march-yellow-flag';
   u.marchFlag.style.cssText='position:absolute;pointer-events:none;width:28px;height:8px;background:url(assets/march-yellow-motion/flag.webp?v=1) center/contain no-repeat;z-index:5';
   u.el.append(u.marchFlag);
  }
  if(u.marchFlag){
   u.marchFlag.style.display=throwing?'block':'none';
   if(throwing){const t=(elapsed-.3)/(.4);u.marchFlag.style.left=(-8-t*64)+'px';u.marchFlag.style.bottom=(u.stats?.evolved?40:25)+'px';}
  }
 };
}
{const before=startHitback;startHitback=function(u,...args){if(u?.type==='marchyellow')u.marchHurtDuration=HITBACK_DURATION;return before(u,...args);};}
renderNewButtons();renderDeckButtons();renderTraining();
