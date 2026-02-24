import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./typography.module.css";
import clsx from "clsx";

export type FontSizeValue = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
export type FontFamilyValue = "body" | "heading" | "mono";
export type FontWeightValue = "normal" | "medium" | "semibold" | "bold";
export type LineHeightValue = "tight" | "normal" | "relaxed";

export type TypographyProps = {
  fontSize?: ResponsiveValue<FontSizeValue>;
  fontFamily?: ResponsiveValue<FontFamilyValue>;
  fontWeight?: ResponsiveValue<FontWeightValue>;
  lineHeight?: ResponsiveValue<LineHeightValue>;
};

function getTypographyStylesForState(
  props: TypographyProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const fontSizeResult = getEnumResponsiveStyles(styles, "text", props.fontSize, state);
  const fontFamilyResult = getEnumResponsiveStyles(styles, "font", props.fontFamily, state);
  const fontWeightResult = getEnumResponsiveStyles(styles, "weight", props.fontWeight, state);
  const lineHeightResult = getEnumResponsiveStyles(styles, "leading", props.lineHeight, state);

  return {
    className: clsx(
      fontSizeResult.className,
      fontFamilyResult.className,
      fontWeightResult.className,
      lineHeightResult.className
    ),
    style: {},
  };
}

export function getTypographyStyles(
  props: TypographyProps & StateProps<TypographyProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getTypographyStylesForState(baseProps, "base");
  const hoverStyles = getTypographyStylesForState(_hover, "hover");
  const focusStyles = getTypographyStylesForState(_focus, "focus");
  const activeStyles = getTypographyStylesForState(_active, "active");
  const disabledStyles = getTypographyStylesForState(_disabled, "disabled");

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
