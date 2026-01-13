import { type ElementType } from "react";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";
import type {
  JustifyContentValue,
  AlignItemsValue,
  SpacingValue,
} from "@/components/Box/flexbox/flexbox";

// ============================================================================
// Types
// ============================================================================

export type GridOwnProps = Omit<
  BoxOwnProps,
  | "display"
  | "gridTemplateColumns"
  | "gridTemplateRows"
  | "gap"
  | "gapRow"
  | "gapColumn"
  | "justifyContent"
  | "alignItems"
> & {
  /** Grid template columns (CSS value) */
  columns?: string;
  /** Grid template rows (CSS value) */
  rows?: string;
  /** Gap between grid items (0-32 spacing multiplier or string) */
  gap?: SpacingValue;
  /** Row gap between grid items (0-32 spacing multiplier or string) */
  gapRow?: SpacingValue;
  /** Column gap between grid items (0-32 spacing multiplier or string) */
  gapColumn?: SpacingValue;
  /** Justify items along the inline (row) axis */
  justify?: JustifyContentValue;
  /** Align items along the block (column) axis */
  align?: AlignItemsValue;
  /** Justify content (distribute rows) */
  justifyContent?: JustifyContentValue;
  /** Align content (distribute columns) */
  alignContent?: JustifyContentValue;
};

export type GridProps<T extends ElementType = "div"> = Polymorphic<
  T,
  GridOwnProps
>;

// ============================================================================
// Component
// ============================================================================

/**
 * Grid - Explicit CSS Grid layout component
 *
 * A polymorphic grid container with shorthand props:
 * - Default element: <div>
 * - Always renders with display="grid"
 * - columns -> gridTemplateColumns
 * - rows -> gridTemplateRows
 * - gap, gapRow, gapColumn
 * - justify -> justifyItems (alignment within cells)
 * - align -> alignItems (alignment within cells)
 * - justifyContent, alignContent (distribution of grid tracks)
 */
export function Grid<T extends ElementType = "div">({
  as,
  columns,
  rows,
  gap,
  gapRow,
  gapColumn,
  justify,
  align,
  justifyContent,
  alignContent,
  children,
  ...rest
}: GridProps<T>) {
  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box
      as={as || "div"}
      display="grid"
      gridTemplateColumns={columns}
      gridTemplateRows={rows}
      gap={gap}
      gapRow={gapRow}
      gapColumn={gapColumn}
      justifyContent={justify ?? justifyContent}
      alignItems={align ?? alignContent}
      {...rest}
    >
      {children}
    </Box>
  );
}
