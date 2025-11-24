import { css } from "@linaria/core";

const TEXT_ALIGN = {
  left: css`
    text-align: left;
  `,
  center: css`
    text-align: center;
  `,
  right: css`
    text-align: right;
  `,
  justify: css`
    text-align: justify;
  `,
} as const;

export type TextAlign = keyof typeof TEXT_ALIGN;

export type TextAlignProps = {
  textAlign?: TextAlign;
};

export function getTextAlign(textAlign?: TextAlign) {
  if (!textAlign) return "";
  return TEXT_ALIGN[textAlign];
}
