// 7.1.1 사이클론 클리어 조건: 보스를 쓰러뜨려야 성이 무너진다(보스 전에는 성 체력이 1에서 멈춘다). 6개 사이클론 전부 + 일반 스테이지는 그대로.
const assert=require('assert/strict');
const make=require('./full-harness.cjs');
const e=make({extraSetup:`globalThis.__c={EVENTS:CYCLONE_EVENTS,STAGES,base:()=>data.bases.enemy,sel:i=>{selectedStage=i},deck:d=>{deck=d},setCleared:l=>{cleared.length=0;cleared.push(...l)}};`});
const c=globalThis.__c;delete globalThis.__c;
assert.equal(c.EVENTS.length,6);
const strong=['prism','amber','night','sapphire','aquamarine','rainbow','emerald','spring','red','yellow'];
e.setProfile({level:30});c.setCleared(c.STAGES.map((_,i)=>i));
const rows=[];
for(const ev of c.EVENTS){
 assert(c.STAGES[ev.index].desc.includes('보스를 쓰러뜨려야 클리어'),ev.stage+' 설명');
 // 1) 규칙: 보스가 살아 있거나 아직 안 나온 동안 성은 1에서 멈추고, 보스를 쓰러뜨리면 성이 무너질 수 있다
 c.sel(ev.index);c.deck(['red']);e.reset();let g=e.getGame();g.running=true;g.paused=false;g.tutorial=6;g.money=1e9;g.spawnRules=[];
 c.base().hp=0;assert.equal(c.base().hp,1,ev.stage+' 보스 전에는 성 체력 1에서 멈춤');assert.equal(g.ended,false);
 e.addUnit('red');e.addUnit(ev.boss,true,1);const boss=g.units.find(u=>!u.ally&&u.type===ev.boss);assert(boss,ev.stage+' 보스 등장');
 c.base().hp=0;assert.equal(c.base().hp,1,ev.stage+' 보스가 살아 있으면 성 체력 1');
 const hero=g.units.find(u=>u.ally);boss.hp=1;e.damage(boss,1e12,hero);assert(boss.hp<=0&&g.cyBossDown,ev.stage+' 보스 처치 기록');
 c.base().hp=0;assert.equal(c.base().hp,0,ev.stage+' 보스를 쓰러뜨린 뒤에는 성이 무너질 수 있음');
 // 2) 실제 전투: 강한 덱으로 끝까지 해서 이긴 경우 보스가 쓰러져 있다
 c.sel(ev.index);c.deck(strong);let st=7;Math.random=()=>{st=(Math.imul(st,1664525)+1013904223)>>>0;return st/4294967296};
 e.reset();g=e.getGame();g.running=true;g.tutorial=6;g.auto=true;let spawned=false;
 for(let f=0;f<30*420&&!g.ended;f++){e.update(1/30);if(g.units.some(u=>!u.ally&&u.type===ev.boss))spawned=true}
 assert(g.won,ev.stage+' 승리해야 함(안 이기면 잠김)');assert(spawned&&g.cyBossDown,ev.stage+' 이겼다면 보스를 쓰러뜨렸어야 함');
 rows.push(ev.stage+' '+Math.round(g.elapsed)+'초');
}
// 3) 사이클론이 아닌 스테이지는 성이 그대로 무너진다
c.sel(0);c.deck(['red']);e.reset();e.getGame().running=true;c.base().hp=0;assert.equal(c.base().hp,0);
console.log('PASS: 사이클론 6종 모두 보스를 쓰러뜨려야 성이 무너짐, 보스 전 성 체력 1 고정, 강한 덱 승리 → '+rows.join(' · ')+', 일반 스테이지는 그대로');process.exit(0);
