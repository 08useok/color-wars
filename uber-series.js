// 울슈레 시리즈(소속) 표기. 같은 직업·분위기의 울슈레를 시리즈 이름으로 묶어 획득 문구·도감에 보여 준다.
// 이름만 있고 전용 스테이지는 아직 없다(새 메인 장 금지 규칙에 맞춰 강림·광란형으로 만들 예정).
const UBER_SERIES={
 prism:'글라스 군단',amber:'글라스 군단',
 rainbow:'LGBT',
 orchid:'인스톨 연합',
 iron:'아이언즈',grey:'아이언즈',bronze:'아이언즈',
 carmine:'복싱즈',
 banana:'스위츠',butter:'스위츠',vanilla:'스위츠'
};
// 프로필 글에 시리즈가 아직 안 적힌 캐릭터만 앞에 붙인다.
const UBER_SERIES_PROFILE={grey:'아이언즈의 금속 가공 기술자. ',amber:'글라스 군단의 레진 공예가. ',bronze:'아이언즈의 ',banana:'스위츠의 ',butter:'스위츠의 ',vanilla:'스위츠의 '};// 브론즈~바닐라의 본문은 직업으로 시작하므로 시리즈만 붙인다
for(const [id,series] of Object.entries(UBER_SERIES)){
 if(!ALLIES.includes(id))continue;
 ACQUIRE_TEXT[id]=series+' · 뽑기로 획득';
}
for(const [id,pre] of Object.entries(UBER_SERIES_PROFILE)){
 if(PROFILE_TEXT[id]&&!PROFILE_TEXT[id].startsWith(pre))PROFILE_TEXT[id]=pre+PROFILE_TEXT[id];
}
// 도감의 '획득 방법'에도 시리즈를 붙인다.
const _uberSeriesHow=allyHowToGet;
allyHowToGet=function(t){const r=_uberSeriesHow.apply(this,arguments);return r&&UBER_SERIES[t]?`${UBER_SERIES[t]} · ${r}`:r};
renderNewButtons();renderTraining();
