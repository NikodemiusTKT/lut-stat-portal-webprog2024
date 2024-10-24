class ApiService {
  constructor(config) {
    this.url = config.url;
    this.method = config.method;
    this.headers = config.headers || {};
    this.body = config.body || null;
  }

  async request(config) {
    const options = {
      method: this.method,
      headers: this.headers,
    };

    if (this.body) {
      options.body = JSON.stringify(this.body);
      this.headers["Content-Type"] = "application/json";
    }

    const response = await fetch(this.url, options);
    return response.json();
  }
}

export default ApiService;
