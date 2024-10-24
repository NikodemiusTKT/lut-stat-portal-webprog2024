import ChartSelectionView from "../views/components/ChartSelectionView.js";
class ChartSelectionController {
  constructor(mainController) {
    this.chartSelectionView = new ChartSelectionView();
    this.mainController = mainController;

    // Attach event listeners for dataset and year selection
    this.chartSelectionView.onDatasetChange(
      this.handleDatasetChange.bind(this),
    );
    this.chartSelectionView.onYearChange(this.handleYearChange.bind(this));
    this.chartSelectionView.onDownloadClick(
      this.handleDownloadClick.bind(this),
    );

    // Populate initial dataset options and year options in the selection view
    this.initSelectionOptions();
  }

  initSelectionOptions() {
    const datasets = [
      { value: "population", label: "Population Data" },
      { value: "unemployment", label: "Unemployment Rates" },
      { value: "elections", label: "Municipality Elections" },
    ];
    const years = ["2020", "2019", "2018"];

    this.chartSelectionView.populateDatasetOptions(datasets);
    this.chartSelectionView.populateYearOptions(years);
  }

  handleDatasetChange(selectedDataset) {
    this.mainController.handleDatasetChange(selectedDataset);
  }

  handleYearChange(selectedYear) {
    this.mainController.handleYearChange(selectedYear);
  }

  handleDownloadClick() {
    this.mainController.handleDownloadClick();
  }
}

export default ChartSelectionController;
