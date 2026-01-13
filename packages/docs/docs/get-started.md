# Get Started

## Installation

Install Tosui using your preferred package manager:

```bash
npm install @tosui/react
# or
yarn add @tosui/react
# or
pnpm add @tosui/react
```

## Setup

Import the base styles in your application entry point (e.g., `main.tsx` or `App.tsx`):

```tsx
import "@tosui/react/styles.css";
```

### Optional: Font Styles

Tosui includes optional IBM Plex font styles. To use them, import the fonts CSS:

```tsx
import "@tosui/react/fonts.css";
```

## Basic Usage

Start using Tosui components in your React application:

```tsx
import { Box, Text, Heading } from "@tosui/react";

function App() {
  return (
    <Box p={6}>
      <Heading fontSize="3xl" fontWeight="semibold">
        Welcome to Tosui
      </Heading>
      <Text fontSize="md" color="foregroundMuted">
        A constraint-driven design system for React
      </Text>
    </Box>
  );
}
```

## Core Principles

Tosui is built on these core principles:

### Fewer, Better Choices

Every design token earns its place in the system. Instead of dozens of color shades or spacing values, Tosui provides a focused set of options that cover real-world use cases.

### Composition Over Configuration

Build complex interfaces from simple primitives like Box, Text, and Heading. The system makes the right thing easy and the custom thing possible.

### Semantic, Not Prescriptive

Design values describe intent (`foreground`, `background`), not specific measurements. This means themes swap seamlessly and components adapt automatically to light/dark modes.

## Next Steps

**Primitives**
- [Box](/docs/components/box) - Foundational layout primitive
- [Text](/docs/components/text) - Text with typography props
- [Heading](/docs/components/heading) - Semantic headings

**Layout**
- [Stack](/docs/components/stack) - Vertical/horizontal stacking
- [Flex](/docs/components/flex) - Flexbox container
- [Grid](/docs/components/grid) - CSS Grid container

**Forms**
- [Input](/docs/components/input) - Text input field
- [Button](/docs/components/button) - Action buttons
- [FormField](/docs/components/form-field) - Form field wrapper with labels

**Overlays**
- [Modal](/docs/components/modal) - Dialog windows
- [Tooltip](/docs/components/tooltip) - Informational tooltips
- [Popover](/docs/components/popover) - Rich content popovers
