import { useState } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./avatar.module.css";

// ============================================================================
// Types
// ============================================================================

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export type AvatarProps = {
  /** Image source URL */
  src?: string;
  /** Name for generating initials fallback */
  name?: string;
  /** Size variant */
  size?: AvatarSize;
  /** Border radius */
  rounded?: "full" | "md";
  /** Alt text for image */
  alt?: string;
  /** Additional class name */
  className?: string;
};

// ============================================================================
// Size configurations
// ============================================================================

const sizeConfig = {
  sm: { dimension: "32px", fontSize: "xs" },
  md: { dimension: "40px", fontSize: "sm" },
  lg: { dimension: "48px", fontSize: "md" },
  xl: { dimension: "64px", fontSize: "lg" },
} as const;

// ============================================================================
// Helpers
// ============================================================================

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

// ============================================================================
// Component
// ============================================================================

/**
 * Avatar - User/entity display
 *
 * A circular or rounded avatar component:
 * - Shows image when src is provided
 * - Falls back to initials from name
 * - Falls back to generic placeholder if neither
 *
 * Features:
 * - 4 sizes: sm (32px), md (40px), lg (48px), xl (64px)
 * - 2 rounded variants: full (circle), md (rounded corners)
 * - Graceful image loading with error fallback
 */
export function Avatar({
  src,
  name,
  size = "md",
  rounded = "full",
  alt,
  className,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const sizeProps = sizeConfig[size];
  const showImage = src && !hasError;
  const initials = name ? getInitials(name) : "";

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      overflow="hidden"
      rounded={rounded}
      bg="primary-subtle"
      color="primary"
      fontWeight="medium"
      fontSize={sizeProps.fontSize}
      className={clsx(styles.avatar, className)}
      style={{
        width: sizeProps.dimension,
        height: sizeProps.dimension,
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className={styles.image}
          onError={() => setHasError(true)}
        />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={styles.placeholder}
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )}
    </Box>
  );
}
