// 울슈레 시리즈(소속) 표기. 같은 직업·분위기의 울슈레를 시리즈 이름으로 묶어 획득 문구·도감에 보여 준다.
// 이름만 있고 전용 스테이지는 아직 없다(새 메인 장 금지 규칙에 맞춰 강림·광란형으로 만들 예정).
const UBER_SERIES={
 prism:'글라스 군단',amber:'글라스 군단',
 rainbow:'LGBT',
 orchid:'인스톨 연합',
 iron:'아이언즈',grey:'아이언즈',// 아이언즈 = 좀비 저격 시리즈 (좀비 발생 스테이지가 사냥터)
 bronze:'인스톨 연합',
 carmine:'복싱즈',crisp:'복싱즈',
 banana:'스위츠',butter:'스위츠',vanilla:'스위츠',
 acid:'아이언즈',spring:'가든즈',
 lime:'스위츠',emerald:'글라스 군단',
 aquamarine:'워터즈',royalblue:'워터즈',turquoise:'워터즈',sapphire:'복싱즈',night:'인스톨 연합',fuchsia:'아이언즈',rose:'가든즈',
 platinum:'아이언즈'
};
// 프로필 글에 시리즈가 아직 안 적힌 캐릭터만 앞에 붙인다.
const UBER_SERIES_PROFILE={grey:'아이언즈의 금속 가공 기술자. ',amber:'글라스 군단의 레진 공예가. ',bronze:'인스톨 연합의 ',banana:'스위츠의 ',butter:'스위츠의 ',vanilla:'스위츠의 ',acid:'아이언즈의 ',spring:'가든즈의 ',lime:'스위츠의 ',emerald:'글라스 군단의 ',aquamarine:'워터즈의 ',royalblue:'워터즈의 ',sapphire:'복싱즈의 ',night:'인스톨 연합의 ',fuchsia:'아이언즈의 ',rose:'가든즈의 ',platinum:'아이언즈의 '};// 브론즈~바닐라의 본문은 직업으로 시작하므로 시리즈만 붙인다
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
