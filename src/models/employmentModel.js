import DataModel from "./DataModel.js";
import { ApiServiceFactory, ENDPOINTS } from "../services/ApiService.js";
import { DataParser, EmploymentParser } from "../services/DataParser.js";

class EmploymentModel extends DataModel {
  constructor(apiService, dataParser) {
    super(apiService, dataParser);
  }

  async fetchData(year = 2020) {
    const cachedData = this.getCachedData("employment");
    if (cachedData) {
      return cachedData;
    }
    const data = await this.apiService.fetchData(ENDPOINTS.EMPLOYMENT(year));
    const parsedData = this.dataParser.parse(data);
    this.saveToLocalStorage("employment", parsedData);
    return parsedData;
  }

  getCachedData() {
    return this.getData("employment");
  }
}

const employmentApiService = ApiServiceFactory.createService(
  ENDPOINTS.EMPLOYMENT(2020),
);
const employmentDataParser = new DataParser(new EmploymentParser());
const employmentModel = new EmploymentModel(
  employmentApiService,
  employmentDataParser,
);

export default employmentModel;
