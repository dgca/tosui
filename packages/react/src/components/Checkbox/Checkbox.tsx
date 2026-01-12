import { type InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./checkbox.module.css";

// ============================================================================
// Types
// ============================================================================

export type CheckboxSize = "sm" | "md" | "lg";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  /** Checkbox size affecting box dimensions */
  size?: CheckboxSize;
  /** Whether the checkbox is disabled */
  isDisabled?: boolean;
  /** Whether the checkbox is in an invalid state */
  isInvalid?: boolean;
  /** Controlled checked state */
  isChecked?: boolean;
  /** Optional label text displayed to the right */
  label?: string;
};

// ============================================================================
// Size configurations
// ============================================================================

const sizeConfig = {
  sm: { box: 16, fontSize: "sm" },
  md: { box: 20, fontSize: "md" },
  lg: { box: 24, fontSize: "lg" },
} as const;

// ============================================================================
// Component
// ============================================================================

/**
 * Checkbox - Toggle checkbox component
 *
 * A styled checkbox component that provides:
 * - Sizes: sm, md (default), lg
 * - Custom styled box with checkmark
 * - Optional inline label
 * - Disabled and invalid states
 * - Focus ring styling
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      size = "md",
      isDisabled = false,
      isInvalid = false,
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
        {/* Hidden native checkbox */}
        <input
          type="checkbox"
          ref={ref}
          checked={isChecked}
          disabled={isDisabled}
          aria-invalid={isInvalid || undefined}
          className={styles.input}
          {...rest}
        />

        {/* Custom visual checkbox */}
        <Box
          as="span"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          rounded="sm"
          border="thin"
          borderColor={isInvalid ? "error" : "border"}
          flexShrink={0}
          className={clsx(styles.box, isInvalid && styles.invalid)}
          style={{
            width: sizeProps.box,
            height: sizeProps.box,
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
  }
);
