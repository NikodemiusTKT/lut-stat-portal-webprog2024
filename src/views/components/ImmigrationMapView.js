import L from "leaflet";

class CustomMapView {
  constructor(mapContainerId) {
    this.map = L.map(mapContainerId).setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  addGeoJsonLayer(geoJsonData, migrationData) {
    const geoFeature = L.geoJson(geoJsonData, {
      style: (feature) => this.styleFunction(feature, migrationData),
      onEachFeature: (feature, layer) =>
        this.onEachFunction(feature, layer, migrationData),
    }).addTo(this.map);
    this.map.fitBounds(geoFeature.getBounds());
  }

  styleFunction(feature, migrationData) {
    if (feature.properties?.kunta) {
      const municipalityCode = feature.properties.kunta;
      const migrationInfo = migrationData[municipalityCode] || {};
      const { immigration = [], emigration = [] } = migrationInfo.data || {};
      const hue = this.calcHue(immigration[0] || 0, emigration[0] || 0);
      return { color: `hsl(${hue},75%,50%)`, weight: 2 };
    }
    return { color: "#ccc", weight: 1 };
  }

  calcHue(positiveMigration, negativeMigration) {
    const ratio = positiveMigration / (negativeMigration || 1);
    const hue = Math.min(Math.pow(ratio, 3) * 60, 120);
    return hue;
  }

  onEachFunction(feature, layer, migrationData) {
    if (feature.properties?.name) {
      layer.bindTooltip(feature.properties.name).openTooltip();
    }
    if (feature.properties?.kunta) {
      const municipalityCode = feature.properties.kunta;
      const migrationInfo = migrationData[municipalityCode] || {};
      const { immigration = [], emigration = [] } = migrationInfo.data || {};
      const popUpTemplate = `<p>Positive migration: ${immigration[0] || 0}</p><p>Negative migration: ${emigration[0] || 0}</p>`;
      layer.bindPopup(popUpTemplate);
    }
  }
}

export default CustomMapView;
