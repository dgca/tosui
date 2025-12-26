import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type TextAlignValues = keyof typeof textAlignStyles;
type WhiteSpaceValues = keyof typeof whiteSpaceStyles;
type TextDecorationValues = keyof typeof textDecorationStyles;

const textAlignStyles = stylex.create({
  center: {
    textAlign: "center",
  },
  justify: {
    textAlign: "justify",
  },
  left: {
    textAlign: "left",
  },
  right: {
    textAlign: "right",
  },
});

const textAlignStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<TextAlignValues>) => ({
    textAlign: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

const whiteSpaceStyles = stylex.create({
  normal: {
    whiteSpace: "normal",
  },
  nowrap: {
    whiteSpace: "nowrap",
  },
  pre: {
    whiteSpace: "pre",
  },
  preLine: {
    whiteSpace: "pre-line",
  },
  preWrap: {
    whiteSpace: "pre-wrap",
  },
});

const whiteSpaceStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<WhiteSpaceValues>) => ({
    whiteSpace: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

const textDecorationStyles = stylex.create({
  none: {
    textDecoration: "none",
  },
  underline: {
    textDecoration: "underline",
  },
  lineThrough: {
    textDecoration: "line-through",
  },
});

const textDecorationStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<TextDecorationValues>) => ({
    textDecoration: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

export type TextAlign = ResponsiveValue<TextAlignValues>;
export type WhiteSpace = ResponsiveValue<WhiteSpaceValues>;
export type TextDecoration = ResponsiveValue<TextDecorationValues>;

export type TextProps = {
  textAlign?: TextAlign;
  whiteSpace?: WhiteSpace;
  textDecoration?: TextDecoration;
};

export function getTextStyles(props: TextProps) {
  const { textAlign, whiteSpace, textDecoration } = props;

  const styles = [];

  if (textAlign) {
    styles.push(
      typeof textAlign !== "object"
        ? textAlignStyles[textAlign]
        : textAlignStylesResponsive.responsive(
            toFullResponsiveObject(textAlign, "left")
          )
    );
  }

  if (whiteSpace) {
    styles.push(
      typeof whiteSpace !== "object"
        ? whiteSpaceStyles[whiteSpace]
        : whiteSpaceStylesResponsive.responsive(
            toFullResponsiveObject(whiteSpace, "normal")
          )
    );
  }

  if (textDecoration) {
    styles.push(
      typeof textDecoration !== "object"
        ? textDecorationStyles[textDecoration]
        : textDecorationStylesResponsive.responsive(
            toFullResponsiveObject(textDecoration, "none")
          )
    );
  }

  return styles;
}
