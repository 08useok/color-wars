// 뽑기 (gacha): SR 16명 + 프리즘.
// Self-contained: game.js is only wrapped (finish / legendFinish / allyUnlocked) and read (XP, items, stage progress).
// Tickets: 1회권 / 10회권. 매달 1일~10일은 10회권이 10+1 (보너스 1회는 SR 확정).
const GACHA_KEY='red-battle-gacha-v1';
const GACHA_SR=[['plum','플럼'],['forest','포레스트'],['canary','카나리'],['cherry','체리'],['charcoal','차콜'],['mustard','머스터드'],['mauve','모브'],['khaki','카키'],['tangerine','탠저린'],['burgundy','버건디'],['sky','스카이'],['denim','데님'],['cornflower','길리먼 블루'],['verdigris','베르디그리'],['teal','틸'],['bittersweet','그레이프프루트 펄프'],['claret','아틀라스 레드']].map(([id,name])=>({id,name}));
const GACHA_RARE=[['fusioncream','퓨전 크림'],['silver','실버'],['lava','라바'],['babypink','베이비 핑크'],['magenta','마젠타']].map(([id,name])=>({id,name}));// 뽑기 전용 레어 5명 (시즌 2)
const GACHA_PRISM={id:'prism',name:'프리즘'};
const GACHA_UBER=[GACHA_PRISM,{id:'rainbow',name:'레인보우'},{id:'orchid',name:'오키드'}];// 울트라 슈퍼 레어 두 명이 같은 확률 칸을 나눠 가짐
const GACHA_CFG={
 prism:.03,sr:.11,rare:.3,// of every pull: 울슈레 3% (프리즘·레인보우), SR 11% (16명 균등), 레어 30% (5명 균등); the other 56% is the misc table below
 pity:100,// 프리즘 guaranteed within this many pulls
 dupXp:5000,dupXpRare:2000,dupXpPrism:30000,// 이미 가진 SR/레어/울슈레는 XP로 환산
 bonusFrom:1,bonusTo:10,// 10+1 days of the month
 specialChance:.15,// 화/금 스페셜 스테이지 클리어 시 10회권 드롭 확률
 dailyStreakBonus:7,// 7일 연속 출석마다 10회권
 repeatLegend:.05// 이미 클리어한 전설 스테이지 반복 시 1회권 확률
};
const GACHA_MISC=[{w:40,kind:'xp',n:1000,label:'XP 1,000'},{w:24,kind:'xp',n:3000,label:'XP 3,000'},{w:16,kind:'speed',n:1,label:'배속권 1개'},{w:8,kind:'cpu',n:1,label:'야옹컴 1개'}];
let gacha={t1:0,t10:0,pity:0,pulls:0,owned:[],lastDaily:'',streak:0};
try{
 const s=JSON.parse(localStorage.getItem(GACHA_KEY)||'{}'),n=v=>Number.isInteger(v)&&v>=0?v:0;
 gacha={t1:n(s.t1),t10:n(s.t10),pity:n(s.pity),pulls:n(s.pulls),owned:Array.isArray(s.owned)?[...new Set(s.owned.filter(x=>typeof x==='string'))]:[],lastDaily:typeof s.lastDaily==='string'?s.lastDaily:'',streak:n(s.streak)};
}catch{}
function saveGacha(){try{localStorage.setItem(GACHA_KEY,JSON.stringify(gacha))}catch{}}
function gachaOwns(t){return gacha.owned.includes(t)}
function gachaBonusDay(){try{const d=new Date().getDate();return(d>=GACHA_CFG.bonusFrom&&d<=GACHA_CFG.bonusTo)||new URLSearchParams(location.search).has('bonus')}catch{return false}}
function gachaGive(t1,t10){gacha.t1+=t1;gacha.t10+=t10;saveGacha();renderGachaBadge();if(gachaOpen())renderGacha()}
function gachaTicketText(t1,t10){return [t1&&`뽑기권(1회) ${t1}장`,t10&&`뽑기권(10회) ${t10}장`].filter(Boolean).join(' · ')}
function gachaName(id){return(GACHA_SR.find(s=>s.id===id)||GACHA_RARE.find(s=>s.id===id)||GACHA_UBER.find(s=>s.id===id))?.name||id}
function gachaPoolSR(){return GACHA_SR.filter(s=>data.units[s.id])}// SRs whose unit data exists in game.js
function gachaPoolRare(){return GACHA_RARE.filter(s=>data.units[s.id])}
function gachaUberPool(){return GACHA_UBER.filter(u=>data.units[u.id])}

