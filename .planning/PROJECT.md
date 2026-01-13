# Tosui

## What This Is

A themable, orderly, simple UI component library for React. Built on constraint-driven simplicity with intentionally limited options to reduce decision fatigue and improve consistency. A foundation for building design systems, not a complete design system itself.

## Core Value

Fewer, better choices. Every component follows the same patterns, uses the same tokens, and composes predictably.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

**Foundation (existing):**
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

**v1.0 Component Library MVP:**
- ✓ Stack, HStack, VStack — flex containers with gap — v1.0
- ✓ Flex, Grid — explicit layout containers — v1.0
- ✓ Container — max-width centered wrapper — v1.0
- ✓ Divider, Spacer — layout utilities — v1.0
- ✓ Code — inline code styling — v1.0
- ✓ Input, Label, Textarea — text inputs — v1.0
- ✓ Select — dropdown select — v1.0
- ✓ Checkbox, Radio, Switch — selection controls — v1.0
- ✓ FormField — form composition wrapper — v1.0
- ✓ IconButton — icon-only button — v1.0
- ✓ Alert, Badge, Progress, Skeleton — feedback components — v1.0
- ✓ Avatar, Card, Image, List — data display — v1.0
- ✓ Link, Tabs, Breadcrumb, Menu, Pagination — navigation — v1.0
- ✓ Modal, Tooltip, Popover, Accordion — overlays — v1.0

### Active

<!-- Current scope. Building toward these. -->

(None — v1.0 complete, planning next milestone)

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
- **Playground Verification:** After completing each phase, add examples of new components to App.tsx for visual verification before moving to the next phase

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| CSS Modules over StyleX | Simpler mental model, no custom compiler | ✓ Good |
| Styled overlays over headless | Consistent theming, less user setup | ✓ Good |
| Extended navigation set | Link + Tabs + Breadcrumb + Menu + Pagination covers common needs | ✓ Good |
| Skip complex data components | Tables/calendars better served by dedicated libraries | ✓ Good |
| Stack defaults to column | Most common use case for vertical layouts | ✓ Good |
| Modal uses createPortal | Clean DOM hierarchy, z-index management | ✓ Good |
| Context API for compound components | Tabs, Menu, Accordion use context for state | ✓ Good |

## Current State

**v1.0 shipped 2026-01-12** with 40 components across 7 phases.

Tech stack: React, TypeScript, CSS Modules, Vite
LOC: ~10,131 lines of TypeScript/CSS

---
*Last updated: 2026-01-12 after v1.0 milestone*
