import DataModel from "./DataModel.js";
import ApiServiceFactory from "../services/ApiServiceFactory.js";
import { DataParser, PoliticalPartyParser } from "../services/DataParser.js";

class PoliticalPartyModel extends DataModel {
  constructor(years, parties, municipality) {
    const politicalPartyApiService = ApiServiceFactory.createService(
      "POLITICAL",
      years,
      parties,
      municipality,
    );
    const politicalPartyParser = new DataParser(new PoliticalPartyParser());
    super(politicalPartyApiService, politicalPartyParser);
    this.years = years;
    this.parties = parties;
    this.municipality = municipality;
  }

  async fetchData() {
    const config = {
      years: this.years,
      parties: this.parties,
      municipality: this.municipality,
    };
    return await super.fetchData(config, "politicalParties");
  }
}
export default PoliticalPartyModel;
