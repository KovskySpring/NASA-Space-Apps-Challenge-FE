import type { PlantType } from "@/constants/Plants";
import AddPlantFormClient from "./AddPlantFormClient";

async function getPlantTypes() {
  try {
    const res = await fetch(
      `${process.env.PLANT_DATABASE_API}/Plant/get-all-plants`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    const types = (await res.json()) as PlantType[];
    return types;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function AddPlantForm() {
  const plantTypes = await getPlantTypes();

  return <AddPlantFormClient plantTypes={plantTypes} />;
}
