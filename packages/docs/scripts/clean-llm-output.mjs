/**
 * Post-build script to clean JSX/MDX noise from generated LLM documentation files.
 *
 * The docusaurus-plugin-llms generates llms.txt, llms-full.txt, and individual .md
 * files from MDX source. However, JSX components like <Tabs>, <TabItem>, and live
 * preview markup survive into the output, creating noise for LLM consumers.
 *
 * This script:
 * 1. Strips <Tabs>/<TabItem> wrapper tags
 * 2. Removes "Preview" tab content (duplicate of code examples)
 * 3. Cleans up empty code fences left by import stripping
 * 4. Removes residual JSX component tags from live previews
 * 5. Collapses excessive blank lines
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

const BUILD_DIR = join(import.meta.dirname, "..", "build");

/**
 * Find all .txt and .md files in the build directory that are LLM output files.
 */
function findLlmFiles(dir) {
  const files = [];

  function walk(currentDir) {
    for (const entry of readdirSync(currentDir)) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip asset directories
        if (entry === "assets" || entry === "img") continue;
        walk(fullPath);
      } else if (stat.isFile()) {
        const ext = extname(entry);
        // Match llms*.txt files and generated .md files
        if (entry.startsWith("llms") && ext === ".txt") {
          files.push(fullPath);
        } else if (ext === ".md" && currentDir !== dir) {
          // .md files in subdirectories are generated markdown files
          files.push(fullPath);
        }
      }
    }
  }

  walk(dir);
  return files;
}

/**
 * Remove the content between <TabItem value="preview"...> and </TabItem>.
 * This eliminates the duplicate JSX that mirrors code examples.
 */
function removePreviewTabs(content) {
  // Remove entire preview TabItem blocks (multiline, non-greedy)
  // Pattern: <TabItem value="preview" ...> ... </TabItem>
  content = content.replace(
    /<TabItem\s+value=["']preview["'][^>]*>[\s\S]*?<\/TabItem>/g,
    ""
  );
  return content;
}

/**
 * Strip remaining Tabs/TabItem wrapper tags, leaving inner content.
 */
function stripTabWrappers(content) {
  // Remove opening and closing Tabs tags
  content = content.replace(/<\/?Tabs>/g, "");
  // Remove opening TabItem tags (e.g., <TabItem value="code" label="Code">)
  content = content.replace(/<TabItem\s+[^>]*>/g, "");
  // Remove closing TabItem tags
  content = content.replace(/<\/TabItem>/g, "");
  return content;
}

/**
 * Remove empty code fences that result from import stripping.
 * e.g., ```tsx\n\n``` or ```tsx\n```
 */
function removeEmptyCodeFences(content) {
  content = content.replace(/```\w*\n\s*\n?```/g, "");
  return content;
}

/**
 * Remove residual JSX component invocations from preview sections
 * that weren't inside TabItem preview blocks (standalone previews).
 * We're conservative here — only strip known Tosui component patterns.
 */
function removeResidualJsx(content) {
  // Remove standalone import statements that survived (import ... from "...")
  content = content.replace(
    /^import\s+.*from\s+["'][^"']+["'];?\s*$/gm,
    ""
  );

  // Remove import { ... } patterns that may span multiple lines
  content = content.replace(
    /^import\s+\{[^}]*\}\s+from\s+["'][^"']+["'];?\s*$/gm,
    ""
  );

  return content;
}

/**
 * Collapse runs of 3+ blank lines into 2 blank lines.
 */
function collapseBlankLines(content) {
  content = content.replace(/\n{4,}/g, "\n\n\n");
  return content;
}

/**
 * Main cleaning pipeline.
 */
function cleanContent(content) {
  content = removePreviewTabs(content);
  content = stripTabWrappers(content);
  content = removeEmptyCodeFences(content);
  content = removeResidualJsx(content);
  content = collapseBlankLines(content);
  return content;
}

// Main
const files = findLlmFiles(BUILD_DIR);
let cleaned = 0;

for (const file of files) {
  const original = readFileSync(file, "utf-8");
  const result = cleanContent(original);

  if (result !== original) {
    writeFileSync(file, result, "utf-8");
    cleaned++;
  }
}

const skipped = files.length - cleaned;
console.log(
  `[clean-llm-output] Processed ${files.length} files: ${cleaned} cleaned, ${skipped} unchanged`
);
