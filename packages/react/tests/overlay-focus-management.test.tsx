import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, test } from "vitest";
import { Menu, MenuButton, MenuItem, MenuList, Modal, Popover } from "../src";

afterEach(cleanup);

function ModalHarness() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <button type="button">First action</button>
        <button type="button">Last action</button>
      </Modal>
    </>
  );
}

function MenuHarness() {
  return (
    <>
      <button type="button">Before menu</button>
      <Menu>
        <MenuButton>Open menu</MenuButton>
        <MenuList>
          <MenuItem>First item</MenuItem>
          <MenuItem>Second item</MenuItem>
          <MenuItem>Last item</MenuItem>
        </MenuList>
      </Menu>
      <button type="button">After menu</button>
    </>
  );
}

function PopoverHarness() {
  return (
    <Popover
      content={
        <>
          <button type="button">First popover action</button>
          <button type="button">Last popover action</button>
        </>
      }
    >
      <button type="button">Open popover</button>
    </Popover>
  );
}

describe("overlay focus management", () => {
  test("opening a modal focuses its first interactive element", () => {
    render(<ModalHarness />);

    const opener = screen.getByRole("button", { name: "Open modal" });
    opener.focus();
    fireEvent.click(opener);

    expect(screen.getByRole("button", { name: "First action" })).toHaveFocus();
  });

  test("a modal contains tab focus and restores the opener on close", () => {
    render(<ModalHarness />);

    const opener = screen.getByRole("button", { name: "Open modal" });
    opener.focus();
    fireEvent.click(opener);

    const firstAction = screen.getByRole("button", { name: "First action" });
    const lastAction = screen.getByRole("button", { name: "Last action" });

    lastAction.focus();
    fireEvent.keyDown(lastAction, { key: "Tab" });
    expect(firstAction).toHaveFocus();

    fireEvent.keyDown(firstAction, { key: "Tab", shiftKey: true });
    expect(lastAction).toHaveFocus();

    fireEvent.keyDown(lastAction, { key: "Escape" });
    expect(opener).toHaveFocus();
  });

  test("opening a menu focuses its first item", () => {
    render(<MenuHarness />);

    const opener = screen.getByRole("button", { name: "Open menu" });
    opener.focus();
    fireEvent.click(opener);

    expect(screen.getByRole("menuitem", { name: "First item" })).toHaveFocus();
  });

  test("arrow keys move focus through menu items and wrap", () => {
    render(<MenuHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const firstItem = screen.getByRole("menuitem", { name: "First item" });
    const secondItem = screen.getByRole("menuitem", { name: "Second item" });
    const lastItem = screen.getByRole("menuitem", { name: "Last item" });

    fireEvent.keyDown(firstItem, { key: "ArrowDown" });
    expect(secondItem).toHaveFocus();

    fireEvent.keyDown(secondItem, { key: "ArrowUp" });
    expect(firstItem).toHaveFocus();

    fireEvent.keyDown(firstItem, { key: "ArrowUp" });
    expect(lastItem).toHaveFocus();
  });

  test("Escape closes a menu and restores focus to its trigger", () => {
    render(<MenuHarness />);

    const opener = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(opener);
    fireEvent.keyDown(screen.getByRole("menuitem", { name: "First item" }), {
      key: "Escape",
    });

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  test("Tab closes a menu and moves focus beyond the popup", () => {
    render(<MenuHarness />);

    const opener = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(opener);
    const firstItem = screen.getByRole("menuitem", { name: "First item" });

    expect(firstItem).toHaveAttribute("tabindex", "-1");
    fireEvent.keyDown(firstItem, { key: "Tab" });

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "After menu" })).toHaveFocus();

    fireEvent.click(opener);
    fireEvent.keyDown(
      screen.getByRole("menuitem", { name: "First item" }),
      { key: "Tab", shiftKey: true }
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Before menu" })).toHaveFocus();
  });

  test("opening an interactive popover focuses its first control", () => {
    render(<PopoverHarness />);

    const opener = screen.getByRole("button", { name: "Open popover" });
    opener.focus();
    fireEvent.click(opener);

    expect(
      screen.getByRole("button", { name: "First popover action" })
    ).toHaveFocus();
  });

  test("an interactive popover contains tab focus and restores its trigger", () => {
    render(<PopoverHarness />);

    const opener = screen.getByRole("button", { name: "Open popover" });
    opener.focus();
    fireEvent.click(opener);

    const firstAction = screen.getByRole("button", {
      name: "First popover action",
    });
    const lastAction = screen.getByRole("button", {
      name: "Last popover action",
    });

    lastAction.focus();
    fireEvent.keyDown(lastAction, { key: "Tab" });
    expect(firstAction).toHaveFocus();

    fireEvent.keyDown(firstAction, { key: "Tab", shiftKey: true });
    expect(lastAction).toHaveFocus();

    fireEvent.keyDown(lastAction, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
});
