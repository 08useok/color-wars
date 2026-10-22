const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),server=http.createServer((req,res)=>{
 const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 fs.readFile(f,(err,b)=>{res.writeHead(err?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp'})[path.extname(f)]||'application/octet-stream'});res.end(err?'missing':b);});
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});
 try{
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);await page.waitForFunction(()=>!game.assetsLoading);
  const result=await page.evaluate(async()=>{
   const ok=(v,m)=>{if(!v)throw Error(m)};game.running=false;
   ok(LEGEND_SUBS.length===40,'chapter count');cleared.push(CHAPTER1_LEN-1);
   legendProgress[1]=Array.from({length:267},(_,i)=>i);legendSub=0;renderLegend();
   ok([...document.querySelectorAll('.legend-sub')].some(b=>b.textContent.includes('바람을 기다리는 섬')&&!b.disabled),'chapter button');
   legendSub=40;renderLegend();ok(document.querySelectorAll('.legend-stage').length===1,'first stage unlock');
   const stages=[];
   for(let k=267;k<273;k++){
    selectedStage=legendIdx(k);reset();await prepareBattleImages();ok(!game.assetsLoading,'assets ready');
    ok(game.spawnRules.length>0,'rules');ok(data.bases.enemy.hp===STAGES[selectedStage].hp,'castle hp');
    for(const r of game.spawnRules){const a=NEW_ATLASES[r.type];if(a){const im=new Image();im.src=a.sheet;await im.decode();}}
    game.running=true;game.tutorial=6;update(1/30);game.running=false;
    stages.push({k,name:STAGES[selectedStage].name,rules:game.spawnRules.length});
   }
   legendProgress[1].push(267,268);saveLegend();return {stages,oldLast:STAGES[legendIdx(266)].name};
  });
  await page.reload();await page.waitForFunction(()=>!game.assetsLoading);
  assert(await page.evaluate(()=>legendProgress[1].includes(267)&&legendProgress[1].includes(268)),'new progress survives reload');
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(root,'docs/simulations/legend-40-browser-2026-10-22.json'),JSON.stringify({result,errors,reload:true},null,2));
  console.log('PASS: chapter list, unlock, six stage entries, all enemy atlas images decode, first updates and saved progress after reload.');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
