# @tosui/react

## 0.1.7

### Patch Changes

- d93661d: Make all convenience props on layout components (Stack, Flex, Grid, HStack, VStack) accept responsive objects.

  Previously, props like `direction`, `align`, `justify`, and `wrap` on Stack/Flex/Grid only accepted simple values, causing TypeScript errors when passing responsive objects like `direction={{ base: "column", md: "row" }}`. The underlying Box props already supported responsive values — the layout component types just weren't wrapping their props in `ResponsiveValue<>`.

  **Stack**: `direction`, `align`, `justify`, `wrap` now accept responsive objects. `wrap` remains a boolean (with responsive support), converted to `FlexWrapValue` internally.

  **Flex**: `direction`, `align`, `justify`, `wrap`, `alignSelf` now accept responsive objects.

  **Grid**: `justify`, `align`, `justifyContent`, `alignContent` now accept responsive objects.

  **HStack/VStack**: Inherit responsive `align`, `justify`, `wrap` from Stack.

## 0.1.6

### Patch Changes

- 1224e6f: Fix cascading for enum based rules

## 0.1.5

### Patch Changes

- e12c3dd: Make all style props responsive and add interaction state support

  - All style props now accept responsive objects (`{ base, sm, md, lg, xl, 2xl }`)
  - All style props support `_hover`, `_focus`, `_active`, `_disabled` state props
  - Two shared responsive utilities: `getResponsiveVarStyles()` (variable-based) and `getEnumResponsiveStyles()` (enum-based, zero runtime)
  - Shared `StateProps<T>` generic replaces per-file state prop types
  - Fix missing `bg-warning-*` CSS classes causing warning buttons to have no background until hover
  - Fix all lint errors across components (0 errors, 0 warnings)

## 0.1.4

### Patch Changes

- 0351e66: Make grid style props responsive

## 0.1.3

### Patch Changes

- b97f7d3: Explicitly import CSS reset

## 0.1.2

### Patch Changes

- 8bff846: Split files, add use client directive to client components

## 0.1.1

### Patch Changes

- c91f327: Fix list bullets, tweak primary color in dark mode

## 0.1.0

### Minor Changes

- c4435ad: feat: Add 37 new components

  Adds a complete set of UI components including layout primitives, form controls, navigation, feedback, data display, and overlay components.
