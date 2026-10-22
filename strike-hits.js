// 타격별 능력(연타 중 일부 타격에만 붙는 능력): 능력치의 hits:[{at,share,abilities}]에서 해당 타격에만 abilities(날려버림·둔화 등)를 적용한다.
// 예) 신님(진심)은 3연타 999·999·65,999 중 1·2타에만 날려버림 100%·둔화가 붙고 3타는 순수 피해다.
// hits를 쓰는 기존 캐릭터(abilities가 없는 hits)는 그대로 둔다. 범위(area) 공격은 기존 코드가 타격 비율(share)을 쓰지 않으므로,
// 타격별 능력(abilities)이 하나라도 있거나 strikes:true인 유닛에 한해 모든 타격에 share를 피해에 곱한다.
// 타격이 일어나는 순간 game.js가 u.currentHit에 그 타격({at,share,abilities})을 넣어 준다.
(function(){
 const resolveBefore=resolveAttack;
 resolveAttack=function(u,t,share=1){
  const hit=u.currentHit,s=u.stats;
  const strike=s&&(s.strikes||s.hits?.some(h=>h.abilities));// 타격별 능력이 하나라도 있는 유닛
  if(!hit||!strike)return resolveBefore(u,t,share);
  const keys=Object.keys(hit.abilities||{}),saved={},atk=s.atk;
  try{
   for(const k of keys){saved[k]=s[k];s[k]=hit.abilities[k]}
   if(s.area){s.atk=atk*share;return resolveBefore(u,t,1)}// 범위 공격은 share를 직접 곱한다
   return resolveBefore(u,t,share);
  }finally{
   s.atk=atk;for(const k of keys){if(saved[k]===undefined)delete s[k];else s[k]=saved[k]}
  }
 };
})();
