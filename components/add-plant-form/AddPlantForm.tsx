import type { PlantType } from "@/constants/Plants";
import AddPlantFormClient from "./AddPlantFormClient";

async function getPlantTypes() {
  try {
    const res = await fetch("http://localhost:3000/api/plants");
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
