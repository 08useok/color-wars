"""Put a baked enemy sheet into the game in place of its current atlas, keeping its on-screen size and spot.

usage: python apply.py NAME WORK_DIR [--match width|height|part|standard] [--anchor center|left|right]
                       [--scale S] [--fore F --back B] [--write]

- reads WORK_DIR/anim_NAME.png + WORK_DIR/NAME.atlas.json (bake.py)
- finds NAME's current NEW_ATLASES entry in game.js (either `NAME:{...},` inside the literal or a
  `NEW_ATLASES.NAME={...};` line), works out where walk frame 0 is drawn today (left edge, width,
  ground) and picks scale / left / lift so the new walk frame 0 lands on the same box:
    --match width (default)  same on-screen width as today
    --match height           same on-screen height (use when the new art adds width, e.g. a weapon)
    --match part             today's frames are raw crops of NNN_e.png: scale = old scale / partScale
    --match standard         the usual baked-enemy setup (scale .833, left 21, lift 0), ignore today's box
  --anchor picks which edge of the box stays put (default center).
- --fore/--back: original Foreswing / Backswing frames -> data.units.NAME windup = F/30,
  attackDuration = (F+B)/30, so damage lands on the frame the original hits.
- dry run by default; --write saves assets/anim_NAME.webp and edits game.js.
"""
import json, os, re, subprocess, sys
from PIL import Image

ROOT = os.getcwd()


def opt(name, default=None, cast=str):
    return cast(sys.argv[sys.argv.index(name) + 1]) if name in sys.argv else default


def js_eval(literal):
    """evaluate a JS object literal; unknown identifiers (sheet consts) come back as their own names"""
    code = ("const p=new Proxy({},{has:(t,k)=>typeof k==='string'&&!(k in globalThis),get:(t,k)=>k===Symbol.unscopables?undefined:String(k)});"
            "with(p){process.stdout.write(JSON.stringify(eval('('+require('fs').readFileSync(0,'utf8')+')')))}")
    return json.loads(subprocess.run(['node', '-e', code], input=literal, capture_output=True, text=True, encoding='utf-8', check=True).stdout)


def num(v):
    return ('%.4f' % v).rstrip('0').rstrip('.')


def main():
    name, work = sys.argv[1], sys.argv[2]
    match, anchor, write = opt('--match', 'width'), opt('--anchor', 'center'), '--write' in sys.argv
    new = json.load(open(f'{work}/{name}.atlas.json'))
    src = open('game.js', encoding='utf-8').read()

    m = re.search(r'(?m)^NEW_ATLASES\.' + name + r'=(\{.*\});[ \t]*$', src)
    form = 'assign'
    if not m:
        m = re.search(r'(?m)^[ \t]*' + name + r':(\{.*\}),?[ \t]*$', src); form = 'literal'
    if not m: sys.exit(f'no single-line NEW_ATLASES entry for {name} in game.js')
    old = js_eval(m.group(1))
    if old.get('evolved') or old.get('true'): sys.exit('entry has evolved/true forms: this script is for enemies only')

    w0n = new['walk'][0]
    if match == 'standard':
        s, left, lift = 0.833, 21.0, 0.0
    else:
        so, lo, lifto = old['scale'], old['left'], old.get('lift', 0)
        w0 = old['walk'][0]; oxo, oyo = (w0[4] if len(w0) > 4 else 0), (w0[5] if len(w0) > 5 else 0)
        L, W, H, B = lo - oxo * so, w0[2] * so, w0[3] * so, (lifto + oyo) * so
        s = opt('--scale', None, float) or {'width': W / w0n[2], 'height': H / w0n[3], 'part': so / new['partScale']}[match]
        Wn = w0n[2] * s
        edge = {'left': L, 'center': L + (W - Wn) / 2, 'right': L + W - Wn}[anchor]
        left, lift = edge + w0n[4] * s, B / s - w0n[5]
        print(f'today: walk0 box left {L:.1f}px  width {W:.1f}px  height {H:.1f}px  ground {B:.1f}px  (scale {so})')
        print('scale candidates:', {k: round(v, 4) for k, v in {'width': W / w0n[2], 'height': H / w0n[3], 'part': so / new['partScale']}.items()})
    print(f'new:   scale {s:.4f}  left {left:.2f}  lift {lift:.2f}  -> walk0 box left {left - w0n[4] * s:.1f}px  '
          f'width {w0n[2] * s:.1f}px  height {w0n[3] * s:.1f}px')

    dropped = sorted(set(old) - {'scale', 'left', 'lift', 'sheet', 'walk', 'attack', 'hurt', 'walkStep', 'attackStep'})
    if dropped: print('NOTE old keys not carried over (re-add by hand if still needed):', dropped)

    sheet = f'assets/anim_{name}.webp'
    v = re.search(r'\?v=(\d+)', str(old.get('sheet', '')))
    url = sheet + (f'?v={int(v.group(1)) + 1}' if v and old.get('sheet', '').startswith(sheet) else ('?v=2' if os.path.exists(sheet) else ''))
    f = lambda L: json.dumps(L, separators=(',', ':'))
    body = (f"{{scale:{num(s)},left:{num(left)},{'lift:' + num(lift) + ',' if abs(lift) > .05 else ''}sheet:'{url}',"
            f"walkStep:2/30,attackStep:2,walk:{f(new['walk'])},attack:{f(new['attack'])},hurt:{f(new['hurt'])}}}")
    line = m.group(0)
    repl = line.replace(m.group(1), body, 1)
    out = src.replace(line, repl, 1)

    fore, back = opt('--fore', None, int), opt('--back', None, int)
    if fore is not None:
        um = re.search(r'(?m)^data\.units\.' + name + r'=\{.*\};$', out)
        if not um: sys.exit(f'data.units.{name}=... line not found')
        u = um.group(0)
        for k, val in (('attackDuration', f'{fore + (back or 0)}/30'), ('windup', f'{fore}/30')):
            u = re.sub(k + r':[^,}]+', f'{k}:{val}', u) if re.search(k + ':', u) else u.replace('};', f',{k}:{val}}};')
        out = out.replace(um.group(0), u, 1)
        print('stats:', u)
        if back is not None and abs(new['attackLen'] - (fore + back)) > 3:
            print(f'NOTE attack animation is {new["attackLen"]}f but foreswing+backswing is {fore + back}f')
        later = re.findall(r'Object\.assign\(data\.units\.' + name + r',\{[^)]*(?:attackDuration|windup)[^)]*\)', out)
        if later: print('NOTE later overrides of timing exist:', later)

    print('entry:', repl[:160] + ('...' if len(repl) > 160 else ''))
    if write:
        Image.open(f'{work}/anim_{name}.png').save(sheet, lossless=True, quality=100, method=6)
        open('game.js', 'w', encoding='utf-8', newline='').write(out)
        print(f'written {sheet} ({os.path.getsize(sheet):,} B) and game.js')
    else:
        print('dry run (add --write to apply)')


if __name__ == '__main__':
    main()
