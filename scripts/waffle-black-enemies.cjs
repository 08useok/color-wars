// Headless battles using the game's actual stats, movement, attack, damage and hitback functions.
// No deployment economy, stage waves, items or castle victory conditions: one ally versus one enemy.
const fs = require('fs'), vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'game.js'), 'utf8');
function fn(name) {
 const start = source.indexOf(`function ${name}(`);
 if (start < 0) throw Error(name);
 for (let end = source.indexOf('\n', start); end >= 0; end = source.indexOf('\n', end + 1)) {
  const code = source.slice(start, end);
  try { new vm.Script(code); return code; } catch {}
 }
 throw Error('Cannot extract ' + name);
}
function section(start, end) { return source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start))); }
const noop = () => {};
const element = () => ({style:{setProperty:noop},classList:{add:noop,remove:noop,toggle:noop},querySelector:()=>element(),remove:noop});
let seed=1;
const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const context={Math:Object.assign(Object.create(Math),{random}),data:{units:{},bases:{enemy:{frontX:0,hp:1e12},ally:{frontX:100,hp:1e12}}},training:{levels:{},forms:{}},ALLIES:['cream','dandelion'],selectedStage:200,CHAPTER1_LEN:48,
 gradeOf:()=> 'rare',enemyMagnification:()=>1,alienMagnification:()=>1,
 TRAIT_MULT:{strongVs:[1.8,.5],massiveVs:[3,1],resistVs:[1,.25],extremeVs:[5,1]},
 LV_EVOLVE:10,LV_MAX:20,HP_CURVE:.6,HP_LV10_MULT:1.8*2/1.15,
 HITBACK_DURATION:20/30,HITBACK_DISTANCE:6,BOSS_HP_THRESHOLD:2000,STATUS_FX_TIME:.6,SURVIVE_FX_TIME:1.6,SLOW_SPEED:.5,ENGAGE_SYNC_WINDOW:.12,DEAD_ZONE_RATIO:.25,LONG_RANGE_MIN:25,
 GENERIC_CD_TYPES:[],SHOT_STYLE:{},BEAM_FX:{},walletMax:()=>1e12,incomeRate:()=>0,accMult:()=>1,attackType:()=> '개체',
 render:noop,animateUnit:noop,animateDog:noop,tickSniper:noop,updateBoomerangs:noop,updateJuice:noop,updateShots:noop,updateStageSpawns:noop,critBurst:noop,
 finish:()=>{throw Error('Unexpected castle result');}};
vm.createContext(context);
for(const name of ['cream','dandelion','darkdog','gorydark','shadowboxer','blackotta','assassinbear','bunbunblack','kurosawah','blackleboin']) {
 const line=source.split('\n').find(l=>l.startsWith(`data.units.${name}=`));
 if(!line)throw Error(name); vm.runInContext(line,context);
}
vm.runInContext(section('const ATK_SLOPE=', '// Extra 2진 effects'),context);
vm.runInContext(section('const evoMez=', 'function allyUnlocked('),context);
for(const name of ['overMult','traitsOf','hasTrait','traitMult','statusLands','baseDamage','target','deadZone','targetValid','startHitback','tickHitback','damage','resolveAttack','fire','attack','canEngage','lockEngage','update'])vm.runInContext(fn(name),context);

const cf=fs.readFileSync(path.join(root,'catfruit.js'),'utf8');
context.hasTrueForm=t=>t==='cream';
for(const n of ['TRUE_FORM_MULT','TRUE_FORM_ATK_MULT','TRUE_FORM_BONUS'])vm.runInContext(cf.match(new RegExp('const '+n+'=[^;]+;'))[0],context);
vm.runInContext(cf.slice(cf.indexOf('const _unitStatsCF='),cf.indexOf('// Battle:')),context);
const names=source.match(/const UNIT_NAMES=([^;]+);/)[1];vm.runInContext('globalThis.names='+names,context);
const enemies=Object.keys(context.data.units).filter(t=>context.hasTrait(context.data.units[t],'black'));
const stats=context.unitStats('cream',30,2),rows=[],trials=100,dt=1/30;
const unit=(t,d,ally,x)=>({type:t,stats:{...d},ally,x,hp:d.hp,max:d.hp,kb:0,kbTime:0,hurtTime:0,attackTime:0,atkCd:0,animTime:0,flashTime:0,el:element()});
for(const enemy of enemies){
 const mags=[...source.matchAll(new RegExp("type:'"+enemy+"'(?:(?!type:).)*?mag:(\\d+)",'g'))].map(m=>+m[1]);
 const max=Math.max(100,...mags);
 for(const mag of [...new Set([100,max])])for(const count of [1,3,4]){
  let wins=0,draws=0,totalTime=0,slowSeconds=0,combatSeconds=0,damage=0;
  for(let trial=0;trial<trials;trial++){
   seed=trial+1;const ed=context.data.units[enemy],es={...ed,hp:Math.round(ed.hp*mag/100),atk:Math.round(ed.atk*mag/100)};
   const allies=Array.from({length:count},()=>unit('cream',stats,true,65)),e=unit(enemy,es,false,35);
   context.game={units:[...allies,e],defeated:[],elapsed:0,money:0,ended:false,spawnCd:0,orangeCd:0,yellowCd:0,greenCd:0};
   let engaged=false;
   while(context.game.elapsed<120&&allies.some(a=>a.hp>0)&&e.hp>0){
    context.update(dt);if(e.hp<es.hp)engaged=true;
    if(engaged&&e.hp>0){combatSeconds+=dt;if(e.slowUntil>context.game.elapsed)slowSeconds+=dt;}
   }
   if(e.hp<=0)wins++;else if(allies.some(a=>a.hp>0))draws++;
   totalTime+=context.game.elapsed;damage+=es.hp-e.hp;
  }
  rows.push({enemy,name:context.names[enemy],magnificationPercent:mag,allies:count,trials,winPercent:wins,timeoutPercent:draws,meanSeconds:+(totalTime/trials).toFixed(2),meanDamagePercent:+(damage/(trials*context.data.units[enemy].hp*mag/100)*100).toFixed(1),slowUptimePercent:combatSeconds?+(slowSeconds/combatSeconds*100).toFixed(1):0});
 }
}
const result={level:30,form:3,plus:0,stats,dt,limitSeconds:120,trialsPerScenario:trials,scenario:'1/3/4 Waffle Cream versus one black enemy; no walls, redeployment, items or stage waves. Magnification uses 100% and the highest explicitly registered spawn value, without crown multipliers. Slow uptime starts after first damaging hit; it is not freeze uptime.',rows};
fs.writeFileSync(path.join(root,'docs/simulations/waffle-black-enemies-2026-10-08.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
