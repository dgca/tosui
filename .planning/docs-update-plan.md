# Tosui Documentation Update Plan

## Task Overview

Update the Tosui documentation site to:
1. Rename "Docs" to "Guide" in the navbar
2. Create a "Components" section with components grouped by type
3. Add documentation for all 40 components (currently only 3 are documented)
4. Update existing content to reflect the latest state of Tosui (v1.0)

---

## Current State

### Documentation Site Location
- **Package**: `packages/docs/` (Docusaurus site)
- **Sidebar config**: `packages/docs/sidebars.ts`
- **Navbar config**: `packages/docs/docusaurus.config.ts`
- **Docs directory**: `packages/docs/docs/`

### Current Sidebar Structure
```
docsSidebar:
  - introduction
  - get-started
  - Components (category)
    - box
    - text
    - heading
```

### Current Issues
1. **Navbar** says "Docs" - should be "Guide"
2. **Introduction.mdx** is outdated:
   - Mentions "exploration phase" (Tosui is now v1.0)
   - Mentions StyleX (now uses CSS Modules)
   - Doesn't reflect current component count (40 components)
3. **Only 3 components documented** - need 37 more
4. **Components not grouped** - should be organized by type

---

## Target Sidebar Structure

```
Guide (top-level nav item):
  - introduction
  - get-started

Components (top-level nav item, grouped by category):
  - Primitives
    - box
    - text
    - heading
  - Layout
    - stack
    - hstack
    - vstack
    - flex
    - grid
    - container
    - divider
    - spacer
  - Forms
    - input
    - select
    - textarea
    - checkbox
    - radio
    - switch
    - form-field
    - label
  - Buttons
    - button
    - icon-button
  - Navigation
    - link
    - tabs
    - breadcrumb
    - menu
    - pagination
  - Feedback
    - alert
    - badge
    - progress
    - skeleton
    - spinner
  - Data Display
    - avatar
    - card
    - image
    - list
    - code
  - Overlays
    - modal
    - tooltip
    - popover
    - accordion
```

---

## Implementation Steps

### Step 1: Update Navbar (docusaurus.config.ts)

In `packages/docs/docusaurus.config.ts`:

1. Change navbar item on line 69 from `label: "Docs"` to `label: "Guide"`
2. Add a second navbar item for Components
3. Update footer links (lines 82-91) to use "Guide" terminology

Target navbar items:
```ts
items: [
  {
    type: "docSidebar",
    sidebarId: "guideSidebar",
    position: "left",
    label: "Guide",
  },
  {
    type: "docSidebar",
    sidebarId: "componentsSidebar",
    position: "left",
    label: "Components",
  },
  {
    href: "https://github.com/dgca/tosui",
    label: "GitHub",
    position: "right",
  },
],
```

### Step 2: Update Sidebar Configuration (sidebars.ts)

Replace `packages/docs/sidebars.ts` with two sidebars:

```ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  guideSidebar: [
    "introduction",
    "get-started",
  ],
  componentsSidebar: [
    {
      type: "category",
      label: "Primitives",
      items: ["components/box", "components/text", "components/heading"],
    },
    {
      type: "category",
      label: "Layout",
      items: [
        "components/stack",
        "components/hstack",
        "components/vstack",
        "components/flex",
        "components/grid",
        "components/container",
        "components/divider",
        "components/spacer",
      ],
    },
    {
      type: "category",
      label: "Forms",
      items: [
        "components/input",
        "components/select",
        "components/textarea",
        "components/checkbox",
        "components/radio",
        "components/switch",
        "components/form-field",
        "components/label",
      ],
    },
    {
      type: "category",
      label: "Buttons",
      items: ["components/button", "components/icon-button"],
    },
    {
      type: "category",
      label: "Navigation",
      items: [
        "components/link",
        "components/tabs",
        "components/breadcrumb",
        "components/menu",
        "components/pagination",
      ],
    },
    {
      type: "category",
      label: "Feedback",
      items: [
        "components/alert",
        "components/badge",
        "components/progress",
        "components/skeleton",
        "components/spinner",
      ],
    },
    {
      type: "category",
      label: "Data Display",
      items: [
        "components/avatar",
        "components/card",
        "components/image",
        "components/list",
        "components/code",
      ],
    },
    {
      type: "category",
      label: "Overlays",
      items: [
        "components/modal",
        "components/tooltip",
        "components/popover",
        "components/accordion",
      ],
    },
  ],
};

export default sidebars;
```

### Step 3: Update Introduction.mdx

Replace `packages/docs/docs/introduction.mdx` content. Remove:
- "exploration phase" language
- StyleX mentions (now CSS Modules)

Update to reflect:
- v1.0 status with 40 components
- Current philosophy and approach
- Accurate technology stack

### Step 4: Update get-started.md

Update `packages/docs/docs/get-started.md`:
- Update "Next Steps" section to link to more components
- Ensure installation instructions are current

