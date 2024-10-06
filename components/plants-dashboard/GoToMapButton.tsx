"use client";

import { useRouter } from "next/navigation";
import TextButton from "../buttons/TextButton";
import { useCallback } from "react";

export default function GoToMapButton() {
  const router = useRouter();
  const onClick = useCallback(() => router.push("/add"), [router]);
  return <TextButton label="Go to Map" onClick={onClick} />;
}
