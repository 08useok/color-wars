from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'red-battle-doge.html';s=p.read_text(encoding='utf-8');marker='<script src="tier-test-stages.js?v=1"></script>';extra='<script src="second-form-speed-buff.js?v=1"></script>'
if extra not in s:
 assert marker in s;s=s.replace(marker,extra+marker)
p.write_text(s,encoding='utf-8')
p=root/'scripts/full-harness.cjs';s=p.read_text(encoding='utf-8');marker="'tier-test-stages.js'];"
if "'second-form-speed-buff.js'" not in s:
 assert marker in s;s=s.replace(marker,"'second-form-speed-buff.js','tier-test-stages.js'];")
p.write_text(s,encoding='utf-8')
