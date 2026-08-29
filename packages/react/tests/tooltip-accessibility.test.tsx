import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Badge, Tooltip } from "../src";

afterEach(cleanup);

describe("Tooltip accessibility", () => {
  test("associates a focusable trigger with the rendered tooltip", () => {
    render(
      <Tooltip label="Copy order ID">
        <button type="button" aria-describedby="order-hint">
          abc…123
        </button>
      </Tooltip>
    );

    const trigger = screen.getByRole("button", { name: "abc…123" });
    expect(trigger.parentElement).not.toHaveAttribute("tabindex");

    fireEvent.focus(trigger);

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveAttribute("id");
    expect(trigger).toHaveAttribute(
      "aria-describedby",
      `order-hint ${tooltip.id}`
    );
    expect(trigger).toHaveAccessibleDescription("Copy order ID");

    fireEvent.blur(trigger);
    expect(trigger).toHaveAttribute("aria-describedby", "order-hint");
  });

  test("makes a non-interactive visual trigger keyboard accessible", () => {
    render(
      <Tooltip label="Order is still processing">
        <Badge>Processing</Badge>
      </Tooltip>
    );

    const wrapper = screen.getByText("Processing").parentElement;
    expect(wrapper).toHaveAttribute("tabindex", "0");

    fireEvent.focus(wrapper!);

    const tooltip = screen.getByRole("tooltip");
    expect(wrapper).toHaveAttribute("aria-describedby", tooltip.id);
    expect(wrapper).toHaveAccessibleDescription("Order is still processing");
  });
});
