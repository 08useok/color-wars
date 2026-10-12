const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),types=['lime','emerald','acid','spring','aquamarine','sapphire','royalblue','rose','night','fuchsia'];
const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end()}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.js':'text/javascript','.html':'text/html','.css':'text/css','.webp':'image/webp'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)})});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage({viewport:{width:1400,height:900}}),errors=[],missing=[];page.on('pageerror',e=>errors.push(e.stack));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))missing.push(r.url())});
 await page.addInitScript(({types})=>{if(localStorage.getItem('sprite-test-seeded'))return;localStorage.setItem('sprite-test-seeded','1');localStorage.setItem('red-battle-gacha-v1',JSON.stringify({owned:types}));localStorage.setItem('red-battle-training-v1',JSON.stringify({xp:123456,levels:Object.fromEntries(types.map((t,i)=>[t,[1,10,20,30][i%4]])),forms:{acid:1,spring:1}}))},{types});
 await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);await page.waitForFunction(()=>!game.assetsLoading);
 const before=await page.evaluate(types=>Object.fromEntries(types.map(t=>[t,{level:training.levels[t],form:training.forms[t]||2}])),types);
 assert.deepEqual(before,Object.fromEntries(types.map((t,i)=>[t,{level:[1,10,20,30][i%4],form:['acid','spring'].includes(t)?1:2}])));
 const result=await page.evaluate(async types=>{
 const check=(v,m)=>{if(!v)throw Error(m)};game.paused=true;const results=[];
 for(const type of types)for(const evolved of [false,true]){
  training.levels[type]=20;check(setForm(type,evolved?2:1),'setForm');deck=[...types];saveDeck();selectedStage=1;reset();game.paused=true;
  while(game.assetsLoading)await new Promise(r=>setTimeout(r,10));
  game.running=true;game.paused=false;game.tutorial=6;game.money=100000;game.spawnRules=[];game.spawnCd=9999;render();
  const button=document.getElementById(type+'Btn');check(!button.disabled,type+' deploy button');button.click();
  const u=game.units.find(v=>v.type===type);check(u,type+' failed summon');check(!!u.stats.evolved===evolved,'summoned form');
  const atlas=evolved?NEW_ATLASES[type].evolved:NEW_ATLASES[type],sprite=u.el.querySelector('.dog-sprite');await loadBattleImage(atlas.sheet);
  if(type!=='amber'){
   check(atlas.scale===.5,'normalized source scale');
   const shadow=u.el.querySelector('.dog-shadow'),bar=u.el.querySelector('.bar');
   check(Math.abs(parseFloat(shadow.style.left)+parseFloat(shadow.style.width)/2-21)<.6,'shadow foot alignment');
   check(Math.abs(parseFloat(bar.style.left)+22-21)<.6,'HP bar body alignment');
  }

  const walk=new Set(),attackFrames=new Set();
  for(let i=0;i<24;i++){u.animTime=(i+.01)*atlas.walkStep;u.attackTime=0;animateUnit(u);walk.add(sprite.style.backgroundPosition)}
  for(let i=0;i<1000;i++){u.attackTime=u.stats.attackDuration*(1-(i+.5)/1000);animateUnit(u);attackFrames.add(sprite.style.backgroundPosition);const rect=sprite.getBoundingClientRect();check(rect.width>0&&rect.height>0&&Number.isFinite(rect.left),'invalid sprite bounds')}
  check(walk.size===24,'walk frames');check(attackFrames.size===37,'attack frames');check(sprite.style.backgroundImage.includes(`colors_${type==='royalblue'?'royal_blue':type}_${evolved?2:1}.webp`),'wrong sheet');
  u.attackTime=0;u.hurtTime=.1;animateUnit(u);check(sprite.style.filter.includes('brightness'),'hurt flash');u.hurtTime=0;
  game.paused=true;codexTab='ally';codexType=type;codexEvolved=evolved;codexGrade='all';renderCodexPreview();check(codexUnit.el.querySelector('.dog-sprite').style.backgroundImage.includes(`colors_${type==='royalblue'?'royal_blue':type}_${evolved?2:1}.webp`),'codex sheet');
  results.push({type,evolved,walkFrames:walk.size,attackFrames:attackFrames.size});
 }
 return results;
 },types);
 // Re-establish representative saved states and verify two full reload cycles.
 await page.evaluate(types=>{const levels=types.map((t,i)=>[1,10,20,30][i%4]);types.forEach((t,i)=>training.levels[t]=levels[i]);training.forms={acid:1,spring:1};saveTraining();saveGacha()},types);
 for(let i=0;i<2;i++){await page.reload();await page.waitForFunction(()=>!game.assetsLoading);const after=await page.evaluate(types=>Object.fromEntries(types.map(t=>[t,{level:training.levels[t],form:training.forms[t]||2}])),types);assert.deepEqual(after,before)}
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);fs.mkdirSync(path.join(root,'work/new-colors-motion'),{recursive:true});fs.writeFileSync(path.join(root,'work/new-colors-motion/test-results.json'),JSON.stringify({results:result,savedStates:before,reloadCycles:2,pageErrors:errors,missingAssets:missing},null,2));
 console.log('PASS: 20 actual button summons; 480 walk and 740 attack frames; hit flashes; codex forms; 2 save reload cycles; no browser errors or missing assets.');
}finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
