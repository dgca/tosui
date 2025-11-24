import { type ElementType } from "react";
import { css } from "@linaria/core";
import clsx from "clsx";
import { Box, type BoxOwnProps } from "../Box/Box";
import { type Polymorphic } from "@/types/Polymorphic";
import { type FontSize } from "../Box/styleParts/typography";
import { type FontWeight } from "../Box/styleParts/typography";
import { type TextAlign } from "../Box/styleParts/textAlign";
import { type Color } from "../Box/styleParts/colors";

const truncateStyles = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const italicStyles = css`
  font-style: italic;
`;

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
  return (
    // @ts-expect-error - Polymorphic component prop forwarding
    <Box
      as={as}
      fontSize={size}
      fontWeight={weight}
      textAlign={align}
      color={color}
      className={clsx(
        truncate && truncateStyles,
        italic && italicStyles,
        className
      )}
      {...rest}
    />
  );
}
