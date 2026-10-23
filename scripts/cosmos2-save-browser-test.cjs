// 우주편 2장 클리어가 새로고침 뒤에도 남는다(저장된 진행도를 game.js가 먼저 읽을 때 2장 범위를 몰라 걸러내던 문제 7.1.2).
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));
 const url=`http://127.0.0.1:${server.address().port}/red-battle-doge.html`;
 await page.goto(url);await page.waitForFunction(()=>typeof COSMOS2_START==='number'&&COSMOS2_START<1e9);
 const r=await page.evaluate(()=>{const s=COSMOS2_START,e=COSMOS2_END;const story=[...Array(MAIN_STAGE_COUNT).keys(),...Array.from({length:FUTURE_END-FUTURE_START},(_,i)=>FUTURE_START+i),...Array.from({length:FUTURE2_END-FUTURE2_START},(_,i)=>FUTURE2_START+i),...Array.from({length:FUTURE3_END-FUTURE3_START},(_,i)=>FUTURE3_START+i),...Array.from({length:COSMOS_END-COSMOS_START},(_,i)=>COSMOS_START+i)];
  const c2=[s,s+1,s+2,s+23,e-1];cleared.length=0;cleared.push(...story,...c2);saveProgress();return {s,e,c2,storyCount:story.length}});
 await page.reload();await page.waitForFunction(()=>!game.assetsLoading);
 const after=await page.evaluate(({c2})=>({has:c2.map(i=>cleared.includes(i)),mask:cosmos2MaskComplete(),total:cleared.length,tab:typeof renderStageMenu==='function'}),{c2:r.c2});
 assert.deepEqual(after.has,r.c2.map(()=>true),'새로고침 뒤에도 우주편 2장 클리어가 남아 있어야 함 '+JSON.stringify(after));
 // 2장이 아닌 스테이지를 새로 깨고 저장해도 2장 기록이 사라지지 않는다
 const saved=await page.evaluate(()=>{cleared.push(5);saveProgress();return JSON.parse(localStorage.getItem('red-battle-progress-v1'))});
 for(const i of r.c2)assert(saved.includes(i),'저장 뒤에도 '+i+' 유지');
 // 2장 범위 밖의 엉뚱한 번호(특별 스테이지 등)는 여전히 걸러낸다
 await page.evaluate((e)=>{cleared.length=0;cleared.push(0,1,e+5,-3,'x',1.5);saveProgress()},r.e);
 await page.reload();await page.waitForFunction(()=>!game.assetsLoading);
 const filtered=await page.evaluate(()=>[...cleared]);
 assert.deepEqual(filtered,[0,1],'범위 밖 번호는 걸러짐 '+JSON.stringify(filtered));
 assert.deepEqual(errors,[],'페이지 오류 '+errors.join('|'));
 console.log('PASS: 우주편 2장 클리어(구간 '+r.s+'~'+(r.e-1)+')가 새로고침 후 유지, 다른 스테이지 저장 뒤에도 유지, 범위 밖 번호는 걸러짐');
 }finally{await browser.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
