import { type ElementType, type ReactNode } from "react";
import clsx from "clsx";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";
import styles from "./link.module.css";

// ============================================================================
// Types
// ============================================================================

export type LinkVariant = "default" | "underline" | "subtle";

export type LinkOwnProps = Omit<BoxOwnProps, "as"> & {
  /** Visual variant */
  variant?: LinkVariant;
  /** External link (opens in new tab) */
  external?: boolean;
  /** Link content */
  children?: ReactNode;
};

export type LinkProps<T extends ElementType = "a"> = Polymorphic<T, LinkOwnProps>;

// ============================================================================
// Component
// ============================================================================

/**
 * Link - Styled anchor element
 *
 * A polymorphic link component that provides:
 * - Default element: <a>
 * - Variants: default (underline on hover), underline (always), subtle (inherits color)
 * - External link support with target="_blank"
 * - Router support via as prop
 */
export function Link<T extends ElementType = "a">({
  as,
  variant = "default",
  external = false,
  children,
  className,
  ...rest
}: LinkProps<T>) {
  const Component = as || "a";

  const externalProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box
      as={Component}
      color={variant === "subtle" ? undefined : "primary"}
      cursor="pointer"
      className={clsx(styles.link, styles[variant], className)}
      {...externalProps}
      {...rest}
    >
      {children}
    </Box>
  );
}
