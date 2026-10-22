from pathlib import Path
from PIL import Image,ImageDraw
import json
ROOT=Path(__file__).resolve().parents[1]
REF=ROOT/'reference-sheets/zombie-completion'
names=['cadaverbear','zuche','lilzyclone','zapy']
metadata={};preview=Image.new('RGB',(960,560),'#cfe4e8');draw=ImageDraw.Draw(preview)
for i,name in enumerate(names):
    folder=REF/'frames'/name;modes=json.loads((folder/'modes.json').read_text());atlas=Image.new('RGBA',(4096,4096));x=y=rowh=0;meta={'sheet':f'assets/anim_{name}.webp','scale':.833,'walkStep':2/30,'attackStep':2}
    first=Image.open(folder/modes['walk'][0]);ref=first.getbbox();meta['left']=round(21-(500-ref[0])*.833,3)
    for mode,files in modes.items():
        rects=[]
        for file in files:
            im=Image.open(folder/file).convert('RGBA');b=im.getbbox();assert b and b[0]>0 and b[1]>0 and b[2]<im.width and b[3]<im.height,(name,file,b)
            crop=im.crop(b)
            if x+crop.width+2>4096:x=0;y+=rowh+2;rowh=0
            assert y+crop.height<4096
            atlas.paste(crop,(x,y));rects.append([x,y,crop.width,crop.height,ref[0]-b[0],ref[3]-b[3]])
            x+=crop.width+2;rowh=max(rowh,crop.height)
        meta[mode]=rects
    atlas=atlas.crop((0,0,4096,y+rowh));atlas.save(ROOT/f'assets/anim_{name}.webp',lossless=True,method=6);metadata[name]=meta
    tile=first.crop(ref);tile.thumbnail((220,200));preview.paste(tile,(i%4*240+(240-tile.width)//2,i//4*280+240-tile.height),tile);draw.text((i%4*240+15,i//4*280+250),name,fill='black')
    print(name,len(meta['attack']),atlas.size)
(REF/'atlas.json').write_text(json.dumps(metadata),encoding='utf8');preview.save(REF/'preview.png')

(ROOT/'zombie-completion-atlases.js').write_text('const ZOMBIE_COMPLETION_ATLASES='+json.dumps(metadata,separators=(',',':'))+';\n',encoding='utf-8')
