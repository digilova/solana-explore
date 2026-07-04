# Design System Inspired by Tokens.xyz

> **Secondary reference.** Where this file disagrees with `tokens.xyz-DESIGN.md`
> (e.g. it lists `#171717` as primary text — the prototype uses `#2D2D2D`), the
> other doc and the prototype's `code/app/globals.css` are canonical.

## 1. Visual Theme & Atmosphere

The Tokens.xyz design system embodies a clean, data-driven aesthetic that balances minimalism with professional financial clarity. The interface prioritizes information hierarchy through generous whitespace, subtle borders, and a restrained color palette. The dominant neutral foundation—whites, blacks, and warm grays—creates an approachable yet authoritative presence suitable for crypto asset intelligence and market data platforms. Interactive elements are deliberately understated, allowing data visualizations and market metrics to command attention. The typography system emphasizes readability through variable weights and precise sizing, while soft shadows and rounded corners introduce gentle sophistication without compromising the utilitarian focus.

**Key Characteristics**
- Clean, minimalist aesthetic with data-forward design
- Neutral-dominant color palette with strategic accent usage
- Generous whitespace and subtle visual hierarchy
- Soft borders and refined corner radii for approachability
- Restrained shadow system emphasizing depth without drama
- Typography-driven information architecture
- Crypto/fintech domain-appropriate professional tone

## 2. Color Palette & Roles

### Primary
- **Brand Red** (`#9E0016`): Primary action indicator, brand identity, high-emphasis CTAs
- **Brand Light Red** (`#FFA098`): Secondary actions, hover states, accent highlights

### Accent Colors
- **Positive Green** (`#51C148`): Success confirmations, bullish indicators
- **Success Green** (`#4AA651`): Secondary success states, positive sentiment
- **Error Red** (`#F92434`): Critical errors, bearish indicators, warning states
- **Danger Red** (`#CF4040`): Secondary error states, destructive confirmations

### Interactive
- **Ghost Button Background** (`#000000` at 8% opacity): Subtle button fills, disabled states
- **Border Neutral** (`#262626` at 20% opacity): Interactive element borders, dividers

### Neutral Scale
- **Pure White** (`#FFFFFF`): Primary background, card surfaces, text on dark
- **Off White** (`#FAFAFA`): Secondary background, subtle contrast layers
- **Light Gray** (`#F5F5F5`): Tertiary backgrounds, inactive states
- **Gray Border** (`#E5E5E5`): Soft dividers, subtle separators
- **Dark Gray** (`#262626`): Secondary text, placeholder text, metadata
- **Near Black** (`#171717`): Primary text, headings, emphasis
- **Deep Black** (`#0A0A0A`): Maximum contrast text, bold emphasis
- **Solid Black** (`#000000`): Primary text, high-contrast elements

### Surface & Borders
- **Card Border** (`#262626` at 20% opacity): Card edges, container boundaries
- **Default Surface** (`#FFFFFF`): Cards, containers, modal backgrounds

### Semantic / Status
- **Success Indicator** (`#51C148`): Positive price movements, successful transactions
- **Error Indicator** (`#F92434`): Negative price movements, failed states
- **Warning Indicator** (`#FFA098`): Caution states, attention required

## 3. Typography Rules

### Font Family
- **Primary**: Inter Variable (self-hosted `InterVariable.woff2`; the prototype loads it via `@font-face` in `globals.css`)
- **Fallback Stack**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display / H1 | Inter Variable | 24px | 500 | 26.4px | 0px | Page titles, token names |
| Heading / H2 | Inter Variable | 24px | 600 | 32px | 0px | Section headers, market data labels |
| Body / Paragraph | Inter Variable | 19px | 500 | 24px | 0px | Primary content, descriptions |
| Link | Inter Variable | 16px | 400 | 24px | 0px | Navigation links, inline CTAs |
| Button | Inter Variable | 14px | 400 | 20px | 0px | Button labels, primary actions |
| Label / Caption | Inter Variable | 14px | 450 | 21px | 0px | Form labels, list items, metadata |
| Badge | Inter Variable | 12px | 500 | 16px | 0px | Variant badges, tags, small accents |
| Code / Mono | Inter Variable | 14px | 400 | 20px | 0px | Token IDs, code snippets |

