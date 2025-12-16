import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type ResponsiveObject,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type JustifySelfValues = keyof typeof justifySelfStyles;

const justifySelfStyles = stylex.create({
  auto: {
    justifySelf: "auto",
  },
  center: {
    justifySelf: "center",
  },
  end: {
    justifySelf: "end",
  },
  start: {
    justifySelf: "start",
  },
  stretch: {
    justifySelf: "stretch",
  },
});

const justifySelfStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<JustifySelfValues>) => ({
    justifySelf: {
      // eslint-disable-next-line @stylexjs/valid-styles
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

const dynamicGridStyles = stylex.create({
  gridTemplateColumns: (value: string) => ({ gridTemplateColumns: value }),
  gridTemplateColumnsResponsive: (value: ResponsiveObject<string>) => ({
    gridTemplateColumns: {
      // eslint-disable-next-line @stylexjs/valid-styles
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  gridTemplateRows: (value: string) => ({ gridTemplateRows: value }),
  gridTemplateRowsResponsive: (value: ResponsiveObject<string>) => ({
    gridTemplateRows: {
      // eslint-disable-next-line @stylexjs/valid-styles
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

export type JustifySelf = ResponsiveValue<JustifySelfValues>;

export type GridProps = {
  justifySelf?: JustifySelf;
  gridTemplateColumns?: ResponsiveValue<string>;
  gridTemplateRows?: ResponsiveValue<string>;
};

export function getGridStyles(props: GridProps) {
  const { justifySelf, gridTemplateColumns, gridTemplateRows } = props;

  const styles = [];

  if (justifySelf !== undefined) {
    styles.push(
      typeof justifySelf !== "object"
        ? justifySelfStyles[justifySelf]
        : justifySelfStylesResponsive.responsive(
            toFullResponsiveObject(justifySelf, "auto")
          )
    );
  }

  if (gridTemplateColumns !== undefined) {
    styles.push(
      typeof gridTemplateColumns !== "object"
        ? dynamicGridStyles.gridTemplateColumns(gridTemplateColumns)
        : dynamicGridStyles.gridTemplateColumnsResponsive(
            toFullResponsiveObject(gridTemplateColumns, "none")
          )
    );
  }

  if (gridTemplateRows !== undefined) {
    styles.push(
      typeof gridTemplateRows !== "object"
        ? dynamicGridStyles.gridTemplateRows(gridTemplateRows)
        : dynamicGridStyles.gridTemplateRowsResponsive(
            toFullResponsiveObject(gridTemplateRows, "none")
          )
    );
  }

  return styles;
}
