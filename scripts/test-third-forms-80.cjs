// 8.0 신규 3진 4명(하시엔다·라이트 크림·모스·루비) 초안 시험: 수치(2진 ×1.5, 가격·생산 그대로), 능력(고대종 초뎀·정지 100%·저주), 사거리 규칙, 그림이 없으면 잠김, 기존 캐릭터 불변.
const assert=require('assert/strict'),make=require('./full-harness.cjs');
const SETUP=`globalThis.__t={data,ALLIES,TRUE_NAME,NEW_ATLASES,unitStats,training,trueForms,trueFormAssetReady,hasTrueForm,cooldownKey,setRand:f=>{Math.random=f}};`;
const IDS=['hacienda','lightcream','moss','ruby'];
function engine(env){const keep={...process.env};Object.assign(process.env,env);for(const k of Object.keys(env))if(env[k]===undefined)delete process.env[k];
 try{const e=make({extraSetup:SETUP});const t=globalThis.__t;delete globalThis.__t;return {e,t}}finally{for(const k of Object.keys(env)){if(keep[k]===undefined)delete process.env[k];else process.env[k]=keep[k]}}}
const {e,t}=engine({THIRD80_DRAFT:'1'}),{data}=t;
const form=(id,n)=>{t.trueForms.length=0;delete t.training.forms[id];if(n===3)t.trueForms.push(id);else t.training.forms[id]=n;return JSON.parse(JSON.stringify(t.unitStats(id)))};

// ---- 1) 수치: 2진 체력·공격 ×1.5, 가격·생산 시간 그대로
for(const id of IDS){
 const a=form(id,2),b=form(id,3);assert(b.trueForm&&!a.trueForm,id+' 3진 플래그');
 assert.equal(b.hp,Math.round(a.hp*1.5),id+' 체력 ×1.5');assert.equal(b.atk,Math.round(a.atk*1.5),id+' 공격 ×1.5');
 assert.equal(b.cost,a.cost,id+' 가격 그대로');assert.equal(b.cooldown,a.cooldown,id+' 생산 시간 그대로');assert(Math.abs(b.interval-a.interval)<1e-9,id+' 공격 간격 그대로');
}
assert.deepEqual(IDS.map(id=>t.TRUE_NAME[id]).every(Boolean),true,'3진 이름');
// 사거리: 루비 300(10.2), 모스는 2진 사거리(조정 전)+3에 구간 축소를 적용, 하시엔다·라이트 크림은 2진과 같음
assert(Math.abs(form('ruby',3).range-10.2)<1e-9,'루비 3진 사거리 300');
{const R2=.034,orig=644*R2+3,n=Math.round(orig/R2),f=n<=400?.9:n<=500?.8:n<=800?.7:.6,want=Math.floor(n*f/10+1e-8)*10*R2;assert(Math.abs(form('moss',3).range-want)<1e-6,'모스 3진 사거리 = (2진 원사거리+3)에 구간 축소 '+[form('moss',3).range,want]);assert(form('moss',3).range>form('moss',2).range,'모스 3진 사거리가 2진보다 김')}
assert.equal(form('hacienda',3).range,form('hacienda',2).range);assert.equal(form('lightcream',3).range,form('lightcream',2).range);

// ---- 2) 능력 값
{const h=form('hacienda',3),l=form('lightcream',3),m=form('moss',3),r=form('ruby',3);
 assert.deepEqual(h.massiveVs,['angel','ancient'],'하시엔다: 기존 천사 + 고대종');
 assert(l.massiveVs.includes('ancient')&&l.critChance>form('lightcream',2).critChance,'라이트 크림: 고대종 초뎀 + 크리티컬 상승');
 assert.deepEqual(m.statusVs,['alien','ancient','floating']);assert.equal(m.curseChance,.5);assert(Math.abs(m.curseDuration-3.08)<1e-9);assert.equal(m.slowChance,form('moss',2).slowChance,'모스 느리게는 2진 그대로');
 assert.deepEqual(r.statusVs,['red','ancient']);assert.equal(r.freezeChance,1);assert.equal(r.freezeDuration,3);assert(r.area&&Math.abs(r.interval-3)<1e-9,'루비 범위 공격·간격 3초 유지');
}

// ---- 3) 실제 전투에서 능력이 동작한다
const rand={high:()=>t.setRand(()=>.999),zero:()=>t.setRand(()=>0),set:f=>t.setRand(f)};
function battle(){e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=1e9;g.spawnRules=[];return g}
function spawn(id,x,tf){t.trueForms.length=0;delete t.training.forms[id];if(tf)t.trueForms.push(id);else if(typeof tf==='number'||tf===false)t.training.forms[id]=2;
 const g=e.getGame();if(t.ALLIES.includes(id))g[t.cooldownKey(id)]=0;e.addUnit(id);const u=[...g.units].reverse().find(v=>v.type===id);assert(u,'출격 '+id);u.x=x;u.emerging=false;u.hp=u.max=u.stats.hp=1e12;u.kbTime=0;return u}
