import PlantDesc from "@/components/plant-desc/PlantDesc";

export default function Home({
  params: { slug },
}: Readonly<{
  params: { slug: string };
}>) {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-8 overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <PlantDesc plantType={slug} />
    </div>
  );
}
