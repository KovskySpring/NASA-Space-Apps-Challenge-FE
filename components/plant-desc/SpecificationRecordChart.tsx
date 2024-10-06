import {
  PLANT_SPECIFICATION_LABELS,
  type PlantSpecificationsRecordHistory,
  type PlantSpecificationsRecordKeys,
} from "@/constants/Plants";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

// fallback timeseries data from 5 days in the past to now. each with value 0 -> 1
const defaultData = {
  labels: Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString(undefined, { dateStyle: "short" });
  }),
  datasets: [
    {
      label: "Placeholder/mock data",
      data: Array.from({ length: 10 }, () => Math.random()),
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const CHART_TITLE = "Sensor Data";

const CHART_OPTIONS: ChartOptions<"line"> = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  responsive: true,
  aspectRatio: 16 / 9,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: CHART_TITLE,
    },
  },
};

export default function SpecificationRecordChart({
  recordLabel,
  data,
}: Readonly<{
  recordLabel: PlantSpecificationsRecordKeys;
  data?: PlantSpecificationsRecordHistory;
}>) {
  const chartData = useMemo(() => {
    if (!data) {
      return defaultData;
    }
    return {
      labels: data.labels,
      datasets: [
        {
          label: PLANT_SPECIFICATION_LABELS[recordLabel],
          data: data.dataset,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  }, [data, recordLabel]);

  return <Line data={chartData} options={CHART_OPTIONS} />;
}
