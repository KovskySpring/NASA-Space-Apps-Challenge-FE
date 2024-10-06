export type RangedValue = {
  unit: string;
  min: number;
  max: number;
  weight: number;
};

export type PlantSpecificationsRecordHistory = {
  labels: string[];
  dataset: number[];
};

export type PlantSpecifications = {
  optimalHumidity: RangedValue;
  cropWaterNeed: RangedValue;
  salinityTolerance: RangedValue;
  biomassYield: RangedValue;
};

export type PlantSpecificationsRecord = Record<
  keyof PlantSpecifications,
  number
>;

export const PLANT_SPECIFICATION_LABELS = {
  optimalHumidity: "Optimal Humidity",
  cropWaterNeed: "Crop Water Need",
  salinityTolerance: "Salinity Tolerance",
  biomassYield: "Biomass Yield",
} as const satisfies Record<keyof PlantSpecifications, string>;

export type PlantSpecificationsRecordKeys =
  keyof typeof PLANT_SPECIFICATION_LABELS;

export const PLANT_TYPES = {
  Carrot: "Carrot",
  Corn: "Corn",
  Lettuce: "Lettuce",
  Potato: "Potato",
  Tomato: "Tomato",
  Cabbage: "Cabbage",
  Pineapple: "Pineapple",
  Coconuts: "Coconuts",
} as const;

export type PlantType = keyof typeof PLANT_TYPES;

export const PLANT_SPECIFICATIONS = {
  Carrot: {
    optimalHumidity: {
      unit: "%",
      min: 90,
      max: 95,
      weight: 0.25,
    },
    cropWaterNeed: {
      unit: "mm",
      min: 350,
      max: 550,
      weight: 0.25,
    },
    salinityTolerance: {
      unit: "dS/m",
      min: 0,
      max: 1.0,
      weight: 0.25,
    },
    biomassYield: {
      unit: "ton/ha",
      min: 30,
      max: 50,
      weight: 0.25,
    },
  },
  Corn: {
    optimalHumidity: {
      unit: "%",
      min: 95,
      max: 98,
      weight: 0.25,
    },
    cropWaterNeed: {
      unit: "mm",
      min: 500,
      max: 800,
      weight: 0.25,
    },
    salinityTolerance: {
      unit: "dS/m",
      min: 0,
      max: 1.7,
      weight: 0.25,
    },
    biomassYield: {
      unit: "ton/ha",
      min: 6,
      max: 9,
      weight: 0.25,
    },
  },
  Lettuce: {
    optimalHumidity: {
      unit: "%",
      min: 95,
      max: 100,
      weight: 0.25,
    },
    cropWaterNeed: {
      unit: "mm",
      min: 150,
      max: 250,
      weight: 0.25,
    },
    salinityTolerance: {
      unit: "dS/m",
      min: 0,
      max: 1.3,
      weight: 0.25,
    },
    biomassYield: {
      unit: "ton/ha",
      min: 1,
      max: 2,
      weight: 0.25,
    },
  },
  Potato: {
    optimalHumidity: {
      unit: "%",
      min: 90,
      max: 95,
      weight: 0.25,
    },
    cropWaterNeed: {
      unit: "mm",
      min: 500,
      max: 700,
      weight: 0.25,
    },
    salinityTolerance: {
      unit: "dS/m",
      min: 0,
      max: 1.7,
      weight: 0.25,
    },
    biomassYield: {
      unit: "ton/ha",
      min: 15,
      max: 35,
      weight: 0.25,
    },
  },
  Tomato: {
    optimalHumidity: {
      unit: "%",
      min: 65,
      max: 85,
      weight: 0.25,
    },
    cropWaterNeed: {
      unit: "mm",
      min: 400,
      max: 800,
      weight: 0.25,
    },
    salinityTolerance: {
      unit: "dS/m",
      min: 0,
      max: 2.5,
      weight: 0.25,
    },
    biomassYield: {
      unit: "ton/ha",
      min: 45,
      max: 65,
      weight: 0.25,
    },
  },
  Cabbage: {
    optimalHumidity: {
      unit: "%",
      min: 98,
      max: 100,
      weight: 0.25,
    },
    cropWaterNeed: {
      unit: "mm",
      min: 350,
      max: 500,
      weight: 0.25,
    },
    salinityTolerance: {
      unit: "dS/m",
      min: 0,
      max: 1.8,
      weight: 0.25,
    },
    biomassYield: {
      unit: "ton/ha",
      min: 25,
      max: 50,
      weight: 0.25,
    },
  },
  Pineapple: {
    optimalHumidity: {
      unit: "%",
      min: 60,
      max: 85,
      weight: 0.25,
    },
    cropWaterNeed: {
      unit: "mm",
      min: 600,
      max: 1500,
      weight: 0.25,
    },
    salinityTolerance: {
      unit: "dS/m",
      min: 0,
      max: 2.0,
      weight: 0.25,
    },
    biomassYield: {
      unit: "ton/ha",
      min: 75,
      max: 90,
      weight: 0.25,
    },
  },
  Coconuts: {
    optimalHumidity: {
      unit: "%",
      min: 60,
      max: 85,
      weight: 0.25,
    },
    cropWaterNeed: {
      unit: "mm",
      min: 600,
      max: 1500,
      weight: 0.25,
    },
    salinityTolerance: {
      unit: "dS/m",
      min: 0,
      max: 2.0,
      weight: 0.25,
    },
    biomassYield: {
      unit: "ton/ha",
      min: 75,
      max: 90,
      weight: 0.25,
    },
  },
} as const satisfies Record<PlantType, PlantSpecifications>;

export const MOCK_SPECIFICATION_RECORD = {
  [PLANT_TYPES.Carrot]: {
    optimalHumidity: 100,
    cropWaterNeed: 750,
    salinityTolerance: 0.1,
    biomassYield: 60,
  },
  [PLANT_TYPES.Corn]: {
    optimalHumidity: 93,
    cropWaterNeed: 650,
    salinityTolerance: 1.5,
    biomassYield: 7.5,
  },
  [PLANT_TYPES.Lettuce]: {
    optimalHumidity: 97,
    cropWaterNeed: 200,
    salinityTolerance: 1.1,
    biomassYield: 1.5,
  },
  [PLANT_TYPES.Potato]: {
    optimalHumidity: 92,
    cropWaterNeed: 600,
    salinityTolerance: 1.5,
    biomassYield: 25,
  },
  [PLANT_TYPES.Tomato]: {
    optimalHumidity: 75,
    cropWaterNeed: 600,
    salinityTolerance: 2.0,
    biomassYield: 55,
  },
  [PLANT_TYPES.Cabbage]: {
    optimalHumidity: 99,
    cropWaterNeed: 400,
    salinityTolerance: 1.5,
    biomassYield: 35,
  },
  [PLANT_TYPES.Pineapple]: {
    optimalHumidity: 70,
    cropWaterNeed: 1000,
    salinityTolerance: 1.5,
    biomassYield: 80,
  },
  [PLANT_TYPES.Coconuts]: {
    optimalHumidity: 70,
    cropWaterNeed: 1000,
    salinityTolerance: 1.5,
    biomassYield: 80,
  },
} as const satisfies Record<PlantType, PlantSpecificationsRecord>;
