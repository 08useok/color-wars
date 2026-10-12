// 환전소 (v6.2.0): 뽑기 화면에서 남는 티켓을 XP나 +레벨로 바꾼다.
// - 1회권 1장 → XP 3,000, 10회권 1장 → XP 35,000 (10회 뽑기 1번의 평균 기대 XP보다 약간 후하게)
// - 확정권 1장 → 고른 캐릭터 +레벨 +1 (캐릭터당 최대 +10, 가진 캐릭터만)
// 보관함에 든 티켓은 먼저 '모두 받기'로 수령한 뒤에만 바꿀 수 있다.
const EXCHANGE={t1Xp:3000,t10Xp:35000,fixPlus:1};
function exchangeTargets(){
 const gr={uber:0,ex:1,sr:2,rare:3,basic:4};
 return ALLIES.filter(t=>allyUnlocked(t)&&plusLevel(t)<PLUS_MAX)
  .sort((a,b)=>(gr[gradeOf(a)]-gr[gradeOf(b)])||(plusLevel(a)-plusLevel(b))||UNIT_NAMES[a].localeCompare(UNIT_NAMES[b],'ko'));
}
function gachaExchange(kind,target){
 if(kind==='t1'){if(gacha.t1<1)return {error:'1회권이 없어요'};gacha.t1--;training.xp+=EXCHANGE.t1Xp;saveGacha();saveTraining();return {text:`1회권 1장 → XP +${EXCHANGE.t1Xp.toLocaleString()}`}}
 if(kind==='t10'){if(gacha.t10<1)return {error:'10회권이 없어요'};gacha.t10--;training.xp+=EXCHANGE.t10Xp;saveGacha();saveTraining();return {text:`10회권 1장 → XP +${EXCHANGE.t10Xp.toLocaleString()}`}}
 if(kind==='fix'){
  if(gacha.fix<1)return {error:'확정권이 없어요'};
  if(!target||!ALLIES.includes(target))return {error:'+레벨을 올릴 캐릭터를 고르세요'};
  if(plusLevel(target)>=PLUS_MAX)return {error:'이미 +10이에요'};
  if(!addPlusLevel(target))return {error:'올릴 수 없는 캐릭터예요'};
  gacha.fix--;saveGacha();return {text:`확정권 1장 → ${UNIT_NAMES[target]} +레벨 ${plusLevel(target)} / ${PLUS_MAX}`};
 }
 return {error:'알 수 없는 교환'};
}
{
 const panel=document.createElement('div');panel.id='gachaExchange';panel.className='gacha-exchange';
 $('#gachaOwned').before(panel);
 const st=document.createElement('style');
 st.textContent='.gacha-exchange{margin:10px 0;padding:10px;border-radius:10px;background:#1f2a24;border:1px solid #5b8a6b}.gacha-exchange h3{margin:0 0 6px;font-size:.95rem}.gacha-exchange .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:4px 0}.gacha-exchange button{padding:6px 10px;border-radius:8px;border:1px solid #8fd1a4;background:#27382f;color:#fff;cursor:pointer}.gacha-exchange button:disabled{opacity:.45;cursor:default}.gacha-exchange select{padding:5px;border-radius:6px;background:#15201a;color:#fff;border:1px solid #5b8a6b;max-width:220px}';
 document.head.append(st);
}
let exchangeTarget='';
const _gxRender=renderGacha;
renderGacha=function(results){
 _gxRender.apply(this,arguments);
 const p=$('#gachaExchange');if(!p)return;
 const targets=exchangeTargets();
 if(!targets.includes(exchangeTarget))exchangeTarget=targets[0]||'';
 p.innerHTML='<h3>🔁 환전소</h3>';
 const mk=(label,dis,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.disabled=dis;b.onclick=fn;return b};
 const done=r=>{if(r.error){gachaToast(r.error);return}gachaToast(r.text);renderGacha();if(typeof renderTraining==='function')renderTraining()};
 const r1=document.createElement('div');r1.className='row';
 r1.append(mk(`1회권 1장 → XP ${EXCHANGE.t1Xp.toLocaleString()}`,gacha.t1<1,()=>done(gachaExchange('t1'))),
           mk(`10회권 1장 → XP ${EXCHANGE.t10Xp.toLocaleString()}`,gacha.t10<1,()=>done(gachaExchange('t10'))));
 p.append(r1);
 const r2=document.createElement('div');r2.className='row';
 const sel=document.createElement('select');
 sel.innerHTML=targets.map(t=>`<option value="${t}"${t===exchangeTarget?' selected':''}>${UNIT_NAMES[t]} (+${plusLevel(t)})</option>`).join('')||'<option value="">올릴 캐릭터 없음</option>';
 sel.onchange=()=>{exchangeTarget=sel.value};
 r2.append(sel,mk(`확정권 1장 → +레벨 +1 (보유 ${gacha.fix}장)`,gacha.fix<1||!targets.length,()=>done(gachaExchange('fix',sel.value))));
 p.append(r2);
 const note=document.createElement('p');note.className='gacha-note';
 note.textContent='보관함에 든 티켓은 먼저 "모두 받기"로 수령해야 바꿀 수 있어요. +레벨은 캐릭터당 최대 +10입니다.';
 p.append(note);
};
