// 8.0 엔진 시험: 고대종 속성 · 고대의 저주(봉인 범위·걸기·갱신·무효·만료) · 앞으로 워프 · 연타 첫 타 능력(파동+워프). 엔진 파일 ancient-curse.js.
const fs=require('fs'),assert=require('assert/strict'),path=require('path'),make=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const e=make({extraSetup:`
 globalThis.__ac={ALLIES,data,cooldownKey,traitsOf,TRAIT_NAMES,TRAIT_TARGET,codexTraitBadges,statusLands,setRand:f=>{Math.random=f}};
 globalThis.__waves=[];globalThis.__wc=0;globalThis.__nc=0;
 {const lw=launchWave;launchWave=function(u,d){globalThis.__waves.push(d.wave.level);return lw.apply(this,arguments)}}
 {const d0=damage;damage=function(v,amount,from){if(from&&!from.ally){if(from.stats?.warpChance)globalThis.__wc++;else globalThis.__nc++}return d0.apply(this,arguments)}}
`});
const t=globalThis.__ac;delete globalThis.__ac;
const {data}=t,ALLIES=t.ALLIES;
const enemyIds=Object.keys(data.units).filter(id=>!ALLIES.includes(id));
const enemyWith=trait=>enemyIds.filter(id=>t.traitsOf(data.units[id]).includes(trait)).sort((a,b)=>data.units[a].hp-data.units[b].hp)[0];// 보스(체력 기준)가 아닌 가장 약한 적: 보스 배수가 섞이지 않게
const foe={black:enemyWith('black'),angel:enemyWith('angel'),red:enemyWith('red'),floating:enemyWith('floating'),metal:enemyWith('metal'),zombie:enemyWith('zombie')};
for(const [k,v] of Object.entries(foe))assert(v,'시험용 적 속성 '+k);
const rand={set:f=>t.setRand(f),zero:()=>t.setRand(()=>0),high:()=>t.setRand(()=>.999)};
function battle(){e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=1e9;g.spawnRules=[];return g}
function spawn(id,x){const g0=e.getGame();if(ALLIES.includes(id))g0[t.cooldownKey(id)]=0;e.addUnit(id);const g=e.getGame(),u=[...g.units].reverse().find(v=>v.type===id);assert(u,'출격 '+id);u.x=x;u.emerging=false;u.hp=u.max=u.stats.hp=1e12;u.kbTime=0;return u}
const curse=(u,sec=5)=>{u.cursedUntil=e.getGame().elapsed+sec};
const uncurse=u=>{u.cursedUntil=0};
function hit(v,from,amount=1000){const before=v.hp;v.kbTime=0;v.hp=Math.min(v.hp,v.max);const b=v.hp;e.damage(v,amount,from);const d=b-v.hp;v.hp=before;v.kbTime=0;return d}

// ---- 1) 속성 등록
assert.equal(t.TRAIT_NAMES.ancient,'고대종');assert.equal(t.TRAIT_TARGET.ancient,'고대종');
{const d={trait:'ancient',hp:1,atk:1,interval:1,speed:1,range:1,curseChance:.35,curseDuration:3.333};const b=t.codexTraitBadges(d);assert(b.some(x=>/고대종/.test(x)),'고대종 배지 '+b);assert(b.some(x=>/고대의 저주 35% · 3.33초/.test(x)),'저주 배지 '+b)}

