// Independent advent allies. Targets below are Lv.20, evolved, without combos.
const SUBSPECIES={
 mixedwhite:{name:'뒤죽박죽 화이트',evolved:'샘플 화이트',event:'화이트 강림',color:'#eee',hp:23000,dps:1300,interval:4,cost:1000,cooldown:28,range:18,role:'실험 약화·둔화 지원',extra:{area:true,attackClass:'범위',atkDownPct:.5,atkDownChance:.5,atkDownDuration:4,slowChance:.3,slowDuration:3}},
 earphonered:{name:'이어폰 레드',evolved:'헤드셋 레드',event:'레드 강림',color:'#ed4545',hp:26000,dps:1000,interval:5,cost:1100,cooldown:32,range:22,role:'표식으로 팀 피해 증가',extra:{area:true,attackClass:'범위',markChance:.6,markDuration:5,markMult:1.3}},
 shotguntan:{name:'샷건 탄',evolved:'T . ak47',event:'탄 강림',color:'#d2b48c',hp:21000,dps:2400,interval:6,cost:1250,cooldown:36,range:14,role:'6연사 · 천사 초데미지 · 치명타',extra:{massiveVs:['angel'],critChance:.2,critMult:2,blowChance:.2,blowDistance:8,hits:Array.from({length:6},(_,i)=>({at:.4+i*.16,share:1/6}))}}
};
for(const [id,s] of Object.entries(SUBSPECIES)){
 for(const list of [EX_TYPES,EX_GRADE,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(id))list.push(id);
 data.units[id]={hp:500,atk:100,interval:s.interval,speed:4,range:s.range,cost:s.cost,cooldown:s.cooldown,knockbacks:3,flatCost:true,noRangeGrow:true,attackDuration:2,windup:.4,...s.extra};
 LV20_TARGET[id]={hp:s.hp/1.15,atk:s.dps*s.interval/1.15};
 UNIT_NAMES[id]=EX_NAME[id]=s.name;COLORS[id]=s.color;ROLES[id]=s.role;
 PROFILE_TEXT[id]=`${s.event}에서 획득하는 여성형 독립 아종. ${s.role}.`;
 PROFILE_TEXT_EVOLVED[id]=`${s.evolved}. 여성형 독립 아종. ${s.role}.`;EVOLUTION_TEXT[id]=s.evolved;ACQUIRE_TEXT[id]=s.event+' 클리어 보상';
 const savedLevel=SUBSPECIES_SAVED_TRAINING?.levels?.[id];training.levels[id]=Number.isInteger(savedLevel)?Math.max(1,Math.min(LEVEL_HARD_MAX,savedLevel)):1;
 if(SUBSPECIES_SAVED_TRAINING?.forms?.[id]===1)training.forms[id]=1;
 const base=CLOVER_VARIANT_ATLASES[id],evo=CLOVER_VARIANT_ATLASES[{mixedwhite:'samplewhite',earphonered:'headsetred',shotguntan:'tak47'}[id]];
 base.continuousAttack=evo.continuousAttack=true;NEW_ATLASES[id]={...base,evolved:evo};
 const button=document.createElement('button');button.id=id+'Btn';button.className='unit-btn';button.innerHTML='<i></i><strong>'+s.name+'</strong><small></small><em></em>';button.onclick=()=>addUnit(id);$('.controls').append(button);
}
const _subName=unitDisplayName;
unitDisplayName=function(t,tr=false,ev=false){return SUBSPECIES[t]?(ev?SUBSPECIES[t].evolved:SUBSPECIES[t].name):_subName(t,tr,ev)};
const _subCanTrue=canTrueForm,_subHasTrue=hasTrueForm;
canTrueForm=function(t){return !SUBSPECIES[t]&&_subCanTrue(t)};
hasTrueForm=function(t){return !SUBSPECIES[t]&&_subHasTrue(t)};
const _subBadges=codexTraitBadges;
codexTraitBadges=function(d){const b=_subBadges(d);if(d.markChance)b.push(`표식 ${Math.round(d.markChance*100)}% · ${d.markDuration}초 · 받는 피해 +${Math.round((d.markMult-1)*100)}%`);if(d.hits?.length===6)b.push('6연사');return b};
const _subTraining=renderTraining;
renderTraining=function(){_subTraining();for(const card of $('#trainingGrid').children){const t=card.dataset.type;if(!SUBSPECIES[t])continue;card.querySelector('.true-btn')?.remove();const h=card.querySelector('h3');if(h?.firstChild?.nodeType===3)h.firstChild.textContent=unitDisplayName(t,false,unitStats(t).evolved)+' '}};
let subspeciesClears=[];
try{const v=JSON.parse(localStorage.getItem('red-battle-subspecies-v1')||'[]');if(Array.isArray(v))subspeciesClears=v.filter(k=>typeof k==='string'&&Object.keys(SUBSPECIES).some(id=>k===id+':0'||k===id+':1'))}catch{}
const SUBSPECIES_START=STAGES.length;
for(const [id,s] of Object.entries(SUBSPECIES))for(let tier=0;tier<2;tier++){
 const i=STAGES.length,hard=tier===1,boss={mixedwhite:'bunbun',earphonered:'nyandam',shotguntan:'shyboy'}[id];
 STAGES.push({name:s.event+' '+(hard?'초극난도':'극난도'),flag:'⚔️',hp:hard?500000:200000,gap:4,wave:0,sky:'#dfdbea',land:s.color,chapter:'special',maxEnemies:hard?15:12,subspecies:{id,tier},special:{item:id,itemName:s.name,count:1,chance:hard?1:.3,xp:hard?20000:10000},desc:`${s.name} ${hard?'100':'30'}% 획득 · 보스 ${UNIT_NAMES[boss]||boss}`});
 STAGE_SPAWNS[i]=[{type:'dog',at:{t:0},delay:[4,8],mag:hard?300:200},{type:'hippo',at:{t:8},delay:[12,20],mag:hard?300:200},{type:boss,at:{hp:90},count:hard?3:1,delay:[6,10],boss:true,mag:hard?600:400}];
}
function subspeciesTierOpen(id,tier){return tier===0?cleared.includes(CHAPTER1_LEN*2-1):subspeciesClears.includes(id+':0')}
const _subDrop=specialDropOpen,_subGive=giveSpecialItem,_subItem=specialItemText;
specialDropOpen=function(sp){return SUBSPECIES[sp.item]?!gachaOwns(sp.item):_subDrop(sp)};
giveSpecialItem=function(item,n){if(SUBSPECIES[item]){grantEx(item);return}_subGive(item,n)};
specialItemText=function(item,n){return SUBSPECIES[item]?'EX '+SUBSPECIES[item].name+' 획득!':_subItem(item,n)};
const _subFinish=finish;
finish=function(win){const fresh=!game.ended,sp=STAGES[selectedStage].subspecies;_subFinish(win);if(fresh&&win&&sp){const key=sp.id+':'+sp.tier;if(!subspeciesClears.includes(key)){subspeciesClears.push(key);localStorage.setItem('red-battle-subspecies-v1',JSON.stringify(subspeciesClears))}}};
const _subReset=reset;
reset=function(){const sp=STAGES[selectedStage].subspecies;if(sp&&!subspeciesTierOpen(sp.id,sp.tier)){openStages();return}_subReset()};
const _subSpecial=renderSpecialStages;
renderSpecialStages=function(){_subSpecial();for(const [n,[id,s]] of Object.entries(Object.entries(SUBSPECIES))){const row=document.createElement('div');row.className='special-row today';row.innerHTML='<div class="special-label"><b class="day">매일</b><strong>⚔️ '+s.event+'</strong><small>'+s.name+'</small></div>';for(let tier=0;tier<2;tier++){const i=SUBSPECIES_START+Number(n)*2+tier,b=document.createElement('button'),open=subspeciesTierOpen(id,tier);b.className='stage-card ribbon';b.disabled=!open;b.innerHTML='<strong>'+(tier?'초극난도':'극난도')+'</strong><small>'+(!open?(tier?'극난도 클리어 필요':'세계편 2장 클리어 필요'):gachaOwns(id)?'획득 완료':tier?'100%':'30%')+'</small>';b.title=STAGES[i].desc;b.onclick=()=>{selectedStage=i;reset()};row.append(b)}$('#specialGrid').append(row)}};
const markStyle=document.createElement('style');markStyle.textContent='.unit.marked .bar{outline:2px solid #ff5252}.unit.marked .status-badges::after{content:"표식 +30%";color:#ff5252;background:#fff;font-size:10px;white-space:nowrap}';document.head.append(markStyle);
renderNewButtons();renderDeckButtons();renderTraining();renderSpecialStages();
