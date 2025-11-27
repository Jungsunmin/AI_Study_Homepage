# Web App Template (Static Frontend)

Pure React + Tailwind template with shadcn/ui baked in. **Use this README as the checklist for shipping static experiences.**

> **Note:** This template includes a minimal `shared/` and `server/` directory with placeholder types to support imported templates. These are just compatibility placeholders - web-static remains a true static-only template without API functionality.

---

## 🤖 AI Development Guide

### Stack Overview
- Client-only routing powered by React + Wouter.
- Design tokens are provided through `client/src/index.css` and `tailwind.config.ts`—keep them intact.

### Component Patterns

```tsx
// Compose pages from shadcn/ui primitives
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="rounded-3xl bg-white p-10 shadow-xl">
      <h1 className="text-4xl font-bold text-slate-900">Launch Quickly</h1>
      <Button size="lg" className="mt-6">Get Started</Button>
    </section>
  );
}
```

### File Structure

```
client/
  public/         ← Static assets copied verbatim to '/'
  src/
    pages/        ← Page-level components
    components/   ← Reusable UI & shadcn/ui
    contexts/     ← React contexts
    hooks/        ← Custom React hooks
    lib/          ← Utility helpers
    App.tsx       ← Routes & top-level layout
    main.tsx      ← React entry point
    index.css     ← global style
server/         ← Placeholder for imported template compatibility
shared/         ← Placeholder for imported template compatibility
  const.ts      ← Shared constants
```

Assets placed under `client/public` are served with aggressive caching, so add a content hash to filenames (for example, `logo.3fa9b2e4.svg`) whenever you replace a file and update its references to avoid stale assets.

Files in `client/public` are available at the root of your site—reference them with absolute paths (`/logo.3fa9b2e4.svg`, `/robots.txt`, etc.) from HTML templates, JSX, or meta tags.

---

## 🎯 Development Workflow

1. **Compose pages** in `client/src/pages/`. Keep sections modular so they can be reused across routes.
2. **Share primitives** via `client/src/components/`—extend shadcn/ui when needed instead of duplicating markup.
3. **Keep styling consistent** by relying on existing Tailwind tokens (spacing, colors, typography).
4. **Fetch external data** with `useEffect` if the site needs dynamic content from public APIs.

---

## 🧱 Tailwind Safeguards

- Preserve the `@layer base` block in `client/src/index.css`; removing it breaks utilities like `border-border`.
- Do not strip values from `theme.extend` in `tailwind.config.ts`—they power the design tokens used in the UI kit.
- Stick to utility classes for responsiveness (mobile-first by default).
## ✅ Launch Checklist
- [ ] UI layout and navigation structure correct, all image src valid.
- [ ] Success + error paths verified in the browser

---

## 🎨 Frontend Best Practices (shadcn-first)

- Prefer shadcn/ui components for interactions to keep a modern, consistent look; import from `@/components/ui/*` (e.g., `button`, `card`, `dialog`).
- Compose Tailwind utilities with component variants for layout and states; avoid excessive custom CSS. Use built-in `variant`, `size`, etc. where available.
- Preserve design tokens: keep the `@layer base` rules in `client/src/index.css`. Utilities like `border-border` and `font-sans` depend on them.
- Consistent design language: use spacing, radius, shadows, and typography via tokens. Extract shared UI into `components/` for reuse instead of copy‑paste.
- Accessibility and responsiveness: keep visible focus rings and ensure keyboard reachability; design mobile‑first with thoughtful breakpoints.
- Theming: Choose dark/light theme to start with for ThemeProvider according to your design style (dark or light bg), then manage colors pallette with CSS variables in `client/src/index.css` instead of hard‑coding to keep global consistency;
- Micro‑interactions and empty states: add motion, empty states, and icons tastefully to improve quality without distracting from content.
- Navigation: Design clear and intuitive navigation structure appropriate for the app type (e.g., top/side nav for multi-page apps, breadcrumbs or contextual navigation for SPAs)'. When building dashboard-like experience, use sidebar-nav to keep all page entry easy to access.

**React component rules:**
- Never call setState/navigation in render phase → wrap in `useEffect`

---

## Common Pitfalls

### Infinite loading loops from unstable references
**Anti-pattern:** Creating new objects/arrays in render that are used as query inputs
```tsx
// ❌ Bad: New Date() creates new reference every render → infinite queries
const { data } = trpc.items.getByDate.useQuery({
  date: new Date(), // ← New object every render!
});

// ❌ Bad: Array/object literals in query input
const { data } = trpc.items.getByIds.useQuery({
  ids: [1, 2, 3], // ← New array reference every render!
});
```

