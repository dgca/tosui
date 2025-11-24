import { css } from "@linaria/core";

// Text colors
const COLORS = {
  foreground: css`
    color: var(--tosui-foreground);
  `,
  "foreground-muted": css`
    color: var(--tosui-foreground-muted);
  `,
  "foreground-subtle": css`
    color: var(--tosui-foreground-subtle);
  `,
  primary: css`
    color: var(--tosui-primary-default);
  `,
  "primary-emphasis": css`
    color: var(--tosui-primary-emphasis);
  `,
  accent: css`
    color: var(--tosui-accent-default);
  `,
  "accent-emphasis": css`
    color: var(--tosui-accent-emphasis);
  `,
  success: css`
    color: var(--tosui-success-default);
  `,
  "success-emphasis": css`
    color: var(--tosui-success-emphasis);
  `,
  warning: css`
    color: var(--tosui-warning-default);
  `,
  "warning-emphasis": css`
    color: var(--tosui-warning-emphasis);
  `,
  error: css`
    color: var(--tosui-error-default);
  `,
  "error-emphasis": css`
    color: var(--tosui-error-emphasis);
  `,
  info: css`
    color: var(--tosui-info-default);
  `,
  "info-emphasis": css`
    color: var(--tosui-info-emphasis);
  `,
} as const;

// Background colors
const BACKGROUND_COLORS = {
  background: css`
    background-color: var(--tosui-background);
  `,
  surface: css`
    background-color: var(--tosui-surface);
  `,
  "primary-subtle": css`
    background-color: var(--tosui-primary-subtle);
  `,
  "primary-default": css`
    background-color: var(--tosui-primary-default);
  `,
  "primary-emphasis": css`
    background-color: var(--tosui-primary-emphasis);
  `,
  "accent-subtle": css`
    background-color: var(--tosui-accent-subtle);
  `,
  "accent-default": css`
    background-color: var(--tosui-accent-default);
  `,
  "accent-emphasis": css`
    background-color: var(--tosui-accent-emphasis);
  `,
  "success-subtle": css`
    background-color: var(--tosui-success-subtle);
  `,
  "success-default": css`
    background-color: var(--tosui-success-default);
  `,
  "success-emphasis": css`
    background-color: var(--tosui-success-emphasis);
  `,
  "warning-subtle": css`
    background-color: var(--tosui-warning-subtle);
  `,
  "warning-default": css`
    background-color: var(--tosui-warning-default);
  `,
  "warning-emphasis": css`
    background-color: var(--tosui-warning-emphasis);
  `,
  "error-subtle": css`
    background-color: var(--tosui-error-subtle);
  `,
  "error-default": css`
    background-color: var(--tosui-error-default);
  `,
  "error-emphasis": css`
    background-color: var(--tosui-error-emphasis);
  `,
  "info-subtle": css`
    background-color: var(--tosui-info-subtle);
  `,
  "info-default": css`
    background-color: var(--tosui-info-default);
  `,
  "info-emphasis": css`
    background-color: var(--tosui-info-emphasis);
  `,
} as const;

// Border colors
const BORDER_COLORS = {
  border: css`
    border-color: var(--tosui-border);
  `,
  "border-muted": css`
    border-color: var(--tosui-border-muted);
  `,
  primary: css`
    border-color: var(--tosui-primary-default);
  `,
  "primary-emphasis": css`
    border-color: var(--tosui-primary-emphasis);
  `,
  accent: css`
    border-color: var(--tosui-accent-default);
  `,
  "accent-emphasis": css`
    border-color: var(--tosui-accent-emphasis);
  `,
  success: css`
    border-color: var(--tosui-success-default);
  `,
  "success-emphasis": css`
    border-color: var(--tosui-success-emphasis);
  `,
  warning: css`
    border-color: var(--tosui-warning-default);
  `,
  "warning-emphasis": css`
    border-color: var(--tosui-warning-emphasis);
  `,
  error: css`
    border-color: var(--tosui-error-default);
  `,
  "error-emphasis": css`
    border-color: var(--tosui-error-emphasis);
  `,
  info: css`
    border-color: var(--tosui-info-default);
  `,
  "info-emphasis": css`
    border-color: var(--tosui-info-emphasis);
  `,
} as const;

type Color = keyof typeof COLORS;
type BackgroundColor = keyof typeof BACKGROUND_COLORS;
type BorderColor = keyof typeof BORDER_COLORS;

export type ColorProps = {
  color?: Color;
  bg?: BackgroundColor;
  borderColor?: BorderColor;
};

export function getColor(color?: Color) {
  if (!color) return "";
  return COLORS[color];
}

export function getBackgroundColor(bg?: BackgroundColor) {
  if (!bg) return "";
  return BACKGROUND_COLORS[bg];
}

export function getBorderColor(borderColor?: BorderColor) {
  if (!borderColor) return "";
  return BORDER_COLORS[borderColor];
}
