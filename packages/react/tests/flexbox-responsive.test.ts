import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { getFlexboxStyles } from "../src/components/Box/flexbox/flexbox";

describe("responsive flexbox styles", () => {
  test("includes base and md classes for a responsive flex direction", () => {
    const result = getFlexboxStyles({
      flexDirection: { base: "column", md: "row" },
    });

    expect(result.className).toMatch(/_flex-column_/);
    expect(result.className).toMatch(/_flex-row_md_/);
  });

  test("emits breakpoint overrides after base declarations", async () => {
    const css = await readFile(
      resolve(process.cwd(), "src/components/Box/flexbox/flexbox.module.css"),
      "utf8"
    );

    const baseColumnIndex = css.lastIndexOf(
      ".flex-column { flex-direction: column; }"
    );
    const mdRowIndex = css.lastIndexOf(
      ".flex-row_md { flex-direction: row; }"
    );
    const baseItemsCenterIndex = css.lastIndexOf(
      ".items-center { align-items: center; }"
    );
    const mdItemsStartIndex = css.lastIndexOf(
      ".items-start_md { align-items: start; }"
    );

    expect(baseColumnIndex).not.toBe(-1);
    expect(mdRowIndex).not.toBe(-1);
    expect(baseItemsCenterIndex).not.toBe(-1);
    expect(mdItemsStartIndex).not.toBe(-1);
    expect(mdRowIndex).toBeGreaterThan(baseColumnIndex);
    expect(mdItemsStartIndex).toBeGreaterThan(baseItemsCenterIndex);
  });
});
