const readline = require("readline");
const processFiles = require("./optimizeImages");

const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
};

const startProcessing = async () => {
  try {
    const answer = await askQuestion(
      "Have you checked the excluded JSON file to make sure everything is ok? (y/n)"
    );

    if (answer.toLowerCase() === "y") {
      await processFiles();
    } else {
      console.log("Update the excluded images file.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

startProcessing();
