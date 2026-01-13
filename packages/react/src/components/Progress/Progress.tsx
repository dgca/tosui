import { type CSSProperties } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./progress.module.css";

// ============================================================================
// Types
// ============================================================================

export type ProgressColorScheme =
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

export type ProgressSize = "sm" | "md" | "lg";

export type ProgressProps = {
  /** Progress value (0-100) */
  value?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Color scheme */
  colorScheme?: ProgressColorScheme;
  /** Size */
  size?: ProgressSize;
  /** Indeterminate mode (loading without known progress) */
  isIndeterminate?: boolean;
  /** Additional class name */
  className?: string;
};

// ============================================================================
// Size configurations
// ============================================================================

const sizeConfig = {
  sm: "4px",
  md: "8px",
  lg: "12px",
} as const;

// ============================================================================
// Component
// ============================================================================

/**
 * Progress - Progress bar indicator
 *
 * A visual indicator of completion progress:
 * - Value-based: shows percentage complete
 * - Indeterminate: animated loading state
 *
 * Features:
 * - 6 color schemes
 * - 3 sizes (sm, md, lg)
 * - Accessible with role="progressbar" and ARIA attributes
 */
export function Progress({
  value = 0,
  max = 100,
  colorScheme = "primary",
  size = "md",
  isIndeterminate = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const height = sizeConfig[size];

  return (
    <Box
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={max}
      position="relative"
      overflow="hidden"
      rounded="full"
      bg="surface"
      className={clsx(styles.track, className)}
      style={{ "--progress-height": height } as CSSProperties}
    >
      <Box
        position="absolute"
        inset={0}
        rounded="full"
        bg={`${colorScheme}-default` as any}
        className={clsx(
          styles.fill,
          isIndeterminate && styles.indeterminate
        )}
        style={
          isIndeterminate
            ? undefined
            : ({ "--progress-width": `${percentage}%` } as CSSProperties)
        }
      />
    </Box>
  );
}
