const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'game.js'),'utf8');
function section(a,b){const start=source.indexOf(a);if(start<0)throw Error(a);return source.slice(start,source.indexOf(b,start));}
function fn(name){const start=source.indexOf(`function ${name}(`);for(let end=source.indexOf('\n',start);end>=0;end=source.indexOf('\n',end+1)){const s=source.slice(start,end);try{new vm.Script(s);return s;}catch{}}throw Error(name);}
const c={selectedStage:48,CHAPTER1_LEN:48,training:{levels:{},forms:{}},LV_EVOLVE:10,LV_MAX:20,HP_CURVE:.6,HP_LV10_MULT:1.8*2/1.15,enemyMagnification:()=>1,alienMagnification:()=>1};vm.createContext(c);
vm.runInContext(source.match(/const data=[^\n]+/)[0],c);
for(const line of source.split('\n').filter(l=>l.startsWith('data.units.')))vm.runInContext(line,c);
for(const name of ['EX_TYPES','SR_TYPES','RARE_TYPES','ALLIES','EX_GRADE','UNIT_NAMES','UNLOCK_AT','ACQUIRE_TEXT','ROLES','TRAIT_TARGET']){
 const match=source.match(new RegExp('const '+name+'=([^;]+);'));if(!match)throw Error(name);
 if(name==='UNLOCK_AT'){c.CH3_START=96;c.FUTURE_START=144;}
 vm.runInContext(match[0],c);
}
vm.runInContext(section('const ATK_SLOPE=','// Extra 2진 effects'),c);
vm.runInContext(section('const evoMez=','function allyUnlocked('),c);
for(const name of ['overMult','gradeOf'])vm.runInContext(fn(name),c);
vm.runInContext(fs.readFileSync(path.join(root,'ally-comparison.js'),'utf8'),c);
vm.runInContext('globalThis.roster=ALLIES;globalThis.names=UNIT_NAMES;globalThis.roles=ROLES;globalThis.unlock=UNLOCK_AT;globalThis.acquire=ACQUIRE_TEXT;',c);
const rows=c.roster.map(type=>{const stats=c.unitStats(type,30,2);return {type,name:c.names[type],grade:c.gradeOf(type),role:c.roles[type],acquire:c.acquire[type]||(Number.isFinite(c.unlock[type])?`진행도 ${c.unlock[type]} 이후 해금`:'뽑기 등 별도 획득'),stats,metrics:c.allyComparisonMetrics(stats)};});
// Verify actual damage dispatch for the area/multiHit overlap, not just our formula.
const battle={BEAM_FX:{},deadZone:()=>0,targetValid:()=>null,data:{bases:{enemy:{frontX:-1000}}},game:{units:[]},damage:()=>{},baseDamage:Math.round};vm.createContext(battle);vm.runInContext(fn('resolveAttack'),battle);
for(const [type,expected] of [['ribbonchart',1],['chartreuse',6]]){
 const stats=rows.find(r=>r.type===type).stats,v={hp:1e9,kbTime:0,ally:false,x:40};let hits=0;
 battle.game.units=[v];battle.damage=()=>{hits++;};battle.resolveAttack({type,stats,ally:true,x:50},v);
 if(hits!==expected)throw Error(`Actual attack dispatch ${type}: ${hits}`);
}
const cf=fs.readFileSync(path.join(root,'catfruit.js'),'utf8');c.hasTrueForm=t=>t==='cream';
for(const n of ['TRUE_FORM_MULT','TRUE_FORM_ATK_MULT','TRUE_FORM_BONUS'])vm.runInContext(cf.match(new RegExp('const '+n+'=[^;]+;'))[0],c);
vm.runInContext(cf.slice(cf.indexOf('const _unitStatsCF='),cf.indexOf('// Battle:')),c);
const cream=c.unitStats('cream',30,2);const trueForm={type:'cream',name:'와플 크림',stats:cream,metrics:c.allyComparisonMetrics(cream)};
const result={level:30,plus:0,form:2,chapter:'세계편 2·3장',method:'현재 성장·진화 코드로 계산. 정지한 적 한 마리에게 지속 적중하는 이론 수치. 왕복·거리별 피해·실제 공격 분기·치명타 평균·추가 공격 상한·속성 피해/체력을 반영. 전 스테이지 승률이나 종합 점수 순위가 아님.',rows,trueForm};
fs.writeFileSync(path.join(root,'docs/simulations/ally-comparison-2026-10-08.json'),JSON.stringify(result,null,2));
const n=x=>Math.round(x).toLocaleString('ko-KR');
let md='# 전체 아군 비교와 총평 근거\n\n'+result.method+' Lv.30·2진·+레벨 없음, 세계편 2·3장 가격. 아군 '+rows.length+'종과 와플 크림 3진을 비교했다.\n\n';
md+='메탈은 비치명타 피해가 1이므로 일반 속성 DPS와 비교하지 않았다. 메즈 확률을 단순 화력 점수에 더하지 않았다. 광역·사거리·가격·재출격·획득 시기·특화 능력이 서로 달라 절대적인 최악을 단정하지 않는다.\n\n';
md+='범용 후방 딜러 후보는 레인보우, 필수 고방 후보는 옐로우·레드다. 현 구현에서 화력 대비 가격이 가장 불리한 후보는 리본 샤트다. 범위 공격 분기가 연타 분기보다 먼저 실행되어, 등록된 4연타와 달리 실제 공격은 대상당 1타격임을 실제 공격 함수로 검증했다. DPS 약 929, 가격 1,270원, 사거리 19.2, 재출격 22초로 오렌지보다 비싸고 느리며 약하다. 다만 개체 체력은 더 높아 완전한 하위호환은 아니다. 이 문제를 고치면 다시 평가해야 한다.\n\n';
md+='미드나잇은 전체 최저 체력 5,795, DPS 약 477로 기초 성능이 낮지만, 에이리언 정지라는 고유 역할이 있어 화력만으로 최악이라고 단정하지 않는다. 그린의 왕복 DPS와 살몬의 보스 피해 보너스를 반영해 기존 최악 단정을 삭제한다.\n\n';
md+='|캐릭터|역할|가격|체력|사거리|재출격|직접 DPS|조건 충족 DPS 상한/평균|1,000원당 DPS|획득|\n|---|---|---:|---:|---:|---:|---:|---:|---:|---|\n';
for(const r of rows)md+=`|${r.name}|${r.role}|${n(r.stats.cost)}|${n(r.stats.hp)}|${+r.stats.range.toFixed(2)}|${+r.stats.cooldown.toFixed(2)}|${n(r.metrics.directDps)}|${n(r.metrics.maximumDps)}|${n(r.metrics.dpsPer1000)}|${r.acquire}|\n`;
md+='\n## 캐릭터별 수치 설명\n\n';for(const r of [...rows,trueForm])md+=`### ${r.name}\n\n${c.allyComparisonText(r.stats).replace(/<[^>]+>/g,'')}\n\n`;
fs.writeFileSync(path.join(root,'docs/ally-comparison-2026-10-08.md'),md);
// Check rendered reviews against all real current stats without save or stage mutations.
c.codexWiki=true;c.futureOpen=()=>true;
const stageEvidence=path.join(root,'character-stage-results.js');if(fs.existsSync(stageEvidence))vm.runInContext(fs.readFileSync(stageEvidence,'utf8'),c);
vm.runInContext(fs.readFileSync(path.join(root,'codex-review.js'),'utf8'),c);
for(const type of c.roster){const html=c.allyReview(type,true);if(/undefined|NaN/.test(html))throw Error('Invalid review '+type);if(html.includes('명실상부 최악'))throw Error('Unsupported absolute ranking '+type);}
if(c.selectedStage!==48)throw Error('Stage mutated');
if(fs.existsSync(stageEvidence)){
 if(!c.allyReview('red',true).includes('검증에서 기본 등급 중 최고다.'))throw Error('Basic winner review');
 if(!c.allyReview('white',true).includes('검증에서 레어 등급 중 최고다.'))throw Error('Rare winner review');
 if(!c.allyReview('verdigris',true).includes('검증에서 슈퍼 레어 등급 중 최고다.'))throw Error('Super Rare winner review');
 for(const t of ['cornflower','charcoal'])if(!c.allyReview(t,true).includes('최악 후보 라인'))throw Error('Super Rare lower review');
 c.codexWiki=false;c.futureOpen=()=>false;
 if(c.allyReview('cornflower',true).includes('동일 고정 덱의 한 슬롯'))throw Error('Hidden ability evidence disclosed early');
 c.codexWiki=true;c.futureOpen=()=>true;
 if(c.allyReview('red',false).includes('동일 고정 덱의 한 슬롯'))throw Error('Second-form evidence applied to first form');
 if(c.allyReview('cream',true).includes('동일 고정 덱의 한 슬롯'))throw Error('Second-form evidence applied to true form');
 for(const t of ['salmon','midnight'])if(c.allyReview(t,true).includes('등급 중 최악이다.'))throw Error('Unsupported absolute worst review');
}
for(const r of rows){if(!Number.isFinite(r.metrics.maximumDps)||r.metrics.maximumDps<=0)throw Error(r.type);}
const green=rows.find(r=>r.type==='green'),orange=rows.find(r=>r.type==='orange');
if(Math.abs(green.metrics.maximumDps-2432.25)>.01||Math.abs(orange.metrics.maximumDps-1475.8333)>.01)throw Error('Boomerang regression');
console.log(JSON.stringify({count:rows.length,lowestHp:rows.toSorted((a,b)=>a.stats.hp-b.stats.hp).slice(0,5).map(r=>r.name),lowestDpsPerCost:rows.toSorted((a,b)=>a.metrics.dpsPer1000-b.metrics.dpsPer1000).slice(0,5).map(r=>({name:r.name,dps:r.metrics.maximumDps,per1000:r.metrics.dpsPer1000})),checks:'84 reviews, finite metrics, save-free calculation and boomerang values passed'},null,2));
