import { type ElementType } from "react";
import { type Polymorphic } from "@/types/Polymorphic";
import { Stack, type StackOwnProps } from "@/components/Stack/Stack";

// ============================================================================
// Types
// ============================================================================

export type HStackOwnProps = Omit<StackOwnProps, "direction">;

export type HStackProps<T extends ElementType = "div"> = Polymorphic<
  T,
  HStackOwnProps
>;

// ============================================================================
// Component
// ============================================================================

/**
 * HStack - Horizontal stack component
 *
 * A convenience wrapper around Stack with direction="row".
 * - Default element: <div>
 * - Direction: row (fixed)
 * - Gap: spacing multiplier (0-32)
 * - Align: cross-axis alignment
 * - Justify: main-axis alignment
 * - Wrap: enable flex wrapping
 */
export function HStack<T extends ElementType = "div">({
  as,
  children,
  ...rest
}: HStackProps<T>) {
  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Stack as={as || "div"} direction="row" {...rest}>
      {children}
    </Stack>
  );
}
