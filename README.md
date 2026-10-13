# 3DGS-Calib project website

Static project page for the 3DGS-Calib paper, with authors, affiliations,
paper figures, results, citations and links to the research code.

## Preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/. In the combined source workspace, edit
`build_sites.py` and `design/site.css` / `design/site.js`, then run
`python3 build_sites.py` from that workspace. This regenerates project HTML
and shared assets. A standalone copy can be edited directly in `index.html`
and `assets/`.
No Node build is required. Keep `.nojekyll` and relative asset paths when
hosting the folder on GitHub Pages. Related-project links use the published
URLs; the combined local preview uses sibling folders.
