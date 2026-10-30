from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'scripts/test-third74.cjs';s=p.read_text(encoding='utf-8').replace("assert.equal(s[key],b[key],id+' '+key)","assert.equal(s[key],id==='babypink'&&key==='interval'?3:b[key],id+' '+key)").replace('HP ATK costs cooldowns intervals unchanged','HP ATK costs cooldowns unchanged; Baby Pink third interval 3s');p.write_text(s,encoding='utf-8')
p=root/'reviews-74.js';s=p.read_text(encoding='utf-8').replace('느리게 지속시간이 1초 늘고 선딜과 후딜이 사라졌다.','공격 간격이 4.53초에서 3초로 줄고 느리게 지속시간이 1초 늘며 선딜과 후딜이 사라졌다.').replace('공격 간격과 느리게 발동 확률은 유지되어','느리게 발동 확률은 유지되어');p.write_text(s,encoding='utf-8')
p=root/'red-battle-doge.html';s=p.read_text(encoding='utf-8').replace('third-forms-74.js?v=1','third-forms-74.js?v=2').replace('reviews-74.js?v=1','reviews-74.js?v=2');p.write_text(s,encoding='utf-8')
p=root/'docs/3진-아종/7.4-네명-3진-능력-2026-10-30.md';s=p.read_text(encoding='utf-8').replace('공체·가격·생산 대기시간·공격 간격은 2진과 같다.','공체·가격·생산 대기시간은 2진과 같다. 베이비 핑크의 3진 공격 간격만 추가 승인에 따라 3초로 줄였다.').replace('선딜·후딜 삭제. 공격 간격·느리게 확률 유지','선딜·후딜 삭제. 공격 간격 3초·느리게 확률 유지');p.write_text(s,encoding='utf-8')
