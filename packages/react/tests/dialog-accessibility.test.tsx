import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Modal, Popover } from "../src";

afterEach(cleanup);

describe("dialog accessibility", () => {
  test("names a Modal with aria-label", () => {
    render(
      <Modal isOpen onClose={() => undefined} aria-label="Edit profile">
        Modal content
      </Modal>
    );

    expect(
      screen.getByRole("dialog", { name: "Edit profile" })
    ).toBeInTheDocument();
  });

  test("names a Modal with aria-labelledby", () => {
    render(
      <Modal isOpen onClose={() => undefined} aria-labelledby="modal-title">
        <h2 id="modal-title">Delete account</h2>
      </Modal>
    );

    expect(
      screen.getByRole("dialog", { name: "Delete account" })
    ).toBeInTheDocument();
  });

  test("associates a Popover trigger with its named dialog", () => {
    const onClick = vi.fn();

    render(
      <>
        <span id="filter-hint">Shows available filters</span>
        <div id="existing-panel">Existing panel</div>
        <Popover content="Filter controls" aria-label="Filters">
          <button
            type="button"
            aria-controls="existing-panel"
            aria-describedby="filter-hint"
            onClick={onClick}
          >
            Open filters
          </button>
        </Popover>
      </>
    );

    const trigger = screen.getByRole("button", { name: "Open filters" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-describedby", "filter-hint");
    expect(trigger.parentElement).not.toHaveAttribute("aria-haspopup");

    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(dialog).toHaveAttribute("id");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger.getAttribute("aria-controls")?.split(/\s+/)).toEqual([
      "existing-panel",
      dialog.id,
    ]);
    expect(onClick).toHaveBeenCalledOnce();
  });

  test("names a Popover with aria-labelledby", () => {
    render(
      <Popover
        isOpen
        aria-labelledby="popover-title"
        content={<h2 id="popover-title">Filter options</h2>}
      >
        <button type="button">Open options</button>
      </Popover>
    );

    expect(
      screen.getByRole("dialog", { name: "Filter options" })
    ).toBeInTheDocument();
  });

  test("gives each Popover a distinct panel relationship", () => {
    render(
      <>
        <Popover content="First panel">
          <button type="button">First trigger</button>
        </Popover>
        <Popover content="Second panel">
          <button type="button">Second trigger</button>
        </Popover>
      </>
    );

    const firstId = screen
      .getByRole("button", { name: "First trigger" })
      .getAttribute("aria-controls");
    const secondId = screen
      .getByRole("button", { name: "Second trigger" })
      .getAttribute("aria-controls");

    expect(firstId).toBeTruthy();
    expect(secondId).toBeTruthy();
    expect(firstId).not.toBe(secondId);
  });

  test("makes a non-element Popover trigger keyboard operable", () => {
    render(
      <Popover content="Popover content" aria-label="More information">
        More information
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "More information" });
    fireEvent.keyDown(trigger, { key: "Enter" });

    expect(
      screen.getByRole("dialog", { name: "More information" })
    ).toBeInTheDocument();
  });
});
