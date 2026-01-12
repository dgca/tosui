import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./zIndex.module.css";
import clsx from "clsx";

export type ZIndexValue = "base" | "behind" | "dropdown" | "sticky" | "modal" | "toast" | "tooltip";

export type ZIndexProps = {
  zIndex?: ResponsiveValue<ZIndexValue>;
};

export type ZIndexStateProps = {
  _hover?: ZIndexProps;
  _focus?: ZIndexProps;
  _active?: ZIndexProps;
  _disabled?: ZIndexProps;
};

function getZIndexClass(
  value: ZIndexValue,
  responsiveKey: (typeof RESPONSIVE_KEYS)[number],
  state: StateKey
): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];

  if (responsiveKey === "base") {
    return stateClassSuffix
      ? styles[`${value}${stateClassSuffix}`]
      : styles[value];
  }

  return stateClassSuffix
    ? styles[`${value}_${responsiveKey}${stateClassSuffix}`]
    : styles[`${value}_${responsiveKey}`];
}

function getZIndexStylesForValue(
  value: ResponsiveValue<ZIndexValue> | undefined,
  state: StateKey
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (value === undefined) return result;

  if (typeof value === "string") {
    const className = getZIndexClass(value, "base", state);
    if (className) {
      result.className = className;
    }
    return result;
  }

  for (const responsiveKey of RESPONSIVE_KEYS) {
    const zIndexValue = value[responsiveKey];
    if (zIndexValue === undefined) continue;

    const className = getZIndexClass(zIndexValue, responsiveKey, state);
    if (className) {
      result.className = clsx(result.className, className);
    }
  }

  return result;
}

export function getZIndexStyles(
  props: ZIndexProps & ZIndexStateProps
): StyleResult {
  const { zIndex, _hover, _focus, _active, _disabled } = props;

  const baseStyles = getZIndexStylesForValue(zIndex, "base");
  const hoverStyles = getZIndexStylesForValue(_hover?.zIndex, "hover");
  const focusStyles = getZIndexStylesForValue(_focus?.zIndex, "focus");
  const activeStyles = getZIndexStylesForValue(_active?.zIndex, "active");
  const disabledStyles = getZIndexStylesForValue(_disabled?.zIndex, "disabled");

  return {
    className: clsx(
      baseStyles.className,
      hoverStyles.className,
      focusStyles.className,
      activeStyles.className,
      disabledStyles.className
    ),
    style: {},
  };
}
