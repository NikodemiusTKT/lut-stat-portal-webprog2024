import ChartView from "./components/chartView.js";

class ChartFactory {
  static createChart(elementId, type, data) {
    this.data = data;
    const chartData = this.processData(type, data);
    const chartConfig = this.getChartConfig(type);
    const chartView = new ChartView(elementId);
    chartView.clearChart();
    return chartView.renderChart(chartData, chartConfig.type, chartConfig);
  }

  static processData(type, data) {
    switch (type) {
      case "population":
        return {
          labels: data.map((item) => item.municipality),
          datasets: [
            {
              name: "Population",
              values: data.map((item) => item.population),
            },
          ],
        };
      case "employment":
        return {
          labels: data.map((item) => item.municipality),
          datasets: [
            {
              name: "Employment Rate",
              values: data.map((item) => item.employmentRate),
            },
          ],
        };
      case "politicalParties":
        const years = Object.keys(data[Object.keys(data)[0]]);
        const datasets = Object.keys(data).map((party) => ({
          name: party,
          values: years.map((year) => data[party][year]),
          chartType: "bar",
        }));
        return {
          labels: years,
          datasets: datasets,
          yRegions: [{ label: "% of all votes", start: 0, end: 50 }],
        };
      default:
        return {};
    }
  }

  static getChartConfig(type, numDatasets) {
    // const colors = this.generateColors(numDatasets);

    switch (type) {
      case "population":
        return {
          type: "bar",
          height: 300,
          colors: ["#7cd6fd", "#743ee2"],
        };
      case "employment":
        return {
          type: "line",
          height: 250,
          colors: ["#7cd6fd", "#743ee2"],
        };
      case "politicalParties":
        return {
          type: "bar",
          height: 250,
          colors: Object.keys(this.data).map((party) =>
            this.getPartyColor(party),
          ),
          tooltipOptions: {
            formatTooltipX: (d) => (d + "").toUpperCase(),
            formatTooltipY: (d) => d + "%",
          },
          barOptions: { stacked: 1 },
        };
      default:
        return {
          type: "bar",
          height: 250,
          colors: ["#7cd6fd", "#743ee2"],
        };
    }
  }

  static generateColors(numColors) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(`hsl(${(i * 360) / numColors}, 70%, 50%)`);
    }
    return colors;
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
