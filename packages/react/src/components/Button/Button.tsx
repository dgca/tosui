import { type ElementType, type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";
import { Spinner } from "@/components/Spinner/Spinner";

// ============================================================================
// Types
// ============================================================================

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonOwnProps = Omit<BoxOwnProps, "as"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
// Styles - Only what Box can't handle (hover states, transitions)
// ============================================================================

const styles = stylex.create({
  base: {
    transitionDuration: "150ms",
    transitionProperty: "background-color, border-color, opacity",
    transitionTimingFunction: "ease-in-out",
  },
  // Hover states - Box can't do pseudo-selectors
  solidHover: {
    backgroundColor: {
      default: null,
      ":hover": "var(--t-color-primary-emphasis)",
    },
  },
  outlineHover: {
    backgroundColor: {
      default: null,
      ":hover": "var(--t-color-primary-subtle)",
    },
  },
  ghostHover: {
    backgroundColor: {
      default: null,
      ":hover": "var(--t-color-primary-subtle)",
    },
  },
});

// ============================================================================
// Size configurations using Box props
// ============================================================================

const sizeConfig = {
  sm: { py: 1, px: 3, fontSize: "sm", rounded: "sm" },
  md: { py: 2, px: 4, fontSize: "md", rounded: "md" },
  lg: { py: 3, px: 6, fontSize: "lg", rounded: "md" },
} as const;

// ============================================================================
// Variant configurations using Box props
// ============================================================================

const variantConfig = {
  solid: {
    bg: "primary-default",
    color: "foreground-inverted",
    border: "none",
    borderColor: undefined, // transparent handled by not setting it
  },
  outline: {
    bg: "transparent",
    color: "primary",
    border: "thin",
    borderColor: "primary",
  },
  ghost: {
    bg: "transparent",
    color: "primary",
    border: "none",
    borderColor: undefined,
  },
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
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  // Allow overriding default colors
  bg,
  color,
  borderColor,
  ...rest
}: ButtonProps<T>) {
  const Component = as || "button";
  const isDisabled = disabled || loading;

  // Get config for variant and size
  const variantProps = variantConfig[variant];
  const sizeProps = sizeConfig[size];

  // Get hover style (only if not disabled)
  const hoverStyle = !isDisabled
    ? styles[`${variant}Hover` as keyof typeof styles]
    : undefined;

  const {
    className: stylexClassName,
    style: stylexStyle,
    ...stylexRest
  } = stylex.props(styles.base, hoverStyle);

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
      // Variant props (allow user overrides)
      bg={bg ?? variantProps.bg}
      color={color ?? variantProps.color}
      border={variantProps.border}
      borderColor={borderColor ?? variantProps.borderColor}
      // Width
      w={fullWidth ? "100%" : undefined}
      // Interaction states
      cursor={isDisabled ? "notAllowed" : "pointer"}
      pointerEvents={isDisabled ? "none" : undefined}
      opacity={isDisabled ? 0.4 : undefined}
      // Text decoration for links
      textDecoration="none"
      // StyleX styles (hover, transitions)
      className={
        className ? `${stylexClassName} ${className}` : stylexClassName
      }
      style={stylexStyle}
      // Accessibility
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...rest}
      {...stylexRest}
    >
      {leftContent}
      {children}
      {rightContent}
    </Box>
  );
}
