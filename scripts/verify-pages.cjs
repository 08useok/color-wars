const cp=require('child_process'),assert=require('node:assert/strict');
const base=process.argv[2]||'https://08useok.github.io/color-wars/',commit=cp.execFileSync('git',['rev-parse','HEAD']).toString().trim();
(async()=>{
 const r=await fetch(new URL('_deployment.json?commit='+commit,base),{cache:'no-store'});assert(r.ok,'Deployment manifest HTTP '+r.status);const manifest=await r.json();assert.equal(manifest.commit,commit,'Site must serve this commit');
 for(const file of ['red-battle-doge.html','notice.js','cannon-loadout.js','cannon-effects.js','zombie-original-motion.js','assets/cannon-effects/thunder.webp','assets/anim_zbore.webp']){const response=await fetch(new URL(file+'?commit='+commit,base),{cache:'no-store'});assert(response.ok,file+' HTTP '+response.status);if(file==='notice.js')assert((await response.text()).includes("GAME_VERSION='"+manifest.version+"'"));else await response.arrayBuffer();}
 console.log('PASS online deployment',manifest);
})().catch(e=>{console.error(e);process.exitCode=1;});
