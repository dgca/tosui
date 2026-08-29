# @tosui/react

Tosui is a React component library with 40 components, semantic design tokens, responsive style props, and TypeScript types.

## Install

```bash
npm install @tosui/react
```

React 18 and React 19 are supported peer dependencies.

## Set up the styles

Import the required stylesheet once in your application entry point:

```tsx
import "@tosui/react/styles.css";
```

To use the bundled IBM Plex Sans and IBM Plex Mono fonts, import the optional font stylesheet after the base styles:

```tsx
import "@tosui/react/styles.css";
import "@tosui/react/fonts.css";
```

## Use components

```tsx
import { Box, Button, Heading, Text } from "@tosui/react";

export function Welcome() {
  return (
    <Box p={6} bg="surface" rounded="lg">
      <Heading size="3xl" weight="semibold">
        Welcome
      </Heading>
      <Text as="p" color="foreground-muted" mt={2} mb={4}>
        Build with a small set of layout and design tokens.
      </Text>
      <Button>Continue</Button>
    </Box>
  );
}
```

## Style components

`Box` and the components built on it accept constrained style props. Numeric spacing values multiply the `4px` base unit.

```tsx
<Box p={4} />
<Box p={{ base: 2, md: 4, lg: 6 }} />
<Box bg="error-subtle" color="error" />
<Box as="section" />
```

Use `size`, `weight`, and `align` for `Text` and `Heading` typography. Use `fontSize`, `fontWeight`, and `textAlign` on `Box`.

```tsx
<Text size="sm" weight="medium" align="center" />
<Heading level={2} size="2xl" />
<Box fontSize="sm" fontWeight="medium" textAlign="center" />
```

## Customize the theme

Override the light and dark primitive variables after you import `styles.css`:

```css
:root {
  --t-light-primary-default: #0d9488;
  --t-light-primary-emphasis: #0f766e;
  --t-light-primary-subtle: #ccfbf1;
  --t-dark-primary-default: #2dd4bf;
  --t-dark-primary-emphasis: #5eead4;
  --t-dark-primary-subtle: #134e4a;
}
```

See the [Tosui documentation](https://dgca.github.io/tosui/) for component props, design tokens, responsive styling, state styling, and theme overrides.

## License

MIT
