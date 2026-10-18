// Preview form selection is temporary and never changes owned evolutions.
(function(){
 const previous=renderCodexPreview;let selection=null;
 renderCodexPreview=function(){
  if(selection&&(selection.type!==codexType||codexTab!=='ally'||!codexEvolved&&selection.form!==1))selection=null;
  const saved=trueForms;
  try{
   if(selection?.form===2)trueForms=saved.filter(t=>t!==codexType);
   previous();
   const old=document.querySelector('#codexEvolveToggle');
   let box=document.querySelector('#codexFormAssets');
   if(!box){box=document.createElement('div');box.id='codexFormAssets';old.after(box)}
   box.replaceChildren();
   if(codexTab!=='ally'||!codexUnit){box.hidden=true;return}
   old.classList.add('hidden');box.hidden=false;box.style.cssText='display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px';
   const current=!codexEvolved?1:codexReviewStats(codexType,true).trueForm?3:2;
   for(const form of data.units[codexType].noEvolve?[1]:[1,2,3]){
    const owned=form!==3||saved.includes(codexType)&&trueFormAssetReady(codexType);
    const button=document.createElement('button');button.type='button';button.disabled=!owned;
    button.dataset.form=form;button.setAttribute('aria-pressed',String(current===form));
    button.style.cssText='position:relative;width:88px;padding:4px;overflow:hidden;border:2px solid '+(current===form?'#e6a735':'#aaa');
    const label=form+'진'+(!owned?(trueFormAssetReady(codexType)?' · 미획득':' · 곧 출시 예정'):'');
    button.title=label;button.setAttribute('aria-label',label+' 보기');
    if(owned){
     const profile=document.createElement('div');profile.style.cssText='height:78px;overflow:hidden;position:relative';
     const before=trueForms;try{trueForms=form===2?saved.filter(t=>t!==codexType):saved;profile.innerHTML=profileMarkup(codexType,form!==1)}finally{trueForms=before}
     const art=profile.firstElementChild;if(art){art.style.transform='scale(.60)';art.style.transformOrigin='top left'}
     button.append(profile);
    }
    const caption=document.createElement('span');caption.textContent=label;button.append(caption);
    button.onclick=()=>{selection={type:codexType,form};codexEvolved=form!==1;renderCodexPreview()};box.append(button);
   }
  }finally{trueForms=saved}
 };
})();
