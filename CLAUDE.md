# PLAN.md — "ML Explorer" Build Blueprint
### Stack: React (Vite) + TypeScript + Tailwind CSS + shadcn/ui + supporting libs

This is the full engineering blueprint to turn `ML-Website-Plan.md` into a real, running site.
Read top to bottom once, then use it as a checklist while building.

---

## 0. Stack Decision Summary

| Layer | Choice | Why |
|---|---|---|
| Framework | **React 18 + Vite** | Fast dev server, no need for Next.js SSR since this is a static assignment site |
| Language | **TypeScript** | Catches bugs in the interactive widgets (lots of math/state) |
| Styling | **Tailwind CSS** | Utility classes, pairs natively with shadcn |
| Components | **shadcn/ui** | Accessible, unstyled-but-themeable primitives (Tabs, Card, Dialog, Slider, Tooltip, Progress) |
| Routing | **react-router-dom v6** | Standard client-side routing for the 5 pages |
| Animation | **Framer Motion** | Scroll reveals, page transitions, drag-and-drop physics |
| Canvas/SVG viz | **D3.js** (scales/math only, not D3-DOM) + raw `<svg>`/`<canvas>` | Full control for K-Means, scatterplot, dendrogram |
| Math rendering | **KaTeX** (`react-katex`) | Render `y = a + bx + e`, Pearson's r formula cleanly |
| Icons | **lucide-react** | Ships with shadcn, consistent icon set |
| State (light) | **Zustand** | Small global store for quiz score / progress tracker across pages |
| Drag & drop | **@dnd-kit/core** | Powers the waste-sorting game (accessible, modern) |
| Charts (optional) | **Recharts** | If you want quick static charts instead of hand-rolled SVG |
| Deployment | **Vercel / Netlify / GitHub Pages** | Any static host works, it's a Vite SPA |

---

## 1. Project Setup Commands

```bash
npm create vite@latest ml-explorer -- --template react-ts
cd ml-explorer

npm install react-router-dom framer-motion d3 katex react-katex \
  zustand @dnd-kit/core @dnd-kit/utilities lucide-react recharts clsx tailwind-merge

npm install -D tailwindcss postcss autoprefixer @types/d3
npx tailwindcss init -p

# shadcn/ui setup
npx shadcn@latest init
npx shadcn@latest add button card tabs badge tooltip slider progress \
  dialog separator accordion sheet navigation-menu toast
```

---

## 2. Full File Structure