// ---- 2) 봉인 범위: 같은 호출을 저주 전·중·후에 비교
rand.high();
battle();
const pairs=[ // [이름, 아군, 공격자/피해자 구분, 상대 속성, 저주 전 배수, 저주 중 배수]
 ['엄강 주는 피해','garnet','dealt','black',1.5,1],
 ['초뎀','black','dealt','black',3,1],
 ['극뎀','cherry','dealt','angel',5,1],
 ['엄강 받는 피해','garnet','taken','black',.5,1],
 ['맷집','brown','taken','angel',.25,1],
 ['빨간 적에 강함(주는)','purple','dealt','red',null,1],
 ['빨간 적에 강함(받는)','purple','taken','red',null,1],
 ['떠있는 적에 강함(주는)','cyan','dealt','floating',null,1],
 ['떠있는 적에 강함(받는)','cyan','taken','floating',null,1]
];
for(const [name,ally,side,trait,pre,mid] of pairs){
 battle();const a=spawn(ally,60),f=spawn(foe[trait],30);f.stats.crit=0;
 const fn=side==='dealt'?()=>hit(f,a):()=>hit(a,{type:foe[trait],ally:false,stats:{atk:1}});
 uncurse(a);const normal=fn();curse(a);const sealed=fn();uncurse(a);const after=fn();
 assert(normal>0&&sealed>0,name+' 피해 있음');
 assert(Math.abs(after-normal)<1e-6,name+' 저주가 풀리면 원래대로 '+[normal,sealed,after]);
 assert.equal(sealed,1000,name+' 저주 중에는 대항 배수가 전혀 없음(보물 보너스 포함) '+sealed);
 // 저주 전: 능력 배수 이상(보물 보너스가 더해지면 더 강해짐). 주는 쪽은 pre배 이상, 받는 쪽은 pre배 이하
 if(pre!==null)assert(side==='dealt'?normal>=pre*1000-1e-6:normal<=pre*1000+1e-6,`${name}: 저주 전 ${normal} (기준 ${pre}배)`);
 else assert(side==='dealt'?normal>=1400:normal<=700,`${name}: 저주 전 ${normal}`);
}

// ---- 3) 속성 제한 상태이상(statusVs)은 저주 중 아무 적에게도 안 걸린다
{
 const withStatus=ALLIES.find(id=>{const s=data.units[id];return s.statusVs?.length&&(s.slowChance||s.freezeChance||s.atkDownPct)&&s.statusVs.length<5&&!s.statusVs.includes('ancient')});
 assert(withStatus,'속성 제한 상태이상 아군');
 const trait=data.units[withStatus].statusVs[0],fid=foe[trait]||enemyIds.find(id=>t.traitsOf(data.units[id]).includes(trait));assert(fid,'상태이상 대상 적 '+trait);
 const g=battle();rand.zero();const a=spawn(withStatus,60),f=spawn(fid,30);
 a.stats.slowChance=a.stats.freezeChance=a.stats.atkDownPct=1;a.stats.atkDownChance=1;a.stats.slowDuration=a.stats.freezeDuration=a.stats.atkDownDuration=3;
 const hit1=()=>{f.slowUntil=f.freezeUntil=f.atkDownUntil=0;f.kbTime=0;e.damage(f,1,a);return [f.slowUntil>g.elapsed||f.freezeUntil>g.elapsed||f.atkDownUntil>g.elapsed,f.slowUntil>g.elapsed,f.freezeUntil>g.elapsed,f.atkDownUntil>g.elapsed]};
 const normal=hit1();assert(normal[0],withStatus+' 평소엔 상태이상이 걸림 '+normal);
 curse(a);const sealed=hit1();assert(!sealed[0],withStatus+' 저주 중엔 안 걸림 '+sealed);
 uncurse(a);assert(hit1()[0],'풀리면 다시 걸림');
 // 상태이상 목록이 없는 능력(모든 적에게 걸림)은 저주와 상관없다 — 이 아군의 statusVs를 지워 비교
 const saved=a.stats.statusVs;delete a.stats.statusVs;curse(a);assert(hit1()[0],'속성 제한 없는 상태이상은 저주 중에도 걸림');a.stats.statusVs=saved;uncurse(a);
}

// ---- 4) 봉인하지 않는 것: 크리티컬·메탈 킬러·좀비 킬러·파동
{
 battle();rand.zero();
 const crit=ALLIES.find(id=>data.units[id].critChance);assert(crit,'크리티컬 아군');
 const a=spawn(crit,60),f=spawn(foe.angel,30);a.stats.critChance=.5;a.stats.critMult=2;
 for(const k of ['strongVs','massiveVs','extremeVs','resistVs','redStrong','floatStrong','statusVs','slowChance','freezeChance','atkDownPct'])delete a.stats[k];
 const n=hit(f,a);curse(a);const c=hit(f,a);assert.equal(c,n,'크리티컬은 저주와 상관없음');rand.high();assert(n>=1.9*hit(f,a),'크리티컬이 실제로 동작(2배) '+n);rand.zero();
 uncurse(a);
 const mk=ALLIES.find(id=>data.units[id].metalKiller);assert(mk,'메탈 킬러 아군');
 const m=spawn(mk,60),metal=spawn(foe.metal,30);rand.high();metal.stats.hp=metal.hp=metal.max=1e6;
 const mn=hit(metal,m);curse(m);const mc=hit(metal,m);assert.equal(mc,mn,'메탈 킬러는 저주와 상관없음 '+[mn,mc]);assert(mn>1,'메탈 킬러가 실제로 동작 '+mn);
 const zk=ALLIES.find(id=>data.units[id].zombieKiller);assert(zk,'좀비 킬러 아군');
 const z=spawn(zk,60),zb=spawn(foe.zombie,30);curse(z);zb.hp=1;zb.kbTime=0;e.damage(zb,10,z);assert(zb.reviveAt===undefined,'저주 중에도 좀비 킬러로 부활을 막음');
}

