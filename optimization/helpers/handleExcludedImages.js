const fs = require("fs-extra");
const { excludedImagesPath } = require("../config.js");

let excludedImages = {};

try {
  excludedImages = fs.readJsonSync(excludedImagesPath);
} catch (error) {
  console.log("No excluded images file found. Starting from scratch.");
}

module.exports = () => excludedImages;
