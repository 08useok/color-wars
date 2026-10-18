const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const{chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'work/subspecies-motion'),types=['herbmint','kendonavy','alchemypurple','rhythmpink'];
const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end()}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.js':'text/javascript','.html':'text/html','.css':'text/css','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)})});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage({viewport:{width:1440,height:960}}),errors=[],missing=[];
 page.on('pageerror',e=>{errors.push(String(e));console.log('PAGE',String(e))});page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))missing.push(r.url())});
 await page.addInitScript(types=>{if(localStorage.getItem('subspecies-motion-test'))return;localStorage.setItem('subspecies-motion-test','1');localStorage.setItem('red-battle-gacha-v1',JSON.stringify({owned:types,t1:0,t10:0}));localStorage.setItem('red-battle-training-v1',JSON.stringify({xp:100000,levels:Object.fromEntries(types.map(t=>[t,20])),forms:{herbmint:1,kendonavy:1}}));},types);
 const url=`http://127.0.0.1:${server.address().port}/red-battle-doge.html`;
 await page.goto(url);await page.waitForFunction(()=>!game.assetsLoading);
 const before=await page.evaluate(types=>Object.fromEntries(types.map(t=>[t,{level:training.levels[t],form:training.forms[t]||2}])),types);
 const control=await browser.newPage();await control.route('**/subspecies-motion.js*',route=>route.fulfill({contentType:'text/javascript',body:'// Control: original vector asset registration.'}));await control.goto(url);await control.waitForFunction(()=>!game.assetsLoading);
 const snapshot=types=>({stages:STAGES,spawns:STAGE_SPAWNS,units:data.units,stats:Object.fromEntries(types.map(t=>[t,[1,2].map(f=>unitStats(t,20,f))]))});
 assert.deepEqual(await page.evaluate(snapshot,types),await control.evaluate(snapshot,types));await control.close();
 const result=await page.evaluate(async types=>{
  const ok=(v,m)=>{if(!v)throw Error(m)},rows=[];
  document.querySelector('.notice-overlay')?.remove();document.querySelectorAll('.overlay').forEach(e=>e.classList.add('hidden'));game.paused=true;
  for(const t of types){ok(PROFILE_TEXT[t].startsWith((t==='kendonavy'?'여성':'남성')+'.'),t+' gender');ok(!canTrueForm(t),t+' no 3jin art');}
  for(const t of types)for(const form of [1,2]){
   const a=SUBSPECIES_MOTION_ATLASES[t+'_'+form],image=await loadBattleImage(a.sheet);
   ok(a.walk.length===4&&a.attack.length===6&&a.hurt.length===1,t+' frame counts');
   for(const f of [...a.walk,...a.attack,...a.hurt,a.hurtRecovery])ok(f[0]>=0&&f[1]>=0&&f[0]+f[2]<=image.naturalWidth&&f[1]+f[3]<=image.naturalHeight,t+' frame bounds');
   const portrait=await loadBattleImage(PROFILE_ART[t][form-1]);ok(portrait.naturalWidth===256,t+' portrait decoded');
   training.forms[t]=form;selectedStage=0;reset();while(game.assetsLoading)await new Promise(r=>setTimeout(r,10));
   game.paused=false;game.running=true;game.ended=false;game.auto=false;game.tutorial=99;game.spawnRules=[];game.money=999999;game[cooldownKey(t)]=0;
   addUnit(t);const u=game.units.find(u=>u.type===t);ok(u,t+' deployed');u.emerging=false;u.x=65;u.el.style.left='calc(65% - 21px)';
   const sheet=u.el.querySelector('.dog-sprite');ok(sheet.style.backgroundImage.includes('subspecies-motion/'+t+'_'+form+'.webp'),t+' actual raster form');
   const walk=new Set();const start=u.x;for(let i=0;i<18;i++){update(1/30);walk.add(sheet.style.backgroundPosition)}ok(walk.size===4&&u.x<start,t+' actual walk');
   addUnit('metalhippo');const foe=game.units.find(v=>!v.ally);ok(foe,'test enemy');foe.emerging=false;foe.x=u.x-4;foe.hp=foe.max=1e9;foe.stats.atk=0;foe.stats.speed=0;foe.stats.knockbacks=1;
   const hp=foe.hp,attack=new Set();for(let i=0;i<38;i++){update(1/30);if(u.el.dataset.animation==='attack')attack.add(sheet.style.backgroundPosition)}
   ok(attack.size===6,t+' all six actual attack frames');ok(foe.hp<hp,t+' attack actually lands');
   u.atkCd=100;foe.atkCd=0;foe.stats.atk=Math.round(u.max*.4);foe.stats.windup=1/30;foe.stats.attackDuration=.2;foe.stats.interval=2;foe.stats.range=10;
   for(let i=0;i<30&&!(u.hurtTime>0);i++)update(1/30);
   ok(u.hurtTime>0&&u.kbTime>0,t+' actual enemy hit triggers recoil');animateAtlas(u);const recoil=sheet.style.backgroundPosition;u.hurtTime=HITBACK_DURATION*.25;animateAtlas(u);ok(sheet.style.backgroundPosition!==recoil,t+' hurt recovery drawing');ok(u.el.dataset.animation==='hurt',t+' hurt state');
   rows.push({type:t,form,walk:walk.size,attack:attack.size,recoil:true,damage:hp-foe.hp,sheet:a.sheet,size:[image.naturalWidth,image.naturalHeight]});
   game.paused=true;
  }
  return rows;
 },types);
 // Prove the normal visible button also deploys the new art.
 await page.evaluate(types=>{document.querySelectorAll('.overlay').forEach(e=>e.classList.add('hidden'));deck=[...types];renderDeckButtons();game.units.forEach(u=>u.el.remove());game.units=[];game.assetsLoading=false;game.running=true;game.ended=false;game.paused=false;game.tutorial=99;game.money=999999;game[cooldownKey('herbmint')]=0;render();},types);
 await page.locator('#herbmintBtn').click();assert(await page.evaluate(()=>game.units.some(u=>u.type==='herbmint')));await page.evaluate(()=>{game.paused=true;});
 const unchanged=await page.evaluate(types=>Object.fromEntries(types.map(t=>[t,{level:training.levels[t],form:training.forms[t]||2}])),types);
 // Restore the seeded appearance choice after explicitly switching forms for the motion test.
 await page.evaluate(before=>{for(const[t,v]of Object.entries(before)){training.levels[t]=v.level;training.forms[t]=v.form;}saveTraining();saveGacha();},before);
 await page.reload();await page.waitForFunction(()=>!game.assetsLoading);assert.deepEqual(await page.evaluate(types=>Object.fromEntries(types.map(t=>[t,{level:training.levels[t],form:training.forms[t]||2}])),types),before);
 // Gallery animates the actual runtime atlas on a stable inspection surface, with the in-game renderer.
 await page.evaluate(types=>{
  document.querySelector('.notice-overlay')?.remove();document.querySelectorAll('.overlay').forEach(e=>e.classList.add('hidden'));document.querySelectorAll('#field .unit').forEach(e=>e.remove());game.units=[];game.paused=false;game.ended=false;game.running=true;game.tutorial=99;game.money=999999;
  const host=document.createElement('div');host.id='motion-gallery';host.style.cssText='position:fixed;inset:0;z-index:99999;background:#e5ebf2;color:#152238;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,1fr);gap:10px;padding:32px';document.body.append(host);window.motionGalleryUnits=[];
  for(let form=1;form<=2;form++)for(const t of types){training.forms[t]=form;game[cooldownKey(t)]=0;game.money=999999;addUnit(t);const u=game.units.at(-1);u.emerging=false;const cell=document.createElement('div');cell.style.cssText='position:relative;border-bottom:2px solid #b9c9d7;text-align:center';cell.innerHTML='<h2>'+UNIT_NAMES[t]+' · '+form+'진</h2><p>'+SUBSPECIES_GENDERS[t]+' / 걷기 · 공격 · 피격</p>';host.append(cell);cell.append(u.el);u.el.style.cssText='position:absolute;left:calc(50% - 21px);top:300px;bottom:auto';window.motionGalleryUnits.push(u);}
  game.paused=true;
 },types);
 await page.evaluate(async()=>{await Promise.all(Object.values(SUBSPECIES_MOTION_ATLASES).map(a=>loadBattleImage(a.sheet)))});
 await page.evaluate(()=>window.motionGalleryUnits.forEach(u=>{u.hurtTime=0;u.attackTime=.42;animateAtlas(u)}));await page.screenshot({path:path.join(out,'runtime-attack.png')});
 // Browser-rendered frames, not a recolored replacement, for a concise animated preview.
 const captures=[];for(let k=0;k<16;k++){
  await page.evaluate(k=>window.motionGalleryUnits.forEach(u=>{u.hurtTime=k>=14?(k===14?.6:.15):0;u.attackTime=k>=4&&k<14?.9-(k-4)*.09:0;u.animTime=k*.12;animateAtlas(u)}),k);
  captures.push(await page.screenshot());
 }
 captures.forEach((b,i)=>fs.writeFileSync(path.join(out,'runtime-'+String(i).padStart(2,'0')+'.png'),b));
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({before,unchanged,result,errors,missing,checks:['stats/stages/spawns unchanged','8 forms actual movement/attack/damage/recoil','gender and 3jin gate','all frame bounds and portraits decode','actual deploy button','save reload']},null,2));console.log('PASS: 8 forms, 32 walk + 48 attack + 16 hurt/recovery poses; actual combat, 8 portraits, stats/stages unchanged and reload.');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
