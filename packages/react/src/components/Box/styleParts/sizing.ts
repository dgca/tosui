import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type ResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";
import { type SpacingValue } from "./types";

export type SizeProps = {
  w?: ResponsiveValue<SpacingValue>;
  h?: ResponsiveValue<SpacingValue>;
  minW?: ResponsiveValue<SpacingValue>;
  maxW?: ResponsiveValue<SpacingValue>;
  minH?: ResponsiveValue<SpacingValue>;
  maxH?: ResponsiveValue<SpacingValue>;
};

const sizingStyles = stylex.create({
  height: (value: string) => ({ height: value }),
  heightResponsive: (value: ResponsiveObject<string>) => ({
    height: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  maxHeight: (value: string) => ({ maxHeight: value }),
  maxHeightResponsive: (value: ResponsiveObject<string>) => ({
    maxHeight: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  maxWidth: (value: string) => ({ maxWidth: value }),
  maxWidthResponsive: (value: ResponsiveObject<string>) => ({
    maxWidth: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  minHeight: (value: string) => ({ minHeight: value }),
  minHeightResponsive: (value: ResponsiveObject<string>) => ({
    minHeight: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  minWidth: (value: string) => ({ minWidth: value }),
  minWidthResponsive: (value: ResponsiveObject<string>) => ({
    minWidth: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  width: (value: string) => ({ width: value }),
  widthResponsive: (value: ResponsiveObject<string>) => ({
    width: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

// Helper to convert size value to CSS string
function getRawValue(value?: SpacingValue): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string") return value;
  if (value === 0) return "0";
  return `calc(var(--t-spacing-unit) * ${value})`;
}

function getSizeProps(
  key: "width" | "height" | "minWidth" | "maxWidth" | "minHeight" | "maxHeight",
  value?: ResponsiveValue<SpacingValue>
) {
  if (typeof value !== "object") {
    const rawValue = getRawValue(value);
    return typeof rawValue === "string"
      ? sizingStyles[key](rawValue)
      : undefined;
  }

  return sizingStyles[`${key}Responsive`](
    toFullResponsiveObject(
      {
        base: getRawValue(value.base),
        sm: getRawValue(value.sm),
        md: getRawValue(value.md),
        lg: getRawValue(value.lg),
        xl: getRawValue(value.xl),
        "2xl": getRawValue(value["2xl"]),
      },
      "auto"
    )
  );
}

// Helper function to get all sizing styles for a component
export function getSizingStyles(props: SizeProps) {
  const { w, h, minW, maxW, minH, maxH } = props;

  const width = getSizeProps("width", w);
  const height = getSizeProps("height", h);
  const minWidth = getSizeProps("minWidth", minW);
  const maxWidth = getSizeProps("maxWidth", maxW);
  const minHeight = getSizeProps("minHeight", minH);
  const maxHeight = getSizeProps("maxHeight", maxH);

  const styles = [];

  if (width !== undefined) {
    styles.push(width);
  }
  if (height !== undefined) {
    styles.push(height);
  }
  if (minWidth !== undefined) {
    styles.push(minWidth);
  }
  if (maxWidth !== undefined) {
    styles.push(maxWidth);
  }
  if (minHeight !== undefined) {
    styles.push(minHeight);
  }
  if (maxHeight !== undefined) {
    styles.push(maxHeight);
  }

  return styles;
}
