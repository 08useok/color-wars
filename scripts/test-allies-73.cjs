// 7.3 신캐 썬플라워·펀·제이드(allies-73.js)와 바이올렛·오키드 3진(third-forms-73.js) 능력 시험.
const assert=require('assert/strict');
const make=require('./full-harness.cjs');
const e=make({extraSetup:`globalThis.__c={ALLIES,gradeOf,UBER_SERIES,GACHA_UBER,UNIT_NAMES,TRUE_NAME,data,unitStats,traitsOf,trueFormAssetReady,base:()=>data.bases.enemy};`});
const c=globalThis.__c;delete globalThis.__c;
e.setProfile({level:30});e.setCleared([]);
const rnd=seed=>{let st=seed;Math.random=()=>{st=(Math.imul(st,1664525)+1013904223)>>>0;return st/4294967296}};
const pick=trait=>Object.keys(c.data.units).find(id=>!c.ALLIES.includes(id)&&c.traitsOf(c.data.units[id]).includes(trait)&&(trait==='floating'?!c.traitsOf(c.data.units[id]).includes('alien'):true));
const plain=Object.keys(c.data.units).find(id=>!c.ALLIES.includes(id)&&c.traitsOf(c.data.units[id]).length===0);
// 1) 등록
for(const [id,series] of [['sunflower','가든즈'],['fern','가든즈'],['jade','워터즈']]){
 assert.equal(c.gradeOf(id),'uber',id);assert.equal(c.UBER_SERIES[id],series,id);assert(c.GACHA_UBER.some(u=>u.id===id),id+' 뽑기 풀');
 const s1=c.unitStats(id,10,1),s2=c.unitStats(id,20,2);assert.equal(s1.cost,s2.cost,id+' 1·2진 비용 동일');assert(c.data.units[id].cost>=3000&&c.data.units[id].cost<=5000,id+' 울슈레 가격대');
}
// 2) 펀: 이동 속도는 앰버에 가깝다
const fern=c.unitStats('fern',30,2),amber=c.unitStats('amber',30,2);
assert.equal(fern.speed,28);assert(fern.speed>=.9*amber.speed&&fern.speed<=amber.speed,'펀 이속은 앰버(30)에 거의 가까움');
// 3) 전투 시험 도구
function arena(unit,foes,frames,mod){
 rnd(9);e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=1e9;g.spawnRules=[];
 e.addUnit(unit);const u=g.units.find(x=>x.ally);u.hp=u.max=1e12;u.x=60;if(mod)mod(u);
 const list=foes.map(([id,dx])=>{e.addUnit(id);const f=g.units.filter(x=>!x.ally).pop();f.emerging=false;f.hp=f.max=1e12;f.stats=f.stats||{};f.stats.atk=0;f.stats.speed=0;f.dx=dx;return f});
 for(let i=0;i<frames;i++){u.x=60;u.hp=u.max=1e12;for(const f of list){f.x=60+f.dx;f.hp=f.max=1e12;f.kbTime=0}e.update(1/30);for(const f of list){f.slowSeen=f.slowSeen||f.slowUntil>g.elapsed;f.dmgSeen=f.dmgSeen||false}}
 return {g,u,list}}
