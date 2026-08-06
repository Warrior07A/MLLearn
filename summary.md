# ML-GUIDE: Developer Onboarding & Architecture Summary

Welcome to the **ML-GUIDE** repository! This document serves as the ultimate onboarding guide for any new developer or AI agent joining the project. It provides a complete overview of the codebase, the technical direction, and how to navigate the architecture.

## 1. Project Overview & Direction

**ML-GUIDE** is an interactive, educational web application designed to teach the fundamentals of Machine Learning (ML) without requiring a deep background in math or coding. The project's core philosophy is **learning by doing** — allowing users to build intuition through highly visual, interactive, and beautifully designed demonstrations.

**Current Direction**: The platform has evolved into a highly premium experience featuring a global 3D neural network background (powered by Three.js), dynamic Glassmorphism styling, and interactive drag-and-drop games. The goal is to continue expanding the interactive demos while maintaining this "wow-factor" presentation layer.

---

## 2. Getting Started (How to Navigate the Codebase)

If you're new to the project, here is how you get up and running, and where to look first.

### Quick Start
The project uses [Bun](https://bun.sh/) as its runtime and package manager.
- **Install dependencies**: `bun install`
- **Run the dev server**: `bun run dev` (Runs locally with Hot Module Replacement)
- **Build for production**: `bun run build.ts` (Outputs to `dist/`)

### Flow of Control
When you start the application, here is how the data flows:
1. **Entry Point (`src/index.ts`)**: Bun starts a lightning-fast HTTP server that serves `index.html`.
2. **React Bootstrapping (`src/frontend.tsx`)**: Mounts the React app into the DOM.
3. **Router (`src/router/routes.tsx`)**: React Router matches the URL to a specific Page component.
4. **Global Layout (`src/layout/RootLayout.tsx`)**: Every page is wrapped in `RootLayout`. This is a critical file! It renders the global 3D Three.js canvas in the background, the interactive Navbar on top, and manages the Framer Motion page transition animations.
5. **Page Rendering (`src/pages/*`)**: Pages themselves are "thin". They don't contain heavy logic; they simply compose feature components.

---

## 3. Tech Stack

| Domain | Technology | Purpose |
|---|---|---|
| **Runtime & Build** | **Bun** | Extremely fast JS runtime, package manager, and bundler. |
| **Framework** | **React 19** | UI Library. Uses strict mode and modern hooks. |
| **Styling** | **Tailwind CSS v4** | Utility-first styling. We use OKLCH color spaces and a custom global theme (`styles/globals.css`). |
| **3D Rendering** | **Three.js + React Three Fiber** | Powers the interactive, floating neural network nodes in the background. |
| **Animations** | **Framer Motion** | Used for smooth page transitions (`AnimatePresence`) and scroll-reveal effects (`<ScrollReveal>`). |
| **UI Components** | **Radix UI** | Headless primitives (shadcn-style) for accessible components like Tooltips, Tabs, and Sheets. |
| **State Management**| **Zustand** | Global state management (e.g., tracking quiz scores and themes), persisted to `localStorage`. |
| **Data Viz & Math** | **D3.js, Recharts, KaTeX** | Used for scatter plots, dendrograms, and rendering complex ML formulas. |

---

## 4. Directory Structure Map

```text
ML-GUIDE/
├── src/
│   ├── components/       # (Core building blocks)
│   │   ├── home/         # Hero3DCanvas (Three.js background), TeaserCards
│   │   ├── playground/   # QuizEngine, GameCards
│   │   ├── shared/       # ScrollReveal, SectionHeading, IconGrid (Highly reusable UI)
│   │   ├── supervised/   # Regression plots, KNN demos, WasteSortGame
│   │   ├── unsupervised/ # K-Means canvas logic, dendrograms
│   │   └── ui/           # Radix primitives (Button, Tabs, Tooltip, etc.)
│   │
│   ├── data/             # (Pure Data Layer) 
│   │                     # Contains static TS definitions (quiz questions, mlTypes, references) to keep UI components clean.
│   │
│   ├── layout/           # (Global Layouts)
│   │                     # RootLayout (contains the 3D Canvas), Navbar (Glassmorphic), Footer
│   │
│   ├── lib/              # (Utilities & Math)
│   │   ├── math/         # Pure functions for K-Means, Least Squares, Pearson math.
│   │   └── utils.ts      # Tailwind merge helpers (`cn()`).
│   │
│   ├── pages/            # (Route Targets)
│   │                     # Thin orchestrators like HomePage, SupervisedPage, etc.
│   │
│   ├── router/           # React Router configuration
│   └── store/            # Zustand stores (themeStore, progressStore)
│
├── styles/               # globals.css (Contains CSS variables for Light/Dark mode)
└── build.ts              # Production build script
```

---

## 5. Global State & Theming

### Zustand State (`src/store/`)
- `progressStore.ts`: Tracks the user's progress through quizzes and games. Persisted to `localStorage` so they don't lose their score.
- `themeStore.ts`: Tracks whether the user is in `light` or `dark` mode. 

### Theming System
- **Dark Mode**: Toggling the theme adds the `.dark` class to the `document.documentElement`.
- **CSS Variables**: `styles/globals.css` defines `--background`, `--foreground`, and ML paradigm accent colors (`--supervised` for green, `--unsupervised` for orange, etc.).
- **3D Canvas Adaptability**: The `Hero3DCanvas.tsx` component automatically reads from the `themeStore` to change the color of the 3D nodes (bright green in dark mode, dark emerald in light mode) without needing a page reload.

---

## 6. How to Contribute

When adding a new feature, follow the established conventions to keep the codebase clean:

### Adding a New Page
1. Create a new `Page` file in `src/pages/`. Keep it thin.
2. Add the route to `src/router/routes.tsx`.
3. Add a navigation link in `src/layout/Navbar.tsx`.
4. Wrap the page content in `<ScrollReveal>` and use `<SectionHeading>` to maintain visual consistency.

### Adding an Interactive ML Demo
1. **Math goes in `lib/math`**: If your demo requires an algorithm (like K-Means or a linear regression calculation), write it as a pure, side-effect-free function in `src/lib/math/`. This makes it highly testable.
2. **Data goes in `data/`**: Any static datasets, step-by-step instructions, or quiz configurations should go in a TypeScript file in `src/data/`.
3. **Build the component in `components/`**: Import the math logic and data into your React component.

### Working with the 3D Background
The global 3D background lives in `src/components/home/Hero3DCanvas.tsx` and is rendered inside `RootLayout.tsx`. 
- It uses `@react-three/fiber` for React integration.
- The 3D scene spans the entire page with `fixed inset-0 pointer-events-none`.
- If you need to add elements that interact with the mouse, remember to use `useRef` to track coordinates to prevent performance-killing React re-renders, as demonstrated in the current parallax implementation.
