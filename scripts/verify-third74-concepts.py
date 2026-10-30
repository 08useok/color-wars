from pathlib import Path
from PIL import Image, ImageDraw
import json
root=Path(__file__).resolve().parents[1]
ids=['lilac_3','babypink_3','magenta_3']
out=root/'work/third-form-74-concepts'
canvas=Image.new('RGB',(1200,460),'#dce4ed')
results={}
for i,key in enumerate(ids):
    p=root/'assets/third-form-74-concepts'/f'{key}.png'
    im=Image.open(p).convert('RGBA')
    a=im.getchannel('A')
    assert a.getextrema()[0]==0 and a.getextrema()[1]>=240,(key,'alpha')
    assert all(a.getpixel(pt)==0 for pt in [(0,0),(im.width-1,0),(0,im.height-1),(im.width-1,im.height-1)])
    results[key]={'size':list(im.size),'alpha':list(a.getextrema()),'bytes':p.stat().st_size}
    im.thumbnail((390,420))
    canvas.paste(im,(i*400+(400-im.width)//2,0),im)
    ImageDraw.Draw(canvas).text((i*400+20,435),key,fill='black')
canvas.save(out/'overview.png')
(out/'validation.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
print('PASS: 3 PNG assets, transparent alpha and clear corners')
