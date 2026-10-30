"""Pack original enemy rigs; preserve their model origin and ground anchor."""
from pathlib import Path
from PIL import Image, ImageDraw
import json
ROOT=Path(__file__).resolve().parents[1]
REF=ROOT/'reference-sheets/legend-41-49'
names=['croakley','bigdream','angelbutta','hackey','mechabun']
metadata={};preview=Image.new('RGB',(1250,360),'#d4e3eb');draw=ImageDraw.Draw(preview)
for i,name in enumerate(names):
    folder=REF/'frames'/name;modes=json.loads((folder/'modes.json').read_text())
    sheet=Image.new('RGBA',(4096,4096));x=y=rowh=0
    meta={'sheet':f'assets/anim_{name}.webp?v=1','scale':.833,'left':21,'groundAnchor':True,'walkStep':2/30,'attackStep':2}
    for mode,files in modes.items():
        rects=[]
        for file in files:
            im=Image.open(folder/file).convert('RGBA');b=im.getbbox()
            assert b and b[0]>0 and b[1]>0 and b[2]<im.width and b[3]<im.height,(name,file,b)
            crop=im.crop(b)
            if x+crop.width+2>4096:x=0;y+=rowh+2;rowh=0
            assert y+crop.height<4096
            sheet.paste(crop,(x,y));rects.append([x,y,crop.width,crop.height,500-b[0],800-b[3]])
            x+=crop.width+2;rowh=max(rowh,crop.height)
        meta[mode]=rects
    sheet.crop((0,0,4096,y+rowh)).save(ROOT/f'assets/anim_{name}.webp',lossless=True,method=6)
    metadata[name]=meta
    first=Image.open(folder/modes['walk'][0]);tile=first.crop(first.getbbox());tile.thumbnail((230,295))
    preview.paste(tile,(i*250+(250-tile.width)//2,310-tile.height),tile);draw.text((i*250+15,330),name,fill='black')
(REF/'atlas.json').write_text(json.dumps(metadata),encoding='utf-8')
out=ROOT/'work/legend-41-49';out.mkdir(parents=True,exist_ok=True);preview.save(out/'enemies.png')
print('Packed',len(metadata),'original enemy atlases')
