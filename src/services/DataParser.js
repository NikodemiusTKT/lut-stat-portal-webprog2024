class DataParser {
  constructor(strategy) {
    this.strategy = strategy;
  }

  parse(data) {
    return this.strategy.parse(data);
  }
}

class DefaultParser {
  parse(data) {
    // Default parsing logic
    return data;
  }
}

class ImmigrationParser {
  parse(data) {
    // Specific parsing logic for immigration data
    if (!data.dataset) {
      throw new Error("Dataset is undefined");
    }
    const { value: values, dimension } = data.dataset;
    const indexes = dimension["Tuloalue"].category.index;
    return { values, indexes };
  }
}

class EmigrationParser {
  parse(data) {
    // Specific parsing logic for emigration data
    if (!data.dataset) {
      throw new Error("Dataset is undefined");
    }
    const { value: values, dimension } = data.dataset;
    const indexes = dimension["Lähtöalue"].category.index;
    return { values, indexes };
  }
}

class MunicipalityParser {
  parse(data) {
    const baseDataStructure = {};
    data.forEach((item) => {
      const code = item.code;
      const nameObj = item.classificationItemNames.find(
        (nameObj) => nameObj.lang === "fi",
      );
      const name = nameObj ? nameObj.name : "Unknown"; // Handle case where nameObj is undefined

      // Initialize the structure for each year
      const years = ["2023"]; // Add more years as needed
      years.forEach((year) => {
        if (!baseDataStructure[year]) {
          baseDataStructure[year] = {};
        }
        if (!baseDataStructure[year][code]) {
          baseDataStructure[year][code] = {
            name,
            politicalParties: {},
            population: [],
            // Add more data types as needed
          };
        }
      });
    });
    return baseDataStructure;
  }
}

class GeoJsonParser {
  parse(data) {
    // Perform any necessary preprocessing on the GeoJSON data
    // For example, you might want to add or modify properties
    return data;
  }
}

class PopulationDataParser {
  parse(data) {
    return data;
  }
}

export {
  DataParser,
  DefaultParser,
  ImmigrationParser,
  EmigrationParser,
  MunicipalityParser,
  GeoJsonParser,
  PopulationDataParser,
};
