import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button";
import { HStack } from "@/components/HStack";
import styles from "./pagination.module.css";

// ============================================================================
// Types
// ============================================================================

export type PaginationProps = {
  /** Current page (1-indexed) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of sibling pages to show */
  siblings?: number;
  /** Show first/last page buttons */
  showEdges?: boolean;
  /** Additional class name */
  className?: string;
};

// ============================================================================
// Helpers
// ============================================================================

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPaginationRange(
  page: number,
  totalPages: number,
  siblings: number
): (number | "ellipsis")[] {
  const totalNumbers = siblings * 2 + 3; // siblings on each side + current + 2 edges

  if (totalPages <= totalNumbers + 2) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(page - siblings, 1);
  const rightSiblingIndex = Math.min(page + siblings, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, 3 + siblings * 2);
    return [...leftRange, "ellipsis", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(totalPages - (2 + siblings * 2), totalPages);
    return [1, "ellipsis", ...rightRange];
  }

  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
}

// ============================================================================
// Component
// ============================================================================

/**
 * Pagination - Page navigation component
 *
 * A pagination component that provides:
 * - Current page indicator
 * - Previous/next buttons
 * - Optional first/last page buttons
 * - Ellipsis for large page ranges
 * - Sibling page configuration
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblings = 1,
  showEdges = true,
  className,
}: PaginationProps) {
  const pages = getPaginationRange(page, totalPages, siblings);

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <Box
      as="nav"
      aria-label="Pagination"
      className={clsx(styles.pagination, className)}
    >
      <HStack gap={1}>
        {showEdges && (
          <Button
            variant="ghost"
            size="sm"
            disabled={!canGoPrev}
            onClick={() => onPageChange(1)}
            aria-label="First page"
          >
            ««
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          disabled={!canGoPrev}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          «
        </Button>

        {pages.map((p, index) =>
          p === "ellipsis" ? (
            <Box
              key={`ellipsis-${index}`}
              display="flex"
              alignItems="center"
              justifyContent="center"
              px={2}
              color="foreground-muted"
              fontSize="sm"
            >
              …
            </Box>
          ) : (
            <Button
              key={p}
              variant={p === page ? "solid" : "ghost"}
              size="sm"
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </Button>
          )
        )}

        <Button
          variant="ghost"
          size="sm"
          disabled={!canGoNext}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          »
        </Button>

        {showEdges && (
          <Button
            variant="ghost"
            size="sm"
            disabled={!canGoNext}
            onClick={() => onPageChange(totalPages)}
            aria-label="Last page"
          >
            »»
          </Button>
        )}
      </HStack>
    </Box>
  );
}
