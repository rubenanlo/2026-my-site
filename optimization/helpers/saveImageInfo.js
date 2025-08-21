const fs = require("fs-extra");
const { imagesJsonPath } = require("../config");

let imagesData = [];

try {
  imagesData = fs.readJsonSync(imagesJsonPath);
} catch (error) {
  console.log("No images.json file found. Starting with an empty array.");
}

const saveImageInfo = async (alt, format, src, width, height) => {
  // Find the index of the existing image entry, if any
  const existingIndex = imagesData.findIndex((img) => img.alt === alt);

  if (existingIndex > -1) {
    // Update the existing image entry
    imagesData[existingIndex] = { alt, format, src, width, height };
    console.log(`Updated entry for ${alt} in images.json`);
  } else {
    // Add a new image entry
    imagesData.push({ alt, format, src, width, height });
    console.log(`Added new entry for ${alt} to images.json`);
  }

  try {
    await fs.writeJson(imagesJsonPath, imagesData, { spaces: 2 });
  } catch (error) {
    console.error("Error saving to images.json:", error);
  }
};

module.exports = saveImageInfo;
