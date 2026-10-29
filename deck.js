// Dedicated deck editor. Changes use the existing deck save and deployment controls.
let deckEditorGrade='all';
let deckEditorCounter='all';
const DECK_COUNTER_TRAITS=[['all','전체'],['red','빨간 적'],['floating','떠 있는 적'],['black','검은 적'],['metal','메탈'],['angel','천사'],['alien','에이리언'],['zombie','좀비'],['traitless','무속성']];
function deckCounterReasons(s,trait){
 if(trait==='all'||s.onlyTraitless&&trait!=='traitless')return [];
 if(s.hiddenAbility&&typeof futureOpen==='function'&&!futureOpen())return [];
 const reasons=[];
 for(const [key,label]of [['strongVs','엄청 강하다'],['resistVs','맷집'],['massiveVs','초데미지'],['extremeVs','극데미지']])if(s[key]?.includes(trait)&&!(trait==='metal'&&['massiveVs','extremeVs'].includes(key)))reasons.push(label);
 if(trait==='red'&&s.redStrong)reasons.push('빨간 적 특화');
 if(trait==='floating'&&s.floatStrong)reasons.push('떠 있는 적 특화');
 if(trait==='traitless'&&s.onlyTraitless)reasons.push('무속성 전용');
 if(trait==='metal'){if(s.critChance>0)reasons.push('크리티컬');if(s.metalKiller>0)reasons.push('메탈 킬러');if(s.metalPriority)reasons.push('메탈 우선');}
 if(trait==='zombie'&&s.zombieKiller)reasons.push('좀비 킬러');
 if(trait==='alien'&&s.barrierBreak>0)reasons.push('베리어 브레이커');
 if(!s.statusVs?.length||s.statusVs.includes(trait)){
  const prefix=s.statusVs?.length?'':'공통 ';
  if(s.freezeChance>0)reasons.push(prefix+'정지');
  if(s.slowChance>0)reasons.push(prefix+'느리게');
  if(s.atkDownChance>0&&s.atkDownPct>0)reasons.push(prefix+'공격력 다운');
  if(s.blowChance>0)reasons.push(prefix+'날려버리기');
 }
 return [...new Set(reasons)];
}
const ENDGAME_DECK=['red','yellow','brick','indigo','ribbonorange','rainbow','cornflower','khaki','silver','fusioncream'];
function applyEndgameDeck(){
 if(ENDGAME_DECK.some(t=>!allyUnlocked(t)||!allyStageAllowed(t)))return false;
 deck=[...ENDGAME_DECK];saveDeck();renderTraining();render();renderDeckEditor();return true;
}
const DECK_EDITOR=document.createElement('section');
DECK_EDITOR.id='deckEditor';DECK_EDITOR.className='overlay hidden';
DECK_EDITOR.setAttribute('role','dialog');DECK_EDITOR.setAttribute('aria-modal','true');DECK_EDITOR.setAttribute('aria-labelledby','deckEditorTitle');
DECK_EDITOR.innerHTML='<div class="deck-editor-panel"><div class="codex-heading"><h1 id="deckEditorTitle">덱 세팅</h1><button id="deckEditorClose" type="button">닫기</button></div><p id="deckEditorInfo" role="status"></p><section id="deckEditorCombos" aria-label="아군 콤보"></section><div id="deckEditorSlots" class="deck-editor-slots"></div><div id="deckEditorGrades" class="codex-tabs grade-tabs"></div><div id="deckEditorUnits" class="deck-editor-units"></div></div>';
$('#game').append(DECK_EDITOR);
const counterToggle=document.createElement('button');counterToggle.id='deckCounterToggle';counterToggle.type='button';counterToggle.textContent='속성 대항 찾기';counterToggle.setAttribute('aria-expanded','false');counterToggle.setAttribute('aria-controls','deckCounterPanel');
const counterPanel=document.createElement('section');counterPanel.id='deckCounterPanel';counterPanel.hidden=true;counterPanel.setAttribute('aria-label','속성 대항 찾기');
const counterHint=document.createElement('p');counterHint.textContent='적 속성을 골라 보유 아군을 찾으세요. 현재 선택한 진화 형태의 특효·메즈를 표시하며, 모든 속성에 통하는 메즈는 공통으로 표시합니다.';counterPanel.append(counterHint);
const counterButtons=document.createElement('div');counterButtons.className='codex-tabs grade-tabs';
for(const [trait,label]of DECK_COUNTER_TRAITS){const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.counterTrait=trait;b.setAttribute('aria-pressed',String(trait==='all'));b.onclick=()=>{deckEditorCounter=trait;renderDeckEditor();};counterButtons.append(b);}
counterPanel.append(counterButtons);$('#deckEditorGrades').before(counterToggle,counterPanel);
counterToggle.onclick=()=>{counterPanel.hidden=!counterPanel.hidden;counterToggle.setAttribute('aria-expanded',String(!counterPanel.hidden));if(counterPanel.hidden){deckEditorCounter='all';renderDeckEditor();}};
const DECK_EDITOR_BUTTON=document.createElement('button');DECK_EDITOR_BUTTON.id='deckEditorBtn';DECK_EDITOR_BUTTON.type='button';DECK_EDITOR_BUTTON.textContent='덱 세팅';$('#codexBtn').after(DECK_EDITOR_BUTTON);
function deckEditorName(t){const s=unitStats(t);return unitDisplayName(t,s.trueForm,s.evolved)}
function changeDeckOrder(t,delta){const i=deck.indexOf(t),j=i+delta;if(i<0||j<0||j>=deck.length)return;[deck[i],deck[j]]=[deck[j],deck[i]];saveDeck();renderTraining();render();renderDeckEditor()}
function editDeckMember(t){if(!deck.includes(t)&&!allyStageAllowed(t))return;toggleDeck(t);renderDeckEditor()}
function renderDeckEditor(){
 const allowed=deck.filter(t=>allyStageAllowed(t)).length;
 $('#deckEditorInfo').textContent=`출전 덱 ${deck.length} / ${DECK_SIZE} · 변경 시 자동 저장${legendFourStar()?` · ★4: EX·레어만 출전 가능 (${allowed}명)` : ''}`;
 const info=$('#deckEditorInfo'),missing=ENDGAME_DECK.filter(t=>!allyUnlocked(t)),preset=document.createElement('button');
 preset.type='button';preset.textContent='달·레전드 공통 덱 적용';preset.disabled=missing.length>0||ENDGAME_DECK.some(t=>!allyStageAllowed(t));preset.onclick=applyEndgameDeck;info.append(document.createElement('br'),preset);
 const hint=document.createElement('small');hint.textContent=missing.length?' · 미보유: '+missing.map(t=>UNIT_NAMES[t]).join(' · '):legendFourStar()?' · ★1 및 세계편·미래편용 덱입니다':' · 현재 덱을 교체합니다. 권장: 기본·레어 30+10, EX·슈퍼 레어·울슈레 40, 가능한 진화 완료';info.append(hint);
 const active=activeAllyCombos();
 $('#deckEditorCombos').innerHTML='<h2>아군 콤보</h2><p>1열(1~5번 슬롯)에 필요한 아군을 모두 배치하면 전투 시작 시 모든 아군에게 적용됩니다. 순서는 자유이며, 3진 전용 콤보는 필요한 아군이 모두 3진이어야 합니다.</p>'+ALLY_COMBOS.map(c=>'<div class="deck-combo '+(active.includes(c)?'active':'')+'"><strong>'+c.name+'</strong><span>'+c.members.map(t=>UNIT_NAMES[t]+(c.trueFormsOnly?' 3진':'')).join(' · ')+'</span><b>'+c.effect+'</b><small>'+(active.includes(c)?'발동 준비 완료':(c.trueFormsOnly?'미발동 · 두 아군을 3진으로 1열에 배치하세요':'미발동 · 1열에 필요한 아군을 배치하세요'))+'</small></div>').join('');
 const slots=$('#deckEditorSlots');slots.innerHTML='';
 for(let i=0;i<DECK_SIZE;i++){const t=deck[i],slot=document.createElement('article');slot.className='deck-editor-slot';
  if(!t){slot.innerHTML=`<small>${i<5?'1열':'2열'} · ${i+1}</small><span class="deck-empty">빈 슬롯</span>`;slots.append(slot);continue}
  const s=unitStats(t);slot.innerHTML=`<small>${i+1}</small>${profileMarkup(t,s.evolved)}<strong>${deckEditorName(t)}</strong><span>Lv.${levelText(t)}</span>${!allyStageAllowed(t)?'<em>★4 출전 불가</em>':''}`;
  const controls=document.createElement('div');controls.className='deck-slot-controls';
  for(const [label,delta] of [['←',-1],['→',1]]){const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-label',`${deckEditorName(t)} ${delta<0?'앞':'뒤'}으로 이동`);b.disabled=i+delta<0||i+delta>=deck.length;b.onclick=()=>changeDeckOrder(t,delta);controls.append(b)}
  const remove=document.createElement('button');remove.type='button';remove.textContent='빼기';remove.setAttribute('aria-label',`${deckEditorName(t)} 덱에서 빼기`);remove.onclick=()=>editDeckMember(t);controls.append(remove);slot.append(controls);slots.append(slot)
 }
 const tabs=$('#deckEditorGrades');tabs.innerHTML='';for(const [g,label] of GRADE_LIST){const b=document.createElement('button');b.type='button';b.className='codex-tab'+(g===deckEditorGrade?' active':'');b.textContent=label;b.onclick=()=>{deckEditorGrade=g;renderDeckEditor()};tabs.append(b)}
 const grid=$('#deckEditorUnits');grid.innerHTML='';
 for(const b of counterButtons.children){const active=b.dataset.counterTrait===deckEditorCounter;b.setAttribute('aria-pressed',String(active));b.classList.toggle('active',active);}
 for(const t of ALLIES){if(!allyUnlocked(t)||(deckEditorGrade!=='all'&&gradeOf(t)!==deckEditorGrade))continue;const s=unitStats(t),reasons=deckCounterReasons(s,deckEditorCounter);if(deckEditorCounter!=='all'&&!reasons.length)continue;const selected=deck.includes(t),allowed=allyStageAllowed(t),card=document.createElement('article');card.className='deck-editor-unit'+(selected?' selected':'');card.innerHTML=`${profileMarkup(t,s.evolved)}<strong>${deckEditorName(t)}</strong><small>Lv.${levelText(t)} · ${s.cost.toLocaleString()}원</small><p>${ROLES[t]}</p>`;
  if(deckEditorCounter!=='all'){const reason=document.createElement('small');reason.textContent=reasons.join(' · ');card.append(reason);}
  const b=document.createElement('button');b.type='button';b.textContent=selected?'덱에서 빼기':!allowed?'★4 출전 불가':deck.length>=DECK_SIZE?'덱 가득참':'덱에 넣기';b.disabled=!selected&&(!allowed||deck.length>=DECK_SIZE);b.setAttribute('aria-label',`${deckEditorName(t)} ${selected?'덱에서 빼기':'덱에 넣기'}`);b.onclick=()=>editDeckMember(t);card.append(b);grid.append(card)
 }
 if(!grid.children.length){const empty=document.createElement('p');empty.textContent='현재 등급·속성 조건에 맞는 보유 아군이 없습니다.';grid.append(empty);}
}
function closeDeckEditor(){DECK_EDITOR.classList.add('hidden');DECK_EDITOR_BUTTON.focus()}
DECK_EDITOR_BUTTON.onclick=()=>{renderDeckEditor();DECK_EDITOR.classList.remove('hidden');$('#deckEditorClose').focus()};
$('#deckEditorClose').onclick=closeDeckEditor;
DECK_EDITOR.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();closeDeckEditor();return}if(e.key==='Tab'){const buttons=[...DECK_EDITOR.querySelectorAll('button:not(:disabled)')],first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
