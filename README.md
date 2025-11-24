# TOSUI

TOSUI is a themable, orderly, simple UI system — a foundation for building component libraries.

## Philosophy

TOSUI is built on **constraint-driven simplicity**. By intentionally limiting options, we reduce decision fatigue, improve consistency, and make design systems easier to learn, implement, and maintain.

### Core Principles

1. **Fewer, Better Choices**

   - Limit variants to what's actually needed
   - Every token should earn its place in the system
   - If you rarely need to choose between two options, they shouldn't both exist

2. **Composition Over Configuration**

   - Provide powerful primitives (Box, Stack, Grid) that compose naturally
   - Complex components are built from simple ones
   - The system should make the right thing easy and the custom thing possible

3. **Semantic, Not Prescriptive**

   - Design values describe intent, not specific measurements
   - Designers can remap semantics to match brand without changing component code
   - Light/dark themes swap seamlessly because values are contextual

4. **Opinionated Defaults, Flexible Overrides**
   - The system ships with strong opinions that work out of the box
   - Teams can customize through theming
   - Constraints guide good design; theming enables brand expression

### Design Goals

- **For Developers**: Spend less time deciding, more time building. A focused set of options means faster development and better autocomplete.
- **For Designers**: Define a cohesive system once. Stop maintaining unused color shades or arbitrary size scales.
- **For Teams**: Consistency by default. The limited palette means designs naturally harmonize.
- **For Users**: Faster, more consistent experiences from lighter component libraries.

### Theming Approach

TOSUI is built for multi-theme support from the ground up:

- **Semantic values** adapt to light/dark modes automatically
- **Theme structure** is consistent across modes
- **Customization points** are explicit and documented

## Design Tokens

### Colors

TOSUI's color system is intentionally minimal, providing just enough variants to build full-featured interfaces without overwhelming choice.

#### Raw Neutrals

The foundation grayscale palette:

- `black`
- `grayDark`
- `gray`
- `grayLight`
- `white`

These are the actual gray values that semantic tokens map to. Use these directly only when you need specific grays that shouldn't change between themes.

#### Semantic Surface & Text Colors

Theme-aware tokens that adapt to light/dark modes:

**Foreground (text)**

- `foreground` - Primary text color
- `foregroundMuted` - Secondary text, labels
- `foregroundSubtle` - Tertiary text, captions, legal copy

**Borders**

- `border` - Default border color
- `borderMuted` - Subtle borders, dividers

**Backgrounds**

- `background` - Main page background
- `surface` - Card, panel, and elevated surface backgrounds

In light mode, these map to neutrals (e.g., `foreground` → `black`, `background` → `white`). In dark mode, they flip automatically.

#### Brand Colors

Two brand colors with three variants each:

**Primary**

- `primary.default` - Normal state (buttons, links)
- `primary.emphasis` - Hover, active, and focus states
- `primary.subtle` - Backgrounds, badges, low-emphasis uses

**Accent**

- `accent.default` - Normal state
- `accent.emphasis` - Hover, active, and focus states
- `accent.subtle` - Backgrounds, badges, low-emphasis uses

**Disabled states:** Apply opacity (e.g., `0.4`) to the `default` variant rather than defining separate disabled colors.

#### Semantic/Feedback Colors

Four feedback colors with three variants each:

**Success**

- `success.default` - Normal state (buttons, alerts)
- `success.emphasis` - Hover, active, and focus states
- `success.subtle` - Backgrounds, badges

**Warning**

- `warning.default` - Normal state (buttons, alerts)
- `warning.emphasis` - Hover, active, and focus states
- `warning.subtle` - Backgrounds, badges

**Error**

- `error.default` - Normal state (buttons, alerts)
- `error.emphasis` - Hover, active, and focus states
- `error.subtle` - Backgrounds, badges

**Info**

- `info.default` - Normal state (buttons, alerts)
- `info.emphasis` - Hover, active, and focus states
- `info.subtle` - Backgrounds, badges

### Spacing

