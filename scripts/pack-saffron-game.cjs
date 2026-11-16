// Assemble the approved cutout rig for legacy thumbnails; battle uses the live rig.
const fs=require('fs'),path=require('path'),vm=require('vm');
const {createCanvas,loadImage}=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas'));
const root=path.resolve(__dirname,'..'),dir=path.join(root,'assets/saffron-parts'),meta=JSON.parse(fs.readFileSync(path.join(dir,'parts.json'))),context={};
vm.runInNewContext(fs.readFileSync(path.join(dir,'saffron-rig.js'),'utf8'),context);
(async()=>{const images={};for(const [form,parts]of Object.entries(meta.forms))for(const [name,p]of Object.entries(parts))images[form+':'+name]=await loadImage(path.join(dir,p.file));
const rig=new context.SaffronRig(images,meta),atlases={};for(const form of [1,2]){const c=createCanvas(600,420),ctx=c.getContext('2d');rig.draw(ctx,{form,mode:'idle',time:0});fs.writeFileSync(path.join(dir,`saffron_${form}.png`),c.toBuffer('image/png'));
const d=ctx.getImageData(0,0,600,420).data;let x0=600,y0=420,x1=0,y1=0;for(let y=0;y<420;y++)for(let x=0;x<600;x++)if(d[(y*600+x)*4+3]>5){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}
const p=createCanvas(256,256),pc=p.getContext('2d'),w=x1-x0+1,h=y1-y0+1,k=236/Math.max(w,h);pc.drawImage(c,x0,y0,w,h,(256-w*k)/2,(256-h*k)/2,w*k,h*k);fs.writeFileSync(path.join(dir,`saffron_${form}-profile.webp`),p.toBuffer('image/webp'));
const frame=[x0,y0,w,h];atlases['saffron_'+form]={sheet:`assets/saffron-parts/saffron_${form}.png?v=1`,sheetSize:[600,420],scale:.38,left:-93+x0*.38,lift:365-y1-1,walk:[frame],idle:[frame],attack:[frame],hurt:[frame],walkStep:1/30};}
fs.writeFileSync(path.join(dir,'game-atlas.js'),'const SAFFRON_GAME_ATLASES='+JSON.stringify(atlases)+';\n');console.log('Saffron fallback poses and cropped profiles packed');})().catch(e=>{console.error(e);process.exitCode=1;});
