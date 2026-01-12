import { type InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./switch.module.css";

// ============================================================================
// Types
// ============================================================================

export type SwitchSize = "sm" | "md" | "lg";

export type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  /** Switch size affecting track and thumb dimensions */
  size?: SwitchSize;
  /** Whether the switch is disabled */
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
  sm: { trackWidth: 32, trackHeight: 18, thumb: 14, fontSize: "sm" },
  md: { trackWidth: 40, trackHeight: 22, thumb: 18, fontSize: "md" },
  lg: { trackWidth: 48, trackHeight: 26, thumb: 22, fontSize: "lg" },
} as const;

// ============================================================================
// Component
// ============================================================================

/**
 * Switch - Toggle switch component
 *
 * A styled switch component that provides:
 * - Sizes: sm, md (default), lg
 * - Sliding thumb animation
 * - Optional inline label
 * - Disabled state
 * - Focus ring styling
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
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
      {/* Hidden native checkbox with switch role */}
      <input
        type="checkbox"
        role="switch"
        ref={ref}
        checked={isChecked}
        disabled={isDisabled}
        className={styles.input}
        {...rest}
      />

      {/* Custom track */}
      <Box
        as="span"
        display="inline-flex"
        alignItems="center"
        rounded="full"
        flexShrink={0}
        className={styles.track}
        style={
          {
            width: sizeProps.trackWidth,
            height: sizeProps.trackHeight,
            "--switch-thumb-size": `${sizeProps.thumb}px`,
            "--switch-track-width": `${sizeProps.trackWidth}px`,
          } as React.CSSProperties
        }
      >
        {/* Thumb */}
        <Box
          as="span"
          rounded="full"
          bg="background"
          className={styles.thumb}
          style={{
            width: sizeProps.thumb,
            height: sizeProps.thumb,
          }}
        />
      </Box>

      {/* Optional label */}
      {label && (
        <Box as="span" fontSize={sizeProps.fontSize} color="foreground">
          {label}
        </Box>
      )}
    </Box>
  );
});
