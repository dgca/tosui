import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./zIndex.module.css";
import clsx from "clsx";

export type ZIndexValue = "base" | "behind" | "dropdown" | "sticky" | "modal" | "toast" | "tooltip";

export type ZIndexProps = {
  zIndex?: ResponsiveValue<ZIndexValue>;
};

function getZIndexStylesForState(
  props: ZIndexProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  return getEnumResponsiveStyles(styles, "", props.zIndex, state);
}

export function getZIndexStyles(
  props: ZIndexProps & StateProps<ZIndexProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getZIndexStylesForState(baseProps, "base");
  const hoverStyles = getZIndexStylesForState(_hover, "hover");
  const focusStyles = getZIndexStylesForState(_focus, "focus");
  const activeStyles = getZIndexStylesForState(_active, "active");
  const disabledStyles = getZIndexStylesForState(_disabled, "disabled");

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
