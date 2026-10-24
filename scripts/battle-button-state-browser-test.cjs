// 7.1.4 전투 중 UI 갱신 최적화(renderNewButtonsLive·renderUnitLevelsThrottled·수입 버튼 캐시)가 이전 방식과 같은 화면 상태를 만드는지 확인한다.
// 전투를 돌리면서 매 프레임 보이는 버튼의 상태(disabled·가격/해금 글자·쿨다운 막대)를 읽고, 같은 순간에 옛 전체 갱신(renderNewButtons)을 돌려 만든 상태와 비교한다.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);await page.waitForFunction(()=>typeof game!=='undefined'&&!game.assetsLoading,null,{timeout:60000});
 const result=await page.evaluate(()=>{
  cleared=STAGES.map((_,i)=>i);allyUnlocked=()=>true;prepareBattleImages=async()=>{game.assetsLoading=false;IMAGE_LOADING.classList.add('hidden')};
  const state=()=>{const out={};for(const t of GENERIC_CD_TYPES){const b=$('#'+t+'Btn');if(b.hidden)continue;const em=b.querySelector('em');out[t]=[b.disabled,b.querySelector('small').textContent,em.style.display,em.style.display==='block'?em.style.transform:'']}
   const sb=$('#spawnBtn'),ib=$('#incomeBtn');out.spawn=[sb.disabled,sb.hidden,sb.querySelector('small').textContent];out.income=[ib.disabled,ib.innerHTML];return JSON.stringify(out)};
  const decks=[['prism','amber','night','sapphire','aquamarine','rainbow','emerald','spring','red','yellow'],['red','orange','green','blue','purple','cobalt','flame','scarlet','moss','yellow']];
  let compared=0,frames=0,disabledSeen=new Set(),enabledSeen=new Set(),cdSeen=0,fullSeen=false,mismatch=[];
  for(const dk of decks){
   selectedStage=410;deck=dk;game.running=false;reset();game.running=true;game.paused=false;game.tutorial=99;game.money=2000;
   for(let i=0;i<30*90&&!game.ended;i++){
    // 돈을 쓰고 모으는 상황을 만든다: 초반엔 가난하게, 중반에 부자, 가끔 일시정지
    if(i===600)game.money=1e6;if(i===1500)game.money=500;game.paused=(i>=900&&i<930);
    if(i%45===0){for(const t of dk){if(t!=='red'&&unitCooldown(t)<=0&&game.money>=unitCost(t)){addUnit(t);break}}}
    update(1/30);frames++;
    const live=state();
    // 옛 방식으로 전부 다시 계산한 결과와 비교(보이는 버튼만 비교하므로 숨은 버튼은 건너뛴다)
    renderNewButtons();const full=state();
    compared++;if(live!==full)mismatch.push([frames,live.slice(0,200),full.slice(0,200)]);
    for(const t of dk){if(t==='red')continue;const b=$('#'+t+'Btn');if(b.hidden)continue;(b.disabled?disabledSeen:enabledSeen).add(t);if(b.querySelector('em').style.display==='block')cdSeen++;if(b.querySelector('small').textContent==='출격 인원 가득참')fullSeen=true}
   }
   game.running=false;
  }
  // 레벨 글자·툴팁: 전투 프레임에서는 0.5초에 한 번이지만 값은 전체 갱신과 같아야 한다
  const lv=()=>JSON.stringify(deck.map(t=>{const b=$(t==='red'?'#spawnBtn':'#'+t+'Btn');return [b.querySelector('strong').textContent,b.title]}));
  let levelsSame=true;for(const dk of decks){selectedStage=410;deck=dk;game.running=false;reset();game.running=true;for(let i=0;i<40;i++){update(1/30);const live=lv();const keep=game.levelsAt;renderUnitLevels();for(const t of LEVEL_TITLE_BTNS);const full=lv();game.levelsAt=keep;if(live!==full){levelsSame=false;break}}}
  const liveLv=levelsSame?'x':'a',fullLv='x';
  // 수입 버튼 글자: 전체 갱신과 같은지
  const ibNow=$('#incomeBtn').innerHTML;
  const hidden=GENERIC_CD_TYPES.filter(t=>$('#'+t+'Btn').hidden).length;
  return {compared,frames,mismatch:mismatch.slice(0,3),mismatchCount:mismatch.length,disabled:disabledSeen.size,enabled:enabledSeen.size,cdSeen,fullSeen,levelsSame:liveLv===fullLv,hidden,total:GENERIC_CD_TYPES.length,incomeHtml:ibNow.slice(0,40)}});
 assert.equal(result.mismatchCount,0,'보이는 버튼 상태가 옛 방식과 다름: '+JSON.stringify(result.mismatch));
 assert(result.compared>=2000,'비교한 프레임 수 '+result.compared);
 assert(result.disabled>0&&result.enabled>0&&result.cdSeen>0,'비활성·활성·쿨다운 상태를 모두 거쳤는지 '+JSON.stringify([result.disabled,result.enabled,result.cdSeen]));
 assert(result.levelsSame,'레벨 글자·툴팁이 전체 갱신과 같아야 함');
 assert(result.hidden>=result.total-12,'덱 밖 버튼은 숨겨져 있어야 함 '+result.hidden+'/'+result.total);
 assert.deepEqual(errors,[],'페이지 오류 '+errors.join('|'));
 console.log(`PASS: 전투 ${result.compared}프레임 동안 보이는 아군 버튼 상태(활성·가격/해금 글자·쿨다운 막대)·수입 버튼·스폰 버튼이 옛 전체 갱신과 동일, 레벨 글자·툴팁 동일 (비활성 ${result.disabled}종·활성 ${result.enabled}종·쿨다운 ${result.cdSeen}번 확인, 출격 가득참 ${result.fullSeen?'확인':'미확인'})`);
 }finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
