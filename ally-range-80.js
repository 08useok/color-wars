// 8.0 range balance: choose the band from the original standing range once.
// Engine distance stays in battlefield units; Battle Cats distance = / .034.
const ALLY_RANGE80_UNIT=.034;
function catRange(value){return Math.round(value/ALLY_RANGE80_UNIT);}
function allyRange80Factor(range){const n=catRange(range);return n<=400?.9:n<=500?.8:n<=800?.7:.6;}
function allyRange80Round(value,factor,positive=false){
 const n=Math.floor(value/ALLY_RANGE80_UNIT*factor/10+1e-8)*10;
 return Math.max(positive?10:0,n)*ALLY_RANGE80_UNIT;
}
{const before=unitStats;unitStats=function(type,...args){
 const s=before(type,...args);if(!ALLIES.includes(type))return s;
 const factor=allyRange80Factor(s.range),adjust=(n,positive=false)=>allyRange80Round(n,factor,positive);
 s.range=adjust(s.range,true);
 // Ruby's newly planned third form has an explicit approved 300 range.
 if(type==='ruby'&&s.trueForm)s.range=300*ALLY_RANGE80_UNIT;
 for(const key of ['engageRange','zoneMin','zoneMax','backRange','condPierceDist'])if(Number.isFinite(s[key]))s[key]=adjust(s[key],['engageRange','zoneMax','backRange'].includes(key)&&s[key]>0);
 if(s.zoneMin!==undefined&&s.zoneMax!==undefined&&s.zoneMax<s.zoneMin)s.zoneMax=s.zoneMin;
 if(s.damageTiers)s.damageTiers=s.damageTiers.map((tier,i,list)=>({...tier,max:i===list.length-1&&tier.max>=900?tier.max:adjust(tier.max)}));
 if(s.hits)s.hits=s.hits.map(hit=>{
  if(!hit.abilities)return {...hit};const abilities={...hit.abilities};
  for(const key of ['range','engageRange','zoneMin','zoneMax','backRange','condPierceDist'])if(Number.isFinite(abilities[key]))abilities[key]=adjust(abilities[key],['range','engageRange','zoneMax','backRange'].includes(key)&&abilities[key]>0);
  return {...hit,abilities};
 });
 return s;
};}
