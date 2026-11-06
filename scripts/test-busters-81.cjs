// 8.2 신규 울슈레 애프리·메리(busters-81-allies.js): 그림이 없으면 등록하지 않고, 있으면(BUSTERS81_DRAFT=1은 라이트 레인보우 그림을 빌림)
// 계획 수치·사거리·사각지대·속성 대응·정지·저주·킬러 능력이 맞고 기존 형태는 그대로인지 본다.
const assert=require('node:assert/strict'),fs=require('fs'),make=require('./full-harness.cjs');
const SETUP='globalThis.__b={resolveAttack,fire,damage,setRand:f=>{Math.random=f},data,ALLIES,deadZone,hasTrait,ROLES,gradeOf,atlases:NEW_ATLASES,profiles:PROFILE_ART};';
function engine(env){const keep={...process.env};for(const k of Object.keys(env)){if(env[k]===undefined)delete process.env[k];else process.env[k]=env[k]}
 try{const e=make({extraSetup:SETUP});const h=globalThis.__b;delete globalThis.__b;return {e,h}}finally{for(const k of Object.keys(env)){if(keep[k]===undefined)delete process.env[k];else process.env[k]=keep[k]}}}
// ---- 1) 그림이 없으면 등록하지 않는다(실제 게임·덱·뽑기에 나오지 않음). 기존 형태는 어떤 경우에도 그대로.
const base=engine({BUSTERS81_DRAFT:undefined,HARNESS_SKIP:'busters-81-allies.js'}),none=engine({BUSTERS81_DRAFT:undefined,HARNESS_SKIP:'assets/busters-81-motion/motion-atlases.js'}),{e,h}=engine({BUSTERS81_DRAFT:undefined,HARNESS_SKIP:undefined});
assert(!none.e.units.apricot&&!none.e.units.marigold,'그림이 없으면 등록하지 않음');assert.equal(none.e.roster.length,base.e.roster.length);
assert.equal(e.roster.length,base.e.roster.length+2);for(const id of ['apricot','marigold'])assert(e.roster.includes(id)&&e.units[id],id);
let same=0;for(const id of base.e.roster)for(const form of [1,2]){e.setProfile({level:30,forms:{[id]:form}});base.e.setProfile({level:30,forms:{[id]:form}});assert.deepEqual(e.unitStats(id),base.e.unitStats(id),id+' '+form+'진 수치가 바뀜');same++}
// ---- 2) 계획 수치(Lv.30·2진·보물 완성)
const SPEC={apricot:{hp:300000,dps:28000,interval:2.5,cost:4000,wait:40,freeze:3.5,traits:['ancient','zombie'],range:490},marigold:{hp:220000,dps:40000,interval:3,cost:4500,wait:45,freeze:4,traits:['metal','floating'],range:900}};
e.setProfile({level:30});const S={};
for(const [id,s]of Object.entries(SPEC)){const d=S[id]=e.unitStats(id);assert.equal(e.gradeOf(id),'uber');assert(Math.abs(d.hp-s.hp)<=3,id+' 체력 '+d.hp);assert(Math.abs(d.atk/d.interval-s.dps)<=3,id+' DPS');assert.equal(d.interval,s.interval);assert.equal(d.cooldown,s.wait);assert.equal(d.freezeChance,1);assert.equal(d.freezeDuration,s.freeze);assert(d.freezeDuration>d.interval,id+' 연속 정지');assert.deepEqual(d.massiveVs,s.traits);assert.deepEqual(d.statusVs,s.traits);assert.equal(Math.round(d.range/.034),s.range,id+' 사거리');assert.equal(d.flatCost,true);assert.equal(d.knockbacks,3);assert(d.cost>0)}
// 그림: 1·2진 시트·프로필 파일이 있고, 공격 프레임이 공격 모션 시간(선딜+후딜) 30fps와 같은 길이다
for(const id of ['apricot','marigold']){const d=h.data.units[id];for(const a of [h.atlases[id],h.atlases[id].evolved]){assert(fs.existsSync(a.sheet.split('?')[0]),a.sheet);assert.equal(a.attack.length,Math.round(d.attackDuration*30),id+' 공격 프레임');assert(a.walk.length>=4&&a.hurt.length>=1,id+' 걷기·피격')}for(const f of h.profiles[id])assert(fs.existsSync(f.split('?')[0]),f)}
assert.deepEqual(h.data.units.apricot.cost,4000);assert.deepEqual(h.data.units.marigold.cost,4500);
// ---- 3) 애프리: 범위·저주·저주 무효·좀비 킬러, 사각지대 없음
{const a=S.apricot;assert(a.area&&!a.blindSpot&&a.zombieKiller&&a.immune.curse);assert.equal(a.curseChance,1);assert.equal(a.curseDuration,4);assert(a.curseDuration>a.interval,'저주도 연속');assert.equal(a.attackClass,'범위')}
// ---- 4) 메리: 초원거리 개체, 사각지대, 메탈 킬러, 워프 무효. 현재 가장 먼 아군
{const m=S.marigold;assert(!m.area&&m.blindSpot&&m.metalKiller===.75&&m.immune.warp);assert.equal(m.attackClass,'원거리');assert.equal(Math.round(h.deadZone({ally:true,type:'marigold',stats:m})/.034),225,'사각지대 = 사거리의 25%');
 assert(/초원거리/.test(h.ROLES.marigold));let longest=0;for(const id of base.e.roster){for(const f of [1,2]){base.e.setProfile({level:30,forms:{[id]:f}});const s=base.e.unitStats(id);longest=Math.max(longest,s.range,s.zoneMax||0)}}assert(m.range>longest,'메리 사거리 '+m.range/.034+' > 기존 최장 '+longest/.034)}
