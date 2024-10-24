class ChartSelectionView {
  constructor() {
    // Cache DOM elements for dataset and year selection
    this.datasetSelectElement = document.getElementById("datasetSelect");
    this.yearSelectElement = document.getElementById("yearSelect");
    this.downloadBtnElement = document.getElementById("downloadBtn");
  }

  // Method to set available datasets in the dataset dropdown
  populateDatasetOptions(datasets) {
    this.clearOptions(this.datasetSelectElement);
    const fragment = document.createDocumentFragment();
    datasets.forEach((dataset) => {
      const option = document.createElement("option");
      option.value = dataset.value;
      option.textContent = dataset.label;
      fragment.appendChild(option);
    });
    this.datasetSelectElement.appendChild(fragment);
  }

  // Method to set available years in the year dropdown
  populateYearOptions(years) {
    this.clearOptions(this.yearSelectElement);
    const fragment = document.createDocumentFragment();
    years.forEach((year) => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      fragment.appendChild(option);
    });
    this.yearSelectElement.appendChild(fragment);
  }

  // Utility function to clear previous options
  clearOptions(selectElement) {
    selectElement.innerHTML = ""; // Clear existing options
  }

  // Function to handle dataset selection change event
  onDatasetChange(callback) {
    this.datasetSelectElement.addEventListener("change", (event) => {
      const selectedDataset = event.target.value;
      callback(selectedDataset); // Pass the selected dataset to the callback
    });
  }

  // Function to handle year selection change event
  onYearChange(callback) {
    this.yearSelectElement.addEventListener("change", (event) => {
      const selectedYear = event.target.value;
      callback(selectedYear); // Pass the selected year to the callback
    });
  }

  // Function to handle the download button click event
  onDownloadClick(callback) {
    this.downloadBtnElement.addEventListener("click", () => {
      callback(); // Trigger the callback when download button is clicked
    });
  }
}

export default ChartSelectionView;
