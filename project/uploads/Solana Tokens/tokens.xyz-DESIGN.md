# Design System Inspired by Tokens (Solana Liquidity Aggregator)

## 1. Visual Theme & Atmosphere

This design system embodies a modern, data-driven aesthetic tailored for blockchain and cryptocurrency markets. The visual language prioritizes clarity and information density, presenting complex token metrics and price data in an intuitive, accessible interface. The palette balances a clean, light foundation with strategic use of deep neutrals and vibrant status indicators, creating a professional yet approachable environment for traders and analysts. The design emphasizes minimal ornamentation, trusting typography and whitespace to guide users through dense financial information, while micro-interactions and subtle shadows provide depth without distraction. This is a system built for precision, real-time decision-making, and confident navigation through live market data.

**Key Characteristics**

- Minimalist, data-forward aesthetic with strong typographic hierarchy
- Light neutral backgrounds paired with deep charcoal text for maximum readability
- Semantic color coding for market sentiment (green gains, red losses)
- Clean, spacious layouts with generous whitespace around data elements
- Smooth, rounded button forms that soften the technical nature of the product
- Subtle elevation shadows that enhance depth without overwhelming
- Performance-oriented: fast visual scanning of prices, percentages, and charts
- Responsive and inclusive, prioritizing touch targets and scanability

## 2. Color Palette & Roles

### Primary
- **Brand Accent** (`#9E0016`): Deep maroon used for critical CTAs, branding, and high-emphasis interactive states; conveys trust and authority in financial contexts
- **Accent Secondary** (`#FFA098`): Softer coral-pink for secondary actions, hover states, and supporting UI elements; creates visual hierarchy without aggression

### Interactive
- **Primary Button** (`#2D2D2D`): Solid dark button background for main CTAs; pairs with white text for maximum contrast
- **Secondary Button** (`#FFFFFF`): Light or transparent button background with neutral text; used for secondary actions and form controls
- **Ghost Button** (`#171717`): Nearly black text on transparent background; highest accessibility for tertiary interactions

### Neutral Scale
- **Text Primary** (`#2D2D2D`): Main body text and high-emphasis labels; used 33 times across the interface
- **Text Secondary** (`#171717`): Supporting text, secondary labels, and dimmed content; slightly darker for distinction
- **Text Tertiary** (`#0A0A0A`): Deep neutral for minimal emphasis or disabled states
- **Text Inverse** (`#FFFFFF`): Text on dark backgrounds; used 20 times for contrast and accessibility

### Surface & Borders
- **Surface Light** (`#FAFAFA`): Primary page background; used 11 times for main content areas
- **Surface Lighter** (`#F2F3F5`): Card backgrounds, input fields, and subtle section dividers
- **Surface Lightest** (`#F5F5F5`): Alternative light surface for alternating rows or secondary cards
- **Border Subtle** (`#000000` @ 20% opacity): Hairline borders around form controls and card edges

### Semantic / Status
- **Success** (`#51C148`): Positive market movement, gains, and confirmations; vibrant green for instant recognition
- **Success Alternate** (`#4AA651`): Darker green for disabled or secondary success states
- **Error** (`#F92434`): Negative market movement, losses, and critical alerts; bright red for urgent visibility
- **Error Alternate** (`#CF4040`): Darker red for secondary error states or warnings on light backgrounds

## 3. Typography Rules

### Font Family
**Primary:** Inter Variable (weights: 400, 500, 600; variable fallback to system sans-serif)

