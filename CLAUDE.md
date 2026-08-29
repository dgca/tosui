# Repository guidance

Tosui is a pnpm monorepo for a constrained React component library and its documentation site.

## Find the source of truth

- `packages/react` contains `@tosui/react`, its tests, and Storybook stories.
- `packages/docs` contains the Docusaurus site and generated LLM documentation configuration.
- Root and package `package.json` files define the available commands. Read them instead of assuming a script name.
- `packages/react/src/styles/styles.css` defines the design tokens.
- `packages/react/src/index.tsx` defines the public package exports.

## Verify changes

Run the narrowest relevant checks while developing. Before completing a cross-cutting change, run:

```bash
pnpm verify
```

Useful focused commands include:

```bash
pnpm f:lib test
pnpm f:lib typecheck
pnpm f:lib lint
pnpm f:lib build
pnpm f:docs typecheck
pnpm f:docs build
```

## Work with the styling system

`Box` composes style resolvers from `packages/react/src/components/Box`. Each resolver returns a CSS Module class name and, when needed, CSS custom properties.

There are two responsive implementations:

- Variable-based props use `getResponsiveVarStyles()` and CSS fallback chains. Examples include spacing, sizing, inset, grid templates, and gaps.
- Enum-based props use `getEnumResponsiveStyles()` and a class for each value, breakpoint, and state. Examples include colors, typography, borders, and display.

Keep a style prop's type, resolver, CSS Module classes, tests, and documentation in sync. Most Box props support `_hover`, `_focus`, `_active`, and `_disabled`. Grid props currently support `_hover` only; `TODO.md` tracks the remaining states.

Use `Polymorphic<T, P>` for components whose `as` prop changes the accepted HTML attributes. Check `src/index.tsx` after adding or renaming a public component or type.

## Update documentation with the API

Every file in `packages/docs/docs` must have `title` and `description` frontmatter. Component reference pages must describe the exported props and current runtime behavior. Test example imports against the package-root exports.

The docs build generates `llms.txt`, `llms-full.txt`, focused LLM files, and one Markdown file per page. When component categories or Box-prop support changes, also update `rootContent` and `fullRootContent` in `packages/docs/docusaurus.config.ts`.

For a component change, completion means:

1. The implementation, types, and public exports agree.
2. Tests cover the changed behavior.
3. Storybook demonstrates user-visible states when applicable.
4. The component page and relevant guide describe the current API.
5. Relevant focused checks pass, followed by `pnpm verify` for cross-cutting work.
