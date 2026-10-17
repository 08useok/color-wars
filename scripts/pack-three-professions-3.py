"""Pack original generated poses using actual transparent gutters, not assumed grid cuts."""
from pathlib import Path
from collections import deque
import json, statistics
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'reference-sheets/three-professions-3'
OUT=ROOT/'work/three-new-forms'
IDS=['crystal','indigo','raspberry']

def components(alpha):
    mask=alpha>96;seen=np.zeros(mask.shape,bool);h,w=mask.shape;out=[]
    for y,x in zip(*np.where(mask)):
        if seen[y,x]:continue
        q=deque([(int(y),int(x))]);seen[y,x]=1;n=0;x0=x1=int(x);y0=y1=int(y)
        while q:
            yy,xx=q.popleft();n+=1;x0=min(x0,xx);x1=max(x1,xx);y0=min(y0,yy);y1=max(y1,yy)
            for ny,nx in [(yy-1,xx),(yy+1,xx),(yy,xx-1),(yy,xx+1)]:
                if 0<=ny<h and 0<=nx<w and mask[ny,nx] and not seen[ny,nx]:seen[ny,nx]=1;q.append((ny,nx))
        if n>400:out.append((n,(x0,y0,x1+1,y1+1)))
    out.sort(reverse=True)
    assert len(out)>=16 and out[15][0]>10000
    assert len(out)==16 or out[16][0]<out[15][0]*.3,'merged/extra bodies'
    return [b for n,b in out[:16]]

def gutter(hist,lo,hi):
    lo=int(lo);hi=int(hi);assert hi>lo,(lo,hi)
    good=np.flatnonzero(hist[lo:hi]==0)+lo;assert len(good),'no transparent separator'
    runs=[];start=prev=int(good[0])
    for k in good[1:]:
        if k>prev+1:runs.append((start,prev));start=int(k)
        prev=int(k)
    runs.append((start,prev));a,b=max(runs,key=lambda r:r[1]-r[0]);return (a+b)//2

atlases={};all_frames={};audit={}
for t in IDS:
    im=Image.open(SRC/(t+'-source.png')).convert('RGBA');arr=np.array(im);a=arr[:,:,3]
    bodies=sorted(components(a),key=lambda b:(b[1]+b[3])/2)
    rows=[sorted(bodies[i:i+4],key=lambda b:(b[0]+b[2])/2) for i in range(0,16,4)]
    ys=[0]+[gutter((a>32).sum(axis=1),max(b[3] for b in rows[r-1]),min(b[1] for b in rows[r])) for r in range(1,4)]+[im.height]
    scale=210/statistics.median(b[3]-b[1] for row in rows[:2] for b in row)
    frames=[];details=[]
    for r,row in enumerate(rows):
        band=a[ys[r]:ys[r+1]];xs=[0]+[gutter((band>32).sum(axis=0),row[c-1][2],row[c][0]) for c in range(1,4)]+[im.width]
        for c,b in enumerate(row):
            box=(xs[c],ys[r],xs[c+1],ys[r+1]);cell=im.crop(box);ca=np.array(cell)
            opaque=Image.fromarray((ca[:,:,3]>96).astype('uint8')*255).getbbox();assert opaque
            assert opaque[0]>0 and opaque[1]>0 and opaque[2]<cell.width and opaque[3]<cell.height,(t,r,c,'clipped opaque art')
            cropbox=Image.fromarray((ca[:,:,3]>32).astype('uint8')*255).getbbox()
            cropbox=(max(0,cropbox[0]-2),max(0,cropbox[1]-2),min(cell.width,cropbox[2]+2),min(cell.height,cropbox[3]+2))
            # Color median in the upper body locates the head independently of long props and projectiles.
            roi=arr[b[1]:b[1]+round((b[3]-b[1])*.62),b[0]:b[2]];rr,gg,bb,aa=[roi[:,:,i].astype(int) for i in range(4)]
            mask=(aa>128)&({'crystal':(gg>135)&(bb>145)&(rr<195),'indigo':(bb>140)&(rr>60)&(gg<rr*.82),'raspberry':(rr>170)&(gg<145)&(bb>35)&(bb<205)}[t])
            yy,xx=np.where(mask);assert len(xx)>200
            anchor_x=b[0]+float(np.median(xx))
            crop=cell.crop(cropbox);crop=crop.resize((round(crop.width*scale),round(crop.height*scale)),Image.Resampling.LANCZOS)
            px=480-round((anchor_x-box[0]-cropbox[0])*scale);py=336-crop.height
            assert px>0 and py>0 and px+crop.width<768 and py+crop.height<384
            frame=Image.new('RGBA',(768,384));frame.paste(crop,(px,py));frames.append(frame)
            details.append({'sourceBox':box,'bodyBox':b,'headAnchorX':anchor_x,'sourceOpaqueMargins':[opaque[0],opaque[1],cell.width-opaque[2],cell.height-opaque[3]]})
    packed=Image.new('RGBA',(2048,768));x=y=rh=0;metadata=[]
    frame_dir=OUT/'frames'/t;frame_dir.mkdir(parents=True,exist_ok=True)
    for i,frame in enumerate(frames):
        frame.save(frame_dir/f'{i:02}.png');box=frame.getbbox();crop=frame.crop(box);w,h=crop.size
        if x+w>2048:x=0;y+=rh+4;rh=0
        assert y+h<768
        packed.paste(crop,(x,y));metadata.append([x,y,w,h,480-box[0],336-box[3]]);x+=w+4;rh=max(rh,h)
    packed.crop((0,0,2048,y+rh)).save(ROOT/'assets'/f'{t}_3.webp',lossless=True,method=6)
    portrait=Image.new('RGBA',(256,256));p=frames[0].crop(frames[0].getbbox());p.thumbnail((226,226));portrait.paste(p,((256-p.width)//2,(256-p.height)//2));portrait.save(ROOT/'assets'/f'profile_{t}_3.webp',lossless=True,method=6)
    atlases[t]={'sheet':f'assets/{t}_3.webp?v=1','scale':.5,'left':21,'flip':False,'groundAnchor':True,'bodyWidth':64,'walkStep':.125,'strike':3,'continuousAttack':True,'walk':metadata[:8],'attack':metadata[8:15],'hurt':metadata[15:]}
    all_frames[t]=frames;audit[t]={'sourceSize':im.size,'uniformScale':scale,'frames':details}
    print(t,'PASS 16 poses; no opaque clipping; 8 walk / 7 attack / 1 hurt',flush=True)
(SRC/'atlas.json').write_text(json.dumps(atlases,ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'packing-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2),encoding='utf-8')
font=ImageFont.truetype('C:/Windows/Fonts/malgun.ttf',18);preview=[]
for i in range(16):
    canvas=Image.new('RGB',(960,300),(222,230,238));d=ImageDraw.Draw(canvas)
    for j,t in enumerate(IDS):
        f=all_frames[t][i].copy();f.thumbnail((576,288));canvas.paste(f,(j*320-200,0),f);d.text((j*320+12,277),t+' / '+('walk' if i<8 else 'attack' if i<15 else 'hurt'),font=font,fill=(20,30,40))
    preview.append(canvas)
preview[0].save(OUT/'preview.gif',save_all=True,append_images=preview[1:],duration=125,loop=0)
preview[0].save(OUT/'preview.png')
