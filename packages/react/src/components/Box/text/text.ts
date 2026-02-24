import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./text.module.css";
import clsx from "clsx";

export type TextAlignValue = "left" | "center" | "right" | "justify";
export type WhiteSpaceValue = "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";
export type TextDecorationValue = "none" | "underline" | "line-through";

export type TextStyleProps = {
  textAlign?: ResponsiveValue<TextAlignValue>;
  whiteSpace?: ResponsiveValue<WhiteSpaceValue>;
  textDecoration?: ResponsiveValue<TextDecorationValue>;
};

function getTextStylesForState(
  props: TextStyleProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const textAlignResult = getEnumResponsiveStyles(styles, "text", props.textAlign, state);
  const whiteSpaceResult = getEnumResponsiveStyles(styles, "whitespace", props.whiteSpace, state);
  const textDecorationResult = getEnumResponsiveStyles(styles, "decoration", props.textDecoration, state);

  return {
    className: clsx(
      textAlignResult.className,
      whiteSpaceResult.className,
      textDecorationResult.className
    ),
    style: {},
  };
}

export function getTextStyles(
  props: TextStyleProps & StateProps<TextStyleProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getTextStylesForState(baseProps, "base");
  const hoverStyles = getTextStylesForState(_hover, "hover");
  const focusStyles = getTextStylesForState(_focus, "focus");
  const activeStyles = getTextStylesForState(_active, "active");
  const disabledStyles = getTextStylesForState(_disabled, "disabled");

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
