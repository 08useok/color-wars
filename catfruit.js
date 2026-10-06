// 3진 (true form) and 개다래 열매 (catfruit), modelled on the original: clearing 미래편 2장 opens true forms, and each
// true form costs catfruit of the unit's colour (보라·빨강·파랑·초록·노랑 열매/씨앗, plus 에픽 개다래 for EX·울슈레) and XP.
// No 3진 drawings yet: a 3진 keeps its 2진 art with a gold glow and gets HP/ATK x1.2.
// Catfruit comes from 미래편 stages and the daily '개다래 축제' special stage (the day decides the colour).
const FRUIT_COLORS=['purple','red','blue','green','yellow'];
const FRUIT_NAME={purple:'보라',red:'빨강',blue:'파랑',green:'초록',yellow:'노랑'};
const FRUIT_ICON={purple:'🟣',red:'🔴',blue:'🔵',green:'🟢',yellow:'🟡'};
const TRUE_FORM_MULT=1.2;
const TRUE_FORM_COST={basic:{fruit:1,seed:3,epic:0,xp:30000},rare:{fruit:2,seed:4,epic:0,xp:60000},sr:{fruit:3,seed:5,epic:0,xp:100000},
 ex:{fruit:3,seed:5,epic:1,xp:150000},uber:{fruit:5,seed:8,epic:2,xp:250000}};
let catfruit={seed:{},fruit:{},epic:0},trueForms=[];
try{const v=JSON.parse(localStorage.getItem('red-battle-catfruit-v1')||'{}');for(const k of ['seed','fruit'])for(const c of FRUIT_COLORS)catfruit[k][c]=Number.isSafeInteger(v[k]?.[c])&&v[k][c]>0?v[k][c]:0;catfruit.epic=Number.isSafeInteger(v.epic)&&v.epic>0?v.epic:0}catch{for(const k of ['seed','fruit'])for(const c of FRUIT_COLORS)catfruit[k][c]=0}
try{const v=JSON.parse(localStorage.getItem('red-battle-trueform-v1')||'[]');if(Array.isArray(v))trueForms=v.filter(t=>ALLIES.includes(t))}catch{}
function saveCatfruit(){try{localStorage.setItem('red-battle-catfruit-v1',JSON.stringify(catfruit))}catch{}}
function saveTrueForms(){try{localStorage.setItem('red-battle-trueform-v1',JSON.stringify(trueForms))}catch{}}
function trueFormOpen(){return cleared.includes(FUTURE2_END-1)}
function hasTrueForm(t){return trueFormOpen()&&trueForms.includes(t)}
// The unit's colour decides its catfruit: hue of its UI colour; greys (black, white, silver…) take purple.
function fruitColorOf(t){
 const hex=(COLORS[t]||'#888888').replace('#',''),[r,g,b]=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;
 if(mx===0||d/mx<.18)return 'purple';
 let h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h=(h*60+360)%360;
 return h<20||h>=330?'red':h<70?'yellow':h<170?'green':h<265?'blue':'purple'}
function trueFormCost(t){return TRUE_FORM_COST[gradeOf(t)]||TRUE_FORM_COST.basic}
function canTrueForm(t){
 if(!trueFormOpen()||trueForms.includes(t)||!allyUnlocked(t)||data.units[t].noEvolve||(training.levels[t]||1)<LV_MAX)return false;
 const c=trueFormCost(t),col=fruitColorOf(t);
 return catfruit.fruit[col]>=c.fruit&&catfruit.seed[col]>=c.seed&&catfruit.epic>=c.epic&&training.xp>=c.xp}
function evolveTrueForm(t){
 if(!canTrueForm(t))return false;
 const c=trueFormCost(t),col=fruitColorOf(t);
 catfruit.fruit[col]-=c.fruit;catfruit.seed[col]-=c.seed;catfruit.epic-=c.epic;training.xp-=c.xp;
 trueForms.push(t);delete training.forms[t];saveCatfruit();saveTrueForms();saveTraining();renderTraining();render();return true}
function costText(t){const c=trueFormCost(t),col=fruitColorOf(t);return `${FRUIT_ICON[col]}${FRUIT_NAME[col]} 열매 ${c.fruit} · 씨앗 ${c.seed}${c.epic?` · ✨에픽 ${c.epic}`:''} · ${c.xp.toLocaleString()} XP`}
function catfruitSummary(){return FRUIT_COLORS.map(c=>`${FRUIT_ICON[c]}${catfruit.fruit[c]}/${catfruit.seed[c]}`).join(' ')+` ✨${catfruit.epic}`}
function addCatfruit(kind,col,n=1){if(kind==='epic')catfruit.epic+=n;else catfruit[kind][col]+=n;saveCatfruit()}
function catfruitText(kind,col,n){return kind==='epic'?`에픽 개다래 ${n}개`:`${FRUIT_NAME[col]} 개다래 ${kind==='fruit'?'열매':'씨앗'} ${n}개`}

