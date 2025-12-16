import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  toFullResponsiveObject,
  type FullResponsiveObject,
  type ResponsiveValue,
} from "../../../utils/breakpoints.stylex";

type OverflowValues = keyof typeof overflowStyles;

const DEFAULT_VALUE = "visible";

const overflowStyles = stylex.create({
  auto: {
    overflow: "auto",
  },
  hidden: {
    overflow: "hidden",
  },
  scroll: {
    overflow: "scroll",
  },
  visible: {
    overflow: "visible",
  },
});

const overflowStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<OverflowValues>) => ({
    overflow: {
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

const overflowXStyles = stylex.create({
  auto: {
    overflowX: "auto",
  },
  hidden: {
    overflowX: "hidden",
  },
  scroll: {
    overflowX: "scroll",
  },
  visible: {
    overflowX: "visible",
  },
});

const overflowXStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<OverflowValues>) => ({
    overflowX: {
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

const overflowYStyles = stylex.create({
  auto: {
    overflowY: "auto",
  },
  hidden: {
    overflowY: "hidden",
  },
  scroll: {
    overflowY: "scroll",
  },
  visible: {
    overflowY: "visible",
  },
});

const overflowYStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<OverflowValues>) => ({
    overflowY: {
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

export type OverflowProps = {
  overflow?: ResponsiveValue<OverflowValues>;
  overflowX?: OverflowValues;
  overflowY?: OverflowValues;
};

export function getOverflowStyles({
  overflow,
  overflowX,
  overflowY,
}: OverflowProps) {
  const styles = [];

  if (overflow) {
    styles.push(
      typeof overflow !== "object"
        ? overflowStyles[overflow]
        : overflowStylesResponsive.responsive(
            toFullResponsiveObject(overflow, DEFAULT_VALUE)
          )
    );
  }
  if (overflowX) {
    styles.push(
      typeof overflowX !== "object"
        ? overflowXStyles[overflowX]
        : overflowXStylesResponsive.responsive(
            toFullResponsiveObject(overflowX, DEFAULT_VALUE)
          )
    );
  }
  if (overflowY) {
    styles.push(
      typeof overflowY !== "object"
        ? overflowYStyles[overflowY]
        : overflowYStylesResponsive.responsive(
            toFullResponsiveObject(overflowY, DEFAULT_VALUE)
          )
    );
  }

  return styles;
}