**Fallback Stack:** `Inter Variable, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | Inter Variable | 54px | 500 | 55px | 0px | Page titles and hero sections; used for "Tokens on Solana" |
| Heading / H2 | Inter Variable | 16px | 600 | 24px | 0px | Section headers, card titles, and primary labels |
| Large Display | Inter Variable | 24px | 600 | 32px | 0px | Price displays and prominent metrics; high visual weight |
| Body / Paragraph | Inter Variable | 15px | 400 | 22.5px | 0px | Main content text, descriptions, and token details |
| Link | Inter Variable | 16px | 400 | 24px | 0px | Inline navigation and cross-links |
| Button | Inter Variable | 14px | 400 | 20px | 0px | Call-to-action text; compact and scannable |
| Button Large | Inter Variable | 16px | 400 | 24px | 0px | Prominent button labels; slightly larger for touch targets |
| Caption / Helper | Inter Variable | 14px | 400 | 20px | 0px | Timestamps, metadata, and secondary information |
| Code / Monospace | Inter Variable | 13px | 400 | 19.5px | 0px | Token symbols, addresses, and data values |

### Principles
- **Clarity First:** Large x-height and clean letterforms ensure legibility at all sizes, critical for reading price data
- **Hierarchy by Weight:** Use weight shifts (400 → 600) rather than drastic size changes to maintain vertical rhythm
- **Line Length Awareness:** Body text constrained to ~65 characters; longer lines broken across columns in tables
- **Metric Tables:** Monospace rendering for price and volume data ensures proper column alignment
- **Accessibility:** Minimum 16px for touch targets; 15px+ for all body text to meet WCAG AA standards
- **Contrast:** All text meets 7:1 contrast ratio; error red and success green tested against backgrounds

## 4. Component Stylings

### Buttons

#### Button: Primary (Solid Dark)
- **Background:** `#2D2D2D`
- **Text Color:** `#FFFFFF`
- **Font:** Inter Variable, 14px, weight 400
- **Padding:** `8px 12px`
- **Border Radius:** `9999px` (pill shape)
- **Border:** `1px solid #1F1F1F`
- **Height:** 38px
- **Line Height:** 20px
- **Hover State:** Background `#1F1F1F`, box-shadow `rgba(0, 0, 0, 0.1) 0px 4px 12px`
- **Active State:** Background `#0A0A0A`, text `#FAFAFA`
- **Disabled State:** Background `#F2F3F5`, text `#2D2D2D` @ 40%, cursor not-allowed

#### Button: Secondary (Light/Bordered)
- **Background:** `#FFFFFF`
- **Text Color:** `#2D2D2D` @ 58%
- **Font:** Inter Variable, 14px, weight 400
- **Padding:** `8px 12px`
- **Border Radius:** `9999px`
- **Border:** `1px solid #2D2D2D` @ 20%
- **Height:** 38px
- **Box Shadow:** none
- **Hover State:** Background `#F2F3F5`, border `#2D2D2D` @ 30%
- **Active State:** Background `#FAFAFA`, border `#2D2D2D` @ 40%

#### Button: Ghost (Transparent)
- **Background:** transparent
- **Text Color:** `#2D2D2D` @ 58%
- **Font:** Inter Variable, 14px, weight 400
- **Padding:** `8px 12px`
- **Border Radius:** `9999px`
- **Border:** none
- **Height:** 38px
- **Box Shadow:** none
- **Hover State:** Background `rgba(45, 45, 45, 0.08)`, text `#2D2D2D` @ 72%
- **Active State:** Background `rgba(45, 45, 45, 0.12)`, text `#0A0A0A`

#### Button: Large CTA
- **Background:** `#FFFFFF`
- **Text Color:** `#2D2D2D` @ 44%
- **Font:** Inter Variable, 16px, weight 400
- **Padding:** `18px 32px`
- **Border Radius:** `9999px`
- **Border:** `2px solid #2D2D2D` @ 20%
- **Height:** 65.5px
- **Line Height:** 24px
- **Hover State:** Background `#FAFAFA`, text `#2D2D2D` @ 60%, border `#2D2D2D` @ 30%

### Cards & Containers

#### Card: Default
- **Background:** `rgba(45, 45, 45, 3.6%)` (semi-transparent dark)
- **Text Color:** `#2D2D2D`
- **Font:** Inter Variable, 16px, weight 400
- **Padding:** `24px`
- **Border Radius:** `22px`
- **Border:** `1px solid #2D2D2D` @ 5%
- **Box Shadow:** `rgba(0, 0, 0, 0.03) 0px 8px 40px 0px`
- **Min Height:** 252px
- **Hover State:** Box-shadow `rgba(0, 0, 0, 0.08) 0px 12px 48px 0px`

