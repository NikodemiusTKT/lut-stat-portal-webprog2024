import ChartSelectionView from "../views/ChartSelectionView";
import MunicipalityController from "./MunicipalityController";
import PopulationController from "./PopulationController";
import EmploymentController from "./EmploymentController";
import PoliticalPartyController from "./PoliticalPartyController";

class MainController {
  constructor() {
    // Initialize views
    this.chartSelectionView = new ChartSelectionView();

    // Initialize dataset controllers
    this.municipalityController = new MunicipalityController("map");
    this.populationController = new PopulationController("#chart");
    this.employmentController = new EmploymentController("#chart");
    this.politicalPartyController = new PoliticalPartyController("#chart");

    // Initialize current dataset and year
    this.currentDataset = "population";
    this.currentYear = "2020";

    // Populate initial dataset options and year options in the selection view
    this.initSelectionOptions();

    // Attach event listeners for dataset and year selection
    this.chartSelectionView.onDatasetChange(
      this.handleDatasetChange.bind(this),
    );
    this.chartSelectionView.onYearChange(this.handleYearChange.bind(this));
    this.chartSelectionView.onDownloadClick(
      this.handleDownloadClick.bind(this),
    );

    // Load default map and chart (e.g., municipalities and population data)
    this.loadDefaultView();
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

  loadDefaultView() {
    // Load default municipalities and population data on the map and chart
    this.municipalityController.loadMunicipalityBoundaries();
    this.populationController.loadPopulationData(this.currentYear);
  }

  handleDatasetChange(selectedDataset) {
    this.currentDataset = selectedDataset;
    switch (selectedDataset) {
      case "population":
        this.populationController.loadPopulationData(this.currentYear);
        break;
      case "unemployment":
        this.employmentController.loadEmploymentData(this.currentYear);
        break;
      case "elections":
        this.politicalPartyController.loadPoliticalPartyData(this.currentYear);
        break;
      default:
        console.error("Unknown dataset selected");
    }
  }

  handleYearChange(selectedYear) {
    this.currentYear = selectedYear;
    this.handleDatasetChange(this.currentDataset);
  }

  handleDownloadClick() {
    // Implement download functionality (e.g., download chart or map as PNG)
    console.log("Download button clicked");
  }
}

export default MainController;
