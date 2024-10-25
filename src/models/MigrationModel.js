import ApiServiceFactory from "../services/ApiServiceFactory.js";
import {
  DataParser,
  ImmigrationParser,
  EmigrationParser,
} from "../services/DataParser.js";

import ENDPOINTS from "../services/endPoints.js";

class MigrationModel {
  constructor() {
    this.immigrationService = ApiServiceFactory.createService("IMMIGRATION");
    this.emigrationService = ApiServiceFactory.createService("EMIGRATION");
    this.immigrationParser = new DataParser(new ImmigrationParser());
    this.emigrationParser = new DataParser(new EmigrationParser());
  }

  async fetchMigrationData() {
    const immigrationData = await this.fetchData(
      ENDPOINTS.IMMIGRATION,
      "immigration",
      this.immigrationService,
      this.immigrationParser,
    );

    const emigrationData = await this.fetchData(
      ENDPOINTS.EMIGRATION,
      "emigration",
      this.emigrationService,
      this.emigrationParser,
    );

    return this.formatMigrationData(immigrationData, emigrationData);
  }

  async fetchData(config, cacheKey, service, parser) {
    try {
      const cachedData = this.getCachedData(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const data = await service.request(config);
      const parsedData = parser.parse(data);
      this.cacheData(cacheKey, parsedData);
      return parsedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  getCachedData(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (item.expiration && new Date().getTime() > item.expiration) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  cacheData(key, data, expirationMinutes = 60) {
    const expiration = expirationMinutes
      ? new Date().getTime() + expirationMinutes * 60000
      : null;
    const item = {
      value: data,
      expiration,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  formatMigrationData(immigrationData, emigrationData) {
    const { values: immigrationValues, indexes: immigrationIndexes } =
      immigrationData;
    const { values: emigrationValues, indexes: emigrationIndexes } =
      emigrationData;

    const formattedData = {};

    Object.entries(immigrationIndexes).forEach(([key, value]) => {
      const label = key.replace(/^KU/, ""); // Remove "KU" prefix from the key
      const emgIndex = emigrationIndexes[key]; // Get corresponding emigration index

      if (!formattedData[label]) {
        formattedData[label] = {
          name: label,
          data: {
            immigration: [],
            emigration: [],
          },
        };
      }

      formattedData[label].data.immigration.push(immigrationValues[value]);
      formattedData[label].data.emigration.push(emigrationValues[emgIndex]);
    });

    return formattedData;
  }
}

export default MigrationModel;
