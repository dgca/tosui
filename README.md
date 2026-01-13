# @tosui/react

Tosui is a themable, orderly, simple UI component library for React. It provides 40 components designed to help you build consistent, accessible user interfaces with minimal configuration.

## Links

- [Docs](https://dgca.github.io/tosui/)

## Installation

```bash
npm install @tosui/react
# or
yarn add @tosui/react
# or
pnpm add @tosui/react
```

## Setup

Import the base styles in your application entry point:

```tsx
import "@tosui/react/styles.css";
```

Optionally, import IBM Plex font styles:

```tsx
import "@tosui/react/fonts.css";
```

## Basic Usage

```tsx
import { Box, Text, Heading, Button } from "@tosui/react";

function App() {
  return (
    <Box p={6}>
      <Heading fontSize="3xl" fontWeight="semibold">
        Welcome to Tosui
      </Heading>
      <Text color="foreground-muted">
        A constraint-driven design system for React
      </Text>
      <Button>Get Started</Button>
    </Box>
  );
}
```

## Philosophy

Tosui is built on **constraint-driven simplicity**. By intentionally limiting options, we reduce decision fatigue, improve consistency, and make design systems easier to learn, implement, and maintain.

### Core Principles

1. **Fewer, Better Choices** - Every token earns its place. No 10 shades of every color or arbitrary size scales.

2. **Composition Over Configuration** - Powerful primitives (Box, Text, Heading) compose naturally into complex components.

3. **Semantic, Not Prescriptive** - Design values describe intent (`foreground`, `background`, `primary-default`), not measurements. Themes swap seamlessly.

## Features

- **40 components** covering primitives, layout, forms, navigation, feedback, data display, and overlays
- **CSS Modules styling** with zero runtime CSS generation
- **Responsive props** with mobile-first breakpoints
- **TypeScript-first** with full type safety and autocomplete
- **Polymorphic components** that render as any HTML element
- **Accessible** with proper ARIA attributes and keyboard navigation

## Components

### Primitives
Box, Text, Heading

### Layout
Stack, HStack, VStack, Flex, Grid, Container, Spacer, Divider

### Forms
Button, IconButton, Input, Textarea, Select, Checkbox, Radio, Switch, FormField, Label

### Navigation
Link, Breadcrumb, Tabs, Menu, Pagination

### Feedback
Alert, Badge, Progress, Spinner, Skeleton

### Data Display
Avatar, Card, Code, Image, List

### Overlays
Modal, Tooltip, Popover, Accordion

## Design Tokens

Tosui uses CSS variables for all design tokens. Key token categories:

### Colors

**Surface & Text**: `foreground`, `foreground-muted`, `foreground-subtle`, `background`, `surface`, `border`

**Brand**: `primary-default`, `primary-emphasis`, `primary-subtle`, `accent-default`, `accent-emphasis`, `accent-subtle`

**Feedback**: `success-*`, `warning-*`, `error-*`, `info-*` (each with default, emphasis, subtle variants)

### Spacing

4px base unit with multipliers 0-32. Use numeric values: `p={4}` = 16px padding.

### Typography

- **Sizes**: `xs` (12px) through `5xl` (48px)
- **Weights**: `normal`, `medium`, `semibold`, `bold`
- **Line heights**: `tight`, `normal`, `relaxed`
- **Families**: `sans`, `serif`, `mono` (system stacks)

### Border Radius

`none`, `sm`, `md`, `lg`, `full`

### Shadows

`none`, `sm`, `md`, `lg`

## Responsive Props

Tosui uses **mobile-first** breakpoints:

| Key | Min Width |
|-----|-----------|
| `base` | 0px |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

Most props accept responsive objects:

```tsx
<Box p={{ base: 2, md: 4, lg: 6 }}>
  Padding scales with viewport
</Box>
```

## Dark Mode

Colors automatically adapt to dark mode via:
- System preference (`prefers-color-scheme: dark`)
- Manual override (`data-theme="dark"` on `<html>`)

## Theming

Override CSS variables to customize:

```css
:root {
  --t-color-primary-default: #your-brand-color;
  --t-spacing-unit: 8px; /* Change base spacing */
}
```

## License

MIT
