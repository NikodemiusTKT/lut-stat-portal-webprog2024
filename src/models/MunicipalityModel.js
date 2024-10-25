import DataModel from "./BaseDataModel.js";
import ApiServiceFactory from "../services/ApiServiceFactory.js";
import { DataParser, MunicipalityParser } from "../services/DataParser.js";

class MunicipalityModel extends DataModel {
  constructor() {
    super("MUNICIPALITY");
  }

  async fetchMunicipalityData() {
    const config = this.apiService.config;
    const cacheKey = "municipalities";
    return await this.fetchData(config, cacheKey, {});
  }
}

export default MunicipalityModel;
