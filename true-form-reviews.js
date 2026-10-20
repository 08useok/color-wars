// Released dedicated forms: version history verified in notice.js and the introducing Git commits.
const TRUE_FORM_REVIEW_RELEASE={coral:'6.8.0',cream:'4.5.0',hotpink:'4.7.0',salmon:'6.0.1',gold:'6.0.1',beige:'6.0.1',clover:'6.1.0',crystal:'6.4.0',indigo:'6.4.0',raspberry:'6.4.0'};
function trueFormReview(type,s){
 if(!s.trueForm||!TRUE_FORM_REVIEW_RELEASE[type])return null;
 const saved=trueForms;let base;
 try{trueForms=saved.filter(t=>t!==type);base=codexReviewStats(type,true)}finally{trueForms=saved}
 const num=n=>Math.round(n).toLocaleString('ko-KR'),dec=n=>Number(Number(n).toFixed(2)),pct=n=>Math.round(n*100),inc=(a,b)=>Math.round((a/b-1)*100);
 if(type==='coral'){
  const m=allyComparisonMetrics(s);
  return `<section class="codex-review"><h3>총평</h3><small>합산 Lv.30 · 3진 · 세계편 2·3장 가격 기준 · 수치는 현재 보물 효과 반영</small>
<p>6.8.0 버전에 3진이 추가되었다.</p>
<p>체력과 공격력이 각각 <b>${Math.round(s.hp/base.hp*100)}%</b>, <b>${Math.round(s.atk/base.atk*100)}%</b>로 늘었다. <b>개체 공격에서 범위 2연타</b>로 바뀌었으며, 레드카드와 휘슬 공격에 각각 총공격력의 50%가 배분된다. 떠 있는 적 초데미지는 두 타격 모두 유지한다.</p>
<p>가격은 ${num(base.cost)}원에서 <b>${num(s.cost)}원</b>으로, 재생산 시간은 ${dec(base.cooldown)}초에서 <b>${dec(s.cooldown)}초</b>로 줄었다. 앞의 잡몹 하나에게 공격이 소모되던 약점을 해결하고, 여러 마리를 쌓아 떠 있는 적 무리를 처리하는 양산 범위 딜러로 쓰기 좋아졌다.</p>
<p>다만 사거리와 ${dec(s.interval)}초의 공격 주기는 유지된다. 두 타격 사이에 적이 밀려나거나 코랄이 히트백을 당하면 남은 타격을 놓칠 수 있다. 떠 있는 적 이외에는 초데미지가 적용되지 않고, 짧은 사거리 때문에 고방·메즈 지원이 필요하다.</p>
<p>무속성 기준 DPS는 <b>${num(m.maximumDps)}</b>, 떠 있는 적 상대 DPS는 <b>${num(m.traits.floating.dps)}</b>이다. 이번 상향의 핵심은 2연타 자체의 피해 두 배가 아니라 <b>범위화와 생산성 개선</b>이다.</p>
<p>기준 맵인 황제의 야옹이 ★3에서는 3진 효과로 클리어가 약 <b>8.5초</b> 더 빨라지지만, 현재 측정된 <b>레어 3진 6명 중에서는 마지막</b>이다. 이 맵은 무속성 적이 98%라 코랄의 특화인 떠 있는 적 초데미지가 거의 쓰이지 않으므로, 이 순위는 범위화와 생산성 개선의 몫만 반영한 값이다. 떠 있는 적이 많은 전선의 결과는 아래와 같다.</p>
<p>떠 있는 적이 대부분인 시험 맵 8곳(빅뱅·전사의 여명·짱뚱어 파크 등)에서 기준 덱(레드·옐로우·블루·퍼플)에 더했을 때 48판 중 승리는 코랄 없이 25판, <b>2진 35판, 3진 42판</b>이었다. 3진이 2진보다 좋아진 점수 중 <b>범위 2연타를 빼면 약 40%가 사라지는데</b>(범용 맵 6곳에서는 약 55%), 떠 있는 적 맵에서는 체력·공격 증가와 가격·재생산 개선의 몫이 더 크다.</p></section>`;
 }
 if(type==='hotpink'){
  const m=allyComparisonMetrics(s),taken=1-s.atkDownPct,effective=s.hp/taken;
  const hp=typeof codexHighStat==='function'?codexHighStat(effective,'hp'):num(effective);
  return `<section class="codex-review"><h3>총평</h3><small>합산 Lv.30 · 3진 · 수치는 현재 보물 효과 반영</small>
<p>4.7.0 버전에 3진이 추가되었다.</p>
<p>체력과 공격력이 각각 <b>${Math.round(s.hp/base.hp*100)}%</b>, <b>${Math.round(s.atk/base.atk*100)}%</b>로 늘었고, 사거리가 ${dec(base.range)}에서 ${dec(s.range)}로 늘었다. 공격이 범위로 바뀌고 사각지대 없이 전방 ${dec(s.zoneMax)}까지 타격한다. 빨간 적 공격력 다운은 ${pct(s.atkDownChance)}% 확률로 발동하며 ${dec(s.atkDownDuration)}초 동안 공격력을 ${pct(taken)}%로 낮춘다.</p>
<p>짧은 사거리 때문에 접근 중 공격받기 쉬웠던 약점을 보완하고, 여러 빨간 적의 화력을 함께 낮추는 메즈 지원 능력이 좋아졌다. 공격력 다운이 유지되는 빨간 적에게 받는 피해를 기준으로 실효 체력은 <b>${dec(1/taken)}배(${hp})</b>가 된다. 실제 최대 체력이 늘어나는 것은 아니다.</p>
<p>다만 공격력 다운은 확률 발동이며 빨간 적 이외에는 적용되지 않는다. 공격 간격 ${dec(s.interval)}초와 선딜 ${dec(s.windup)}초, 생산 대기시간도 남아 있어 고방·딜러의 지원이 필요하다.</p>
<p>무속성 기준 DPS는 <b>${num(m.maximumDps)}</b>이다.</p>
<p>결국 클로버에게는 밀리지만, 현재 출시된 3진 중 기준 맵인 황제의 야옹이 ★3에서는 두 번째로 좋은 성능을 보인다. 특히 공격력 다운 무효와 정지 시간 증가를 받은 인디고조차 <b>개체 공격</b>이라 적 무리를 동시에 제어하기 어렵다는 약점이 있다. 반면 버블 핫 핑크는 <b>개체 공격에서 범위 공격으로 바뀌고 사거리까지 늘어나</b> 여러 빨간 적을 함께 약화시키기 좋아진 캐릭터다. 두 캐릭터의 특화 대상은 각각 떠 있는 적과 빨간 적이므로, 특화 전선에서의 우열은 달라질 수 있다.</p></section>`;
 }
 if(type==='crystal'){
  const m=allyComparisonMetrics(s),peak=allyMaximumHit(s),number=v=>typeof codexHighStat==='function'?codexHighStat(v,'damage'):num(v);
  return `<section class="codex-review"><h3>총평</h3><small>합산 Lv.30 · 3진 · 수치는 현재 보물 효과 반영</small>
<p>6.4.0 버전에 3진이 추가되었다. 다만 모션 누락으로 인해 3진 모션은 6.6.0 버전에 추가되었다.</p>
<p>체력과 공격력이 각각 <b>${Math.round(s.hp/base.hp*100)}%</b>, <b>${Math.round(s.atk/base.atk*100)}%</b>로 늘었고, 크리티컬 확률이 ${pct(s.critChance)}%로 늘었다. <b>에이리언에게 엄청 강하다</b>와 ${pct(s.barrierBreak)}% 베리어 브레이커도 추가되었다.</p>
<p>에이리언의 베리어에 공격이 막히는 문제를 확률적으로 해결하고 에이리언 상대 공격·방어 효율도 보강했다. 기존 떠 있는 적 대응과 ${s.pierce}명 관통을 유지하면서 메탈·에이리언이 섞인 전선에도 투입하기 좋은 관통 딜러가 되었다.</p>
<p>다만 크리티컬과 베리어 파괴가 모두 확률이라 필요한 순간에 실패할 수 있다. 속성 특화가 적용되지 않는 적이나 강한 범위 공격에는 고방·메즈 지원이 필요하다.</p>
<p>떠 있는 적과 에이리언 속성을 제외한 기준 DPS는 <b>${num(m.maximumDps)}</b>이지만, 떠 있는 적 상대일 때는 <b>${num(m.traits.floating.dps)}</b>, 에이리언 상대일 때는 <b>${num(m.traits.alien.dps)}</b>이다. 이 DPS는 크리티컬의 평균 기여를 포함한다. 무속성 상대 크리티컬 한 번의 데미지는 <b>${number(s.atk*(s.critMult||2))}</b>이며, DPS와는 다른 수치다. 긴 사거리 안쪽의 사각지대라는 단점도 있다. 공격 방식은 범위 공격이 아닌 <b>${s.pierce}명 관통 공격</b>이다.</p>
<p>현재 기본 캐릭터 3진 중 기준 맵인 황제의 야옹이 ★3에서 측정된 순위는 꼴찌다. 다만 확률 능력의 불안정성만으로 이 순위를 설명할 수는 없으며, 이 맵에서는 떠 있는 적·에이리언 특화가 충분히 발휘되지 않는다. 골드는 3진으로 크게 도약한 반면 크리스탈의 범용 성능 상승은 상대적으로 작다. 라즈베리 3진과 비교하면 라즈베리는 무제한 관통·더 긴 사거리·뒤쪽 대상 피해 증가·크리티컬·베리어 브레이커를 갖췄다. 크리스탈은 더 높은 크리티컬·베리어 파괴 확률과 떠 있는 적 대응으로 차별화해야 한다. 향후 v8에 계획한 본능 강화에 기대를 걸 수 있지만, 본능은 아직 구현되지 않았다.</p></section>`;
 }
 if(type==='raspberry'){
  const m=allyComparisonMetrics(s),peak=allyMaximumHit(s),red=v=>`<strong class="codex-high-stat" style="color:#e53935;font-weight:800">${num(v)}</strong>`;
  const stars=Object.entries(data.units).filter(([,d])=>d.starred).sort((a,b)=>b[1].range-a[1].range).slice(0,2).map(([id])=>UNIT_NAMES[id]).join('·');
  return `<section class="codex-review"><h3>총평</h3><small>합산 Lv.30 · 3진 · 수치는 현재 보물 효과 반영</small>
<p>6.4.0 버전에 3진이 추가되었다. 다만 전용 3진 모션은 6.6.0 버전에 추가되었다.</p>
<p>체력과 공격력이 각각 <b>${Math.round(s.hp/base.hp*100)}%</b>, <b>${Math.round(s.atk/base.atk*100)}%</b>로 늘었고, 공격 간격이 ${dec(base.interval)}초에서 ${dec(s.interval)}초로 줄었다. 사거리는 ${dec(base.range)}에서 ${dec(s.range)}로 <b>${Number(((s.range/base.range-1)*100).toFixed(1))}%</b> 늘었다. <b>에이리언 초데미지와 ${pct(s.barrierBreak)}% 베리어 브레이커, 무제한 관통·뒤쪽 대상 피해 증가</b>가 추가되었다.</p>
<p>3진은 기존 단점이었던 <strong style="color:#e53935;font-weight:800">사각지대가 없어 바로 앞의 적도 타격한다</strong>. 또 <b>긴 공격 간격과 관통 대상 수 제한을 보완해 적이 겹친 전선에서 공격을 이어 가기 좋아졌다</b>. 앞의 적부터 뒤쪽 적까지 관통하며 뒤로 갈수록 피해가 커지는 관통 딜러로, <b>에이리언 전선과 보스 뒤에 겹친 적을 함께 상대할 때 장점이 커진다.</b></p>
<p>다만 선딜 ${dec(s.windup)}초와 생산 대기시간은 남아 있어 공격 전에 밀리거나 쓰러질 수 있다. 베리어 파괴도 확률이며 메탈 대응을 크리티컬에만 맡기면 불안정하다.</p>
<p>하지만 진미는 에이리언 상대로 내는 조건부 직접 1타 최고 데미지다. 최고 피해 거리 구간·가까운 순서로 21번째 관통 대상·에이리언·크리티컬이 모두 겹치면 ${red(peak.damage)}이며, 적 한 마리를 평범하게 공격할 때부터 이 피해가 나오는 것은 아니다.</p>
<p>무속성 기준 DPS는 <b>${num(m.maximumDps)}</b>이지만, 에이리언 상대일 때는 <b>${num(m.traits.alien.dps)}</b>이다. 거리별 직접 DPS는 ${num(m.minimumTierDps)}~${num(m.directDps)}로 달라진다. 무속성·속성별 DPS는 가장 유리한 거리와 크리티컬 기대값을 반영하며, 위의 21번째 관통 최고 피해와는 구분한다. 베리어 브레이커로 스타 에이리언 저격도 가능하다. 특히 스타 에이리언 중 인식 사거리가 가장 긴 두 적인 <b>${stars}</b>보다 사거리가 길어 고방 뒤에서 저격할 수 있다. 다만 적 배율·베리어 파괴 확률·전선 유지에 따라 처치 속도는 달라진다. 기준 맵의 기본 캐릭터 3진 비교에서는 <b>골드 다음으로 성능이 크게 오른 3진 기본 캐릭터</b>다.</p></section>`;
 }
 if(type==='cream'){
  const m=allyComparisonMetrics(s);
  return `<section class="codex-review"><h3>총평</h3><small>합산 Lv.30 · 3진 · 수치는 현재 보물 효과 반영</small>
<p>4.5.0 버전에 3진이 추가되었다. 이후 4.6.2 버전에서 공격력·범위·느리게 효과가 강화되었다.</p>
<p>체력과 공격력이 각각 <b>${Math.round(s.hp/base.hp*100)}%</b>, <b>${Math.round(s.atk/base.atk*100)}%</b>로 늘었고, 공격이 범위로 바뀌고 검은 적 느리게 확률이 ${pct(s.slowChance)}%, 지속 시간이 ${dec(s.slowDuration)}초로 강화되었다.</p>
<p>특히 사거리가 ${dec(base.range)}에서 ${dec(s.range)}로 늘어 개체 공격으로 적 무리에 밀리던 약점을 보완했다. 고방 뒤에 여러 마리를 쌓아 검은 적의 접근을 늦추는 메즈 지원 능력이 좋아졌다.</p>
<p>다만 느리게는 적의 공격을 막지 않으며 다른 속성에는 적용되지 않는다. 긴 사거리의 적과 강한 범위 공격은 고방·딜러의 도움이 필요하다.</p>
<p>무속성 기준 DPS는 <b>${num(m.maximumDps)}</b>이다.</p>
<p>여담으로 전용 형태가 추가된 최초의 3진 캐릭터이며, 출시 뒤 추가 상향을 받은 3진 캐릭터 중 하나다.</p></section>`;
 }
 if(type==='gold'){
  return `<section class="codex-review"><h3>총평</h3><small>합산 Lv.30 · 3진 · 수치는 현재 보물 효과 반영</small>
<p>6.0.1 버전에 3진이 추가되었다.</p>
<p>체력과 공격력이 각각 <b>${Math.round(s.hp/base.hp*100)}%</b>, <b>${Math.round(s.atk/base.atk*100)}%</b>로 늘었다. 금괴 공격이 ${base.multiHit||1}연타에서 ${s.multiHit}연타로 늘고 처치 돈 보너스가 +${pct(s.killGold)}%로 강화되었다.</p>
<p>얼핏 보면 그렇게 강해진 건 아니지만, 공격 타격 수와 화력이 늘어 낮은 처치 능력을 보완하고, 직접 처치했을 때 확보하는 자금도 많아졌다. 잡몹이 많은 스테이지에서는 직접 마무리하며 돈을 모아 뒤쪽 주력 딜러를 생산하는 자금 보조 딜러로 활용하기 좋아졌다.</p>
<p>다만 공격 간격 ${dec(s.interval)}초와 개체 타격의 한계는 남는다. 다른 아군이 먼저 처치하면 골드의 처치 돈 보너스를 받을 수 없고, 고방 없이 전선을 맡기기는 어렵다.</p>
<p>그래도 잡몹이 많은 기준 맵인 황제의 야옹이 ★3에서는 <b>살몬과 함께 기본 캐릭터 3진 중 가장 높은 성능</b>(둘의 차이는 오차 안)을 보이고, 현재 측정된 <b>3진 캐릭터 중 진화로 가장 크게 좋아지는 캐릭터다</b>.</p></section>`;
 }
 if(type==='beige'){
  const m=allyComparisonMetrics(s);
  return `<section class="codex-review"><h3>총평</h3><small>합산 Lv.30 · 3진 · 수치는 현재 보물 효과 반영</small>
<p>6.0.1 버전에 3진이 추가되었다.</p>
<p>체력과 공격력이 각각 <b>${Math.round(s.hp/base.hp*100)}%</b>, <b>${Math.round(s.atk/base.atk*100)}%</b>로 늘었다. 특히 사거리가 <b>${dec(base.range)}에서 ${dec(s.range)}</b>로 늘고, 검은 적 정지가 <b>${pct(s.freezeChance)}% 확률·${dec(s.freezeDuration)}초</b>로 강화되었다.</p>
<p>짧은 사거리 때문에 접근 중 맞기 쉬웠던 약점을 완화하고, 더 높은 정지 확률과 긴 지속 시간으로 공격할 틈을 확보한다. 기존 범위 공격을 유지해 <b>검은 적 무리를 함께 멈추는 메즈 지원</b>으로 쓰기 좋아졌다. 고방 뒤에 여러 마리를 쌓으면 정지 효과를 반복해서 노릴 수 있다.</p>
<p>다만 정지는 여전히 확률 발동이며 검은 적 이외에는 적용되지 않는다. 사거리가 늘어도 장거리 적의 공격까지 피할 수 있는 것은 아니며, 정지가 빗나가면 전선이 밀릴 수 있다. 혼자 적을 처치하거나 전선을 유지하기는 어려워 고방·딜러와 함께 써야 한다.</p>
<p>무속성 기준 DPS는 <b>${num(m.maximumDps)}</b>이다. 화력으로 적을 처리하는 주력 딜러보다는, 검은 적의 움직임과 공격을 멈춰 아군 딜러가 공격할 시간을 벌어 주는 역할에 어울린다.</p></section>`;
 }
 const notes={
  cream:{effect:`공격이 범위로 바뀌고 검은 적 느리게 확률이 ${pct(s.slowChance)}%, 지속 시간이 ${dec(s.slowDuration)}초로 강화되었다.`,fix:`사거리가 ${dec(base.range)}에서 ${dec(s.range)}로 늘어 개체 공격으로 적 무리에 밀리던 약점을 보완했다.`,strength:'고방 뒤에 여러 마리를 쌓아 검은 적의 접근을 늦추는 메즈 지원 능력이 좋아졌다.',weak:'느리게는 적의 공격을 막지 않으며 다른 속성에는 적용되지 않는다. 긴 사거리의 적과 강한 범위 공격은 고방·딜러의 도움이 필요하다.'},
  hotpink:{effect:`범위 공격과 사각지대 없는 전방 ${s.zoneMax}까지의 공격 범위가 적용되고, 빨간 적 공격력 다운의 지속 시간이 ${dec(s.atkDownDuration)}초로 늘었다.`,fix:`사거리가 ${dec(base.range)}에서 ${dec(s.range)}로 늘고 여러 적에게 공격력 다운을 걸 수 있어 짧은 사거리와 개체 공격의 한계를 보완했다.`,strength:'빨간 적 무리의 화력을 함께 낮추면서 피해를 보태는 범위 딜러 겸 메즈 지원으로 활용하기 좋아졌다.',weak:`공격 간격 ${dec(s.interval)}초와 선딜 ${dec(s.windup)}초가 남아 있어 혼자 전선을 지키기 어렵다. 다른 속성에는 공격력 다운이 적용되지 않는다.`},
  salmon:{effect:`사거리 ${dec(s.range)}, 끌어오기 거리 ${dec(s.pullDistance)}, ${pct(s.freezeChance)}% 확률·${dec(s.freezeDuration)}초 정지와 <b>파동 스토퍼</b>가 추가·강화되었다.`,fix:'파동을 본인 위치에서 끊어 뒤쪽 아군까지 보호할 수 있어 파동 적에게 전선이 함께 무너지던 상황을 보완한다.',strength:'긴 사거리에서 적을 끌어오고 잠깐 멈추는 전선 조절 메즈와 후방 보호를 함께 맡을 수 있다.',weak:'끌어오기는 적을 아군 딜러에게 접근시킬 수도 있고, 보스는 끌어오지 못한다. 밀려나 있는 동안에는 파동을 막지 못하므로 고방이 필요하다.'},
  gold:{effect:`금괴 공격이 ${base.multiHit||1}연타에서 ${s.multiHit}연타로 늘고 처치 돈 보너스가 +${pct(s.killGold)}%로 강화되었다.`,fix:'공격 타격 수와 화력이 늘어 낮은 처치 능력을 보완하고, 직접 처치했을 때 확보하는 자금도 많아졌다.',strength:'잡몹을 직접 마무리하며 돈을 모아 뒤쪽 주력 딜러를 생산하는 자금 보조 딜러로 활용하기 좋아졌다.',weak:`공격 간격 ${dec(s.interval)}초와 개체 타격의 한계는 남는다. 다른 아군이 먼저 처치하면 골드의 처치 돈 보너스를 받을 수 없고, 고방 없이 전선을 맡기기는 어렵다.`},
  beige:{effect:`사거리가 ${dec(base.range)}에서 ${dec(s.range)}로 늘고 검은 적 정지가 ${pct(s.freezeChance)}% 확률·${dec(s.freezeDuration)}초로 강화되었다.`,fix:'짧은 사거리 때문에 접근 중 맞기 쉬웠던 약점을 완화하고, 더 높은 정지 확률과 긴 지속 시간으로 공격할 틈을 확보한다.',strength:'고방 뒤에서 검은 적 무리를 범위로 멈추는 메즈 지원 능력이 좋아졌다.',weak:'정지는 여전히 확률 발동이며 검은 적 이외에는 적용되지 않는다. 혼자 적을 처치하거나 전선을 유지하기는 어려워 딜러와 함께 써야 한다.'},
  clover:{effect:`${s.multiHit}연타와 ${pct(s.critChance)}% 크리티컬이 추가되고, 공격 간격이 ${dec(base.interval)}초에서 ${dec(s.interval)}초로 줄었다.`,fix:'느린 공격 간격을 줄여 검은 적 공격력 다운을 다시 시도하기 쉬워졌고 연타로 타격 기회도 늘어났다.',strength:'검은 적의 화력을 낮추는 메즈 지원에 크리티컬을 통한 메탈 대응까지 보탤 수 있다. 기존 공격력 다운도 유지한다.',weak:'공격력 다운은 검은 적에게만 적용되며 크리티컬도 확률이다. 개체 타격이라 앞의 잡몹에 공격이 소모될 수 있고, 메탈 정지·느리게와 고방의 보호가 필요하다.'},
  crystal:{effect:`크리티컬 확률이 ${pct(s.critChance)}%로 늘고, 에이리언에게 엄청 강하다와 ${pct(s.barrierBreak)}% 베리어 브레이커가 추가되었다.`,fix:'에이리언의 베리어에 공격이 막히는 문제를 확률적으로 해결하고 에이리언 상대 공격·방어 효율도 보강했다.',strength:`기존 떠 있는 적 대응과 ${s.pierce}명 관통을 유지하면서 메탈·에이리언이 섞인 전선에도 투입하기 좋은 관통 딜러가 되었다.`,weak:'크리티컬과 베리어 파괴가 모두 확률이라 필요한 순간에 실패할 수 있다. 속성 특화가 적용되지 않는 적이나 강한 범위 공격에는 고방·메즈 지원이 필요하다.'},
  indigo:{effect:`떠 있는 적 정지가 ${pct(s.freezeChance)}% 확률·${dec(s.freezeDuration)}초로 강화되고 공격력 다운 무효가 추가되었다.`,fix:'정지 발동과 지속을 보강해 전선 제어의 빈틈을 줄이고, 공격력 다운 때문에 화력이 낮아지는 상황을 막는다.',strength:'떠 있는 적을 멈추는 메즈 지원 역할을 더 안정적으로 수행하고 늘어난 공체로 화력과 생존을 보탠다.',weak:'정지는 여전히 확률이며 떠 있는 적 이외에는 적용되지 않는다. 공격력 다운 무효가 정지·느리게까지 막아 주는 것은 아니므로 고방과 특화 딜러가 필요하다.'},
  raspberry:{effect:`공격 간격이 ${dec(base.interval)}초에서 ${dec(s.interval)}초로 줄고 사거리는 ${dec(base.range)}에서 ${dec(s.range)}로 늘었다. 에이리언 초데미지와 ${pct(s.barrierBreak)}% 베리어 브레이커, 무제한 관통·뒤쪽 대상 피해 증가가 추가되었다.`,fix:'3진은 사각지대가 없어 바로 앞의 적도 타격한다. 긴 공격 간격과 관통 대상 수 제한을 보완해 적이 겹친 전선에서 공격을 이어 가기 좋아졌다.',strength:'앞의 적부터 뒤쪽 적까지 관통하며 뒤로 갈수록 피해가 커지는 관통 딜러로, 에이리언 전선과 보스 뒤에 겹친 적을 함께 상대할 때 장점이 커진다.',weak:`선딜 ${dec(s.windup)}초와 생산 대기시간은 남아 있어 공격 전에 밀리거나 쓰러질 수 있다. 베리어 파괴도 확률이며 메탈 대응을 크리티컬에만 맡기면 불안정하다.`}
 };
 const n=notes[type],art=['crystal','indigo','raspberry'].includes(type)?' 전용 3진 모션은 6.6.0 버전에 추가되었다.':type==='cream'?' 이후 4.6.2 버전에서 공격력·범위·느리게 효과가 강화되었다.':'';
 return `<section class="codex-review"><h3>총평</h3><small>합산 Lv.30 · 3진 · 세계편 2·3장 가격 기준 · 수치는 현재 보물 효과 반영</small><p>${TRUE_FORM_REVIEW_RELEASE[type]} 버전에 3진이 추가되었다.${art}</p><p>체력과 공격력이 각각 <b>${Math.round(s.hp/base.hp*100)}%</b>, <b>${Math.round(s.atk/base.atk*100)}%</b>로 늘었다. ${n.effect}</p><p>${n.fix} ${n.strength}</p><p>다만 ${n.weak}</p>${allyDamageRecord(type,s)}<p>${allyComparisonText(s)}</p>${type==='salmon'?'<p>기준 맵인 황제의 야옹이 ★3에서는 3진 효과로 클리어가 약 <b>17초</b> 더 빨라져, 골드와 함께 <b>기본 캐릭터 3진 중 가장 높은 성능</b>(둘의 차이는 오차 안)이다. 다만 이 맵에는 파동 적이 거의 없어 파동 스토퍼의 몫은 반영되지 않았다.</p><p>여담으로 <b>최초의 기본 3진이자 최초로 파동 스토퍼를 가진 캐릭터다.</b></p>':''}</section>`;
}
const trueFormReviewBefore=allyReview;
allyReview=function(type,evolved){const s=codexReviewStats(type,evolved);return trueFormReview(type,s)||trueFormReviewBefore(type,evolved)};
const trueFormDescriptionBefore=renderCodexPreview;
renderCodexPreview=function(){
 trueFormDescriptionBefore();
 if(codexTab!=='ally'||!codexEvolved||!TRUE_FORM_REVIEW_RELEASE[codexType]||!codexReviewStats(codexType,true).trueForm)return;
 const description=document.querySelector('#codexDesc'),review=document.querySelector('#codexExtra .codex-review');
 if(!description||!review)return;
 const summary=document.createElement('span');
 summary.className='codex-true-form-review';summary.style.display='block';summary.style.marginTop='16px';
 const heading=document.createElement('strong');heading.textContent='3진 총평';summary.appendChild(heading);
 for(const source of [...review.children]){
  if(source.matches('h3,.codex-verdict'))continue;
  const paragraph=document.createElement('span');paragraph.className=source.className;paragraph.style.display='block';paragraph.style.marginTop='8px';
  if(source.matches('small')){const note=document.createElement('small');note.innerHTML=source.innerHTML;paragraph.appendChild(note)}
  else paragraph.innerHTML=source.innerHTML;
  summary.appendChild(paragraph);source.remove();
 }
 description.appendChild(summary);
 const oldHeading=review.querySelector('h3');if(oldHeading)oldHeading.remove();
};
