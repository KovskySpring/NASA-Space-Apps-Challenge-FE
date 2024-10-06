"use client";

import { useRouter } from "next/navigation";
import TextButton from "../buttons/TextButton";
import { useCallback } from "react";

export default function AddPlantButton() {
  const router = useRouter();
  const onClick = useCallback(() => router.push("/add"), [router]);
  return <TextButton label="Add Plant" onClick={onClick} />;
}
