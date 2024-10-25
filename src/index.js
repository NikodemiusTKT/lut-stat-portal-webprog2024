// Focuses on initializing the application by setting up the DOM and calling functions to load initial data. It serves as the entry point of the app.
import MapController from "./controllers/MapController.js";
import PoliticalPartyController from "./controllers/politicalPartyController.js"; // Fixed import
import MunicipalityModel from "./models/MunicipalityModel.js";
import { generateYears } from "./utils/utilities.js";

window.onload = async () => {
  // const years = generateYears(1999, 2023, 4);
  const years = ["2023"];
  const parties = [];
  const municipality = ["SSS"];
  const munitipalityModel = new MunicipalityModel();
  const municipalityData = await munitipalityModel.fetchMunicipalityData();
  const baseDataStructure = municipalityData;
  const politicalController = new PoliticalPartyController(
    "#chart",
    "map",
    years,
    parties,
    municipality,
  ); // Fixed instantiation
  // mapController.loadMapData();
  politicalController.loadPoliticalPartyData(baseDataStructure);

  console.log("App loaded");
};
