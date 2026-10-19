const fs=require('fs'),path=require('path'),make=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const setup=['ally-comparison.js','codex-review.js','true-form-reviews.js','codex-verdict.js','codex-rarity-standing.js'].map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n')+`
globalThis.__exportSecondReviews=()=>{
 const saved=trueForms;try{trueForms=[];
 return ALLIES.map(type=>{const stats=codexReviewStats(type,true);if(stats.trueForm)throw Error('unexpected third form '+type);return {type,name:unitDisplayName(type,false,!data.units[type].noEvolve),noEvolve:!!data.units[type].noEvolve,html:allyReview(type,true)}});
 }finally{trueForms=saved}
};`;
const engine=make({extraSetup:setup});
const rows=globalThis.__exportSecondReviews();delete globalThis.__exportSecondReviews;
if(new Set(rows.map(r=>r.type)).size!==engine.roster.length)throw Error('roster mismatch');
const grades={basic:'기본',ex:'EX',rare:'레어',sr:'슈퍼 레어',uber:'울슈레'};
const plain=s=>s.replace(/<br\s*\/?\s*>/gi,'\n\n').replace(/<(?:b|strong)\b[^>]*>/g,'**').replace(/<\/(?:b|strong)>/g,'**').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\*\*([^*]+)\*\*([가-힣])/g,(_,text,suffix)=>'**'+text.trim()+'** '+suffix).replace(/[ \t]+\n/g,'\n').trim();
const lines=['# 2진 아군 도감 총평 — 2026-10-18','','도감의 2진 총평을 레어도별로 모았다. 합산 Lv.30 · 보물 완성 · 세계편 2·3장 가격 기준이며 실제 도감 수치는 계정의 보물 상태에 따라 달라진다. 진화가 없는 캐릭터는 현재 형태로 표시한다.','','레어도별 위치 평가는 황제의 야옹이 ★3 측정 순위를 기준으로 한다. 타입별 DPS와 최고 데미지는 조건부 이론값이며 최고 데미지에 필요한 조건을 함께 적었다.','',`총 ${rows.length}명. 3진은 [3진 캐릭터 총평](3진-캐릭터-총평-2026-10-18.md)을 참고한다.`,''];
for(const [grade,name]of Object.entries(grades)){
 const members=rows.filter(r=>engine.gradeOf(r.type)===grade);
 lines.push(`## ${name} (${members.length}명)`,'');
 for(const r of members){
  lines.push(`### ${r.name}${r.noEvolve?' (진화 없음)':r.name.endsWith('2진')?'':' — 2진'}`,'');
  const paragraphs=[...r.html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)];
  if(!paragraphs.length)throw Error('missing review '+r.type);
  for(const match of paragraphs)lines.push(plain(match[1]),'');
 }
}
fs.writeFileSync(path.join(root,'docs/2진-아군-도감-총평-2026-10-18.md'),lines.join('\n'));
console.log(`Exported ${rows.length} second-form reviews.`);
process.exit(0);
