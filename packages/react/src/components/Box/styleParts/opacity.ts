import { css } from "@linaria/core";

const OPACITY = {
  invisible: css`
    opacity: 0;
  `,
  faint: css`
    opacity: 0.4;
  `,
  semi: css`
    opacity: 0.6;
  `,
  full: css`
    opacity: 1;
  `,
} as const;

export type Opacity = keyof typeof OPACITY;

export type OpacityProps = {
  opacity?: Opacity;
};

export function getOpacity(opacity?: Opacity) {
  if (!opacity) return "";
  return OPACITY[opacity];
}
