const CYCLONE81_REVIEWS={
 explorermintcyan:{strength:'고대종과 메탈에게 받는 피해를 줄이는 저가 양산 고방이다. 고대의 저주 무효로 고대종에게 맞아도 맷집이 봉인되지 않고, 확률 생존으로 전선을 잠시 더 유지할 수 있다.',weakness:'공격력이 낮아 적을 처리하는 역할은 맡기 어렵다. 다른 속성에는 맷집이 적용되지 않으며 확률 생존도 항상 발동하지는 않는다.',use:'고대종·메탈 전선에 반복 생산해 메즈와 딜러가 공격할 시간을 번다. 범위 딜러와 크리티컬 요원을 함께 편성한다.'},
 anchorgrey:{strength:'워프 무효로 스타 에이리언 앞에서 공격 기회를 유지하는 개체 딜러 겸 지원이다. 에이리언 느리게와 20% 크리티컬을 함께 가져 메탈이 섞인 전선에도 유효타를 노린다.',weakness:'개체 공격이며 크리티컬과 느리게가 모두 확률이다. 많은 잡몹이 앞을 가리거나 긴 사거리 범위 공격을 받으면 역할을 수행하기 어렵다.',use:'고방 뒤에서 에이리언을 늦추고 메탈에게 반복 공격하게 한다. 반드시 즉시 제거해야 하는 메탈에는 확정 크리티컬 요원을 보조로 사용한다.'}
};
{const before=codexReviewAssessment;codexReviewAssessment=function(id,s){return CYCLONE81_REVIEWS[id]||before(id,s);};}
