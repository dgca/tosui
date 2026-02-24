import type { ResponsiveValue } from "@/utils/breakpoints";
import {
  type StateKey,
  type StateProps,
  type StyleResult,
  getEnumResponsiveStyles,
} from "../shared";
import styles from "./interactions.module.css";
import clsx from "clsx";

export type CursorValue =
  | "auto"
  | "default"
  | "pointer"
  | "wait"
  | "text"
  | "move"
  | "not-allowed"
  | "grab"
  | "grabbing"
  | "zoom-in"
  | "zoom-out"
  | "crosshair";

export type PointerEventsValue = "auto" | "none" | "all";

export type UserSelectValue = "auto" | "none" | "text" | "all";

export type InteractionProps = {
  cursor?: ResponsiveValue<CursorValue>;
  pointerEvents?: ResponsiveValue<PointerEventsValue>;
  userSelect?: ResponsiveValue<UserSelectValue>;
};

function getInteractionStylesForState(
  props: InteractionProps | undefined,
  state: StateKey
): StyleResult {
  if (!props) return { className: "", style: {} };

  const cursorResult = getEnumResponsiveStyles(styles, "cursor", props.cursor, state);
  const pointerResult = getEnumResponsiveStyles(styles, "pointer", props.pointerEvents, state);
  const selectResult = getEnumResponsiveStyles(styles, "select", props.userSelect, state);

  return {
    className: clsx(cursorResult.className, pointerResult.className, selectResult.className),
    style: {},
  };
}

export function getInteractionStyles(
  props: InteractionProps & StateProps<InteractionProps>
): StyleResult {
  const { _hover, _focus, _active, _disabled, ...baseProps } = props;

  const baseStyles = getInteractionStylesForState(baseProps, "base");
  const hoverStyles = getInteractionStylesForState(_hover, "hover");
  const focusStyles = getInteractionStylesForState(_focus, "focus");
  const activeStyles = getInteractionStylesForState(_active, "active");
  const disabledStyles = getInteractionStylesForState(_disabled, "disabled");

  return {
    className: clsx(
      baseStyles.className,
      hoverStyles.className,
      focusStyles.className,
      activeStyles.className,
      disabledStyles.className
    ),
    style: {},
  };
}