TOSUI uses a multiplier-based spacing system built on a **4px base unit**. Instead of named sizes like "small" or "large", you specify numeric multiples for precise, consistent spacing.

#### Scale

The system pre-generates spacing values for multipliers **0 through 32**:

- `0` = 0px
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `5` = 20px
- `6` = 24px
- `8` = 32px
- `10` = 40px
- `12` = 48px
- `16` = 64px
- `20` = 80px
- `24` = 96px
- `32` = 128px
- ... (all values 0-32)

#### Usage

Spacing tokens are used for margins, padding, gaps, and other layout spacing:

```jsx
<Box p={4}>           {/* 16px padding on all sides */}
<VStack gap={2}>      {/* 8px gap between children */}
<Button px={6} py={3}> {/* 24px horizontal, 12px vertical padding */}
```

#### Common Values

While any value from 0-32 is available, these are the most commonly used:

- `1` (4px) - Minimal spacing, tight layouts
- `2` (8px) - Compact spacing, dense UIs
- `3` (12px) - Small comfortable spacing
- `4` (16px) - Default spacing (most common)
- `6` (24px) - Comfortable spacing, breathing room
- `8` (32px) - Large spacing, major sections
- `12` (48px) - Extra large spacing, page sections
- `16` (64px) - Spacious layouts, hero sections

**Rationale:** The 4px base keeps everything aligned to a consistent grid. Numeric multipliers are easier to reason about than named tokens (need 20px spacing? Use `5`). Pre-generating 0-32 covers 99% of use cases with zero runtime cost.

**Customization:** The base unit (4px) is customizable via theme configuration, allowing teams to use 2px, 8px, or any other base that fits their design needs.

### Typography

A focused set of typographic tokens that cover body text, headings, and specialized content without overwhelming choice.

#### Font Sizes

Nine sizes that span from small UI text to large hero headings:

- `xs` - 12px - Captions, labels, helper text
- `sm` - 14px - Small body text, dense UIs
- `md` - 16px - Default body text (most common)
- `lg` - 18px - Emphasized body text, lead paragraphs
- `xl` - 20px - Small headings (h5, h6)
- `2xl` - 24px - Medium headings (h4)
- `3xl` - 30px - Large headings (h3)
- `4xl` - 36px - Larger headings (h2)
- `5xl` - 48px - Hero headings (h1), display text

**Usage:**
```jsx
<Text fontSize="md">Default body text</Text>
<Heading fontSize="3xl">Section heading</Heading>
```

#### Font Weights

Four weights covering all common use cases:

- `normal` - 400 - Regular body text
- `medium` - 500 - Subtle emphasis, button text
- `semibold` - 600 - Headings, strong emphasis
- `bold` - 700 - Very strong emphasis, alerts

**Usage:**
```jsx
<Text fontWeight="normal">Regular text</Text>
<Button fontWeight="medium">Click me</Button>
<Heading fontWeight="semibold">Section Title</Heading>
```

#### Line Heights

Three line heights optimized for readability:

- `tight` - 1.25 - Headings, compact text, UI elements
- `normal` - 1.5 - Default body text, balanced readability
- `relaxed` - 1.75 - Long-form content, comfortable reading

**Usage:**
```jsx
<Heading lineHeight="tight">Compact Headline</Heading>
<Text lineHeight="normal">Body text with good readability</Text>
<Text lineHeight="relaxed">Long article content</Text>
```

#### Font Families

Three font stacks for different content types:

- `sans` - System sans-serif stack (UI text, default)
- `serif` - System serif stack (long-form content, editorial)
- `mono` - System monospace stack (code, technical content)

**Default stacks:**
```css
sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
serif: Georgia, Cambria, "Times New Roman", Times, serif
mono: "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
```

**Usage:**
```jsx
<Text fontFamily="sans">UI text</Text>
<Text fontFamily="serif">Article content</Text>
<Code fontFamily="mono">const x = 10;</Code>
```

