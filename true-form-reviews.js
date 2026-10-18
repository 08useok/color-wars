// Released dedicated forms: version history verified in notice.js and the introducing Git commits.
const TRUE_FORM_REVIEW_RELEASE={cream:'4.5.0',hotpink:'4.7.0',salmon:'6.0.1',gold:'6.0.1',beige:'6.0.1',clover:'6.1.0',crystal:'6.4.0',indigo:'6.4.0',raspberry:'6.4.0'};
function trueFormReview(type,s){
 if(!s.trueForm||!TRUE_FORM_REVIEW_RELEASE[type])return null;
 const saved=trueForms;let base;
 try{trueForms=saved.filter(t=>t!==type);base=codexReviewStats(type,true)}finally{trueForms=saved}
 const num=n=>Math.round(n).toLocaleString('ko-KR'),dec=n=>Number(Number(n).toFixed(2)),pct=n=>Math.round(n*100),inc=(a,b)=>Math.round((a/b-1)*100);
 const notes={
  cream:{effect:`공격이 범위로 바뀌고 검은 적 느리게 확률이 ${pct(s.slowChance)}%, 지속 시간이 ${dec(s.slowDuration)}초로 강화되었다.`,fix:`사거리가 ${dec(base.range)}에서 ${dec(s.range)}로 늘어 개체 공격으로 적 무리에 밀리던 약점을 보완했다.`,strength:'고방 뒤에 여러 마리를 쌓아 검은 적의 접근을 늦추는 메즈 지원 능력이 좋아졌다.',weak:'느리게는 적의 공격을 막지 않으며 다른 속성에는 적용되지 않는다. 긴 사거리의 적과 강한 범위 공격은 고방·딜러의 도움이 필요하다.'},
  hotpink:{effect:`범위 공격과 사각지대 없는 전방 ${s.zoneMax}까지의 공격 범위가 적용되고, 빨간 적 공격력 다운의 지속 시간이 ${dec(s.atkDownDuration)}초로 늘었다.`,fix:`사거리가 ${dec(base.range)}에서 ${dec(s.range)}로 늘고 여러 적에게 공격력 다운을 걸 수 있어 짧은 사거리와 개체 공격의 한계를 보완했다.`,strength:'빨간 적 무리의 화력을 함께 낮추면서 피해를 보태는 범위 딜러 겸 메즈 지원으로 활용하기 좋아졌다.',weak:`공격 간격 ${dec(s.interval)}초와 선딜 ${dec(s.windup)}초가 남아 있어 혼자 전선을 지키기 어렵다. 다른 속성에는 공격력 다운이 적용되지 않는다.`},
  salmon:{effect:`사거리 ${dec(s.range)}, 끌어오기 거리 ${dec(s.pullDistance)}, ${pct(s.freezeChance)}% 확률·${dec(s.freezeDuration)}초 정지와 파동 스토퍼가 추가·강화되었다.`,fix:'파동을 본인 위치에서 끊어 뒤쪽 아군까지 보호할 수 있어 파동 적에게 전선이 함께 무너지던 상황을 보완한다.',strength:'긴 사거리에서 적을 끌어오고 잠깐 멈추는 전선 조절 메즈와 후방 보호를 함께 맡을 수 있다.',weak:'끌어오기는 적을 아군 딜러에게 접근시킬 수도 있고, 보스는 끌어오지 못한다. 밀려나 있는 동안에는 파동을 막지 못하므로 고방이 필요하다.'},
  gold:{effect:`금괴 공격이 ${base.multiHit||1}연타에서 ${s.multiHit}연타로 늘고 처치 돈 보너스가 +${pct(s.killGold)}%로 강화되었다.`,fix:'공격 타격 수와 화력이 늘어 낮은 처치 능력을 보완하고, 직접 처치했을 때 확보하는 자금도 많아졌다.',strength:'잡몹을 직접 마무리하며 돈을 모아 뒤쪽 주력 딜러를 생산하는 자금 보조 딜러로 활용하기 좋아졌다.',weak:`공격 간격 ${dec(s.interval)}초와 개체 타격의 한계는 남는다. 다른 아군이 먼저 처치하면 골드의 처치 돈 보너스를 받을 수 없고, 고방 없이 전선을 맡기기는 어렵다.`},
  beige:{effect:`사거리가 ${dec(base.range)}에서 ${dec(s.range)}로 늘고 검은 적 정지가 ${pct(s.freezeChance)}% 확률·${dec(s.freezeDuration)}초로 강화되었다.`,fix:'짧은 사거리 때문에 접근 중 맞기 쉬웠던 약점을 완화하고, 더 높은 정지 확률과 긴 지속 시간으로 공격할 틈을 확보한다.',strength:'고방 뒤에서 검은 적 무리를 범위로 멈추는 메즈 지원 능력이 좋아졌다.',weak:'정지는 여전히 확률 발동이며 검은 적 이외에는 적용되지 않는다. 혼자 적을 처치하거나 전선을 유지하기는 어려워 딜러와 함께 써야 한다.'},
  clover:{effect:`${s.multiHit}연타와 ${pct(s.critChance)}% 크리티컬이 추가되고, 공격 간격이 ${dec(base.interval)}초에서 ${dec(s.interval)}초로 줄었다.`,fix:'느린 공격 간격을 줄여 검은 적 공격력 다운을 다시 시도하기 쉬워졌고 연타로 타격 기회도 늘어났다.',strength:'검은 적의 화력을 낮추는 메즈 지원에 크리티컬을 통한 메탈 대응까지 보탤 수 있다. 기존 공격력 다운도 유지한다.',weak:'공격력 다운은 검은 적에게만 적용되며 크리티컬도 확률이다. 개체 타격이라 앞의 잡몹에 공격이 소모될 수 있고, 메탈 정지·느리게와 고방의 보호가 필요하다.'},
  crystal:{effect:`크리티컬 확률이 ${pct(s.critChance)}%로 늘고, 에이리언에게 엄청 강하다와 ${pct(s.barrierBreak)}% 베리어 브레이커가 추가되었다.`,fix:'에이리언의 베리어에 공격이 막히는 문제를 확률적으로 해결하고 에이리언 상대 공격·방어 효율도 보강했다.',strength:`기존 떠 있는 적 대응과 ${s.pierce}명 관통을 유지하면서 메탈·에이리언이 섞인 전선에도 투입하기 좋은 관통 딜러가 되었다.`,weak:'크리티컬과 베리어 파괴가 모두 확률이라 필요한 순간에 실패할 수 있다. 속성 특화가 적용되지 않는 적이나 강한 범위 공격에는 고방·메즈 지원이 필요하다.'},
  indigo:{effect:`떠 있는 적 정지가 ${pct(s.freezeChance)}% 확률·${dec(s.freezeDuration)}초로 강화되고 공격력 다운 무효가 추가되었다.`,fix:'정지 발동과 지속을 보강해 전선 제어의 빈틈을 줄이고, 공격력 다운 때문에 화력이 낮아지는 상황을 막는다.',strength:'떠 있는 적을 멈추는 메즈 지원 역할을 더 안정적으로 수행하고 늘어난 공체로 화력과 생존을 보탠다.',weak:'정지는 여전히 확률이며 떠 있는 적 이외에는 적용되지 않는다. 공격력 다운 무효가 정지·느리게까지 막아 주는 것은 아니므로 고방과 특화 딜러가 필요하다.'},
  raspberry:{effect:`공격 간격이 ${dec(base.interval)}초에서 ${dec(s.interval)}초로 줄고 사거리는 ${dec(base.range)}에서 ${dec(s.range)}로 늘었다. 에이리언 초데미지와 ${pct(s.barrierBreak)}% 베리어 브레이커, 무제한 관통·뒤쪽 대상 피해 증가가 추가되었다.`,fix:'3진은 사각지대가 없어 바로 앞의 적도 타격한다. 긴 공격 간격과 관통 대상 수 제한을 보완해 적이 겹친 전선에서 공격을 이어 가기 좋아졌다.',strength:'앞의 적부터 뒤쪽 적까지 관통하며 뒤로 갈수록 피해가 커지는 관통 딜러로, 에이리언 전선과 보스 뒤에 겹친 적을 함께 상대할 때 장점이 커진다.',weak:`선딜 ${dec(s.windup)}초와 생산 대기시간은 남아 있어 공격 전에 밀리거나 쓰러질 수 있다. 베리어 파괴도 확률이며 메탈 대응을 크리티컬에만 맡기면 불안정하다.`}
 };
 const n=notes[type],art=['crystal','indigo','raspberry'].includes(type)?' 전용 3진 모션은 6.6.0 버전에 추가되었다.':type==='cream'?' 이후 4.6.2 버전에서 공격력·범위·느리게 효과가 강화되었다.':'';
 return `<section class="codex-review"><h3>총평</h3><small>합산 Lv.30 · 3진 · 세계편 2·3장 가격 기준 · 수치는 현재 보물 효과 반영</small><p>${TRUE_FORM_REVIEW_RELEASE[type]} 버전에 3진이 추가되었다.${art}</p><p>체력과 공격력이 각각 <b>${num(s.hp)}</b>, <b>${num(s.atk)}</b>로 늘었고, 2진 대비 각각 ${inc(s.hp,base.hp)}%·${inc(s.atk,base.atk)}% 증가했다. ${n.effect}</p><p>${n.fix} ${n.strength}</p><p>다만 ${n.weak}</p></section>`;
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
