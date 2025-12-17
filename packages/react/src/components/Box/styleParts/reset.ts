import * as stylex from "@stylexjs/stylex";

export const resetStyles = stylex.create({
  base: {
    WebkitTapHighlightColor: "transparent",
    margin: 0,
    padding: 0,
    borderStyle: "solid",
    borderWidth: 0,
    textDecoration: "none",
    appearance: "none",
    backgroundColor: "transparent",
    boxSizing: "border-box",
    color: "inherit",
    fontFamily: "var(--t-font-family-body)",
    fontSize: "var(--t-font-size-md)",
    fontWeight: "var(--t-font-weight-normal)",
    lineHeight: "var(--t-line-height-normal)",
  },

  reducedMotion: {
    animationDuration: {
      "@media (prefers-reduced-motion: reduce)": "0.01ms !important",
    },
    transitionDuration: {
      "@media (prefers-reduced-motion: reduce)": "0.01ms !important",
    },
  },
});
