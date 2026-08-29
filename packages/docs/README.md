# Tosui documentation site

This package builds the [Tosui documentation](https://dgca.github.io/tosui/) with Docusaurus. Storybook runs as a separate process during local development and is copied into the production site.

Run commands from the repository root.

## Start the documentation locally

Install the workspace dependencies:

```bash
pnpm install
```

Start both Docusaurus and Storybook:

```bash
pnpm dev:docs
```

Docusaurus listens on `http://localhost:3000/tosui/`. Storybook listens on `http://localhost:6006/`.

## Build the documentation

Build the library, Storybook, and the documentation site:

```bash
pnpm build:site
```

The command writes the deployable site to `packages/docs/build` and copies Storybook to `packages/docs/build/storybook`.

To run every CI check, use:

```bash
pnpm verify
```

## Edit the documentation

- `docs/` contains guides and component reference pages.
- `sidebars.ts` defines the documentation navigation.
- `src/` contains Docusaurus pages, components, and styles.
- `static/` contains images and other static assets.
- `docusaurus.config.ts` configures the site and the generated LLM reference files.

Each component page links to its Storybook story. Keep the props table and the examples in sync with the exported types in `packages/react/src/index.tsx`.
