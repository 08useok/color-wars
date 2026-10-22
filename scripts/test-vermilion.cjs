// 7.1 버밀리언(울슈레) 시험: 빨간 적·에이리언 적만 8초 멈추고, 다른 적은 멈추지 않으며, 공격 간격 5.3초·1진/2진 가격 동일
const assert=require('assert/strict');
const make=require('./full-harness.cjs');
const e=make({extraSetup:`globalThis.__v={data,UNIT_NAMES,ROLES,SER:UBER_SERIES,gradeOf,GACHA_UBER,traitsOf,damage,unitStats};`});
const t=globalThis.__v;delete globalThis.__v;
e.setProfile({level:30});
assert.equal(t.UNIT_NAMES.vermilion,'버밀리언');assert.equal(t.gradeOf('vermilion'),'uber');assert.equal(t.SER.vermilion,'인스톨 연합');assert(t.GACHA_UBER.some(u=>u.id==='vermilion'));
const s1=t.unitStats('vermilion',10,1),s2=t.unitStats('vermilion',30,2);
assert.equal(s2.interval,5.3);assert.equal(s2.freezeDuration,8);assert.equal(s2.freezeChance,1);assert.deepEqual(s2.statusVs,['red','alien']);
assert.equal(s1.cost,s2.cost,'1진·2진 가격 동일');
e.setCleared([]);// 보물 없이(보물이 있으면 멈춤 시간이 20% 늘어난다)
function freezeOn(foeId){e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=1e9;g.spawnRules=[];e.addUnit('vermilion');e.addUnit(foeId);const u=g.units.find(x=>x.ally),f=g.units.find(x=>!x.ally&&x.type===foeId);assert(u&&f,foeId);f.hp=f.max=1e9;f.x=50;u.x=56;const before=g.elapsed;t.damage(f,100,u);return +((f.freezeUntil||0)>g.elapsed?f.freezeUntil-g.elapsed:0).toFixed(2)}
const red=['capy','pigge','redcyclone'].find(id=>t.data.units[id]&&t.traitsOf(t.data.units[id]).includes('red'));
const alien=['kroxo','shibalien','gregory'].find(id=>t.data.units[id]&&t.traitsOf(t.data.units[id]).includes('alien'));
const plain=['dog','snache'].find(id=>t.data.units[id]&&t.traitsOf(t.data.units[id]).length===0);
assert(red&&alien&&plain,'시험용 적 '+[red,alien,plain]);
assert.equal(freezeOn(red),8,'빨간 적 8초 멈춤 '+red);
assert.equal(freezeOn(alien),8,'에이리언 적 8초 멈춤 '+alien);
assert.equal(freezeOn(plain),0,'속성 없는 적은 멈추지 않음 '+plain);
console.log('PASS: 버밀리언(울슈레·인스톨 연합) 빨간 적('+red+')·에이리언('+alien+') 8초 멈춤, 속성 없는 적('+plain+') 제외, 간격 5.3초, 1·2진 가격 동일');
process.exit(0);
