import {
  breakpoints,
  type ResponsiveValue,
  type ResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";
import * as stylex from "@stylexjs/stylex";
import { type SpacingValue } from "./types";

export type MarginProps = {
  m?: ResponsiveValue<SpacingValue>;
  mt?: ResponsiveValue<SpacingValue>;
  mr?: ResponsiveValue<SpacingValue>;
  mb?: ResponsiveValue<SpacingValue>;
  ml?: ResponsiveValue<SpacingValue>;
  mx?: ResponsiveValue<SpacingValue>;
  my?: ResponsiveValue<SpacingValue>;
};

const marginStyles = stylex.create({
  marginBottom: (value: string) => ({ marginBottom: value }),
  marginBottomResponsive: (value: ResponsiveObject<string>) => ({
    marginBottom: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  marginLeft: (value: string) => ({ marginLeft: value }),
  marginLeftResponsive: (value: ResponsiveObject<string>) => ({
    marginLeft: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  marginRight: (value: string) => ({ marginRight: value }),
  marginRightResponsive: (value: ResponsiveObject<string>) => ({
    marginRight: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  marginTop: (value: string) => ({ marginTop: value }),
  marginTopResponsive: (value: ResponsiveObject<string>) => ({
    marginTop: {
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
  return `calc(var(--tosui-spacing-unit) * ${value})`;
}

function getSpacingProps(
  key: `margin${"Top" | "Right" | "Bottom" | "Left"}`,
  value?: ResponsiveValue<SpacingValue>
) {
  if (typeof value !== "object") {
    const rawValue = getRawValue(value);
    return typeof rawValue === "string"
      ? marginStyles[key](rawValue)
      : undefined;
  }

  return marginStyles[`${key}Responsive`](
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
// Respects cascading specificity: specific (mt) > axis (mx/my) > all (m)
export function getMarginStyles(props: MarginProps) {
  // Resolve margin with cascading specificity
  const marginTop = getSpacingProps(
    "marginTop",
    props.mt ?? props.my ?? props.m
  );
  const marginRight = getSpacingProps(
    "marginRight",
    props.mr ?? props.mx ?? props.m
  );
  const marginBottom = getSpacingProps(
    "marginBottom",
    props.mb ?? props.my ?? props.m
  );
  const marginLeft = getSpacingProps(
    "marginLeft",
    props.ml ?? props.mx ?? props.m
  );

  const styles = [];

  // Apply margin styles
  if (marginTop !== undefined) {
    styles.push(marginTop);
  }
  if (marginRight !== undefined) {
    styles.push(marginRight);
  }
  if (marginBottom !== undefined) {
    styles.push(marginBottom);
  }
  if (marginLeft !== undefined) {
    styles.push(marginLeft);
  }

  return styles;
}
