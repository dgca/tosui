import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type RoundedValues = keyof typeof roundedTopLeftStyles;

const ROUNDED_VALUES = {
  full: "var(--tosui-radius-full)",
  lg: "var(--tosui-radius-lg)",
  md: "var(--tosui-radius-md)",
  none: "var(--tosui-radius-none)",
  sm: "var(--tosui-radius-sm)",
} as const;

const roundedTopLeftStyles = stylex.create({
  full: {
    borderTopLeftRadius: ROUNDED_VALUES.full,
  },
  lg: {
    borderTopLeftRadius: ROUNDED_VALUES.lg,
  },
  md: {
    borderTopLeftRadius: ROUNDED_VALUES.md,
  },
  none: {
    borderTopLeftRadius: ROUNDED_VALUES.none,
  },
  sm: {
    borderTopLeftRadius: ROUNDED_VALUES.sm,
  },
});

const roundedTopLeftStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<RoundedValues>) => ({
    borderTopLeftRadius: {
      default: ROUNDED_VALUES[value.base],
      [breakpoints.sm]: ROUNDED_VALUES[value.sm],
      [breakpoints.md]: ROUNDED_VALUES[value.md],
      [breakpoints.lg]: ROUNDED_VALUES[value.lg],
      [breakpoints.xl]: ROUNDED_VALUES[value.xl],
      [breakpoints["2xl"]]: ROUNDED_VALUES[value["2xl"]],
    },
  }),
});

const roundedTopRightStyles = stylex.create({
  full: {
    borderTopRightRadius: ROUNDED_VALUES.full,
  },
  lg: {
    borderTopRightRadius: ROUNDED_VALUES.lg,
  },
  md: {
    borderTopRightRadius: ROUNDED_VALUES.md,
  },
  none: {
    borderTopRightRadius: ROUNDED_VALUES.none,
  },
  sm: {
    borderTopRightRadius: ROUNDED_VALUES.sm,
  },
});

const roundedTopRightStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<RoundedValues>) => ({
    borderTopRightRadius: {
      default: ROUNDED_VALUES[value.base],
      [breakpoints.sm]: ROUNDED_VALUES[value.sm],
      [breakpoints.md]: ROUNDED_VALUES[value.md],
      [breakpoints.lg]: ROUNDED_VALUES[value.lg],
      [breakpoints.xl]: ROUNDED_VALUES[value.xl],
      [breakpoints["2xl"]]: ROUNDED_VALUES[value["2xl"]],
    },
  }),
});

const roundedBottomRightStyles = stylex.create({
  full: {
    borderBottomRightRadius: ROUNDED_VALUES.full,
  },
  lg: {
    borderBottomRightRadius: ROUNDED_VALUES.lg,
  },
  md: {
    borderBottomRightRadius: ROUNDED_VALUES.md,
  },
  none: {
    borderBottomRightRadius: ROUNDED_VALUES.none,
  },
  sm: {
    borderBottomRightRadius: ROUNDED_VALUES.sm,
  },
});

const roundedBottomRightStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<RoundedValues>) => ({
    borderBottomRightRadius: {
      default: ROUNDED_VALUES[value.base],
      [breakpoints.sm]: ROUNDED_VALUES[value.sm],
      [breakpoints.md]: ROUNDED_VALUES[value.md],
      [breakpoints.lg]: ROUNDED_VALUES[value.lg],
      [breakpoints.xl]: ROUNDED_VALUES[value.xl],
      [breakpoints["2xl"]]: ROUNDED_VALUES[value["2xl"]],
    },
  }),
});

const roundedBottomLeftStyles = stylex.create({
  full: {
    borderBottomLeftRadius: ROUNDED_VALUES.full,
  },
  lg: {
    borderBottomLeftRadius: ROUNDED_VALUES.lg,
  },
  md: {
    borderBottomLeftRadius: ROUNDED_VALUES.md,
  },
  none: {
    borderBottomLeftRadius: ROUNDED_VALUES.none,
  },
  sm: {
    borderBottomLeftRadius: ROUNDED_VALUES.sm,
  },
});

const roundedBottomLeftStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<RoundedValues>) => ({
    borderBottomLeftRadius: {
      default: ROUNDED_VALUES[value.base],
      [breakpoints.sm]: ROUNDED_VALUES[value.sm],
      [breakpoints.md]: ROUNDED_VALUES[value.md],
      [breakpoints.lg]: ROUNDED_VALUES[value.lg],
      [breakpoints.xl]: ROUNDED_VALUES[value.xl],
      [breakpoints["2xl"]]: ROUNDED_VALUES[value["2xl"]],
    },
  }),
});

type Rounded = ResponsiveValue<RoundedValues>;

export type RoundnessProps = {
  rounded?: Rounded;
  roundedTop?: Rounded;
  roundedBottom?: Rounded;
  roundedLeft?: Rounded;
  roundedRight?: Rounded;
  roundedTopLeft?: Rounded;
  roundedTopRight?: Rounded;
  roundedBottomLeft?: Rounded;
  roundedBottomRight?: Rounded;
};

export function getRoundnessStyles(props: RoundnessProps) {
  const {
    rounded,
    roundedTop,
    roundedBottom,
    roundedLeft,
    roundedRight,
    roundedTopLeft,
    roundedTopRight,
    roundedBottomLeft,
    roundedBottomRight,
  } = props;

  const styles = [];

  const topLeft = roundedTopLeft ?? roundedTop ?? roundedLeft ?? rounded;
  if (topLeft !== undefined) {
    styles.push(
      typeof topLeft !== "object"
        ? roundedTopLeftStyles[topLeft]
        : roundedTopLeftStylesResponsive.responsive(
            toFullResponsiveObject(topLeft, "none")
          )
    );
  }

  const topRight = roundedTopRight ?? roundedTop ?? roundedRight ?? rounded;
  if (topRight !== undefined) {
    styles.push(
      typeof topRight !== "object"
        ? roundedTopRightStyles[topRight]
        : roundedTopRightStylesResponsive.responsive(
            toFullResponsiveObject(topRight, "none")
          )
    );
  }

  const bottomRight =
    roundedBottomRight ?? roundedBottom ?? roundedRight ?? rounded;
  if (bottomRight !== undefined) {
    styles.push(
      typeof bottomRight !== "object"
        ? roundedBottomRightStyles[bottomRight]
        : roundedBottomRightStylesResponsive.responsive(
            toFullResponsiveObject(bottomRight, "none")
          )
    );
  }

  const bottomLeft = roundedBottomLeft ?? roundedBottom ?? roundedLeft ?? rounded;
  if (bottomLeft !== undefined) {
    styles.push(
      typeof bottomLeft !== "object"
        ? roundedBottomLeftStyles[bottomLeft]
        : roundedBottomLeftStylesResponsive.responsive(
            toFullResponsiveObject(bottomLeft, "none")
          )
    );
  }

  return styles;
}
