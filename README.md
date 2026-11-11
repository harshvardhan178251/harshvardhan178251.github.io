<div align="center">

# 🌐 harshvardhan178251.github.io

### My personal portfolio site — dark, responsive, animated

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No build step](https://img.shields.io/badge/Build%20step-none-7C3AED?style=flat-square&logo=npm&logoColor=white)](#-why-no-framework)
[![Responsive](https://img.shields.io/badge/Responsive-yes-22D3EE?style=flat-square&logo=chrome&logoColor=white)](#-features)

</div>

---

## ✨ Features

- 🎨 **Animated background** — a canvas particle grid that reacts to your cursor and links nearby nodes
- 💜 **Gradient hero** with a typewriter effect cycling through what I do
- 🪟 **Glassmorphic nav** that solidifies on scroll, with an off-canvas mobile menu
- 📜 **Scroll reveal** — sections fade in via `IntersectionObserver`
- 🗂️ **Project showcase** — six real projects with stack tags and live demo links
- 📊 **Live GitHub stats** — stats card, streak card and activity graph
- ♿ **Accessible** — semantic landmarks, ARIA labels, keyboard-dismissable menu
- ⚡ **Perf-aware** — canvas pauses when the tab is hidden, respects `prefers-reduced-motion`
- 📱 **Fully responsive** — from 320px phones to ultrawide

## 🖥️ Preview

Open the deployed site: **[harshvardhan178251.github.io](https://harshvardhan178251.github.io)**

## 🚀 Run locally

No install, no build, no dependencies:

```bash
git clone https://github.com/harshvardhan178251/harshvardhan178251.github.io.git
cd harshvardhan178251.github.io
```

Then just open `index.html` in a browser — or serve it:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

## 📁 Structure

```
.
├── index.html    # single-page markup: hero, about, skills, projects, stats, contact
├── styles.css    # design tokens, glass nav, cards, responsive + reduced-motion rules
├── script.js     # nav state, mobile menu, typewriter, scroll reveal, particle grid
└── README.md
```

## 🧠 Why no framework

This site is **three static files**. There is:

- no `node_modules`
- no build step that can break
- no framework runtime shipped to the visitor

For a single-page portfolio that ships ~20 KB of markup and styles, a bundler
would cost more than it saves. The whole thing deploys straight from a push to
GitHub Pages.

## 🛠️ Customising

Everything is driven by CSS custom properties at the top of `styles.css`:

```css
:root {
  --bg: #0a0a0f;      /* page background */
  --accent: #7c3aed;  /* primary purple */
  --accent-2: #22d3ee;/* secondary cyan */
  --radius: 16px;     /* card corner radius */
  --max: 1080px;      /* content max width */
}
```

Change those five values and the entire palette follows.

## 📬 Contact

- **Email** — [reddy.harshavardhan1010@gmail.com](mailto:reddy.harshavardhan1010@gmail.com)
- **LinkedIn** — [reddy-harshvardhan-a02b92325](https://www.linkedin.com/in/reddy-harshvardhan-a02b92325/)
- **GitHub** — [@harshvardhan178251](https://github.com/harshvardhan178251)

---

MIT licensed · Built by **Harsh Vardhan**
