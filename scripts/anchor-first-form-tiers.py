from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'scripts/make-all-form-tier-arenas.cjs';s=p.read_text(encoding='utf-8')
marker='const rows=data.composed.map'
prefix="""const anchor=require('../docs/simulations/tier-arena-current-2026-10-30.json'),prior=require('../docs/simulations/tier-arena-grades-2026-10-30.json');
for(const r of data.perMap){const refs=anchor.perMap.filter(v=>v.map===r.map);if(r.form===1)r.pct=(refs.filter(v=>v.gain<r.gain-1e-9).length+refs.filter(v=>Math.abs(v.gain-r.gain)<=1e-9).length/2)/refs.length;else r.pct=refs.find(v=>v.id===r.id&&v.form===r.form).pct;}
for(const c of data.composed)c.score=data.perMap.filter(r=>r.id===c.id&&r.form===c.form).reduce((sum,r)=>sum+r.pct/9,0);data.composed.sort((a,b)=>b.score-a.score);
data.firstForms.percentileReference='Fixed 144-form second/third distribution; existing scores and tiers preserved. First forms are inserted individually into each original map distribution.';
fs.writeFileSync('docs/simulations/tier-arena-all-forms-2026-10-30.json',JSON.stringify(data,null,2));
"""
assert marker in s;s=s.replace(marker,prefix+marker)
marker="for(const r of reference)r.tier=r.baseTier+'†';"
extra="""
for(const r of rows){const previous=prior.rows.find(v=>v.id===r.id&&v.form===r.form);if(previous){r.tier=previous.tier;assert.equal(r.score,previous.score,'preserved previous score '+r.id+':'+r.form);}else if(!r.coreMember&&r.baseTier!=='OP'){
 const refs=prior.rows.filter(v=>!v.coreMember&&v.baseTier===r.baseTier),plus=refs.filter(v=>v.tier.endsWith('+')),minus=refs.filter(v=>v.tier.endsWith('-'));
 r.tier=r.baseTier+(plus.length&&r.score>=Math.min(...plus.map(v=>v.score))?'+':minus.length&&r.score<=Math.max(...minus.map(v=>v.score))?'-':'');
}}
"""
assert marker in s;s=s.replace(marker,marker+extra)
s=s.replace('기존 2·3진의 전투 결과는 그대로 재사용하고, 1진이 추가된 전체 분포에서 백분위·등급·+/−를 다시 계산했다.','기존 2·3진의 전투 결과·점수·티어·+/−는 유지한다. 새 1진은 기존 144개 형태의 맵별 분포에 각각 넣어 백분위를 구하고, 같은 등급 경계와 기존 부호 경계로 평가했다. 전체 순위 번호는 1진 합류에 따라 달라진다.')
s=s.replace('OP 이외는 구간 안 상위·하위 1/3에 +/−를 붙이고 같은 점수는 같은 표기를 쓴다. 구간 인원이 3명 미만이면 부호를 붙이지 않는다.','기존 2·3진의 +/−는 구간 내 상위·하위 1/3로 정한 표기를 유지한다. 새 1진은 그 기존 점수 경계에 따라 부호를 붙인다.')
p.write_text(s,encoding='utf-8')