### Principles
- Variable weight system allows fine-tuned emphasis without font switching
- Consistent line-height ratios (1.1–1.4x) maintain readability across sizes
- Generous vertical spacing between sections aids scanning and comprehension
- Weight hierarchy (400–600) differentiates content importance without extremes
- 14px minimum for interactive elements ensures mobile touch accessibility

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background**: `#FFFFFF`
- **Text Color**: `#0E0E0E` at 58% opacity
- **Font Size**: `14px`
- **Font Weight**: `400`
- **Padding**: `8px 12px`
- **Border Radius**: `9999px` (pill-shaped)
- **Border**: `1px solid #262626` at 20% opacity
- **Height**: `38px`
- **Line Height**: `20px`
- **Box Shadow**: `none`
- **Hover State**: Lighten background to `#F5F5F5`, increase text opacity to 72%
- **Active State**: Border opacity increases to 40%

#### Secondary Button (Filled)
- **Background**: `#0E0E0E` at 8% opacity
- **Text Color**: `#0E0E0E` at 88% opacity
- **Font Size**: `12px`
- **Font Weight**: `500`
- **Padding**: `4px 8px`
- **Border Radius**: `9999px`
- **Border**: `none`
- **Height**: `24px`
- **Line Height**: `16px`
- **Box Shadow**: `none`
- **Hover State**: Increase background opacity to 12%
- **Active State**: Increase opacity to 16%

#### Ghost Button (Icon)
- **Background**: `transparent`
- **Text Color**: `#0E0E0E` at 72% opacity
- **Font Size**: `16px`
- **Font Weight**: `400`
- **Padding**: `0px`
- **Border Radius**: `9999px`
- **Border**: `none`
- **Height**: `32px`
- **Width**: `32px`
- **Line Height**: `24px`
- **Box Shadow**: `none`
- **Hover State**: Background becomes `#0E0E0E` at 4% opacity
- **Active State**: Background becomes `#0E0E0E` at 8% opacity

#### Link Button (CTA)
- **Background**: `#1A1A1A` (dark neutral)
- **Text Color**: `#FFFFFF`
- **Font Size**: `14px`
- **Font Weight**: `600`
- **Padding**: `0px 14px`
- **Border Radius**: `9999px`
- **Height**: `36px`
- **Line Height**: `14px`
- **Box Shadow**: `none`
- **Hover State**: Background lightens to `#262626`
- **Active State**: Background darkens to `#0A0A0A`

### Cards & Containers

#### Data Card (Market/Token Info)
- **Background**: `#FFFFFF`
- **Border**: `1px solid #262626` at 20% opacity
- **Border Radius**: `22px`
- **Padding**: `0px` (content manages internal spacing)
- **Box Shadow**: `rgba(0, 0, 0, 0.04) 0px 1px 2px 0px`
- **Height**: Flexible, min `200px`
- **Width**: Responsive, max `786px`
- **Line Height**: `24px`
- **Hover State**: Border opacity increases to 30%, shadow becomes `rgba(0, 0, 0, 0.07) 0px 1px 3px 0px`

#### Container (Markets Section)
- **Background**: `#FFFFFF`
- **Border Radius**: `22px`
- **Border**: `1px solid #262626` at 20% opacity
- **Padding**: `20px` to `24px`
- **Box Shadow**: `rgba(0, 0, 0, 0.04) 0px 1px 2px 0px`

### Inputs & Forms

#### Search Input
- **Background**: `#FAFAFA`
- **Border**: `1px solid #E5E5E5`
- **Border Radius**: `9999px`
- **Padding**: `8px 16px`
- **Font Size**: `14px`
- **Font Weight**: `400`
- **Text Color**: `#262626` at 50% opacity
- **Height**: `38px`
- **Box Shadow**: `none`
- **Placeholder Color**: `#262626` at 30% opacity
- **Focus State**: Border color becomes `#262626` at 40%, box-shadow becomes `rgba(20, 20, 21, 0.04) 0px 1px 2px 0px`

#### Text Input
- **Background**: `#FFFFFF`
- **Border**: `1px solid #E5E5E5`
- **Border Radius**: `8px`
- **Padding**: `12px 16px`
- **Font Size**: `14px`
- **Font Weight**: `400`
- **Text Color**: `#171717`
- **Height**: `40px`
- **Line Height**: `20px`
- **Box Shadow**: `none`
- **Focus State**: Border becomes `#262626` at 60%, outline: none

### Navigation

#### Top Navigation Link
- **Background**: `transparent`
- **Text Color**: `#171717`
- **Font Size**: `16px`
- **Font Weight**: `400`
- **Padding**: `0px` (spacing managed by container)
- **Height**: `40px`
- **Line Height**: `24px`
- **Border**: `none`
- **Border Radius**: `0px`
- **Box Shadow**: `none`
- **Hover State**: Text opacity increases, underline appears at bottom
- **Active State**: Text color becomes `#9E0016`, underline emphasized

