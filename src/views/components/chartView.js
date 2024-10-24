import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";

class ChartView {
  constructor(elementId) {
    this.elementId = elementId;
    this.chart = null;
  }

  // Function to render a chart with Frappe.js
  renderChart(chartData, chartType = "bar", chartConfig = {}) {
    if (this.chart) {
      this.chart.update(chartData);
    } else {
      // Create a new Frappe chart in the specified container
      this.chart = new Chart(this.elementId, {
        data: chartData,
        type: chartType, // 'bar', 'line', 'pie', etc.
        colors: chartConfig.colors, // Array of colors for the chart
        ...chartConfig, // Spread the custom configuration
      });
    }
    return this.chart;
  }

  // Method to update the chart with new data
  updateChart(newData) {
    if (this.chart) {
      this.chart.update(newData);
    }
  }

  // Method to clear or destroy the chart
  clearChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}

export default ChartView;
