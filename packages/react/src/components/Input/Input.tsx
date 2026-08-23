import { type ElementType } from "react";
import clsx from "clsx";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";
import { useFormFieldControl } from "@/components/FormField/FormFieldContext";
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
  disabled?: boolean;
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
  disabled = false,
  isInvalid = false,
  id,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  className,
  ...rest
}: InputProps<T>) {
  const Component = as || "input";
  const sizeProps = sizeConfig[size];
  const control = useFormFieldControl({
    id,
    disabled,
    required,
    isInvalid,
    ariaDescribedBy,
    ariaInvalid,
  });

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
      className={clsx(
        styles.input,
        control.isInvalid && styles.invalid,
        className
      )}
      // Native disabled
      id={control.id}
      disabled={control.disabled}
      required={control.required}
      aria-describedby={control.ariaDescribedBy}
      aria-invalid={control.ariaInvalid}
      {...rest}
    />
  );
}
