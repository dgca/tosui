import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_SUFFIXES,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
  getRawValue,
} from "../shared";
import styles from "./padding.module.css";
import clsx from "clsx";

type SpacingValue = string | number;
type PaddingKey = "pt" | "pr" | "pb" | "pl";
type PaddingShorthandKey = "p" | "px" | "py";

export type PaddingProps = {
  p?: ResponsiveValue<SpacingValue>;
  pt?: ResponsiveValue<SpacingValue>;
  pr?: ResponsiveValue<SpacingValue>;
  pb?: ResponsiveValue<SpacingValue>;
  pl?: ResponsiveValue<SpacingValue>;
  px?: ResponsiveValue<SpacingValue>;
  py?: ResponsiveValue<SpacingValue>;
};

export type PaddingStateProps = {
  _hover?: PaddingProps;
  _focus?: PaddingProps;
  _active?: PaddingProps;
  _disabled?: PaddingProps;
};

function getSpacingProps(
  key: PaddingKey,
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

function resolvePaddingValue(
  key: PaddingKey,
  props: PaddingProps
): ResponsiveValue<SpacingValue> | undefined {
  const shorthandMap: Record<PaddingKey, PaddingShorthandKey> = {
    pt: "py",
    pb: "py",
    pr: "px",
    pl: "px",
  };
  return props[key] ?? props[shorthandMap[key]] ?? props.p;
}

function getPaddingStylesForState(
  props: PaddingProps | undefined,
  state: StateKey
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (!props) return result;

  const paddingTop = getSpacingProps("pt", resolvePaddingValue("pt", props), state);
  const paddingRight = getSpacingProps("pr", resolvePaddingValue("pr", props), state);
  const paddingBottom = getSpacingProps("pb", resolvePaddingValue("pb", props), state);
  const paddingLeft = getSpacingProps("pl", resolvePaddingValue("pl", props), state);

  return {
    className: clsx(
      paddingTop.className,
      paddingRight.className,
      paddingBottom.className,
      paddingLeft.className
    ),
    style: {
      ...paddingTop.style,
      ...paddingRight.style,
      ...paddingBottom.style,
      ...paddingLeft.style,
    },
  };
}

export function getPaddingStyles(
  props: PaddingProps & PaddingStateProps
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getPaddingStylesForState(baseProps, "base");
  const hoverStyles = getPaddingStylesForState(_hover, "hover");
  const focusStyles = getPaddingStylesForState(_focus, "focus");
  const activeStyles = getPaddingStylesForState(_active, "active");
  const disabledStyles = getPaddingStylesForState(_disabled, "disabled");

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