**Customization:** All font families can be customized via theme configuration to use brand-specific fonts while maintaining the semantic structure.

#### Text Variants

Semantic text variants that combine size, weight, line height, and color for common use cases. These provide consistency and reduce the need to specify individual properties.

**Display/Heading Variants:**

- `display` - fontSize: `5xl`, fontWeight: `bold`, lineHeight: `tight`
  - Hero sections, marketing headlines

- `title` - fontSize: `4xl`, fontWeight: `semibold`, lineHeight: `tight`
  - Page titles, major landmarks

- `heading` - fontSize: `3xl`, fontWeight: `semibold`, lineHeight: `tight`
  - Primary section headings

- `subheading` - fontSize: `2xl`, fontWeight: `semibold`, lineHeight: `tight`
  - Subsection headings

**Body Variants:**

- `body` - fontSize: `md`, fontWeight: `normal`, lineHeight: `normal`
  - Default body text (most common)

- `lead` - fontSize: `lg`, fontWeight: `normal`, lineHeight: `normal`
  - Introduction paragraphs, emphasized body text

**UI/Supporting Variants:**

- `label` - fontSize: `sm`, fontWeight: `medium`, lineHeight: `normal`
  - Form labels, UI labels

- `caption` - fontSize: `sm`, fontWeight: `normal`, lineHeight: `normal`
  - Helper text, descriptions, metadata

- `legal` - fontSize: `xs`, fontWeight: `normal`, lineHeight: `relaxed`, color: `foregroundSubtle`
  - Disclaimers, terms, fine print

**Usage:**
```jsx
<Text variant="display">Welcome to Our App</Text>
<Text variant="title">Dashboard</Text>
<Text variant="heading">Recent Activity</Text>
<Text variant="body">Your recent transactions are shown below.</Text>
<Text variant="label">Email Address</Text>
<Text variant="caption">We'll never share your email.</Text>
<Text variant="legal">By signing up, you agree to our terms.</Text>
```

**Note:** Variants can be overridden with individual props when needed:
```jsx
<Text variant="heading" fontSize="2xl">Smaller heading</Text>
```

### Border Radius

Border radius values control the roundness of component corners.

#### Values

- `none` - 0px - Sharp corners (tables, strict layouts)
- `sm` - 4px - Subtle roundness (inputs, small buttons, badges)
- `md` - 8px - Default roundness (buttons, cards, most components)
- `lg` - 12px - Pronounced roundness (larger cards, modals)
- `full` - 9999px - Fully rounded (circular avatars, pill buttons)

#### Usage

```jsx
<Button rounded="md">Standard button</Button>
<Card rounded="lg">Rounded card</Card>
<Avatar rounded="full">JD</Avatar>

{/* Directional control with cascading specificity */}
<Box rounded="lg" roundedTopLeft="none">Sharp top-left corner</Box>
<Box roundedTop="lg">Only top corners rounded</Box>
```

**Rationale:** Five values cover all practical use cases. Most components use `md` by default.

### Border Styles

Border width and style properties for adding borders to components.

#### Border Widths

- `none` - 0px - No border
- `thin` - 1px - Default borders (most common)
- `medium` - 2px - Emphasized borders
- `thick` - 4px - Strong visual weight

#### Border Styles

- `solid` - Solid line (default)
- `dashed` - Dashed line
- `dotted` - Dotted line
- `none` - No border

#### Usage

```jsx
<Box border="thin" borderColor="border">Thin border on all sides</Box>
<Box borderY="medium" borderStyle="dashed">Dashed top and bottom borders</Box>
<Box borderLeft="thick" borderColor="accent">Thick left accent border</Box>
```

**Rationale:** Four width values cover all practical cases. Most borders are 1px (`thin`). Width, style, and color are separate concerns for maximum flexibility with cascading specificity support.

### Shadows

Shadows create elevation and depth in the interface. TOSUI provides just four elevation levels - far fewer than the 24+ levels found in some design systems.

#### Elevation Levels

