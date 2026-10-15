#!/usr/bin/env python3
"""Rebuild poster/poster.html from the live event page and print it to PDF.
Usage: python3 poster/build_poster.py   (run from the repo root)"""
import math, random, re, subprocess, os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
page=open(f'{ROOT}/_pages/sca-class.html').read()
css=open(f'{ROOT}/assets/css/sca-class.css').read()
tpl=open(f'{ROOT}/poster/poster.template.html').read()
svg=page[page.index('      <svg id="scene"'):page.index('</svg>')+6]
svg=svg.replace('{{ site.baseurl }}/images/sca-class/dalgu.png','../images/sca-class/dalgu.png')
KEY=['2b','7e','15','16','28','ae','d2','a6','ab','f7','15','88','09','cf','4f','3c']
m=re.search(r"t\.setAttribute\('x', ([\d.]+) \+ i \* ([\d.]+)\); t\.setAttribute\('y', ([\d.]+)\);", open(f'{ROOT}/assets/js/sca-class.js').read())
x0,pitch,y=float(m.group(1)),float(m.group(2)),m.group(3)
svg=svg.replace('<g id="keybytes"></g>','<g id="keybytes">'+''.join(f'<text x="{x0+i*pitch}" y="{y}" text-anchor="middle" class="kt kt--locked">{b}</text>' for i,b in enumerate(KEY))+'</g>')
svg=svg.replace('파형 수집 대기 중…','16 / 16 바이트 확정 — 키 복구 완료').replace('수집한 파형: 0 / 500','수집한 파형: 500 / 500')
random.seed(3)
pts=' '.join(f'{628+j*(214/109):.1f},{190+math.sin(j/6)*10+(-18 if j%11==0 else 0)+(random.random()-0.5)*10:.1f}' for j in range(110))
svg=svg.replace('points=""',f'points="{pts}"')
probe=re.search(r'\.probing #probe \{ transform: (translate\([^)]*\)); \}', css).group(1)
html=tpl.replace('/*SITE_CSS*/',css).replace('<!--SCENE-->',svg).replace('/*PROBE_DOWN*/',f'#probe {{ transform: {probe}; }}')
open(f'{ROOT}/poster/poster.html','w').write(html)
subprocess.run(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','--headless=new','--disable-gpu','--no-pdf-header-footer','--virtual-time-budget=6000',
                f'--print-to-pdf={ROOT}/poster/sca-class-poster.pdf',f'file://{ROOT}/poster/poster.html'],stderr=subprocess.DEVNULL,check=True)
print('poster rebuilt:', f'{ROOT}/poster/sca-class-poster.pdf')
