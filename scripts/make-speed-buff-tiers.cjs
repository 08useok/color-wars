const fs=require('fs');let code=fs.readFileSync('scripts/make-all-form-tier-arenas.cjs','utf8');
code=code.replaceAll('tier-arena-all-forms-2026-10-30.json','tier-arena-speed-buff-2026-10-30.json');
code=code.replace('else r.pct=refs.find(v=>v.id===r.id&&v.form===r.form).pct;',"else if(!(r.form===2&&data.speedBuff.ids.includes(r.id)))r.pct=refs.find(v=>v.id===r.id&&v.form===r.form).pct;");
code=code.replace('if(previous){r.tier=previous.tier;',"if(previous&&!(r.form===2&&data.speedBuff.ids.includes(r.id))){r.tier=previous.tier;");
// Existing first-form labels also remain anchored to the original reference.
code=code.replace('const intro=',"const intro=");
code=code.replace('기존 2·3진의 전투 결과·점수·티어·+/−는 유지한다.', '기존 결과를 재사용하되 1진보다 티어가 낮던 2진 8명은 이속 +20%·공격 간격 15% 단축 후 432판 재측정하고 기준덱 54판을 확인했다. 다른 형태의 점수와 티어는 유지한다.');
code=code.replace("fs.writeFileSync('docs/simulations/tier-arena-all-form-grades-2026-10-30.json'", "fs.writeFileSync('docs/simulations/tier-arena-speed-grades-2026-10-30.json'");
const Module=require('module'),path=require('path'),file=path.resolve('scripts/_speed-tier-render.cjs'),m=new Module(file,module);m.filename=file;m.paths=module.paths;m._compile(code,file);
fs.appendFileSync('docs/티어표/README.md','\n2진 8명의 이동·공격속도 상향을 반영했다. [변경·재시험 결과](../기획-시험/2진-이속-공속-상향-2026-10-30.md).\n');
