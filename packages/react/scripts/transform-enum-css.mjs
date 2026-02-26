#!/usr/bin/env node
/**
 * transform-enum-css.mjs
 *
 * Transforms enum-based CSS module files from per-value to per-breakpoint organization.
 * This fixes the source-order cascade bug where base classes declared later in the file
 * override breakpoint classes declared earlier.
 *
 * Usage:
 *   node transform-enum-css.mjs <file>
 *   node transform-enum-css.mjs <file> --stop-before-line N
 *   node transform-enum-css.mjs <file> --stop-before-line N --end-at-line M
 *
 * --stop-before-line N: Stop parsing enum classes at line N; append lines N+ as-is
 * --end-at-line M: When using --stop-before-line, only append up to line M (truncate rest)
 */

import fs from "fs";

const args = process.argv.slice(2);
const file = args[0];

if (!file) {
  console.error("Usage: node transform-enum-css.mjs <file> [--stop-before-line N] [--end-at-line M]");
  process.exit(1);
}

let stopBeforeLine = Infinity;
let endAtLine = Infinity;

const stopIdx = args.indexOf("--stop-before-line");
if (stopIdx !== -1) stopBeforeLine = parseInt(args[stopIdx + 1]);

const endIdx = args.indexOf("--end-at-line");
if (endIdx !== -1) endAtLine = parseInt(args[endIdx + 1]);

const content = fs.readFileSync(file, "utf-8");
const lines = content.split("\n");

const STATES = [
  { classSuffix: "", pseudo: "" },
  { classSuffix: "\\:h", pseudo: ":hover" },
  { classSuffix: "\\:f", pseudo: ":focus" },
  { classSuffix: "\\:a", pseudo: ":active" },
  { classSuffix: "\\:d", pseudo: ":disabled" },
];

const BREAKPOINTS = [
  { name: "sm", width: 640 },
  { name: "md", width: 768 },
  { name: "lg", width: 1024 },
  { name: "xl", width: 1280 },
  { name: "2xl", width: 1536 },
];

// Lines to process (enum section only)
const processLines = lines.slice(0, Math.min(stopBeforeLine - 1, lines.length));
// Lines to append as-is (variable-based sections)
const tailLines =
  stopBeforeLine <= lines.length
    ? lines.slice(stopBeforeLine - 1, Math.min(endAtLine, lines.length))
    : [];

// Extract base class definitions: plain selectors without state suffix or breakpoint suffix.
// Pattern: .className { property: value; }
const valueDefs = [];
let lastComment = null;

for (const line of processLines) {
  const trimmed = line.trim();

  // Skip @media lines and contents (both single-line and multi-line)
  if (trimmed.startsWith("@media")) continue;
  if (trimmed === "}") continue;
  if (!trimmed) continue;

  // Capture comments
  if (trimmed.startsWith("/*") && trimmed.endsWith("*/")) {
    lastComment = trimmed;
    continue;
  }

  // Match plain base selector: .className { property: value; }
  // className: starts with letter, contains letters/numbers/hyphens
  // Must NOT contain backslash (state suffix) or end with _bp (breakpoint suffix)
  const match = trimmed.match(
    /^\.([a-zA-Z][a-zA-Z0-9-]*)\s*\{\s*([a-z-]+):\s*(.+?);\s*\}$/
  );

  if (match) {
    const [, className, property, value] = match;

    // Skip state variants (contain backslash-colon)
    if (className.includes("\\")) continue;

    // Skip breakpoint variants (end with _sm, _md, _lg, _xl, _2xl)
    if (/_(?:sm|md|lg|xl|2xl)$/.test(className)) continue;

    valueDefs.push({ className, property, value, comment: lastComment });
    lastComment = null;
  }
}

// Group by CSS property to maintain logical sections
const groups = new Map();
for (const def of valueDefs) {
  if (!groups.has(def.property)) {
    groups.set(def.property, []);
  }
  groups.get(def.property).push(def);
}

// Generate output: per property group, all bases first then per-breakpoint
let output = "";
let isFirstGroup = true;

for (const [property, values] of groups) {
  if (!isFirstGroup) {
    output += "\n";
  }
  isFirstGroup = false;

  // Base classes (all values for this property)
  for (const val of values) {
    if (val.comment) {
      output += `${val.comment}\n`;
    }
    for (const state of STATES) {
      output += `.${val.className}${state.classSuffix}${state.pseudo} { ${property}: ${val.value}; }\n`;
    }
    output += "\n";
  }

  // Breakpoint classes (all values consolidated per breakpoint)
  for (const bp of BREAKPOINTS) {
    output += `@media (min-width: ${bp.width}px) {\n`;
    for (const val of values) {
      for (const state of STATES) {
        output += `  .${val.className}_${bp.name}${state.classSuffix}${state.pseudo} { ${property}: ${val.value}; }\n`;
      }
    }
    output += `}\n\n`;
  }
}

// Clean up trailing whitespace
output = output.trimEnd() + "\n";

// Append tail lines (variable-based sections for flexbox)
if (tailLines.length > 0) {
  output += "\n" + tailLines.join("\n");
  if (!output.endsWith("\n")) output += "\n";
}

fs.writeFileSync(file, output);

// Report stats
const valueCount = valueDefs.length;
const propertyCount = groups.size;
console.log(
  `✓ ${file} — ${propertyCount} property group(s), ${valueCount} values`
);
