import { type ElementType } from "react";
import { Box, type BoxOwnProps } from "../Box/Box";
import { type Polymorphic } from "@/types/Polymorphic";

type FontSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
type Color =
  | "foreground"
  | "foreground-muted"
  | "foreground-subtle"
  | "foreground-inverted"
  | "foreground-inverted-muted"
  | "foreground-inverted-subtle"
  | "accent"
  | "accent-emphasis"
  | "primary"
  | "primary-emphasis"
  | "success"
  | "success-emphasis"
  | "warning"
  | "warning-emphasis"
  | "error"
  | "error-emphasis"
  | "info"
  | "info-emphasis";

export type CodeVariant = "plain" | "subtle";

export type CodeOwnProps = Omit<
  BoxOwnProps,
  "fontSize" | "fontFamily" | "color" | "bg" | "rounded" | "px"
> & {
  /** Font size */
  size?: FontSize;
  /** Text color */
  color?: Color;
  /** Visual variant: plain (no background) or subtle (surface background) */
  variant?: CodeVariant;
};

export type CodeProps<T extends ElementType = "code"> = Polymorphic<
  T,
  CodeOwnProps
>;

/**
 * Code - Inline code styling component
 *
 * Built on top of Box with code-specific conveniences:
 * - Default element: <code>
 * - Always uses monospace font family
 * - Variants: plain (no background) or subtle (surface background with rounded corners)
 * - Can be changed to any element via `as` prop
 */
export function Code<T extends ElementType = "code">({
  as,
  size,
  color,
  variant = "plain",
  ...rest
}: CodeProps<T>) {
  const isSubtle = variant === "subtle";

  return (
    // @ts-expect-error - Polymorphic component prop forwarding
    <Box
      as={as || "code"}
      fontSize={size}
      fontFamily="mono"
      color={color}
      bg={isSubtle ? "surface" : undefined}
      rounded={isSubtle ? "sm" : undefined}
      px={isSubtle ? 1 : undefined}
      {...rest}
    />
  );
}
