import ApiService from "./ApiService.js";
import ENDPOINTS from "./endPoints.js";

class ApiServiceFactory {
  static createService(endpointKey, ...params) {
    const endpointConfig =
      typeof ENDPOINTS[endpointKey] === "function"
        ? ENDPOINTS[endpointKey](...params)
        : ENDPOINTS[endpointKey];
    if (!endpointConfig) {
      throw new Error(`Endpoint configuration for ${endpointKey} not found`);
    }
    return new ApiService(endpointConfig);
  }
}

export default ApiServiceFactory;
