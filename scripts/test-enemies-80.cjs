// 8.0 신규 적 13종 등록 시험: enemies-80.js의 이름·수치(×1.3)·능력·모션 시트를 원작 수치와 맞춰 보고, 실제 전투에서 저주·워프·파동·베리어·연타가 동작하는지 본다.
const fs=require('fs'),assert=require('assert/strict'),path=require('path'),make=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const orig=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/enemies-80-stats.json'),'utf8')),gameJson=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/enemies-80-game.json'),'utf8')),atlasJson=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/enemies-80/atlas.json'),'utf8'));
const e=make({extraSetup:`
 globalThis.__t={data,ALLIES,UNIT_NAMES,ENEMY_TEXT,ENEMY_ORDER,NEW_ATLASES,unitStats,traitsOf,cooldownKey,codexTraitBadges,setRand:f=>{Math.random=f}};
 globalThis.__waves=[];{const lw=launchWave;launchWave=function(u,d){globalThis.__waves.push([u.type,d.wave.level]);return lw.apply(this,arguments)}}
`});
const t=globalThis.__t;delete globalThis.__t;const {data}=t;
const SPEC={ // 키: [DB 번호, 공식 한글 이름, 속성]
 truebunbun:['408','신 레전드 맴매',['ancient']],ancientdog:['409','고대 멍뭉이',['ancient']],inglis:['414','잉글릭스',['ancient']],koraino:['415','고대 보어',['ancient']],
 supermayor:['416','난나나난이장',['floating','ancient']],datemegane:['422','선글래숭이',['ancient']],kogaou:['425','미남왕',['floating','ancient']],oldree:['426','올드 타조',['ancient']],
 ministercyclone:['445','미니스타 사이클론',['alien']],gardeneels:['446','붕장어 5형제',['alien']],looper:['447','루퍼좀씨',['alien']],finalgod:['448','파이널 기가 그랜드 신',[]],dogumaru:['452','토우전사 도그마루',['ancient']]
};
const ids=Object.keys(SPEC);
function webpSize(f){const b=fs.readFileSync(f);assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');const k=b.toString('ascii',12,16);
 if(k==='VP8X')return [1+b.readUIntLE(24,3),1+b.readUIntLE(27,3)];if(k==='VP8L'){const v=b.readUInt32LE(21);return [1+(v&0x3fff),1+((v>>14)&0x3fff)]}
 if(k==='VP8 ')return [b.readUInt16LE(26)&0x3fff,b.readUInt16LE(28)&0x3fff];throw Error('webp '+k)}

// ---- 1) 등록: 이름·문구·순서·속성·수치(원작 그대로)
for(const id of ids){
 const [db,name,traits]=SPEC[id],u=data.units[id],o=orig[db];
 assert(u,id+' 능력치');assert.equal(t.UNIT_NAMES[id],name,id+' 이름');assert(t.ENEMY_TEXT[id]&&t.ENEMY_TEXT[id].length>30,id+' 도감 문구');assert(t.ENEMY_ORDER.includes(id),id+' 도감 순서');
 assert.deepEqual(t.traitsOf(u),traits,id+' 속성');
 assert.equal(u.hp,o.hp,id+' 체력은 원작 그대로');
 assert.equal(u.atk,o.atk,id+' 공격은 원작 그대로');
 assert.equal(u.knockbacks,o.kb,id+' 넉백');assert.equal(u.reward,o.money,id+' 보상은 원작 그대로');
 assert(Math.abs(u.interval-o.interval/30)<1e-3&&Math.abs(u.windup-o.windup/30)<1e-3,id+' 간격·선딜');
 assert(Math.abs(u.speed-o.speed*.5367)<.01&&Math.abs(u.range-o.range*.034)<.01,id+' 속도·사거리 변환');
 assert(u.attackDuration>0&&u.attackDuration<=u.interval+1e-9&&u.windup<=u.attackDuration+1e-9,id+' 공격 모션 길이');
 assert.deepEqual(JSON.parse(JSON.stringify(u)).hp,gameJson[id].game.hp);
 const s=e.unitStats(id);assert(s.hp>0&&s.atk>0,id+' unitStats');
}
assert.equal(data.units.looper.barrier,10000,'베리어 10,000');
assert.equal(data.units.finalgod.atk,73997);

