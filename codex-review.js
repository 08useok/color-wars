// Reviews use a consistent effective Lv.30 and World chapter 2/3 prices.
function codexReviewStats(type,evolved){
 const previous=selectedStage;
 try{selectedStage=CHAPTER1_LEN;return unitStats(type,30-(typeof plusLevel==='function'?plusLevel(type):0),evolved?2:1)}finally{selectedStage=previous}
}
function allyReview(type,evolved){
 const s=codexReviewStats(type,evolved),num=n=>Math.round(n).toLocaleString('ko-KR'),pct=n=>Math.round(n*100),targets=list=>list.map(t=>TRAIT_TARGET[t]||t).join('·');
 const hp=`<b>${num(s.hp)}</b>`,cost=`<b>${num(s.cost)}원</b>`,range=num(s.range);
 const angelPair=type==='brown'||type==='peach'?(()=>{
  const brown=type==='brown'?s:codexReviewStats('brown',evolved),peach=type==='peach'?s:codexReviewStats('peach',evolved);
  const brownHp=brown.hp/(brown.resistMult||.25),peachHp=peach.hp/(peach.resistMult||.25);
  return {brownHp,peachHp,hpRatio:(brownHp/peachHp).toFixed(2),valueRatio:((brownHp/brown.cost)/(peachHp/peach.cost)).toFixed(2),dpsRatio:((peach.atk/peach.interval)/(brown.atk/brown.interval)).toFixed(2)};
 })():null;
 let text;
 if(type==='hotpink'&&s.trueForm)return `<section class="codex-review"><h3>총평</h3><small>합산 Lv.30 · 3진 · 세계편 2·3장 가격 기준</small><p>4.7.0 버전에서 3진이 추가된 빨간 적 대항 범위 딜러 겸 공격력 다운 캐릭터이다.</p><p>2진 대비 체력과 공격력이 50% 증가하고, 사거리가 480에서 600으로 늘어났다. 풍선껌이 전방 800까지 터지는 범위 공격으로 바뀌어 적 무리를 함께 타격하며, 65% 확률로 빨간 적의 공격력을 절반으로 낮추는 효과가 5초 동안 지속된다.</p><p>체력 ${hp}, 공격력 ${num(s.atk)}, ${cost}에 여러 마리를 쌓아 빨간 적의 공격력을 다운시키기 좋다. 다만 공격을 시작하려면 사거리 600 안에 적이 있어야 하고, 공격 간격 ${s.interval}초와 선딜 0.7초 때문에 혼자 전선을 지키기는 어렵다. 다른 속성에는 공격력 다운이 적용되지 않아 고방과 특화 딜러의 지원이 필요하다.</p></section>`;
 if(type==='herbmint')text=`<b>메탈의 접근을 늦추면서 크리티컬 화력을 보조하는 메즈 지원이다.</b> ${pct(s.slowChance)}% 확률로 메탈을 ${s.slowDuration}초 느리게 하며, ${s.interval}초마다 개체 공격한다. 사거리 ${s.range}에서 고방 뒤에 여러 마리를 쌓으면 메탈의 전진을 늦추기 좋다. ${pct(s.critChance)}% 크리티컬도 있지만 확률이 낮아 메탈 처치를 혼자 맡기기에는 불안정하다. 다만 느리게는 적의 공격 자체를 멈추지 않으며, 메탈 이외의 적에게는 이 지원 효과가 없다. 가격 ${cost}, 체력 ${hp}를 가진 보조 요원으로 쓰고, 검도 네이비·연금 퍼플 같은 크리티컬 딜러와 함께 편성하는 것이 좋다.`;
 else if(type==='kendonavy')text=`<b>빠른 공격으로 크리티컬을 반복해서 노리는 메탈 대항 근접 딜러다.</b> 공격 간격 ${s.interval}초와 ${pct(s.critChance)}% 크리티컬을 이용해 메탈에게 자주 유효타를 넣으며, 한 번의 크리티컬 피해는 ${num(s.atk*(s.critMult||2))}이다. 체력 ${hp}를 갖췄지만 메탈에게 받는 피해를 줄이거나 메즈를 무효화하는 탱커는 아니다. 다만 사거리 ${s.range}가 짧고 개체 공격이라, 사거리가 더 긴 메탈이나 잡몹이 섞인 무리에는 접근 중 공격을 받거나 크리티컬이 앞의 적에게 소모될 수 있다. ${cost}에 투입하는 주력 크리티컬 요원으로 쓰되, 고방과 허브 민트의 느리게·리듬 핑크의 정지로 공격할 시간을 확보하자.`;
 else if(type==='alchemypurple')text=`<b>메탈 여러 마리를 함께 타격하는 범위 크리티컬 딜러다.</b> ${pct(s.critChance)}% 확률의 크리티컬이 터지면 한 대상에게 ${num(s.atk*(s.critMult||2))} 피해를 주므로, 앞줄에 메탈이 겹친 전선에서 한 방의 가치가 커진다. 사거리 ${s.range}에서 공격하며 가격은 ${cost}, 체력은 ${hp}이다. 다만 공격 간격이 ${s.interval}초로 길고 사거리 여유도 작아, 크리티컬이 빗나가거나 공격 전에 밀리면 화력이 크게 흔들린다. 높은 체력으로 버티는 딜탱보다 고방 뒤에서 지켜 주는 딜러로 다루자. 허브 민트·리듬 핑크의 메즈를 붙이고, 빠르게 공격하는 검도 네이비와 역할을 나누면 공격 사이의 공백을 보완하기 좋다.`;
 else if(type==='rhythmpink')text=`<b>메탈 무리를 멈춰 크리티컬 딜러의 공격 시간을 벌어 주는 범위 메즈 지원이다.</b> ${s.interval}초마다 사거리 ${s.range} 안의 적을 범위 공격하고, 메탈에게 ${pct(s.freezeChance)}% 확률로 ${s.freezeDuration}초 정지를 건다. 범위 정지로 여러 메탈의 움직임과 공격을 함께 막는 것이 장점이다. 다만 크리티컬이 없어 메탈에게 직접 주는 피해는 일반 타격당 1이며, 확률 발동과 공격 간격 때문에 한 마리만으로 정지를 계속 유지할 수는 없다. 메탈이 아닌 적에게는 정지가 적용되지 않는다. ${cost}에 생산하는 지원 요원으로 쓰고, 체력 ${hp}만 믿고 앞세우기보다 고방·검도 네이비·연금 퍼플과 함께 편성해 처치를 맡기는 것이 좋다.`;
 else if(type==='yellow')text=`일반 적 기준 ${hp}이라는 체력과 ${cost}이라는 가격에 고방 용도로 주로 쓰인다. 특히 히트백이 ${s.knockbacks}이라 밀려나기 전에 버틸 수 있는 피해량이 커, 적의 화력을 가늠하는 전투력 측정기로도 쓸 수 있다. 다만 사거리가 짧아 원거리 적을 직접 처리하기보다는 뒤쪽 딜러를 보호하는 역할에 알맞다. 기본 캐릭터의 역할과 가격 대비 효율을 기준으로 보면, <b>지금까지 나온 캐릭터 중 최고의 캐릭터다.</b>`;
 else if(type==='red')text=`${cost}에 ${s.cooldown.toFixed(1)}초마다 생산할 수 있는 기본 고방이다. 체력 ${hp} 자체보다 저렴한 가격과 빠른 재출격을 이용해 전선에 끊임없이 공급하는 것이 핵심이다. 강한 범위 공격에는 여러 마리가 함께 쓰러지므로 딜러와 조합해서 쓴다.`;
 else if(type==='green')text=`부메랑의 왕복 공격으로 피해를 주는 중거리 공격수다. 2진에서는 돌아오는 부메랑의 피해가 증가해 두 번 모두 맞히면 효율이 높아지지만, 적이 이동하거나 넉백되면 후속 공격이 빗나갈 수 있다. 가격 ${cost}에 비해 사거리 ${range}와 체력 ${hp}만으로 안정적인 공격을 확보하기는 어렵다. 다른 기본 캐릭터보다 투입 조건을 많이 타므로, 기본 캐릭터의 역할과 가격 대비 효율을 기준으로 보면 <b>지금까지 나온 캐릭터 중 최악의 캐릭터다.</b>`;
 else if(type==='cream')text=s.trueForm?`사거리 <b>16</b>의 범위 공격과 검은 적 <b>65% 확률·3초 움직임을 느리게 하는 효과</b>를 갖춘 전선 제어 캐릭터다. ${cost}에 2초마다 공격하며, 여러 마리를 쌓으면 검은 적의 접근을 꾸준히 늦출 수 있다. Lv.30 단독 대결 테스트에서 3마리는 블랙 두드리 100%를, 4마리는 블랙 맴매 100%를 모두 이겼다. 하지만 블랙 맴매 400%에는 전패했고, 블랙쿠마·쿠로사와 감독·블랙 빠옹도 지원 없이 이기지 못했다. 느리게는 공격을 멈추지 않으므로 고방과 장거리 딜러가 필요하다. 이 결과는 스테이지 클리어 확률이 아니다.`:`${cost}에 검은 적의 이동을 ${pct(s.slowChance)}% 확률로 ${s.slowDuration}초 움직임을 느리게 하는 보조 캐릭터다. 사거리 ${range}와 개체 공격 때문에 적 무리에 밀리거나 접근 중 공격을 받기 쉽다. 혼자 전선을 맡기기보다는 고방 뒤에서 움직임을 느리게 하는 효과를 보태는 편이 좋고, 3진에서는 사거리·범위 공격·움직임을 느리게 하는 효과와 화력이 함께 보강된다.`;
 else if(type==='rainbow')text=`${cost}이라는 높은 가격을 사거리 <b>50</b>, 사각지대 없는 넓은 범위 공격과 여러 속성에 대한 초데미지로 보상하는 주력 딜러다. 고방 뒤에서 오래 살아남을수록 가격 대비 효율이 높아지지만 초반 자금이 부족할 때 무리하게 생산하면 전선이 비기 쉽다. 무속성에는 초데미지가 없고, 메탈은 크리티컬 캐릭터가 따로 필요하다.`;
 else if(type==='white')text=`${cost}에 ${s.cooldown.toFixed(1)}초마다 생산할 수 있는 양산형 근접 딜러 겸 추가 고방이다. 체력 ${hp}를 갖춰 저렴하게 반복 생산하며 전선을 보강한다. 강한 딜러와 메즈가 이미 갖춰진 이번 고정 덱에서는 앞줄을 꾸준히 채워 뒤쪽 아군의 공격 시간을 확보하는 역할이 큰 효과를 냈다. 다만 피해 감소나 속성 특화 능력은 없고 사거리 ${range}도 짧아 강한 범위 공격에 여러 마리가 함께 쓰러질 수 있다. 단독 탱커보다 다른 고방과 함께 운용하는 편이 좋다.`;
 else if(type==='brown')text=`천사에게 받는 피해를 80% 줄이는 근접 탱커다. ${cost}에 기본 체력 ${hp}, <b>천사 적 기준 무려 ${num(angelPair.brownHp)}의 실효 체력</b>을 갖춘다. 같은 레벨·진화 단계의 피치보다 천사 상대 실효 체력이 <b>${angelPair.hpRatio}배</b>, 가격 대비 실효 체력은 <b>${angelPair.valueRatio}배</b> 높다. 천사전에서 공격을 버티며 전선을 붙드는 역할에 적합하다. 반면 DPS는 피치가 ${angelPair.dpsRatio}배 높으므로 화력을 맡기는 용도와는 구분해야 한다. 사거리 ${range}와 재출격 ${s.cooldown}초 때문에 다른 고방과 함께 쓰는 편이 안정적이며, 천사 이외의 적에게는 피해 감소가 적용되지 않는다.`;
 else if(type==='peach')text=`<b>가격 대비 화력이 돋보이는 천사 대항 근접 딜러다.</b> ${cost}이라는 저렴한 가격에, 천사 적 기준 무려 <b>${num(angelPair.peachHp)}</b>이라는 단단한 실효 체력과 <b>${s.interval.toFixed(2)}초마다 공격하는 빠른 공속</b>을 갖춘다. 천사의 피해를 75% 줄여 전선을 보강하면서 빠른 공격으로 화력까지 보태는 것이 핵심이다. 같은 레벨·진화 단계의 브라운보다 DPS가 <b>${angelPair.dpsRatio}배</b> 높다. 다만 천사 상대 실효 체력은 브라운이 ${angelPair.hpRatio}배, 가격 대비 실효 체력은 ${angelPair.valueRatio}배 높아 순수 탱킹에서는 브라운이 우세하다. 실효 체력은 피해 감소를 반영한 값이며 실제 체력은 ${hp}이다. 사거리 ${range}의 개체 공격이라 장거리 적이나 적 무리를 혼자 처리하기 어렵고, 고방과 범위 딜러로 공격 시간을 확보해야 한다.`;
 else if(type==='silver')text=`무려 <b>확정 크리티컬</b>을 갖춘 범위 메탈 대항 캐릭터다. ${cost}에 체력 ${hp}를 갖췄으며, 앞쪽 사거리 ${range}와 뒤쪽 공격 범위 ${num(s.backRange)}로 여러 메탈 적을 함께 공격할 수 있다. 확률에 의존하지 않고 크리티컬을 내므로 공격만 맞히면 메탈 적에게 확실한 피해를 줄 수 있다는 것이 핵심이다. 다만 공격 간격이 ${s.interval}초로 매우 길어 공격이 빗나가거나 발동 전에 밀려나면 큰 공백이 생긴다. 재출격도 ${s.cooldown}초라 빠르게 보충하기 어렵다. 메탈 느리게 하거나 멈추게 하는 요원과 고방으로 한 번의 공격을 확실하게 맞힐 환경을 만드는 것이 중요하다.`;
 else if(type==='garnet')text=`체력 ${hp}과 검은 적에게 엄청 강하다를 함께 갖춘 중장 전투원이다. ${cost}에 높은 체력과 화력을 확보하며 살아남는다 능력으로 마지막 한 번 더 버틸 수도 있다. 다만 사거리 ${range}의 개체 공격과 ${s.cooldown}초 재출격 때문에, 긴 사거리나 다수의 적을 상대할 때는 고방과 범위 딜러의 지원이 필요하다.`;
 else if(type==='magenta')text=`범위 공격에 확정 파동을 더해 전선 뒤의 적까지 공격하는 딜러다. ${cost}에 파동 사거리 ${num(s.wave.reach)}를 확보하지만, 공격을 시작하려면 직접 사거리 ${range}까지 접근해야 한다. 직접 공격과 파동이 모두 맞으면 화력이 높아지며, 넉백으로 한쪽 공격이 빠지는 경우에는 이론 화력이 그대로 나오지 않는다.`;
 else if(type==='fusioncream')text=`${cost}에 ${s.interval.toFixed(1)}초 간격으로 공격하는 에이리언 특화 딜러다. 초데미지와 빠른 연속 공격으로 전선이 안정된 뒤 높은 화력을 내지만, 사거리 ${range}가 짧고 재출격이 ${s.cooldown}초라 접근 중 쓰러지면 손해가 크다. 멈추게 하거나 느리게 하는 아군과 고방으로 공격 시간을 확보하는 것이 중요하다.`;
 else if(s.hiddenAbility&&!codexWiki&&!futureOpen())text=`${cost}에 체력 ${hp}, 사거리 ${range}를 갖춘 캐릭터다. 특수 능력과 본격적인 활용법은 미래편이 열린 뒤 도감에서 확인할 수 있다. 공개 전에는 고방 뒤에서 공격을 지원하며 가격과 재출격 시간을 고려해 운용한다.`;
 else{
  const notes=[];
  text=`${cost}에 체력 ${hp}, 사거리 <b>${range}</b>를 갖춘 ${ROLES[type]} 캐릭터다. `;
  if(s.massiveVs)notes.push(`${targets(s.massiveVs.filter(t=>t!=='metal'))}에게 초데미지를 주므로 해당 속성의 적을 처리할 때 효율이 높다`);
  if(s.extremeVs)notes.push(`${targets(s.extremeVs)}에게 극데미지를 주는 강한 특화 딜러다`);
  if(s.strongVs)notes.push(`${targets(s.strongVs)}에게 주는 피해가 늘고 받는 피해가 줄어 공격과 전선 보강을 함께 맡는다`);
  if(s.resistVs)notes.push(`${targets(s.resistVs)}에게 받는 피해를 줄여 전선을 버티는 데 도움이 된다`);
  const target=s.statusVs?targets(s.statusVs):'적';
  if(s.freezeChance)notes.push(`${target}을 ${pct(s.freezeChance)}% 확률로 ${s.freezeDuration}초 멈추게 해 아군의 공격 시간을 확보한다`);
  if(s.slowChance)notes.push(`${target}의 이동을 ${pct(s.slowChance)}% 확률로 ${s.slowDuration}초 움직임을 느리게 하지만 적의 공격 자체를 멈추지는 않는다`);
  if(s.atkDownPct)notes.push(`${target}의 공격력을 낮춰 앞줄 아군의 생존을 돕는다`);
  if(s.critChance)notes.push(`${pct(s.critChance)}% 확률의 크리티컬로 메탈에 대응할 수 있다`);
  if(s.wave)notes.push(`파동으로 직접 사거리 밖의 적까지 공격할 수 있다`);
  if(s.surge)notes.push(`열파를 이용해 뒤쪽 적에게도 피해를 누적시킨다`);
  if(s.multiHit&&!s.area&&!s.pierce&&!s.dash)notes.push(`${s.multiHit}연타로 피해를 누적하지만 넉백·대상 이탈로 모든 타격이 맞지 않을 수 있다`);
  if(s.blowChance||s.push||s.pull)notes.push(`적의 위치를 바꾸는 능력으로 전선을 조절하지만 아군의 공격 타이밍과 맞춰 쓰는 것이 좋다`);
  if(s.killGold)notes.push(`처치 보상금을 늘려 전투 중 자금 확보에도 도움이 된다`);
  if(!notes.length)notes.push(s.area||s.splash||s.dash||s.boomerang?'여러 적을 함께 상대할 때 공격 효율을 살리기 좋다':'한 적에게 공격을 집중하는 역할에 알맞다');
  text+=notes.slice(0,3).join('. ')+'. ';
  text+=s.range>=25?'긴 사거리를 살리도록 앞줄을 보호해야 하며, 빠르게 파고드는 적에게는 고방 지원이 필요하다. ':s.range<=10?'사거리가 짧아 접근 중 공격을 받기 쉬우므로 상대의 사거리와 속성을 확인하고 투입한다. ':'중거리에서 지원하기 좋지만 자신보다 사거리가 긴 적을 혼자 상대하기는 어렵다. ';
  text+=s.cooldown>=20?`재출격이 ${s.cooldown}초라 한 번 쓰러졌을 때의 공백에도 주의한다.`:s.cooldown<=5?`재출격 ${s.cooldown.toFixed(1)}초를 이용해 반복 생산하기 좋지만 지갑과 출격 수를 함께 관리한다.`:`재출격 ${s.cooldown.toFixed(1)}초와 가격을 고려해 다른 아군과 번갈아 생산하는 편이 좋다.`;
 }
 if(type==='iron')text=`4.7.0 버전에 추가된 좀비 대항 범위 딜탱 캐릭터이다. 좀비 킬러로 직접 처치한 좀비의 부활을 막으며, 좀비에게 엄청 강하다를 갖춰 공격과 전선 보강을 함께 맡는다. ${cost}에 체력 ${hp}를 갖추고, 2진에서는 굴착기로 범위 공격을 한다. 다만 사거리 ${range}가 짧고 공격 간격 ${s.interval}초와 재출격 ${s.cooldown}초가 길어 고방 지원이 필요하다. 현재 스테이지에는 좀비 적이 없어 특화 능력을 활용할 출전처가 제한된다.`;
 else if(type==='grey')text=`4.7.0 버전에 추가된 범용 범위·파동 딜러 캐릭터이다. 범위 공격과 확정 파동으로 전선 뒤의 적까지 피해를 전달하며, 2진에서는 용광로에서 달군 검을 쏘아 파동 사거리가 늘어난다. ${cost}에 체력 ${hp}, 직접 사거리 ${range}를 갖춘다. 다만 공격 간격 ${s.interval}초와 재출격 ${s.cooldown}초가 길고, 파동을 내기 위해 직접 공격할 대상에 접근해야 한다. 속성 초데미지나 피해 감소가 없어 고방으로 공격 시간을 확보해야 한다.`;
 else if(type==='carmine')text=`4.7.0 버전에 추가된 빨간 적 대항 범위 딜탱·메즈 캐릭터이다. 빨간 적에게 엄청 강하다와 ${pct(s.slowChance)}% 확률·${s.slowDuration}초 움직임을 느리게 하는 효과를 함께 갖춰 여러 빨간 적의 진격을 억제한다. ${cost}에 체력 ${hp}를 갖췄고, 2진에서는 불꽃 주먹으로 공격한다. 다만 사거리 ${range}가 길지 않고 재출격 ${s.cooldown}초라 반복해서 잃으면 손해가 크다. 다른 속성에는 엄강과 움직임을 느리게 하는 효과가 적용되지 않으므로 빨간 적 중심 스테이지에 편성하는 것이 좋다.`;
 // Rankings compare usefulness within each roster group, rather than raw damage alone.
 text=text.replace(/ 기본 캐릭터의 역할과 가격 대비 효율을 기준으로 보면,? <b>지금까지 나온 캐릭터 중 최고의 캐릭터다\.<\/b>/,'');
 text=text.replace(/ 다른 기본 캐릭터보다 투입 조건을 많이 타므로, 기본 캐릭터의 역할과 가격 대비 효율을 기준으로 보면 <b>지금까지 나온 캐릭터 중 최악의 캐릭터다\.<\/b>/,'');
 if(type==='yellow')text+=' <b>저렴한 가격 대비 생존력이 뛰어난 핵심 고방이다.</b>';
 else if(type==='green')text=`왕복 부메랑의 두 타격을 모두 맞혀야 제 성능을 내는 중거리 딜러다. 가격 ${cost}, 체력 ${hp}, 사거리 ${range}를 갖췄다. 오렌지는 더 일찍 획득하며 가격이 저렴하고 사거리가 길어 안정적인 잡몹 처리에 유리하다. 그래도 오렌지가 없으면 그린을 대체용으로 쓸 수는 있다. 다만 왕복 명중 시 그린의 화력이 더 높아, 오렌지는 단순한 상위호환이 아니다. 적이 이동하거나 넉백되면 돌아오는 공격이 빗나갈 수 있어 전선 유지가 중요하다.`;
 else if(type==='lavender')text+=' <b>범용 공격력 다운 지원에 강점이 있는 캐릭터다.</b> 공격력 감소가 필요한 전선에서는 유용하지만, 전체 아군 중 화력·생존력까지 모두 가장 뛰어난 캐릭터라는 뜻은 아니다.';
 else if(type==='salmon')text=`사거리 ${range}에서 적을 끌어오는 전술형 메즈 캐릭터다. 가격 ${cost}, 체력 ${hp}를 갖췄으며, 적을 아군의 공격 범위 안으로 당길 수 있다. 반대로 적이 후방 딜러에게 접근하도록 만들 수도 있어 전선을 보고 운용해야 한다. 보스는 끌어올 수 없지만 보스에게 주는 피해는 30% 증가한다. 6.8.1 버전에서 공격 간격을 4.2초에서 ${s.interval}초로, 재출격 시간을 줄여 꾸준히 투입하기 쉬워졌다.${s.evolved?' 기준 맵인 황제의 야옹이 ★3에서는 2진이 클리어를 약 <b>10초</b> 단축해 기본 캐릭터 18명 중 <b>3위</b>이지만, 이 조정 전에는 더하면 클리어가 오히려 늦어졌다. 화력보다 끌어오기가 본업이라 이 맵에서의 순위는 참고만 한다.':''} 옵시디언은 레전드 대탈주 첫 클리어 보상이고 날려버려 후방을 보호하는 역할이므로, 획득 시기와 능력이 다른 살몬의 단순한 상위호환으로 추천하지 않는다.`;
 else if(type==='midnight')text=`<b>전체 아군 비교에서 범용성이 낮은 후보인 에이리언 멈추게 하는 요원이다.</b> ${cost}에 체력 ${hp}를 갖췄지만 기초 화력과 생존력이 모두 낮다. 에이리언을 ${pct(s.freezeChance)}% 확률로 ${s.freezeDuration}초 멈추게 할 수 있다는 것이 주된 장점이다. 그게 다다. 기초 화력과 생존력으로 다른 역할까지 맡기기는 어렵다. ${s.cooldown}초의 재출격 동안 공백이 생기므로 고방 뒤에서 운용한다. 콘플라워를 보유했다면 더 긴 사거리와 높은 멈추게 하는 확률, 에이리언 초데미지로 더 강한 지원을 기대할 수 있다. 다만 가격과 재출격 부담이 커서 미드나잇도 저렴한 멈추게 하는 보조로 쓸 수 있다.`;
 else if(type==='ribbonchart')text=`<b>현재 전투 성능을 기준으로 전체 아군 중 효율이 낮은 후보인 범위 딜러다.</b> ${cost}에 체력 ${hp}, 사거리 ${range}를 갖췄지만, 현재 공격 한 번에 적 한 마리에게 들어가는 피해는 한 타격 분량이다. 연타를 모두 더한 화력을 기대하고 투입하면 실제 성능과 차이가 크다. 오렌지는 더 일찍 획득하고 저렴하며, 같은 2진 사거리에서 더 높은 지속 화력과 빠른 재출격을 제공한다. 오렌지가 없으면 범위 딜러 대체용으로 쓸 수는 있고, 한 개체의 체력은 리본 샤트가 더 높다. 현재 오렌지와 비교해 뚜렷하게 내세울 장점은 그게 다다. 연타 성능이 달라지면 이 평가는 다시 비교해야 한다.`;
 const rareBestLine={
  brown:'천사 상대 피해를 받아내는 전문 탱커로 쓰기 좋다.',
  peach:'저렴하게 근접 화력을 보태는 천사 대항 딜탱으로 쓰기 좋다.',
  brick:'여러 속성이 섞인 전선에서 버티는 탱커로 쓰기 좋다.',
  moss:'에이리언의 접근을 늦춰 주는 메즈 지원으로 쓰기 좋다.',
  fusioncream:'앞줄을 보호하면 에이리언 상대 화력을 보태는 특화 딜러로 쓰기 좋다.'
 };
 if(s.evolved&&!s.trueForm){
  if(type==='coral')text+=' <b>떠있는 적 대항 딜러로는 카키에 밀린다.</b> 카키는 특화 화력·체력·사거리가 모두 높아 더 안정적으로 공격할 수 있다. 다만 코랄은 가격이 더 저렴하므로 카키가 없거나 자금이 부족하면 대체용으로 쓸 수 있다. 떠 있는 적이 대부분인 시험 맵 8곳에서는 기준 덱(레드·옐로우·블루·퍼플)에 코랄 2진을 더하면 48판 중 승리가 <b>25판에서 35판</b>으로 늘었다.';
  else if(type==='midnight')text=text.replace(/콘플라워를 보유했다면[\s\S]*$/,'<b>에이리언 멈추게 하는 요원으로는 길리먼 블루에 밀린다.</b> 길리먼 블루는 체력과 사거리가 높아 더 안정적으로 지원할 수 있다. 다만 미드나잇은 가격이 저렴하고 재출격이 빨라, 길리먼 블루가 없거나 저렴한 멈추게 하는 보조가 필요하면 대체용으로 쓸 수 있다.');
  else if(type==='lightcream')text+=' <b>메탈 대항 크리티컬 딜러로는 그레이프프루트 펄프에 밀린다.</b> 펄프는 크리티컬 확률과 한 방 피해, 체력이 높다. 다만 라이트 크림은 가격이 저렴하고 공격 간격이 짧으며 사거리도 조금 길어 완전한 하위호환은 아니다. 펄프가 없으면 대체용으로 쓸 수 있다.';
 }
 if(rareBestLine[type])text+=` <b>${rareBestLine[type]}</b>`;
 let evolution='',weakenHealth='';
 if(s.evolved&&!s.trueForm&&!data.units[type].noEvolve){
  const first=codexReviewStats(type,false);
  evolution=`<p>진화 후 체력과 공격력이 각각 <b>${Math.round(s.hp/first.hp*100)}%</b>, <b>${Math.round(s.atk/first.atk*100)}%</b>가 되었다.</p>`;
 }
 if(s.evolved&&!s.trueForm&&s.atkDownPct&&!(s.hiddenAbility&&!codexWiki&&!futureOpen())){
  const multiplier=1/(1-s.atkDownPct),effective=Math.round(s.hp*multiplier),target=s.statusVs?.length?targets(s.statusVs):'효과 대상인 적';
  const hpText=typeof codexHighStat==='function'?codexHighStat(effective,'hp'):num(effective);
  weakenHealth=`<p>${target}에게 공격력 다운이 유지되면 그 적에게 받는 피해를 기준으로 실효 체력은 <b>${Number(multiplier.toFixed(2))}배(${hpText})</b>가 된다. 실제 최대 체력이 늘어나는 것은 아니며, 효과가 걸리지 않은 적에게는 적용되지 않는다.</p>`;
 }
 const comparison=typeof allyComparisonText==='function'&&!(s.hiddenAbility&&!codexWiki&&!futureOpen())?`<p>${allyComparisonText(s)}</p>`:'';
 return `<section class="codex-review"><h3>총평</h3><small>합산 Lv.30 · ${s.trueForm?'3진':s.evolved?'2진':'1진'} · 세계편 2·3장 가격 기준</small>${evolution}<p>${text}</p>${weakenHealth}${allyDamageRecord(type,s)}${comparison}</section>`;
}
