import GeoJsonModel from "../models/GeoJsonModel.js";
import MigrationModel from "../models/MigrationModel.js";
import ImmigrationMapView from "../views/components/ImmigrationMapView.js";

class MapController {
  constructor(mapContainerId) {
    this.geoJsonModel = new GeoJsonModel();
    this.migrationModel = new MigrationModel();
    this.mapView = new ImmigrationMapView(mapContainerId);
  }

  async loadMapData() {
    try {
      const geoJsonData = await this.geoJsonModel.fetchGeoJsonData({});
      const migrationData = await this.migrationModel.fetchMigrationData({});
      this.mapView.addGeoJsonLayer(geoJsonData, migrationData);
    } catch (error) {
      console.error("Error loading map data:", error);
    }
  }
}

export default MapController;
