// 유저 랭크 (원작 냥코의 유저 랭크): 랭크 = 가진 아군 전원의 레벨 합. 캐릭터를 얻으면 +1, 레벨업할 때마다 +1.
// 2번째 스테이지(한국)를 깨면 열리고, 정해진 랭크에 닿을 때마다 보상을 받을 수 있다.
// game.js · gacha.js 다음에 로드된다 (읽기: training / allyUnlocked / cleared, 보상 지급: gachaGive · speedTickets · nyancom · training.xp).
const RANK_KEY='red-battle-rank-v1';
const RANK_REWARDS=[
 {at:10,text:'뽑기권(1회) 1장',t1:1},
 {at:50,text:'배속권 3개',speed:3},
 {at:100,text:'뽑기권(1회) 2장',t1:2},
 {at:200,text:'배속권 5개',speed:5},
 {at:300,text:'XP 50,000',xp:50000},
 {at:400,text:'야옹컴 2개',cpu:2},
 {at:500,text:'뽑기권(10회) 1장',t10:1},
 {at:600,text:'야옹컴 3개',cpu:3},
 {at:800,text:'뽑기권(1회) 3장',t1:3},
 {at:1000,text:'XP 200,000',xp:200000},
 {at:1200,text:'뽑기권(10회) 2장',t10:2},
 {at:1400,text:'XP 500,000',xp:500000},
 {at:1600,text:'뽑기권(10회) 3장 · 야옹컴 5개',t10:3,cpu:5}
];
let rankClaimed=[];
try{const s=JSON.parse(localStorage.getItem(RANK_KEY)||'{}');if(Array.isArray(s.claimed))rankClaimed=s.claimed.filter(n=>Number.isInteger(n))}catch{}
function saveRank(){try{localStorage.setItem(RANK_KEY,JSON.stringify({claimed:rankClaimed}))}catch{}}
function rankOpen(){return cleared.includes(1)||cleared.some(i=>i>=1)}// 한국(2번째 스테이지) 클리어 후
function userRank(){let n=0;for(const t of ALLIES)if(allyUnlocked(t))n+=training.levels[t]||1;return n}
function rankClaimable(r=userRank()){return RANK_REWARDS.filter(x=>x.at<=r&&!rankClaimed.includes(x.at))}
function rankGrant(x){
 if(x.t1||x.t10)gachaGive(x.t1||0,x.t10||0);
 if(x.speed){speedTickets+=x.speed;saveSpeedTickets();renderSpeedButton()}
 if(x.cpu){nyancom+=x.cpu;saveNyancom();renderNyancomButton()}
 if(x.xp){training.xp+=x.xp;saveTraining()}
}
function rankClaimAll(){
 const list=rankClaimable();if(!list.length)return;
 for(const x of list){rankGrant(x);rankClaimed.push(x.at)}
 saveRank();
 gachaToast('랭크 보상 받음! '+list.map(x=>x.text).join(' · '));
 if(typeof renderTraining==='function')renderTraining();else renderRank();
}
const RANK_CARD=document.createElement('section');RANK_CARD.className='training rank-lobby hidden';
RANK_CARD.innerHTML='<div class="rank-info"><h2>유저 랭크</h2><p id="rankText"></p><div class="rank-bar"><i id="rankFill"></i></div><small id="rankNext"></small><details><summary>랭크 보상 목록</summary><ul id="rankList"></ul></details></div><button id="rankClaimBtn" type="button" class="rank-claim-btn">보상 받기</button>';
document.querySelector('.stage-panel .stage-intro').after(RANK_CARD);
let rankLastClaimable=0;
function renderRank(){
 const open=rankOpen();RANK_CARD.classList.toggle('hidden',!open);if(!open)return;
 const r=userRank(),max=ALLIES.length*20,claimable=rankClaimable(r),next=RANK_REWARDS.find(x=>x.at>r),prev=[...RANK_REWARDS].reverse().find(x=>x.at<=r);
 $('#rankText').innerHTML=`랭크 <b>${r.toLocaleString()}</b> <small>(모든 아군 레벨 합 · 최대 ${max.toLocaleString()})</small>`;
 const lo=prev?prev.at:0,hi=next?next.at:Math.max(lo,r);
 $('#rankFill').style.width=(next?Math.max(0,Math.min(1,(r-lo)/(hi-lo)))*100:100)+'%';
 $('#rankNext').textContent=next?`다음 보상 랭크 ${next.at.toLocaleString()} (${next.at-r} 남음): ${next.text}`:'모든 랭크 보상을 받을 수 있어요!';
 $('#rankList').innerHTML=RANK_REWARDS.map(x=>`<li class="${rankClaimed.includes(x.at)?'done':x.at<=r?'ready':''}">랭크 ${x.at.toLocaleString()} — ${x.text}${rankClaimed.includes(x.at)?' ✓':x.at<=r?' (받을 수 있음)':''}</li>`).join('');
 const b=$('#rankClaimBtn');b.disabled=!claimable.length;b.textContent=claimable.length?`보상 받기 (${claimable.length})`:'받을 보상 없음';
 if(claimable.length>rankLastClaimable&&typeof gachaToast==='function')gachaToast(`랭크 ${r}! 받을 수 있는 보상이 있어요 (${claimable.length}개)`);
 rankLastClaimable=claimable.length;
}
$('#rankClaimBtn').onclick=rankClaimAll;
const _renderTrainingRank=renderTraining;
renderTraining=function(){_renderTrainingRank();renderRank()};
const _renderStageMenuRank=renderStageMenu;
renderStageMenu=function(){_renderStageMenuRank();renderRank()};
renderRank();
