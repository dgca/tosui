import { type ReactNode } from "react";
import clsx from "clsx";
import { Box } from "@/components/Box/Box";
import type { ShadowValue } from "@/components/Box/shadows/shadows";
import styles from "./card.module.css";

// ============================================================================
// Types
// ============================================================================

export type CardProps = {
  /** Shadow level */
  shadow?: ShadowValue;
  /** Additional class name */
  className?: string;
  /** Card content */
  children?: ReactNode;
};

export type CardHeaderProps = {
  /** Additional class name */
  className?: string;
  /** Header content */
  children?: ReactNode;
};

export type CardBodyProps = {
  /** Additional class name */
  className?: string;
  /** Body content */
  children?: ReactNode;
};

export type CardFooterProps = {
  /** Additional class name */
  className?: string;
  /** Footer content */
  children?: ReactNode;
};

// ============================================================================
// Components
// ============================================================================

/**
 * Card - Content container
 *
 * A flexible content container with:
 * - Surface background with border
 * - Optional shadow elevation
 * - Composable Header/Body/Footer sections
 */
export function Card({
  shadow = "sm",
  className,
  children,
}: CardProps) {
  return (
    <Box
      bg="surface"
      border="thin"
      borderColor="border"
      rounded="md"
      overflow="hidden"
      shadow={shadow}
      className={clsx(styles.card, className)}
    >
      {children}
    </Box>
  );
}

/**
 * CardHeader - Optional header section
 *
 * Use inside Card for header content with bottom border.
 */
export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <Box
      px={4}
      py={3}
      borderBottom="thin"
      borderColor="border"
      className={clsx(styles.cardHeader, className)}
    >
      {children}
    </Box>
  );
}

/**
 * CardBody - Main content section
 *
 * Use inside Card for main content with padding.
 */
export function CardBody({ className, children }: CardBodyProps) {
  return (
    <Box p={4} className={clsx(styles.cardBody, className)}>
      {children}
    </Box>
  );
}

/**
 * CardFooter - Optional footer section
 *
 * Use inside Card for footer content with top border.
 */
export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <Box
      px={4}
      py={3}
      borderTop="thin"
      borderColor="border"
      className={clsx(styles.cardFooter, className)}
    >
      {children}
    </Box>
  );
}
