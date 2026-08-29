import { createRef, type ComponentPropsWithRef, type ElementType } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Link,
  Text,
  type ButtonProps,
  type HeadingProps,
  type TextOwnProps,
} from "../src";

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;

const headingSupportsEveryTextColor: Equal<
  HeadingProps["color"],
  TextOwnProps["color"]
> = true;

/**
 * A consumer-defined adapter can combine Box styles with forwarded
 * polymorphic props without an implementation-level type suppression.
 */
export function PolymorphicButtonAdapter<T extends ElementType = "button">({
  as,
  ...rest
}: ButtonProps<T>) {
  const Component = as || "button";
  return (
    <Box
      as={Component}
      display="inline-flex"
      disabled={false}
      aria-disabled={false}
      {...rest}
    />
  );
}

export function RouterLink({
  to,
  ...rest
}: { to: string } & Omit<ComponentPropsWithRef<"a">, "href">) {
  return <a href={to} {...rest} />;
}

export function PolymorphicTypeFixtures() {
  const buttonRef = createRef<HTMLButtonElement>();
  const anchorRef = createRef<HTMLAnchorElement>();
  const divRef = createRef<HTMLDivElement>();

  // @ts-expect-error An anchor ref is incompatible with a div Box.
  const invalidBoxRef = <Box ref={anchorRef} />;
  // @ts-expect-error The selected anchor element requires an anchor ref.
  const invalidButtonRef = <Button as="a" ref={divRef} />;
  // @ts-expect-error Button defaults to a button unless as selects another element.
  const invalidDefaultButtonProp = <Button href="/docs" />;
  // @ts-expect-error A span does not accept href.
  const invalidTextProp = <Text as="span" href="/docs" />;
  // @ts-expect-error RouterLink requires its to prop.
  const invalidCustomComponentProp = <Link as={RouterLink} />;

  void invalidBoxRef;
  void invalidButtonRef;
  void invalidDefaultButtonProp;
  void invalidTextProp;
  void invalidCustomComponentProp;
  void headingSupportsEveryTextColor;

  return (
    <>
      <Box as="a" href="/docs" ref={anchorRef} />
      <Button ref={buttonRef}>Save</Button>
      <Button as="a" href="/docs" ref={anchorRef}>
        Documentation
      </Button>
      <Link as={RouterLink} to="/settings">
        Settings
      </Link>
      <Text as="label" htmlFor="email">
        Email
      </Text>
      <Grid alignContent={{ base: "start", lg: "space-between" }} />
      <Heading color="foreground-inverted">Inverted heading</Heading>
      <Heading color="info-emphasis">Informational heading</Heading>
    </>
  );
}
