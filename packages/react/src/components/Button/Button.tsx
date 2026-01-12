import { type ElementType, type ReactNode } from "react";
import clsx from "clsx";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";
import { Spinner } from "@/components/Spinner/Spinner";
import styles from "./button.module.css";

// ============================================================================
// Types
// ============================================================================

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColorScheme =
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

export type ButtonOwnProps = Omit<BoxOwnProps, "as"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ButtonColorScheme;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type ButtonProps<T extends ElementType = "button"> = Polymorphic<
  T,
  ButtonOwnProps
>;

// ============================================================================
// Size configurations using Box props
// ============================================================================

const sizeConfig = {
  sm: { py: 1, px: 3, fontSize: "sm", rounded: "sm" },
  md: { py: 2, px: 4, fontSize: "md", rounded: "md" },
  lg: { py: 3, px: 6, fontSize: "lg", rounded: "md" },
} as const;

// ============================================================================
// Color configurations
// ============================================================================

type ColorConfig = {
  bg: string;
  color: string;
  borderColor: string | undefined;
  hoverBg: string;
};

function getColorConfig(
  variant: ButtonVariant,
  colorScheme: ButtonColorScheme
): ColorConfig {
  switch (variant) {
    case "solid":
      return {
        bg: `${colorScheme}-default`,
        color: "foreground-inverted",
        borderColor: undefined,
        hoverBg: `var(--t-color-${colorScheme}-emphasis)`,
      };
    case "outline":
      return {
        bg: "transparent",
        color: colorScheme,
        borderColor: colorScheme,
        hoverBg: `var(--t-color-${colorScheme}-subtle)`,
      };
    case "ghost":
      return {
        bg: "transparent",
        color: colorScheme,
        borderColor: undefined,
        hoverBg: `var(--t-color-${colorScheme}-subtle)`,
      };
  }
}

// ============================================================================
// Variant border configurations
// ============================================================================

const variantBorderConfig = {
  solid: "none",
  outline: "thin",
  ghost: "none",
} as const;

// ============================================================================
// Component
// ============================================================================

/**
 * Button - Interactive button component
 *
 * A polymorphic button component that provides:
 * - Default element: <button>
 * - Variants: solid (default), outline, ghost
 * - Sizes: sm, md (default), lg
 * - Loading state with spinner
 * - Icon support (left and right)
 * - Full width option
 */
export function Button<T extends ElementType = "button">({
  as,
  variant = "solid",
  size = "md",
  colorScheme = "primary",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  style,
  // Allow overriding default colors
  bg,
  color,
  borderColor,
  ...rest
}: ButtonProps<T>) {
  const Component = as || "button";
  const isDisabled = disabled || loading;

  // Get config for variant, size, and color
  const colorConfig = getColorConfig(variant, colorScheme);
  const sizeProps = sizeConfig[size];

  // Determine what to show for left icon slot
  const leftContent = loading ? (
    <Spinner size="sm" aria-hidden="true" />
  ) : leftIcon ? (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      flexShrink={0}
      aria-hidden="true"
    >
      {leftIcon}
    </Box>
  ) : null;

  // Right icon (never replaced by spinner)
  const rightContent = rightIcon ? (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      flexShrink={0}
      aria-hidden="true"
    >
      {rightIcon}
    </Box>
  ) : null;

  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box
      as={Component}
      // Layout
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      // Size props
      py={sizeProps.py}
      px={sizeProps.px}
      fontSize={sizeProps.fontSize}
      rounded={sizeProps.rounded}
      fontWeight="medium"
      // Color props (allow user overrides)
      bg={bg ?? colorConfig.bg}
      color={color ?? colorConfig.color}
      border={variantBorderConfig[variant]}
      borderColor={borderColor ?? colorConfig.borderColor}
      // Width
      w={fullWidth ? "100%" : undefined}
      // Interaction states
      cursor={isDisabled ? "not-allowed" : "pointer"}
      pointerEvents={isDisabled ? "none" : undefined}
      opacity={isDisabled ? "faint" : undefined}
      // Text decoration for links
      textDecoration="none"
      // CSS module styles (transitions + hover)
      className={clsx(styles.button, styles[variant], className)}
      // Set hover color via CSS variable
      style={{ "--button-hover-bg": colorConfig.hoverBg, ...style }}
      // Accessibility
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      {leftContent}
      {children}
      {rightContent}
    </Box>
  );
}
