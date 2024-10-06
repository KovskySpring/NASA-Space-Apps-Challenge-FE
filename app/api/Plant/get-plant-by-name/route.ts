import { PLANT_SPECIFICATIONS, PLANT_TYPES } from "@/constants/Plants";
import type { NextRequest } from "next/server";

const PLANT_TYPES_ARRAY = Object.keys(PLANT_TYPES);

function isValidPlant(plant: string): plant is keyof typeof PLANT_TYPES {
  return PLANT_TYPES_ARRAY.includes(plant);
}

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const plant = searchParams.get("name") ?? "";

  if (isValidPlant(plant)) {
    return Response.json(PLANT_SPECIFICATIONS[plant]);
  }

  return new Response("Not Found", { status: 404 });
}
