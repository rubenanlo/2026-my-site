const fs = require("fs-extra");
const crypto = require("crypto");

// Generate a hash for a given file
const getFileHash = async (filePath) => {
  const fileBuffer = await fs.readFile(filePath);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex");
};

module.exports = getFileHash;
