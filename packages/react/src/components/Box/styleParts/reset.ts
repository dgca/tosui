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
    fontFamily: "var(--tosui-font-family-body)",
    fontSize: "var(--tosui-font-size-md)",
    fontWeight: "var(--tosui-font-weight-normal)",
    lineHeight: "var(--tosui-line-height-normal)",
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
