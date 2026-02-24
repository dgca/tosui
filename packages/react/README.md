# @tosui/react

A themable, orderly, simple UI component library for React. 40 components with CSS Modules styling, responsive props, TypeScript-first types, and constraint-driven design.

## Installation

```bash
npm install @tosui/react
# or
pnpm add @tosui/react
```

## Setup

```tsx
// Import base styles in your entry point (required)
import "@tosui/react/styles.css";

// Optionally import IBM Plex fonts
import "@tosui/react/fonts.css";
```

## Usage

```tsx
import { Box, Text, Heading, Button } from "@tosui/react";

function App() {
  return (
    <Box p={6}>
      <Heading size="3xl" weight="semibold">
        Welcome
      </Heading>
      <Text color="foreground-muted">
        A constraint-driven design system for React
      </Text>
      <Button>Get Started</Button>
    </Box>
  );
}
```

## Components

| Category | Components |
|----------|------------|
| **Primitives** | Box, Text, Heading |
| **Layout** | Stack, HStack, VStack, Flex, Grid, Container, Divider, Spacer |
| **Forms** | Button, IconButton, Input, Select, Textarea, Checkbox, Radio, Switch, FormField, Label |
| **Navigation** | Link, Tabs, Breadcrumb, Menu, Pagination |
| **Feedback** | Alert, Badge, Progress, Skeleton, Spinner |
| **Data Display** | Avatar, Card, Image, List, Code |
| **Overlays** | Modal, Tooltip, Popover, Accordion |

## Key Concepts

### Spacing

4px base unit with multipliers 0–32:

```tsx
<Box p={4} />        // 16px padding
<Box m={8} />        // 32px margin
<Box gap={2} />      // 8px gap
```

### Responsive Props

Mobile-first breakpoints — `base` (0), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px):

```tsx
<Box p={{ base: 2, md: 4, lg: 6 }} />
<Box display={{ base: "none", md: "block" }} />
```

### Color Tokens

Semantic names that adapt to light/dark mode:

```tsx
<Box bg="surface" color="foreground" />
<Box bg="primary-default" color="foreground-inverted" />
<Text color="foreground-muted">Secondary text</Text>
<Box bg="error-subtle" color="error-default">Error message</Box>
```

**Surface & Text**: `foreground`, `foreground-muted`, `foreground-subtle`, `foreground-inverted`, `background`, `surface`
**Border**: `border`, `border-muted`
**Brand**: `primary-default`, `primary-emphasis`, `primary-subtle`, `accent-default`, `accent-emphasis`, `accent-subtle`
**Feedback**: `success-*`, `warning-*`, `error-*`, `info-*` (each with `-default`, `-emphasis`, `-subtle`)

### Polymorphic Components

```tsx
<Box as="section" />
<Text as="label" />
<Heading as="h1" />
<Button as="a" href="/signup">Sign Up</Button>
```

### Theming

Override CSS variables to customize:

```css
:root {
  --t-light-primary-default: #your-brand-color;
  --t-dark-primary-default: #your-dark-brand-color;
  --t-spacing-unit: 8px;
}
```

## Documentation

Full documentation with interactive examples: [https://dgca.github.io/tosui/](https://dgca.github.io/tosui/)

## License

MIT
