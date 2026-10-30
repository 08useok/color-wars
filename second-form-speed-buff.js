// User-requested boost for second forms graded below their own first forms.
// Scope is explicitly second form only; owned third forms do not inherit it.
const SECOND_FORM_SPEED_BUFF_IDS=['khaki','rose','maroon','garnet','cooper','fusioncream','kendonavy','hulasilver'];
{const before=unitStats;unitStats=function(type,...args){const s=before(type,...args);if(s.evolved&&!s.trueForm&&SECOND_FORM_SPEED_BUFF_IDS.includes(type)){s.speed*=1.2;s.interval*=.85;if(type==='kendonavy')s.critChance=Math.min(1,Math.round(s.critChance*1.5*1e6)/1e6);}return s;};}
for(const id of SECOND_FORM_SPEED_BUFF_IDS){EVOLUTION_TEXT[id]+=' · 이동속도 +20% · 공격 간격 -15%';PROFILE_TEXT_EVOLVED[id]+=' 2진 이동속도가 20% 늘고 공격 간격이 15% 줄었다.';}
EVOLUTION_TEXT.kendonavy+=' · 크리티컬 20% → 30%';PROFILE_TEXT_EVOLVED.kendonavy+=' 크리티컬 확률이 기존보다 50% 늘어 30%가 되었다.';
