"use client";

import type { PlantType } from "@/constants/Plants";
import IconButton from "../buttons/IconButton";
import { LocateIcon } from "../icons/LocateIcon";
import TextButton from "../buttons/TextButton";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LeftArrowIcon } from "../icons/LeftArrowIcon";

export default function AddPlantFormClient({
  plantTypes,
}: Readonly<{ plantTypes: PlantType[] }>) {
  const router = useRouter();

  const defaultPlantType = useMemo(() => plantTypes[0], [plantTypes]);

  const [selectedPlantType, setSelectedPlantType] = useState<PlantType | null>(
    defaultPlantType,
  );

  const [coordinates, setCoordinates] = useState<Readonly<[number, number]>>([
    0, 0,
  ]);

  const [locationState, setLocationState] = useState<
    "loading" | "not-found" | "found"
  >("not-found");

  const onAddClicked = useCallback(() => {
    router.push(`/`);
  }, [router]);

  const onPlantTypeSelected = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedPlantType(event.target.value as PlantType);
    },
    [],
  );

  const onGetUserLocationClicked = useCallback(() => {
    setLocationState("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates([position.coords.latitude, position.coords.longitude]);
        setLocationState("found");
      },
      (error) => {
        console.error(error);
        setLocationState("not-found");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }, [setCoordinates, setLocationState]);

  const onBackButtonClicked = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <IconButton title="Back" onClick={onBackButtonClicked}>
          <LeftArrowIcon width={40} height={40} />
        </IconButton>
        <span className="font-bold">Back</span>
      </div>
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
            <IconButton
              title="Use my location"
              onClick={onGetUserLocationClicked}
            >
              <LocateIcon width={40} height={40} />
            </IconButton>
            {/* <IconButton title="Pick a location">
              <MapIcon width={40} height={40} />
            </IconButton> */}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            <span className="text-sm">Latitude:</span>
            {locationState === "loading" ? (
              <span className="text-sm">Loading...</span>
            ) : (
              <></>
            )}
            {locationState === "not-found" ? (
              <span className="text-sm">...</span>
            ) : (
              <></>
            )}
            {locationState === "found" ? (
              <span className="text-sm">{coordinates[0]}</span>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            <span className="text-sm">Longitude:</span>
            {locationState === "loading" ? (
              <span className="text-sm">Loading...</span>
            ) : (
              <></>
            )}
            {locationState === "not-found" ? (
              <span className="text-sm">...</span>
            ) : (
              <></>
            )}
            {locationState === "found" ? (
              <span className="text-sm">{coordinates[1]}</span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <TextButton
          disabled={selectedPlantType === null || locationState !== "found"}
          title="Add plant with current configuration"
          label="Add"
          onClick={onAddClicked}
        />
      </form>
    </div>
  );
}
