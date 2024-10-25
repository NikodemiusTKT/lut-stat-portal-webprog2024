import L from "leaflet";

class PoliticalPartyMapView {
  constructor(mapContainerId) {
    this.map = L.map(mapContainerId).setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  addGeoJsonLayer(geoJsonData, politicalData, year) {
    console.log("Adding GeoJson layer");
    const geoFeature = L.geoJson(geoJsonData, {
      style: (feature) => this.styleFunction(feature, politicalData, year),
      onEachFeature: (feature, layer) =>
        this.onEachFunction(feature, layer, politicalData, year),
    }).addTo(this.map);
    this.map.fitBounds(geoFeature.getBounds());
  }

  styleFunction(feature, politicalData, year) {
    year = year[0];
    if (feature.properties?.kunta) {
      const municipalityCode = feature.properties.kunta;
      const politicalInfo = politicalData[year]?.[municipalityCode] || {};
      const { politicalParties = {} } = politicalInfo || {};
      const dominantParty = this.getDominantParty(politicalParties);
      const hue = this.calcHue(dominantParty);
      return { color: `hsl(${hue},75%,50%)`, weight: 2 };
    }
    return { color: "#ccc", weight: 1 };
  }

  getDominantParty(politicalParties) {
    let maxVotes = 0;
    let dominantParty = null;
    for (const [party, votes] of Object.entries(politicalParties)) {
      if (votes > maxVotes) {
        maxVotes = votes;
        dominantParty = party;
      }
    }
    return dominantParty;
  }

  calcHue(dominantParty) {
    const partyColorMap = {
      KOK: 240, // Blue
      PS: 60, // Yellow
      SDP: 0, // Red
      KESK: 120, // Green
      VIHR: 90, // Light Green
      VAS: 330, // Pink
      RKP: 270, // Purple
      KD: 300, // Dark Purple
      LIIKE: 180, // Cyan
    };

    return partyColorMap[dominantParty] || 0; // Default to red if party not found
  }

  onEachFunction(feature, layer, politicalData, year) {
    if (feature.properties?.name) {
      layer.bindTooltip(feature.properties.name).openTooltip();
    }
    if (feature.properties?.kunta) {
      const municipalityCode = feature.properties.kunta;
      const politicalInfo = politicalData[year]?.[municipalityCode] || {};
      const { politicalParties = {} } = politicalInfo || {};
      const dominantParty = this.getDominantParty(politicalParties);
      const maxVotes = politicalParties[dominantParty] || 0;
      const popUpTemplate = `<p>Dominant Party: ${dominantParty}</p><p>Votes: ${maxVotes}</p>`;
      layer.bindPopup(popUpTemplate);
    }
  }
}

export default PoliticalPartyMapView;
