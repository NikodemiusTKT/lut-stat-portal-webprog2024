import ApiServiceFactory from "../services/ApiServiceFactory.js";
import DataModel from "./DataModel.js";
import { DataParser, GeoJsonParser } from "../services/DataParser.js";

class GeoJsonModel extends DataModel {
  constructor() {
    const geoJsonApiService = ApiServiceFactory.createService("GEOJSON");
    const geoJsonParser = new DataParser(new GeoJsonParser());
    super(geoJsonApiService, geoJsonParser);
  }

  async fetchGeoJsonData() {
    return await this.apiService.request(null, "geoJsonData");
  }
}

export default GeoJsonModel;
