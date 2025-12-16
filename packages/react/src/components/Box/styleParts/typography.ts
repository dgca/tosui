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
    fontSize: "var(--tosui-font-size-2xl)",
  },
  "3xl": {
    fontSize: "var(--tosui-font-size-3xl)",
  },
  "4xl": {
    fontSize: "var(--tosui-font-size-4xl)",
  },
  "5xl": {
    fontSize: "var(--tosui-font-size-5xl)",
  },
  lg: {
    fontSize: "var(--tosui-font-size-lg)",
  },
  md: {
    fontSize: "var(--tosui-font-size-md)",
  },
  sm: {
    fontSize: "var(--tosui-font-size-sm)",
  },
  xl: {
    fontSize: "var(--tosui-font-size-xl)",
  },
  xs: {
    fontSize: "var(--tosui-font-size-xs)",
  },
});

const fontSizeStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<FontSizeValues>) => ({
    fontSize: {
      default: `var(--tosui-font-size-${value.base})`,
      [breakpoints.sm]: `var(--tosui-font-size-${value.sm})`,
      [breakpoints.md]: `var(--tosui-font-size-${value.md})`,
      [breakpoints.lg]: `var(--tosui-font-size-${value.lg})`,
      [breakpoints.xl]: `var(--tosui-font-size-${value.xl})`,
      [breakpoints["2xl"]]: `var(--tosui-font-size-${value["2xl"]})`,
    },
  }),
});

const fontFamilyStyles = stylex.create({
  body: {
    fontFamily: "var(--tosui-font-family-body)",
  },
  heading: {
    fontFamily: "var(--tosui-font-family-heading)",
  },
  mono: {
    fontFamily: "var(--tosui-font-family-mono)",
  },
});

const fontFamilyStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<FontFamilyValues>) => ({
    fontFamily: {
      default: `var(--tosui-font-family-${value.base})`,
      [breakpoints.sm]: `var(--tosui-font-family-${value.sm})`,
      [breakpoints.md]: `var(--tosui-font-family-${value.md})`,
      [breakpoints.lg]: `var(--tosui-font-family-${value.lg})`,
      [breakpoints.xl]: `var(--tosui-font-family-${value.xl})`,
      [breakpoints["2xl"]]: `var(--tosui-font-family-${value["2xl"]})`,
    },
  }),
});

const fontWeightStyles = stylex.create({
  bold: {
    fontWeight: "var(--tosui-font-weight-bold)",
  },
  medium: {
    fontWeight: "var(--tosui-font-weight-medium)",
  },
  normal: {
    fontWeight: "var(--tosui-font-weight-normal)",
  },
  semibold: {
    fontWeight: "var(--tosui-font-weight-semibold)",
  },
});

const fontWeightStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<FontWeightValues>) => ({
    fontWeight: {
      // eslint-disable-next-line @stylexjs/valid-styles
      default: `var(--tosui-font-weight-${value.base})`,
      [breakpoints.sm]: `var(--tosui-font-weight-${value.sm})`,
      [breakpoints.md]: `var(--tosui-font-weight-${value.md})`,
      [breakpoints.lg]: `var(--tosui-font-weight-${value.lg})`,
      [breakpoints.xl]: `var(--tosui-font-weight-${value.xl})`,
      [breakpoints["2xl"]]: `var(--tosui-font-weight-${value["2xl"]})`,
    },
  }),
});

const lineHeightStyles = stylex.create({
  normal: {
    lineHeight: "var(--tosui-line-height-normal)",
  },
  relaxed: {
    lineHeight: "var(--tosui-line-height-relaxed)",
  },
  tight: {
    lineHeight: "var(--tosui-line-height-tight)",
  },
});

const lineHeightStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<LineHeightValues>) => ({
    lineHeight: {
      default: `var(--tosui-line-height-${value.base})`,
      [breakpoints.sm]: `var(--tosui-line-height-${value.sm})`,
      [breakpoints.md]: `var(--tosui-line-height-${value.md})`,
      [breakpoints.lg]: `var(--tosui-line-height-${value.lg})`,
      [breakpoints.xl]: `var(--tosui-line-height-${value.xl})`,
      [breakpoints["2xl"]]: `var(--tosui-line-height-${value["2xl"]})`,
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
