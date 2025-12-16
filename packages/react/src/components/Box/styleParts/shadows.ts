import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type ShadowValues = keyof typeof shadowStyles;

const SHADOW_VALUES = {
  lg: "var(--tosui-shadow-lg)",
  md: "var(--tosui-shadow-md)",
  none: "var(--tosui-shadow-none)",
  sm: "var(--tosui-shadow-sm)",
} as const;

const shadowStyles = stylex.create({
  lg: {
    // eslint-disable-next-line @stylexjs/valid-styles
    boxShadow: SHADOW_VALUES.lg,
  },
  md: {
    // eslint-disable-next-line @stylexjs/valid-styles
    boxShadow: SHADOW_VALUES.md,
  },
  none: {
    // eslint-disable-next-line @stylexjs/valid-styles
    boxShadow: SHADOW_VALUES.none,
  },
  sm: {
    // eslint-disable-next-line @stylexjs/valid-styles
    boxShadow: SHADOW_VALUES.sm,
  },
});

const shadowStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<ShadowValues>) => ({
    boxShadow: {
      // eslint-disable-next-line @stylexjs/valid-styles
      default: SHADOW_VALUES[value.base],
      [breakpoints.sm]: SHADOW_VALUES[value.sm],
      [breakpoints.md]: SHADOW_VALUES[value.md],
      [breakpoints.lg]: SHADOW_VALUES[value.lg],
      [breakpoints.xl]: SHADOW_VALUES[value.xl],
      [breakpoints["2xl"]]: SHADOW_VALUES[value["2xl"]],
    },
  }),
});

type Shadow = ResponsiveValue<ShadowValues>;

export type ShadowProps = {
  shadow?: Shadow;
};

export function getShadowStyles(props: ShadowProps) {
  const { shadow } = props;

  if (!shadow) return [];

  return [
    typeof shadow !== "object"
      ? shadowStyles[shadow]
      : shadowStylesResponsive.responsive(
          toFullResponsiveObject(shadow, "none")
        ),
  ];
}
