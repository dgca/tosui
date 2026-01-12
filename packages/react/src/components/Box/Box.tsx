import { type ElementType, type ReactNode, type CSSProperties } from "react";
import { type Polymorphic } from "@/types/Polymorphic";
import { clsx } from "clsx";
import { resetClass } from "./reset/reset";
import { getMarginStyles, type MarginProps } from "./margin/margin";
import { getPaddingStyles, type PaddingProps } from "./padding/padding";
import { getSizingStyles, type SizingProps } from "./sizing/sizing";
import { getInsetStyles, type InsetProps } from "./inset/inset";
import { getDisplayStyles, type DisplayProps } from "./display/display";
import { getPositionStyles, type PositionProps } from "./position/position";
import { getOverflowStyles, type OverflowProps } from "./overflow/overflow";
import { getZIndexStyles, type ZIndexProps } from "./zIndex/zIndex";
import { getShadowStyles, type ShadowProps } from "./shadows/shadows";
import { getOpacityStyles, type OpacityProps } from "./opacity/opacity";
import {
  getInteractionStyles,
  type InteractionProps,
} from "./interactions/interactions";
import { getTextStyles, type TextStyleProps } from "./text/text";
import {
  getTypographyStyles,
  type TypographyProps,
} from "./typography/typography";
import { getColorStyles, type ColorProps } from "./colors/colors";
import { getBorderStyles, type BorderProps } from "./borders/borders";
import { getRoundnessStyles, type RoundnessProps } from "./roundness/roundness";
import { getFlexboxStyles, type FlexboxProps } from "./flexbox/flexbox";
import { getGridStyles, type GridProps } from "./grid/grid";

// Combined state props for all style parts
type StateStyleProps = MarginProps &
  PaddingProps &
  SizingProps &
  InsetProps &
  DisplayProps &
  PositionProps &
  OverflowProps &
  ZIndexProps &
  ShadowProps &
  OpacityProps &
  InteractionProps &
  TextStyleProps &
  TypographyProps &
  ColorProps &
  BorderProps &
  RoundnessProps &
  FlexboxProps &
  GridProps;

type StateProps = {
  _hover?: StateStyleProps;
  _focus?: StateStyleProps;
  _active?: StateStyleProps;
  _disabled?: StateStyleProps;
};

export type BoxOwnProps = MarginProps &
  PaddingProps &
  SizingProps &
  InsetProps &
  DisplayProps &
  PositionProps &
  OverflowProps &
  ZIndexProps &
  ShadowProps &
  OpacityProps &
  InteractionProps &
  TextStyleProps &
  TypographyProps &
  ColorProps &
  BorderProps &
  RoundnessProps &
  FlexboxProps &
  GridProps &
  StateProps & {
    className?: string;
    children?: ReactNode;
  };

export type BoxProps<T extends ElementType = "div"> = Polymorphic<
  T,
  BoxOwnProps
>;

// Helper to combine multiple style results
type StyleResult = {
  className?: string;
  style?: CSSProperties;
};

function combineStyles(...results: StyleResult[]): StyleResult {
  return {
    className: clsx(...results.map((r) => r.className)),
    style: Object.assign({}, ...results.map((r) => r.style)),
  };
}

export function Box<T extends ElementType = "div">({
  as,
  children,
  className,
  style,
  // Margin props
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  // Padding props
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  // Sizing props
  w,
  h,
  minW,
  maxW,
  minH,
  maxH,
  // Inset props
  inset,
  insetX,
  insetY,
  top,
  right,
  bottom,
  left,
  // Display props
  display,
  // Position props
  position,
  // Overflow props
  overflow,
  overflowX,
  overflowY,
  // ZIndex props
  zIndex,
  // Shadow props
  shadow,
  // Opacity props
  opacity,
  // Interaction props
  cursor,
  pointerEvents,
  userSelect,
  // Text style props
  textAlign,
  whiteSpace,
  textDecoration,
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
  // State props
  _hover,
  _focus,
  _active,
  _disabled,
  ...rest
}: BoxProps<T>) {
  const Component = as || "div";

  const stateProps = { _hover, _focus, _active, _disabled };

  const styles = combineStyles(
    getMarginStyles({ m, mt, mr, mb, ml, mx, my, ...stateProps }),
    getPaddingStyles({ p, pt, pr, pb, pl, px, py, ...stateProps }),
    getSizingStyles({ w, h, minW, maxW, minH, maxH, ...stateProps }),
    getInsetStyles({ inset, insetX, insetY, top, right, bottom, left, ...stateProps }),
    getDisplayStyles({ display, ...stateProps }),
    getPositionStyles({ position, ...stateProps }),
    getOverflowStyles({ overflow, overflowX, overflowY, ...stateProps }),
    getZIndexStyles({ zIndex, ...stateProps }),
    getShadowStyles({ shadow, ...stateProps }),
    getOpacityStyles({ opacity, ...stateProps }),
    getInteractionStyles({ cursor, pointerEvents, userSelect, ...stateProps }),
    getTextStyles({ textAlign, whiteSpace, textDecoration, ...stateProps }),
    getTypographyStyles({ fontSize, fontFamily, fontWeight, lineHeight }),
    getColorStyles({ color, bg, borderColor, ...stateProps }),
    getBorderStyles({
      border,
      borderX,
      borderY,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      borderStyle,
      ...stateProps,
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
      ...stateProps,
    }),
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
      ...stateProps,
    }),
    getGridStyles({
      justifySelf,
      gridTemplateColumns,
      gridTemplateRows,
      ...stateProps,
    })
  );

  return (
    <Component
      className={clsx(resetClass, styles.className, className)}
      style={{
        ...styles.style,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
