import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StyleResult,
  getResponsiveVarStyles,
} from "../shared";
import styles from "./grid.module.css";
import clsx from "clsx";

export type JustifySelfValue = "auto" | "start" | "end" | "center" | "stretch";

export type GridProps = {
  justifySelf?: JustifySelfValue;
  gridTemplateColumns?: ResponsiveValue<string>;
  gridTemplateRows?: ResponsiveValue<string>;
};

export type GridStateProps = {
  _hover?: GridProps;
};

function getJustifySelfClass(value: JustifySelfValue, state: StateKey): string | undefined {
  const STATE_CLASS_SUFFIXES: Record<StateKey, string> = {
    base: "",
    hover: "\\:h",
    focus: "\\:f",
    active: "\\:a",
    disabled: "\\:d",
  };
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

  if (justifySelf) {
    const cls = getJustifySelfClass(justifySelf, state);
    if (cls) classes.push(cls);
  }

  const colsResult = getResponsiveVarStyles(
    styles,
    "grid-cols",
    "grid-cols",
    gridTemplateColumns,
    state
  );
  const rowsResult = getResponsiveVarStyles(
    styles,
    "grid-rows",
    "grid-rows",
    gridTemplateRows,
    state
  );

  return {
    className: clsx(...classes, colsResult.className, rowsResult.className),
    style: { ...style, ...colsResult.style, ...rowsResult.style },
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
