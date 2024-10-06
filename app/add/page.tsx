import AddPlantForm from "@/components/add-plant-form/AddPlantForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-8 overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <Image
        className=""
        src="/plant-placeholder.svg"
        alt="App logo"
        width={180}
        height={180}
        priority
      />
      <main className="flex flex-col gap-2">
        <AddPlantForm />
      </main>
    </div>
  );
}