// ---- 5) 저주 걸기·갱신·무효·만료
{
 const g=battle();const a=spawn('red',60);const foeType=Object.keys(data.units).find(id=>!ALLIES.includes(id)&&t.traitsOf(data.units[id]).includes('floating'));
 const from=(chance,dur)=>({type:foeType,ally:false,stats:{atk:1,curseChance:chance,curseDuration:dur}});
 rand.high();a.cursedUntil=0;e.damage(a,1,from(1,5));assert(Math.abs(a.cursedUntil-(g.elapsed+5))<1e-9,'100% 저주 5초');
 a.cursedUntil=0;rand.set(()=>.2);e.damage(a,1,from(.35,3.33));assert(a.cursedUntil>g.elapsed,'35% 확률 안에 들면 걸림');
 a.cursedUntil=0;a.kbTime=0;rand.set(()=>.5);e.damage(a,1,from(.35,3.33));assert(!(a.cursedUntil>g.elapsed),'35% 확률 밖이면 안 걸림');
 rand.high();a.kbTime=0;a.cursedUntil=g.elapsed+5;e.damage(a,1,from(1,2));assert(Math.abs(a.cursedUntil-(g.elapsed+5))<1e-9,'짧은 저주는 시간을 줄이지 않음');
 a.kbTime=0;e.damage(a,1,from(1,8));assert(Math.abs(a.cursedUntil-(g.elapsed+8))<1e-9,'긴 저주는 시간을 늘림');
 a.cursedUntil=0;a.stats.immune={...(a.stats.immune||{}),curse:true};a.kbTime=0;e.damage(a,1,from(1,5));assert(!(a.cursedUntil>0),'저주 무효 아군');delete a.stats.immune.curse;
 a.kbTime=1;a.cursedUntil=0;e.damage(a,1,from(1,5));assert(!(a.cursedUntil>0),'넉백 중에는 맞지 않아 저주도 안 걸림');a.kbTime=0;
 const foeUnit=spawn(foeType,30);foeUnit.cursedUntil=0;e.damage(foeUnit,1,from(1,5));assert(!(foeUnit.cursedUntil>0),'적은 저주에 걸리지 않음');
 e.damage(a,1,{type:'red',ally:true,stats:{atk:1,curseChance:1,curseDuration:5}});a.cursedUntil=0;a.kbTime=0;e.damage(a,1,{type:'red',ally:true,stats:{atk:1,curseChance:1,curseDuration:5}});assert(!(a.cursedUntil>0),'아군이 건 저주는 없음');
 // 만료: 시간이 지나면 다시 대항 능력이 돌아온다
 const bl=spawn('black',60),bf=spawn(foe.black,30);rand.high();
 uncurse(bl);const norm=hit(bf,bl);e.damage(bl,1,from(1,3));assert(bl.cursedUntil>g.elapsed);assert(hit(bf,bl)<norm,'저주 중 초뎀 봉인');
 for(let i=0;i<30*3+5;i++)e.update(1/30);
 assert(!(bl.cursedUntil>g.elapsed),'3초 뒤 만료');assert.equal(hit(bf,bl),norm,'만료 뒤 초뎀 복구');
}

