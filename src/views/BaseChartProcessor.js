// BaseChartProcessor.js
class BaseChartProcessor {
  process(config) {
    const processedData = this.processData(config);
    const chartConfig = this.getChartConfig(
      processedData.labels,
      config.chartType,
      config.years,
    );
    return { processedData, chartConfig };
  }

  processData(config) {
    throw new Error("This method should be overridden");
  }

  getChartConfig(labels, chartType) {
    throw new Error("This method should be overridden");
  }
}

export default BaseChartProcessor;
