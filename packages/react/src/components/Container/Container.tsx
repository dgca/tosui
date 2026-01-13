import { type ElementType } from "react";
import { type Polymorphic } from "@/types/Polymorphic";
import { Box, type BoxOwnProps } from "@/components/Box/Box";

// ============================================================================
// Types
// ============================================================================

/** Container size preset */
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export type ContainerOwnProps = Omit<BoxOwnProps, "maxW" | "mx"> & {
  /** Max-width preset: sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px, full=100% (default: lg) */
  size?: ContainerSize;
  /** Center children using flexbox (default: false) */
  centerContent?: boolean;
  /** Horizontal padding (default: 4 = 16px) */
  px?: BoxOwnProps["px"];
};

export type ContainerProps<T extends ElementType = "div"> = Polymorphic<
  T,
  ContainerOwnProps
>;

// ============================================================================
// Config
// ============================================================================

const SIZE_MAP: Record<ContainerSize, string> = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  full: "100%",
};

// ============================================================================
// Component
// ============================================================================

/**
 * Container - Max-width centered content wrapper
 *
 * A polymorphic container for constraining content width:
 * - Default element: <div>
 * - Size presets: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px), full (100%)
 * - Default: lg (1024px max-width)
 * - Centered horizontally with mx="auto"
 * - Optional centerContent to center children vertically with flex
 */
export function Container<T extends ElementType = "div">({
  as,
  size = "lg",
  centerContent = false,
  px = 4,
  children,
  ...rest
}: ContainerProps<T>) {
  return (
    // @ts-expect-error - Polymorphic component type forwarding
    <Box
      as={as || "div"}
      w="100%"
      maxW={SIZE_MAP[size]}
      mx="auto"
      px={px}
      {...(centerContent && {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      })}
      {...rest}
    >
      {children}
    </Box>
  );
}
