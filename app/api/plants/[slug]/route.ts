import { PLANT_SPECIFICATIONS, PLANT_TYPES } from "@/constants/Plants";

const PLANT_TYPES_ARRAY = Object.keys(PLANT_TYPES);

function isValidPlant(plant: string): plant is keyof typeof PLANT_TYPES {
  return PLANT_TYPES_ARRAY.includes(plant);
}

export function GET(
  request: Request,
  { params: { slug: plant } }: { params: { slug: string } },
) {
  if (isValidPlant(plant)) {
    return Response.json(PLANT_SPECIFICATIONS[plant]);
  }

  return new Response("Not Found", { status: 404 });
}
