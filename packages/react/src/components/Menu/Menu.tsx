import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import { Button, type ButtonProps } from "@/components/Button";
import styles from "./menu.module.css";

// ============================================================================
// Context
// ============================================================================

type MenuContextValue = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
};

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("Menu components must be used within Menu");
  return context;
}

// ============================================================================
// Types
// ============================================================================

export type MenuProps = {
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when menu opens */
  onOpen?: () => void;
  /** Callback when menu closes */
  onClose?: () => void;
  /** Additional class name */
  className?: string;
  /** Menu components */
  children?: ReactNode;
};

export type MenuButtonProps = Omit<ButtonProps<"button">, "as"> & {
  /** Button content */
  children?: ReactNode;
};

export type MenuListProps = {
  /** Additional class name */
  className?: string;
  /** Menu items */
  children?: ReactNode;
};

export type MenuItemProps = {
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** Item content */
  children?: ReactNode;
};

// ============================================================================
// Components
// ============================================================================

/**
 * Menu - Dropdown menu container
 *
 * Provides context for MenuButton, MenuList, and MenuItem.
 * Handles open/close state and click-outside behavior.
 * Supports controlled mode via isOpen/onOpen/onClose.
 */
export function Menu({
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  className,
  children,
}: MenuProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (buttonRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen: setOpen, buttonRef }}>
      <Box
        position="relative"
        display="inline-block"
        className={clsx(styles.menu, className)}
      >
        {children}
      </Box>
    </MenuContext.Provider>
  );
}

/**
 * MenuButton - Trigger button for the menu
 *
 * Renders as a Button component with dropdown indicators.
 */
export function MenuButton({ children, className, ...rest }: MenuButtonProps) {
  const { isOpen, setIsOpen, buttonRef } = useMenuContext();

  return (
    <Button
      ref={buttonRef}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      className={className}
      {...rest}
    >
      {children}
    </Button>
  );
}

/**
 * MenuList - Dropdown container for menu items
 *
 * Only renders when menu is open.
 */
export function MenuList({ className, children }: MenuListProps) {
  const { isOpen } = useMenuContext();

  if (!isOpen) return null;

  return (
    <Box
      role="menu"
      position="absolute"
      top="100%"
      left={0}
      mt={1}
      py={1}
      minW="160px"
      bg="surface"
      border="thin"
      borderColor="border"
      rounded="md"
      shadow="md"
      zIndex="dropdown"
      className={clsx(styles.menuList, className)}
    >
      {children}
    </Box>
  );
}

/**
 * MenuItem - Individual menu item
 *
 * Closes the menu when clicked (unless disabled).
 */
export function MenuItem({
  onClick,
  disabled = false,
  className,
  children,
}: MenuItemProps) {
  const { setIsOpen } = useMenuContext();

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setIsOpen(false);
  };

  return (
    <Box
      as="button"
      type="button"
      role="menuitem"
      onClick={handleClick}
      disabled={disabled}
      display="flex"
      alignItems="center"
      w="100%"
      py={2}
      px={3}
      fontSize="sm"
      color={disabled ? "foreground-muted" : "foreground"}
      bg="transparent"
      border="none"
      cursor={disabled ? "not-allowed" : "pointer"}
      textAlign="left"
      className={clsx(styles.menuItem, disabled && styles.disabled, className)}
    >
      {children}
    </Box>
  );
}
