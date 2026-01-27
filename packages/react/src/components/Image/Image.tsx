"use client";

import { useState, type CSSProperties } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import type { RoundedValue } from "@/components/Box/roundness/roundness";
import styles from "./image.module.css";

// ============================================================================
// Types
// ============================================================================

export type ImageObjectFit = "cover" | "contain" | "fill" | "none";

export type ImageProps = {
  /** Image source URL */
  src: string;
  /** Alt text (required for accessibility) */
  alt: string;
  /** Width (CSS value) */
  w?: string;
  /** Height (CSS value) */
  h?: string;
  /** Object fit behavior */
  objectFit?: ImageObjectFit;
  /** Fallback source if main image fails */
  fallbackSrc?: string;
  /** Border radius */
  rounded?: RoundedValue;
  /** Additional class name */
  className?: string;
};

// ============================================================================
// Component
// ============================================================================

/**
 * Image - Enhanced img element
 *
 * An image component with:
 * - Loading state with Skeleton placeholder
 * - Error fallback support
 * - Object-fit options
 * - Rounded corner variants
 */
export function Image({
  src,
  alt,
  w,
  h,
  objectFit = "cover",
  fallbackSrc,
  rounded = "none",
  className,
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const style: CSSProperties = {
    width: w,
    height: h,
  };

  if (hasError) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="surface"
        color="foreground-muted"
        rounded={rounded}
        className={clsx(styles.placeholder, className)}
        style={style}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={styles.placeholderIcon}
        >
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      </Box>
    );
  }

  return (
    <Box
      position="relative"
      display="inline-block"
      overflow="hidden"
      rounded={rounded}
      className={clsx(styles.container, className)}
      style={style}
    >
      {isLoading && (
        <Skeleton
          w="100%"
          h="100%"
          rounded={rounded}
          className={styles.skeleton}
        />
      )}
      <img
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={clsx(
          styles.image,
          styles[objectFit],
          isLoading && styles.hidden
        )}
      />
    </Box>
  );
}
