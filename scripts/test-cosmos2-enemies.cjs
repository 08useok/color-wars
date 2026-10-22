// 우주편 2장 신규 적 4종 등록 시험: cosmos2-enemies.js를 엔진에 불러 능력치·이름·도감 문구·모션 항목을 확인하고, 각 적을 실제 전투에 내보내 오류 없이 도는지 본다.
const fs=require('fs'),assert=require('assert/strict'),path=require('path');
const root=path.resolve(__dirname,'..');
const make=require('./full-harness.cjs');
const add=fs.readFileSync(path.join(root,'cosmos2-enemies.js'),'utf8');
const e=make({extraSetup:add+`;globalThis.__c2={UNIT_NAMES,ENEMY_TEXT,ENEMY_ORDER,ATL:NEW_ATLASES,unitStats,data};`});
const t=globalThis.__c2;delete globalThis.__c2;
const ids=['ultrabaabaa','kidtappa','ribbo','kamisamaserious'];
const exp={ultrabaabaa:{hp:500,barrier:266000,range:3.74},kidtappa:{hp:40000,barrier:15000,speed:26.83},ribbo:{hp:700,barrier:65000,blowChance:1},kamisamaserious:{hp:1499999,atk:67997,knockbacks:5}};
for(const id of ids){
 const u=t.data.units[id];assert(u,id+' 능력치');
 for(const [k,v] of Object.entries(exp[id]))assert.equal(u[k],v,`${id}.${k}`);
 assert(t.UNIT_NAMES[id]&&t.ENEMY_TEXT[id]&&t.ENEMY_ORDER.includes(id),id+' 이름·문구·순서');
 const s=e.unitStats(id);assert(s.hp>0&&s.atk>0,id+' unitStats');
 const a=t.ATL[id];assert(a&&a.walk.length&&a.attack.length&&a.hurt.length,id+' 모션');
 // 실제 전투: 적을 내고 레드와 같이 10초 돌려 오류가 없는지
 e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=0;g.spawnRules=[];
 e.addUnit(id);const f=g.units.find(x=>!x.ally&&x.type===id);assert(f,id+' 출격');
 for(let i=0;i<300;i++)e.update(1/30);
}
console.log('PASS: 신규 적 4종 능력치·이름·문구·모션 항목, 전투 10초 오류 없음');
process.exit(0);