// Stats: a 3진 is the 2진 with HP/ATK x1.2.
const _unitStatsCF=unitStats;
unitStats=function(type,level,form){
 const s=_unitStatsCF.apply(this,arguments);
 if(s.evolved&&hasTrueForm(type)){s.trueForm=true;s.hp=Math.round(s.hp*TRUE_FORM_MULT);s.atk=Math.round(s.atk*TRUE_FORM_MULT);if(s.damageTiers)s.damageTiers=s.damageTiers.map(t=>({...t,dmg:Math.round(t.dmg*TRUE_FORM_MULT)}))}
 return s};
// Battle: 3진 units glow gold.
const _addUnitCF=addUnit;
addUnit=function(type){const n=game.units.length,r=_addUnitCF.apply(this,arguments);const u=game.units[game.units.length-1];if(game.units.length>n&&u?.ally&&u.stats?.trueForm)u.el.classList.add('true-form');return r};

// Upgrade cards: 3진 label, gold portrait and a 3진 button; catfruit stock under the deck line.
const _renderTrainingCF=renderTraining;
renderTraining=function(){
 _renderTrainingCF.apply(this,arguments);
 let line=$('#catfruitText');if(!line){line=document.createElement('p');line.id='catfruitText';line.className='catfruit-line';$('#deckText').after(line)}
 line.textContent=trueFormOpen()?`개다래 열매/씨앗 ${catfruitSummary()} · 3진: Lv.${LV_MAX} 이상 2진 캐릭터에게 개다래 열매로 진화`:`개다래 ${catfruitSummary()} · 3진은 미래편 2장 달을 클리어하면 열립니다`;
 for(const card of $('#trainingGrid').children){
  const t=card.dataset.type;
  if(!t||data.units[t].noEvolve)continue;
  const evolved=(training.levels[t]||1)>=LV_EVOLVE&&training.forms[t]!==1;
  if(hasTrueForm(t)&&evolved){const h=card.querySelector('h3');if(h.firstChild?.nodeType===3)h.firstChild.textContent=h.firstChild.textContent.replace(' 2진',' 3진');card.classList.add('true-form-card')}
  if(trueFormOpen()&&!trueForms.includes(t)){const b=document.createElement('button');b.className='true-btn';const ok=canTrueForm(t);
   b.textContent=(training.levels[t]||1)<LV_MAX?`3진: Lv.${LV_MAX} 필요`:`3진 진화 · ${costText(t)}`;b.disabled=!ok;b.title=costText(t);b.onclick=()=>evolveTrueForm(t);card.append(b)}}
};

// Drops: 미래편 stages give seeds (1장) or seeds/fruit (2장) of the stage's colour; the first 2장 Moon clear gives an epic catfruit.
const CATFRUIT_FUTURE={5:{seed:.25,fruit:0},6:{seed:.35,fruit:.15}};
const _finishCF=finish;
finish=function(win){
 const fresh=!game.ended,idx=selectedStage,st=STAGES[idx],was=cleared.includes(idx),trueWas=trueFormOpen();
 _finishCF.apply(this,arguments);
 if(!fresh||!win||!st||!st.future)return;
 const ch=st.chapter,base=ch===6?FUTURE2_START:FUTURE_START,col=FRUIT_COLORS[(idx-base)%5],p=CATFRUIT_FUTURE[ch]||{seed:0,fruit:0},got=[];
 if(Math.random()<p.seed){addCatfruit('seed',col);got.push(catfruitText('seed',col,1))}
 if(Math.random()<p.fruit){addCatfruit('fruit',col);got.push(catfruitText('fruit',col,1))}
 if(idx===FUTURE2_END-1&&!was){addCatfruit('epic',null,1);got.push(catfruitText('epic',null,1))}
 if(got.length&&typeof gachaAppendDetail==='function')gachaAppendDetail(got.join(' · ')+' 획득!');
 if(!trueWas&&trueFormOpen()&&typeof gachaAppendDetail==='function')gachaAppendDetail('3진이 열렸어요! 캐릭터 강화에서 개다래 열매로 진화할 수 있어요');
};

// 개다래 축제: a daily special stage whose catfruit colour follows the weekday (월 보라 · 화 빨강 · 수 파랑 · 목 초록 · 금 노랑 ·
// 토일 아무 색 + 에픽 확률). Opens after 미래편 1장; the top tier after 미래편 2장 like the original's harder catfruit stages.
const CATFRUIT_DAY={1:'purple',2:'red',3:'blue',4:'green',5:'yellow'};
const CATFRUIT_TIERS=[{n:'초급',hp:30000,xp:3000,boss:'gory',mag:400,seed:[1,2],fruit:0,epic:0},{n:'중급',hp:80000,xp:6000,boss:'bear',mag:800,seed:[2,3],fruit:.35,epic:0},
 {n:'상급',hp:200000,xp:12000,boss:'kangaroo',mag:1500,seed:[2,4],fruit:1,epic:.05}];
