import { type ReactNode, createContext, useContext, useState } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./tabs.module.css";

// ============================================================================
// Context
// ============================================================================

type TabsContextValue = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab components must be used within Tabs");
  return context;
}

// ============================================================================
// Types
// ============================================================================

export type TabsVariant = "line" | "enclosed";

export type TabsProps = {
  /** Default active tab index */
  defaultIndex?: number;
  /** Controlled active index */
  index?: number;
  /** Callback when tab changes */
  onChange?: (index: number) => void;
  /** Visual variant */
  variant?: TabsVariant;
  /** Additional class name */
  className?: string;
  /** Tab components */
  children?: ReactNode;
};

export type TabListProps = {
  /** Additional class name */
  className?: string;
  /** Tab buttons */
  children?: ReactNode;
};

export type TabProps = {
  /** Tab index (set automatically or manually) */
  index?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** Tab label */
  children?: ReactNode;
};

export type TabPanelProps = {
  /** Panel index (set automatically or manually) */
  index?: number;
  /** Additional class name */
  className?: string;
  /** Panel content */
  children?: ReactNode;
};

// ============================================================================
// Components
// ============================================================================

/**
 * Tabs - Tab container with state management
 *
 * Provides context for Tab and TabPanel components.
 * Supports controlled (index prop) and uncontrolled (defaultIndex) modes.
 */
export function Tabs({
  defaultIndex = 0,
  index,
  onChange,
  variant = "line",
  className,
  children,
}: TabsProps) {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const activeIndex = index ?? internalIndex;

  const setActiveIndex = (newIndex: number) => {
    if (index === undefined) setInternalIndex(newIndex);
    onChange?.(newIndex);
  };

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <Box className={clsx(styles.tabs, styles[variant], className)}>
        {children}
      </Box>
    </TabsContext.Provider>
  );
}

/**
 * TabList - Horizontal container for Tab buttons
 */
export function TabList({ className, children }: TabListProps) {
  return (
    <Box
      as="div"
      role="tablist"
      display="flex"
      gap={0}
      borderBottom="thin"
      borderColor="border"
      className={clsx(styles.tabList, className)}
    >
      {children}
    </Box>
  );
}

/**
 * Tab - Individual tab button
 */
export function Tab({
  index = 0,
  disabled = false,
  className,
  children,
}: TabProps) {
  const { activeIndex, setActiveIndex } = useTabsContext();
  const isActive = activeIndex === index;

  return (
    <Box
      as="button"
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={() => !disabled && setActiveIndex(index)}
      py={2}
      px={4}
      fontSize="sm"
      fontWeight={isActive ? "medium" : "normal"}
      color={isActive ? "primary" : "foreground-muted"}
      bg="transparent"
      border="none"
      cursor={disabled ? "not-allowed" : "pointer"}
      opacity={disabled ? "faint" : undefined}
      className={clsx(styles.tab, isActive && styles.active, className)}
    >
      {children}
    </Box>
  );
}

/**
 * TabPanel - Content panel for a tab
 *
 * Only renders when its index matches the active tab.
 */
export function TabPanel({ index = 0, className, children }: TabPanelProps) {
  const { activeIndex } = useTabsContext();

  if (activeIndex !== index) return null;

  return (
    <Box role="tabpanel" p={4} className={clsx(styles.tabPanel, className)}>
      {children}
    </Box>
  );
}
