---
title: Get started
description: "Install Tosui, load its styles, and render a themed card in a React application."
---

# Get started

In this tutorial, we build a small profile card and confirm that Tosui's styles load correctly.

## Install Tosui

Add `@tosui/react` to your React application:

```bash
npm install @tosui/react
```

Tosui supports React 18 and React 19.

## Load the base styles

Import the required stylesheet once in your application entry point, such as `main.tsx`:

```tsx
import "@tosui/react/styles.css";
```

The stylesheet defines the design tokens and sets these two styles on `:root`:

```css
:root {
  color: var(--t-color-foreground);
  background-color: var(--t-color-background);
}
```

Tosui does not apply a global CSS reset or element-level styles. To keep your application's existing page colors, override both declarations after the Tosui import.

```css
:root {
  color: unset;
  background-color: unset;
}
```

## Render a profile card

Add the following component to your application:

```tsx
import { Box, Button, Heading, Text } from "@tosui/react";

export function ProfileCard() {
  return (
    <Box
      as="article"
      maxW="360px"
      p={6}
      bg="surface"
      border="thin"
      borderColor="border"
      rounded="lg"
    >
      <Heading level={2} size="2xl">
        Ada Lovelace
      </Heading>
      <Text as="p" size="sm" color="foreground-muted" mt={1} mb={4}>
        Computing pioneer
      </Text>
      <Button>View profile</Button>
    </Box>
  );
}
```

You should see a bordered card with theme-aware text, spacing, and a primary button. If the card appears unstyled, confirm that `styles.css` loads before the component renders.

## Add the optional fonts

To use IBM Plex Sans and IBM Plex Mono, import `fonts.css` after the base stylesheet:

```tsx
import "@tosui/react/styles.css";
import "@tosui/react/fonts.css";
```

Without `fonts.css`, Tosui uses system font stacks.

## Continue from here

- Use the [spacing guide](/docs/guide/spacing) to size gaps and padding.
- Use the [colors guide](/docs/guide/colors) to choose text, background, and border tokens.
- Use the [responsive styling guide](/docs/guide/responsive) to change props at breakpoints.
- Use the [customization guide](/docs/guide/customization) to define a brand theme.
- Open the component reference in the sidebar to find props and examples.
