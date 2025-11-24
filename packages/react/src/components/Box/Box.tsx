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

type BoxOwnProps = SpacingProps &
  TypographyProps &
  RoundnessProps &
  ShadowProps &
  ColorProps & {
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
`;

/**
 * Box - The core primitive component
 *
 * A polymorphic component that provides:
 * - Consistent reset styles via Linaria
 * - Spacing props (margin and padding) with cascading specificity
 * - Typography props (fontSize, fontFamily, fontWeight, lineHeight)
 * - Border radius props (rounded) with cascading specificity
 * - Shadow prop (shadow)
 * - Color props (color, bg, borderColor)
 * - Ability to render as any HTML element via the `as` prop
 * - Type-safe props based on the element type
 *
 * Spacing follows cascading specificity:
 * - Directional (pt, pr, pb, pl) overrides axis (px, py) overrides all (p)
 * - Same pattern for margin (mt, mr, mb, ml -> mx, my -> m)
 *
 * Border radius follows cascading specificity:
 * - Corner-specific (roundedTopLeft) overrides side (roundedTop/roundedLeft) overrides all (rounded)
 *
 * @example
 * <Box p={4}>Box with 16px padding on all sides</Box>
 * <Box p={4} pt={8}>Box with 16px padding, but 32px on top</Box>
 * <Box as="a" href="#" m={2}>Renders as an <a> element with proper types</Box>
 * <Box fontSize="xl" fontWeight="bold">Large bold text</Box>
 * <Box fontFamily="mono" fontSize="sm">Code snippet</Box>
 * <Box p={4} rounded="lg" shadow="md">Card with shadow</Box>
 * <Box rounded="lg" roundedTopLeft="none">Card with sharp top-left corner</Box>
 * <Box roundedTop="lg">Element with rounded top corners only</Box>
 * <Box color="primary" bg="primary-subtle" p={4}>Colored box</Box>
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
        getRoundness(rest),
        className
      )}
      {...rest}
    />
  );
}
