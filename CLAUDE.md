# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Principles

When working in this codebase, follow these principles:

1. **Investigate before implementing** - Always understand the problem fully before jumping to solutions. If you're unsure why something is happening, investigate and explain your findings before proposing changes.

2. **Plan non-trivial changes** - For any non-trivial task, create a plan of what you will implement and ask for review before starting. A "non-trivial task" is anything that:

   - Touches multiple files or systems
   - Changes architecture or patterns
   - Could be approached in multiple ways
   - Has unclear requirements

3. **Keep documentation in sync** - If you make a change that makes documentation incorrect, update the documentation in the same session. This includes:

   - README.md (design tokens, usage examples)
   - STYLEX_MENTAL_MODEL.md (implementation patterns)
   - CLAUDE.md (this file)
   - Code comments explaining complex logic

4. **Verify before claiming success** - Don't assume changes work. Build, test, and verify before reporting completion.

## Project Overview

Tosui is a themable, orderly, simple UI component library built on **constraint-driven simplicity**. It's a foundation for building design systems with intentionally limited options to reduce decision fatigue and improve consistency.

**Core philosophy**: Fewer, better choices. Composition over configuration. Semantic tokens, not prescriptive values.

## Monorepo Structure

This is a pnpm workspace with two packages:

- `packages/react` - The component library (`@tosui/react`)
- `packages/react-docs` - Docusaurus documentation site

## Common Commands

### Workspace Shortcuts

Use these shortcuts to run commands in specific packages:

```bash
pnpm f:lib <command>   # Run command in @tosui/react package
pnpm f:docs <command>  # Run command in react-docs package
```

### Library Development (`packages/react`)

```bash
# Build the library (TypeScript + Vite)
pnpm f:lib build

# Development server with HMR (uses index.html + App.tsx)
pnpm f:lib dev

# Type checking only
pnpm f:lib typecheck

# Linting
pnpm f:lib lint
```

### Documentation Site (`packages/react-docs`)

```bash
# Start Docusaurus dev server
pnpm f:docs start

# Build documentation site
pnpm f:docs build

# Build both library and docs
pnpm build:docs  # (from root)
```

## Architecture

### StyleX-Based Styling System

Tosui uses **StyleX** (not Linaria, not Tailwind) for zero-runtime atomic CSS generation. This is critical to understand:

**Key StyleX concepts:**

- All styles compile to atomic CSS at build time (zero runtime cost)
- No CSS-in-JS shorthands allowed (e.g., `padding: "10px 20px"` is forbidden)
- Must use longhand properties: `paddingTop`, `paddingRight`, etc.
- Apply styles with `stylex.props()`, never manual className management
- Later styles override earlier ones in merge order

**CRITICAL GOTCHA - Read `packages/react/STYLEX_MENTAL_MODEL.md` before working with styles:**

StyleX **drops earlier styles when merging the same CSS property at different breakpoints**. You must put all responsive breakpoints in a single object to avoid losing styles during merging.

### Responsive Styling Pattern

All style parts follow this unified pattern to avoid combinatorial explosion:

```tsx
// Static styles for non-responsive values
const overflowStyles = stylex.create({
  auto: { overflow: "auto" },
  hidden: { overflow: "hidden" },
  scroll: { overflow: "scroll" },
  visible: { overflow: "visible" },
});

// Responsive styles - ALL breakpoints in one object
const overflowStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<OverflowValues>) => ({
    overflow: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});
```

**Why this pattern?**

- Prevents StyleX from dropping breakpoints during style merging
- Avoids generating 531,441 static variants for enumerated responsive props
- Works for both dynamic props (padding, margin) and enumerated props (overflow, display)
- Uses `toFullResponsiveObject()` helper to fill missing breakpoints with mobile-first cascade

### Component Architecture

**Primitive components:**

- `Box` - Core layout primitive with all style props
- `Text` - Text primitive with typography props
- `Heading` - Heading primitive that wraps Text

**Box is the foundation:** All components either use Box internally or follow its patterns. Box accepts:

