{const before=allyReview;allyReview=function(id,evolved){let html=before.apply(this,arguments);const s=codexReviewStats(id,evolved),c=THIRD81[id];if(!c||!s.trueForm)return html;
 const control=c.freezeChance?`메탈 정지 확률이 <b>${Math.round(c.freezeChance*100)}%</b>로 증가했다.`:c.atkDownChance?'메탈 공격력 다운 확률이 <b>65%</b>로 증가했다.':'';
 const text=`<section class="third81-review"><h4>8.1 · 3진 변화</h4><p>체력과 공격력이 각각 <b>280%</b>로 늘었다. 사거리는 <b>${c.range}</b>, 크리티컬 확률은 <b>${Math.round(c.crit*100)}%</b>이며 ${c.hits.length}연타로 공격한다. ${control}</p><p>각 타격은 총 공격력을 나누어 주며 크리티컬과 메즈를 따로 판정한다. 메탈 전선에서 반복적으로 유효타를 노리기 좋아졌다. 다만 확률이므로 필요한 순간의 실패가 남고, 긴 사거리 적에게는 고방 지원이 필요하다.</p></section>`;
 return html+text;
};}
