import { type SpacingValue } from "./spacing";

export type SizeProps = {
  w?: SpacingValue;
  h?: SpacingValue;
  minW?: SpacingValue;
  maxW?: SpacingValue;
  minH?: SpacingValue;
  maxH?: SpacingValue;
};

function getSizeValue(value?: SpacingValue) {
  if (value === undefined) return "auto";
  if (typeof value === "string") return value;
  return `calc(var(--s)*${value})`;
}

export function getWidth(w?: SpacingValue) {
  return getSizeValue(w);
}

export function getHeight(h?: SpacingValue) {
  return getSizeValue(h);
}

export function getMinWidth(minW?: SpacingValue) {
  return getSizeValue(minW);
}

export function getMaxWidth(maxW?: SpacingValue) {
  return getSizeValue(maxW);
}

export function getMinHeight(minH?: SpacingValue) {
  return getSizeValue(minH);
}

export function getMaxHeight(maxH?: SpacingValue) {
  return getSizeValue(maxH);
}
