// User-approved traits; base stats are initial balancing proposals using LV20_TARGET.
const OCEAN_SEA74={
 ocean:{name:'오션',color:'#0077be',hp:65000,atk:9500,interval:4.2,speed:6,range:23,cost:3900,cooldown:55,knockbacks:3,
  extra:{area:true,attackClass:'범위',massiveVs:['alien','zombie'],zombieKiller:true,windup:.6,attackDuration:1.2},
  role:'에이리언·좀비 초데미지 · 좀비 킬러',profile:'남성, 35세. 워터즈의 해양 기상 관측원. 풍속계와 관측 부이로 바람을 일으킨다. 에이리언과 좀비에게 초데미지를 주고, 직접 끝장낸 좀비의 부활을 막는다. 공격 준비 중 밀리지 않도록 고방으로 보호하자.',evolved:'관측 작업복을 갖춘 오션. 강한 바닷바람으로 전선을 지원한다.'},
 sea:{name:'씨',color:'#008c95',hp:110000,atk:4200,interval:2.2,speed:24,range:10,cost:3150,cooldown:40,knockbacks:2,
  extra:{area:true,attackClass:'범위',resistVs:['alien','floating'],slowChance:.3,slowDuration:3,statusVs:['alien','floating'],windup:.25,attackDuration:.8},
  role:'고속 합류 · 에이리언·떠 있는 적 맷집 · 30% 느리게',profile:'여성, 28세. 워터즈의 스쿠버다이빙 강사. 빠르게 전선에 합류해 짧은 작살과 물거품으로 싸운다. 에이리언과 떠 있는 적에게 맷집이 좋고 30% 확률로 3초간 느리게 한다. 다른 속성에는 맷집이 적용되지 않으며 느리게도 확정은 아니다.',evolved:'잠수복과 산소통을 갖춘 씨. 전선 앞에서 공격을 버티며 적의 접근을 늦춘다.'}
};
for(const [id,s]of Object.entries(OCEAN_SEA74)){
 for(const list of [EX_TYPES,EX_GRADE,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(id))list.push(id);
 data.units[id]={hp:Math.round(s.hp/28),atk:Math.round(s.atk/9),interval:s.interval,speed:s.speed,range:s.range,cost:s.cost,cooldown:s.cooldown,knockbacks:s.knockbacks,flatCost:true,noRangeGrow:true,...s.extra};
 LV20_TARGET[id]={hp:s.hp,atk:s.atk};UNIT_NAMES[id]=EX_NAME[id]=s.name;COLORS[id]=s.color;ROLES[id]=s.role;
 PROFILE_TEXT[id]=s.profile;PROFILE_TEXT_EVOLVED[id]=s.evolved+' '+s.profile;EVOLUTION_TEXT[id]='체력·공격력 +15% · 사거리 유지';ACQUIRE_TEXT[id]='시리즈 뽑기에서 획득';
 const saved=SUBSPECIES_SAVED_TRAINING?.levels?.[id];training.levels[id]=Number.isInteger(saved)?Math.max(1,Math.min(LEVEL_HARD_MAX,saved)):1;
 if(SUBSPECIES_SAVED_TRAINING?.forms?.[id]===1)training.forms[id]=1;
 NEW_ATLASES[id]={...OCEAN_SEA_MOTION_ATLASES[id+'_1'],evolved:{...OCEAN_SEA_MOTION_ATLASES[id+'_2']}};
 for(const a of [NEW_ATLASES[id],NEW_ATLASES[id].evolved]){a.attackKeys=[[0,0],[s.extra.windup*15,1],[s.extra.windup*30,2]];for(let f=3;f<7;f++)a.attackKeys.push([(s.extra.windup+(s.extra.attackDuration-s.extra.windup)*(f-2)/5)*30,f]);}
 PROFILE_ART[id]=[1,2].map(form=>'assets/ocean-sea-motion/'+id+'_'+form+'-profile.webp?v=1');RARE_STRIKE[id]=2;EVO_BODY_H[id]=104;
 if(!GACHA_UBER.some(u=>u.id===id))GACHA_UBER.push({id,name:s.name});
 const b=document.createElement('button');b.id=id+'Btn';b.className='unit-btn';b.innerHTML='<i style="background:'+s.color+'"></i><strong>'+s.name+'</strong><small></small><em></em>';b.onclick=()=>addUnit(id);$('.controls').append(b);
}
{const before=gradeOf;gradeOf=function(id){return OCEAN_SEA74[id]?'uber':before(id)};}
renderNewButtons();renderDeckButtons();renderTraining();

{const before=animateAtlas;animateAtlas=function(u){
 if(!OCEAN_SEA74[u.type])return before(u);
 const base=NEW_ATLASES[u.type],a=u.stats?.evolved?base.evolved:base,stationary=u.oceanSeaLastX===u.x;u.oceanSeaLastX=u.x;
 const walk=a.walk,step=a.walkStep;try{if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}return before(u);}finally{a.walk=walk;a.walkStep=step;}
};}