const enemyIds=Object.keys(data.units).filter(id=>!t.ALLIES.includes(id));
const foeOf=trait=>enemyIds.filter(id=>!data.units[id].barrier&&(data.units[id].traits||[data.units[id].trait]).includes(trait)).sort((a,b)=>data.units[a].hp-data.units[b].hp)[0];
data.units.ancDummy={trait:'ancient',hp:1e12,atk:1,interval:1,speed:0,range:1,reward:0,knockbacks:3,attackDuration:.5,windup:.1};
const foeId={ancient:'ancDummy',red:foeOf('red'),black:foeOf('black'),alien:foeOf('alien'),floating:foeOf('floating'),angel:foeOf('angel')};
for(const [k,v] of Object.entries(foeId))assert(v,'시험용 적 '+k);
function foe(trait,x=30){e.addUnit(foeId[trait]);const f=[...e.getGame().units].reverse().find(v=>!v.ally&&v.type===foeId[trait]);f.x=x;f.emerging=false;f.hp=f.max=f.stats.hp=1e12;f.kbTime=0;return f}
const hit=(v,from,amount=1000)=>{v.kbTime=0;const h=v.hp;e.damage(v,amount,from);v.kbTime=0;const d=h-v.hp;v.hp=h;return d};

{ // 하시엔다 초뎀: 천사·고대종 ×3 이상, 빨간 적은 1배
 const g=battle();rand.high();const a=spawn('hacienda',60,true);
 const anc=foe('ancient'),ang=foe('angel'),red=foe('red');
 assert(hit(anc,a)>=3000-1e-6,'하시엔다 3진은 고대종에게 초뎀 '+hit(anc,a));assert(hit(ang,a)>=3000-1e-6,'천사 초뎀 유지');assert.equal(hit(red,a),1000,'빨간 적은 그대로');
 const b=spawn('hacienda',60,false);assert.equal(hit(anc,b),1000,'2진은 고대종 초뎀 없음');
}
{ // 라이트 크림 고대종 초뎀 + 크리티컬
 battle();rand.high();const a=spawn('lightcream',60,true),anc=foe('ancient');assert(hit(anc,a)>=3000-1e-6,'라이트 크림 3진 고대종 초뎀');
 assert.equal(a.stats.critChance,.3);rand.zero();assert(hit(foe('red'),a)>=2000-1e-6,'크리티컬 2배');rand.high();
}
{ // 루비 정지 100%·3초: 빨간 적·고대종에만, 저주 걸리면 봉인
 const g=battle();rand.zero();const a=spawn('ruby',60,true),red=foe('red'),anc=foe('ancient'),black=foe('black');
 const frozen=v=>{v.freezeUntil=0;v.kbTime=0;e.damage(v,1,a);return v.freezeUntil>g.elapsed?+(v.freezeUntil-g.elapsed).toFixed(2):0};
 const fr=frozen(red);assert(fr>=3&&fr<=3.6+1e-9,'빨간 적 3초 정지(보물 +20% 반영 시 3.6초) '+fr);assert.equal(frozen(anc),3,'고대종 3초 정지(고대종은 보물 보너스 없음)');assert.equal(frozen(black),0,'검은 적은 안 얼림');
 a.cursedUntil=g.elapsed+5;assert.equal(frozen(red),0,'저주 걸리면 정지 봉인');a.cursedUntil=0;assert(frozen(red)>=3);
 const two=spawn('ruby',60,false);two.stats.freezeChance=1;const f2=foe('red');f2.freezeUntil=0;f2.kbTime=0;e.damage(f2,1,two);{const d=f2.freezeUntil-g.elapsed;assert(d>=2-1e-9&&d<=2.4+1e-9,'2진 정지 2초 그대로(보물 반영 시 2.4초) '+d)}
}
{ // 모스: 에이리언·고대종·떠있는 적에게 느리게(기존) + 50% 3.08초 저주, 빨간 적은 둘 다 안 걸림
 const g=battle();rand.zero();const a=spawn('moss',60,true);
 for(const k of ['alien','ancient','floating']){const f=foe(k);f.slowUntil=f.cursedUntil=0;f.kbTime=0;e.damage(f,1,a);assert(f.slowUntil>g.elapsed,k+' 느리게');assert(Math.abs(f.cursedUntil-g.elapsed-3.08)<1e-9,k+' 저주 3.08초')}
 const red=foe('red');red.slowUntil=red.cursedUntil=0;red.kbTime=0;e.damage(red,1,a);assert(!(red.slowUntil>g.elapsed)&&!(red.cursedUntil>g.elapsed),'빨간 적에는 안 걸림');
 const anc=foe('ancient');rand.set(()=>.7);anc.cursedUntil=0;anc.kbTime=0;e.damage(anc,1,a);assert(!(anc.cursedUntil>g.elapsed),'저주 50% 확률 밖');rand.set(()=>.3);anc.kbTime=0;e.damage(anc,1,a);assert(anc.cursedUntil>g.elapsed,'저주 50% 확률 안');
 // 저주 걸린 고대종은 아군에게 저주를 못 건다(원작: 저주로 고대종의 저주를 무력화)
 const ally=spawn('red',60,false);ally.cursedUntil=0;ally.kbTime=0;rand.high();anc.cursedUntil=g.elapsed+5;anc.stats.curseChance=1;anc.stats.curseDuration=5;e.damage(ally,1,anc);assert(!(ally.cursedUntil>g.elapsed),'저주당한 고대종은 저주를 못 건다');
}

