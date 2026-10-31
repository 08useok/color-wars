// Four 7.5 releases only. Light Rainbow art is reserved for 8.0 and not registered.
const BUSTERS75={
 heliotrope:{name:'헬리오트로프',color:'#df73ff',hp:180000,dps:25000,interval:3,speed:12,range:26,cost:4200,wait:40,kb:3,traits:['red','floating'],freeze:4,windup:.3,recovery:.5,atlas:HELIOTROPE_MOTION_ATLASES,
  extra:{area:true,attackClass:'원거리 범위',zoneMin:0,zoneMax:40,immune:{weaken:true,freeze:true}},profile:'여성, 33세. 천연 염색 공예가. 염색 천에서 흩날리는 색으로 빨간 적과 떠 있는 적을 묶는다.',evolved:'두건과 작업 앞치마를 갖춘 헬리. 염료를 멀리 흩뿌린다.'},
 wisteria:{name:'위스테리아',color:'#c9a0dc',hp:400000,dps:20000,interval:2,speed:16,range:18,cost:4000,wait:40,kb:3,traits:['black','alien'],freeze:3,windup:.2,recovery:.4,atlas:BUSTERS_REMAINING_MOTION_ATLASES,
  extra:{area:true,attackClass:'전방위',zoneMin:0,zoneMax:24,backRange:18,knockbackImmune:true,strengthen:{at:.5,mult:2}},profile:'여성, 31세. 조경 디자이너. 앞뒤로 뻗는 꽃덩굴로 검은 적과 에이리언을 붙잡는다.',evolved:'조경 작업복을 갖춘 위스. 체력이 절반 이하가 되면 공격력이 두 배가 된다.'},
 blossom:{name:'블로섬',color:'#ffb7c5',hp:280000,dps:25000,interval:2.5,speed:14,range:24,cost:4000,wait:40,kb:3,traits:['angel','zombie'],freeze:3.5,windup:.3,recovery:.5,atlas:BUSTERS_REMAINING_MOTION_ATLASES,
  extra:{area:true,attackClass:'범위',zoneMin:0,zoneMax:28,immune:{freeze:true,poison:true}},profile:'여성, 29세. 웨딩 플래너. 꽃잎으로 천사와 좀비의 움직임을 멈추게 한다. 좀비 킬러는 없어 처치한 좀비의 부활은 막지 못한다.',evolved:'플래너 정장을 입은 블로섬. 꽃다발로 전선을 넓게 정리한다.'},
 almondblossom:{name:'아몬드 블로섬',color:'#efd2c2',hp:350000,dps:50000,interval:1.5,speed:22,range:12,cost:3800,wait:35,kb:3,traits:['red','black'],freeze:2.5,windup:.15,recovery:.25,atlas:BUSTERS_REMAINING_MOTION_ATLASES,
  extra:{attackClass:'개체',immune:{weaken:true},savageChance:.3,savageMult:3},profile:'여성, 34세. 견과류 전문점 사장. 나무 스쿱으로 빨간 적과 검은 적 한 마리를 집중 타격한다.',evolved:'가게 앞치마를 갖춘 아블. 30% 확률로 세 배 혼신의 일격을 날린다.'}
};
// Capture exclusive pity before the old series loader filters unknown series.
const BUSTERS75_SAVED_PITY=(()=>{try{return JSON.parse(localStorage.getItem('red-battle-gacha-v1')||'{}').pityS||{};}catch{return {};}})();
for(const [id,s]of Object.entries(BUSTERS75)){
 for(const list of [EX_TYPES,EX_GRADE,ALLIES,NEW_ALLY_TYPES,GENERIC_CD_TYPES])if(!list.includes(id))list.push(id);
 // Existing LV30 growth, 2nd-form x1.15 and complete treasure x2.5 total x4.025.
 const target={hp:s.hp/4.025,atk:s.dps*s.interval/4.025};
 data.units[id]={hp:Math.round(target.hp/28),atk:Math.round(target.atk/9),interval:s.interval,speed:s.speed,range:s.range,cost:s.cost,cooldown:s.wait+3,knockbacks:s.kb,flatCost:true,noRangeGrow:true,freezeChance:1,freezeDuration:s.freeze,statusVs:s.traits,massiveVs:s.traits,windup:s.windup,attackDuration:s.windup+s.recovery,...s.extra};
 LV20_TARGET[id]=target;UNIT_NAMES[id]=EX_NAME[id]=s.name;COLORS[id]=s.color;ROLES[id]=s.extra.attackClass+' · '+s.traits.map(t=>TRAIT_NAMES[t]).join('·')+' 초데미지·정지';
 PROFILE_TEXT[id]=s.profile;PROFILE_TEXT_EVOLVED[id]=s.evolved+' '+s.profile;EVOLUTION_TEXT[id]='체력·공격력 +15% · 사거리 유지';ACQUIRE_TEXT[id]='바스터즈 전용 뽑기로 획득';
 const saved=SUBSPECIES_SAVED_TRAINING?.levels?.[id];training.levels[id]=Number.isInteger(saved)?Math.max(1,Math.min(LEVEL_HARD_MAX,saved)):1;if(SUBSPECIES_SAVED_TRAINING?.forms?.[id]===1)training.forms[id]=1;
 NEW_ATLASES[id]={...s.atlas[id+'_1'],evolved:{...s.atlas[id+'_2']}};PROFILE_ART[id]=[1,2].map(f=>'assets/'+(id==='heliotrope'?'heliotrope-motion':'busters-remaining-motion')+'/'+id+'_'+f+'-profile.webp?v=1');RARE_STRIKE[id]=2;EVO_BODY_H[id]=104;
 const b=document.createElement('button');b.id=id+'Btn';b.className='unit-btn';b.innerHTML='<i style="background:'+s.color+'"></i><strong>'+s.name+'</strong><small></small><em></em>';b.onclick=()=>addUnit(id);$('.controls').append(b);
}
{const before=gradeOf;gradeOf=function(id){return BUSTERS75[id]?'uber':before(id);};}
// Poison-specific damage contexts are ignored without blocking ordinary hits.
{const before=damage;damage=function(v,amount,from){if(v?.ally&&v.stats?.immune?.poison&&game.inPoison)return;return before.apply(this,arguments);};}
{const before=allyUnlocked;allyUnlocked=function(id){return BUSTERS75[id]?gachaOwns(id):before(id);};}
{const before=animateAtlas;animateAtlas=function(u){if(!BUSTERS75[u.type])return before(u);const a=u.stats?.evolved?NEW_ATLASES[u.type].evolved:NEW_ATLASES[u.type],stationary=u.busters75X===u.x;u.busters75X=u.x;const walk=a.walk,step=a.walkStep;try{if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}return before(u);}finally{a.walk=walk;a.walkStep=step;}};}
renderNewButtons();renderDeckButtons();renderTraining();
