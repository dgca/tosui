# Codebase Structure

**Analysis Date:** 2026-01-11

## Directory Layout

```
tosui/
├── packages/
│   ├── react/              # Component library (@tosui/react)
│   │   ├── src/
│   │   │   ├── components/ # React components
│   │   │   ├── styles/     # Design tokens, CSS variables
│   │   │   ├── types/      # TypeScript type helpers
│   │   │   └── utils/      # Utility functions
│   │   ├── dist/           # Build output (generated)
│   │   └── *.config.*      # Build configuration
│   │
│   └── docs/               # Documentation site (Docusaurus)
│       ├── src/
│       ├── docs/           # Markdown documentation
│       └── build/          # Build output (generated)
│
├── .github/workflows/      # CI/CD automation
├── package.json            # Workspace root config
├── pnpm-workspace.yaml     # Workspace definition
├── CLAUDE.md               # Project guidelines
└── README.md               # Project documentation
```

## Directory Purposes

**packages/react/src/components/**
- Purpose: React component implementations
- Contains: Component directories (Box/, Text/, Heading/, Button/, Spinner/)
- Key files: Each component has main `.tsx` and `.module.css` files
- Subdirectories: Box has style parts subdirectories (padding/, margin/, etc.)

**packages/react/src/components/Box/**
- Purpose: Core layout primitive with all style props
- Contains: Main component + style parts + shared utilities
- Key files: `Box.tsx`, `shared/constants.ts`, `shared/types.ts`
- Subdirectories: 18 style part directories (padding/, margin/, flexbox/, etc.)

**packages/react/src/styles/**
- Purpose: Design tokens and CSS variable definitions
- Contains: Global CSS files for theming
- Key files: `styles.css` (main tokens), `_color-scheme.css` (light/dark), `fonts.css` (optional)
- Subdirectories: None

**packages/react/src/types/**
- Purpose: Shared TypeScript type utilities
- Contains: Complex type definitions
- Key files: `Polymorphic.ts` (polymorphic component type helper)
- Subdirectories: None

**packages/react/src/utils/**
- Purpose: Shared utility functions
- Contains: Responsive design helpers
- Key files: `breakpoints.ts` (breakpoint definitions and helpers)
- Subdirectories: None

**packages/docs/**
- Purpose: Docusaurus documentation site
- Contains: MDX documentation, custom components
- Key files: `docusaurus.config.ts`, `sidebars.ts`
- Subdirectories: `docs/` for markdown, `src/` for custom components

## Key File Locations

**Entry Points:**
- `packages/react/src/index.tsx` - Library public API exports
- `packages/react/src/main.tsx` - Development server entry
- `packages/docs/docusaurus.config.ts` - Documentation site config

**Configuration:**
- `packages/react/vite.config.ts` - Vite build configuration
- `packages/react/tsconfig.json` - Root TypeScript config
- `packages/react/tsconfig.app.json` - App source config
- `packages/react/tsconfig.build.json` - Library build config
- `packages/react/eslint.config.js` - ESLint configuration
- `pnpm-workspace.yaml` - Workspace definition
- `.npmrc` - pnpm configuration

**Core Logic:**
- `packages/react/src/components/Box/Box.tsx` - Core layout component
- `packages/react/src/components/Box/shared/` - Shared constants and types
- `packages/react/src/components/Box/*/` - Style part implementations

**Styling:**
- `packages/react/src/styles/styles.css` - Design token definitions
- `packages/react/src/styles/_color-scheme.css` - Light/dark theme colors
- `packages/react/src/styles/fonts.css` - Optional IBM Plex fonts

**Testing:**
- Not implemented - no test directory

**Documentation:**
- `README.md` - Project overview and design tokens reference
- `CLAUDE.md` - Developer guidelines for Claude Code
- `packages/react/STYLEX_MENTAL_MODEL.md` - Styling system documentation

## Naming Conventions

**Files:**
- PascalCase for components: `Box.tsx`, `Button.tsx`, `Text.tsx`
- kebab-case for CSS modules: `button.module.css`, `padding.module.css`
- kebab-case for utilities: `breakpoints.ts`
- PascalCase for type files: `Polymorphic.ts`

**Directories:**
- PascalCase for component directories: `Box/`, `Button/`, `Text/`
- kebab-case for style parts: `padding/`, `flexbox/`, `colors/`
- Lowercase for utility directories: `types/`, `utils/`, `styles/`

**Special Patterns:**
- `*.module.css` - CSS module files
- `index.tsx` - Barrel exports (used in Text/, Heading/, Button/, Spinner/)
- `_*.css` - Partial CSS files (e.g., `_color-scheme.css`)

## Where to Add New Code

**New Primitive Component:**
- Implementation: `packages/react/src/components/{ComponentName}/`
- Main file: `{ComponentName}.tsx`
- Styles: `{componentName}.module.css`
- Export: Add to `packages/react/src/index.tsx`

**New Style Part for Box:**
- Implementation: `packages/react/src/components/Box/{partName}/`
- Logic: `{partName}.ts`
- Styles: `{partName}.module.css`
- Integration: Import in `Box.tsx`, add to props interface

**New Utility:**
- Implementation: `packages/react/src/utils/{utilityName}.ts`
- Export: Import where needed (no barrel file for utils)

**New Type Helper:**
- Implementation: `packages/react/src/types/{TypeName}.ts`
- Export: Import where needed (no barrel file for types)

**New Design Tokens:**
- Implementation: `packages/react/src/styles/styles.css`
- Follow existing CSS variable naming: `--t-{category}-{variant}`

## Special Directories

**packages/react/dist/**
- Purpose: Build output
- Source: Generated by `pnpm f:lib build`
- Committed: No (in .gitignore)

**packages/docs/build/**
- Purpose: Documentation site build
- Source: Generated by `pnpm f:docs build`
- Committed: No (in .gitignore)

**node_modules/**
- Purpose: Dependencies
- Source: Generated by `pnpm install`
- Committed: No (in .gitignore)

---

*Structure analysis: 2026-01-11*
*Update when directory structure changes*
