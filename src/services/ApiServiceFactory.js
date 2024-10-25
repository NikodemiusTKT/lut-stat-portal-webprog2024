import ApiService from "./ApiService.js";
import ENDPOINTS from "./endPoints.js";
import {
  DataParser,
  GeoJsonParser,
  MunicipalityParser,
  ImmigrationParser,
  EmigrationParser,
  PopulationDataParser,
} from "./DataParser.js";
import PoliticalPartyDataParser from "./PoliticalPartyDataParser.js";

class ApiServiceFactory {
  static createService(type, ...params) {
    const config = this.getConfig(type, ...params);
    const parser = this.createParser(type);
    return new ApiService(config, parser);
  }

  static createServiceAndParser(type, ...params) {
    const config = this.getConfig(type, ...params);
    const parser = this.createParser(type);
    const service = new ApiService(config, parser);
    return { service, parser };
  }

  static getConfig(type, ...params) {
    const config =
      typeof ENDPOINTS[type] === "function"
        ? ENDPOINTS[type](...params)
        : ENDPOINTS[type];
    if (!config) {
      throw new Error(`Endpoint configuration for ${type} not found`);
    }
    return config;
  }

  static createParser(type) {
    switch (type) {
      case "POLITICAL":
        return new DataParser(new PoliticalPartyDataParser());
      case "GEOJSON":
        return new DataParser(new GeoJsonParser());
      case "MUNICIPALITY":
        return new DataParser(new MunicipalityParser());
      case "POPULATION":
        return new DataParser(new PopulationDataParser());
      case "IMMIGRATION":
        return new DataParser(new ImmigrationParser());
      case "EMIGRATION":
        return new DataParser(new EmigrationParser());
      default:
        throw new Error(`Parser for type ${type} not found`);
    }
  }
}

export default ApiServiceFactory;