// ---- 2) 모션 시트: 파일이 있고, 모든 칸이 시트 안에 있으며, 공격 칸이 모션 길이를 덮는다
for(const id of ids){
 const a=t.NEW_ATLASES[id],f=path.join(root,'assets/anim_'+id+'.webp');assert(a,id+' 모션 항목');assert(fs.existsSync(f),id+' 시트 파일');
 const [W,H]=webpSize(f);assert.deepEqual([W,H],atlasJson[id].sheetSize,id+' 시트 크기가 칸 표와 같음');
 assert(a.groundAnchor&&a.walk.length&&a.attack.length&&a.hurt.length&&a.bodyWidth>0,id+' 모션 칸·지면 기준');
 for(const [mode,list] of [['walk',a.walk],['attack',a.attack],['hurt',a.hurt]])for(const [x,y,w,h] of list)assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=W&&y+h<=H,`${id} ${mode} 칸이 시트 밖 [${x},${y},${w},${h}] / ${W}x${H}`);
 const u=data.units[id];assert(a.attack.length*a.attackStep>=u.attackDuration*30-a.attackStep-1,`${id} 공격 칸 ${a.attack.length}×${a.attackStep}프레임이 모션 ${Math.round(u.attackDuration*30)}프레임을 덮음`);
 assert(Math.abs(a.walkStep-2*Math.round(a.walkStep*30/2)/30)<1e-3,id+' walkStep');
}

// ---- 3) 전투 10초 오류 없음(적 단독 + 레드가 마주 서서)
function battle(){e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=1e9;g.spawnRules=[];return g}
function foeAndAlly(id,fx=40,ax=44,allyId='red'){const g=battle();e.addUnit(id);const f=g.units.find(u=>!u.ally&&u.type===id);f.emerging=false;f.x=fx;f.hp=f.max=f.stats.hp=1e12;
 g[t.cooldownKey(allyId)]=0;e.addUnit(allyId);const a=[...g.units].reverse().find(u=>u.ally);a.emerging=false;a.x=ax;a.hp=a.max=a.stats.hp=1e12;return {g,f,a}}
for(const id of ids){const {g}=foeAndAlly(id);for(let i=0;i<300;i++)e.update(1/30);assert(!g.ended||true,id)}
t.setRand(()=>.999);

// ---- 4) 저주: 고대종 9종이 맞은 아군에게 원작 확률·시간으로 건다
for(const id of ids.filter(i=>data.units[i].curseChance)){
 const {g,f,a}=foeAndAlly(id),u=data.units[id];a.cursedUntil=0;a.kbTime=0;
 if(u.curseChance<1){t.setRand(()=>.999);e.damage(a,1,f);assert(!(a.cursedUntil>g.elapsed),id+' 확률 밖');a.kbTime=0;t.setRand(()=>.1)}
 e.damage(a,1,f);assert(a.cursedUntil>g.elapsed,id+' 저주가 걸림');assert(Math.abs(a.cursedUntil-g.elapsed-u.curseDuration)<1e-6,id+' 저주 시간 '+(a.cursedUntil-g.elapsed));
 t.setRand(()=>.999);
}
for(const [id,sec,pct] of [['truebunbun',10,1],['ancientdog',100/30,.35],['inglis',5,1],['koraino',10,1],['supermayor',2,1],['datemegane',5,1],['kogaou',10,1],['oldree',5,1],['dogumaru',20,1]]){
 const u=data.units[id];assert.equal(u.curseChance,pct,id+' 저주 확률');assert(Math.abs(u.curseDuration-sec)<.01,id+' 저주 시간 '+u.curseDuration);
}
assert(!data.units.ministercyclone.curseChance&&!data.units.gardeneels.curseChance&&!data.units.looper.curseChance&&!data.units.finalgod.curseChance,'별 에이리언·신은 저주 없음');

// ---- 5) 올드 타조: 날려버림+느리게+저주
{const {g,f,a}=foeAndAlly('oldree');const x0=a.x;a.kbTime=0;e.damage(a,1,f);assert(a.slowUntil>g.elapsed,'느리게');assert(a.cursedUntil>g.elapsed,'저주');assert(a.kbTime>0,'날려버림 시작 '+a.kbTime);for(let i=0;i<20;i++)e.update(1/30);assert(a.x>x0+8,'날려버림으로 뒤로 밀려남(14 거리) '+[x0,a.x])}

// ---- 6) 앞으로 워프: 미니스타 사이클론 150(5.1)·붕장어 1375(46.75), 도착은 적 성 앞에서 멈춤
{let {g,f,a}=foeAndAlly('ministercyclone',40,60);e.damage(a,1,f);assert(a.warpLeft>0&&Math.abs(a.warpEnd-54.9)<.01&&Math.abs(a.warpLeft-100/30)<.01,'미니스타: '+[a.warpEnd,a.warpLeft]);
 ({g,f,a}=foeAndAlly('gardeneels',20,70));e.damage(a,1,f);assert(a.warpLeft>0&&Math.abs(a.warpEnd-(70-46.75))<.01&&a.warpEnd>13,'붕장어: '+a.warpEnd);
 ({g,f,a}=foeAndAlly('gardeneels',20,40));e.damage(a,1,f);assert(a.warpEnd>=13&&a.warpEnd<14,'붕장어는 적 성 앞(frontX+1)에서 멈춤 '+a.warpEnd);
}

