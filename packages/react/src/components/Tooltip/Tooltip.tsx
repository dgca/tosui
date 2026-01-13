import { type ReactNode, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./tooltip.module.css";

// ============================================================================
// Types
// ============================================================================

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export type TooltipProps = {
  /** Tooltip content */
  label: ReactNode;
  /** Placement of tooltip */
  placement?: TooltipPlacement;
  /** Delay before showing (ms) */
  openDelay?: number;
  /** Delay before hiding (ms) */
  closeDelay?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when tooltip opens */
  onOpen?: () => void;
  /** Callback when tooltip closes */
  onClose?: () => void;
  /** Additional class name */
  className?: string;
  /** Trigger element */
  children: ReactNode;
};

// ============================================================================
// Component
// ============================================================================

/**
 * Tooltip - Hover-triggered information overlay
 *
 * A tooltip component that:
 * - Shows on hover and focus
 * - Positions relative to trigger element
 * - Supports configurable delays
 * - Supports controlled mode via isOpen/onOpen/onClose
 * - Renders via portal
 */
export function Tooltip({
  label,
  placement = "top",
  openDelay = 0,
  closeDelay = 0,
  disabled = false,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  className,
  children,
}: TooltipProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const openTimeoutRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = triggerRect.top - tooltipRect.height - gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - gap;
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + gap;
        break;
    }

    setPosition({ top: top + window.scrollY, left: left + window.scrollX });
  };

  useEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen, placement]);

  const setOpen = (open: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(open);
    }
    if (open) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const handleOpen = () => {
    if (disabled) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

    if (openDelay > 0) {
      openTimeoutRef.current = window.setTimeout(() => setOpen(true), openDelay);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);

    if (closeDelay > 0) {
      closeTimeoutRef.current = window.setTimeout(
        () => setOpen(false),
        closeDelay
      );
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <Box
        as="span"
        ref={triggerRef}
        display="inline-block"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
      >
        {children}
      </Box>
      {isOpen &&
        createPortal(
          <Box
            ref={tooltipRef}
            position="absolute"
            px={2}
            py={1}
            bg="foreground"
            color="foreground-inverted"
            fontSize="sm"
            rounded="sm"
            shadow="md"
            zIndex="tooltip"
            className={clsx(styles.tooltip, styles[placement], className)}
            style={{ top: position.top, left: position.left }}
            role="tooltip"
          >
            {label}
          </Box>,
          document.body
        )}
    </>
  );
}
