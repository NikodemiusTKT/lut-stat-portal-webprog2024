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
      const { immigration, emigration } =
        migrationData[feature.properties.kunta] || {};
      const hue = this.calcHue(immigration, emigration);
      return { color: `hsl(${hue},75%,50%)`, weight: 2 };
    }
    return { color: "#ccc", weight: 1 };
  }

  calcHue(positiveMigration, negativeMigration) {
    const hue = Math.pow(positiveMigration / (negativeMigration || 1), 3) * 60;
    return Math.min(hue, 120);
  }

  onEachFunction(feature, layer, migrationData) {
    if (feature.properties?.name) {
      layer.bindTooltip(feature.properties.name).openTooltip();
    }
    if (feature.properties?.kunta) {
      const { immigration, emigration } = migrationData[
        feature.properties.kunta
      ] || { immigration: 0, emigration: 0 };
      const popUpTemplate = `<p>Positive migration: ${immigration}</p><p>Negative migration: ${emigration}</p>`;
      layer.bindPopup(popUpTemplate);
    }
  }
}
export default CustomMapView;
