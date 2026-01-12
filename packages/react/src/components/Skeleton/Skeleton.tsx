import { type ReactNode, type CSSProperties } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import type { RoundedValue } from "@/components/Box/roundness/roundness";
import styles from "./skeleton.module.css";

// ============================================================================
// Types
// ============================================================================

export type SkeletonProps = {
  /** Width (CSS value) */
  w?: string;
  /** Height (CSS value) */
  h?: string;
  /** Border radius */
  rounded?: RoundedValue;
  /** When true, shows children instead of skeleton */
  isLoaded?: boolean;
  /** Content to show when loaded */
  children?: ReactNode;
  /** Additional class name */
  className?: string;
};

// ============================================================================
// Component
// ============================================================================

/**
 * Skeleton - Loading placeholder
 *
 * A shimmer animation placeholder for content:
 * - Shows animated skeleton when loading
 * - Reveals children when isLoaded is true
 *
 * Features:
 * - Configurable width and height
 * - Rounded corners
 * - Shimmer animation
 */
export function Skeleton({
  w,
  h,
  rounded = "md",
  isLoaded = false,
  children,
  className,
}: SkeletonProps) {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <Box
      display="inline-block"
      position="relative"
      overflow="hidden"
      rounded={rounded}
      bg="surface"
      className={clsx(styles.skeleton, className)}
      style={
        {
          "--skeleton-width": w,
          "--skeleton-height": h,
        } as CSSProperties
      }
      aria-hidden="true"
    />
  );
}
