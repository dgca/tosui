import React, { forwardRef, type ReactNode } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import { Spinner } from "@/components/Spinner/Spinner";
import styles from "./iconbutton.module.css";

// ============================================================================
// Types
// ============================================================================

export type IconButtonVariant = "solid" | "outline" | "ghost";
export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonColorScheme =
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

export type IconButtonProps = {
  /** The icon to display */
  icon: ReactNode;
  /** Accessible label (required for screen readers) */
  "aria-label": string;
  /** Visual variant */
  variant?: IconButtonVariant;
  /** Size of the button */
  size?: IconButtonSize;
  /** Color scheme */
  colorScheme?: IconButtonColorScheme;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether to show loading spinner */
  loading?: boolean;
  /** Additional class name */
  className?: string;
  /** Click handler */
  onClick?: () => void;
};

// ============================================================================
// Size configurations
// ============================================================================

const sizeConfig = {
  sm: { dimension: "28px", iconSize: "14px", fontSize: "sm" },
  md: { dimension: "36px", iconSize: "18px", fontSize: "md" },
  lg: { dimension: "44px", iconSize: "22px", fontSize: "lg" },
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
  variant: IconButtonVariant,
  colorScheme: IconButtonColorScheme
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
 * IconButton - Icon-only button component
 *
 * A compact button for icons that provides:
 * - Square sizing for icon-only use
 * - All Button variants (solid, outline, ghost)
 * - All color schemes
 * - Loading state with spinner
 * - Required aria-label for accessibility
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      "aria-label": ariaLabel,
      variant = "solid",
      size = "md",
      colorScheme = "primary",
      disabled = false,
      loading = false,
      className,
      onClick,
      ...rest
    },
    ref
  ) {
    const isDisabled = disabled || loading;
    const colorConfig = getColorConfig(variant, colorScheme);
    const sizeProps = sizeConfig[size];

    return (
      <Box
        as="button"
        ref={ref}
        // Layout
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        // Size (square)
        w={sizeProps.dimension}
        h={sizeProps.dimension}
        fontSize={sizeProps.fontSize}
        rounded="md"
        // Colors (type assertions for computed values)
        bg={colorConfig.bg as any}
        color={colorConfig.color as any}
        border={variantBorderConfig[variant]}
        borderColor={colorConfig.borderColor as any}
        // Interaction states
        cursor={isDisabled ? "not-allowed" : "pointer"}
        pointerEvents={isDisabled ? "none" : undefined}
        opacity={isDisabled ? "faint" : undefined}
        // CSS module styles
        className={clsx(styles.iconButton, styles[variant], className)}
        // Hover color via CSS variable
        style={{ "--iconbutton-hover-bg": colorConfig.hoverBg } as React.CSSProperties}
        // Accessibility
        aria-label={ariaLabel}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        onClick={onClick}
        {...rest}
      >
        {loading ? (
          <Spinner size="sm" aria-hidden="true" />
        ) : (
          <Box as="span" display="inline-flex" alignItems="center" aria-hidden="true">
            {icon}
          </Box>
        )}
      </Box>
    );
  }
);
