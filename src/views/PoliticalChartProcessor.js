// PoliticalPartiesChartProcessor.js
import BaseChartProcessor from "./BaseChartProcessor.js";

class PoliticalPartiesChartProcessor extends BaseChartProcessor {
  processData(data, year) {
    const municipality = "SSS";

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

  getChartConfig(labels) {
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

export default PoliticalPartiesChartProcessor;
