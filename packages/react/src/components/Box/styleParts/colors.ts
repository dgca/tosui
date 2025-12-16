/* eslint-disable @stylexjs/valid-styles */
import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type ColorValues = keyof typeof colorStyles;
type BackgroundColorValues = keyof typeof bgStyles;
type BorderColorValues = keyof typeof borderColorStyles;

const COLOR_VALUES = {
  "accent-emphasis": "var(--tosui-accent-emphasis)",
  accent: "var(--tosui-accent-default)",
  "error-emphasis": "var(--tosui-error-emphasis)",
  error: "var(--tosui-error-default)",
  "foreground-muted": "var(--tosui-foreground-muted)",
  "foreground-subtle": "var(--tosui-foreground-subtle)",
  foreground: "var(--tosui-foreground)",
  "info-emphasis": "var(--tosui-info-emphasis)",
  info: "var(--tosui-info-default)",
  "primary-emphasis": "var(--tosui-primary-emphasis)",
  primary: "var(--tosui-primary-default)",
  "success-emphasis": "var(--tosui-success-emphasis)",
  success: "var(--tosui-success-default)",
  "warning-emphasis": "var(--tosui-warning-emphasis)",
  warning: "var(--tosui-warning-default)",
} as const;

const BG_VALUES = {
  "accent-default": "var(--tosui-accent-default)",
  "accent-emphasis": "var(--tosui-accent-emphasis)",
  "accent-subtle": "var(--tosui-accent-subtle)",
  background: "var(--tosui-background)",
  "error-default": "var(--tosui-error-default)",
  "error-emphasis": "var(--tosui-error-emphasis)",
  "error-subtle": "var(--tosui-error-subtle)",
  "info-default": "var(--tosui-info-default)",
  "info-emphasis": "var(--tosui-info-emphasis)",
  "info-subtle": "var(--tosui-info-subtle)",
  "primary-default": "var(--tosui-primary-default)",
  "primary-emphasis": "var(--tosui-primary-emphasis)",
  "primary-subtle": "var(--tosui-primary-subtle)",
  "success-default": "var(--tosui-success-default)",
  "success-emphasis": "var(--tosui-success-emphasis)",
  "success-subtle": "var(--tosui-success-subtle)",
  surface: "var(--tosui-surface)",
  "warning-default": "var(--tosui-warning-default)",
  "warning-emphasis": "var(--tosui-warning-emphasis)",
  "warning-subtle": "var(--tosui-warning-subtle)",
} as const;

const BORDER_COLOR_VALUES = {
  "accent-emphasis": "var(--tosui-accent-emphasis)",
  accent: "var(--tosui-accent-default)",
  "border-muted": "var(--tosui-border-muted)",
  border: "var(--tosui-border)",
  "error-emphasis": "var(--tosui-error-emphasis)",
  error: "var(--tosui-error-default)",
  "info-emphasis": "var(--tosui-info-emphasis)",
  info: "var(--tosui-info-default)",
  "primary-emphasis": "var(--tosui-primary-emphasis)",
  primary: "var(--tosui-primary-default)",
  "success-emphasis": "var(--tosui-success-emphasis)",
  success: "var(--tosui-success-default)",
  "warning-emphasis": "var(--tosui-warning-emphasis)",
  warning: "var(--tosui-warning-default)",
} as const;

const colorStyles = stylex.create({
  "accent-emphasis": {
    color: COLOR_VALUES["accent-emphasis"],
  },
  accent: {
    color: COLOR_VALUES.accent,
  },
  "error-emphasis": {
    color: COLOR_VALUES["error-emphasis"],
  },
  error: {
    color: COLOR_VALUES.error,
  },
  "foreground-muted": {
    color: COLOR_VALUES["foreground-muted"],
  },
  "foreground-subtle": {
    color: COLOR_VALUES["foreground-subtle"],
  },
  foreground: {
    color: COLOR_VALUES.foreground,
  },
  "info-emphasis": {
    color: COLOR_VALUES["info-emphasis"],
  },
  info: {
    color: COLOR_VALUES.info,
  },
  "primary-emphasis": {
    color: COLOR_VALUES["primary-emphasis"],
  },
  primary: {
    color: COLOR_VALUES.primary,
  },
  "success-emphasis": {
    color: COLOR_VALUES["success-emphasis"],
  },
  success: {
    color: COLOR_VALUES.success,
  },
  "warning-emphasis": {
    color: COLOR_VALUES["warning-emphasis"],
  },
  warning: {
    color: COLOR_VALUES.warning,
  },
});

const colorStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<ColorValues>) => ({
    color: {
      default: COLOR_VALUES[value.base],
      [breakpoints.sm]: COLOR_VALUES[value.sm],
      [breakpoints.md]: COLOR_VALUES[value.md],
      [breakpoints.lg]: COLOR_VALUES[value.lg],
      [breakpoints.xl]: COLOR_VALUES[value.xl],
      [breakpoints["2xl"]]: COLOR_VALUES[value["2xl"]],
    },
  }),
});

