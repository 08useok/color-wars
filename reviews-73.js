const ASSESSMENTS73={
 sunflower:{strength:'검은 적·천사 전선을 넓게 덮는 범위 둔화 지원이다. 앞뒤로 퍼지는 타격 구간 덕분에 인식 거리 주변에 겹친 적과 뒤로 넘어온 적을 함께 견제할 수 있다.',weakness:'둔화가 확률이고 공격 간격보다 기본 지속시간이 짧아 혼자서는 제어를 끊임없이 유지하기 어렵다. 검은 적·천사 외에는 둔화가 적용되지 않는다.',use:'검은 적·천사 맵에서 고방 뒤에 배치하고, 확정 메즈나 빠른 범위 딜러와 함께 운용한다.'},
 fern:{strength:'빠른 이동으로 전선에 도착해 떠 있는 적·에이리언의 공격을 약화하는 범위 지원이다. 약화를 반복해서 걸면 고방과 근접 딜탱이 버티는 시간을 늘릴 수 있다.',weakness:'빠른 이동 때문에 고방을 앞질러 먼저 공격받을 수 있고, 약화는 적의 공격이나 이동 자체를 막지 않는다. 적용 속성이 아닌 적에게는 보조 효과가 없다.',use:'고방을 먼저 생산한 뒤 투입한다. 떠 있는 적·에이리언이 강한 한 방을 넣는 전선에서 주력 딜러가 버티도록 보조한다.'},
 jade:{strength:'빨간 적·검은 적에게 받는 피해를 줄이며 근거리에서 범위 공격을 넣는 딜탱이다. 확률 밀치기가 발동하면 적의 접근을 끊고 전선을 정돈할 수 있다.',weakness:'사거리가 짧아 접근 중에 맞고, 대응 속성 밖의 적에게는 맷집이 적용되지 않는다. 밀치기는 확률이며 아군의 준비된 공격을 빗나가게 할 수도 있다.',use:'빨간 적·검은 적을 고방 뒤에서 받아내며 싸울 때 투입한다. 긴 사거리의 딜러를 함께 넣어 밀어낸 적에게도 공격을 이어 가게 한다.'},
 violet:{strength:'3진은 공체가 120%로 늘고 둔화 확률과 지속시간이 강화된 범위 메즈다. 메탈을 제외한 여러 속성의 적을 함께 늦춰 고방 뒤 전선을 안정시키는 역할이 좋아졌다.',weakness:'둔화는 여전히 확률이고 메탈에는 통하지 않는다. 짧은 사거리와 제한적인 직접 화력 때문에 혼자 적을 정리하기 어렵다.',use:'여러 속성이 섞인 전선에서 고방과 범위 딜러 사이를 보조한다. 중요한 보스의 확정 제어는 별도 요원과 분담한다.'},
 orchid:{strength:'3진은 공체가 120%로 늘고 열파가 더 넓고 강하게 이어지는 범위 딜러다. 직접 공격 뒤에도 열파 구간에 남은 적에게 피해를 누적해 겹친 전선을 정리한다.',weakness:'열파가 생긴 위치에서 적이 벗어나면 추가 피해를 온전히 넣지 못한다. 긴 공격 간격과 생산 비용 때문에 고방이 무너지면 손실이 크다.',use:'고방과 메즈로 적을 열파 구간에 묶고 뒤에서 누적 화력을 넣는다. 빠르게 이동하는 적은 둔화·정지 요원으로 보조한다.'}
};
{const before=codexReviewAssessment;codexReviewAssessment=function(id,s){return ASSESSMENTS73[id]&&(!THIRD73_NAMES[id]||s.trueForm)?ASSESSMENTS73[id]:before(id,s)};}
{const before=allyReview;allyReview=function(id,evolved){const html=before.apply(this,arguments),s=codexReviewStats(id,evolved);if(!s.trueForm||!THIRD73_NAMES[id])return html;
 const extra='<div class="third73-review"><h4>3진 변화</h4><p>7.3.0 버전에 3진이 추가되었다. 체력과 공격력이 각각 <b>120%</b>, <b>120%</b>로 늘었다.</p>'+ (id==='violet'?'<p>메탈 제외 둔화가 <b>65%·3.5초</b>로 강화되었다. 공격 간격·사거리와 범위 공격은 유지한다.</p>':'<p>열파 구간이 <b>20~56</b>, 회당 공격력 비율이 <b>60%</b>로 강화되었다. 지속시간 <b>2.4초</b>·타격 간격 <b>0.6초</b>는 유지한다.</p>')+'</div>';
 const at=html.lastIndexOf('</section>');return at<0?html+extra:html.slice(0,at)+extra+html.slice(at);};}
