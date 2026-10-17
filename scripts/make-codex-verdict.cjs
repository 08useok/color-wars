// 도감 총평에 붙일 '평가' 문장(좋다/나쁘다 + 이유)을 만든다. 티어 글자는 쓰지 않는다. 출력: codex-verdict.js
// 근거: 테스트 맵(황제의 야옹이 ★3) 이득(초) — docs/simulations/char-analysis-2026-10-17.json, 3진은 trueform-map-final-2026-10-17.json.
// 실행: node scripts/make-codex-verdict.cjs   (티어표를 다시 잰 뒤에는 이 스크립트도 다시 돌린다)
const fs=require('fs'),path=require('path');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const rd=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const A=rd('docs/simulations/char-analysis-2026-10-17.json'),TF=rd('docs/simulations/trueform-map-final-2026-10-17.json');
const e=mk();e.setProfile({level:30});
const allies=A.order,n=allies.length,names=c=>e.names[c];
const sec=c=>A.gain[c]*300;
// 단축 초 → 말(8초 간격 티어표와 같은 경계: 54 / 38 / 22 / 10)
const LEVELS=[[54,'매우 좋다'],[38,'좋다'],[22,'무난하다'],[10,'아쉽다'],[-1e9,'나쁘다']];
const word=g=>LEVELS.find(([m])=>g>=m)[1];
const pctOf=(k,c)=>allies.filter(x=>A.feat[x][k]<A.feat[c][k]).length/(n-1);
const PHRASE={
 dps:[ '초당 피해가 높고','초당 피해가 낮고'],ehp:['체력이 높고','체력이 낮고'],range:['사거리가 길고','사거리가 짧고'],speed:['이동이 빠르고','이동이 느리고'],
 cd:['재출격이 빠르고','재출격이 느리고'],cc:['멈춤·둔화·약화 같은 군중 제어가 도움이 되고','군중 제어 효과가 이 시험에서는 별로 쓰이지 않고'],
 area:['범위 공격이라 여러 적을 한꺼번에 상대하고','단일 공격이라 여러 적을 한꺼번에 상대하기 어렵고'],knock:['버티는 횟수가 많고','버티는 횟수가 적고']};
function reasons(c){
 const o=A.contrib[c],f=A.feat[c];
 const items=Object.entries(o).filter(([k])=>k!=='cost'&&PHRASE[k]).sort((a,b)=>b[1]-a[1]);
 const pos=items.filter(x=>x[1]>0.004).slice(0,2).map(x=>x[0]),neg=items.filter(x=>x[1]<-0.004).slice(-2).reverse().map(x=>x[0]);
 return {pos,neg,f};
}
const join=(keys,i)=>keys.map(k=>PHRASE[k][i]);
const NICHE={strongVs:'특정 속성에게 강한 능력',massiveVs:'특정 속성 초데미지',extremeVs:'특정 속성 극데미지',metalKiller:'메탈 킬러',zombieKiller:'좀비 킬러',soulstrike:'좀비 영혼 공격',barrierBreak:'베리어 브레이커',waveImmune:'파동 무효',surgeImmune:'열파 무효',floatStrong:'떠 있는 적 특화',redStrong:'빨간 적 특화',statusVs:'속성 한정 상태이상'};
const nicheOf=(c,three)=>{const d={...e.units[c],...(three?e.trueBonus[c]:{})};return Object.keys(NICHE).filter(k=>d[k]).map(k=>NICHE[k])};
const effect=g=>g<-1?'오히려 클리어가 느려졌다':g<5?'더해도 클리어가 거의 빨라지지 않았다':`클리어가 약 ${Math.round(g)}초 빨라졌다`;
function two(c){
 const g=sec(c),w=word(g),{pos,neg}=reasons(c);
 let t=`<b>평가: ${w}.</b> 보물을 모두 모은 Lv.30 기준 시험(레전드 20장)에서 기본 4종 덱(레드·옐로우·블루·퍼플)에 이 캐릭터를 더하니 ${effect(g)}. `;
 const good=w==='매우 좋다'||w==='좋다',bad=w==='아쉽다'||w==='나쁘다';
 const p=good?pos:w==='무난하다'?pos.slice(0,1):[],m=bad?neg:w==='무난하다'?neg.slice(0,1):[];
 const parts=[];
 const end=a=>a.join(' ').replace(/고$/,'다.');
 if(p.length)parts.push(end(join(p,0)));
 if(m.length)parts.push(end(join(m,1)));
 if(parts.length)t+=(good||bad?'이유는 ':'')+parts.join(' 반면 ')+' ';
 const ni=nicheOf(c,false);
 if(ni.length)t+=`이 캐릭터의 특화 능력(${ni.join('·')})은 시험 맵의 적이 거의 무속성이라 반영되지 않았다. 맞는 적이 많은 스테이지에서는 더 좋을 수 있다.`;
 else t+='이 평가는 무속성 적 위주의 시험 한 곳 기준이다.';
 return t.replace(/\s+/g,' ').trim();
}
function three(c){
 if(!TF.out[c])return '';
 const g2=sec(c),d=TF.out[c].delta*300,g3=g2+d,se=TF.out[c].se*300,solid=Math.abs(d)>2*se&&Math.abs(d)>=3;
 const w2=word(g2),w3=word(g3);
 let t=`<b>3진 평가: ${w3}.</b> 3진이 된 이 캐릭터만 3진으로 두고 같은 시험을 하니 ${effect(g3)}. `;
 if(!solid)t+='2진과 비교해 의미 있는 차이는 없었다. ';
 else if(w3!==w2)t+=`2진(${w2})보다 ${d>0?'좋아졌다':'나빠졌다'}. `;
 else t+=`2진과 같은 평가지만 ${Math.abs(Math.round(d))}초 ${d>0?'더 빨라졌다':'더 느려졌다'}. `;
 const ni=nicheOf(c,true).filter(x=>!nicheOf(c,false).includes(x));
 if(ni.length)t+=`3진에서 생긴 특화 능력(${ni.join('·')})은 시험 맵의 적이 거의 무속성이라 반영되지 않았다. `;
 return t.replace(/\s+/g,' ').trim();
}
const out={};let cnt3=0;
for(const c of allies){const a=two(c),b=three(c);out[c]=[a,b];if(b)cnt3++}
const js='// 도감 총평 끝에 붙는 평가 문장(자동 생성: node scripts/make-codex-verdict.cjs). [2진 문장, 3진 문장]\n'
+'const CODEX_VERDICT='+JSON.stringify(out)+';\n'
+`(function(){
 const base=allyReview;
 allyReview=function(type,evolved){
  const html=base(type,evolved),v=CODEX_VERDICT[type],d=data.units[type];
  if(!v||!d||(d.hiddenAbility&&!codexWiki&&!futureOpen()))return html;
  const add=html.includes('· 3진 ·')?v[1]:html.includes('· 2진 ·')?v[0]:'';
  return add?html.replace(/<\\/section>\\s*$/,'<p class="codex-verdict">'+add+'</p></section>'):html;
 };
})();
`;
fs.writeFileSync(path.join(root,'codex-verdict.js'),js);
const dist={};for(const c of allies){const w=word(sec(c));dist[w]=(dist[w]||0)+1}
console.log('캐릭터',n,'3진',cnt3,JSON.stringify(dist));
for(const c of ['prism','turquoise','red','yellow','lavender','gold','crystal','khaki'])console.log('\n['+names(c)+']\n'+out[c][0]+(out[c][1]?'\n'+out[c][1]:''));
process.exit(0);
