"""Pack the supplied pixels without resampling; keep animation states separate."""
from pathlib import Path
import hashlib
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
EXPORT = ROOT / 'exports/clover-variants'
GROUPS = json.loads((EXPORT / 'original-manifest.json').read_text(encoding='utf-8'))
IDS = ['clover3', 'mixedwhite', 'samplewhite', 'earphonered', 'headsetred', 'shotguntan', 'tak47']
TARGET_HEIGHTS = [90, 55, 70, 55, 70, 55, 70]
result = {}
for group, key, target_height in zip(GROUPS, IDS, TARGET_HEIGHTS):
    packed = Image.new('RGBA', (4096, 4096))
    x = y = row_height = 0
    meta = {'sheet': f'assets/{key}_motions.png', 'walkStep': .07,
            'left': 21, 'scaleByState': {}, 'strike': 12, 'sources': []}
    for source_index, file in enumerate(group['files']):
        image = Image.open(EXPORT / 'originals' / file['name']).convert('RGBA')
        columns, rows = [(6, 4), (6, 5), (4, 2)][source_index]
        frames = []
        for row in range(rows):
            for col in range(columns):
                # Rounded integer boundaries cover every source pixel exactly once.
                bounds = (round(col * image.width / columns), round(row * image.height / rows),
                          round((col + 1) * image.width / columns), round((row + 1) * image.height / rows))
                cell = image.crop(bounds)
                box = cell.getchannel('A').getbbox()
                assert box, (key, source_index, row, col)
                crop = cell.crop(box)
                if x + crop.width + 2 > packed.width:
                    x = 0
                    y += row_height + 2
                    row_height = 0
                assert y + crop.height <= packed.height
                packed.paste(crop, (x, y))
                assert packed.crop((x, y, x + crop.width, y + crop.height)).tobytes() == crop.tobytes()
                # Anchor at the source cell centre, with the feet on the ground.
                frames.append([x, y, crop.width, crop.height, cell.width / 2 - box[0], 0])
                x += crop.width + 2
                row_height = max(row_height, crop.height)
        mode = ['walk', 'attack', 'extra'][source_index]
        if mode == 'extra':
            meta['attack'] += frames[:7]
            meta['hurt'] = frames[7:]
            meta['scaleByState']['hurt'] = target_height / frames[0][3]
            meta['extraStart'] = 30
            meta['extraScale'] = target_height / frames[0][3]
        else:
            meta[mode] = frames
            meta['scaleByState'][mode] = target_height / frames[0][3]
        meta['sources'].append({'name': file['name'], 'sha256': hashlib.sha256((EXPORT / 'originals' / file['name']).read_bytes()).hexdigest()})
    meta['scale'] = meta['scaleByState']['walk']
    path = ROOT / meta['sheet']
    packed.crop((0, 0, packed.width, y + row_height)).save(path)
    with Image.open(path) as saved:
        assert saved.tobytes() == packed.crop((0, 0, packed.width, y + row_height)).tobytes()
    result[key] = meta
    print(key, len(meta['walk']), len(meta['attack']), len(meta['hurt']))
(EXPORT / 'game-atlases.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
(ROOT / 'clover-variant-atlases.js').write_text('const CLOVER_VARIANT_ATLASES=' + json.dumps(result, ensure_ascii=False) + ';\n', encoding='utf-8')
