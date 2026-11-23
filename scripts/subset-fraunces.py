"""
Builds src/app/fonts/fraunces-italic-latin.woff2, the serif of the Mayo world
(docs/plans/2026-11-23-rendimiento-celular.md).

Every serif word on the site is Fraunces italic at weight 400: the title
keywords ("opsz" 120, "SOFT" 60) and the step and case numbers (automatic
optical size, SOFT 0). The Latin file Google Fonts serves carries the whole
weight axis (100-900) as well, 146 KB preloaded on every page; pinned to
weight 400 it is ~72 KB and draws the same glyphs. The optical size and SOFT
axes stay whole, so any size or softness the CSS asks for still renders.

Run it again if the serif ever needs another weight (add it to WEIGHT as a
range, e.g. (400, 600)) or glyphs outside Google's Latin subset:

    python -m pip install --user fonttools brotli
    python scripts/subset-fraunces.py            # downloads Google's Latin file
    python scripts/subset-fraunces.py <file>     # or uses a Fraunces italic variable font you have

fontTools and brotli are not project dependencies: they install at user level.
"""

import io
import re
import sys
import urllib.request
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

WEIGHT = 400
OUT = Path(__file__).resolve().parent.parent / "src" / "app" / "fonts" / "fraunces-italic-latin.woff2"
CSS_URL = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@1,9..144,100..900,0..100&display=swap"
# Google serves woff2 only to browsers that announce support for it.
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"


def google_latin_file() -> bytes:
    request = urllib.request.Request(CSS_URL, headers={"User-Agent": USER_AGENT})
    css = urllib.request.urlopen(request).read().decode()
    # Each @font-face is preceded by a comment naming its subset.
    match = re.search(r"/\* latin \*/\s*@font-face\s*{[^}]*?url\((https://[^)]+\.woff2)\)", css)
    if not match:
        sys.exit("No Latin woff2 in the Google Fonts CSS")
    return urllib.request.urlopen(match.group(1)).read()


def main() -> None:
    source = Path(sys.argv[1]).read_bytes() if len(sys.argv) > 1 else google_latin_file()
    font = TTFont(io.BytesIO(source))
    axes = {axis.axisTag for axis in font["fvar"].axes}
    if not {"wght", "opsz", "SOFT"} <= axes:
        sys.exit(f"Expected a Fraunces variable font with wght, opsz and SOFT; got {sorted(axes)}")
    pinned = instancer.instantiateVariableFont(font, {"wght": WEIGHT}, updateFontNames=False)
    pinned.flavor = "woff2"
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pinned.save(OUT)
    kept = ", ".join(f"{a.axisTag} {a.minValue:g}-{a.maxValue:g}" for a in pinned["fvar"].axes)
    print(f"{OUT.name}: {len(source) // 1024} KB -> {OUT.stat().st_size // 1024} KB (weight {WEIGHT}; {kept})")


if __name__ == "__main__":
    main()
