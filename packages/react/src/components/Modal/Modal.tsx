import { type ReactNode, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./modal.module.css";

// ============================================================================
// Types
// ============================================================================

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export type ModalProps = {
  /** Whether modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal size */
  size?: ModalSize;
  /** Close on backdrop click */
  closeOnOverlayClick?: boolean;
  /** Close on Escape key */
  closeOnEsc?: boolean;
  /** Additional class name */
  className?: string;
  /** Modal content */
  children?: ReactNode;
};

export type ModalHeaderProps = {
  /** Additional class name */
  className?: string;
  /** Header content */
  children?: ReactNode;
};

export type ModalBodyProps = {
  /** Additional class name */
  className?: string;
  /** Body content */
  children?: ReactNode;
};

export type ModalFooterProps = {
  /** Additional class name */
  className?: string;
  /** Footer content */
  children?: ReactNode;
};

// ============================================================================
// Size configuration
// ============================================================================

const sizeConfig = {
  sm: "400px",
  md: "500px",
  lg: "700px",
  xl: "900px",
  full: "100%",
} as const;

// ============================================================================
// Components
// ============================================================================

/**
 * Modal - Dialog overlay component
 *
 * A modal dialog that:
 * - Renders via portal to document.body
 * - Traps focus when open
 * - Prevents body scroll when open
 * - Closes on backdrop click and Escape key
 * - Returns focus after closing
 */
export function Modal({
  isOpen,
  onClose,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store previous focus and focus modal when open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  if (!isOpen) return null;

  return createPortal(
    <Box
      className={clsx(styles.overlay, className)}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <Box
        ref={modalRef}
        tabIndex={-1}
        bg="surface"
        rounded={size === "full" ? "none" : "lg"}
        shadow="lg"
        maxH={size === "full" ? "100vh" : "90vh"}
        overflow="auto"
        className={styles.modal}
        style={{
          width: sizeConfig[size],
          maxWidth: size === "full" ? "100%" : "calc(100% - 2rem)",
        }}
      >
        {children}
      </Box>
    </Box>,
    document.body
  );
}

/**
 * ModalHeader - Header section for modal
 */
export function ModalHeader({ className, children }: ModalHeaderProps) {
  return (
    <Box
      px={6}
      py={4}
      borderBottom="thin"
      borderColor="border"
      className={clsx(styles.header, className)}
    >
      {children}
    </Box>
  );
}

/**
 * ModalBody - Body section for modal
 */
export function ModalBody({ className, children }: ModalBodyProps) {
  return (
    <Box px={6} py={4} className={clsx(styles.body, className)}>
      {children}
    </Box>
  );
}

/**
 * ModalFooter - Footer section for modal
 */
export function ModalFooter({ className, children }: ModalFooterProps) {
  return (
    <Box
      px={6}
      py={4}
      borderTop="thin"
      borderColor="border"
      display="flex"
      justifyContent="end"
      gap={2}
      className={clsx(styles.footer, className)}
    >
      {children}
    </Box>
  );
}
