import { type ElementType } from "react";
import { Text, type TextOwnProps } from "../Text/Text";
import { type Polymorphic } from "@/types/Polymorphic";
import { type FontSize } from "../Box/styleParts/typography";
import { type FontWeight } from "../Box/styleParts/typography";
import { type Color } from "../Box/styleParts/colors";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const defaultSizes: Record<HeadingLevel, FontSize> = {
  1: "3xl",
  2: "2xl",
  3: "xl",
  4: "lg",
  5: "md",
  6: "sm",
};

type HeadingOwnProps = Omit<TextOwnProps, "size" | "weight" | "color"> & {
  level?: HeadingLevel;
  size?: FontSize;
  weight?: FontWeight;
  color?: Color;
};

export type HeadingProps<T extends ElementType = "h1"> = Polymorphic<
  T,
  HeadingOwnProps
>;

/**
 * Heading - Semantic heading component with predefined sizes
 *
 * Built on top of Text with heading-specific defaults:
 * - level prop maps to h1-h6 elements (default: h1)
 * - Each level has a default font size
 * - Default font weight: bold
 * - Size can be overridden via size prop
 * - Can be changed to any element via `as` prop
 */
export function Heading<T extends ElementType = "h1">({
  as,
  level = 1,
  size,
  weight = "bold",
  color,
  children,
  ...rest
}: HeadingProps<T>) {
  const headingElement = `h${level}` as const;
  const defaultSize = defaultSizes[level];
  const element = as ?? headingElement;

  return (
    // @ts-expect-error - Polymorphic component prop forwarding
    <Text
      as={element}
      size={size ?? defaultSize}
      weight={weight}
      color={color}
      {...rest}
    >
      {children}
    </Text>
  );
}
