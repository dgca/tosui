import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StyleResult,
  getRawValue,
  getResponsiveVarStyles,
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
  if (!props) return { className: "", style: {} };

  const keys: MarginKey[] = ["mt", "mr", "mb", "ml"];
  const results = keys.map((key) =>
    getResponsiveVarStyles(styles, key, key, resolveMarginValue(key, props), state, getRawValue)
  );

  return {
    className: clsx(...results.map((r) => r.className)),
    style: Object.assign({}, ...results.map((r) => r.style)),
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
