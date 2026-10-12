from pathlib import Path
from PIL import Image,ImageDraw
import json,io,zipfile,numpy as np
root=Path('.');out=root/'work/colors-motion-audit';out.mkdir(parents=True,exist_ok=True)
allart={}
for f in ['colors-motion-atlases.js','new-colors-motion-atlases.js']:
 s=Path(f).read_text(encoding='utf8');allart.update(json.loads(s[s.index('=')+1:s.index(';')]))
names=[n for n in allart if n!='amber'];count=0;results=[]
for n in names:
 file=n if n!='royalblue' else 'royal_blue'
 p=root/f'colors-{file}-motion-final.zip'
 # Recovered archive has the same CRC-checked original frame bytes.
 if n=='banana':p=root/'work/colors-motion/banana-recovered.zip'
 if n in ['lime','acid']:p=root/f'work/new-colors-motion/{n}-recovered.zip'
 with zipfile.ZipFile(p) as z:
  for form in (1,2):
   a=allart[n] if form==1 else allart[n]['evolved'];sheet=Image.open(a['sheet']).convert('RGBA')
   assert a['scale']==.5 and a['groundAnchor']
   for state in ['walk','attack']:
    for i,f in enumerate(a[state]):
     source=Image.open(io.BytesIO(z.read(f'colors-motion/frames/{file}_{form}_{state}/{i:03}.png'))).convert('RGBA');box=source.getbbox();x,y,w,h,ox,oy=f
     assert (ox,oy)==(480-box[0],336-box[3]),(n,form,state,i,'pivot')
     src=np.array(source.crop(box));dst=np.array(sheet.crop((x,y,x+w,y+h)));assert np.array_equal(src[:,:,3],dst[:,:,3]) and np.array_equal(src[src[:,:,3]>0],dst[src[:,:,3]>0]),(n,form,state,i,'visible pixels')
     count+=1
   results.append({'type':n,'form':form,'scale':a['scale'],'frames':len(a['walk'])+len(a['attack'])})
for page in range(2):
 canvas=Image.new('RGB',(1000,7*155),'#d8e8f3');d=ImageDraw.Draw(canvas)
 for row,n in enumerate(names[page*7:(page+1)*7]):
  d.text((5,row*155+5),n,fill='#172438')
  for col,(form,state,idx) in enumerate([(1,'walk',0),(1,'attack',17),(2,'walk',0),(2,'attack',17)]):
   a=allart[n] if form==1 else allart[n]['evolved'];x,y,w,h,ox,oy=a[state][idx];im=Image.open(a['sheet']).crop((x,y,x+w,y+h));im=im.resize((round(w*.5),round(h*.5)),Image.Resampling.LANCZOS)
   pivotx=100+col*235;ground=row*155+140;d.line((col*235+60,ground,col*235+235,ground),fill='#81969d');canvas.paste(im,(round(pivotx-ox*.5),round(ground-(oy+h)*.5)),im);d.text((col*235+80,row*155+10),f'{form} {state}',fill='#172438')
 canvas.save(out/f'contact-{page}.png')
(out/'pixels-and-pivots.json').write_text(json.dumps({'checkedFrames':count,'forms':results},indent=2),encoding='utf8')
print('PASS:',count,'frames retain exact source pixels and foot pivots; 28 forms share .5 scale')
