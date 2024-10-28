import BaseChartProcessor from "./BaseChartProcessor.js";

class PoliticalChartProcessor extends BaseChartProcessor {
  processData(config) {
    const { data, years, chartType } = config;

    if (chartType === "line") {
      return this.processLineChartData(data, years);
    }

    if (years.length > 1) {
      return this.processMultiYearChartData(data, years, chartType);
    }

    const year = years[0];
    const municipality = "SSS";
    if (!data[year] || !data[year][municipality]) {
      return { labels: [], datasets: [] };
    }

    const partiesData = data[year][municipality].politicalParties;
    const labels = Object.keys(partiesData);
    const values = labels.map((party) => partiesData[party]);

    if (chartType === "pie") {
      return this.processPieChartData(labels, values);
    }

    return {
      labels: labels,
      datasets: [
        {
          name: `Votes in ${year}`,
          values: values,
          chartType: "bar",
          // colors: labels.map((label) => this.getPartyColor(label)),
        },
      ],
    };
  }

  processLineChartData(data, years) {
    const municipality = "SSS";
    const labels = years;
    const datasets = [];

    const parties = Object.keys(data[years[0]][municipality].politicalParties);
    parties.forEach((party) => {
      const values = years.map((year) => {
        return data[year] && data[year][municipality]
          ? data[year][municipality].politicalParties[party] || 0
          : 0;
      });

      datasets.push({
        name: party,
        values: values,
        chartType: "line",
        colors: [this.getPartyColor(party)],
      });
    });

    return {
      labels: labels,
      datasets: datasets,
    };
  }

  processMultiYearChartData(data, years, chartType) {
    const municipality = "SSS";
    const labels = years;
    const datasets = [];

    const parties = Object.keys(data[years[0]][municipality].politicalParties);
    parties.forEach((party) => {
      const values = years.map((year) => {
        return data[year] && data[year][municipality]
          ? data[year][municipality].politicalParties[party] || 0
          : 0;
      });

      datasets.push({
        name: party,
        values: values,
        chartType: chartType,
        colors: [this.getPartyColor(party)],
      });
    });

    return {
      labels: labels,
      datasets: datasets,
    };
  }

  processPieChartData(labels, values) {
    const totalVotes = values.reduce((sum, value) => sum + value, 0);
    const percentages = values.map((value) =>
      ((value / totalVotes) * 100).toFixed(2),
    );

    return {
      labels: labels,
      datasets: [
        {
          name: "Percentage of Votes",
          values: percentages,
          chartType: "pie",
          colors: labels.map((label) => this.getPartyColor(label)),
        },
      ],
    };
  }

  getChartConfig(labels, chartType, years) {
    const yearTitle = years.length > 1 ? years.join(", ") : years[0];
    if (chartType === "pie") {
      return this.getPieChartConfig(labels, yearTitle);
    }
    if (chartType === "line") {
      return this.getLineChartConfig(labels, yearTitle);
    }
    return {
      type: "bar",
      title: `Votes in ${yearTitle}`,
      height: 250,
      colors: labels.map((label) => this.getPartyColor(label)),
      tooltipOptions: {
        formatTooltipX: (d) => (d + "").toUpperCase(),
        formatTooltipY: (d) => d + "%",
      },
      barOptions: { stacked: 0 },
    };
  }

  getPieChartConfig(labels, yearTitle) {
    return {
      title: "Percentage of Votes in " + yearTitle,
      type: "pie",
      height: 250,
      colors: labels.map((label) => this.getPartyColor(label)),
      tooltipOptions: {
        formatTooltipX: (d) => (d + "").toUpperCase(),
        formatTooltipY: (d) => d + "%",
      },
    };
  }

  getLineChartConfig(labels, yearTitle) {
    return {
      title: "Votes per Year in " + yearTitle,
      type: "line",
      height: 250,
      // colors: labels.map((label) => this.getPartyColor(label)),
      tooltipOptions: {
        formatTooltipX: (d) => d,
        formatTooltipY: (d) => d + " votes",
      },
    };
  }

  getPartyColor(party) {
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
}

export default PoliticalChartProcessor;
