from pathlib import Path
from PIL import Image,ImageDraw
import json
ROOT=Path(__file__).resolve().parents[1]
REF=ROOT/'reference-sheets/cannon-effects'
names=['basic','slow','thunder','holy','breaker','breakerExtra']
metadata={};preview=Image.new('RGB',(1200,500),'#25334b');draw=ImageDraw.Draw(preview)
for i,name in enumerate(names):
    folder=REF/'frames'/name;spec=json.loads((folder/'modes.json').read_text());ox,oy=spec['origin']
    sheet=Image.new('RGBA',(4096,8192));x=y=rh=0;frames=[];best=None;area=0
    for file in spec['frames']:
        im=Image.open(folder/file).convert('RGBA');box=im.getbbox()
        if not box:frames.append([0,0,1,1,0,0]);continue
        assert box[0]>0 and box[1]>0 and box[2]<im.width and box[3]<im.height,(name,file,box)
        crop=im.crop(box)
        if x+crop.width+2>4096:x=0;y+=rh+2;rh=0
        assert y+crop.height<8192
        sheet.paste(crop,(x,y));frames.append([x,y,crop.width,crop.height,box[0]-ox,oy-box[3]])
        if crop.width*crop.height>area:best=crop.copy();area=crop.width*crop.height
        x+=crop.width+2;rh=max(rh,crop.height)
    sheet=sheet.crop((0,0,4096,y+rh));bbox=sheet.getbbox();sheet=sheet.crop((0,0,bbox[2],sheet.height))
    out=ROOT/'assets/cannon-effects';out.mkdir(parents=True,exist_ok=True);sheet.save(out/(name+'.webp'),quality=92,method=4)
    metadata[name]={'sheet':'assets/cannon-effects/'+name+'.webp?v=1','size':list(sheet.size),'frames':frames,'fps':30,'scale':.45}
    best.thumbnail((180,380));preview.paste(best,(i*200+(200-best.width)//2,440-best.height),best);draw.text((i*200+10,460),name,fill='white')
    print(name,len(frames),sheet.size)
(ROOT/'cannon-effect-atlases.js').write_text('const CANNON_EFFECT_ATLASES='+json.dumps(metadata,separators=(',',':'))+';\n',encoding='utf-8')
(REF/'atlas.json').write_text(json.dumps(metadata),encoding='utf-8')
(ROOT/'work/cannon-loadout/fx-preview.png').parent.mkdir(parents=True,exist_ok=True)
preview.save(ROOT/'work/cannon-loadout/fx-preview.png')
