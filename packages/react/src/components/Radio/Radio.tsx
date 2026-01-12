import { type InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./radio.module.css";

// ============================================================================
// Types
// ============================================================================

export type RadioSize = "sm" | "md" | "lg";

export type RadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  /** Radio size affecting circle dimensions */
  size?: RadioSize;
  /** Whether the radio is disabled */
  isDisabled?: boolean;
  /** Controlled checked state */
  isChecked?: boolean;
  /** Optional label text displayed to the right */
  label?: string;
};

// ============================================================================
// Size configurations
// ============================================================================

const sizeConfig = {
  sm: { circle: 16, fontSize: "sm" },
  md: { circle: 20, fontSize: "md" },
  lg: { circle: 24, fontSize: "lg" },
} as const;

// ============================================================================
// Component
// ============================================================================

/**
 * Radio - Radio button component
 *
 * A styled radio component that provides:
 * - Sizes: sm, md (default), lg
 * - Custom styled circle with inner dot
 * - Optional inline label
 * - Disabled state
 * - Focus ring styling
 * - Use name prop to group radios together
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    size = "md",
    isDisabled = false,
    isChecked,
    label,
    className,
    style,
    ...rest
  },
  ref
) {
  const sizeProps = sizeConfig[size];

  return (
    <Box
      as="label"
      display="inline-flex"
      alignItems="center"
      gap={2}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      opacity={isDisabled ? "faint" : undefined}
      className={clsx(styles.wrapper, className)}
      style={style}
    >
      {/* Hidden native radio */}
      <input
        type="radio"
        ref={ref}
        checked={isChecked}
        disabled={isDisabled}
        className={styles.input}
        {...rest}
      />

      {/* Custom visual radio circle */}
      <Box
        as="span"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        rounded="full"
        border="thin"
        borderColor="border"
        flexShrink={0}
        className={styles.circle}
        style={{
          width: sizeProps.circle,
          height: sizeProps.circle,
        }}
      />

      {/* Optional label */}
      {label && (
        <Box as="span" fontSize={sizeProps.fontSize} color="foreground">
          {label}
        </Box>
      )}
    </Box>
  );
});
