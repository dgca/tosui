import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./colors.module.css";
import clsx from "clsx";

export type ColorValue =
  | "accent-emphasis"
  | "accent"
  | "error-emphasis"
  | "error"
  | "foreground-inverted-muted"
  | "foreground-inverted-subtle"
  | "foreground-inverted"
  | "foreground-muted"
  | "foreground-subtle"
  | "foreground"
  | "info-emphasis"
  | "info"
  | "primary-emphasis"
  | "primary"
  | "success-emphasis"
  | "success"
  | "warning-emphasis"
  | "warning";

export type BackgroundColorValue =
  | "accent-default"
  | "accent-emphasis"
  | "accent-subtle"
  | "background"
  | "error-default"
  | "error-emphasis"
  | "error-subtle"
  | "foreground"
  | "info-default"
  | "info-emphasis"
  | "info-subtle"
  | "primary-default"
  | "primary-emphasis"
  | "primary-subtle"
  | "success-default"
  | "success-emphasis"
  | "success-subtle"
  | "surface"
  | "transparent"
  | "warning-default"
  | "warning-emphasis"
  | "warning-subtle";

export type BorderColorValue =
  | "accent-emphasis"
  | "accent"
  | "border-muted"
  | "border"
  | "error-emphasis"
  | "error"
  | "info-emphasis"
  | "info"
  | "primary-emphasis"
  | "primary"
  | "success-emphasis"
  | "success"
  | "warning-emphasis"
  | "warning";

export type ColorProps = {
  color?: ResponsiveValue<ColorValue>;
  bg?: ResponsiveValue<BackgroundColorValue>;
  borderColor?: ResponsiveValue<BorderColorValue>;
};

function getColorStylesForState(
  props: ColorProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const colorResult = getEnumResponsiveStyles(styles, "color", props.color, state);
  const bgResult = getEnumResponsiveStyles(styles, "bg", props.bg, state);
  const borderColorResult = getEnumResponsiveStyles(styles, "border-color", props.borderColor, state);

  return {
    className: clsx(colorResult.className, bgResult.className, borderColorResult.className),
    style: {},
  };
}

export function getColorStyles(
  props: ColorProps & StateProps<ColorProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getColorStylesForState(baseProps, "base");
  const hoverStyles = getColorStylesForState(_hover, "hover");
  const focusStyles = getColorStylesForState(_focus, "focus");
  const activeStyles = getColorStylesForState(_active, "active");
  const disabledStyles = getColorStylesForState(_disabled, "disabled");

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
