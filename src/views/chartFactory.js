import ChartView from "./components/chartView.js";
import BaseChartProcessor from "./BaseChartProcessor.js";
import PoliticalChartProcessor from "./PoliticalChartProcessor.js";
class PopulationChartProcessor extends BaseChartProcessor {
  processData(config) {
    return {
      labels: config.data.map((item) => item.municipality),
      datasets: [
        {
          name: "Population",
          values: data.map((item) => item.population),
        },
      ],
    };
  }

  getChartConfig(labels, chartType, ...args) {
    return {
      type: "bar",
      height: 300,
      colors: ["#7cd6fd", "#743ee2"],
    };
  }
}

class EmploymentChartProcessor extends BaseChartProcessor {
  processData(config) {
    return {
      labels: config.data.map((item) => item.municipality),
      datasets: [
        {
          name: "Employment Rate",
          values: data.map((item) => item.employmentRate),
        },
      ],
    };
  }

  getChartConfig(labels, chartType, ...args) {
    return {
      type: "line",
      height: 250,
      colors: ["#7cd6fd", "#743ee2"],
    };
  }
}

class ChartFactory {
  static createChart(config) {
    const processor = this.getProcessor(config.type);
    const { processedData, chartConfig } = processor.process(config);
    const chartView = new ChartView(config.elementId);
    chartView.clearChart();
    return chartView.renderChart(processedData, chartConfig.type, chartConfig);
  }

  static getProcessor(type, data, year) {
    switch (type) {
      case "population":
        return new PopulationChartProcessor();
      case "employment":
        return new EmploymentChartProcessor();
      case "politicalParties":
        return new PoliticalChartProcessor();
      default:
        return { labels: [], datasets: [] };
    }
  }
  static clearChart(elementId) {
    const chartView = new ChartView(elementId);
    chartView.clearChart();
  }
}

export default ChartFactory;