### Step 5: Create Component Documentation Files

Create MDX files for each component in `packages/docs/docs/components/`:

**File naming convention**: kebab-case (e.g., `form-field.mdx`, `icon-button.mdx`)

**Documentation requirements**:
- **Live previews required**: Use `<Tabs>` component with Code/Preview tabs (like box.mdx)
- **Comprehensive coverage**: All props, all variants, usage examples
- Match the depth and quality of existing box.mdx and text.mdx

**Each component doc must include**:
1. Import statement
2. Brief description explaining purpose and key features
3. Basic usage example with live preview
4. All variants/sizes demonstrated with live previews
5. All props documented with examples where helpful
6. Common patterns and use cases
7. Props reference table with types and defaults
8. TypeScript notes if the component has notable type features

### Step 6: Component Documentation Template

Use this template for each component:

```mdx
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { ComponentName } from "@tosui/react";

# ComponentName

Brief description of what the component does and its key features.

## Import

\`\`\`tsx
import { ComponentName } from "@tosui/react";
\`\`\`

## Basic Usage

<Tabs>
  <TabItem value="code" label="Code">
    \`\`\`tsx
    <ComponentName>Content</ComponentName>
    \`\`\`
  </TabItem>
  <TabItem value="preview" label="Preview">
    <ComponentName>Content</ComponentName>
  </TabItem>
</Tabs>

## Variants

<Tabs>
  <TabItem value="code" label="Code">
    \`\`\`tsx
    <ComponentName variant="solid">Solid</ComponentName>
    <ComponentName variant="outline">Outline</ComponentName>
    \`\`\`
  </TabItem>
  <TabItem value="preview" label="Preview">
    <ComponentName variant="solid">Solid</ComponentName>
    <ComponentName variant="outline">Outline</ComponentName>
  </TabItem>
</Tabs>

## Sizes

... (similar pattern)

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "solid" \| "outline" | "solid" | Visual style variant |
| size | "sm" \| "md" \| "lg" | "md" | Size of the component |
| ... | ... | ... | ... |

## TypeScript

ComponentName is fully typed. When using the `as` prop... (if applicable)
```

---

## API Changes to Document

The following API changes were made in the recent audit and must be reflected in the docs:

### 1. Disabled Prop Standardization
All components now use `disabled` (not `isDisabled`):
- Input, Select, Textarea
- Checkbox, Radio, Switch
- AccordionItem, Tooltip, FormField

Example:
```tsx
<Input disabled placeholder="Disabled input" />
<Checkbox disabled label="Disabled checkbox" />
```

### 2. Controlled Mode for Overlays
Tooltip, Popover, and Menu now support controlled mode:

```tsx
// Uncontrolled (default) - manages its own state
<Tooltip label="Hello">Hover me</Tooltip>

// Controlled - you manage the state
<Tooltip
  label="Hello"
  isOpen={isOpen}
  onOpen={() => setIsOpen(true)}
  onClose={() => setIsOpen(false)}
>
  Hover me
</Tooltip>
```

### 3. Exported Utility Types
These types are now exported from `@tosui/react`:
- `Polymorphic<T, P>` - for extending polymorphic components
- `ResponsiveValue<T>` - for typing responsive props
- `ResponsiveObject<T>` - for breakpoint objects
- `FullResponsiveObject<T>` - for complete breakpoint objects

---

## Component Reference by Category

### Primitives (3 components - already documented)
| Component | File | Status |
|-----------|------|--------|
| Box | box.mdx | ✅ Exists |
| Text | text.mdx | ✅ Exists |
| Heading | heading.mdx | ✅ Exists |

### Layout (8 components - need docs)
| Component | File | Key Props |
|-----------|------|-----------|
| Stack | stack.mdx | direction, gap, wrap |
| HStack | hstack.mdx | gap, wrap, align, justify |
| VStack | vstack.mdx | gap, wrap, align, justify |
| Flex | flex.mdx | direction, justify, align, wrap, gap |
| Grid | grid.mdx | columns, rows, gap |
| Container | container.mdx | size (sm\|md\|lg\|xl\|full) |
| Divider | divider.mdx | orientation, color |
| Spacer | spacer.mdx | (none - just fills space) |

### Forms (8 components - need docs)
| Component | File | Key Props |
|-----------|------|-----------|
| Input | input.mdx | size, variant, disabled, isInvalid |
| Select | select.mdx | size, variant, disabled, isInvalid |
| Textarea | textarea.mdx | size, variant, disabled, isInvalid, resize, rows |
| Checkbox | checkbox.mdx | size, disabled, isInvalid, isChecked, label |
| Radio | radio.mdx | size, disabled, isChecked, label, name |
| Switch | switch.mdx | size, disabled, isChecked, label |
| FormField | form-field.mdx | label, helperText, errorMessage, isRequired, isInvalid, disabled |
| Label | label.mdx | required |

