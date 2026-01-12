import { type ElementType } from "react";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";

// ============================================================================
// Types
// ============================================================================

type FontSize = "xs" | "sm" | "md" | "lg";
type FontWeight = "normal" | "medium" | "semibold" | "bold";

export type LabelOwnProps = Omit<
  BoxOwnProps,
  "as" | "fontSize" | "fontWeight"
> & {
  /** Label text size */
  size?: FontSize;
  /** Label font weight */
  weight?: FontWeight;
  /** Show required asterisk */
  required?: boolean;
};

export type LabelProps<T extends ElementType = "label"> = Polymorphic<
  T,
  LabelOwnProps
>;

// ============================================================================
// Component
// ============================================================================

/**
 * Label - Form label component
 *
 * A polymorphic label component that provides:
 * - Default element: <label>
 * - Size and weight props for typography
 * - Required indicator (red asterisk)
 * - Passes through htmlFor for accessibility
 */
export function Label<T extends ElementType = "label">({
  as,
  size = "sm",
  weight = "medium",
  required = false,
  children,
  ...rest
}: LabelProps<T>) {
  const Component = as || "label";

  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box
      as={Component}
      fontSize={size}
      fontWeight={weight}
      color="foreground"
      display="inline-block"
      mb={1}
      {...rest}
    >
      {children}
      {required && (
        <Box as="span" color="error" ml={1} aria-hidden="true">
          *
        </Box>
      )}
    </Box>
  );
}
