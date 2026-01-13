import { type ElementType } from "react";
import clsx from "clsx";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";
import styles from "./select.module.css";

// ============================================================================
// Types
// ============================================================================

export type SelectSize = "sm" | "md" | "lg";
export type SelectVariant = "outline" | "filled";

export type SelectOwnProps = Omit<
  BoxOwnProps,
  "as" | "h" | "fontSize" | "rounded" | "border" | "borderColor" | "bg"
> & {
  /** Select size affecting height and font size */
  size?: SelectSize;
  /** Visual variant: outline (border) or filled (surface background) */
  variant?: SelectVariant;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is in an invalid state */
  isInvalid?: boolean;
};

export type SelectProps<T extends ElementType = "select"> = Polymorphic<
  T,
  SelectOwnProps
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
 * Select - Dropdown select component
 *
 * A polymorphic select component that provides:
 * - Default element: <select>
 * - Sizes: sm, md (default), lg
 * - Variants: outline (default), filled
 * - Disabled and invalid states
 * - Custom dropdown arrow
 * - Focus ring styling
 */
export function Select<T extends ElementType = "select">({
  as,
  size = "md",
  variant = "outline",
  disabled = false,
  isInvalid = false,
  className,
  ...rest
}: SelectProps<T>) {
  const Component = as || "select";
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
      // CSS module for states and custom arrow
      className={clsx(styles.select, isInvalid && styles.invalid, className)}
      // Native disabled
      disabled={disabled}
      aria-invalid={isInvalid || undefined}
      {...rest}
    />
  );
}
