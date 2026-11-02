// Approved 2.8x second-form HP/ATK; explicit post-8.0 standing ranges.
const THIRD81={
 spintoprainbow:{name:'오비탈 레인보우',range:250,crit:.65,hits:[.12,.30,.48,.60],duration:.74},
 hulasilver:{name:'듀얼링 실버',range:310,crit:.5,freezeChance:.85,hits:[.25,.5],duration:.85},
 rhythmpink:{name:'앙코르 리듬 핑크',range:280,crit:.5,freezeChance:.75,hits:[.25,.5],duration:.85},
 drumscarlet:{name:'그랜드마치 스칼렛',range:360,crit:.5,atkDownChance:.65,hits:[.25,.5],duration:.85}
};
// catfruit.js loads before these late-registered allies exist in ALLIES.
// Restore their saved ownership after registration without granting new forms.
try{const saved=JSON.parse(localStorage.getItem('red-battle-trueform-v1')||'[]');if(Array.isArray(saved))for(const id of saved)if(THIRD81[id]&&!trueForms.includes(id))trueForms.push(id);}catch{}
{const before=trueFormOpen;trueFormOpen=function(id){if(!THIRD81[id])return before(id);try{return readventCleared(id);}catch{return false;}};}
{const before=costText;costText=function(id){return THIRD81[id]&&!trueFormOpen(id)?'해당 사이클론 재강림 강화판 클리어 필요':before(id);};}
{const before=unitDisplayName;unitDisplayName=function(id,trueForm,evolved){return trueForm&&THIRD81[id]?THIRD81[id].name:before(id,trueForm,evolved);};}
for(const [id,c]of Object.entries(THIRD81)){
 TRUE_NAME[id]=c.name;TRUE_FORM_HP_MULT[id]=2.8;TRUE_FORM_ATK_MULT[id]=2.8;
 const bonus={critChance:c.crit,critMult:2,strikes:true,windup:c.hits[0],attackDuration:c.duration,hits:c.hits.map(at=>({at,share:1/c.hits.length}))};
 for(const k of ['freezeChance','atkDownChance'])if(c[k]!==undefined)bonus[k]=c[k];
 TRUE_FORM_BONUS[id]=bonus;
 const src=THIRD_FORM_81_MOTION_ATLASES[id+'_3'];
 NEW_ATLASES[id].true={...src,attackKeys:[[0,0],...c.hits.map((t,i)=>[t*30,i+1]),[c.duration*30-2,6]]};
 PROFILE_ART_TRUE[id]=src.sheet.replace(/\.webp(?=\?|$)/,'-profile.webp');
}
{const before=unitStats;unitStats=function(id,...args){const s=before(id,...args);if(s.trueForm&&THIRD81[id]){s.range=THIRD81[id].range*.034;if(id==='hulasilver'){s.speed*=1.2;s.interval*=.85;}}return s;};}
// Older per-character animation wrappers select the evolved atlas themselves.
// Temporarily alias it to the third atlas so their idle handling stays correct.
{const before=animateAtlas;animateAtlas=function(u){
 if(!u.stats?.trueForm||!THIRD81[u.type])return before(u);
 const base=NEW_ATLASES[u.type],a=base.true,old=base.evolved,walk=a.walk,step=a.walkStep,stationary=u.third81X===u.x;u.third81X=u.x;
 try{base.evolved=a;if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}return before(u);}finally{base.evolved=old;a.walk=walk;a.walkStep=step;}
};}
renderTraining();renderNewButtons();renderDeckButtons();
