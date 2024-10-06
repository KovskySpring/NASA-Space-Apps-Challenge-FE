import PlantDashboard from "@/components/plants-dashboard/PlantDashboard";

export default function Home() {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-8 overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <PlantDashboard />
    </div>
  );
}
