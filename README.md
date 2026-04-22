# L'Alliance | Global Partners

Site de [alliance.liut.me](https://alliance.liut.me/) — partenaires stratégiques seniors pour organisations complexes.

## Stack

- **Vite** — build tool, dev server, multi-page
- **HTML + CSS + JS vanilla** — zéro framework runtime
- **Design tokens CSS** (`src/styles/tokens.css`) — couleurs oklch, typo fluide, spacing, radii, shadows
- **Fonts** — Playfair Display + Mulish via Google Fonts (`display=swap`)

## Structure

```
index.html          ← page principale
manifesto.html      ← page manifeste
sources/
  aliance_v1.html  ← source originale V1 (référence)
src/
  styles/
    tokens.css     ← design tokens (couleurs, typo, spacing…)
    main.css       ← styles globaux + composants
  scripts/
    main.js        ← nav scroll, menu mobile, reveals, contact
vite.config.js
```

## Commandes

```bash
npm install       # installer les dépendances
npm run dev       # dev server (http://localhost:5173)
npm run build     # build production → dist/
npm run preview   # prévisualiser le build prod
```

## V2 — ce qui a changé par rapport à la V1

| | V1 | V2 |
|---|---|---|
| JS runtime | React 18 + Babel standalone (~1.8 MB) | **3 kB** vanilla |
| CSS | Tailwind CDN non-purgé (~350 kB) | **23 kB** custom |
| Animations CPU | grain 8-step + blobs animate-pulse | Grain statique, 0 animation layout |
| Accessibilité | Aucun skip link, pas d'ARIA | Skip link, aria-expanded, aria-modal, focus-visible |
| `prefers-reduced-motion` | Non géré | Désactivation totale des animations |
| Build | Single HTML file | Multi-page Vite, CSS/JS hachés |

## Pages

- `/` — Hero · Vision · Expertise (5 domaines) · Code de l'Alliance · Partners · Footer contact
- `/manifesto.html` — Manifeste (page à compléter)

## Contact

Obfusqué côté JS — `fabrice @ liut.me`

