import { css } from "@linaria/core";
import { type SpacingValue, getSpacing } from "./spacing";
import { getShorthandValue } from "./utils";

const POSITION = {
  static: css`
    position: static;
  `,
  relative: css`
    position: relative;
  `,
  absolute: css`
    position: absolute;
  `,
  fixed: css`
    position: fixed;
  `,
  sticky: css`
    position: sticky;
  `,
} as const;

type Position = keyof typeof POSITION;

export type InsetProps = {
  inset?: SpacingValue;
  insetX?: SpacingValue;
  insetY?: SpacingValue;
  top?: SpacingValue;
  right?: SpacingValue;
  bottom?: SpacingValue;
  left?: SpacingValue;
};

export type PositioningProps = {
  position?: Position;
} & InsetProps;

export function getPosition(position?: Position) {
  if (!position) return "";
  return POSITION[position];
}

export function getInset(props: InsetProps) {
  const top = getSpacing(props.top ?? props.insetY ?? props.inset);
  const right = getSpacing(props.right ?? props.insetX ?? props.inset);
  const bottom = getSpacing(props.bottom ?? props.insetY ?? props.inset);
  const left = getSpacing(props.left ?? props.insetX ?? props.inset);

  return getShorthandValue(top, right, bottom, left);
}
