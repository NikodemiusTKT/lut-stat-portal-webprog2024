class BaseController {
  constructor(model, chartContainer, chartType) {
    this.model = model;
    this.chartContainer = chartContainer;
    this.chartType = chartType;
  }

  async loadData() {
    try {
      const data = await this.model.fetchData();
      this.createChart(data);
    } catch (error) {
      console.error(`Error loading ${this.chartType} data:`, error);
    }
  }

  createChart(data) {
    ChartFactory.createChart(this.chartContainer, this.chartType, data);
  }

  updateChart(newData) {
    ChartFactory.createChart(this.chartContainer, this.chartType, newData);
  }

  clearChart() {
    ChartFactory.clearChart(this.chartContainer);
  }
}

export default BaseController;
