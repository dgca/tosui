import { type ReactNode } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./list.module.css";

// ============================================================================
// Types
// ============================================================================

export type ListStyleType = "none" | "disc" | "decimal";

export type ListProps = {
  /** List element type */
  as?: "ul" | "ol";
  /** List style type */
  styleType?: ListStyleType;
  /** Spacing between items (gap multiplier) */
  spacing?: number;
  /** Additional class name */
  className?: string;
  /** List items */
  children?: ReactNode;
};

export type ListItemProps = {
  /** Additional class name */
  className?: string;
  /** Item content */
  children?: ReactNode;
};

export type ListIconProps = {
  /** Additional class name */
  className?: string;
  /** Icon content */
  children?: ReactNode;
};

// ============================================================================
// Components
// ============================================================================

/**
 * List - Semantic list container
 *
 * A list component supporting:
 * - Unordered (ul) or ordered (ol) lists
 * - Various list style types
 * - Configurable spacing between items
 */
export function List({
  as = "ul",
  styleType,
  spacing = 0,
  className,
  children,
}: ListProps) {
  const defaultStyleType = as === "ol" ? "decimal" : "none";
  const actualStyleType = styleType ?? defaultStyleType;

  return (
    <Box
      as={as}
      display="flex"
      flexDirection="column"
      gap={spacing}
      className={clsx(styles.list, styles[actualStyleType], className)}
    >
      {children}
    </Box>
  );
}

/**
 * ListItem - Individual list item
 *
 * Use inside List for semantic list items.
 */
export function ListItem({ className, children }: ListItemProps) {
  return (
    <Box as="li" display="flex" alignItems="center" className={clsx(styles.listItem, className)}>
      {children}
    </Box>
  );
}

/**
 * ListIcon - Icon prefix for list items
 *
 * Use inside ListItem to add an icon before content.
 */
export function ListIcon({ className, children }: ListIconProps) {
  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      mr={2}
      color="primary"
      className={clsx(styles.listIcon, className)}
    >
      {children}
    </Box>
  );
}
