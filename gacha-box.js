// 뽑기 확정권 + 보관함 (v6.2.0).
// - 확정권: 한 종류. 쓰면 1회 뽑기가 레어 · 슈퍼 레어 · 울트라 슈퍼 레어 중 하나로 확정된다(꽝·기본 캐릭터·XP 보상 없음).
//   세 등급의 비율은 지금 고른 배너의 확률을 그대로 따르고(일반 배너는 레어·슈퍼 레어만, 시리즈 배너는 울슈레 포함),
//   등급 안에서는 아직 못 가진 캐릭터를 우선한다.
// - 보관함: 일일 보상·스테이지·랭크·좀비 침공 등으로 받은 뽑기권과 확정권은 바로 지급되지 않고 보관함에 쌓인다. '모두 받기'로 수령.
gacha.fix=0;
gacha.box={fix:0};
try{
 const raw=JSON.parse(localStorage.getItem(GACHA_KEY)||'{}'),n=v=>Number.isInteger(v)&&v>=0?v:0;
 gacha.fix=n(raw.fix)+n(raw.t1)+10*n(raw.t10);gacha.box.fix=n(raw.box?.fix)+n(raw.box?.t1)+10*n(raw.box?.t10);
 // 등급별 확정권 3종 시절 저장 이관: 가진 만큼 확정권으로 합친다
 if(raw.g&&typeof raw.g==='object')gacha.fix+=n(raw.g.rare)+n(raw.g.sr)+n(raw.g.uber);
 if(raw.box)gacha.box.fix+=n(raw.box.rare)+n(raw.box.sr)+n(raw.box.uber);
}catch{}
delete gacha.g;delete gacha.t1;delete gacha.t10;
saveGacha(); // Persist converted balances once; reloads must not convert twice.
function gachaBoxCount(){const b=gacha.box;return b.fix}
function gachaStore(t1=0,t10=0,fix=0){
 gacha.box.fix+=t1+10*t10+fix;
 saveGacha();renderGachaBadge();if(gachaOpen())renderGacha();
}
// 뽑기권은 이제 모두 보관함으로 들어간다
gachaGive=function(t1,t10){gachaStore(t1,t10)};
function gachaGiveG(type,n=1){gachaStore(0,0,n)}// 이전 이름 유지(등급 인자는 무시)
function gachaBoxText(b=gacha.box){
 return b.fix?`확정권 ${b.fix}장`:'';
}
function gachaClaimBox(){
 const b=gacha.box,text=gachaBoxText(b);
 if(!gachaBoxCount())return false;
 gacha.fix+=b.fix;
 gacha.box={fix:0};
 saveGacha();renderGachaBadge();if(typeof renderTraining==='function')renderTraining();
 if(gachaOpen())renderGacha();
 gachaToast('보관함에서 받음: '+text);
 return true;
}
// 일일 출석: 보관함으로, 7일 연속 출석에는 확정권 +1
const _gbDaily=gachaClaimDaily;
gachaClaimDaily=function(){
 const d=_gbDaily.apply(this,arguments);
 if(!d)return d;
 const fix=d.streak%GACHA_CFG.dailyStreakBonus===0?1:0;
 gachaStore(d.t1,d.t10,fix);d.fix=fix;d.rare=fix;
 return d;
};
// 랭크 보상에 확정권 추가
{
 const add=[{at:150,text:'확정권 1장',fix:1},{at:450,text:'확정권 1장',fix:1},{at:750,text:'확정권 2장',fix:2},{at:1250,text:'확정권 2장',fix:2}];
 for(const r of add)if(!RANK_REWARDS.some(x=>x.at===r.at))RANK_REWARDS.push(r);
 RANK_REWARDS.sort((a,b)=>a.at-b.at);
 const _gbRankGrant=rankGrant;
 rankGrant=function(x){_gbRankGrant(x);if(x.fix)gachaStore(0,0,x.fix)};
}
// ---- 확정 뽑기
function guaranteedPick(list){// 아직 못 가진 캐릭터 우선
 const fresh=list.filter(s=>!gachaOwns(s.id)),pool=fresh.length?fresh:list;
 return pool[Math.floor(Math.random()*pool.length)];
}
function gachaFixWeights(){
 syncGachaRotation();
 // 지금 배너 기준 [등급, 비율, 후보 목록, 중복 XP]
 const w=[];
 const rare=gachaPoolRare(),sr=gachaPoolSR();
 if(rare.length)w.push({kind:'rare',w:GACHA_CFG.rare,list:rare,dupXp:GACHA_CFG.dupXpRare});
 if(sr.length)w.push({kind:'sr',w:GACHA_CFG.sr,list:sr,dupXp:GACHA_CFG.dupXp});
 if(SERIES_MEMBERS[gachaBanner]?.length){const festival=GACHA_FESTIVALS[gachaBanner],rate=festival?w.reduce((sum,x)=>sum+x.w,0)*festival/(1-festival):SERIES_GACHA.rate;w.push({kind:'prism',w:rate,list:SERIES_MEMBERS[gachaBanner],dupXp:GACHA_CFG.dupXpPrism})}
 return w;
}
function gachaUseGuarantee(){
 if(!(gacha.fix>=1))return {error:'확정권이 없어요'};
 let ws=gachaFixWeights();
 const series=SERIES_MEMBERS[gachaBanner]?.length;
 if(series&&(gacha.pityS[gachaBanner]||0)>=SERIES_GACHA.pity-1)ws=ws.filter(x=>x.kind==='prism');
 if(!ws.length)return {error:'뽑을 캐릭터가 없어요'};
 let r=Math.random()*ws.reduce((a,x)=>a+x.w,0),g=ws[0];
 for(const x of ws){if(r<x.w){g=x;break}r-=x.w}
 const s=guaranteedPick(g.list),res={kind:g.kind,guaranteed:true,id:s.id,name:s.name,fixTicket:true};
 if(gachaOwns(s.id)){
  res.dup=true;res.xp=g.dupXp;training.xp+=res.xp;saveTraining();
  if(typeof addPlusLevel==='function'&&addPlusLevel(s.id)){training.xp-=res.xp;res.plus=plusLevel(s.id);res.xp=0;saveTraining()}
 }else{gacha.owned.push(s.id);res.isNew=true}
 if(series)gacha.pityS[gachaBanner]=g.kind==='prism'?0:(gacha.pityS[gachaBanner]||0)+1;// 울슈레가 나오면 그 시리즈 천장은 처음부터
 gacha.fix--;gacha.pulls++;saveGacha();
 if(typeof renderTraining==='function')renderTraining();
 renderGachaBadge();renderNewButtons();renderDeckButtons();
 return {res};
}
// ---- UI
{
 const tickets=$('#gachaTickets');
 const box=document.createElement('div');box.id='gachaBox';box.className='gacha-box';
 const guar=document.createElement('div');guar.id='gachaGuar';guar.className='gacha-guar';
 tickets.before(box);
 $('.gacha-actions').after(guar);
 const st=document.createElement('style');
 st.textContent='.gacha-box{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:6px 0;padding:8px 10px;border-radius:10px;background:#241d36;border:1px solid #6b5a8a}.gacha-box b{color:#ffd166}.gacha-box button{padding:6px 12px;border-radius:8px;border:0;background:#7b2fbe;color:#fff;font-weight:700;cursor:pointer}.gacha-box button:disabled{background:#3a3450;color:#888;cursor:default}.gacha-guar{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}.gacha-guar button{padding:7px 12px;border-radius:8px;border:1px solid #d3b0ff;background:#2a2340;color:#fff;cursor:pointer}.gacha-guar button:disabled{opacity:.45;cursor:default}.gacha-card.fix{outline:2px solid #ffd166}';
 document.head.append(st);
}
const _gbBadge=renderGachaBadge;
renderGachaBadge=function(){
 _gbBadge.apply(this,arguments);
 const n=gachaBoxCount();
 if(typeof GACHA_BTN!=='undefined'&&n)GACHA_BTN.textContent+=` 📦${n}`;
 const t=$('#gachaLobbyText');if(t&&n)t.innerHTML+=`<br><small>보관함에 받을 보상이 있어요 (${gachaBoxText()})</small>`;
};
const _gbRender=renderGacha;
renderGacha=function(results){
 _gbRender.apply(this,arguments);
 const n=gachaBoxCount(),box=$('#gachaBox');
 box.innerHTML=`<span>📦 보관함 <b>${n}</b></span><span class="gacha-note">${n?gachaBoxText():'비어 있어요. 일일 보상·스테이지·랭크·좀비 침공 보상이 여기로 들어옵니다.'}</span><button type="button" id="gachaBoxClaim" ${n?'':'disabled'}>모두 받기</button>`;
 $('#gachaBoxClaim').onclick=()=>gachaClaimBox();
 const guar=$('#gachaGuar');guar.innerHTML='';
 const ws=gachaFixWeights(),tot=ws.reduce((a,x)=>a+x.w,0)||1;
 const label={rare:'레어',sr:'슈퍼 레어',prism:'울트라 슈퍼 레어'};
 const info=document.createElement('span');info.className='gacha-note';
 info.textContent='확정 뽑기: '+ws.map(x=>`${label[x.kind]} ${Math.round(x.w/tot*100)}%`).join(' · ')+' 중 하나 확정 (못 가진 캐릭터 우선)';
 guar.append(info);
 $('#gachaRates').textContent=info.textContent+' · 중복은 +레벨 +1(최대 +10), 이후 XP로 환산';
};
renderGachaBadge();
