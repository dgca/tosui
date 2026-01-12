import { type ElementType } from "react";
import clsx from "clsx";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";
import styles from "./textarea.module.css";

// ============================================================================
// Types
// ============================================================================

export type TextareaSize = "sm" | "md" | "lg";
export type TextareaVariant = "outline" | "filled";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export type TextareaOwnProps = Omit<
  BoxOwnProps,
  "as" | "fontSize" | "rounded" | "border" | "borderColor" | "bg"
> & {
  /** Textarea size affecting font size and padding */
  size?: TextareaSize;
  /** Visual variant: outline (border) or filled (surface background) */
  variant?: TextareaVariant;
  /** Whether the textarea is disabled */
  isDisabled?: boolean;
  /** Whether the textarea is in an invalid state */
  isInvalid?: boolean;
  /** Number of visible text rows */
  rows?: number;
  /** Resize behavior */
  resize?: TextareaResize;
};

export type TextareaProps<T extends ElementType = "textarea"> = Polymorphic<
  T,
  TextareaOwnProps
>;

// ============================================================================
// Size configurations
// ============================================================================

const sizeConfig = {
  sm: { p: 2, fontSize: "sm", rounded: "sm" },
  md: { p: 3, fontSize: "md", rounded: "md" },
  lg: { p: 4, fontSize: "lg", rounded: "md" },
} as const;

// ============================================================================
// Resize class map
// ============================================================================

const resizeClassMap: Record<TextareaResize, string> = {
  none: styles.resizeNone,
  vertical: styles.resizeVertical,
  horizontal: styles.resizeHorizontal,
  both: styles.resizeBoth,
};

// ============================================================================
// Component
// ============================================================================

/**
 * Textarea - Multiline text input component
 *
 * A polymorphic textarea component that provides:
 * - Default element: <textarea>
 * - Sizes: sm, md (default), lg
 * - Variants: outline (default), filled
 * - Disabled and invalid states
 * - Configurable rows and resize behavior
 */
export function Textarea<T extends ElementType = "textarea">({
  as,
  size = "md",
  variant = "outline",
  isDisabled = false,
  isInvalid = false,
  rows = 3,
  resize = "vertical",
  className,
  ...rest
}: TextareaProps<T>) {
  const Component = as || "textarea";
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
      p={sizeProps.p}
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
      // Native props
      rows={rows}
      // CSS module for states and resize
      className={clsx(
        styles.textarea,
        isInvalid && styles.invalid,
        resizeClassMap[resize],
        className
      )}
      // Native disabled
      disabled={isDisabled}
      aria-invalid={isInvalid || undefined}
      {...rest}
    />
  );
}
