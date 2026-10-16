// 울슈레 63~67 노랑·갈색 계열 중 앰버(amber.js)를 뺀 4명: 브론즈 · 바나나 · 버터 · 바닐라 (v6.2.0).
// 직업 연결과 능력은 원작 능력(성 파괴자·대상 한정·머니 업·연속 공격·날려버린다 무효·움직임을 느리게 한다·베리어 브레이커·엄강)에서 가져왔다.
// 울슈레 규칙: 1진·2진 가격 동일(flatCost), 3,000~5,000원. 뽑기 울슈레 칸을 나눠 갖는다.
// 전용 걷기·공격·넉백 모션은 colors-motion-atlases.js가 NEW_ATLASES에 연결한다.
const YELLOW_UBERS={
 bronze:{name:'브론즈',color:'#cd7f32',job:'건축 구조 안전기사',
  hp:52000,atk:26000,interval:6,speed:4,range:14,cost:4000,cooldown:60,knockbacks:3,
  extra:{attackClass:'개체',onlyTraitless:true,castleMult:4},
  role:'무속성 적·성 전용 · 성 파괴자',
  text:'건축 구조 안전기사. 구조물의 약점을 꿰뚫어 무속성 적과 적 성만 노리고, 성에는 네 배의 피해를 준다. 속성이 있는 적은 상대하지 않는다.',
  textEvo:'더 단단해진 몸으로 성을 무너뜨린다. 한 방의 무게는 그대로, 버티는 힘이 늘었다.',
  evoText:'체력·공격력 +15%'},
 banana:{name:'바나나',color:'#ffe135',job:'스무디 가게 사장',
  hp:35000,atk:10000,interval:3.5,speed:5,range:16,cost:3000,cooldown:45,knockbacks:3,// 범위 공격은 연타마다 atk 전부를 주므로 atk는 한 번 몫(3회 연속 공격 합 3만)
  extra:{attackClass:'범위',area:true,killGold:1,hits:Array.from({length:3},(_,i)=>({at:.35+i*.18,share:1/3}))},
  role:'범위 3회 연속 공격 · 격파시 머니 UP ×2',
  text:'스무디 가게 사장. 믹서기를 세 번 연달아 돌려 주변을 휩쓸고, 쓰러뜨린 적에게서 돈을 두 배로 번다.',
  textEvo:'믹서기가 더 세졌다. 가끔 적을 날려버린다.',
  evoText:'체력·공격력 +15% · 날려버린다 25%'},
 butter:{name:'버터',color:'#fff3a0',job:'유제품 가공사',
  hp:60000,atk:8000,interval:3.2,speed:5,range:10,cost:3000,cooldown:40,knockbacks:3,
  extra:{attackClass:'범위',area:true,knockbackImmune:true,slowChance:.6,slowDuration:4},
  role:'날려버린다 무효 · 범위 움직임을 느리게 하는 탱커',
  text:'유제품 가공사. 흔들리지 않고 자리를 지키며, 끈적한 반죽을 튀겨 맞은 적의 움직임을 느리게 한다.',
  textEvo:'더 두툼해진 몸. 끈적임도 한결 오래 간다.',
  evoText:'체력·공격력 +15%'},
 vanilla:{name:'바닐라',color:'#f3e5ab',job:'식품 향료 개발자',
  hp:30000,atk:14000,interval:4,speed:5,range:20,cost:3500,cooldown:43,knockbacks:3,
  extra:{attackClass:'범위',area:true,strongVs:['alien'],barrierBreak:1,statusVs:['alien'],freezeChance:.5,freezeDuration:2},
  role:'에이리언 엄강 · 베리어 브레이커 · 움직임을 멈춘다',
  text:'식품 향료 개발자. 향으로 에이리언을 홀려 잠깐 멈추게 하고, 단단한 베리어도 한 번에 녹여 버린다.',
  textEvo:'향이 한층 짙어져 에이리언이 거의 항상 멈춘다.',
  evoText:'체력·공격력 +15% · 움직임을 멈춘다 100%'}
};
const YELLOW_EVO_EXTRA={banana:()=>({blowChance:.25,blowDistance:10}),vanilla:()=>({freezeChance:1})};
for(const [id,s] of Object.entries(YELLOW_UBERS)){
 for(const list of [EX_TYPES,EX_GRADE,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(id))list.push(id);
 data.units[id]={hp:Math.round(s.hp/28),atk:Math.round(s.atk/9),interval:s.interval,speed:s.speed,range:s.range,cost:s.cost,cooldown:s.cooldown,knockbacks:s.knockbacks,flatCost:true,noRangeGrow:true,attackDuration:Math.min(.9,s.interval),windup:.4,...s.extra};
 LV20_TARGET[id]={hp:s.hp,atk:s.atk};
 UNIT_NAMES[id]=EX_NAME[id]=s.name;COLORS[id]=s.color;ROLES[id]=s.role;
 PROFILE_TEXT[id]=s.text;PROFILE_TEXT_EVOLVED[id]=s.textEvo;EVOLUTION_TEXT[id]=s.evoText;ACQUIRE_TEXT[id]='뽑기에서 획득';
 const saved=SUBSPECIES_SAVED_TRAINING?.levels?.[id];
 training.levels[id]=Number.isInteger(saved)?Math.max(1,Math.min(LEVEL_HARD_MAX,saved)):1;
 if(SUBSPECIES_SAVED_TRAINING?.forms?.[id]===1)training.forms[id]=1;
 if(YELLOW_EVO_EXTRA[id])EVO_EXTRA[id]=YELLOW_EVO_EXTRA[id];
 if(!GACHA_UBER.some(u=>u.id===id))GACHA_UBER.push({id,name:s.name});
 const b=document.createElement('button');b.id=id+'Btn';b.className='unit-btn '+id+'-btn';b.innerHTML='<i style="background:'+s.color+'"></i><strong>'+s.name+'</strong><small></small><em></em>';b.onclick=()=>addUnit(id);$('.controls').append(b);
}
// Dedicated artwork is installed by colors-motion-atlases.js after registration.
const _yuGrade=gradeOf;
gradeOf=function(t){return YELLOW_UBERS[t]?'uber':_yuGrade(t)};
const _yuCanTrue=canTrueForm,_yuHasTrue=hasTrueForm;
canTrueForm=function(t){return !YELLOW_UBERS[t]&&_yuCanTrue(t)};
hasTrueForm=function(t){return !YELLOW_UBERS[t]&&_yuHasTrue(t)};
const _yuTraining=renderTraining;
renderTraining=function(){_yuTraining();for(const card of $('#trainingGrid').children)if(YELLOW_UBERS[card.dataset.type])card.querySelector('.true-btn')?.remove()};
// 새 능력 ① 대상 한정(브론즈): 무속성 적과 적 성만 노린다 (원작 '공격 대상 한정'). 속성 있는 적은 지나친다.
const _yuTarget=target;
target=function(u){
 const d=u.stats||data.units[u.type];
 if(!u.ally||!d.onlyTraitless)return _yuTarget.apply(this,arguments);
 const dir=-1;
 return game.units.filter(v=>v.hp>0&&v.kbTime<=0&&!v.emerging&&v.ally!==u.ally&&traitsOf(data.units[v.type]).length===0&&dir*(v.x-u.x)>=-1).sort((a,b)=>Math.abs(a.x-u.x)-Math.abs(b.x-u.x))[0];
};
// 새 능력 ② 베리어 브레이커(바닐라): 확률로 베리어를 즉시 깨고 그대로 피해를 준다.
const _yuDamage=damage;
damage=function(v,amount,from){
 const p=from?.stats?.barrierBreak;
 if(p&&v.stats?.barrier&&!v.barrierBroken&&Math.random()<p){v.barrierBroken=true;v.el?.classList.remove('barrier-on')}
 return _yuDamage.apply(this,arguments);
};
// 도감·툴팁 배지
const _yuBadges=codexTraitBadges;
codexTraitBadges=function(d){
 const b=_yuBadges(d);
 if(d.onlyTraitless)b.push('무속성 적과 성만 공격');
 if(d.castleMult>1)b.push(`성 파괴자 (적 성에 ×${d.castleMult})`);
 if(d.barrierBreak)b.push('베리어 브레이커');
 if(d.knockbackImmune)b.push('날려버린다 무효');
 return b;
};
renderNewButtons();renderDeckButtons();renderTraining();
if(typeof renderGacha==='function'&&typeof gachaOpen==='function'&&gachaOpen())renderGacha();
