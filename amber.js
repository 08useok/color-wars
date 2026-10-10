// 앰버 (울트라 슈퍼 레어, 뽑기): 고문실의 블랙쿠마·홍당무왕을 노리는 초고속 근접 범위 딜러.
// 원작 '비약의 무신 그리폰'(초환수 바사라즈)처럼 이동이 매우 빠르고, 한 방이 크고, 히트백(넉백) 횟수가 많다.
// 울슈레 규칙: 1진·2진 가격 동일(flatCost). 그림은 아직 오키드 모션을 색만 바꿔 쓰는 임시 그림이다.
// 그림이 오면 NEW_ATLASES.amber(걷기·공격·넉백, 2진은 .evolved)만 바꾸고 아래 임시 색 규칙을 지운다.
const AMBER={
 id:'amber',name:'앰버',color:'#ffbf00',
 hp:48000,atk:31000,interval:4.4,speed:30,range:6,cost:3500,cooldown:40,knockbacks:5,
 role:'초고속 범위 · 검은 적·떠 있는 적 초데미지'
};
for(const list of [EX_TYPES,EX_GRADE,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(AMBER.id))list.push(AMBER.id);
data.units[AMBER.id]={hp:Math.round(AMBER.hp/28),atk:Math.round(AMBER.atk/9),interval:AMBER.interval,speed:AMBER.speed,range:AMBER.range,cost:AMBER.cost,cooldown:AMBER.cooldown,knockbacks:AMBER.knockbacks,flatCost:true,noRangeGrow:true,area:true,attackClass:'범위',attackDuration:.8,windup:.4,massiveVs:['black','floating']};
LV20_TARGET[AMBER.id]={hp:AMBER.hp,atk:AMBER.atk};
UNIT_NAMES[AMBER.id]=EX_NAME[AMBER.id]=AMBER.name;COLORS[AMBER.id]=AMBER.color;ROLES[AMBER.id]=AMBER.role;
PROFILE_TEXT[AMBER.id]='뽑기에서 만나는 울트라 슈퍼 레어. 눈 깜짝할 새 달려들어 한 방에 검은 적과 떠 있는 적을 쓸어버린다. 고문실의 블랙쿠마와 홍당무왕이 노리는 상대.';
PROFILE_TEXT_EVOLVED[AMBER.id]='더 단단해진 몸으로 달려든다. 한 방의 무게는 그대로, 버티는 힘이 늘었다.';
EVOLUTION_TEXT[AMBER.id]='체력·공격력 +15%';ACQUIRE_TEXT[AMBER.id]='뽑기에서 획득';
{
 const saved=SUBSPECIES_SAVED_TRAINING?.levels?.[AMBER.id];
 training.levels[AMBER.id]=Number.isInteger(saved)?Math.max(1,Math.min(LEVEL_HARD_MAX,saved)):1;
 if(SUBSPECIES_SAVED_TRAINING?.forms?.[AMBER.id]===1)training.forms[AMBER.id]=1;
}
// 임시 모션: 오키드 시트를 그대로 쓴다(공격 프레임 위치도 같음).
NEW_ATLASES[AMBER.id]={...NEW_ATLASES.orchid};RARE_STRIKE[AMBER.id]=RARE_STRIKE.orchid||2;EVO_BODY_H[AMBER.id]=EVO_BODY_H.orchid||104;
{
 const s=document.createElement('style');
 s.textContent='.unit.amber .dog-sprite{filter:hue-rotate(160deg) saturate(1.5) brightness(1.15)}.amber-btn i{background:#ffbf00}';
 document.head.append(s);
}
// 울트라 슈퍼 레어 칸: 프리즘·레인보우·오키드·아이언·그레이·카민과 같은 확률 칸을 나눠 갖는다.
if(!GACHA_UBER.some(u=>u.id===AMBER.id))GACHA_UBER.push({id:AMBER.id,name:AMBER.name});
const _amberGrade=gradeOf;
gradeOf=function(t){return t===AMBER.id?'uber':_amberGrade(t)};
// 3진은 없다 (그림·재료 규칙이 정해지기 전까지 막아 둔다).
const _amberCanTrue=canTrueForm,_amberHasTrue=hasTrueForm;
canTrueForm=function(t){return t!==AMBER.id&&_amberCanTrue(t)};
hasTrueForm=function(t){return t!==AMBER.id&&_amberHasTrue(t)};
const _amberTraining=renderTraining;
renderTraining=function(){_amberTraining();const card=[...$('#trainingGrid').children].find(c=>c.dataset.type===AMBER.id);card?.querySelector('.true-btn')?.remove()};
{
 const b=document.createElement('button');b.id=AMBER.id+'Btn';b.className='unit-btn amber-btn';b.innerHTML='<i></i><strong>'+AMBER.name+'</strong><small></small><em></em>';b.onclick=()=>addUnit(AMBER.id);$('.controls').append(b);
}
renderNewButtons();renderDeckButtons();renderTraining();
if(typeof renderGacha==='function'&&typeof gachaOpen==='function'&&gachaOpen())renderGacha();
