---
"@tosui/react": patch
---

Make all convenience props on layout components (Stack, Flex, Grid, HStack, VStack) accept responsive objects.

Previously, props like `direction`, `align`, `justify`, and `wrap` on Stack/Flex/Grid only accepted simple values, causing TypeScript errors when passing responsive objects like `direction={{ base: "column", md: "row" }}`. The underlying Box props already supported responsive values — the layout component types just weren't wrapping their props in `ResponsiveValue<>`.

**Stack**: `direction`, `align`, `justify`, `wrap` now accept responsive objects. `wrap` remains a boolean (with responsive support), converted to `FlexWrapValue` internally.

**Flex**: `direction`, `align`, `justify`, `wrap`, `alignSelf` now accept responsive objects.

**Grid**: `justify`, `align`, `justifyContent`, `alignContent` now accept responsive objects.

**HStack/VStack**: Inherit responsive `align`, `justify`, `wrap` from Stack.
