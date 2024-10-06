declare namespace PlantDatabase {
  interface Data {
    plants?: PlantsEntity[] | null;
  }

  interface GetAllPlantsResponseData {
    data: Data;
    success: boolean;
    code?: null;
    message: string;
    variant: string;
    title: string;
  }

  interface PlantsEntity {
    id: number;
    plantName: string;
    description?: string | null;
    note?: string | null;
    weight?: number | null;
    heigh?: number | null;
    info1?: number | null;
    info2?: number | null;
    info3?: number | null;
    info4?: number | null;
    des1?: string | null;
    des2?: string | null;
    des3?: string | null;
    des4?: string | null;
    rainfallValue?: null;
    rainfallMinValue: number;
    rainfallMaxValue: number;
    rainfallDescription?: string | null;
    rainfallNote?: string | null;
    salinityValue?: number | null;
    salinityMinValue: number;
    salinityMaxValue: number;
    salinityDescription?: string | null;
    salinityNote?: string | null;
    moistureValue?: number | null;
    moistureMinValue: number;
    moistureMaxValue: number;
    moistureDescription?: string | null;
    moistureNote?: string | null;
    landcoverValue?: number | null;
    landcoverMinValue?: number | null;
    landcoverMaxValue?: number | null;
    landcoverDescription?: string | null;
    landcoverNote?: string | null;
    biomassValue?: number | null;
    biomassMinValue: number;
    biomassMaxValue: number;
    biomassDescription?: string | null;
    biomassNote?: string | null;
  }
}
