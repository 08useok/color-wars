const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto'),make=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'red-battle-doge.html'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1].split('?')[0]);
assert.equal(new Set(scripts).size,scripts.length,'duplicate script imports');
for(const file of scripts){assert(fs.existsSync(path.join(root,file)),file);new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});}
new vm.Script(scripts.map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n'),'entry scripts');
const before=(a,b)=>assert(scripts.indexOf(a)>=0&&scripts.indexOf(a)<scripts.indexOf(b),a+' before '+b);
before('assets/basic-third83-motion/motion-atlases.js','basic-third83.js');before('puffington.js','true-legend83.js');before('true-legend83.js','progress-ready.js');before('march-yellow.js','clionel-advent.js');
const notice=fs.readFileSync(path.join(root,'notice.js'),'utf8');assert(notice.includes("const GAME_VERSION='8.3.0'"));assert(notice.includes('신레전드 0~18장'));
const e=make({extraSetup:'globalThis.__release83={atlas:NEW_ATLASES,profiles:PROFILE_ART,thirdProfiles:PROFILE_ART_TRUE,event:CLIONEL_EVENT};'}),h=globalThis.__release83;delete globalThis.__release83;
const added=['assets/march-yellow-motion/motion-atlases.js','march-yellow.js','clionel-atlas.js','clionel-advent.js','puffington-atlas.js','puffington.js','true-legend83.js','assets/basic-third83-motion/motion-atlases.js','basic-third83.js'];
const old=make({addons:make.DEFAULT_ADDONS.filter(f=>!added.includes(f))});
assert.equal(e.stageList.length,old.stageList.length+19);assert.deepEqual(e.stageList.slice(0,old.stageList.length),old.stageList,'previous stage IDs');
for(let k=0;k<415;k++)assert.equal(e.legendIdx(k),old.legendIdx(k),'legend key '+k);
for(const [i,rules]of Object.entries(old.spawnList))assert.deepEqual(e.spawnList[i],rules,'previous spawns '+i);
const ids=['red','green','blue','orange','yellow','purple','pink','cyan'],assets=new Set();
for(const id of ids){assert(h.atlas[id].true);assets.add(h.atlas[id].true.sheet);assets.add(h.thirdProfiles[id]);}
for(const a of [h.atlas.marchyellow,h.atlas.marchyellow.evolved,h.atlas.clionel,h.atlas.puffington])assets.add(a.sheet);
for(const p of h.profiles.marchyellow)assets.add(p);
assets.add('assets/march-yellow-motion/flag.webp');
const files=[...assets].map(p=>p.split('?')[0]).sort();for(const file of files)assert(fs.statSync(path.join(root,file)).size>0,file);
for(const r of Object.values(e.spawnList))for(const spawn of r)assert(e.units[spawn.type],'unknown spawn '+spawn.type);
const runtime=[...new Set([...added,'basic-third83-reviews.js','march-yellow-review.js','notice.js','red-battle-doge.html',...files])].sort();
const report={version:'8.3.0',date:'2026-11-09',status:'local-ready-not-committed',scripts:scripts.length,assets:files.length,stages:e.stageList.length,previousStages:old.stageList.length,legacyStageIdsPreserved:true,legacyLegendKeysPreserved:true,runtimeFiles:runtime.map(file=>({file,bytes:fs.statSync(path.join(root,file)).size,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex')}))};
if(fs.existsSync(path.join(root,'docs/simulations/stages83-crowns-2026-11-09.json'))){
 const review=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/stages83-crowns-2026-11-09.json'),'utf8'));
 report.crownReview={conditions:review.rows.length,clearedAtLevel30:review.rows.filter(r=>r.wins>0).length,unconfirmedAtLevel30:review.rows.filter(r=>!r.wins).map(({k,crown,name})=>({k,crown,name}))};
}
if(fs.existsSync(path.join(root,'docs/simulations/stages83-crown4-levels-2026-11-09.json'))){
 const review=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/stages83-crown4-levels-2026-11-09.json'),'utf8'));
 report.higherLevelClear=review.results.filter(r=>r.win).map(({level,name,policy,seed,seconds})=>({level,deck:name,policy,seed,seconds}));
}
fs.mkdirSync(path.join(root,'docs/releases'),{recursive:true});fs.writeFileSync(path.join(root,'docs/releases/8.3.0-local-readiness.json'),JSON.stringify(report,null,2));
console.log('PASS release83:',scripts.length,'entry scripts compile,',files.length,'new runtime assets,',e.stageList.length,'stages;',old.stageList.length,'previous stage IDs and 415 legend keys preserved');
process.exit(0);
