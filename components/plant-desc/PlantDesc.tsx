import { type PlantSpecifications, type PlantType } from "@/constants/Plants";
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

export default async function PlantDesc({
  plantType,
}: Readonly<{ plantType: string }>) {
  try {
    const desc = await getPlantDesc(plantType);
    const validPlantType = plantType as PlantType;

    return <PlantDescClient plantType={validPlantType} desc={desc} />;
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}
