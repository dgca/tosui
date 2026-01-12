# Tosui

## What This Is

A themable, orderly, simple UI component library for React. Built on constraint-driven simplicity with intentionally limited options to reduce decision fatigue and improve consistency. A foundation for building design systems, not a complete design system itself.

## Core Value

Fewer, better choices. Every component follows the same patterns, uses the same tokens, and composes predictably.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Box primitive with layout, spacing, sizing, colors, borders, typography props — existing
- ✓ Text typography component with responsive sizing — existing
- ✓ Heading semantic headings (h1-h6) via Text — existing
- ✓ Button component with solid/outline/ghost variants and sizes — existing
- ✓ Spinner loading indicator — existing
- ✓ Polymorphic `as` prop for element override — existing
- ✓ Responsive props system (base, sm, md, lg, xl, 2xl) — existing
- ✓ State props (_hover, _focus, _active, _disabled) — existing
- ✓ CSS Modules + CSS Variables styling architecture — existing
- ✓ Design tokens (colors, spacing, typography, shadows, radii) — existing
- ✓ Light/dark theme support — existing
- ✓ Docusaurus documentation site — existing
- ✓ npm package distribution (@tosui/react) — existing

### Active

<!-- Current scope. Building toward these. -->

**Layout Components:**
- [ ] Stack — vertical/horizontal flex container with gap
- [ ] HStack — horizontal stack shorthand
- [ ] VStack — vertical stack shorthand
- [ ] Flex — explicit flexbox container
- [ ] Grid — CSS Grid container
- [ ] Container — max-width centered wrapper
- [ ] Divider — horizontal/vertical separator
- [ ] Spacer — flexible space in flex layouts

**Typography:**
- [ ] Code — inline code styling

**Form Components:**
- [ ] Input — text input field
- [ ] Textarea — multiline text input
- [ ] Select — dropdown select
- [ ] Checkbox — checkbox with label
- [ ] Radio — radio button with label
- [ ] Switch — toggle switch
- [ ] FormField — wrapper with label, helper text, error
- [ ] Label — form label

**Button Variants:**
- [ ] IconButton — icon-only button

**Feedback:**
- [ ] Alert — status/notification banner
- [ ] Badge — small status indicator
- [ ] Progress — progress bar
- [ ] Skeleton — loading placeholder

**Data Display:**
- [ ] Avatar — user/entity avatar with fallback
- [ ] Card — content container
- [ ] Image — enhanced img with loading/fallback
- [ ] List/ListItem — semantic list components

**Navigation:**
- [ ] Link — styled anchor with router support
- [ ] Tabs — tabbed interface
- [ ] Breadcrumb — navigation trail
- [ ] Menu — dropdown menu
- [ ] Pagination — page navigation

**Overlay:**
- [ ] Modal — dialog/modal with portal
- [ ] Tooltip — hover information
- [ ] Popover — click-triggered overlay

**Disclosure:**
- [ ] Accordion — collapsible sections

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Table/DataGrid — complex data components better served by dedicated libraries
- Calendar/DatePicker — specialized, typically needs dedicated library
- Tree/TreeView — uncommon, complex state management
- Toast/Notification system — requires global state/context, app-level concern
- Carousel/Slider — niche, many viable third-party options
- Charts/Graphs — data visualization is its own domain
- Rich Text Editor — extremely complex, dedicated solutions exist
- Drag and Drop — complex interaction pattern, use dedicated library

## Context

Tosui is a brownfield project with established patterns:

- **Style Parts Architecture:** Each style domain (padding, margin, colors, etc.) is isolated in Box subdirectories with `.ts` logic + `.module.css` styles
- **Prop Consistency:** Use short forms (bg, p, m, w, h) matching existing Box props
- **Composition Pattern:** Higher-order components compose primitives (Button uses Box)
- **Style Override:** Spread `...rest` onto Box wrapper so users can override any style
- **State Variants:** Support _hover, _focus, _active, _disabled where applicable

New components should follow these established patterns.

## Constraints

- **Dependency Budget:** Minimal new dependencies — only add if significantly reducing complexity (focus-trap, portal utilities)
- **Prop Consistency:** All components use same prop names as Box (bg, not background; p, not padding)
- **No Breaking Changes:** Existing component APIs are stable
- **Bundle Size:** Keep total library size reasonable — avoid bloat

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| CSS Modules over StyleX | Simpler mental model, no custom compiler | ✓ Good |
| Styled overlays over headless | Consistent theming, less user setup | — Pending |
| Extended navigation set | Link + Tabs + Breadcrumb + Menu + Pagination covers common needs | — Pending |
| Skip complex data components | Tables/calendars better served by dedicated libraries | — Pending |

---
*Last updated: 2026-01-11 after initialization*
