import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./shadows.module.css";
import clsx from "clsx";

export type ShadowValue = "none" | "sm" | "md" | "lg";

export type ShadowProps = {
  shadow?: ResponsiveValue<ShadowValue>;
};

export type ShadowStateProps = {
  _hover?: ShadowProps;
  _focus?: ShadowProps;
  _active?: ShadowProps;
  _disabled?: ShadowProps;
};

function getShadowClass(
  value: ShadowValue,
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

function getShadowStylesForValue(
  value: ResponsiveValue<ShadowValue> | undefined,
  state: StateKey
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (value === undefined) return result;

  if (typeof value === "string") {
    const className = getShadowClass(value, "base", state);
    if (className) {
      result.className = className;
    }
    return result;
  }

  for (const responsiveKey of RESPONSIVE_KEYS) {
    const shadowValue = value[responsiveKey];
    if (shadowValue === undefined) continue;

    const className = getShadowClass(shadowValue, responsiveKey, state);
    if (className) {
      result.className = clsx(result.className, className);
    }
  }

  return result;
}

export function getShadowStyles(
  props: ShadowProps & ShadowStateProps
): StyleResult {
  const { shadow, _hover, _focus, _active, _disabled } = props;

  const baseStyles = getShadowStylesForValue(shadow, "base");
  const hoverStyles = getShadowStylesForValue(_hover?.shadow, "hover");
  const focusStyles = getShadowStylesForValue(_focus?.shadow, "focus");
  const activeStyles = getShadowStylesForValue(_active?.shadow, "active");
  const disabledStyles = getShadowStylesForValue(_disabled?.shadow, "disabled");

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
