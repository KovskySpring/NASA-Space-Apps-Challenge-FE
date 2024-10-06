"use client";

import type { PlantType } from "@/constants/Plants";
import IconButton from "../buttons/IconButton";
import { LocateIcon } from "../icons/LocateIcon";
import { MapIcon } from "../icons/MapIcon";
import TextButton from "../buttons/TextButton";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPlantFormClient({
  plantTypes,
}: Readonly<{ plantTypes: PlantType[] }>) {
  const router = useRouter();

  const defaultPlantType = useMemo(() => plantTypes[0], [plantTypes]);

  const [selectedPlantType, setSelectedPlantType] = useState<PlantType | null>(
    null,
  );

  // const [coordinates, setCoordinates] = useState<Readonly<[number, number]>>([0, 0])

  const onAddClicked = useCallback(() => {
    const selected = selectedPlantType ?? defaultPlantType;
    router.push(`/plants/${selected}`);
  }, [selectedPlantType, defaultPlantType, router]);

  const onPlantTypeSelected = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedPlantType(event.target.value as PlantType);
    },
    [],
  );

  return (
    <form className="flex flex-col gap-2 rounded-md border-2 border-dashed border-black p-4">
      <label className="flex flex-row items-center justify-between gap-2">
        <span className="font-bold">Plant Type</span>
        <select
          className="form-select rounded-md border-2 border-solid border-black"
          defaultValue={defaultPlantType}
          onChange={onPlantTypeSelected}
        >
          {plantTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-row items-center justify-between gap-2">
        <span className="font-bold">Location</span>
        <div className="flex flex-row gap-2">
          <IconButton title="Use my location">
            <LocateIcon width={40} height={40} />
          </IconButton>
          <IconButton title="Pick a location">
            <MapIcon width={40} height={40} />
          </IconButton>
        </div>
      </div>
      <TextButton title="Pick a location" label="Add" onClick={onAddClicked} />
    </form>
  );
}