#### Card: Data Row (Table)
- **Background:** `#FFFFFF`
- **Text Color:** `#2D2D2D`
- **Font:** Inter Variable, 15px, weight 400
- **Padding:** `16px 20px`
- **Border Radius:** 0 (flush in table context)
- **Border Bottom:** `1px solid #F2F3F5`
- **Height:** 56px
- **Hover State:** Background `#FAFAFA`
- **Striped Rows:** Alternate background `#F5F5F5`

#### Card: Token Stats Box
- **Background:** `#FAFAFA`
- **Text Color:** `#2D2D2D`
- **Font:** Inter Variable, 14px, weight 400
- **Padding:** `12px 16px`
- **Border Radius:** `8px`
- **Border:** `1px solid #F2F3F5`
- **Box Shadow:** none
- **Display:** Inline-block for price, percentage, volume labels

### Inputs & Forms

#### Input: Search
- **Background:** `#FFFFFF`
- **Text Color:** `#2D2D2D`
- **Font:** Inter Variable, 15px, weight 400
- **Padding:** `12px 16px`
- **Border Radius:** `9999px`
- **Border:** `1px solid #2D2D2D` @ 10%
- **Height:** 48px
- **Placeholder Color:** `#2D2D2D` @ 40%
- **Focus State:** Border `#9E0016`, box-shadow `rgba(158, 0, 22, 0.1) 0px 0px 0px 3px`
- **Box Shadow on Default:** `rgba(0, 0, 0, 0.03) 0px 1px 2px`

#### Input: Text Field
- **Background:** `#FFFFFF`
- **Text Color:** `#2D2D2D`
- **Font:** Inter Variable, 15px, weight 400
- **Padding:** `12px 16px`
- **Border Radius:** `8px`
- **Border:** `1px solid #2D2D2D` @ 10%
- **Height:** 44px
- **Label Font:** Inter Variable, 14px, weight 600, color `#2D2D2D`
- **Label Margin Bottom:** 8px
- **Focus State:** Border `#9E0016`, outline none, box-shadow `rgba(158, 0, 22, 0.08) 0px 0px 0px 3px`
- **Error State:** Border `#F92434`, text-hint color `#CF4040`

#### Select / Dropdown
- **Background:** `#FFFFFF`
- **Text Color:** `#2D2D2D`
- **Font:** Inter Variable, 15px, weight 400
- **Padding:** `12px 16px`
- **Border Radius:** `8px`
- **Border:** `1px solid #2D2D2D` @ 10%
- **Height:** 44px
- **Icon Color:** `#2D2D2D` @ 40%
- **Open State:** Border `#2D2D2D` @ 20%, background dropdown `#FAFAFA`

### Navigation

#### Navigation: Header
- **Background:** `#FFFFFF`
- **Text Color:** `#2D2D2D`
- **Font:** Inter Variable, 16px, weight 400
- **Height:** 64px
- **Border Bottom:** `1px solid #F2F3F5`
- **Padding:** `0px 40px`
- **Box Shadow:** `rgba(0, 0, 0, 0.03) 0px 1px 2px`

#### Navigation: Tab (Active)
- **Background:** transparent
- **Text Color:** `#2D2D2D`
- **Font:** Inter Variable, 16px, weight 600
- **Padding:** `12px 16px`
- **Border Radius:** 0
- **Border Bottom:** `2px solid #9E0016`
- **Hover State:** Background `rgba(45, 45, 45, 0.05)`

#### Navigation: Tab (Inactive)
- **Background:** transparent
- **Text Color:** `#2D2D2D` @ 50%
- **Font:** Inter Variable, 16px, weight 400
- **Padding:** `12px 16px`
- **Border Radius:** 0
- **Border Bottom:** `2px solid transparent`
- **Hover State:** Text `#2D2D2D` @ 70%, border-bottom `1px solid #2D2D2D` @ 10%

