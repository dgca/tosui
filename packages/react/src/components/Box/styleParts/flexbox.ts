import { css } from "@linaria/core";
import { type SpacingValue, getSpacing } from "./spacing";

const FLEX_DIRECTION = {
  row: css`
    flex-direction: row;
  `,
  "row-reverse": css`
    flex-direction: row-reverse;
  `,
  column: css`
    flex-direction: column;
  `,
  "column-reverse": css`
    flex-direction: column-reverse;
  `,
} as const;

const JUSTIFY_CONTENT = {
  start: css`
    justify-content: start;
  `,
  center: css`
    justify-content: center;
  `,
  end: css`
    justify-content: end;
  `,
  "space-between": css`
    justify-content: space-between;
  `,
  "space-around": css`
    justify-content: space-around;
  `,
  "space-evenly": css`
    justify-content: space-evenly;
  `,
} as const;

const ALIGN_ITEMS = {
  start: css`
    align-items: start;
  `,
  center: css`
    align-items: center;
  `,
  end: css`
    align-items: end;
  `,
  stretch: css`
    align-items: stretch;
  `,
  baseline: css`
    align-items: baseline;
  `,
} as const;

const ALIGN_SELF = {
  auto: css`
    align-self: auto;
  `,
  start: css`
    align-self: start;
  `,
  center: css`
    align-self: center;
  `,
  end: css`
    align-self: end;
  `,
  stretch: css`
    align-self: stretch;
  `,
  baseline: css`
    align-self: baseline;
  `,
} as const;

const FLEX_WRAP = {
  wrap: css`
    flex-wrap: wrap;
  `,
  nowrap: css`
    flex-wrap: nowrap;
  `,
  "wrap-reverse": css`
    flex-wrap: wrap-reverse;
  `,
} as const;

type FlexDirection = keyof typeof FLEX_DIRECTION;
type JustifyContent = keyof typeof JUSTIFY_CONTENT;
type AlignItems = keyof typeof ALIGN_ITEMS;
type AlignSelf = keyof typeof ALIGN_SELF;
type FlexWrap = keyof typeof FLEX_WRAP;

export type FlexboxProps = {
  gap?: SpacingValue;
  gapRow?: SpacingValue;
  gapColumn?: SpacingValue;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  flex?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
};

export function getFlexDirection(flexDirection?: FlexDirection) {
  if (!flexDirection) return "";
  return FLEX_DIRECTION[flexDirection];
}

export function getJustifyContent(justifyContent?: JustifyContent) {
  if (!justifyContent) return "";
  return JUSTIFY_CONTENT[justifyContent];
}

export function getAlignItems(alignItems?: AlignItems) {
  if (!alignItems) return "";
  return ALIGN_ITEMS[alignItems];
}

export function getFlexWrap(flexWrap?: FlexWrap) {
  if (!flexWrap) return "";
  return FLEX_WRAP[flexWrap];
}

export function getAlignSelf(alignSelf?: AlignSelf) {
  if (!alignSelf) return "";
  return ALIGN_SELF[alignSelf];
}

export function getGap(
  props: Pick<FlexboxProps, "gap" | "gapRow" | "gapColumn">
) {
  const row = props.gapRow ?? props.gap;
  const column = props.gapColumn ?? props.gap;
  const rowValue = row !== undefined ? getSpacing(row) : "normal";
  const columnValue = column !== undefined ? getSpacing(column) : "normal";

  if (rowValue === columnValue) return rowValue;

  return `${rowValue} ${columnValue}`;
}

export function getFlex(
  props: Pick<FlexboxProps, "flex" | "flexGrow" | "flexShrink" | "flexBasis">
) {
  // If flex shorthand is provided, use it directly
  if (props.flex !== undefined) {
    return props.flex;
  }

  // If any individual flex properties are provided, construct the shorthand
  if (
    props.flexGrow !== undefined ||
    props.flexShrink !== undefined ||
    props.flexBasis !== undefined
  ) {
    const grow = props.flexGrow ?? 0;
    const shrink = props.flexShrink ?? 1;
    const basis = props.flexBasis ?? "auto";
    return `${grow} ${shrink} ${basis}`;
  }

  // Default: no flex property
  return "0 1 auto";
}
