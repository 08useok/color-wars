// 울슈레 터콰이즈 (v6.3.x, 워터즈): 서핑 강사. 새 능력 '회피'(Dodge) — 공격을 받으면 확률로 잠깐 모든 피해를 무효로 한다(원작 회피 공격).
// 1진·2진 같은 가격(울슈레 규칙). 그림은 임시(코랄 + 색 규칙). 성별은 임시로 여성.
const TURQUOISE={
 turquoise:{name:'터콰이즈',color:'#40e0d0',job:'서핑 강사',base:'coral',tint:'hue-rotate(-20deg) saturate(1.5) brightness(1.2)',
  hp:36000,atk:7000,interval:2.8,speed:8,range:7,cost:3800,cooldown:50,knockbacks:3,
  extra:{attackClass:'범위',area:true,blowChance:.25,blowDistance:8,dodge:{chance:.3,duration:2.5}},
  role:'회피 · 범위 · 밀치기',
  text:'서핑 강사. 밀려오는 파도를 타듯 적의 공격을 스치며 흘려보내고, 보드로 후려쳐 적을 멀리 밀어낸다.',
  textEvo:'파도의 결을 완전히 읽어 공격이 닿기도 전에 몸을 돌린다.',evoText:'체력·공격력 +15% · 회피 40%'}
};
const TURQUOISE_EVO_EXTRA={turquoise:d=>({dodge:{...d.dodge,chance:.4}})};
for(const [id,s] of Object.entries(TURQUOISE)){
 for(const list of [EX_TYPES,EX_GRADE,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(id))list.push(id);
 data.units[id]={hp:Math.round(s.hp/28),atk:Math.round(s.atk/9),interval:s.interval,speed:s.speed,range:s.range,cost:s.cost,cooldown:s.cooldown,knockbacks:s.knockbacks,flatCost:true,noRangeGrow:true,attackDuration:Math.min(.9,s.interval),windup:.4,...s.extra};
 LV20_TARGET[id]={hp:s.hp,atk:s.atk};
 UNIT_NAMES[id]=EX_NAME[id]=s.name;COLORS[id]=s.color;ROLES[id]=s.role;
 PROFILE_TEXT[id]=s.text;PROFILE_TEXT_EVOLVED[id]=s.textEvo;EVOLUTION_TEXT[id]=s.evoText;ACQUIRE_TEXT[id]='뽑기에서 획득';
 const saved=SUBSPECIES_SAVED_TRAINING?.levels?.[id];
 training.levels[id]=Number.isInteger(saved)?Math.max(1,Math.min(LEVEL_HARD_MAX,saved)):1;
 if(SUBSPECIES_SAVED_TRAINING?.forms?.[id]===1)training.forms[id]=1;
 NEW_ATLASES[id]={...NEW_ATLASES[s.base]};RARE_STRIKE[id]=RARE_STRIKE[s.base]||2;EVO_BODY_H[id]=EVO_BODY_H[s.base]||104;
 EVO_EXTRA[id]=TURQUOISE_EVO_EXTRA[id];
 if(!GACHA_UBER.some(u=>u.id===id))GACHA_UBER.push({id,name:s.name});
 const b=document.createElement('button');b.id=id+'Btn';b.className='unit-btn '+id+'-btn';b.innerHTML='<i style="background:'+s.color+'"></i><strong>'+s.name+'</strong><small></small><em></em>';b.onclick=()=>addUnit(id);$('.controls').append(b);
}
{
 const st=document.createElement('style');
 st.textContent=Object.entries(TURQUOISE).map(([id,s])=>`.unit.${id} .dog-sprite{filter:${s.tint}}`).join('')+'.unit.dodging{opacity:.45}';
 document.head.append(st);
}
const _tqGrade=gradeOf;
gradeOf=function(t){return TURQUOISE[t]?'uber':_tqGrade(t)};
const _tqCanTrue=canTrueForm,_tqHasTrue=hasTrueForm;
canTrueForm=function(t){return !TURQUOISE[t]&&_tqCanTrue(t)};
hasTrueForm=function(t){return !TURQUOISE[t]&&_tqHasTrue(t)};
const _tqTraining=renderTraining;
renderTraining=function(){_tqTraining();for(const card of $('#trainingGrid').children)if(TURQUOISE[card.dataset.type])card.querySelector('.true-btn')?.remove()};
// 새 능력 회피: 공격(파동·열파 포함)을 받는 순간 확률로 일정 시간 모든 피해를 무효로 한다. 무효가 된 공격은 넉백도 없다.
const _tqDamage=damage;
damage=function(v,amount,from){
 const dd=v&&v.ally&&v.hp>0?v.stats?.dodge:null;
 if(dd){
  if(v.dodgeUntil>game.elapsed)return;
  if(from&&!from.ally&&Math.random()<dd.chance){v.dodgeUntil=game.elapsed+dd.duration;return}
 }
 return _tqDamage.apply(this,arguments);
};
const _tqUpdate=update;
update=function(dt){
 _tqUpdate.apply(this,arguments);
 if(game&&game.units)for(const u of game.units)if(u.ally&&u.stats?.dodge&&u.el)u.el.classList.toggle('dodging',u.dodgeUntil>game.elapsed);
};
// 도감·툴팁 배지
const _tqBadges=codexTraitBadges;
codexTraitBadges=function(d){
 const b=_tqBadges(d);
 if(d.dodge)b.push(`회피 ${Math.round(d.dodge.chance*100)}% (공격을 받으면 ${d.dodge.duration}초간 모든 피해 무효)`);
 return b;
};
renderNewButtons();renderDeckButtons();renderTraining();
if(typeof renderGacha==='function'&&typeof gachaOpen==='function'&&gachaOpen())renderGacha();
