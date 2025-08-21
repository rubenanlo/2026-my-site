const { prompt } = require("inquirer").default;
const { choicesDimensions } = require("../config");

let dimensionsStore = [];

const promptUserForDimensions = async (fileName) => {
  const answers = await prompt([
    {
      type: "list",
      name: "sizeType",
      message: `Select the size for ${fileName}:`,
      choices: Object.keys(choicesDimensions),
    },
    {
      type: "number",
      name: "customWidth",
      message: `Enter custom width for ${fileName}:`,
      when: (answers) => answers.sizeType === "custom",
      validate: (input) => input > 0 || "Width must be a positive number.",
    },
    {
      type: "number",
      name: "quality",
      message: `Enter the quality (1-100) for ${fileName}:`,
      default: 80,
      validate: (input) =>
        (input >= 1 && input <= 100) || "Quality must be between 1 and 100.",
    },
  ]);

  if (answers.sizeType === "original") {
    return { original: true, quality: answers.quality };
  }

  return answers.sizeType === "custom"
    ? { width: answers.customWidth, quality: answers.quality }
    : choicesDimensions[answers.sizeType](answers.quality);
};

const getDimensionsAndQuality = async (fileName, metadata, notSupported) => {
  const storedDimensions = dimensionsStore.find(
    (item) => item.fileName === fileName
  );

  if (storedDimensions) {
    console.log(`Using stored dimensions for ${fileName}`);
    return storedDimensions;
  }

  if (notSupported) {
    return {
      dimensions: { width: metadata.width, height: metadata.height },
      quality: 100,
    };
  }

  const selectedDimensions = await promptUserForDimensions(fileName);

  const dimensions = selectedDimensions.original
    ? { width: metadata.width, height: metadata.height }
    : {
        width: selectedDimensions.width,
        height: Math.round(
          selectedDimensions.width * (metadata.height / metadata.width)
        ),
      };

  const result = { dimensions, quality: selectedDimensions.quality };

  dimensionsStore.push({ fileName, ...result });

  return result;
};

module.exports = getDimensionsAndQuality;
