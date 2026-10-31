const fs=await import('node:fs/promises'),{fileURLToPath}=await import('node:url'),root=fileURLToPath(new URL('..',import.meta.url)).replaceAll('\\','/'),space=JSON.parse(await fs.readFile(root+'/work/release-75/space.json','utf8')),task=await taskSpace(space.id),page=task.page('p1');await page.reload();
const result=await page.evaluate(async()=>{
 game.paused=true;const ids=Object.keys(BUSTERS75);if(!ids.every(gachaOwns)||gacha.fix!==6||gacha.pityS['레드 바스터즈']!==17||gacha.pityS['블랙 바스터즈']!==9||!hasTrueForm('verdigris'))throw Error('reload persistence');
 const forms=ids.flatMap(id=>[1,2].map(form=>({id,form}))).concat([{id:'verdigris',form:3}]),sprites=[];
 for(const {id,form}of forms){deck=[id];setForm(id,form);reset();game.paused=true;game.running=true;game.tutorial=99;game.money=1e9;game.spawnRules=[];await prepareBattleImages();game.paused=false;addUnit(id);game.paused=true;
  const u=game.units.find(u=>u.ally&&u.type===id);if(!u)throw Error('deployment '+id);const base=NEW_ATLASES[id],atlas=form===3?base.true:form===2?base.evolved:base;
  const im=new Image();im.src=atlas.sheet;await im.decode();const positions=[];
  for(const mode of ['walk','attack','hurt']){u.hurtTime=mode==='hurt'?.2:0;u.attackTime=mode==='attack'?(u.stats.attackDuration||.56)*.6:0;u.animTime=.16;animateAtlas(u);positions.push(u.el.querySelector('.dog-sprite').style.backgroundPosition);}
  const style=u.el.querySelector('.dog-sprite').style.backgroundImage;if(!style.includes(atlas.sheet)||new Set(positions).size<2)throw Error('atlas '+id+' '+form);
  if(!!u.stats.trueForm!==(form===3)||!!u.stats.evolved!==(form>1))throw Error('form '+id+' '+form);
  const review=allyReview(id,form>1);if(!review.includes(form===3?'1.7초':BUSTERS75_ASSESSMENT[id].strength))throw Error('review '+id);
  sprites.push({id,form,image:[im.naturalWidth,im.naturalHeight],style,positions});
 }
 game.running=false;return {version:GAME_VERSION,reload:true,sprites,arenas:STAGES.filter(s=>s.tierArena).length,thirdReady:trueFormAssetReady('verdigris')};
});const first=JSON.parse(await fs.readFile(root+'/work/release-75/browser-part1.json','utf8'));await fs.writeFile(root+'/docs/simulations/release-75-browser-2026-10-31.json',JSON.stringify({acquisition:first,battle:result},null,2));console.log(result);await task.finish({keep:[]});