- `none` - No shadow - Flat elements, buttons, inline components
- `sm` - Subtle elevation - Slight depth (hover states, small dropdowns, tooltips)
- `md` - Medium elevation - Clear separation (cards, panels, navigation)
- `lg` - High elevation - Prominent layering (modals, popovers, dialogs)

#### Shadow Values (Light Mode)

```css
none: none
sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
```

#### Usage

```jsx
<Card shadow="md">Standard card with elevation</Card>
<Dropdown shadow="sm">Menu items</Dropdown>
<Modal shadow="lg">Important dialog</Modal>
<Button shadow="none">Flat button</Button>
```

#### Dark Mode Behavior

In dark mode, traditional dark shadows are ineffective. Shadows should be inverted to use lighter values or subtle borders to create elevation:

```css
/* Dark mode approach - use lighter shadows or borders */
sm: 0 0 0 1px rgba(255, 255, 255, 0.1)
md: 0 0 0 1px rgba(255, 255, 255, 0.15), 0 4px 6px rgba(0, 0, 0, 0.3)
lg: 0 0 0 1px rgba(255, 255, 255, 0.2), 0 10px 15px rgba(0, 0, 0, 0.4)
```

Alternatively, elevated surfaces in dark mode can use slightly lighter background colors instead of shadows.

**Rationale:** Four elevation levels cover all practical use cases. Most interfaces need only 2-3 levels in practice. More levels create unnecessary complexity and can make elevation hierarchy confusing.

### Transitions

Smooth, subtle animations enhance user experience without being distracting. TOSUI provides minimal transition tokens focused on common interaction patterns.

#### Duration Values

Three duration values cover all animation needs:

- `fast` - 150ms - Quick feedback (hover states, focus rings, simple toggles)
- `normal` - 250ms - Standard transitions (dropdowns, tooltips, most UI animations)
- `slow` - 350ms - Deliberate motion (modals, drawers, page transitions)

#### Easing Function

All transitions use a single easing function:

- `ease-in-out` - Smooth acceleration and deceleration for all animations

This provides natural-feeling motion without the complexity of managing multiple easing curves.

#### Usage

```jsx
<Box transition="all {normal} ease-in-out">Hover me</Box>
<Button transitionDuration="fast">Quick feedback</Button>
<Modal transitionDuration="slow">Deliberate entry</Modal>
```

#### Accessibility

**IMPORTANT:** All transitions must respect the `prefers-reduced-motion` media query. When a user has enabled reduced motion preferences, transitions should be disabled or reduced to near-instant (0ms or minimal duration).

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Rationale:** Three durations prevent animations from feeling too fast (jarring) or too slow (sluggish). Using a single easing function reduces complexity while providing smooth, natural motion. Respecting motion preferences is essential for accessibility.

### Breakpoints

TOSUI uses a **desktop-first** responsive approach. Base styles target large screens, then progressively adapt for smaller devices using max-width media queries.

#### Breakpoint Values

Six breakpoints covering all common screen sizes:

- `base` - No media query - Large desktop/default (1536px and up)
- `xl` - `max-width: 1535px` - Desktop (1280-1535px)
- `lg` - `max-width: 1279px` - Laptop (1024-1279px)
- `md` - `max-width: 1023px` - Tablet (768-1023px)
- `sm` - `max-width: 767px` - Large mobile (640-767px)
- `xs` - `max-width: 639px` - Small mobile (0-639px)

#### Usage (Desktop-First)

```jsx
<Box
  width="1200px"           // Large desktop (default)
  xl={{ width: "1000px" }} // Desktop
  lg={{ width: "900px" }}  // Laptop
  md={{ width: "100%" }}   // Tablet and below
  sm={{ padding: 4 }}      // Large mobile
  xs={{ fontSize: "sm" }}  // Small mobile
>
  Content
</Box>
```

**Rationale:** Desktop-first means base styles target the most capable devices without media query overhead. Six breakpoints provide appropriate granularity for modern devices - from ultra-wide monitors to small mobile screens.
