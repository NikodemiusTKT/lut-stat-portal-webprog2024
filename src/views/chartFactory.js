import ChartView from "./components/chartView.js";

class ChartFactory {
  static createChart(elementId, type, data) {
    this.data = data;
    const chartData = this.processData(type, data);
    const chartConfig = this.getChartConfig(type, chartData.labels);
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
      default:
        return {};
    }
  }

  static getChartConfig(type, labels) {
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
          colors: labels.map((label) => this.getPartyColor(label)),
          tooltipOptions: {
            formatTooltipX: (d) => (d + "").toUpperCase(),
            formatTooltipY: (d) => d + "%",
          },
          barOptions: { stacked: 0 },
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
