// Sequential, resumable 14-worker audit. Never changes gameplay files.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {runJobs}=require('./sim-pool.cjs'),mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'docs/simulations/underrated-2026-10-16');fs.mkdirSync(dir,{recursive:true});
const e=mk(),B=require('../docs/simulations/benchmark-tier-2026-10-16.json');
const sweep=require('../docs/simulations/stage-sweep-2026-10-13.json');
const core=B.core9,neutral=['red','white','brick','moss','navy','lava','prism','night','emerald'];
const roster=e.roster,seeds=Array.from({length:6},(_,i)=>i+1),policies=['auto','smart2'];
const traits=['zombie','metal','alien','floating','red','black','angel','wave'];
const files=['game.js','clover-variant-atlases.js','clover-variant-integration.js','rank.js','catfruit.js','gold-beige-3.js','subspecies.js','stage-tuning.js','zombie.js','zombie-burrow.js','amber.js','ubers-yellow.js','colors-motion-atlases.js','ubers-green.js','ubers-blue.js','ubers-turquoise.js','uber-series.js','cannon.js','scripts/full-harness.cjs','scripts/sim-pool.cjs'];
const hashes=Object.fromEntries(files.map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')]));
const fingerprint=crypto.createHash('sha256').update(JSON.stringify(hashes)).digest('hex');
const save=(name,v)=>fs.writeFileSync(path.join(dir,name+'.json'),JSON.stringify(v));
const perf=(r,i)=>r.win?2-Math.min(300,r.seconds)/300:Math.max(0,Math.min(.95,1-r.enemyHp/e.stageList[i].hp));
async function phase(name,jobs,meta){
 const signature=crypto.createHash('sha256').update(JSON.stringify(jobs)).digest('hex');
 const file=path.join(dir,name+'.json');if(fs.existsSync(file)){const d=JSON.parse(fs.readFileSync(file));if(d.fingerprint!==fingerprint||d.signature&&d.signature!==signature||JSON.stringify(d.meta)!==JSON.stringify(meta))throw Error('Stale checkpoint '+name);console.log('reuse',name,d.results.length);return d}
 console.log('START',name,jobs.length,new Date().toISOString());let last=0,t=Date.now();
 const results=await runJobs(jobs,{chunk:24,onProgress:(d,n)=>{if(d-last>=1000||d===n){last=d;console.log(name,d+'/'+n,Math.round((Date.now()-t)/1000)+'s')}}});
 const errors=results.filter(r=>r.error);if(errors.length)throw Error(JSON.stringify(errors.slice(0,3)));
 const d={fingerprint,signature,meta,results:results.map((r,k)=>({win:r.win,seconds:r.seconds,enemyHp:r.enemyHp,perf:perf(r,jobs[k].i)}))};save(name,d);return d;
}
function append(jobs,meta,m,deck,kind,c,form=false){const [i,crown]=m.split(':').map(Number);for(const seed of seeds)for(const policy of policies){jobs.push({i,crown,deck,seed,policy,profile:{level:30,noSuppress:false,trueForms:form?[c]:[]}});meta.push({m,kind,c,seed,policy})}}
(async()=>{
 e.setProfile({trueFormsAll:true});const forms=roster.filter(t=>!e.units[t].noEvolve&&e.unitStats(t).trueForm);e.setProfile({noSuppress:false});
 const stats={};for(const c of roster){e.setProfile({trueForms:[]});const normal=e.unitStats(c);e.setProfile({trueForms:[c]});stats[c]={name:e.names[c],grade:e.gradeOf(c),cost:e.units[c].cost,normal,true:e.unitStats(c),hasTrue:forms.includes(c)}}e.setProfile({noSuppress:false});
 save('manifest',{fingerprint,hashes,created:new Date().toISOString(),roster,core,neutral,seeds,policies,maps:B.maps,forms,stats});
 // Threat proxy follows the requested sum per spawn rule, hp*atk*magnification (linear), not DPS or count prediction.
 const conditions={};for(const r of sweep.rows)if(r.crown!==4){const m=r.i+':'+r.crown;const d=conditions[m]??={m,i:r.i,crown:r.crown,sweep:[]};d.sweep.push({deck:r.deck,policy:r.policy,win:r.win})}
 const eligible={};for(const trait of traits){eligible[trait]=[];for(const c of Object.values(conditions)){let all=0,part=0;for(const s of e.spawnList[c.i]||[]){const u=e.units[s.type];const threat=u.hp*u.atk*(s.mag??100)/100;all+=threat;if(trait==='wave'?!!u.wave:[u.trait,...(u.traits||[])].includes(trait))part+=threat}if(all>0&&part/all>=.5)eligible[trait].push({m:c.m,i:c.i,crown:c.crown,share:part/all,name:e.stageList[c.i].name,sweepMixed:c.sweep.some(r=>r.win)&&c.sweep.some(r=>!r.win)})}}
 save('eligible',eligible);
 const preMaps=[...new Set(Object.values(eligible).flat().map(c=>c.m))];let jobs=[],meta=[];for(const m of preMaps)append(jobs,meta,m,core,'ref','__ref');
 const pre=await phase('preflight',jobs,meta);const mixed=new Map();pre.meta.forEach((mt,k)=>{const a=mixed.get(mt.m)||[];a.push(pre.results[k]);mixed.set(mt.m,a)});
 const selected={};for(const trait of traits){const possible=eligible[trait].filter(c=>{const a=mixed.get(c.m);return a.some(r=>r.win)&&a.some(r=>!r.win)});possible.sort((a,b)=>{const rate=c=>{const v=mixed.get(c.m);return Math.abs(v.filter(r=>r.win).length/v.length-.5)};return rate(a)-rate(b)||b.share-a.share||a.i-b.i||a.crown-b.crown});const chosen=[];for(const c of possible)if(!chosen.some(x=>x.i===c.i))chosen.push(c);for(const c of possible)if(chosen.length<8&&!chosen.includes(c))chosen.push(c);selected[trait]={eligible:eligible[trait].length,mixed:possible.length,maps:chosen.slice(0,10).map(c=>({...c,refWins:mixed.get(c.m).filter(r=>r.win).length,refN:12}))}}
 save('selection',selected);console.log('selection',JSON.stringify(Object.fromEntries(traits.map(t=>[t,selected[t].maps.length]))));
 jobs=[];meta=[];for(const m of B.maps){append(jobs,meta,m,core,'ref','__ref');for(const c of roster){append(jobs,meta,m,core.includes(c)?core.filter(t=>t!==c):[...core,c],'base',c);if(forms.includes(c))append(jobs,meta,m,core.includes(c)?core:[...core,c],'true',c,true)}}await phase('general',jobs,meta);
 jobs=[];meta=[];for(const m of B.maps){append(jobs,meta,m,neutral,'ref','__ref');for(const c of roster)append(jobs,meta,m,neutral.includes(c)?neutral.filter(t=>t!==c):[...neutral,c],'neutral',c)}await phase('neutral',jobs,meta);
 const specMaps=[...new Set(Object.values(selected).flatMap(g=>g.maps.map(c=>c.m)))];jobs=[];meta=[];for(const m of specMaps){append(jobs,meta,m,core,'ref','__ref');for(const c of roster)append(jobs,meta,m,core.includes(c)?core.filter(t=>t!==c):[...core,c],'special',c)}await phase('special',jobs,meta);
 const changed=files.filter(f=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')!==hashes[f]);save('completion',{fingerprint,completed:new Date().toISOString(),changed});if(changed.length)throw Error('Gameplay files changed during run: '+changed.join(','));console.log('COMPLETE');process.exit(0);
})().catch(e=>{console.error(e.stack);process.exit(1)});
