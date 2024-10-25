import ApiServiceFactory from "../services/ApiServiceFactory.js";

class BaseDataModel {
  constructor(type, ...params) {
    const { service, parser } = ApiServiceFactory.createServiceAndParser(
      type,
      ...params,
    );
    this.apiService = service;
    this.dataParser = parser;
  }

  async fetchData(
    config,
    cacheKey,
    baseDataStructure = {},
    service = this.apiService,
    parser = this.dataParser,
  ) {
    try {
      const cachedData = this.getCachedData(cacheKey);
      if (cachedData) {
        return this.mergeData(baseDataStructure, cachedData);
      }

      const data = await service.request(config);
      const parsedData = parser ? parser.parse(data, baseDataStructure) : data;
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
    const item = { value: data, expiration };
    localStorage.setItem(key, JSON.stringify(item));
  }

  mergeData(baseDataStructure, newData) {
    for (const key in newData) {
      if (newData.hasOwnProperty(key)) {
        baseDataStructure[key] = baseDataStructure[key]
          ? this.deepMerge(baseDataStructure[key], newData[key])
          : newData[key];
      }
    }
    return baseDataStructure;
  }

  deepMerge(target, source) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (Array.isArray(source[key])) {
          target[key] = target[key] || [];
          target[key] = [...target[key], ...source[key]];
        } else if (
          source[key] &&
          typeof source[key] === "object" &&
          !Array.isArray(source[key])
        ) {
          target[key] = target[key] || {};
          this.deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
}

export default BaseDataModel;
