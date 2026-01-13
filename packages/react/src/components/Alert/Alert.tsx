import { type ReactNode } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import { HStack } from "@/components/HStack/HStack";
import { VStack } from "@/components/VStack/VStack";
import styles from "./alert.module.css";

// ============================================================================
// Types
// ============================================================================

export type AlertStatus = "success" | "warning" | "error" | "info";

export type AlertProps = {
  /** Status determines colors and default icon */
  status?: AlertStatus;
  /** Optional title displayed above description */
  title?: ReactNode;
  /** Description content */
  children?: ReactNode;
  /** Custom icon (overrides default per-status icon) */
  icon?: ReactNode;
  /** Callback when close button is clicked (omit to hide close button) */
  onClose?: () => void;
  /** Additional class name */
  className?: string;
};

// ============================================================================
// Default icons per status (simple SVG)
// ============================================================================

const defaultIcons: Record<AlertStatus, ReactNode> = {
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

// ============================================================================
// Close button icon
// ============================================================================

const CloseIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

/**
 * Alert - Status notification banner
 *
 * A contextual feedback component that provides:
 * - Four status variants: success, warning, error, info
 * - Optional title and description
 * - Default icons per status (customizable)
 * - Optional close button
 * - Accessible with role="alert"
 */
export function Alert({
  status = "info",
  title,
  children,
  icon,
  onClose,
  className,
}: AlertProps) {
  const displayIcon = icon ?? defaultIcons[status];

  return (
    <Box
      role="alert"
      p={4}
      rounded="md"
      bg={`${status}-subtle` as any}
      className={clsx(styles.alert, styles[status], className)}
    >
      <HStack gap={3} align="start">
        {/* Icon */}
        <Box
          as="span"
          display="inline-flex"
          alignItems="center"
          flexShrink={0}
          color={status as any}
          aria-hidden="true"
        >
          {displayIcon}
        </Box>

        {/* Content */}
        <VStack gap={1} flexGrow={1}>
          {title && (
            <Box as="span" fontWeight="semibold" color="foreground">
              {title}
            </Box>
          )}
          {children && (
            <Box as="span" color="foreground-muted" fontSize="sm">
              {children}
            </Box>
          )}
        </VStack>

        {/* Close button */}
        {onClose && (
          <Box
            as="button"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            p={1}
            rounded="sm"
            bg="transparent"
            color="foreground-muted"
            cursor="pointer"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Dismiss"
          >
            {CloseIcon}
          </Box>
        )}
      </HStack>
    </Box>
  );
}
