import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type DisplayValues = keyof typeof displayStyles;

export type Display = ResponsiveValue<DisplayValues>;

const displayStyles = stylex.create({
  block: {
    display: "block",
  },
  flex: {
    display: "flex",
  },
  grid: {
    display: "grid",
  },
  inline: {
    display: "inline",
  },
  "inline-block": {
    display: "inline-block",
  },
  "inline-flex": {
    display: "inline-flex",
  },
  "inline-grid": {
    display: "inline-grid",
  },
  none: {
    display: "none",
  },
});

const displayStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<DisplayValues>) => ({
    display: {
      // eslint-disable-next-line @stylexjs/valid-styles
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

export type DisplayProps = {
  display?: Display;
};

export function getDisplayStyles(display?: Display) {
  if (!display) return undefined;

  return typeof display !== "object"
    ? displayStyles[display]
    : displayStylesResponsive.responsive(
        toFullResponsiveObject(display, "block")
      );
}
