import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const docsRoot = resolve(import.meta.dirname, "..");
const sourceDir = resolve(docsRoot, "../react/storybook-static");
const targetDir = resolve(docsRoot, "build/storybook");

if (!existsSync(sourceDir)) {
  console.error(
    `Storybook static output was not found at ${sourceDir}. Run the Storybook build first.`
  );
  process.exit(1);
}

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });
