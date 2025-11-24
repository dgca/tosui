import { type ElementType, type ReactNode } from "react";
import { styled } from "@linaria/react";
import clsx from "clsx";
import { type Polymorphic } from "@/types/Polymorphic";
import { resetStyles } from "./styleParts/reset";
import {
  type SpacingProps,
  getPadding,
  getMargin,
  spacingStyles,
} from "./styleParts/spacing";
import {
  type TypographyProps,
  getFontSize,
  getFontFamily,
  getFontWeight,
  getLineHeight,
} from "./styleParts/typography";
import { type RoundnessProps, getRoundness } from "./styleParts/roundness";
import { type ShadowProps, getShadow } from "./styleParts/shadows";
import {
  type ColorProps,
  getColor,
  getBackgroundColor,
  getBorderColor,
} from "./styleParts/colors";
import {
  type BorderProps,
  getBorderWidths,
  getBorderStyle,
} from "./styleParts/borders";
import { type DisplayProps, getDisplay } from "./styleParts/display";
import {
  type PositioningProps,
  getPosition,
  getInset,
} from "./styleParts/positioning";
import {
  type FlexboxProps,
  getFlexDirection,
  getJustifyContent,
  getAlignItems,
  getAlignSelf,
  getFlexWrap,
  getFlex,
  getGap,
} from "./styleParts/flexbox";
import {
  type GridProps,
  getJustifySelf,
  getGridTemplateColumns,
  getGridTemplateRows,
} from "./styleParts/grid";
import {
  type SizeProps,
  getWidth,
  getHeight,
  getMinWidth,
  getMaxWidth,
  getMinHeight,
  getMaxHeight,
} from "./styleParts/sizing";
import { type OverflowProps, getOverflow } from "./styleParts/overflow";
import { type ZIndexProps, getZIndex } from "./styleParts/zIndex";
import { type OpacityProps, getOpacity } from "./styleParts/opacity";
import { type CursorProps, getCursor } from "./styleParts/cursor";
import {
  type PointerEventsProps,
  getPointerEvents,
} from "./styleParts/pointerEvents";
import { type UserSelectProps, getUserSelect } from "./styleParts/userSelect";
import { type TextAlignProps, getTextAlign } from "./styleParts/textAlign";
import { type WhiteSpaceProps, getWhiteSpace } from "./styleParts/whiteSpace";

type BoxOwnProps = SpacingProps &
  TypographyProps &
  RoundnessProps &
  ShadowProps &
  ColorProps &
  BorderProps &
  DisplayProps &
  PositioningProps &
  FlexboxProps &
  GridProps &
  SizeProps &
  OverflowProps &
  ZIndexProps &
  OpacityProps &
  CursorProps &
  PointerEventsProps &
  UserSelectProps &
  TextAlignProps &
  WhiteSpaceProps & {
    className?: string;
    children?: ReactNode;
  };

export type BoxProps<T extends ElementType = "div"> = Polymorphic<
  T,
  BoxOwnProps
>;

const StyledBox = styled.div<BoxOwnProps>`
  /* Padding with cascading specificity: p -> px/py -> pt/pr/pb/pl */
  padding: ${(props) => getPadding(props)};
  /* Margin with cascading specificity: m -> mx/my -> mt/mr/mb/ml */
  margin: ${(props) => getMargin(props)};
  /* Layout - gap with cascading specificity: gap -> gapRow/gapColumn */
  gap: ${(props) => getGap(props)};
  /* Flex shorthand with cascading: flex -> flexGrow/flexShrink/flexBasis */
  flex: ${(props) => getFlex(props)};
  /* Grid template columns */
  grid-template-columns: ${(props) =>
    getGridTemplateColumns(props.gridTemplateColumns)};
  /* Grid template rows */
  grid-template-rows: ${(props) => getGridTemplateRows(props.gridTemplateRows)};
  /* Inset with cascading specificity: inset -> insetX/insetY -> top/right/bottom/left */
  inset: ${(props) => getInset(props)};
  /* Size properties */
  width: ${(props) => getWidth(props.w)};
  height: ${(props) => getHeight(props.h)};
  min-width: ${(props) => getMinWidth(props.minW)};
  max-width: ${(props) => getMaxWidth(props.maxW)};
  min-height: ${(props) => getMinHeight(props.minH)};
  max-height: ${(props) => getMaxHeight(props.maxH)};
`;

/**
 * Box - The core primitive component
 *
 * A polymorphic component that provides:
 * - Consistent reset styles via Linaria
 * - Spacing props (margin and padding) with cascading specificity
 * - Typography props (fontSize, fontFamily, fontWeight, lineHeight)
 * - Border radius props (rounded) with cascading specificity
 * - Border width props (border, borderX/borderY, borderTop/borderRight/borderBottom/borderLeft) with cascading specificity
 * - Border style prop (borderStyle)
 * - Shadow prop (shadow)
 * - Color props (color, bg, borderColor)
 * - Layout props (display, flexbox, grid, position)
 * - Inset props (positioning offsets) with cascading specificity
 * - Size props (width, height, min/max variants)
 * - Ability to render as any HTML element via the `as` prop
 * - Type-safe props based on the element type
 *
 * Spacing follows cascading specificity:
 * - Directional (pt, pr, pb, pl) overrides axis (px, py) overrides all (p)
 * - Same pattern for margin (mt, mr, mb, ml -> mx, my -> m)
 * - Same pattern for gap (gapRow, gapColumn -> gap)
 * - Same pattern for flex (flexGrow, flexShrink, flexBasis -> flex)
 * - Same pattern for inset (top, right, bottom, left -> insetX, insetY -> inset)
 *
 * Border radius follows cascading specificity:
 * - Corner-specific (roundedTopLeft) overrides side (roundedTop/roundedLeft) overrides all (rounded)
 *
 * Border width follows cascading specificity:
 * - Directional (borderTop, borderRight, borderBottom, borderLeft) overrides axis (borderX, borderY) overrides all (border)
 */
export function Box<T extends ElementType = "div">({
  className,
  fontSize,
  fontFamily,
  fontWeight,
  lineHeight,
  shadow,
  color,
  bg,
  borderColor,
  borderStyle,
  display,
  position,
  flexDirection,
  justifyContent,
  alignItems,
  alignSelf,
  justifySelf,
  flexWrap,
  overflow,
  overflowX,
  overflowY,
  zIndex,
  opacity,
  cursor,
  pointerEvents,
  userSelect,
  textAlign,
  whiteSpace,
  ...rest
}: BoxProps<T>) {
  return (
    <StyledBox
      className={clsx(
        resetStyles,
        spacingStyles,
        getFontSize(fontSize),
        getFontFamily(fontFamily),
        getFontWeight(fontWeight),
        getLineHeight(lineHeight),
        getShadow(shadow),
        getColor(color),
        getBackgroundColor(bg),
        getBorderColor(borderColor),
        getBorderStyle(borderStyle),
        getBorderWidths(rest),
        getRoundness(rest),
        getDisplay(display),
        getPosition(position),
        getFlexDirection(flexDirection),
        getJustifyContent(justifyContent),
        getAlignItems(alignItems),
        getAlignSelf(alignSelf),
        getJustifySelf(justifySelf),
        getFlexWrap(flexWrap),
        getOverflow({ overflow, overflowX, overflowY }),
        getZIndex(zIndex),
        getOpacity(opacity),
        getCursor(cursor),
        getPointerEvents(pointerEvents),
        getUserSelect(userSelect),
        getTextAlign(textAlign),
        getWhiteSpace(whiteSpace),
        className
      )}
      {...rest}
    />
  );
}
