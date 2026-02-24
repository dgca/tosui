import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./opacity.module.css";
import clsx from "clsx";

export type OpacityValue = "invisible" | "faint" | "semi" | "full";

export type OpacityProps = {
  opacity?: ResponsiveValue<OpacityValue>;
};

function getOpacityStylesForState(
  props: OpacityProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  return getEnumResponsiveStyles(styles, "", props.opacity, state);
}

export function getOpacityStyles(
  props: OpacityProps & StateProps<OpacityProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getOpacityStylesForState(baseProps, "base");
  const hoverStyles = getOpacityStylesForState(_hover, "hover");
  const focusStyles = getOpacityStylesForState(_focus, "focus");
  const activeStyles = getOpacityStylesForState(_active, "active");
  const disabledStyles = getOpacityStylesForState(_disabled, "disabled");

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
