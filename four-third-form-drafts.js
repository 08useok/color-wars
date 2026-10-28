// Approved 7.2 third-form abilities. Dedicated art is registered separately;
// catfruit.js still enforces ownership, chapter, level and material requirements.
const THIRD_FORM_72_DRAFTS={
 lavender:{hp:1.5,atk:1.4,bonus:{atkDownChance:1,atkDownDuration:7,slowChance:1,slowDuration:3,interval:3,strengthen:{at:.5,mult:2}}},
 azure:{hp:3,atk:3,bonus:{critChance:.2,critMult:2,savageChance:.3,savageMult:3,wave:{chance:.3,level:10,reach:77.1,mult:1}}},
 aqua:{hp:1.5,atk:2.5,bonus:{slowChance:1,slowDuration:8,statusVs:['floating','angel']}},
 babyblue:{hp:1.5,atk:2.5,bonus:{interval:.75,blowChance:.7}}
};
for(const [id,draft]of Object.entries(THIRD_FORM_72_DRAFTS)){
 TRUE_FORM_HP_MULT[id]=draft.hp;TRUE_FORM_ATK_MULT[id]=draft.atk;TRUE_FORM_BONUS[id]=draft.bonus;
}
(function(){const before=unitStats;
 unitStats=function(type,...args){const s=before(type,...args);
  if(type==='babyblue'&&s.trueForm){
   // Apply the requested 80% cut to the already researched 2nd-form wait (19 -> 3.8s).
   s.cooldown=Math.round(s.cooldown*.2*100)/100;
   // A literal 30 off the displayed price in each chapter; no first/second-form change.
   s.cost=Math.max(0,s.cost-30);
  }
  return s;
 };
})();
