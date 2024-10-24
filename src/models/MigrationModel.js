import ApiServiceFactory from "../services/ApiServiceFactory.js";
import {
  DataParser,
  ImmigrationParser,
  EmigrationParser,
} from "../services/DataParser.js";

class MigrationModel {
  constructor() {
    this.immigrationService = ApiServiceFactory.createService("IMMIGRATION");
    this.emigrationService = ApiServiceFactory.createService("EMIGRATION");
    this.immigrationParser = new DataParser(new ImmigrationParser());
    this.emigrationParser = new DataParser(new EmigrationParser());
  }

  async fetchMigrationData() {
    const [immigrationData, emigrationData] = await Promise.all([
      this.immigrationService.request(),
      this.emigrationService.request(),
    ]);

    const parsedImmigrationData = this.immigrationParser.parse(immigrationData);
    const parsedEmigrationData = this.emigrationParser.parse(emigrationData);

    return this.formatMigrationData(
      parsedImmigrationData,
      parsedEmigrationData,
    );
  }

  formatMigrationData(immigrationData, emigrationData) {
    const { values: immigrationValues, indexes: immigrationIndexes } =
      immigrationData;
    const { values: emigrationValues, indexes: emigrationIndexes } =
      emigrationData;

    return Object.entries(immigrationIndexes).reduce(
      (accumulator, [key, value]) => {
        const label = key.replace(/^KU/, ""); // Remove "KU" prefix from the key
        const emgIndex = emigrationIndexes[key]; // Get corresponding emigration index
        accumulator[label] = {
          immigration: immigrationValues[value],
          emigration: emigrationValues[emgIndex],
        };
        return accumulator;
      },
      {},
    );
  }
}

export default MigrationModel;
