import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type ResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";
import { type SpacingValue } from "./types";

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
  paddingBottom: (value: string) => ({ paddingBottom: value }),
  paddingBottomResponsive: (value: ResponsiveObject<string>) => ({
    paddingBottom: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  paddingLeft: (value: string) => ({ paddingLeft: value }),
  paddingLeftResponsive: (value: ResponsiveObject<string>) => ({
    paddingLeft: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  paddingRight: (value: string) => ({ paddingRight: value }),
  paddingRightResponsive: (value: ResponsiveObject<string>) => ({
    paddingRight: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
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
});

function getRawValue(value?: SpacingValue): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string") return value;
  if (value === 0) return "0";
  return `calc(var(--t-spacing-unit) * ${value})`;
}

function getSpacingProps(
  key: `padding${"Top" | "Right" | "Bottom" | "Left"}`,
  value?: ResponsiveValue<SpacingValue>
) {
  if (typeof value !== "object") {
    const rawValue = getRawValue(value);
    return typeof rawValue === "string"
      ? paddingStyles[key](rawValue)
      : undefined;
  }

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
      "0"
    )
  );
}

// Helper function to get all spacing styles for a component
// Respects cascading specificity: specific (pt) > axis (px/py) > all (p)
export function getPaddingStyles(props: PaddingProps) {
  // Resolve padding with cascading specificity
  const paddingTop = getSpacingProps(
    "paddingTop",
    props.pt ?? props.py ?? props.p
  );
  const paddingRight = getSpacingProps(
    "paddingRight",
    props.pr ?? props.px ?? props.p
  );
  const paddingBottom = getSpacingProps(
    "paddingBottom",
    props.pb ?? props.py ?? props.p
  );
  const paddingLeft = getSpacingProps(
    "paddingLeft",
    props.pl ?? props.px ?? props.p
  );

  const styles = [];

  // Apply padding styles
  if (paddingTop !== undefined) {
    styles.push(paddingTop);
  }
  if (paddingRight !== undefined) {
    styles.push(paddingRight);
  }
  if (paddingBottom !== undefined) {
    styles.push(paddingBottom);
  }
  if (paddingLeft !== undefined) {
    styles.push(paddingLeft);
  }

  return styles;
}