#### Breadcrumb Link
- **Background**: `transparent`
- **Text Color**: `#262626` at 72% opacity
- **Font Size**: `14px`
- **Font Weight**: `400`
- **Padding**: `0px 4px`
- **Border**: `none`
- **Box Shadow**: `none`
- **Separator**: `/` in `#262626` at 30% opacity
- **Hover State**: Text color becomes `#171717`
- **Active State**: Text weight increases to 600, color becomes `#171717`

### Badges & Tags

#### Status Badge (Variant Tag)
- **Background**: `#0E0E0E` at 8% opacity
- **Text Color**: `#0E0E0E` at 88% opacity
- **Font Size**: `12px`
- **Font Weight**: `500`
- **Padding**: `4px 8px`
- **Border Radius**: `9999px`
- **Height**: `24px`
- **Line Height**: `16px`
- **Border**: `none`

#### Positive Indicator (Green)
- **Background**: `#51C148` at 15% opacity
- **Text Color**: `#4AA651`
- **Font Size**: `12px`
- **Font Weight**: `600`
- **Padding**: `4px 8px`
- **Border Radius**: `4px`

#### Negative Indicator (Red)
- **Background**: `#F92434` at 15% opacity
- **Text Color**: `#CF4040`
- **Font Size**: `12px`
- **Font Weight**: `600`
- **Padding**: `4px 8px`
- **Border Radius**: `4px`

## 5. Layout Principles

### Spacing System

**Base Unit**: `4px`

**Scale & Usage**:
- `4px`: Tight internal button spacing, icon gaps
- `8px`: Small component gaps, form input spacing
- `12px`: Medium gaps, list item spacing
- `16px`: Standard padding for cards and containers
- `20px`: Large gaps between sections
- `24px`: Card internal padding, major container padding
- `28px`: Margin between feature sections
- `32px`: Large gaps between content blocks
- `40px`: Major section margin
- `48px`: Significant spacing between layout areas
- `64px`: Large whitespace, page-level margins
- `80px`: Maximum page top/bottom margin

### Grid & Container

- **Max Width**: `1280px` (standard dashboard width)
- **Column Strategy**: 12-column responsive grid
- **Container Padding**: `16px` on mobile, `24px` on tablet, `32px` on desktop
- **Content Margins**: `40px` horizontal on desktop, `20px` on mobile
- **Gutter**: `16px` between grid columns

### Whitespace Philosophy

The system prioritizes breathing room over density. Ample vertical spacing separates information groups, enabling quick visual scanning and reducing cognitive load. Horizontal margins prevent edge-hugging content. Empty space is treated as a design element rather than wasted real estate, creating a premium, approachable atmosphere suitable for financial data platforms.

### Border Radius Scale

- `0px`: Dividers, underlines, strict geometric elements
- `4px`: Tight badges, secondary UI components
- `8px`: Standard input fields, small containers
- `22px`: Cards, major containers, modal backgrounds
- `9999px`: Buttons, pills, circular badges, fully rounded interactive elements

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| None | `none` | Flat elements, ghost states, text-only components |
| Subtle (md) | `rgba(0, 0, 0, 0.07) 0px 1px 3px 0px` | Card hover states, slight elevation |
| Soft (lg) | `rgba(20, 20, 21, 0.04) 0px 1px 2px 0px` | Input focus states, minimal depth |
| Medium (xl) | `rgba(0, 0, 0, 0.03) 0px 8px 40px 0px` | Modals, dropdowns, floating panels |

**Shadow Philosophy**: The elevation system employs minimal, direction-neutral shadows that suggest depth without drama. Most elements use no shadow, allowing the border system to define container boundaries. Hover and focus states introduce subtle shadows (1–3px blur) to communicate interactivity. Complex layered UI (modals, menus) uses soft, diffuse shadows with larger blur radius (40px) to create atmospheric separation without harsh edges. This restraint maintains the clean, professional aesthetic while providing necessary visual feedback.

## 7. Do's and Don'ts

### Do

- **Use primary white backgrounds** (`#FFFFFF`) for all data-containing cards and primary surfaces
- **Apply `#262626` at 20% opacity borders** consistently across cards and containers
- **Maintain 22px border radius** on all major card and container elements
- **Employ the neutral hierarchy** (`#171717` for primary text, `#262626` for secondary) for clear information prioritization
- **Use Inter Variable font** at specified weights for consistent typography
- **Place success indicators** (`#51C148` or `#4AA651`) on positive price movements and confirmations
- **Apply error indicators** (`#F92434` or `#CF4040`) to negative movements and destructive states
- **Maintain minimum 38px height** for all interactive buttons and touch targets
- **Use pill-shaped buttons** (`9999px` border radius) for primary and secondary actions
- **Add padding and margin** from the spacing scale (4, 8, 12, 16, 20, 24, 32px) for consistent rhythm
- **Keep shadows minimal** — use only subtle md/lg/xl shadows on interactive states and hovers

