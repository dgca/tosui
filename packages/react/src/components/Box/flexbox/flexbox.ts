import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getRawValue,
  getResponsiveVarStyles,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./flexbox.module.css";
import clsx from "clsx";

export type FlexDirectionValue = "row" | "row-reverse" | "column" | "column-reverse";
export type JustifyContentValue = "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
export type AlignItemsValue = "start" | "end" | "center" | "stretch" | "baseline";
export type AlignSelfValue = "auto" | "start" | "end" | "center" | "stretch" | "baseline";
export type FlexWrapValue = "nowrap" | "wrap" | "wrap-reverse";
export type SpacingValue = number | string;

export type FlexboxProps = {
  flexDirection?: ResponsiveValue<FlexDirectionValue>;
  justifyContent?: ResponsiveValue<JustifyContentValue>;
  alignItems?: ResponsiveValue<AlignItemsValue>;
  alignSelf?: ResponsiveValue<AlignSelfValue>;
  flexWrap?: ResponsiveValue<FlexWrapValue>;
  gap?: ResponsiveValue<SpacingValue>;
  gapRow?: ResponsiveValue<SpacingValue>;
  gapColumn?: ResponsiveValue<SpacingValue>;
  flex?: ResponsiveValue<string>;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
};

function getFlexboxStylesForState(
  props: FlexboxProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

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

  const classes: string[] = [];
  const style: Record<string, string> = {};

  const dirResult = getEnumResponsiveStyles(styles, "flex", flexDirection, state);
  if (dirResult.className) classes.push(dirResult.className);

  const justifyResult = getEnumResponsiveStyles(styles, "justify", justifyContent, state);
  if (justifyResult.className) classes.push(justifyResult.className);

  const itemsResult = getEnumResponsiveStyles(styles, "items", alignItems, state);
  if (itemsResult.className) classes.push(itemsResult.className);

  const selfResult = getEnumResponsiveStyles(styles, "self", alignSelf, state);
  if (selfResult.className) classes.push(selfResult.className);

  const wrapResult = getEnumResponsiveStyles(styles, "flex", flexWrap, state);
  if (wrapResult.className) classes.push(wrapResult.className);

  const resolvedGapRow = gapRow ?? gap;
  const resolvedGapCol = gapColumn ?? gap;

  const gapRowResult = getResponsiveVarStyles(styles, "gap-row", "gap-row", resolvedGapRow, state, getRawValue);
  const gapColResult = getResponsiveVarStyles(styles, "gap-col", "gap-col", resolvedGapCol, state, getRawValue);

  if (gapRowResult.className) classes.push(gapRowResult.className);
  if (gapColResult.className) classes.push(gapColResult.className);
  Object.assign(style, gapRowResult.style, gapColResult.style);

  if (flex !== undefined) {
    const flexResult = getResponsiveVarStyles(styles, "flex", "flex", flex, state);
    if (flexResult.className) classes.push(flexResult.className);
    Object.assign(style, flexResult.style);
  } else if (flexGrow !== undefined || flexShrink !== undefined || flexBasis !== undefined) {
    const composedFlex = `${flexGrow ?? 0} ${flexShrink ?? 1} ${flexBasis ?? "auto"}`;
    const flexResult = getResponsiveVarStyles(styles, "flex", "flex", composedFlex, state);
    if (flexResult.className) classes.push(flexResult.className);
    Object.assign(style, flexResult.style);
  }

  return {
    className: clsx(...classes),
    style,
  };
}

export function getFlexboxStyles(
  props: FlexboxProps & StateProps<FlexboxProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getFlexboxStylesForState(baseProps, "base");
  const hoverStyles = getFlexboxStylesForState(_hover, "hover");
  const focusStyles = getFlexboxStylesForState(_focus, "focus");
  const activeStyles = getFlexboxStylesForState(_active, "active");
  const disabledStyles = getFlexboxStylesForState(_disabled, "disabled");

  return {
    className: clsx(
      baseStyles.className,
      hoverStyles.className,
      focusStyles.className,
      activeStyles.className,
      disabledStyles.className
    ),
    style: { ...baseStyles.style, ...hoverStyles.style, ...focusStyles.style, ...activeStyles.style, ...disabledStyles.style } as Record<string, string>,
  };
}
