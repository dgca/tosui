import { type ElementType } from "react";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";

// ============================================================================
// Types
// ============================================================================

export type DividerOwnProps = Omit<BoxOwnProps, "w" | "h" | "bg"> & {
  /** Divider orientation (default: "horizontal") */
  orientation?: "horizontal" | "vertical";
  /** Divider color token (default: "border-muted") */
  color?: BoxOwnProps["bg"];
  /** Divider thickness in pixels 1-4 (default: 1) */
  thickness?: 1 | 2 | 3 | 4;
};

export type DividerProps<T extends ElementType = "hr"> = Polymorphic<
  T,
  DividerOwnProps
>;

// ============================================================================
// Component
// ============================================================================

/**
 * Divider - Visual separator between content sections
 *
 * A polymorphic divider component that provides:
 * - Default element: <hr> for horizontal, <div> for vertical
 * - Orientations: horizontal (default), vertical
 * - Customizable color and thickness
 * - Proper accessibility attributes (role="separator", aria-orientation)
 */
export function Divider<T extends ElementType = "hr">({
  as,
  orientation = "horizontal",
  color = "border-muted",
  thickness = 1,
  style,
  ...rest
}: DividerProps<T>) {
  const isHorizontal = orientation === "horizontal";
  const defaultElement = isHorizontal ? "hr" : "div";

  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box
      as={as || defaultElement}
      role="separator"
      aria-orientation={orientation}
      w={isHorizontal ? "100%" : undefined}
      h={isHorizontal ? undefined : "100%"}
      bg={color}
      style={{
        ...(isHorizontal
          ? { height: `${thickness}px` }
          : { width: `${thickness}px` }),
        border: "none",
        ...style,
      }}
      {...rest}
    />
  );
}
