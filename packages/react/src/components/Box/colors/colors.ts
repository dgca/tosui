import {
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./colors.module.css";
import clsx from "clsx";

export type ColorValue =
  | "accent-emphasis"
  | "accent"
  | "error-emphasis"
  | "error"
  | "foreground-inverted-muted"
  | "foreground-inverted-subtle"
  | "foreground-inverted"
  | "foreground-muted"
  | "foreground-subtle"
  | "foreground"
  | "info-emphasis"
  | "info"
  | "primary-emphasis"
  | "primary"
  | "success-emphasis"
  | "success"
  | "warning-emphasis"
  | "warning";

export type BackgroundColorValue =
  | "accent-default"
  | "accent-emphasis"
  | "accent-subtle"
  | "background"
  | "error-default"
  | "error-emphasis"
  | "error-subtle"
  | "foreground"
  | "info-default"
  | "info-emphasis"
  | "info-subtle"
  | "primary-default"
  | "primary-emphasis"
  | "primary-subtle"
  | "success-default"
  | "success-emphasis"
  | "success-subtle"
  | "surface"
  | "transparent"
  | "warning-default"
  | "warning-emphasis"
  | "warning-subtle";

export type BorderColorValue =
  | "accent-emphasis"
  | "accent"
  | "border-muted"
  | "border"
  | "error-emphasis"
  | "error"
  | "info-emphasis"
  | "info"
  | "primary-emphasis"
  | "primary"
  | "success-emphasis"
  | "success"
  | "warning-emphasis"
  | "warning";

export type ColorProps = {
  color?: ColorValue;
  bg?: BackgroundColorValue;
  borderColor?: BorderColorValue;
};

export type ColorStateProps = {
  _hover?: ColorProps;
};

function getColorClass(value: ColorValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`color-${value}${stateClassSuffix}`]
    : styles[`color-${value}`];
}

function getBgClass(value: BackgroundColorValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`bg-${value}${stateClassSuffix}`]
    : styles[`bg-${value}`];
}

function getBorderColorClass(value: BorderColorValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`border-color-${value}${stateClassSuffix}`]
    : styles[`border-color-${value}`];
}

function getColorStylesForState(
  props: ColorProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const classes: string[] = [];

  if (props.color) {
    const cls = getColorClass(props.color, state);
    if (cls) classes.push(cls);
  }

  if (props.bg) {
    const cls = getBgClass(props.bg, state);
    if (cls) classes.push(cls);
  }

  if (props.borderColor) {
    const cls = getBorderColorClass(props.borderColor, state);
    if (cls) classes.push(cls);
  }

  return { className: clsx(...classes), style: {} };
}

export function getColorStyles(
  props: ColorProps & ColorStateProps
): StyleResult {
  const { color, bg, borderColor, _hover } = props;

  const baseStyles = getColorStylesForState({ color, bg, borderColor }, "base");
  const hoverStyles = getColorStylesForState(_hover, "hover");

  return {
    className: clsx(baseStyles.className, hoverStyles.className),
    style: {},
  };
}
