// 뽑기 확정권 3종 + 보관함 (v6.2.0).
// - 확정권: 레어 확정권 · 슈퍼 레어 확정권 · 울슈레 확정권. 쓰면 1회 뽑기가 그 등급으로 확정되고, 아직 못 가진 캐릭터를 우선한다.
//   울슈레 확정권은 시리즈 탭을 고른 상태에서 쓴다(그 시리즈 멤버 중에서).
// - 보관함: 일일 보상·스테이지·랭크·좀비 침공 등으로 받은 뽑기권과 확정권은 바로 지급되지 않고 보관함에 쌓인다. '모두 받기'로 수령.
const GUAR_TYPES=[['rare','레어 확정권'],['sr','슈퍼 레어 확정권'],['uber','울슈레 확정권']];
gacha.g={rare:0,sr:0,uber:0};
gacha.box={t1:0,t10:0,rare:0,sr:0,uber:0};
try{
 const raw=JSON.parse(localStorage.getItem(GACHA_KEY)||'{}');
 for(const [k,dst] of [['g',gacha.g],['box',gacha.box]]){const v=raw[k];if(v&&typeof v==='object')for(const key of Object.keys(dst))if(Number.isInteger(v[key])&&v[key]>=0)dst[key]=v[key]}
}catch{}
function gachaBoxCount(){const b=gacha.box;return b.t1+b.t10+b.rare+b.sr+b.uber}
function gachaStore(t1=0,t10=0,g={}){
 gacha.box.t1+=t1;gacha.box.t10+=t10;
 for(const [k] of GUAR_TYPES)gacha.box[k]+=g[k]||0;
 saveGacha();renderGachaBadge();if(gachaOpen())renderGacha();
}
// 뽑기권은 이제 모두 보관함으로 들어간다
gachaGive=function(t1,t10){gachaStore(t1,t10)};
function gachaGiveG(type,n=1){gachaStore(0,0,{[type]:n})}
function gachaBoxText(b=gacha.box){
 return [b.t1&&`1회권 ${b.t1}`,b.t10&&`10회권 ${b.t10}`,...GUAR_TYPES.map(([k,n])=>b[k]&&`${n} ${b[k]}`)].filter(Boolean).join(' · ');
}
function gachaClaimBox(){
 const b=gacha.box,text=gachaBoxText(b);
 if(!gachaBoxCount())return false;
 gacha.t1+=b.t1;gacha.t10+=b.t10;
 for(const [k] of GUAR_TYPES)gacha.g[k]+=b[k];
 gacha.box={t1:0,t10:0,rare:0,sr:0,uber:0};
 saveGacha();renderGachaBadge();if(typeof renderTraining==='function')renderTraining();
 if(gachaOpen())renderGacha();
 gachaToast('보관함에서 받음: '+text);
 return true;
}
// 일일 출석: 보관함으로, 7일 연속 출석에는 레어 확정권 +1
const _gbDaily=gachaClaimDaily;
gachaClaimDaily=function(){
 const t1=gacha.t1,t10=gacha.t10,d=_gbDaily.apply(this,arguments);
 if(!d)return d;
 gacha.t1=t1;gacha.t10=t10;
 const g=d.streak%GACHA_CFG.dailyStreakBonus===0?{rare:1}:{};
 gachaStore(d.t1,d.t10,g);d.rare=g.rare||0;
 return d;
};
// 랭크 보상에 확정권 추가
{
 const add=[{at:150,text:'레어 확정권 1장',g:{rare:1}},{at:450,text:'슈퍼 레어 확정권 1장',g:{sr:1}},{at:750,text:'울슈레 확정권 1장',g:{uber:1}},{at:1250,text:'울슈레 확정권 1장',g:{uber:1}}];
 for(const r of add)if(!RANK_REWARDS.some(x=>x.at===r.at))RANK_REWARDS.push(r);
 RANK_REWARDS.sort((a,b)=>a.at-b.at);
 const _gbRankGrant=rankGrant;
 rankGrant=function(x){_gbRankGrant(x);if(x.g)gachaStore(0,0,x.g)};
}
// ---- 확정 뽑기
function guaranteedPick(list){// 아직 못 가진 캐릭터 우선
 const fresh=list.filter(s=>!gachaOwns(s.id)),pool=fresh.length?fresh:list;
 return pool[Math.floor(Math.random()*pool.length)];
}
function gachaUseGuarantee(type){
 if(!(gacha.g[type]>=1))return {error:'확정권이 없어요'};
 let list,kind,dupXp;
 if(type==='sr'){list=gachaPoolSR();kind='sr';dupXp=GACHA_CFG.dupXp}
 else if(type==='rare'){list=gachaPoolRare();kind='rare';dupXp=GACHA_CFG.dupXpRare}
 else{
  if(gachaBanner==='general'||!SERIES_MEMBERS[gachaBanner])return {error:'울슈레 확정권은 위쪽 탭에서 시리즈를 고른 뒤 사용하세요'};
  list=SERIES_MEMBERS[gachaBanner];kind='prism';dupXp=GACHA_CFG.dupXpPrism;
 }
 if(!list.length)return {error:'뽑을 캐릭터가 없어요'};
 const s=guaranteedPick(list),res={kind,guaranteed:true,id:s.id,name:s.name,gtype:type};
 if(gachaOwns(s.id)){
  res.dup=true;res.xp=dupXp;training.xp+=res.xp;saveTraining();
  if(typeof addPlusLevel==='function'&&addPlusLevel(s.id)){training.xp-=res.xp;res.plus=plusLevel(s.id);res.xp=0;saveTraining()}
 }else{gacha.owned.push(s.id);res.isNew=true}
 gacha.g[type]--;gacha.pulls++;saveGacha();
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
 st.textContent='.gacha-box{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:6px 0;padding:8px 10px;border-radius:10px;background:#241d36;border:1px solid #6b5a8a}.gacha-box b{color:#ffd166}.gacha-box button{padding:6px 12px;border-radius:8px;border:0;background:#7b2fbe;color:#fff;font-weight:700;cursor:pointer}.gacha-box button:disabled{background:#3a3450;color:#888;cursor:default}.gacha-guar{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}.gacha-guar button{padding:7px 12px;border-radius:8px;border:1px solid #d3b0ff;background:#2a2340;color:#fff;cursor:pointer}.gacha-guar button:disabled{opacity:.45;cursor:default}';
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
 for(const [k,name] of GUAR_TYPES){
  const b=document.createElement('button');b.type='button';
  const need=k==='uber'&&(gachaBanner==='general'||!SERIES_MEMBERS[gachaBanner]);
  b.textContent=`${name} 사용 (${gacha.g[k]}장)`+(need?' · 시리즈 탭에서':'');
  b.disabled=gacha.g[k]<1||need;
  b.onclick=()=>{
   const o=gachaUseGuarantee(k);
   if(o.error){gachaToast(o.error);return}
   renderGacha([o.res]);
  };
  guar.append(b);
 }
 $('#gachaTickets').innerHTML+=`<span>확정권 레어 <b>${gacha.g.rare}</b> · SR <b>${gacha.g.sr}</b> · 울슈레 <b>${gacha.g.uber}</b></span>`;
};
renderGachaBadge();
