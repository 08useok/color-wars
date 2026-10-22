// 7.1 라이트 크림 3진 시험: 3진 능력치·크리티컬·메탈 킬러. 그림이 없으면 3진이 잠기는지도 본다.
const assert=require('assert/strict'),fs=require('fs'),path=require('path');
const make=require('./full-harness.cjs');
const fake=`NEW_ATLASES.lightcream.true={sheet:'assets/s2_lightcream.webp',walk:[[0,0,10,10,0,0]],attack:[[0,0,10,10,0,0]],hurt:[[0,0,10,10,0,0]]};`;
const hook=`globalThis.__lc={unitStats,TRUE_NAME,TRUE_FORM_BONUS,data,damage,addUnit,asset:()=>trueFormAssetReady('lightcream'),setTrue:b=>{trueForms.length=0;if(b)trueForms.push('lightcream')}};`;
// ① 그림 없음: 3진 잠김, 이름·능력치 등록만
const a=make({extraSetup:`trueFormOpen=()=>true;${hook}`});const A=globalThis.__lc;delete globalThis.__lc;
assert.equal(A.TRUE_NAME.lightcream,'파티시에 라이트 크림');assert.deepEqual(A.TRUE_FORM_BONUS.lightcream,{critChance:.4,critMult:2.5,metalKiller:.12});
assert(!A.asset(),'그림이 없으면 3진 잠김');
// ② 가짜 그림을 끼우면 3진 능력치가 적용된다
const b=make({extraSetup:`trueFormOpen=()=>true;${fake}${hook}`});const B=globalThis.__lc;delete globalThis.__lc;
b.setProfile({level:30});const s2=B.unitStats('lightcream');B.setTrue(true);b.setProfile({level:30,trueForms:['lightcream']});const s3=B.unitStats('lightcream');
assert(B.asset());assert(!s2.trueForm&&s3.trueForm);
assert.equal(s3.hp,Math.round(s2.hp*1.4));assert.equal(s3.atk,Math.round(s2.atk*1.4));
assert.equal(s3.critChance,.4);assert.equal(s3.critMult,2.5);assert.equal(s3.metalKiller,.12);assert.equal(s2.metalKiller,undefined,'2진에는 메탈 킬러 없음');
// ③ 메탈 킬러: 크리티컬이 아닌 타격은 메탈 현재 체력의 12%(+1), 크리티컬은 전체 피해
b.reset();const g=b.getGame();g.running=true;g.tutorial=6;g.money=1e9;g.spawnRules=[];
b.addUnit('lightcream');const u=g.units.find(x=>x.ally);
const foeId='metalhippo';const _r=Math.random;
b.addUnit(foeId);const foe=g.units.find(x=>!x.ally&&x.type===foeId);assert(foe);
foe.hp=foe.max=1000000;foe.x=50;u.x=54;u.stats.critChance=0;
Math.random=()=>.99;B.damage(foe,u.stats.atk,u);
const dealt=1000000-foe.hp;
assert.equal(dealt,1+Math.ceil(1000000*.12),'비크리티컬: 1+현재 체력 12%');
Math.random=_r;
console.log('PASS: 라이트 크림 3진(이름·능력치 ×1.4·크리티컬 40%/×2.5·메탈 킬러 12%), 그림이 없으면 잠김');
process.exit(0);
