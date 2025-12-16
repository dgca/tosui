import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type ZIndexValues = keyof typeof zIndexStyles;

const ZINDEX_VALUES = {
  base: 0,
  behind: -1,
  dropdown: 1000,
  modal: 1200,
  sticky: 1100,
  toast: 1300,
  tooltip: 1400,
} as const;

const zIndexStyles = stylex.create({
  base: {
    zIndex: ZINDEX_VALUES.base,
  },
  behind: {
    zIndex: ZINDEX_VALUES.behind,
  },
  dropdown: {
    zIndex: ZINDEX_VALUES.dropdown,
  },
  modal: {
    zIndex: ZINDEX_VALUES.modal,
  },
  sticky: {
    zIndex: ZINDEX_VALUES.sticky,
  },
  toast: {
    zIndex: ZINDEX_VALUES.toast,
  },
  tooltip: {
    zIndex: ZINDEX_VALUES.tooltip,
  },
});

const zIndexStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<ZIndexValues>) => ({
    zIndex: {
      // eslint-disable-next-line @stylexjs/valid-styles
      default: ZINDEX_VALUES[value.base],
      [breakpoints.sm]: ZINDEX_VALUES[value.sm],
      [breakpoints.md]: ZINDEX_VALUES[value.md],
      [breakpoints.lg]: ZINDEX_VALUES[value.lg],
      [breakpoints.xl]: ZINDEX_VALUES[value.xl],
      [breakpoints["2xl"]]: ZINDEX_VALUES[value["2xl"]],
    },
  }),
});

export type ZIndex = ResponsiveValue<ZIndexValues>;

export type ZIndexProps = {
  zIndex?: ZIndex;
};

export function getZIndexStyles(zIndex?: ZIndex) {
  if (!zIndex) return null;

  return typeof zIndex !== "object"
    ? zIndexStyles[zIndex]
    : zIndexStylesResponsive.responsive(
        toFullResponsiveObject(zIndex, "base")
      );
}
