# Technology Stack

**Analysis Date:** 2026-01-11

## Languages

**Primary:**
- TypeScript 5.9.3 - All application code (`packages/react/package.json`, `packages/docs/package.json`)

**Secondary:**
- CSS - Design tokens and CSS modules (`packages/react/src/styles/`)
- JavaScript - Build scripts, config files

## Runtime

**Environment:**
- Node.js 20.x - Specified in `packages/docs/package.json` engines field and GitHub workflows
- React 19.2.0 - UI library (`packages/react/package.json`)
- Browser runtime - Component library targets browser environments

**Package Manager:**
- pnpm 10.15.0 - `package.json` (packageManager field)
- Lockfile: `pnpm-lock.yaml` present
- Workspace: `pnpm-workspace.yaml` for monorepo

## Frameworks

**Core:**
- React 19.2.0 - UI component framework (`packages/react/package.json`)

**Testing:**
- None configured - TypeScript and ESLint are primary quality gates

**Build/Dev:**
- Vite 7.2.4 - Bundling and dev server (`packages/react/vite.config.ts`)
- TypeScript 5.9.3 - Compilation (`packages/react/package.json`)
- Docusaurus 3.9.2 - Documentation site (`packages/docs/package.json`)

## Key Dependencies

**Critical:**
- `react@19.2.0` - UI library (`packages/react/package.json`)
- `react-dom@19.2.0` - React DOM bindings (`packages/react/package.json`)
- `clsx@2.1.1` - Utility for classname merging (`packages/react/package.json`)

**Styling:**
- CSS Modules - Component-level styling (`.module.css` files throughout)
- CSS Variables - Design tokens (`packages/react/src/styles/styles.css`)
- PostCSS 8.5.6 - CSS processing (`packages/react/package.json`)

**Documentation:**
- `@docusaurus/core@3.9.2` - Documentation framework (`packages/docs/package.json`)
- `@docusaurus/preset-classic@3.9.2` - Classic preset (`packages/docs/package.json`)
- `@mdx-js/react@3.1.1` - MDX support (`packages/docs/package.json`)
- `prism-react-renderer@2.4.1` - Syntax highlighting (`packages/docs/package.json`)

**Infrastructure:**
- `@changesets/cli@2.29.8` - Semantic versioning and publishing (`package.json`)
- `vite-plugin-dts@4.5.4` - TypeScript declarations (`packages/react/package.json`)

## Configuration

**Environment:**
- No environment variables required (library only)
- Configuration via build config files

**Build:**
- `packages/react/vite.config.ts` - Vite build configuration
- `packages/react/tsconfig.json` - Root TypeScript config
- `packages/react/tsconfig.app.json` - App source config (noEmit: true)
- `packages/react/tsconfig.build.json` - Build config (declaration output)
- `packages/react/eslint.config.js` - ESLint flat config
- `packages/docs/docusaurus.config.ts` - Docusaurus configuration

**Path Aliases:**
- `@/*` resolves to `src/*` in library package

## Platform Requirements

**Development:**
- macOS/Linux/Windows (any platform with Node.js)
- pnpm 10+ required
- No external dependencies

**Production:**
- Distributed as npm package (`@tosui/react`)
- ES module output only
- CSS code splitting enabled (fonts.css separate)
- TypeScript declarations included

---

*Stack analysis: 2026-01-11*
*Update after major dependency changes*
