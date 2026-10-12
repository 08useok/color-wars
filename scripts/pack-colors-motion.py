"""Read supplied archives unchanged; recover local ZIP records and pack pivoted frames."""
from pathlib import Path
from PIL import Image, ImageDraw
import io, json, zipfile, struct, zlib, binascii

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'work/colors-motion'
OUT.mkdir(parents=True, exist_ok=True)
atlases = {}
preview = Image.new('RGB', (1000, 650), '#425369')
draw = ImageDraw.Draw(preview)
for row, name in enumerate(['amber', 'bronze', 'banana', 'butter', 'vanilla']):
    path = ROOT / f'colors-{name}-motion-final.zip'
    try:
        with zipfile.ZipFile(path) as archive:
            files = {n: archive.read(n) for n in archive.namelist()}
    except zipfile.BadZipFile:
        raw = path.read_bytes(); pos = 0; files = {}
        while raw[pos:pos+4] == b'PK\x03\x04':
            h = struct.unpack_from('<IHHHHHIIIHH', raw, pos)
            _, _, flags, method, _, _, crc, packed, size, nl, el = h
            assert not flags & 8, 'Unbounded ZIP record'
            filename = raw[pos+30:pos+30+nl].decode('utf8')
            start = pos+30+nl+el; payload = raw[start:start+packed]
            data = zlib.decompress(payload, -15) if method == 8 else payload
            assert len(data) == size and binascii.crc32(data) == crc, filename
            files[filename] = data; pos = start+packed
        assert pos == len(raw), 'Unrecovered archive bytes'
        with zipfile.ZipFile(OUT / f'{name}-recovered.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
            for filename, data in files.items(): archive.writestr(filename, data)
        print('Recovered', name, len(files), 'CRC-verified files')
    meta = json.loads(files['colors-motion/animations.json'])
    forms = []
    for form in (1, 2):
        canvas = Image.new('RGBA', (2048, 4096)); x = y = rh = 0
        spec = {'sheet': f'assets/colors_{name}_{form}.webp', 'left': 21, 'flip': False, 'continuousAttack': True}
        for state in ('walk', 'attack'):
            anim = next(a for a in meta['animations'] if a['name'] == f'{name}_{form}_{state}')
            px, py = anim.get('pivot', meta['pivot'])
            frames = []; heights = []
            for i in range(anim['frames']):
                im = Image.open(io.BytesIO(files[f'colors-motion/frames/{anim["name"]}/{i:03}.png'])).convert('RGBA')
                box = im.getbbox(); assert box, (name, form, state, i)
                crop = im.crop(box)
                if x+crop.width+2 > canvas.width: x = 0; y += rh+2; rh = 0
                assert y+crop.height <= canvas.height
                canvas.paste(crop, (x,y))
                frames.append([x,y,crop.width,crop.height,px-box[0],py-box[3]])
                heights.append(crop.height)
                x += crop.width+2; rh = max(rh,crop.height)
                if i == 0:
                    tile = crop.copy(); tile.thumbnail((180,100))
                    preview.paste(tile, (form*400-320+(state=='attack')*190,row*130+20),tile)
            spec[state] = frames
            if state == 'walk':
                spec['scale'] = 90 / sorted(heights)[len(heights)//2]
                spec['walkStep'] = 1 / anim['fps']
        spec['strike'] = round(len(spec['attack']) * .45)
        # The source has no hurt animation: retain the game's walk-frame hit flash.
        canvas.crop((0,0,2048,y+rh)).save(ROOT/spec['sheet'], lossless=True, method=4)
        forms.append(spec)
    forms[0]['evolved'] = forms[1]; atlases[name] = forms[0]
    draw.text((5,row*130+5),name,fill='white')
    print(name, [(len(s['walk']),len(s['attack'])) for s in forms])
preview.save(OUT/'preview.png')
(ROOT/'colors-motion-atlases.js').write_text('const COLORS_MOTION_ATLASES='+json.dumps(atlases,separators=(',',':'))+';\nObject.assign(NEW_ATLASES,COLORS_MOTION_ATLASES);\n',encoding='utf8')
