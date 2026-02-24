import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StyleResult,
  getRawValue,
  getResponsiveVarStyles,
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
  if (!props) return { className: "", style: {} };

  const keys: InsetKey[] = ["top", "right", "bottom", "left"];
  const results = keys.map((key) =>
    getResponsiveVarStyles(styles, key, key, resolveInsetValue(key, props), state, getRawValue)
  );

  return {
    className: clsx(...results.map((r) => r.className)),
    style: Object.assign({}, ...results.map((r) => r.style)),
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
