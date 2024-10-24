import L from "leaflet";

class PoliticalPartyMapView {
  constructor(mapContainerId) {
    this.map = L.map(mapContainerId).setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  addGeoJsonLayer(geoJsonData, politicalData) {
    const geoFeature = L.geoJson(geoJsonData, {
      style: (feature) => this.styleFunction(feature, politicalData),
      onEachFeature: (feature, layer) =>
        this.onEachFunction(feature, layer, politicalData),
    }).addTo(this.map);
    this.map.fitBounds(geoFeature.getBounds());
  }

  styleFunction(feature, politicalData) {
    if (feature.properties?.kunta) {
      const partyPower = politicalData[feature.properties.kunta] || {};
      const hue = this.calcHue(partyPower);
      return { color: `hsl(${hue},75%,50%)`, weight: 2 };
    }
    return { color: "#ccc", weight: 1 };
  }

  calcHue(partyPower) {
    // Calculate hue based on the political power of the party
    // For simplicity, let's assume partyPower is a value between 0 and 1
    const hue = partyPower * 120; // 0 (red) to 120 (green)
    return hue;
  }

  onEachFunction(feature, layer, politicalData) {
    if (feature.properties?.name) {
      layer.bindTooltip(feature.properties.name).openTooltip();
    }
    if (feature.properties?.kunta) {
      const partyPower = politicalData[feature.properties.kunta] || 0;
      const popUpTemplate = `<p>Political Power: ${partyPower}</p>`;
      layer.bindPopup(popUpTemplate);
    }
  }
}

export default PoliticalPartyMapView;
