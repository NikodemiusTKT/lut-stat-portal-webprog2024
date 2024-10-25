import ApiServiceFactory from "../services/ApiServiceFactory.js";
import BaseDataModel from "./BaseDataModel.js";

class GeoJsonModel extends BaseDataModel {
  constructor() {
    super("GEOJSON");
  }

  async fetchGeoJsonData(baseDataStructure = {}) {
    const config = this.apiService.config;
    const cacheKey = "geoJsonData";
    return await this.fetchData(config, cacheKey, baseDataStructure);
  }
}

export default GeoJsonModel;
