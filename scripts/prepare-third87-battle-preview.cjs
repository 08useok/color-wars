const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..'),out=path.join(root,'work/third87-integration');fs.mkdirSync(out,{recursive:true});
const base='file:///'+root.replaceAll('\\','/')+'/';
const memory=`<script>Object.defineProperty(window,'localStorage',{value:(()=>{const m=new Map();return{getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear()};})()});</script>`;
const setup=`<script>
const THIRD87_FIXTURE_IDS=['aquamarine','cobalt','brown','brick'];
window.third87FixtureReady=false;
(async()=>{
 cleared=STAGES.map((_,i)=>i);allyUnlocked=()=>true;for(const id of THIRD87_FIXTURE_IDS){training.levels[id]=30;if(!trueForms.includes(id))trueForms.push(id);delete training.forms[id];if(typeof ALLY_FORM_CHOICE!=='undefined')delete ALLY_FORM_CHOICE[id];}
 game.running=false;game.tutorial=6;game.ended=false;game.paused=false;game.assetsLoading=false;game.units=[];unitsEl.replaceChildren();
 document.querySelectorAll('.overlay').forEach(el=>el.classList.add('hidden'));
 const images=await Promise.all(THIRD87_FIXTURE_IDS.map(id=>loadBattleImage(NEW_ATLASES[id].true.sheet)));window.third87LoadedImages=images.length;
 for(const [i,id]of THIRD87_FIXTURE_IDS.entries()){const stats=unitStats(id),u={type:id,ally:true,boss:false,stats,hp:stats.hp,max:stats.hp,x:25+i*17,emerging:false,kb:0,atkCd:0,animTime:0,attackTime:0,hurtTime:0,kbTime:0,flashTime:0};game.units.push(u);drawUnit(u);u.el.style.left='calc('+u.x+'% - 21px)';}
 let selected='idle',prev=null,clock=0;
 const banner=document.createElement('section');banner.style='position:fixed;top:0;left:0;right:0;padding:10px;background:#172838;color:white;z-index:99999;display:flex;gap:10px;align-items:center;flex-wrap:wrap';banner.innerHTML='<b>8.7 · 실제 전투 렌더러 점검</b><span>로컬 임시 계정 · 저장 데이터에 영향 없음</span>';
 for(const [value,label]of [['idle','대기'],['walk','걷기'],['attack','공격'],['hurt','넉백']]){const b=document.createElement('button');b.textContent=label;b.dataset.fixtureMode=value;b.onclick=()=>{selected=value;clock=0;for(const u of game.units){u.kbTime=u.hurtTime=u.attackTime=0;u.x=25+THIRD87_FIXTURE_IDS.indexOf(u.type)*17;u.el.style.translate='0 0';u.el.classList.remove('knocked-back');if(value==='hurt')startHitback(u);}};banner.append(b);}document.body.append(banner);document.querySelector('#game').style.marginTop='70px';
 function tick(t){const dt=prev===null?0:Math.min(.05,(t-prev)/1000);prev=t;clock+=dt;for(const [i,u]of game.units.entries()){u.animTime=clock;if(selected==='hurt'){if(u.kbTime>0)tickHitback(u,dt);else animateUnit(u);}else{u.x=25+i*17+(selected==='walk'?Math.sin(clock)*.3:0);u.el.style.left='calc('+u.x+'% - 21px)';u.attackTime=selected==='attack'?u.stats.attackDuration-(clock%u.stats.interval):0;if(u.attackTime<0)u.attackTime=0;animateUnit(u);}}requestAnimationFrame(tick);}requestAnimationFrame(tick);
 window.third87FixtureState=()=>({loaded:window.third87LoadedImages,units:game.units.map(u=>({id:u.type,trueForm:u.stats.trueForm,mode:u.el.dataset.animation,background:u.el.querySelector('.dog-sprite').style.backgroundImage,width:u.el.querySelector('.dog-sprite').style.width,hp:u.stats.hp,atk:u.stats.atk}))});window.third87FixtureReady=true;
})().catch(e=>{window.third87FixtureError=String(e);console.error(e)});
</script>`;
let html=fs.readFileSync(path.join(root,'red-battle-doge.html'),'utf8');html=html.replace('<head>','<head><base href="'+base+'">'+memory).replace('</body>',setup+'</body>');fs.writeFileSync(path.join(out,'battle-preview.html'),html);console.log('Prepared isolated actual-game renderer fixture');
