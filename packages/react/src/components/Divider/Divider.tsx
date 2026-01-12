import { type ElementType } from "react";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";

// ============================================================================
// Types
// ============================================================================

/** Divider color using semantic border color tokens */
export type DividerColor =
  | "border"
  | "border-muted"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

export type DividerOwnProps = Omit<BoxOwnProps, "w" | "h" | "bg" | "color"> & {
  /** Divider orientation (default: "horizontal") */
  orientation?: "horizontal" | "vertical";
  /** Divider color token (default: "border-muted") */
  color?: DividerColor;
  /** Divider thickness in pixels 1-4 (default: 1) */
  thickness?: 1 | 2 | 3 | 4;
};

export type DividerProps<T extends ElementType = "hr"> = Polymorphic<
  T,
  DividerOwnProps
>;

// ============================================================================
// Config
// ============================================================================

const COLOR_MAP: Record<DividerColor, string> = {
  border: "var(--t-color-border)",
  "border-muted": "var(--t-color-border-muted)",
  primary: "var(--t-color-primary-default)",
  accent: "var(--t-color-accent-default)",
  success: "var(--t-color-success-default)",
  warning: "var(--t-color-warning-default)",
  error: "var(--t-color-error-default)",
  info: "var(--t-color-info-default)",
};

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
      style={{
        backgroundColor: COLOR_MAP[color],
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
