import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./position.module.css";
import clsx from "clsx";

export type PositionValue = "static" | "relative" | "absolute" | "fixed" | "sticky";

export type PositionProps = {
  position?: ResponsiveValue<PositionValue>;
};

export type PositionStateProps = {
  _hover?: PositionProps;
  _focus?: PositionProps;
  _active?: PositionProps;
  _disabled?: PositionProps;
};

function getPositionClass(
  value: PositionValue,
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

function getPositionStylesForValue(
  value: ResponsiveValue<PositionValue> | undefined,
  state: StateKey
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (value === undefined) return result;

  if (typeof value === "string") {
    const className = getPositionClass(value, "base", state);
    if (className) {
      result.className = className;
    }
    return result;
  }

  for (const responsiveKey of RESPONSIVE_KEYS) {
    const positionValue = value[responsiveKey];
    if (positionValue === undefined) continue;

    const className = getPositionClass(positionValue, responsiveKey, state);
    if (className) {
      result.className = clsx(result.className, className);
    }
  }

  return result;
}

export function getPositionStyles(
  props: PositionProps & PositionStateProps
): StyleResult {
  const { position, _hover, _focus, _active, _disabled } = props;

  const baseStyles = getPositionStylesForValue(position, "base");
  const hoverStyles = getPositionStylesForValue(_hover?.position, "hover");
  const focusStyles = getPositionStylesForValue(_focus?.position, "focus");
  const activeStyles = getPositionStylesForValue(_active?.position, "active");
  const disabledStyles = getPositionStylesForValue(_disabled?.position, "disabled");

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