**Correct approach:** Stabilize references with useState/useMemo
```tsx
// ✅ Good: Initialize once with useState
const [date] = useState(() => new Date());
const { data } = trpc.items.getByDate.useQuery({ date });

// ✅ Good: Memoize complex inputs
const ids = useMemo(() => [1, 2, 3], []);
const { data } = trpc.items.getByIds.useQuery({ ids });
```

**Why this happens:** TRPC queries trigger when input references change. Objects/arrays created in render have new references each time, causing infinite re-fetches.

### Navigation dead-ends in subpages
**Problem:** Creating nested routes without escape routes—no header nav, no sidebar, no back button.

**Solution:** Choose navigation based on app structure:
```tsx
// For dashboard/multi-section apps: Use persistent sidebar (from shadcn/ui)
import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar";

<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      {/* Navigation menu items - always visible */}
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    {children}  {/* Page content */}
  </SidebarInset>
</SidebarProvider>

// For linear flows (detail pages, wizards): Use back button
import { useRouter } from "wouter";

const router = useRouter();
<div>
  <Button variant="ghost" onClick={() => router.back()}>
    ← Back
  </Button>
  <ItemDetailPage />
</div>
```

### Dark mode styling without theme configuration
**Problem:** Using dark foreground colors without setting the theme, making text invisible on default light backgrounds.

**Solution:** Set `defaultTheme="dark"` in App.tsx, then update CSS variables in `index.css`:
```tsx
// App.tsx: Set the default theme first
<ThemeProvider defaultTheme="dark">  {/* Applies .dark class to root */}
  <div className="text-foreground bg-background">
    Content  {/* Now uses dark theme CSS variables */}
  </div>
</ThemeProvider>
```

```css
/* index.css: Adjust color palette for dark theme */
.dark {
  --background: oklch(0.145 0 0);  /* Dark background */
  --foreground: oklch(0.985 0 0);  /* Light text */
  /* ... other variables ... */
}
```

---

## Core File References

`client/src/App.tsx`
```tsx
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

```

`client/src/pages/Home.tsx`
```tsx
import React from 'react';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import PortfolioSection from '@/components/PortfolioSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Elements */}
      <ParticleBackground />
      <ScrollProgress />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceTimeline />
        <PortfolioSection />
        <BlogSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer id="footer" className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-serif font-bold">
              Portfolio
            </div>
            <p className="text-primary-foreground/80">
              © 2024 Portfolio. Crafted with passion and purpose.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Privacy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


```

`client/src/main.tsx`
```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

```

