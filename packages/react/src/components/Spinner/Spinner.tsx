import { type ElementType } from "react";
import clsx from "clsx";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";
import styles from "./spinner.module.css";

// ============================================================================
// Types
// ============================================================================

export type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerOwnProps = Omit<BoxOwnProps, "as"> & {
  size?: SpinnerSize;
};

export type SpinnerProps<T extends ElementType = "span"> = Polymorphic<
  T,
  SpinnerOwnProps
>;

// ============================================================================
// Size configurations
// ============================================================================

const sizeConfig = {
  sm: { w: "1em", h: "1em", borderWidth: "2px" },
  md: { w: "1.5em", h: "1.5em", borderWidth: "2px" },
  lg: { w: "2em", h: "2em", borderWidth: "3px" },
} as const;

// ============================================================================
// Component
// ============================================================================

/**
 * Spinner - Loading indicator component
 *
 * A simple spinning indicator that inherits color from its parent.
 * Uses CSS animation for smooth performance.
 */
export function Spinner<T extends ElementType = "span">({
  as,
  size = "md",
  className,
  style,
  ...rest
}: SpinnerProps<T>) {
  const Component = as || "span";
  const sizeProps = sizeConfig[size];

  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box
      as={Component}
      display="inline-block"
      w={sizeProps.w}
      h={sizeProps.h}
      style={{ borderWidth: sizeProps.borderWidth, ...style }}
      className={clsx(styles.spinner, className)}
      role="status"
      aria-label="Loading"
      {...rest}
    />
  );
}
