// Lobby presentation only. Keep battle formulas, progression and reward claiming intact.
(()=>{
 const panel=document.querySelector('.stage-panel');if(!panel)return;
 const grid=document.getElementById('trainingGrid'),characters=grid.closest('.training'),baseGrid=document.getElementById('baseGrid');
 characters.id='lobbyCharacters';
 characters.querySelector('h2 + p').textContent='클리어 보상 XP로 강화합니다. 진화와 레벨 상한은 진행도·유저 랭크·캣츠아이에 따라 달라집니다. 선택한 캐릭터 카드에서 현재 상한을 확인하세요.';
 const search=document.createElement('div');search.className='lobby-character-tools';
 search.innerHTML='<label>캐릭터 검색<input id="lobbyCharacterSearch" type="search" placeholder="이름·역할로 찾기" autocomplete="off"></label><label>보기<select id="lobbyCharacterScope"><option value="owned">보유 캐릭터</option><option value="deck">현재 덱</option><option value="upgrade">강화 가능한 캐릭터</option></select></label><p id="lobbyCharacterCount" role="status"></p><div id="lobbyCharacterPicker" aria-label="캐릭터 선택"></div><div class="lobby-picker-pages"><button type="button" id="lobbyPickerPrev">이전</button><span id="lobbyPickerPage"></span><button type="button" id="lobbyPickerNext">다음</button></div>';
 grid.before(search);
 let query='',scope='owned',page=0,selected=null,trainingPass=false,visible=new Set();const pageSize=12;
 const gradeBefore=gradeMatch;
 gradeMatch=function(t){return gradeBefore(t)&&(!trainingPass||visible.has(t))};
 const renderTrainingBefore=renderTraining;
 renderTraining=function(){
  const list=ALLIES.filter(t=>allyUnlocked(t)&&gradeBefore(t)&&(scope!=='deck'||deck.includes(t))&&(scope!=='upgrade'||training.levels[t]<levelCapOf(t)&&training.xp>=upgradeCost(t))&&(!query||(UNIT_NAMES[t]+' '+ROLES[t]+' '+unitDisplayName(t,unitStats(t).trueForm,unitStats(t).evolved)).toLowerCase().includes(query)));
  page=Math.max(0,Math.min(Math.ceil(list.length/pageSize)-1,page));const slice=list.slice(page*pageSize,(page+1)*pageSize);
  if(!slice.includes(selected))selected=slice[0]||null;visible=new Set(selected?[selected]:[]);
  trainingPass=true;try{renderTrainingBefore.apply(this,arguments)}finally{trainingPass=false}
  const picker=document.getElementById('lobbyCharacterPicker');picker.replaceChildren();
  for(const t of slice){const b=document.createElement('button');b.type='button';b.className='lobby-character-choice'+(t===selected?' active':'');b.dataset.character=t;b.setAttribute('aria-pressed',String(t===selected));b.textContent=UNIT_NAMES[t]+' · Lv.'+levelText(t)+(deck.includes(t)?' · 덱':'');b.onclick=()=>{selected=t;renderTraining()};picker.append(b)}
  document.getElementById('lobbyCharacterCount').textContent=list.length+'명 · 이름을 누르면 강화·진화·덱 설정을 확인합니다.';
  document.getElementById('lobbyPickerPage').textContent=list.length?(page+1)+' / '+Math.ceil(list.length/pageSize):'검색 결과 없음';
  document.getElementById('lobbyPickerPrev').disabled=page<=0;document.getElementById('lobbyPickerNext').disabled=(page+1)*pageSize>=list.length;
  if(!list.length){grid.textContent='조건에 맞는 캐릭터가 없습니다. 검색어·등급·보기를 바꿔 주세요.'}
 };
 document.getElementById('lobbyCharacterSearch').oninput=e=>{query=e.target.value.trim().toLowerCase();page=0;renderTraining()};
 document.getElementById('lobbyCharacterScope').onchange=e=>{scope=e.target.value;page=0;renderTraining()};
 document.getElementById('lobbyPickerPrev').onclick=()=>{page--;renderTraining()};document.getElementById('lobbyPickerNext').onclick=()=>{page++;renderTraining()};
 const baseSection=baseGrid.closest('.training'),baseIntro=baseSection.querySelector('p');
 baseIntro.textContent='아군 성 체력은 최대 Lv.30입니다. 세계편 2장 클리어 후 Lv.20, 3장 클리어 후 Lv.30까지 열립니다. 경제·대포 강화와 실제 보물 효과를 확인하세요.';
 function foldSection(section,label){const d=document.createElement('details');d.className=section.className+' lobby-fold';d.id=section===baseSection?'lobbyBase':'lobbySpecial';const summary=document.createElement('summary');summary.textContent=label;d.append(summary);for(const child of [...section.children])d.append(child);section.replaceWith(d);return d}
 const baseFold=foldSection(baseSection,'기지 강화 · 완료 항목과 보물 상세');
 const special=document.getElementById('specialGrid')?.closest('.training');if(special)foldSection(special,'스페셜 스테이지·아이템');
 const renderBaseBefore=renderBaseUpgrade;
 renderBaseUpgrade=function(){renderBaseBefore.apply(this,arguments);
  const cards=[...baseGrid.children];const complete=document.createElement('details'),treasures=document.createElement('details');complete.className=treasures.className='lobby-base-group';complete.innerHTML='<summary>최대 레벨 강화</summary>';treasures.innerHTML='<summary>보물 효과 · 클리어와 적용 내역</summary>';
  for(const card of cards){const title=card.querySelector('h3')?.textContent||'';
   if(title.includes('우주편 보물')){const done=[COSMOS_END-1,COSMOS2_END-1].filter(i=>cleared.includes(i)).length;card.querySelector('h3').textContent='우주편 클리어 '+done+' / 2장';card.querySelector('p').textContent='현재 보물 효과: '+cosmosTreasureCount()+'장분 (1장 빅뱅 기준). '+cosmosTreasureSummary()+' · 2장 빅뱅은 추가 XP·특성 보물 배율을 주지 않습니다. 별 에이리언 억제기와 신님 가면은 각 장의 진행도로 별도 적용됩니다.';}
   if(title.includes('보물'))treasures.append(card);else if([...card.querySelectorAll('button')].some(b=>b.textContent==='최대 레벨'))complete.append(card);
  }
  if(complete.children.length>1){complete.querySelector('summary').textContent+=' ('+(complete.children.length-1)+'개)';baseGrid.append(complete)}
  if(treasures.children.length>1)baseGrid.append(treasures);
  baseFold.querySelector(':scope > summary').textContent='기지 강화 · 성 체력 '+baseHpFor().toLocaleString()+' · 세부 강화·보물 보기';
 };
 const tabs=document.getElementById('chapter1Tab').parentElement,battle=document.createElement('section');battle.id='lobbyBattle';battle.className='training lobby-battle';
 battle.innerHTML='<div class="lobby-battle-heading"><h2>전투 시작</h2><button type="button" id="lobbyNextStage"></button></div>';
 for(const node of [tabs,document.getElementById('chapterNote'),document.getElementById('legendBar'),document.getElementById('sweepBar'),document.getElementById('stageGrid')])battle.append(node);
 const actions=document.createElement('nav');actions.className='lobby-shortcuts';actions.setAttribute('aria-label','로비 바로가기');actions.innerHTML='<button type="button" data-lobby-target="lobbyCharacters">캐릭터 관리</button><button type="button" data-lobby-target="lobbyBase">기지 강화</button><button type="button" id="lobbyInbox">미수령 보상</button>';
 const intro=panel.querySelector(':scope > .stage-intro');intro.after(actions,battle);
 actions.querySelectorAll('[data-lobby-target]').forEach(b=>b.onclick=()=>{const target=document.getElementById(b.dataset.lobbyTarget);if(target.tagName==='DETAILS')target.open=true;target.scrollIntoView({block:'start'});(target.querySelector('input')||target.querySelector('summary'))?.focus()});
 function nextUncleared(){
  if(stageChapterView==='legend'){const done=legendProgress[legendCrown];let list=LEGEND_STAGES.map((s,k)=>k).filter(k=>legendStageUnlocked(k)&&!done.includes(k));if(legendSub){const sc=LEGEND_SUBS[legendSub-1];list=list.filter(k=>k>=sc.start&&k<sc.start+sc.len)}return list.length?legendIdx(list[0]):null}
  const entries=STAGES.map((s,i)=>i).filter(i=>chapterOf(i)===stageChapterView&&isUnlocked(i)&&!cleared.includes(i));return entries[0]??null;
 }
 function context(){
  const legend=stageChapterView==='legend',sc=legend&&legendSub?LEGEND_SUBS[legendSub-1]:null;
  const label=legend?'레전드 스토리':stageChapterView===9?'우주편 2장':stageChapterView===8?'우주편 1장':stageChapterView>=5?'미래편 '+(stageChapterView-4)+'장':'세계편 '+stageChapterView+'장';
  panel.querySelector('.stage-heading h1').textContent=label;
  const heading=panel.querySelector('.stage-heading small');if(heading.firstChild?.nodeType===3)heading.firstChild.nodeValue=(legend?'LEGEND STORY ':stageChapterView>=8?'CATS OF THE COSMOS ':stageChapterView>=5?'INTO THE FUTURE ':'WORLD CHAPTER ');
  intro.textContent=legend?(sc?sc.name+' · ★'+legendCrown+' · '+legendSubCount(legendSub-1,legendCrown)+' / '+sc.len+' 클리어':'서브챕터를 선택해 레전드 스토리에 도전하세요.'):stageChapterView>=8?'지구에서 빅뱅까지.':stageChapterView>=5?'일본에서 달까지.':'한국에서 달까지.';
  const target=nextUncleared(),b=document.getElementById('lobbyNextStage');b.disabled=target===null;b.textContent=target===null?'현재 선택한 장 모두 클리어':'다음 미클리어 · '+STAGES[target].name;b.onclick=()=>{if(target!==null){selectedStage=target;reset()}};
  const note=panel.querySelector('.stage-note:not(.credits)');if(note)note.textContent='현재 선택한 콘텐츠: '+label+' · 출현 시간·보스 조건·전투 수치는 게임 전용입니다. 진행도는 이 브라우저에 저장됩니다.';
 }
 const stageBefore=renderStageMenu;renderStageMenu=function(){const r=stageBefore.apply(this,arguments);context();return r};
 const legendBefore=renderLegend;renderLegend=function(){const r=legendBefore.apply(this,arguments);context();return r};
 function inbox(){renderGacha();GACHA_OVERLAY.classList.remove('hidden');const box=document.getElementById('gachaBox');box.scrollIntoView({block:'center'});box.setAttribute('tabindex','-1');box.focus()}
 document.getElementById('lobbyInbox').onclick=inbox;
 const badgeBefore=renderGachaBadge;renderGachaBadge=function(){const r=badgeBefore.apply(this,arguments),n=gachaBoxCount();GACHA_BTN.textContent='뽑기 · 보유 확정권 '+(gacha.fix||0)+'장'+(n?' · 미수령 '+n+'장':'');GACHA_BTN.title='보유 확정권과 보관함 미수령 확정권';const b=document.getElementById('lobbyInbox');b.textContent=n?'미수령 보상 · 확정권 '+n+'장':'보상 보관함';b.hidden=!gachaUnlocked();return r};
 renderStageMenu();renderGachaBadge();
})();
