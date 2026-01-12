import { type ElementType } from "react";
import { type Polymorphic } from "@/types/Polymorphic";
import { Stack, type StackOwnProps } from "@/components/Stack/Stack";

// ============================================================================
// Types
// ============================================================================

export type VStackOwnProps = Omit<StackOwnProps, "direction">;

export type VStackProps<T extends ElementType = "div"> = Polymorphic<
  T,
  VStackOwnProps
>;

// ============================================================================
// Component
// ============================================================================

/**
 * VStack - Vertical stack component
 *
 * A convenience wrapper around Stack with direction="column".
 * - Default element: <div>
 * - Direction: column (fixed)
 * - Gap: spacing multiplier (0-32)
 * - Align: cross-axis alignment
 * - Justify: main-axis alignment
 * - Wrap: enable flex wrapping
 */
export function VStack<T extends ElementType = "div">({
  as,
  children,
  ...rest
}: VStackProps<T>) {
  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Stack as={as || "div"} direction="column" {...rest}>
      {children}
    </Stack>
  );
}
