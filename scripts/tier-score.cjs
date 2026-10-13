// 티어 시험 결과 → 후보별 점수. 입력 tier-test-2026-10-13-best.json(방식 여러 개 중 하나라도 이기면 승리)
// 출력: docs/simulations/tier-scores-2026-10-13.json
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const src=process.argv[2]||'docs/simulations/tier-test-2026-10-13-best.json';
const T=JSON.parse(fs.readFileSync(path.join(root,src),'utf8'));
// (후보, 조건, 시드, 종류)별로 방식 중 최선만 남긴다
const best=new Map();
for(const r of T.rows){
 const k=[r.c,r.i,r.crown,r.seed,r.kind].join('|');
 const b=best.get(k);
 const v={win:r.win,sec:r.win?r.sec:300,ally:r.ally,c:r.c,i:r.i,crown:r.crown,seed:r.seed,kind:r.kind};
 if(!b||(v.win&&!b.win)||(v.win===b.win&&(v.win?v.sec<b.sec:v.ally>b.ally)))best.set(k,v);
}
const ref=new Map();
for(const v of best.values())if(v.kind==='ref')ref.set(v.i+'|'+v.crown+'|'+v.seed,v);
const era=(i,crown)=>{if(i<=143||(i>=159&&i<=206)||(i>=353&&i<=400)||(i>=459&&i<=554))return 'story';return 'legend'};
const per={};
for(const v of best.values()){
 if(v.kind==='ref')continue;
 const b=ref.get(v.i+'|'+v.crown+'|'+v.seed);if(!b)continue;
 const a=v.kind==='with'?v:b, z=v.kind==='with'?b:v;
 const o=per[v.c]=per[v.c]||{pairs:0,net:0,both:0,timeSave:0,refTime:0,castle:0,gains:0,losses:0,core:v.kind==='without',eras:{}};
 const d=(a.win?1:0)-(z.win?1:0);
 o.pairs++;o.net+=d;if(d>0)o.gains++;if(d<0)o.losses++;
 if(a.win&&z.win){o.both++;o.timeSave+=z.sec-a.sec;o.refTime+=z.sec}
 o.castle+=a.ally-z.ally;
 const e=era(v.i,v.crown);const g=o.eras[e]=o.eras[e]||{pairs:0,net:0};g.pairs++;g.net+=d;
}
const out={};
for(const [c,o] of Object.entries(per)){
 const winGain=o.net/o.pairs*100,timeGain=o.refTime?o.timeSave/o.refTime*100:0;
 out[c]={name:T.names[c],grade:T.grades[c],pairs:o.pairs,net:o.net,gains:o.gains,losses:o.losses,winGain:+winGain.toFixed(2),timeGain:+timeGain.toFixed(2),castleGain:+(o.castle/o.pairs).toFixed(0),core:o.core,
  story:o.eras.story?+(o.eras.story.net/o.eras.story.pairs*100).toFixed(2):null,legend:o.eras.legend?+(o.eras.legend.net/o.eras.legend.pairs*100).toFixed(2):null,
  score:+(winGain+0.35*timeGain).toFixed(2)};
}
fs.writeFileSync(path.join(root,'docs/simulations/tier-scores-2026-10-13.json'),JSON.stringify(out,null,1));
const arr=Object.entries(out).sort((a,b)=>b[1].score-a[1].score);
console.log('n',arr.length);
for(const [c,o] of arr)console.log(String(o.score).padStart(7),o.grade.padEnd(5),c.padEnd(13),o.name,'win',o.winGain,'time',o.timeGain,'g/l',o.gains+'/'+o.losses,'story',o.story,'legend',o.legend,o.core?'(core)':'');
