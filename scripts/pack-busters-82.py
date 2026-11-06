import base64
import io
import json
import re
import subprocess
from pathlib import Path

from PIL import Image

OUT = Path('assets/busters-81-motion')
OUT.mkdir(exist_ok=True)
W, H = 320, 192
POSES = json.loads(subprocess.check_output(['node', 'scripts/render-busters-82-poses.cjs']))


def composite(images, calls, mode):
    result = Image.new('RGBA', (W, H))
    for index, (a, b, c, d, x, y), opacity, rect in calls:
        sx, sy, sw, sh, dx, dy, dw, dh = rect
        part = images[index].crop((round(sx), round(sy), round(sx+sw), round(sy+sh)))
        x += a*dx+c*dy
        y += b*dx+d*dy
        if mode == 'hurt':
            # The game applies the actual displacement and bounce.
            x -= 64*4/20
            y += 26*0.8660254038
        x = x*.6 - 56
        y = y*.6 + 3
        a, b = a*dw/part.width*.6, b*dw/part.width*.6
        c, d = c*dh/part.height*.6, d*dh/part.height*.6
        det = a*d-b*c
        layer = part.transform((W,H), Image.Transform.AFFINE,
            (d/det, -c/det, (c*y-d*x)/det, -b/det, a/det, (b*x-a*y)/det),
            Image.Resampling.BICUBIC)
        if opacity != 1:
            layer.putalpha(layer.getchannel('A').point(lambda v: round(v*opacity)))
        result.alpha_composite(layer)
    return result


def placed(image, anchor=160):
    image = image.crop(image.getbbox())
    image.thumbnail((168, 114), Image.Resampling.LANCZOS)
    frame = Image.new('RGBA',(W,H))
    frame.alpha_composite(image,(anchor-image.width//2,H-image.height))
    return frame


def first_form(id, windup, duration):
    folder = Path('work') / (id+'-concepts')
    master = Image.open(folder / ('forms.png' if id=='apricot' else 'marigold-1.png')).convert('RGBA')
    if id == 'apricot':
        master = master.crop((0,0,master.width//2,master.height))
    sheet = Image.open(folder/'form1-motion.png').convert('RGBA')
    frames = []
    for i in range(10):
        row, col = divmod(i,5)
        box = (round(col*sheet.width/5),row*sheet.height//2,round((col+1)*sheet.width/5),(row+1)*sheet.height//2)
        frames.append(placed(sheet.crop(box)))
    return {'idle':[placed(master)],'walk':frames[:6],
            'attack':[frames[6] if i<windup else frames[7] if i<windup+4 else frames[8] for i in range(duration)],
            'hurt':frames[9:]}


def save(id, form, motions):
    name = f'{id}_{form}'
    count = sum(map(len,motions.values()))
    atlas = Image.new('RGBA',(W*8,H*((count+7)//8)))
    meta = dict(sheet=f'assets/busters-81-motion/{name}.webp?v=1',scale=.68,left=22,
                flip=False,groundAnchor=True,bodyWidth=82,walkStep=(.1 if form==1 else 1/30),
                idleStep=1/30,attackStep=1,continuousAttack=True)
    idx = 0
    for mode, frames in motions.items():
        meta[mode] = []
        for frame in frames:
            x,y=idx%8*W,idx//8*H
            atlas.paste(frame,(x,y))
            meta[mode].append([x,y,W,H,160 if form==1 else 142,0])
            idx+=1
    atlas.save(OUT/f'{name}.webp',lossless=True)
    profile=motions['idle'][0]
    profile=profile.crop(profile.getbbox())
    profile.thumbnail((192,192),Image.Resampling.LANCZOS)
    portrait=Image.new('RGBA',(208,208))
    portrait.alpha_composite(profile,((208-profile.width)//2,200-profile.height))
    portrait.save(OUT/f'{name}-profile.webp',lossless=True)
    return meta


atlases={}
for id, windup, duration in [('apricot',9,24),('marigold',15,36)]:
    atlases[id+'_1']=save(id,1,first_form(id,windup,duration))
    html=(Path('work')/(id+'-concepts')/'parts-preview.html').read_text(encoding='utf-8-sig')
    images=[Image.open(io.BytesIO(base64.b64decode(s))).convert('RGBA')
            for s in re.findall(r'data:image/png;base64,([A-Za-z0-9+/=]+)',html)]
    motions={mode:[composite(images,calls,mode) for calls in frames]
             for mode,frames in POSES[id].items()}
    atlases[id+'_2']=save(id,2,motions)
(OUT/'motion-atlases.js').write_text('const BUSTERS_81_MOTION_ATLASES='+json.dumps(atlases,separators=(',',':'))+';\n',encoding='utf-8')
