// 7.1 design correction: the planned third form belongs to Ivory, not Light Cream.
// Preserve the agreed draft multipliers/abilities and all first/second-form stats.
TRUE_NAME.ivory='젤라또 아이보리';// 와플 크림·바느질 베이지처럼 '소재 + 이름'. 3단 아이스크림 콘 소품과 맞춤(가칭)
TRUE_FORM_HP_MULT.ivory=1.4;TRUE_FORM_ATK_MULT.ivory=1.4;
// 2진 슬로우 60%·2.5초 → 100%·3초, 공격 간격 3초 → 2.5초(간격이 지속시간보다 짧아 슬로우가 거의 끊기지 않는다). 슬로우는 statusVs가 없어 메탈·보스를 포함한 모든 적에게 걸린다.
TRUE_FORM_BONUS.ivory={critChance:.4,critMult:2.5,metalKiller:.12,slowChance:1,slowDuration:3,interval:2.5};
