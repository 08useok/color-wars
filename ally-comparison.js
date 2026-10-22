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
 for(const trait of ['red','floating','black','angel','alien','zombie','metal']){
  const target={traits:[trait]},multipliers=traitMult(s,target);
  let dealt=multipliers[0],taken=(s.armor||1)*multipliers[1];
  if(s.redStrong&&trait==='red'){const p=s.treasureEligible?fruitTreasurePower(target,['red']):0;dealt*=(s.redDamage||1.5)*(1+.2*p);taken*=(s.redResist||.5)*(1-.2*p)}
  if(s.floatStrong&&trait==='floating'){const p=s.treasureEligible?fruitTreasurePower(target,['floating']):0;dealt*=(s.floatDamage||1.5)*(1+.2*p);taken*=(s.floatResist||.5)*(1-.2*p)}
  traits[trait]={dps:maximum*dealt,effectiveHp:s.hp/taken};
 }
 return {directDps:direct,minimumTierDps:tiers?Math.min(...tiers):direct,maximumDps:maximum,returnDps,waveDps:wave,surgeDps:surge,expectedCritMultiplier:crit,dpsPer1000:maximum/s.cost*1000,effectiveHp:s.hp/(s.armor||1),traits};
}
function allyMaximumHit(s){
 // One direct hit on one target, without external marks or enemy damage reduction.
 const reach=s.zoneMax??s.range;
 let direct=s.atk,conditions=[];
 if(s.damageTiers?.length){
  let from=0;const reachable=[];
  for(const tier of s.damageTiers){if(from===0||from<reach)reachable.push(tier.dmg);from=tier.max}
  direct=Math.max(...reachable);conditions.push('최고 피해 거리 구간');
 }
 if(s.pierce&&s.pierceGrowth>1){
  const count=Math.min(Number.isFinite(s.pierce)?s.pierce-1:Infinity,s.pierceGrowthCap??Infinity);
  if(!Number.isFinite(count))return {damage:Infinity,conditions:['관통 성장 상한 없음']};
  direct*=Math.pow(s.pierceGrowth,count);conditions.push('가까운 순서로 '+(count+1)+'번째 관통 대상');
 }
 let best={mult:1,trait:null};
 for(const trait of Object.keys(TRAIT_TARGET)){
  const target={traits:[trait]};let mult=traitMult(s,target)[0];
  if(s.redStrong&&trait==='red')mult*=(s.redDamage||1.5)*(1+.2*(s.treasureEligible?fruitTreasurePower(target,['red']):0));
  if(s.floatStrong&&trait==='floating')mult*=(s.floatDamage||1.5)*(1+.2*(s.treasureEligible?fruitTreasurePower(target,['floating']):0));
  if(mult>best.mult)best={mult,trait};
 }
 direct*=best.mult;if(best.trait)conditions.push(TRAIT_TARGET[best.trait]+' 상대');
 if(s.critChance){direct*=s.critMult||2;conditions.push('크리티컬 발동')}
 if(s.rage){direct*=1+s.rage;conditions.push('분노 발동')}
 if(s.strengthen){direct*=s.strengthen.mult;conditions.push('공격력 업 발동')}
 if(s.bossDamage||s.pull){direct*=(s.bossDamage||1)*(s.pull?1.3:1);conditions.push('보스 상대')}
 if(s.boomerang&&s.returnMult>1){direct*=s.returnMult;conditions.push('돌아오는 공격')}
 if(s.hits?.length){direct*=Math.max(...s.hits.map(h=>h.share??1));conditions.push('연속 공격 중 가장 강한 1타')}
 return {damage:direct,conditions};
}
function allyDamageRecord(type,s){
 if(!s.evolved||allyMaximumHit(s).damage<=300000)return '';
 const number=value=>typeof codexHighStat==='function'?codexHighStat(value,'damage'):Math.round(value).toLocaleString('ko-KR');
 const scope='전체 2진·출시된 3진을 Lv.30·보물 완성으로 비교했을 때';
 if(type==='prism'&&!s.trueForm)return `<p><b>${scope}, 속성 특화·크리티컬·관통 성장 없이 일반 직접 1타 데미지가 가장 높은 캐릭터다.</b> 현재 도감 기준 한 대상에게 ${number(s.atk)} 피해를 준다. 공격 주기를 반영한 DPS 순위와는 다르다.</p>`;
 if(type==='amber'&&!s.trueForm){const peak=allyMaximumHit({...s,critChance:0,pierceGrowth:1,rage:0,strengthen:null,bossDamage:0,pull:false});return `<p>현재 출시된 캐릭터 중 떠 있는 적한테 적용한 단일 데미지가 가장 높은 캐릭터다. 무려 <b>${number(peak.damage)}</b> 피해를 준다.</p>`}
 if(type==='raspberry'&&s.trueForm){const peak=allyMaximumHit(s);return `<p><b>${scope}, 조건부 직접 1타 최고 데미지 기록을 가진 캐릭터다.</b> 현재 도감 기준 ${number(peak.damage)}이며, 최고 피해 거리 구간·가까운 순서로 21번째 관통 대상·에이리언·크리티컬이 모두 필요하다. 적 한 마리를 평범하게 공격할 때부터 이 피해가 나오는 것은 아니다.</p>`}
 return '';
}
function allyComparisonText(s){
 const m=allyComparisonMetrics(s),n=v=>Math.round(v).toLocaleString('ko-KR');
 const specialized=Object.entries(m.traits).filter(([trait,v])=>v.dps>m.maximumDps*1.01);
 let text=specialized.length?`무속성 기준 DPS는 <b>${n(m.maximumDps)}</b>이지만, ${specialized.map(([trait,v])=>`${TRAIT_TARGET[trait]||trait} 상대일 때는 <b>${n(v.dps)}</b>`).join(', ')}이다. `:`무속성 기준 DPS는 <b>${n(m.maximumDps)}</b>이다. `;
 if(s.boomerang)text+=`편도만 맞으면 ${n(m.directDps)}이며, 돌아오는 공격까지 맞혀야 위 화력을 낸다. `;
 if(s.damageTiers)text+=`거리별 직접 DPS는 ${n(m.minimumTierDps)}~${n(m.directDps)}로 달라지며, 위 수치는 가장 유리한 거리와 크리티컬 기대값을 반영한다. `;
 if(s.wave||s.surge)text+='위 수치는 직접 공격과 추가 공격을 모두 맞히는 상한이며, 넉백이나 위치 이탈로 실제 피해가 줄어들 수 있다. ';
 else if(s.critChance)text+='크리티컬은 확률에 따른 평균값으로 반영했다. ';
 if(s.pull)text+=`보스에게 끌어오기는 통하지 않지만 피해는 30% 증가해 약 <b>${n(s.atk*1.3)}</b>(기본 데미지 ×1.3)이 들어간다. `;
 if(s.blindSpot&&!s.engageRange&&(s.zoneMin??s.range*.25)>0)text+='긴 사거리 안쪽의 사각지대는 고방으로 보호해야 한다. ';
 const peak=allyMaximumHit(s),peakNumber=typeof codexHighStat==='function'?codexHighStat(peak.damage,'damage'):n(peak.damage);
 if(peak.damage>300000)text+=`<br><b>최고 데미지(한 대상·직접 1타): ${peakNumber}</b>${peak.conditions.length?' — '+peak.conditions.join(' + '):''}. `;
 return text;
}
