import {
  STATE_CLASS_SUFFIXES,
  type StateKey,
  type StyleResult,
} from "../shared";
import styles from "./roundness.module.css";
import clsx from "clsx";

export type RoundedValue = "none" | "sm" | "md" | "lg" | "full";

export type RoundnessProps = {
  rounded?: RoundedValue;
  roundedTop?: RoundedValue;
  roundedBottom?: RoundedValue;
  roundedLeft?: RoundedValue;
  roundedRight?: RoundedValue;
  roundedTopLeft?: RoundedValue;
  roundedTopRight?: RoundedValue;
  roundedBottomLeft?: RoundedValue;
  roundedBottomRight?: RoundedValue;
};

export type RoundnessStateProps = {
  _hover?: RoundnessProps;
};

function getRoundedTopLeftClass(value: RoundedValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`rounded-tl-${value}${stateClassSuffix}`]
    : styles[`rounded-tl-${value}`];
}

function getRoundedTopRightClass(value: RoundedValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`rounded-tr-${value}${stateClassSuffix}`]
    : styles[`rounded-tr-${value}`];
}

function getRoundedBottomRightClass(value: RoundedValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`rounded-br-${value}${stateClassSuffix}`]
    : styles[`rounded-br-${value}`];
}

function getRoundedBottomLeftClass(value: RoundedValue, state: StateKey): string | undefined {
  const stateClassSuffix = STATE_CLASS_SUFFIXES[state];
  return stateClassSuffix
    ? styles[`rounded-bl-${value}${stateClassSuffix}`]
    : styles[`rounded-bl-${value}`];
}

function getRoundnessStylesForState(
  props: RoundnessProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

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

  const classes: string[] = [];

  // Cascading specificity: individual corner > side > all
  const topLeft = roundedTopLeft ?? roundedTop ?? roundedLeft ?? rounded;
  const topRight = roundedTopRight ?? roundedTop ?? roundedRight ?? rounded;
  const bottomRight = roundedBottomRight ?? roundedBottom ?? roundedRight ?? rounded;
  const bottomLeft = roundedBottomLeft ?? roundedBottom ?? roundedLeft ?? rounded;

  if (topLeft) {
    const cls = getRoundedTopLeftClass(topLeft, state);
    if (cls) classes.push(cls);
  }

  if (topRight) {
    const cls = getRoundedTopRightClass(topRight, state);
    if (cls) classes.push(cls);
  }

  if (bottomRight) {
    const cls = getRoundedBottomRightClass(bottomRight, state);
    if (cls) classes.push(cls);
  }

  if (bottomLeft) {
    const cls = getRoundedBottomLeftClass(bottomLeft, state);
    if (cls) classes.push(cls);
  }

  return { className: clsx(...classes), style: {} };
}

export function getRoundnessStyles(
  props: RoundnessProps & RoundnessStateProps
): StyleResult {
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
    _hover,
  } = props;

  const baseStyles = getRoundnessStylesForState(
    {
      rounded,
      roundedTop,
      roundedBottom,
      roundedLeft,
      roundedRight,
      roundedTopLeft,
      roundedTopRight,
      roundedBottomLeft,
      roundedBottomRight,
    },
    "base"
  );
  const hoverStyles = getRoundnessStylesForState(_hover, "hover");

  return {
    className: clsx(baseStyles.className, hoverStyles.className),
    style: {},
  };
}
