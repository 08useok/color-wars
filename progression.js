// Base levels, duplicate +levels and grade-specific Catseyes are separate resources.
const PLUS_MAX=10,CATSEYE_MAX=10,CATSEYE_GRADES=['ex','sr','uber'];
const PROGRESSION_KEY='red-battle-progression-v1';
let progression={plus:{},eyes:{ex:0,sr:0,uber:0},used:{},eyeRewards:[]};
try{const v=JSON.parse(localStorage.getItem(PROGRESSION_KEY)||'{}');for(const t of ALLIES){for(const k of ['plus','used'])progression[k][t]=Number.isInteger(v[k]?.[t])?Math.max(0,Math.min(10,v[k][t])):0}for(const g of CATSEYE_GRADES)progression.eyes[g]=Number.isSafeInteger(v.eyes?.[g])?Math.max(0,v.eyes[g]):0;if(Array.isArray(v.eyeRewards))progression.eyeRewards=v.eyeRewards.filter(Number.isInteger)}catch{}
function saveProgression(){try{localStorage.setItem(PROGRESSION_KEY,JSON.stringify(progression))}catch{}}
function plusLevel(t){return progression.plus[t]||0}
function totalLevel(t){return (training.levels[t]||1)+plusLevel(t)}
function levelText(t){return `${training.levels[t]||1}${plusLevel(t)?' +'+plusLevel(t):''}`}
function addPlusLevel(t){if(!ALLIES.includes(t)||!allyUnlocked(t)||plusLevel(t)>=PLUS_MAX)return false;progression.plus[t]=plusLevel(t)+1;saveProgression();return true}
function addCatseyes(grade,n){if(!CATSEYE_GRADES.includes(grade)||!Number.isSafeInteger(n)||n<=0)return;progression.eyes[grade]+=n;saveProgression()}
// Preserve previously purchased Lv.31~40. No lost levels or arbitrary compensation.
for(const t of ALLIES){const l=training.levels[t]||1,g=gradeOf(t);if(l>30){if(g==='basic'||g==='rare'){training.levels[t]=30;progression.plus[t]=Math.min(PLUS_MAX,plusLevel(t)+l-30)}else if(CATSEYE_GRADES.includes(g))progression.used[t]=Math.max(progression.used[t]||0,l-30)}}
saveProgression();saveTraining();
function grantEyeReward(x){if(!x.eyes||progression.eyeRewards.includes(x.at))return;for(const [g,n] of Object.entries(x.eyes))if(CATSEYE_GRADES.includes(g))progression.eyes[g]+=n;progression.eyeRewards.push(x.at);saveProgression()}
// Previously claimed Lv.35 milestones become Catseye rewards exactly once.
for(const x of RANK_REWARDS)if(rankClaimed.includes(x.at))grantEyeReward(x);
levelCapOf=function(t){const c=levelCap();if(c<LV_MAX)return c;const g=gradeOf(t),base=Math.min(30,Math.max(c,rankCapOf(g)));return CATSEYE_GRADES.includes(g)?Math.max(base,(progression.used[t]||0)?30+progression.used[t]:base):base};
function canUseCatseye(t){const g=gradeOf(t);return CATSEYE_GRADES.includes(g)&&allyUnlocked(t)&&rankCapOf(g)>=30&&(training.levels[t]||1)>=30&&(progression.used[t]||0)<CATSEYE_MAX&&progression.eyes[g]>0}
function useCatseye(t){if(!canUseCatseye(t))return false;const g=gradeOf(t);progression.eyes[g]--;progression.used[t]=(progression.used[t]||0)+1;saveProgression();renderTraining();return true}
const _unitStatsProgression=unitStats;
unitStats=function(t,level=training.levels[t]||1,form){if(level<LV_EVOLVE)form=1;return _unitStatsProgression(t,level+plusLevel(t),form)};
userRank=function(){return ALLIES.reduce((n,t)=>n+(allyUnlocked(t)?totalLevel(t):0),0)};
rankMax=function(){return ALLIES.reduce((n,t)=>n+levelCapOf(t)+PLUS_MAX,0)};
const _renderUnitLevelsProgression=renderUnitLevels;
renderUnitLevels=function(){_renderUnitLevelsProgression();for(const t of ALLIES){const b=$(t==='red'?'#spawnBtn':'#'+t+'Btn');if(b?.querySelector('strong')?.firstChild)b.querySelector('strong').firstChild.nodeValue=b.querySelector('strong').firstChild.nodeValue.replace(/Lv\.\d+$/,`Lv.${levelText(t)}`)}};
const _renderTrainingProgression=renderTraining;
renderTraining=function(){_renderTrainingProgression();let p=$('#catseyeText');if(!p){p=document.createElement('p');p.id='catseyeText';p.className='catfruit-line';$('#deckText').after(p)}p.textContent=`캣츠아이: EX ${progression.eyes.ex} · 슈퍼 레어 ${progression.eyes.sr} · 울슈레 ${progression.eyes.uber} | +레벨 최대 +10 (중복 뽑기), 캣츠아이 1개 = 상한 +1 (Lv.40까지)`;
 for(const card of $('#trainingGrid').children){const t=card.dataset.type;if(!t)continue;const lv=card.querySelector('h3 small');if(lv)lv.textContent=`Lv.${levelText(t)} / ${levelCapOf(t)} (+${PLUS_MAX})`;if(CATSEYE_GRADES.includes(gradeOf(t))){const b=document.createElement('button');b.textContent=(progression.used[t]||0)>=10?'캣츠아이 상한 Lv.40':'캣츠아이 1개 · 상한 +1';b.disabled=!canUseCatseye(t);b.title='기본 Lv.30, 해당 등급 Lv.30 랭크 보상 필요. 상한만 확장하며 레벨업에는 XP가 필요합니다.';b.onclick=()=>useCatseye(t);card.append(b)}}};
// Duplicates give +1 until +10, then use the existing XP conversion.
const _gachaRollProgression=gachaRoll;
gachaRoll=function(){const r=_gachaRollProgression.apply(this,arguments);if(r.dup&&addPlusLevel(r.id)){training.xp-=r.xp;r.plus=plusLevel(r.id);r.xp=0;saveTraining()}return r};
const _grantExProgression=grantEx;
grantEx=function(t){if(gachaOwns(t)){if(addPlusLevel(t)){gachaAppendDetail(`${UNIT_NAMES[t]} +레벨 ${plusLevel(t)}!`);renderTraining();return true}return false}return _grantExProgression(t)};
const _rankGrantProgression=rankGrant;
rankGrant=function(x){_rankGrantProgression(x);grantEyeReward(x)};
renderTraining();renderUnitLevels();
