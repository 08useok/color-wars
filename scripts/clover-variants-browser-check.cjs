const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'exports/clover-variants');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+req.url.split('?')[0]);if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':file.endsWith('.js')?'text/javascript':file.endsWith('.html')?'text/html':file.endsWith('.css')?'text/css':file.endsWith('.png')?'image/png':'image/webp'});
if(!err&&path.basename(file)==='game.js')data=Buffer.from(data.toString().replace('reset();openStages();requestAnimationFrame(loop);','window.cloverTest={NEW_ATLASES,animateAtlas,drawUnit,data,getGame:()=>game};reset();openStages();requestAnimationFrame(loop);'));res.end(err?'missing':data)})});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage({viewport:{width:1400,height:1050}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${server.address().port}/clover-variants-preview.html`);
 await page.waitForFunction(()=>cards.every(c=>c.im.complete&&c.im.naturalWidth));
 const samples=await page.evaluate(()=>{let count=0;for(const c of cards)for(const state of ['walk','attack','hurt'])for(let i=0;i<c.a[state].length;i++){const [x,y,w,h]=c.a[state][i];if(x<0||y<0||x+w>c.im.naturalWidth||y+h>c.im.naturalHeight)throw Error('out of image');const s=(state==='attack'&&i>=c.a.extraStart?c.a.extraScale:c.a.scaleByState[state]);if(!(s>0))throw Error('invalid scale');count++;}return count});assert.equal(samples,434);
 await page.screenshot({path:path.join(out,'game-motion-preview.png'),fullPage:true});
 await page.addInitScript(()=>{if(localStorage.getItem('red-battle-training-v1'))return;localStorage.setItem('red-battle-trueform-v1',JSON.stringify(['clover']));localStorage.setItem('red-battle-training-v1',JSON.stringify({xp:123456,levels:{clover:30,red:20},forms:{}}));localStorage.setItem('red-battle-progress-v1',JSON.stringify(Array.from({length:144},(_,i)=>i)))});
 await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);
 const result=await page.evaluate(()=>{const t=window.cloverTest,a=t.NEW_ATLASES.clover.true;const before=localStorage.getItem('red-battle-training-v1');const u={type:'clover',ally:true,stats:{...t.data.units.clover,trueForm:true,evolved:true},animTime:0,hurtTime:0,attackTime:0,hp:1,maxHp:1};t.drawUnit(u);for(const state of ['walk','attack','hurt']){u.hurtTime=state==='hurt'?1:0;u.attackTime=state==='attack'?.3:0;t.animateAtlas(u);if(!u.el.querySelector('.dog-sprite').style.backgroundImage.includes('clover3_motions'))throw Error('wrong sprite');}return {frames:[a.walk.length,a.attack.length,a.hurt.length],savedBefore:before,savedAfter:localStorage.getItem('red-battle-training-v1')}});
 assert.deepEqual(result.frames,[24,37,1]);assert.equal(result.savedBefore,result.savedAfter);assert.deepEqual(errors,[]);
 const gameplay=await page.evaluate(()=>{
  const check=(ok,msg)=>{if(!ok)throw Error(msg)},stats={};selectedStage=CHAPTER1_LEN;
  for(const [id,s] of Object.entries(SUBSPECIES)){const d=unitStats(id,20,2);stats[id]={hp:d.hp,dps:d.atk/d.interval,cost:d.cost,cooldown:d.cooldown};check(Math.abs(d.hp-s.hp)<=1,'HP '+id);check(Math.abs(d.atk/d.interval-s.dps)<.3,'DPS '+id);check(d.cost===s.cost&&d.cooldown===s.cooldown,'price/CD '+id);check(!allyUnlocked(id)&&!canTrueForm(id),'locked '+id);check(unitDisplayName(id,false,true)===s.evolved,'evolved name');for(const evolved of [false,true]){const u={type:id,ally:true,stats:{...d,evolved},animTime:0,hurtTime:0,attackTime:0};drawUnit(u);animateAtlas(u);check(u.el.querySelector('.dog-sprite').style.backgroundImage.includes((evolved?{mixedwhite:'samplewhite',earphonered:'headsetred',shotguntan:'tak47'}[id]:id)+'_motions'),'sprite '+id)}}
  const savedRandom=Math.random;Math.random=()=>.99;
  try{
   game.ended=false;game.elapsed=10;
   const victim=(type='dog',x=45)=>{const el=document.createElement('div');el.innerHTML='<i></i>';return {type,ally:false,hp:1000000,max:1000000,x,kb:0,kbTime:0,el,stats:{knockbacks:1}}};
   let v=victim();game.units=[v];const source={type:'earphonered',ally:true,x:50,stats:{atk:100,range:22,markChance:1,markDuration:5,markMult:1.3}};
   damage(v,100,source);check(v.hp===999900&&v.markUntil===15,'mark applies after triggering hit');damage(v,100,source);check(v.hp===999770,'mark 30%, no stacking');game.elapsed=15;damage(v,100,{...source,stats:{}});check(v.hp===999670,'mark expiry');
   v=victim('metalhippo');if(!data.units[v.type])v.type=Object.keys(data.units).find(t=>hasTrait(data.units[t],'metal'));v.markUntil=20;v.markMult=1.3;game.units=[v];damage(v,100,source);check(v.hp===999999,'metal remains 1');
   v=victim();v.stats.barrier=500;game.units=[v];damage(v,100,source);check(!v.markUntil&&v.hp===1000000,'barrier blocks mark');
   const white={type:'mixedwhite',ally:true,x:50,stats:{...unitStats('mixedwhite',20,2),atkDownChance:1,slowChance:1}};v=victim();const out=victim('dog',50-white.stats.range-.01);game.units=[v,out];resolveAttack(white,v);check(v.atkDownMult===.5&&v.atkDownUntil===19&&v.slowUntil===18,'white effects');check(out.hp===1000000,'range outside');
   const tan={type:'shotguntan',ally:true,x:50,stats:unitStats('shotguntan',20,2)};v=victim();game.units=[v];for(const h of tan.stats.hits)resolveAttack(tan,v,h.share);check(Math.abs((1000000-v.hp)-tan.stats.atk)<.001,'6 shots total');
   const cl=unitStats('clover',20,2);check(cl.multiHit===3&&cl.critChance===.25&&cl.atkDownChance===.8,'clover abilities');
   for(const id of ['gold','beige']){
    training.levels[id]=20;training.forms[id]=1;training.xp=300000;const col=fruitColorOf(id);catfruit.fruit[col]=10;catfruit.seed[col]=10;
    const before=unitStats(id,20,2),xp=training.xp,cost=trueFormCost(id);check(canTrueForm(id),'can evolve '+id);check(evolveTrueForm(id),'evolve '+id);
    const after=unitStats(id,20,2);check(after.trueForm&&after.hp===Math.round(before.hp*1.3),'true HP '+id);check(after.atk===Math.round(before.atk*(id==='gold'?1.5:1.4)),'true ATK '+id);check(training.xp===xp-cost.xp,'evolution cost '+id);check(!canTrueForm(id),'one evolution '+id);
    if(id==='gold'){check(after.multiHit===5&&after.killGold===1.5,'gold traits');const u={type:id,ally:true,x:50,stats:after};game.shots=[];fire(u,undefined);check(game.shots.length===5,'five gold shards');game.shots=[]}
    else check(after.range===14&&after.freezeChance===.6&&after.freezeDuration===3&&after.pierce===2,'beige traits');
   }
   v=victim();Object.assign(v,{flashTime:0,animTime:0,hurtTime:0,attackTime:0,atkCd:100,emerging:false,stats:{...data.units.dog,speed:0,interval:100,range:0,knockbackImmune:true}});drawUnit(v);
   Object.assign(tan,{hp:100000,max:100000,kbTime:0,kb:0,flashTime:0,animTime:0,hurtTime:0,attackTime:0,emerging:false});tan.stats={...tan.stats,speed:0};drawUnit(tan);game.units=[tan,v];game.spawnRules=[];attack(tan,v);for(let i=0;i<30;i++)update(.05);check(Math.abs(1000000-v.hp-tan.stats.atk)<.001&&!tan.pendingAttack,'six scheduled shots');
   for(const [n,id] of Object.keys(SUBSPECIES).entries()){check(subspeciesTierOpen(id,0)&&!subspeciesTierOpen(id,1),'tier gate');selectedStage=SUBSPECIES_START+n*2;game.ended=false;finish(true);check(subspeciesTierOpen(id,1),'unlock tier 2');selectedStage++;game.ended=false;finish(true);check(gachaOwns(id),'100% reward');const owned=gacha.owned.length;finish(true);check(gacha.owned.length===owned,'reward once');training.levels[id]=20;training.forms[id]=1;progression.plus[id]=2;progression.used[id]=3}
   saveTraining();saveProgression();return {stats,stageCount:STAGES.length,clear:subspeciesClears,owned:gacha.owned,redLevel:training.levels.red};
  }finally{Math.random=savedRandom}
 });
 await page.reload();const persistence=await page.evaluate(()=>({levels:Object.fromEntries(Object.keys(SUBSPECIES).map(id=>[id,[training.levels[id],training.forms[id],progression.plus[id],progression.used[id],gachaOwns(id),subspeciesTierOpen(id,1)]])),trueForms:['gold','beige','clover'].map(id=>[id,hasTrueForm(id),unitStats(id,20,2).trueForm]),red:training.levels.red}));for(const values of Object.values(persistence.levels))assert.deepEqual(values,[20,1,2,3,true,true]);assert.deepEqual(persistence.trueForms,[['gold',true,true],['beige',true,true],['clover',true,true]]);assert.equal(persistence.red,gameplay.redLevel);assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(out,'gameplay-check.json'),JSON.stringify({gameplay,persistence,errors},null,2));
 fs.writeFileSync(path.join(out,'browser-check.json'),JSON.stringify({samples,errors,result},null,2));console.log('PASS: 434 frame bounds/scales; 7 previews load; Clover true form uses new art in all 3 states; saved training unchanged; no browser script errors');
}finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
