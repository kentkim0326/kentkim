# kentkim

**Kent Kim — painter.** Black and white with silver and gold acrylic, in which Hangul,
Chinese characters and the Roman alphabet merge into a single stroke.

- `index.html` — work
- `places.html` — *133 Places* (2023– ), painting made on site across Korea, with a map
- `about.html` — biography and contact

No build step. Static HTML/CSS/JS, deployed on Vercel.

```bash
python3 -m http.server 5173   # open http://localhost:5173
```

English is the source text and lives in the HTML itself; `i18n.js` holds the Korean
translations only. See `CLAUDE.md` — its content rules are constraints, not preferences.
