import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StyleResult,
  getRawValue,
  getResponsiveVarStyles,
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

function getSizingStylesForState(
  props: SizingProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const keys: SizingKey[] = ["w", "h", "minW", "maxW", "minH", "maxH"];
  const results = keys.map((key) =>
    getResponsiveVarStyles(styles, key, key, props[key], state, getRawValue)
  );

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
