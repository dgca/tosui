import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type OpacityValues = keyof typeof opacityStyles;

const OPACITY_VALUES = {
  faint: 0.4,
  full: 1,
  invisible: 0,
  semi: 0.6,
} as const;

const opacityStyles = stylex.create({
  faint: {
    opacity: OPACITY_VALUES.faint,
  },
  full: {
    opacity: OPACITY_VALUES.full,
  },
  invisible: {
    opacity: OPACITY_VALUES.invisible,
  },
  semi: {
    opacity: OPACITY_VALUES.semi,
  },
});

const opacityStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<OpacityValues>) => ({
    opacity: {
      default: OPACITY_VALUES[value.base],
      [breakpoints.sm]: OPACITY_VALUES[value.sm],
      [breakpoints.md]: OPACITY_VALUES[value.md],
      [breakpoints.lg]: OPACITY_VALUES[value.lg],
      [breakpoints.xl]: OPACITY_VALUES[value.xl],
      [breakpoints["2xl"]]: OPACITY_VALUES[value["2xl"]],
    },
  }),
});

export type Opacity = ResponsiveValue<OpacityValues>;

export type OpacityProps = {
  opacity?: Opacity;
};

export function getOpacityStyles(props: OpacityProps) {
  const { opacity } = props;

  if (!opacity) {
    return [];
  }

  return [
    typeof opacity !== "object"
      ? opacityStyles[opacity]
      : opacityStylesResponsive.responsive(
          toFullResponsiveObject(opacity, "full")
        ),
  ];
}
