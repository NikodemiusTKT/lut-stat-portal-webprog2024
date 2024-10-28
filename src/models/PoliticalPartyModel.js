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
    const cacheKey = `political_${this.years}`;
    this.data = await this.fetchData(
      this.apiService.config,
      cacheKey,
      baseDataStructure,
    );
    return this.data;
  }

  getDataByYear(year) {
    if (this.data[year]) {
      return this.data[year];
    } else {
      throw new Error(`Data for year ${year} not found`);
    }
  }
  getVotesByYearAndParty(year, municipalityId, party) {
    if (this.data[year] && this.data[year][municipalityId]) {
      const municipalityData = this.data[year][municipalityId];
      if (
        municipalityData.politicalParties &&
        municipalityData.politicalParties[party] !== undefined
      ) {
        return municipalityData.politicalParties[party];
      } else {
        throw new Error(
          `Party ${party} not found in municipality ${municipalityId} for year ${year}`,
        );
      }
    } else {
      throw new Error(
        `Data for year ${year} and municipality ${municipalityId} not found`,
      );
    }
  }

  getVotesByMunicipality(municipalityId, year) {
    if (this.data[year] && this.data[year][municipalityId]) {
      return this.data[year][municipalityId].politicalParties;
    } else {
      throw new Error(
        `Data for year ${year} and municipality ${municipalityId} not found`,
      );
    }
  }
}

export default PoliticalPartyModel;