// ---- 4) 그림이 없으면 잠긴다(실제 게임 설정: 임시 그림 없음)
{const {t:real}=engine({THIRD80_DRAFT:undefined,HARNESS_SKIP:'assets/third-form-80-redesign-motion/motion-atlases.js'});for(const id of IDS){assert(!real.trueFormAssetReady(id),id+' 3진 그림이 없으면 해금 불가');real.trueForms.push(id);assert(!real.hasTrueForm(id),id+' hasTrueForm 거짓');real.trueForms.length=0}}

// ---- 4-2) 3진 그림(THIRD_FORM_80_MOTION_ATLASES)이 오면 자동으로 연결된다 — 가짜 그림 표로 확인
{const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..');
 const fr=(n)=>Array.from({length:n},(_,i)=>[i*10,0,10,10,5,0]);
 const fake=id=>({sheet:`assets/third-form-80-motion/${id}_3.webp?v=1`,scale:.5,left:21,flip:false,groundAnchor:true,bodyWidth:60,walkStep:.14,attackStep:2,strike:2,continuousAttack:true,idle:fr(4),idleStep:.4,walk:fr(4),attack:fr(7),hurt:fr(1)});
 const atl={};for(const id of ['ruby','moss','hacienda'])atl[id+'_3']=fake(id);// 라이트 크림은 일부러 뺀다
 const tmp='work/third80-fake-atlas.js';fs.mkdirSync(path.join(root,'work'),{recursive:true});fs.writeFileSync(path.join(root,tmp),'const THIRD_FORM_80_MOTION_ATLASES='+JSON.stringify(atl)+';');
 try{
  const list=make.DEFAULT_ADDONS.filter(f=>f!=='assets/third-form-80-redesign-motion/motion-atlases.js');list.splice(list.indexOf('third-forms-80.js'),0,tmp);
  const keep=process.env.THIRD80_DRAFT;delete process.env.THIRD80_DRAFT;
  const e2=make({addons:list,extraSetup:SETUP+`globalThis.__t.PROFILE_ART_TRUE=PROFILE_ART_TRUE;`});const t2=globalThis.__t;delete globalThis.__t;if(keep!==undefined)process.env.THIRD80_DRAFT=keep;
  for(const id of ['ruby','moss','hacienda']){
   assert(t2.trueFormAssetReady(id),id+' 그림이 오면 3진이 준비됨');
   const a=t2.NEW_ATLASES[id].true;assert.equal(a.sheet,`assets/third-form-80-motion/${id}_3.webp?v=1`);
   assert.equal(a.attackKeys[0][0],0);assert.equal(a.attackKeys.length,3+4,'선딜 키 3 + 후반 4');assert.equal(a.attackKeys.at(-1)[1],6,'마지막 공격 칸 6');
   assert(a.attackKeys.every((k,i,l)=>i===0||k[0]>=l[i-1][0]),id+' 공격 키 시간이 오름차순');
   assert.equal(t2.PROFILE_ART_TRUE[id],`assets/third-form-80-motion/${id}_3-profile.webp?v=1`);
  }
  assert(!t2.trueFormAssetReady('lightcream'),'그림 표에 없는 캐릭터는 계속 잠김');
 }finally{fs.rmSync(path.join(root,tmp),{force:true})}
}

// ---- 5) 기존 캐릭터 불변: 이 파일을 뺀 엔진과 비교(4명의 3진 외 모든 형태 수치 동일)
{const {t:base}=engine({THIRD80_DRAFT:undefined,HARNESS_SKIP:'third-forms-80.js'});
 const snap=(tt,id,n)=>{tt.trueForms.length=0;delete tt.training.forms[id];if(n===3)tt.trueForms.push(id);else tt.training.forms[id]=n;return JSON.stringify(tt.unitStats(id))};
 let n=0;for(const id of t.ALLIES){for(const f of [1,2]){assert.equal(snap(t,id,f),snap(base,id,f),id+' '+f+'진 수치가 바뀜');n++}}
 for(const id of t.ALLIES.filter(x=>!IDS.includes(x)&&base.trueFormAssetReady(x))){assert.equal(snap(t,id,3),snap(base,id,3),id+' 3진 수치가 바뀜');n++}
 console.log('  기존 형태 불변 확인',n,'개');
}
console.log('PASS: 8.0 신규 3진 4명 초안 — 수치(2진 ×1.5·가격 그대로), 사거리(루비 300·모스 +3), 하시엔다·라이트 크림 고대종 초뎀, 루비 정지 100%·3초·저주 봉인, 모스 느리게+50% 저주, 그림 없으면 잠김, 기존 형태 불변');
process.exit(0);
