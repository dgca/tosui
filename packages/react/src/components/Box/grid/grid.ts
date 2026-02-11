import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  RESPONSIVE_KEYS,
  STATE_SUFFIXES,
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./grid.module.css";
import clsx from "clsx";

export type JustifySelfValue = "auto" | "start" | "end" | "center" | "stretch";

type GridTemplateKey = "grid-cols" | "grid-rows";

export type GridProps = {
  justifySelf?: JustifySelfValue;
  gridTemplateColumns?: ResponsiveValue<string>;
  gridTemplateRows?: ResponsiveValue<string>;
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

function getGridTemplateProp(
  key: GridTemplateKey,
  varPrefix: string,
  value: ResponsiveValue<string> | undefined,
  state: StateKey = "base"
): StyleResult {
  const result: StyleResult = { className: "", style: {} };

  if (value === undefined) return result;

  const stateSuffix = STATE_SUFFIXES[state];
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];

  if (typeof value !== "object") {
    const className = stateClassSuffix
      ? styles[`${key}${stateClassSuffix}`]
      : styles[key];
    result.className = className || "";
    result.style[`--t-${varPrefix}${stateSuffix}`] = value;
    return result;
  }

  for (const responsiveKey of RESPONSIVE_KEYS) {
    const val = value[responsiveKey];
    if (val === undefined) continue;

    let className: string | undefined;
    let varName: string;

    if (responsiveKey === "base") {
      className = stateClassSuffix
        ? styles[`${key}${stateClassSuffix}`]
        : styles[key];
      varName = `--t-${varPrefix}${stateSuffix}`;
    } else {
      className = stateClassSuffix
        ? styles[`${key}_${responsiveKey}${stateClassSuffix}`]
        : styles[`${key}_${responsiveKey}`];
      varName = `--t-${varPrefix}_${responsiveKey}${stateSuffix}`;
    }

    if (className) {
      result.className = clsx(result.className, className);
    }
    result.style[varName] = val;
  }

  return result;
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

  const colsResult = getGridTemplateProp("grid-cols", "grid-cols", gridTemplateColumns, state);
  const rowsResult = getGridTemplateProp("grid-rows", "grid-rows", gridTemplateRows, state);

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
