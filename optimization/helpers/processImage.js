const path = require("path");
const fs = require("fs-extra");
const { notFormattedFormats } = require("../config.js");
const uploadToCloudinary = require("./uploadToCloudinary.js");
const reFormatting = require("./reFormatting.js");
const saveImageInfo = require("./saveImageInfo.js");
const getExtension = require("./getExtension.js");
const setConsoleLog = require("./setConsoleLog.js");
const getFileHash = require("./getFileHash.js");
const handleExcludedImages = require("./handleExcludedImages.js");

const processImage = async (file, dimensionsAndQuality) => {
  const fileName = path.basename(file, path.extname(file));
  const relativePath = path.relative(process.cwd(), file);
  const excludedImages = handleExcludedImages();

  try {
    const input = await fs.readFile(file);
    const ext = getExtension(file);

    const currentStats = await fs.stat(file);
    const currentSize = currentStats.size;

    let smallestFile;
    let quality;
    let dimensions;

    if (!notFormattedFormats.includes(ext)) {
      const fileContent = await reFormatting(
        currentSize,
        ext,
        file,
        dimensionsAndQuality,
        input
      );
      smallestFile = fileContent.smallestFile;
      quality = fileContent.quality;
      dimensions = fileContent.dimensions;
    } else {
      smallestFile = { size: currentSize, format: ext, path: file };
      quality = dimensionsAndQuality.quality;
      dimensions = dimensionsAndQuality.dimensions;
    }

    setConsoleLog({
      logType: "initial",
      currentSize,
      smallestFile,
      relativePath,
      fileName,
      quality,
      ext,
    });

    // Upload the smallest file to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(
      smallestFile.path,
      fileName
    );

    if (cloudinaryResult) {
      // Log the Cloudinary result
      setConsoleLog({ logType: "update", cloudinaryResult });

      // Save image information to images.json
      await saveImageInfo(
        fileName, // alt
        smallestFile.format, // format
        cloudinaryResult.public_id, // src (Cloudinary ID)
        dimensions.width, // width
        dimensions.height // height
      );
    }

    // Generate the hash after processing to store the final version
    const finalHash = await getFileHash(smallestFile.path);

    excludedImages[fileName] = {
      hash: finalHash,
      processedAt: new Date().toISOString(),
    };
  } catch (errorHash) {
    console.error(`Failed to process ${file}:`, errorHash);

    setConsoleLog({ logType: "update", errorHash, file });
  }
};

module.exports = processImage;
