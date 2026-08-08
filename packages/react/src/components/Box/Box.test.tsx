import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Box } from "../components/Box/Box";

describe("Box", () => {
  it("renders a div by default", () => {
    render(<Box>Content</Box>);
    const container = screen.getByRole("generic");
    expect(container).toBeInTheDocument();
    expect(container.textContent).toBe("Content");
  });

  it("applies className", () => {
    render(<Box className="test-class">Content</Box>);
    const container = screen.getByRole("generic");
    expect(container).toHaveClass("test-class");
  });

  it("passes style through", () => {
    render(<Box style={{ color: "red" }}>Content</Box>);
    const container = screen.getByRole("generic");
    expect(container).toHaveStyle({ color: "red" });
  });
});
