# Tosui

Tosui is a React component library with a small, semantic design-token system. Its 40 components cover layout, forms, navigation, feedback, data display, and overlays.

- [Documentation](https://dgca.github.io/tosui/)
- [Component reference](https://dgca.github.io/tosui/docs/components/box)
- [Storybook](https://dgca.github.io/tosui/storybook/)
- [npm package](https://www.npmjs.com/package/@tosui/react)

## Install Tosui

```bash
npm install @tosui/react
```

Import the required stylesheet once in your application entry point:

```tsx
import "@tosui/react/styles.css";
```

Then import components from `@tosui/react`:

```tsx
import { Box, Button, Heading, Text } from "@tosui/react";

export function Welcome() {
  return (
    <Box p={6} bg="surface" rounded="lg">
      <Heading size="3xl" weight="semibold">
        Welcome to Tosui
      </Heading>
      <Text as="p" color="foreground-muted" mt={2} mb={4}>
        A small design system for React.
      </Text>
      <Button>Get started</Button>
    </Box>
  );
}
```

See [Get started](https://dgca.github.io/tosui/docs/get-started) for font setup, global styles, and next steps.

## Design constraints

Tosui limits the styling choices available through component props. The constraints keep components consistent and make themes easier to change.

- Spacing uses a `4px` base unit and multipliers from `0` through `32`.
- Colors use semantic tokens that adapt to light and dark themes.
- Responsive props use mobile-first breakpoint objects.
- `_hover`, `_focus`, `_active`, and `_disabled` apply state styles.
- Polymorphic components use `as` to change the rendered element while preserving element-specific TypeScript props.

```tsx
<Box
  as="section"
  p={{ base: 4, md: 6 }}
  bg="surface"
  _hover={{ shadow: "md" }}
/>
```

The [styling guides](https://dgca.github.io/tosui/docs/guide/spacing) describe the token and prop APIs.

## Develop Tosui

Tosui uses pnpm 10 and Node.js 20 or later.

```bash
pnpm install
pnpm dev:docs
```

`pnpm dev:docs` starts both the documentation site and Storybook. Before you open a pull request, run the same verification command as CI:

```bash
pnpm verify
```

## Packages

- `packages/react` contains the `@tosui/react` library and Storybook stories.
- `packages/docs` contains the Docusaurus documentation site.

## License

Tosui is available under the MIT License.
