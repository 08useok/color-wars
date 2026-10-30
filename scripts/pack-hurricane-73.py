from pathlib import Path
from PIL import Image
import json
ROOT=Path(__file__).resolve().parents[1];folder=ROOT/'reference-sheets/hurricane-73/frames/hurricanecyclone'
modes=json.loads((folder/'modes.json').read_text());modes['walk']=modes['walk'][::2]
sheet=Image.new('RGBA',(4096,8192));x=y=rowh=0
meta={'sheet':'assets/anim_hurricanecyclone.webp?v=1','scale':.68,'left':21,'groundAnchor':True,'walkStep':16/30,'attackStep':2,'continuousAttack':True}
for mode,files in modes.items():
 rects=[]
 for file in files:
  im=Image.open(folder/file).convert('RGBA');b=im.getbbox();assert b and b[0]>0 and b[1]>0 and b[2]<im.width and b[3]<im.height,(file,b)
  crop=im.crop(b)
  if x+crop.width+2>4096:x=0;y+=rowh+2;rowh=0
  assert y+crop.height<8192
  sheet.paste(crop,(x,y));rects.append([x,y,crop.width,crop.height,500-b[0],800-b[3]])
  x+=crop.width+2;rowh=max(rowh,crop.height)
 meta[mode]=rects
sheet.crop((0,0,4096,y+rowh)).save(ROOT/'assets/anim_hurricanecyclone.webp',lossless=True,method=6)
(ROOT/'hurricane-73-atlas.js').write_text('const HURRICANE_73_ATLAS='+json.dumps(meta,separators=(',',':'))+';\n',encoding='utf-8')
print('Hurricane atlas',[(k,len(meta[k])) for k in modes])
