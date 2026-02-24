import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./roundness.module.css";
import clsx from "clsx";

export type RoundedValue = "none" | "sm" | "md" | "lg" | "full";

export type RoundnessProps = {
  rounded?: ResponsiveValue<RoundedValue>;
  roundedTop?: ResponsiveValue<RoundedValue>;
  roundedBottom?: ResponsiveValue<RoundedValue>;
  roundedLeft?: ResponsiveValue<RoundedValue>;
  roundedRight?: ResponsiveValue<RoundedValue>;
  roundedTopLeft?: ResponsiveValue<RoundedValue>;
  roundedTopRight?: ResponsiveValue<RoundedValue>;
  roundedBottomLeft?: ResponsiveValue<RoundedValue>;
  roundedBottomRight?: ResponsiveValue<RoundedValue>;
};

function getRoundnessStylesForState(
  props: RoundnessProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const {
    rounded,
    roundedTop,
    roundedBottom,
    roundedLeft,
    roundedRight,
    roundedTopLeft,
    roundedTopRight,
    roundedBottomLeft,
    roundedBottomRight,
  } = props;

  // Cascading specificity: individual corner > side > all
  const topLeft = roundedTopLeft ?? roundedTop ?? roundedLeft ?? rounded;
  const topRight = roundedTopRight ?? roundedTop ?? roundedRight ?? rounded;
  const bottomRight = roundedBottomRight ?? roundedBottom ?? roundedRight ?? rounded;
  const bottomLeft = roundedBottomLeft ?? roundedBottom ?? roundedLeft ?? rounded;

  const tlResult = getEnumResponsiveStyles(styles, "rounded-tl", topLeft, state);
  const trResult = getEnumResponsiveStyles(styles, "rounded-tr", topRight, state);
  const brResult = getEnumResponsiveStyles(styles, "rounded-br", bottomRight, state);
  const blResult = getEnumResponsiveStyles(styles, "rounded-bl", bottomLeft, state);

  return {
    className: clsx(
      tlResult.className,
      trResult.className,
      brResult.className,
      blResult.className
    ),
    style: {},
  };
}

export function getRoundnessStyles(
  props: RoundnessProps & StateProps<RoundnessProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getRoundnessStylesForState(baseProps, "base");
  const hoverStyles = getRoundnessStylesForState(_hover, "hover");
  const focusStyles = getRoundnessStylesForState(_focus, "focus");
  const activeStyles = getRoundnessStylesForState(_active, "active");
  const disabledStyles = getRoundnessStylesForState(_disabled, "disabled");

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