// ---- 5) 실제 전투
const ids=Object.keys(h.data.units).filter(id=>!h.ALLIES.includes(id));
const foeOf=trait=>ids.filter(id=>!h.data.units[id].barrier&&(h.data.units[id].traits||[h.data.units[id].trait]).includes(trait)).sort((a,b)=>h.data.units[a].hp-h.data.units[b].hp)[0];
const F={ancient:foeOf('ancient'),zombie:foeOf('zombie'),metal:foeOf('metal'),floating:foeOf('floating'),red:foeOf('red')};for(const [k,v]of Object.entries(F))assert(v,k);
function arena(id,foes){e.reset();const g=e.getGame();g.running=true;g.paused=false;g.tutorial=99;g.money=1e9;g.spawnRules=[];e.addUnit(id);const u=g.units.find(v=>v.ally&&v.type===id);u.x=70;u.emerging=false;u.hp=u.max=1e12;u.stats.knockbacks=1;
 const list=foes.map(([type,x])=>{e.addUnit(type);const v=g.units.at(-1);v.x=x;v.emerging=false;v.hp=v.max=1e12;v.stats={...v.stats,atk:0,speed:0,knockbacks:1,wave:null};return v});return {g,u,foes:list}}
h.setRand(()=>0);
// 애프리: 고대종·좀비 두 마리를 한 번에 정지+저주, 빨간 적은 영향 없음, 연속 적중하면 저주가 끊기지 않음
{const {g,u,foes:[anc,zom,red]}=arena('apricot',[[F.ancient,66],[F.zombie,65],[F.red,64]]);h.fire(u,anc);
 for(const v of [anc,zom]){assert(v.hp<1e12,'초데미지');assert(v.freezeUntil>g.elapsed+3.4,'정지');assert(v.cursedUntil>g.elapsed+3.9&&v.cursedUntil<=g.elapsed+4+1e-9,'저주 4초 '+(v.cursedUntil-g.elapsed))}
 assert(red.hp<1e12&&1e12-red.hp<(1e12-anc.hp)/2,'빨간 적은 보통 피해만');assert(!red.cursedUntil||red.cursedUntil<=g.elapsed);assert(!(red.freezeUntil>g.elapsed));
 u.atkCd=0;for(let n=0;n<360;n++){e.update(1/30);if(g.elapsed>.8)for(const v of [anc,zom])assert(v.freezeUntil>g.elapsed&&v.cursedUntil>g.elapsed,'연속 정지·저주 '+n)}}