const bgStyles = stylex.create({
  "accent-default": {
    backgroundColor: BG_VALUES["accent-default"],
  },
  "accent-emphasis": {
    backgroundColor: BG_VALUES["accent-emphasis"],
  },
  "accent-subtle": {
    backgroundColor: BG_VALUES["accent-subtle"],
  },
  background: {
    backgroundColor: BG_VALUES.background,
  },
  "error-default": {
    backgroundColor: BG_VALUES["error-default"],
  },
  "error-emphasis": {
    backgroundColor: BG_VALUES["error-emphasis"],
  },
  "error-subtle": {
    backgroundColor: BG_VALUES["error-subtle"],
  },
  "info-default": {
    backgroundColor: BG_VALUES["info-default"],
  },
  "info-emphasis": {
    backgroundColor: BG_VALUES["info-emphasis"],
  },
  "info-subtle": {
    backgroundColor: BG_VALUES["info-subtle"],
  },
  "primary-default": {
    backgroundColor: BG_VALUES["primary-default"],
  },
  "primary-emphasis": {
    backgroundColor: BG_VALUES["primary-emphasis"],
  },
  "primary-subtle": {
    backgroundColor: BG_VALUES["primary-subtle"],
  },
  "success-default": {
    backgroundColor: BG_VALUES["success-default"],
  },
  "success-emphasis": {
    backgroundColor: BG_VALUES["success-emphasis"],
  },
  "success-subtle": {
    backgroundColor: BG_VALUES["success-subtle"],
  },
  surface: {
    backgroundColor: BG_VALUES.surface,
  },
  "warning-default": {
    backgroundColor: BG_VALUES["warning-default"],
  },
  "warning-emphasis": {
    backgroundColor: BG_VALUES["warning-emphasis"],
  },
  "warning-subtle": {
    backgroundColor: BG_VALUES["warning-subtle"],
  },
});

const bgStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<BackgroundColorValues>) => ({
    backgroundColor: {
      default: BG_VALUES[value.base],
      [breakpoints.sm]: BG_VALUES[value.sm],
      [breakpoints.md]: BG_VALUES[value.md],
      [breakpoints.lg]: BG_VALUES[value.lg],
      [breakpoints.xl]: BG_VALUES[value.xl],
      [breakpoints["2xl"]]: BG_VALUES[value["2xl"]],
    },
  }),
});

const borderColorStyles = stylex.create({
  "accent-emphasis": {
    borderColor: BORDER_COLOR_VALUES["accent-emphasis"],
  },
  accent: {
    borderColor: BORDER_COLOR_VALUES.accent,
  },
  "border-muted": {
    borderColor: BORDER_COLOR_VALUES["border-muted"],
  },
  border: {
    borderColor: BORDER_COLOR_VALUES.border,
  },
  "error-emphasis": {
    borderColor: BORDER_COLOR_VALUES["error-emphasis"],
  },
  error: {
    borderColor: BORDER_COLOR_VALUES.error,
  },
  "info-emphasis": {
    borderColor: BORDER_COLOR_VALUES["info-emphasis"],
  },
  info: {
    borderColor: BORDER_COLOR_VALUES.info,
  },
  "primary-emphasis": {
    borderColor: BORDER_COLOR_VALUES["primary-emphasis"],
  },
  primary: {
    borderColor: BORDER_COLOR_VALUES.primary,
  },
  "success-emphasis": {
    borderColor: BORDER_COLOR_VALUES["success-emphasis"],
  },
  success: {
    borderColor: BORDER_COLOR_VALUES.success,
  },
  "warning-emphasis": {
    borderColor: BORDER_COLOR_VALUES["warning-emphasis"],
  },
  warning: {
    borderColor: BORDER_COLOR_VALUES.warning,
  },
});

const borderColorStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<BorderColorValues>) => ({
    borderColor: {
      default: BORDER_COLOR_VALUES[value.base],
      [breakpoints.sm]: BORDER_COLOR_VALUES[value.sm],
      [breakpoints.md]: BORDER_COLOR_VALUES[value.md],
      [breakpoints.lg]: BORDER_COLOR_VALUES[value.lg],
      [breakpoints.xl]: BORDER_COLOR_VALUES[value.xl],
      [breakpoints["2xl"]]: BORDER_COLOR_VALUES[value["2xl"]],
    },
  }),
});

export type Color = ResponsiveValue<ColorValues>;
export type BackgroundColor = ResponsiveValue<BackgroundColorValues>;
export type BorderColor = ResponsiveValue<BorderColorValues>;

export type ColorProps = {
  color?: Color;
  bg?: BackgroundColor;
  borderColor?: BorderColor;
};

export function getColorStyles(props: ColorProps) {
  const { color, bg, borderColor } = props;

  const styles = [];

  if (color) {
    styles.push(
      typeof color !== "object"
        ? colorStyles[color]
        : colorStylesResponsive.responsive(
            toFullResponsiveObject(color, "foreground")
          )
    );
  }

  if (bg) {
    styles.push(
      typeof bg !== "object"
        ? bgStyles[bg]
        : bgStylesResponsive.responsive(
            toFullResponsiveObject(bg, "background")
          )
    );
  }

  if (borderColor) {
    styles.push(
      typeof borderColor !== "object"
        ? borderColorStyles[borderColor]
        : borderColorStylesResponsive.responsive(
            toFullResponsiveObject(borderColor, "border")
          )
    );
  }

  return styles;
}
