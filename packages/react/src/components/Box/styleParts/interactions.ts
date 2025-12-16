import * as stylex from "@stylexjs/stylex";
import {
  breakpoints,
  type ResponsiveValue,
  type FullResponsiveObject,
  toFullResponsiveObject,
} from "../../../utils/breakpoints.stylex";

type CursorValues = keyof typeof cursorStyles;
type PointerEventsValues = keyof typeof pointerEventsStyles;
type UserSelectValues = keyof typeof userSelectStyles;

const cursorStyles = stylex.create({
  auto: {
    cursor: "auto",
  },
  crosshair: {
    cursor: "crosshair",
  },
  default: {
    cursor: "default",
  },
  grab: {
    cursor: "grab",
  },
  grabbing: {
    cursor: "grabbing",
  },
  help: {
    cursor: "help",
  },
  move: {
    cursor: "move",
  },
  notAllowed: {
    cursor: "not-allowed",
  },
  pointer: {
    cursor: "pointer",
  },
  text: {
    cursor: "text",
  },
  wait: {
    cursor: "wait",
  },
  zoomIn: {
    cursor: "zoom-in",
  },
  zoomOut: {
    cursor: "zoom-out",
  },
});

const cursorStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<CursorValues>) => ({
    cursor: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

const pointerEventsStyles = stylex.create({
  all: {
    pointerEvents: "all",
  },
  auto: {
    pointerEvents: "auto",
  },
  none: {
    pointerEvents: "none",
  },
});

const pointerEventsStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<PointerEventsValues>) => ({
    pointerEvents: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

const userSelectStyles = stylex.create({
  all: {
    userSelect: "all",
  },
  auto: {
    userSelect: "auto",
  },
  none: {
    userSelect: "none",
  },
  text: {
    userSelect: "text",
  },
});

const userSelectStylesResponsive = stylex.create({
  responsive: (value: FullResponsiveObject<UserSelectValues>) => ({
    userSelect: {
      default: value.base,
      [breakpoints.sm]: value.sm,
      [breakpoints.md]: value.md,
      [breakpoints.lg]: value.lg,
      [breakpoints.xl]: value.xl,
      [breakpoints["2xl"]]: value["2xl"],
    },
  }),
});

export type Cursor = ResponsiveValue<CursorValues>;
export type PointerEvents = ResponsiveValue<PointerEventsValues>;
export type UserSelect = ResponsiveValue<UserSelectValues>;

export type InteractionProps = {
  cursor?: Cursor;
  pointerEvents?: PointerEvents;
  userSelect?: UserSelect;
};

export function getInteractionStyles(props: InteractionProps) {
  const { cursor, pointerEvents, userSelect } = props;

  const styles = [];

  if (cursor) {
    styles.push(
      typeof cursor !== "object"
        ? cursorStyles[cursor]
        : cursorStylesResponsive.responsive(
            toFullResponsiveObject(cursor, "auto")
          )
    );
  }

  if (pointerEvents) {
    styles.push(
      typeof pointerEvents !== "object"
        ? pointerEventsStyles[pointerEvents]
        : pointerEventsStylesResponsive.responsive(
            toFullResponsiveObject(pointerEvents, "auto")
          )
    );
  }

  if (userSelect) {
    styles.push(
      typeof userSelect !== "object"
        ? userSelectStyles[userSelect]
        : userSelectStylesResponsive.responsive(
            toFullResponsiveObject(userSelect, "auto")
          )
    );
  }

  return styles;
}
