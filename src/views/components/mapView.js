import L from "leaflet";

class MapView {
  constructor(mapId) {
    this.map = L.map(mapId).setView([64.9631, 25.004], 6); // Centered on Finland
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap",
    }).addTo(this.map);
  }

  renderMunicipalityBoundaries(geoJsonData) {
    L.geoJSON(geoJsonData, {
      style: {
        color: "#3388ff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.2,
      },
    }).addTo(this.map);
  }
}

export default MapView;
