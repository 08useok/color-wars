// Game version and the in-game update notice. Like the original, MAJOR goes up when a big story opens:
// v1 세계편 (first push, 2026-09-24) · v2 레전드 스토리 (09-30) · v3 미래편 1장 (10-03) · v4 미래편 2장 + 3진 (10-06).
// Between those, every push counts: a new feature bumps MINOR, fixes/balance only bump PATCH.
// A new NOTICE.version shows the notice once on load; the 공지 button on the stage screen reopens it.
const GAME_VERSION='4.6.1';
const NOTICE={version:GAME_VERSION,date:'2026-10-08',title:`v${GAME_VERSION} 업데이트`,html:`
<p class="notice-lead">지금까지 <b>세계편 1~3장 · 미래편 1~2장 · 레전드 스토리 1~25장</b>을 담았습니다. 다음은 미래편 3장입니다.</p>
<h3>🔧 v4.6.1 모션·그림 로딩 수정</h3>
<ul><li>원거리 아군이 공격 준비, 발사·투척, 반동, 복귀 동작을 연속으로 보여 줍니다.</li><li>전투에 필요한 아군·적·공격 그림을 미리 불러옵니다. 준비 중에는 전투 시간이 흐르지 않으며, 불러온 그림은 재사용합니다.</li><li>그림 로딩에 실패하면 다시 시도할 수 있습니다.</li></ul>
<h3>🍰 와플 크림 · +레벨 · 캣츠아이</h3>
<ul><li>크림 3진 전용 초상화, 소환 이름, 그림자와 체력바 연결을 완성했습니다.</li><li>랭크 보상은 2,700까지. 기본·레어 상한은 Lv.30, 중복 캐릭터는 +레벨(최대 +10)로 성장합니다. EX·슈퍼 레어·울슈레는 캣츠아이로 기본 상한을 Lv.40까지 확장합니다. 2,100·2,300·2,500 랭크에서 캣츠아이를 받습니다.</li><li>정상 저장을 Lv.30으로 바꾸던 자동 복구를 제거했습니다. 기존 저장 레벨은 유지됩니다.</li></ul>
<h3>📖 위키 · 도감</h3>
<ul><li><b>위키</b> 버튼 추가(스테이지 화면): 아군 84명·적 83종·스테이지 446곳을 전부 볼 수 있습니다. 못 얻은 캐릭터는 🔒와 획득 방법, 스테이지는 난이도·적 성 체력·등장 적 배율/마릿수, 적은 등장 스테이지 목록까지.</li>
<li><b>도감</b>은 내 진행 기준: 얻은 아군, 클리어하며 만난 적만 등록됩니다. 숨은 능력은 미래편이 열리기 전까지 가려집니다.</li></ul>
<h3>⚖️ 밸런스</h3>
<ul><li>모스: 체력·공격력 대폭 상향, 가장 약한 모스의 둔화 확률 50% → 80%</li></ul>
<h3>🔧 수정</h3>
<ul><li>투뿔소 공격 프레임 발밑에 비스듬한 선이 보이던 것 수정</li>
<li>빠옹 걷기를 원작 애니메이션대로 수정</li></ul>`};
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
