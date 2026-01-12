import { type ElementType } from "react";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";
import type {
  FlexDirectionValue,
  JustifyContentValue,
  AlignItemsValue,
  SpacingValue,
} from "@/components/Box/flexbox/flexbox";

// ============================================================================
// Types
// ============================================================================

export type StackOwnProps = Omit<
  BoxOwnProps,
  "display" | "flexDirection" | "justifyContent" | "alignItems" | "flexWrap" | "gap"
> & {
  /** Stack direction: row, column, row-reverse, column-reverse */
  direction?: FlexDirectionValue;
  /** Gap between children (0-32 spacing multiplier) */
  gap?: SpacingValue;
  /** Align items along the cross axis */
  align?: AlignItemsValue;
  /** Justify content along the main axis */
  justify?: JustifyContentValue;
  /** Enable flex wrapping */
  wrap?: boolean;
};

export type StackProps<T extends ElementType = "div"> = Polymorphic<
  T,
  StackOwnProps
>;

// ============================================================================
// Component
// ============================================================================

/**
 * Stack - Flex-based layout component
 *
 * A polymorphic flex container that provides:
 * - Default element: <div>
 * - Direction: column (default), row, row-reverse, column-reverse
 * - Gap: spacing multiplier (0-32)
 * - Align: cross-axis alignment
 * - Justify: main-axis alignment
 * - Wrap: enable flex wrapping
 */
export function Stack<T extends ElementType = "div">({
  as,
  direction = "column",
  gap,
  align,
  justify,
  wrap,
  children,
  ...rest
}: StackProps<T>) {
  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box
      as={as || "div"}
      display="flex"
      flexDirection={direction}
      gap={gap}
      alignItems={align}
      justifyContent={justify}
      flexWrap={wrap ? "wrap" : undefined}
      {...rest}
    >
      {children}
    </Box>
  );
}