// ---- 6) 앞으로 워프(음수 거리) · 뒤로 워프 · 양끝 자르기
{
 const g=battle();rand.high();const foeType=foe.red;
 const warp=(dist,dur)=>({type:foeType,ally:false,stats:{atk:1,warpChance:1,warpDistance:dist,warpDuration:dur}});
 let a=spawn('red',50);e.damage(a,1,warp(-5.1,100/30));assert(a.warpLeft>0,'워프 시작');assert(Math.abs(a.warpEnd-44.9)<1e-9,'앞으로 5.1: '+a.warpEnd);
 let n=0;while(a.warpLeft>0&&n++<300)e.update(1/30);assert(a.warpLeft===0&&Math.abs(a.x-44.9)<.01,'워프가 끝나는 순간 44.9에 나타남 '+a.x);assert(n>=99&&n<=101,'워프 시간 3.33초(100프레임) '+n);assert(g.units.includes(a),'워프 뒤 다시 전장에');
 a=spawn('red',50);e.damage(a,1,warp(-100,1/30));assert(a.warpEnd>12.5&&a.warpEnd<13.5,'적 성 앞에서 멈춤(frontX+1) '+a.warpEnd);
 a=spawn('red',50);e.damage(a,1,warp(51,3));assert.equal(a.warpEnd,98,'뒤로 워프는 기존대로 98에서 멈춤');
 a=spawn('red',50);e.damage(a,1,warp(17,3));assert.equal(a.warpEnd,67,'뒤로 17 기존 동작');
 a=spawn('red',50);a.stats.immune={warp:true};e.damage(a,1,warp(-5,3));assert(!(a.warpLeft>0),'워프 무효는 그대로');
}

// ---- 7) 연타 첫 타 능력(파이널 기가 그랜드 신식): 첫 타에만 파동+워프, 2·3타는 순수 피해
{
 data.units.ancHits={hp:1e12,atk:1000,interval:100,speed:0,range:20,reward:0,knockbacks:3,attackDuration:.5,windup:.1,area:true,zoneMin:0,zoneMax:20,
  hits:[{at:.1,share:.1,abilities:{warpChance:1,warpDistance:30,warpDuration:3,wave:{chance:1,level:12,reach:90}}},{at:.2,share:.2},{at:.3,share:.7}]};
 const g=battle();rand.high();
 const a1=spawn('red',45),a2=spawn('red',46);a1.stats.immune={warp:true};a2.stats.immune={warp:true};a1.stats.atk=a2.stats.atk=0;
 e.addUnit('ancHits');const boss=g.units.find(u=>u.type==='ancHits');assert(boss,'연타 시험 적');boss.x=40;boss.emerging=false;boss.hp=boss.max=1e12;
 for(const u of g.units)if(u.ally)u.hp=u.max=u.stats.hp=1e12;
 globalThis.__waves.length=0;globalThis.__wc=0;globalThis.__nc=0;
 const hp0=[a1.hp,a2.hp];
 for(let i=0;i<30*1.2;i++)e.update(1/30);
 assert.equal(globalThis.__waves.length,1,'파동은 첫 타 한 번뿐 '+globalThis.__waves);assert.equal(globalThis.__waves[0],12,'파동 Lv12');
 // 첫 타: 직접 2명 + 파동 2명 = 4번(워프 능력 붙음), 2·3타: 각 2명 = 4번(능력 없음)
 assert.equal(globalThis.__wc,4,'첫 타(직접+파동)에만 워프 능력이 붙음 '+globalThis.__wc);
 assert.equal(globalThis.__nc,4,'2·3타는 능력 없음 '+globalThis.__nc);
 const lost=hp0[0]-a1.hp,atk=boss.stats.atk;
 assert(Math.abs(lost/atk-1.1)<.02,'아군이 받은 피해 = 공격의 (0.1 직접 + 0.1 파동 + 0.2 + 0.7) '+lost/atk);
 delete data.units.ancHits;
}

// ---- 8) 고대종 대항·상태이상 목록
{
 battle();rand.high();
 const a=spawn('red',60);
 data.units.ancTest={trait:'ancient',hp:1e12,atk:1,interval:1,speed:0,range:1,reward:0,knockbacks:3,attackDuration:.5,windup:.1};
 const f=spawn('ancTest',30);const base=hit(f,a);a.stats.massiveVs=['ancient'];assert.equal(hit(f,a)/base,3,'massiveVs:[ancient]가 초뎀으로 동작');delete a.stats.massiveVs;
 const all=['red','floating','black','angel','alien','zombie'];
 assert(t.statusLands({stats:{statusVs:all}},f),'메탈 뺀 모든 적 목록은 고대종 포함');
 assert(!t.statusLands({stats:{statusVs:['black']}},f),'일부 속성 목록은 고대종 제외');
 assert(t.statusLands({stats:{}},f),'목록이 없으면 항상 걸림');
 delete data.units.ancTest;
}

