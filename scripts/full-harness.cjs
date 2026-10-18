// game.js + 전투에 영향을 주는 추가 스크립트(울슈레·좀비·땅굴·스테이지 완화·3진·아종·대포)를 화면 없이 올리는 전투 시험 도구.
// battle-harness.cjs와 같은 sim 규칙(성 위치, 경제 최대, 30fps, 야옹컴 정책)이며 추가 파일만 더 읽는다.
// addons: 읽을 추가 파일 이름 목록. 기본은 전투 관련 전부. levels: 아군 레벨(기본 30). trueForms: 3진 전환할 유닛 목록.
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const DEFAULT_ADDONS=['clover-variant-atlases.js','clover-variant-integration.js','rank.js','catfruit.js','gold-beige-3.js','three-professions-3.js','subspecies.js','stage-tuning.js','zombie.js','zombie-burrow.js','amber.js','ubers-yellow.js','colors-motion-atlases.js','ubers-green.js','ubers-blue.js','ubers-turquoise.js','uber-series.js','cannon.js','cyclone-motion-atlases.js','cyclone-advents.js','subspecies-motion-atlases.js','subspecies-motion.js'];
module.exports=function createFullEngine({fresh=false,addons=DEFAULT_ADDONS,savedLegend={},level=30,base=10,wallet=20,prod=20,acc=20,extraSetup=''}={}){
 // gacha.js 대신: 추가 파일이 읽는 뽑기 전역만 흉내 낸다
 const PRELUDE=`\nconst EX_NAME={};const GACHA_UBER=[];const gacha={owned:[],t1:0,t10:0,fix:0,pulls:0};function gachaOwns(){return true}function saveGacha(){}function renderGachaBadge(){}function gachaToast(){}\n`;
 const sources=['game.js',...addons].map((f,i)=>`\n// ---- ${f}\n`+fs.readFileSync(path.join(ROOT,f),'utf8').replace('reset();openStages();requestAnimationFrame(loop);','reset();')+(i===0?PRELUDE:''));
 const noop=()=>{},els=new Map();
 function element(){
  const t={style:{setProperty:noop,removeProperty:noop},classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},dataset:{},children:[],firstChild:{nodeValue:''},
   querySelector:()=>element(),querySelectorAll:()=>[],append:noop,appendChild:noop,prepend:noop,before:noop,after:noop,remove:noop,replaceWith:noop,insertBefore:noop,
   setAttribute:noop,getAttribute:()=>null,removeAttribute:noop,addEventListener:noop,removeEventListener:noop,closest:()=>null,matches:()=>false,cloneNode:()=>element(),
   getBoundingClientRect:()=>({left:0,width:1000,top:0,height:400}),getContext:()=>({}),focus:noop,blur:noop,click:noop,scrollIntoView:noop,insertAdjacentHTML:noop,
   innerHTML:'',textContent:'',value:'',disabled:false,hidden:false};
  return t;
 }
 const document={head:element(),body:element(),querySelector:s=>{if(!els.has(s))els.set(s,element());return els.get(s)},querySelectorAll:()=>[],getElementById:s=>{if(!els.has('#'+s))els.set('#'+s,element());return els.get('#'+s)},createElement:()=>element(),documentElement:element(),addEventListener:noop};
 const store={};
 const env={addEventListener:noop,console,Math:Object.create(Math),Date,URLSearchParams,location:{search:'',hash:''},document,
  localStorage:{getItem:k=>k==='red-battle-legend-v1'?JSON.stringify(savedLegend):(store[k]??null),setItem:(k,v)=>{store[k]=String(v)},removeItem:noop},
  requestAnimationFrame:noop,setTimeout:noop,setInterval:noop,Image:class{},window:{addEventListener:noop},performance:{now:()=>0},navigator:{userAgent:''},alert:noop,confirm:()=>true};
 const initCode=fresh
  ?'cleared.length=0;for(const t of ALLIES)training.levels[t]=1;training.baseLevel=1;training.walletLevel=0;training.prodLevel=0;training.accLevel=0;training.studyLevel=0;training.xp=0;'
  :'cleared=STAGES.map((_,i)=>i);for(const t of ALLIES)training.levels[t]='+level+';training.baseLevel='+base+';training.walletLevel='+wallet+';training.prodLevel='+prod+';training.accLevel='+acc+';allyUnlocked=()=>true;';
 const setup=`
 render=()=>{};tutorial=()=>{};animateUnit=()=>{};animateDog=()=>{};critBurst=()=>{};beamFx=()=>{};beamHit=()=>{};
 drawUnit=u=>{u.el=document.createElement('div');};
 syncBasePositions=()=>{data.bases.enemy.x=10;data.bases.enemy.frontX=12;data.bases.ally.x=90;data.bases.ally.frontX=88;};
 finish=win=>{game.ended=true;game.running=false;game.won=win;};
 ${initCode}
 target=u=>{let nearest=null,best=Infinity,dir=u.ally?-1:1;for(const v of game.units){if(v.hp<=0||v.kbTime>0||v.emerging||v.ally===u.ally||dir*(v.x-u.x)<-1)continue;const dist=Math.abs(v.x-u.x);if(dist<best){best=dist;nearest=v;}}return nearest;};
 ${fresh?'':'chapterBonusCount=()=>3;'}
 const originalAddUnit=addUnit;let deploymentCounts={};
 addUnit=(...args)=>{const before=game.units.length;originalAddUnit(...args);if(game.units.length>before&&ALLIES.includes(args[0]))deploymentCounts[args[0]]=(deploymentCounts[args[0]]||0)+1;};
 const _autoDeployBase=autoDeploy;let policy='auto';
 autoDeploy=function(){
  if(policy==='auto')return _autoDeployBase();
  const l=data.income[game.level];if(l.cost!==null&&game.money>=l.cost){game.money-=l.cost;game.level++}
  const foes=game.units.filter(v=>!v.ally&&v.hp>0);
  const front=foes.length?Math.max(...foes.map(v=>v.x)):0,danger=data.bases.ally.frontX-front<DANGER_ZONE||data.bases.ally.hp<data.bases.ally.max*.8;
  const rate=incomeRate(),full=game.money>=walletMax()*.97;
  const list=deck.filter(t=>allyUnlocked(t)&&allyStageAllowed(t));
  const order=policy==='smart2'&&danger?list.sort((a,b)=>unitCost(a)-unitCost(b)):list.sort((a,b)=>unitCost(b)-unitCost(a));
  for(const type of order){
   if(unitCooldown(type)>0)continue;
   const c=unitCost(type);
   if(game.money>=c)addUnit(type);
   else if(!danger&&!full&&c<=walletMax()&&c<=game.money+rate*4)break;
  }
 };
 const DANGER_ZONE=30;
 ${extraSetup}
 function simulate(index,crown,types,seed,limit=300,pol='auto',mods=null){
  policy=pol;
  const orig=STAGE_SPAWNS[index];
  if(mods){STAGE_SPAWNS[index]=orig.filter(r=>!(mods.remove||[]).includes(r.type)).map(r=>mods.mag&&mods.mag[r.type]!==undefined?{...r,mag:Math.max(1,Math.round((r.mag||100)*mods.mag[r.type]))}:r);}
  try{
  let state=seed;Math.random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
  selectedStage=index;legendCrown=crown;deck=types;deploymentCounts={};reset();game.running=true;game.tutorial=6;game.auto=true;
  let frames=0;while(!game.ended&&game.elapsed<limit){update(1/30);frames++;}
  return {win:game.won===true,timeout:!game.ended,seconds:+game.elapsed.toFixed(2),allyHp:data.bases.ally.hp,enemyHp:data.bases.enemy.hp,frames,deployments:{...deploymentCounts}};
  }finally{STAGE_SPAWNS[index]=orig}
 }
 function setProfile(p={}){
  if(p.state){const st=p.state;cleared.length=0;cleared.push(...(st.cleared||[]));for(const t of ALLIES)training.levels[t]=(st.levels&&st.levels[t])||1;training.baseLevel=st.baseLevel||1;training.walletLevel=st.walletLevel||0;training.prodLevel=st.prodLevel||0;training.accLevel=st.accLevel||0;training.studyLevel=st.studyLevel||0;trueForms.length=0;return;}const L=p.level??${level};for(const t of ALLIES)training.levels[t]=L;training.baseLevel=p.base??${base};training.walletLevel=p.wallet??${wallet};training.prodLevel=p.prod??${prod};training.accLevel=p.acc??${acc};if(p.suppressN!==undefined){const SUPP6=[...ALIEN_SUPPRESSORS,...ALIEN_SUPPRESSORS2,...ALIEN_SUPPRESSORS3];const SUPP=[...SUPP6,...ALIEN_SUPPRESSORS4];cleared.length=0;cleared.push(...STAGES.map((_,i)=>i).filter(i=>!SUPP.includes(i)||SUPP6.indexOf(i)>=0&&SUPP6.indexOf(i)<p.suppressN));}
 if(p.noSuppress!==undefined){const SUPP=[...ALIEN_SUPPRESSORS,...ALIEN_SUPPRESSORS2,...ALIEN_SUPPRESSORS3,...ALIEN_SUPPRESSORS4];cleared.length=0;cleared.push(...STAGES.map((_,i)=>i).filter(i=>!(p.noSuppress&&SUPP.includes(i))));}trueForms.length=0;if(p.trueForms)trueForms.push(...p.trueForms);if(p.trueFormsAll)for(const t of ALLIES)if(trueFormOpen(t)&&!data.units[t].noEvolve&&!trueForms.includes(t))trueForms.push(t);}
 return {trueBonus:TRUE_FORM_BONUS,damage,setProfile,lv20:LV20_TARGET,roles:ROLES,alienMagnification,itfSuppressed,alienSuppressed,setCleared:l=>{cleared.length=0;cleared.push(...l)},stageList:STAGES,roster:ALLIES,spawnList:STAGE_SPAWNS,units:data.units,names:UNIT_NAMES,gradeOf,simulate,unitStats,training,addUnit,update,reset,getGame:()=>game,legendIdx,legendSubOf,legendSubs:LEGEND_SUBS,chapterOf,legendCrownMult,enemyMagnification,DECK_SIZE};`;
 return new Function(...Object.keys(env),sources.join('\n')+setup)(...Object.values(env));
};
