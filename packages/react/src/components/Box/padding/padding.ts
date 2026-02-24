import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StyleResult,
  getRawValue,
  getResponsiveVarStyles,
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
  if (!props) return { className: "", style: {} };

  const keys: PaddingKey[] = ["pt", "pr", "pb", "pl"];
  const results = keys.map((key) =>
    getResponsiveVarStyles(styles, key, key, resolvePaddingValue(key, props), state, getRawValue)
  );

  return {
    className: clsx(...results.map((r) => r.className)),
    style: Object.assign({}, ...results.map((r) => r.style)),
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