### Don't

- **Don't use custom colors** outside the defined palette; only use `#9E0016`, `#FFA098`, `#51C148`, `#F92434`, and neutrals
- **Don't apply shadows to default button or card states**; reserve shadows for hover and interactive states
- **Don't mix font families**; Inter Variable is the only approved typeface
- **Don't exceed 600px width** for single-column content on mobile; respect responsive constraints
- **Don't use border radius** less than `4px` or arbitrary values; stick to `0px`, `4px`, `8px`, `22px`, `9999px`
- **Don't set padding/margin** to values outside the spacing scale; avoid random values like `15px` or `25px`
- **Don't place text** directly on images without sufficient contrast; ensure minimum 4.5:1 WCAG AA ratio
- **Don't reduce opacity** below `8%` for interactive elements; maintain visibility and accessibility
- **Don't use the brand red** (`#9E0016`) for disabled or inactive states; use neutral grays instead
- **Don't create buttons smaller than 36px height** on mobile; ensure touch-friendly sizing
- **Don't apply multiple borders** to containers; use a single `1px solid` border at defined opacity

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | `320px–767px` | Single column, padding `16px`, font sizes reduce by 1–2px, buttons full-width, cards stack vertically |
| Tablet | `768px–1023px` | 2 columns, padding `20px`, navigation consolidates, grid gaps `12px` |
| Desktop | `1024px–1439px` | 3–4 columns, padding `24px`, full navigation bar visible, grid gaps `16px` |
| Large Desktop | `1440px+` | Max width `1280px`, centered layout, max `32px` padding, full feature set visible |

### Touch Targets

- **Minimum Size**: `38px × 38px` (buttons, icon buttons, checkbox/radio)
- **Recommended Size**: `44px × 44px` (for comfort on mobile)
- **Spacing Between**: `8px` minimum (avoid accidental taps)
- **Link Text**: Minimum `16px` font size on mobile for readability
- **Input Fields**: Minimum `40px` height, `16px` padding

### Collapsing Strategy

- **Mobile (≤767px)**: Stack all cards vertically, hide secondary navigation, consolidate filters into dropdown menu, reduce chart height, full-width buttons, single-column tables converted to card rows
- **Tablet (768–1023px)**: 2-column grid for cards, primary navigation visible, charts 60% viewport height, horizontal scrolling for tables with overflow
- **Desktop (1024px+)**: Full 3–4 column layout, side panel navigation, expanded charts (80% viewport height), inline tables with full columns

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA**: Brand Red (`#9E0016`)
- **Secondary CTA**: Brand Light Red (`#FFA098`)
- **Success / Positive**: Positive Green (`#51C148`)
- **Error / Negative**: Error Red (`#F92434`)
- **Primary Background**: Pure White (`#FFFFFF`)
- **Secondary Background**: Off White (`#FAFAFA`)
- **Primary Text**: Near Black (`#171717`)
- **Secondary Text**: Dark Gray (`#262626`)
- **Borders**: Dark Gray at 20% opacity (`#262626` 20%)
- **Card Background**: Pure White (`#FFFFFF`)
- **Neutral / Inactive**: Light Gray (`#F5F5F5`)

### Iteration Guide

1. **All interactive elements** (buttons, links, inputs) must have minimum `38px` height and use `9999px` border radius for buttons, `8px` for inputs
2. **Card and container styling** is fixed: `#FFFFFF` background, `1px solid #262626` at 20% opacity border, `22px` border-radius, `16px–24px` padding
3. **Typography hierarchy** uses only specified sizes (24px, 19px, 16px, 14px, 12px) and weights (400, 450, 500, 600) from the Inter Variable family
4. **Spacing between all elements** must use the predefined scale: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80px — no arbitrary values
5. **Shadows are minimal and reserved** for hover/focus states only; default state elements have no shadow
6. **Status colors** are semantic: green for positive (success, up), red for negative (error, down), use exact hex values provided
7. **Responsive behavior** follows breakpoint rules: single column ≤767px, 2-column 768–1023px, 3+ column ≥1024px
8. **All buttons** use pill-shaped radius (`9999px`), text must be centered, and default padding is `8px 12px` (adjust for size variant)
9. **Borders and dividers** always use neutral scale at opacity (20–40%); never use solid colors for subtle separators
10. **Accessibility** minimum: 38px touch targets, 16px minimum font on mobile, 4.5:1 contrast ratio for all text, no color-only information (include icons/text)