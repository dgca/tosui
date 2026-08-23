import { renderToString } from "react-dom/server";
import { describe, expect, test } from "vitest";
import { Modal, Popover, Tooltip } from "../src";

describe("overlay server rendering", () => {
  test("an open Modal does not create a portal during server rendering", () => {
    expect(() =>
      renderToString(
        <Modal isOpen onClose={() => undefined}>
          Modal content
        </Modal>
      )
    ).not.toThrow();
  });

  test("an open Tooltip does not create a portal during server rendering", () => {
    expect(() =>
      renderToString(
        <Tooltip label="Helpful text" isOpen>
          Trigger
        </Tooltip>
      )
    ).not.toThrow();
  });

  test("an open Popover does not create a portal during server rendering", () => {
    expect(() =>
      renderToString(
        <Popover content="Popover content" isOpen>
          Trigger
        </Popover>
      )
    ).not.toThrow();
  });
});
