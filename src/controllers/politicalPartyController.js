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
    this.showLoader();
    try {
      const politicalData =
        await this.model.fetchPoliticalPartyData(baseDataStructure);
      ChartFactory.createChart(
        this.chartContainer,
        "politicalParties",
        politicalData,
        ...this.years,
      );
      const geoJsonData = await this.geoJsonModel.fetchGeoJsonData({});
      await this.mapView.addGeoJsonLayer(
        geoJsonData,
        politicalData,
        ...this.years,
      ); // Await the async method
    } catch (error) {
      console.error("Error loading political party data:", error);
    } finally {
      this.hideLoader();
    }
  }

  async updatePoliticalPartyData(newData) {
    try {
      ChartFactory.createChart(
        this.chartContainer,
        "politicalParties",
        newData,
        ...this.years,
      );
      this.mapView.updateMap(newData, ...this.years);
    } catch (error) {
      console.error("Error updating political party data:", error);
    }
  }
  createChart(data) {
    ChartFactory.createChart(this.chartContainer, this.chartType, data);
  }

  updateChart(newData) {
    ChartFactory.createChart(this.chartContainer, this.chartType, newData);
  }

  clearChart() {
    ChartFactory.clearChart(this.chartContainer);
  }

  showLoader() {
    console.log("Showing loader...");
    const loader = document.getElementById("map-loader");
    if (loader) {
      loader.style.visibility = "visible";
      loader.style.opacity = "1";
      loader.style.pointerEvents = "auto";
    }
  }

  hideLoader() {
    console.log("Hiding loader...");
    const loader = document.getElementById("map-loader");
    if (loader) {
      loader.style.visibility = "hidden";
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
    }
  }
}

export default PoliticalPartyController;
