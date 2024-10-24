import populationModel from "../models/populationModel.js";
import ChartView from "../views/chartView.js";

class PopulationController {
  constructor() {
    this.model = populationModel;
    this.chartView = new ChartView("#chart");
  }

  async loadPopulationData(year) {
    try {
      const data = await this.model.fetchData(year);
      ChartFactory.createChart(this.chartContainer, "population", data);
    } catch (error) {
      console.error("Error loading population data:", error);
    }
  }
}

export default PopulationController;
