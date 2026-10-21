// 2장 덱 구성 비교(시험 도구): 기본 3명(레드·옐로우·오렌지) + 후보 7명 여러 조합과 '해금 순서 앞 10명' 덱의 2장 6곳 평균 클리어 시간. 사용: node scripts/w2-deck-compare.cjs
const mk=require("./full-harness.cjs");
const HUMAN=`const __ad2=autoDeploy;autoDeploy=function(){if(policy!=='human')return __ad2.apply(this,arguments);
 const foes=game.units.filter(v=>!v.ally&&v.hp>0),mine=game.units.filter(v=>v.ally&&v.hp>0);
 const front=foes.length?Math.max(...foes.map(v=>v.x)):0,danger=foes.length>0&&(data.bases.ally.frontX-front<30||data.bases.ally.hp<data.bases.ally.max*.8);
 const list=deck.filter(t=>allyUnlocked(t)&&allyStageAllowed(t)).sort((a,b)=>danger?unitCost(a)-unitCost(b):unitCost(b)-unitCost(a));
 for(const t of list){if(unitCooldown(t)>0)continue;if(game.money>=unitCost(t))addUnit(t)}
 const l=data.income[game.level];if(!danger&&mine.length>=3&&l.cost!==null&&game.money>=l.cost){game.money-=l.cost;game.level++}
};globalThis.__w2={cleared,training,ALLIES};`;
const e=mk({fresh:true,extraSetup:HUMAN});const B=globalThis.__w2;
for(let i=0;i<=94;i++)B.cleared.push(i);for(const t of B.ALLIES)B.training.levels[t]=10;
const stages=[76,91,94,95,70,82];
const base=['red','yellow','orange'];
const decks={
 'A 샤르트뢰즈·아이보리·골드·라즈베리·살몬·크리스탈·애저':[...base,'chartreuse','ivory','gold','raspberry','salmon','crystal','azure'],
 'B 샤르트뢰즈·아이보리·골드·라즈베리·살몬·애저·블루':[...base,'chartreuse','ivory','gold','raspberry','salmon','azure','blue'],
 'C 샤르트뢰즈·아이보리·라즈베리·살몬·애저·블루·민트':[...base,'chartreuse','ivory','raspberry','salmon','azure','blue','mint'],
 'D 샤르트뢰즈·아이보리·골드·살몬·애저·블루·시안':[...base,'chartreuse','ivory','gold','salmon','azure','blue','cyan']};
for(const [n,d] of Object.entries(decks)){const per=stages.map(i=>{let s=0,w=0;for(let k=1;k<=4;k++){const r=e.simulate(i,1,d,k,600,'human');s+=r.win?r.seconds:600;w+=r.win?1:0}return Math.round(s/4)+(w<4?'('+w+'/4승)':'')});console.log(n.slice(0,30).padEnd(32),stages.map((i,k)=>i+':'+per[k]).join(' '),'| 평균',Math.round(per.map(x=>parseInt(x)).reduce((a,b)=>a+b,0)/per.length))}
process.exit(0);
