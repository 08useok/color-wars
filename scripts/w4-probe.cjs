// 미래편 난이도 확인: 기준 덱(레드·옐로우·오렌지) 대 몇몇 스테이지 시간. 사용: node scripts/w4-probe.cjs
const path=require('path');const mk=require('./full-harness.cjs');
const HUMAN=`const __ad2=autoDeploy;autoDeploy=function(){if(policy!=='human')return __ad2.apply(this,arguments);
 const foes=game.units.filter(v=>!v.ally&&v.hp>0),mine=game.units.filter(v=>v.ally&&v.hp>0);
 const front=foes.length?Math.max(...foes.map(v=>v.x)):0,danger=foes.length>0&&(data.bases.ally.frontX-front<30||data.bases.ally.hp<data.bases.ally.max*.8);
 const list=deck.filter(t=>allyUnlocked(t)&&allyStageAllowed(t)).sort((a,b)=>danger?unitCost(a)-unitCost(b):unitCost(b)-unitCost(a));
 for(const t of list){if(unitCooldown(t)>0)continue;if(game.money>=unitCost(t))addUnit(t)}
 const l=data.income[game.level];if(!danger&&mine.length>=3&&l.cost!==null&&game.money>=l.cost){game.money-=l.cost;game.level++}
};globalThis.__w2={cleared,training,ALLIES,gradeOf,UNIT_NAMES,ROLES,UNLOCK_AT,FUTURE_START,FUTURE_END,FUTURE2_START,FUTURE2_END,FUTURE3_START,FUTURE3_END,COSMOS_START,COSMOS_END,STAGES};`;
const e=mk({fresh:true,extraSetup:HUMAN});const B=globalThis.__w2;
const upto=+(process.env.UPTO||506);for(let i=0;i<=upto;i++)B.cleared.push(i);
for(const t of B.ALLIES)B.training.levels[t]=20;
const ref=(process.env.REF||'red,yellow,orange').split(',');
const idx=(process.env.ST||'159,206,353,400,459,506').split(',').map(Number);
for(const i of idx){const r=e.simulate(i,1,ref,1,600,'human');console.log(i,B.STAGES[i].name,r.win?r.seconds+'s':'LOSS',B.STAGES[i].hp);}
process.exit(0);