// 저주 무효: 같은 적의 저주가 레드는 걸리고 애프리는 안 걸린다
{const {g,u,foes:[anc]}=arena('apricot',[[F.ancient,66]]);anc.stats={...anc.stats,curseChance:1,curseDuration:5};h.damage(u,1,anc);assert(!(u.cursedUntil>g.elapsed),'애프리는 저주 무효');
 e.addUnit('red');const r=g.units.at(-1);r.emerging=false;r.hp=r.max=1e12;h.damage(r,1,anc);assert(r.cursedUntil>g.elapsed,'대조: 레드는 저주에 걸림')}
// 메리: 한 마리만 맞히고, 메탈·떠있는 적을 정지, 빨간 적은 정지·초데미지 없음, 메탈 킬러, 워프 무효
{const {g,u,foes:[met,flo]}=arena('marigold',[[F.metal,45],[F.floating,44]]);h.resolveAttack(u,met);assert(met.hp<1e12);assert.equal(flo.hp,1e12,'개체 공격');assert(met.freezeUntil>g.elapsed+3.9,'메탈 정지 '+(met.freezeUntil-g.elapsed));
 h.resolveAttack(u,flo);assert(flo.hp<1e12&&flo.freezeUntil>g.elapsed+3.9,'떠있는 적 정지');
 const {g:g2,u:u2,foes:[red]}=arena('marigold',[[F.red,45]]);h.resolveAttack(u2,red);assert(!(red.freezeUntil>g2.elapsed),'빨간 적은 정지 안 됨');
 // 메탈 킬러: 비크리티컬 메탈 타격 = 1 + 남은 체력의 25%(올림)
 const {u:u3,foes:[m3]}=arena('marigold',[[F.metal,45]]);m3.hp=m3.max=100000;m3.stats.immune={};h.damage(m3,u3.stats.atk,u3);const loss=100000-m3.hp;assert.equal(loss,1+Math.ceil(100000*.75),'메탈 킬러 '+loss);
 // 워프 무효
 const w=arena('marigold',[['captainmogu',60]]);const wv=w.foes[0];wv.stats.warpChance=1;wv.stats.warpDistance=8.5;wv.stats.warpDuration=1;h.damage(w.u,1,wv);assert(!w.u.warpLeft,'워프 무효')}
// 사각지대: 5칸 앞(225 안쪽)의 적은 못 맞히고 25칸 앞 적은 맞힌다. 메리 사거리 30.6
{const near=arena('marigold',[[F.metal,65]]);near.u.stats.speed=0;for(let n=0;n<240;n++)e.update(1/30);assert.equal(near.foes[0].hp,1e12,'사각지대 안은 못 맞힘');
 const far=arena('marigold',[[F.metal,45]]);far.u.stats.speed=0;for(let n=0;n<240;n++)e.update(1/30);assert(far.foes[0].hp<1e12,'멀리 있는 적은 맞힘');
 const edge=arena('marigold',[[F.metal,70-29]]);edge.u.stats.speed=0;for(let n=0;n<240;n++)e.update(1/30);assert(edge.foes[0].hp<1e12,'사거리 끝(29칸)에서도 맞힘')}
console.log('PASS: 8.2 신규 울슈레 애프리·메리 — 그림이 없으면 미등록, 기존 '+same+'개 형태 불변, 계획 수치·사거리(490/900)·사각지대 225, 애프리 범위 정지+4초 저주·저주 무효·연속 유지, 메리 개체 정지·메탈 킬러·워프 무효·초원거리 적중');
process.exit(0);
