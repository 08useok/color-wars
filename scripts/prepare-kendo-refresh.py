from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=root/'docs/simulations/tier-arena-speed-buff-2026-10-30.json'
backup=root/'docs/simulations/tier-arena-speed-before-kendo-2026-10-30.json'
if not backup.exists():backup.write_bytes(source.read_bytes())
s=(root/'scripts/refresh-second-speed-buff.cjs').read_text(encoding='utf-8')
s=s.replace("old=require('../docs/simulations/tier-arena-all-forms-2026-10-30.json')","old=require('../docs/simulations/tier-arena-speed-before-kendo-2026-10-30.json')")
s=s.replace("ids=['khaki','rose','maroon','garnet','cooper','fusioncream','kendonavy','hulasilver']","ids=['kendonavy']")
s=s.replace('data.speedBuff={ids,speed:1.2,interval:.85,battles:count,baselineChecks:checks.length,summary};',"data.speedBuff={...old.speedBuff,criticalKendo:.3,criticalRefreshBattles:count,baselineChecks:checks.length,summary:[...old.speedBuff.summary.filter(r=>r.id!=='kendonavy'),...summary]};")
(root/'scripts/refresh-kendo-critical.cjs').write_text(s,encoding='utf-8')
p=root/'scripts/test-second-speed-buff.cjs';s=p.read_text(encoding='utf-8').replace('expected.interval*=.85;','expected.interval*=.85;if(id===\'kendonavy\')expected.critChance=.3;').replace('8 second-form-only boosts;','8 second-form-only boosts and Kendo 30% critical;');p.write_text(s,encoding='utf-8')
p=root/'red-battle-doge.html';s=p.read_text(encoding='utf-8').replace('second-form-speed-buff.js?v=1','second-form-speed-buff.js?v=2');p.write_text(s,encoding='utf-8')
