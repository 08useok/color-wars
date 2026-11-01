const fs=await import('node:fs/promises'),{fileURLToPath}=await import('node:url'),root=fileURLToPath(new URL('..',import.meta.url)).replaceAll('\\','/'),server=JSON.parse(await fs.readFile(root+'/work/release-75/server.json','utf8'));
const task=await taskSpace('range80-display-20261031'),page=task.page('p1');console.log('SPACE',task.spaceId);
await page.goto('http://127.0.0.1:'+server.port+'/red-battle-doge.html');
const result=await page.evaluate(()=>{
 game.paused=true;cleared=STAGES.map((_,i)=>i);gacha.owned=[...ALLIES];for(const id of ALLIES)training.levels[id]=30;
 codexTab='ally';codexWiki=true;const rows=[];
 for(const id of ['red','ruby','moss','rainbow','raspberry','heliotrope','wisteria','verdigris']){
  codexType=id;codexEvolved=true;renderCodexPreview();const dt=[...document.querySelectorAll('#codexStats dt')].find(dt=>dt.textContent==='사거리'),shown=dt?.nextElementSibling?.textContent;
  const expected=String(catRange(codexUnit.stats.range));if(shown!==expected)throw Error(id+' range '+shown+' expected '+expected);
  if(Number(shown)%10)throw Error('not ten units');rows.push({id,shown,expected});
 }
 renderUnitLevels();const title=document.querySelector('#spawnBtn').title;if(!title.includes('사거리 '+catRange(unitStats('red').range)))throw Error('tooltip');
 const review=allyReview('ruby',true);if(!review.includes(String(catRange(codexReviewStats('ruby',true).range))))throw Error('review units');
 codexTab='enemy';codexType='dog';renderCodexPreview();const shown=[...document.querySelectorAll('#codexStats dt')].find(dt=>dt.textContent==='사거리')?.nextElementSibling?.textContent;if(shown!==String(catRange(data.units.dog.range)))throw Error('enemy display units');
 return {rows,title,review:true,enemyDisplayConvertedOnly:true};
});await fs.mkdir(root+'/work/range-audit-80',{recursive:true});await fs.writeFile(root+'/work/range-audit-80/browser.json',JSON.stringify(result,null,2));console.log(result);await task.finish({keep:[]});
