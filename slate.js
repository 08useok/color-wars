// Register after the range/speed rebalance: Slate's approved range is 400.
const SLATE_SPEC={name:'슬레이트',evolved:'타일 장인 슬레이트',color:'#708090',
 hp:40000,atk:100,interval:2,range:400*.034,cost:450,cooldown:11,
 role:'좀비 전용 밀치기 · 저화력 개체 지원',
 extra:{speed:4,flatCost:true,knockbacks:3,windup:.3,attackDuration:.8,
  attackClass:'개체',blowChance:1,blowDistance:14,blowVs:['zombie']},
 profile:'남성 타일 시공 기사. 석판빛 몸과 긴 손잡이 압착 도구로 타일을 단단히 밀착시킨다. 좀비 한 마리를 확정으로 밀어내지만, 처치한 좀비의 부활을 막지는 못한다.'};
for(const form of [1,2])CYCLONE_ATLASES['slate_'+form]=SLATE_MOTION_ATLASES[form];
registerCycloneAlly('slate',SLATE_SPEC);
// Same level/treasure curve as other late-added allies. Lv.30 evolved/full
// treasures: 40,000 HP, 100 damage. Research treasures reduce 11 s to 8 s.
LV20_TARGET.slate={hp:40000/4.025,atk:100/4.025};
data.units.slate.hp=Math.round(LV20_TARGET.slate.hp/28);
data.units.slate.atk=Math.round(LV20_TARGET.slate.atk/9);
NEW_ATLASES.slate={...SLATE_MOTION_ATLASES[1],evolved:{...SLATE_MOTION_ATLASES[2]}};
PROFILE_ART.slate=[1,2].map(f=>'assets/slate-motion/slate_'+f+'-profile.png?v=2');
PROFILE_TEXT_EVOLVED.slate='작업복·모자·무릎 보호대를 갖춘 타일 장인 슬레이트. 타일 압착 도구를 앞으로 밀어 좀비의 위치를 조절한다. 좀비 킬러는 없으며, 다른 속성에는 밀치기가 적용되지 않는다.';
EVOLUTION_TEXT.slate='체력·공격력 15% 증가 · 가격·사거리·공격 간격·좀비 100% 밀치기 유지';
ACQUIRE_TEXT.slate='시리즈 확정권 뽑기의 레어 칸에서 획득';
EVO_BODY_H.slate=94;
{const before=unitStats;unitStats=function(id,...args){const s=before(id,...args);if(id==='slate')s.range=400*.034;return s;};}
if(typeof GACHA_RARE!=='undefined'&&!GACHA_RARE.some(u=>u.id==='slate'))GACHA_RARE.push({id:'slate',name:'슬레이트'});
{const before=allyUnlocked;allyUnlocked=function(id){return id==='slate'?gachaOwns(id):before(id);};}
{const before=unitDisplayName;unitDisplayName=function(id,tr=false,ev=false){return id==='slate'?(ev?SLATE_SPEC.evolved:SLATE_SPEC.name):before(id,tr,ev);};}
// Idle uses the breathing timeline; hurt is a single drawing because the
// engine already supplies both hitback bounces and the world-space movement.
{const before=animateAtlas;animateAtlas=function(u){
 if(u.type!=='slate')return before(u);
 const a=u.stats?.evolved?NEW_ATLASES.slate.evolved:NEW_ATLASES.slate;
 const frames=a.walk,step=a.walkStep,still=u.slateLastX===u.x;u.slateLastX=u.x;
 try{if(u.hurtTime<=0&&u.attackTime<=0&&still){a.walk=a.idle;a.walkStep=1/30;}return before(u);}
 finally{a.walk=frames;a.walkStep=step;}
};}
renderNewButtons();renderDeckButtons();renderTraining();