```
ml-explorer/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   │
│   ├── router/
│   │   └── routes.tsx
│   │
│   ├── layout/
│   │   ├── RootLayout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProgressDots.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── TypesOfMlPage.tsx
│   │   ├── SupervisedPage.tsx
│   │   ├── UnsupervisedPage.tsx
│   │   ├── PlaygroundPage.tsx
│   │   └── ReferencesPage.tsx
│   │
│   ├── components/
│   │   ├── ui/                        # shadcn generated components live here
│   │   │
│   │   ├── shared/
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── ScrollReveal.tsx       # wraps children in Framer Motion viewport animation
│   │   │   ├── FormulaBlock.tsx       # KaTeX wrapper
│   │   │   ├── CodeBlock.tsx          # syntax-highlighted python snippets
│   │   │   ├── StepTimeline.tsx       # generic numbered-steps component
│   │   │   ├── IconGrid.tsx           # applications grids (icon + label)
│   │   │   └── InfoCard.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroBackgroundCanvas.tsx  # animated floating dots/neural-net bg
│   │   │   └── TeaserCards.tsx
│   │   │
│   │   ├── types-of-ml/
│   │   │   ├── MLTriangleDiagram.tsx     # interactive SVG triangle
│   │   │   ├── MLTypeDetailPanel.tsx     # side panel that expands on vertex click
│   │   │   └── ComparisonTable.tsx
│   │   │
│   │   ├── supervised/
│   │   │   ├── regression/
│   │   │   │   ├── CorrelationExplainer.tsx
│   │   │   │   ├── CorrelationScatterDemo.tsx   # draggable points, live r
│   │   │   │   ├── PearsonFormula.tsx
│   │   │   │   ├── PearsonCalculator.tsx        # editable table -> computes r
│   │   │   │   ├── RegressionLineDemo.tsx       # scatter + draggable best-fit line
│   │   │   │   ├── LinearRegressionTypes.tsx    # simple vs multiple toggle cards
│   │   │   │   └── RegressionApplications.tsx
│   │   │   │
│   │   │   └── classification/
│   │   │       ├── WasteSortGame.tsx            # dnd-kit drag & drop game
│   │   │       ├── WasteBin.tsx
│   │   │       ├── DraggableWasteItem.tsx
│   │   │       ├── ClassificationGraphQuiz.tsx  # "which graph is classification"
│   │   │       ├── ClassificationStepper.tsx
│   │   │       ├── ClassificationTypesTable.tsx
│   │   │       ├── KnnBeforeAfterToggle.tsx
│   │   │       ├── KnnInteractiveDemo.tsx       # click canvas -> highlight K neighbors
│   │   │       └── KnnProsConsTable.tsx
│   │   │
│   │   ├── unsupervised/
│   │   │   ├── FruitClusterAnimation.tsx        # image group animates by color/size
│   │   │   ├── ClusteringStepper.tsx
│   │   │   ├── ClusteringTypeTabs.tsx           # partitioning/density/dist/hierarchical
│   │   │   ├── KMeansPlayground.tsx             # canvas, Step/Play/Reset buttons
│   │   │   ├── DendrogramAnimation.tsx
│   │   │   └── ClusteringApplications.tsx
│   │   │
│   │   └── playground/
│   │       ├── QuizEngine.tsx
│   │       ├── QuizQuestionCard.tsx
│   │       ├── GameCard.tsx
│   │       └── DrawBestFitLineGame.tsx
│   │
│   ├── data/                          # ALL PDF content lives here as typed data, not hardcoded in JSX
│   │   ├── mlTypes.ts
│   │   ├── correlationTypes.ts
│   │   ├── pearsonExample.ts          # the Age/Weight table from pg.104
│   │   ├── regressionApplications.ts
│   │   ├── classificationTypes.ts
│   │   ├── wasteItems.ts              # item name, correct bin, icon
│   │   ├── knnSteps.ts
│   │   ├── clusteringMethods.ts
│   │   ├── kmeansApplications.ts
│   │   ├── quizQuestions.ts
│   │   └── references.ts              # video links from pg.109/113
│   │
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   ├── useDraggablePoint.ts       # shared drag logic for scatter/regression demos
│   │   └── useKMeans.ts               # pure algorithm hook (runs the k-means math)
│   │
│   ├── lib/
│   │   ├── math/
│   │   │   ├── pearson.ts             # computes r from x[],y[]
│   │   │   ├── leastSquares.ts        # slope/intercept calc
│   │   │   └── kmeans.ts              # k-means algorithm (assign + recompute centroid steps)
│   │   ├── utils.ts                   # cn() helper (shadcn default)
│   │   └── constants.ts               # colors, breakpoints, animation durations
│   │
│   └── store/
│       └── progressStore.ts           # zustand: tracks quiz score + pages visited
│
├── tailwind.config.ts
├── components.json                    # shadcn config
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 3. Routing (`src/router/routes.tsx`)

```tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import HomePage from "@/pages/HomePage";
import TypesOfMlPage from "@/pages/TypesOfMlPage";
import SupervisedPage from "@/pages/SupervisedPage";
import UnsupervisedPage from "@/pages/UnsupervisedPage";
import PlaygroundPage from "@/pages/PlaygroundPage";
import ReferencesPage from "@/pages/ReferencesPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/types-of-ml", element: <TypesOfMlPage /> },
      { path: "/supervised", element: <SupervisedPage /> },
      { path: "/unsupervised", element: <UnsupervisedPage /> },
      { path: "/playground", element: <PlaygroundPage /> },
      { path: "/references", element: <ReferencesPage /> },
    ],
  },
]);
```
`App.tsx` just renders `<RouterProvider router={router} />`.

---

## 4. Page-by-Page File Detail

### 4.1 `layout/RootLayout.tsx`
Wraps every page: `<Navbar />` + `<Outlet />` + `<Footer />` + `<ProgressDots />` (shows which of the 5 pages you're on, updates via `useLocation()`). Wrap `<Outlet />` in a Framer Motion `AnimatePresence` for smooth page-transition fades.

### 4.2 `layout/Navbar.tsx`
- shadcn `NavigationMenu` for desktop, `Sheet` (slide-out drawer) for mobile.
- Links: Home / Types / Supervised / Unsupervised / Playground / References.
- Sticky, blurred background on scroll (`backdrop-blur` + scroll listener).

### 4.3 `pages/HomePage.tsx`
- `<Hero />`: full-viewport section, gradient background, `<HeroBackgroundCanvas />` (canvas with slowly drifting dots connected by lines when close — a cheap "neural net" ambience effect, ~60 lines of canvas code, no library needed).
- `<TeaserCards />`: 3 shadcn `Card`s (Supervised / Unsupervised / Reinforcement), each with a Lucide icon, one-line hook from `data/mlTypes.ts`, and a "Learn more →" link using React Router `<Link>`.

### 4.4 `pages/TypesOfMlPage.tsx`
- `<MLTriangleDiagram />`: SVG triangle with 3 clickable vertices (`<polygon>`/`<path>` per type, colored per PDF: green=supervised, orange=unsupervised, blue=reinforcement). On click, `useState<'supervised'|'unsupervised'|'reinforcement'|null>` drives `<MLTypeDetailPanel />` which slides in via Framer Motion with the bullet points (Labeled data / Direct feedback / Predict outcome, etc. — pulled from `data/mlTypes.ts`).
- `<ComparisonTable />`: shadcn `Table` — Task-driven vs Data-driven columns, straight from pg.102's "Classical Machine Learning" diagram.

### 4.5 `pages/SupervisedPage.tsx`
- Local state `activeTab: 'regression' | 'classification'` rendered with shadcn `Tabs` (sticky sub-nav under the main navbar).
- **Regression tab** renders, in order:
  1. `CorrelationExplainer` (text) + `CorrelationScatterDemo` (draggable dots, live-updating Pearson r pulled from `lib/math/pearson.ts`, badge shows "Positive / Negative / Zero" based on sign & magnitude thresholds)
  2. `PearsonFormula` (KaTeX) + `PearsonCalculator` (editable `<input>` grid recreating the Age/Weight table from pg.104 — every keystroke recalculates r live using `pearson.ts`)
  3. `RegressionLineDemo` (SVG scatter, a draggable line the user can tilt/move, shows live residual lines + sum-of-squares score, "Fit it for me" button snaps to the real least-squares line via `leastSquares.ts`)
  4. `LinearRegressionTypes` (Simple vs Multiple toggle cards)
  5. `RegressionApplications` (`IconGrid`: Market Analysis, Sales Forecasting, Salary Prediction, Sports, Medical)
  6. `CodeBlock` with the Python snippet from pg.108–109, syntax highlighted (use `react-syntax-highlighter` or Shiki if you want zero extra deps, plain `<pre><code>` + Tailwind `prose` styling is fine too)
- **Classification tab** renders:
  1. `WasteSortGame` — `@dnd-kit` `DndContext`, 6 `WasteBin` drop zones (Paper/Metal/Plastic/E-waste/Glass/Organic), ~12 `DraggableWasteItem`s pulled from `data/wasteItems.ts`. On correct drop → bin flashes green + item disappears; wrong drop → item bounces back (Framer Motion spring). Track score in `progressStore`.
  2. `ClassificationGraphQuiz` — renders the two static graphs from pg.110 as SVGs, user clicks the one they think is classification, reveals correct answer with explanation.
  3. `ClassificationStepper` — `StepTimeline` component walking through Classes→Features→Training Data→Model→Prediction.
  4. `ClassificationTypesTable` — Binary/Multi-Class/Multi-Label/Imbalanced table.
  5. `KnnBeforeAfterToggle` — a switch/tab that swaps between two SVG states (before/after assignment) with a crossfade.
  6. `KnnInteractiveDemo` — canvas with ~15 fixed "Category A/B" points; user clicks anywhere to drop a "new point"; component computes Euclidean distance to all points, highlights the K nearest (K controlled by a shadcn `Slider`), shows the majority-vote result.
  7. `KnnProsConsTable`.

### 4.6 `pages/UnsupervisedPage.tsx`
1. `FruitClusterAnimation` — a grid of fruit icons (emoji or small SVGs) that re-arrange into groups when you click "Group by Color" vs "Group by Size" buttons — animate positions with Framer Motion `layout` prop (this is genuinely just a few lines with `layout` animations, very satisfying payoff).
2. `ClusteringStepper` — Prepare Data → Similarity Metrics → Run Algorithm → Interpret.
3. `ClusteringTypeTabs` — shadcn `Tabs`: Partitioning / Density-Based / Distribution-Based / Hierarchical, each swapping in its SVG diagram + description from `data/clusteringMethods.ts`.
4. `KMeansPlayground` — the flagship interactive:
   - Canvas or SVG with N random points.
   - Buttons: **Reset**, **Step**, **Auto-Play**.
   - Uses `useKMeans` hook wrapping `lib/math/kmeans.ts` (pure functions: `assignPointsToCentroids`, `recomputeCentroids`, `hasConverged`).
   - Each "Step" click re-renders with animated centroid movement (Framer Motion `animate` on cx/cy) and recolored points.
   - Small text readout: "Iteration 3 — 2 points reassigned."
5. `DendrogramAnimation` — SVG tree that draws itself branch by branch on scroll into view (use `ScrollReveal` + staggered `pathLength` animation on `<line>`/`<path>` elements).
6. `ClusteringApplications` — `IconGrid`.

### 4.7 `pages/PlaygroundPage.tsx`
- `QuizEngine` reads `data/quizQuestions.ts`, renders one `QuizQuestionCard` at a time (shadcn `Card` + `RadioGroup`), tracks score in `progressStore`, shows a results summary + shadcn `Progress` bar at the end.
- Game cards (`GameCard`) linking/scrolling to: Waste Sorter, Guess-the-Correlation (reuse `CorrelationScatterDemo` in "quiz mode"), Cluster-It-Yourself (reuse `KMeansPlayground` with user-placed points instead of random), and `DrawBestFitLineGame` (reuse regression line demo, but score the user's manual line against the real least-squares fit).

### 4.8 `pages/ReferencesPage.tsx`
Simple page reading `data/references.ts` — renders the 4 YouTube links (pg.109) + Classification/KNN videos (pg.113) + tool links (Teachable Machine, Visualise K-Means) as a shadcn `Card` list with icons.

---

## 5. Data Layer Examples

Keep **all PDF text/content out of components** — components should just receive props/import data. This makes edits trivial later.

```ts
// src/data/mlTypes.ts
export const mlTypes = [
  {
    id: "supervised",
    label: "Supervised Learning",
    color: "#22c55e",
    tagline: "Learns from labeled data.",
    bullets: ["Labeled data", "Direct feedback", "Predict outcome/future"],
    examples: ["Linear regression", "Decision trees", "SVM", "Neural networks"],
  },
  {
    id: "unsupervised",
    label: "Unsupervised Learning",
    color: "#f97316",
    tagline: "Finds hidden structure in unlabeled data.",
    bullets: ["No labels", "No feedback", "Find hidden structure"],
    examples: ["K-means", "Hierarchical clustering", "PCA", "Autoencoders"],
  },
  {
    id: "reinforcement",
    label: "Reinforcement Learning",
    color: "#3b82f6",
    tagline: "Learns via trial, error, and reward.",
    bullets: ["Decision process", "Reward system", "Learn series of actions"],
    examples: ["Q-learning", "Deep Q-networks", "Policy gradients"],
  },
] as const;
```

```ts
// src/lib/math/pearson.ts
export function pearsonR(x: number[], y: number[]): number {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, xi, i) => a + xi * y[i], 0);
  const sumX2 = x.reduce((a, xi) => a + xi * xi, 0);
  const sumY2 = y.reduce((a, yi) => a + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2)
  );
  return denominator === 0 ? 0 : numerator / denominator;
}
```

```ts
// src/lib/math/kmeans.ts
export type Point = { x: number; y: number };

