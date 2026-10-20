import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assetsDirectory = path.resolve("src", "assets");
const supportedExtensions = new Set([".png", ".jpg", ".jpeg"]);
const quality = 82;

const files = await readdir(assetsDirectory, { withFileTypes: true });
const sourceFiles = files.filter(
  (file) => file.isFile() && supportedExtensions.has(path.extname(file.name).toLowerCase()),
);

if (sourceFiles.length === 0) {
  console.log("No PNG or JPEG files found in src/assets.");
  process.exit(0);
}

for (const file of sourceFiles) {
  const inputPath = path.join(assetsDirectory, file.name);
  const outputPath = path.join(
    assetsDirectory,
    `${path.basename(file.name, path.extname(file.name))}.webp`,
  );

  await sharp(inputPath).webp({ quality }).toFile(outputPath);
  console.log(`Converted ${file.name} -> ${path.basename(outputPath)}`);
}
