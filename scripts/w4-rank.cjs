// 미래편에서 어느 아군이 도움이 되는지: 기준 덱 3명(레드·옐로우·오렌지)이 느리거나 지는 미래편 스테이지에서 후보 1명을 더해 시간을 잰다.
// 전원 Lv.20, 세계편 전체+미래편 해당 장 앞까지 클리어 상태(보물 반영), 출격은 사람 방식. 사용: SEEDS=3 node scripts/w4-rank.cjs
const fs=require('fs'),path=require('path');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const SEEDS=+(process.env.SEEDS||3);
const HUMAN=`const __ad2=autoDeploy;autoDeploy=function(){if(policy!=='human')return __ad2.apply(this,arguments);
 const foes=game.units.filter(v=>!v.ally&&v.hp>0),mine=game.units.filter(v=>v.ally&&v.hp>0);
 const front=foes.length?Math.max(...foes.map(v=>v.x)):0,danger=foes.length>0&&(data.bases.ally.frontX-front<30||data.bases.ally.hp<data.bases.ally.max*.8);
 const list=deck.filter(t=>allyUnlocked(t)&&allyStageAllowed(t)).sort((a,b)=>danger?unitCost(a)-unitCost(b):unitCost(b)-unitCost(a));
 for(const t of list){if(unitCooldown(t)>0)continue;if(game.money>=unitCost(t))addUnit(t)}
 const l=data.income[game.level];if(!danger&&mine.length>=3&&l.cost!==null&&game.money>=l.cost){game.money-=l.cost;game.level++}
};globalThis.__w2={cleared,training,ALLIES,gradeOf,UNIT_NAMES,ROLES,UNLOCK_AT,STAGES};`;
const e=mk({fresh:true,extraSetup:HUMAN});const B=globalThis.__w2;
for(let i=0;i<=506;i++)B.cleared.push(i);
for(const t of B.ALLIES)B.training.levels[t]=20;
const ref=['red','yellow','orange'];
const stages=(process.env.ST||'505,503,498,495,491,399').split(',').map(Number).map(i=>[i,B.STAGES[i].name+'('+(i>=459?'미래3':i>=353?'미래2':'미래1')+')']);
const grades=(process.env.GRADES||'basic,rare,ex').split(',');
const cands=B.ALLIES.filter(t=>grades.includes(B.gradeOf(t))&&t!=='selenite'&&!ref.includes(t));
const secOf=(deck,i,seed)=>{const r=e.simulate(i,1,deck,seed,600,'human');return r.win?r.seconds:600};
const avg=(deck,i)=>{let s=0;for(let k=1;k<=SEEDS;k++)s+=secOf(deck,i,k);return s/SEEDS};
const refS={};for(const [i] of stages)refS[i]=avg(ref,i);
const out=[];
for(const c of cands){let gain=0;const per={};for(const [i] of stages){const m=avg([...ref,c],i);per[i]=Math.round(m);gain+=refS[i]-m}out.push({id:c,name:B.UNIT_NAMES[c],grade:B.gradeOf(c),role:B.ROLES[c]||'',gain:+(gain/stages.length).toFixed(1),per})}
out.sort((a,b)=>b.gain-a.gain);
console.log('기준 덱 단독',JSON.stringify(Object.fromEntries(stages.map(([i,n])=>[n,Math.round(refS[i])]))));
for(const o of out)console.log(o.name.padEnd(8),o.grade.padEnd(6),(o.gain>=0?'+':'')+o.gain+'초','|',stages.map(([i])=>o.per[i]).join(' '),'|',o.role);
fs.writeFileSync(path.join(root,'docs/simulations/w4-rank-'+grades.join('-')+'-2026-10-21.json'),JSON.stringify({seeds:SEEDS,ref,stages,refS,out},null,1));
process.exit(0);
