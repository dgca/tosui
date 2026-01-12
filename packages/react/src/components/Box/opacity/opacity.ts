import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./opacity.module.css";
import clsx from "clsx";

export type OpacityValue = "invisible" | "faint" | "semi" | "full";

export type OpacityProps = {
  opacity?: ResponsiveValue<OpacityValue>;
};

export type OpacityStateProps = {
  _hover?: OpacityProps;
  _focus?: OpacityProps;
  _active?: OpacityProps;
  _disabled?: OpacityProps;
};

function getOpacityClass(
  value: OpacityValue,
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

function getOpacityStylesForValue(
  value: ResponsiveValue<OpacityValue> | undefined,
  state: StateKey
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (value === undefined) return result;

  if (typeof value === "string") {
    const className = getOpacityClass(value, "base", state);
    if (className) {
      result.className = className;
    }
    return result;
  }

  for (const responsiveKey of RESPONSIVE_KEYS) {
    const opacityValue = value[responsiveKey];
    if (opacityValue === undefined) continue;

    const className = getOpacityClass(opacityValue, responsiveKey, state);
    if (className) {
      result.className = clsx(result.className, className);
    }
  }

  return result;
}

export function getOpacityStyles(
  props: OpacityProps & OpacityStateProps
): StyleResult {
  const { opacity, _hover, _focus, _active, _disabled } = props;

  const baseStyles = getOpacityStylesForValue(opacity, "base");
  const hoverStyles = getOpacityStylesForValue(_hover?.opacity, "hover");
  const focusStyles = getOpacityStylesForValue(_focus?.opacity, "focus");
  const activeStyles = getOpacityStylesForValue(_active?.opacity, "active");
  const disabledStyles = getOpacityStylesForValue(_disabled?.opacity, "disabled");

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
