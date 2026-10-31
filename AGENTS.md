# Design & Engineering Guidelines (OpenDesign Integration)

This workspace integrates **OpenDesign** (`nexu-io/open-design`) skills, design systems, and craft standards.

## Active Skills & Location
- Skills are discovered in `.agents/skills/`:
  - `taste-skill` (`design-taste-frontend`): Anti-slop frontend direction, design reads, 3 dials (density, contrast, elevation).
  - `redesign-skill` (`redesign-existing-projects`): UI audit and upgrade workflow for existing projects.
  - `design-brief`: Structured design brief parsing and `DESIGN.md` generation.
  - `emil-design-eng`: Emil Kowalski's physics, micro-interactions, spring curves, and motion polish.
  - `ui-animation` & `motion-design`: Motion choreography, timing, and accessibility (`prefers-reduced-motion`).
  - `brandkit`: Token definitions and brand systems.
  - `shadcn-ui`: Accessible, clean Tailwind component styling.
  - `web-design-guidelines`: Web interface guidelines compliance.

## Craft Constraints (Anti-AI-Slop)
When creating or modifying UI components, follow `.agents/craft/`:
1. **No generic AI defaults**:
   - Avoid generic indigo/purple gradients (`#6366f1`, etc.) on dark meshes.
   - Avoid generic 3-equal-card bento grids with glowing borders.
   - Avoid emojis as feature icons; use clean, consistent Lucide SVG icons.
2. **Typography**:
   - Use intentional hierarchy, negative letter-spacing for large display titles (`tracking-tight`), and balanced line wraps (`text-wrap: balance` / `text-wrap: pretty`).
3. **Color & Surfaces**:
   - Limit accent color usage to at most 1–2 key focal points per viewport.
   - Use tinted darks or warm off-whites rather than pure stark `#000000` or `#ffffff`.
4. **Motion Discipline**:
   - Snappy spring physics for interactions (e.g. `damping: 25`, `stiffness: 300`).
   - Always honor `prefers-reduced-motion`.
