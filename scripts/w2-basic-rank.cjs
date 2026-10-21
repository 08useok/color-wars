// 세계편 2장에서 기본 등급 아군 18명 중 어느 아군이 도움이 되는지: 약한 기준 덱 3명(레드·옐로우·오렌지)에 후보 1명을 더해 2장 어려운 스테이지를 깨는 시간을 잰다.
// 전원 Lv.10, 1장 보물 적용(1~94번 클리어 상태), 출격은 사람 방식. 사용: SEEDS=4 node scripts/w2-basic-rank.cjs
const fs=require('fs'),path=require('path');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const SEEDS=+(process.env.SEEDS||4);
const HUMAN=`const __ad2=autoDeploy;autoDeploy=function(){if(policy!=='human')return __ad2.apply(this,arguments);
 const foes=game.units.filter(v=>!v.ally&&v.hp>0),mine=game.units.filter(v=>v.ally&&v.hp>0);
 const front=foes.length?Math.max(...foes.map(v=>v.x)):0,danger=foes.length>0&&(data.bases.ally.frontX-front<30||data.bases.ally.hp<data.bases.ally.max*.8);
 const list=deck.filter(t=>allyUnlocked(t)&&allyStageAllowed(t)).sort((a,b)=>danger?unitCost(a)-unitCost(b):unitCost(b)-unitCost(a));
 for(const t of list){if(unitCooldown(t)>0)continue;if(game.money>=unitCost(t))addUnit(t)}
 const l=data.income[game.level];if(!danger&&mine.length>=3&&l.cost!==null&&game.money>=l.cost){game.money-=l.cost;game.level++}
};globalThis.__w2={cleared,training,ALLIES,gradeOf,UNIT_NAMES,ROLES,UNLOCK_AT};`;
const e=mk({fresh:true,extraSetup:HUMAN});const B=globalThis.__w2;
for(let i=0;i<=94;i++)B.cleared.push(i);
for(const t of B.ALLIES)B.training.levels[t]=10;
const basics=B.ALLIES.filter(t=>B.gradeOf(t)==='basic');
const ref=['red','yellow','orange'];
const stages=[[76,'덴마크'],[91,'라스베이거스'],[94,'하와이'],[95,'달']];
const secOf=(deck,i,seed)=>{const r=e.simulate(i,1,deck,seed,600,'human');return r.win?r.seconds:600};
const refS={};for(const [i] of stages){let s=0;for(let k=1;k<=SEEDS;k++)s+=secOf(ref,i,k);refS[i]=s/SEEDS}
const out=[];
for(const c of basics){if(ref.includes(c))continue;let gain=0;const per={};for(const [i] of stages){let s=0;for(let k=1;k<=SEEDS;k++)s+=secOf([...ref,c],i,k);const m=s/SEEDS;per[i]=Math.round(m);gain+=refS[i]-m}out.push({id:c,name:B.UNIT_NAMES[c],role:B.ROLES[c]||'',gain:+(gain/stages.length).toFixed(1),per})}
out.sort((a,b)=>b.gain-a.gain);
console.log('기준 덱(레드·옐로우·오렌지) 단독 시간',JSON.stringify(Object.fromEntries(stages.map(([i,n])=>[n,Math.round(refS[i])]))));
for(const o of out)console.log(o.name.padEnd(8),(o.gain>=0?'+':'')+o.gain+'초','|',stages.map(([i,n])=>n+' '+o.per[i]).join(', '),'|',o.role);
fs.writeFileSync(path.join(root,'docs/simulations/w2-basic-rank-2026-10-21.json'),JSON.stringify({seeds:SEEDS,ref,stages,refS,out},null,1));
process.exit(0);
