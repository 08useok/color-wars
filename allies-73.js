// Initial 7.3 stats: LV20_TARGET uses the same scaling convention as existing ubers.
const ALLIES73={
 sunflower:{name:'썬플라워',color:'#ffda03',hp:50000,atk:6000,interval:4.5,speed:5,range:21,cost:3300,cooldown:45,knockbacks:3,
  extra:{area:true,attackClass:'범위',slowChance:.5,slowDuration:3,statusVs:['black','angel'],zoneMax:28,backRange:8,windup:.5,attackDuration:1.3},
  role:'검은 적·천사 범위 둔화 지원',profile:'여성, 32세. 가든즈의 양봉가. 벌꿀 봉으로 꿀을 앞뒤로 넓게 흩뿌려 검은 적과 천사의 움직임을 50% 확률로 3초간 느리게 한다. 긴 공격 간격 때문에 효과가 비는 동안은 고방의 보호가 필요하다.',evolved:'양봉 작업복을 갖춘 썬플라워. 꿀단지를 들고 전선을 지원한다.'},
 fern:{name:'펀',color:'#4f7942',hp:62000,atk:4500,interval:3.6,speed:28,range:20,cost:3600,cooldown:48,knockbacks:3,
  extra:{area:true,attackClass:'범위',atkDownChance:.75,atkDownPct:.5,atkDownDuration:4,statusVs:['floating','alien'],windup:.4,attackDuration:1.2},
  role:'떠 있는 적·에이리언 범위 약화 지원',profile:'남성, 27세. 가든즈의 테라리움 디자이너. 유리병 속 식물과 모종삽으로 작은 정원을 가꾼다. 떠 있는 적과 에이리언의 공격력을 75% 확률로 4초간 절반으로 낮춘다. 약화는 공격 자체를 막지 않으므로 고방과 딜러를 함께 편성하자.',evolved:'작업 앞치마를 갖춘 펀. 식물 유리병을 관리하며 적의 공격력을 낮추는 후방 지원을 맡는다.'},
 jade:{name:'제이드',color:'#00a86b',hp:100000,atk:9000,interval:2.8,speed:8,range:9,cost:3450,cooldown:48,knockbacks:3,
  extra:{area:true,attackClass:'범위',resistVs:['red','black'],blowChance:.4,blowDistance:7,windup:.35,attackDuration:1},
  role:'빨간 적·검은 적 맷집 · 근거리 범위 딜탱',profile:'남성, 30세. 워터즈의 수상 구조요원. 호루라기와 구조 부표로 위험한 전선을 정리한다. 빨간 적과 검은 적에게 맷집이 좋고, 범위 타격으로 40% 확률로 적을 밀어낸다. 다른 속성과 긴 사거리의 적에게는 별도 지원이 필요하다.',evolved:'구조요원 복장을 갖춘 제이드. 빨간 부표를 휘둘러 앞의 적들을 밀어내며 버틴다.'}
};
for(const [id,s]of Object.entries(ALLIES73)){
 for(const list of [EX_TYPES,EX_GRADE,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(id))list.push(id);
 data.units[id]={hp:Math.round(s.hp/28),atk:Math.round(s.atk/9),interval:s.interval,speed:s.speed,range:s.range,cost:s.cost,cooldown:s.cooldown,knockbacks:s.knockbacks,flatCost:true,noRangeGrow:true,...s.extra};
 LV20_TARGET[id]={hp:s.hp,atk:s.atk};UNIT_NAMES[id]=EX_NAME[id]=s.name;COLORS[id]=s.color;ROLES[id]=s.role;
 PROFILE_TEXT[id]=s.profile;PROFILE_TEXT_EVOLVED[id]=s.evolved+' '+s.profile;EVOLUTION_TEXT[id]='체력·공격력 +15% · 사거리 유지';ACQUIRE_TEXT[id]='시리즈 뽑기에서 획득';
 const saved=SUBSPECIES_SAVED_TRAINING?.levels?.[id];training.levels[id]=Number.isInteger(saved)?Math.max(1,Math.min(LEVEL_HARD_MAX,saved)):1;
 if(SUBSPECIES_SAVED_TRAINING?.forms?.[id]===1)training.forms[id]=1;
 NEW_ATLASES[id]={...ALLIES_73_MOTION_ATLASES[id+'_1'],evolved:{...ALLIES_73_MOTION_ATLASES[id+'_2']}};
 for(const a of [NEW_ATLASES[id],NEW_ATLASES[id].evolved]){a.attackKeys=[[0,0],[s.extra.windup*15,1],[s.extra.windup*30,2]];for(let f=3;f<7;f++)a.attackKeys.push([(s.extra.windup+(s.extra.attackDuration-s.extra.windup)*(f-2)/5)*30,f]);}
 PROFILE_ART[id]=[1,2].map(form=>'assets/allies-73-motion/'+id+'_'+form+'-profile.webp?v=1');RARE_STRIKE[id]=2;EVO_BODY_H[id]=104;
 if(!GACHA_UBER.some(u=>u.id===id))GACHA_UBER.push({id,name:s.name});
 const b=document.createElement('button');b.id=id+'Btn';b.className='unit-btn';b.innerHTML='<i style="background:'+s.color+'"></i><strong>'+s.name+'</strong><small></small><em></em>';b.onclick=()=>addUnit(id);$('.controls').append(b);
}
{const before=gradeOf;gradeOf=function(id){return ALLIES73[id]?'uber':before(id)};}
renderNewButtons();renderDeckButtons();renderTraining();
