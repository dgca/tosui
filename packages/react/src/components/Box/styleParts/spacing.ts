import { css } from "@linaria/core";

export type SpacingProps = {
  p?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  px?: number;
  py?: number;
  m?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  mx?: number;
  my?: number;
};

function getSpacing(value?: number) {
  return value ? `calc(var(--s)*${value})` : "0";
}

export function getPadding(props: SpacingProps) {
  const top = getSpacing(props.pt ?? props.py ?? props.p);
  const right = getSpacing(props.pr ?? props.px ?? props.p);
  const bottom = getSpacing(props.pb ?? props.py ?? props.p);
  const left = getSpacing(props.pl ?? props.px ?? props.p);
  return `${top} ${right} ${bottom} ${left}`;
}

export function getMargin(props: SpacingProps) {
  const top = getSpacing(props.mt ?? props.my ?? props.m);
  const right = getSpacing(props.mr ?? props.mx ?? props.m);
  const bottom = getSpacing(props.mb ?? props.my ?? props.m);
  const left = getSpacing(props.ml ?? props.mx ?? props.m);
  return `${top} ${right} ${bottom} ${left}`;
}

export const spacingStyles = css`
  --s: var(--tosui-spacing-unit);
`;
