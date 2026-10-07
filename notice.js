// Game version and the in-game update notice. Like the original, MAJOR goes up when a big story opens:
// v1 세계편 (first push, 2026-09-24) · v2 레전드 스토리 (09-30) · v3 미래편 1장 (10-03) · v4 미래편 2장 + 3진 (10-06).
// Between those, every push counts: a new feature bumps MINOR, fixes/balance only bump PATCH.
// A new NOTICE.version shows the notice once on load; the 공지 button on the stage screen reopens it.
const GAME_VERSION='4.3.1';
const NOTICE={version:GAME_VERSION,date:'2026-10-07',title:`v${GAME_VERSION} 업데이트`,html:`
<p class="notice-lead">지금까지 <b>세계편 1~3장 · 미래편 1~2장 · 레전드 스토리 1~25장</b>을 담았습니다. 다음은 미래편 3장입니다.</p>
<h3>⚠️ 레벨 초기화 문제 사과</h3>
<p>10월 6일 밤 업데이트 뒤 캐릭터 레벨이 Lv.1로 돌아가는 문제가 있었습니다. 수정되었고, 피해를 입은 저장은 얻은 캐릭터 전부를 <b>Lv.30(2진)</b>으로 한 번 복구했습니다. 불편을 드려 죄송합니다.</p>
<h3>🆕 새 스테이지</h3>
<ul><li><b>레전드 스토리 13~25장</b>: 초밥 아일랜드 ~ 전쟁의 흔적, 88스테이지와 신규 적 18종</li>
<li><b>미래편 2장</b>: 미래편 1장 달 클리어 후 · 신규 적 8종</li>
<li><b>리본 샤트 강림</b>: 극난도(30%) → 초극난도(100%), 보스 콩 도둑 너구리</li>
<li><b>개다래 축제</b>: 매일 · 요일마다 개다래 색이 바뀌고 주말엔 에픽 개다래</li></ul>
<h3>✨ 새 캐릭터</h3>
<ul><li><b>리본 샤트</b> (EX): 콩폭탄 중거리 범위 3연타 · 리본 샤트 강림</li>
<li><b>옵시디언</b> (EX): 검은 늑대를 탄 원거리 범위 딜러, 메탈 제외 넉백 · 레전드 '대탈주' 첫 클리어</li></ul>
<h3>🔺 3진 진화</h3>
<p>미래편 2장 달을 클리어하면 열립니다. Lv.20 이상 2진 캐릭터를 개다래 열매·씨앗과 XP로 진화시키면 체력·공격력이 ×1.2가 됩니다.</p>
<h3>⚖️ 변경</h3>
<ul><li>기본 캐릭터 가격·성 체력을 원작 기준으로, 아군 성 강화 최대 Lv.30</li>
<li>레벨업 비용 등급별 차등 · 스테이지 난이도 별 ★1~12</li>
<li>리본 오렌지 강림은 극난도·초극난도 2단계 · 뽑기는 세계편 1장 '일본' 클리어 후</li></ul>`};
function showNotice(){
 document.querySelector('.notice-overlay')?.remove();
 const o=document.createElement('div');o.className='notice-overlay';
 o.innerHTML=`<div class="notice-box" role="dialog" aria-label="업데이트 공지"><div class="notice-head"><b>${NOTICE.title}</b><small>${NOTICE.date}</small></div><div class="notice-body">${NOTICE.html}</div><button class="notice-ok">확인</button></div>`;
 const close=()=>{o.remove();try{localStorage.setItem('red-battle-notice-v1',NOTICE.version)}catch{}};
 o.querySelector('.notice-ok').onclick=close;o.onclick=e=>{if(e.target===o)close()};
 document.body.append(o)}
(function initVersion(){
 const badge=document.querySelector('.game-version');
 if(badge){badge.textContent=`v${GAME_VERSION}`;badge.title=`게임 버전 v${GAME_VERSION}`}
 const actions=document.querySelector('.stage-heading-actions');
 if(actions&&!document.getElementById('noticeBtn')){const b=document.createElement('button');b.id='noticeBtn';b.textContent='공지';b.onclick=showNotice;actions.prepend(b)}
 let seen=null;try{seen=localStorage.getItem('red-battle-notice-v1')}catch{}
 if(seen!==NOTICE.version)showNotice();
})();
