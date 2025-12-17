import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type FontSizeValues = keyof typeof fontSizeStyles;
type FontFamilyValues = keyof typeof fontFamilyStyles;
type FontWeightValues = keyof typeof fontWeightStyles;
type LineHeightValues = keyof typeof lineHeightStyles;

const fontSizeStyles = stylex.create({
  "2xl": {
    fontSize: "var(--t-font-size-2xl)",
  },
  "3xl": {
    fontSize: "var(--t-font-size-3xl)",
  },
  "4xl": {
    fontSize: "var(--t-font-size-4xl)",
  },
  "5xl": {
    fontSize: "var(--t-font-size-5xl)",
  },
  lg: {
    fontSize: "var(--t-font-size-lg)",
  },
  md: {
    fontSize: "var(--t-font-size-md)",
  },
  sm: {
    fontSize: "var(--t-font-size-sm)",
  },
  xl: {
    fontSize: "var(--t-font-size-xl)",
  },
  xs: {
    fontSize: "var(--t-font-size-xs)",
  },
});

const fontSizeStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<FontSizeValues>) => ({
    fontSize: {
      default: `var(--t-font-size-${value.base})`,
      [breakpoints.sm]: `var(--t-font-size-${value.sm})`,
      [breakpoints.md]: `var(--t-font-size-${value.md})`,
      [breakpoints.lg]: `var(--t-font-size-${value.lg})`,
      [breakpoints.xl]: `var(--t-font-size-${value.xl})`,
      [breakpoints["2xl"]]: `var(--t-font-size-${value["2xl"]})`,
    },
  }),
});

const fontFamilyStyles = stylex.create({
  body: {
    fontFamily: "var(--t-font-family-body)",
  },
  heading: {
    fontFamily: "var(--t-font-family-heading)",
  },
  mono: {
    fontFamily: "var(--t-font-family-mono)",
  },
});

const fontFamilyStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<FontFamilyValues>) => ({
    fontFamily: {
      default: `var(--t-font-family-${value.base})`,
      [breakpoints.sm]: `var(--t-font-family-${value.sm})`,
      [breakpoints.md]: `var(--t-font-family-${value.md})`,
      [breakpoints.lg]: `var(--t-font-family-${value.lg})`,
      [breakpoints.xl]: `var(--t-font-family-${value.xl})`,
      [breakpoints["2xl"]]: `var(--t-font-family-${value["2xl"]})`,
    },
  }),
});

const fontWeightStyles = stylex.create({
  bold: {
    fontWeight: "var(--t-font-weight-bold)",
  },
  medium: {
    fontWeight: "var(--t-font-weight-medium)",
  },
  normal: {
    fontWeight: "var(--t-font-weight-normal)",
  },
  semibold: {
    fontWeight: "var(--t-font-weight-semibold)",
  },
});

const fontWeightStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<FontWeightValues>) => ({
    fontWeight: {
      // eslint-disable-next-line @stylexjs/valid-styles
      default: `var(--t-font-weight-${value.base})`,
      [breakpoints.sm]: `var(--t-font-weight-${value.sm})`,
      [breakpoints.md]: `var(--t-font-weight-${value.md})`,
      [breakpoints.lg]: `var(--t-font-weight-${value.lg})`,
      [breakpoints.xl]: `var(--t-font-weight-${value.xl})`,
      [breakpoints["2xl"]]: `var(--t-font-weight-${value["2xl"]})`,
    },
  }),
});

const lineHeightStyles = stylex.create({
  normal: {
    lineHeight: "var(--t-line-height-normal)",
  },
  relaxed: {
    lineHeight: "var(--t-line-height-relaxed)",
  },
  tight: {
    lineHeight: "var(--t-line-height-tight)",
  },
});

const lineHeightStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<LineHeightValues>) => ({
    lineHeight: {
      default: `var(--t-line-height-${value.base})`,
      [breakpoints.sm]: `var(--t-line-height-${value.sm})`,
      [breakpoints.md]: `var(--t-line-height-${value.md})`,
      [breakpoints.lg]: `var(--t-line-height-${value.lg})`,
      [breakpoints.xl]: `var(--t-line-height-${value.xl})`,
      [breakpoints["2xl"]]: `var(--t-line-height-${value["2xl"]})`,
    },
  }),
});

export type FontSize = ResponsiveValue<FontSizeValues>;
export type FontFamily = ResponsiveValue<FontFamilyValues>;
export type FontWeight = ResponsiveValue<FontWeightValues>;
export type LineHeight = ResponsiveValue<LineHeightValues>;

export type TypographyProps = {
  fontSize?: FontSize;
  fontFamily?: FontFamily;
  fontWeight?: FontWeight;
  lineHeight?: LineHeight;
};

export function getTypographyStyles(props: TypographyProps) {
  const { fontSize, fontFamily, fontWeight, lineHeight } = props;

  const styles = [];

  if (fontSize) {
    styles.push(
      typeof fontSize !== "object"
        ? fontSizeStyles[fontSize]
        : fontSizeStylesResponsive.responsive(
            toFullResponsiveObject(fontSize, "md")
          )
    );
  }

  if (fontFamily) {
    styles.push(
      typeof fontFamily !== "object"
        ? fontFamilyStyles[fontFamily]
        : fontFamilyStylesResponsive.responsive(
            toFullResponsiveObject(fontFamily, "body")
          )
    );
  }

  if (fontWeight) {
    styles.push(
      typeof fontWeight !== "object"
        ? fontWeightStyles[fontWeight]
        : fontWeightStylesResponsive.responsive(
            toFullResponsiveObject(fontWeight, "normal")
          )
    );
  }

  if (lineHeight) {
    styles.push(
      typeof lineHeight !== "object"
        ? lineHeightStyles[lineHeight]
        : lineHeightStylesResponsive.responsive(
            toFullResponsiveObject(lineHeight, "normal")
          )
    );
  }

  return styles;
}
