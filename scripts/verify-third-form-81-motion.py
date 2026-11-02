from pathlib import Path
from PIL import Image,ImageDraw
import json,hashlib
root=Path(__file__).resolve().parents[1];out=root/'assets/third-form-81-motion';pre=root/'work/third-form-81-motion';meta=json.loads((out/'atlases.json').read_text());ids=['spintoprainbow_3','hulasilver_3','rhythmpink_3','drumscarlet_3'];assert set(meta)==set(ids)
poster=Image.new('RGB',(1536,576),'#dbe3ec');draw=ImageDraw.Draw(poster);checks=[]
for n,id in enumerate(ids):
 a=meta[id];sheet=Image.open(root/a['sheet'].split('?')[0]).convert('RGBA');assert sheet.size==(1536,1024);assert sheet.getchannel('A').getextrema()[0]==0
 assert [len(a[k]) for k in ['idle','walk','attack','hurt']]==[4,4,7,1]
 hashes=[]
 for mode in ['idle','walk','attack','hurt']:
  for x,y,w,h,*_ in a[mode]:
   assert 0<=x<x+w<=sheet.width and 0<=y<y+h<=sheet.height
   pose=sheet.crop((x,y,x+w,y+h));box=pose.getchannel('A').point(lambda v:255 if v>96 else 0).getbbox();assert box and box[0]>0 and box[1]>0 and box[2]<w and box[3]<h,(id,mode,box)
   if mode=='walk':hashes.append(hashlib.sha256(pose.tobytes()).hexdigest())
  gif=Image.open(pre/(id+'-'+mode+'.gif'));assert gif.n_frames==len(a[mode]);assert sum(gif.seek(f) or gif.info['duration'] for f in range(gif.n_frames))>0
 assert len(set(hashes))==4,(id,'four unique walking frames')
 windup=.2 if id.startswith(('hacienda','ruby')) else .35;assert a['attackKeys'][2]==[windup*30,2]
 tile=Image.open(out/(id+'-profile.webp')).convert('RGBA');bg=Image.new('RGBA',tile.size,'#dbe3ec');bg.alpha_composite(tile);poster.paste(bg.convert('RGB'),(n*384,0));draw.text((n*384+20,265),id,fill='#203c50')
 attack=Image.open(pre/(id+'-attack.gif'));attack.seek(2);poster.paste(attack.convert('RGB'),(n*384,288))
 checks.append({'id':id,'frames':16,'transparent':True,'frameBounds':True,'walkFramesUnique':4,'hitTime':windup,'sourceHash':hashlib.sha256((root/'reference-sheets/third-form-81-motion'/(id+'-source.png')).read_bytes()).hexdigest()})
poster.save(pre/'overview.png');(pre/'validation.json').write_text(json.dumps({'forms':4,'frames':64,'gifs':16,'checks':checks},indent=2),encoding='utf-8')
names={'spintoprainbow_3':'팽이 레인보우 3진','hulasilver_3':'훌라 실버 3진','rhythmpink_3':'리듬 핑크 3진','drumscarlet_3':'군악 스칼렛 3진'}
html='''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>8.1 신규 3진 4명 · 새 외형과 모션</title><style>body{margin:0;background:#e2eaf0;color:#203343;font:16px system-ui;padding:24px}h1{font-size:26px}section{background:#f5f8fa;border-radius:16px;margin:22px 0;padding:18px}.motions{display:flex;flex-wrap:wrap;gap:8px}figure{margin:0;text-align:center}img{width:320px;max-width:100%;border-radius:12px;background:#dbe3ec}figcaption{padding:8px}.note{line-height:1.7}</style><h1>8.1 신규 3진 · 외형 재설계</h1><p class="note">기존 3진의 머리카락·표정·짧은 팔다리·의상 실루엣을 참고한 모션 시안입니다.<br>수정된 입과 실버의 몸 비율을 반영했습니다. 모션 에셋 완성 단계이며 전투·도감에는 아직 연결하지 않았습니다.</p>'''
for id in ids:
 html+='<section><h2>'+names[id]+'</h2><div class="motions">'
 for mode,label in [('idle','대기'),('walk','걷기'),('attack','공격'),('hurt','넉백')]:html+=f'<figure><img src="{id}-{mode}.gif?v=1" alt="{names[id]} {label} 모션"><figcaption>{label}</figcaption></figure>'
 html+='</div></section>'
(pre/'preview.html').write_text(html+'</html>',encoding='utf-8')
print('PASS 4 third forms / 64 poses / 16 GIFs; alpha, bounds, unique walking, impact timing; overview and preview ready')
