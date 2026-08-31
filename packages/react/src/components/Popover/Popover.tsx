"use client";

import {
  Fragment,
  cloneElement,
  isValidElement,
  type AriaAttributes,
  type KeyboardEvent,
  type MouseEventHandler,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useIsClient } from "@/hooks/useIsClient";
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
  /** Accessible name for the dialog */
  "aria-label"?: string;
  /** ID of the element that labels the dialog */
  "aria-labelledby"?: string;
  /** Trigger element */
  children: ReactNode;
};

type TriggerProps = Pick<
  AriaAttributes,
  "aria-controls" | "aria-expanded" | "aria-haspopup"
> & {
  onClick?: MouseEventHandler;
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

function mergeIds(existingIds: string | undefined, addedId: string): string {
  return Array.from(
    new Set([...(existingIds?.split(/\s+/).filter(Boolean) ?? []), addedId])
  ).join(" ");
}

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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  children,
}: PopoverProps) {
  const isClient = useIsClient();
  const generatedId = useId();
  const popoverId = `popover-${generatedId}`;
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

  const triggerElement =
    isValidElement<TriggerProps>(children) && children.type !== Fragment
      ? children
      : null;
  const triggerControls = mergeIds(
    triggerElement?.props["aria-controls"],
    popoverId
  );

  const handleTriggerClick: MouseEventHandler = (event) => {
    triggerElement?.props.onClick?.(event);
    if (!event.defaultPrevented) {
      setOpen(!isOpen);
    }
  };

  const handleFallbackKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(!isOpen);
    }
  };

  const trigger = triggerElement
    ? cloneElement(triggerElement, {
        onClick: handleTriggerClick,
        "aria-controls": triggerControls,
        "aria-expanded": isOpen,
        "aria-haspopup": "dialog",
      })
    : children;

  return (
    <>
      <Box
        as="span"
        ref={triggerRef}
        display="inline-block"
        onClick={triggerElement ? undefined : handleTriggerClick}
        onKeyDown={triggerElement ? undefined : handleFallbackKeyDown}
        role={triggerElement ? undefined : "button"}
        tabIndex={triggerElement ? undefined : 0}
        aria-controls={triggerElement ? undefined : triggerControls}
        aria-expanded={triggerElement ? undefined : isOpen}
        aria-haspopup={triggerElement ? undefined : "dialog"}
        cursor="pointer"
      >
        {trigger}
      </Box>
      {isOpen &&
        isClient &&
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
            id={popoverId}
            role="dialog"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
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
