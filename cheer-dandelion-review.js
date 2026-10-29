const CHEER_DANDELION_ASSESSMENT={strength:'사거리 안의 메탈을 우선 골라 한 마리씩 확실히 제거하는 장거리 개체 딜러다. 확정 크리티컬과 메탈 킬러 100% 덕분에 고배율 메탈도 정상적으로 타격하면 처치할 수 있어, 필요한 타격 횟수가 늘어나는 부담이 작다.',weakness:'공격 간격 8초·선딜 1.6초 동안 제어가 풀리면 먼저 쓰러지거나 공격이 끊길 수 있다. 개체 공격이라 메탈 무리를 한 번에 정리하기 어렵고, 낮은 체력과 긴 생산 시간 때문에 손실 후 공백이 크다.',use:'고방과 메탈 정지·느리게 요원 뒤에서 메탈 사이클론이나 고배율 메탈을 저격한다. 메탈이 없는 전선에서는 다른 적을 공격하지만, 긴 공격 주기를 고려해 잡몹 정리는 빠른 범위 딜러에게 맡긴다.'};
CHEER_DANDELION_ASSESSMENT.strength='높은 체력의 메탈 한 마리를 제거하는 역할에서는 매우 강력하다. 메탈 킬러 100%라 배율이 높아져도 필요한 정상 타격은 한 번이며, 메탈 우선 조준 덕분에 앞의 일반 잡몹에게 긴 공격 주기를 낭비하는 일을 줄인다. 현재 메탈 적 9종을 각각 1배·10배·100배·1,000배 체력으로 시험해 한 타격 처치를 확인했다. 반면 메탈이 없는 기준 맵에서는 클리어 단축이 작게 측정되어, 메탈이 섞인 전선에 골라 넣을 때 가치가 크다. '+CHEER_DANDELION_ASSESSMENT.strength;
{const before=codexReviewAssessment;codexReviewAssessment=function(type,s){return type==='cheerdandelion'?CHEER_DANDELION_ASSESSMENT:before(type,s);};}
{const before=allyReview;
 allyReview=function(type,evolved){const html=before.apply(this,arguments);if(type!=='cheerdandelion')return html;
 const extra='<div class="cheer-dandelion-review"><h4>응원단 민들레의 특징</h4><p><b>사거리 안의 메탈 적을 우선 공격</b>한다. 메탈이 없으면 가장 가까운 일반 적을 공격하며, 사거리 밖이나 뒤쪽 메탈을 억지로 쫓지 않는다.</p><p><b>크리티컬 100%·메탈 킬러 100%</b>로 맞힌 메탈 한 마리를 남은 체력과 배율에 관계없이 처치한다. 개체 공격이므로 한 번에 한 마리씩만 처리하며, 베리어·무적 등으로 타격 자체가 막히면 처치하지 못한다. 비메탈 적에게는 메탈 킬러가 적용되지 않는다.</p><p>원본 민들레보다 히트백이 1회 많은 <b>4회</b>이며, 사각지대 없이 앞의 적도 타격한다. 대신 <b>공격 간격 8초·선딜 1.6초</b>와 낮은 체력 때문에 고방·메즈의 보호가 필요하다.</p><p>좀비 사이클론 강림 <b>롤링 데드 / 윤회의 소용돌이</b> 클리어 시 30% 확률로 획득하는 슈퍼 레어다. 보상 추가 전에 해당 강림을 클리어한 기록에는 한 번 지급한다.</p></div>';
 const s=codexReviewStats(type,evolved),n=codexReviewNumber;
 const stats='<p>7.2.0 버전에 추가된 민들레의 여성 아종이다. '+(s.evolved?'2진은 체력과 공격력이 각각 <b>115%</b>가 되며, 사거리·확정 크리티컬·메탈 우선 공격을 유지한다.':'1진은 둥근 몸과 초록 목도리, 홀씨 폼폼을 갖춘 응원단원이다.')+'</p><p>현재 도감 기준 크리티컬 한 타격 피해는 <b>'+n(s.atk*(s.critMult||2))+'</b>, 비메탈 상대 직접 공격 DPS는 <b>'+n(s.atk*(s.critMult||2)/s.interval)+'</b>이다. 메탈은 남은 체력 비례 처치이므로 고정 피해나 DPS로 표시하지 않는다.</p>';
 const end=html.lastIndexOf('</section>');return end<0?html+extra+stats:html.slice(0,end)+extra+stats+html.slice(end);
 };
}
