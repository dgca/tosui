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
  "accent-emphasis": "var(--t-color-accent-emphasis)",
  accent: "var(--t-color-accent-default)",
  "error-emphasis": "var(--t-color-error-emphasis)",
  error: "var(--t-color-error-default)",
  "foreground-inverted-muted": "var(--t-color-foreground-inverted-muted)",
  "foreground-inverted-subtle": "var(--t-color-foreground-inverted-subtle)",
  "foreground-inverted": "var(--t-color-foreground-inverted)",
  "foreground-muted": "var(--t-color-foreground-muted)",
  "foreground-subtle": "var(--t-color-foreground-subtle)",
  foreground: "var(--t-color-foreground)",
  "info-emphasis": "var(--t-color-info-emphasis)",
  info: "var(--t-color-info-default)",
  "primary-emphasis": "var(--t-color-primary-emphasis)",
  primary: "var(--t-color-primary-default)",
  "success-emphasis": "var(--t-color-success-emphasis)",
  success: "var(--t-color-success-default)",
  "warning-emphasis": "var(--t-color-warning-emphasis)",
  warning: "var(--t-color-warning-default)",
} as const;

const BG_VALUES = {
  "accent-default": "var(--t-color-accent-default)",
  "accent-emphasis": "var(--t-color-accent-emphasis)",
  "accent-subtle": "var(--t-color-accent-subtle)",
  background: "var(--t-color-background)",
  "error-default": "var(--t-color-error-default)",
  "error-emphasis": "var(--t-color-error-emphasis)",
  "error-subtle": "var(--t-color-error-subtle)",
  "info-default": "var(--t-color-info-default)",
  "info-emphasis": "var(--t-color-info-emphasis)",
  "info-subtle": "var(--t-color-info-subtle)",
  "primary-default": "var(--t-color-primary-default)",
  "primary-emphasis": "var(--t-color-primary-emphasis)",
  "primary-subtle": "var(--t-color-primary-subtle)",
  "success-default": "var(--t-color-success-default)",
  "success-emphasis": "var(--t-color-success-emphasis)",
  "success-subtle": "var(--t-color-success-subtle)",
  surface: "var(--t-color-surface)",
  "warning-default": "var(--t-color-warning-default)",
  "warning-emphasis": "var(--t-color-warning-emphasis)",
  "warning-subtle": "var(--t-color-warning-subtle)",
} as const;

const BORDER_COLOR_VALUES = {
  "accent-emphasis": "var(--t-color-accent-emphasis)",
  accent: "var(--t-color-accent-default)",
  "border-muted": "var(--t-color-border-muted)",
  border: "var(--t-color-border)",
  "error-emphasis": "var(--t-color-error-emphasis)",
  error: "var(--t-color-error-default)",
  "info-emphasis": "var(--t-color-info-emphasis)",
  info: "var(--t-color-info-default)",
  "primary-emphasis": "var(--t-color-primary-emphasis)",
  primary: "var(--t-color-primary-default)",
  "success-emphasis": "var(--t-color-success-emphasis)",
  success: "var(--t-color-success-default)",
  "warning-emphasis": "var(--t-color-warning-emphasis)",
  warning: "var(--t-color-warning-default)",
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
  "foreground-inverted-muted": {
    color: COLOR_VALUES["foreground-inverted-muted"],
  },
  "foreground-inverted-subtle": {
    color: COLOR_VALUES["foreground-inverted-subtle"],
  },
  "foreground-inverted": {
    color: COLOR_VALUES["foreground-inverted"],
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
