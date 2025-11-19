import {
  type ElementType,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import { clsx } from "clsx";
import styles from "./El.module.css";

export type ElProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithRef<T>, "as" | "className" | "children">;

/**
 * El (Element) - The foundation primitive component
 *
 * A polymorphic component that provides:
 * - Consistent reset styles via CSS module
 * - Ability to render as any HTML element via the `as` prop
 * - Type-safe props based on the element type
 *
 * @example
 * <El>Default div</El>
 * <El as="button" onClick={handleClick}>Button</El>
 * <El as="a" href="/home">Link</El>
 */
export function El<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ElProps<T>) {
  const Component = (as || "div") as ElementType;

  return (
    <Component className={clsx(styles.el, className)} {...props}>
      {children}
    </Component>
  );
}
