const BASE_URL = "https://api.stat.fi/rest/v1/";

const ENDPOINTS = {
  MUNICIPALITY: {
    url: "https://data.stat.fi/api/classifications/v2/classifications/kunta_1_20240101/classificationItems?content=data&meta=max&lang=fi&format=json",
    method: "GET",
  },
  EMPLOYMENT: (year) => ({
    url: `${BASE_URL}employment`,
    method: "POST",
    body: JSON.stringify({ year }),
  }),
  POLITICAL: (years = ["2023"], parties = [], municipality = ["SSS"]) => ({
    url: `https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/evaa/statfin_evaa_pxt_13sw.px`,
    method: "POST",
    body: {
      query: [
        {
          code: "Vuosi",
          selection: {
            filter: "item",
            values: years || ["2023"],
          },
        },
        {
          code: "Puolue",
          selection: {
            filter: "item",
            values:
              parties.length > 0
                ? parties
                : ["03", "02", "01", "04", "05", "06", "07", "08", "09"],
          },
        },
        {
          code: "Vaalipiiri ja kunta vaalivuonna",
          selection: {
            filter: "item",
            values: municipality,
          },
        },
        {
          code: "Tiedot",
          selection: {
            filter: "item",
            values: ["evaa_osuus_aanista"],
          },
        },
      ],
      response: {
        format: "json-stat2",
      },
    },
  }),
  POPULATION: (year) => ({
    url: `${BASE_URL}population`,
    method: "POST",
    body: JSON.stringify({ year }),
  }),
  IMMIGRATION: {
    url: "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f",
    method: "GET",
  },
  EMIGRATION: {
    url: "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e",
    method: "GET",
  },
  GEOJSON: {
    url: "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326",
    method: "GET",
  },
};

export default ENDPOINTS;
