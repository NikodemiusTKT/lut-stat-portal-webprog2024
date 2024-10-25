import BaseDataModel from "./BaseDataModel.js";
import ApiServiceFactory from "../services/ApiServiceFactory.js";

class PoliticalPartyModel extends BaseDataModel {
  constructor(years, parties, municipality) {
    super("POLITICAL", years, parties, municipality);
    this.years = years;
    this.parties = parties;
    this.municipality = municipality;
  }

  async fetchPoliticalPartyData(baseDataStructure = {}) {
    const cacheKey = `political_${this.years}_${this.parties}_${this.municipality}`;
    return await this.fetchData(
      this.apiService.config,
      cacheKey,
      baseDataStructure,
    );
  }
}

export default PoliticalPartyModel;
