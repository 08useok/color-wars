const fs=require('fs'),path=require('path'),assert=require('assert/strict'),crypto=require('crypto');
const {BANDS,bandOf,labels,qualifiedX}=require('./tier-bands.cjs');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'docs/simulations/underrated-2026-10-16');
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n+'.json'))),M=read('manifest'),A=read('analysis');
assert.equal(M.roster.length,new Set(M.roster).size);assert.equal(M.core.filter(c=>M.neutral.includes(c)).length,0);
for(const [score,want]of [[.9,'OP'],[.79,'SSS'],[.72,'SS'],[.6,'S'],[.5,'A'],[.4,'B'],[.3,'C'],[.22,'D'],[.15,'E'],[.08,'F'],[.046,'F'],[0,'F']])assert.equal(bandOf(score,'raspberry'),want);
qualifiedX.add('__proven');assert.equal(bandOf(.079,'__proven'),'X');assert.equal(bandOf(.08,'__proven'),'F');qualifiedX.clear();
const old=require('../docs/simulations/all-ally-tier-2026-10-16.json'),lab=labels(old.res);
assert.equal(Object.keys(lab).length,M.roster.length);assert(!Object.values(lab).some(t=>/^OP[+-]|^X[+-]/.test(t)));
for(const [band]of BANDS){const a=M.roster.filter(c=>bandOf(old.res[c].comp,c)===band);if(['OP','X'].includes(band))continue;assert.equal(a.filter(c=>lab[c]===band+'+').length,Math.round(a.length/3));assert.equal(a.filter(c=>lab[c]===band+'-').length,Math.round(a.length/3))}
for(const phase of ['preflight','general','neutral','special']){const d=read(phase);assert.equal(d.fingerprint,M.fingerprint);assert.equal(d.meta.length,d.results.length);const keys=new Set();for(let k=0;k<d.meta.length;k++){const m=d.meta[k],r=d.results[k],key=JSON.stringify(m);assert(!keys.has(key),'duplicate trial '+key);keys.add(key);assert(Number.isFinite(r.perf)&&r.perf>=0&&r.perf<=2);assert.equal(typeof r.win,'boolean')}const groups=new Map();for(const m of d.meta){const key=[m.m,m.c,m.kind].join('|');groups.set(key,(groups.get(key)||0)+1)}for(const n of groups.values())assert.equal(n,12,'missing seed or policy')}
const selection=read('selection');for(const [t,g]of Object.entries(selection)){assert(g.maps.length<=12);for(const m of g.maps){assert(m.share>=.5);assert(m.crown!==4);assert(m.refWins>0&&m.refWins<m.refN)}}
const specialMaps=new Set(Object.values(selection).flatMap(g=>g.maps.map(m=>m.m)));
assert.equal(read('general').results.length,M.maps.length*12*(1+M.roster.length+M.forms.length));
assert.equal(read('neutral').results.length,M.maps.length*12*(1+M.roster.length));
assert.equal(read('special').results.length,specialMaps.size*12*(1+M.roster.length));
for(const phase of ['preflight','general','neutral','special'])for(const m of read(phase).meta){assert(M.seeds.includes(m.seed));assert(M.policies.includes(m.policy));assert(m.c==='__ref'||M.roster.includes(m.c));if(m.kind==='true')assert(M.forms.includes(m.c))}
for(const c of M.forms){assert(M.stats[c].true.trueForm);assert(!M.stats[c].normal.trueForm);assert(A.trueResults[c]);const t=A.trueResults[c];assert.equal(t.promoted,BANDS.findIndex(([b])=>b===t.baseBand)-BANDS.findIndex(([b])=>b===t.band)>=1)}
for(const c of A.candidates){assert(A.originalRanks[c]>M.roster.length/2);assert(Object.values(A.special).some(g=>g.res[c]?.pct>=.9))}
for(const c of A.supportedCandidates)assert(Object.values(A.special).some(g=>g.maps.length>=8&&g.res[c]?.pct>=.9&&g.res[c].gain>.004));
for(const f of A.flips){assert(f.auto*f.smart2<0);assert(Math.abs(f.auto)>.004&&Math.abs(f.smart2)>.004);assert.equal(f.cost,M.stats[f.c].cost)}
for(const [file,hash]of Object.entries(M.hashes))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),hash,'input drift '+file);
assert.equal(read('completion').changed.length,0);
const document=fs.readFileSync(path.join(root,'docs/모든-아군-티어표-2026-10-16.md'),'utf8');
for(const c of M.roster)assert(document.includes(`|${lab[c]}|${A.originalRanks[c]}|${M.stats[c].name}|`),'missing tier row '+c);
assert(document.includes('|**X**|없음'));
assert(document.includes('3진 저평가'));
console.log('PASS: tier boundaries/signs, X evidence gate, complete paired seeds/policies, true forms, specialist eligibility, policy reversals and unchanged gameplay inputs.');
process.exit(0);
