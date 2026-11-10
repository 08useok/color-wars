// 8.0 신규 적 13종: 원작 부품 데이터(raw/<모션번호>-a, -c.png)를 battlecatsinfo/battlecats-animation-typescript(MIT)로 재생해 프레임을 reference-sheets/cannon-effects/frames/<키>/ 에 저장한다. 이어서 pack-80-enemies.py 가 시트로 묶는다.
//   node scripts/bake-80-enemies.cjs [키 ...]   (키를 주지 않으면 전부)
const fs=require('fs'),path=require('path'),{stripTypeScriptTypes}=require('module');
const root=path.resolve(__dirname,'..'),ref=path.join(root,'reference-sheets/cannon-effects'),src=path.join(root,'reference-sheets/legend-26-27/renderer/src');
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

const specs={basic:[0,0],slow:[1,1],thunder:[3,0],holy:[5,0],breaker:[6,0],breakerExtra:[6,2]};
(async()=>{for(const [name,[type,mode]]of Object.entries(specs)){
 const stem='nyankoCastle_001_'+String(type).padStart(2,'0'),m=String(mode).padStart(2,'0'),read=s=>fs.readFileSync(path.join(ref,'raw',stem+'_'+s),'utf8');
 const data=[read('00.imgcut'),read(m+'.mamodel'),read(m+'.maanim')],G=name==='slow'?{w:4200,h:1400,ox:3300,oy:1000}:{w:1800,h:1400,ox:900,oy:1000},c=canvas.createCanvas(G.w,G.h),g=new Canvas2DGraphics(c),img=await g.buildImg(new Blob([fs.readFileSync(path.join(ref,'raw',stem+'_00.png'))]));
 const drawImage=g.drawImage.bind(g);g.drawImage=(im,x,y,w,h)=>{if(w>=0&&h>=0)return drawImage(im,x,y,w,h);g.ctx.save();g.ctx.translate(x,y);g.ctx.scale(w<0?-1:1,h<0?-1:1);drawImage(im,0,0,Math.abs(w),Math.abs(h));g.ctx.restore();};
 g.translate(G.ox,G.oy);g.scale(.5,.5);const unit=new AnimUnit(g,ImgCut.load(new StrLineStream(data[0])),img,MaModel.load(new StrLineStream(data[1])),[MaAnim.load(new StrLineStream(data[2]))]),draw=glowAware(g,c,G,unit);
 unit.switchMode(0);const dir=path.join(ref,'frames',name);fs.mkdirSync(dir,{recursive:true});const frames=[];for(let i=0;i<Math.min(unit.length(),240);i++){draw(i);const file=String(i).padStart(3,'0')+'.png';fs.writeFileSync(path.join(dir,file),c.toBuffer('image/png'));frames.push(file);}fs.writeFileSync(path.join(dir,'modes.json'),JSON.stringify({frames,origin:[G.ox,G.oy]}));console.log(name,frames.length);
}})().catch(e=>{console.error(e);process.exitCode=1;});
