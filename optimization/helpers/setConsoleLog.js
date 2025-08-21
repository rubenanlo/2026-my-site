const formatNumber = require("./formatData");
const { notFormattedFormats } = require("../config");

const data = [];
const errorLog = [];

const setConsoleLog = (log) => {
  const {
    currentSize,
    smallestFile,
    relativePath,
    fileName,
    quality,
    ext,
    cloudinaryResult,
    errorHash,
    file,
    logType = "update",
  } = log;

  if (logType === "initial") {
    const delta = (currentSize - smallestFile.size) / currentSize;

    const cleanRelativePath = relativePath.replace(/^[^/]+\//, "/");
    const cleanNewPath = smallestFile.path.replace(/^[^/]+\//, "/");

    const notFormatted = notFormattedFormats.includes(ext);

    // Ensure we push to the data array before accessing its index
    data.push({
      "File Name": fileName,
      "Smallest Size": formatNumber(smallestFile.size, { decimals: 0 }),
      "Reduction (%)": notFormatted
        ? "-"
        : `${formatNumber(delta, {
            decimals: 2,
            percentage: true,
          })}%`,
      Quality: notFormatted ? "-" : quality || "-", // Use the quality from the dimensionsAndQuality object
      "Original Path": cleanRelativePath,
      "New Path": cleanNewPath,
      "Cloudinary ID": "-",
      Status: "-",
      "Not formatted": notFormatted ? "Format not supported" : "",
    });
  }

  const lastIndexData = data.length - 1;

  if (cloudinaryResult) {
    data[lastIndexData]["Cloudinary ID"] = cloudinaryResult.public_id;
    data[lastIndexData]["Status"] = "uploaded";
  }

  if (errorHash) {
    data[lastIndexData]["Status"] = "error";
    errorLog.push({
      File: file,
      "Cloudinary Error": errorHash.message || errorHash,
    });
  }

  if (logType === "final") {
    return { data, errorLog };
  }
};

module.exports = setConsoleLog;
