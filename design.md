# Design System 

> Extracted from the Home, About, Work, and Resume pages.
> All new and redesigned pages **must** follow this document.

---

## 1. Layout Foundations

### Page Wrapper
Every page uses the same top/bottom spacing formula:

```
pt-[calc(var(--header-height)+clamp(2rem,8vh,5rem))]
pb-[clamp(5rem,14vh,10rem)]
```

- `--header-height` is `4.5rem` (72 px).
- Content is never full-bleed; it lives inside **`px-5 md:px-10`**.

### Container Wrapper
To maintain visual hierarchy and prevent scattering across large displays (such as 1440px, 1920px, 2560px, and 4K ultra-wide monitors), every page wraps its content inside a standard max-width container:

```tsx
<div className="max-w-7xl mx-auto">
  {/* Content Sections */}
</div>
```

The header and subfooter bars also constrain their interior navigation elements using `max-w-7xl mx-auto px-5 md:px-10` to keep brand identity and navigation pinned in alignment with the page boundaries.

### Grid System
The site uses a fluid **12-column CSS Grid** via Tailwind:

```
grid md:grid-cols-12 md:gap-8
```

Common column spans:
| Pattern | Usage |
|---|---|
| `md:col-span-4` + `md:col-span-7 md:col-start-6` | Story rows, experience rows (left label, right body) |
| `md:col-span-7` + `md:col-span-5` | About hero (text + portrait) |
| Full-width stacked | Resume header, Work header |

### Section Spacing
Vertical rhythm between major sections:

```
pt-[clamp(5rem,14vh,9rem)]
```

Inline padding is always `px-5 md:px-10`.

---

## 2. Typography

### Font Stack
| Token | Family |
|---|---|
| `--font-sans` | `'Mona Sans Variable'`, system fallbacks |
| `--font-hand` | `'Caveat Variable'`, cursive |
| Mono | System `ui-monospace` stack |

### Display Heading (`.display`)
```css
font-weight: 780;
font-stretch: 112%;
letter-spacing: -0.045em;
line-height: 0.9;
```

Used for all primary page titles. Sizes vary per page but follow `clamp()`:

| Page | Size |
|---|---|
| Home hero | `clamp(3.5rem,9.5vw,8rem)` |
| About | `clamp(3.25rem,7.6vw,7.5rem)` |
| Resume | `clamp(4rem,15vw,15rem)` |
| Work | `clamp(4.5rem,18vw,18rem)` |
| Section titles | `clamp(2.75rem,5.4vw,5.5rem)` |

### Display Wide (`.display-wide`)
```css
font-weight: 820;
font-stretch: 125%;
letter-spacing: -0.05em;
line-height: 0.86;
```
Used in the footer CTA headline.

### Sub-Heading
```
text-[clamp(1.6rem,2.4vw,2.2rem)] font-bold leading-tight tracking-[-0.025em] [font-stretch:108%] text-foreground
```
Used for story sections, skill group titles, education headings.

### Body / Intro Paragraph
```
text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug text-muted-foreground max-w-[42ch–48ch]
```

### Small Descriptive Body
```
text-[17px] or text-[16px] leading-relaxed text-muted-foreground
```

### Meta / Label Text
```
text-xs font-semibold uppercase tracking-wider text-muted-foreground
```
or the monospaced variant:
```
text-xs font-mono uppercase tracking-wider text-primary
```

---

## 3. Color Tokens

All colors are CSS custom properties consumed through Tailwind:

| Token | Light | Dark |
|---|---|---|
| `--background` | `#f5f6f8` | `#111412` |
| `--foreground` | `#111315` | `#eeeeec` |
| `--card` | `#ffffff` | `#171b18` |
| `--primary` | `#059669` | `#10b981` |
| `--primary-foreground` | `#ffffff` | `#022c19` |
| `--muted` | `#e8ebef` | `#1e2420` |
| `--muted-foreground` | `#5a5e65` | `#9ca3af` |
| `--border` | `rgb(17 19 21 / 0.12)` | `rgb(238 238 236 / 0.12)` |
| `--destructive` | `#b42318` | `#f97066` |
| `--ring` | `#059669` | `#10b981` |

### Selection
```css
::selection { background: var(--primary); color: var(--primary-foreground); }
```

---

## 4. Component Patterns

### Page Header Pattern
Every page opens with an editorial header block:

```tsx
<section className="px-5 md:px-10">
  <h1 className="display text-[clamp(…)] leading-[0.8–0.86] text-foreground">
    {title}
  </h1>
  <p className="mt-8–10 max-w-[42ch–48ch] text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug text-muted-foreground">
    {subtitle}
  </p>
</section>
```

### Status Indicator Dot
```tsx
<span className="size-2 rounded-full bg-primary animate-pulse" />
```
Often paired with a label in a `inline-flex items-center gap-2` row.

### CTA Buttons

**Primary (filled):**
```
inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-[16px] font-semibold text-primary-foreground transition-transform active:scale-[0.97] shadow-xl hover:opacity-95
```

**Secondary (outlined / ghost):**
```
inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-foreground hover:bg-muted transition-colors
```

**Header CTA (inverted):**
```
bg-foreground text-background rounded-full h-10 px-5 text-[15px] font-medium
```

