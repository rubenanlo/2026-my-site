const fs = require("fs-extra");
const sharp = require("sharp");

const reFormatting = async (
  currentSize,
  ext,
  file,
  dimensionsAndQuality,
  input
) => {
  const formats = [
    { format: "webp", options: {} },
    { format: "jpeg", options: { mozjpeg: true } },
    { format: "png", options: {} },
  ];

  let smallestFile = { size: currentSize, format: ext, path: file };

  // Use the pre-fetched dimensions and quality passed from the main loop
  const { dimensions, quality } = dimensionsAndQuality;

  for (const { format, options } of formats) {
    const outputPath = file.replace(`.${ext}`, `.${format}`);
    await sharp(input)
      .resize(dimensions.width, dimensions.height)
      .toFormat(format, { ...options, quality })
      .toFile(outputPath);

    const stats = await fs.stat(outputPath);
    if (stats.size < smallestFile.size) {
      if (smallestFile.path !== file) {
        await fs.unlink(smallestFile.path);
      }
      smallestFile = { size: stats.size, format, path: outputPath };
    } else {
      if (format === smallestFile.format) {
        continue;
      }
      await fs.unlink(outputPath);
    }
  }
  return { smallestFile, quality, dimensions };
};

module.exports = reFormatting;
