"""Pack generated 4x6 pose sheets; only trim/resize assets, never repaint character art."""
from pathlib import Path
import json, statistics, hashlib
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'reference-sheets/subspecies-motion'
OUT=ROOT/'assets/subspecies-motion'
PREVIEW=ROOT/'work/subspecies-motion'
for folder in [SRC,OUT,PREVIEW]:folder.mkdir(parents=True,exist_ok=True)
IDS=['herbmint','kendonavy','alchemypurple','rhythmpink']
NAMES=['허브 민트 ♂','검도 네이비 ♀','연금 퍼플 ♂','리듬 핑크 ♂']

def split_at_gutter(hist,n):
    bounds=[0];total=len(hist)
    for i in range(1,n):
        expected=total*i/n;radius=total/n*.24
        lo=max(bounds[-1]+2,round(expected-radius));hi=round(expected+radius)
        sample=hist[lo:hi];floor=float(sample.min())
        # A wide near-empty gutter wins over an isolated zero inside an outline.
        good=np.flatnonzero(sample<=floor+1)+lo
        runs=[];start=prev=int(good[0])
        for x in good[1:]:
            if x>prev+1:runs.append((start,prev));start=int(x)
            prev=int(x)
        runs.append((start,prev))
        start,end=max(runs,key=lambda q:(q[1]-q[0])-abs((q[0]+q[1])/2-expected)*.1)
        cut=round((start+end)/2);assert hist[cut]<=3,('no transparent gutter',i,int(hist[cut]));bounds.append(cut)
    return bounds+[total]

def head_info(cell,t):
    a=np.array(cell);r,g,b,alpha=[a[:,:,i].astype(float) for i in range(4)]
    if t=='herbmint':mask=(g>r*1.12)&(b>r*1.08)&(g>130)&(b>110)
    elif t=='kendonavy':mask=(b>r*1.5)&(b>g*1.35)&(b>100)
    elif t=='alchemypurple':mask=(r>g*1.4)&(b>g*1.7)&(r>100)&(b>120)
    else:mask=(r>g*1.35)&(r>b*1.08)&(r>170)&(b>100)
    mask&=alpha>160
    counts=mask.sum(axis=1);ys=np.flatnonzero(counts>max(5,counts.max()*.38))
    assert len(ys)>15,(t,'head not found')
    # The head occupies the widest colored band; exclude tiny feet and hand outliers.
    peak=int(np.argmax(counts));lo=peak;hi=peak
    while lo>0 and counts[lo-1]>counts.max()*.58:lo-=1
    while hi+1<len(counts) and counts[hi+1]>counts.max()*.58:hi+=1
    y,x=np.where(mask[lo:hi+1]);assert len(x)>80
    return float(np.median(x)),hi-lo+1

def column_seam(alpha,index,n=4):
    """Follow a transparent gutter around wide weapons instead of cutting them on a straight grid."""
    h,w=alpha.shape;center=w*index/n;radius=w/n*.32
    lo=round(center-radius);hi=round(center+radius);xs=np.arange(lo,hi)
    a=alpha[:,lo:hi].astype(float)
    cost=(a>96)*100000+(a/255)**2*30+abs(xs-center)*.003
    prev=cost[0].copy();links=np.zeros(cost.shape,np.int16)
    for y in range(1,h):
        possibilities=np.stack([np.pad(prev[max(0,-d):len(xs)-max(0,d)],(max(0,d),max(0,-d)),constant_values=1e12) for d in [-2,-1,0,1,2]])
        choice=possibilities.argmin(axis=0);links[y]=choice-2
        prev=cost[y]+possibilities[choice,np.arange(len(xs))]
    x=int(prev.argmin());path=np.empty(h,np.int32)
    for y in range(h-1,-1,-1):path[y]=x+lo;x-=int(links[y,x])
    crossings=int((alpha[np.arange(h),path]>96).sum())
    assert crossings<=2,('poses touch',index,crossings)
    return path,crossings

