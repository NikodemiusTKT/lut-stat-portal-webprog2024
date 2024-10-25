import ChartView from "./components/chartView.js";

class ChartFactory {
  static createChart(elementId, type, data) {
    const chartData = this.processData(type, data);
    const chartConfig = this.getChartConfig(type, chartData.labels);
    const chartView = new ChartView(elementId);
    chartView.clearChart();
    return chartView.renderChart(chartData, chartConfig.type, chartConfig);
  }

  static processData(type, data) {
    switch (type) {
      case "population":
        return this.processPopulationData(data);
      case "employment":
        return this.processEmploymentData(data);
      case "politicalParties":
        return this.processPoliticalPartiesData(data);
      default:
        return { labels: [], datasets: [] };
    }
  }

  static processPopulationData(data) {
    return {
      labels: data.map((item) => item.municipality),
      datasets: [
        {
          name: "Population",
          values: data.map((item) => item.population),
        },
      ],
    };
  }

  static processEmploymentData(data) {
    return {
      labels: data.map((item) => item.municipality),
      datasets: [
        {
          name: "Employment Rate",
          values: data.map((item) => item.employmentRate),
        },
      ],
    };
  }

  static processPoliticalPartiesData(data) {
    const municipality = "SSS";
    const year = "2023";

    if (!data[year] || !data[year][municipality]) {
      return { labels: [], datasets: [] };
    }

    const partiesData = data[year][municipality].politicalParties;
    const labels = Object.keys(partiesData);
    const values = labels.map((party) => partiesData[party]);

    return {
      labels: labels,
      datasets: [
        {
          name: `Votes in ${year}`,
          values: values,
          chartType: "bar",
        },
      ],
    };
  }

  static getChartConfig(type, labels) {
    switch (type) {
      case "population":
        return this.getPopulationChartConfig();
      case "employment":
        return this.getEmploymentChartConfig();
      case "politicalParties":
        return this.getPoliticalPartiesChartConfig(labels);
      default:
        return this.getDefaultChartConfig();
    }
  }

  static getPopulationChartConfig() {
    return {
      type: "bar",
      height: 300,
      colors: ["#7cd6fd", "#743ee2"],
    };
  }

  static getEmploymentChartConfig() {
    return {
      type: "line",
      height: 250,
      colors: ["#7cd6fd", "#743ee2"],
    };
  }

  static getPoliticalPartiesChartConfig(labels) {
    return {
      type: "bar",
      height: 250,
      colors: labels.map((label) => this.getPartyColor(label)),
      tooltipOptions: {
        formatTooltipX: (d) => (d + "").toUpperCase(),
        formatTooltipY: (d) => d + "%",
      },
      barOptions: { stacked: 0 },
    };
  }

  static getDefaultChartConfig() {
    return {
      type: "bar",
      height: 250,
      colors: ["#7cd6fd", "#743ee2"],
    };
  }

  static getPartyColor(party) {
    const partyColorMap = {
      KOK: "#003580",
      PS: "#FFD700",
      SDP: "#E11931",
      KESK: "#006B3C",
      VIHR: "#61BF1A",
      VAS: "#EE1D23",
      RKP: "#0056A5",
      KD: "#18359B",
      LIIKE: "#00A1E4",
    };

    return partyColorMap[party] || "#000000"; // Default to black if party not found
  }

  static clearChart(elementId) {
    const chartView = new ChartView(elementId);
    chartView.clearChart();
  }
}

export default ChartFactory;