const CATFRUIT_START=STAGES.length;
CATFRUIT_TIERS.forEach((t,k)=>STAGES.push({name:'개다래 축제 '+t.n,flag:'🍇',hp:t.hp,gap:4,wave:0,sky:'#f1e2ff',land:'#9a7bc0',
 desc:`보스 ${UNIT_NAMES[t.boss]||t.boss} · 오늘 색의 개다래 씨앗 ${t.seed.join('~')}개${t.fruit?` · 열매 ${Math.round(t.fruit*100)}%`:''}${t.epic?` · 주말 에픽 ${Math.round(t.epic*100)}%`:''} · XP ${t.xp}`,
 chapter:'special',special:{chance:1,count:1,item:'catfruit',xp:t.xp},catfruitFest:{k},maxEnemies:10}));
CATFRUIT_TIERS.forEach((t,k)=>{STAGE_SPAWNS[CATFRUIT_START+k]=[{type:'dog',at:{t:0},delay:[3,7],mag:t.mag},{type:'snache',at:{t:4},delay:[5,10],mag:t.mag},{type:'guys',at:{t:10},delay:[8,16],mag:t.mag},
 {type:'baa',at:{t:20},delay:[12,20],mag:t.mag},{type:t.boss,at:{hp:90},count:1,boss:true,mag:t.mag},...(k>=1?[{type:'rabbit',at:{hp:60},delay:[10,18],mag:t.mag}]:[]),...(k>=2?[{type:'darkdog',at:{hp:40},delay:[8,14],mag:300}]:[])]});
function catfruitDayColor(){const d=new Date().getDay();return CATFRUIT_DAY[d]||FRUIT_COLORS[Math.floor(Math.random()*5)]}
function catfruitFestOpen(k){return cleared.includes(FUTURE_END-1)&&(k<2||cleared.includes(FUTURE2_END-1))}
let lastCatfruitText='';
const _giveSpecialItemCF=giveSpecialItem;
giveSpecialItem=function(item,n){
 if(item!=='catfruit')return _giveSpecialItemCF.apply(this,arguments);
 const t=CATFRUIT_TIERS[STAGES[selectedStage].catfruitFest.k],col=catfruitDayColor(),weekend=!CATFRUIT_DAY[new Date().getDay()],got=[];
 const seeds=t.seed[0]+Math.floor(Math.random()*(t.seed[1]-t.seed[0]+1));addCatfruit('seed',col,seeds);got.push(catfruitText('seed',col,seeds));
 if(t.fruit&&Math.random()<t.fruit){addCatfruit('fruit',col);got.push(catfruitText('fruit',col,1))}
 if(weekend&&t.epic&&Math.random()<t.epic){addCatfruit('epic',null,1);got.push(catfruitText('epic',null,1))}
 lastCatfruitText=got.join(' · ')+' 획득!'};
const _specialItemTextCF=specialItemText;
specialItemText=function(item){return item==='catfruit'?lastCatfruitText:_specialItemTextCF.apply(this,arguments)};
const _renderSpecialStagesCF=renderSpecialStages;
renderSpecialStages=function(){
 _renderSpecialStagesCF.apply(this,arguments);
 const grid=$('#specialGrid');if(!grid)return;
 const r=document.createElement('div');r.className='special-row today';
 const col=CATFRUIT_DAY[new Date().getDay()],l=document.createElement('div');l.className='special-label';
 l.innerHTML=`<b class="day">매일</b><strong>🍇 개다래 축제</strong><small>${col?`오늘: ${FRUIT_ICON[col]}${FRUIT_NAME[col]} 개다래`:'주말: 아무 색 + 에픽'}</small>`;r.append(l);
 CATFRUIT_TIERS.forEach((t,k)=>{const i=CATFRUIT_START+k,b=document.createElement('button');b.className='stage-card catfruit';b.disabled=!catfruitFestOpen(k);b.title=STAGES[i].desc+' · 적 성 체력 '+STAGES[i].hp;
  b.innerHTML=`<strong>${t.n}</strong>${starHTML(stageStars(i))}<small>${!cleared.includes(FUTURE_END-1)?'미래편 1장 후':k===2&&!cleared.includes(FUTURE2_END-1)?'미래편 2장 후':`씨앗 ${t.seed.join('~')}${t.fruit?` · 열매 ${Math.round(t.fruit*100)}%`:''}`}</small>`;
  b.onclick=()=>{selectedStage=i;reset()};r.append(b)});
 const ribbonRow=[...grid.children].find(e=>e.querySelector?.('.stage-card.ribbon'));
 if(ribbonRow)ribbonRow.after(r);else grid.prepend(r)};
