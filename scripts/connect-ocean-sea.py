from pathlib import Path
root=Path(__file__).resolve().parents[1]
base=(root/'allies-73.js').read_text(encoding='utf-8')
loop=base[base.index('for(const [id,s]'):].replace('ALLIES73','OCEAN_SEA74').replace('ALLIES_73_MOTION_ATLASES','OCEAN_SEA_MOTION_ATLASES').replace('allies-73-motion','ocean-sea-motion')
header='''// User-approved traits; base stats are initial balancing proposals using LV20_TARGET.
const OCEAN_SEA74={
 ocean:{name:'오션',color:'#0077be',hp:65000,atk:9500,interval:4.2,speed:6,range:23,cost:3900,cooldown:55,knockbacks:3,
  extra:{area:true,attackClass:'범위',massiveVs:['alien','zombie'],zombieKiller:true,windup:.6,attackDuration:1.2},
  role:'에이리언·좀비 초데미지 · 좀비 킬러',profile:'남성, 35세. 워터즈의 해양 기상 관측원. 풍속계와 관측 부이로 바람을 일으킨다. 에이리언과 좀비에게 초데미지를 주고, 직접 끝장낸 좀비의 부활을 막는다. 공격 준비 중 밀리지 않도록 고방으로 보호하자.',evolved:'관측 작업복을 갖춘 오션. 강한 바닷바람으로 전선을 지원한다.'},
 sea:{name:'씨',color:'#008c95',hp:110000,atk:4200,interval:2.2,speed:24,range:10,cost:3150,cooldown:40,knockbacks:2,
  extra:{area:true,attackClass:'범위',resistVs:['alien','floating'],slowChance:.3,slowDuration:3,statusVs:['alien','floating'],windup:.25,attackDuration:.8},
  role:'고속 합류 · 에이리언·떠 있는 적 맷집 · 30% 느리게',profile:'여성, 28세. 워터즈의 스쿠버다이빙 강사. 빠르게 전선에 합류해 짧은 작살과 물거품으로 싸운다. 에이리언과 떠 있는 적에게 맷집이 좋고 30% 확률로 3초간 느리게 한다. 다른 속성에는 맷집이 적용되지 않으며 느리게도 확정은 아니다.',evolved:'잠수복과 산소통을 갖춘 씨. 전선 앞에서 공격을 버티며 적의 접근을 늦춘다.'}
};
'''
idle='''
{const before=animateAtlas;animateAtlas=function(u){
 if(!OCEAN_SEA74[u.type])return before(u);
 const base=NEW_ATLASES[u.type],a=u.stats?.evolved?base.evolved:base,stationary=u.oceanSeaLastX===u.x;u.oceanSeaLastX=u.x;
 const walk=a.walk,step=a.walkStep;try{if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}return before(u);}finally{a.walk=walk;a.walkStep=step;}
};}
'''
(root/'allies-ocean-sea.js').write_text(header+loop+idle,encoding='utf-8')
p=root/'red-battle-doge.html';s=p.read_text(encoding='utf-8');marker='<script src="uber-series.js?v=11"></script>'
extra='<script src="assets/ocean-sea-motion/motion-atlases.js?v=1"></script><script src="allies-ocean-sea.js?v=1"></script>'
if extra not in s:
 assert marker in s;s=s.replace(marker,extra+marker)
p.write_text(s,encoding='utf-8')
p=root/'scripts/full-harness.cjs';s=p.read_text(encoding='utf-8');marker="'uber-series.js',"
if "'allies-ocean-sea.js'" not in s:
 assert marker in s;s=s.replace(marker,"'assets/ocean-sea-motion/motion-atlases.js','allies-ocean-sea.js',"+marker)
p.write_text(s,encoding='utf-8')
