const fs=await import('node:fs/promises'),{fileURLToPath}=await import('node:url'),root=fileURLToPath(new URL('..',import.meta.url)).replaceAll('\\','/');
const server=JSON.parse(await fs.readFile(root+'/work/release-75/server.json','utf8')),task=await taskSpace('release75-20261031'),page=task.page('p1');console.log('SPACE',task.spaceId);await fs.writeFile(root+'/work/release-75/space.json',JSON.stringify({id:task.spaceId}));
await page.goto('http://127.0.0.1:'+server.port+'/red-battle-doge.html');
const result=await page.evaluate(async()=>{
 if(GAME_VERSION!=='7.5.0')throw Error('version');game.paused=true;
 const scripts=await Promise.all([...document.scripts].filter(s=>s.src).map(async s=>({src:s.getAttribute('src'),status:(await fetch(s.src)).status})));if(scripts.some(s=>s.status!==200))throw Error('missing scripts');
 if(ALLIES.includes('lightrainbow')||data.units.lightrainbow)throw Error('8.0 leak');
 cleared=STAGES.map((_,i)=>i);saveProgress();gacha.fix=10;const random=Math.random,draws=[];Math.random=()=>0;
 try{for(const banner of ['레드 바스터즈','블랙 바스터즈','천사 바스터즈','레드 바스터즈']){chooseBusters75(banner);gacha.pityS[banner]=49;const r=gachaUseGuarantee();if(r.error||!BUSTERS75_BANNERS[banner].includes(r.res.id))throw Error('draw');draws.push({banner,id:r.res.id});}}finally{Math.random=random;}
 const ids=Object.keys(BUSTERS75);if(!ids.every(gachaOwns)||gacha.fix!==6)throw Error('acquisition');
 for(const name of [...SERIES_LIST,...Object.keys(GACHA_FESTIVALS)])if(SERIES_MEMBERS[name]?.some(u=>ids.includes(u.id)))throw Error('exclusive pool leak '+name);
 gacha.pityS['레드 바스터즈']=17;gacha.pityS['블랙 바스터즈']=9;gacha.owned.push('verdigris');saveGacha();
 training.levels.verdigris=30;training.xp=1000000;const col=fruitColorOf('verdigris');catfruit.fruit[col]=10;catfruit.seed[col]=10;
 if(!evolveTrueForm('verdigris')||evolveTrueForm('verdigris'))throw Error('evolution gate');
 for(const id of ids)training.levels[id]=30;saveTraining();chooseBusters75('에이리언 바스터즈');openGacha();
 const banners=document.querySelector('#gachaBanners').textContent;for(const b of Object.keys(BUSTERS75_BANNERS))if(!banners.includes(b))throw Error('banner UI');
 return {version:GAME_VERSION,draws,tickets:gacha.fix,owned:[...gacha.owned],pity:{red:17,black:9},banners,scriptCount:scripts.length,allScriptsOK:true,third:hasTrueForm('verdigris'),cost:{fruit:catfruit.fruit[col],seed:catfruit.seed[col],xp:training.xp},noLightRainbow:true};
});await fs.writeFile(root+'/work/release-75/browser-part1.json',JSON.stringify(result,null,2));console.log(result);
