// 로비 최적화(10-31) 시험: 장 탭 전환은 스테이지 목록만 다시 그리고, 결과는 전체 다시 그리기와 같다. allyUnlocked는 예전 계산과 같은 답.
// 사용: node scripts/lobby-render-browser-test.cjs   (저장소는 건드리지 않음: 페이지 안에서 localStorage 쓰기를 막는다)
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage({viewport:{width:1400,height:900}}),errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.addInitScript(()=>{Storage.prototype.setItem=function(){}});
 await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);await page.waitForFunction(()=>typeof game!=='undefined'&&!game.assetsLoading);
 const r=await page.evaluate(()=>{
  const ok=(v,m)=>{if(!v)throw Error(m)};
  const oldUnlocked=t=>ALWAYS_UNLOCKED.has(t)||cleared.some(i=>i>=UNLOCK_AT[t]);
  const sets=[[],[0,1,2],[...Array(48).keys()],STAGES.map((s,i)=>i)];
  for(const set of sets){cleared.length=0;cleared.push(...set);for(const t of ALLIES)ok(_allyUnlocked(t)===oldUnlocked(t),'allyUnlocked '+t+' '+set.length)}
  // 다 깬 계정으로 로비
  cleared.length=0;STAGES.forEach((s,i)=>cleared.push(i));openStages();
  let trainingCalls=0,rankCalls=0;const tr=renderTraining,rk=renderRank;renderTraining=function(){trainingCalls++;return tr.apply(this,arguments)};renderRank=function(){rankCalls++;return rk.apply(this,arguments)};
  const snap=()=>[...document.querySelectorAll('#stageMenu .stage-card')].map(b=>b.className+'|'+b.textContent).join('\n')+'#'+document.getElementById('progressText').textContent+'#'+document.querySelector('.stage-heading h1').textContent+'#'+document.getElementById('lobbyNextStage').textContent;
  const tabs=['chapter1Tab','chapter2Tab','chapter3Tab','futureTab','future2Tab','future3Tab','cosmosTab','cosmos2Tab','legendArrow'].filter(id=>document.getElementById(id));
  const times=[];
  for(const id of tabs){
   if(id==='legendArrow'&&stageChapterView==='legend')document.getElementById('legendArrow').click();
   trainingCalls=rankCalls=0;const a=performance.now();document.getElementById(id).click();times.push(performance.now()-a);
   ok(trainingCalls===0,id+': 탭 전환에 강화 목록을 다시 그림');ok(rankCalls===0,id+': 탭 전환에 랭크를 다시 계산');
   const quick=snap();renderStageMenu();ok(trainingCalls===1&&rankCalls>=1,'전체 다시 그리기는 그대로');ok(snap()===quick,id+': 탭 전환 결과가 전체 다시 그리기와 다름');
  }
  renderTraining=tr;renderRank=rk;
  times.sort((a,b)=>a-b);
  const full=[];for(let i=0;i<5;i++){const a=performance.now();renderStageMenu();full.push(performance.now()-a)}full.sort((a,b)=>a-b);
  const cx=[];for(let i=0;i<3;i++){const a=performance.now();openCodex('ally');cx.push(performance.now()-a);document.getElementById('codexOverlay')?.classList.add('hidden')}cx.sort((a,b)=>a-b);
  return {codex:+cx[1].toFixed(1),tabs:tabs.length,tabMedian:+times[Math.floor(times.length/2)].toFixed(1),fullMedian:+full[2].toFixed(1)};
 });
 assert.deepEqual(errors,[]);
 console.log(`PASS: allyUnlocked 예전과 같음(4가지 진행도 × 아군 전원), 장 탭 ${r.tabs}개 모두 강화 목록·랭크를 다시 그리지 않고 결과는 전체 다시 그리기와 같음. 탭 전환 중앙값 ${r.tabMedian}ms(전체 다시 그리기 ${r.fullMedian}ms, 도감 열기 ${r.codex}ms, 다 깬 계정).`);
}finally{await browser.close();server.close()}})().catch(e=>{console.error(e);process.exit(1)});
