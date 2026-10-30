const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),crypto=require('crypto');
const tierFiles=['docs/티어표/티어표-2진-3진-2026-10-29.md','docs/티어표/등급별-아군-티어리스트-2026-10-29.md'],hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'),before=tierFiles.map(hash);
const c=vm.createContext({codexReviewAssessment:()=>({strength:'base',weakness:'base',use:'base'}),allyReview:()=>'<section></section>',codexReviewStats:()=>({trueForm:true})});
for(const f of ['reviews-74.js','reviews-ocean-sea.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const third=vm.runInContext('THIRD74_ASSESSMENT',c),ocean=vm.runInContext('OCEAN_SEA_ASSESSMENT',c),changes=vm.runInContext('THIRD74_REVIEW',c);
for(const id of Object.keys(third)){assert.equal(c.codexReviewAssessment(id,{trueForm:false}).strength,'base');assert.equal(c.codexReviewAssessment(id,{trueForm:true}).strength,third[id].strength);assert(c.allyReview(id,true).includes(changes[id]));}
const text=s=>s.replace(/<strong[^>]*>(.*?)<\/strong>/g,'**$1**');
let md='# 7.4 신규 캐릭터·3진 총평\n\n도감의 강점·약점·편성 판단과 같은 원문이다. 새 시험 구역 9개 맵·Lv.30·수입 MAX·시드 3개·출격 2방식 결과를 참고했으며, 시험 순위와 등급은 총평에 넣지 않는다. 기존 티어표는 유지한다. 시험 결과는 공체 강화 전 기록이며 현재 150% 공체의 성능 순위는 재측정 전이다. 모든 맵의 보편적 우위를 뜻하지 않는다.\n\n';
for(const [name,id,s]of [['오션','ocean',ocean.ocean],['씨','sea',ocean.sea],['라일락 3진','lilac',third.lilac],['베이비 핑크 3진','babypink',third.babypink],['마젠타 3진','magenta',third.magenta],['퓨전 크림 3진','fusioncream',third.fusioncream]]){md+='## '+name+'\n\n'+[s.strength,s.weakness,s.use].map(text).join('\n\n')+'\n\n';if(changes[id])md+='### 3진 변화\n\n체력과 공격력이 각각 **150%**, **150%**로 늘었다. '+text(changes[id])+'\n\n';}
md+='베이비 핑크의 에이리언 문구는 게임 총평에서 하늘색(#4fc3f7)으로 표시한다. 원본: `reviews-74.js`, `reviews-ocean-sea.js`.\n\n측정 근거: [전체 시험 결과](../기획-시험/티어-시험구역-전체측정-2026-10-30.md).\n';
fs.writeFileSync('docs/총평/7.4-신규-총평-2026-10-30.md',md);assert.deepEqual(tierFiles.map(hash),before);console.log('PASS six matching codex reviews, third-only assessments, preserved sky-blue markup, unchanged tier documents');
