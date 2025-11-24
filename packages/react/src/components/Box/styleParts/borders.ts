import { css } from "@linaria/core";

// Border widths for top edge
const BORDER_TOP_WIDTH = {
  none: css`
    border-top-width: var(--tosui-border-width-none);
  `,
  thin: css`
    border-top-width: var(--tosui-border-width-thin);
  `,
  medium: css`
    border-top-width: var(--tosui-border-width-medium);
  `,
  thick: css`
    border-top-width: var(--tosui-border-width-thick);
  `,
} as const;

// Border widths for right edge
const BORDER_RIGHT_WIDTH = {
  none: css`
    border-right-width: var(--tosui-border-width-none);
  `,
  thin: css`
    border-right-width: var(--tosui-border-width-thin);
  `,
  medium: css`
    border-right-width: var(--tosui-border-width-medium);
  `,
  thick: css`
    border-right-width: var(--tosui-border-width-thick);
  `,
} as const;

// Border widths for bottom edge
const BORDER_BOTTOM_WIDTH = {
  none: css`
    border-bottom-width: var(--tosui-border-width-none);
  `,
  thin: css`
    border-bottom-width: var(--tosui-border-width-thin);
  `,
  medium: css`
    border-bottom-width: var(--tosui-border-width-medium);
  `,
  thick: css`
    border-bottom-width: var(--tosui-border-width-thick);
  `,
} as const;

// Border widths for left edge
const BORDER_LEFT_WIDTH = {
  none: css`
    border-left-width: var(--tosui-border-width-none);
  `,
  thin: css`
    border-left-width: var(--tosui-border-width-thin);
  `,
  medium: css`
    border-left-width: var(--tosui-border-width-medium);
  `,
  thick: css`
    border-left-width: var(--tosui-border-width-thick);
  `,
} as const;

// Border styles
const BORDER_STYLES = {
  solid: css`
    border-style: solid;
  `,
  dashed: css`
    border-style: dashed;
  `,
  dotted: css`
    border-style: dotted;
  `,
  none: css`
    border-style: none;
  `,
} as const;

type BorderWidth = keyof typeof BORDER_TOP_WIDTH;
type BorderStyle = keyof typeof BORDER_STYLES;

export type BorderProps = {
  border?: BorderWidth;
  borderX?: BorderWidth;
  borderY?: BorderWidth;
  borderTop?: BorderWidth;
  borderRight?: BorderWidth;
  borderBottom?: BorderWidth;
  borderLeft?: BorderWidth;
  borderStyle?: BorderStyle;
};

function getBorderTopWidth(props: BorderProps) {
  const value = props.borderTop ?? props.borderY ?? props.border ?? "none";
  return BORDER_TOP_WIDTH[value];
}

function getBorderRightWidth(props: BorderProps) {
  const value = props.borderRight ?? props.borderX ?? props.border ?? "none";
  return BORDER_RIGHT_WIDTH[value];
}

function getBorderBottomWidth(props: BorderProps) {
  const value = props.borderBottom ?? props.borderY ?? props.border ?? "none";
  return BORDER_BOTTOM_WIDTH[value];
}

function getBorderLeftWidth(props: BorderProps) {
  const value = props.borderLeft ?? props.borderX ?? props.border ?? "none";
  return BORDER_LEFT_WIDTH[value];
}

export function getBorderStyle(borderStyle?: BorderStyle) {
  return BORDER_STYLES[borderStyle ?? "solid"];
}

export function getBorderWidths(props: BorderProps) {
  return [
    getBorderTopWidth(props),
    getBorderRightWidth(props),
    getBorderBottomWidth(props),
    getBorderLeftWidth(props),
  ];
}
