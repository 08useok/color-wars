{const before=codexReviewAssessment;codexReviewAssessment=function(type,s){
 if(type!=='verdigris'||!s.trueForm)return before(type,s);
 return {strength:'늘어나는 스패너 팔로 세 번 공격하는 근접 연타 딜러다. 뒤 타격일수록 멀리 닿으며 마지막 타격의 밀치기와 열파로 뒤쪽 전선에도 피해를 보탠다.',weakness:'공격 시작 사거리는 짧고 이동속도도 느리다. 열파가 앞쪽 8부터 발생하므로 바로 앞의 적에게는 직접 타격으로 대응하며, 연타 도중 밀리면 후속타를 잃는다.',use:'고방 뒤에서 접근시킨 뒤 적이 겹친 전선에 투입한다. 긴 사거리의 적을 혼자 상대하기보다는 밀치기와 열파를 보태는 딜러로 쓴다.'};
};}
{const before=allyReview;allyReview=function(type,evolved){
 const html=before.apply(this,arguments),s=codexReviewStats(type,evolved);if(type!=='verdigris'||!s.trueForm)return html;
 const extra='<div class="verdigris-third-review"><h4>3진 변화</h4><p>7.5.0 버전에 3진이 추가되었다. 체력과 공격력이 각각 <b>150%</b>, <b>150%</b>로 늘고 공격 간격이 2.2초에서 <b>1.7초</b>로 줄었다. 직접 공격 한 주기의 피해를 세 번에 나눠 타격하며 도달 거리는 <b>7.2 → 12 → 18</b>로 늘어난다. 마지막 타격에 기존 밀치기가 적용되고 <b>열파</b>가 추가되었다.</p><p>열파는 앞쪽 8~30에 2초 동안 남으며 0.5초마다 마지막 타격 기본 피해의 50%를 준다. 짧은 공격 시작 거리와 느린 이동속도는 남아 있어 고방의 보호가 필요하다.</p></div>';
 const end=html.lastIndexOf('</section>');return end<0?html+extra:html.slice(0,end)+extra+html.slice(end);
};}
