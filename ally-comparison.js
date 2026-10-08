// Sustained, uninterrupted theoretical damage against one stationary target.
// Match resolveAttack branch order: area/pierce/dash take precedence over multiHit.
function allyComparisonMetrics(s){
 const chain=!s.area&&!s.pierce&&!s.dash&&!s.projectile&&!s.boomerang?(s.multiHit||1):1;
 const crit=1+(s.critChance||0)*((s.critMult||2)-1);
 const base=s.atk/s.interval,tiers=s.damageTiers?.map(t=>t.dmg/s.interval);
 const direct=(tiers?Math.max(...tiers):base)*chain;
 const returnDps=s.boomerang?base*(s.returnMult||1):0;
 const wave=s.wave?base*s.wave.chance*(s.wave.mult||1):0;
 const surge=s.surge?base*Math.ceil(s.surge.dur/s.surge.tick)*s.surge.mult:0;
 const maximum=(direct+returnDps+wave+surge)*crit;
 const traits={};
 for(const trait of ['red','floating','black','angel','alien']){
  let dealt=1,taken=s.armor||1;
  if(s.massiveVs?.includes(trait))dealt*=3;
  if(s.extremeVs?.includes(trait))dealt*=5;
  if(s.strongVs?.includes(trait)){dealt*=1.8;taken*=.5;}
  if(s.resistVs?.includes(trait))taken*=s.resistMult||.25;
  if(s.redStrong&&trait==='red'){dealt*=s.redDamage||1.5;taken*=s.redResist||.5;}
  if(s.floatStrong&&trait==='floating'){dealt*=s.floatDamage||1.5;taken*=s.floatResist||.5;}
  traits[trait]={dps:maximum*dealt,effectiveHp:s.hp/taken};
 }
 return {directDps:direct,minimumTierDps:tiers?Math.min(...tiers):direct,maximumDps:maximum,returnDps,waveDps:wave,surgeDps:surge,expectedCritMultiplier:crit,dpsPer1000:maximum/s.cost*1000,effectiveHp:s.hp/(s.armor||1),traits};
}
function allyComparisonText(s){
 const m=allyComparisonMetrics(s),n=v=>Math.round(v).toLocaleString('ko-KR');
 let text=`무속성 적 한 마리에게 모든 공격이 적중할 때 이론 DPS는 <b>${n(m.maximumDps)}</b>이다. `;
 if(s.boomerang)text+=`편도만 맞으면 ${n(m.directDps)}이며, 돌아오는 공격까지 맞혀야 위 화력을 낸다. `;
 if(s.damageTiers)text+=`거리별 직접 DPS는 ${n(m.minimumTierDps)}~${n(m.directDps)}로 달라지며, 위 수치는 가장 유리한 거리와 치명타 기대값을 반영한다. `;
 if(s.wave||s.surge)text+='위 수치는 직접 공격과 추가 공격을 모두 맞히는 상한이며, 넉백이나 위치 이탈로 실제 피해가 줄어들 수 있다. ';
 else if(s.critChance)text+='치명타는 확률에 따른 평균값으로 반영했다. ';
 const best=Object.entries(m.traits).sort((a,b)=>b[1].dps-a[1].dps)[0];
 if(best&&best[1].dps>m.maximumDps*1.01)text+=`${TRAIT_TARGET[best[0]]||best[0]}에게는 약 ${n(best[1].dps)} DPS를 기대할 수 있다. `;
 if(s.pull)text+='보스에게 끌어오기는 통하지 않지만 피해는 30% 증가한다. ';
 if(s.range>=25&&!s.engageRange&&s.attackClass!=='범위')text+='긴 사거리 안쪽의 사각지대는 고방으로 보호해야 한다. ';
 return text+'범위 공격의 다수 적 피해와 메즈·획득 시기는 별도로 평가해야 하므로 DPS만으로 전체 순위를 정하지 않는다.';
}