#### Navigation: Link (Primary CTA)
- **Background:** `#0A0A0A`
- **Text Color:** `#FFFFFF`
- **Font:** Inter Variable, 14px, weight 600
- **Padding:** `8px 16px`
- **Border Radius:** `9999px`
- **Height:** 36px
- **Hover State:** Background `#2D2D2D`, box-shadow `rgba(0, 0, 0, 0.12) 0px 4px 12px`
- **Active State:** Background `#0A0A0A`, ring `2px solid #9E0016`

### Badges

#### Badge: Success
- **Background:** `#51C148` @ 15%
- **Text Color:** `#51C148`
- **Font:** Inter Variable, 12px, weight 600
- **Padding:** `4px 12px`
- **Border Radius:** `6px`
- **Border:** `1px solid #51C148` @ 20%
- **Icon Color:** `#51C148`
- **Height:** 24px

#### Badge: Error
- **Background:** `#F92434` @ 15%
- **Text Color:** `#F92434`
- **Font:** Inter Variable, 12px, weight 600
- **Padding:** `4px 12px`
- **Border Radius:** `6px`
- **Border:** `1px solid #F92434` @ 20%
- **Icon Color:** `#F92434`
- **Height:** 24px

#### Badge: Neutral
- **Background:** `#F2F3F5`
- **Text Color:** `#2D2D2D` @ 60%
- **Font:** Inter Variable, 12px, weight 600
- **Padding:** `4px 12px`
- **Border Radius:** `6px`
- **Border:** `1px solid #F2F3F5`

## 5. Layout Principles

### Spacing System
**Base Unit:** `4px`

**Scale:** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `40px`, `44px`, `48px`, `80px`, `96px`, `112px`

**Usage Contexts:**
- **Micro** (4px, 8px): Icon spacing, internal button padding, tight component gaps
- **Small** (12px, 16px): Standard padding around form controls, card internal spacing
- **Medium** (24px, 32px): Section padding, container margins, major component separation
- **Large** (40px, 48px): Page-level margins, hero section spacing, prominent CTAs
- **XL** (80px, 96px, 112px): Page margins on desktop, full-width section breaks, hero spacing

### Grid & Container
- **Max Width:** 1440px for main content grid
- **Column Strategy:** 12-column responsive grid; collapses to 6 columns on tablet, 4 on mobile
- **Gutter:** 16px on mobile, 24px on tablet, 32px on desktop
- **Container Padding:** 16px on mobile, 24px on tablet, 40px on desktop
- **Token Table:** Full-width with fixed header; individual row height 56px; 80px on hover for expanded state

### Whitespace Philosophy
The design prioritizes breathing room around data elements. Cards are separated by 24px minimum vertical space; table rows by 1px borders. Large sections (hero, search area) use 48px+ top/bottom padding to create visual anchors. Negative space guides the eye through information hierarchy: dense data tables are surrounded by whitespace to avoid cognitive overload. Input fields and buttons maintain minimum 12px clearance from adjacent elements.

### Border Radius Scale
- **0px:** Table cells, header/footer bars, flush containers
- **6px:** Small badges, utility buttons, compact controls
- **8px:** Form inputs, dropdown menus, compact cards
- **16px:** Medium cards, secondary modals
- **22px:** Primary cards, larger containers
- **9999px:** Pill buttons, fully rounded interactive elements

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Base) | No shadow | Page background, neutral surfaces, table cells |
| Subtle | `rgba(0, 0, 0, 0.03) 0px 1px 2px 0px` | Input fields, small containers, minimal depth cues |
| Elevated | `rgba(0, 0, 0, 0.03) 0px 8px 40px 0px` | Cards, dropdowns, secondary content |
| High | `rgba(20, 20, 21, 0.12) 0px 14px 36px 0px` | Modals, popovers, overlay content |
| Maximum | `rgba(20, 20, 21, 0.08) 0px 4px 12px 0px` plus `rgba(0, 0, 0, 0.1) 0px 8px 24px 0px` | Floating navigation, alerts, critical modals |

