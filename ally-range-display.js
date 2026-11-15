// Presentation uses Battle Cats units for allies; combat coordinates stay intact.
{const before=renderCodexPreview;renderCodexPreview=function(){
 const out=before.apply(this,arguments);if(codexTab==='stage')return out;
 for(const dt of document.querySelectorAll('#codexStats dt')){
  const label=dt.textContent,dd=dt.nextElementSibling;if(!dd)continue;
  if(label==='사거리'){
   // Old renderer rounds to a whole battlefield unit; obtain exact form stats
   // from the preview unit to avoid losing precision during conversion.
   const s=codexUnit?.stats;if(s)dd.textContent=String(catRange(s.range));
  }
  if(label==='사각지대'&&codexUnit)dd.textContent=catRange(deadZone(codexUnit))+' 이내';
 }
 if(codexTab==='ally'){
  const s=codexUnit?.stats;
  if(s)for(const dt of document.querySelectorAll('#codexExtra .codex-review-numbers dt'))if(dt.textContent==='사거리')dt.nextElementSibling.textContent=String(catRange(s.range));
  const review=document.querySelector('#codexExtra .codex-review');
  if(review)for(const p of review.querySelectorAll('p'))if(p.textContent.includes('표·총평 공통:'))p.textContent=p.textContent.replace('사거리는 게임 내 단위','사거리는 냥코식 단위');
 }
 return out;
};}
{const before=renderUnitLevels;renderUnitLevels=function(){
 const out=before.apply(this,arguments);for(const id of ALLIES){const b=$(id==='red'?'#spawnBtn':'#'+id+'Btn');if(b)b.title=b.title.replace(/사거리 [\d.]+/,'사거리 '+catRange(unitStats(id).range));}return out;
};}
