class ApiService {
  constructor(config) {
    this.config = config;
  }

  async request(config = this.config) {
    try {
      const response = await fetch(config.url, {
        method: config.method || "GET",
        headers: config.headers || {},
        body: config.body ? JSON.stringify(config.body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error making API request:", error);
      throw error;
    }
  }
}

export default ApiService;
