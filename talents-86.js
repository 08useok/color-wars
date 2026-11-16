// Extend the existing talent wallet/store; retain all 8.1 levels and migration.
const TALENT86_IDS=['cream','hotpink'];
Object.assign(TALENT81_SPEC,{
 cream:{wave:[10,'파동 피해 -7%씩 (최대 -70%)'],curse:[10,'고대의 저주 시간 -7%씩 (최대 -70%)'],knockback:[1,'밀치기 무효'],health:[10,'체력 +2%씩 (최대 +20%)'],attack:[10,'공격력 +2%씩 (최대 +20%)']},
 hotpink:{freeze:[1,'정지 무효'],health:[10,'체력 +2%씩 (최대 +20%)'],attack:[10,'공격력 +2%씩 (최대 +20%)'],speed:[10,'이동 속도 +3%씩 (최대 +30%)'],ancient:[1,'공격력 다운 대상에 고대종 추가']}
});
for(const id of TALENT86_IDS)talent81[id]={};
try{const saved=JSON.parse(localStorage.getItem(TALENT81_KEY)||'{}');for(const id of TALENT86_IDS)for(const [key,[max]]of Object.entries(TALENT81_SPEC[id])){const n=saved?.[id]?.[key];talent81[id][key]=Number.isInteger(n)&&n>=0?Math.min(n,max):0;}}catch{}
function talent86Unlocked(id){return TALENT86_IDS.includes(id)&&trueForms.includes(id)&&trueFormAssetReady(id)&&trueFormOpen(id);}
{const before=buyTalent81;buyTalent81=function(id,key){
 if(!TALENT86_IDS.includes(id))return before.apply(this,arguments);
 const skills=TALENT81_SPEC[id];if(!Object.hasOwn(skills,key)||!talent86Unlocked(id))return false;
 const max=skills[key][0],n=talent81[id][key]||0;if(n>=max||training.xp<100000)return false;
 training.xp-=100000;talent81[id][key]=n+1;
 try{localStorage.setItem(TALENT81_KEY,JSON.stringify(talent81));}catch{}
 saveTraining();renderTraining();return true;
};}
{const before=unitStats;unitStats=function(id,...args){const s=before(id,...args);if(!s.trueForm||!TALENT86_IDS.includes(id))return s;const t=talent81[id];
 s.hp=Math.round(s.hp*(1+.02*(t.health||0)));s.atk=Math.round(s.atk*(1+.02*(t.attack||0)));
 if(id==='cream'){s.waveDamageResist=.07*(t.wave||0);s.curseDurationResist=.07*(t.curse||0);if(t.knockback)s.knockbackImmune=true;}
 if(id==='hotpink'){s.speed*=1+.03*(t.speed||0);if(t.freeze)s.immune={...s.immune,freeze:true};if(t.ancient)s.statusVs=[...new Set([...(s.statusVs||[]),'ancient'])];}
 return s;
};}
// The shared 8.1 combat wrapper already applies duration/wave resist fields.
// Present new skills for an owned third form even while its first/second is used.
{const before=renderTraining;renderTraining=function(){const r=before.apply(this,arguments);for(const card of $('#trainingGrid').children){const id=card.dataset.type;if(!TALENT86_IDS.includes(id))continue;card.querySelectorAll('.talents81').forEach(box=>box.remove());if(!talent86Unlocked(id))continue;
 const box=document.createElement('div');box.className='talents81 talents86';const title=document.createElement('p');title.textContent='8.6 본능 · 단계당 100,000 XP · 효과는 3진에 적용';box.append(title);
 for(const [key,[max,label]]of Object.entries(TALENT81_SPEC[id])){const n=talent81[id][key]||0,b=document.createElement('button');b.type='button';b.dataset.talent=key;b.textContent=label+' ('+n+'/'+max+')';b.disabled=n>=max||training.xp<100000;b.onclick=()=>buyTalent81(id,key);box.append(b);}card.append(box);
 }return r;};}
if(typeof allyReview==='function'){const before=allyReview;allyReview=function(id,evolved){let text=before.apply(this,arguments);if(!TALENT86_IDS.includes(id)||!codexReviewStats(id,evolved).trueForm)return text;
 const skills=Object.entries(TALENT81_SPEC[id]).map(([key,[max,label]])=>label+' · '+(talent81[id][key]||0)+'/'+max+'단계').join('<br>');
 const note=id==='cream'?'내성 최대 구매 시 파동 피해와 저주 지속시간은 각각 원래의 30%가 남습니다. 밀치기 무효는 적의 날려버리기를 막으며 보스 등장 충격파나 체력 감소 히트백을 없애지는 않습니다.':'고대종 추가는 기존 공격력 다운의 적용 대상을 늘립니다. 초데미지·맷집이나 고대의 저주 무효가 추가되지는 않습니다.';
 const section='<section class="talent86-review"><h4>8.6 본능</h4><p>'+skills+'</p><p>단계당 100,000 XP · 구매 효과는 3진에만 적용됩니다. '+note+'</p></section>';
 return text.replace(/<section><h4>8\.1 본능<\/h4>[\s\S]*?<\/section>/,'')+section;
};}
if(typeof codexReviewAbilities==='function'){const before=codexReviewAbilities;codexReviewAbilities=function(s){const a=before.apply(this,arguments),p=n=>Math.round(n*100)+'%';if(s.waveDamageResist)a.push('파동 피해 '+p(s.waveDamageResist)+' 감소. 파동 무효가 아니므로 남은 피해는 받습니다.');if(s.curseDurationResist)a.push('고대의 저주 지속시간 '+p(s.curseDurationResist)+' 감소. 저주 무효가 아닙니다.');if(s.knockbackImmune)a.push('적의 밀치기 무효. 체력 감소 히트백과 보스 등장 충격파는 유지됩니다.');if(s.immune?.freeze)a.push('움직임을 멈춘다 무효.');return a;};}
// The consistency renderer replaces the initial review; remove its old tail too.
if(typeof renderCodexPreview==='function'){const before=renderCodexPreview;renderCodexPreview=function(){const r=before.apply(this,arguments);const sections=[...document.querySelectorAll('#codexExtra .talent86-review')];for(const section of sections.slice(0,-1))section.remove();return r;};}
renderTraining();
