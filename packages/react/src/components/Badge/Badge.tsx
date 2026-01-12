import { type ReactNode } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./badge.module.css";

// ============================================================================
// Types
// ============================================================================

export type BadgeColorScheme =
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "gray";

export type BadgeVariant = "solid" | "subtle";
export type BadgeSize = "sm" | "md";

export type BadgeProps = {
  /** Color scheme */
  colorScheme?: BadgeColorScheme;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size */
  size?: BadgeSize;
  /** Badge content */
  children?: ReactNode;
  /** Additional class name */
  className?: string;
};

// ============================================================================
// Size configurations
// ============================================================================

const sizeConfig = {
  sm: { fontSize: "xs", px: 1.5, py: 0.5 },
  md: { fontSize: "sm", px: 2, py: 0.5 },
} as const;

// ============================================================================
// Color configurations
// ============================================================================

type ColorConfig = {
  bg: string;
  color: string;
};

function getColorConfig(
  variant: BadgeVariant,
  colorScheme: BadgeColorScheme
): ColorConfig {
  // Handle "gray" colorScheme specially since it uses different token names
  if (colorScheme === "gray") {
    if (variant === "solid") {
      return {
        bg: "foreground",
        color: "foreground-inverted",
      };
    }
    return {
      bg: "surface",
      color: "foreground-muted",
    };
  }

  if (variant === "solid") {
    return {
      bg: `${colorScheme}-default`,
      color: "foreground-inverted",
    };
  }

  return {
    bg: `${colorScheme}-subtle`,
    color: colorScheme,
  };
}

// ============================================================================
// Component
// ============================================================================

/**
 * Badge - Small status indicator
 *
 * A compact label component for displaying:
 * - Counts and numbers
 * - Status indicators
 * - Categories and tags
 *
 * Features:
 * - 7 color schemes: primary, accent, success, warning, error, info, gray
 * - 2 variants: solid (bold) and subtle (muted)
 * - 2 sizes: sm and md
 * - Pill shape (fully rounded)
 */
export function Badge({
  colorScheme = "gray",
  variant = "subtle",
  size = "md",
  children,
  className,
}: BadgeProps) {
  const colorConfig = getColorConfig(variant, colorScheme);
  const sizeProps = sizeConfig[size];

  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      px={sizeProps.px}
      py={sizeProps.py}
      fontSize={sizeProps.fontSize}
      fontWeight="medium"
      lineHeight="tight"
      rounded="full"
      bg={colorConfig.bg as any}
      color={colorConfig.color as any}
      className={clsx(styles.badge, className)}
    >
      {children}
    </Box>
  );
}