// ---- 8-2) 아군이 적에게 거는 저주(모스 3진): statusVs 속성 적에게만, 걸린 적은 자기 저주가 봉인된다
{
 const g=battle();rand.high();
 data.units.ancTest2={trait:'ancient',hp:1e12,atk:1,interval:1,speed:0,range:1,reward:0,knockbacks:3,attackDuration:.5,windup:.1,curseChance:1,curseDuration:5};
 const a=spawn('red',60);Object.assign(a.stats,{curseChance:1,curseDuration:3.08,statusVs:['alien','ancient','floating']});
 const anc=spawn('ancTest2',30),redFoe=spawn(foe.red,31),floatFoe=spawn(foe.floating,32);
 const clean=u=>{u.cursedUntil=0;u.kbTime=0};
 clean(anc);e.damage(anc,1,a);assert(Math.abs(anc.cursedUntil-(g.elapsed+3.08))<1e-9,'고대종 적에게 3.08초 저주 '+anc.cursedUntil);
 clean(floatFoe);e.damage(floatFoe,1,a);assert(floatFoe.cursedUntil>g.elapsed,'떠있는 적에게도 저주');
 clean(redFoe);e.damage(redFoe,1,a);assert(!(redFoe.cursedUntil>g.elapsed),'속성 목록에 없는 적(빨간 적)에게는 안 걸림');
 clean(anc);rand.set(()=>.9);a.stats.curseChance=.5;e.damage(anc,1,a);assert(!(anc.cursedUntil>g.elapsed),'50% 확률 밖');
 clean(anc);rand.set(()=>.2);e.damage(anc,1,a);assert(anc.cursedUntil>g.elapsed,'50% 확률 안');rand.high();a.stats.curseChance=1;
 clean(anc);anc.stats.immune={curse:true};e.damage(anc,1,a);assert(!(anc.cursedUntil>g.elapsed),'저주 무효 적');delete anc.stats.immune;
 // 저주에 걸린 적은 자기 저주(고대의 저주)가 봉인된다 — 아군에게 저주를 못 건다
 const ally=spawn('red',60);ally.cursedUntil=0;ally.kbTime=0;
 anc.cursedUntil=0;e.damage(ally,1,anc);assert(ally.cursedUntil>g.elapsed,'저주 안 걸린 고대종은 아군에게 저주를 건다');
 ally.cursedUntil=0;ally.kbTime=0;curse(anc,5);e.damage(ally,1,anc);assert(!(ally.cursedUntil>g.elapsed),'저주에 걸린 고대종은 저주를 못 건다');
 uncurse(anc);ally.kbTime=0;e.damage(ally,1,anc);assert(ally.cursedUntil>g.elapsed,'저주가 풀리면 다시 건다');
 // 저주에 걸린 모스(속성 제한 저주)는 적에게 저주를 못 건다
 clean(anc);curse(a,5);e.damage(anc,1,a);assert(!(anc.cursedUntil>g.elapsed),'저주 걸린 아군은 속성 제한 저주를 못 건다');uncurse(a);
 // 만료는 적에게도 적용(시간이 흐르면 다시 건다)
 clean(anc);e.damage(anc,1,a);const until=anc.cursedUntil;for(let i=0;i<30*4;i++)e.update(1/30);assert(!(anc.cursedUntil>g.elapsed)&&until<=g.elapsed+1e-6,'적 저주 만료');
 delete data.units.ancTest2;
}

// ---- 9) 연결: 시험 도구 목록과 html 스크립트 순서
{
 const h=fs.readFileSync(path.join(root,'red-battle-doge.html'),'utf8'),src=[...h.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1].split('?')[0]);
 const i=src.indexOf('ancient-curse.js');assert(i>=0,'html에 ancient-curse.js');
 for(const dep of ['zombie-completion.js','strike-hits.js','ally-range-80.js','game.js'])assert(src.indexOf(dep)<i,dep+' 뒤에 불러야 함');
 assert(/ancient-curse\.js/.test(fs.readFileSync(path.join(root,'scripts/full-harness.cjs'),'utf8')),'시험 도구 목록');
}
console.log('PASS: 고대종 속성·저주(봉인 9종·상태이상·비봉인·걸기·갱신·무효·만료·아군이 적에게 거는 저주)·앞으로 워프(양끝 자르기)·연타 첫 타 능력·고대종 목록');
process.exit(0);