`client/src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Minimalist Portfolio Design System */

@layer base {
  :root {
    /* Base colors */
    --background: 0 0% 98%;
    --foreground: 220 15% 15%;

    /* Card system */
    --card: 0 0% 100%;
    --card-foreground: 220 15% 15%;

    /* Primary brand colors */
    --primary: 220 25% 25%;
    --primary-foreground: 0 0% 98%;
    --primary-glow: 220 25% 35%;

    /* Secondary system */
    --secondary: 220 8% 92%;
    --secondary-foreground: 220 15% 15%;

    /* Accent colors */
    --accent: 25 95% 65%;
    --accent-foreground: 220 15% 15%;
    --accent-soft: 25 85% 85%;

    /* Muted system */
    --muted: 220 8% 96%;
    --muted-foreground: 220 8% 45%;

    /* Interactive states */
    --destructive: 0 75% 60%;
    --destructive-foreground: 0 0% 98%;
    
    /* Success/status colors */
    --success: 120 60% 50%;
    --success-foreground: 0 0% 98%;
    --success-soft: 120 60% 95%;
    
    /* Timeline system */
    --timeline-bg: 220 25% 25%;
    --timeline-foreground: 0 0% 98%;
    --timeline-border: 220 20% 35%;
    --timeline-line: 220 25% 25%;
    --timeline-icon-bg: 220 25% 25%;
    --timeline-icon-border: 220 25% 25%;
    --timeline-date: 220 25% 25%;
    
    /* App-specific colors */
    --logo-primary: 220 100% 70%;
    --logo-secondary: 195 100% 70%;
    --app-muted: 0 0% 53%;
    
    --border: 220 8% 88%;
    --input: 220 8% 94%;
    --ring: 220 25% 25%;

    /* Design system tokens */
    --gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)));
    --gradient-accent: linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent-soft)));
    --gradient-subtle: linear-gradient(180deg, hsl(var(--background)), hsl(var(--muted)));
    
    /* Shadows */
    --shadow-elegant: 0 10px 30px -10px hsl(var(--primary) / 0.15);
    --shadow-glow: 0 0 40px hsl(var(--accent) / 0.2);
    --shadow-card: 0 2px 20px -5px hsl(var(--primary) / 0.1);
    
    /* Animations */
    --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-spring: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

    --radius: 0.5rem;

    --sidebar-background: 0 0% 98%;

    --sidebar-foreground: 240 5.3% 26.1%;

    --sidebar-primary: 240 5.9% 10%;

    --sidebar-primary-foreground: 0 0% 98%;

    --sidebar-accent: 240 4.8% 95.9%;

    --sidebar-accent-foreground: 240 5.9% 10%;

    --sidebar-border: 220 13% 91%;

    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    /* Dark mode colors */
    --background: 220 25% 8%;
    --foreground: 0 0% 95%;

    --card: 220 20% 12%;
    --card-foreground: 0 0% 95%;

    --primary: 25 95% 65%;
    --primary-foreground: 220 25% 8%;
    --primary-glow: 25 85% 75%;

    --secondary: 220 15% 20%;
    --secondary-foreground: 0 0% 90%;

    --accent: 25 95% 65%;
    --accent-foreground: 220 25% 8%;
    --accent-soft: 25 85% 25%;

    --muted: 220 15% 15%;
    --muted-foreground: 220 8% 65%;

    --destructive: 0 75% 60%;
    --destructive-foreground: 0 0% 95%;

    /* Success/status colors - dark mode */
    --success: 120 60% 55%;
    --success-foreground: 220 25% 8%;
    --success-soft: 120 30% 20%;
    
    /* Timeline system - dark mode */
    --timeline-bg: 220 15% 30%;
    --timeline-foreground: 0 0% 95%;
    --timeline-border: 220 15% 40%;
    --timeline-line: 220 8% 65%;
    --timeline-icon-bg: 220 8% 65%;
    --timeline-icon-border: 220 8% 75%;
    --timeline-date: 220 8% 75%;
    
    /* App-specific colors - dark mode */
    --logo-primary: 220 100% 70%;
    --logo-secondary: 195 100% 70%;
    --app-muted: 0 0% 53%;

    --border: 220 15% 25%;
    --input: 220 15% 18%;
    --ring: 25 95% 65%;

    /* Dark mode design tokens */
    --gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)));
    --gradient-accent: linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent-soft)));
    --gradient-subtle: linear-gradient(180deg, hsl(var(--background)), hsl(var(--muted)));
    
    --shadow-elegant: 0 10px 30px -10px hsl(0 0% 0% / 0.3);
    --shadow-glow: 0 0 40px hsl(var(--accent) / 0.3);
    --shadow-card: 0 2px 20px -5px hsl(0 0% 0% / 0.2);
  }
}

@layer base {
  * {
    border-color: hsl(var(--border));
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  /* Elegant animations */
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }

  .animate-slide-up {
    animation: slide-up 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .animate-fade-in {
    animation: fade-in 1s ease-out forwards;
  }

  .animate-scale-hover {
    transition: var(--transition-fast);
  }

  .animate-scale-hover:hover {
    transform: scale(1.05);
  }

  /* Gradient backgrounds */
  .bg-gradient-primary {
    background: var(--gradient-primary);
  }

  .bg-gradient-accent {
    background: var(--gradient-accent);
  }

  .bg-gradient-subtle {
    background: var(--gradient-subtle);
  }

  /* Elegant shadows */
  .shadow-elegant {
    box-shadow: var(--shadow-elegant);
  }

  .shadow-glow {
    box-shadow: var(--shadow-glow);
  }

  .shadow-card {
    box-shadow: var(--shadow-card);
  }

  /* Text effects */
  .text-gradient {
    background: var(--gradient-primary);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text-accent-gradient {
    background: var(--gradient-accent);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Smooth transitions */
  .transition-smooth {
    transition: var(--transition-smooth);
  }

  .transition-fast {
    transition: var(--transition-fast);
  }

  .transition-spring {
    transition: var(--transition-spring);
  }

  /* Interactive elements */

  /* Particle background */
  .particles-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: hsl(var(--accent));
    border-radius: 50%;
    animation: particle-float 10s linear infinite;
    opacity: 0.3;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 0 20px hsl(var(--accent) / 0.3);
  }
  50% { 
    box-shadow: 0 0 40px hsl(var(--accent) / 0.6);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes particle-float {
  0% {
    transform: translateY(100vh) translateX(-10px);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100px) translateX(10px);
    opacity: 0;
  }
}


```

