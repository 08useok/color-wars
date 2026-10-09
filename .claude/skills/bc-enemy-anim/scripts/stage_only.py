"""Stage only my lines of a file that another session is also editing.

usage: python stage_only.py FILE REGEX [REGEX ...]
       python stage_only.py --bump-game-js

FILE REGEX...: takes the staged copy of FILE (= HEAD unless something is already staged), swapping in the working-tree version of each
line that matches a REGEX (one line per regex, same line in HEAD and working tree), then stages it with
`git hash-object -w` + `git update-index`. Everything else the other session changed stays unstaged.

--bump-game-js: sets `game.js?v=N` in red-battle-doge.html to one past both HEAD and the working tree,
in the working tree and in the index (only that one change is added on top of what is staged).
Both modes build on the index, so they can be run one after another for the same file.
"""
import re, subprocess, sys, tempfile, os


def git(*a, inp=None):
    return subprocess.run(['git', *a], input=inp, capture_output=True, check=True).stdout


def stage(path, text):
    with tempfile.NamedTemporaryFile('wb', delete=False) as t: t.write(text.encode('utf-8'))
    blob = git('hash-object', '-w', t.name).decode().strip(); os.unlink(t.name)
    git('update-index', '--cacheinfo', f'100644,{blob},{path}')


def main():
    if sys.argv[1] == '--bump-game-js':
        p = 'red-battle-doge.html'; head = git('show', f'HEAD:{p}').decode('utf-8'); idx = git('show', f':{p}').decode('utf-8')
        wt = open(p, encoding='utf-8').read(); rx = r'game\.js\?v=(\d+)'
        v = max(int(re.search(rx, t).group(1)) for t in (head, idx, wt)) + 1
        sub = lambda s: re.sub(rx, f'game.js?v={v}', s, count=1)
        open(p, 'w', encoding='utf-8', newline='').write(sub(wt)); stage(p, sub(idx)); print(f'game.js?v={v} staged'); return
    path, pats = sys.argv[1], sys.argv[2:]
    head = git('show', f':{path}').decode('utf-8'); wt = open(path, encoding='utf-8').read()
    for pat in pats:
        h = re.search(r'(?m)^' + pat + r'.*$', head); w = re.search(r'(?m)^' + pat + r'.*$', wt)
        if not (h and w): sys.exit(f'{pat!r}: not found in {"HEAD" if not h else "working tree"}')
        head = head.replace(h.group(0), w.group(0), 1); print('staged line:', w.group(0)[:120])
    stage(path, head)


if __name__ == '__main__':
    main()