- Layout props: `display`, `position`, `overflow`, `zIndex`
- Spacing: `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`, `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my` (supports 0-32 multipliers of 4px base)
- Sizing: `w`, `h`, `minW`, `maxW`, `minH`, `maxH`
- Flexbox: `flexDirection`, `justifyContent`, `alignItems`, `alignSelf`, `flexWrap`, `gap`, etc.
- Grid: `gridTemplateColumns`, `gridTemplateRows`, `justifySelf`
- Typography: `fontSize`, `fontFamily`, `fontWeight`, `lineHeight`
- Colors: `color`, `bg`, `borderColor`
- Borders: `border`, `borderX`, `borderY`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`, `borderStyle`
- Roundness: `rounded`, `roundedTop`, `roundedBottom`, `roundedLeft`, `roundedRight`, `roundedTopLeft`, etc.
- Effects: `shadow`, `opacity`
- Interactions: `cursor`, `pointerEvents`, `userSelect`
- Text: `textAlign`, `whiteSpace`

**Responsive support:** Most props accept either a simple value OR a responsive object:

```tsx
<Box p={4} />                              // Simple: 16px padding
<Box p={{ base: 2, md: 4, lg: 6 }} />    // Responsive: 8px → 16px → 24px
```

### Style Parts Organization

Component styling is split into modular "style parts" in `packages/react/src/components/Box/styleParts/`:

- `reset.ts` - CSS reset styles
- `display.ts`, `position.ts`, `overflow.ts`, `zIndex.ts` - Layout
- `padding.ts`, `margin.ts`, `sizing.ts` - Box model
- `flexbox.ts`, `grid.ts`, `inset.ts` - Advanced layout
- `typography.ts`, `colors.ts` - Visual
- `borders.ts`, `roundness.ts`, `shadows.ts` - Surface
- `interactions.ts`, `text.ts`, `opacity.ts` - Behavior

Each style part exports:

1. Type definitions for props (e.g., `PaddingProps`)
2. StyleX style objects
3. Getter function (e.g., `getPaddingStyles()`) that returns appropriate styles based on prop values

### Build Configuration

**Library build (`packages/react/vite.config.ts`):**

- ES module output only (`formats: ["es"]`)
- Externalized dependencies: `react`, `react-dom`, `react/jsx-runtime`
- TypeScript declarations via `vite-plugin-dts` using `tsconfig.build.json`
- **CSS code splitting enabled** (`cssCodeSplit: true`) to separate fonts.css
- StyleX plugin with mode-aware dev setting
- Sourcemaps enabled
- Empty dist on rebuild

**Key files:**

- `src/index.tsx` - Entry point, imports `styles.css` and dynamically imports `fonts.css`
- `dist/index.js` - Bundled JavaScript
- `dist/index.css` - Main CSS bundle (design tokens + StyleX atomic CSS)
- `dist/fonts.css` - Optional IBM Plex fonts (dynamic import chunk)
- `dist/index.d.ts` - TypeScript declarations (with full type tree)

**Path aliases:**

- `@/*` resolves to `src/*` in both vite.config and tsconfig
- Works during development AND compiles correctly in build output
- Used throughout component files (e.g., `import { Polymorphic } from "@/types/Polymorphic"`)

### Package Exports

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./styles.css": "./dist/index.css",
    "./fonts.css": "./dist/fonts.css"
  }
}
```

Consumers import:

```tsx
import { Box, Text, Heading } from "@tosui/react";
import "@tosui/react/styles.css"; // Required
import "@tosui/react/fonts.css"; // Optional (IBM Plex)
```

### Design Tokens

All tokens are defined in `packages/react/src/styles/styles.css` as CSS variables:

**Colors:** Minimal set with semantic naming

- Raw neutrals: `black`, `gray-dark`, `gray`, `gray-light`, `white`
- Semantic: `foreground`, `foreground-muted`, `foreground-subtle`, `border`, `border-muted`, `background`, `surface`
- Brand: `primary-*`, `accent-*` (default, emphasis, subtle variants)
- Feedback: `success-*`, `warning-*`, `error-*`, `info-*` (default, emphasis, subtle variants)

**Spacing:** 4px base unit, multipliers 0-32

- `--t-spacing-unit: 4px`
- Usage: `p={4}` = 16px padding

**Typography:**

- Font sizes: `xs` (12px) through `5xl` (48px) - 9 sizes
- Font weights: `normal`, `medium`, `semibold`, `bold` - 4 weights
- Line heights: `tight`, `normal`, `relaxed` - 3 values
- Font families: System stacks (sans, serif, mono)

**Border radius:** `none`, `sm`, `md`, `lg`, `full` - 5 values

**Shadows:** `none`, `sm`, `md`, `lg` - 4 elevation levels

**Breakpoints (mobile-first):**

- `sm`: 640px, `md`: 768px, `lg`: 1024px, `xl`: 1280px, `2xl`: 1536px

See `README.md` for complete token documentation.

## TypeScript Configuration

**Three tsconfig files:**

- `tsconfig.json` - Root config with project references
- `tsconfig.app.json` - Main source code config
- `tsconfig.build.json` - Library build config (extends app, enables declaration output)

**Key difference:** `tsconfig.app.json` has `noEmit: true` to prevent tsc from generating files during development. `tsconfig.build.json` overrides this for library builds.

## Important Patterns

### Polymorphic Components

Components use the `Polymorphic<T, P>` type to support the `as` prop:

```tsx
<Box as="section" />      // Renders <section> with section's valid props
<Text as="label" />       // Renders <label> with label's valid props
```

### Cascading Specificity

Props follow cascading specificity rules (more specific overrides less specific):

```tsx
// Border width: all → X/Y → individual sides
<Box border="thin" borderX="medium" borderLeft="thick" />
// Result: left=thick, right=medium, top=thin, bottom=thin

// Padding: all → X/Y → individual sides
<Box p={4} px={6} pl={8} />
// Result: left=8, right=6, top=4, bottom=4
```

### Responsive Values

Use `ResponsiveValue<T>` type for props that support responsive objects:

```tsx
type ResponsiveValue<T> = T | ResponsiveObject<T>;
type ResponsiveObject<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};
```

Always use `toFullResponsiveObject()` helper to fill missing breakpoints before passing to StyleX responsive functions.

## Critical Rules

1. **Never use CSS shorthands** - StyleX forbids them, always use longhand properties
2. **All responsive breakpoints in one object** - StyleX drops earlier styles when merging same property
3. **Read STYLEX_MENTAL_MODEL.md** - Contains critical gotchas and implementation patterns
4. **Path aliases compile correctly** - `@/*` is configured properly, use it throughout
5. **Ternaries over utility functions** - Don't use `call()` utility, use simple ternary expressions
6. **Build before testing exports** - Run `pnpm f:lib build` to generate dist files before testing package exports
