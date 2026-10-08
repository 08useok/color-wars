const fs=require('fs'),path=require('path');
module.exports=function createEngine({optimized=true,savedLegend={},withCatfruit=false}={}){
 const source=fs.readFileSync(path.join(__dirname,'..','game.js'),'utf8')+(withCatfruit?'\n'+fs.readFileSync(path.join(__dirname,'..','catfruit.js'),'utf8'):'');
 const noop=()=>{},els=new Map();
 function element(){return {style:{setProperty:noop},classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},dataset:{},children:[],firstChild:{nodeValue:''},querySelector:()=>element(),querySelectorAll:()=>[],append:noop,appendChild:noop,remove:noop,setAttribute:noop,addEventListener:noop,getBoundingClientRect:()=>({left:0,width:1000,top:0,height:400}),getContext:()=>({}),focus:noop};}
 const env={addEventListener:noop,console,Math:Object.create(Math),Date,URLSearchParams,location:{search:''},document:{querySelector:s=>{if(!els.has(s))els.set(s,element());return els.get(s)},querySelectorAll:()=>[],createElement:()=>element(),documentElement:element(),addEventListener:noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},requestAnimationFrame:noop,setTimeout:noop,setInterval:noop,Image:class{},window:{addEventListener:noop},performance:{now:()=>0}};
 const fast=optimized?`
 // Equivalent nearest-target scan: preserve original array order on distance ties.
 target=u=>{let nearest=null,best=Infinity,dir=u.ally?-1:1;for(const v of game.units){if(v.hp<=0||v.kbTime>0||v.emerging||v.ally===u.ally||dir*(v.x-u.x)<-1)continue;const dist=Math.abs(v.x-u.x);if(dist<best){best=dist;nearest=v;}}return nearest;};
 targetValid=u=>{const dz=deadZone(u);if(!dz)return target(u);let nearest=null,best=Infinity,dir=u.ally?-1:1;for(const v of game.units){if(v.hp<=0||v.kbTime>0||v.emerging||v.ally===u.ally||dir*(v.x-u.x)<-1)continue;const dist=Math.abs(v.x-u.x);if(dist>=dz&&dist<best){best=dist;nearest=v;}}return nearest;};
 const originalStats=unitStats,statCache=new Map(),costCache=new Map();
 unitStats=(type,level,form)=>{const key=type+':'+(level??training.levels[type]??1)+':'+(form??(training.forms[type]===1?1:2));if(!statCache.has(key))statCache.set(key,originalStats(type,level,form));return {...statCache.get(key)};};
 const originalCost=unitCost;unitCost=type=>{if(!costCache.has(type))costCache.set(type,originalCost(type));return costCache.get(type);};
 chapterBonusCount=()=>3;
 `:'';
 env.localStorage.getItem=k=>k==='red-battle-legend-v1'?JSON.stringify(savedLegend):null;
 const setup=`
 render=()=>{};tutorial=()=>{};animateUnit=()=>{};animateDog=()=>{};critBurst=()=>{};beamFx=()=>{};beamHit=()=>{};
 drawUnit=u=>{u.el=document.createElement('div');};
 syncBasePositions=()=>{data.bases.enemy.x=10;data.bases.enemy.frontX=12;data.bases.ally.x=90;data.bases.ally.frontX=88;};
 finish=win=>{game.ended=true;game.running=false;game.won=win;};
 cleared=STAGES.map((_,i)=>i);for(const t of ALLIES)training.levels[t]=30;
 training.baseLevel=10;training.walletLevel=20;training.prodLevel=20;training.accLevel=20;allyUnlocked=()=>true;
 ${fast}
 const originalAddUnit=addUnit;let deploymentCounts={};
 addUnit=(...args)=>{const before=game.units.length;originalAddUnit(...args);if(game.units.length>before&&ALLIES.includes(args[0]))deploymentCounts[args[0]]=(deploymentCounts[args[0]]||0)+1;};
 function simulate(index,crown,types,seed,limit=300){
  let state=seed;Math.random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
  selectedStage=index;legendCrown=crown;deck=types;deploymentCounts={};${optimized?'statCache.clear();costCache.clear();':''}reset();game.running=true;game.tutorial=6;game.auto=true;
  let frames=0;while(!game.ended&&game.elapsed<limit){update(1/30);frames++;}
  return {win:game.won===true,timeout:!game.ended,seconds:+game.elapsed.toFixed(2),allyHp:data.bases.ally.hp,enemyHp:data.bases.enemy.hp,frames,deployments:{...deploymentCounts}};
 }
 return {stageList:STAGES,roster:ALLIES,spawnList:STAGE_SPAWNS,units:data.units,names:UNIT_NAMES,gradeOf,simulate,unitStats,profileMarkup,atlases:NEW_ATLASES,training,damage,addUnit,update,reset,getGame:()=>game,traitMult,resolveAttack,deadZone,updateStageSpawns,bases:data.bases,legendIdx,legendSubOf,legendSubDone,legendSubOpen,legendProgress,legendSubs:LEGEND_SUBS,legendCrownMult,${withCatfruit?'setTrueForms:types=>{trueForms=types},':''}};`;
 return new Function(...Object.keys(env),source.replace('reset();openStages();requestAnimationFrame(loop);','')+setup)(...Object.values(env));
};
