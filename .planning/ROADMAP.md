# Roadmap: Tosui Component Library

## Overview

Build out Tosui from foundational primitives to a full-featured, minimal UI component library. Starting with layout components that extend Box patterns, then progressing through forms, feedback, data display, navigation, and finally complex overlays. Each phase delivers a coherent set of components that share patterns and can be verified independently.

## Domain Expertise

None

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Layout Primitives** — Stack, Flex, Grid, Container, Divider, Spacer (4/4 plans)
- [x] **Phase 2: Typography & Text Inputs** — Code, Input, Textarea, Label (3/3 plans)
- [ ] **Phase 3: Selection Controls** — Select, Checkbox, Radio, Switch, FormField (1/5 plans)
- [ ] **Phase 4: Buttons & Feedback** — IconButton, Alert, Badge, Progress, Skeleton
- [ ] **Phase 5: Data Display** — Avatar, Card, Image, List/ListItem
- [ ] **Phase 6: Navigation** — Link, Tabs, Breadcrumb, Menu, Pagination
- [ ] **Phase 7: Overlays** — Modal, Tooltip, Popover, Accordion

## Phase Details

### Phase 1: Layout Primitives
**Goal**: Extend Box with semantic layout components for common flex/grid patterns
**Depends on**: Nothing (first phase)
**Research**: Unlikely (extends existing Box patterns)
**Plans**: TBD

Components:
- Stack — base flex container with direction and gap
- HStack — horizontal stack (Stack direction="row")
- VStack — vertical stack (Stack direction="column")
- Flex — explicit flexbox container
- Grid — CSS Grid container
- Container — max-width centered wrapper
- Divider — horizontal/vertical separator
- Spacer — flexible space in flex layouts

### Phase 2: Typography & Text Inputs
**Goal**: Text styling and basic form inputs
**Depends on**: Phase 1
**Research**: Unlikely (standard form patterns)
**Plans**: TBD

Components:
- Code — inline code styling
- Input — text input field
- Textarea — multiline text input
- Label — form label with htmlFor

### Phase 3: Selection Controls
**Goal**: Selection-based form controls and form composition
**Depends on**: Phase 2
**Research**: Unlikely (standard form patterns)
**Plans**: TBD

Components:
- Select — dropdown select
- Checkbox — checkbox with optional label
- Radio — radio button with optional label
- Switch — toggle switch
- FormField — wrapper with label, helper text, error message

### Phase 4: Buttons & Feedback
**Goal**: Button variants and status/loading indicators
**Depends on**: Phase 1
**Research**: Unlikely (extends existing Button and Box patterns)
**Plans**: TBD

Components:
- IconButton — icon-only button variant
- Alert — status/notification banner
- Badge — small status indicator
- Progress — progress bar
- Skeleton — loading placeholder

### Phase 5: Data Display
**Goal**: Content containers and display components
**Depends on**: Phase 1
**Research**: Unlikely (internal patterns)
**Plans**: TBD

Components:
- Avatar — user/entity avatar with fallback
- Card — content container with optional header/body/footer
- Image — enhanced img with loading/error states
- List/ListItem — semantic list components

### Phase 6: Navigation
**Goal**: Navigation patterns and wayfinding
**Depends on**: Phase 1
**Research**: Likely (Menu dropdown positioning, keyboard navigation, focus management)
**Research topics**: Focus management patterns, keyboard navigation, dropdown positioning strategies
**Plans**: TBD

Components:
- Link — styled anchor with router support
- Tabs — tabbed interface (Tab, TabList, TabPanel)
- Breadcrumb — navigation trail (BreadcrumbItem)
- Menu — dropdown menu (MenuItem)
- Pagination — page navigation

### Phase 7: Overlays
**Goal**: Portal-based overlays and disclosure patterns
**Depends on**: Phase 6
**Research**: Likely (portal logic, focus trapping, overlay positioning, accessibility)
**Research topics**: React portals, focus-trap libraries, floating-ui or similar for positioning, ARIA patterns for modals
**Plans**: TBD

Components:
- Modal — dialog with portal, focus trap, backdrop
- Tooltip — hover information overlay
- Popover — click-triggered overlay with positioning
- Accordion — collapsible sections (AccordionItem)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Layout Primitives | 4/4 | Complete | 2026-01-12 |
| 2. Typography & Text Inputs | 3/3 | Complete | 2026-01-12 |
| 3. Selection Controls | 1/5 | In progress | - |
| 4. Buttons & Feedback | 0/TBD | Not started | - |
| 5. Data Display | 0/TBD | Not started | - |
| 6. Navigation | 0/TBD | Not started | - |
| 7. Overlays | 0/TBD | Not started | - |
