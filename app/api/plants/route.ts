import { PLANT_TYPES } from "@/constants/Plants";

const PLANT_TYPES_ARRAY = Object.keys(PLANT_TYPES);

export function GET() {
  return Response.json(PLANT_TYPES_ARRAY);
}
