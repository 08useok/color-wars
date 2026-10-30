from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'reviews-74.js';s=p.read_text(encoding='utf-8')
for a,b in [
 ('체력과 공격력은 유지된다.','체력과 공격력이 각각 <b>150%</b>, <b>150%</b>로 늘었다.'),
 ('공체·사거리·생산성은 2진과 같다.','사거리·생산성은 2진과 같다.'),
 ('3진에서도 공체·공격 간격·직접 사거리가 그대로여서','공체는 강화됐지만 공격 간격·직접 사거리는 그대로여서'),
 ('이동속도만 빨라졌고 짧은 사거리와 기존 공체·생산 대기시간은 남는다.','공체와 이동속도는 강화됐지만 짧은 사거리와 생산 대기시간은 남는다.'),
 ('새 시험 구역의 여러 맵을 합산했을 때도','공체 강화 전 시험에서도 여러 맵을 합산했을 때'),
 ('여러 시험 맵을 합산하면 2진보다','공체 강화 전 여러 시험 맵을 합산했을 때도 2진보다'),
 ('새 시험 구역에서는 2진과 3진 모두','공체 강화 전 시험에서는 2진과 3진 모두'),
 ('여러 시험 맵의 합산 기여도 2진보다','공체 강화 전 여러 시험 맵의 합산 기여도 2진보다'),
 ('새 시험에서도 빨라진 합류가','공체 강화 전 시험에서는 빨라진 합류가')]:s=s.replace(a,b)
p.write_text(s,encoding='utf-8')
p=root/'scripts/export-test-reviews-74.cjs';s=p.read_text(encoding='utf-8').replace('체력과 공격력은 유지된다.','체력과 공격력이 각각 **150%**, **150%**로 늘었다.').replace('기존 티어표는 유지한다.','기존 티어표는 유지한다. 시험 결과는 공체 강화 전 기록이며 현재 150% 공체의 성능 순위는 재측정 전이다.');p.write_text(s,encoding='utf-8')
p=root/'scripts/test-third74.cjs';s=p.read_text(encoding='utf-8').replace("id==='babypink'&&key==='interval'?3:b[key]","['hp','atk'].includes(key)?Math.round(b[key]*1.5):id==='babypink'&&key==='interval'?3:b[key]").replace('HP ATK costs cooldowns unchanged; Baby Pink third interval 3s','third HP ATK 150%; costs cooldowns unchanged; Baby Pink third interval 3s');p.write_text(s,encoding='utf-8')
p=root/'red-battle-doge.html';s=p.read_text(encoding='utf-8').replace('third-forms-74.js?v=2','third-forms-74.js?v=3').replace('reviews-74.js?v=4','reviews-74.js?v=5');p.write_text(s,encoding='utf-8')
p=root/'docs/3진-아종/7.4-네명-3진-능력-2026-10-30.md';s=p.read_text(encoding='utf-8');pos=s.index('\n');s=s[:pos+1]+'\n추가 변경: 라일락·베이비 핑크·마젠타·퓨전 크림 3진의 체력과 공격력을 각각 150%(+50%)로 강화했다. 수치가 별도로 지정되지 않아 적용한 초안이다. 아래 최초 기록과 기존 전투·티어 시험은 공체 강화 전 이력이다. 현재 공체 검사는 통과했고 승률·순위 재측정은 아직이다.\n'+s[pos+1:];p.write_text(s,encoding='utf-8')
