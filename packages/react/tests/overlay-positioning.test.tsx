import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Popover, Tooltip } from "../src";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function rect({
  top,
  left,
  width,
  height,
}: {
  top: number;
  left: number;
  width: number;
  height: number;
}): DOMRect {
  return {
    top,
    right: left + width,
    bottom: top + height,
    left,
    width,
    height,
    x: left,
    y: top,
    toJSON: () => ({}),
  };
}

describe("overlay positioning", () => {
  test("an open Tooltip follows its trigger when an ancestor scrolls", () => {
    let triggerTop = 100;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function getBoundingClientRect(this: HTMLElement) {
        if (this.getAttribute("role") === "tooltip") {
          return rect({ top: 0, left: 0, width: 40, height: 10 });
        }
        return rect({ top: triggerTop, left: 50, width: 20, height: 20 });
      }
    );

    const { container } = render(
      <div>
        <Tooltip label="Helpful text" placement="bottom" isOpen>
          Trigger
        </Tooltip>
      </div>
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveStyle({ top: "128px", left: "40px" });

    triggerTop = 40;
    act(() => container.firstElementChild?.dispatchEvent(new Event("scroll")));

    expect(tooltip).toHaveStyle({ top: "68px", left: "40px" });
  });

  test("an open Popover follows its trigger when an ancestor scrolls", () => {
    let triggerTop = 120;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function getBoundingClientRect(this: HTMLElement) {
        if (this.getAttribute("role") === "dialog") {
          return rect({ top: 0, left: 0, width: 80, height: 30 });
        }
        return rect({ top: triggerTop, left: 100, width: 40, height: 20 });
      }
    );

    const { container } = render(
      <div>
        <Popover content="Popover content" placement="right" isOpen>
          Trigger
        </Popover>
      </div>
    );
    const popover = screen.getByRole("dialog");
    expect(popover).toHaveStyle({ top: "115px", left: "148px" });

    triggerTop = 60;
    act(() => container.firstElementChild?.dispatchEvent(new Event("scroll")));

    expect(popover).toHaveStyle({ top: "55px", left: "148px" });
  });

  test("an open Tooltip follows its trigger when the viewport resizes", () => {
    let triggerLeft = 50;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function getBoundingClientRect(this: HTMLElement) {
        if (this.getAttribute("role") === "tooltip") {
          return rect({ top: 0, left: 0, width: 40, height: 10 });
        }
        return rect({ top: 100, left: triggerLeft, width: 20, height: 20 });
      }
    );

    render(
      <Tooltip label="Helpful text" placement="bottom" isOpen>
        Trigger
      </Tooltip>
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveStyle({ top: "128px", left: "40px" });

    triggerLeft = 90;
    act(() => window.dispatchEvent(new Event("resize")));

    expect(tooltip).toHaveStyle({ top: "128px", left: "80px" });
  });
});
