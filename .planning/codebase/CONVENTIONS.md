# Coding Conventions

**Analysis Date:** 2026-01-11

## Naming Patterns

**Files:**
- PascalCase for component files: `Box.tsx`, `Button.tsx`, `Text.tsx`, `Heading.tsx`
- kebab-case for CSS modules: `button.module.css`, `padding.module.css`
- kebab-case for style parts: `padding.ts`, `margin.ts`, `colors.ts`
- PascalCase for type files: `Polymorphic.ts`
- kebab-case for utilities: `breakpoints.ts`

**Functions:**
- camelCase for all functions
- PascalCase for React components: `Box()`, `Button()`, `Text()`
- Verb prefix for getters: `getPaddingStyles()`, `getColorStyles()`, `combineStyles()`
- Prefix pattern for class getters: `getColorClass()`, `getJustifyContentClass()`

**Variables:**
- camelCase for variables: `colorConfig`, `sizeConfig`
- UPPER_SNAKE_CASE for constants: `STATE_SUFFIXES`, `STATE_CLASS_SUFFIXES`, `RESPONSIVE_KEYS`
- No underscore prefix for private members

**Types:**
- PascalCase for interfaces and types: `BoxProps`, `ButtonVariant`, `StyleResult`
- Suffix pattern: `{Component}Props`, `{Component}OwnProps`
- Union types for variants: `type ButtonVariant = "solid" | "outline" | "ghost"`

## Code Style

**Formatting:**
- Prettier with default settings (`.pretterrc` is empty `{}`)
- 2-space indentation
- Double quotes for JSX attributes and strings
- Semicolons always present
- No enforced line length limit

**Linting:**
- ESLint with flat config (`packages/react/eslint.config.js`)
- Extends: `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`
- TypeScript strict mode enabled
- Run: `pnpm f:lib lint`

## Import Organization

**Order:**
1. React and external packages (`react`, `clsx`)
2. Type imports (`import type { ... }`)
3. Internal modules (`@/types`, `@/utils`)
4. Relative imports (`./shared`, `../styles`)
5. CSS imports (`./button.module.css`)

**Grouping:**
- Type imports separated with `import type { ... }`
- CSS module imports at end

**Path Aliases:**
- `@/*` maps to `src/*` (configured in tsconfig and vite)
- Used for cross-directory imports: `import { Polymorphic } from "@/types/Polymorphic"`

## Error Handling

**Patterns:**
- No runtime error handling (compile-time validation via TypeScript)
- TypeScript strict mode catches prop errors
- No try/catch needed (stateless UI components)

**Error Types:**
- Invalid props produce TypeScript errors, not runtime exceptions
- ESLint rules validate pattern usage

## Logging

**Framework:**
- No logging (library code)

**Patterns:**
- Console.log only in development playground (`App.tsx`)
- No logging in production library code

## Comments

**When to Comment:**
- Explain why, not what
- Document complex type patterns
- Section headers for code organization

**JSDoc/TSDoc:**
- Brief summary (1-2 lines) above component functions
- Features listed as bullets
- Example from `Button.tsx`:
```tsx
/**
 * Button - Interactive button component
 *
 * A polymorphic button component that provides:
 * - Default element: <button>
 * - Variants: solid (default), outline, ghost
 * - Sizes: sm, md (default), lg
 * - Loading state with spinner
 */
```

**Section Headers:**
- ASCII box-drawing comments for major sections:
```tsx
// ============================================================================
// Types
// ============================================================================
```

**TODO Comments:**
- Format: `// TODO: description`
- Rare in this codebase (clean implementation)

## Function Design

**Size:**
- Keep functions focused and single-purpose
- Getter functions typically 10-30 lines
- Components can be longer (100-300 lines) due to prop handling

**Parameters:**
- Destructure objects in parameter list
- Use TypeScript interfaces for complex props
- Default values in function signature: `size = "md"`

**Return Values:**
- Explicit return types on public functions
- StyleResult pattern: `{ className: string; style: CSSProperties }`
- Early returns for guard clauses

## Module Design

**Exports:**
- Named exports for all public APIs
- No default exports
- Type exports explicit: `export type { BoxProps }`

**Barrel Files:**
- `index.tsx` in component directories exports component and types
- Main `src/index.tsx` exports public API
- Style parts do not use barrel files (imported directly)

## Component Conventions

**Props Pattern:**
- Own props interface: `{Component}OwnProps`
- Full props type: `{Component}Props<T>` (generic for polymorphic)
- State props: `_hover`, `_focus`, `_active`, `_disabled`

**Cascading Specificity:**
- Props follow cascade: general → axis → specific
- Example: `p` → `px/py` → `pt/pr/pb/pl`

**Polymorphic Pattern:**
- All components support `as` prop
- Default element specified: `as = "div"`, `as = "button"`, etc.
- Type: `Polymorphic<T extends ElementType, P>`

## CSS Conventions

**CSS Variable Naming:**
- Prefix: `--t-` (tosui)
- Pattern: `--t-{category}-{variant}`
- Examples: `--t-color-primary-default`, `--t-spacing-unit`, `--t-pt`

**CSS Module Class Naming:**
- Semantic names: `.button`, `.solid`, `.pt`
- State suffixes: `:h` (hover), `:f` (focus), `:a` (active), `:d` (disabled)
- Responsive suffixes: `_sm`, `_md`, `_lg`, `_xl`, `_2xl`

**Breakpoints (Mobile-First):**
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

---

*Convention analysis: 2026-01-11*
*Update when patterns change*
