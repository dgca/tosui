import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./shadows.module.css";
import clsx from "clsx";

export type ShadowValue = "none" | "sm" | "md" | "lg";

export type ShadowProps = {
  shadow?: ResponsiveValue<ShadowValue>;
};

function getShadowStylesForState(
  props: ShadowProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  return getEnumResponsiveStyles(styles, "", props.shadow, state);
}

export function getShadowStyles(
  props: ShadowProps & StateProps<ShadowProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getShadowStylesForState(baseProps, "base");
  const hoverStyles = getShadowStylesForState(_hover, "hover");
  const focusStyles = getShadowStylesForState(_focus, "focus");
  const activeStyles = getShadowStylesForState(_active, "active");
  const disabledStyles = getShadowStylesForState(_disabled, "disabled");

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
