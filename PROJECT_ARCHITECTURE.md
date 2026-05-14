# ZenByteLabs: Industrial SaaS Architecture

This document outlines the technical blueprint, design philosophy, and core logic behind the ZenByteLabs Premium Portfolio.

## 1. Design Philosophy: Industrial SaaS
The project is built on the **Industrial SaaS** aesthetic—a fusion of Swiss minimalism, technical blueprinting, and high-performance digital engineering.
- **Color Palette**: High-contrast Slate and Zinc foundation with surgical Neon Primary (`#00FFD1`) accents.
- **Typography**: Heavily italicized, black weights (900+) with tight tracking to establish a commanding visual hierarchy.
- **Noise / Texture**: A global SVG noise overlay (`.noise`) targets subconscious depth, reducing the "flatness" of standard digital products.

## 2. Technical Stack
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Design Tokens)
- **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis) (Unified Scroll Engine)
- **Animation Hub**: [Framer Motion](https://www.framer.com/motion/) (Component Transitions)
- **Storytelling Engine**: [GSAP](https://gsap.com/) + [ScrollTrigger](https://gsap.com/scrolltrigger/) (Cinematic Pinning)

## 3. Core Logic Modules

### 3.1. Unified Theme Engine (`App.jsx` + `index.css`)
A dual-mode system (ZenBlack / ZenLight) driven by CSS variables.
- **Persistence**: LocalStorage remembers user preference.
- **PostCSS Resolution**: To ensure build stability, custom contrast colors (`--text-main`, `--text-muted`) are handled via native CSS `var()` declarations instead of Tailwind `@apply` during build time.

### 3.2. Global Interaction System
- **Magnetic Cursor**: Interactive elements (buttons, nav links) are wrapped in the `<Magnetic>` component, providing a 0.35 tension attraction to the cursor.
- **Noise Overlay**: A fixed SVG turbulence filter applied over the entire viewport to create an industrial material feel.

### 3.3. Dynamic Dashboard Logic (`PsychologyEngine.jsx`)
A stateful technical dashboard that simulates real-time neural processing.
- **State Management**: React `useState` tracks active tabs (Intent/Behavior/Prediction) and simulates dynamic log feeds.
- **Visual Synthesis**: Framer Motion `AnimatePresence` handles the smooth transition between complex technical visualizations and data charts.

### 3.4. Cinematic Scroll Narrative (`ScrollNarrative.jsx`)
A 4-step horizontal storytelling module using GSAP pinning.
- **Logic**: The vertical scroll is "captured" and translated into horizontal movement based on the exact `scrollWidth` of the narrative track.
- **Calculations**: Uses functional `() =>` values to ensure perfect bounds even after window resizing.

## 4. Component Structure

```text
src/
├── components/
│   ├── Navbar.jsx        # Smart nav with sliding pill active state
│   ├── ThemeToggle.jsx   # Technical switch for color modes
│   ├── Magnetic.jsx      # Framer Motion wrapper for cursor attraction
│   └── CustomCursor.jsx  # Global pointer tracking system
├── sections/
│   ├── Hero.jsx          # Cinematic entry with typing engine
│   ├── About.jsx         # High-density mission statement
│   ├── PsychologyEngine.jsx # Dashboard visualization unit
│   ├── ScrollNarrative.jsx  # GSAP horizontal storytelling
│   ├── Projects.jsx      # Sticky horizontal case studies
│   ├── Process.jsx       # The 'Zen Protocol' vertical timeline
│   └── Contact.jsx       # Conversion-focused technical footer
└── index.css             # Central Design System & Tokens
```

## 5. Performance & Optimization
- **GPU Acceleration**: Key animated tracks use `will-change: transform` to force GPU rendering.
- **Intersecting Logic**: The Navbar uses `IntersectionObserver` with a multi-threshold array to accurately highlight active pages across varying section heights.
- **Scroll Synchronization**: Lenis and GSAP are synchronized using the `raf` (Request Animation Frame) loop to prevent "scroll jank."
