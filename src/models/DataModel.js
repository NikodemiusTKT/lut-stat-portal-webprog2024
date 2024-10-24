class DataModel {
  constructor(apiService, dataParser = null) {
    this.apiService = apiService;
    this.dataParser = dataParser;
  }

  async fetchData(config, cacheKey) {
    try {
      const cachedData = this.getData(cacheKey);
      if (cachedData) {
        return cachedData;
      }
      const data = await this.apiService.request(config);
      const parsedData = this.dataParser ? this.dataParser.parse(data) : data;
      this.saveToLocalStorage(cacheKey, parsedData);
      return parsedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  getData(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting data from local storage:", error);
      return null;
    }
  }

  saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  }
}

export default DataModel;
