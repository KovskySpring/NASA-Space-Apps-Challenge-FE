import {
  MOCK_SPECIFICATION_RECORD,
  type PlantSpecifications,
  type PlantSpecificationsRecord,
  type PlantType,
} from "@/constants/Plants";
import PlantDescClient from "./PlantDescClient";
import { redirect } from "next/navigation";

async function getPlantDesc(plantType: string) {
  const res = await fetch(
    `${process.env.PLANT_DATABASE_API}/Plant/get-plant-by-name?name=${plantType}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  const desc = (await res.json()) as PlantSpecifications;
  return desc;
}

async function getCurrentSpecificationRecord(plantType: PlantType) {
  return MOCK_SPECIFICATION_RECORD[plantType];
}

async function getSuitabilityScore(
  values: PlantSpecificationsRecord,
  specs: PlantSpecifications,
) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    const { min, max, weight } = specs[key as keyof PlantSpecifications];
    const score = value >= min && value <= max ? 1 : 0;
    const weightedScore = score * weight;
    return acc + weightedScore;
  }, 0);
}

export default async function PlantDesc({
  plantType,
}: Readonly<{ plantType: string }>) {
  try {
    const desc = await getPlantDesc(plantType);
    const validPlantType = plantType as PlantType;
    const currentSpecData = await getCurrentSpecificationRecord(validPlantType);
    const score = await getSuitabilityScore(currentSpecData, desc);

    if (isNaN(score)) {
      console.log(plantType, desc, currentSpecData, score);
      throw new Error("Invalid score");
    }

    return (
      <PlantDescClient plantType={validPlantType} suitabilityScore={score} />
    );
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}
