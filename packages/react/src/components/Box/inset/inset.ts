import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_SUFFIXES,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
  getRawValue,
} from "../shared";
import styles from "./inset.module.css";
import clsx from "clsx";

type InsetValue = string | number;
type InsetKey = "top" | "right" | "bottom" | "left";
type InsetShorthandKey = "inset" | "insetX" | "insetY";

export type InsetProps = {
  inset?: ResponsiveValue<InsetValue>;
  insetX?: ResponsiveValue<InsetValue>;
  insetY?: ResponsiveValue<InsetValue>;
  top?: ResponsiveValue<InsetValue>;
  right?: ResponsiveValue<InsetValue>;
  bottom?: ResponsiveValue<InsetValue>;
  left?: ResponsiveValue<InsetValue>;
};

export type InsetStateProps = {
  _hover?: InsetProps;
  _focus?: InsetProps;
  _active?: InsetProps;
  _disabled?: InsetProps;
};

function getInsetProp(
  key: InsetKey,
  value: ResponsiveValue<InsetValue> | undefined,
  state: StateKey = "base"
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (value === undefined) return result;

  const stateSuffix = STATE_SUFFIXES[state];
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];

  if (typeof value !== "object") {
    const rawValue = getRawValue(value);
    if (rawValue !== undefined) {
      const className = stateClassSuffix
        ? styles[`${key}${stateClassSuffix}`]
        : styles[key];
      result.className = className || "";
      result.style[`--t-${key}${stateSuffix}`] = rawValue;
    }
    return result;
  }

  for (const responsiveKey of RESPONSIVE_KEYS) {
    const rawValue = getRawValue(value[responsiveKey]);
    if (rawValue === undefined) continue;

    let className: string | undefined;
    let varName: string;

    if (responsiveKey === "base") {
      className = stateClassSuffix
        ? styles[`${key}${stateClassSuffix}`]
        : styles[key];
      varName = `--t-${key}${stateSuffix}`;
    } else {
      className = stateClassSuffix
        ? styles[`${key}_${responsiveKey}${stateClassSuffix}`]
        : styles[`${key}_${responsiveKey}`];
      varName = `--t-${key}_${responsiveKey}${stateSuffix}`;
    }

    if (className) {
      result.className = clsx(result.className, className);
    }
    result.style[varName] = rawValue;
  }

  return result;
}

function resolveInsetValue(
  key: InsetKey,
  props: InsetProps
): ResponsiveValue<InsetValue> | undefined {
  const shorthandMap: Record<InsetKey, InsetShorthandKey> = {
    top: "insetY",
    bottom: "insetY",
    right: "insetX",
    left: "insetX",
  };
  return props[key] ?? props[shorthandMap[key]] ?? props.inset;
}

function getInsetStylesForState(
  props: InsetProps | undefined,
  state: StateKey
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (!props) return result;

  const insetTop = getInsetProp("top", resolveInsetValue("top", props), state);
  const insetRight = getInsetProp("right", resolveInsetValue("right", props), state);
  const insetBottom = getInsetProp("bottom", resolveInsetValue("bottom", props), state);
  const insetLeft = getInsetProp("left", resolveInsetValue("left", props), state);

  return {
    className: clsx(
      insetTop.className,
      insetRight.className,
      insetBottom.className,
      insetLeft.className
    ),
    style: {
      ...insetTop.style,
      ...insetRight.style,
      ...insetBottom.style,
      ...insetLeft.style,
    },
  };
}

export function getInsetStyles(
  props: InsetProps & InsetStateProps
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getInsetStylesForState(baseProps, "base");
  const hoverStyles = getInsetStylesForState(_hover, "hover");
  const focusStyles = getInsetStylesForState(_focus, "focus");
  const activeStyles = getInsetStylesForState(_active, "active");
  const disabledStyles = getInsetStylesForState(_disabled, "disabled");

  return {
    className: clsx(
      baseStyles.className,
      hoverStyles.className,
      focusStyles.className,
      activeStyles.className,
      disabledStyles.className
    ),
    style: {
      ...baseStyles.style,
      ...hoverStyles.style,
      ...focusStyles.style,
      ...activeStyles.style,
      ...disabledStyles.style,
    },
  };
}
