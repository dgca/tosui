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
   - CLAUDE.md (this file)
   - Code comments explaining complex logic

4. **Verify before claiming success** - Don't assume changes work. Build, test, and verify before reporting completion.

## Project Overview

Tosui is a themable, orderly, simple UI component library built on **constraint-driven simplicity**. It's a foundation for building design systems with intentionally limited options to reduce decision fatigue and improve consistency.

**Core philosophy**: Fewer, better choices. Composition over configuration. Semantic tokens, not prescriptive values.

## Monorepo Structure

This is a pnpm workspace with two packages:

- `packages/react` - The component library (`@tosui/react`)
- `packages/docs` - Docusaurus documentation site

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

### CSS Modules Styling System

Tosui uses **CSS Modules** for component styling with **CSS Variables** for design tokens. This provides:

- Zero runtime CSS generation (styles compile at build time)
- Component-scoped class names (no style collisions)
- Type-safe class imports via `.module.css` files
- CSS Variables for theming and dynamic values

**Key concepts:**
- Each style part exports a getter function (e.g., `getPaddingStyles()`) that returns `{ className: string; style: Record<string, string> }`
- Two shared utilities in `Box/shared/responsive.ts` handle all responsive + state logic (see below)
- CSS Modules provide the class names, CSS Variables provide dynamic values

### Two Responsive Styling Patterns

Style props fall into two categories, each with a different zero-cost responsive strategy:

#### 1. Variable-based props (padding, margin, sizing, inset, grid, gap, flex)

These props accept arbitrary values (numbers, CSS strings). They use **CSS variable fallback chains** — one CSS class per prop, with `var()` fallbacks handling breakpoint cascading in pure CSS. JS only sets the CSS variables for specified breakpoints.

```css
/* padding.module.css — one class handles all breakpoints via fallback chains */
.pt { padding-top: var(--t-pt); }
@media (min-width: 640px) {
  .pt { padding-top: var(--t-pt_sm, var(--t-pt)); }
}
@media (min-width: 768px) {
  .pt { padding-top: var(--t-pt_md, var(--t-pt_sm, var(--t-pt))); }
}
/* ... etc for each breakpoint */
```

```tsx
// Uses shared utility: getResponsiveVarStyles(styles, classKey, varPrefix, value, state, transform)
getResponsiveVarStyles(styles, "pt", "pt", props.pt, "base", getRawValue);
// → { className: "pt", style: { "--t-pt": "calc(var(--t-spacing-unit) * 4)" } }
```

#### 2. Enum-based props (display, position, colors, typography, borders, roundness, shadows, etc.)

These props accept a fixed set of string values. They use **per-breakpoint CSS classes** — each (value, breakpoint, state) combination maps to a unique class. No inline styles, pure class-name lookup, zero runtime cost.

```css
/* colors.module.css — one class per (value, breakpoint, state) */
.color-foreground { color: var(--t-color-foreground); }
.color-foreground_sm { color: var(--t-color-foreground); }
.color-foreground\:h:hover { color: var(--t-color-foreground); }
.color-foreground_sm\:h:hover { color: var(--t-color-foreground); }

@media (min-width: 640px) {
  .color-foreground_sm { color: var(--t-color-foreground); }
  .color-foreground_sm\:h:hover { color: var(--t-color-foreground); }
}
/* ... etc for each breakpoint + state */
```

```tsx
// Uses shared utility: getEnumResponsiveStyles(styles, classPrefix, value, state)
getEnumResponsiveStyles(styles, "color", props.color, "base");
// → { className: "color-foreground", style: {} }
```

### State Props

All style props support interaction states via `_hover`, `_focus`, `_active`, and `_disabled` props. These are typed using a shared `StateProps<T>` generic in `Box/shared/types.ts`.

```tsx
<Box
  bg="surface"
  color="foreground"
  _hover={{ bg: "primary-subtle", color: "primary-default" }}
  _disabled={{ opacity: "faint", cursor: "not-allowed" }}
/>
```

State props within each `_hover`/`_focus`/`_active`/`_disabled` object also accept responsive values.

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

**Responsive support:** All style props accept either a simple value OR a responsive object:

```tsx
<Box p={4} />                              // Simple: 16px padding
<Box p={{ base: 2, md: 4, lg: 6 }} />    // Responsive: 8px → 16px → 24px
```

### Style Parts Organization

Component styling is split into modular "style parts" in `packages/react/src/components/Box/`:

- `shared/` - Shared utilities, types, and constants (see below)
- `reset/` - CSS reset styles
- `display/`, `position/`, `overflow/`, `zIndex/` - Layout
- `padding/`, `margin/`, `sizing/` - Box model
- `flexbox/`, `grid/`, `inset/` - Advanced layout
- `typography/`, `colors/` - Visual
- `borders/`, `roundness/`, `shadows/` - Surface
- `interactions/`, `text/`, `opacity/` - Behavior
Each style part directory contains:
1. `{name}.ts` - Type definitions and getter function (e.g., `getPaddingStyles()`)
2. `{name}.module.css` - CSS classes with responsive breakpoints and state variants

