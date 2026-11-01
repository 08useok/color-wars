// 8.0 엔진: 고대종(ancient) 속성 · 고대의 저주 · 앞으로 워프. game.js와 앞선 추가 파일은 건드리지 않고 damage·statusLands·update·codexTraitBadges를 감싼다.
// 반드시 zombie-completion.js(워프)·strike-hits.js(타격별 능력)·ubers-*.js(damage 감싸기)보다 뒤에 불러서 가장 바깥에서 봉인한다.
//
// 1) 고대종: 속성 이름만 등록하면 기존 strongVs·massiveVs·statusVs 같은 목록이 'ancient'를 그대로 다룬다.
//    '메탈을 뺀 모든 적'으로 표시되는 statusVs 목록(5개 이상, metal 없음)은 고대종도 포함한다(원작의 '전 속성').
// 2) 저주(古代の呪い): 적 능력치 curseChance(확률)·curseDuration(초). 맞은 아군은 cursedUntil까지 속성 대항 능력이 봉인된다.
//    봉인: strongVs·massiveVs·extremeVs·resistVs·redStrong·floatStrong(주는 쪽·받는 쪽 모두), statusVs가 붙은 느리게·멈춤·공격력 다운·표식·공격 주기 증가.
//    봉인 안 함: 파동·열파·크리티컬·공격력 업·살아남는다·날려버림·속성 제한 없는 상태이상·좀비/메탈 킬러 등 캐릭터 자체 능력.
//    걸림은 시간이 겹치지 않고 긴 쪽을 쓰며, 능력치 immune.curse 인 아군은 걸리지 않는다.
// 2-2) 아군이 적에게 거는 저주(모스 3진 등): 아군 능력치 curseChance·curseDuration. statusVs 목록 속성의 적에게만 걸린다(상태이상과 같은 규칙).
//    저주에 걸린 적은 자기 저주(curseChance)와 속성 대항 능력이 봉인된다 — 원작에서 "저주로 고대종의 저주를 무력화"하는 것과 같다. 저주 무효 immune.curse 적은 안 걸린다.
// 3) 앞으로 워프: warpDistance가 음수이면 적 성 쪽으로 보낸다(워프 처리는 zombie-completion.js). 적 성 앞(frontX+1)을 넘지 않게 자른다.
(function(){
 TRAIT_NAMES.ancient='고대종';TRAIT_TARGET.ancient='고대종';
 const SEAL_KEYS=['strongVs','massiveVs','extremeVs','resistVs','redStrong','floatStrong'];
 const STATUS_KEYS=['slowChance','freezeChance','atkDownPct','markChance','intervalUpChance'];
 const cursed=u=>!!u&&u.cursedUntil>game.elapsed;
 function sealedStats(s,ally){
  const c={...s};
  for(const k of SEAL_KEYS)delete c[k];
  if(ally&&s.statusVs?.length){for(const k of STATUS_KEYS)delete c[k];delete c.statusVs}// 상태이상이 들어갈 속성 목록이 지워진다
  if(s.curseChance&&(!ally||s.statusVs?.length)){delete c.curseChance;delete c.curseDuration}// 저주 중에는 자기 저주도 못 건다(속성 제한이 있는 아군 저주 포함)
  return c;
 }
 const damageBefore=damage;
 damage=function(v,amount,from){
  const fromOrig=cursed(from)?from.stats:null,vOrig=cursed(v)?v.stats:null,hpBefore=v?.hp,warpedBefore=v?.warpLeft>0;
  let result;
  try{
   if(fromOrig)from.stats=sealedStats(fromOrig,from.ally);
   if(vOrig)v.stats=sealedStats(vOrig,v.ally);
   result=damageBefore.apply(this,arguments);
  }finally{
   if(fromOrig)from.stats=fromOrig;
   if(vOrig)v.stats=vOrig;
  }
  const fs=fromOrig?sealedStats(fromOrig,from.ally):from?.stats;// 봉인 중인 쪽은 봉인된 능력치로 판정
  // 저주 걸기: 실제로 피해를 입은 대상에게만(넉백 중·워프 중·베리어에 막힘은 제외). 적→아군은 항상, 아군→적은 statusVs 속성만.
  if(fs?.curseChance&&v&&from&&!!from.ally!==!!v.ally&&v.hp>0&&v.hp<hpBefore&&!v.stats?.immune?.curse&&(!from.ally||statusLands({stats:fs},v))&&Math.random()<fs.curseChance){
   v.cursedUntil=Math.max(v.cursedUntil||0,game.elapsed+(fs.curseDuration||0));
  }
  // 앞으로 워프: 도착 지점이 적 성 안쪽으로 들어가지 않게 자른다
  if(fs?.warpDistance<0&&v?.warpLeft>0&&!warpedBefore&&v.warpEnd!==undefined){
   const f=data.bases.enemy.frontX,floor=(Number.isFinite(f)?f:data.bases.enemy.x)+1;
   v.warpEnd=Math.max(floor,v.warpEnd);
  }
  return result;
 };
 // 상태이상 대상: '메탈을 뺀 모든 적' 목록은 고대종도 포함
 statusLands=function(from,v){
  const list=from?.stats?.statusVs;if(!list)return true;
  const all=list.length>=5&&!list.includes('metal');
  return traitsOf(data.units[v.type]).some(t=>list.includes(t)||(all&&t==='ancient'));
 };
 // 화면 표시: 저주 중인 아군에 상태 아이콘(封)과 초록 테두리
 try{
  const css=document.createElement('style');
  css.textContent='.curse-icon{background:radial-gradient(circle,#5b2f86,#2a1044);border:1px solid #9be564;border-radius:50%;color:#d9ff9e;font:700 10px/14px sans-serif;text-align:center}.curse-icon::after{content:"封"}.unit.cursed .st-curse{display:inline-block;animation:statusPop .6s ease-out}.unit.cursed .bar{outline:1px solid #8be04e}';
  document.head.append(css);
 }catch{}
 const updateBefore=update;
 update=function(dt){
  const r=updateBefore.apply(this,arguments);
  for(const u of game?.units||[]){
   if(!u.el)continue;
   const on=u.cursedUntil>game.elapsed;
   if(on!==!!u.cursedOn){
    u.cursedOn=on;u.el.classList.toggle('cursed',on);
    if(on){const badges=u.el.querySelector?.('.status-badges');if(badges&&!badges.querySelector?.('.st-curse')){const i=document.createElement('span');i.className='curse-icon st-curse';badges.append(i)}}
   }
  }
  return r;
 };
 // 도감 배지: "저주 100% · 10초"
 if(typeof codexTraitBadges==='function'){
  const badgesBefore=codexTraitBadges;
  codexTraitBadges=function(d){const b=badgesBefore.apply(this,arguments);if(d.curseChance)b.push(`고대의 저주 ${Math.round(d.curseChance*100)}% · ${Math.round(d.curseDuration*100)/100}초`);return b};
 }
})();