### Card Pattern
```
rounded-[20px–28px] border border-border bg-card p-8 md:p-12 shadow-xl
```
Cards use `hover:border-primary/50` for interactive states.

### Pill / Tag Badge
```
rounded-full border border-border px-3.5 py-1.5 text-[14px] font-medium text-foreground hover:border-primary/50 transition-colors
```

### Tech Badge (Monospace)
```
rounded-md text-xs font-mono text-muted-foreground bg-card border border-border/80 px-2.5 py-1 hover:border-primary/40
```

### Status Badge
Pill shape with colored dot + uppercase mono text:
```
rounded-full text-xs font-mono font-medium border tracking-wide uppercase
```

### Row / List Item Pattern
Content rows follow the 12-column split with a `border-t border-border`:
```tsx
<div className="grid gap-4 border-t border-border py-10 md:grid-cols-12 md:gap-8">
  <div className="md:col-span-4">{/* Left label */}</div>
  <div className="md:col-span-7 md:col-start-6">{/* Right content */}</div>
</div>
```

### Achievement / Highlight Bullets
```
pl-4 relative before:absolute before:left-0 before:top-2.5 before:size-1.5 before:bg-primary before:rounded-full
```
or the dash variant:
```
pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-primary
```

---

## 5. Spacing & Sizing Rules

| Context | Value |
|---|---|
| Page top padding | `calc(var(--header-height) + clamp(2rem,8vh,5rem))` |
| Page bottom padding | `clamp(5rem,14vh,10rem)` |
| Section gap | `clamp(5rem,14vh,9rem)` |
| Inline padding | `px-5 md:px-10` |
| Max content width (prose) | `max-w-[42ch]` to `max-w-[64ch]` |
| Max container | None explicit; content widths controlled by grid + `max-w-[Xch]` |
| Border radius (large) | `rounded-[20px]` / `rounded-[28px]` |
| Border radius (pill) | `rounded-full` |
| Border radius (inputs) | `rounded-xl` |
| Icon sizes | `size-5` (20px) standard, `size-4` inline, `size-7` decorative |

---

## 6. Interaction & Motion

### GSAP + ScrollTrigger
The site uses GSAP with ScrollTrigger for scroll-driven animations:
- `gsap.defaults({ ease: 'power3.out' })`
- Cinematic mode gate: `(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)`
- `prefers-reduced-motion: reduce` disables all transitions/animations.

### Timing Function
```
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```
Tailwind token: `ease-expo`.

### Hover Patterns
- Cards: `hover:border-primary/50 transition-all duration-300`
- Links: `hover:text-primary transition-colors`
- Buttons: `active:scale-[0.97]` or `active:scale-[0.98]`
- Images: `group-hover:scale-[1.04] transition-transform duration-700 ease-expo`
- Arrow icons: `group-hover:-translate-y-1.5 group-hover:translate-x-1.5 transition-transform duration-500 ease-expo`

### Lenis Smooth Scroll
The entire app is wrapped in `<LenisProvider>` for buttery smooth scroll.

---

## 7. Responsive Breakpoints

| Breakpoint | Usage |
|---|---|
| Default (mobile-first) | Single column, `px-5`, compact sizing |
| `sm:` (640px) | Larger text sizes, 2-column grids |
| `md:` (768px) | 12-column grid activates, `px-10`, desktop nav |
| `lg:` (1024px) | Used sparingly for wider grids |

---

## 8. Icon System

The site uses **Lucide React** icons exclusively:
- Always paired with `aria-hidden="true"` when decorative
- Stroke widths: `strokeWidth={1.5}` to `strokeWidth={2}`
- Sizing: `size-4` (inline), `size-5` (standard), `size-7` (decorative hero)

---

## 9. Footer Pattern

The site footer is a full-viewport section (`min-h-[100svh]`) with:
1. Background `TypographyVortex` animation canvas
2. Radial gradient fog overlay
3. Center-aligned CTA with `display-wide` heading
4. Magnetic hover circle button (`size-36 md:size-44 rounded-full bg-primary`)
5. Social links row with `ArrowUpRight` icons
6. Subfooter bar with nav links + "Back to top" button

---

## 10. Image Handling

- Sanity images via `urlForImage()` builder
- Always uses `next/image` with `fill` + `sizes` prop
- Cover images: `aspect-[16/9]` or `aspect-[16/10]`
- Portraits: `aspect-[4/5]`
- Cards: `rounded-xl` or `rounded-2xl overflow-hidden`
- Shadow: `shadow-2xl` for hero images, `shadow-xl` for cards

---

## 11. Form Inputs

```
w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 text-sm
focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors
```

Labels:
```
block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2
```

---

## 12. Accessibility

- Skip link: `sr-only focus:not-sr-only` at document top
- `aria-label` on all `<nav>`, `<section>`, and list elements
- `aria-current="page"` on active nav items
- Focus ring: `2px solid var(--ring)` with `3px` offset
- Reduced motion: all animations collapse to `0.01ms`
- Color contrast: muted-foreground meets AA on background

---

## 13. SEO & Metadata

- Each page exports a `metadata` object with `title`, `description`
- JSON-LD structured data on home page and project detail pages
- OpenGraph + Twitter card images
- Canonical URLs via `metadataBase`
- `robots.ts` and `sitemap.ts` present
