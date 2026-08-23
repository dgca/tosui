import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Pagination } from "../src";

afterEach(cleanup);

describe("Pagination", () => {
  test("defaultPage initializes and advances an uncontrolled pagination", () => {
    render(<Pagination defaultPage={2} totalPages={3} />);

    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page"
    );

    fireEvent.click(screen.getByRole("button", { name: "Next page" }));

    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  test("uncontrolled usage still reports page changes", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        defaultPage={1}
        totalPages={3}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Page 3" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
