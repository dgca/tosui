import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Box, Button, Grid, Input, Select, VStack } from "../src";

describe("responsive variable isolation", () => {
  test("a nested base padding value is isolated from parent breakpoints", () => {
    render(
      <Box pt={{ base: 5, sm: 6 }}>
        <Box data-testid="child" pt={2}>
          Child
        </Box>
      </Box>
    );

    const childStyle = screen.getByTestId("child").style;

    expect({
      base: childStyle.getPropertyValue("--t-pt"),
      sm: childStyle.getPropertyValue("--t-pt_sm"),
      md: childStyle.getPropertyValue("--t-pt_md"),
      lg: childStyle.getPropertyValue("--t-pt_lg"),
      xl: childStyle.getPropertyValue("--t-pt_xl"),
      "2xl": childStyle.getPropertyValue("--t-pt_2xl"),
    }).toEqual({
      base: "calc(var(--t-spacing-unit) * 2)",
      sm: "initial",
      md: "initial",
      lg: "initial",
      xl: "initial",
      "2xl": "initial",
    });
  });

  test("a nested responsive grid does not inherit later parent breakpoints", () => {
    render(
      <Grid
        columns={{
          base: "1fr",
          lg: "minmax(0, 1fr) minmax(360px, 1fr)",
        }}
      >
        <Grid
          data-testid="inner-grid"
          columns={{ base: "1fr", sm: "1fr 1fr" }}
        >
          <div>First</div>
          <div>Second</div>
        </Grid>
      </Grid>
    );

    const innerStyle = screen.getByTestId("inner-grid").style;

    expect({
      base: innerStyle.getPropertyValue("--t-grid-cols"),
      sm: innerStyle.getPropertyValue("--t-grid-cols_sm"),
      md: innerStyle.getPropertyValue("--t-grid-cols_md"),
      lg: innerStyle.getPropertyValue("--t-grid-cols_lg"),
      xl: innerStyle.getPropertyValue("--t-grid-cols_xl"),
      "2xl": innerStyle.getPropertyValue("--t-grid-cols_2xl"),
    }).toEqual({
      base: "1fr",
      sm: "1fr 1fr",
      md: "initial",
      lg: "initial",
      xl: "initial",
      "2xl": "initial",
    });
  });

  test("a nested stack gap is isolated from a responsive parent gap", () => {
    render(
      <Grid gap={{ base: 10, lg: 8 }}>
        <VStack data-testid="inner-stack" gap={1}>
          Child content
        </VStack>
      </Grid>
    );

    const innerStyle = screen.getByTestId("inner-stack").style;

    expect({
      rowBase: innerStyle.getPropertyValue("--t-gap-row"),
      rowLg: innerStyle.getPropertyValue("--t-gap-row_lg"),
      columnBase: innerStyle.getPropertyValue("--t-gap-col"),
      columnLg: innerStyle.getPropertyValue("--t-gap-col_lg"),
    }).toEqual({
      rowBase: "calc(var(--t-spacing-unit) * 1)",
      rowLg: "initial",
      columnBase: "calc(var(--t-spacing-unit) * 1)",
      columnLg: "initial",
    });
  });

  test("component size defaults are isolated from responsive ancestors", () => {
    render(
      <Box px={{ base: 2, lg: 8 }} h={{ base: "auto", lg: "200px" }}>
        <Button data-testid="button">Submit</Button>
        <Input data-testid="input" />
        <Select data-testid="select" />
      </Box>
    );

    const buttonStyle = screen.getByTestId("button").style;
    const inputStyle = screen.getByTestId("input").style;
    const selectStyle = screen.getByTestId("select").style;

    expect({
      buttonLeft: buttonStyle.getPropertyValue("--t-pl"),
      buttonLeftLg: buttonStyle.getPropertyValue("--t-pl_lg"),
      inputHeight: inputStyle.getPropertyValue("--t-h"),
      inputHeightLg: inputStyle.getPropertyValue("--t-h_lg"),
      selectHeight: selectStyle.getPropertyValue("--t-h"),
      selectHeightLg: selectStyle.getPropertyValue("--t-h_lg"),
    }).toEqual({
      buttonLeft: "calc(var(--t-spacing-unit) * 4)",
      buttonLeftLg: "initial",
      inputHeight: "calc(var(--t-spacing-unit) * 10)",
      inputHeightLg: "initial",
      selectHeight: "calc(var(--t-spacing-unit) * 10)",
      selectHeightLg: "initial",
    });
  });

  test("a responsive value without a base does not inherit the parent base", () => {
    render(
      <Box pt={5}>
        <Box data-testid="delayed-child" pt={{ md: 4 }}>
          Child
        </Box>
      </Box>
    );

    const childStyle = screen.getByTestId("delayed-child").style;

    expect({
      base: childStyle.getPropertyValue("--t-pt"),
      sm: childStyle.getPropertyValue("--t-pt_sm"),
      md: childStyle.getPropertyValue("--t-pt_md"),
    }).toEqual({
      base: "initial",
      sm: "initial",
      md: "calc(var(--t-spacing-unit) * 4)",
    });
  });
});
