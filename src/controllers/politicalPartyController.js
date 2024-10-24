import PoliticalPartyModel from "../models/PoliticalPartyModel.js";
import ChartFactory from "../views/chartFactory.js";
import { renderMap } from "../views/components/mapView.js";

class PoliticalPartyController {
  constructor(chartContainer) {
    this.chartContainer = chartContainer;
  }

  async loadPoliticalPartyData(years, parties, municipality) {
    try {
      const politicalPartyModel = new PoliticalPartyModel(
        years,
        parties,
        municipality,
      );
      const data = await politicalPartyModel.fetchData();
      ChartFactory.createChart(this.chartContainer, "politicalParties", data);
      // renderMap(data);
    } catch (error) {
      console.error("Error loading political party data:", error);
    }
  }
}

export default PoliticalPartyController;
