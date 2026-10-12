const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),types=['amber','bronze','banana','butter','vanilla'];
const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end()}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.js':'text/javascript','.html':'text/html','.css':'text/css','.webp':'image/webp'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)})});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage({viewport:{width:1400,height:900}}),errors=[],missing=[];page.on('pageerror',e=>errors.push(e.stack));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))missing.push(r.url())});
 await page.addInitScript(({types})=>{if(localStorage.getItem('sprite-test-seeded'))return;localStorage.setItem('sprite-test-seeded','1');localStorage.setItem('red-battle-gacha-v1',JSON.stringify({owned:types}));localStorage.setItem('red-battle-training-v1',JSON.stringify({xp:123456,levels:{amber:1,bronze:10,banana:20,butter:30,vanilla:20,red:20},forms:{banana:1,butter:1}}))},{types});
 await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);await page.waitForFunction(()=>!game.assetsLoading);
 const before=await page.evaluate(types=>Object.fromEntries(types.map(t=>[t,{level:training.levels[t],form:training.forms[t]||2}])),types);
 assert.deepEqual(before,{amber:{level:1,form:2},bronze:{level:10,form:2},banana:{level:20,form:1},butter:{level:30,form:1},vanilla:{level:20,form:2}});
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
  check(walk.size===24,'walk frames');check(attackFrames.size===37,'attack frames');check(sprite.style.backgroundImage.includes(`colors_${type}_${evolved?2:1}.webp`),'wrong sheet');
  u.attackTime=0;u.hurtTime=.1;animateUnit(u);check(sprite.style.filter.includes('brightness'),'hurt flash');u.hurtTime=0;
  // Exercise actual combat update and count HP changes caused by the supplied attack.
  u.x=60;u.emerging=false;u.atkCd=0;u.animTime=0;
  addUnit('dog');const victim=game.units.find(v=>v.type==='dog');victim.x=58;victim.emerging=false;victim.hp=victim.max=10000000;victim.stats={...victim.stats,hp:10000000,atk:0,speed:0,range:0,interval:1000,knockbacks:1};victim.atkCd=1000;
  const oldFire=fire,oldRandom=Math.random,events=[];Math.random=()=>.99;fire=function(source,...args){const hp=victim.hp;const r=oldFire(source,...args);if(source===u&&victim.hp<hp)events.push({time:game.elapsed,damage:hp-victim.hp});return r};
  try{for(let i=0;i<950;i++)update(.001)}finally{fire=oldFire;Math.random=oldRandom}
  check(events.length===(type==='banana'?3:1),type+' damage count '+events.length);
  if(type==='banana'){check(Math.abs(events[1].time-events[0].time-.18)<.003,'banana hit2 timing');check(Math.abs(events[2].time-events[1].time-.18)<.003,'banana hit3 timing')}
  game.paused=true;codexTab='ally';codexType=type;codexEvolved=evolved;codexGrade='all';renderCodexPreview();check(codexUnit.el.querySelector('.dog-sprite').style.backgroundImage.includes(`colors_${type}_${evolved?2:1}.webp`),'codex sheet');
  results.push({type,evolved,walkFrames:walk.size,attackFrames:attackFrames.size,hits:events});
 }
 return results;
 },types);
 // Re-establish representative saved states and verify two full reload cycles.
 await page.evaluate(types=>{const levels=[1,10,20,30,20];types.forEach((t,i)=>training.levels[t]=levels[i]);training.forms={banana:1,butter:1};saveTraining();saveGacha()},types);
 for(let i=0;i<2;i++){await page.reload();await page.waitForFunction(()=>!game.assetsLoading);const after=await page.evaluate(types=>Object.fromEntries(types.map(t=>[t,{level:training.levels[t],form:training.forms[t]||2}])),types);assert.deepEqual(after,before)}
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);fs.mkdirSync(path.join(root,'work/colors-motion'),{recursive:true});fs.writeFileSync(path.join(root,'work/colors-motion/test-results.json'),JSON.stringify({results:result,savedStates:before,reloadCycles:2,pageErrors:errors,missingAssets:missing},null,2));
 console.log('PASS: 10 actual button summons; 240 walk and 370 attack frames; hit flashes; codex forms; 14 damage events including both banana triple attacks; 2 save reload cycles; no browser errors or missing assets.');
}finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});


