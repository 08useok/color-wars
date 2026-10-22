const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);await page.waitForFunction(()=>!game.assetsLoading);
 const result=await page.evaluate(async()=>{
  const ok=(v,m)=>{if(!v)throw Error(m)};game.running=false;cleared=[];zombieSave={clear:[],bonus:[],tickets:0};
  for(const c of [1,2,3,5,6,7,8]){const all=zombieStagesOf(c);ok(all.length===48,'48 stages '+c);ok(!zombieAvailable(all[0]),'chapter gate '+c);cleared.push(ZOMBIE_CHAPTERS[c].final);ok(zombieAvailable(all[0]),'first unlock '+c);ok(!zombieAvailable(all.at(-1)),'final locked '+c);}
  game.running=false;stageChapterView=8;renderStageMenu();ok(document.querySelectorAll('.zombie-chip').length===48,'48 cosmos Z badges');
  zombieSave.clear=[...new Set(Object.keys(ZOMBIE_CHAPTERS).flatMap(c=>zombieStagesOf(+c)))];const stages=[];
  for(const [i,entry]of OUTBREAK_COMPLETION){zombieSlotRestore();startOutbreak(i);await prepareBattleImages();ok(selectedStage===ZOMBIE_SLOT,'entry '+i);ok(game.spawnRules.length===entry.rules.length,'rules '+i);ok(STAGES[ZOMBIE_SLOT].maxEnemies===entry.max,'enemy cap');ok(STAGES[ZOMBIE_SLOT].allyLimit===entry.limit,'deploy limit');
   game.units=Array.from({length:entry.limit},()=>({ally:true,hp:1}));ok(allyDeployFull(),'full limit');game.units.pop();ok(!allyDeployFull(),'free slot');game.units=[];
   stages.push({i,name:entry.name,chapter:entry.chapter,rules:entry.rules.length});
  }
  for(const id of Object.keys(OUTBREAK_NEW_ENEMIES)){const im=new Image();im.src=NEW_ATLASES[id].sheet;await im.decode();ok(ENEMY_ORDER.includes(id),'codex '+id);}
  // First clear adds exactly one medal; replay cannot add another or change ticket accounting.
  zombieSlotRestore();const i=[...OUTBREAK_COMPLETION.keys()][0];zombieSave={clear:[],bonus:[],tickets:0};startOutbreak(i);await prepareBattleImages();game.running=true;finish(true);ok(zombieSave.clear.length===1&&zombieSave.clear[0]===i,'one medal');const before=JSON.stringify(zombieSave);
  zombieSlotRestore();startOutbreak(i);await prepareBattleImages();game.running=true;finish(true);ok(JSON.stringify(zombieSave)===before,'replay reward unchanged');saveZombie();return {chapters:7,total:336,added:stages,newEnemies:Object.keys(OUTBREAK_NEW_ENEMIES),saved:i};
 });
 await page.reload();await page.waitForFunction(()=>!game.assetsLoading);assert(await page.evaluate(i=>zombieSave.clear.includes(i),result.saved));assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(root,'docs/simulations/zombie-completion-browser-2026-10-22.json'),JSON.stringify({result,errors,reload:true},null,2));console.log('PASS: 336 outbreaks, 48 cosmos badges, chapter/final gates, 37 actual entries and deployment caps, four enemy images/codex, one-time medal and reload.');
 }finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
