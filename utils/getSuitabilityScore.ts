import type { PlantSpecifications, PlantType } from "@/constants/Plants";
import getCurrentSpecificationRecord from "./getCurrentSpecificationRecord";

export default async function getSuitabilityScore(
  plantType: PlantType,
  specs: PlantSpecifications,
  location: Readonly<[number, number]>,
) {
  const values = await getCurrentSpecificationRecord(plantType, location);
  return Object.entries(values).reduce((acc, [key, value]) => {
    const { min, max, weight } = specs[key as keyof PlantSpecifications];
    const score = value >= min && value <= max ? 1 : 0;
    const weightedScore = score * weight;
    return acc + weightedScore;
  }, 0);
}
