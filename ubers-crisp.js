// v6.9.0 · 복싱즈 · 크리스프(남성, 24세). Lv.30·보물 완성 2진 공체 목표: 180,000 / 6,000×2.
const CRISP={crisp:{name:'크리스프',color:'#850800',hp:44720.5,atk:2981.4,interval:1.6,speed:8,range:8,cost:2400,cooldown:31,knockbacks:2,
 extra:{area:true,attackClass:'범위',resistVs:['red'],savageChance:.3,savageMult:3,windup:.2,attackDuration:.8,hits:[{at:.2,share:.5},{at:.5,share:.5}]}}};
for(const [id,s] of Object.entries(CRISP)){
 for(const list of [EX_TYPES,EX_GRADE,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(id))list.push(id);
 data.units[id]={hp:Math.round(s.hp/28),atk:Math.round(s.atk/9),interval:s.interval,speed:s.speed,range:s.range,cost:s.cost,cooldown:s.cooldown,knockbacks:s.knockbacks,flatCost:true,noRangeGrow:true,...s.extra};
 LV20_TARGET[id]={hp:s.hp,atk:s.atk};UNIT_NAMES[id]=EX_NAME[id]=s.name;COLORS[id]=s.color;
 ROLES[id]='근거리 범위 딜탱 · 빨간 적 맷집 · 혼신의 일격';
 PROFILE_TEXT[id]='복싱즈의 복서. 남성, 24세. 짧은 거리에서 잽과 스트레이트를 이어 친다. 빨간 적에게 맷집이 좋고, 각 타격은 30% 확률로 3배 피해를 주는 혼신의 일격이 된다. 다른 속성의 적과 긴 사거리의 공격에는 지원이 필요하다.';
 PROFILE_TEXT_EVOLVED[id]='헤드밴드와 복싱 유니폼을 갖춘 크리스프. 체력과 공격력이 15% 늘어난다. 두 번의 범위 타격으로 빨간 적의 접근을 받아내며 반격한다.';
 EVOLUTION_TEXT[id]='체력·공격력 +15%';ACQUIRE_TEXT[id]='복싱즈 · 뽑기로 획득';
 const saved=SUBSPECIES_SAVED_TRAINING?.levels?.[id];training.levels[id]=Number.isInteger(saved)?Math.max(1,Math.min(LEVEL_HARD_MAX,saved)):1;
 if(SUBSPECIES_SAVED_TRAINING?.forms?.[id]===1)training.forms[id]=1;
 NEW_ATLASES[id]={...CRISP_MOTION_ATLASES.crisp_1,evolved:{...CRISP_MOTION_ATLASES.crisp_2}};
 for(const a of [NEW_ATLASES[id],NEW_ATLASES[id].evolved])a.attackKeys=[[0,0],[6,1],[9,2],[15,3],[18,4],[22,5]];
 PROFILE_ART[id]=['assets/crisp-motion/crisp_1-profile.webp','assets/crisp-motion/crisp_2-profile.webp'];RARE_STRIKE[id]=1;EVO_BODY_H[id]=104;
 if(!GACHA_UBER.some(u=>u.id===id))GACHA_UBER.push({id,name:s.name});
 const b=document.createElement('button');b.id=id+'Btn';b.className='unit-btn '+id+'-btn';b.innerHTML='<i style="background:'+s.color+'"></i><strong>'+s.name+'</strong><small></small><em></em>';b.onclick=()=>addUnit(id);$('.controls').append(b);
}
(function(){
 const grade=gradeOf;gradeOf=function(t){return t==='crisp'?'uber':grade(t)};
 // The legacy area branch ignores hit shares. Apply the two half-strength strikes only to Crisp.
 const resolve=resolveAttack;resolveAttack=function(u,t,share=1){if(u.type!=='crisp'||!u.stats?.area)return resolve(u,t,share);const s=u.stats,atk=s.atk;try{s.atk=atk*share;return resolve(u,t,1)}finally{s.atk=atk}};
})();
renderNewButtons();renderDeckButtons();renderTraining();
