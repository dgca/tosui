import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import {
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
  FormField,
  Input,
  Radio,
  Select,
  Switch,
  Textarea,
} from "../src";

afterEach(cleanup);

describe("FormField composition", () => {
  test("the stack exclusively owns spacing around its internal label", () => {
    render(
      <FormField label="Email" helperText="Used for receipts">
        <Input type="email" />
      </FormField>
    );

    const label = screen.getByText("Email");
    const stackStyle = label.parentElement!.style;
    expect(label.style.getPropertyValue("--t-mb")).toBe("0");
    expect(stackStyle.getPropertyValue("--t-gap-row")).toBe(
      "calc(var(--t-spacing-unit) * 1)"
    );
    expect(stackStyle.getPropertyValue("--t-gap-col")).toBe(
      "calc(var(--t-spacing-unit) * 1)"
    );
  });

  test("a built-in control remains associated through layout markup", () => {
    render(
      <FormField label="Email" helperText="Used for receipts">
        <div>
          <Input type="email" />
        </div>
      </FormField>
    );

    const input = screen.getByLabelText(/^Email/);
    expect(input.parentElement).not.toHaveAttribute("id");
    expect(input.parentElement).not.toHaveAttribute("aria-invalid");
    expect(input).toHaveAccessibleDescription("Used for receipts");
  });

  test("field helper text extends a control's existing description", () => {
    render(
      <>
        <span id="privacy-note">Privacy details</span>
        <FormField label="Email" helperText="Used for receipts">
          <Input type="email" aria-describedby="privacy-note" />
        </FormField>
      </>
    );

    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(
      "Privacy details Used for receipts"
    );
  });

  test("a render function adapts field semantics to a native control", () => {
    render(
      <FormField
        label="Email"
        errorMessage="Email is required"
        isInvalid
        isRequired
        disabled
      >
        {(controlProps) => <input type="email" {...controlProps} />}
      </FormField>
    );

    const input = screen.getByLabelText(/^Email/);
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Email is required");
  });

  test("field semantics reach every built-in form control", () => {
    render(
      <>
        <FormField label="Country" isRequired disabled isInvalid>
          <Select>
            <option>Canada</option>
          </Select>
        </FormField>
        <FormField label="Biography" isRequired disabled isInvalid>
          <Textarea />
        </FormField>
        <FormField label="Terms" isRequired disabled isInvalid>
          <Checkbox />
        </FormField>
        <FormField label="Plan" isRequired disabled isInvalid>
          <Radio />
        </FormField>
        <FormField label="Notifications" isRequired disabled isInvalid>
          <Switch />
        </FormField>
      </>
    );

    for (const label of [
      "Country",
      "Biography",
      "Terms",
      "Plan",
      "Notifications",
    ]) {
      const control = screen.getByLabelText(new RegExp(`^${label}`));
      expect(control).toBeDisabled();
      expect(control).toBeRequired();
      expect(control).toHaveAttribute("aria-invalid", "true");
    }
  });
});

describe("Breadcrumb composition", () => {
  test("the final item remains current through layout markup", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <span>
          <BreadcrumbItem href="/current">Current</BreadcrumbItem>
        </span>
      </Breadcrumb>
    );

    const current = screen.getByText("Current");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).not.toHaveAttribute("href");
  });
});
