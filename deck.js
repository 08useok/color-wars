// Dedicated deck editor. Changes use the existing deck save and deployment controls.
let deckEditorGrade='all';
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
 $('#deckEditorCombos').innerHTML='<h2>아군 콤보</h2><p>1열(1~5번 슬롯)에 필요한 아군을 모두 배치하면 전투 시작 시 모든 아군에게 적용됩니다. 순서·진화 형태는 자유입니다.</p>'+ALLY_COMBOS.map(c=>'<div class="deck-combo '+(active.includes(c)?'active':'')+'"><strong>'+c.name+'</strong><span>'+c.members.map(t=>UNIT_NAMES[t]).join(' · ')+'</span><b>'+c.effect+'</b><small>'+(active.includes(c)?'발동 준비 완료':'미발동 · 1열에 필요한 아군을 배치하세요')+'</small></div>').join('');
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
 for(const t of ALLIES){if(!allyUnlocked(t)||(deckEditorGrade!=='all'&&gradeOf(t)!==deckEditorGrade))continue;const s=unitStats(t),selected=deck.includes(t),allowed=allyStageAllowed(t),card=document.createElement('article');card.className='deck-editor-unit'+(selected?' selected':'');card.innerHTML=`${profileMarkup(t,s.evolved)}<strong>${deckEditorName(t)}</strong><small>Lv.${levelText(t)} · ${s.cost.toLocaleString()}원</small><p>${ROLES[t]}</p>`;
  const b=document.createElement('button');b.type='button';b.textContent=selected?'덱에서 빼기':!allowed?'★4 출전 불가':deck.length>=DECK_SIZE?'덱 가득참':'덱에 넣기';b.disabled=!selected&&(!allowed||deck.length>=DECK_SIZE);b.setAttribute('aria-label',`${deckEditorName(t)} ${selected?'덱에서 빼기':'덱에 넣기'}`);b.onclick=()=>editDeckMember(t);card.append(b);grid.append(card)
 }
}
function closeDeckEditor(){DECK_EDITOR.classList.add('hidden');DECK_EDITOR_BUTTON.focus()}
DECK_EDITOR_BUTTON.onclick=()=>{renderDeckEditor();DECK_EDITOR.classList.remove('hidden');$('#deckEditorClose').focus()};
$('#deckEditorClose').onclick=closeDeckEditor;
DECK_EDITOR.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();closeDeckEditor();return}if(e.key==='Tab'){const buttons=[...DECK_EDITOR.querySelectorAll('button:not(:disabled)')],first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
