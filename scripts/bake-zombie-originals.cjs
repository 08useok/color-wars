// 8.0 신규 적 13종: 원작 부품 데이터(raw/<모션번호>-a, -c.png)를 battlecatsinfo/battlecats-animation-typescript(MIT)로 재생해 프레임을 reference-sheets/zombie-originals/frames/<키>/ 에 저장한다. 이어서 pack-80-enemies.py 가 시트로 묶는다.
//   node scripts/bake-80-enemies.cjs [키 ...]   (키를 주지 않으면 전부)
const fs=require('fs'),path=require('path'),{stripTypeScriptTypes}=require('module');
const root=path.resolve(__dirname,'..'),ref=path.join(root,'reference-sheets/zombie-originals'),src=path.join(root,'reference-sheets/legend-26-27/renderer/src');
const canvas=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
const modules=new Map();
function load(file){file=path.resolve(file);if(modules.has(file))return modules.get(file).exports;const module={exports:{}};modules.set(file,module);
 let source=fs.readFileSync(file,'utf8');if(file.endsWith('ModelPart.ts'))source=source.replace(/import \{ MaModel \} from "\.\/MaModel";/,'');
 let code=stripTypeScriptTypes(source,{mode:'transform'}),names=[];
 code=code.replace(/import \{([^}]+)\} from ["']([^"']+)["'];?/g,(_,n,p)=>`const {${n.replace(/ as /g,':')}}=require(${JSON.stringify(p)});`).replace(/import \* as (\w+) from ["']([^"']+)["'];?/g,(_,n,p)=>`const ${n}=require(${JSON.stringify(p)});`);
 code=code.replace(/export (class|function|const|let|var) (\w+)/g,(_,kind,n)=>{names.push(n);return kind+' '+n;});
 new Function('require','module','exports',code+'\n'+names.map(n=>`exports.${n}=${n};`).join('\n'))(p=>p==='#canvas'?{...canvas,createBitmap:async b=>canvas.loadImage(Buffer.from(await b.arrayBuffer()))}:load(path.resolve(path.dirname(file),p+'.ts')),module,module.exports);return module.exports;
}
const {AnimUnit}=load(path.join(src,'AnimUnit.ts')),{StrLineStream}=load(path.join(src,'StrLineStream.ts')),{ImgCut}=load(path.join(src,'ImgCut.ts')),{MaModel}=load(path.join(src,'MaModel.ts')),{MaAnim}=load(path.join(src,'MaAnim.ts')),{Canvas2DGraphics}=load(path.join(src,'canvas2d/Canvas2DGraphics.ts'));
const specs={zbore:428,zbrollow:527,zcamelle:310,zostrich:698,zdagshund:744,zthrillerz:469};
const only=process.argv.slice(2);
// 공격 모션이 사실상 7,980프레임짜리 '숨쉬기'로 이어지는 적은 실제로 움직이는 구간까지만 굽는다(ルーパールーパー: 공격 동작은 150프레임 안에 끝남).
const caps={looper:{attack:170}};
// 기본 도화지 1400x1100, 모델 원점(지면 기준점) (500,800). 공격 그림이 도화지 밖으로 나가는 적은 키운다(ファイナルギガグランド神さま).
const geom={finalgod:{w:2400,h:2000,ox:1000,oy:1300}};
// 게임이 자기 그림자를 그리므로 원작 그림자(이름에 影/かげ가 있는 납작한 조각, 또는 그 이름의 부품이 쓰는 납작한 조각)는 시트에서 지워 굽는다.
async function withoutShadows(buf,data,name){
 const im=await canvas.loadImage(buf),cv=canvas.createCanvas(im.width,im.height),cx=cv.getContext('2d');cx.drawImage(im,0,0);
 const lines=data[0].split('\n'),cuts=lines.slice(4,4+Number(lines[3])).map(l=>{const q=l.split(',');return {x:+q[0],y:+q[1],w:+q[2],h:+q[3],name:q.slice(4).join(',')}});
 const ml=data[1].split('\n'),parts=ml.slice(3,3+Number(ml[2])).map(l=>l.split(','));
 const flat=c=>c&&c.w>0&&c.h<=Math.max(8,c.w/4),ids=new Set();
 cuts.forEach((c,i)=>{if(/影|かげ/.test(c.name)&&flat(c))ids.add(i)});
 parts.forEach(q=>{if(/影|かげ/.test(q[13]||'')&&flat(cuts[+q[2]]))ids.add(+q[2])});
 for(const i of ids){const c=cuts[i];cx.clearRect(c.x,c.y,c.w,c.h)}
 console.log(name,'그림자 조각',[...ids].map(i=>i+':'+cuts[i].w+'x'+cuts[i].h).join(' ')||'없음');
 return cv.toBuffer('image/png');
}
// 원작의 빛 효과(glow 1 = 가산 합성)는 투명 배경에 그리면 검은 부분이 반투명 회색 상자로 남는다. 일반 부품과 빛 부품을 따로 그린 뒤,
// 빛은 검은 바탕 위의 밝기를 투명도로 바꿔 얹는다(검정 = 투명, 밝을수록 불투명). 빛 부품이 없는 프레임은 한 번만 그린다.
function glowAware(g,c,G,unit){
 let pass='normal',sawGlow=false;const sc=g.setComposite.bind(g);
 g.setComposite=(mode,opa,glow)=>{sc(mode,opa,glow);const add=g.ctx.globalCompositeOperation==='lighter';if(add&&pass==='normal')sawGlow=true;if(add?pass==='normal':pass==='glow')g.ctx.globalAlpha=0};
 const ctx=g.ctx,draw=(frame,black)=>{g.drawBG=black?()=>{ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle='#000';ctx.fillRect(0,0,G.w,G.h);ctx.restore()}:()=>g.clearWindow();unit.drawFrame(frame)};
 return frame=>{pass='normal';sawGlow=false;draw(frame,false);if(!sawGlow)return false;
  const a=new Uint8ClampedArray(ctx.getImageData(0,0,G.w,G.h).data);pass='glow';draw(frame,true);const b=new Uint8ClampedArray(ctx.getImageData(0,0,G.w,G.h).data);// getImageData의 data가 캔버스 메모리를 그대로 가리킬 수 있어 복사해 둔다

    for(let i=0;i<a.length;i+=4){const m=Math.max(b[i],b[i+1],b[i+2]);if(!m)continue;const aa=a[i+3]/255,al=Math.min(1,aa+m/255);// 가산 합성: 몸통 위에서는 색이 더해지고, 투명한 곳에서는 밝기가 투명도가 된다
   for(let k=0;k<3;k++)a[i+k]=Math.min(255,Math.round((a[i+k]*aa+b[i+k])/al));a[i+3]=Math.round(al*255)}
  const O=ctx.createImageData(G.w,G.h);O.data.set(a);ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.clearRect(0,0,G.w,G.h);ctx.putImageData(O,0,0);ctx.restore();return true};
}
(async()=>{for(const [name,id] of Object.entries(specs)){if(only.length&&!only.includes(name))continue;
 const data=JSON.parse(fs.readFileSync(path.join(ref,'raw',id+'-a'),'utf8')),G=geom[name]||{w:1400,h:1100,ox:500,oy:800},c=canvas.createCanvas(G.w,G.h),g=new Canvas2DGraphics(c),img=await g.buildImg(new Blob([await withoutShadows(fs.readFileSync(path.join(ref,'raw',id+'-c.png')),data,name)]));
 // Native canvas does not mirror negative destination dimensions; apply an explicit transform.
 const drawImage=g.drawImage.bind(g);g.drawImage=(img,x,y,w,h)=>{if(w>=0&&h>=0)return drawImage(img,x,y,w,h);g.ctx.save();g.ctx.translate(x,y);g.ctx.scale(w<0?-1:1,h<0?-1:1);drawImage(img,0,0,Math.abs(w),Math.abs(h));g.ctx.restore();};
 g.translate(G.ox,G.oy);g.scale(.5,.5);
 const unit=new AnimUnit(g,ImgCut.load(new StrLineStream(data[0])),img,MaModel.load(new StrLineStream(data[1])),data.slice(2).map(s=>MaAnim.load(new StrLineStream(s)))),drawFrame=glowAware(g,c,G,unit);let glowFrames=0;
 const dir=path.join(ref,'frames',name);fs.mkdirSync(dir,{recursive:true});const modes={};
 for(const [label,mode] of [['walk',0],['attack',2],['hurt',3]]){unit.switchMode(mode);modes[label]=[];const len=label==='hurt'?1:Math.min(unit.length(),caps[name]?.[label]??1e9);for(let frame=0;frame<len;frame+=2){if(drawFrame(frame))glowFrames++;const file=label+'-'+String(frame).padStart(3,'0')+'.png';fs.writeFileSync(path.join(dir,file),c.toBuffer('image/png'));modes[label].push(file);}}
 fs.writeFileSync(path.join(dir,'modes.json'),JSON.stringify({...modes,origin:[G.ox,G.oy]}));console.log(name,'빛 효과 프레임',glowFrames,Object.fromEntries(Object.entries(modes).map(([k,v])=>[k,v.length])));
}})().catch(e=>{console.error(e);process.exitCode=1});
