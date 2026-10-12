// 시리즈 전용 뽑기 (v6.2.0): 울트라 슈퍼 레어는 이제 일반 뽑기에서 나오지 않고, 소속 시리즈의 전용 뽑기에서만 나온다.
// - 같은 1회권·10회권을 쓰고, 뽑기 화면 위쪽 탭에서 배너(일반 / 시리즈)를 고른다.
// - 시리즈 배너: 울슈레 6%(그 시리즈 멤버 균등) · 50회 안에 울슈레 확정 · 나머지는 일반 배너와 같은 SR·레어·보상. 천장은 시리즈별로 따로 센다.
// - 일반 배너: 울슈레 칸이 없다(SR 11% · 레어 30% · 기본 캐릭터·XP·배속권·야옹컴). 이미 가진 울슈레는 그대로다.
const SERIES_GACHA={rate:.06,pity:50};
const SERIES_ORDER=['글라스 군단','LGBT','인스톨 연합','아이언즈','복싱즈','스위츠','가든즈','워터즈'];
const SERIES_MEMBERS={};
for(const u of GACHA_UBER){const s=UBER_SERIES[u.id];if(s&&data.units[u.id])(SERIES_MEMBERS[s]=SERIES_MEMBERS[s]||[]).push(u)}
const SERIES_LIST=SERIES_ORDER.filter(s=>SERIES_MEMBERS[s]?.length).concat(Object.keys(SERIES_MEMBERS).filter(s=>!SERIES_ORDER.includes(s)));
// 일반 배너에서는 울슈레 칸과 울슈레 천장을 끈다
GACHA_CFG.prism=0;GACHA_CFG.pity=1e9;
// 시리즈별 천장 카운터: gacha.js의 불러오기는 모르는 키를 버리므로 저장된 값을 직접 읽는다
gacha.pityS={};
try{const raw=JSON.parse(localStorage.getItem(GACHA_KEY)||'{}').pityS;if(raw&&typeof raw==='object')for(const s of SERIES_LIST)if(Number.isInteger(raw[s])&&raw[s]>=0)gacha.pityS[s]=Math.min(SERIES_GACHA.pity-1,raw[s])}catch{}
for(const [s,list] of Object.entries(SERIES_MEMBERS))for(const u of list)ACQUIRE_TEXT[u.id]=s+' 전용 뽑기에서 획득';
let gachaBanner='general';
const _sgRoll=gachaRoll;
function seriesRoll(series,guaranteed){
 const members=SERIES_MEMBERS[series]||[];
 if(!guaranteed&&members.length){
  gacha.pityS[series]=(gacha.pityS[series]||0)+1;
  if(gacha.pityS[series]>=SERIES_GACHA.pity||Math.random()<SERIES_GACHA.rate){
   gacha.pityS[series]=0;gacha.pulls++;
   const u=members[Math.floor(Math.random()*members.length)],res={kind:'prism',guaranteed:false,id:u.id,name:u.name};
   if(gachaOwns(u.id)){
    res.dup=true;res.xp=GACHA_CFG.dupXpPrism;training.xp+=res.xp;saveTraining();
    if(typeof addPlusLevel==='function'&&addPlusLevel(u.id)){training.xp-=res.xp;res.plus=plusLevel(u.id);res.xp=0;saveTraining()}
   }else{gacha.owned.push(u.id);res.isNew=true}
   return res;
  }
 }
 return _sgRoll.call(this,guaranteed);
}
gachaRoll=function(guaranteed=false){
 return gachaBanner==='general'?_sgRoll.call(this,guaranteed):seriesRoll(gachaBanner,guaranteed);
};
// ---- UI: 배너 탭
{
 const panel=GACHA_OVERLAY.querySelector('.gacha-panel'),tickets=$('#gachaTickets');
 const tabs=document.createElement('div');tabs.id='gachaBanners';tabs.className='gacha-banners';
 const info=document.createElement('p');info.id='gachaBannerInfo';info.className='gacha-note';
 tickets.before(tabs);tickets.before(info);
 const st=document.createElement('style');
 st.textContent='.gacha-banners{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.gacha-banners button{padding:5px 10px;border-radius:14px;border:1px solid #6b5a8a;background:#2a2340;color:#ddd;font-size:.8rem;cursor:pointer}.gacha-banners button.active{background:#7b2fbe;border-color:#d3b0ff;color:#fff;font-weight:700}.gacha-banners button .cnt{opacity:.75;margin-left:4px;font-size:.72rem}';
 document.head.append(st);
 void panel;
}
function renderGachaBanners(){
 const box=$('#gachaBanners');box.innerHTML='';
 const mk=(key,label,cnt)=>{const b=document.createElement('button');b.type='button';b.className=gachaBanner===key?'active':'';b.innerHTML=label+(cnt?`<span class="cnt">${cnt}</span>`:'');b.onclick=()=>{gachaBanner=key;$('#gachaResults').innerHTML='';renderGacha()};box.append(b)};
 mk('general','일반','');
 for(const s of SERIES_LIST){const m=SERIES_MEMBERS[s];mk(s,s,`${m.filter(u=>gachaOwns(u.id)).length}/${m.length}`)}
}
const _sgRender=renderGacha;
renderGacha=function(results){
 _sgRender.apply(this,arguments);
 renderGachaBanners();
 const s=gachaBanner,m=SERIES_MEMBERS[s];
 if(s==='general'||!m){
  $('#gachaBannerInfo').textContent='일반 뽑기: 울트라 슈퍼 레어는 각 시리즈의 전용 뽑기에서만 나와요. 위 탭에서 시리즈를 고르세요.';
  $('#gachaPity').textContent=`누적 ${gacha.pulls}회`;
  $('#gachaRates').textContent=`확률: SR ${GACHA_CFG.sr*100}% (${GACHA_SR.length}명 균등) · 레어 ${GACHA_CFG.rare*100}% (5명 균등) · 나머지는 기본 캐릭터·XP·배속권·야옹컴. 중복은 +레벨 +1(최대 +10), 이후 XP로 환산.`;
 }else{
  $('#gachaBannerInfo').textContent=`${s} 전용 뽑기 — `+m.map(u=>u.name+(gachaOwns(u.id)?' ✓':'')).join(' · ');
  $('#gachaPity').textContent=`${s} 천장 ${gacha.pityS[s]||0} / ${SERIES_GACHA.pity} (도달하면 울슈레 확정) · 누적 ${gacha.pulls}회`;
  $('#gachaRates').textContent=`확률: ${s} 울트라 슈퍼 레어 ${SERIES_GACHA.rate*100}% (${m.map(u=>u.name).join('·')} 균등) · SR ${GACHA_CFG.sr*100}% · 레어 ${GACHA_CFG.rare*100}% · 나머지는 기본 캐릭터·XP·배속권·야옹컴. ${SERIES_GACHA.pity}회 안에 울슈레 확정. 중복은 +레벨 +1(최대 +10), 이후 XP로 환산.`;
 }
};
const _sgOpen=openGacha;
openGacha=function(){_sgOpen.apply(this,arguments)};
if(typeof GACHA_BTN!=='undefined'){GACHA_BTN.onclick=()=>openGacha();$('#gachaLobbyBtn').onclick=()=>openGacha()}
renderGachaBadge();
