import {
  type ReactNode,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import styles from "./breadcrumb.module.css";

// ============================================================================
// Types
// ============================================================================

export type BreadcrumbProps = {
  /** Separator between items */
  separator?: ReactNode;
  /** Additional class name */
  className?: string;
  /** Breadcrumb items */
  children?: ReactNode;
};

export type BreadcrumbItemProps = {
  /** Link href (if not current page) */
  href?: string;
  /** Is current page (last item) - set automatically */
  isCurrentPage?: boolean;
  /** Additional class name */
  className?: string;
  /** Item content */
  children?: ReactNode;
};

// ============================================================================
// Components
// ============================================================================

/**
 * Breadcrumb - Navigation trail container
 *
 * Renders BreadcrumbItem children with separators between them.
 * Automatically marks the last item as current page.
 */
export function Breadcrumb({
  separator = "/",
  className,
  children,
}: BreadcrumbProps) {
  const items = Children.toArray(children);
  const lastIndex = items.length - 1;

  return (
    <Box
      as="nav"
      aria-label="Breadcrumb"
      className={clsx(styles.breadcrumb, className)}
    >
      <Box as="ol" display="flex" alignItems="center" gap={2} m={0} p={0}>
        {items.map((child, index) => {
          const isLast = index === lastIndex;

          return (
            <Box as="li" key={index} display="flex" alignItems="center" gap={2}>
              {isValidElement(child)
                ? cloneElement(
                    child as React.ReactElement<BreadcrumbItemProps>,
                    {
                      isCurrentPage: isLast,
                    }
                  )
                : child}
              {!isLast && (
                <Box
                  as="span"
                  color="foreground-muted"
                  aria-hidden="true"
                  className={styles.separator}
                >
                  {separator}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/**
 * BreadcrumbItem - Individual breadcrumb link or text
 *
 * Renders as a link if href is provided, otherwise as text.
 * The last item is automatically marked as current page.
 */
export function BreadcrumbItem({
  href,
  isCurrentPage = false,
  className,
  children,
}: BreadcrumbItemProps) {
  if (isCurrentPage || !href) {
    return (
      <Box
        as="span"
        color={isCurrentPage ? "foreground" : "foreground-muted"}
        fontSize="sm"
        aria-current={isCurrentPage ? "page" : undefined}
        className={clsx(styles.item, styles.current, className)}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      as="a"
      href={href}
      color="foreground-muted"
      fontSize="sm"
      className={clsx(styles.item, styles.link, className)}
    >
      {children}
    </Box>
  );
}
