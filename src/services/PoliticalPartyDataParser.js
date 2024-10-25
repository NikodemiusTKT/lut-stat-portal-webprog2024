class PoliticalPartyDataParser {
  parse(data, baseDataStructure = {}) {
    const { value: values, dimension, size } = data;
    const partyLabels = dimension["Puolue"].category.label;
    const yearLabels = dimension["Vuosi"].category.label;
    const municipalityLabels =
      dimension["Vaalipiiri ja kunta vaalivuonna"].category.label;

    // Get sorted keys for years, municipalities, and parties
    const sortedYearKeys = this.getSortedKeys(
      dimension["Vuosi"].category.index,
    );
    const sortedMunicipalityKeys = this.getSortedKeys(
      dimension["Vaalipiiri ja kunta vaalivuonna"].category.index,
    );
    const sortedPartyKeys = this.getSortedKeys(
      dimension["Puolue"].category.index,
    );

    // Extract sizes
    const [numYears, numParties, numMunicipalities] = size;

    // Iterate over the values array and map them correctly
    let valueIndex = 0;
    for (const yearKey of sortedYearKeys) {
      const yearLabel = yearLabels[yearKey];
      baseDataStructure[yearLabel] = baseDataStructure[yearLabel] || {};

      for (const partyKey of sortedPartyKeys) {
        const partyLabel = partyLabels[partyKey];

        for (const municipalityKey of sortedMunicipalityKeys) {
          const municipalityCode = this.getMunicipalityCode(municipalityKey);
          this.initializeNestedObject(baseDataStructure, [
            yearLabel,
            municipalityCode,
            "politicalParties",
            partyLabel,
          ]);

          const value = values[valueIndex] || 0;
          baseDataStructure[yearLabel][municipalityCode].politicalParties[
            partyLabel
          ] += value;

          valueIndex++;
        }
      }
    }

    return baseDataStructure;
  }

  getSortedKeys(index) {
    return Object.keys(index).sort((a, b) => index[a] - index[b]);
  }

  getMunicipalityCode(key) {
    return key === "SSS" ? "SSS" : key.slice(-3);
  }

  initializeNestedObject(obj, keys) {
    keys.reduce((acc, key, idx) => {
      if (idx === keys.length - 1) {
        if (acc[key] === undefined) acc[key] = 0;
      } else {
        if (acc[key] === undefined) acc[key] = {};
      }
      return acc[key];
    }, obj);
  }
}

export default PoliticalPartyDataParser;
