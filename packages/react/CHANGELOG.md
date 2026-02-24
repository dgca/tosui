# @tosui/react

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
