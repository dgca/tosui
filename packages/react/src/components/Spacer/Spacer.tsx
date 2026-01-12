import { type ElementType } from "react";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";

// ============================================================================
// Types
// ============================================================================

export type SpacerOwnProps = Omit<BoxOwnProps, "flex">;

export type SpacerProps<T extends ElementType = "div"> = Polymorphic<
  T,
  SpacerOwnProps
>;

// ============================================================================
// Component
// ============================================================================

/**
 * Spacer - Flexible space filler for flex layouts
 *
 * A polymorphic spacer component that fills available flex space:
 * - Default element: <div>
 * - Always has flex: 1 to fill available space
 * - Use to push items apart in flex containers (e.g., logo left, nav right)
 */
export function Spacer<T extends ElementType = "div">({
  as,
  ...rest
}: SpacerProps<T>) {
  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box as={as || "div"} flex={1} {...rest} />
  );
}
