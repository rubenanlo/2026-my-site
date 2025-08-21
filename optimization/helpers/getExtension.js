const path = require("path");

const getExtension = (file) =>
  path.extname(file).toLowerCase().replace(/\./g, "");

module.exports = getExtension;
