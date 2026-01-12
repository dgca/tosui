import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_SUFFIXES,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
  getRawValue,
} from "../shared";
import styles from "./margin.module.css";
import clsx from "clsx";

type SpacingValue = string | number;
type MarginKey = "mt" | "mr" | "mb" | "ml";
type MarginShorthandKey = "m" | "mx" | "my";

export type MarginProps = {
  m?: ResponsiveValue<SpacingValue>;
  mt?: ResponsiveValue<SpacingValue>;
  mr?: ResponsiveValue<SpacingValue>;
  mb?: ResponsiveValue<SpacingValue>;
  ml?: ResponsiveValue<SpacingValue>;
  mx?: ResponsiveValue<SpacingValue>;
  my?: ResponsiveValue<SpacingValue>;
};

export type MarginStateProps = {
  _hover?: MarginProps;
  _focus?: MarginProps;
  _active?: MarginProps;
  _disabled?: MarginProps;
};

function getSpacingProps(
  key: MarginKey,
  value: ResponsiveValue<SpacingValue> | undefined,
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

function resolveMarginValue(
  key: MarginKey,
  props: MarginProps
): ResponsiveValue<SpacingValue> | undefined {
  const shorthandMap: Record<MarginKey, MarginShorthandKey> = {
    mt: "my",
    mb: "my",
    mr: "mx",
    ml: "mx",
  };
  return props[key] ?? props[shorthandMap[key]] ?? props.m;
}

function getMarginStylesForState(
  props: MarginProps | undefined,
  state: StateKey
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (!props) return result;

  const marginTop = getSpacingProps("mt", resolveMarginValue("mt", props), state);
  const marginRight = getSpacingProps("mr", resolveMarginValue("mr", props), state);
  const marginBottom = getSpacingProps("mb", resolveMarginValue("mb", props), state);
  const marginLeft = getSpacingProps("ml", resolveMarginValue("ml", props), state);

  return {
    className: clsx(
      marginTop.className,
      marginRight.className,
      marginBottom.className,
      marginLeft.className
    ),
    style: {
      ...marginTop.style,
      ...marginRight.style,
      ...marginBottom.style,
      ...marginLeft.style,
    },
  };
}

export function getMarginStyles(
  props: MarginProps & MarginStateProps
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getMarginStylesForState(baseProps, "base");
  const hoverStyles = getMarginStylesForState(_hover, "hover");
  const focusStyles = getMarginStylesForState(_focus, "focus");
  const activeStyles = getMarginStylesForState(_active, "active");
  const disabledStyles = getMarginStylesForState(_disabled, "disabled");

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
