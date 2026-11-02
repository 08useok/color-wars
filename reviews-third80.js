const THIRD80_ASSESSMENT={
 hacienda:{strength:'천사와 고대종에게 초데미지를 주는 개체 딜러다. 올가미로 한 대상을 집중 타격하며 강화된 공체로 기존 역할을 보강한다.',weakness:'개체 공격이라 잡몹이 앞을 가리면 주력 적을 바로 공격하기 어렵다. 저주 무효가 없어 저주를 받으면 속성 초데미지를 활용하지 못한다.',use:'고방으로 전선을 유지하고 범위 딜러가 잡몹을 정리한 뒤 천사·고대종 주력 적을 공격하게 한다.'},
 lightcream:{strength:'크리티컬과 고대종 초데미지를 겸하는 근접 딜러다. 제빵사 장비와 빵 투척 모션으로 고대종을 공격하며 메탈에게도 확률적으로 유효타를 넣는다.',weakness:'크리티컬은 확률이며 짧은 사거리로 인해 접근 중 공격받기 쉽다. 고대의 저주 무효로 고대종 대응 초데미지를 유지한다.',use:'고방 뒤에서 생산해 근접 전선에 투입한다. 반드시 메탈을 제거해야 하는 상황에는 확정 크리티컬 등 다른 수단을 함께 준비한다.'},
 moss:{strength:'에이리언·고대종·떠 있는 적의 움직임을 늦추고 50% 확률로 3.08초 저주를 거는 제어 지원이다. 저주가 적중하면 고대종의 저주 공격을 잠시 봉인할 수 있다.',weakness:'저주가 확률이라 단독으로 상대 능력을 계속 막는다고 보장할 수 없다. 자신에게 저주가 먼저 걸리면 속성 대상 느리게와 저주도 봉인된다.',use:'고방 뒤에서 사거리를 활용해 대응 속성을 붙잡고, 저주를 거는 적과 교전하는 아군을 지원한다.'},
 ruby:{strength:'빨간 적·고대종 무리를 100% 확률의 3초 정지로 붙잡는 범위 메즈다. 공격 간격도 3초라 같은 적에게 연속 적중하면 정지를 이어 갈 수 있다.',weakness:'사거리는 300이며 저주 무효가 없다. 적의 저주·아군의 히트백·표적 이동으로 공격이 끊기면 정지 유지가 풀린다.',use:'고방 뒤에서 대응 속성 무리를 멈추고 딜러가 공격할 시간을 만든다. 긴 사거리 적이나 저주를 먼저 거는 적은 다른 대응 수단을 함께 사용한다.'}
};
{const before=codexReviewAssessment;codexReviewAssessment=function(type,s){return s.trueForm&&THIRD80_ASSESSMENT[type]?THIRD80_ASSESSMENT[type]:before(type,s);};}
{const before=allyReview;allyReview=function(type,evolved){
 const html=before.apply(this,arguments),s=codexReviewStats(type,evolved);if(!s.trueForm||!THIRD80_ASSESSMENT[type])return html;
 const extra='<div class="third80-review"><h4>8.0 개발 · 3진 변화</h4><p>체력과 공격력이 각각 <b>150%</b>, <b>150%</b>로 늘었다. 현재 사거리는 냥코식 <b>'+catRange(s.range)+'</b>이다. 전용 대기·걷기·공격·넉백 모션이 적용된다.</p></div>',end=html.lastIndexOf('</section>');return end<0?html+extra:html.slice(0,end)+extra+html.slice(end);
};}