### Shared Utilities (`Box/shared/`)

- `responsive.ts` - `getResponsiveVarStyles()` (variable-based) and `getEnumResponsiveStyles()` (enum-based)
- `types.ts` - `StyleResult`, `StateProps<T>`, `StateKey`
- `constants.ts` - `RESPONSIVE_KEYS`, `STATE_SUFFIXES`, `STATE_CLASS_SUFFIXES`
- `spacing.ts` - `getRawValue()` helper for spacing multiplier → CSS calc conversion
- `index.ts` - Re-exports

### Build Configuration

**Library build (`packages/react/vite.config.ts`):**

- ES module output only (`formats: ["es"]`)
- Externalized dependencies: `react`, `react-dom`, `react/jsx-runtime`
- TypeScript declarations via `vite-plugin-dts` using `tsconfig.build.json`
- **CSS code splitting enabled** (`cssCodeSplit: true`) to separate fonts.css
- Sourcemaps enabled
- Empty dist on rebuild

**Key files:**

- `src/index.tsx` - Entry point, imports `styles.css` and dynamically imports `fonts.css`
- `dist/index.js` - Bundled JavaScript
- `dist/index.css` - Main CSS bundle (design tokens + CSS module styles)
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
All style props use `ResponsiveValue<T>` to support responsive objects:
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

Mobile-first cascade is handled differently per pattern:
- **Variable-based**: CSS `var()` fallback chains cascade automatically (e.g., `var(--t-pt_md, var(--t-pt_sm, var(--t-pt)))`)
- **Enum-based**: Each specified breakpoint gets its own CSS class; unspecified breakpoints inherit via CSS media query ordering

## Documentation Site & LLM Output

The docs site (`packages/docs`) uses Docusaurus with `docusaurus-plugin-llms` to generate LLM-friendly documentation files during build. The build command chains `docusaurus build` → `scripts/clean-llm-output.mjs` (post-build cleanup).

### Generated LLM Files

| File | Content |
|------|---------|
| `llms.txt` | Index with descriptions + links to individual `.md` files |
| `llms-full.txt` | All docs concatenated into one file |
| `llms-components.txt` | All 40 component docs only |
| `llms-guide.txt` | Guide docs only (intro, get-started, styling guides) |
| `*.md` (per doc) | Individual clean markdown files for each doc page |

### Post-Build Cleanup Script

`packages/docs/scripts/clean-llm-output.mjs` runs after the Docusaurus build to strip JSX noise from the generated LLM files:
- Removes `<TabItem value="preview">` blocks (duplicated code examples used for live previews)
- Strips `<Tabs>`, `<TabItem>` wrapper tags
- Cleans empty code fences left by import stripping
- Collapses excessive blank lines

### Frontmatter Requirements

**All doc files must have frontmatter** with `title` and `description`. The plugin uses `description` for the summary in `llms.txt`. Without it, descriptions fall back to the first line of content (which for MDX files is often an import statement).

```yaml
---
title: ComponentName
description: "One-line description of what the component does."
---
```

### Plugin Configuration

The plugin is configured in `docusaurus.config.ts` with:
- `includeOrder` — Controls doc ordering (guides first, then components by category)
- `rootContent` / `fullRootContent` — Custom intro text at the top of generated files (includes Box prop inheritance docs, quick reference, component categories)
- `generateMarkdownFiles` — Individual `.md` files linked from `llms.txt`
- `customLLMFiles` — Focused subsets (`llms-components.txt`, `llms-guide.txt`)
- `excludeImports` / `removeDuplicateHeadings` — Content cleaning

### Box Props Documentation in LLM Output

The `rootContent` and `fullRootContent` in the plugin config contain critical information about which components accept Box styling props. **If you add or change components, update these lists** in `docusaurus.config.ts` to keep the LLM output accurate.

## Critical Rules

1. **Path aliases compile correctly** - `@/*` is configured properly, use it throughout
2. **Build before testing exports** - Run `pnpm f:lib build` to generate dist files before testing package exports
3. **Two responsive patterns** - Variable-based props use `getResponsiveVarStyles()` (CSS fallback chains + inline vars). Enum-based props use `getEnumResponsiveStyles()` (per-breakpoint classes, zero runtime).
4. **State props via shared generic** - Use `StateProps<T>` from `Box/shared/types.ts`. All props support `_hover`, `_focus`, `_active`, `_disabled`.
5. **Mobile-first responsive** - Variable-based props cascade via nested `var()` fallbacks. Enum-based props cascade via CSS media query ordering.
6. **Doc frontmatter required** - All `.md`/`.mdx` files in `packages/docs/docs/` must have `title` and `description` frontmatter for proper LLM output generation
