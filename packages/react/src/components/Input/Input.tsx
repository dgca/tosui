import { type ElementType } from "react";
import clsx from "clsx";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";
import styles from "./input.module.css";

// ============================================================================
// Types
// ============================================================================

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "outline" | "filled";

export type InputOwnProps = Omit<
  BoxOwnProps,
  "as" | "h" | "fontSize" | "rounded" | "border" | "borderColor" | "bg"
> & {
  /** Input size affecting height and font size */
  size?: InputSize;
  /** Visual variant: outline (border) or filled (surface background) */
  variant?: InputVariant;
  /** Whether the input is disabled */
  isDisabled?: boolean;
  /** Whether the input is in an invalid state */
  isInvalid?: boolean;
};

export type InputProps<T extends ElementType = "input"> = Polymorphic<
  T,
  InputOwnProps
>;

// ============================================================================
// Size configurations
// ============================================================================

const sizeConfig = {
  sm: { h: 8, px: 2, fontSize: "sm", rounded: "sm" },
  md: { h: 10, px: 3, fontSize: "md", rounded: "md" },
  lg: { h: 12, px: 4, fontSize: "lg", rounded: "md" },
} as const;

// ============================================================================
// Component
// ============================================================================

/**
 * Input - Text input field component
 *
 * A polymorphic input component that provides:
 * - Default element: <input>
 * - Sizes: sm, md (default), lg
 * - Variants: outline (default), filled
 * - Disabled and invalid states
 * - Focus ring styling
 */
export function Input<T extends ElementType = "input">({
  as,
  size = "md",
  variant = "outline",
  isDisabled = false,
  isInvalid = false,
  className,
  ...rest
}: InputProps<T>) {
  const Component = as || "input";
  const sizeProps = sizeConfig[size];

  // Variant-specific styling
  const variantStyles =
    variant === "outline"
      ? {
          bg: "transparent" as const,
          border: "thin" as const,
          borderColor: "border" as const,
        }
      : {
          bg: "surface" as const,
          border: "thin" as const,
          borderColor: "border-muted" as const,
        };

  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box
      as={Component}
      // Size props
      h={sizeProps.h}
      px={sizeProps.px}
      fontSize={sizeProps.fontSize}
      rounded={sizeProps.rounded}
      // Variant props
      bg={variantStyles.bg}
      border={variantStyles.border}
      borderColor={variantStyles.borderColor}
      // Full width by default
      w="100%"
      // Colors
      color="foreground"
      // CSS module for states
      className={clsx(styles.input, isInvalid && styles.invalid, className)}
      // Native disabled
      disabled={isDisabled}
      aria-invalid={isInvalid || undefined}
      {...rest}
    />
  );
}
