const fs=require('fs'),path=require('path'),make=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const setup=['codex-review.js','true-form-reviews.js'].map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n')+`
globalThis.__exportTrueReviews=()=>Object.keys(TRUE_FORM_REVIEW_RELEASE).map(t=>{trueForms=[t];const before=JSON.stringify(trueForms),html=allyReview(t,true);if(JSON.stringify(trueForms)!==before)throw Error('save mutated '+t);return{type:t,name:unitDisplayName(t,true,true),version:TRUE_FORM_REVIEW_RELEASE[t],html}});
`;
make({extraSetup:setup});const rows=globalThis.__exportTrueReviews();delete globalThis.__exportTrueReviews;
const plain=s=>s.replace(/<b>/g,'**').replace(/<\/b>/g,'**').replace(/<[^>]+>/g,'');
const lines=['# 3진 캐릭터 총평 — 2026-10-18','','도감과 같은 문장을 내보냈다. 합산 Lv.30·3진·세계편 2·3장 가격 기준. 이 문서는 시험 도구의 보물 완성 상태 수치를 사용하며, 실제 도감은 계정의 현재 보물 효과를 반영한다. 첫 도입 버전과 현재 수치를 구분하며 과거 출시 당시의 수치라고 해석하지 않는다.','','형식: 추가 버전 → 체력·공격력 및 추가/강화 효과 → 보완된 약점 → 강화된 장점 → 남아 있는 단점.',''];
for(const r of rows){lines.push('## '+r.name,'');for(const m of r.html.matchAll(/<p>([\s\S]*?)<\/p>/g))lines.push(plain(m[1]),'');}
lines.push('## 버전 기록 근거','','- 크림: 전용 3진 표시/이름 구현 4.5.0(`209ff31`), 이후 강화 4.6.2(`40a2fc4`). 일반 3진 시스템 자체는 그보다 앞서 도입됐다.','- 핫 핑크: 4.7.0(`1762f66`).','- 살몬: 6.0.1(`80e7d17`), 이후 파동 스토퍼 추가(`5c231f3`).','- 골드·베이지: 6.0.1(`d84ee46`). 6.1.0 공지에도 다시 기재돼 있으나 첫 전용 형태 도입 버전은 6.0.1이다.','- 클로버: 6.1.0(`75e5ff9`). 공격 간격 조정은 이후 `b3c8b49`.','- 라즈베리: 능력 정의 6.4.0(`8d85ffd`), 크리스탈·인디고: 능력 정의 6.4.0(`9292fbf`). 전용 모션은 6.6.0(`06eb2ae`).','','원본은 `true-form-reviews.js`, 수치는 `codexReviewStats()`·`unitStats()`에서 읽는다. 능력치와 진화 조건은 변경하지 않았다.');
fs.writeFileSync(path.join(root,'docs/3진-캐릭터-총평-2026-10-18.md'),lines.join('\n'));
console.log('Exported '+rows.length+' true-form reviews; ownership unchanged.');
