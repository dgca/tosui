---
"@tosui/react": patch
---

Make all style props responsive and add interaction state support

- All style props now accept responsive objects (`{ base, sm, md, lg, xl, 2xl }`)
- All style props support `_hover`, `_focus`, `_active`, `_disabled` state props
- Two shared responsive utilities: `getResponsiveVarStyles()` (variable-based) and `getEnumResponsiveStyles()` (enum-based, zero runtime)
- Shared `StateProps<T>` generic replaces per-file state prop types
- Fix missing `bg-warning-*` CSS classes causing warning buttons to have no background until hover
- Fix all lint errors across components (0 errors, 0 warnings)
