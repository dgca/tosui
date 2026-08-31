import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Image } from "../src";

afterEach(cleanup);

describe("Image accessibility", () => {
  test("preserves informative alt text after both sources fail", () => {
    render(
      <Image
        src="/product.webp"
        fallbackSrc="/product-fallback.webp"
        alt="Blue running shoe"
      />
    );

    fireEvent.error(screen.getByRole("img", { name: "Blue running shoe" }));
    fireEvent.error(screen.getByRole("img", { name: "Blue running shoe" }));

    expect(
      screen.getByRole("img", { name: "Blue running shoe" })
    ).toBeInTheDocument();
  });

  test("keeps the error placeholder decorative when alt text is empty", () => {
    const { container } = render(
      <Image
        src="/decoration.webp"
        fallbackSrc="/decoration-fallback.webp"
        alt=""
      />
    );

    const image = container.querySelector("img");
    expect(image).not.toBeNull();
    fireEvent.error(image!);
    fireEvent.error(container.querySelector("img")!);

    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
