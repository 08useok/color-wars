// Original SVG drawings, with distinct walk / anticipation / impact / recovery / hurt poses.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'assets/cyclone');fs.mkdirSync(out,{recursive:true});
const svg=(body,w=192,h=192)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
const ellipse=(x,y,rx,ry,fill,more='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="#181c29" stroke-width="5" ${more}/>`;
const line=(d,fill='none',stroke='#181c29',width=5)=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
function ally(id,color,evo,f){
 const hit=f>=6&&f<=8,prep=f===4||f===5,hurt=f===10,bob=f<4?[0,-3,0,-2][f]:0,lean=hurt?8:hit?-7:prep?5:0;
 const feet=f<4?[-8,0,8,0][f]:hit?10:0;
 let body=ellipse(79-feet,173,19,10,evo?'#29344a':color)+ellipse(112+feet,173,19,10,evo?'#29344a':color);
 if(evo)body+=line('M75 115 L119 115 L132 158 Q98 175 64 158Z',id==='kendonavy'?'#19243f':id==='alchemypurple'?'#f1e8ff':id==='herbmint'?'#254c3a':'#932962');
 body+=ellipse(97+lean,78+bob,48,47,color)+ellipse(76+lean,81+bob,5,10,'#181c29');
 body+=`<ellipse cx="80" cy="53" rx="14" ry="7" transform="rotate(-35 80 53)" fill="#fff" opacity=".65"/>`;
 if(hurt)body+=line('M64 77 l18 10 -18 8');
 if(id==='herbmint'){
  body+=line('M119 48 Q116 14 146 24 Q147 46 119 48 M118 45 Q89 27 99 16 Q120 15 123 43','#4da757');
  body+=line(`M130 128 L${hit?30:137} ${hit?111:83}`,'none','#936135',10)+ellipse(hit?29:138,hit?110:78,18,15,'#90e5b0');
  body+=line(`M${hit?17:127} ${hit?105:73} q12 -23 25 -5 q-3 20 -25 5`,'#42ae68');
  if(evo)body+=line('M78 128 l34 0 5 30 -44 0Z','#c4f3d5')+line('M82 137 l25 0 M95 129 l0 25','none','#51886b',3);
 }else if(id==='kendonavy'){
  body+=line(`M119 131 L${hit?18:144} ${hit?58:26}`,'none','#e6c077',11)+line(`M${hit?49:137} ${hit?78:68} l-16 8`,'none','#657389',8);
  body+=line('M129 75 Q154 92 128 117','#243b66')+line('M132 83 l11 5 M131 93 l12 3 M131 103 l8 0','none','#bccbdc',3);
  if(evo)body+=line('M55 55 Q92 7 132 53 L128 64 Q88 38 55 64Z','#162642')+line('M70 130 L119 130 124 158 67 158Z','#23385d')+line('M78 138 l0 15 M91 138 l0 18 M106 138 l0 16','none','#97a6bc',3);
 }else if(id==='alchemypurple'){
  const x=hit?31:136,y=hit?116:103;
  body+=line(`M${x-6} ${y-21} l12 0 0 12 14 21 q-20 17 -40 0 l14 -21Z`,'#d8c5fa');
  body+=line(`M${x-17} ${y+7} q18 -10 33 0 l-3 6 q-15 10 -27 0Z`,'#8fe56f','none');
  if(evo)body+=line('M53 39 L94 5 138 39Z','#4b316f')+line('M48 42 Q93 25 144 42 L141 51 Q92 42 48 51Z','#6d4a9a')+line('M89 24 l5 -10 6 10 -9 -4 9 0Z','#ffe297','none');
 }else{
  for(const [x,y,rot]of [[hit?34:139,hit?67:107,-30],[hit?126:55,hit?116:132,30]])body+=`<g transform="rotate(${rot} ${x} ${y})">${line(`M${x} ${y} l0 32`,'none','#d29443',7)}${ellipse(x,y,12,18,'#ffd485')}${line(`M${x-8} ${y} l16 0`,'none','#e87695',4)}</g>`;
  body+=line('M120 40 q-11 -25 -22 -9 l17 14 q22 -16 29 -4 l-21 7Z','#ff8fbc');
  if(evo)body+=line('M70 124 L119 124 137 158 Q99 177 59 158Z','#fff1f8')+line('M76 132 l10 24 M92 131 l10 27 M109 132 l10 22','none','#e965a1',4);
 }
 body+=ellipse(hit?48:132,hit?125:128,13,11,color)+ellipse(65,129,12,10,color);
 if(hit){const effect=id==='herbmint'?'#a2f9ba':id==='kendonavy'?'#ffe2a0':id==='alchemypurple'?'#bdfb80':'#ffa2dc';body+=line('M21 64 Q-7 102 23 147','none',effect,7)+line('M13 85 l-7 -9 M10 126 l-6 9','none',effect,4)}
 return `<g transform="translate(${hurt?7:0} 0)">${body}</g>`;
}
function cyclone(color,f,angel=false){
 const shift=[-8,-3,5,10,2,-7,4,-3,7,0,10][f],impact=f>=6&&f<=8;
 let b=angel?`<ellipse cx="97" cy="17" rx="29" ry="7" fill="none" stroke="#e4b231" stroke-width="7"/>${line('M55 65 Q-8 17 10 101 Q20 123 54 113 M139 65 Q200 17 182 101 Q171 123 139 113','#fff7d4','#b99041',4)}`:'';
 b+=line(`M40 42 Q${95+shift} 12 153 45 Q185 73 147 99 Q163 124 120 144 Q130 163 92 179 Q65 165 82 144 Q39 131 57 111 Q17 87 40 65Z`,color);
 for(let k=0;k<5;k++){const y=56+k*23,w=55-k*8;b+=line(`M${96-w} ${y} Q${104+shift} ${y+18} ${96+w} ${y-5}`,'none',color==='#303040'?'#9d91c1':angel?'#c99c36':'#fff',4)}
 b+=ellipse(91+shift/3,73,31,22,'#fff')+ellipse(94+shift/3,74,8,16,color==='#303040'?'#e14962':'#1c2331');
 b+=line('M64 54 L91 60 M121 52 L101 60','none','#181c29',6);
 if(impact)b+=line(`M23 62 Q${-10+shift} 93 25 137 M167 61 Q${205+shift} 100 159 142`,'none',angel?'#ffe39c':color,7);
 return b;
}
const registry={};
function write(id,draw,scale=.5){
 const frames=Array.from({length:11},(_,i)=>`<svg x="${i*192}" width="192" height="192" viewBox="0 0 192 192" overflow="hidden">${draw(i)}</svg>`).join('');
 fs.writeFileSync(path.join(out,id+'.svg'),svg(frames,192*11,192));fs.writeFileSync(path.join(out,id+'-profile.svg'),svg(draw(0)));
 const frame=i=>[i*192,0,192,192,96,0];registry[id]={sheet:'assets/cyclone/'+id+'.svg?v=1',scale,left:21,flip:false,groundAnchor:true,bodyWidth:64,walkStep:.1,strike:2,continuousAttack:true,walk:[0,1,2,3].map(frame),attack:[4,5,6,7,8,9].map(frame),hurt:[frame(10)]};
}
for(const[id,color]of Object.entries({herbmint:'#89e5c3',kendonavy:'#334d85',alchemypurple:'#a97de0',rhythmpink:'#fb9bc5'}))for(let form=1;form<=2;form++)write(id+'_'+form,f=>ally(id,color,form===2,f));
for(const[id,color]of Object.entries({redcyclone:'#e84846',blackcyclone:'#303040',whitecyclone:'#dae4ed',angelcyclone:'#f0d487'}))write(id,f=>cyclone(color,f,id==='angelcyclone'),.68);
write('angelfanboy',f=>`<g transform="translate(${f%2*4} 0)">${ellipse(96,164,29,14,'#555')}${ellipse(96,96,42,53,'#b7bdc5')}${ellipse(77,88,5,10,'#111')}${line('M121 88 l38 -16 0 53 -34 -13Z','#ffe7a0')}${line('M142 78 l0 33','none','#444',3)}</g>`,.4);
fs.writeFileSync(path.join(root,'cyclone-motion-atlases.js'),'// Generated by scripts/build-cyclone-assets.cjs. Original vector art.\nconst CYCLONE_ATLASES='+JSON.stringify(registry)+';\n');
console.log('Built '+Object.keys(registry).length+' motion sheets and portraits.');
