// Rebuild navigation only. Existing authored documents and the locally edited tier README stay intact.
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),docs=path.join(root,'docs'),marker='<!-- generated: make-doc-index -->';
const groups=[['releases','출시·배포','버전별 준비·검증·배포 기록. 준비 완료와 온라인 반영을 구분한다.'],['기획-시험','기획·전투·대포','능력 초안, 스테이지·덱 시험, 대포와 배포 도구 기록. 초안은 구현 완료를 뜻하지 않는다.'],['3진-아종','3진·아종','외형·능력 기획과 모션 제작·전투 시험 기록.'],['티어표','티어표','작성일과 측정 맵·시드·형태·레벨을 함께 확인한다. 과거 표를 현재 버전의 전원 평가로 해석하지 않는다.'],['총평','도감 총평','내보낸 총평과 버전별 추가 글. 날짜가 지난 내보내기 문서는 현재 도감과 다를 수 있다.'],['작업일지','작업일지','날짜별 작업 기록. 당시의 미완료·출시 예정 문구는 현재 상태와 구분한다.'],['reviews','점검 보고서','화면·도감·난이도 검토 기록.'],['enemy-animation-audit','적 모션 점검','적 애니메이션 점검 결과와 관련 자료.'],['archive','보관 문서','이전 구현 메모와 원본 기록. 새 설계의 기준으로 사용하기 전에 날짜와 코드를 확인한다.']];
const normalize=p=>p.split(path.sep).join('/'),all=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(e.name.endsWith('.md')&&e.name!=='README.md'&&e.name!=='문서목록.md'){const text=fs.readFileSync(f,'utf8'),relative=normalize(path.relative(docs,f));all.push({file:f,relative,group:relative.includes('/')?relative.split('/')[0]:'其他',title:(text.match(/^#\s+(.+)$/m)?.[1]||e.name.slice(0,-3)).replace(/\r/g,''),date:e.name.match(/\d{4}-\d{2}-\d{2}/)?.[0]||text.match(/\b20\d{2}-\d{2}-\d{2}\b/)?.[0]||'날짜 없음'});}}}
walk(docs);all.sort((a,b)=>(a.date==='날짜 없음')-(b.date==='날짜 없음')||b.date.localeCompare(a.date)||a.relative.localeCompare(b.relative,'ko'));
function link(from,to,label){return '['+label.replace(/[\[\]|]/g,' ') +']('+encodeURI(normalize(path.relative(path.dirname(from),to)))+')';}
function table(rows,from){return '| 문서 | 기록일 |\n| --- | --- |\n'+rows.map(r=>'| '+link(from,r.file,r.title)+' | '+r.date+' |').join('\n')+'\n';}
function generated(file,text){if(fs.existsSync(file))assert(fs.readFileSync(file,'utf8').includes(marker),'Refuse to overwrite an authored index: '+file);fs.writeFileSync(file,marker+'\n\n'+text.trimEnd()+'\n','utf8');}
const authored=[];
const planningGuides=['대포-적-모션-종합.md','캐릭터-능력-종합.md','전투-측정-종합.md','스테이지-공략-종합.md','저장-보물-종합.md','출시-배포-종합.md'];
for(const [key,title,desc]of groups){if(key==='티어표')continue;const file=path.join(docs,key,'README.md'),rows=all.filter(r=>r.group===key);let text='# '+title+' 문서\n\n'+desc+'\n\n'+link(file,path.join(docs,'README.md'),'문서 안내')+' · '+link(file,path.join(docs,'문서목록.md'),'전체 문서 목록')+'\n\n';
 if(key==='기획-시험'){
  const guides=planningGuides.map(name=>rows.find(r=>r.relative==='기획-시험/'+name));assert(guides.every(Boolean),'Six planning guides required');
  const records=rows.filter(r=>r.relative.startsWith('기획-시험/기록/')),recordIndex=path.join(docs,key,'기록/README.md');
  text='# 기획·전투·대포 종합\n\n평소에는 아래 **6개 종합 문서만** 본다. 중복 설명과 후속 결정을 합쳤고, 개별 수치표·시뮬레이션·당시 초안은 기록 폴더에 보존했다.\n\n'+table(guides,file)+'\n'+link(file,recordIndex,'세부 원문 '+records.length+'개 열기')+' · '+link(file,path.join(docs,'README.md'),'전체 문서 안내')+'\n';
  generated(recordIndex,'# 기획·전투·대포 세부 기록\n\n'+link(recordIndex,file,'6개 종합 문서로 돌아가기')+'\n\n개별 기록 '+records.length+'개를 원문 내용 그대로 보존했다. 이동에 필요한 링크와 파일 경로만 수정했다. 이곳의 완료·예정 문구는 작성 당시의 상태다.\n\n'+table(records,recordIndex));authored.push(recordIndex,...guides.map(r=>r.file));
 }else text+=table(rows,file);
 generated(file,text);authored.push(file);
}
const full=path.join(docs,'문서목록.md');let fullText='# 전체 문서 목록\n\n갱신일: 2026-11-10. 본문 문서 **'+all.length+'개**를 날짜순으로 묶었다. README 목차와 이 목록 자체는 문서 수에 포함하지 않는다.\n\n날짜 없는 문서는 파일명 또는 본문에 기록된 날짜를 사용하며, 알 수 없으면 그대로 표시한다. 문서의 완료·예정 문구는 작성 당시의 기록이다.\n\n'+link(full,path.join(docs,'README.md'),'문서 안내로 돌아가기')+'\n\n';
for(const [key,title]of [...groups,['其他','분류 전 문서']]){const rows=all.filter(r=>r.group===key);if(!rows.length)continue;fullText+='## '+title+' ('+rows.length+'개)\n\n';if(key==='기획-시험'){const records=rows.filter(r=>r.relative.startsWith('기획-시험/기록/'));fullText+=table(rows.filter(r=>!records.includes(r)),full)+'\n<details>\n<summary>세부 기록 '+records.length+'개 펼치기</summary>\n\n'+table(records,full)+'\n</details>\n\n';}else fullText+=table(rows,full)+'\n';}
generated(full,fullText);authored.push(full);
const main=path.join(docs,'README.md');const count=key=>all.filter(r=>r.group===key).length;
const mainText=`# 문서 안내

갱신일: 2026-11-10. [전체 문서 목록](문서목록.md)에서 본문 문서 **${all.length}개**를 찾을 수 있다. 기획·전투·대포는 종합 6개로 합치고 기존 원문 66개는 기록 폴더에 보존했다.

## 먼저 볼 문서

- [8.4 개발·배포 정리](releases/8.4-개발-배포-정리-2026-11-10.md): 커밋·푸시와 실제 사이트 반영을 구분한 기록.
- [8.1 순위 기준 티어표 · 11월 3일](티어표/8.1-순위-티어표-2026-11-03.md): 최근 전체 순위 문서. 8.4 전원 재측정 결과가 아니다.
- [8.2 애프리·메리 점검 · 11월 8일](8.2-점검-2026-11-08.md): 위 표 이후 신규 캐릭터 추가 점검.
- [2진 총평 내보내기](총평/2진-아군-도감-총평-2026-10-18.md) · [3진 총평 내보내기](총평/3진-캐릭터-총평-2026-10-18.md): 당시 도감 글. 이후 추가·수정은 버전별 총평과 게임 코드를 함께 본다.
- [기획·전투·대포 종합 6개](기획-시험/README.md) · [대포·적·모션](기획-시험/대포-적-모션-종합.md) · [출시·배포](기획-시험/출시-배포-종합.md).
- [최근 작업일지 · 11월 10일](작업일지/작업일지-2026-11-10.md).

## 주제별 찾기

| 분류 | 본문 문서 수 | 내용 |
| --- | ---: | --- |
${groups.map(([key,title,desc])=>'| '+link(main,path.join(docs,key,'README.md'),title)+' | '+(key==='기획-시험'?'종합 6 + 기록 66':count(key))+' | '+desc+' |').join('\n')}

분류 전 문서는 [8.2 점검](8.2-점검-2026-11-08.md)과 [구레전드 41~49장](구레전드-41-49장-2026-10-29.md)이다. 수치 JSON은 simulations/, 화면 점검 JSON은 reviews/에 보관한다.

## 읽는 기준

- **현재 코드**: [게임 입구](../red-battle-doge.html)와 [버전·공지](../notice.js). 파일에 적힌 버전만으로 온라인 반영을 단정하지 않는다.
- **기획·초안**: 채택·구현·출시와 구분한다. 예전 문서의 출시 예정·미커밋 표시는 당시 기록으로 보존했다.
- **시험·티어**: 맵·별·레벨·보물·출격 방식·시드를 확인한다. 다른 조건의 점수를 바로 비교하지 않는다.
- **보관**: 예전 기록은 덮어쓰거나 삭제하지 않는다. [티어표 역사](티어표/티어표-역사.md)는 과거 표와 복구 기록을 다룬다.
- **버전 번호**: [버전 기준](releases/버전-기준.md)을 따른다.

## 목차 갱신

node scripts/make-doc-index.cjs 로 전체 목록과 폴더별 목차를 갱신한다. 기존 티어표 README와 본문 문서는 수정하지 않는다. sources/와 에셋·원본·작업 폴더의 MD는 이 목록 범위에서 제외한다.
`;
fs.writeFileSync(main,mainText,'utf8');authored.push(main,path.join(root,'README.md'));
let checked=0;for(const file of authored){const text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){const url=m[1];if(/^(?:https?:|mailto:|#)/.test(url))continue;assert(fs.existsSync(path.resolve(path.dirname(file),decodeURI(url.split('#')[0]))),'Broken link '+file+' -> '+url);checked++;}}
console.log(JSON.stringify({documents:all.length,indexFiles:authored.length,localLinksChecked:checked,unchangedTierReadme:true},null,2));
