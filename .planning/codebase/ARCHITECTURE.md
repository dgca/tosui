# Architecture

**Analysis Date:** 2026-01-11

## Pattern Overview

**Overall:** Composable React Component Library with CSS Modules

**Key Characteristics:**
- Monorepo with pnpm workspace (library + docs packages)
- Primitive-based composition (Box → Text → Heading, etc.)
- CSS Modules for atomic styles + CSS Variables for design tokens
- Polymorphic components supporting `as` prop for element override
- Mobile-first responsive design approach

## Layers

**Primitive Layer:**
- Purpose: Foundation components that compose into everything else
- Contains: `Box` (universal layout), `Text` (typography), `Heading` (semantic headings)
- Location: `packages/react/src/components/Box/`, `Text/`, `Heading/`
- Depends on: Style parts, CSS modules, CSS variables
- Used by: Higher-order components, consumer applications

**Component Layer:**
- Purpose: Higher-order components with specific functionality
- Contains: `Button` (interactive), `Spinner` (loading indicator)
- Location: `packages/react/src/components/Button/`, `Spinner/`
- Depends on: Primitive components (Box, Text)
- Used by: Consumer applications

**Styling Layer:**
- Purpose: CSS structure and design tokens
- Contains: CSS modules (atomic classes), CSS variables (runtime values)
- Location: `packages/react/src/components/*/`, `packages/react/src/styles/`
- Depends on: Nothing
- Used by: All components

**Type/Utility Layer:**
- Purpose: Shared types and helpers
- Contains: `Polymorphic<T, P>` type, `ResponsiveValue<T>`, breakpoint helpers
- Location: `packages/react/src/types/`, `packages/react/src/utils/`
- Depends on: React types
- Used by: All components

## Data Flow

**Component Rendering Flow:**

1. User writes JSX: `<Box p={4} m={{ base: 2, md: 4 }} />`
2. Component receives props
3. Getter functions process props (e.g., `getPaddingStyles()`)
   - Resolve cascading prop values (p → px/py → pt/pr/pb/pl)
   - Check state variants (_hover, _focus, _active, _disabled)
   - Map values to CSS class names from modules
   - Set CSS variables inline as style prop
4. `combineStyles()` merges all style results
5. Component renders: `<div className="..." style={{ --t-pt: "16px", ... }} />`
6. CSS modules apply classes → media queries activate
7. CSS variables resolve values in browser

**State Management:**
- Stateless components (no internal state beyond React patterns)
- Props drive all behavior
- CSS handles interactive states (hover, focus, active, disabled)

## Key Abstractions

**Style Parts:**
- Purpose: Isolated style domains within Box component
- Examples: `padding/`, `margin/`, `flexbox/`, `colors/`, `borders/`
- Pattern: Each part has `.ts` (logic) + `.module.css` (styles)
- Export: Type definition + getter function → StyleResult (className + style object)

**StyleResult:**
- Purpose: Unified return type from style getter functions
- Examples: `{ className: string; style: CSSProperties }`
- Pattern: Components merge multiple StyleResults via `combineStyles()`

**Polymorphic Type:**
- Purpose: Enable `as` prop for element override with type safety
- Examples: `<Box as="section" />`, `<Text as="label" />`
- Pattern: `Polymorphic<T extends ElementType, P>` combines custom props with element props

**Responsive Values:**
- Purpose: Mobile-first responsive prop handling
- Examples: `p={4}` (static), `p={{ base: 2, md: 4, lg: 6 }}` (responsive)
- Pattern: `ResponsiveValue<T> = T | ResponsiveObject<T>`

## Entry Points

**Library Entry:**
- Location: `packages/react/src/index.tsx`
- Triggers: Import by consuming application
- Responsibilities: Export public API (Box, Text, Heading, Button, Spinner)

**Development Server:**
- Location: `packages/react/src/main.tsx`
- Triggers: `pnpm f:lib dev`
- Responsibilities: Set up React root with App.tsx playground

**Documentation:**
- Location: `packages/docs/docusaurus.config.ts`
- Triggers: `pnpm f:docs start`
- Responsibilities: Docusaurus documentation site

## Error Handling

**Strategy:** Compile-time validation via TypeScript

**Patterns:**
- No runtime error handling needed (stateless UI components)
- TypeScript strict mode catches prop errors at build time
- ESLint rules validate StyleX usage patterns
- Invalid props produce TypeScript errors, not runtime exceptions

## Cross-Cutting Concerns

**Responsive Design:**
- Mobile-first via `ResponsiveValue<T>` utility type
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Helper: `toFullResponsiveObject()` cascades missing breakpoints

**State Handling:**
- Pseudo-state props: `_hover`, `_focus`, `_active`, `_disabled`
- CSS classes use suffixes: `:h`, `:f`, `:a`, `:d`
- CSS modules handle state transitions (no JS state management)

**Theming:**
- CSS variables for all design tokens
- Light/dark modes via `prefers-color-scheme`
- Color scheme defined in `_color-scheme.css`

---

*Architecture analysis: 2026-01-11*
*Update when major patterns change*
