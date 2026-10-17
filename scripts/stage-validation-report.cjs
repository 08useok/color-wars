const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),p=path.join(root,'docs/simulations/all-stage-validation-2026-10-08.json');
const r=JSON.parse(fs.readFileSync(p,'utf8'));
r.method='현재 game.js의 전투·출현·경제·투사체·넉백 코드를 사용한 화면 없는 시뮬레이션. 성 위치는 적 중심 10/앞면 12, 아군 중심 90/앞면 88로 고정. Lv.30·2진·+0·3진 없음, 경제 강화 최대, 모든 장 클리어 보너스와 해당 장 억제기 적용, 모든 아군 보유. 일반 공통 덱과 4성 전용 덱에서 실제 야옹컴 출격 정책 사용. 아이템·성포 사용 없음. 조건당 씨드 1로 1회, 30fps, 300초 제한. 캐릭터별 비교·최적 플레이·브라우저 화면 검증이 아님.';
r.decks={normal:['red','yellow','brick','indigo','ribbonorange','rainbow','cornflower','khaki','silver','fusioncream'],fourStar:['white','brown','brick','moss','silver','navy','lava','magenta','ribbonorange','garnet']};
r.sourceSha256=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'game.js'))).digest('hex');
if(r.total!==983||new Set(r.rows.map(t=>`${t.i}:${t.crown}`)).size!==983)throw Error('Incomplete stage coverage');
if(new Set(r.rows.map(t=>t.i)).size!==443)throw Error('Incomplete stage inventory');
if(r.rows.some(t=>!Number.isFinite(t.seconds)||!Number.isFinite(t.allyHp)||!Number.isFinite(t.enemyHp)))throw Error('Invalid battle result');
fs.writeFileSync(p,JSON.stringify(r,null,2));
const groups={};for(const row of r.rows){const key=row.crown>1?`레전드 ${row.crown}성`:'기본/레전드 1성';const g=groups[key]||(groups[key]={total:0,win:0,loss:0,timeout:0});g.total++;g[row.win?'win':row.timeout?'timeout':'loss']++;}
let md='# 전체 스테이지 자동 전투 검증 — 2026-10-08\n\n'+r.method+'\n\n';
md+=`등록된 443개 스테이지와 레전드 1~4성을 합친 983개 전투 조건을 모두 실행했다. **승리 ${r.wins}, 패배 ${r.losses}, 시간 초과 ${r.timeouts}.** 이 숫자는 조건당 한 번의 결과이며 승률 추정치가 아니다. 시간 초과는 패배와 구분했다.\n\n`;
md+='|범위|실행|승리|패배|시간 초과|\n|---|---:|---:|---:|---:|\n';for(const [k,g]of Object.entries(groups))md+=`|${k}|${g.total}|${g.win}|${g.loss}|${g.timeout}|\n`;
md+='\n## 해석\n\n모든 스테이지 조건을 실행한 것과 모든 캐릭터의 순위를 검증한 것은 다르다. 이번에는 두 고정 덱의 자동 전투 결과를 측정했다. 따라서 옐로우·살몬·피치·미드나잇의 단독 1위·꼴찌를 이 결과로 확정할 수 없다. 같은 슬롯에 캐릭터를 교체한 비교, 역할에 맞는 편성, 반복 난수 실험과 획득 시기 조건이 추가로 필요하다. 기존 최고·최악 문구는 수치와 일반 운용에 대한 평가이며, 전 스테이지 승률로 입증된 순위가 아니다.\n\n';
md+='## 조건별 결과\n\n|스테이지 ID|이름|성|결과|초|아군 성 HP|적 성 HP|\n|---:|---|---:|---|---:|---:|---:|\n';for(const t of r.rows)md+=`|${t.i}|${t.name}|${t.crown}|${t.win?'승리':t.timeout?'시간 초과':'패배'}|${t.seconds}|${Math.round(t.allyHp)}|${Math.round(t.enemyHp)}|\n`;
fs.writeFileSync(path.join(root,'docs/all-stage-validation-2026-10-08.md'),md);
console.log(JSON.stringify({stages:443,total:r.total,wins:r.wins,losses:r.losses,timeouts:r.timeouts,groups},null,2));
