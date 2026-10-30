from pathlib import Path
root=Path(__file__).resolve().parents[1]
s=(root/'scripts/make-tier-arenas-current.cjs').read_text(encoding='utf-8')
for a,b in [
 ('tier-arena-current-2026-10-30.json','tier-arena-all-forms-2026-10-30.json'),
 ('assert.equal(rows.length,144)','assert.equal(rows.length,266)'),
 ('**144개 형태: 비교 가능한 140개 + 기준덱 멤버 4개 별도 참고.**','**266개 형태: 비교 가능한 258개 + 기준덱 4명의 1·2진 8개 별도 참고.** 1진 122명을 새로 측정해 합쳤다. 기존 2·3진의 전투 결과는 그대로 재사용하고, 1진이 추가된 전체 분포에서 백분위·등급·+/−를 다시 계산했다.'),
 ('기준덱 네 명은 본인을 뺀 덱과 비교해','기준덱 네 명의 1·2진은 본인을 뺀 덱과 비교해'),
 ('tier-arena-grades-2026-10-30.json','tier-arena-all-form-grades-2026-10-30.json'),
 ('티어표-2진-3진-2026-10-30.md','티어표-1진-2진-3진-2026-10-30.md'),
 ('등급별-아군-티어리스트-2026-10-30.md','등급별-아군-1진-2진-3진-2026-10-30.md'),
 ('최신 2진·3진 통합표','최신 1진·2진·3진 통합표'),
 ('9개 시험 맵 종합·144개 형태','9개 시험 맵 종합·266개 형태'),
 ('기준덱 네 명은 별도 참고.','기준덱 네 명의 1·2진은 별도 참고.'),
 ('PASS 144 tier entries, 140 ranked + 4 reference','PASS 266 tier entries, 258 ranked + 8 reference')]:s=s.replace(a,b)
s=s.replace("const intro='# 아군 티어표 ·", "const intro='# 아군 티어표 · 1진·2진·3진 ·")
marker="md+='\\n## 전체 순위"
addition="""md+='\\n## 캐릭터별 진화 비교\\n\\n|캐릭터|1진|2진|3진|\\n|---|---|---|---|\\n';for(const id of e.roster){const form=f=>{const r=rows.find(v=>v.id===id&&v.form===f);return r?r.tier+' ('+r.score.toFixed(3)+')':'—';};md+=`|${e.names[id]}|${form(1)}|${form(2)}|${form(3)}|\\n`;}\n"""
assert marker in s;s=s.replace(marker,addition+marker)
(root/'scripts/make-all-form-tier-arenas.cjs').write_text(s,encoding='utf-8')
