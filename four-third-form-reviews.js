// Narrative supplements use the same current stats as the codex table.
function third72Review(type,s){
 if(!s.trueForm||!THIRD_FORM_72_NAMES[type])return '';
 const n=codexReviewNumber,draft=THIRD_FORM_72_DRAFTS[type];
 const intro=`<h4>3진 변화</h4><p>7.2.0 버전에 3진이 추가되었다.</p><p>체력과 공격력이 각각 <b>${n(draft.hp*100)}%</b>, <b>${n(draft.atk*100)}%</b>로 늘었다.</p>`;
 const body={
  lavender:`<p>공격력 다운 확률이 <b>100%</b>, 기본 지속시간이 <b>7초</b>가 되고, <b>100% 확률로 3초 느리게</b> 하는 효과가 추가되었다. 공격 간격은 4초에서 <b>3초</b>로 줄었으며, 체력이 절반 이하가 되면 <b>공격력이 2배</b>가 된다. 원래 선딜이 없어 즉시 타격하는 동작을 유지한다.</p><p>범위 공격으로 적 무리의 화력을 낮추고 접근을 늦추는 메즈 지원이다. 다만 체력 조건 강화를 쓰려면 피해를 받아야 하며, 효과 면역인 적이나 긴 사거리의 적에는 고방과 주력 딜러가 필요하다.</p>`,
  azure:`<p>기존 크리티컬 <b>20%</b>를 유지하고, <b>30% 확률의 3배 혼신의 일격</b>과 <b>30% 확률의 10레벨 파동</b>을 얻었다. 파동 도달 거리는 게임 내 단위 <b>77.1</b>이다.</p><p>높아진 공체로 접근해 돌진 공격을 넣고, 파동으로 뒤쪽 적에도 피해를 보태는 근접 딜탱이다. 다만 직접 공격 사거리는 그대로 짧고, 크리티컬·혼신의 일격·파동이 모두 확률이라 매번 같은 화력을 내지는 못한다.</p>`,
  aqua:`<p>떠 있는 적 느리게가 <b>100%</b> 확정으로 바뀌고, 기본 지속시간은 4.5초에서 <b>8초</b>로 늘었다. 대상에 <b>천사</b>가 추가되었다.</p><p>떠 있는 적·천사 한 마리의 접근을 계속 늦추는 근접 메즈 지원이다. 공격력이 크게 늘어 제어하면서 직접 피해도 보탠다. 다만 <b>개체 공격</b>과 짧은 사거리가 유지되어 잡몹이 앞을 가리거나 여러 적이 밀려오면 제어가 분산된다. 다른 속성에는 느리게가 적용되지 않는다.</p>`,
  babyblue:`<p>날려버리기 확률이 <b>70%</b>로 늘고, <b>개체 공격</b>을 <b>0.75초</b>마다 한다. 생산 대기시간은 <b>80% 단축</b>되어 보물 완성 기준 19초에서 <b>3.8초</b>로 줄었다. 표시 가격도 <b>30원</b> 내려갔다.</p><p>여러 마리를 빠르게 쌓아 앞줄 적 하나를 반복해서 밀어내는 양산 메즈 지원이다. 다만 날려버리기는 확률이고 면역인 적에는 통하지 않는다. 적을 아군의 공격 범위 밖으로 밀거나 잡몹에 공격이 소모될 수 있어 후방 딜러와의 호흡이 필요하다.</p>`
 }[type];
 return '<div class="third72-review">'+intro+body+'<p><small>상태 이상 지속시간은 기본값이며, 실제 전투에는 해당 보물 효과가 추가로 적용된다.</small></p></div>';
}
(function(){const before=allyReview;
 allyReview=function(type,evolved){const html=before.apply(this,arguments),extra=third72Review(type,codexReviewStats(type,evolved));
  if(!extra)return html;const end=html.lastIndexOf('</section>');return end<0?html+extra:html.slice(0,end)+extra+html.slice(end);
 };
})();