### Buttons (2 components - need docs)
| Component | File | Key Props |
|-----------|------|-----------|
| Button | button.mdx | variant, size, colorScheme, disabled, loading |
| IconButton | icon-button.mdx | icon, aria-label, variant, size, colorScheme, disabled, loading |

### Navigation (5 components - need docs)
| Component | File | Key Props |
|-----------|------|-----------|
| Link | link.mdx | variant, external |
| Tabs | tabs.mdx | variant, defaultIndex, index, onChange |
| Breadcrumb | breadcrumb.mdx | separator |
| Menu | menu.mdx | isOpen, onOpen, onClose |
| Pagination | pagination.mdx | page, totalPages, onPageChange, siblings, showEdges |

### Feedback (5 components - need docs)
| Component | File | Key Props |
|-----------|------|-----------|
| Alert | alert.mdx | status |
| Badge | badge.mdx | variant, size, colorScheme |
| Progress | progress.mdx | value, max, colorScheme, size, isIndeterminate |
| Skeleton | skeleton.mdx | (renders placeholder) |
| Spinner | spinner.mdx | size |

### Data Display (5 components - need docs)
| Component | File | Key Props |
|-----------|------|-----------|
| Avatar | avatar.mdx | src, name, size, rounded |
| Card | card.mdx | shadow (+ CardHeader, CardBody, CardFooter) |
| Image | image.mdx | src, alt, objectFit |
| List | list.mdx | styleType (+ ListItem, ListIcon) |
| Code | code.mdx | variant |

### Overlays (4 components - need docs)
| Component | File | Key Props |
|-----------|------|-----------|
| Modal | modal.mdx | isOpen, onClose, size, closeOnOverlayClick, closeOnEsc |
| Tooltip | tooltip.mdx | label, placement, disabled, isOpen, onOpen, onClose |
| Popover | popover.mdx | content, placement, closeOnBlur, isOpen, onOpen, onClose |
| Accordion | accordion.mdx | defaultIndex, allowMultiple (+ AccordionItem) |

---

## Files to Create/Modify Summary

### Modify (4 files)
1. `packages/docs/docusaurus.config.ts` - navbar and footer
2. `packages/docs/sidebars.ts` - sidebar structure
3. `packages/docs/docs/introduction.mdx` - update content
4. `packages/docs/docs/get-started.md` - update next steps links

### Create (37 new component docs)
All in `packages/docs/docs/components/`:

**Layout (8)**:
stack.mdx, hstack.mdx, vstack.mdx, flex.mdx, grid.mdx, container.mdx, divider.mdx, spacer.mdx

**Forms (8)**:
input.mdx, select.mdx, textarea.mdx, checkbox.mdx, radio.mdx, switch.mdx, form-field.mdx, label.mdx

**Buttons (2)**:
button.mdx, icon-button.mdx

**Navigation (5)**:
link.mdx, tabs.mdx, breadcrumb.mdx, menu.mdx, pagination.mdx

**Feedback (5)**:
alert.mdx, badge.mdx, progress.mdx, skeleton.mdx, spinner.mdx

**Data Display (5)**:
avatar.mdx, card.mdx, image.mdx, list.mdx, code.mdx

**Overlays (4)**:
modal.mdx, tooltip.mdx, popover.mdx, accordion.mdx

---

## Verification

After implementation:

1. **Build the docs site**:
   ```bash
   pnpm f:docs build
   ```

2. **Start dev server and verify**:
   ```bash
   pnpm f:docs start
   ```

3. **Check**:
   - [ ] Navbar shows "Guide" and "Components" links
   - [ ] Guide section has introduction and get-started
   - [ ] Components section has all 40 components grouped by category
   - [ ] Each component page renders without errors
   - [ ] Live previews work (Tabs component shows interactive examples)
   - [ ] Navigation between docs works
   - [ ] Introduction reflects v1.0 status
   - [ ] All API changes (disabled prop, controlled overlays) are documented correctly

---

## Priority Order

1. **Config changes first** (sidebars.ts, docusaurus.config.ts)
2. **Update introduction.mdx and get-started.md**
3. **Create form component docs** (most commonly needed)
4. **Create button docs**
5. **Create layout component docs**
6. **Create navigation component docs**
7. **Create feedback component docs**
8. **Create data display docs**
9. **Create overlay component docs**
10. **Final verification and build test**

---

## Reference: Existing Documentation Style

See these existing files for the documentation style to follow:
- `packages/docs/docs/components/box.mdx` - comprehensive example with many sections
- `packages/docs/docs/components/text.mdx` - good example of shorthand props documentation
- `packages/docs/docs/components/heading.mdx` - simpler component example

Key patterns from existing docs:
- Use `<Tabs>` with `<TabItem value="code">` and `<TabItem value="preview">` for interactive examples
- Import components from `@tosui/react` at the top
- Use Box for layout in previews (spacing, borders for visibility)
- Include Props Reference table at the end
- Mention TypeScript support
