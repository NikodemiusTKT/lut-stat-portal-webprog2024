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
    const values = data.dataset.value;
    const indexes = data.dataset.dimension["Tuloalue"].category.index;
    return { values, indexes };
  }
}

class EmigrationParser {
  parse(data) {
    // Specific parsing logic for emigration data
    const values = data.dataset.value;
    const indexes = data.dataset.dimension["Lähtöalue"].category.index;
    return { values, indexes };
  }
}

class PoliticalPartyParser {
  parse(data) {
    const values = data.value;
    const labels = data.dimension["Puolue"].category.label;
    const indexes = data.dimension["Puolue"].category.index;
    const years = data.dimension["Vuosi"].category.label;
    const yearIndexes = data.dimension["Vuosi"].category.index;
    console.log(data);
    const municipalities =
      data.dimension["Vaalipiiri ja kunta vaalivuonna"].category.label;
    const municipalityIndexes =
      data.dimension["Vaalipiiri ja kunta vaalivuonna"].category.index;

    const parsedData = {};

    // Initialize parsedData structure
    Object.keys(municipalityIndexes).forEach((municipalityKey) => {
      const municipalityLabel = municipalities[municipalityKey];
      parsedData[municipalityLabel] = {};
    });

    // Iterate over years, municipalities, and parties to populate parsedData
    let valueIndex = 0;
    Object.keys(yearIndexes).forEach((yearKey) => {
      const yearLabel = years[yearKey];
      Object.keys(municipalityIndexes).forEach((municipalityKey) => {
        const municipalityLabel = municipalities[municipalityKey];
        parsedData[municipalityLabel][yearLabel] =
          parsedData[municipalityLabel][yearLabel] || {};

        Object.keys(indexes).forEach((partyKey) => {
          const partyLabel = labels[partyKey];
          const value = values[valueIndex];

          // Handle null values
          parsedData[municipalityLabel][yearLabel][partyLabel] =
            value !== null ? value : 0;

          valueIndex++;
        });
      });
    });

    return parsedData;
  }
}

class GeoJsonParser {
  parse(data) {
    // Perform any necessary preprocessing on the GeoJSON data
    // For example, you might want to add or modify properties
    return data;
  }
}

export {
  DataParser,
  DefaultParser,
  EmploymentParser,
  PoliticalPartyParser,
  ImmigrationParser,
  EmigrationParser,
  GeoJsonParser,
};
