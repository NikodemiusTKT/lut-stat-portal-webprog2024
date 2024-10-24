import DataModel from "./DataModel.js";
import { ApiServiceFactory, ENDPOINTS } from "../services/ApiService.js";
import { DataParser, PopulationParser } from "../services/DataParser.js";

class PopulationModel extends DataModel {
  constructor(apiService, dataParser) {
    super(apiService, dataParser);
  }

  async fetchData(year = 2020) {
    const cachedData = this.getCachedData("population");
    if (cachedData) {
      return cachedData;
    }
    const data = await this.apiService.fetchData(ENDPOINTS.POPULATION(year));
    const parsedData = this.dataParser.parse(data);
    this.saveToLocalStorage("population", parsedData);
    return parsedData;
  }

  getCachedData() {
    return this.getData("population");
  }
}

const populationApiService = ApiServiceFactory.createService(
  ENDPOINTS.POPULATION(2020),
);
const populationDataParser = new DataParser(new PopulationParser());
const populationModel = new PopulationModel(
  populationApiService,
  populationDataParser,
);

export default populationModel;
