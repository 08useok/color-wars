// v6.7: append-only stage IDs; original boss/spawn data: battlecats-db.com (see release notes).
const CYCLONE_ALLIES={
 herbmint:{name:'허브 민트',evolved:'허브 마스터 민트',color:'#89e5c3',hp:17000,atk:1800,interval:3.2,range:12,cost:650,cooldown:10,role:'메탈 느리게·크리티컬 지원',extra:{statusVs:['metal'],slowChance:.6,slowDuration:3,critChance:.05,critMult:2},profile:'민트의 독립 아종. 향긋한 허브를 가꾸는 약초사. 금속 틈에 뿌린 잎으로 메탈의 발을 묶는다.'},
 kendonavy:{name:'검도 네이비',evolved:'검도 사범 네이비',color:'#334d85',hp:24000,atk:1250,interval:1.3,range:5.5,cost:600,cooldown:8,role:'근거리 크리티컬 딜러',extra:{critChance:.2,critMult:2},profile:'네이비의 독립 아종. 죽도로 한 번의 정확한 타격을 노리는 검도 수련생. 짧은 사거리 대신 빠른 공격과 크리티컬로 메탈을 상대한다.'},
 alchemypurple:{name:'연금 퍼플',evolved:'현자의 연금 퍼플',color:'#a97de0',hp:16000,atk:6000,interval:5,range:6,cost:1000,cooldown:18,role:'중거리 범위 크리티컬 딜러',extra:{area:true,attackClass:'범위',critChance:.1,critMult:2},profile:'퍼플의 독립 아종. 플라스크 속 재료로 금속의 약점을 찾는 연금술사. 강한 한 방을 준비하므로 고방의 보호가 필요하다.'},
 rhythmpink:{name:'리듬 핑크',evolved:'페스티벌 리듬 핑크',color:'#fb9bc5',hp:19000,atk:1800,interval:4,range:7,cost:800,cooldown:12,role:'메탈 범위 정지 지원',extra:{area:true,attackClass:'범위',statusVs:['metal'],freezeChance:.5,freezeDuration:2},profile:'핑크의 독립 아종. 마라카스를 흔드는 거리의 연주자. 리듬에 맞춰 메탈을 멈춰 크리티컬 딜러가 공격할 틈을 만든다.'}
};
for(const[id,s]of Object.entries(CYCLONE_ALLIES)){
 for(const list of [RARE_TYPES,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(id))list.push(id);// 원작 사이클론 보상(우주 고양이·브론즈·줄넘기·태엽 고양이)처럼 레어 등급
 data.units[id]={hp:500,atk:100,interval:s.interval,speed:id==='kendonavy'?7:4,range:s.range,cost:s.cost,cooldown:s.cooldown,knockbacks:3,noRangeGrow:true,attackDuration:Math.min(s.interval,.9),windup:.3,...s.extra};
 LV20_TARGET[id]={hp:s.hp/1.15,atk:s.atk/1.15};
 UNIT_NAMES[id]=s.name;COLORS[id]=s.color;ROLES[id]=s.role;
 PROFILE_TEXT[id]=s.profile;PROFILE_TEXT_EVOLVED[id]=s.evolved+'. '+s.profile;EVOLUTION_TEXT[id]='숙련으로 체력·공격력 15% 증가';
 PROFILE_ART[id]=[1,2].map(f=>'assets/cyclone/'+id+'_'+f+'-profile.svg?v=1');
 NEW_ATLASES[id]={...CYCLONE_ATLASES[id+'_1'],evolved:CYCLONE_ATLASES[id+'_2']};
 const lv=SUBSPECIES_SAVED_TRAINING?.levels?.[id];training.levels[id]=Number.isInteger(lv)?Math.max(1,Math.min(LEVEL_HARD_MAX,lv)):1;
 if(SUBSPECIES_SAVED_TRAINING?.forms?.[id]===1)training.forms[id]=1;
 const b=document.createElement('button');b.id=id+'Btn';b.className='unit-btn';b.innerHTML='<i></i><strong>'+s.name+'</strong><small></small><em></em>';b.onclick=()=>addUnit(id);$('.controls').append(b);
}
const cycloneNameBefore=unitDisplayName;
unitDisplayName=function(t,tr=false,ev=false){return CYCLONE_ALLIES[t]?(ev?CYCLONE_ALLIES[t].evolved:CYCLONE_ALLIES[t].name):cycloneNameBefore(t,tr,ev)};
// HP/attack/attack timings/KB retained at 100%; ranges ×0.034 like every other enemy, movement speed adapted ×.67.
const CYCLONE_BOSSES={
 redcyclone:{name:'레드 사이클론',hp:999999,atk:92000,range:90,speed:6,knockbacks:1,traits:['red','floating']},
 blackcyclone:{name:'블랙 사이클론',hp:1200000,atk:4000,range:120,speed:10,knockbacks:10,traits:['black','floating'],blowChance:.2,blowDistance:14},
 whitecyclone:{name:'화이트 사이클론',hp:999999,atk:89000,range:70,speed:7,knockbacks:5,traits:['floating']},
 angelcyclone:{name:'천사 사이클론',hp:1399999,atk:76000,range:70,speed:6,knockbacks:1,traits:['angel']}
};
for(const[id,s]of Object.entries(CYCLONE_BOSSES)){
 data.units[id]={...s,range:Math.round(s.range*.034*10)/10,speed:s.speed*.67,reward:3000,area:true,interval:5/30,attackDuration:5/30,windup:1/30};
 UNIT_NAMES[id]=s.name;ENEMY_ORDER.push(id);NEW_ATLASES[id]=CYCLONE_ATLASES[id];
 ENEMY_TEXT[id]=s.name+'. 짧은 사거리에서 5프레임마다 범위 공격한다. '+(id==='angelcyclone'?'천사 속성만 지닌다. 떠 있는 적 대상 메즈가 통하지 않으므로 천사 정지·느리게로 저지하자.':id==='blackcyclone'?'검은 적·떠 있는 적. 공격마다 20% 확률로 날려버린다. 메즈로 전진을 막자.':id==='redcyclone'?'빨간 적·떠 있는 적. 높은 공격력을 받아내기보다 정지·느리게로 저지하자.':'떠 있는 적. 흰 몸이지만 무속성이 아니므로 공중 메즈를 준비하자.');
}
data.units.angelfanboy={trait:'metal',hp:5,atk:1,range:27.2,speed:4*.67,knockbacks:5,interval:605/30,windup:6/30,attackDuration:1,reward:1};
UNIT_NAMES.angelfanboy='천사 애호가';ENEMY_TEXT.angelfanboy='천사를 좋아하지만 천사 속성이 아닌 메탈 적. 체력은 5이며 아주 긴 사거리에서 약한 공격을 한다.';ENEMY_ORDER.push('angelfanboy');NEW_ATLASES.angelfanboy=CYCLONE_ATLASES.angelfanboy;
// Frame-based reference schedules converted to seconds. hp-trigger delays are relative to activation.
function cycloneSpawn(type,mag,count,hp,first,lo=0,hi=lo,boss=false){return {type,mag,...(count?{count}:{}),at:hp<100?{hp}:{t:first/30},...(hp<100&&first?{firstDelay:first/30}:{}),delay:[lo/30,hi/30],...(boss?{boss:true}:{})}}
const csp=cycloneSpawn;
const CYCLONE_EVENTS=[
 {id:'red',chance:.4,name:'붉은 카타스트로프',stage:'진격의 붉은 소용돌이',boss:'redcyclone',reward:'herbmint',chapter:1,hp:200000,max:10,color:'#d85a55',rules:[
 csp('guys',100,0,100,0,60,180),csp('rabbit',400,10,100,100,40,100),csp('shyboy',300,5,100,700,100,200),csp('stpigge',200,3,100,400,800,1000),csp('seal',300,0,99,0,300,500),csp('rabbit',400,6,99,0,40,60),...Array.from({length:3},()=>csp('rhino',500,3,99,0,2800,2820)),...Array.from({length:4},()=>csp('rabbit',500,0,99,0,2000,2020)),csp('redcyclone',100,1,99,0,0,0,true)]},
 {id:'black',chance:.4,name:'어둠의 천국',stage:'진격의 검은 소용돌이',boss:'blackcyclone',reward:'kendonavy',chapter:1,hp:200000,max:10,color:'#574b6b',rules:[
 csp('guys',100,0,100,0,100,180),csp('darkdog',300,10,100,300,140,300),csp('darkdog',300,0,99,200,300,600),csp('shadowboxer',100,0,99,0,1200,1600),csp('gorydark',100,0,99,0,900,1300),csp('gorydark',100,3,99,0,60,100),csp('nyandam',200,1,99,0),csp('blackcyclone',100,1,99,0,0,0,true)]},
 {id:'white',chance:.4,name:'국사무쌍',stage:'진격의 하얀 소용돌이',boss:'whitecyclone',reward:'alchemypurple',chapter:1,hp:400000,max:10,color:'#bdcad9',rules:[
 csp('guys',100,0,100,0,160,500),csp('kangaroo',400,7,100,100,40,120),csp('duche',100,3,100,700,100,110),csp('duche',100,15,100,2400,600,1000),csp('sloth',150,1,100,2000),csp('squirrel',100,0,100,2000,100,200),csp('otta',100,0,100,3000,1000,1400),csp('otta',100,3,90,0,2),csp('otta',100,3,80,0,2),csp('dagshund',100,3,100,2700,20,22),csp('whitecyclone',100,1,100,2000,0,0,true)]},
 {id:'angel',chance:.3,name:'천벌',stage:'진격의 천사 소용돌이',boss:'angelcyclone',reward:'rhythmpink',chapter:2,hp:400000,max:8,color:'#d7b65b',rules:[
 csp('angelfanboy',100,1,99,0),csp('gabriel',100,0,100,300,200,500),csp('heavenlyhippoe',100,0,100,500,700,1000),csp('gabriel',100,3,99,0,20,40),csp('gabriel',100,0,99,0,400,700),csp('angelcyclone',100,1,99,0,0,0,true)]}
];
let cycloneClears=[];
try{const v=JSON.parse(localStorage.getItem('red-battle-cyclone-v1')||'[]');if(Array.isArray(v))cycloneClears=[...new Set(v.filter(id=>CYCLONE_EVENTS.some(e=>e.id===id)))]}catch{}
for(const e of CYCLONE_EVENTS){
 e.index=STAGES.length;STAGES.push({name:e.stage,flag:'🌪️',hp:e.hp,xp:3800,maxEnemies:e.max,gap:4,wave:0,sky:'#b5c4d6',land:e.color,chapter:'special',cyclone:e.id,special:{item:e.reward,itemName:CYCLONE_ALLIES[e.reward].name,count:1,chance:e.chance,xp:3800},desc:e.name+' · '+UNIT_NAMES[e.boss]+' · 레어 '+CYCLONE_ALLIES[e.reward].name+' '+Math.round(e.chance*100)+'% 획득'});
 STAGE_SPAWNS[e.index]=e.rules;ACQUIRE_TEXT[e.reward]=e.name+' / '+e.stage+' 클리어 시 '+Math.round(e.chance*100)+'% 획득';
}
function cycloneStageOpen(e){return cleared.includes(CHAPTER1_LEN*e.chapter-1)}
const cycloneDropBefore=specialDropOpen,cycloneGiveBefore=giveSpecialItem,cycloneItemBefore=specialItemText;
specialDropOpen=function(sp){return CYCLONE_ALLIES[sp.item]?!gachaOwns(sp.item):cycloneDropBefore(sp)};
giveSpecialItem=function(item,n){if(CYCLONE_ALLIES[item]){if(!gachaOwns(item)){gacha.owned.push(item);saveGacha();renderNewButtons();renderDeckButtons();renderTraining()}return}return cycloneGiveBefore(item,n)};
specialItemText=function(item,n){return CYCLONE_ALLIES[item]?'레어 '+CYCLONE_ALLIES[item].name+' 획득!':cycloneItemBefore(item,n)};
const cycloneFinishBefore=finish;
finish=function(win){const fresh=!game.ended,id=STAGES[selectedStage].cyclone;cycloneFinishBefore(win);if(fresh&&win&&id&&!cycloneClears.includes(id)){cycloneClears.push(id);try{localStorage.setItem('red-battle-cyclone-v1',JSON.stringify(cycloneClears))}catch{}renderSpecialStages()}};
const cycloneResetBefore=reset;
reset=function(){const e=CYCLONE_EVENTS.find(e=>e.index===selectedStage);if(e&&!cycloneStageOpen(e)){openStages();return}return cycloneResetBefore()};
const cycloneClearedBefore=isStageCleared;
isStageCleared=function(i){const id=STAGES[i]?.cyclone;return id?cycloneClears.includes(id):cycloneClearedBefore(i)};
const cycloneSpecialBefore=renderSpecialStages;
renderSpecialStages=function(){cycloneSpecialBefore();for(const e of CYCLONE_EVENTS){
 const row=document.createElement('div');row.className='special-row today cyclone-event';row.dataset.cyclone=e.id;const label=document.createElement('div');label.className='special-label';label.innerHTML='<b class="day">매일</b><strong>🌪️ '+e.name+'</strong><small>'+UNIT_NAMES[e.boss]+'</small>';row.append(label);
 const b=document.createElement('button');b.className='stage-card ribbon';b.disabled=!cycloneStageOpen(e);b.innerHTML='<strong>'+e.stage+'</strong><small>'+(b.disabled?'세계편 '+e.chapter+'장 클리어 필요':gachaOwns(e.reward)?'획득 완료 ✓':CYCLONE_ALLIES[e.reward].name+' '+Math.round(e.chance*100)+'%')+'</small>';b.title=STAGES[e.index].desc;b.onclick=()=>{selectedStage=e.index;reset()};row.append(b);$('#specialGrid').append(row);
}};
// Keep actual evolution text in sync: these independent variants deliberately keep their range.
const cyclonePreviewBefore=renderCodexPreview;
renderCodexPreview=function(){cyclonePreviewBefore();if(codexTab==='ally'&&CYCLONE_ALLIES[codexType])$('#codexDesc').innerHTML=(codexEvolved?PROFILE_TEXT_EVOLVED[codexType]+'<br><strong>2진 효과: 체력·공격력 15% 증가 · 사거리 유지</strong>':PROFILE_TEXT[codexType])};
renderNewButtons();renderDeckButtons();renderTraining();renderSpecialStages();
