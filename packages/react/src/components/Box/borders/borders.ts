import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./borders.module.css";
import clsx from "clsx";

export type BorderWidthValue = "none" | "thin" | "medium" | "thick";
export type BorderStyleValue = "none" | "solid" | "dashed" | "dotted";

export type BorderProps = {
  border?: ResponsiveValue<BorderWidthValue>;
  borderX?: ResponsiveValue<BorderWidthValue>;
  borderY?: ResponsiveValue<BorderWidthValue>;
  borderTop?: ResponsiveValue<BorderWidthValue>;
  borderRight?: ResponsiveValue<BorderWidthValue>;
  borderBottom?: ResponsiveValue<BorderWidthValue>;
  borderLeft?: ResponsiveValue<BorderWidthValue>;
  borderStyle?: ResponsiveValue<BorderStyleValue>;
};

function getBorderStylesForState(
  props: BorderProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const {
    border,
    borderX,
    borderY,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderStyle,
  } = props;

  // Cascading specificity: individual > axis > all
  const topWidth = borderTop ?? borderY ?? border;
  const rightWidth = borderRight ?? borderX ?? border;
  const bottomWidth = borderBottom ?? borderY ?? border;
  const leftWidth = borderLeft ?? borderX ?? border;

  const topResult = getEnumResponsiveStyles(styles, "border-top", topWidth, state);
  const rightResult = getEnumResponsiveStyles(styles, "border-right", rightWidth, state);
  const bottomResult = getEnumResponsiveStyles(styles, "border-bottom", bottomWidth, state);
  const leftResult = getEnumResponsiveStyles(styles, "border-left", leftWidth, state);

  // Apply borderStyle, default to solid if any width is set
  const resolvedStyle = borderStyle ?? (topWidth || rightWidth || bottomWidth || leftWidth ? "solid" as const : undefined);
  const styleResult = getEnumResponsiveStyles(styles, "border-style", resolvedStyle, state);

  return {
    className: clsx(
      topResult.className,
      rightResult.className,
      bottomResult.className,
      leftResult.className,
      styleResult.className
    ),
    style: {},
  };
}

export function getBorderStyles(
  props: BorderProps & StateProps<BorderProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getBorderStylesForState(baseProps, "base");
  const hoverStyles = getBorderStylesForState(_hover, "hover");
  const focusStyles = getBorderStylesForState(_focus, "focus");
  const activeStyles = getBorderStylesForState(_active, "active");
  const disabledStyles = getBorderStylesForState(_disabled, "disabled");

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
