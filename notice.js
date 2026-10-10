// Game version and the in-game update notice. Like the original, MAJOR goes up when a big story opens:
// v1 세계편 (first push, 2026-09-24) · v2 레전드 스토리 (09-30) · v3 미래편 1장 (10-03) · v4 미래편 2장 + 3진 (10-06) · v5 미래편 3장 (10-08) · v6 우주편 1장 (10-09).
// Between those, every push counts: a new feature bumps MINOR, fixes/balance only bump PATCH.
// A new NOTICE.version shows the notice once on load; the 공지 button on the stage screen reopens it.
const GAME_VERSION='6.0.1';
const NOTICE={version:GAME_VERSION,date:'2026-10-09',title:`v${GAME_VERSION} 업데이트`,html:`
<p class="notice-lead">지금까지 <b>세계편 1~3장 · 미래편 1~3장 · 우주편 1장 · 레전드 스토리 1~27장</b>을 담았습니다.</p>
<h3>🎣 v6.0.1 어부 살몬 (살몬 3진) 선공개</h3>
<ul><li>살몬의 3진 <b>어부 살몬</b>이 열렸습니다. 다른 3진과 같이 개다래 열매·씨앗과 XP로 진화합니다(세계편 3장 달 클리어 후 Lv.20).</li><li>체력 ×1.3 · 공격력 ×1.5, 사거리 증가, 끌어오는 거리가 늘고, 가끔 낚싯줄에 걸린 적이 잠깐 멈춥니다.</li><li><b>파동 스토퍼</b>: 적의 파동을 막습니다. 파동이 어부 살몬에게 닿으면 거기서 끊겨서 본인과 뒤쪽 아군이 파동 피해를 받지 않아요. 밀려나 있는 동안에는 막지 못합니다.</li><li>어부 살몬 전용 3진 그림이 들어갔어요. 걷기 · 낚싯대를 휘둘러 물고기를 날리는 공격 · 피격 모션이 모두 새로 그려졌습니다.</li></ul>
<h3>🌌 v6.0.0 우주편 1장</h3>
<ul><li>미래편 3장 달을 클리어하면 열립니다. 지구 ~ 빅뱅 48개 스테이지를 원작 우주편 1장 적 구성 그대로 담았습니다.</li><li>새 적 <b>별 에이리언</b> 7종: 엘리트 에이리뭉·스타 펭·그레고리 장군·엄마빠옹·화백·캡틴 모구·스페이스맨 보그. 원작 이동·공격·넉백 모션을 넣었습니다.</li><li><b>바리어</b>: 파랗게 빛나는 적은 바리어 수치 이하의 공격을 막습니다. 한 방에 그보다 큰 피해를 주면 깨집니다.</li><li><b>워프</b>: 일부 별 에이리언은 맞은 아군을 멀리 뒤로 보냅니다.</li><li>최종 보스 <b>신님</b>: 체력 140만, 사거리 1000의 떠 있는 적. 3연속 공격으로 넓은 범위를 쓸어 버립니다.</li><li>우주편 전용 억제기 2개(과자 행성·빅뱅). 개다래 씨앗 45%·열매 30% 드롭, 빅뱅 첫 클리어 때 에픽 개다래와 10회 뽑기권.</li></ul>
<h3>🛸 v5.0.0 미래편 3장</h3>
<ul><li>미래편 2장 달을 클리어하면 열립니다. 일본 ~ 달 48개 스테이지를 원작 3장 적 구성 그대로 담았습니다.</li><li>3장 전용 억제기 2개(심해의 소용돌이·달), 클리어 시 에이리언 배율 −100%씩.</li><li>최종 보스 <b>폭주의 냥코무트</b>: 체력 122만·공격력 4.4만의 떠 있는 에이리언. 아주 빠르게 날아와 범위 공격을 합니다. 원작 이동·공격·넉백 모션을 넣었습니다.</li><li>에일리언 맴매·찡찡어·알파카·거장도 3장 스테이지에 등장합니다.</li><li>3장 스테이지는 개다래 씨앗 40%·열매 25% 확률로 드롭하고, 달 첫 클리어 때 에픽 개다래와 10회 뽑기권을 줍니다.</li></ul>
<h3>🫧 핫 핑크 3진</h3>
<p><b>미래편 3장 달 클리어 후 해금</b>됩니다. 캐릭터 강화에서 진화 버튼을 누르면 레벨 조건·개다래·XP 소모 없이 진화합니다.</p>
<p>일반 캐릭터의 3진은 세계편 3장 달 클리어 후 열립니다. 크림은 미래편 2장 달, 핫 핑크는 미래편 3장 달 클리어 후 해금되며, 진화 버튼만 누르면 레벨 조건·개다래·XP 소모 없이 진화합니다.</p>
<ul><li>전용 걷기·공격·넉백 모션을 추가했습니다.</li><li>2진 대비 체력·공격력 50% 증가, 인식 사거리 480→600, 빨간 적 약화 지속시간 3.5→5초. 풍선껌이 범위로 터져 전방 800까지 피해를 줍니다.</li></ul>
<h3>🌅 레전드 스토리 26·27장</h3>
<ul><li>26장 악한 자, 27장 마음과 몸을 잇는: 원본 구성의 16개 스테이지를 추가했습니다.</li><li>까르삔초·배틀 코알락교·제비족·찡찡어·알파카·거장·에일리언 맴매·두더더지와 원본 이동·공격·넉백 모션을 추가했습니다.</li><li>4성은 EX·레어만 출전할 수 있으며, 적 배율은 3성과 같습니다. 기존 레벨과 클리어 기록을 유지합니다.</li></ul>
<h3>🥊 v4.7.0 새 울슈레 3종</h3>
<ul><li>아이언: 아이언즈의 좀비 킬러·좀비 엄강 범위 딜탱. 2진은 굴착기로 공격합니다.</li><li>그레이: 망치와 용광로를 사용하는 범위·파동 딜러.</li><li>카민: 복싱즈의 빨간 적 엄강·둔화 범위 딜탱. 2진은 불꽃 주먹으로 공격합니다.</li><li>세 캐릭터의 1·2진 공격 모션과 도감 그림을 추가했습니다. 울슈레 전체 뽑기 확률은 3%로 유지됩니다.</li></ul>
<h3>🍰 v4.6.2 와플 크림 강화·적 수치 수정</h3>
<ul><li>와플 크림(3진)의 공격력이 기존보다 50% 증가하고, 사거리 16·범위 공격·검은 적 둔화 65%/3초가 적용됩니다.</li><li>스승의 공격 간격을 0.8초로 수정했습니다.</li><li>홍당무왕의 수치를 원작 기준으로 환산하고 넉백 자세를 수정했습니다.</li></ul>
<h3>🔧 v4.6.1 모션·그림 로딩 수정</h3>
<ul><li>원거리 아군이 공격 준비, 발사·투척, 반동, 복귀 동작을 연속으로 보여 줍니다.</li><li>전투에 필요한 아군·적·공격 그림을 미리 불러옵니다. 준비 중에는 전투 시간이 흐르지 않으며, 불러온 그림은 재사용합니다.</li><li>그림 로딩에 실패하면 다시 시도할 수 있습니다.</li></ul>
<h3>🍰 와플 크림 · +레벨 · 캣츠아이</h3>
<ul><li>크림 3진 전용 초상화, 소환 이름, 그림자와 체력바 연결을 완성했습니다.</li><li>랭크 보상은 2,700까지. 기본·레어 상한은 Lv.30, 중복 캐릭터는 +레벨(최대 +10)로 성장합니다. EX·슈퍼 레어·울슈레는 캣츠아이로 기본 상한을 Lv.40까지 확장합니다. 2,100·2,300·2,500 랭크에서 캣츠아이를 받습니다.</li><li>정상 저장을 Lv.30으로 바꾸던 자동 복구를 제거했습니다. 기존 저장 레벨은 유지됩니다.</li></ul>
<h3>📖 위키 · 도감</h3>
<ul><li><b>위키</b> 버튼 추가(스테이지 화면): 아군 87명·적 91종·스테이지 462곳을 전부 볼 수 있습니다. 못 얻은 캐릭터는 🔒와 획득 방법, 스테이지는 난이도·적 성 체력·등장 적 배율/마릿수, 적은 등장 스테이지 목록까지.</li>
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
