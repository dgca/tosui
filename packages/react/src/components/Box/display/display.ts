import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./display.module.css";
import clsx from "clsx";

export type DisplayValue =
  | "block"
  | "flex"
  | "inline-flex"
  | "grid"
  | "inline"
  | "inline-block"
  | "none"
  | "contents";

export type DisplayProps = {
  display?: ResponsiveValue<DisplayValue>;
};

export type DisplayStateProps = {
  _hover?: DisplayProps;
  _focus?: DisplayProps;
  _active?: DisplayProps;
  _disabled?: DisplayProps;
};

function getDisplayClass(
  value: DisplayValue,
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

function getDisplayStylesForValue(
  value: ResponsiveValue<DisplayValue> | undefined,
  state: StateKey
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (value === undefined) return result;

  // Simple value (non-responsive)
  if (typeof value === "string") {
    const className = getDisplayClass(value, "base", state);
    if (className) {
      result.className = className;
    }
    return result;
  }

  // Responsive value
  for (const responsiveKey of RESPONSIVE_KEYS) {
    const displayValue = value[responsiveKey];
    if (displayValue === undefined) continue;

    const className = getDisplayClass(displayValue, responsiveKey, state);
    if (className) {
      result.className = clsx(result.className, className);
    }
  }

  return result;
}

export function getDisplayStyles(
  props: DisplayProps & DisplayStateProps
): StyleResult {
  const { display, _hover, _focus, _active, _disabled } = props;

  const baseStyles = getDisplayStylesForValue(display, "base");
  const hoverStyles = getDisplayStylesForValue(_hover?.display, "hover");
  const focusStyles = getDisplayStylesForValue(_focus?.display, "focus");
  const activeStyles = getDisplayStylesForValue(_active?.display, "active");
  const disabledStyles = getDisplayStylesForValue(_disabled?.display, "disabled");

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
