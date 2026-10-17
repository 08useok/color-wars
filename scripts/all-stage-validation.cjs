const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'game.js'),'utf8');
const noop=()=>{},els=new Map();
function element(){return {style:{setProperty:noop},classList:{add:noop,remove:noop,toggle:noop,contains:()=>false},dataset:{},children:[],firstChild:{nodeValue:''},querySelector:()=>element(),querySelectorAll:()=>[],append:noop,appendChild:noop,remove:noop,setAttribute:noop,addEventListener:noop,getBoundingClientRect:()=>({left:0,width:1000,top:0,height:400}),getContext:()=>({}),focus:noop};}
const c={addEventListener:noop,console,Math:Object.create(Math),Date,URLSearchParams,location:{search:''},document:{querySelector:s=>{if(!els.has(s))els.set(s,element());return els.get(s)},querySelectorAll:()=>[],createElement:()=>element(),documentElement:element(),addEventListener:noop},localStorage:{getItem:()=>null,setItem:noop,removeItem:noop},requestAnimationFrame:noop,setTimeout:noop,setInterval:noop,Image:class{},window:{addEventListener:noop},performance:{now:()=>0}};
vm.createContext(c);
vm.runInContext(source.replace('reset();openStages();requestAnimationFrame(loop);',''),c,{filename:'game.js'});
vm.runInContext(`
render=()=>{};tutorial=()=>{};animateUnit=()=>{};animateDog=()=>{};critBurst=()=>{};beamFx=()=>{};beamHit=()=>{};
drawUnit=u=>{u.el=document.createElement('div');};
syncBasePositions=()=>{data.bases.enemy.x=10;data.bases.enemy.frontX=12;data.bases.ally.x=90;data.bases.ally.frontX=88;};
finish=win=>{game.ended=true;game.running=false;game.won=win;};
cleared=STAGES.map((_,i)=>i);for(const t of ALLIES)training.levels[t]=30;
training.baseLevel=10;training.walletLevel=20;training.prodLevel=20;training.accLevel=20;
allyUnlocked=()=>true;
globalThis.stageList=STAGES;globalThis.roster=ALLIES;globalThis.spawnList=STAGE_SPAWNS;
// limit uses game elapsed seconds: 300 at 1x equals 150 wall seconds at 2x.
globalThis.simulate=(index,crown,types,seed,limit=300)=>{
 let state=seed;Math.random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
 selectedStage=index;legendCrown=crown;deck=types;reset();game.running=true;game.tutorial=6;game.auto=true;
 let frames=0;while(!game.ended&&game.elapsed<limit){update(1/30);frames++;}
 return {win:game.won===true,timeout:!game.ended,seconds:+game.elapsed.toFixed(2),allyHp:data.bases.ally.hp,enemyHp:data.bases.enemy.hp,frames};
};`,c);
const tasks=c.stageList.flatMap((s,i)=>s.legend?[1,2,3,4].map(crown=>({i,crown,name:s.name})):[{i,crown:1,name:s.name}]);
for(const [index,rules] of Object.entries(c.spawnList))for(const rule of rules){if(!c.stageList[index])throw Error('Missing stage '+index);if(!vm.runInContext('data.units',c)[rule.type])throw Error('Missing enemy '+rule.type);}
console.log('Stage configurations:',tasks.length,'stages:',c.stageList.length);
const args=process.argv.slice(2),smoke=args.includes('--smoke'),full=args.includes('--full'),selectOnly=args.includes('--select-only');
const selection=!smoke&&!full?require('./select-validation-stages.cjs')(tasks,c.stageList,c.spawnList,root):null;
if(selection)console.log('Selected:',selection.retained,'excluded:',selection.removed);
const chosen=selectOnly?[]:smoke?tasks.slice(0,3):full?tasks:selection.conditions;
const baseline=['red','yellow','brick','indigo','ribbonorange','rainbow','cornflower','khaki','silver','fusioncream'];
const four=['white','brown','brick','moss','silver','navy','lava','magenta','ribbonorange','garnet'];
const rows=[];
for(const t of chosen){const result=c.simulate(t.i,t.crown,t.crown===4?four:baseline,1);rows.push({...t,...result});if(rows.length%25===0)console.log('Completed',rows.length,'/',chosen.length);}
const result={timeLimit:{gameSeconds:300,normalSpeedSeconds:300,doubleSpeedSeconds:150},method:'실제 전투·출현·경제·투사체·넉백 코드, Lv.30 2진/+0, 경제 강화 최대, 모든 장 클리어 보너스와 해당 장 에이리언 억제기 적용, 모든 아군 보유, 야옹컴 정책, 아이템·성포 사용 없음, 씨드 1, 300초 제한. 일반 덱과 4성 전용 덱 비교. 화면과 저장은 메모리 대체. 캐릭터별 순위나 최적 플레이 승률 검증이 아님.',total:rows.length,wins:rows.filter(r=>r.win).length,losses:rows.filter(r=>!r.win&&!r.timeout).length,timeouts:rows.filter(r=>r.timeout).length,rows};
if(!smoke&&!selectOnly)fs.writeFileSync(path.join(root,'docs/simulations/'+(full?'all-stage-validation':'focused-stage-validation')+'-2026-10-08.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({...result,rows:smoke?rows:undefined},null,2));
