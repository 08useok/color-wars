// One display basis for the stats table, every ally review and every selectable form.
// Presentation only: do not change levels, forms, treasures, combat damage or saves.
const CODEX_REVIEW_LEVEL=30;
function codexReviewStats(type,evolved){
 const previous=selectedStage;
 try{selectedStage=CHAPTER1_LEN;return {...unitStats(type,CODEX_REVIEW_LEVEL-(typeof plusLevel==='function'?plusLevel(type):0),evolved?2:1),codexCharacter:type}}finally{selectedStage=previous}
}
function codexDirectPackets(s){
 const reach=s.zoneMax??s.range,min=s.zoneMin??0;
 let base=s.atk;
 if(s.damageTiers?.length){let from=0;const valid=[];for(const tier of s.damageTiers){if(from<reach&&tier.max>=min)valid.push(tier.dmg);from=tier.max;}base=valid.length?Math.max(...valid):s.atk;}
 if(s.boomerang)return [base,base*(s.returnMult||1)];
 if(s.projectile)return [base];
 const hits=s.hits?.length?s.hits:[{share:1}],packets=[];
 // Crisp and true Coral apply shares in their dedicated resolveAttack wrappers.
 const strikes=s.strikes||s.hits?.some(h=>h.abilities)||s.codexCharacter==='crisp'||s.codexCharacter==='coral'&&s.trueForm;
 for(const hit of hits){
  if(s.area){packets.push(base*(strikes?(hit.share??1):1));continue;}
  if(s.pierce||s.dash){packets.push(base);continue;}
  if(s.multiHit){for(let i=0;i<s.multiHit;i++)packets.push(base);continue;}
  packets.push(base*(hit.share??1));
 }
 return packets;
}
function codexTraitDamageMultiplier(s,trait){
 const target={traits:[trait]};let mult=traitMult(s,target)[0];
 if(s.redStrong&&trait==='red')mult*=(s.redDamage||1.5)*(1+.2*(s.treasureEligible?fruitTreasurePower(target,['red']):0));
 if(s.floatStrong&&trait==='floating')mult*=(s.floatDamage||1.5)*(1+.2*(s.treasureEligible?fruitTreasurePower(target,['floating']):0));
 return mult;
}
function codexDirectMetrics(s){
 const packets=codexDirectPackets(s),cycle=packets.reduce((a,b)=>a+b,0),chance=s.critChance||0,crit=s.critMult||2;
 const savage=1+(s.savageChance||0)*((s.savageMult||3.5)-1);
 const direct=cycle/s.interval,expected=direct*(1+chance*(crit-1))*savage,traits={};
 for(const trait of ['red','floating','black','angel','alien','zombie','metal']){
  const mult=codexTraitDamageMultiplier(s,trait);
  traits[trait]={dps:s.onlyTraitless?0:trait==='metal'?(s.metalKiller?null:packets.reduce((n,hit)=>n+(1-chance)+chance*hit*mult*crit*savage,0)/s.interval):expected*mult};
 }
 return {packets,directDps:direct,expectedDps:expected,traits};
}
// Keep callers of the shared comparison helper from treating metal's trait multiplier as real damage.
const codexComparisonBefore=allyComparisonMetrics;
allyComparisonMetrics=function(s){const m=codexComparisonBefore(s),direct=codexDirectMetrics(s);m.traits.metal.dps=direct.traits.metal.dps;m.traits.metal.directOnly=true;return m};
const codexReviewNumber=n=>Number(n).toLocaleString('ko-KR',{maximumFractionDigits:2});
const codexReviewEscape=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function codexReviewBasis(s){return '표·총평 공통: 합산 Lv.30 (기본 레벨 + 추가 레벨 합계 고정) · '+(s.trueForm?'3진':s.evolved?'2진':'1진')+' · 현재 보물 반영 (세계편 '+chapterBonusCount()+'장·미래편 '+futureTreasureCount()+'장·우주편 보물 '+cosmosTreasureCount()+'장분) · 세계편 2·3장 가격 · 덱 콤보·전투 중 강화 제외 · 사거리는 게임 내 단위';}
function codexReviewAbilities(s){
 const n=codexReviewNumber,p=x=>n(x*100)+'%',names=list=>list.map(t=>TRAIT_TARGET[t]||t).join('·'),a=[];
 const target=s.statusVs?.length?names(s.statusVs):'속성 제한 없는 적';
 if(s.massiveVs?.length)a.push(names(s.massiveVs)+'에게 초데미지. 일반 범위 타격과 별개이며 목록에 없는 속성에는 이 배율이 적용되지 않습니다.');
 if(s.extremeVs?.length)a.push(names(s.extremeVs)+'에게 극데미지를 줍니다.');
 if(s.strongVs?.length)a.push(names(s.strongVs)+'에게 주는 피해가 늘고 받는 피해가 줄어듭니다.');
 if(s.resistVs?.length)a.push(names(s.resistVs)+'에게 받는 피해를 줄입니다. 보물 반영 전 받는 피해 배율은 '+n(s.resistMult||.25)+'배입니다.');
 if(s.redStrong)a.push('빨간 적에게 강합니다.');if(s.floatStrong)a.push('떠있는 적에게 강합니다.');
 if(s.freezeChance)a.push(target+'을 '+p(s.freezeChance)+' 확률로 기본 '+n(s.freezeDuration)+'초 멈춥니다.');
 if(s.slowChance)a.push(target+'을 '+p(s.slowChance)+' 확률로 기본 '+n(s.slowDuration)+'초 느리게 합니다. 느리게는 이동 속도를 0.5로 낮추며 공격 자체를 멈추지는 않습니다.');
 if(s.atkDownPct)a.push(target+'의 공격력을 '+p(s.atkDownChance??1)+' 확률로 기본 '+n(s.atkDownDuration)+'초 동안 '+p(1-s.atkDownPct)+'로 낮춥니다.');
 if(s.freezeChance||s.slowChance||s.atkDownPct)a.push('상태 이상 지속시간은 대상 속성의 보물 보정으로 늘 수 있으며, 확률이 100% 미만이면 매번 발동하지 않습니다.');
 if(s.zombieKiller)a.push('좀비 킬러: 직접 마무리한 좀비의 부활을 막습니다. 좀비 침공과 좀비가 등장하는 스테이지에서 활용할 수 있습니다.');
 if(s.onlyTraitless)a.push('무속성 적과 성만 공격합니다. 다른 속성 적에 대한 DPS를 적용하지 않습니다.');
 if(s.savageChance)a.push('혼신의 일격 '+p(s.savageChance)+' 확률·피해 '+n(s.savageMult||3.5)+'배. 크리티컬이 아니므로 비크리티컬 메탈 피해 1 제한은 그대로입니다.');
 if(s.bossDamage)a.push('보스 판정 대상에게 주는 피해 '+n(s.bossDamage)+'배. 아래 일반 적 DPS에는 포함하지 않습니다.');
 if(s.castleMult>1)a.push('성에 주는 피해 '+n(s.castleMult)+'배. 적 캐릭터 DPS와 별도입니다.');
 if(s.dodge)a.push('피격 시 '+p(s.dodge.chance)+' 확률로 '+n(s.dodge.duration)+'초 피해를 무효화합니다.');
 if(s.waveImmune||s.surgeImmune)a.push([s.waveImmune?'파동 피해 무효':'',s.surgeImmune?'열파 피해 무효':''].filter(Boolean).join(' · '));
 if(s.critChance)a.push('타격별 '+p(s.critChance)+' 확률로 '+n(s.critMult||2)+'배 크리티컬. 메탈에게도 크리티컬 피해가 적용됩니다.');
 if(s.metalKiller)a.push('메탈 킬러: 비크리티컬 메탈 타격에 남은 체력의 '+p(s.metalKiller)+'를 올림한 피해를 1에 더합니다. 체력에 따라 달라져 고정 DPS로 표시하지 않습니다.');
 if(s.barrierBreak)a.push('베리어 브레이커 '+p(s.barrierBreak)+'. 일반 타격의 베리어 임계값과 별도로 판정됩니다.');
 if(s.waveBlock)a.push('파동 스토퍼로 적 파동이 뒤쪽 아군에게 이어지는 것을 막습니다.');
 if(s.pull)a.push('적을 '+n(s.pullDistance||3)+'만큼 당깁니다. 보스는 당기지 못하며 보스에게 주는 피해는 30% 늘어납니다.');
 if(s.push||s.blowChance)a.push(s.push?'적을 기본 '+n(s.push)+'만큼 날려 보냅니다.':'적을 '+p(s.blowChance)+' 확률로 기본 '+n(s.blowDistance||14)+'만큼 날려 보냅니다.');
 if(s.wave)a.push('공격 시 '+p(s.wave.chance)+' 확률의 파동: 기본 공격력의 '+n(s.wave.mult||1)+'배, 파동 도달 거리 '+n(s.wave.reach)+'.');
 if(s.surge)a.push('열파 추가 공격: '+n(s.surge.dur)+'초 동안 '+n(s.surge.tick)+'초 간격으로 기본 공격력의 '+n(s.surge.mult)+'배 피해. 위치가 맞아야 적중합니다.');
 if(s.killGold)a.push('직접 처치 보상금이 '+n(1+s.killGold)+'배가 됩니다.');
 if(s.pierce)a.push('한 타격에 '+(Number.isFinite(s.pierce)?s.pierce+'명':'범위 안 모든 적')+'까지 관통합니다.'+(s.pierceGrowth>1?' 뒤쪽 관통 피해가 증가하지만 아래 DPS는 첫 대상 기준입니다.':''));
 if(s.boomerang)a.push('부메랑이 나갈 때와 돌아올 때 각각 적중할 수 있습니다.');
 return a;
}
function codexReviewAssessment(type,s){
 const n=codexReviewNumber,control=!!(s.freezeChance||s.slowChance||s.atkDownPct),blind=hasBlindSpot(s)?(s.zoneMin??s.range*DEAD_ZONE_RATIO):s.zoneMin||0;
 let strength,weakness,use;
 if(type==='red'||type==='yellow'){strength=n(s.cost)+'원·재출격 '+n(s.cooldown)+'초를 이용해 앞줄을 반복 보충하는 고방입니다.';weakness='강한 범위 공격에 여러 개체가 함께 쓰러질 수 있습니다.';use='처치 화력보다 후방 딜러가 공격할 시간을 확보할 때 편성합니다.';}
 else if(type==='prism'){strength='속성 특효에 의존하지 않는 직접 범위 타격을 사거리 '+n(s.range)+'에서 넣는 딜러입니다.';weakness='공격 간격 '+n(s.interval)+'초와 선딜 '+n(s.windup||0)+'초 사이에 목표가 이동하거나 자신이 밀리면 공격 기회를 잃을 수 있습니다.';use='사각 안쪽을 고방으로 지키고 적이 안정적으로 묶인 전선에서 한 번의 타격을 맞힙니다.';}
 else if(type==='rainbow'){strength='사각지대 없는 범위 공격과 여러 속성에 대한 초데미지를 함께 갖춘 딜러입니다.';weakness='무속성·좀비에는 초데미지가 없고 메탈 비크리티컬 피해는 1로 제한됩니다.';use='초데미지 대상이 많은 전선에서 쓰고, 메탈 처치는 크리티컬·메탈 킬러 요원과 나눕니다.';}
 else if(type==='iron'){strength='좀비 킬러와 좀비 대상 엄청 강하다를 함께 가진 범위 딜러입니다.';weakness='사거리 '+n(s.range)+'의 근접 교전과 재출격 '+n(s.cooldown)+'초 때문에 접근 중 손실과 재투입 공백에 주의해야 합니다.';use='좀비 침공에서 앞줄을 보강하고 부활 차단을 맡깁니다. 마지막 타격을 다른 아군이 주면 좀비 킬러는 적용되지 않습니다.';}
 else if(type==='platinum'){strength='좀비·메탈의 접근을 느리게 하고, 직접 처치한 좀비의 부활도 막는 범위 지원입니다.';weakness='선딜 '+n(s.windup||0)+'초·공격 간격 '+n(s.interval)+'초 동안 파고드는 적에게 먼저 피해를 받을 수 있습니다.';use='좀비 전선에는 마무리 지원으로, 메탈 전선에는 크리티컬 딜러가 공격할 시간을 버는 요원으로 편성합니다.';}
 else if(s.pull){strength='적의 위치를 아군 화력 안으로 당기는 전선 조절 요원입니다.';weakness='적을 후방 딜러 가까이 끌어올 수도 있으며 보스 위치는 당길 수 없습니다.';use=s.waveBlock?'파동 적을 상대할 때 파동 스토퍼와 위치 조절을 함께 활용합니다.':'당긴 뒤 공격할 아군을 준비하고 적과 후방 딜러 사이 거리를 확인합니다.';}
 else if(control){strength=(s.freezeChance?'정지':s.atkDownPct?'공격력 다운':'느리게')+' 효과로 아군의 전투를 보조합니다.';weakness=s.statusVs?.length?'지원 효과는 지정된 속성의 적에게만 적용됩니다.':'지원 효과의 발동 간격 사이에는 별도 전선 유지가 필요하며, 제어만으로 적을 처치할 수는 없습니다.';use=s.zombieKiller?'좀비 침공에서는 부활 차단과 제어를 함께 맡기고 다른 화력 요원으로 교전 시간을 줄입니다.':'효과 대상이 실제로 등장하는 전선에 고방·딜러와 함께 편성합니다.';}
 else if(s.critChance||s.metalKiller){strength=(s.area?'여러 메탈을 함께 타격하는':'메탈 하나에 타격을 집중하는')+' 대항 요원입니다.';weakness=s.critChance<1?'크리티컬 불발이 이어지면 처치 시간이 흔들립니다.':'공격에 맞히기 전에 밀려나면 해당 타격을 잃습니다.';use='메탈 적이 등장하는 전선에서 정지·느리게 지원으로 타격 기회를 확보합니다.';}
 else{strength=(s.area||s.splash||s.boomerang||s.dash?'적 무리에 범위 피해를 보태는':'한 대상에 직접 화력을 집중하는')+' 공격 요원입니다.';weakness=s.boomerang?'돌아오는 부메랑까지 맞아야 아래 화력이 나옵니다.':s.cooldown>=20?'한 번 쓰러지면 재출격 '+n(s.cooldown)+'초 동안 같은 개체를 보충할 수 없습니다.':'사거리 '+n(s.range)+'보다 긴 적에게 접근할 때 먼저 피해를 받을 수 있습니다.';use=s.massiveVs?.length||s.extremeVs?.length?'특효 대상이 많은 전선에 배치하고 다른 속성은 별도 딜러로 보완합니다.':s.wave||s.surge?'앞줄을 유지해 직접 타격과 추가 공격이 함께 닿도록 배치합니다.':'상대 사거리와 투입 비용을 확인하고 고방과 교대로 전선을 유지합니다.';}
 if(blind>0&&type!=='prism')weakness+=' '+n(blind)+' 이내의 사각은 다른 아군으로 막아야 합니다.';
 return {strength,weakness,use};
}
function codexConsistentReview(type,evolved){
 const s=codexReviewStats(type,evolved),m=codexDirectMetrics(s),n=codexReviewNumber,e=codexReviewEscape;
 const reveal=!s.hiddenAbility||codexWiki||futureOpen(),a=codexReviewAssessment(type,s),abilities=reveal?codexReviewAbilities(s):['미래편 진입 후 특수 능력 설명이 공개됩니다.'];
 const specialized=reveal?Object.entries(m.traits).filter(([t,v])=>t!=='metal'&&v.dps>m.expectedDps*1.001):[];
 const dpsRecord=reveal&&typeof codexTraitDpsRecord==='function'?codexTraitDpsRecord(type,s):'';
 const rows=[['체력',s.hp],['공격력',s.atk],['사거리',s.range],['공격 주기',n(s.interval)+'초'],['재출격',n(s.cooldown)+'초'],['비용',n(s.cost)+'원']];
 let damage='<p>직접 공격 이론 DPS <b>'+n(m.expectedDps)+'</b> (크리티컬·혼신의 일격 기대값 포함). '+(s.damageTiers?'사거리 안 최고 피해 거리 구간, ':'')+(s.pierce?'관통 첫 대상, ':'')+(s.boomerang?'왕복 모두 명중, ':'')+'한 대상에게 방해 없이 모든 직접 타격을 맞히는 조건이며 파동·열파는 제외합니다.</p>';
 if(specialized.length)damage+='<p>같은 조건의 속성별 직접 DPS: '+specialized.map(([t,v])=>e(TRAIT_TARGET[t]||t)+' '+n(v.dps)).join(' · ')+'.</p>';
 damage+='<p>메탈: '+(s.onlyTraitless?'무속성 적과 성만 공격하므로 메탈은 공격 대상이 아닙니다.':s.metalKiller?'메탈 킬러의 남은 체력 비례 피해로 고정 DPS를 산출하지 않습니다.':'일반 타격은 1, 크리티컬은 특효 배율 계산 뒤 실제 크리티컬 피해를 적용합니다. 직접 공격 기대 DPS '+n(m.traits.metal.dps)+'.')+' 베리어·적의 피해 감소·표식·보스 특효·분노·체력 조건 강화·넉백으로 생기는 손실은 위 수치에 포함하지 않습니다.</p>';
 return '<section class="codex-review codex-consistent-review" data-character="'+e(type)+'" data-form="'+(s.trueForm?3:s.evolved?2:1)+'"><h3>총평</h3><small>'+e(codexReviewBasis(s))+'</small><details class="codex-review-figures"><summary>표와 같은 기준의 핵심 수치</summary><dl class="codex-review-numbers">'+rows.map(([k,v])=>'<dt>'+e(k)+'</dt><dd>'+e(typeof v==='number'?n(v):v)+'</dd>').join('')+'</dl></details><h4>강점</h4><p>'+e(a.strength)+'</p>'+dpsRecord+'<h4>약점</h4><p>'+e(a.weakness)+'</p><h4>편성 판단</h4><p>'+e(a.use)+'</p>'+(abilities.length?'<details><summary>능력과 적용 조건</summary><ul>'+abilities.map(t=>'<li>'+e(t)+'</li>').join('')+'</ul></details>':'')+'<details open><summary>피해 계산 조건</summary>'+damage+'</details></section>';
}
allyReview=codexConsistentReview;
(function(){
 const previous=renderCodexPreview;
 renderCodexPreview=function(){previous.apply(this,arguments);if(codexTab!=='ally'||!codexUnit)return;
  const s=codexReviewStats(codexType,codexEvolved),n=codexReviewNumber;
  codexUnit.stats=s;
  const rows=[['표·총평 기준','합산 Lv.30 · 현재 보물 · 세계편 2·3장 가격'],['체력',n(s.hp)],['공격력',n(s.atk)],['사거리',n(s.range)],['공격 주기',n(s.interval)+'초'],['이동 속도',n(s.speed)],['재출격',n(s.cooldown)+'초'],['비용',n(s.cost)+'원']];
  document.getElementById('codexStats').innerHTML=rows.map(([k,v])=>'<dt>'+codexReviewEscape(k)+'</dt><dd>'+codexReviewEscape(v)+'</dd>').join('');
  const label=attackLabel(codexType);document.getElementById('codexRole').textContent=label+' 공격';
  const names=ts=>ts.map(t=>TRAIT_TARGET[t]||t).join('·'),scope=[];
  if(!s.hiddenAbility||codexWiki||futureOpen()){if(s.massiveVs?.length)scope.push('초데미지 대상: '+names(s.massiveVs));if(s.extremeVs?.length)scope.push('극데미지 대상: '+names(s.extremeVs));if(s.statusVs?.length)scope.push('상태 이상 대상: '+names(s.statusVs));if(s.onlyTraitless)scope.push('무속성 적과 성만 공격');}
  document.getElementById('codexDesc').textContent=unitDisplayName(codexType,s.trueForm,s.evolved)+' · '+(scope.join(' · ')||'선택한 형태의 능력·교전 조건은 아래 총평에서 확인하세요')+'.';
  const ex=document.getElementById('codexExtra');ex.querySelectorAll('.codex-review').forEach(r=>r.remove());ex.insertAdjacentHTML('beforeend',allyReview(codexType,codexEvolved));
 };
})();
