import {
  MOCK_SPECIFICATION_RECORD,
  PLANT_SPECIFICATIONS,
  type PlantSpecifications,
  type PlantSpecificationsRecord,
  type PlantType,
} from "@/constants/Plants";
import Image from "next/image";
import Link from "next/link";
import AddPlantButton from "./AddPlantButton";

async function getUserPlants() {
  return PLANT_SPECIFICATIONS;
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

type PlantNamesAndSuitabilityScores = {
  plantName: PlantType;
  suitabilityScore: number;
};

async function getPlantNamesAndSuitabilityScores(): Promise<
  PlantNamesAndSuitabilityScores[]
> {
  const userPlants = await getUserPlants();

  const plantNamesAndSuitabilityScores = Object.entries(userPlants).map(
    async ([plantName, plantData]) => {
      const currentSpecData = await getCurrentSpecificationRecord(
        plantName as PlantType,
      );
      const score = await getSuitabilityScore(currentSpecData, plantData);
      return { plantName: plantName as PlantType, suitabilityScore: score };
    },
  );

  const out = await Promise.allSettled(plantNamesAndSuitabilityScores);

  return out
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
}

export default async function PlantDashboard() {
  const plantList = await getPlantNamesAndSuitabilityScores();

  return (
    <div className="flex h-full w-full flex-row items-stretch justify-stretch bg-white">
      <div className="flex h-full w-80 min-w-80 flex-col items-center justify-start gap-8 bg-gray-100 pt-20 shadow-inner">
        <Image
          className="m-2"
          src="/plant-placeholder.svg"
          alt="Plant Image"
          width={80}
          height={80}
        />
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold">Plants</span>
          <AddPlantButton />
        </div>
      </div>
      <div className="flex h-full max-h-full flex-grow flex-wrap place-content-start gap-4 overflow-y-auto p-4">
        {plantList.map(({ plantName, suitabilityScore }) => (
          <PlantItem
            key={plantName}
            plantName={plantName}
            suitabilityScore={suitabilityScore}
          />
        ))}
      </div>
    </div>
  );
}

function PlantItem({
  plantName,
  suitabilityScore,
}: Readonly<PlantNamesAndSuitabilityScores>) {
  const scoreOutOf5 = suitabilityScore * 5;

  return (
    <Link
      href={`/plants/${plantName}`}
      className="flex h-fit w-72 flex-col items-center justify-between rounded-md border border-solid border-gray-100 bg-white drop-shadow-md"
    >
      <Image
        src="/plant-placeholder.svg"
        alt="Plant thumbnail"
        width={180}
        height={180}
      />
      <div className="flex w-full flex-col items-stretch gap-1 bg-gray-100 p-2">
        <span className="z-10 text-lg font-bold">{plantName}</span>
        <div className="z-10 flex flex-row items-center justify-between">
          <span className="text-sm font-bold">Suitability Score</span>
          <span className="text-sm">{scoreOutOf5}/5</span>
        </div>
        <div className="relative h-2 w-40 rounded-sm border border-solid border-gray-500 transition-all">
          <div
            className="absolute left-0 top-0 z-0 h-2 w-40 rounded-sm bg-gray-500 transition-all"
            style={{ width: 160 * suitabilityScore }}
          />
        </div>
      </div>
    </Link>
  );
}
