import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type ResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";
import { type SpacingValue } from "./types";

export type InsetProps = {
  inset?: ResponsiveValue<SpacingValue>;
  insetX?: ResponsiveValue<SpacingValue>;
  insetY?: ResponsiveValue<SpacingValue>;
  top?: ResponsiveValue<SpacingValue>;
  right?: ResponsiveValue<SpacingValue>;
  bottom?: ResponsiveValue<SpacingValue>;
  left?: ResponsiveValue<SpacingValue>;
};

const insetStyles = stylex.create({
  bottom: (value: string) => ({ bottom: value }),
  bottomResponsive: (value: ResponsiveObject<string>) => ({
    bottom: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  left: (value: string) => ({ left: value }),
  leftResponsive: (value: ResponsiveObject<string>) => ({
    left: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  right: (value: string) => ({ right: value }),
  rightResponsive: (value: ResponsiveObject<string>) => ({
    right: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  top: (value: string) => ({ top: value }),
  topResponsive: (value: ResponsiveObject<string>) => ({
    top: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

// Helper to convert spacing value to CSS string
function getRawValue(value?: SpacingValue): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string") return value;
  if (value === 0) return "0";
  return `calc(var(--t-spacing-unit) * ${value})`;
}

function getInsetProps(
  key: "top" | "right" | "bottom" | "left",
  value?: ResponsiveValue<SpacingValue>
) {
  if (typeof value !== "object") {
    const rawValue = getRawValue(value);
    return typeof rawValue === "string"
      ? insetStyles[key](rawValue)
      : undefined;
  }

  return insetStyles[`${key}Responsive`](
    toFullResponsiveObject(
      {
        base: getRawValue(value.base),
        sm: getRawValue(value.sm),
        md: getRawValue(value.md),
        lg: getRawValue(value.lg),
        xl: getRawValue(value.xl),
        "2xl": getRawValue(value["2xl"]),
      },
      "0"
    )
  );
}

// Helper function to get all inset styles for a component
// Respects cascading specificity: specific (top/right/bottom/left) > axis (insetX/insetY) > all (inset)
export function getInsetStyles(props: InsetProps) {
  const { inset, insetX, insetY, top, right, bottom, left } = props;

  // Resolve with cascading specificity
  const topValue = getInsetProps("top", top ?? insetY ?? inset);
  const rightValue = getInsetProps("right", right ?? insetX ?? inset);
  const bottomValue = getInsetProps("bottom", bottom ?? insetY ?? inset);
  const leftValue = getInsetProps("left", left ?? insetX ?? inset);

  const styles = [];

  if (topValue !== undefined) {
    styles.push(topValue);
  }
  if (rightValue !== undefined) {
    styles.push(rightValue);
  }
  if (bottomValue !== undefined) {
    styles.push(bottomValue);
  }
  if (leftValue !== undefined) {
    styles.push(leftValue);
  }

  return styles;
}
