import { type ElementType } from "react";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";
import type {
  FlexDirectionValue,
  JustifyContentValue,
  AlignItemsValue,
  AlignSelfValue,
  FlexWrapValue,
  SpacingValue,
} from "@/components/Box/flexbox/flexbox";

// ============================================================================
// Types
// ============================================================================

export type FlexOwnProps = Omit<
  BoxOwnProps,
  | "display"
  | "flexDirection"
  | "justifyContent"
  | "alignItems"
  | "alignSelf"
  | "flexWrap"
  | "gap"
  | "gapRow"
  | "gapColumn"
  | "flexBasis"
  | "flexGrow"
  | "flexShrink"
> & {
  /** Flex direction: row (default), column, row-reverse, column-reverse */
  direction?: FlexDirectionValue;
  /** Flex wrapping: nowrap (default), wrap, wrap-reverse */
  wrap?: FlexWrapValue;
  /** Justify content along the main axis */
  justify?: JustifyContentValue;
  /** Align items along the cross axis */
  align?: AlignItemsValue;
  /** Align content when there are multiple lines */
  alignContent?: JustifyContentValue;
  /** Gap between children (0-32 spacing multiplier or string) */
  gap?: SpacingValue;
  /** Row gap between children (0-32 spacing multiplier or string) */
  gapRow?: SpacingValue;
  /** Column gap between children (0-32 spacing multiplier or string) */
  gapColumn?: SpacingValue;
  /** Flex basis of the container */
  basis?: string;
  /** Flex grow of the container */
  grow?: number;
  /** Flex shrink of the container */
  shrink?: number;
  /** Align self within parent flex container */
  alignSelf?: AlignSelfValue;
};

export type FlexProps<T extends ElementType = "div"> = Polymorphic<
  T,
  FlexOwnProps
>;

// ============================================================================
// Component
// ============================================================================

/**
 * Flex - Explicit flexbox layout component
 *
 * A polymorphic flex container with shorthand props:
 * - Default element: <div>
 * - Always renders with display="flex"
 * - direction -> flexDirection (default: row)
 * - wrap -> flexWrap
 * - justify -> justifyContent
 * - align -> alignItems
 * - gap, gapRow, gapColumn
 * - basis, grow, shrink -> flexBasis, flexGrow, flexShrink
 */
export function Flex<T extends ElementType = "div">({
  as,
  direction,
  wrap,
  justify,
  align,
  alignContent,
  gap,
  gapRow,
  gapColumn,
  basis,
  grow,
  shrink,
  alignSelf,
  children,
  ...rest
}: FlexProps<T>) {
  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box
      as={as || "div"}
      display="flex"
      flexDirection={direction}
      flexWrap={wrap}
      justifyContent={justify}
      alignItems={align}
      gap={gap}
      gapRow={gapRow}
      gapColumn={gapColumn}
      flexBasis={basis}
      flexGrow={grow}
      flexShrink={shrink}
      alignSelf={alignSelf}
      {...rest}
    >
      {children}
    </Box>
  );
}
