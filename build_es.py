#!/usr/bin/env python3
"""Generate the Spanish mirror (es/) from the English pages.

- Translates visible text nodes + a few attributes via the EN->ES dictionary.
- Rewrites asset paths (./asset -> ../asset); leaves .html links alone (they point
  to sibling pages inside es/).
- Sets <html lang="es">, adds hreflang alternates, injects the shared toggle.
"""
import json, re, html, os

ROOT = os.path.dirname(os.path.abspath(__file__))
EN = json.load(open(os.path.join(ROOT, "es/_en_strings.json"), encoding="utf-8"))
ES = json.load(open(os.path.join(ROOT, "es/_es_strings.json"), encoding="utf-8"))
TR = {e: s for e, s in zip(EN, ES)}
TR.update(json.load(open(os.path.join(ROOT, "es/_svg_es.json"), encoding="utf-8")))

PAGES = [f for f in os.listdir(ROOT)
         if f.endswith(".html") and os.path.isfile(os.path.join(ROOT, f))]

SPLIT_RE = re.compile(r'(<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>|<!--.*?-->)',
                      re.DOTALL | re.IGNORECASE)
TEXT_RE = re.compile(r'(>)([^<>]+)(<)')
ATTR_RE = re.compile(r'(placeholder|aria-label|alt|title|content)="([^"]*)"')

def tr_text(m):
    pre, body, post = m.group(1), m.group(2), m.group(3)
    raw = html.unescape(body)
    key = re.sub(r'\s+', ' ', raw).strip()
    if key in TR:
        # preserve leading/trailing whitespace of the original fragment
        lead = body[:len(body) - len(body.lstrip())]
        trail = body[len(body.rstrip()):]
        out = html.escape(TR[key], quote=False)
        return pre + lead + out + trail + post
    return m.group(0)

def tr_attr(m):
    name, val = m.group(1), m.group(2)
    key = re.sub(r'\s+', ' ', html.unescape(val)).strip()
    if key in TR:
        return name + '="' + html.escape(TR[key], quote=True) + '"'
    return m.group(0)

def translate_segment(seg):
    seg = TEXT_RE.sub(tr_text, seg)
    seg = ATTR_RE.sub(tr_attr, seg)
    return seg

def translate_html(src):
    parts = SPLIT_RE.split(src)
    out = []
    for p in parts:
        if SPLIT_RE.match(p):           # script/style/comment -> verbatim
            out.append(p)
        else:
            out.append(translate_segment(p))
    return "".join(out)

ASSET_RE = re.compile(r'(\b(?:src|href|poster|data-src)=")\./([^"]+)(")')
def fix_assets(m):
    pre, pathv, post = m.group(1), m.group(2), m.group(3)
    head = re.split(r'[#?]', pathv, 1)[0]
    if head.lower().endswith(".html"):
        return m.group(0)            # internal page link, keep relative
    return pre + "../" + pathv + post

def build(page):
    src = open(os.path.join(ROOT, page), encoding="utf-8").read()
    src = translate_html(src)
    src = ASSET_RE.sub(fix_assets, src)
    # lang attribute
    src = re.sub(r'<html\b[^>]*>', '<html lang="es">', src, count=1)
    # hreflang alternates after <head>
    alts = ('\n  <link rel="alternate" hreflang="en" href="../%s">'
            '\n  <link rel="alternate" hreflang="es" href="./%s">') % (page, page)
    src = re.sub(r'(<head\b[^>]*>)', r'\1' + alts, src, count=1)
    # toggle script before </body>
    if 'lang-toggle.js' not in src:
        src = src.replace('</body>', '  <script src="../lang-toggle.js" defer></script>\n</body>', 1)
    open(os.path.join(ROOT, "es", page), "w", encoding="utf-8").write(src)

if __name__ == "__main__":
    for p in sorted(PAGES):
        build(p)
        print("built es/" + p)
