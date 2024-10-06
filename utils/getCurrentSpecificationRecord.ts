import { MOCK_SPECIFICATION_RECORD, type PlantType } from "@/constants/Plants";
import fetchHydro1GesDisc from "./fetchHydro1GesDisc";

export default async function getCurrentSpecificationRecord(
  plantType: PlantType,
  location: Readonly<[number, number]>,
) {
  // ! MOCK only (only `DONE` items are implemented)
  // ? In production this function should fetch the following
  // ? timeseries data from GES DISC's Hydrology Data Rods API's:
  // * [DONE] GLDAS Thermal GLDAS2:GLDAS_NOAH025_3H_v2.1:SoilTMP0_10cm_inst
  // * [DONE] GLDAS Soil moisture GLDAS2:GLDAS_NOAH025_3H_v2.1:SoilMoi0_10cm_inst
  // * [DONE] GLDAS Rainfall GLDAS2:GLDAS_NOAH025_3H_v2.1:Rainf_tavg
  // * MODIS Land-cover
  // * GEDI Biomass Indices
  // ? And
  // * Landsat's Surface Reflectance

  const configs = [
    {
      projectName: "GLDAS2",
      productName: "GLDAS_NOAH025_3H_v2.1",
      variableShortName: "SoilTMP0_10cm_inst",
    },
    {
      projectName: "GLDAS2",
      productName: "GLDAS_NOAH025_3H_v2.1",
      variableShortName: "SoilMoi0_10cm_inst",
    },
    {
      projectName: "GLDAS2",
      productName: "GLDAS_NOAH025_3H_v2.1",
      variableShortName: "Rainf_tavg",
    },
  ];

  const promises = configs.map((config) =>
    fetchHydro1GesDisc({ ...config, location }),
  );

  const ps = await Promise.allSettled(promises);

  const fulfilled = ps.reduce((acc, p) => {
    if (p.status === "fulfilled") {
      acc.push(p.value);
    }
    return acc;
  }, [] as number[]);

  const fullMock = MOCK_SPECIFICATION_RECORD[plantType];

  if (fulfilled.length !== ps.length) {
    // failed attempt, return mock data
    return fullMock;
  }

  const out = {
    ...fullMock,
    optimalHumidity: fulfilled[0],
    cropWaterNeed: fulfilled[1],
    salinityTolerance: fulfilled[2],
  };

  return out;
}
