const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);await page.waitForFunction(()=>!game.assetsLoading);
 const result=await page.evaluate(async()=>{
 const ok=(v,m)=>{if(!v)throw Error(m)};cleared=STAGES.map((_,i)=>i);training.levels.crisp=30;training.levels.lava=30;trueForms=['lava'];selectedStage=48;game.running=false;
 ok(/^(6\.9|7)\.\d+/.test(GAME_VERSION),'version');ok(SERIES_MEMBERS['복싱즈'].some(u=>u.id==='crisp'),'series pool');
 const images=[];for(const src of [NEW_ATLASES.crisp.sheet,NEW_ATLASES.crisp.evolved.sheet,NEW_ATLASES.lava.true.sheet,...PROFILE_ART.crisp,PROFILE_ART_TRUE.lava]){const im=new Image();im.src=src;await im.decode();images.push(src);}
 const c=unitStats('crisp'),l=unitStats('lava');ok(c.hp===180000&&c.atk===12000,'stats');ok(l.trueForm,'lava ready');ok(!trueFormAssetReady('crisp'),'crisp third locked');
 const review=allyReview('lava',true);ok(review.includes('투캔 카운터')&&review.includes('6.9.0'),'lava review');ok(allyReview('crisp',true).includes('codex-verdict'),'crisp role');
 ok(codexTraitBadges(l).some(x=>x.includes('검은 적 피해 무효')),'black dodge badge');
 return {version:GAME_VERSION,images,crisp:c,lava:l,series:SERIES_MEMBERS['복싱즈']};});
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(root,'docs/simulations/release-6.9.0-browser-2026-10-22.json'),JSON.stringify({result,errors},null,2));console.log('PASS: v6.9.0, Crisp series pool, six images, stats, third-form gate, Lava review and scoped badge');
 }finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
