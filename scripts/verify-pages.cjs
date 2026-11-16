const cp=require('child_process'),assert=require('node:assert/strict');
const {publishedResources}=require('./deployment-resources.cjs');
async function verifyDeployment({base,commit,version,fetchImpl=fetch}){
 const r=await fetchImpl(new URL('_deployment.json?commit='+commit,base),{cache:'no-store'});assert(r.ok,'Deployment manifest HTTP '+r.status);const manifest=await r.json();assert.equal(manifest.commit,commit,'Site must serve this commit');assert.equal(manifest.version,version,'Site must serve the committed release version');
 for(const file of publishedResources(version)){const response=await fetchImpl(new URL(file+'?commit='+commit,base),{cache:'no-store'});assert(response.ok,file+' HTTP '+response.status);if(file==='notice.js')assert((await response.text()).includes("GAME_VERSION='"+version+"'"),'Notice must match the committed release version');else await response.arrayBuffer();}
 if(publishedResources(version).includes('saffron-86.js')){
  const response=await fetchImpl(new URL('assets/saffron-parts/parts.json?commit='+commit,base),{cache:'no-store'});assert(response.ok,'Saffron parts manifest HTTP '+response.status);const meta=await response.json();
  assert.deepEqual(Object.keys(meta.forms).sort(),['1','2'],'Both Saffron forms must be published');const parts=Object.values(meta.forms).flatMap(form=>Object.values(form));assert.equal(parts.length,32,'All 32 Saffron parts must be published');
  for(const part of parts){assert(/^[12]\/[a-z-]+\.png$/.test(part.file),'Invalid Saffron part path');const image=await fetchImpl(new URL('assets/saffron-parts/'+part.file+'?commit='+commit,base),{cache:'no-store'});assert(image.ok,'Saffron part '+part.file+' HTTP '+image.status);await image.arrayBuffer();}
 }
 return manifest;
}
module.exports={verifyDeployment};
if(require.main===module){const base=process.argv[2]||'https://08useok.github.io/color-wars/',commit=cp.execFileSync('git',['rev-parse','HEAD']).toString().trim(),notice=cp.execFileSync('git',['show','HEAD:notice.js']).toString(),version=notice.match(/GAME_VERSION='([^']+)'/)[1];verifyDeployment({base,commit,version}).then(manifest=>console.log('PASS online deployment',manifest)).catch(e=>{console.error(e);process.exitCode=1;});}
