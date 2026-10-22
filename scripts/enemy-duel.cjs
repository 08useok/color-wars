// 적 1대1 순위: 게임의 모든 적을 서로 1대1로 붙여(양쪽 자리를 바꿔 두 번) 이긴 횟수로 순위를 매긴다.
// 사용: node scripts/enemy-duel.cjs [A B]   (A B를 주면 그 한 쌍만 출력)  →  docs/simulations/enemy-duel-2026-10-22.json
// 메탈 특성 적은 뺀다(한 방에 1씩만 닳아 1대1이 성립하지 않음).
// 한 쪽은 적 자리, 다른 쪽은 아군 자리(같은 적 능력치를 아군 쪽에 세운다). 둘 다 능력치는 기본(배율 1·보물·레벨 없음), 서로 40% 떨어져 마주 보고 걸어온다.
const fs=require('fs'),path=require('path');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const e=mk({extraSetup:`alienMagnification=()=>1;globalThis.__d={UNIT_NAMES,ALLIES,data,units:()=>game.units,setStage:i=>selectedStage=i,drawUnit:u=>drawUnit(u)};`});
const D=globalThis.__d;delete globalThis.__d;
const g0=e.getGame();
const enemies=Object.keys(D.UNIT_NAMES).filter(t=>!D.ALLIES.includes(t)&&e.units[t]&&t!=='dogebase'&&e.unitStats(t).trait!=='metal');
function duel(A,B,maxSec=90){// A = 적 자리, B = 아군 자리
 e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=0;g.spawnRules=[];
 e.addUnit(A);
 const a=g.units.find(u=>!u.ally&&u.type===A);
 const sb=e.unitStats(B);
 const b={type:B,ally:true,boss:false,stats:sb,hp:sb.hp,max:sb.hp,x:0,emerging:true,atkCd:0,kb:0,animTime:0,attackTime:0,hurtTime:0,kbTime:0,flashTime:0};
 g.units.push(b);D.drawUnit(b);
 if(!a)throw Error('no enemy '+A);
 a.x=30;b.x=70;a.emerging=false;b.emerging=false;
 const aHp0=a.max,bHp0=b.max;let f=0;
 while(f<30*maxSec&&a.hp>0&&b.hp>0){e.update(1/30);f++;}
 const aw=a.hp>0&&!(b.hp>0),bw=b.hp>0&&!(a.hp>0);
 return {aWin:aw,bWin:bw,aHp:Math.max(0,a.hp)/aHp0,bHp:Math.max(0,b.hp)/bHp0,sec:+(f/30).toFixed(1)};
}
if(process.argv[2]){const [A,B]=process.argv.slice(2);console.log(JSON.stringify(duel(A,B)),JSON.stringify(duel(B,A)));process.exit(0)}
const n=enemies.length,score={},res={};
for(const t of enemies){score[t]={wins:0,losses:0,draws:0,hpSum:0,games:0}}
for(let i=0;i<n;i++)for(let j=0;j<n;j++){if(i===j)continue;const A=enemies[i],B=enemies[j];
 const r=duel(A,B);// A(적 자리) vs B(아군 자리)
 const sa=score[A],sb=score[B];sa.games++;sb.games++;
 if(r.aWin){sa.wins++;sb.losses++}else if(r.bWin){sb.wins++;sa.losses++}else{sa.draws++;sb.draws++}
 sa.hpSum+=r.aHp-r.bHp;sb.hpSum+=r.bHp-r.aHp;
 (res[A]=res[A]||{})[B]=r.aWin?1:r.bWin?-1:0}
const rows=enemies.map(t=>({id:t,name:D.UNIT_NAMES[t],...score[t],points:score[t].wins+score[t].draws/2,hpAvg:+(score[t].hpSum/score[t].games).toFixed(3)})).sort((x,y)=>y.points-x.points||y.hpAvg-x.hpAvg);
fs.writeFileSync(path.join(root,'docs/simulations/enemy-duel-2026-10-22.json'),JSON.stringify({n,rows},null,1));
console.log('상위 10',rows.slice(0,10).map(r=>r.name+' '+r.points).join(', '));console.log('하위 10',rows.slice(-10).map(r=>r.name+' '+r.points).join(', '));
process.exit(0);
