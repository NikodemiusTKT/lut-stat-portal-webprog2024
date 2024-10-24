import employmentModel from "../models/employmentModel.js";
import ChartFactory from "../views/ChartFactory.js";
import { renderMap } from "../views/mapView.js";

class EmploymentController {
  constructor(chartContainer) {
    this.chartContainer = chartContainer;
  }

  async loadEmploymentData() {
    try {
      const data = await employmentModel.fetchData();
      ChartFactory.createChart(this.chartContainer, "employment", data);
      renderMap(data);
    } catch (error) {
      console.error("Error loading employment data:", error);
    }
  }

  updateChart(newData) {
    ChartFactory.createChart(this.chartContainer, "employment", newData);
  }

  clearChart() {
    ChartFactory.clearChart(this.chartContainer);
  }
}

export default EmploymentController;
