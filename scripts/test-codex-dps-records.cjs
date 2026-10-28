const fs=require('fs'),assert=require('assert/strict'),make=require('./full-harness.cjs');
const source=['ally-comparison.js','codex-review.js','codex-trait-dps-records.js','codex-review-consistency.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n');
const e=make({extraSetup:source+`\nglobalThis.__records={review:allyReview,records:CODEX_TRAIT_DPS_RECORDS,snapshot:()=>JSON.stringify({training,cleared,trueForms,selectedStage}),form:t=>{trueForms=[t]}};`});
const t=globalThis.__records;delete globalThis.__records;
const expected={sapphire:['무속성 적','좀비 적','52,269'],rainbow:['빨간 적','천사','에이리언','67,200','56,000'],amber:['떠 있는 적','검은 적','113,432'],fuchsia:['메탈','18,605','메탈 킬러']};
const paragraphs=[];
for(const [id,words]of Object.entries(expected)){
 const before=t.snapshot(),html=t.review(id,true);assert.equal(before,t.snapshot());assert(html.includes('codex-dps-record'));assert(html.includes('보물 완성'));for(const word of words)assert(html.includes(word),id+' '+word);
 assert(!t.review(id,false).includes('codex-dps-record'),id+' first form');paragraphs.push({id,text:html.match(/<p class="codex-dps-record">([\s\S]*?)<\/p>/)[1].replace(/<[^>]+>/g,'')});
}
t.form('ivory');assert(!t.review('ivory',true).includes('codex-dps-record'),'metal killer is not falsely ranked');assert(!t.review('red',true).includes('codex-dps-record'));
assert.equal(t.records.flatMap(r=>r.traits).length,8);
fs.mkdirSync('docs/총평',{recursive:true});fs.writeFileSync('docs/총평/속성별-DPS-1위-총평-2026-10-28.md','# 속성별 DPS 1위 총평\n\n'+paragraphs.map(p=>'## '+e.names[p.id]+' 2진\n\n'+p.text+'\n').join('\n'));
console.log('PASS: eight trait records, four second-form reviews, full-treasure basis, metal-killer caveat, no first/other-form badges or save mutations.');
