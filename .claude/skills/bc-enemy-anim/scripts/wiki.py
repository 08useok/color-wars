"""Look up one original enemy on the Battle Cats wiki (battlecats.miraheze.org).

usage: python wiki.py NNN OUT_DIR [--png]

- saves the AnimationViewer data (imgcut + mamodel + maanim) to OUT_DIR/NNN_e.json
- finds the enemy page through File:E_NNN.png and prints its timing stats
  (Foreswing / Backswing / Time Between Attacks, in 1/30 s frames)
- prints the sprite sheet NNN_e.png URL and size; with --png it also downloads it
  (only pass --png after the user approved that download)
"""
import json, re, sys, urllib.parse, urllib.request

API = 'https://battlecats.miraheze.org/w/api.php'
UA = {'User-Agent': 'red-battle-doge enemy-anim baker'}


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()


def api(**q):
    q['format'] = 'json'
    return json.loads(get(API + '?' + urllib.parse.urlencode(q)))


def main():
    n, out = sys.argv[1].zfill(3), sys.argv[2]
    raw = get(f'https://battlecats.miraheze.org/wiki/MediaWiki:Custom-AnimationViewer/{n}_e.json?action=raw')
    json.loads(raw.decode('utf-8-sig'))  # fail loudly if the page is missing / not JSON
    open(f'{out}/{n}_e.json', 'wb').write(raw)
    print(f'animation data: {out}/{n}_e.json ({len(raw):,} B)')

    pages = [p['title'] for p in api(action='query', list='imageusage', iutitle=f'File:E_{n}.png')['query']['imageusage'] if p['ns'] == 0]
    print('enemy page:', pages or 'not found (search the wiki by English name)')
    for title in pages[:1]:
        text = get(f'https://battlecats.miraheze.org/w/index.php?title={urllib.parse.quote(title)}&action=raw').decode('utf-8')
        for key in ('Foreswing', 'Backswing', 'Time Between Attacks', 'Attack Type', 'Movement Speed', 'Knockback'):
            m = re.search(r'\|\s*' + key + r'\s*=\s*([^\n|]*)', text)
            if m: print(f'  {key} = {m.group(1).strip()}')

    info = api(action='query', titles=f'File:{n}_e.png', prop='imageinfo', iiprop='url|size')['query']['pages']
    ii = next(iter(info.values())).get('imageinfo')
    if not ii:
        print(f'sheet: File:{n}_e.png not found'); return
    url, size = ii[0]['url'], ii[0]['size']
    print(f'sheet: {n}_e.png  {size:,} B  {url}')
    if '--png' in sys.argv:
        open(f'{out}/{n}_e.png', 'wb').write(get(url)); print(f'downloaded {out}/{n}_e.png')


if __name__ == '__main__':
    main()
