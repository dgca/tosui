import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./position.module.css";
import clsx from "clsx";

export type PositionValue = "static" | "relative" | "absolute" | "fixed" | "sticky";

export type PositionProps = {
  position?: ResponsiveValue<PositionValue>;
};

function getPositionStylesForState(
  props: PositionProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  return getEnumResponsiveStyles(styles, "", props.position, state);
}

export function getPositionStyles(
  props: PositionProps & StateProps<PositionProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getPositionStylesForState(baseProps, "base");
  const hoverStyles = getPositionStylesForState(_hover, "hover");
  const focusStyles = getPositionStylesForState(_focus, "focus");
  const activeStyles = getPositionStylesForState(_active, "active");
  const disabledStyles = getPositionStylesForState(_disabled, "disabled");

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
