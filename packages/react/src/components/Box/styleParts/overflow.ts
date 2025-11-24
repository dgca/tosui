import { css } from "@linaria/core";

const OVERFLOW = {
  visible: css`
    overflow: visible;
  `,
  hidden: css`
    overflow: hidden;
  `,
  scroll: css`
    overflow: scroll;
  `,
  auto: css`
    overflow: auto;
  `,
  clip: css`
    overflow: clip;
  `,
} as const;

const OVERFLOW_X = {
  visible: css`
    overflow-x: visible;
  `,
  hidden: css`
    overflow-x: hidden;
  `,
  scroll: css`
    overflow-x: scroll;
  `,
  auto: css`
    overflow-x: auto;
  `,
  clip: css`
    overflow-x: clip;
  `,
} as const;

const OVERFLOW_Y = {
  visible: css`
    overflow-y: visible;
  `,
  hidden: css`
    overflow-y: hidden;
  `,
  scroll: css`
    overflow-y: scroll;
  `,
  auto: css`
    overflow-y: auto;
  `,
  clip: css`
    overflow-y: clip;
  `,
} as const;

export type Overflow = keyof typeof OVERFLOW;
export type OverflowX = keyof typeof OVERFLOW_X;
export type OverflowY = keyof typeof OVERFLOW_Y;

export type OverflowProps = {
  overflow?: Overflow;
  overflowX?: OverflowX;
  overflowY?: OverflowY;
};

export function getOverflow(props: OverflowProps) {
  const { overflow, overflowX, overflowY } = props;

  return [
    overflow ? OVERFLOW[overflow] : "",
    overflowX ? OVERFLOW_X[overflowX] : "",
    overflowY ? OVERFLOW_Y[overflowY] : "",
  ];
}
