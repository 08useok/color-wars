// 울슈레 플래티넘 (v6.8.1, 아이언즈): 귀금속 도금 기술자(남성·39세). 좀비 킬러 + 좀비·메탈을 느리게 하는 범위 지원.
// 합의한 사양: 선딜 0.8초 → 타격 → 후딜 1.6초 → 곧바로 다음 공격(별도 재공격 대기 없음, 한 번의 주기 2.4초).
// 사거리는 원작 350 × 0.034 = 약 12, 이동 속도는 원작 기준 5. 1진·2진 가격 동일(울슈레 규칙).
// 전용 모션(걷기 4·공격 6·피격 1·복귀 1)은 assets/platinum-motion/platinum-motion-atlases.js, 이 파일은 그보다 뒤에 불러온다.
const PLATINUM={
 platinum:{name:'플래티넘',color:'#e5e4e2',job:'귀금속 도금 기술자',
  hp:75000,atk:12000,interval:2.4,speed:5,range:12,cost:3600,cooldown:65,knockbacks:3,
  extra:{attackClass:'범위',area:true,zombieKiller:true,slowChance:.5,slowDuration:3,statusVs:['zombie','metal'],attackDuration:2.4,windup:.8},
  role:'범위 · 좀비 킬러 · 좀비·메탈을 느리게 한다',
  text:'귀금속 도금 기술자. 도금 브러시를 높이 들었다가 은청색 도금액을 뿌리면, 맞은 좀비와 메탈 적의 몸이 굳어 걸음이 느려진다. 좀비 킬러라 직접 쓰러뜨린 좀비는 다시 일어나지 못한다. 분사 전 준비 동작과 뒤 정리 동작이 길어 고방 뒤에서 써야 한다.',
  textEvo:'보호면과 작업복을 갖추고 휴대 도금 장비로 분사한다. 도금이 더 잘 먹어 좀비와 메탈이 거의 항상 느려진다.',evoText:'체력·공격력 +15% · 느리게 한다 80%'}
};
const PLATINUM_EVO_EXTRA={platinum:()=>({slowChance:.8})};
for(const [id,s] of Object.entries(PLATINUM)){
 for(const list of [EX_TYPES,EX_GRADE,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(id))list.push(id);
 data.units[id]={hp:Math.round(s.hp/28),atk:Math.round(s.atk/9),interval:s.interval,speed:s.speed,range:s.range,cost:s.cost,cooldown:s.cooldown,knockbacks:s.knockbacks,flatCost:true,noRangeGrow:true,...s.extra};
 LV20_TARGET[id]={hp:s.hp,atk:s.atk};
 UNIT_NAMES[id]=EX_NAME[id]=s.name;COLORS[id]=s.color;ROLES[id]=s.role;
 PROFILE_TEXT[id]=s.text;PROFILE_TEXT_EVOLVED[id]=s.textEvo;EVOLUTION_TEXT[id]=s.evoText;ACQUIRE_TEXT[id]='뽑기에서 획득';
 const saved=SUBSPECIES_SAVED_TRAINING?.levels?.[id];
 training.levels[id]=Number.isInteger(saved)?Math.max(1,Math.min(LEVEL_HARD_MAX,saved)):1;
 if(SUBSPECIES_SAVED_TRAINING?.forms?.[id]===1)training.forms[id]=1;
 // 모션: 1진 시트에 2진 시트를 evolved로 붙인다. 공격 6장은 선딜 0.8초(0·1번) → 타격(2번) → 후딜 1.6초(3~5번)에 맞춰 attackDuration 2.4초 동안 재생된다.
 NEW_ATLASES[id]={...PLATINUM_MOTION_ATLASES.platinum_1,evolved:{...PLATINUM_MOTION_ATLASES.platinum_2}};
 RARE_STRIKE[id]=2;EVO_BODY_H[id]=104;
 EVO_EXTRA[id]=PLATINUM_EVO_EXTRA[id];
 if(!GACHA_UBER.some(u=>u.id===id))GACHA_UBER.push({id,name:s.name});
 const b=document.createElement('button');b.id=id+'Btn';b.className='unit-btn '+id+'-btn';b.innerHTML='<i style="background:'+s.color+'"></i><strong>'+s.name+'</strong><small></small><em></em>';b.onclick=()=>addUnit(id);$('.controls').append(b);
}
const _ptGrade=gradeOf;
gradeOf=function(t){return PLATINUM[t]?'uber':_ptGrade(t)};
const _ptCanTrue=canTrueForm,_ptHasTrue=hasTrueForm;
canTrueForm=function(t){return !PLATINUM[t]&&_ptCanTrue(t)};
hasTrueForm=function(t){return !PLATINUM[t]&&_ptHasTrue(t)};
const _ptTraining=renderTraining;
renderTraining=function(){_ptTraining();for(const card of $('#trainingGrid').children)if(PLATINUM[card.dataset.type])card.querySelector('.true-btn')?.remove()};
renderNewButtons();renderDeckButtons();renderTraining();
if(typeof renderGacha==='function'&&typeof gachaOpen==='function'&&gachaOpen())renderGacha();
