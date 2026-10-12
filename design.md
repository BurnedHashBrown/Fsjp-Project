# Design.md — Digital Recipe & Meal Prep Planner

Inspiration: [myfitnesspal.com](https://www.myfitnesspal.com) — a utility-first, data-trustable fitness/nutrition UI. We borrow its clean white canvas, card-based density, and color-coded tagging system, and adapt it for recipes instead of calorie logs.

---

## 1. Design Philosophy

MyFitnessPal reads as **clean, dense, and trustworthy** rather than decorative — the UI gets out of the way of the data (food, macros, numbers). For the Recipe Planner, the "data" is recipes, ingredients, and dietary type, so we apply the same principle:

- White canvas, minimal chrome
- Cards as the primary content unit
- Color used functionally (to tag/categorize), not decoratively
- Dense but legible — users scan many recipes quickly, like scanning a food log

---

## 2. Color Palette

| Role | Color | Hex | Usage |
|---|---|---|---|
| Primary / Brand | MFP-style Blue | `#0066ee` | Buttons, links, active states, header |
| Background | White | `#ffffff` | Page canvas |
| Surface | Off-white / Light Gray | `#f7f8fa` | Card backgrounds, section dividers |
| Text Primary | Near-black | `#1a1a1a` | Headings, body text |
| Text Secondary | Gray | `#6b7280` | Captions, metadata (e.g. ingredient count) |
| Border | Light Gray | `#e5e7eb` | Card borders, dividers |

**Dietary-type tag colors** (functional, like MFP's macro palette — one fixed color per category, used only for tags/badges, never repurposed elsewhere):

| Tag | Color | Hex |
|---|---|---|
| Veg | Green | `#2e9e5b` |
| Non-Veg | Coral/Red | `#e4572e` |
| Quick Snack | Amber/Orange | `#f0a020` |

---

## 3. Typography

- **Font family:** `Inter`, fallback `system-ui, sans-serif`
- **Headings:** Bold, 24–32px (page titles), 18–20px (card/section titles)
- **Body text:** 14–16px — favor density over whitespace, like a tracker UI
- **Secondary text (metadata):** 12–13px, gray `#6b7280`

---

## 4. Layout & Components

### Recipe Card
- 8px border radius
- Light border (`#e5e7eb`) or soft shadow — not both heavy
- Contents: recipe image/thumbnail → name (bold) → dietary-type tag (colored pill) → short metadata line (e.g. "6 ingredients")
- Grid layout: responsive, 3–4 cards per row on desktop, 1 per row on mobile

### Dietary Tag (Pill)
- Rounded pill shape, small (12px text)
- Background = tag color at 15% opacity, text = full tag color (soft/legible, not a solid block)

### Search Bar
- Full-width on mobile, fixed max-width (~400px) on desktop, placed top of recipe list
- Rounded corners (8px), light border, blue focus ring (`#0066ee`)

### Recipe Modal
- Centered overlay, white surface, 12px radius, soft shadow
- Header: recipe name + dietary tag
- Body: two sections — "Ingredients" (checklist) and "Steps" (numbered list)
- Ingredient checklist items: checkbox + label, strikethrough text when checked (reinforces the "tracking" feel from MFP)

### Add Recipe Form
- Simple vertical form, same card surface style
- Primary button uses brand blue, full-width on mobile

---

## 5. Spacing & Grid

- Base spacing unit: **8px** (matches MFP's 8px card radius convention)
- Card padding: 16px
- Gap between cards: 16–24px
- Page max-width: 1200px, centered

---

## 6. Responsive Rules

- Breakpoints: mobile `<640px`, tablet `640–1024px`, desktop `>1024px`
- Cards collapse from 4 → 2 → 1 columns across breakpoints
- Modal becomes full-screen on mobile instead of a centered overlay

---

## 7. Interaction Notes

- Hover: cards lift slightly (subtle shadow increase), no color change
- Checkbox ticks: instant, no animation delay — matches MFP's snappy logging feel
- Search filtering: instant client-side filter, no loading spinner needed
