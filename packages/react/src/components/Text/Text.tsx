import { type ElementType } from "react";
import * as stylex from "@stylexjs/stylex";
import clsx from "clsx";
import { Box, type BoxOwnProps } from "../Box/Box";
import { type Polymorphic } from "@/types/Polymorphic";

// Import types from Box styleParts
type FontSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
type FontWeight = "normal" | "medium" | "semibold" | "bold";
type TextAlign = "left" | "center" | "right" | "justify";
type Color =
  | "foreground"
  | "foreground-muted"
  | "foreground-subtle"
  | "accent"
  | "accent-emphasis"
  | "primary"
  | "primary-emphasis"
  | "success"
  | "success-emphasis"
  | "warning"
  | "warning-emphasis"
  | "error"
  | "error-emphasis";

const truncateStyles = stylex.create({
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

const italicStyles = stylex.create({
  italic: {
    fontStyle: "italic",
  },
});

export type TextOwnProps = Omit<
  BoxOwnProps,
  "fontSize" | "fontWeight" | "textAlign" | "color"
> & {
  size?: FontSize;
  weight?: FontWeight;
  align?: TextAlign;
  color?: Color;
  truncate?: boolean;
  italic?: boolean;
};

export type TextProps<T extends ElementType = "span"> = Polymorphic<
  T,
  TextOwnProps
>;

/**
 * Text - Semantic text component for body copy, labels, captions, etc.
 *
 * Built on top of Box with text-specific conveniences:
 * - Default element: <span> (inline)
 * - Shorthand props: size, weight, align, color
 * - Utility props: truncate (ellipsis), italic
 * - Can be changed to any element via `as` prop
 */
export function Text<T extends ElementType = "span">({
  as,
  size,
  weight,
  align,
  color,
  truncate,
  italic,
  className,
  ...rest
}: TextProps<T>) {
  const { className: stylexClassName } = stylex.props(
    truncate && truncateStyles.truncate,
    italic && italicStyles.italic
  );

  return (
    // @ts-expect-error - Polymorphic component prop forwarding
    <Box
      as={as}
      fontSize={size}
      fontWeight={weight}
      textAlign={align}
      color={color}
      className={clsx(stylexClassName, className)}
      {...rest}
    />
  );
}
