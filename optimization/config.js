const choicesDimensions = {
  watermarkCard: (quality = 80) => ({ width: 100, quality: quality }),
  icon: (quality = 80) => ({ width: 50, quality: quality }),
  card: (quality = 80) => ({ width: 300, quality: quality }),
  custom: ({ width, quality = 80 }) => ({ width, quality }),
  original: (quality = 80) => ({ quality: quality }), // Original option doesn't specify any dimensions. !! DO NOT REMOVE
};

const path = require("path");

const dirPath = path.join("public", "assets");
const excludedImagesPath = path.join("optimization", "excludedImages.json");
const imagesJsonPath = path.join("public", "images.json");

const notFormattedFormats = ["svg", "ico"];

module.exports = {
  choicesDimensions,
  dirPath,
  excludedImagesPath,
  imagesJsonPath,
  notFormattedFormats,
};
