import { type ReactNode, createContext, useContext, useState } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./accordion.module.css";

// ============================================================================
// Context
// ============================================================================

type AccordionContextValue = {
  expandedIndex: number | number[] | null;
  toggleIndex: (index: number) => void;
  allowMultiple: boolean;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionItem must be used within Accordion");
  return context;
}

// ============================================================================
// Types
// ============================================================================

export type AccordionProps = {
  /** Default expanded index(es) */
  defaultIndex?: number | number[];
  /** Allow multiple items expanded */
  allowMultiple?: boolean;
  /** Additional class name */
  className?: string;
  /** Accordion items */
  children?: ReactNode;
};

export type AccordionItemProps = {
  /** Item index (set manually) */
  index: number;
  /** Item title */
  title: ReactNode;
  /** Whether disabled */
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
 * Accordion - Collapsible sections container
 *
 * An accordion component that:
 * - Supports single or multiple expanded items
 * - Uses context for state management
 * - Animated expand/collapse
 */
export function Accordion({
  defaultIndex,
  allowMultiple = false,
  className,
  children,
}: AccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<
    number | number[] | null
  >(defaultIndex ?? (allowMultiple ? [] : null));

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      const current = (expandedIndex as number[]) || [];
      const newExpanded = current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index];
      setExpandedIndex(newExpanded);
    } else {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  return (
    <AccordionContext.Provider
      value={{ expandedIndex, toggleIndex, allowMultiple }}
    >
      <Box
        border="thin"
        borderColor="border"
        rounded="md"
        overflow="hidden"
        className={clsx(styles.accordion, className)}
      >
        {children}
      </Box>
    </AccordionContext.Provider>
  );
}

/**
 * AccordionItem - Individual collapsible section
 */
export function AccordionItem({
  index,
  title,
  disabled = false,
  className,
  children,
}: AccordionItemProps) {
  const { expandedIndex, toggleIndex, allowMultiple } = useAccordionContext();

  const isExpanded = allowMultiple
    ? ((expandedIndex as number[]) || []).includes(index)
    : expandedIndex === index;

  return (
    <Box
      className={clsx(
        styles.item,
        isExpanded && styles.expanded,
        disabled && styles.disabled,
        className
      )}
    >
      <Box
        as="button"
        type="button"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        p={4}
        bg="transparent"
        border="none"
        borderBottom={isExpanded ? "thin" : "none"}
        borderColor="border"
        cursor={disabled ? "not-allowed" : "pointer"}
        opacity={disabled ? "faint" : undefined}
        onClick={() => !disabled && toggleIndex(index)}
        aria-expanded={isExpanded}
        aria-disabled={disabled}
        className={styles.button}
      >
        <Box fontWeight="medium">{title}</Box>
        <Box
          as="span"
          className={clsx(styles.icon, isExpanded && styles.rotated)}
        >
          ▾
        </Box>
      </Box>
      {isExpanded && (
        <Box p={4} className={styles.content}>
          {children}
        </Box>
      )}
    </Box>
  );
}
