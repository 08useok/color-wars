// Ownership and active form are separate: choosing 2 must not re-enable owned 3rd forms.
const ALLY_FORM_CHOICE_KEY='red-battle-active-form-v1';
const ALLY_FORM_CHOICE={};
try{const saved=JSON.parse(localStorage.getItem(ALLY_FORM_CHOICE_KEY)||'{}');for(const [id,form]of Object.entries(saved||{}))if(ALLIES.includes(id)&&form===2)ALLY_FORM_CHOICE[id]=2;}catch{}
function saveAllyFormChoice(){try{localStorage.setItem(ALLY_FORM_CHOICE_KEY,JSON.stringify(ALLY_FORM_CHOICE));}catch{}}
{const before=hasTrueForm;hasTrueForm=function(id){return ALLY_FORM_CHOICE[id]!==2&&before(id);};}
{const before=setForm;
 setForm=function(id,form){
  if(!ALLIES.includes(id)||(training.levels[id]||1)<LV_EVOLVE||![1,2,3].includes(form))return false;
  if(form===3&&(!trueForms.includes(id)||!trueFormAssetReady(id)||!trueFormOpen(id)))return false;
  if(form===2&&trueForms.includes(id))ALLY_FORM_CHOICE[id]=2;else delete ALLY_FORM_CHOICE[id];
  saveAllyFormChoice();return before(id,form===1?1:2);
 };
}
{const before=renderTraining;
 renderTraining=function(){before.apply(this,arguments);
  for(const card of $('#trainingGrid').children){const id=card.dataset.type;if(!id||!trueForms.includes(id)||!trueFormAssetReady(id)||!trueFormOpen(id)||(training.levels[id]||1)<LV_EVOLVE)continue;
   const old=card.querySelector('.form-btn');if(!old)continue;
   const current=unitStats(id),active=current.trueForm?3:current.evolved?2:1,row=document.createElement('div');row.className='form-choice-buttons';row.style.cssText='display:flex;gap:6px;flex-wrap:wrap';
   for(const form of [1,2,3]){const b=document.createElement('button');b.type='button';b.className='form-btn';b.textContent=active===form?form+'진 사용 중':form+'진으로 변경';b.disabled=active===form;b.setAttribute('aria-pressed',String(active===form));b.onclick=()=>setForm(id,form);row.append(b);}
   old.replaceWith(row);
  }
 };
}
renderTraining();renderDeckButtons();
