import {
  STATE_SUFFIXES,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./grid.module.css";
import clsx from "clsx";

export type JustifySelfValue = "auto" | "start" | "end" | "center" | "stretch";

export type GridProps = {
  justifySelf?: JustifySelfValue;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
};

export type GridStateProps = {
  _hover?: GridProps;
};

function getJustifySelfClass(value: JustifySelfValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`justify-self-${value}${stateClassSuffix}`]
    : styles[`justify-self-${value}`];
}

function getGridStylesForState(
  props: GridProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const { justifySelf, gridTemplateColumns, gridTemplateRows } = props;

  const classes: string[] = [];
  const style: Record<string, string> = {};
  const stateVarSuffix = STATE_SUFFIXES[state];
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];

  // Enumerated prop
  if (justifySelf) {
    const cls = getJustifySelfClass(justifySelf, state);
    if (cls) classes.push(cls);
  }

  // Variable-based props
  if (gridTemplateColumns !== undefined) {
    const gridColsClass = stateClassSuffix ? styles[`grid-cols${stateClassSuffix}`] : styles["grid-cols"];
    if (gridColsClass) classes.push(gridColsClass);
    style[`--t-grid-cols${stateVarSuffix}`] = gridTemplateColumns;
  }

  if (gridTemplateRows !== undefined) {
    const gridRowsClass = stateClassSuffix ? styles[`grid-rows${stateClassSuffix}`] : styles["grid-rows"];
    if (gridRowsClass) classes.push(gridRowsClass);
    style[`--t-grid-rows${stateVarSuffix}`] = gridTemplateRows;
  }

  return {
    className: clsx(...classes),
    style,
  };
}

export function getGridStyles(
  props: GridProps & GridStateProps
): StyleResult {
  const { justifySelf, gridTemplateColumns, gridTemplateRows, _hover } = props;

  const baseStyles = getGridStylesForState(
    { justifySelf, gridTemplateColumns, gridTemplateRows },
    "base"
  );
  const hoverStyles = getGridStylesForState(_hover, "hover");

  return {
    className: clsx(baseStyles.className, hoverStyles.className),
    style: { ...baseStyles.style, ...hoverStyles.style } as Record<string, string>,
  };
}
