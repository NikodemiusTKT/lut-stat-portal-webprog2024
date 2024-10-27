import MapController from "./controllers/MapController.js";
import PoliticalPartyController from "./controllers/politicalPartyController.js";
import MunicipalityModel from "./models/MunicipalityModel.js";
import { generateYears } from "./utils/utilities.js";

window.onload = async () => {
  const years = ["2019"];
  const parties = [];
  const municipalityModel = new MunicipalityModel();
  const municipalityData = await municipalityModel.fetchMunicipalityData();

  const municipalities = getCombinedCodes(municipalityData);
  municipalities.push("SSS");

  const politicalController = new PoliticalPartyController(
    "#chart",
    "map",
    years,
    parties,
    municipalities,
  );

  politicalController.loadPoliticalPartyData(municipalityData);

  console.log("App loaded");
};

function getCombinedCodes(municipalityData) {
  return Object.values(municipalityData).map((data) => {
    const { municipalityCode, electoralDistrictCode } = data;
    return combineCodes(electoralDistrictCode, municipalityCode);
  });
}

function combineCodes(districtCode, municipalityCode) {
  if (districtCode === "SSS") {
    return "SSS";
  }
  return districtCode.padEnd(3, "0") + municipalityCode;
}
