import {
  STATE_SUFFIXES,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
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
  flexDirection?: FlexDirectionValue;
  justifyContent?: JustifyContentValue;
  alignItems?: AlignItemsValue;
  alignSelf?: AlignSelfValue;
  flexWrap?: FlexWrapValue;
  gap?: SpacingValue;
  gapRow?: SpacingValue;
  gapColumn?: SpacingValue;
  flex?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
};

export type FlexboxStateProps = {
  _hover?: FlexboxProps;
};

function getFlexDirectionClass(value: FlexDirectionValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`flex-${value}${stateClassSuffix}`]
    : styles[`flex-${value}`];
}

function getJustifyContentClass(value: JustifyContentValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`justify-${value}${stateClassSuffix}`]
    : styles[`justify-${value}`];
}

function getAlignItemsClass(value: AlignItemsValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`items-${value}${stateClassSuffix}`]
    : styles[`items-${value}`];
}

function getAlignSelfClass(value: AlignSelfValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`self-${value}${stateClassSuffix}`]
    : styles[`self-${value}`];
}

function getFlexWrapClass(value: FlexWrapValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`flex-${value}${stateClassSuffix}`]
    : styles[`flex-${value}`];
}

function getSpacingValue(value?: SpacingValue): string {
  if (value === undefined) return "normal";
  if (typeof value === "string") return value;
  if (value === 0) return "0";
  return `calc(var(--t-spacing-unit) * ${value})`;
}

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
  const stateVarSuffix = STATE_SUFFIXES[state];
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];

  // Enumerated props
  if (flexDirection) {
    const cls = getFlexDirectionClass(flexDirection, state);
    if (cls) classes.push(cls);
  }

  if (justifyContent) {
    const cls = getJustifyContentClass(justifyContent, state);
    if (cls) classes.push(cls);
  }

  if (alignItems) {
    const cls = getAlignItemsClass(alignItems, state);
    if (cls) classes.push(cls);
  }

  if (alignSelf) {
    const cls = getAlignSelfClass(alignSelf, state);
    if (cls) classes.push(cls);
  }

  if (flexWrap) {
    const cls = getFlexWrapClass(flexWrap, state);
    if (cls) classes.push(cls);
  }

  // Variable-based props: gap
  if (gap !== undefined || gapRow !== undefined || gapColumn !== undefined) {
    const row = gapRow ?? gap;
    const column = gapColumn ?? gap;
    const rowValue = getSpacingValue(row);
    const columnValue = getSpacingValue(column);
    const gapValue = rowValue === columnValue ? rowValue : `${rowValue} ${columnValue}`;

    const gapClass = stateClassSuffix ? styles[`gap${stateClassSuffix}`] : styles.gap;
    if (gapClass) classes.push(gapClass);
    style[`--t-gap${stateVarSuffix}`] = gapValue;
  }

  // Variable-based props: flex
  if (flex !== undefined) {
    const flexClass = stateClassSuffix ? styles[`flex${stateClassSuffix}`] : styles.flex;
    if (flexClass) classes.push(flexClass);
    style[`--t-flex${stateVarSuffix}`] = flex;
  } else if (flexGrow !== undefined || flexShrink !== undefined || flexBasis !== undefined) {
    const grow = flexGrow ?? 0;
    const shrink = flexShrink ?? 1;
    const basis = flexBasis ?? "auto";
    const flexClass = stateClassSuffix ? styles[`flex${stateClassSuffix}`] : styles.flex;
    if (flexClass) classes.push(flexClass);
    style[`--t-flex${stateVarSuffix}`] = `${grow} ${shrink} ${basis}`;
  }

  return {
    className: clsx(...classes),
    style,
  };
}

export function getFlexboxStyles(
  props: FlexboxProps & FlexboxStateProps
): StyleResult {
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
    _hover,
  } = props;

  const baseStyles = getFlexboxStylesForState(
    {
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
    },
    "base"
  );
  const hoverStyles = getFlexboxStylesForState(_hover, "hover");

  return {
    className: clsx(baseStyles.className, hoverStyles.className),
    style: { ...baseStyles.style, ...hoverStyles.style } as Record<string, string>,
  };
}
