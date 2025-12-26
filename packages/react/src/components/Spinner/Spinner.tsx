import { type ElementType } from "react";
import * as stylex from "@stylexjs/stylex";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";

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
// Styles - Animation that Box can't handle
// ============================================================================

const spin = stylex.keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

const styles = stylex.create({
  spinner: {
    animationDuration: "0.6s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
    borderBottomColor: "currentColor",
    borderLeftColor: "currentColor",
    borderRadius: "50%",
    borderRightColor: "currentColor",
    borderStyle: "solid",
    borderTopColor: "transparent",
  },
});

// ============================================================================
// Size configurations using Box props
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
  ...rest
}: SpinnerProps<T>) {
  const Component = as || "span";
  const sizeProps = sizeConfig[size];

  const { className: stylexClassName, style: stylexStyle } =
    stylex.props(styles.spinner);

  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box
      as={Component}
      display="inline-block"
      // Size from config
      w={sizeProps.w}
      h={sizeProps.h}
      // Border width via inline style (Box doesn't have borderWidth as arbitrary value)
      style={{ borderWidth: sizeProps.borderWidth, ...stylexStyle }}
      // StyleX animation
      className={className ? `${stylexClassName} ${className}` : stylexClassName}
      // Accessibility
      role="status"
      aria-label="Loading"
      {...rest}
    />
  );
}
