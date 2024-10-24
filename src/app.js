import MainController from "./controllers/mainController.js";

document.addEventListener("DOMContentLoaded", () => {
  const mainController = new MainController();
  mainController.loadDefaultView(); // Load default view with municipality boundaries and population data

  document
    .getElementById("datasetSelect")
    .addEventListener("change", function () {
      const dataset = this.value;
      mainController.loadDataset(dataset);
    });

  document.getElementById("downloadBtn").addEventListener("click", function () {
    // Implement download functionality (e.g., capture map or chart as PNG)
  });
});
