// BaseChartProcessor.js
class BaseChartProcessor {
  process(data, year) {
    const processedData = this.processData(data, year);
    const chartConfig = this.getChartConfig(processedData.labels);
    return { processedData, chartConfig };
  }

  processData(data, year) {
    throw new Error("This method should be overridden");
  }

  getChartConfig(labels) {
    throw new Error("This method should be overridden");
  }
}

export default BaseChartProcessor;
