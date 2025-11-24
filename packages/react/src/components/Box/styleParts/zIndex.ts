import { css } from "@linaria/core";

const Z_INDEX = {
  behind: css`
    z-index: -1;
  `,
  base: css`
    z-index: 0;
  `,
  dropdown: css`
    z-index: 1000;
  `,
  sticky: css`
    z-index: 1100;
  `,
  modal: css`
    z-index: 1200;
  `,
  toast: css`
    z-index: 1300;
  `,
  tooltip: css`
    z-index: 1400;
  `,
} as const;

export type ZIndex = keyof typeof Z_INDEX;

export type ZIndexProps = {
  zIndex?: ZIndex;
};

export function getZIndex(zIndex?: ZIndex) {
  if (!zIndex) return "";
  return Z_INDEX[zIndex];
}
