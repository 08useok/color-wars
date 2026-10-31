const fs=require('fs'),assert=require('node:assert/strict'),{classify}=require('./detailed-tier-scale.cjs');
const before=require('../docs/simulations/tier-arena-detailed-grades-2026-10-31.json'),measured=require('../docs/simulations/release-75-tier-2026-10-31.json');
const rows=before.rows.filter(r=>!measured.composed.some(v=>v.id===r.id&&v.form===r.form));
for(const r of measured.composed)rows.push({...r,tier:classify(r.score,before.scale)});
assert.equal(rows.length,275);
fs.writeFileSync('docs/simulations/release-75-tier-merged-2026-10-31.json',JSON.stringify({scale:before.scale,rows},null,2));
let code=fs.readFileSync('scripts/make-detailed-tiers.cjs','utf8');
code=code.replaceAll('tier-arena-speed-grades-2026-10-30.json','release-75-tier-merged-2026-10-31.json').replace('scale=makeScale(source.rows)','scale=source.scale');
code=code.replaceAll('266','275').replaceAll('258','267');
code=code.replace('기존 9개 시험 맵 측정 점수와 전투 결과를 그대로 사용해 **275개 형태**의 등급 표시를 확장했다.','기존 266개 형태의 점수를 유지하고 7.5 신규 울슈레 4명의 1·2진과 베르디그리 3진을 같은 조건으로 추가 측정해 **275개 형태**를 평가했다. 추가 측정은 후보 486판 + 기준덱 54판이며 기준덱 결과가 이전 측정과 일치했다.');
code=code.replace('캐릭터 능력치·확률·공속·이속은 이번 작업에서 바꾸지 않았다.','7.5 신규 캐릭터를 기존 144개 2·3진의 맵별 분포에 위치시켰고 기존 캐릭터의 점수·등급은 유지했다. 7.5 출시 작업 중 측정 결과에 맞춘 추가 능력치 변경은 하지 않았다.');
code=code.replace('2026-10-31: 275개 형태의 기존 점수를 유지하며 총 114단계로 세분했다.','2026-10-31 v7.5: 신규 울슈레 4명 1·2진과 베르디그리 3진을 추가해 275개 형태를 총 114단계로 평가했다. 기존 266개 형태의 점수는 유지했다.');
const Module=require('module'),path=require('path'),file=path.resolve('scripts/_release75-tier-render.cjs'),m=new Module(file,module);m.filename=file;m.paths=module.paths;m._compile(code,file);
const after=JSON.parse(fs.readFileSync('docs/simulations/tier-arena-detailed-grades-2026-10-31.json'));for(const r of before.rows){const n=after.rows.find(v=>v.id===r.id&&v.form===r.form);assert.equal(n.score,r.score);assert.equal(n.tier,r.tier);}
console.log('NEW',after.rows.filter(r=>measured.composed.some(v=>v.id===r.id&&v.form===r.form)).map(r=>({id:r.id,form:r.form,tier:r.tier,score:r.score})));

for(const file of ['docs/티어표/티어표-1진-2진-3진-2026-10-31.md','docs/티어표/등급별-아군-1진-2진-3진-2026-10-31.md'])fs.writeFileSync(file,fs.readFileSync(file,'utf8').trimEnd()+'\n');
