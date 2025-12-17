import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type BorderWidthValues = keyof typeof borderTopWidthStyles;
type BorderStyleValues = keyof typeof borderStyleStyles;

const BORDER_WIDTH_VALUES = {
  medium: "var(--t-border-width-medium)",
  none: "var(--t-border-width-none)",
  thick: "var(--t-border-width-thick)",
  thin: "var(--t-border-width-thin)",
} as const;

const borderTopWidthStyles = stylex.create({
  medium: {
    borderTopWidth: BORDER_WIDTH_VALUES.medium,
  },
  none: {
    borderTopWidth: BORDER_WIDTH_VALUES.none,
  },
  thick: {
    borderTopWidth: BORDER_WIDTH_VALUES.thick,
  },
  thin: {
    borderTopWidth: BORDER_WIDTH_VALUES.thin,
  },
});

const borderTopWidthStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<BorderWidthValues>) => ({
    borderTopWidth: {
      default: BORDER_WIDTH_VALUES[value.base],
      [breakpoints.sm]: BORDER_WIDTH_VALUES[value.sm],
      [breakpoints.md]: BORDER_WIDTH_VALUES[value.md],
      [breakpoints.lg]: BORDER_WIDTH_VALUES[value.lg],
      [breakpoints.xl]: BORDER_WIDTH_VALUES[value.xl],
      [breakpoints["2xl"]]: BORDER_WIDTH_VALUES[value["2xl"]],
    },
  }),
});

const borderRightWidthStyles = stylex.create({
  medium: {
    borderRightWidth: BORDER_WIDTH_VALUES.medium,
  },
  none: {
    borderRightWidth: BORDER_WIDTH_VALUES.none,
  },
  thick: {
    borderRightWidth: BORDER_WIDTH_VALUES.thick,
  },
  thin: {
    borderRightWidth: BORDER_WIDTH_VALUES.thin,
  },
});

const borderRightWidthStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<BorderWidthValues>) => ({
    borderRightWidth: {
      default: BORDER_WIDTH_VALUES[value.base],
      [breakpoints.sm]: BORDER_WIDTH_VALUES[value.sm],
      [breakpoints.md]: BORDER_WIDTH_VALUES[value.md],
      [breakpoints.lg]: BORDER_WIDTH_VALUES[value.lg],
      [breakpoints.xl]: BORDER_WIDTH_VALUES[value.xl],
      [breakpoints["2xl"]]: BORDER_WIDTH_VALUES[value["2xl"]],
    },
  }),
});

const borderBottomWidthStyles = stylex.create({
  medium: {
    borderBottomWidth: BORDER_WIDTH_VALUES.medium,
  },
  none: {
    borderBottomWidth: BORDER_WIDTH_VALUES.none,
  },
  thick: {
    borderBottomWidth: BORDER_WIDTH_VALUES.thick,
  },
  thin: {
    borderBottomWidth: BORDER_WIDTH_VALUES.thin,
  },
});

const borderBottomWidthStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<BorderWidthValues>) => ({
    borderBottomWidth: {
      default: BORDER_WIDTH_VALUES[value.base],
      [breakpoints.sm]: BORDER_WIDTH_VALUES[value.sm],
      [breakpoints.md]: BORDER_WIDTH_VALUES[value.md],
      [breakpoints.lg]: BORDER_WIDTH_VALUES[value.lg],
      [breakpoints.xl]: BORDER_WIDTH_VALUES[value.xl],
      [breakpoints["2xl"]]: BORDER_WIDTH_VALUES[value["2xl"]],
    },
  }),
});

const borderLeftWidthStyles = stylex.create({
  medium: {
    borderLeftWidth: BORDER_WIDTH_VALUES.medium,
  },
  none: {
    borderLeftWidth: BORDER_WIDTH_VALUES.none,
  },
  thick: {
    borderLeftWidth: BORDER_WIDTH_VALUES.thick,
  },
  thin: {
    borderLeftWidth: BORDER_WIDTH_VALUES.thin,
  },
});

const borderLeftWidthStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<BorderWidthValues>) => ({
    borderLeftWidth: {
      default: BORDER_WIDTH_VALUES[value.base],
      [breakpoints.sm]: BORDER_WIDTH_VALUES[value.sm],
      [breakpoints.md]: BORDER_WIDTH_VALUES[value.md],
      [breakpoints.lg]: BORDER_WIDTH_VALUES[value.lg],
      [breakpoints.xl]: BORDER_WIDTH_VALUES[value.xl],
      [breakpoints["2xl"]]: BORDER_WIDTH_VALUES[value["2xl"]],
    },
  }),
});

const borderStyleStyles = stylex.create({
  dashed: {
    borderStyle: "dashed",
  },
  dotted: {
    borderStyle: "dotted",
  },
  none: {
    borderStyle: "none",
  },
  solid: {
    borderStyle: "solid",
  },
});

const borderStyleStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<BorderStyleValues>) => ({
    borderStyle: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

type BorderWidth = ResponsiveValue<BorderWidthValues>;
type BorderStyle = ResponsiveValue<BorderStyleValues>;

export type BorderProps = {
  border?: BorderWidth;
  borderX?: BorderWidth;
  borderY?: BorderWidth;
  borderTop?: BorderWidth;
  borderRight?: BorderWidth;
  borderBottom?: BorderWidth;
  borderLeft?: BorderWidth;
  borderStyle?: BorderStyle;
};

export function getBorderStyles(props: BorderProps) {
  const {
    border,
    borderX,
    borderY,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderStyle,
  } = props;

  const styles = [];

  const topWidth = borderTop ?? borderY ?? border;
  const rightWidth = borderRight ?? borderX ?? border;
  const bottomWidth = borderBottom ?? borderY ?? border;
  const leftWidth = borderLeft ?? borderX ?? border;

  if (topWidth !== undefined) {
    styles.push(
      typeof topWidth !== "object"
        ? borderTopWidthStyles[topWidth]
        : borderTopWidthStylesResponsive.responsive(
            toFullResponsiveObject(topWidth, "none")
          )
    );
  }

  if (rightWidth !== undefined) {
    styles.push(
      typeof rightWidth !== "object"
        ? borderRightWidthStyles[rightWidth]
        : borderRightWidthStylesResponsive.responsive(
            toFullResponsiveObject(rightWidth, "none")
          )
    );
  }

  if (bottomWidth !== undefined) {
    styles.push(
      typeof bottomWidth !== "object"
        ? borderBottomWidthStyles[bottomWidth]
        : borderBottomWidthStylesResponsive.responsive(
            toFullResponsiveObject(bottomWidth, "none")
          )
    );
  }

  if (leftWidth !== undefined) {
    styles.push(
      typeof leftWidth !== "object"
        ? borderLeftWidthStyles[leftWidth]
        : borderLeftWidthStylesResponsive.responsive(
            toFullResponsiveObject(leftWidth, "none")
          )
    );
  }

  if (borderStyle !== undefined) {
    styles.push(
      typeof borderStyle !== "object"
        ? borderStyleStyles[borderStyle]
        : borderStyleStylesResponsive.responsive(
            toFullResponsiveObject(borderStyle, "solid")
          )
    );
  } else if (topWidth || rightWidth || bottomWidth || leftWidth) {
    styles.push(borderStyleStyles.solid);
  }

  return styles;
}
