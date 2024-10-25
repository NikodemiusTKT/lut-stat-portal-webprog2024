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
  parse(dataArray) {
    return dataArray.map((data) => {
      const municipalityCode = data["sourceItem"].code;
      const electoralDistrictCode = data["targetItem"].code;
      const municipalityName = data.sourceItem.classificationItemNames.find(
        (name) => name.lang === "fi",
      ).name;
      const electoralDistrictName =
        data.targetItem.classificationItemNames.find(
          (name) => name.lang === "fi",
        ).name;

      return {
        municipalityCode,
        electoralDistrictCode,
        municipalityName,
        electoralDistrictName,
      };
    });
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
