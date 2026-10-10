// 못 깨던 스테이지 완화(2026-10-11). 원작 배율을 그대로 옮긴 레전드·미래·우주편 스테이지 중
// 방어 유닛을 먼저 내보내는 사람 수준의 플레이로도 못 깨던 것들만, 시험 출격으로 '좋은 덱이 깨는 선'까지 낮췄다.
// scale: 모든 적 배율에 곱함 / mag: 적 종류별 배율 지정 / hp: 적 성 체력 / 적 배율은 최소 25%.
const STAGE_TUNING=[
 // 한 마리 홍당무왕이 초반 10초 만에 성을 부숨 → 배율만 낮춤 (적 성 체력이 1만이라 빠르게 끝내는 스테이지)
 {name:'고문실',chapter:4,mag:{shyboy:250}},
 // 시작하자마자 달려드는 적: 싼 방어 유닛을 먼저 내보내면 막을 수 있는 선
 {name:'벤젠 밭',chapter:4,mag:{raind:200}},
 {name:'초이바트론 별',chapter:8,scale:.7},
 {name:'아가페의 우리',chapter:4,scale:.7},
 // 파동 적이 있는 스테이지: 파동 스톱퍼(어부 살몬 3진)를 넣으면 깰 수 있는 선
 {name:'아버지의 등',chapter:4,scale:.6},
 {name:'저녁노을의 표효',chapter:4,scale:.7},
 {name:'수상한 지방자치제',chapter:4,scale:.6},
 {name:'게슈탈트, 붕괴',chapter:4,scale:.3},
 {name:'고양이의 증거',chapter:4,scale:.4},
 {name:'메타볼릭 신드롬',chapter:4,hp:600000,mag:{shibalien:800,phace:200,alienbunbun:30,galaxynyandam:100}},
 {name:'뉴욕',chapter:6,mag:{liz56:100}},
 {name:'태국',chapter:7,scale:.35},
 {name:'뉴욕',chapter:7,scale:.7,mag:{liz56:100}},
 {name:'달',chapter:7,scale:.4},
 {name:'크림슨 별',chapter:8,mag:{liz56:70,pigge:750}}
];
for(const t of STAGE_TUNING){
 const i=STAGES.findIndex(s=>s.name===t.name&&s.chapter===t.chapter),rules=STAGE_SPAWNS[i];
 if(i<0||!rules)continue;
 for(const r of rules){
  if(t.scale)r.mag=Math.max(25,Math.round((r.mag||100)*t.scale));
  if(t.mag&&t.mag[r.type]!==undefined)r.mag=t.mag[r.type];
 }
 if(t.hp)STAGES[i].hp=t.hp;
 // 설명에 적힌 '최대 N%'를 바뀐 배율에 맞춘다
 if(/최대 \d+%/.test(STAGES[i].desc||'')){
  const top=Math.max(...rules.map(r=>r.mag||100));
  STAGES[i].desc=STAGES[i].desc.replace(/최대 \d+%/,'최대 '+top+'%');
 }
}
