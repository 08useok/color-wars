// Remaining zombie-support rares. Append after Slate and range balancing.
const ZOMBIE_RARES={
 smoke:{name:'스모크',evolved:'현장 조사관 스모크',color:'#848884',hp:25000,atk:150,
  interval:4,range:320*.034,cost:600,cooldown:13,role:'좀비 범위 정지 · 저화력 메즈 지원',
  extra:{speed:4,flatCost:true,knockbacks:3,windup:.5,attackDuration:1,area:true,attackClass:'범위',statusVs:['zombie'],freezeChance:.5,freezeDuration:2},
  profile:'남성 화재 조사관. 조사등과 기록 장비로 현장을 살핀다. 조사등을 비춰 좀비 무리를 50% 확률로 멈추지만 처치한 좀비의 부활을 막지는 못한다.',
  evolvedProfile:'안전모와 반사띠 조사복을 갖춘 현장 조사관 스모크. 조사등으로 앞쪽 좀비 무리를 멈춰 아군의 공격 시간을 확보한다.',
  evolution:'체력·공격력 15% 증가 · 가격·사거리·공격 간격·좀비 50% 정지 유지'},
 ash:{name:'애쉬',evolved:'내열 작업반장 애쉬',color:'#b2beb5',hp:60000,atk:50,
  interval:3,range:150*.034,cost:350,cooldown:11,role:'좀비 맷집 · 저화력 고방',
  extra:{speed:4,flatCost:true,knockbacks:2,windup:.4,attackDuration:.9,attackClass:'개체',resistVs:['zombie'],resistMult:.25},
  profile:'여성 소각시설 운영 기사. 회색 몸과 재를 걷어내는 금속 도구를 가진다. 좀비에게 받는 피해를 줄이며 앞줄에서 버티지만, 좀비를 처치해 부활을 막는 능력은 없다.',
  evolvedProfile:'내열 작업복과 보호 장비를 갖춘 내열 작업반장 애쉬. 재 제거 도구를 앞으로 밀며 좀비의 공격을 받아낸다. 다른 속성이나 잠복 기습에는 별도의 지원이 필요하다.',
  evolution:'체력·공격력 15% 증가 · 가격·사거리·공격 간격·좀비 맷집 유지'}
};
for(const [id,s]of Object.entries(ZOMBIE_RARES)){
 for(const f of [1,2])CYCLONE_ATLASES[id+'_'+f]=ZOMBIE_RARE_MOTION_ATLASES[id+'_'+f];
 registerCycloneAlly(id,s);
 LV20_TARGET[id]={hp:s.hp/4.025,atk:s.atk/4.025};
 data.units[id].hp=Math.round(LV20_TARGET[id].hp/28);
 data.units[id].atk=Math.max(1,Math.round(LV20_TARGET[id].atk/9));
 NEW_ATLASES[id]={...ZOMBIE_RARE_MOTION_ATLASES[id+'_1'],evolved:{...ZOMBIE_RARE_MOTION_ATLASES[id+'_2']}};
 PROFILE_ART[id]=[1,2].map(f=>'assets/zombie-rares-motion/'+id+'_'+f+'-profile.png?v=1');
 PROFILE_TEXT_EVOLVED[id]=s.evolvedProfile;EVOLUTION_TEXT[id]=s.evolution;
 ACQUIRE_TEXT[id]='시리즈 확정권 뽑기의 레어 칸에서 획득';EVO_BODY_H[id]=95;
 if(typeof GACHA_RARE!=='undefined'&&!GACHA_RARE.some(u=>u.id===id))GACHA_RARE.push({id,name:s.name});
}
{const before=unitStats;unitStats=function(id,...args){const s=before(id,...args);if(ZOMBIE_RARES[id])s.range=ZOMBIE_RARES[id].range;return s;};}
{const before=allyUnlocked;allyUnlocked=function(id){return ZOMBIE_RARES[id]?gachaOwns(id):before(id);};}
{const before=unitDisplayName;unitDisplayName=function(id,tr=false,ev=false){return ZOMBIE_RARES[id]?(ev?ZOMBIE_RARES[id].evolved:ZOMBIE_RARES[id].name):before(id,tr,ev);};}
{const before=animateAtlas;animateAtlas=function(u){
 if(!ZOMBIE_RARES[u.type])return before(u);
 const a=u.stats?.evolved?NEW_ATLASES[u.type].evolved:NEW_ATLASES[u.type];
 const frames=a.walk,step=a.walkStep,still=u.zombieRareLastX===u.x;u.zombieRareLastX=u.x;
 try{if(u.hurtTime<=0&&u.attackTime<=0&&still){a.walk=a.idle;a.walkStep=1/30;}return before(u);}
 finally{a.walk=frames;a.walkStep=step;}
};}
renderNewButtons();renderDeckButtons();renderTraining();
