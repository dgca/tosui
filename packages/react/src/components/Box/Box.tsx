import { type ElementType, type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { type Polymorphic } from "@/types/Polymorphic";
import { clsx } from "clsx";
import { resetStyles } from "./styleParts/reset";
import { type DisplayProps, getDisplayStyles } from "./styleParts/display";
import { type PositionProps, getPositionStyles } from "./styleParts/position";
import { type OverflowProps, getOverflowStyles } from "./styleParts/overflow";
import { type ZIndexProps, getZIndexStyles } from "./styleParts/zIndex";
import { type SizeProps, getSizingStyles } from "./styleParts/sizing";
import { type FlexboxProps, getFlexboxStyles } from "./styleParts/flexbox";
import { type GridProps, getGridStyles } from "./styleParts/grid";
import { type InsetProps, getInsetStyles } from "./styleParts/inset";
import {
  type TypographyProps,
  getTypographyStyles,
} from "./styleParts/typography";
import { type ColorProps, getColorStyles } from "./styleParts/colors";
import { type BorderProps, getBorderStyles } from "./styleParts/borders";
import {
  type RoundnessProps,
  getRoundnessStyles,
} from "./styleParts/roundness";
import { type ShadowProps, getShadowStyles } from "./styleParts/shadows";
import {
  type InteractionProps,
  getInteractionStyles,
} from "./styleParts/interactions";
import { type TextProps, getTextStyles } from "./styleParts/text";
import { type OpacityProps, getOpacityStyles } from "./styleParts/opacity";
import { getPaddingStyles, type PaddingProps } from "./styleParts/padding";
import { getMarginStyles, type MarginProps } from "./styleParts/margin";

export type BoxOwnProps = MarginProps &
  PaddingProps &
  DisplayProps &
  PositionProps &
  OverflowProps &
  ZIndexProps &
  SizeProps &
  FlexboxProps &
  GridProps &
  InsetProps &
  TypographyProps &
  ColorProps &
  BorderProps &
  RoundnessProps &
  ShadowProps &
  InteractionProps &
  TextProps &
  OpacityProps & {
    className?: string;
    children?: ReactNode;
  };

export type BoxProps<T extends ElementType = "div"> = Polymorphic<
  T,
  BoxOwnProps
>;

/**
 * Box - The core primitive component
 *
 * A polymorphic component that provides:
 * - Default element: <div>
 * - Can render as any HTML element via the `as` prop
 * - Type-safe props based on the element type
 */
export function Box<T extends ElementType = "div">({
  as,
  children,
  className,
  style,
  // Spacing props
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  // Layout props
  display,
  position,
  overflow,
  overflowX,
  overflowY,
  zIndex,
  // Size props
  w,
  h,
  minW,
  maxW,
  minH,
  maxH,
  // Flexbox props
  flexDirection,
  justifyContent,
  alignItems,
  alignSelf,
  flexWrap,
  gap,
  gapRow,
  gapColumn,
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  // Grid props
  justifySelf,
  gridTemplateColumns,
  gridTemplateRows,
  // Inset props
  inset,
  insetX,
  insetY,
  top,
  right,
  bottom,
  left,
  // Typography props
  fontSize,
  fontFamily,
  fontWeight,
  lineHeight,
  // Color props
  color,
  bg,
  borderColor,
  // Border props
  border,
  borderX,
  borderY,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderStyle,
  // Roundness props
  rounded,
  roundedTop,
  roundedBottom,
  roundedLeft,
  roundedRight,
  roundedTopLeft,
  roundedTopRight,
  roundedBottomLeft,
  roundedBottomRight,
  // Shadow props
  shadow,
  // Interaction props
  cursor,
  pointerEvents,
  userSelect,
  // Text props
  textAlign,
  whiteSpace,
  // Opacity props
  opacity,
  ...rest
}: BoxProps<T>) {
  const Component = as || "div";

  const {
    className: stylexClassName,
    style: stylexStyle,
    ...stylexRest
  } = stylex.props(
    resetStyles.base,
    resetStyles.reducedMotion,
    getPaddingStyles({
      p,
      pt,
      pr,
      pb,
      pl,
      px,
      py,
    }),
    getMarginStyles({
      m,
      mt,
      mr,
      mb,
      ml,
      mx,
      my,
    }),
    getDisplayStyles(display),
    getPositionStyles(position),
    getOverflowStyles({ overflow, overflowX, overflowY }),
    getZIndexStyles(zIndex),
    getSizingStyles({ w, h, minW, maxW, minH, maxH }),
    getFlexboxStyles({
      flexDirection,
      justifyContent,
      alignItems,
      alignSelf,
      flexWrap,
      gap,
      gapRow,
      gapColumn,
      flex,
      flexGrow,
      flexShrink,
      flexBasis,
    }),
    getGridStyles({
      justifySelf,
      gridTemplateColumns,
      gridTemplateRows,
    }),
    getInsetStyles({
      inset,
      insetX,
      insetY,
      top,
      right,
      bottom,
      left,
    }),
    getTypographyStyles({
      fontSize,
      fontFamily,
      fontWeight,
      lineHeight,
    }),
    getColorStyles({ color, bg, borderColor }),
    getBorderStyles({
      border,
      borderX,
      borderY,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      borderStyle,
    }),
    getRoundnessStyles({
      rounded,
      roundedTop,
      roundedBottom,
      roundedLeft,
      roundedRight,
      roundedTopLeft,
      roundedTopRight,
      roundedBottomLeft,
      roundedBottomRight,
    }),
    getShadowStyles({ shadow }),
    getInteractionStyles({
      cursor,
      pointerEvents,
      userSelect,
    }),
    getTextStyles({ textAlign, whiteSpace }),
    getOpacityStyles({ opacity })
  );

  return (
    <Component
      className={clsx(stylexClassName, className)}
      style={{
        ...stylexStyle,
        ...style,
      }}
      {...rest}
      {...stylexRest}
    >
      {children}
    </Component>
  );
}
