# L'Alliance — Site Web V1

**[alliance.liut.me](https://alliance.liut.me/)** — Collectif de seniors stratégiques. Partenaires pour organisations complexes.

---

## Stack

| | Choix |
|---|---|
| Build tool | **Vite 8** — dev server + build multi-page |
| Runtime | **HTML/CSS/JS vanilla** — zéro framework |
| CSS | Design tokens (`tokens.css`) + composants (`main.css`) |
| Typo | Playfair Display (serif) + Mulish (sans) — Google Fonts async |
| Deploy | **Cloudflare Pages** — auto-deploy sur push `main` |
| Contact form | Formsubmit.co (zéro inscription) |
| Cal.com | Lien prise de RDV 45 min embedé |

## Structure

```
index.html               ← Accueil (Hero, Vision, Expertise, Code, Membres, Contact)
manifesto.html           ← Éditorial — La Grande Bifurcation
a-team-workshops.html    ← Offre A-Team Workshops
sources/
  aliance_v1.html       ← Source originale V1 (référence archive)
public/
  membres/              ← Photos profils (10 membres, .jpg)
src/
  styles/
    tokens.css          ← Variables CSS (couleurs oklch, typo fluide, spacing, radii, shadows)
    main.css            ← Styles + composants (~2000 lignes)
  scripts/
    main.js             ← Navbar, menu mobile, scroll-reveal, formulaire contact
    manifesto.js        ← Progress bar de lecture
    a-team-workshops.js ← Progress bar de lecture
vite.config.js
wrangler.jsonc           ← Config Cloudflare Pages
```

## Commandes

```bash
npm install       # installer les dépendances
npm run dev       # dev server (http://localhost:5173)
npm run build     # build production → dist/
npm run preview   # prévisualiser le build prod
```

## Design System

### Couleurs (oklch)
| Token | Valeur | Usage |
|---|---|---|
| `--color-base` | `oklch(7% 0.015 240)` | Fond principal |
| `--color-accent` | `oklch(72% 0.14 60)` | Ambre — CTA, highlights |
| `--color-text` | `oklch(85% 0.010 220)` | Texte principal |
| `--color-text-muted` | `oklch(62% 0.012 220)` | Texte secondaire |

### Boutons
| Classe | Usage |
|---|---|
| `.btn-primary` | CTA principal (amber fill) |
| `.btn-secondary` | Action secondaire (border transparent) |
| `.btn-ghost` | Lien tertiaire / inline (underline) |
| `.btn--full` | Modifier full-width (formulaire) |

### Animations
- `.reveal` — fade+translateY au scroll (IntersectionObserver)
- `.reveal-stagger` — stagger sur enfants
- `prefers-reduced-motion` — désactivation totale

## Pages

| Page | Contenu |
|---|---|
| `/` | Hero · Proof strip · Vision + teasers · Expertise (5 domaines) · Code de l'Alliance · Testimonial BDR Thermea · Membres (10 profils) · Footer contact |
| `/manifesto.html` | Éditorial "La Grande Bifurcation" · CTA Rejoindre L'Alliance |
| `/a-team-workshops.html` | Offre workshops · 3 formats (cartes) · Process Sprint CODIR · Testimonials · FAQ · Rejoindre L'Alliance |

## Delta V1 → V2

| | V1 (source) | V2 (actuel) |
|---|---|---|
| JS runtime | React 18 + Babel standalone (~1,8 MB) | **3 kB** vanilla |
| CSS | Tailwind CDN non-purgé (~350 kB) | **41 kB** custom |
| Pages | 1 | 3 |
| Animations CPU | grain 8-step + blobs animate-pulse | Grain statique, 0 animation layout |
| Accessibilité | Aucun skip link, pas d'ARIA | Skip link, ARIA complèt, focus-visible |
| Performance (gzip total) | ~2 MB | **~18 kB** |

## Contact

Fabrice Liut — fabrice@liut.me — [liut.me](https://liut.me)

