// 매일 한국 시간 00시에 시리즈 하나씩 교체하는 확정권 뽑기.
// - 확정권 공용, 한국 시간 00시에 시리즈 하나씩 순서대로 교체한다.
// - 레어·슈퍼 레어·해당 시리즈 울슈레만 등장하고, 50회 천장은 시리즈별로 유지한다.
// - 일반 뽑기는 없고, 시리즈별 천장과 보유 캐릭터는 유지한다.
const SERIES_GACHA={rate:.06,pity:50};
const SERIES_ORDER=['글라스 군단','LGBT','인스톨 연합','아이언즈','복싱즈','스위츠','가든즈','워터즈','울트라 고양이 축제','하이퍼 고양이 축제'];
const SERIES_MEMBERS={};
for(const u of GACHA_UBER){const s=UBER_SERIES[u.id];if(s&&data.units[u.id])(SERIES_MEMBERS[s]=SERIES_MEMBERS[s]||[]).push(u)}
const GACHA_FESTIVALS={'울트라 고양이 축제':.20,'하이퍼 고양이 축제':.20};
for(const festival of Object.keys(GACHA_FESTIVALS))SERIES_MEMBERS[festival]=GACHA_UBER.filter(u=>data.units[u.id]);
const SERIES_LIST=SERIES_ORDER.filter(s=>SERIES_MEMBERS[s]?.length).concat(Object.keys(SERIES_MEMBERS).filter(s=>!SERIES_ORDER.includes(s)));
// 일반 배너에서는 울슈레 칸과 울슈레 천장을 끈다
GACHA_CFG.prism=0;GACHA_CFG.pity=1e9;
// 시리즈별 천장 카운터: gacha.js의 불러오기는 모르는 키를 버리므로 저장된 값을 직접 읽는다
gacha.pityS={};
try{const raw=JSON.parse(localStorage.getItem(GACHA_KEY)||'{}').pityS;if(raw&&typeof raw==='object')for(const s of SERIES_LIST)if(Number.isInteger(raw[s])&&raw[s]>=0)gacha.pityS[s]=Math.min(SERIES_GACHA.pity-1,raw[s])}catch{}
for(const [s,list] of Object.entries(SERIES_MEMBERS))for(const u of list)if(!GACHA_FESTIVALS[s])ACQUIRE_TEXT[u.id]=s+' 전용 뽑기에서 획득';
// A shared calendar uses Korean midnight, independent of the device timezone.
const SERIES_ROTATION_START=Date.UTC(2026,9,12),SERIES_ROTATION_DAY=86400000;
function seriesRotation(now=Date.now()){
 const day=Math.floor((now+9*3600000)/SERIES_ROTATION_DAY);
 const index=((day-Math.floor(SERIES_ROTATION_START/SERIES_ROTATION_DAY))%SERIES_LIST.length+SERIES_LIST.length)%SERIES_LIST.length;
 return {day,index,series:SERIES_LIST[index],next:SERIES_LIST[(index+1)%SERIES_LIST.length],endsAt:(day+1)*SERIES_ROTATION_DAY-9*3600000};
}
let gachaBanner=seriesRotation().series,gachaRotationDay=seriesRotation().day;
function syncGachaRotation(now=Date.now()){
 const r=seriesRotation(now),changed=r.day!==gachaRotationDay;
 gachaRotationDay=r.day;gachaBanner=r.series;
 if(changed)$('#gachaResults').innerHTML='';
 return changed;
}
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
 syncGachaRotation();
 const box=$('#gachaBanners');box.innerHTML='';
 const members=SERIES_MEMBERS[gachaBanner],badge=document.createElement('b');
 badge.textContent=`오늘의 시리즈: ${gachaBanner} (${members.filter(u=>gachaOwns(u.id)).length}/${members.length})`;box.append(badge);
 const next=document.createElement('span');next.className='gacha-note';next.textContent=`한국 시간 매일 00시 교체 · 다음: ${seriesRotation().next}`;box.append(next);
}
const _sgRender=renderGacha;
renderGacha=function(results){
 syncGachaRotation();_sgRender.apply(this,arguments);renderGachaBanners();
 const s=gachaBanner,m=SERIES_MEMBERS[s];
 $('#gachaBannerInfo').textContent=`${s}${GACHA_FESTIVALS[s]?' · 울슈레 20% · 기존 울슈레 전체 등장 · 축제 전용 캐릭터 없음':' 전용 뽑기'} — `+m.map(u=>u.name+(gachaOwns(u.id)?' ✓':'')).join(' · ');
 $('#gachaPity').textContent=`${s} 천장 ${gacha.pityS[s]||0} / ${SERIES_GACHA.pity} · 시리즈가 돌아와도 기록 유지 · 누적 ${gacha.pulls}회`;
};
const _sgOpen=openGacha;
openGacha=function(){syncGachaRotation();_sgOpen.apply(this,arguments)};
function refreshGachaRotation(){if(syncGachaRotation()&&gachaOpen())renderGacha()}
setInterval(refreshGachaRotation,1000);
window.addEventListener('focus',refreshGachaRotation);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshGachaRotation()});
if(typeof GACHA_BTN!=='undefined'){GACHA_BTN.onclick=()=>openGacha();$('#gachaLobbyBtn').onclick=()=>openGacha()}
renderGachaBadge();
