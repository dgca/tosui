import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type PositionValues = keyof typeof positionStyles;

const positionStyles = stylex.create({
  absolute: {
    position: "absolute",
  },
  fixed: {
    position: "fixed",
  },
  relative: {
    position: "relative",
  },
  static: {
    position: "static",
  },
  sticky: {
    position: "sticky",
  },
});

const positionStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<PositionValues>) => ({
    position: {
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

export type Position = ResponsiveValue<PositionValues>;

export type PositionProps = {
  position?: Position;
};

export function getPositionStyles(position?: Position) {
  if (!position) return null;

  return typeof position !== "object"
    ? positionStyles[position]
    : positionStylesResponsive.responsive(
        toFullResponsiveObject(position, "static")
      );
}
