// 아군 vs 적 연승 도전: 아군 한 명이 1대1 순위가 꼴찌인 적부터 1등 적까지 차례로 싸운다. 이기면 다음 적이 나오고, 지거나 90초 안에 못 이기면 거기서 끝.
// 조건: 아군 Lv.30 2진(3진 없음), 보물·콤보·스테이지 보정 없음, 적은 기본 능력치(에일 배율 ×7·×16도 1로 고정). 서로 40% 떨어져 마주 보고 걸어온다.
// 사용: HEAL=1 node scripts/ally-gauntlet.cjs   (HEAL=1: 매 판 체력 회복, 기본은 체력을 이어간다)   → docs/simulations/ally-gauntlet-2026-10-22[-heal].json
const fs=require('fs'),path=require('path');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const TRUE=process.env.TRUE==='1',SKIP=process.env.SKIP==='1',HEAL=process.env.HEAL==='1',EVERY=+(process.env.EVERY||0);// EVERY=50: 50승마다 체력 완전 회복
const e=mk({extraSetup:`alienMagnification=()=>1;trueFormOpen=()=>true;globalThis.__d={noEvolve:t=>!!data.units[t].noEvolve,ready:t=>trueFormAssetReady(t),UNIT_NAMES,ALLIES,drawUnit:u=>drawUnit(u)};`});
const D=globalThis.__d;delete globalThis.__d;
e.setProfile({level:30,trueForms:TRUE?D.ALLIES.filter(t=>D.ready(t)&&!D.noEvolve(t)):undefined});e.setCleared([]);// TRUE=1: 3진 그림이 있는 11명은 3진으로
const duel=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/enemy-duel-2026-10-22.json'),'utf8')).rows;
const order=[...duel].reverse();// 꼴찌 → 1등
function fight(ally,foe,carry,maxSec=90){
 e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=0;g.spawnRules=[];
 e.addUnit(foe);const a=g.units.find(u=>!u.ally&&u.type===foe);
 const sb=e.unitStats(ally);
 const b={type:ally,ally:true,boss:false,stats:sb,hp:carry==null?sb.hp:carry,max:sb.hp,x:70,emerging:false,atkCd:0,kb:0,animTime:0,attackTime:0,hurtTime:0,kbTime:0,flashTime:0};
 g.units.push(b);D.drawUnit(b);a.x=30;a.emerging=false;
 let f=0;while(f<30*maxSec&&a.hp>0&&b.hp>0){e.update(1/30);f++}
 return {win:a.hp<=0&&b.hp>0,hp:Math.max(0,b.hp),maxHp:b.max,sec:f/30};
}
const out=[];
for(const ally of D.ALLIES){
 let carry=null,wins=0,stop=null,total=0;const skipped=[];
 for(const r of order){const res=fight(ally,r.id,HEAL?null:carry);total+=res.sec;
  if(SKIP&&!res.win&&res.hp>0){skipped.push(r.name);carry=EVERY&&(wins+skipped.length)%EVERY===0?null:res.hp;continue}// 90초 안에 서로 못 죽이는 적은 건너뜀(아군이 죽을 때만 끝)
  if(!res.win){stop={id:r.id,name:r.name,rank:duel.indexOf(r)+1,hpLeft:res.hp/res.maxHp};break}
  wins++;carry=EVERY&&(wins+skipped.length)%EVERY===0?null:res.hp}
 out.push({skipped:skipped.length,skippedNames:skipped,id:ally,name:D.UNIT_NAMES[ally],grade:e.gradeOf(ally),wins,cleared:wins===order.length,stop,hpLeft:carry==null?1:carry/e.unitStats(ally).hp,sec:+total.toFixed(0)});
}
out.sort((x,y)=>y.wins-x.wins||y.hpLeft-x.hpLeft);
fs.writeFileSync(path.join(root,'docs/simulations/ally-gauntlet-2026-10-22'+(HEAL?'-heal':EVERY?'-every'+EVERY:'')+(SKIP?'-skip':'')+(TRUE?'-true':'')+'.json'),JSON.stringify({heal:HEAL,enemies:order.length,order:order.map(r=>r.id),out},null,1));
console.log((HEAL?'[매판 회복] ':EVERY?'[50승마다 회복] ':'[체력 이어서] ')+'전부 이긴 아군',out.filter(o=>o.cleared).length,'/',out.length);
out.slice(0,200).forEach((o,i)=>console.log(i+1,o.name,o.grade,o.wins+'연승',(o.stop?'→ '+o.stop.name+'('+o.stop.rank+'위)에게 패':'전승')+(o.skipped?' (못 잡아 건너뜀 '+o.skipped+')':'')));
process.exit(0);
