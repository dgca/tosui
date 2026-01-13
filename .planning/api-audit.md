# Tosui Component API Audit

## Summary

Full audit of all 40 components for consistency and developer ergonomics.

**Status: COMPLETED** - All fixes applied and verified.

## Changes Made

1. Standardized `disabled` prop across all components (was `isDisabled` in form controls)
2. Added controlled mode (`isOpen`, `onOpen`, `onClose`) to Tooltip, Popover, Menu
3. Exported utility types: `Polymorphic<T, P>`, `ResponsiveValue<T>`, `ResponsiveObject<T>`, `FullResponsiveObject<T>`

## Disabled Prop Inconsistency

| Component | Current | Should Be |
|-----------|---------|-----------|
| Input | `isDisabled` | `disabled` |
| Select | `isDisabled` | `disabled` |
| Checkbox | `isDisabled` | `disabled` |
| Radio | `isDisabled` | `disabled` |
| Switch | `isDisabled` | `disabled` |
| Textarea | `isDisabled` | `disabled` |
| AccordionItem | `isDisabled` | `disabled` |
| Tooltip | `isDisabled` | `disabled` |
| FormField | `isDisabled` | `disabled` |
| Button | `disabled` | Keep |
| IconButton | `disabled` | Keep |
| Tab | `disabled` | Keep |
| MenuItem | `disabled` | Keep |

## Overlay Components Missing Callbacks

| Component | Current | Add |
|-----------|---------|-----|
| Tooltip | Internal state only | `isOpen`, `onOpen`, `onClose` |
| Popover | Internal state only | `isOpen`, `onOpen`, `onClose` |
| Menu | Internal state via context | `isOpen`, `onOpen`, `onClose` |

## Missing Type Exports

| Type | Location | Status |
|------|----------|--------|
| `Polymorphic<T, P>` | `src/types/Polymorphic.ts` | Not exported |
| `ResponsiveValue<T>` | `src/utils/breakpoints.ts` | Not exported |
| `ResponsiveObject<T>` | `src/utils/breakpoints.ts` | Not exported |

## Components by Category

### Primitives (no disabled applicable)
- Box, Text, Heading

### Layout (no disabled applicable)
- Stack, HStack, VStack, Flex, Grid, Container, Divider, Spacer

### Form Controls (need fix)
- Input, Select, Textarea, Checkbox, Radio, Switch, FormField

### Buttons (correct)
- Button, IconButton

### Navigation
- Link, Tabs/Tab (correct), Breadcrumb, Menu/MenuItem (correct), Pagination

### Feedback (no disabled applicable)
- Alert, Badge, Progress, Skeleton, Spinner

### Data Display (no disabled applicable)
- Avatar, Card, Image, List, Code

### Overlays (need callbacks)
- Modal (correct - already has isOpen/onClose)
- Tooltip, Popover, Accordion (need callbacks)
