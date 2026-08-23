"use client";

import { type ReactNode, useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useOverlayPosition } from "@/hooks/useOverlayPosition";
import styles from "./popover.module.css";

// ============================================================================
// Types
// ============================================================================

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export type PopoverProps = {
  /** Popover content */
  content: ReactNode;
  /** Placement of popover */
  placement?: PopoverPlacement;
  /** Close on outside click */
  closeOnBlur?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when popover opens */
  onOpen?: () => void;
  /** Callback when popover closes */
  onClose?: () => void;
  /** Additional class name */
  className?: string;
  /** Trigger element */
  children: ReactNode;
};

export type PopoverHeaderProps = {
  /** Additional class name */
  className?: string;
  /** Header content */
  children?: ReactNode;
};

export type PopoverBodyProps = {
  /** Additional class name */
  className?: string;
  /** Body content */
  children?: ReactNode;
};

// ============================================================================
// Components
// ============================================================================

/**
 * Popover - Click-triggered overlay with positioning
 *
 * A popover component that:
 * - Toggles on click
 * - Positions relative to trigger
 * - Closes on outside click and Escape
 * - Supports controlled mode via isOpen/onOpen/onClose
 * - Renders via portal
 */
export function Popover({
  content,
  placement = "bottom",
  closeOnBlur = true,
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  className,
  children,
}: PopoverProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback((open: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(open);
    }
    if (open) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isControlled, onOpen, onClose]);

  const position = useOverlayPosition({
    isOpen,
    placement,
    triggerRef,
    overlayRef: popoverRef,
  });

  useFocusTrap({
    isActive: isOpen,
    containerRef: popoverRef,
    onEscape: () => setOpen(false),
  });

  // Close on outside click
  useEffect(() => {
    if (!isOpen || !closeOnBlur) return;

    const handleClick = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        popoverRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen, closeOnBlur, setOpen]);

  const handleTriggerClick = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Box
        as="span"
        ref={triggerRef}
        display="inline-block"
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        cursor="pointer"
      >
        {children}
      </Box>
      {isOpen &&
        createPortal(
          <Box
            ref={popoverRef}
            tabIndex={-1}
            position="absolute"
            bg="surface"
            border="thin"
            borderColor="border"
            rounded="md"
            shadow="lg"
            zIndex="dropdown"
            minW="200px"
            className={clsx(styles.popover, className)}
            style={{ top: position.top, left: position.left }}
            role="dialog"
          >
            {content}
          </Box>,
          document.body
        )}
    </>
  );
}

/**
 * PopoverHeader - Header section for popover
 */
export function PopoverHeader({ className, children }: PopoverHeaderProps) {
  return (
    <Box
      px={4}
      py={3}
      borderBottom="thin"
      borderColor="border"
      fontWeight="medium"
      className={clsx(styles.header, className)}
    >
      {children}
    </Box>
  );
}

/**
 * PopoverBody - Body section for popover
 */
export function PopoverBody({ className, children }: PopoverBodyProps) {
  return (
    <Box px={4} py={3} className={clsx(styles.body, className)}>
      {children}
    </Box>
  );
}