// 3-1) 썬플라워 타격 범위: 사거리 21 안의 적이 인식되면 앞 28·뒤 8까지 맞는다(검은 적·천사만 둔화)
const black=pick('black');assert(black,'검은 적 필요');
const zone=arena('sunflower',[[black,-20],[black,-27],[black,-29.5],[black,7],[black,9.5]],150,u=>{u.stats.slowChance=1});
assert.deepEqual(zone.list.map(f=>!!f.slowSeen),[true,true,false,true,false],'앞 20·27, 뒤 7은 둔화 / 앞 29.5·뒤 9.5는 안 맞음 '+JSON.stringify(zone.list.map(f=>f.dx+':'+!!f.slowSeen)));
const sf=c.unitStats('sunflower',30,2);assert.equal(sf.zoneMax,28);assert.equal(sf.backRange,8);assert.equal(sf.range,21);assert.equal(sf.area,true);
// 속성 제한: 빨간 적·메탈·무속성은 둔화 없음
const red=pick('red'),metal=pick('metal');
const lim=arena('sunflower',[[red,-10],[metal,-12],[plain,-14],[pick('angel'),-16]],150,u=>{u.stats.slowChance=1});
assert.deepEqual(lim.list.map(f=>!!f.slowSeen),[false,false,false,true],'빨강·메탈·무속성 제외, 천사만 둔화');
// 3-2) 펀: 떠 있는 적·에이리언만 약화(75%·4초·절반)
const fl=pick('floating'),al=pick('alien');
const fe=arena('fern',[[fl,-10],[al,-12],[red,-14],[plain,-16]],150,u=>{u.stats.atkDownChance=1});
const down=fe.list.map(f=>f.atkDownUntil>0);
assert.deepEqual(down,[true,true,false,false],'떠 있는 적·에이리언만 약화 '+JSON.stringify(down));assert.equal(fe.list[0].atkDownMult,.5);
// 3-3) 제이드: 빨간·검은 적에게 맷집(받는 피해 ×0.25)
for(const [foe,x] of [[red,.25],[black,.25],[pick('angel'),1],[plain,1]]){rnd(3);e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=1e9;g.spawnRules=[];e.addUnit('jade');e.addUnit(foe);const u=g.units.find(v=>v.ally),f=g.units.find(v=>!v.ally);u.hp=u.max=1e9;const b=u.hp;e.damage(u,1e6,f);assert.equal(+((b-u.hp)/1e6).toFixed(2),x,'제이드 받는 피해 '+foe)}
// 4) 3진: 바이올렛(둔화 65%·3.5초, 메탈 제외 유지) · 오키드(서지 20~56·3초·피해 60%)
e.setCleared(e.stageList.map((_,i)=>i));// 3진은 스테이지를 깬 뒤에 열린다
e.setProfile({level:30,trueForms:[]});const v2=c.unitStats('violet',30,2),o2=c.unitStats('orchid',30,2);
e.setProfile({level:30,trueForms:['violet','orchid']});const v3=c.unitStats('violet',30,2),o3=c.unitStats('orchid',30,2);
assert(c.trueFormAssetReady('violet')&&c.trueFormAssetReady('orchid'));assert.equal(c.TRUE_NAME.violet,'마스터 바이올렛');assert.equal(c.TRUE_NAME.orchid,'아키텍트 오키드');
assert.equal(v2.slowChance,.3);assert.equal(v2.slowDuration,2.5);assert.equal(v3.slowChance,.65);assert.equal(v3.slowDuration,3.5);assert.deepEqual(v3.statusVs,v2.statusVs);assert(!v3.statusVs.includes('metal'));
assert.equal(v3.hp,Math.round(v2.hp*1.2));assert.equal(v3.atk,Math.round(v2.atk*1.2));
assert.deepEqual(o2.surge,{start:22,end:50,dur:2.4,tick:.6,mult:.5});assert.deepEqual(o3.surge,{start:20,end:56,dur:2.4,tick:.6,mult:.6});
assert.equal(o3.hp,Math.round(o2.hp*1.2));assert.equal(o3.atk,Math.round(o2.atk*1.2));assert.equal(o3.interval,o2.interval);assert.equal(o3.range,o2.range);
// 바이올렛 3진 실제 둔화: 빨간 적 100% 확률로 맞춰 지속 3.5초, 메탈은 0
e.setProfile({level:30,trueForms:['violet']});
for(const [foe,exp] of [[red,true],[metal,false]]){rnd(5);e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=1e9;g.spawnRules=[];e.addUnit('violet');e.addUnit(foe);const u=g.units.find(x=>x.ally),f=g.units.find(x=>!x.ally);f.hp=f.max=1e12;u.stats.slowChance=1;e.damage(f,1,u);assert.equal(f.slowUntil>g.elapsed,exp,'바이올렛 3진 둔화 '+foe);if(exp){const left=f.slowUntil-g.elapsed;assert(left>=3.5&&left<=3.5*1.3,'지속 3.5초(보물 보정 포함) '+left)}}
console.log('PASS: 썬플라워(타격 앞 28·뒤 8, 검은 적·천사만 둔화) · 펀(이속 28, 떠 있는 적·에이리언만 약화) · 제이드(빨강·검정 맷집 ×0.25) · 바이올렛 3진(둔화 65%·3.5초) · 오키드 3진(서지 20~56·2.4초·60%)');process.exit(0);
