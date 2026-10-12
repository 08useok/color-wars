// 울슈레 70~72: 애시드 · 스프링 · 아쿠마 (v6.2.0). 모두 울트라 슈퍼 레어(뽑기), 여성형, 1진·2진 가격 동일.
// 능력은 원작에서 가져왔다: 영혼 일격(Soulstrike)·좀비 킬러(애시드), 소열파(Mini-Surge, v12.3)(스프링), 회피(Dodge Attack, v8.9)·파동 무효(아쿠마).
// 그림은 아직 전용 모션이 없어 기존 캐릭터 모션 + 색 변경(임시). 전용 모션이 오면 NEW_ATLASES[id]만 바꾸고 아래 색 규칙을 지운다.
const GREEN_UBERS={
 acid:{name:'애시드',color:'#b0bf1a',job:'산업 폐기물 처리 기술자',base:'violet',tint:'hue-rotate(150deg) saturate(1.2) brightness(1.05)',
  hp:42000,atk:15000,interval:3.2,speed:6,range:12,cost:3300,cooldown:38,knockbacks:3,
  extra:{attackClass:'범위',area:true,zombieKiller:true,soulstrike:true,statusVs:['zombie'],atkDownPct:.5,atkDownChance:.6,atkDownDuration:5},
  role:'좀비 킬러 · 영혼 일격 · 좀비 약화',
  text:'산업 폐기물 처리 기술자. 부식성 폐기물을 뿌려 좀비의 힘을 빼고, 쓰러져 되살아나려는 좀비까지 찾아내 영영 일어나지 못하게 만든다.',
  textEvo:'폐기물의 농도가 짙어져 좀비가 거의 항상 약해진다.',evoText:'체력·공격력 +15% · 좀비 약화 100%'},
 spring:{name:'스프링',color:'#00ff7f',job:'묘목원 직원',base:'maple',tint:'hue-rotate(115deg) saturate(1.8) brightness(1.15)',
  hp:36000,atk:12000,interval:3.4,speed:5,range:16,cost:3000,cooldown:36,knockbacks:3,
  extra:{attackClass:'범위',area:true,surge:{start:3,end:13,dur:1.8,tick:.45,mult:.4},slowChance:.5,slowDuration:3},
  role:'범위 · 소열파 · 둔화',
  text:'묘목원 직원. 휘두른 삽 끝에서 어린 덩굴이 솟아 짧은 열파를 일으키고, 휘감긴 적의 걸음을 붙잡는다.',
  textEvo:'덩굴이 더 길고 오래 뻗어 적을 붙든다.',evoText:'체력·공격력 +15% · 열파 지속 +1초 · 둔화 80%'},
 aquamarine:{name:'아쿠마',color:'#7fffd4',job:'래프팅 가이드',base:'teal',tint:'hue-rotate(-25deg) saturate(1.3) brightness(1.5)',
  hp:52000,atk:11000,interval:2.6,speed:14,range:8,cost:3500,cooldown:40,knockbacks:3,
  extra:{attackClass:'범위',area:true,waveImmune:true,dodge:{chance:.3,duration:1},blowChance:.3,blowDistance:8},
  role:'파동 무효 · 회피 · 빠른 범위',
  text:'래프팅 가이드. 거센 물살과 파동에도 휩쓸리지 않고, 날아드는 공격을 노련하게 흘려 내며 노로 적을 밀어낸다.',
  textEvo:'물살을 완전히 읽어 공격을 더 자주 흘려 낸다.',evoText:'체력·공격력 +15% · 회피 45%'}
};
const GREEN_EVO_EXTRA={
 acid:()=>({atkDownChance:1}),
 spring:d=>({surge:{...d.surge,dur:d.surge.dur+1},slowChance:.8}),
 aquamarine:d=>({dodge:{...d.dodge,chance:.45}})
};
for(const [id,s] of Object.entries(GREEN_UBERS)){
 for(const list of [EX_TYPES,EX_GRADE,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(id))list.push(id);
 data.units[id]={hp:Math.round(s.hp/28),atk:Math.round(s.atk/9),interval:s.interval,speed:s.speed,range:s.range,cost:s.cost,cooldown:s.cooldown,knockbacks:s.knockbacks,flatCost:true,noRangeGrow:true,attackDuration:Math.min(.9,s.interval),windup:.4,...s.extra};
 LV20_TARGET[id]={hp:s.hp,atk:s.atk};
 UNIT_NAMES[id]=EX_NAME[id]=s.name;COLORS[id]=s.color;ROLES[id]=s.role;
 PROFILE_TEXT[id]=s.text;PROFILE_TEXT_EVOLVED[id]=s.textEvo;EVOLUTION_TEXT[id]=s.evoText;ACQUIRE_TEXT[id]='뽑기에서 획득';
 const saved=SUBSPECIES_SAVED_TRAINING?.levels?.[id];
 training.levels[id]=Number.isInteger(saved)?Math.max(1,Math.min(LEVEL_HARD_MAX,saved)):1;
 if(SUBSPECIES_SAVED_TRAINING?.forms?.[id]===1)training.forms[id]=1;
 NEW_ATLASES[id]={...NEW_ATLASES[s.base]};RARE_STRIKE[id]=RARE_STRIKE[s.base]||2;EVO_BODY_H[id]=EVO_BODY_H[s.base]||104;
 EVO_EXTRA[id]=GREEN_EVO_EXTRA[id];
 if(!GACHA_UBER.some(u=>u.id===id))GACHA_UBER.push({id,name:s.name});
 const b=document.createElement('button');b.id=id+'Btn';b.className='unit-btn '+id+'-btn';b.innerHTML='<i style="background:'+s.color+'"></i><strong>'+s.name+'</strong><small></small><em></em>';b.onclick=()=>addUnit(id);$('.controls').append(b);
}
{
 const st=document.createElement('style');
 st.textContent=Object.entries(GREEN_UBERS).map(([id,s])=>`.unit.${id} .dog-sprite{filter:${s.tint}}`).join('');
 document.head.append(st);
}
const _guGrade=gradeOf;
gradeOf=function(t){return GREEN_UBERS[t]?'uber':_guGrade(t)};
const _guCanTrue=canTrueForm,_guHasTrue=hasTrueForm;
canTrueForm=function(t){return !GREEN_UBERS[t]&&_guCanTrue(t)};
hasTrueForm=function(t){return !GREEN_UBERS[t]&&_guHasTrue(t)};
const _guTraining=renderTraining;
renderTraining=function(){_guTraining();for(const card of $('#trainingGrid').children)if(GREEN_UBERS[card.dataset.type])card.querySelector('.true-btn')?.remove()};
// 새 능력 ① 영혼 일격: 쓰러져 되살아나길 기다리는 좀비도 사거리 안이면 찾아내 되살아나지 못하게 한다(처치 돈은 그때 받는다).
const _guResolve=resolveAttack;
resolveAttack=function(u,t,share){
 const d=u.stats||data.units[u.type];
 if(u.ally&&d.soulstrike&&game.defeated?.length){
  const dir=-1;
  for(const v of game.defeated){
   if(v.reviveAt===undefined||v.ally)continue;
   const dx=v.x-u.x;
   if(dir*dx>=-1&&Math.abs(dx)<=d.range){
    delete v.reviveAt;
    game.money=Math.min(walletMax(),game.money+Math.round(data.units[v.type].reward*enemyMagnification()*accMult()));
   }
  }
 }
 return _guResolve.apply(this,arguments);
};
// 새 능력 ② 파동 무효(아쿠마): 적 파동 피해를 받지 않는다.
const _guWave=launchWave;
launchWave=function(u,d){game.inWave=true;try{return _guWave.apply(this,arguments)}finally{game.inWave=false}};
// 새 능력 ③ 회피(아쿠마): 속성 있는 적의 공격을 확률로 피하고, 잠깐 같은 공격에 면역(원작 회피 공격).
const _guDamage=damage;
damage=function(v,amount,from){
 if(v&&v.ally&&v.hp>0){
  if(game.inWave&&v.stats?.waveImmune)return;
  const dg=v.stats?.dodge;
  if(dg&&from&&!from.ally){
   if(v.dodgeUntil>game.elapsed)return;
   if(traitsOf(data.units[from.type]||{}).length&&Math.random()<dg.chance){v.dodgeUntil=game.elapsed+dg.duration;return}
  }
 }
 return _guDamage.apply(this,arguments);
};
// 도감·툴팁 배지
const _guBadges=codexTraitBadges;
codexTraitBadges=function(d){
 const b=_guBadges(d);
 if(d.soulstrike)b.push('영혼 일격 (되살아나려는 좀비도 처치)');
 if(d.waveImmune)b.push('파동 무효');
 if(d.dodge)b.push(`회피 ${Math.round(d.dodge.chance*100)}% (${d.dodge.duration}초 면역)`);
 if(d.surge&&d.surge.end-d.surge.start<=12)b.push('소열파');
 return b;
};
renderNewButtons();renderDeckButtons();renderTraining();
if(typeof renderGacha==='function'&&typeof gachaOpen==='function'&&gachaOpen())renderGacha();
