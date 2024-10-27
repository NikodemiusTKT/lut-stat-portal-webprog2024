import L from "leaflet";

class PoliticalPartyMapView {
  constructor(mapContainerId) {
    this.map = L.map(mapContainerId).setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  async addGeoJsonLayer(geoJsonData, politicalData, year) {
    try {
      const geoFeature = L.geoJson(geoJsonData, {
        style: (feature) => this.styleFunction(feature, politicalData, year),
        onEachFeature: (feature, layer) =>
          this.onEachFunction(feature, layer, politicalData, year),
      }).addTo(this.map);
      this.map.fitBounds(geoFeature.getBounds());
    } catch (error) {
      console.error("Error adding GeoJson layer:", error);
    }
  }

  styleFunction(feature, politicalData, year) {
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

      // Create a table of all parties and their votes
      const partiesTable = Object.entries(politicalParties)
        .map(
          ([party, votes]) => `
          <tr${party === dominantParty ? ' style="font-weight: bold;"' : ""}>
            <td>${party}</td>
            <td>${votes} %</td>
          </tr>`,
        )
        .join("");

      const popUpTemplate = `
      <div style="font-family: Arial, sans-serif; font-size: 12px;">
        <h4 style="margin: 0;">${feature.properties.name}</h4>
        <p><strong>Dominant Party:</strong> ${dominantParty}</p>
        <p><strong>Votes:</strong> ${maxVotes} %</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 2px; border-bottom: 1px solid #ddd;">Party</th>
              <th style="text-align: left; padding: 2px; border-bottom: 1px solid #ddd;">Votes (%)</th>
            </tr>
          </thead>
          <tbody>
            ${partiesTable}
          </tbody>
        </table>
      </div>
    `;
      layer.bindPopup(popUpTemplate);
    }
  }
}

export default PoliticalPartyMapView;
