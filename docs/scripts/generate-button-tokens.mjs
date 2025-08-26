#!/usr/bin/env node
/**
 * Universal token extractor for Storybook component stories.
 * Usage:
 *   node docs/scripts/generate-button-tokens.mjs Button
 *   node docs/scripts/generate-button-tokens.mjs IconButton
 * Extracts <$kebab>-sizes / <$kebab>-variants / contexts from _variants.scss if present.
 * Writes: docs/stories/components/<Component>/tokens.generated.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const componentArg = process.argv[2];
if (!componentArg) {
  console.error("[generate-component-tokens] Missing component name argument.");
  process.exit(1);
}

// Convert PascalCase component name to kebab-case (IconButton -> icon-button)
const kebab = componentArg
  .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
  .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
  .toLowerCase();

const baseVarName = kebab; // e.g. button, icon-button

const sourcePath = resolve(
  process.cwd(),
  "packages/src/styles/components/_variants.scss"
);
const outPath = resolve(
  process.cwd(),
  `docs/stories/components/${componentArg}/tokens.generated.ts`
);

function extractList(content, varName) {
  const regex = new RegExp(`\\$${varName}\\s*:\\s*\\(([^)]*)\\)`, "m");
  const match = content.match(regex);
  if (!match) return null;
  return match[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/^["']|["']$/g, ""));
}

try {
  const scss = readFileSync(sourcePath, "utf8");
  const sizes = extractList(scss, `${baseVarName}-sizes`);
  const variants = extractList(scss, `${baseVarName}-variants`);
  const contexts = extractList(scss, `contexts`); // global contexts list

  if (!sizes && !variants) {
    console.error(
      `[generate-component-tokens] No sizes or variants found for '${componentArg}' (looked for $${baseVarName}-sizes / $${baseVarName}-variants).`
    );
    process.exit(1);
  }

  const lines = [
    `// AUTO-GENERATED FILE. DO NOT EDIT.`,
    `// Component: ${componentArg}`,
    `// Source of truth: ${sourcePath.replace(process.cwd() + "/", "")}`,
  ];
  if (sizes)
    lines.push(`export const SIZES = ${JSON.stringify(sizes)} as const;`);
  if (variants)
    lines.push(`export const VARIANTS = ${JSON.stringify(variants)} as const;`);
  if (contexts)
    lines.push(`export const CONTEXTS = ${JSON.stringify(contexts)} as const;`);
  const file = lines.join("\n") + "\n";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, file, "utf8");
  console.log("[generate-component-tokens] Wrote", outPath);
} catch (e) {
  console.error("[generate-component-tokens] Error:", e);
  process.exit(1);
}
