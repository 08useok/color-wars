const assert=require('node:assert/strict'),source=require('../docs/simulations/tier-arena-speed-grades-2026-10-30.json'),{makeScale,classify}=require('./detailed-tier-scale.cjs'),s=makeScale(source.rows);
assert.equal(s.entries.length,114);assert.equal(new Set(s.entries.map(r=>r.label)).size,114);assert.equal(new Set(s.entries.map(r=>r.id)).size,114);
for(const [score,want]of [[1,'OP'],[.9,'OP'],[.599,'A++'],[.576,'A--'],[.574,'B++'],[.201,'P--'],[.199,'Q+'],[.159,'R'],[.155,'R-'],[.137,'하위 S'],[.001,'X-'],[0,'X-']])assert.equal(classify(score,s),want);
let last=-1;for(let i=100000;i>=0;i--){const label=classify(i/100000,s),index=s.entries.findIndex(r=>r.label===label);assert(index>=last,'monotonic grade order');last=index;}
for(const r of source.rows)if(!r.coreMember&&r.score>=.6)assert.equal(classify(r.score,s),r.tier);
const output=require('../docs/simulations/tier-arena-detailed-grades-2026-10-31.json');assert.equal(output.rows.length,source.rows.length+9);for(const r of source.rows){const n=output.rows.find(v=>v.id===r.id&&v.form===r.form);assert(n);assert.equal(n.score,r.score);}
console.log('PASS 114 unique ordered labels, S disambiguation, boundaries, 100001 monotonic scores, preserved upper tiers and all 266 existing scores; 9 release forms added');
