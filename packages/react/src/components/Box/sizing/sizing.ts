import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_SUFFIXES,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
  getRawValue,
} from "../shared";
import styles from "./sizing.module.css";
import clsx from "clsx";

type SizingValue = string | number;
type SizingKey = "w" | "h" | "minW" | "maxW" | "minH" | "maxH";

export type SizingProps = {
  w?: ResponsiveValue<SizingValue>;
  h?: ResponsiveValue<SizingValue>;
  minW?: ResponsiveValue<SizingValue>;
  maxW?: ResponsiveValue<SizingValue>;
  minH?: ResponsiveValue<SizingValue>;
  maxH?: ResponsiveValue<SizingValue>;
};

export type SizingStateProps = {
  _hover?: SizingProps;
  _focus?: SizingProps;
  _active?: SizingProps;
  _disabled?: SizingProps;
};

function getSizingProp(
  key: SizingKey,
  value: ResponsiveValue<SizingValue> | undefined,
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

function getSizingStylesForState(
  props: SizingProps | undefined,
  state: StateKey
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (!props) return result;

  const keys: SizingKey[] = ["w", "h", "minW", "maxW", "minH", "maxH"];
  const results = keys.map((key) => getSizingProp(key, props[key], state));

  return {
    className: clsx(...results.map((r) => r.className)),
    style: Object.assign({}, ...results.map((r) => r.style)),
  };
}

export function getSizingStyles(
  props: SizingProps & SizingStateProps
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getSizingStylesForState(baseProps, "base");
  const hoverStyles = getSizingStylesForState(_hover, "hover");
  const focusStyles = getSizingStylesForState(_focus, "focus");
  const activeStyles = getSizingStylesForState(_active, "active");
  const disabledStyles = getSizingStylesForState(_disabled, "disabled");

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
