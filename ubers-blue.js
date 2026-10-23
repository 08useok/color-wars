// 울슈레 72~77: 아쿠아마린 · 사파이어 · 로열 블루 · 나이트 · 퓨샤 · 로즈 (v6.2.0). 모두 울트라 슈퍼 레어(뽑기), 1진·2진 가격 동일.
// 사파이어·아쿠아마린·퓨샤·로즈는 여성형, 로열 블루·나이트는 남성형. 능력은 원작 6.3 시점에 있던 것만 썼다:
// 파동 데미지 무효·공격력 다운/움직임을 멈춘다/움직임을 느리게 한다 무효(클레이G 3형태, 6.3), 혼신의 일격, 공격력 업, 살아남는다, 원거리·좀비 킬러·크리티컬, 파동, 공격력 다운·움직임을 느리게 한다·움직임을 멈춘다.
// 전용 모션은 new-colors-motion-atlases.js에서 연결한다. 미연결 캐릭터만 임시 색 규칙을 쓴다.
const BLUE_UBERS={
 aquamarine:{name:'아쿠아마린',color:'#7fffd4',job:'래프팅 가이드',base:'aqua',tint:'hue-rotate(-30deg) saturate(1.4) brightness(1.4)',
  hp:50000,atk:11000,interval:2.6,speed:14,range:8,cost:3300,cooldown:40,knockbacks:3,
  extra:{attackClass:'범위',area:true,waveImmune:true,blowChance:.3,blowDistance:8},
  role:'파동 데미지 무효 · 빠른 범위 · 날려버린다',
  text:'래프팅 가이드. 거센 물살과 적의 파동에도 휩쓸리지 않고 달려들어, 노로 적을 날려버린다.',
  textEvo:'물살을 완전히 읽어 노질이 더 자주 적을 밀어낸다.',evoText:'체력·공격력 +15% · 날려버린다 45%'},
 sapphire:{name:'사파이어',color:'#0f52ba',job:'프로 당구 선수',base:'violet',tint:'hue-rotate(-70deg) saturate(1.5) brightness(1.05)',
  hp:30000,atk:22000,interval:3.6,speed:5,range:30,cost:3600,cooldown:42,knockbacks:3,
  extra:{attackClass:'원거리',savageChance:.3,savageMult:3.5,blowChance:.35,blowDistance:12},
  role:'원거리 단일 · 혼신의 일격 · 날려버린다',
  text:'프로 당구 선수. 큐로 정확히 찍은 한 점이 가끔 혼신의 일격으로 터지고, 맞은 적은 멀리 굴러간다.',
  textEvo:'샷이 더 정확해져 혼신의 일격이 자주 터진다.',evoText:'체력·공격력 +15% · 혼신의 일격 45%'},
 royalblue:{name:'로열 블루',color:'#4169e1',job:'해운회사 운영 책임자',base:'brick',tint:'hue-rotate(215deg) saturate(1.2) brightness(1.15)',
  hp:70000,atk:8000,interval:3.4,speed:5,range:10,cost:3800,cooldown:50,knockbacks:3,
  extra:{attackClass:'범위',area:true,survive:1,surviveOnce:true,strengthen:{at:.5,mult:2},immune:{freeze:true,slow:true,weaken:true}},
  role:'한 번 살아남는다 · 체력이 반 이하면 공격력 업 · 움직임을 멈춘다·움직임을 느리게 한다·공격력 다운 무효',
  text:'해운회사 운영 책임자. 어떤 위기에도 한 번은 반드시 버텨 내고, 몰릴수록 더 단호해진다. 움직임을 멈추거나 느리게 하거나 공격력을 다운시키는 효과에 흔들리지 않는다.',
  textEvo:'위기의 순간 더 매섭게 반격한다.',evoText:'체력·공격력 +15% · 공격력 업 ×2.5'},
 night:{name:'나이트',color:'#191970',job:'일루셔니스트(마술사)',base:'teal',tint:'hue-rotate(40deg) saturate(1.3) brightness(.7)',
  hp:28000,atk:14000,interval:4.2,speed:5,range:30,cost:3600,cooldown:42,knockbacks:3,
  extra:{attackClass:'원거리',area:true,wave:{chance:1,reach:30,mult:1},freezeChance:.35,freezeDuration:2},
  role:'원거리 파동 · 움직임을 멈춘다',
  text:'일루셔니스트. 무대 위에서 환영을 흩뿌려 파동처럼 퍼뜨리고, 넋을 잃은 적은 잠깐 굳어 버린다.',
  textEvo:'환영이 더 멀리, 더 오래 사람을 홀린다.',evoText:'체력·공격력 +15% · 움직임을 멈춘다 50% · 파동 범위 +10'},
 fuchsia:{name:'퓨샤',color:'#ff00ff',job:'특수 장비 테스트 엔지니어',base:'maple',tint:'hue-rotate(255deg) saturate(2) brightness(1.1)',
  hp:34000,atk:26000,interval:4.5,speed:5,range:30,cost:3500,cooldown:40,knockbacks:3,
  extra:{attackClass:'원거리',strongVs:['zombie'],zombieKiller:true,critChance:.25,critMult:2},
  role:'원거리 저격 · 좀비 엄강 · 좀비 킬러 · 크리티컬',
  text:'특수 장비 테스트 엔지니어. 시제품 장비로 먼 곳의 좀비를 정확히 저격하고, 다시는 일어나지 못하게 마무리한다.',
  textEvo:'조준 장치가 개량되어 크리티컬이 자주 터진다.',evoText:'체력·공격력 +15% · 크리티컬 40%'},
 rose:{name:'로즈',color:'#ff007f',job:'플로리스트(꽃 장식 전문가)',base:'moss',tint:'hue-rotate(150deg) saturate(1.8) brightness(1.1)',
  hp:45000,atk:9000,interval:3,speed:5,range:12,cost:4500,cooldown:60,knockbacks:3,
  extra:{attackClass:'범위',area:true,atkDownPct:.5,atkDownChance:1,atkDownDuration:5,slowChance:.5,slowDuration:3},
  role:'범위 · 공격력 다운 100% · 움직임을 느리게 한다',
  text:'플로리스트. 꽃다발에서 흩날린 꽃가루가 적의 공격 의욕을 꺾고, 가시 돋친 줄기가 움직임을 느리게 한다.',
  textEvo:'꽃가루가 더 짙어 적이 거의 항상 느려진다.',evoText:'체력·공격력 +15% · 움직임을 느리게 한다 80%'},
 // 7.1 신캐: 인스톨 연합의 타투이스트(여성·29세). 전용 에셋은 allies-71-motion.js에서 연결한다.
 vermilion:{name:'버밀리언',color:'#f4320c',job:'타투이스트',base:'flame',tint:'hue-rotate(8deg) saturate(1.6) brightness(1.05)',
  hp:54000,atk:6000,interval:5.3,speed:5,range:14,cost:3600,cooldown:45,knockbacks:3,
  // 범위 공격. 사거리 14(표시) · 인식(공격을 시작하는 거리) 12 · 타격 범위 앞 15 ~ 뒤 -3.
  extra:{area:true,attackClass:'범위',statusVs:['red','alien'],freezeChance:1,freezeDuration:8,engageRange:12,zoneMax:15,backRange:3},
  role:'범위 · 빨간 적·에이리언 적 움직임을 멈춘다',
  text:'여성, 29세의 타투이스트(문신 아티스트). 타투 펜과 주홍빛 잉크로 도안을 그린다. 잉크의 힘으로 빨간 적과 에이리언의 움직임을 8초 동안 멈춘다.',
  textEvo:'작업 앞치마와 장갑을 갖추고 더 정교한 도안을 그린다. 체력과 공격력이 15% 늘어난다.',evoText:'체력·공격력 +15%'}
};
const BLUE_EVO_EXTRA={
 aquamarine:()=>({blowChance:.45}),
 sapphire:()=>({savageChance:.45}),
 royalblue:d=>({strengthen:{...d.strengthen,mult:2.5}}),
 night:d=>({freezeChance:.5,wave:{...d.wave,reach:d.wave.reach+10}}),
 fuchsia:()=>({critChance:.4}),
 rose:()=>({slowChance:.8}),
 vermilion:d=>({engageRange:d.engageRange})// 2진에서도 사거리처럼 인식 거리를 12로 유지(엔진은 2진에서 인식 거리를 ×1.2로 늘린다)
};
for(const [id,s] of Object.entries(BLUE_UBERS)){
 for(const list of [EX_TYPES,EX_GRADE,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(id))list.push(id);
 data.units[id]={hp:Math.round(s.hp/28),atk:Math.round(s.atk/9),interval:s.interval,speed:s.speed,range:s.range,cost:s.cost,cooldown:s.cooldown,knockbacks:s.knockbacks,flatCost:true,noRangeGrow:true,attackDuration:Math.min(.9,s.interval),windup:.4,...s.extra};
 LV20_TARGET[id]={hp:s.hp,atk:s.atk};
 UNIT_NAMES[id]=EX_NAME[id]=s.name;COLORS[id]=s.color;ROLES[id]=s.role;
 PROFILE_TEXT[id]=s.text;PROFILE_TEXT_EVOLVED[id]=s.textEvo;EVOLUTION_TEXT[id]=s.evoText;ACQUIRE_TEXT[id]='뽑기에서 획득';
 const saved=SUBSPECIES_SAVED_TRAINING?.levels?.[id];
 training.levels[id]=Number.isInteger(saved)?Math.max(1,Math.min(LEVEL_HARD_MAX,saved)):1;
 if(SUBSPECIES_SAVED_TRAINING?.forms?.[id]===1)training.forms[id]=1;
 NEW_ATLASES[id]={...NEW_ATLASES[s.base]};RARE_STRIKE[id]=RARE_STRIKE[s.base]||2;EVO_BODY_H[id]=EVO_BODY_H[s.base]||104;
 EVO_EXTRA[id]=BLUE_EVO_EXTRA[id];
 if(!GACHA_UBER.some(u=>u.id===id))GACHA_UBER.push({id,name:s.name});
 const b=document.createElement('button');b.id=id+'Btn';b.className='unit-btn '+id+'-btn';b.innerHTML='<i style="background:'+s.color+'"></i><strong>'+s.name+'</strong><small></small><em></em>';b.onclick=()=>addUnit(id);$('.controls').append(b);
}
{
 const st=document.createElement('style');
 st.textContent=Object.entries(BLUE_UBERS).map(([id,s])=>['lime','emerald','acid','spring','aquamarine','sapphire','royalblue','rose','night','fuchsia'].includes(id)?'':`.unit.${id} .dog-sprite{filter:${s.tint}}`).join('');
 document.head.append(st);
}
const _buGrade=gradeOf;
gradeOf=function(t){return BLUE_UBERS[t]?'uber':_buGrade(t)};
const _buCanTrue=canTrueForm,_buHasTrue=hasTrueForm;
canTrueForm=function(t){return !BLUE_UBERS[t]&&_buCanTrue(t)};
hasTrueForm=function(t){return !BLUE_UBERS[t]&&_buHasTrue(t)};
const _buTraining=renderTraining;
renderTraining=function(){_buTraining();for(const card of $('#trainingGrid').children)if(BLUE_UBERS[card.dataset.type])card.querySelector('.true-btn')?.remove()};
// 새 능력 ① 파동 데미지 무효(아쿠아마린): 적 파동 피해를 받지 않는다. launchWave 안에서만 켜지는 표시를 쓴다.
const _buWave=launchWave;
launchWave=function(u,d){game.inWave=true;try{return _buWave.apply(this,arguments)}finally{game.inWave=false}};
// 새 능력 ② 혼신의 일격(사파이어): 확률로 피해가 크게 늘지만 크리티컬과 달리 메탈은 못 뚫는다.
// 새 능력 ③ 움직임을 멈춘다·움직임을 느리게 한다·공격력 다운 무효(로열 블루): 걸린 상태이상을 바로 지운다(원작 클레이G 3형태, 6.3).
const _buDamage=damage;
damage=function(v,amount,from){
 if(v&&v.ally&&game.inWave&&v.stats?.waveImmune)return;
 const sc=from?.ally&&from.stats?.savageChance;
 if(sc&&Math.random()<sc)amount*=from.stats.savageMult||3.5;
 const r=_buDamage.call(this,v,amount,from);
 const im=v?.ally&&v.stats?.immune;
 if(im){
  if(im.freeze)v.freezeUntil=0;
  if(im.slow)v.slowUntil=0;
  if(im.weaken){v.atkDownUntil=0;v.atkDownMult=1}
 }
 return r;
};
// 도감·툴팁 배지
const _buBadges=codexTraitBadges;
codexTraitBadges=function(d){
 const b=_buBadges(d);
 if(d.waveImmune)b.push('파동 데미지 무효');
 if(d.savageChance)b.push(`혼신의 일격 ${Math.round(d.savageChance*100)}% (피해 ×${d.savageMult})`);
 if(d.immune){const n=[d.immune.freeze&&'움직임을 멈춘다',d.immune.slow&&'움직임을 느리게 한다',d.immune.weaken&&'공격력 다운'].filter(Boolean);if(n.length)b.push(n.join('·')+' 무효')}
 return b;
};
renderNewButtons();renderDeckButtons();renderTraining();
if(typeof renderGacha==='function'&&typeof gachaOpen==='function'&&gachaOpen())renderGacha();
