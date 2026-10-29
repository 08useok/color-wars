// 레전드 1~39장의 '성 체력 N% 이후 첫 등장 지연'이 원작(battlecats-db, reference-sheets/legend-db)과 같은지 확인한다.
// 사용: node scripts/test-legend-first-delay.cjs  (빠진 것이 있으면 game.js의 LEGEND_FIRST_DELAY에 넣을 항목을 출력하고 실패)
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');process.chdir(root);
const DB=JSON.parse(fs.readFileSync('reference-sheets/legend-db/legend-db.json','utf8'));
const auto=JSON.parse(fs.readFileSync('reference-sheets/legend-db/enemy-map-auto.json','utf8'));
const MAP={};for(const o of auto)if(o.game)MAP[o.db]=o.game;
eval(fs.readFileSync('scripts/compare-legend-db.cjs','utf8').match(/Object\.assign\(MAP,[^;]*;/)[0]);// 같은 적 대응표를 쓴다
const e=require('./full-harness.cjs')({extraSetup:`globalThis.__l={LS:LEGEND_SUBS,legendIdx,SP:STAGE_SPAWNS,table:LEGEND_FIRST_DELAY,bases:data.bases,setStage:i=>selectedStage=i};`});
const L=globalThis.__l;delete globalThis.__l;
const pct=s=>parseInt(String(s).replace(/[^\d]/g,''),10),r2=v=>Math.round(v*100)/100;
const missing={};let checked=0,big=0;let k=0;
for(let n=0;n<L.LS.length;n++)for(let m=1;m<=L.LS[n].len;m++,k++){
 if(n>=39)continue;// 40장 이후는 처음부터 firstDelay를 넣어 만들었다
 const d=DB.find(s=>s.sub===n&&s.stage===m),rules=L.SP[L.legendIdx(k)]||[],used=new Set();
 for(const r of d.enemies){
  const type=MAP[r[2].split('#')[1]],link=pct(r[5]),first=Number(r[6]);if(!type||link===100)continue;
  const count=(r[4]==='無制限'||r[4]==='')?undefined:Number(r[4]),boss=r[0]==='BOSS';
  let dl=null;if(r[7]&&r[7]!=='-'){const x=r[7].split('～').map(Number);dl=[r2(x[0]/30),r2((x[1]??x[0])/30)]}
  const i=rules.findIndex((g,j)=>!used.has(j)&&g.type===type&&g.at.hp===link&&g.count===count&&!!g.boss===boss&&(dl?g.delay&&r2(g.delay[0])===dl[0]&&r2(g.delay[1])===dl[1]:!g.delay));
  assert(i>=0,`${n+1}-${m}: 원작 규칙 ${type} 성 ${link}%를 게임에서 못 찾음`);used.add(i);
  const want=first?r2(first/30):0;checked++;if(want>=10)big++;
  if(r2(rules[i].firstDelay||0)!==want)(missing[k]??=[]).push([i,want]);
 }
}
if(Object.keys(missing).length){console.log('빠진 지연:',JSON.stringify(missing));process.exit(1)}
// 표의 모든 항목이 실제로 쓰였는지(규칙 번호가 어긋나면 조용히 무시되므로)
let applied=0;for(const [kk,list] of Object.entries(L.table))for(const [i,s] of list){const r=L.SP[L.legendIdx(+kk)][i];assert(r&&r.at.hp!==undefined,'표 항목이 성 체력 규칙이 아님 '+kk+':'+i);assert.equal(r.firstDelay,s);applied++}
assert.equal(applied,392);
// 실제 전투: 33-5 우주 개발국 — 성 체력 연동 적이 조건이 되자마자 나오지 않고, 원작 지연(최대 133.33초)이 지난 뒤에 나온다.
{
 let k335=-1,c=0;for(let n=0;n<L.LS.length;n++)for(let m=1;m<=L.LS[n].len;m++,c++)if(n===32&&m===5)k335=c;
 const idx=L.legendIdx(k335),r=L.SP[idx].find(x=>x.firstDelay>=100);assert(r,'33-5에 100초 넘는 지연');
 L.setStage(idx);e.reset();const g=e.getGame();g.running=true;g.tutorial=6;
 const rule=()=>g.spawnRules.find(x=>x.type===r.type&&x.at.hp===r.at.hp&&x.firstDelay===r.firstDelay);
 L.bases.enemy.hp=L.bases.enemy.max*(r.at.hp-1)/100;
 const step=s=>{for(let t=0;t<s*30;t++){e.update(1/30);g.units=g.units.filter(u=>!u.ally&&false);L.bases.ally.hp=L.bases.ally.max}};// 적을 지워 출현 상한에 막히지 않게
 step(1);assert(rule().triggered,'성 체력 조건 충족');assert.equal(rule().spawned,0);
 step(r.firstDelay-3);assert.equal(rule().spawned,0,'지연 전에는 안 나옴');
 step(4);assert(rule().spawned>=1,'지연 뒤에는 나옴');
}
console.log(`PASS: 레전드 1~39장 성 체력 연동 규칙 ${checked}개 모두 원작 첫 등장 지연과 같음(표 ${applied}개 적용, 10초 이상 ${big}개).`);
process.exit(0);
