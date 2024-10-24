export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const parseResponse = (data, parser) => {
  try {
    return parser ? parser.parse(data) : data;
  } catch (error) {
    console.error("Error parsing data:", error);
    throw error;
  }
};
