# StyleX Mental Model

This document explains how StyleX works and how we're using it in the TOSUI design system.

## ⚠️ Critical Gotcha: Responsive Style Merging

**StyleX drops earlier styles when merging the same CSS property, even at different breakpoints.**

If you apply multiple styles that target the same CSS property (e.g., `paddingTop`), only the LAST one survives, even if they target different media queries.

**Solution:** Use separate style keys for responsive vs non-responsive, and put all breakpoints in a single object:

```tsx
// ❌ WRONG - lg will overwrite sm
stylex.props(styles.paddingTop_sm(value1), styles.paddingTop_lg(value2));

// ✅ CORRECT - all breakpoints in one object
const styles = stylex.create({
  paddingTopResponsive: (value: ResponsiveObject) => ({
    paddingTop: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.lg]: value.lg,
      // ... all breakpoints
    },
  }),
});
```

See [Section 5](#5-responsive-styles-media-queries) for full details.

## Core Concepts

### 1. Build-Time CSS Generation

StyleX is **zero-runtime**. All styles are compiled to atomic CSS at build time.

```tsx
const styles = stylex.create({
  box: {
    padding: 16,
    backgroundColor: "red",
  },
});
```

At build time, this becomes:

- Static CSS file with atomic classes like `.p-16 { padding: 16px; }`
- The `styles.box` reference becomes a reference to those class names

### 2. Applying Styles with `stylex.props()`

The `stylex.props()` function converts style references into `className` and `style` props:

```tsx
<div {...stylex.props(styles.box)} />
// Becomes: <div className="p-16 bg-red" />
```

**Key insight:** `stylex.props()` returns an object with `className` (and sometimes `style` for dynamic values).

### 3. Merging Styles

Pass multiple styles to `stylex.props()` - **later styles override earlier ones**:

```tsx
stylex.props(styles.base, styles.variant, conditionalStyle);
//           ↑ applied first (lowest priority)
//                           ↑ applied second
//                                     ↑ applied last (highest priority)
```

**Falsy values are automatically ignored:**

```tsx
stylex.props(
  styles.base,
  isActive && styles.active, // If false, ignored
  null, // Ignored
  undefined // Ignored
);
```

### 4. Static vs Dynamic Values

#### Static Values (Compile-Time)

```tsx
const styles = stylex.create({
  box: {
    padding: 16, // ✅ Static - becomes atomic CSS
    backgroundColor: "red", // ✅ Static - becomes atomic CSS
  },
});
```

#### Dynamic Values (Runtime via CSS Variables)

**⚠️ Use sparingly!** Dynamic styles are an advanced feature. For most cases, conditional styles are better.

```tsx
const styles = stylex.create({
  box: (padding) => ({
    padding, // ✅ Dynamic - uses CSS variable at runtime
  }),
});

// Usage
<div {...stylex.props(styles.box(someValue))} />;
```

**How it works:**

- StyleX generates: `.box { padding: var(--padding-xyz); }`
- At runtime, it sets: `style={{ '--padding-xyz': someValue }}`

**Limitations:**

- Function body **must be an object literal** (no function calls, imports, or spreads)
- Parameters **must be simple identifiers** (no destructuring or defaults)
- Can only use the parameter value directly

**When to use:**

- ✅ Truly arbitrary values (user input, calculated dimensions)
- ✅ Values that can't be pre-generated
- ❌ Design system tokens (use conditional styles instead)

### 5. Responsive Styles (Media Queries)

Media queries are **build-time** and fully supported:

```tsx
const styles = stylex.create({
  box: {
    padding: {
      default: 16,
      "@media (min-width: 768px)": 24,
      "@media (min-width: 1024px)": 32,
    },
  },
});
```

This compiles to static CSS with media queries - **no JavaScript at runtime!**

#### ⚠️ Critical: Media Query Merging Behavior

**When StyleX merges multiple styles that target the same CSS property at different breakpoints, only the LAST merged style is applied.**

This means if you try to apply responsive styles separately:

```tsx
// ❌ WRONG - sm styles will be completely dropped!
stylex.props(
  styles.paddingTop_sm(value1), // Applied first
  styles.paddingTop_lg(value2) // Applied second - OVERWRITES sm entirely
);
```

Even though these target different media queries, StyleX sees them as the same property (`paddingTop`) and drops the first one.

**Solution: Separate keys for responsive vs non-responsive**

```tsx
const styles = stylex.create({
  // Non-responsive (single value)
  paddingTop: (value: string) => ({
    paddingTop: value,
  }),

  // Responsive (all breakpoints in one object)
  paddingTopResponsive: (value: ResponsiveObject<string>) => ({
    paddingTop: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      // ... all breakpoints
    },
  }),
});
```

**Why this works:** Each key is treated as a separate style. When you apply `paddingTopResponsive`, all breakpoints are in the same object, so StyleX preserves them all.

#### Variable Media Queries with `defineConsts`

When using variables for media query strings (recommended for DRY code), you **must use both min-width and max-width**:

```tsx
// breakpoints.stylex.ts
export const breakpoints = stylex.defineConsts({
  sm: "@media (min-width: 640px) and (max-width: 767px)",
  md: "@media (min-width: 768px) and (max-width: 1023px)",
  lg: "@media (min-width: 1024px) and (max-width: 1279px)",
  xl: "@media (min-width: 1280px) and (max-width: 1535px)",
  "2xl": "@media (min-width: 1536px)",
});
```

**Why?** StyleX can't determine the ordering of media queries when they're defined as variables. Using min-width and max-width makes each breakpoint exclusive, preventing ordering issues.

#### Filling Missing Breakpoints

For responsive values, you must provide values for **all breakpoints**, even if some weren't specified:

```tsx
// User provides: { base: 2, lg: 8 }
// You must fill: { base: 2, sm: 2, md: 2, lg: 8, xl: 8, "2xl": 8 }

function toFullResponsiveObject<T>(
  partial: ResponsiveObject<T>,
  defaultValue: T
): Required<ResponsiveObject<T>> {
  const base = partial.base ?? defaultValue;
  const sm = partial.sm ?? base; // cascade from base
  const md = partial.md ?? sm; // cascade from sm
  const lg = partial.lg ?? md; // cascade from md
  const xl = partial.xl ?? lg; // cascade from lg
  const _2xl = partial["2xl"] ?? xl; // cascade from xl

  return { base, sm, md, lg, xl, "2xl": _2xl };
}
```

This creates a mobile-first cascade where each breakpoint inherits from the previous one if not specified.

### 6. No Shorthand Properties

StyleX enforces atomic CSS by **rejecting shorthands**:

```tsx
// ❌ WRONG
const styles = stylex.create({
  box: {
    border: "1px solid black", // Error!
    background: "red", // Error!
    padding: "10px 20px", // Error!
  },
});

// ✅ CORRECT
const styles = stylex.create({
  box: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    backgroundColor: "red",
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
  },
});
```

**Why?** Shorthands can't be atomized properly. Breaking them down ensures optimal CSS deduplication.

### 7. Style Merging Across Components

For component libraries, accept styles as props and merge them **after** local styles:

```tsx
type BoxProps = {
  style?: StyleXStyles; // User-provided styles
  children: ReactNode;
};

function Box({ style, children }: BoxProps) {
  return (
    <div
      {...stylex.props(
        localStyles.base, // Local styles first
        style // User styles last (can override)
      )}
    >
      {children}
    </div>
  );
}
```

### 8. Conditional Variants

Use object lookup for variants:

```tsx
const styles = stylex.create({
  primary: { backgroundColor: "blue" },
  secondary: { backgroundColor: "gray" },
});

function Button({ variant }: { variant: "primary" | "secondary" }) {
  return <button {...stylex.props(styles[variant])} />;
}
```

### 9. Removing Styles

Set properties to `null` to remove inherited/previous styles without generating extra CSS:

```tsx
const styles = stylex.create({
  noColor: {
    color: null, // Removes color property
  },
});
```

## Our Implementation Strategy

### For Static Styles (Reset, Defaults)

Use `stylex.create()` with static values:

```tsx
// styleParts/reset.ts
export const resetStyles = stylex.create({
  base: {
    boxSizing: "border-box",
    borderWidth: 0,
    // ...
  },
});
```

### For Dynamic Props (Spacing, Sizing, etc.)

Use **dynamic functions** with separate keys for responsive vs non-responsive:

```tsx
// styleParts/padding.ts
const paddingStyles = stylex.create({
  // Non-responsive - simple value
  paddingTop: (value: string) => ({
    paddingTop: value,
  }),

  // Responsive - all breakpoints in single object
  paddingTopResponsive: (value: ResponsiveObject<string>) => ({
    paddingTop: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

function getSpacingProps(
  key: "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft",
  value?: ResponsiveValue<SpacingValue>
) {
  if (typeof value !== "object") {
    // Simple value - use non-responsive style
    const rawValue = getRawValue(value);
    return rawValue ? paddingStyles[key](rawValue) : undefined;
  }

  // Responsive object - fill all breakpoints and use responsive style
  return paddingStyles[`${key}Responsive`](
    toFullResponsiveObject(
      {
        base: getRawValue(value.base),
        sm: getRawValue(value.sm),
        md: getRawValue(value.md),
        lg: getRawValue(value.lg),
        xl: getRawValue(value.xl),
        "2xl": getRawValue(value["2xl"]),
      },
      "0" // default value for missing breakpoints
    )
  );
}
```

**Key insights:**

- Separate keys prevent StyleX from dropping breakpoints during merging
- All breakpoints must have values to ensure proper cascading
- Use CSS variables (`calc(var(--t-spacing-unit) * ${value})`) for dynamic values

### Complete Example: Padding with Responsive Support

Here's how padding and margin are implemented in TOSUI:

```tsx
// utils/breakpoints.stylex.ts
export const breakpoints = stylex.defineConsts({
  sm: "@media (min-width: 640px) and (max-width: 767px)",
  md: "@media (min-width: 768px) and (max-width: 1023px)",
  lg: "@media (min-width: 1024px) and (max-width: 1279px)",
  xl: "@media (min-width: 1280px) and (max-width: 1535px)",
  "2xl": "@media (min-width: 1536px)",
});

// styleParts/padding.ts
export type PaddingProps = {
  p?: ResponsiveValue<SpacingValue>;
  pt?: ResponsiveValue<SpacingValue>;
  pr?: ResponsiveValue<SpacingValue>;
  pb?: ResponsiveValue<SpacingValue>;
  pl?: ResponsiveValue<SpacingValue>;
  px?: ResponsiveValue<SpacingValue>;
  py?: ResponsiveValue<SpacingValue>;
};

const paddingStyles = stylex.create({
  paddingTop: (value: string) => ({ paddingTop: value }),
  paddingTopResponsive: (value: ResponsiveObject<string>) => ({
    paddingTop: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  // ... same for paddingRight, paddingBottom, paddingLeft
});

// Usage in Box component
<Box p={4} />                                      // Simple
<Box p={{ base: 2, md: 4, lg: 6 }} />            // Responsive
<Box px={{ base: 2, lg: 8 }} py={4} />           // Mixed
```

## Key Differences from Linaria

| Aspect             | Linaria                         | StyleX                             |
| ------------------ | ------------------------------- | ---------------------------------- |
| **Shorthands**     | Allowed                         | ❌ Forbidden (enforces atomic CSS) |
| **Dynamic values** | `styled.div` with interpolation | CSS variables via inline styles    |
| **Merging**        | `clsx(class1, class2)`          | `stylex.props(style1, style2)`     |
| **Media queries**  | ✅ In `css` template            | ✅ Nested in style object          |
| **Runtime cost**   | Some (for `styled.div`)         | Zero (pure CSS)                    |

## Advanced Features

### Variables & Theming

**Defining Variables:**

```tsx
// tokens.stylex.ts (must use .stylex.ts extension!)
export const colors = stylex.defineVars({
  primary: "blue",
  background: "white",
  // Can include media queries
  text: {
    default: "black",
    "@media (prefers-color-scheme: dark)": "white",
  },
});
```

**Important constraints:**

- Must be in `.stylex.ts` (or `.stylex.js`) files
- Must be named exports only
- File can ONLY contain variable definitions
- Variables are CSS identifiers, can't be used in JavaScript logic

**Using Variables:**

```tsx
import { colors } from "./tokens.stylex";

const styles = stylex.create({
  box: {
    color: colors.text,
    backgroundColor: colors.background,
  },
});
```

**Creating Themes:**

```tsx
const darkTheme = stylex.createTheme(colors, {
  primary: "lightblue",
  background: "black",
  // Unspecified vars revert to defaults
});

// Apply to element
<div {...stylex.props(darkTheme, styles.box)} />;
```

### Variants Pattern

Instead of a variants API, use separate style objects + bracket notation:

```tsx
const colorVariants = stylex.create({
  primary: { backgroundColor: "blue" },
  secondary: { backgroundColor: "gray" },
});

const sizeVariants = stylex.create({
  sm: { padding: 8 },
  lg: { padding: 16 },
});

function Button({ color, size }: ButtonProps) {
  return (
    <button
      {...stylex.props(
        baseStyles.button,
        colorVariants[color],
        sizeVariants[size]
      )}
    />
  );
}
```

**For compound variants:**

- Use conditional styles: `disabled && styles.disabled`
- Or separate style objects: `colorVariantsDisabled[color]`

## Best Practices

1. **Use `stylex.props()` for all style application** - Don't manually manage classNames
2. **Later styles override earlier ones** - Order matters when calling `stylex.props()`
3. **Leverage falsy value filtering** - No need to manually check conditions
4. **Accept `style` props in components** - Allow users to override styles
5. **Use dynamic styles sparingly** - Only for truly arbitrary values
6. **Pre-generate variants** - For design system tokens (spacing, colors, sizes, etc.)
7. **No shorthands ever** - Always use longhand properties
8. **Use variables for design tokens** - Better than inline strings
9. **Variants over props** - Use style objects + bracket notation instead of complex prop logic

## Implementation Strategy for TOSUI

### Unified Responsive Strategy

After discovering the combinatorial explosion problem with pre-generating static responsive variants, TOSUI uses a **unified approach for all responsive props**:

**Both dynamic AND enumerated props use the same pattern:**

- Static keys for non-responsive values
- Dynamic `responsive` function key for responsive values

This avoids generating exponential combinations while maintaining excellent DX.

#### The Combinatorial Explosion Problem

For enumerated props like `fontSize` with 9 values (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl) and 6 breakpoints (base, sm, md, lg, xl, 2xl), supporting all combinations would require:

**9^6 = 531,441 style keys** 😱

Even limiting to "common" progressive patterns (e.g., sm→md→lg) would still require hundreds of pre-generated variants, and users would inevitably want combinations we didn't predict.

#### The Solution: Hybrid Static + Dynamic

```tsx
// Works for BOTH dynamic props (padding) AND enumerated props (overflow)

// Static styles - one key per value
const overflowStyles = stylex.create({
  auto: { overflow: "auto" },
  hidden: { overflow: "hidden" },
  scroll: { overflow: "scroll" },
  visible: { overflow: "visible" },
});

// Responsive styles - separate object for better type generation
const overflowStylesResponsive = {
  responsive: (value: FullResponsiveObject<OverflowValues>) => ({
    overflow: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
};

// Usage function
function getOverflowStyles({
  overflow,
}: {
  overflow?: ResponsiveValue<OverflowValues>;
}) {
  if (!overflow) return [];

  if (typeof overflow !== "object") {
    // Simple value - use static style
    return [overflowStyles[overflow]];
  }

  // Responsive object - fill all breakpoints and use responsive function
  return [
    overflowStylesResponsive.responsive(
      toFullResponsiveObject(overflow, "visible")
    ),
  ];
}
```

**Benefits:**

- ✅ **Small bundle**: Only 4 static + 1 dynamic function (vs 531,441 variants!)
- ✅ **Supports all combinations**: Users can use any responsive pattern
- ✅ **Type-safe**: `FullResponsiveObject` ensures all breakpoints are provided
- ✅ **Avoids merging issues**: All breakpoints in one object
- ✅ **Consistent pattern**: Same approach for all prop types (dynamic and enumerated)

**Tradeoff:**

- Uses CSS variables for enumerated responsive values (minimal runtime cost)
- But this is negligible compared to generating thousands of static variants
- For non-responsive enumerated values, still uses pure static CSS (no variables)

### Breakpoint System

Use `stylex.defineConsts()` with both min-width and max-width:

```tsx
// utils/breakpoints.stylex.ts (must use .stylex.ts extension!)
export const breakpoints = stylex.defineConsts({
  sm: "@media (min-width: 640px) and (max-width: 767px)",
  md: "@media (min-width: 768px) and (max-width: 1023px)",
  lg: "@media (min-width: 1024px) and (max-width: 1279px)",
  xl: "@media (min-width: 1280px) and (max-width: 1535px)",
  "2xl": "@media (min-width: 1536px)",
});
```

**Why both min and max?** When media queries are defined as variables, StyleX can't determine their ordering. Using exclusive ranges prevents conflicts.

### Responsive Implementation Pattern

This pattern works for **both dynamic props** (padding, margin, width) **and enumerated props** (overflow, display, fontSize):

#### 1. Create Style Keys

For **dynamic props** (arbitrary values):

```tsx
// padding.ts - accepts any number or string
const paddingStyles = stylex.create({
  paddingTop: (value: string) => ({ paddingTop: value }),
  paddingTopResponsive: (value: FullResponsiveObject<string>) => ({
    paddingTop: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});
```

For **enumerated props** (predefined values):

```tsx
// overflow.ts - fixed set of values
const overflowStyles = stylex.create({
  auto: { overflow: "auto" },
  hidden: { overflow: "hidden" },
  scroll: { overflow: "scroll" },
  visible: { overflow: "visible" },
});

const overflowStylesResponsive = {
  responsive: (value: FullResponsiveObject<OverflowValues>) => ({
    overflow: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
};
```

#### 2. Fill All Breakpoints

Use `toFullResponsiveObject()` to ensure all breakpoints have values:

```tsx
function toFullResponsiveObject<T>(
  partial: ResponsiveObject<T>,
  defaultValue: T
): FullResponsiveObject<T> {
  const base = partial.base ?? defaultValue;
  const sm = partial.sm ?? base;
  const md = partial.md ?? sm;
  const lg = partial.lg ?? md;
  const xl = partial.xl ?? lg;
  const _2xl = partial["2xl"] ?? xl;
  return { base, sm, md, lg, xl, "2xl": _2xl };
}
```

This creates a mobile-first cascade where each breakpoint inherits from the previous one if not specified.

#### 3. Choose Style Based on Input Type

```tsx
function getOverflowStyles({
  overflow,
}: {
  overflow?: ResponsiveValue<OverflowValues>;
}) {
  if (!overflow) return [];

  if (typeof overflow !== "object") {
    // Simple value - use static/dynamic non-responsive style
    return [overflowStyles[overflow]]; // or paddingStyles.paddingTop(value)
  }

  // Responsive object - fill all breakpoints and use responsive function
  return [
    overflowStylesResponsive.responsive(
      toFullResponsiveObject(overflow, "visible")
    ),
  ];
}
```

### Why This Works

- **Separate keys prevent merging conflicts**: StyleX won't drop breakpoints when they're all in one object
- **All breakpoints have values**: Ensures proper mobile-first cascading
- **Small bundle for enumerated props**: Only N static styles + 1 responsive function (vs N^6 combinations)
- **Flexible for dynamic props**: Accepts arbitrary values via CSS variables
- **Consistent API**: Same pattern for all prop types
- **Exclusive media query ranges**: Prevents ordering issues with variable-based media queries