atlases={};audit={};preview_frames={}
for t in IDS:
    source=SRC/(t+'-source.png');im=Image.open(source).convert('RGBA');a=np.array(im)[:,:,3]
    assert a.min()==0 and a.max()>200,(t,'alpha missing')
    rows=[np.zeros(im.width,dtype=int)]+[column_seam(a.T,r,6)[0] for r in range(1,6)]+[np.full(im.width,im.height,dtype=int)]
    cells=[];details=[]
    for row in range(6):
        top,bottom=rows[row],rows[row+1];y0=int(top.min());y1=int(bottom.max())
        row_pixels=np.array(im.crop((0,y0,im.width,y1)));yy=np.arange(y0,y1)[:,None]
        row_pixels[(yy<top[None,:])|(yy>=bottom[None,:])]=0
        band=row_pixels[:,:,3];height,width=band.shape
        seams=[np.zeros(height,dtype=int)]+[column_seam(band,c)[0] for c in range(1,4)]+[np.full(height,width,dtype=int)]
        for col in range(4):
            left,right=seams[col],seams[col+1];x0=int(left.min());x1=int(right.max())
            region=row_pixels[:,x0:x1].copy()
            xx=np.arange(x0,x1)[None,:];region[(xx<left[:,None])|(xx>=right[:,None])]=0
            source_cell=Image.fromarray(region)
            # A one-pixel empty gutter may be the final cut column, so add safe transparent trim padding.
            cell=Image.new('RGBA',(source_cell.width+4,source_cell.height+4));cell.alpha_composite(source_cell,(2,2));alpha=np.array(cell)[:,:,3]
            box=Image.fromarray((alpha>32).astype('uint8')*255).getbbox();assert box,(t,row,col)
            solid=Image.fromarray((alpha>128).astype('uint8')*255).getbbox()
            # Genuine clipping is rejected; faint outer antialiasing can meet a transparent cut.
            assert solid[0]>0 and solid[1]>0 and solid[2]<cell.width and solid[3]<cell.height,(t,row,col,'clipped')
            anchor,hh=head_info(cell,t);cells.append((cell,box,anchor,hh));details.append({'row':row,'col':col,'cell':[x0,y0,x1,y1],'opaqueBox':solid})
    for form in [1,2]:
        group=cells[(form-1)*12:form*12]
        factor=min(122/statistics.median(x[3] for x in group[:4]),260/statistics.median(x[1][3]-x[1][1] for x in group[:4]),330/max(x[1][3]-x[1][1] for x in group))
        sheet=Image.new('RGBA',(2048,1536));metadata=[];x=y=rh=0;aligned=[];hashes=[]
        for k,(cell,box,anchor,hh) in enumerate(group):
            crop=cell.crop(box);crop=crop.resize((max(1,round(crop.width*factor)),max(1,round(crop.height*factor))),Image.Resampling.LANCZOS)
            # Alpha composite prevents undefined RGB under transparent PNG pixels from leaking into outlines.
            frame=Image.new('RGBA',(768,360));ax=round((anchor-box[0])*factor);left=384-ax;bottom=336
            assert left>=0 and left+crop.width<=768 and crop.height<=334,(t,form,k,'oversize',factor,crop.size,hh)
            frame.alpha_composite(crop,(left,bottom-crop.height));aligned.append(frame)
            box2=frame.getbbox();trim=frame.crop(box2);w,h=trim.size
            if x+w>2048:x=0;y+=rh+4;rh=0
            assert y+h<1536,(t,form,'atlas overflow')
            sheet.alpha_composite(trim,(x,y));metadata.append([x,y,w,h,384-box2[0],336-box2[3]]);x+=w+4;rh=max(rh,h)
            hashes.append(hashlib.sha256(trim.tobytes()).hexdigest())
        assert len(set(hashes[:4]))==4 and len(set(hashes[4:10]))>=5,(t,form,'duplicated motions')
        key=t+'_'+str(form);sheet.crop((0,0,2048,y+rh)).save(OUT/(key+'.webp'),lossless=True,method=6)
        portrait=Image.new('RGBA',(256,256));p=aligned[0].crop(aligned[0].getbbox());p.thumbnail((236,236));portrait.alpha_composite(p,((256-p.width)//2,(256-p.height)//2));portrait.save(OUT/(key+'-profile.webp'),lossless=True,method=6)
        # The existing engine uses the first hurt drawing; the second is retained as a recovery pose.
        atlases[key]={'sheet':'assets/subspecies-motion/'+key+'.webp?v=1','scale':.5,'left':21,'flip':False,'groundAnchor':True,'bodyWidth':64,'walkStep':.12,'strike':2,'continuousAttack':True,'walk':metadata[:4],'attack':metadata[4:10],'hurt':metadata[10:11],'hurtRecovery':metadata[11]}
        preview_frames[key]=aligned;audit[key]={'source':str(source.relative_to(ROOT)),'sourceSize':im.size,'uniformScale':factor,'headTargetBand':122,'uniqueFrames':len(set(hashes)),'cellInfo':details[(form-1)*12:form*12]}
        print(key,'PASS: 4 walk, 6 attack, hurt + recovery',flush=True)
    for i,cell in enumerate(cells):
        (SRC/t).mkdir(exist_ok=True);cell[0].save(SRC/t/(f'{i:02}.png'))
(SRC/'atlas.json').write_text(json.dumps(atlases,ensure_ascii=False,indent=2),encoding='utf-8')
(PREVIEW/'packing-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'subspecies-motion-atlases.js').write_text('// Generated by scripts/pack-subspecies-motion.py; approved raster character designs.\nconst SUBSPECIES_MOTION_ATLASES='+json.dumps(atlases,separators=(',',':'))+';\n',encoding='utf-8')
font=ImageFont.truetype('C:/Windows/Fonts/malgun.ttf',18)
for form in [1,2]:
    sequence=list(range(4))*2+list(range(4,10))+[10,11,0]
    frames=[]
    for idx in sequence:
        canvas=Image.new('RGB',(1120,310),(229,235,242));draw=ImageDraw.Draw(canvas)
        for j,t in enumerate(IDS):
            f=preview_frames[t+'_'+str(form)][idx];crop=f.crop((170,36,598,346));crop.thumbnail((280,270));canvas.paste(crop,(j*280,4),crop)
            draw.text((j*280+16,280),NAMES[j]+' '+str(form)+'진',fill=(24,32,48),font=font)
        frames.append(canvas)
    frames[0].save(PREVIEW/(f'forms-{form}-preview.gif'),save_all=True,append_images=frames[1:],duration=120,loop=0)
    frames[0].save(PREVIEW/(f'forms-{form}-preview.png'))