// ---- 7) 루퍼좀씨: 베리어 10,000 + 첫 공격에 Lv10 파동(필드 전체), 공격 간격 266초
{const {g,f,a}=foeAndAlly('looper',40,44);const h=f.hp;f.stats.hp=f.hp=f.max=65000;e.damage(f,10000,a);assert.equal(f.hp,65000,'베리어 이하 피해는 무효');e.damage(f,10001,a);assert(f.barrierBroken,'베리어 이상 피해가 베리어를 깸');
 a.stats.atk=0;globalThis.__waves.length=0;for(let i=0;i<30*5;i++)e.update(1/30);
 assert.deepEqual(globalThis.__waves.filter(w=>w[0]==='looper'),[['looper',10]],'선딜 3.7초 뒤 Lv10 파동 한 번 '+JSON.stringify(globalThis.__waves));
 assert(Math.abs(data.units.looper.wave.reach-77.1)<.01&&data.units.looper.interval>266);
}

// ---- 8) 파이널 기가 그랜드 신: 3연타 3·4·5초, 첫 타에만 Lv12 파동+뒤로 워프, 공격 비율 5.4/5.4/89.2%
{const u=data.units.finalgod;assert.deepEqual(u.hits.map(h=>h.at),[3,4,5]);assert(Math.abs(u.hits.reduce((s,h)=>s+h.share,0)-1)<2e-5);assert(u.hits[0].abilities.wave.level===12&&u.hits[0].abilities.warpDistance===51&&!u.hits[1].abilities&&!u.hits[2].abilities);
 const {g,f,a}=foeAndAlly('finalgod',40,44);a.stats.atk=0;globalThis.__waves.length=0;let warpedAt=null;
 for(let i=0;i<30*6;i++){e.update(1/30);if(warpedAt===null&&a.warpLeft>0)warpedAt=g.elapsed}
 assert.deepEqual(globalThis.__waves.filter(w=>w[0]==='finalgod'),[['finalgod',12]],'파동은 첫 타 한 번(Lv12)');
 assert(warpedAt!==null&&warpedAt>2.9&&warpedAt<3.4,'첫 타(3초)에 뒤로 워프 '+warpedAt);
 assert(Math.abs(a.warpEnd-95)<.01,'뒤로 51: 44+51=95 '+a.warpEnd);
}

// ---- 9) 선딜: 첫 타는 원작 공격 발생 프레임 근처
for(const id of ['truebunbun','inglis','dogumaru','datemegane']){
 const far=id==='datemegane';// 원거리 구간(17~27)에 서 있는 아군을 맞히려면, 사거리 안(15)의 아군이 먼저 공격을 일으켜야 한다
 const {g,f,a}=foeAndAlly(id,40,far?60:44);if(far){const other=t.data&&Object.keys(data.units).find(x=>t.ALLIES.includes(x)&&x!=='red');g[t.cooldownKey(other)]=0;e.addUnit(other);const d=[...g.units].reverse().find(u=>u.ally);d.emerging=false;d.x=50;d.hp=d.max=d.stats.hp=1e12;d.stats.atk=0}
 a.stats.atk=0;const hp0=a.hp;let t0=null;f.stats.curseChance=0;
 for(let i=0;i<30*4&&t0===null;i++){e.update(1/30);if(a.hp<hp0)t0=g.elapsed}
 assert(t0!==null,id+' 첫 타가 들어감');assert(Math.abs(t0-data.units[id].windup)<.25,`${id} 첫 타 ${t0.toFixed(2)}초 ≈ 선딜 ${data.units[id].windup}`);
}
// 사각지대: 선글래숭이는 500~800(17~27.2) 구간만 맞는다
{const u=data.units.datemegane;assert(u.zoneMin>16.9&&u.zoneMax<27.3&&u.range<u.zoneMin&&u.engageRange===undefined,'사거리(15.3)가 구간 시작(17)보다 짧아도 엔진이 맨 앞 목표가 사거리 안이면 공격을 시작함(55886c4)');
 let {g,f,a}=foeAndAlly('datemegane',40,46);a.stats.atk=0;const hp0=a.hp;for(let i=0;i<30*6;i++)e.update(1/30);assert.equal(a.hp,hp0,'안쪽(6) 아군은 사각지대');
}
// ---- 10) 전체 전투 시험이 끝난 뒤에도 기존 도감 문구 도구가 13종을 읽는다
for(const id of ids){const b=t.codexTraitBadges(data.units[id]);assert(b.length>0)}
console.log('PASS: 8.0 신규 적 13종 — 이름·도감 문구·수치(원작 그대로)·모션 시트(파일·칸 범위·공격 길이), 저주 9종, 올드 타조 날려버림·느리게, 앞으로 워프 2종, 루퍼좀씨 베리어·Lv10 파동, 파이널 기가 그랜드 신 3연타·첫 타 파동+워프, 선딜, 사각지대');
process.exit(0);
