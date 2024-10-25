class PoliticalPartyDataParser {
  parse(data, baseDataStructure = {}) {
    const { value: values, dimension, size } = data;
    const partyLabels = dimension["Puolue"].category.label;
    const yearLabels = dimension["Vuosi"].category.label;
    const municipalityLabels =
      dimension["Vaalipiiri ja kunta vaalivuonna"].category.label;

    // Get the index values for years, municipalities, and parties
    const yearIndex = dimension["Vuosi"].category.index;
    const municipalityIndex =
      dimension["Vaalipiiri ja kunta vaalivuonna"].category.index;
    const partyIndex = dimension["Puolue"].category.index;

    // Get the keys for years, municipalities, and parties
    const yearKeys = Object.keys(yearIndex);
    const municipalityKeys = Object.keys(municipalityIndex);
    const partyKeys = Object.keys(partyIndex);

    // Extract sizes
    const [numYears, numParties, numMunicipalities] = size;

    // Sort keys based on their index values
    const sortedYearKeys = yearKeys.sort((a, b) => yearIndex[a] - yearIndex[b]);
    const sortedMunicipalityKeys = municipalityKeys.sort(
      (a, b) => municipalityIndex[a] - municipalityIndex[b],
    );
    const sortedPartyKeys = partyKeys.sort(
      (a, b) => partyIndex[a] - partyIndex[b],
    );

    // Iterate over the values array and map them correctly
    let valueIndex = 0;
    for (let yearIdx = 0; yearIdx < numYears; yearIdx++) {
      const yearKey = sortedYearKeys[yearIdx];
      const yearLabel = yearLabels[yearKey];
      baseDataStructure[yearLabel] = baseDataStructure[yearLabel] || {};

      for (let partyIdx = 0; partyIdx < numParties; partyIdx++) {
        const partyKey = sortedPartyKeys[partyIdx];
        const partyLabel = partyLabels[partyKey];

        for (
          let municipalityIdx = 0;
          municipalityIdx < numMunicipalities;
          municipalityIdx++
        ) {
          const municipalityKey = sortedMunicipalityKeys[municipalityIdx];
          const municipalityCode = this.getMunicipalityCode(municipalityKey);
          baseDataStructure[yearLabel][municipalityCode] = baseDataStructure[
            yearLabel
          ][municipalityCode] || { politicalParties: {} };

          const value = values[valueIndex] || 0;

          baseDataStructure[yearLabel][municipalityCode].politicalParties[
            partyLabel
          ] =
            (baseDataStructure[yearLabel][municipalityCode].politicalParties[
              partyLabel
            ] || 0) + value;

          valueIndex++;
        }
      }
    }

    return baseDataStructure;
  }

  getMunicipalityCode(key) {
    return key === "SSS" ? "SSS" : key.slice(-3);
  }
}

export default PoliticalPartyDataParser;