// ---- one pull
function gachaRoll(guaranteed=false){
 gacha.pulls++;gacha.pity++;
 const r=Math.random();let kind;
 if(gacha.pity>=GACHA_CFG.pity||r<GACHA_CFG.prism)kind='prism';
 else if(guaranteed||r<GACHA_CFG.prism+GACHA_CFG.sr)kind='sr';
 else if(r<GACHA_CFG.prism+GACHA_CFG.sr+GACHA_CFG.rare)kind='rare';
 else kind='misc';
 const res={kind,guaranteed};
 if(kind==='prism'){
  gacha.pity=0;const pool=gachaUberPool(),u=(pool.length?pool:GACHA_UBER)[Math.floor(Math.random()*(pool.length||GACHA_UBER.length))];res.id=u.id;res.name=u.name;
  if(!pool.length){res.pending=true;res.xp=GACHA_CFG.dupXpPrism;training.xp+=res.xp;saveTraining()}
  else if(gachaOwns(res.id)){res.dup=true;res.xp=GACHA_CFG.dupXpPrism;training.xp+=res.xp;saveTraining()}
  else{gacha.owned.push(res.id);res.isNew=true}
 }else if(kind==='sr'){
  const pool=gachaPoolSR();
  if(!pool.length){const s=GACHA_SR[Math.floor(Math.random()*GACHA_SR.length)];res.id=s.id;res.name=s.name;res.pending=true;res.xp=GACHA_CFG.dupXp;training.xp+=res.xp;saveTraining()}
  else{
   const s=pool[Math.floor(Math.random()*pool.length)];res.id=s.id;res.name=s.name;
   if(gachaOwns(s.id)){res.dup=true;res.xp=GACHA_CFG.dupXp;training.xp+=res.xp;saveTraining()}
   else{gacha.owned.push(s.id);res.isNew=true}
  }
 }else if(kind==='rare'){
  const pool=gachaPoolRare();
  if(!pool.length){const s=GACHA_RARE[Math.floor(Math.random()*GACHA_RARE.length)];res.id=s.id;res.name=s.name;res.pending=true;res.xp=GACHA_CFG.dupXpRare;training.xp+=res.xp;saveTraining()}
  else{
   const s=pool[Math.floor(Math.random()*pool.length)];res.id=s.id;res.name=s.name;
   if(gachaOwns(s.id)){res.dup=true;res.xp=GACHA_CFG.dupXpRare;training.xp+=res.xp;saveTraining()}
   else{gacha.owned.push(s.id);res.isNew=true}
  }
 }else{
  let w=Math.random()*GACHA_MISC.reduce((a,m)=>a+m.w,0),m=GACHA_MISC[0];
  for(const x of GACHA_MISC){if(w<x.w){m=x;break}w-=x.w}
  res.name=m.label;res.misc=m.kind;
  if(m.kind==='xp'){training.xp+=m.n;saveTraining()}
  else if(m.kind==='speed'){speedTickets+=m.n;saveSpeedTickets();renderSpeedButton()}
  else{nyancom+=m.n;saveNyancom();renderNyancomButton()}
 }
 return res;
}
function gachaPull(times){
 const bonus=times===10&&gachaBonusDay();
 if(times===1){if(gacha.t1<1)return null;gacha.t1--}else{if(gacha.t10<1)return null;gacha.t10--}
 const out=[];for(let i=0;i<times;i++)out.push(gachaRoll(false));
 if(bonus){const b=gachaRoll(true);b.bonus=true;out.push(b)}
 saveGacha();
 if(typeof renderTraining==='function')renderTraining();
 renderGachaBadge();
 return out;
}

