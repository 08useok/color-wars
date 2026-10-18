const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const{chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'work/cyclone');fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end()}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.js':'text/javascript','.html':'text/html','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)})});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>{errors.push(String(e));console.log('PAGE ERROR',String(e))});
 await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);await page.waitForFunction(()=>!game.assetsLoading);await page.evaluate(()=>{document.querySelector('.notice-overlay')?.remove();game.paused=true;});
 const initial=await page.evaluate(async()=>{
  const ok=(v,m)=>{if(!v)throw Error(m)};const ids=Object.keys(CYCLONE_ALLIES),maps=CYCLONE_EVENTS.map(e=>({id:e.id,index:e.index,reward:e.reward,spawn:STAGE_SPAWNS[e.index]}));
  ok(GAME_VERSION==='6.7.0','version');ok(ids.length===4,'4 rewards');ok(document.querySelectorAll('.cyclone-event').length===4,'4 rows');ok(document.querySelectorAll('.cyclone-event button:disabled').length===4,'fresh locked');
  const oldCount=game.units.length;selectedStage=maps[0].index;reset();ok(game.units.length===oldCount,'direct reset blocked');
  ok(ids.every(t=>!allyUnlocked(t)&&!canTrueForm(t)),'fresh rewards and 3jin locked');
  ok(traitsOf(data.units.angelcyclone).join()==='angel','angel only');ok(traitsOf(data.units.whitecyclone).join()==='floating','white floating');ok(data.units.blackcyclone.blowChance===.2,'black push');
  for(const e of CYCLONE_EVENTS){ok(STAGE_SPAWNS[e.index].every(r=>data.units[r.type]),e.id+' valid enemies');ok(STAGE_SPAWNS[e.index].filter(r=>r.boss&&r.type===e.boss).length===1,e.id+' boss once');}
  const assets=[];for(const[id,a]of Object.entries(CYCLONE_ATLASES)){const im=new Image();im.src=a.sheet;await im.decode();ok(im.naturalWidth===192*11,id+' decoded');ok(a.walk.length===4&&a.attack.length===6&&a.hurt.length===1,id+' poses');assets.push(id);}
  cleared.push(CHAPTER1_LEN-1);renderSpecialStages();ok(document.querySelectorAll('.cyclone-event button:disabled').length===1,'world1 opens 3');cleared.push(CHAPTER1_LEN*2-1);renderSpecialStages();ok(!document.querySelector('.cyclone-event button:disabled'),'world2 opens angel');
  // Defeat and repeated finish calls must not grant or duplicate rewards.
  const __r=Math.random;for(const e of CYCLONE_EVENTS){selectedStage=e.index;reset();game.paused=true;finish(false);ok(!gachaOwns(e.reward),'defeat no reward '+e.id);reset();game.paused=true;Math.random=()=>.99;finish(true);Math.random=__r;ok(!gachaOwns(e.reward),'rare drop can miss '+e.id);reset();game.paused=true;Math.random=()=>0;finish(true);Math.random=__r;ok(gachaOwns(e.reward)&&gradeOf(e.reward)==='rare'&&cycloneClears.includes(e.id),'win reward '+e.id);const n=gacha.owned.length;finish(true);ok(gacha.owned.length===n,'same finish idempotent');reset();game.paused=true;finish(true);ok(gacha.owned.length===n,'replay no duplicate');ok(isStageCleared(e.index),'codex clear');}
  for(const t of ids){ok(allyUnlocked(t),'reward usable '+t);training.levels[t]=20;training.forms[t]=1;}saveTraining();saveGacha();saveProgress();
  for(const t of ids){const review=allyReview(t,true);ok(!/undefined|NaN/.test(review)&&/고방|딜러|메즈|탱커/.test(review),'role review '+t);}trainingGrade='all';renderTraining();for(const t of ids){const b=document.querySelector('.training-card[data-type="'+t+'"] .true-btn');ok(b?.disabled&&b.textContent.includes('곧 출시 예정'),'3jin pending button '+t);}
  ok(ALLY_COMBOS.some(c=>JSON.stringify(c).includes('raspberry')),'legacy combo');
  return {maps,assets,owned:ids};
 });
 await page.reload();await page.waitForFunction(()=>!game.assetsLoading);const persistence=await page.evaluate(()=>{if(!CYCLONE_EVENTS.every(e=>gachaOwns(e.reward)&&cycloneClears.includes(e.id)&&training.levels[e.reward]===20&&training.forms[e.reward]===1))throw Error('persistence');return true;});
 // Exercise actual stage selection, deck buttons, deployment and all visual states on both forms.
 await page.evaluate(()=>{document.querySelector('.notice-overlay')?.remove();document.querySelectorAll('.overlay').forEach(e=>e.classList.add('hidden'));openStages();});
 await page.locator('.cyclone-event[data-cyclone="red"] button').click();await page.waitForFunction(()=>!game.assetsLoading);
 const motion=await page.evaluate(()=>{
  const ok=(v,m)=>{if(!v)throw Error(m)},rows=[];game.paused=false;game.tutorial=99;game.running=true;game.money=999999;deck=Object.keys(CYCLONE_ALLIES);renderDeckButtons();
  for(const t of deck)for(const evolved of [false,true]){
   game.units=[];training.forms[t]=evolved?2:1;game.money=999999;game[cooldownKey(t)]=0;addUnit(t);const u=game.units.find(v=>v.type===t);ok(u,t+' deployed');u.x=65;
   const poses=[];for(const[state,times]of [['walk',[0,.12,.24,.36]],['attack',[.89,.72,.55,.38,.21,.02]],['hurt',[.4]]])for(const v of times){u.hurtTime=state==='hurt'?v:0;u.attackTime=state==='attack'?v:0;u.animTime=v;animateAtlas(u);poses.push(u.el.querySelector('.dog-sprite').style.backgroundPosition);ok(u.el.dataset.animation===state,t+' '+state);}
   ok(new Set(poses).size>=8,t+' distinct poses');ok(u.el.querySelector('.dog-sprite').style.backgroundImage.includes(t+'_'+(evolved?2:1)),t+' correct form sheet');rows.push({t,evolved,poses:new Set(poses).size});
  }
  return rows;
 });
 await page.evaluate(()=>{document.querySelectorAll('.overlay').forEach(e=>e.classList.add('hidden'));game.units.forEach(u=>u.el.remove());game.units=[];game.ended=false;game.paused=false;game.running=true;game.money=999999;game[cooldownKey('herbmint')]=0;renderDeckButtons();render();});
 await page.locator('#herbmintBtn').click();await page.evaluate(()=>{if(!game.units.some(u=>u.type==='herbmint'))throw Error('actual deploy click');game.paused=true;});
 // Contact sheet uses actual generated images in-browser, then a real battle overview.
 await page.evaluate(()=>{const box=document.createElement('div');box.id='cyclone-gallery';box.style.cssText='position:fixed;inset:0;z-index:999999;background:#e9edf3;color:#142238;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:24px;overflow:auto';for(const e of CYCLONE_EVENTS){const cell=document.createElement('div');cell.innerHTML='<h2>'+UNIT_NAMES[e.boss]+'</h2><img width="180" src="assets/cyclone/'+e.boss+'-profile.svg"><h3>'+CYCLONE_ALLIES[e.reward].name+'</h3><img width="150" src="'+PROFILE_ART[e.reward][0]+'"><img width="150" src="'+PROFILE_ART[e.reward][1]+'"><p>'+ROLES[e.reward]+'</p>';box.append(cell)}document.body.append(box)});
 await page.locator('#cyclone-gallery img').evaluateAll(async els=>{await Promise.all(els.map(im=>im.decode()))});await page.screenshot({path:path.join(out,'gallery.png'),clip:{x:0,y:0,width:1440,height:560}});
 await page.evaluate(()=>{document.querySelector('#cyclone-gallery').remove();document.querySelectorAll('.overlay').forEach(e=>e.classList.add('hidden'));document.querySelectorAll('#field .unit').forEach(e=>e.remove());game.units=[];game.money=999999;game.paused=false;game.running=true;game.ended=false;game.tutorial=99;for(const[t,n]of Object.keys(CYCLONE_ALLIES).map((t,i)=>[t,i])){game[cooldownKey(t)]=0;training.forms[t]=2;addUnit(t);const u=game.units.at(-1);u.emerging=false;u.x=50+n*9;u.el.style.left=`calc(${u.x}% - 21px)`;u.attackTime=.3;animateUnit(u)}addUnit('redcyclone',true);const b=game.units.at(-1);b.emerging=false;b.x=32;b.el.style.left=`calc(${b.x}% - 21px)`;animateUnit(b);game.paused=true;});await page.screenshot({path:path.join(out,'battle.png')});
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'test-results.json'),JSON.stringify({initial,persistence,motion,errors},null,2));console.log('PASS: 4 stage gates, 13 decoded sheets, defeat/win/replay rewards, reload, 8 form deployments and motion states.');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
