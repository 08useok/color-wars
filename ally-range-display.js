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
 return out;
};}
{const before=renderUnitLevels;renderUnitLevels=function(){
 const out=before.apply(this,arguments);for(const id of ALLIES){const b=$(id==='red'?'#spawnBtn':'#'+id+'Btn');if(b)b.title=b.title.replace(/사거리 [\d.]+/,'사거리 '+catRange(unitStats(id).range));}return out;
};}
