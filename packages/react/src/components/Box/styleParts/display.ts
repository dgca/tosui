import { css } from "@linaria/core";

const DISPLAY = {
  block: css`
    display: block;
  `,
  flex: css`
    display: flex;
  `,
  grid: css`
    display: grid;
  `,
  "inline-flex": css`
    display: inline-flex;
  `,
  "inline-grid": css`
    display: inline-grid;
  `,
  "inline-block": css`
    display: inline-block;
  `,
  inline: css`
    display: inline;
  `,
  none: css`
    display: none;
  `,
} as const;

type Display = keyof typeof DISPLAY;

export type DisplayProps = {
  display?: Display;
};

export function getDisplay(display?: Display) {
  if (!display) return "";
  return DISPLAY[display];
}
