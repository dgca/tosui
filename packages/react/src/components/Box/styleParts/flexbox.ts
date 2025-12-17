import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type ResponsiveObject,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";
import { type SpacingValue } from "./types";

type FlexDirectionValues = keyof typeof flexDirectionStyles;
type JustifyContentValues = keyof typeof justifyContentStyles;
type AlignItemsValues = keyof typeof alignItemsStyles;
type AlignSelfValues = keyof typeof alignSelfStyles;
type FlexWrapValues = keyof typeof flexWrapStyles;

const flexDirectionStyles = stylex.create({
  column: {
    flexDirection: "column",
  },
  "column-reverse": {
    flexDirection: "column-reverse",
  },
  row: {
    flexDirection: "row",
  },
  "row-reverse": {
    flexDirection: "row-reverse",
  },
});

const flexDirectionStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<FlexDirectionValues>) => ({
    flexDirection: {
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

const justifyContentStyles = stylex.create({
  center: {
    justifyContent: "center",
  },
  end: {
    justifyContent: "end",
  },
  "space-around": {
    justifyContent: "space-around",
  },
  "space-between": {
    justifyContent: "space-between",
  },
  "space-evenly": {
    justifyContent: "space-evenly",
  },
  start: {
    justifyContent: "start",
  },
});

const justifyContentStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<JustifyContentValues>) => ({
    justifyContent: {
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

const alignItemsStyles = stylex.create({
  baseline: {
    alignItems: "baseline",
  },
  center: {
    alignItems: "center",
  },
  end: {
    alignItems: "end",
  },
  start: {
    alignItems: "start",
  },
  stretch: {
    alignItems: "stretch",
  },
});

const alignItemsStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<AlignItemsValues>) => ({
    alignItems: {
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

const alignSelfStyles = stylex.create({
  auto: {
    alignSelf: "auto",
  },
  baseline: {
    alignSelf: "baseline",
  },
  center: {
    alignSelf: "center",
  },
  end: {
    alignSelf: "end",
  },
  start: {
    alignSelf: "start",
  },
  stretch: {
    alignSelf: "stretch",
  },
});

const alignSelfStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<AlignSelfValues>) => ({
    alignSelf: {
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

const flexWrapStyles = stylex.create({
  nowrap: {
    flexWrap: "nowrap",
  },
  wrap: {
    flexWrap: "wrap",
  },
  "wrap-reverse": {
    flexWrap: "wrap-reverse",
  },
});

const flexWrapStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<FlexWrapValues>) => ({
    flexWrap: {
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

const dynamicFlexboxStyles = stylex.create({
  flex: (value: string) => ({ flex: value }),
  flexResponsive: (value: ResponsiveObject<string>) => ({
    flex: {
      // eslint-disable-next-line @stylexjs/valid-styles
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
  gap: (value: string) => ({ gap: value }),
  gapResponsive: (value: ResponsiveObject<string>) => ({
    gap: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

export type FlexDirection = ResponsiveValue<FlexDirectionValues>;
export type JustifyContent = ResponsiveValue<JustifyContentValues>;
export type AlignItems = ResponsiveValue<AlignItemsValues>;
export type AlignSelf = ResponsiveValue<AlignSelfValues>;
export type FlexWrap = ResponsiveValue<FlexWrapValues>;

export type FlexboxProps = {
  gap?: ResponsiveValue<SpacingValue>;
  gapRow?: ResponsiveValue<SpacingValue>;
  gapColumn?: ResponsiveValue<SpacingValue>;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  flex?: ResponsiveValue<string>;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
};

function getSpacingValue(value?: SpacingValue): string {
  if (value === undefined) return "normal";
  if (typeof value === "string") return value;
  if (value === 0) return "0";
  return `calc(var(--t-spacing-unit) * ${value})`;
}

function getGapValue(
  gap?: ResponsiveValue<SpacingValue>,
  gapRow?: ResponsiveValue<SpacingValue>,
  gapColumn?: ResponsiveValue<SpacingValue>
) {
  if (gap === undefined && gapRow === undefined && gapColumn === undefined) {
    return undefined;
  }

  const isResponsive =
    typeof gap === "object" ||
    typeof gapRow === "object" ||
    typeof gapColumn === "object";

  if (!isResponsive) {
    const row = gapRow ?? gap;
    const column = gapColumn ?? gap;
    const rowValue = getSpacingValue(row);
    const columnValue = getSpacingValue(column);
    const gapValue =
      rowValue === columnValue ? rowValue : `${rowValue} ${columnValue}`;
    return dynamicFlexboxStyles.gap(gapValue);
  }

  const gapObj = typeof gap === "object" ? gap : {};
  const gapRowObj = typeof gapRow === "object" ? gapRow : {};
  const gapColumnObj = typeof gapColumn === "object" ? gapColumn : {};

  const calculateGapForBreakpoint = (
    gapVal?: SpacingValue,
    rowVal?: SpacingValue,
    colVal?: SpacingValue
  ): string => {
    const row = rowVal ?? gapVal;
    const column = colVal ?? gapVal;
    const rowValue = getSpacingValue(row);
    const columnValue = getSpacingValue(column);
    return rowValue === columnValue ? rowValue : `${rowValue} ${columnValue}`;
  };

  return dynamicFlexboxStyles.gapResponsive(
    toFullResponsiveObject(
      {
        base: calculateGapForBreakpoint(
          typeof gap === "object" ? gap.base : gap,
          typeof gapRow === "object" ? gapRow.base : gapRow,
          typeof gapColumn === "object" ? gapColumn.base : gapColumn
        ),
        sm: calculateGapForBreakpoint(gapObj.sm, gapRowObj.sm, gapColumnObj.sm),
        md: calculateGapForBreakpoint(gapObj.md, gapRowObj.md, gapColumnObj.md),
        lg: calculateGapForBreakpoint(gapObj.lg, gapRowObj.lg, gapColumnObj.lg),
        xl: calculateGapForBreakpoint(gapObj.xl, gapRowObj.xl, gapColumnObj.xl),
        "2xl": calculateGapForBreakpoint(
          gapObj["2xl"],
          gapRowObj["2xl"],
          gapColumnObj["2xl"]
        ),
      },
      "normal"
    )
  );
}

function getFlexValue(
  flex?: ResponsiveValue<string>,
  flexGrow?: number,
  flexShrink?: number,
  flexBasis?: string
) {
  if (flex !== undefined) {
    if (typeof flex !== "object") {
      return dynamicFlexboxStyles.flex(flex);
    }
    return dynamicFlexboxStyles.flexResponsive(
      toFullResponsiveObject(flex, "0 1 auto")
    );
  }

  if (
    flexGrow === undefined &&
    flexShrink === undefined &&
    flexBasis === undefined
  ) {
    return undefined;
  }

  const grow = flexGrow ?? 0;
  const shrink = flexShrink ?? 1;
  const basis = flexBasis ?? "auto";
  return dynamicFlexboxStyles.flex(`${grow} ${shrink} ${basis}`);
}

export function getFlexboxStyles(props: FlexboxProps) {
  const {
    flexDirection,
    justifyContent,
    alignItems,
    alignSelf,
    flexWrap,
    gap,
    gapRow,
    gapColumn,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
  } = props;

  const styles = [];

  if (flexDirection) {
    styles.push(
      typeof flexDirection !== "object"
        ? flexDirectionStyles[flexDirection]
        : flexDirectionStylesResponsive.responsive(
            toFullResponsiveObject(flexDirection, "row")
          )
    );
  }

  if (justifyContent) {
    styles.push(
      typeof justifyContent !== "object"
        ? justifyContentStyles[justifyContent]
        : justifyContentStylesResponsive.responsive(
            toFullResponsiveObject(justifyContent, "start")
          )
    );
  }

  if (alignItems) {
    styles.push(
      typeof alignItems !== "object"
        ? alignItemsStyles[alignItems]
        : alignItemsStylesResponsive.responsive(
            toFullResponsiveObject(alignItems, "stretch")
          )
    );
  }

  if (alignSelf) {
    styles.push(
      typeof alignSelf !== "object"
        ? alignSelfStyles[alignSelf]
        : alignSelfStylesResponsive.responsive(
            toFullResponsiveObject(alignSelf, "auto")
          )
    );
  }

  if (flexWrap) {
    styles.push(
      typeof flexWrap !== "object"
        ? flexWrapStyles[flexWrap]
        : flexWrapStylesResponsive.responsive(
            toFullResponsiveObject(flexWrap, "nowrap")
          )
    );
  }

  const gapStyle = getGapValue(gap, gapRow, gapColumn);

  if (gapStyle) {
    styles.push(gapStyle);
  }

  const flexStyle = getFlexValue(flex, flexGrow, flexShrink, flexBasis);

  if (flexStyle) {
    styles.push(flexStyle);
  }

  return styles;
}
