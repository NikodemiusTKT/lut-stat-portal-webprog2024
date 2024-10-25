import PoliticalPartyModel from "../models/PoliticalPartyModel.js";
import ChartFactory from "../views/chartFactory.js";
import PoliticalPartyView from "../views/components/PoliticalPartyMapView.js";
import { renderMap } from "../views/components/mapView.js";
import GeoJsonModel from "../models/GeoJsonModel.js";

class PoliticalPartyController {
  constructor(chartContainer, mapContainer, years, parties, municipality) {
    this.model = new PoliticalPartyModel(years, parties, municipality);
    this.chartContainer = chartContainer;
    this.geoJsonModel = new GeoJsonModel();
    this.mapView = new PoliticalPartyView(mapContainer);
    this.years = years;
    this.parties = parties;
    this.municipality = municipality;
    console.log("PoliticalPartyController initialized");
  }

  async loadPoliticalPartyData(baseDataStructure) {
    try {
      const politicalData =
        await this.model.fetchPoliticalPartyData(baseDataStructure);
      ChartFactory.createChart(
        this.chartContainer,
        "politicalParties",
        politicalData,
      );
      const geoJsonData = await this.geoJsonModel.fetchGeoJsonData({});
      this.mapView.addGeoJsonLayer(geoJsonData, politicalData, this.years);
      // renderMap(data);
    } catch (error) {
      console.error("Error loading political party data:", error);
    }
  }
}

export default PoliticalPartyController;
