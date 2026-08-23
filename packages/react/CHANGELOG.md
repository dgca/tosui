# @tosui/react

## 0.2.0

### Minor Changes

- 6bb1aaa: Prepare the 0.2 release with controlled Accordion state and the following migration notes:

  - FormField now accepts one Tosui control or a render function. Adapt native and custom controls with `{(controlProps) => <input {...controlProps} />}` so label, disabled, required, and ARIA state reach the focusable element.
  - FormField `isRequired` now applies the native `required` attribute in addition to rendering the required indicator.
  - Accordion panels remain mounted while collapsed so transitions can run and local panel state is preserved. Collapsed panels are `aria-hidden` and inert.
  - Accordion supports caller-owned state through `index` and `onChange`; continue using `defaultIndex` for uncontrolled state.
  - Text now renders a `span` by default, matching its documented interface. Pass `as="div"` to retain the previous runtime element.
  - Polymorphic component props and refs are now checked against the selected element. Code that passed element-incompatible props may require correction.

### Patch Changes

- 191ac9f: Keep keyboard focus inside Modal and interactive Popover overlays, restore focus when they close, and add standards-based keyboard navigation to Menu.
- 60e660e: Prevent responsive CSS variables from leaking from parent components into nested Box-based components.
- f69cb58: Prevent open Modal, Tooltip, and Popover portals from being created during server rendering.
- 2212a67: Add automatic Accordion item indexes and change callbacks, animate panel expansion, and replace the text indicator with an accessible SVG chevron.
- a1e319a: Keep Tooltip and Popover portals aligned with their triggers while ancestor containers scroll or the viewport resizes.
- aa4b594: Fix polymorphic prop forwarding and element-specific ref types, remove internal TypeScript suppressions, and correct default Text and responsive Grid alignment behavior.
- 390500b: Support uncontrolled Pagination usage with defaultPage while preserving the existing controlled interface.
- 64632a9: Replace FormField and Breadcrumb child prop injection with context-based composition, add a render-function adapter for native and custom form controls, and preserve existing accessible descriptions.

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