// ---- ticket sources
function gachaToday(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function gachaClaimDaily(){
 const today=gachaToday();if(gacha.lastDaily===today)return null;
 const y=new Date();y.setDate(y.getDate()-1);
 gacha.streak=gacha.lastDaily===gachaToday(y)?gacha.streak+1:1;gacha.lastDaily=today;
 const t10=gacha.streak%GACHA_CFG.dailyStreakBonus===0?1:0;
 gacha.t1+=1;gacha.t10+=t10;saveGacha();
 return {streak:gacha.streak,t1:1,t10};
}
function gachaStageReward(i){// 세계편·미래편 첫 클리어: 각 장의 달 = 10회권, 2·3장·미래편 일반 스테이지 = 1회권
 const ch=STAGES[i].chapter||1;
 if(i===CHAPTER1_LEN-1||i===CHAPTER1_LEN*2-1||i===MAIN_STAGE_COUNT-1||i===FUTURE_END-1)return {t1:0,t10:1};
 if(ch>=2)return {t1:1,t10:0};
 return {t1:0,t10:0};
}
const EX_NAME={ribbonorange:'리본 오렌지',garnet:'가넷',lapis:'라피스',selenite:'셀레나이트',topaz:'토파즈'};
function grantEx(id){if(gachaOwns(id))return false;gacha.owned.push(id);saveGacha();gachaAppendDetail('EX '+EX_NAME[id]+' 획득!');renderNewButtons();renderDeckButtons();return true}
function gachaAppendDetail(text){const el=document.querySelector('#resultDetail');if(el&&text)el.textContent+=(el.textContent?' · ':'')+text}
const _finish=finish;
finish=function(win){
 const fresh=!game.ended,idx=selectedStage,st=STAGES[idx],was=cleared.includes(idx);
 _finish(win);
 if(!fresh||!win||st.legend)return;
 if(st.special){if(idx===MAIN_STAGE_COUNT+3)grantEx('lapis');if(Math.random()<GACHA_CFG.specialChance){gachaGive(0,1);gachaAppendDetail('뽑기권(10회) 1장 획득!')}return}
 if(!was&&cleared.includes(idx)){if(idx===MAIN_STAGE_COUNT-1)grantEx('selenite');const r=gachaStageReward(idx);if(r.t1||r.t10){gachaGive(r.t1,r.t10);gachaAppendDetail(gachaTicketText(r.t1,r.t10)+' 획득!')}}
};
const _legendFinish=legendFinish;
legendFinish=function(win){
 const k=STAGES[selectedStage].legend.k,c=legendCrown,had=legendProgress[c].includes(k);
 _legendFinish(win);
 if(!win)return;
 let t1=0,t10=0;
 if(!had){t1+=c;if(legendSubDone(legendSubOf(k),c))t10+=c}// ★n 왕관은 n배 · 서브챕터를 다 깨면 10회권
 else if(Math.random()<GACHA_CFG.repeatLegend)t1+=1;
 if(t1||t10){gachaGive(t1,t10);gachaAppendDetail(gachaTicketText(t1,t10)+' 획득!')}
};
// 토파즈 (EX): 레전드 '전설의 시작' ★2 난이도의 8개 스테이지를 모두 클리어하면 획득
const _legendFinish3=legendFinish;
legendFinish=function(win){
 const c=legendCrown;_legendFinish3(win);
 if(win&&c===2&&legendSubDone(0,2))grantEx('topaz');
};
// 가넷 (EX): 전설의 시작을 모두 클리어한 뒤 마지막 스테이지를 클리어할 때마다 30% 확률로 획득
const GARNET_DROP=.3;
const _legendFinish2=legendFinish;
legendFinish=function(win){
 const k=STAGES[selectedStage].legend.k,c=legendCrown;
 _legendFinish2(win);
 if(win&&k===LEGEND_SUBS[0].len-1&&legendSubDone(0,c)&&!gachaOwns('garnet')&&Math.random()<GARNET_DROP){
  gacha.owned.push('garnet');saveGacha();gachaAppendDetail('EX 가넷 획득!');renderNewButtons();
 }
};
const _allyUnlocked=allyUnlocked;
allyUnlocked=function(t){return _allyUnlocked(t)||gachaOwns(t)};

// ---- UI
const GACHA_OVERLAY=document.createElement('section');
GACHA_OVERLAY.id='gachaMenu';GACHA_OVERLAY.className='overlay hidden';
GACHA_OVERLAY.innerHTML='<div class="gacha-panel"><div class="codex-heading"><h1>뽑기</h1><button id="gachaCloseBtn">닫기</button></div><div id="gachaTickets" class="gacha-tickets"></div><p id="gachaBonusNote" class="gacha-note"></p><div class="gacha-actions"><button id="gachaPull1" class="gacha-pull"></button><button id="gachaPull10" class="gacha-pull ten"></button></div><p id="gachaPity" class="gacha-note"></p><div id="gachaResults" class="gacha-results"></div><p id="gachaRates" class="gacha-note"></p><h2>컬렉션 <small id="gachaOwnedText"></small></h2><div id="gachaOwned" class="gacha-owned"></div></div>';
document.querySelector('#game').append(GACHA_OVERLAY);
const GACHA_TOAST=document.createElement('div');GACHA_TOAST.id='gachaToast';GACHA_TOAST.className='hidden';document.querySelector('#game').append(GACHA_TOAST);
let gachaToastTimer=0;
function gachaToast(text){GACHA_TOAST.textContent=text;GACHA_TOAST.classList.remove('hidden');clearTimeout(gachaToastTimer);gachaToastTimer=setTimeout(()=>GACHA_TOAST.classList.add('hidden'),4200)}
function gachaOpen(){return !GACHA_OVERLAY.classList.contains('hidden')}
const GACHA_BTN=document.createElement('button');GACHA_BTN.id='gachaOpenBtn';GACHA_BTN.type='button';
document.querySelector('.stage-heading-actions').prepend(GACHA_BTN);
const GACHA_LOBBY=document.createElement('section');GACHA_LOBBY.className='training gacha-lobby';
GACHA_LOBBY.innerHTML='<div class="gacha-lobby-info"><h2>뽑기</h2><p id="gachaLobbyText"></p></div><button id="gachaLobbyBtn" type="button" class="gacha-lobby-btn">뽑기 하러 가기</button>';
document.querySelector('.stage-panel .stage-intro').after(GACHA_LOBBY);
function renderGachaBadge(){
 GACHA_BTN.textContent=`뽑기 🎟 ${gacha.t1+gacha.t10}`;
 $('#gachaLobbyText').innerHTML=`1회권 <b>${gacha.t1}</b>장 · 10회권 <b>${gacha.t10}</b>장`+(gachaBonusDay()?' · <em>10+1 기간! 보너스는 SR 확정</em>':' · 매달 1~10일 10+1')+'<br><small>슈퍼 레어 '+GACHA_SR.length+'명 · 레어 '+GACHA_RARE.length+'명 · 울트라 슈퍼 레어 '+GACHA_UBER.length+'명</small>';
}
function gachaCard(r){
 const c=document.createElement('div');c.className='gacha-card '+(r.kind==='misc'?'misc':r.kind)+(r.bonus?' bonus':'');
 const tag=r.bonus?'<em>보너스 · SR 확정</em>':'';
 let body;
 if(r.kind==='misc')body=`<strong>${r.name}</strong>`;
 else if(r.pending)body=`<strong>${r.kind==='prism'?'울슈레':r.kind==='rare'?'레어':'SR'}</strong><small>준비 중 → XP +${r.xp.toLocaleString()}</small>`;
 else if(r.dup)body=`<strong>${r.name}</strong><small>중복 → XP +${r.xp.toLocaleString()}</small>`;
 else body=`<strong>${r.name}</strong><small class="new">NEW!</small>`;
 c.innerHTML=(r.kind==='prism'?'<b>★ 울트라 슈퍼 레어</b>':r.kind==='sr'?'<b>슈퍼 레어</b>':r.kind==='rare'?'<b>레어</b>':'<b>보상</b>')+body+tag;
 return c;
}
function renderGacha(results){
 $('#gachaTickets').innerHTML=`<span>1회권 <b>${gacha.t1}</b></span><span>10회권 <b>${gacha.t10}</b></span>`;
 const bonus=gachaBonusDay();
 $('#gachaBonusNote').textContent=bonus?'🎉 지금은 10+1 기간! 10회 뽑기를 하면 SR 확정 보너스 1회가 추가돼요. (매달 1일~10일)':'매달 1일~10일에는 10회 뽑기가 10+1이 돼요. 보너스 1회는 SR 확정!';
 $('#gachaBonusNote').classList.toggle('active',bonus);
 $('#gachaPull1').textContent='1회 뽑기 (1회권 1장)';$('#gachaPull1').disabled=gacha.t1<1;
 $('#gachaPull10').textContent=bonus?'10+1 뽑기 (10회권 1장)':'10회 뽑기 (10회권 1장)';$('#gachaPull10').disabled=gacha.t10<1;
 $('#gachaPity').textContent=`울슈레 천장 ${gacha.pity} / ${GACHA_CFG.pity} · 누적 ${gacha.pulls}회`;
 const ready=gachaPoolSR().length;
 $('#gachaRates').textContent=`확률: 울트라 슈퍼 레어(프리즘·레인보우·오키드) ${GACHA_CFG.prism*100}% · SR ${GACHA_CFG.sr*100}% (${GACHA_SR.length}명 균등) · 레어 ${GACHA_CFG.rare*100}% (5명 균등) · 나머지는 XP·배속권·야옹컴. 울트라 슈퍼 레어는 ${GACHA_CFG.pity}회 안에 확정. 중복은 XP로 환산(SR ${GACHA_CFG.dupXp.toLocaleString()}, 레어 ${GACHA_CFG.dupXpRare.toLocaleString()}, 울슈레 ${GACHA_CFG.dupXpPrism.toLocaleString()}).`+(ready<GACHA_SR.length?` 아직 추가되지 않은 SR(${GACHA_SR.length-ready}명)이 나오면 XP로 대체돼요.`:'');
 if(results){const box=$('#gachaResults');box.innerHTML='';results.forEach(r=>box.append(gachaCard(r)))}
 const own=$('#gachaOwned');own.innerHTML='';
 for(const s of [...GACHA_SR,...GACHA_RARE,...GACHA_UBER]){const d=document.createElement('div');d.className='gacha-slot'+(gachaOwns(s.id)?' owned':'')+(GACHA_UBER.includes(s)?' prism':'');d.textContent=gachaOwns(s.id)?s.name:data.units[s.id]?'？？？':'준비 중';own.append(d)}
 $('#gachaOwnedText').textContent=`${[...GACHA_SR,...GACHA_RARE,...GACHA_UBER].filter(s=>gachaOwns(s.id)).length} / ${GACHA_SR.length+GACHA_RARE.length+GACHA_UBER.length}`;
}
function gachaDoPull(times){const out=gachaPull(times);if(out)renderGacha(out)}
function openGacha(){renderGacha();$('#gachaResults').innerHTML='';GACHA_OVERLAY.classList.remove('hidden')}
GACHA_BTN.onclick=openGacha;$('#gachaLobbyBtn').onclick=openGacha;
GACHA_OVERLAY.addEventListener('click',e=>{if(e.target===GACHA_OVERLAY)GACHA_OVERLAY.classList.add('hidden')});
$('#gachaCloseBtn').onclick=()=>GACHA_OVERLAY.classList.add('hidden');
$('#gachaPull1').onclick=()=>gachaDoPull(1);
$('#gachaPull10').onclick=()=>gachaDoPull(10);
renderGachaBadge();
// game.js drew the first screen before this file loaded, so characters owned through the gacha/rewards were still locked: redraw now.
{const menuOpen=!$('#stageMenu').classList.contains('hidden');if(menuOpen)renderStageMenu();renderNewButtons();renderDeckButtons();render()}
{const d=gachaClaimDaily();if(d){renderGachaBadge();gachaToast(`일일 보상! ${gachaTicketText(d.t1,d.t10)} (${d.streak}일 연속 출석)`)}}
