import { type ReactNode, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
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
 * - Renders via portal
 */
export function Popover({
  content,
  placement = "bottom",
  closeOnBlur = true,
  className,
  children,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = triggerRect.top - popoverRect.height - gap;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + gap;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left - popoverRect.width - gap;
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + gap;
        break;
    }

    setPosition({ top: top + window.scrollY, left: left + window.scrollX });
  };

  useEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen, placement]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen || !closeOnBlur) return;

    const handleClick = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        popoverRef.current?.contains(e.target as Node)
      )
        return;
      setIsOpen(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen, closeOnBlur]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
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
