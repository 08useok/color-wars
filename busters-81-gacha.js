// 8.2 신규 울슈레의 뽑기 전용 배너: 고대·좀비·메탈 바스터즈를 새로 만들고 떠적 바스터즈에 메리를 더한다.
// 기존 배너의 천장·확정권 규칙과 일일 시리즈 로테이션은 그대로이며, busters-75-gacha.js와 busters-81-allies.js 뒤에 불러온다.
// 그림이 없어 busters-81-allies.js가 캐릭터를 등록하지 않았으면 아무것도 하지 않는다.
if(typeof BUSTERS81!=='undefined'&&BUSTERS75.apricot&&BUSTERS75.marigold){
 BUSTERS75_BANNERS['고대 바스터즈']=['apricot'];BUSTERS75_BANNERS['좀비 바스터즈']=['apricot'];BUSTERS75_BANNERS['메탈 바스터즈']=['marigold'];
 if(!BUSTERS75_BANNERS['떠적 바스터즈'].includes('marigold'))BUSTERS75_BANNERS['떠적 바스터즈'].push('marigold');
 for(const [name,ids]of Object.entries(BUSTERS75_BANNERS)){
  SERIES_MEMBERS[name]=ids.map(id=>({id,name:BUSTERS75[id].name}));
  if(!Number.isInteger(gacha.pityS[name])){const saved=BUSTERS75_SAVED_PITY[name];gacha.pityS[name]=Number.isInteger(saved)&&saved>=0?Math.min(SERIES_GACHA.pity-1,saved):0;}
 }
 for(const [id,s]of Object.entries(BUSTERS75)){if(!GACHA_UBER.some(u=>u.id===id))GACHA_UBER.push({id,name:s.name});ACQUIRE_TEXT[id]=Object.entries(BUSTERS75_BANNERS).filter(([,ids])=>ids.includes(id)).map(([name])=>name).join(' · ')+' 전용';}
 saveGacha();
 if(gachaOpen())renderGacha();
}
