import { css } from "@linaria/core";
import { getShorthandValue } from "./utils";

export type SpacingValue = number | string;

export type SpacingProps = {
  p?: SpacingValue;
  pt?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
  m?: SpacingValue;
  mt?: SpacingValue;
  mr?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
};

export function getSpacing(value?: SpacingValue) {
  if (value === undefined) return "0";
  if (typeof value === "string") return value;
  return `calc(var(--s)*${value})`;
}

export function getPadding(props: SpacingProps) {
  const top = getSpacing(props.pt ?? props.py ?? props.p);
  const right = getSpacing(props.pr ?? props.px ?? props.p);
  const bottom = getSpacing(props.pb ?? props.py ?? props.p);
  const left = getSpacing(props.pl ?? props.px ?? props.p);

  return getShorthandValue(top, right, bottom, left);
}

export function getMargin(props: SpacingProps) {
  const top = getSpacing(props.mt ?? props.my ?? props.m);
  const right = getSpacing(props.mr ?? props.mx ?? props.m);
  const bottom = getSpacing(props.mb ?? props.my ?? props.m);
  const left = getSpacing(props.ml ?? props.mx ?? props.m);

  return getShorthandValue(top, right, bottom, left);
}

export const spacingStyles = css`
  --s: var(--tosui-spacing-unit);
`;
