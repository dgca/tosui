import { css } from "@linaria/core";

const WHITE_SPACE = {
  normal: css`
    white-space: normal;
  `,
  nowrap: css`
    white-space: nowrap;
  `,
  pre: css`
    white-space: pre;
  `,
  preWrap: css`
    white-space: pre-wrap;
  `,
  preLine: css`
    white-space: pre-line;
  `,
} as const;

export type WhiteSpace = keyof typeof WHITE_SPACE;

export type WhiteSpaceProps = {
  whiteSpace?: WhiteSpace;
};

export function getWhiteSpace(whiteSpace?: WhiteSpace) {
  if (!whiteSpace) return "";
  return WHITE_SPACE[whiteSpace];
}
