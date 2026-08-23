import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Text } from "../src";

afterEach(cleanup);

describe("polymorphic component defaults", () => {
  test("Text renders a span when as is omitted", () => {
    render(<Text>Body copy</Text>);

    expect(screen.getByText("Body copy").tagName).toBe("SPAN");
  });
});
