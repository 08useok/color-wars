// 울슈레 68~71 초록 계열: 라임 · 에메 · 애시드 · 스프링 (v6.2.0). 모두 울트라 슈퍼 레어(뽑기), 1진·2진 가격 동일.
// 라임·에메는 남성형, 애시드·스프링은 여성형. 능력은 원작에서 가져왔다:
// 라임 = 폭발(Explosion, v13.7), 에메 = 메탈 킬러(Metal Killer, v13.3) + 크리티컬,
// 애시드 = 좀비 킬러 + 영혼 일격(Soulstrike), 스프링 = 소열파(Mini-Surge, v12.3).
// 전용 모션은 new-colors-motion-atlases.js에서 연결한다. 미연결 캐릭터만 임시 색 규칙을 쓴다.
const GREEN_UBERS={
 lime:{name:'라임',color:'#bfff00',job:'주스 가게 직원',base:'korn',tint:'hue-rotate(15deg) saturate(1.5) brightness(1.05)',
  hp:38000,atk:13000,interval:3.2,speed:5,range:14,cost:3200,cooldown:38,knockbacks:3,
  extra:{attackClass:'범위',area:true,explosion:{radius:9,mult:.7},atkDownPct:.5,atkDownChance:.4,atkDownDuration:4},
  role:'범위 · 폭발 · 약화',
  text:'주스 가게 직원. 짜낸 과즙이 터지면 주변 적까지 함께 쓸리고, 눈이 따가운 적은 힘이 빠진다.',
  textEvo:'과즙이 더 세게 터져 더 넓게 번진다.',evoText:'체력·공격력 +15% · 폭발 범위 +30% · 약화 70%'},
 emerald:{name:'에메',color:'#50c878',job:'보석 세공사',base:'brick',tint:'hue-rotate(95deg) saturate(1.1) brightness(1.2)',
  hp:40000,atk:24000,interval:4,speed:5,range:16,cost:3800,cooldown:42,knockbacks:3,
  extra:{attackClass:'개체',metalKiller:.25,critChance:.3,critMult:2},
  role:'정밀 단일 · 메탈 킬러 · 크리티컬',
  text:'보석 세공사. 가장 단단한 곳을 정확히 찾아 깎아 내며, 메탈 적은 한 번에 체력의 일부를 도려낸다.',
  textEvo:'눈이 더 정밀해져 치명타가 더 자주 터진다.',evoText:'체력·공격력 +15% · 치명타 45% · 메탈 킬러 35%'},
 acid:{name:'애시드',color:'#b0bf1a',job:'산업 폐기물 처리 기술자',base:'violet',tint:'hue-rotate(150deg) saturate(1.2) brightness(1.05)',
  hp:42000,atk:15000,interval:3.2,speed:6,range:12,cost:3300,cooldown:38,knockbacks:3,
  extra:{attackClass:'범위',area:true,zombieKiller:true,soulstrike:true,statusVs:['zombie'],atkDownPct:.5,atkDownChance:.6,atkDownDuration:5},
  role:'좀비 킬러 · 영혼 일격 · 좀비 약화',
  text:'산업 폐기물 처리 기술자. 부식성 폐기물을 뿌려 좀비의 힘을 빼고, 쓰러져 되살아나려는 좀비까지 찾아내 영영 일어나지 못하게 만든다.',
  textEvo:'폐기물의 농도가 짙어져 좀비가 거의 항상 약해진다.',evoText:'체력·공격력 +15% · 좀비 약화 100%'},
 spring:{name:'스프링',color:'#00ff7f',job:'묘목원 직원',base:'maple',tint:'hue-rotate(115deg) saturate(1.8) brightness(1.15)',
  hp:36000,atk:12000,interval:3.4,speed:5,range:16,cost:4500,cooldown:36,knockbacks:3,
  extra:{attackClass:'범위',area:true,surge:{start:3,end:13,dur:1.8,tick:.45,mult:.4},slowChance:.5,slowDuration:3},
  role:'범위 · 소열파 · 둔화',
  text:'묘목원 직원. 휘두른 삽 끝에서 어린 덩굴이 솟아 짧은 열파를 일으키고, 휘감긴 적의 걸음을 붙잡는다.',
  textEvo:'덩굴이 더 길고 오래 뻗어 적을 붙든다.',evoText:'체력·공격력 +15% · 열파 지속 +1초 · 둔화 80%'}
};
const GREEN_EVO_EXTRA={
 lime:d=>({explosion:{...d.explosion,radius:d.explosion.radius*1.3},atkDownChance:.7}),
 emerald:d=>({critChance:.45,metalKiller:.35}),
 acid:()=>({atkDownChance:1}),
 spring:d=>({surge:{...d.surge,dur:d.surge.dur+1},slowChance:.8})
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
 st.textContent=Object.entries(GREEN_UBERS).map(([id,s])=>['lime','emerald','acid','spring','aquamarine','sapphire','royalblue','rose'].includes(id)?'':`.unit.${id} .dog-sprite{filter:${s.tint}}`).join('');
 document.head.append(st);
}
const _guGrade=gradeOf;
gradeOf=function(t){return GREEN_UBERS[t]?'uber':_guGrade(t)};
const _guCanTrue=canTrueForm,_guHasTrue=hasTrueForm;
canTrueForm=function(t){return !GREEN_UBERS[t]&&_guCanTrue(t)};
hasTrueForm=function(t){return !GREEN_UBERS[t]&&_guHasTrue(t)};
const _guTraining=renderTraining;
renderTraining=function(){_guTraining();for(const card of $('#trainingGrid').children)if(GREEN_UBERS[card.dataset.type])card.querySelector('.true-btn')?.remove()};
// 새 능력 ① 영혼 일격(애시드): 쓰러져 되살아나길 기다리는 좀비도 사거리 안이면 찾아내 되살아나지 못하게 한다(처치 돈은 그때 받는다).
// 새 능력 ② 폭발(라임): 공격이 맞은 자리를 중심으로 주변 적에게 번지는 추가 피해(원작 폭발, 맞은 자리에서 좌우로 퍼짐).
const _guResolve=resolveAttack;
resolveAttack=function(u,t,share){
 const d=u.stats||data.units[u.type];
 if(u.ally&&d.soulstrike&&game.defeated?.length){
  for(const v of game.defeated){
   if(v.reviveAt===undefined||v.ally)continue;
   const dx=v.x-u.x;
   if(-dx>=-1&&Math.abs(dx)<=d.range){
    delete v.reviveAt;
    game.money=Math.min(walletMax(),game.money+Math.round(data.units[v.type].reward*enemyMagnification()*accMult()));
   }
  }
 }
 let centre=null;
 if(u.ally&&d.explosion){
  const first=game.units.filter(v=>v.hp>0&&v.kbTime<=0&&!v.emerging&&!v.ally&&-(v.x-u.x)>=-1&&Math.abs(v.x-u.x)<=d.range).sort((a,b)=>Math.abs(a.x-u.x)-Math.abs(b.x-u.x))[0];
  if(first)centre=first.x;
 }
 const r=_guResolve.apply(this,arguments);
 if(centre!==null&&!game.ended){
  const R=d.explosion.radius,already=v=>-(v.x-u.x)>=-1&&Math.abs(v.x-u.x)<=d.range&&d.area;
  for(const v of [...game.units]){
   if(v.hp<=0||v.kbTime>0||v.ally||v.emerging||already(v))continue;
   if(Math.abs(v.x-centre)<=R)damage(v,d.atk*d.explosion.mult,u);
  }
 }
 return r;
};
// 새 능력 ③ 메탈 킬러(에메): 메탈 적에게 현재 체력의 일부를 한 번에 깎는다(원래는 메탈에 1 피해).
const _guDamage=damage;
damage=function(v,amount,from){
 const mk=from?.stats?.metalKiller;
 if(mk&&v&&v.hp>0&&!v.ally&&hasTrait(data.units[v.type],'metal')){
  const dd=data.units[v.type],saved={trait:dd.trait,traits:dd.traits};
  const rest=traitsOf(dd).filter(t=>t!=='metal');
  delete dd.trait;dd.traits=rest;
  try{return _guDamage.call(this,v,Math.max(amount,Math.ceil(v.hp*mk)),from)}
  finally{if(saved.trait!==undefined)dd.trait=saved.trait;else delete dd.trait;if(saved.traits!==undefined)dd.traits=saved.traits;else delete dd.traits}
 }
 return _guDamage.apply(this,arguments);
};
// 도감·툴팁 배지
const _guBadges=codexTraitBadges;
codexTraitBadges=function(d){
 const b=_guBadges(d);
 if(d.soulstrike)b.push('영혼 일격 (되살아나려는 좀비도 처치)');
 if(d.explosion)b.push('폭발 (맞은 자리 주변 적에게 번짐)');
 if(d.metalKiller)b.push(`메탈 킬러 (메탈 적 현재 체력의 ${Math.round(d.metalKiller*100)}%)`);
 if(d.surge&&d.surge.end-d.surge.start<=12)b.push('소열파');
 return b;
};
renderNewButtons();renderDeckButtons();renderTraining();
if(typeof renderGacha==='function'&&typeof gachaOpen==='function'&&gachaOpen())renderGacha();
