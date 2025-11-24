import { css } from "@linaria/core";

const FONT_SIZES = {
  xs: css`
    font-size: var(--tosui-font-size-xs);
  `,
  sm: css`
    font-size: var(--tosui-font-size-sm);
  `,
  md: css`
    font-size: var(--tosui-font-size-md);
  `,
  lg: css`
    font-size: var(--tosui-font-size-lg);
  `,
  xl: css`
    font-size: var(--tosui-font-size-xl);
  `,
  "2xl": css`
    font-size: var(--tosui-font-size-2xl);
  `,
  "3xl": css`
    font-size: var(--tosui-font-size-3xl);
  `,
  "4xl": css`
    font-size: var(--tosui-font-size-4xl);
  `,
  "5xl": css`
    font-size: var(--tosui-font-size-5xl);
  `,
} as const;

const FONT_FAMILIES = {
  heading: css`
    font-family: var(--tosui-font-family-heading);
  `,
  body: css`
    font-family: var(--tosui-font-family-body);
  `,
  mono: css`
    font-family: var(--tosui-font-family-mono);
  `,
} as const;

const FONT_WEIGHTS = {
  normal: css`
    font-weight: var(--tosui-font-weight-normal);
  `,
  medium: css`
    font-weight: var(--tosui-font-weight-medium);
  `,
  semibold: css`
    font-weight: var(--tosui-font-weight-semibold);
  `,
  bold: css`
    font-weight: var(--tosui-font-weight-bold);
  `,
} as const;

const LINE_HEIGHTS = {
  tight: css`
    line-height: var(--tosui-line-height-tight);
  `,
  normal: css`
    line-height: var(--tosui-line-height-normal);
  `,
  relaxed: css`
    line-height: var(--tosui-line-height-relaxed);
  `,
} as const;

type FontSize = keyof typeof FONT_SIZES;

type FontFamily = keyof typeof FONT_FAMILIES;

type FontWeight = keyof typeof FONT_WEIGHTS;

type LineHeight = keyof typeof LINE_HEIGHTS;

export type TypographyProps = {
  fontSize?: FontSize;
  fontFamily?: FontFamily;
  fontWeight?: FontWeight;
  lineHeight?: LineHeight;
};

export function getFontSize(fontSize?: FontSize) {
  return FONT_SIZES[fontSize ?? "md"];
}

export function getFontFamily(fontFamily?: FontFamily) {
  return FONT_FAMILIES[fontFamily ?? "body"];
}

export function getFontWeight(fontWeight?: FontWeight) {
  return FONT_WEIGHTS[fontWeight ?? "normal"];
}

export function getLineHeight(lineHeight?: LineHeight) {
  return LINE_HEIGHTS[lineHeight ?? "normal"];
}
