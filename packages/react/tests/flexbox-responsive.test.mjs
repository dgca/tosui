import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { getFlexboxStyles } from "../dist/components/Box/flexbox/flexbox.js";

test("responsive flexDirection includes base and md classes", () => {
  const result = getFlexboxStyles({
    flexDirection: { base: "column", md: "row" },
  });

  assert.match(result.className, /_flex-column_/);
  assert.match(result.className, /_flex-row_md_/);
});

test("flex enum breakpoint override declarations are emitted after base blocks", async () => {
  const css = await readFile(new URL("../src/components/Box/flexbox/flexbox.module.css", import.meta.url), "utf8");

  const baseColumnIndex = css.lastIndexOf(".flex-column { flex-direction: column; }");
  const mdRowIndex = css.lastIndexOf(".flex-row_md { flex-direction: row; }");
  const baseItemsCenterIndex = css.lastIndexOf(".items-center { align-items: center; }");
  const mdItemsStartIndex = css.lastIndexOf(".items-start_md { align-items: start; }");

  assert.notEqual(baseColumnIndex, -1);
  assert.notEqual(mdRowIndex, -1);
  assert.notEqual(baseItemsCenterIndex, -1);
  assert.notEqual(mdItemsStartIndex, -1);
  assert.ok(mdRowIndex > baseColumnIndex);
  assert.ok(mdItemsStartIndex > baseItemsCenterIndex);
});
