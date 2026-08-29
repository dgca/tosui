import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Box, Heading, Text } from "../src";
import { getColorStyles } from "../src/components/Box/colors/colors";

afterEach(cleanup);

describe("polymorphic component defaults", () => {
  test("Text renders a span when as is omitted", () => {
    render(<Text>Body copy</Text>);

    expect(screen.getByText("Body copy").tagName).toBe("SPAN");
  });

  test("an outer Box color overrides Heading's default color", () => {
    render(
      <Box as={Heading} color="foreground-inverted">
        Artist Claims
      </Box>
    );

    const heading = screen.getByRole("heading", { name: "Artist Claims" });
    const invertedClass = getColorStyles({
      color: "foreground-inverted",
    }).className;
    const foregroundClass = getColorStyles({ color: "foreground" }).className;

    expect(heading).toHaveClass(invertedClass!);
    expect(heading).not.toHaveClass(foregroundClass!);
  });
});
