class PoliticalPartyDataParser {
  parse(data, baseDataStructure = {}) {
    const { value: values, dimension } = data;
    const { label: partyLabels, index: partyIndexes } =
      dimension["Puolue"].category;
    const { label: yearLabels, index: yearIndexes } =
      dimension["Vuosi"].category;
    const { label: municipalityLabels, index: municipalityIndexes } =
      dimension["Vaalipiiri ja kunta vaalivuonna"].category;

    // Populate baseDataStructure with political party data
    let valueIndex = 0;
    const yearKeys = Object.keys(yearIndexes);
    const municipalityKeys = Object.keys(municipalityIndexes);
    const partyKeys = Object.keys(partyIndexes);

    for (const yearKey of yearKeys) {
      const yearLabel = yearLabels[yearKey];
      if (!baseDataStructure[yearLabel]) {
        baseDataStructure[yearLabel] = {};
      }

      for (const municipalityKey of municipalityKeys) {
        const municipalityCode =
          municipalityKey === "SSS"
            ? "SSS"
            : this.extractMunicipalityCode(municipalityKey);
        if (!baseDataStructure[yearLabel][municipalityCode]) {
          baseDataStructure[yearLabel][municipalityCode] = {
            politicalParties: {},
          };
        }

        for (const partyKey of partyKeys) {
          const partyLabel = partyLabels[partyKey];
          const value = values[valueIndex];

          // Initialize the party data structure if it doesn't exist
          if (
            !baseDataStructure[yearLabel][municipalityCode].politicalParties[
              partyLabel
            ]
          ) {
            baseDataStructure[yearLabel][municipalityCode].politicalParties[
              partyLabel
            ] = 0;
          }

          // Handle null values
          baseDataStructure[yearLabel][municipalityCode].politicalParties[
            partyLabel
          ] += value !== null ? value : 0;

          valueIndex++;
        }
      }
    }

    console.log("Parsed political party data:", baseDataStructure);
    return baseDataStructure;
  }

  cleanMunicipalityLabel(label) {
    return label
      .replace(/[^a-zA-Z\s]/g, "")
      .replace(/KU/g, "")
      .trim();
  }

  extractMunicipalityCode(key) {
    return key.slice(-3); // Extract the last three digits
  }
}

export default PoliticalPartyDataParser;