**Shadow Philosophy:** Shadows are subtle and primarily used to establish layering, not drama. The primary shadow is applied at the bottom edge (y-offset 8px+) to suggest physical objects sitting on a virtual surface. Lighter y-offsets (1px–2px) are used for minor depth shifts. All shadows use cooler, desaturated grays to avoid colored tints that might conflict with semantic colors. Hover states introduce slightly stronger shadows (adding 4px offset) to signal interactivity without distraction.

## 7. Do's and Don'ts

### Do
- Use `#2D2D2D` for all primary text; it has the best readability at 15px+ sizes
- Apply semantic colors (`#51C148` success, `#F92434` error) consistently for market sentiment; users learn to recognize status instantly
- Maintain minimum 44px height for all touch targets (buttons, links, form controls)
- Pair white backgrounds with dark text; use `#FAFAFA` for secondary surfaces only
- Use pill-shaped buttons (`9999px` radius) for all CTAs; they signal interactivity and soften the technical feel
- Group related data in cards with 22px border radius; let whitespace separate card clusters
- Provide 24px+ vertical spacing between major sections; use borders for row separation in tables
- Test all interactive states (hover, active, focus, disabled) at both 100% and 200% zoom
- Use Inter Variable weight 600 for labels; weight 400 for body content
- Include focus rings (3px colored outline) on all interactive elements for accessibility

### Don't
- Mix text colors; stick to `#2D2D2D`, `#171717`, or `#0A0A0A` — no custom grays
- Use error red (`#F92434`) for warnings; reserve it for deletions and critical errors only
- Apply shadows to text or make shadows too heavy; keep blur radius ≤ 12px
- Create button padding tighter than `8px 12px`; sacrifice horizontal space before vertical
- Use border-radius values below 4px (except for 0px); small values create awkward half-pixels
- Place cards directly adjacent without whitespace; minimum 16px gap between edge-aligned cards
- Stack form labels and inputs without 8px separation; labels must have 12px + baseline breathing room
- Make interactive elements smaller than 44x44px, even if visually larger padding makes them appear bigger
- Use `#FFFFFF` text on anything lighter than `#2D2D2D`; contrast fails
- Assume mobile screens have 40px+ margins; use 16px minimum, scaled up on tablet/desktop

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Key Changes |
|-----------|-------|------------|
| **Mobile** | 360px–767px | Single-column layout, 16px padding, 4-column token grid, full-width cards, stack navigation vertically |
| **Tablet** | 768px–1023px | Two-column layout, 24px padding, 6-column grid, search bar spans full width, tab navigation in horizontal scroll |
| **Desktop** | 1024px–1439px | Three-column layout, 32px padding, 8-column grid, max-width 1280px, horizontal navigation |
| **Large Desktop** | 1440px+ | Max-width 1440px container, 40px padding, full 12-column grid, fixed sidebar navigation |

### Touch Targets
- **Minimum Height:** 44px for all buttons, links, form controls
- **Minimum Width:** 44px (ideally 48px for thumb reach on bottom navigation)
- **Spacing Between Targets:** 8px minimum gap to prevent accidental double-taps
- **Icon Size:** 24px for primary navigation, 20px for secondary, 16px for inline actions
- **Target Padding:** 12px around icon + text combos; 16px for icon-only buttons
- **Focus Ring:** 3px outer ring for all interactive elements; visible at 1px offset from element edge

