# DESIGN.md — Aejaz Training (Primavera P6 Platform)
*Generated according to OpenDesign Specification Protocol*

## 1. Visual Theme & Brand Archetype
- **Archetype**: High-Trust Industrial & Engineering Education.
- **Mood**: Authoritative, precise, modern, high-craft dark mode.
- **Reference Dial Settings**:
  - *Density*: Compact to Balanced (data & engineering focus).
  - *Contrast*: High (pure dark backgrounds with luminous warm gold accents).
  - *Elevation*: Flat & Subtle Border (1px borders with 5-10% white alpha; no heavy drop-shadows).

## 2. Color Palette & Surface Tokens
```css
:root {
  /* Surfaces */
  --bg-canvas: #050505;          /* Deep obsidian canvas */
  --bg-surface: #0c0c0e;         /* Elevated card surface */
  --bg-surface-hover: #141417;   /* Interactive hover state */
  --bg-surface-elevated: #1a1a1f;/* Modals and floating menus */
  
  /* Borders */
  --border-subtle: #222226;      /* Default dividing lines */
  --border-strong: #33333b;      /* Focused / active element borders */
  --border-gold: rgba(234, 179, 8, 0.3);

  /* Primary Brand (Industrial Gold) */
  --primary: #eab308;            /* Golden amber */
  --primary-hover: #ca8a04;      /* Deep gold */
  --primary-glow: rgba(234, 179, 8, 0.15);

  /* Typography */
  --text-primary: #f4f4f5;       /* Primary headlines and high contrast */
  --text-secondary: #a1a1aa;     /* Body text and module items */
  --text-muted: #71717a;         /* Captions, labels, timestamps */

  /* Semantic Alerts */
  --status-success: #22c55e;
  --status-warning: #f59e0b;
  --status-danger: #ef4444;
}
```

## 3. Typography Hierarchy
- **Display / Headings**: `Outfit`, sans-serif. Tight negative letter-spacing (`-0.03em`), heavier weights (700, 800), balanced line wraps (`text-wrap: balance`).
- **Body & UI**: `Inter`, system-ui. Relaxed line-height (`1.6`), Medium (500) and Regular (400) weights.
- **Tabular / Monospace**: Tabular figures enabled (`font-variant-numeric: tabular-nums`) for video durations, roll numbers, and dates.

## 4. Craft & Anti-AI-Slop Rules
1. **No generic AI purple or ungrounded mesh gradients**: Strictly maintain deep obsidian, dark zinc, and warm amber gold tones.
2. **No emoji icons**: All icons must use sharp, consistent Lucide SVG icons with `strokeWidth={1.8}`.
3. **No 5-card or incomplete grids**: Bento grids must resolve into balanced 2x3 or 3x2 alignments.
4. **Accent restraint**: The gold accent is reserved for primary CTAs, active lesson markers, and crucial credentials (max 2 focal points per viewport).

## 5. Motion Discipline (Emil Kowalski Principles)
- **Spring Curves**:
  - Buttons & Cards: `type: "spring", stiffness: 400, damping: 30`
  - Modal / Sheet Overlays: `type: "spring", stiffness: 300, damping: 25`
  - Accordion / Dropdowns: `duration: 0.25, ease: [0.16, 1, 0.3, 1]`
- **Tactile Feedback**:
  - Tap states scale down gently to `0.98` (`whileTap={{ scale: 0.98 }}`).
  - Hover states lift slightly with border brightness increase rather than excessive glow.
- **Accessibility**:
  - Honor `prefers-reduced-motion` across all animated sections.

## 6. Security & Authorization UX
- **Student Video Player**:
  - Watermarked overlay (subtle dynamic user ID & timestamp) to discourage unauthorized screen redistribution.
  - Clear unauthorized access state: informative lock screen explaining how to contact admin for enrollment.
- **Rate-Limiting UX**:
  - Progressive backoff notification when login attempts exceed threshold.
