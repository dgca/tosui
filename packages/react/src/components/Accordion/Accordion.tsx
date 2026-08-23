"use client";

import {
  Children,
  type ReactNode,
  createContext,
  useContext,
  useId,
  useState,
} from "react";
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
const AccordionItemIndexContext = createContext<number | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionItem must be used within Accordion");
  return context;
}

// ============================================================================
// Types
// ============================================================================

type AccordionBaseProps = {
  /** Additional class name */
  className?: string;
  /** Accordion items */
  children?: ReactNode;
};

type AccordionSingleProps = AccordionBaseProps & {
  /** Use single-item expansion */
  allowMultiple?: false;
  /** Expanded index for controlled usage, or null when collapsed */
  index?: number | null;
  /** Default expanded index for uncontrolled usage */
  defaultIndex?: number;
  /** Called with the requested expanded index after a user toggle */
  onChange?: (index: number | null) => void;
};

type AccordionMultipleProps = AccordionBaseProps & {
  /** Allow multiple items expanded */
  allowMultiple: true;
  /** Expanded indexes for controlled usage */
  index?: number[];
  /** Default expanded indexes for uncontrolled usage */
  defaultIndex?: number[];
  /** Called with the requested expanded indexes after a user toggle */
  onChange?: (index: number[]) => void;
};

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export type AccordionItemProps = {
  /** Optional item index override; defaults to the item's position */
  index?: number;
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
export function Accordion(props: AccordionProps) {
  const { index: controlledIndex, defaultIndex, className, children } = props;
  const allowMultiple = props.allowMultiple ?? false;
  const [internalExpandedIndex, setInternalExpandedIndex] = useState<
    number | number[] | null
  >(defaultIndex ?? (allowMultiple ? [] : null));
  const isControlled = controlledIndex !== undefined;
  const expandedIndex = isControlled
    ? controlledIndex
    : internalExpandedIndex;

  const toggleIndex = (index: number) => {
    if (props.allowMultiple) {
      const current = Array.isArray(expandedIndex) ? expandedIndex : [];
      const newExpanded = current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index];
      if (!isControlled) setInternalExpandedIndex(newExpanded);
      props.onChange?.(newExpanded);
    } else {
      const newExpanded = expandedIndex === index ? null : index;
      if (!isControlled) setInternalExpandedIndex(newExpanded);
      props.onChange?.(newExpanded);
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
        {Children.toArray(children).map((child, index) => (
          <AccordionItemIndexContext.Provider value={index} key={index}>
            {child}
          </AccordionItemIndexContext.Provider>
        ))}
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
  const automaticIndex = useContext(AccordionItemIndexContext);
  const itemIndex = index ?? automaticIndex;
  if (itemIndex === null) {
    throw new Error("AccordionItem must be a direct child of Accordion");
  }

  const isExpanded = allowMultiple
    ? ((expandedIndex as number[]) || []).includes(itemIndex)
    : expandedIndex === itemIndex;
  const id = useId();
  const triggerId = `accordion-trigger-${id}`;
  const panelId = `accordion-panel-${id}`;

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
        onClick={() => !disabled && toggleIndex(itemIndex)}
        id={triggerId}
        aria-expanded={isExpanded}
        aria-disabled={disabled}
        aria-controls={panelId}
        className={styles.button}
      >
        <Box fontWeight="medium">{title}</Box>
        <Box
          as="span"
          className={clsx(styles.icon, isExpanded && styles.rotated)}
        >
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="m4 6 4 4 4-4" />
          </svg>
        </Box>
      </Box>
      <Box
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isExpanded}
        inert={!isExpanded}
        className={clsx(
          styles.content,
          isExpanded && styles.contentExpanded
        )}
      >
        <Box className={styles.contentInner}>
          <Box p={4}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