### Collapsing Strategy
- **Header:** Logo + search on one row (mobile); search moves below logo on tablet; full header on desktop with top navigation
- **Navigation:** Hamburger menu on mobile (slide-in drawer); horizontal tabs on tablet; fixed top bar on desktop
- **Token Table:** Hide secondary columns (24H Volume, Market Cap) on mobile; show price + % change only; restore on tablet at 768px
- **Cards:** Single stack on mobile (full width); 2-up grid on tablet; 3-up on desktop (1440px+)
- **Sidebar:** Hidden / offscreen on mobile; collapsed to icon-only on tablet; full-width sidebar on desktop
- **Font Sizes:** Reduce h1 to 36px on mobile, 44px on tablet, 54px on desktop
- **Spacing:** Cut all spacing values by 50% on mobile; use medium scale on tablet; full scale on desktop

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Deep Maroon (`#9E0016`) — use for primary buttons, active states, high-emphasis actions
- **Secondary CTA:** Soft Coral (`#FFA098`) — hover states, secondary buttons, supporting UI
- **Text (Primary):** Dark Charcoal (`#2D2D2D`) — all body text, labels, high-contrast content
- **Text (Inverse):** White (`#FFFFFF`) — text on dark backgrounds, button text on dark surfaces
- **Background (Light):** Off-White (`#FAFAFA`) — main page background, primary surfaces
- **Background (Lighter):** Light Gray (`#F2F3F5`) — secondary surfaces, input backgrounds
- **Success Indicator:** Vibrant Green (`#51C148`) — positive movement, confirmations, gains
- **Error Indicator:** Bright Red (`#F92434`) — negative movement, losses, critical errors
- **Border:** Black @ 10–20% opacity — subtle dividers, form input borders, card edges
- **Neutral (Dark):** Near Black (`#0A0A0A`) — disabled states, minimal emphasis

### Iteration Guide

1. **Always use Inter Variable** as the primary font; fallback to system sans-serif. Weights: 400 (body), 500 (display), 600 (headings/labels). Never use weights outside 400–600 range.

2. **Text color is always one of three:** `#2D2D2D` (primary, 60%+ contrast), `#171717` (secondary, 50% contrast), or `#0A0A0A` (minimal, 40% contrast). No exceptions; no custom grays.

3. **Buttons must be pill-shaped** (`border-radius: 9999px`). Padding: `8px 12px` for standard, `18px 32px` for large. Height: 38px standard, 65.5px large. Always include hover + active + disabled states.

4. **Cards use 22px border-radius** and are separated by minimum 24px vertical whitespace. Padding inside: 24px. Background: semi-transparent dark (`rgba(45, 45, 45, 3.6%)`) or light (`#FAFAFA`). Include subtle box-shadow: `rgba(0, 0, 0, 0.03) 0px 8px 40px 0px`.

5. **Form inputs (search, text fields, selects)** have 44px height, 8px border-radius, `1px solid #2D2D2D` @ 10% border, 12px padding. Focus state: `#9E0016` border + `rgba(158, 0, 22, 0.1) 0px 0px 0px 3px` ring.

6. **Spacing uses the 4px scale:** Common values are 8px, 12px, 16px, 24px, 32px, 40px. Use 24px+ between major sections; 8px–16px between inline elements. Never use arbitrary spacing.

7. **Tables:** Rows are 56px tall, `#FFFFFF` background with `1px solid #F2F3F5` bottom border. Text: Inter Variable, 15px, weight 400. Hover state: background `#FAFAFA`. Alternate rows (striped): `#F5F5F5` background.

8. **Status indicators (badges):** Use success green (`#51C148` on light background @ 15%) or error red (`#F92434` @ 15%). Font: 12px, weight 600. Padding: 4px 12px. Border-radius: 6px. Include icon + text or text-only.

9. **Responsive rules:** Mobile (360px) uses 16px padding, single column, 44px minimum touch targets. Tablet (768px) uses 24px padding, 2-column grid. Desktop (1024px+) uses 32px–40px padding, 3+ column grid. Hide secondary columns (24H Volume) on mobile; restore on tablet.

10. **Accessibility non-negotiable:** All interactive elements must be ≥44px (height × width). Focus rings on all buttons/links/inputs. Color contrast ≥7:1 for text on any background. Test hover + focus + active + disabled states. No color-only status indicators; include icons or text labels.

11. **Shadows are minimal:** Use only the provided shadow values (Subtle, Elevated, High, Maximum). Never custom shadows. Shadows suggest layering, not drama; keep blur ≤ 12px, y-offset ≥ 1px.

12. **Data visualization (charts, sparklines):** Use success green (`#51C148`) for positive trends, error red (`#F92434`) for negative. Line width: 2px. Grid lines: `#F2F3F5` @ 30%. Tooltip background: `#2D2D2D`, text: `#FFFFFF`.