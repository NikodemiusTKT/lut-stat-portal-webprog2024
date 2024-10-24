import DataModel from "./DataModel.js";
import apiService from "../services/apiService.js";

class MunicipalityModel extends DataModel {
  constructor() {
    super(); // Call the parent class constructor
  }

  async fetchMunicipalityBoundaries() {
    const config = {
      method: "get",
      url: "https://api.example.com/municipalities",
    };
    const cachedData = this.getData("municipalities");
    if (cachedData) {
      return cachedData;
    }
    const data = await apiService.fetchData(config);
    this.saveToLocalStorage("municipalities", data);
    return data;
  }

  getMunicipalityBoundaries() {
    return this.getData("municipalities");
  }
}

const municipalityModel = new MunicipalityModel();
export default municipalityModel;
