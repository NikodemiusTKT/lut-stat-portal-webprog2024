import municipalityModel from "../models/municipalityModel.js";
import MapView from "../views/components/MapView.js";

class MunicipalityController {
  constructor(mapContainer) {
    this.mapView = new MapView(mapContainer);
  }

  async loadMunicipalityBoundaries() {
    try {
      const data = await municipalityModel.fetchMunicipalityBoundaries();
      this.mapView.renderMunicipalityBoundaries(data);
    } catch (error) {
      console.error("Error loading municipality boundaries:", error);
    }
  }
}

export default MunicipalityController;
