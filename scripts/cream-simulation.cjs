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
for(const name of ['cream','dandelion','darkdog','gorydark','shadowboxer','blackotta','assassinbear']) {
 const line=source.split('\n').find(l=>l.startsWith(`data.units.${name}=`));
 if(!line)throw Error(name); vm.runInContext(line,context);
}
vm.runInContext(section('const ATK_SLOPE=', '// Extra 2진 effects'),context);
vm.runInContext(section('const evoMez=', 'function allyUnlocked('),context);
for(const name of ['overMult','traitsOf','hasTrait','traitMult','statusLands','baseDamage','target','deadZone','targetValid','startHitback','tickHitback','damage','resolveAttack','fire','attack','canEngage','lockEngage','update'])vm.runInContext(fn(name),context);
const variants=[['크림 2진','cream',false],['와플 크림 3진','cream',true],['민들레 2진','dandelion',false]];
const enemies=[['darkdog',4],['gorydark',4],['shadowboxer',4],['blackotta',1],['assassinbear',10]];
const stats={},rows=[];
for(const [label,type,trueForm] of variants) {
 const st=context.unitStats(type,30,2);
 if(trueForm){st.trueForm=true;st.hp=Math.round(st.hp*1.2);st.atk=Math.round(st.atk*1.2);}
 stats[label]=st;
 for(const [enemy,mag] of enemies) {
  let wins=0,draws=0,totalTime=0,totalDamage=0,slowSeconds=0,aliveSeconds=0;
  for(let trial=0;trial<200;trial++) {
   seed=trial+1;
   const ed=context.data.units[enemy],es={...ed,hp:ed.hp*mag,atk:ed.atk*mag};
   const unit=(t,d,ally,x)=>({type:t,stats:{...d},ally,x,hp:d.hp,max:d.hp,kb:0,kbTime:0,hurtTime:0,attackTime:0,atkCd:0,animTime:0,flashTime:0,el:element()});
   const a=unit(type,st,true,65),e=unit(enemy,es,false,35);
   context.game={units:[a,e],defeated:[],elapsed:0,money:0,ended:false,spawnCd:0,orangeCd:0,yellowCd:0,greenCd:0};
   const dt=1/30;
   while(context.game.elapsed<120&&a.hp>0&&e.hp>0) {
    if(e.slowUntil>context.game.elapsed)slowSeconds+=dt;
    aliveSeconds+=dt;context.update(dt);
   }
   if(e.hp<=0)wins++;else if(a.hp>0)draws++;
   totalTime+=context.game.elapsed;totalDamage+=es.hp-e.hp;
  }
  rows.push({ally:label,enemy,magnification:mag,trials:200,winPercent:wins/2,timeoutPercent:draws/2,meanSeconds:+(totalTime/200).toFixed(2),meanDamage:+(totalDamage/200).toFixed(1),slowUptimePercent:+(100*slowSeconds/aliveSeconds).toFixed(1)});
 }
}
const result={level:30,dt:1/30,limitSeconds:120,scenario:'One ally versus one enemy, no deployment, support, items or stage waves',stats,rows};
fs.mkdirSync(path.join(root,'docs','simulations'),{recursive:true});
fs.writeFileSync(path.join(root,'docs','simulations','cream-2026-10-08.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
