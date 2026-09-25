# GoUpload — Official Showcase & Documentation Site

A fast, static, terminal-aesthetic showcase website for **GoUpload**, the open-source Go-based CLI file upload vulnerability scanner for security professionals and penetration testers.

---

## ⚡ Handoff Guide: How to Replace Placeholder Data

All textual content, links, metrics, and command examples are centralized in a single configuration file:
👉 **[`src/content/siteContent.ts`](file:///c:/Users/hakim/OneDrive/Desktop/my%20projects/goupload-site/src/content/siteContent.ts)**

You do **not** need to touch layout components or JSX to update the site. Simply open `src/content/siteContent.ts` and replace every `[PLACEHOLDER: ...]` string with your verified project data:

| Section | Key in `siteContent.ts` | Notes |
| :--- | :--- | :--- |
| **Hero** | `hero.tagline`, `hero.oneLineDescription`, `hero.quickInstallCommand`, `hero.githubStarsBadge` | Set tool tagline, description, primary install command, and star count. |
| **Terminal Recording** | `hero.terminalEmbed` | Set `type: 'gif'` or `'video'` and `src: '/assets/demo.gif'` (or keep `'mock-terminal'`). |
| **Disclaimer** | `disclaimer.text` | Authorization & compliance notice displayed prominently near the top. |
| **Features** | `features` | Array of feature items (icons, title, description, category tag). Gracefully handles 6 to 20 items. |
| **Attack Modules** | `attackModules` | Table data (module name, description, payload count, category). Designed for ~13 rows, flexible count. |
| **ML Roadmap** | `mlRoadmap` | Visually distinct experimental roadmap (stepper/milestones, callout for training data). |
| **Install Methods** | `installMethods` | Tabbed code blocks (e.g. `go install`, `source`, `docker`, `release binary`). |
| **Example Commands** | `exampleCommands` | 3–4 practical execution commands with captions and descriptions. |
| **Contributing** | `contributing` | Callout blurb and link to `CONTRIBUTING.md`. |
| **Footer** | `footer` | License, author profile, GitHub repo, and release URLs. |

---

## 🖥️ Terminal Recording / GIF Embed Slot

The Hero section includes a terminal recording embed component:
- **Default State**: Interactive terminal mockup with color-coded syntax output (`[*]`, `[+]`, `[!]`, `[VULN]`).
- **To Use a Custom GIF or Video**:
  1. Place your recorded GIF or MP4 into the `public/` folder (e.g., `public/demo.gif` or `public/demo.mp4`).
  2. In `src/content/siteContent.ts`, set:
     ```ts
     terminalEmbed: {
       type: 'gif', // or 'video'
       src: '/demo.gif',
       alt: 'GoUpload CLI live scanning demonstration',
     }
     ```

---

## 🛠️ Development & Build Commands

```bash
# Install dependencies
npm install

# Start local development server with instant HMR
npm run dev

# Build optimized static production bundle (outputs to /dist)
npm run build

# Preview production build locally
npm run preview
```

---

## 🚀 Deployment

The build output (`dist/`) is pure static HTML/CSS/JS with zero runtime or server requirements:
- **GitHub Pages**: Deploy the `dist/` directory via GitHub Actions or the `gh-pages` branch.
- **Cloudflare Pages / Vercel / Netlify**: Build command: `npm run build`, Output directory: `dist`.
