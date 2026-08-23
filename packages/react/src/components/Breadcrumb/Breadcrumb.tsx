import {
  type ReactNode,
  Children,
  createContext,
  useContext,
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

const BreadcrumbItemContext = createContext<boolean | null>(null);

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
              <BreadcrumbItemContext.Provider value={isLast}>
                {child}
              </BreadcrumbItemContext.Provider>
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
  const automaticIsCurrentPage = useContext(BreadcrumbItemContext);
  const currentPage = automaticIsCurrentPage ?? isCurrentPage;

  if (currentPage || !href) {
    return (
      <Box
        as="span"
        color={currentPage ? "foreground" : "foreground-muted"}
        fontSize="sm"
        aria-current={currentPage ? "page" : undefined}
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
