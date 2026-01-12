import styles from "./typography.module.css";
import clsx from "clsx";

export type FontSizeValue = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
export type FontFamilyValue = "body" | "heading" | "mono";
export type FontWeightValue = "normal" | "medium" | "semibold" | "bold";
export type LineHeightValue = "tight" | "normal" | "relaxed";

export type TypographyProps = {
  fontSize?: FontSizeValue;
  fontFamily?: FontFamilyValue;
  fontWeight?: FontWeightValue;
  lineHeight?: LineHeightValue;
};

type StyleResult = {
  className: string;
};

export function getTypographyStyles(props: TypographyProps): StyleResult {
  const { fontSize, fontFamily, fontWeight, lineHeight } = props;

  const classes: string[] = [];

  if (fontSize) {
    const cls = styles[`text-${fontSize}`];
    if (cls) classes.push(cls);
  }

  if (fontFamily) {
    const cls = styles[`font-${fontFamily}`];
    if (cls) classes.push(cls);
  }

  if (fontWeight) {
    const cls = styles[`weight-${fontWeight}`];
    if (cls) classes.push(cls);
  }

  if (lineHeight) {
    const cls = styles[`leading-${lineHeight}`];
    if (cls) classes.push(cls);
  }

  return { className: clsx(...classes) };
}
