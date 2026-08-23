import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Accordion, AccordionItem } from "../src";

afterEach(cleanup);

describe("Accordion", () => {
  test("items use their position when index is omitted", () => {
    render(
      <Accordion>
        <AccordionItem title="First">First content</AccordionItem>
        <AccordionItem title="Second">Second content</AccordionItem>
      </Accordion>
    );

    fireEvent.click(screen.getByRole("button", { name: /^Second/ }));

    expect(screen.getByRole("button", { name: /^First/ })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(screen.getByRole("button", { name: /^Second/ })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  test("single mode reports the expanded index and a subsequent collapse", () => {
    const onChange = vi.fn();
    render(
      <Accordion onChange={onChange}>
        <AccordionItem title="First">First content</AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByRole("button", { name: /^First/ });

    fireEvent.click(trigger);
    fireEvent.click(trigger);

    expect(onChange).toHaveBeenNthCalledWith(1, 0);
    expect(onChange).toHaveBeenNthCalledWith(2, null);
  });

  test("multiple mode reports all expanded indexes after each toggle", () => {
    const onChange = vi.fn();
    render(
      <Accordion allowMultiple onChange={onChange}>
        <AccordionItem title="First">First content</AccordionItem>
        <AccordionItem title="Second">Second content</AccordionItem>
      </Accordion>
    );
    const first = screen.getByRole("button", { name: /^First/ });
    const second = screen.getByRole("button", { name: /^Second/ });

    fireEvent.click(first);
    fireEvent.click(second);
    fireEvent.click(first);

    expect(onChange).toHaveBeenNthCalledWith(1, [0]);
    expect(onChange).toHaveBeenNthCalledWith(2, [0, 1]);
    expect(onChange).toHaveBeenNthCalledWith(3, [1]);
  });

  test("a collapsed panel stays mounted for animation but leaves interaction", () => {
    render(
      <Accordion defaultIndex={0}>
        <AccordionItem title="First">First content</AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByRole("button", { name: /^First/ });
    const panel = screen.getByRole("region");
    expect(trigger).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("aria-hidden", "false");

    fireEvent.click(trigger);

    expect(screen.getByText("First content")).toBeInTheDocument();
    expect(panel).toHaveAttribute("aria-hidden", "true");
    expect(panel).toHaveAttribute("inert");
  });

  test("the expand indicator is a decorative SVG", () => {
    render(
      <Accordion>
        <AccordionItem title="First">First content</AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByRole("button", { name: /^First/ });

    expect(trigger).toHaveAccessibleName("First");
    expect(trigger.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
