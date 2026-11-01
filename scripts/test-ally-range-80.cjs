const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const source=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(source.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const before=make({addons:addons.filter(f=>f!=='ally-range-80.js')}),e=make({extraSetup:'globalThis.__ranges={setForm,resolveAttack,catRange,allyRange80Factor,allyRange80Round};'}),h=globalThis.__ranges;delete globalThis.__ranges;
const rows=[],distances=['range','engageRange','zoneMin','zoneMax','backRange','condPierceDist'];
const stripped=s=>Object.fromEntries(Object.entries(s).filter(([k])=>!distances.includes(k)&&!['hits','damageTiers'].includes(k)));
const nk=n=>Math.round(n/.034),rounded=n=>Math.abs(n/.034/10-Math.round(n/.034/10))<1e-8;
for(const form of [1,2,3])for(const id of e.roster){
 const p={level:30,trueForms:form===3?[id]:[],forms:form===3?{}:{[id]:form}};before.setProfile(p);e.setProfile(p);const old=before.unitStats(id),s=e.unitStats(id);if(form===3&&!s.trueForm||form===2&&!s.evolved)continue;
 const band=Math.round(old.range/.034),factor=band<=400?.9:band<=500?.8:band<=800?.7:.6;
 const expected=id==='ruby'&&form===3?300:Math.max(10,Math.floor(old.range/.034*factor/10+1e-8)*10);
 assert.equal(nk(s.range),expected,id+' '+form);assert(s.range<old.range);assert(rounded(s.range));
 assert.deepEqual(stripped(s),stripped(old),id+' stats except distance');
 for(const k of distances)if(s[k]!==undefined){assert(rounded(s[k]),id+' '+k);assert(s[k]<=old[k]+1e-9);}
 if(s.damageTiers){assert.deepEqual(s.damageTiers.map(t=>t.dmg),old.damageTiers.map(t=>t.dmg));for(let n=1;n<s.damageTiers.length;n++)assert(s.damageTiers[n].max>=s.damageTiers[n-1].max);}
 if(s.hits)for(let n=0;n<s.hits.length;n++){assert.equal(s.hits[n].at,old.hits[n].at);assert.equal(s.hits[n].share,old.hits[n].share);if(s.hits[n].abilities?.range!==undefined)assert(rounded(s.hits[n].abilities.range));}
 assert.deepEqual(e.unitStats(id),s,'repeat must not apply twice');rows.push({id,form,before:nk(old.range),after:nk(s.range),factor});
}
assert.equal(rows.length,281);assert.deepEqual(e.units,before.units,'base unit definitions not mutated');
for(const id of Object.keys(e.units).filter(id=>!e.roster.includes(id)))assert.deepEqual(e.unitStats(id),before.unitStats(id),'enemy unchanged '+id);
for(const [n,want]of [[400,360],[401,320],[500,400],[501,350],[800,560],[801,480]])assert.equal(nk(h.allyRange80Round(n*.034,h.allyRange80Factor(n*.034))),want,'band '+n);
// A future Ruby third form keeps the separately approved 300 range.
const future=make({extraSetup:"NEW_ATLASES.ruby.true=NEW_ATLASES.verdigris.true;TRUE_FORM_BONUS.ruby={};"});future.setProfile({trueForms:['ruby']});assert.equal(nk(future.unitStats('ruby').range),300);
// Actual direct attacks stop at the newly reduced range, not the old range.
for(const id of ['red','ruby','moss','heliotrope']){
 e.setProfile({forms:{[id]:2}});e.reset();const g=e.getGame();g.running=true;g.tutorial=99;g.money=1e9;g.spawnRules=[];e.addUnit(id);e.addUnit('dog');const [u,v]=g.units;u.x=70;u.emerging=false;v.emerging=false;v.hp=v.max=1e9;v.kbTime=0;u.stats.critChance=0;u.stats.savageChance=0;
 const reach=u.stats.zoneMax??u.stats.range,old=before.unitStats(id),oldReach=old.zoneMax??old.range;
 v.x=u.x-(reach+oldReach)/2;h.resolveAttack(u,v);assert.equal(v.hp,1e9,id+' old-only distance misses');
 v.x=u.x-reach+.01;h.resolveAttack(u,v);assert(v.hp<1e9,id+' new distance hits');
}
fs.mkdirSync('docs/simulations',{recursive:true});fs.writeFileSync('docs/simulations/ally-range-80-2026-10-31.json',JSON.stringify({scope:'allies only; current 281 forms; Lv30',rounding:'Battle Cats distance, ten-unit floor',bands:[{max:400,factor:.9},{max:500,factor:.8},{max:800,factor:.7},{max:null,factor:.6}],rows,checks:['281 strict reductions','all direct ranges multiples of ten','other stats unchanged','all enemies unchanged','base definitions not mutated','no compounded scaling','band boundaries','future Ruby third 300','real direct hit boundaries']},null,2));
console.log('PASS 281 ally forms, band boundaries, ten-unit ranges, unchanged enemies/stats, real attack reach');process.exit(0);
