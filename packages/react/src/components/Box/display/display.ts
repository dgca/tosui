import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./display.module.css";
import clsx from "clsx";

export type DisplayValue =
  | "block"
  | "flex"
  | "inline-flex"
  | "grid"
  | "inline"
  | "inline-block"
  | "none"
  | "contents";

export type DisplayProps = {
  display?: ResponsiveValue<DisplayValue>;
};

function getDisplayStylesForState(
  props: DisplayProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  return getEnumResponsiveStyles(styles, "", props.display, state);
}

export function getDisplayStyles(
  props: DisplayProps & StateProps<DisplayProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getDisplayStylesForState(baseProps, "base");
  const hoverStyles = getDisplayStylesForState(_hover, "hover");
  const focusStyles = getDisplayStylesForState(_focus, "focus");
  const activeStyles = getDisplayStylesForState(_active, "active");
  const disabledStyles = getDisplayStylesForState(_disabled, "disabled");

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
