import { type ElementType } from "react";
import { El, type ElProps } from "../El";
import { clsx } from "clsx";
import styles from "./Box.module.css";

type SpacingValues =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32;

export type BoxProps<T extends ElementType = "div"> = ElProps<T> & {
  p?: SpacingValues;
  pt?: SpacingValues;
  pr?: SpacingValues;
  pb?: SpacingValues;
  pl?: SpacingValues;
  px?: SpacingValues;
  py?: SpacingValues;
  m?: SpacingValues;
  mt?: SpacingValues;
  mr?: SpacingValues;
  mb?: SpacingValues;
  ml?: SpacingValues;
  mx?: SpacingValues;
  my?: SpacingValues;
};

export function Box<T extends ElementType = "div">({
  as,
  className,
  children,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  ...props
}: BoxProps<T>) {
  return (
    <El
      as={(as ?? "div") as ElementType}
      className={clsx(
        // Padding: all -> axis -> directional (cascading specificity)
        p !== undefined && styles[`p-${p}`],
        px !== undefined && styles[`px-${px}`],
        py !== undefined && styles[`py-${py}`],
        pt !== undefined && styles[`pt-${pt}`],
        pr !== undefined && styles[`pr-${pr}`],
        pb !== undefined && styles[`pb-${pb}`],
        pl !== undefined && styles[`pl-${pl}`],
        // Margin: all -> axis -> directional (cascading specificity)
        m !== undefined && styles[`m-${m}`],
        mx !== undefined && styles[`mx-${mx}`],
        my !== undefined && styles[`my-${my}`],
        mt !== undefined && styles[`mt-${mt}`],
        mr !== undefined && styles[`mr-${mr}`],
        mb !== undefined && styles[`mb-${mb}`],
        ml !== undefined && styles[`ml-${ml}`],
        className
      )}
      {...props}
    >
      {children}
    </El>
  );
}
