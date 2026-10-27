# Modern Developer Portfolio (React + Vite + Tailwind CSS)

A sleek, responsive, and high-performance developer portfolio website built for a **Python Full-Stack & React Developer with a passion for AI**.

Designed with clean e-commerce aesthetics: generous white space, soft card shadows, subtle color gradients, smooth micro-interactions, WCAG-compliant accessibility, and an embedded retro 2D Snake canvas mini-game.

---

## 🚀 Quick Start & Setup Commands

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` or `pnpm` / `yarn`

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized static bundle will be generated in the `dist/` directory.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 📁 Project Structure

```text
port/
├── index.html                  # HTML5 entry with meta, preconnected fonts & favicon
├── package.json                # Project dependencies and npm scripts
├── postcss.config.js           # PostCSS configuration with Tailwind and Autoprefixer
├── tailwind.config.js          # Tailwind CSS theme, breakpoints, and soft shadow utilities
├── vite.config.js              # Vite bundler configuration
├── src/
│   ├── config.js               # Global site configuration, developer bio & game toggle
│   ├── index.css               # Global Tailwind directives & reduced-motion rules
│   ├── main.jsx                # React root mount
│   ├── App.jsx                 # App layout & section aggregator
│   ├── components/             # Reusable & section UI components
│   │   ├── SectionHeader.jsx   # Consistent section titles and badges
│   │   ├── Navbar.jsx          # Sticky nav with mobile drawer & game trigger
│   │   ├── About.jsx           # Hero intro, value props, stats & photo card
│   │   ├── Skills.jsx          # Grouped technical skill tags with category filter
│   │   ├── Projects.jsx        # Project showcases & category filters
│   │   ├── ProjectCard.jsx     # Individual project card with Live Demo button
│   │   ├── Experience.jsx      # Work experience timeline
│   │   ├── Education.jsx       # Academic background & coursework
│   │   ├── Training.jsx        # Certifications and verified credentials
│   │   ├── Achievements.jsx    # Hackathons, open-source impact & honors
│   │   ├── Contact.jsx         # Front-end validated contact form & social links
│   │   ├── Footer.jsx          # Semantic footer with navigation & scroll-to-top
│   │   └── SnakeGameModal.jsx  # Canvas-based 2D retro Snake mini-game
│   └── data/                   # Modular content data files
│       ├── projects.js         # Project cards data
│       ├── skills.js           # Grouped technical skills data
│       ├── experience.js       # Career history data
│       ├── education.js        # Education data
│       ├── training.js         # Training and certification data
│       ├── achievements.js     # Honors and milestones data
│       └── socials.js          # Social network profiles
└── README.md                   # Documentation, setup & Vercel deployment guide
```

---

## 🛠️ Customization Guide

### How to Add a New Project
All projects are stored in `src/data/projects.js`. To add a new project, open `src/data/projects.js` and add a new object to the `projectsData` array:

```javascript
{
  id: "my-new-app",
  title: "AI Semantic Search Engine",
  category: "Full-Stack & AI",
  summary: "High-speed vector search pipeline built with FastAPI and React.",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  tags: ["Python", "FastAPI", "React", "Qdrant", "Tailwind CSS"],
  liveDemoUrl: "https://your-demo-url.com",
  repoUrl: "https://github.com/yourusername/project-repo",
  featured: true
}
```

### How to Disable / Enable the Mini-Game
You can enable or disable the retro Snake arcade modal with a single boolean flag in `src/config.js`:

```javascript
export const CONFIG = {
  // Set to false to hide all game buttons and disable modal
  ENABLE_GAME: false,
  // ...
};
```

---

## 🚢 Deploying to Vercel

### Method 1: Git Integration (Recommended)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** &rarr; **"Project"**.
3. Import your repository.
4. Vercel automatically detects **Vite** and configures:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **"Deploy"**. Your site will be live on a `*.vercel.app` domain with SSL and global edge CDN in under a minute.

### Method 2: Vercel CLI
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Log in and deploy from project directory:
   ```bash
   vercel
   ```
3. For production release:
   ```bash
   vercel --prod
   ```

---

## ♿ Accessibility & Performance Highlights
- **WCAG Compliant:** Color contrast ratios checked for AA/AAA standards.
- **Motion Safe:** Fully respects `prefers-reduced-motion` to disable animations for users with vestibular sensitivity.
- **Keyboard Navigation:** Focus visible rings on all links, buttons, and form inputs.
- **Fast Bundle:** Zero heavy animation dependencies; pure CSS and native HTML5 Canvas.