export function assign(points: Point[], centroids: Point[]) {
  return points.map((p) => {
    let best = 0, bestDist = Infinity;
    centroids.forEach((c, i) => {
      const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2;
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best; // cluster index
  });
}

export function recomputeCentroids(points: Point[], assignments: number[], k: number): Point[] {
  return Array.from({ length: k }, (_, i) => {
    const cluster = points.filter((_, idx) => assignments[idx] === i);
    if (!cluster.length) return { x: Math.random() * 400, y: Math.random() * 300 };
    const x = cluster.reduce((a, p) => a + p.x, 0) / cluster.length;
    const y = cluster.reduce((a, p) => a + p.y, 0) / cluster.length;
    return { x, y };
  });
}
```

---

## 6. Shared/Reusable Components Worth Building First

Build these before the page-specific ones — everything else depends on them:

1. **`ScrollReveal.tsx`** — wraps any children, animates opacity/translateY when scrolled into view (Framer Motion `whileInView`). Used on nearly every section.
2. **`FormulaBlock.tsx`** — thin wrapper around `react-katex`'s `<BlockMath math={...} />` with consistent padding/background.
3. **`StepTimeline.tsx`** — takes `steps: {title, description}[]`, renders a vertical numbered timeline (used for KNN steps, K-Means steps, Classification "how it works").
4. **`IconGrid.tsx`** — takes `{icon, label}[]`, renders a responsive grid of shadcn `Card`s. Used for every "Applications of X" section.
5. **`SectionHeading.tsx`** — consistent `<h2>` + optional subtitle + accent underline, used at the top of every section across all pages.

---

## 7. Theming (`tailwind.config.ts` + shadcn tokens)

- Pick 3 accent colors matching the PDF triangle: green (`#22c55e` supervised), orange (`#f97316` unsupervised), blue (`#3b82f6` reinforcement) — reuse these consistently as color-coding across the whole site (badges, page underlines, icons) so users subconsciously learn "green = supervised" etc.
- Use shadcn's default neutral base (`zinc` or `slate`) for backgrounds/text so the 3 accents pop.
- Add a custom font pairing in `index.css` (e.g., a geometric sans for headings + a readable sans for body) via `@font-face` or Google Fonts import.

---

## 8. Suggested Build Order (Sprints)

1. **Sprint 1 — Skeleton:** Vite + Tailwind + shadcn init, routing, Navbar/Footer/RootLayout, all 6 pages exist with placeholder text.
2. **Sprint 2 — Content pass:** Fill every page with real content from `data/*.ts`, static (no interactivity yet) — gives you a submittable version early.
3. **Sprint 3 — Core interactives:** `MLTriangleDiagram`, `WasteSortGame`, `CorrelationScatterDemo`.
4. **Sprint 4 — Advanced interactives:** `KMeansPlayground`, `KnnInteractiveDemo`, `RegressionLineDemo`.
5. **Sprint 5 — Polish:** ScrollReveal everywhere, page transitions, ProgressDots, mobile responsiveness pass, `PlaygroundPage` quiz.
6. **Sprint 6 — Deploy:** `npm run build`, deploy to Vercel/Netlify, test on mobile.

---

## 9. Nice-to-have Stretch Goals
- Dark mode via shadcn's built-in theme toggle (`next-themes` even without Next.js works fine, or a simple class-based toggle).
- Save quiz progress to `localStorage` via the Zustand `persist` middleware.
- Add a "Chapter complete" confetti burst (`canvas-confetti` package) when a user finishes all 4 games in Playground.