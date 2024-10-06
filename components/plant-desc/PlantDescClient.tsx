"use client";

import {
  PLANT_SPECIFICATION_LABELS,
  type PlantSpecificationsRecordHistory,
  type PlantSpecificationsRecordKeys,
  type PlantType,
} from "@/constants/Plants";
import Image from "next/image";
import { CheckIcon } from "../icons/CheckIcon";
import { LeftArrowIcon } from "../icons/LeftArrowIcon";
import IconButton from "../buttons/IconButton";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import CustomButton from "../buttons/CustomButton";
import useMeasure from "react-use-measure";
import SimpleBox from "../box/SimpleBox";
import { AsteriskIcon } from "../icons/AsteriskIcon";
import { CancelIcon } from "../icons/CancelIcon";
import SpecificationRecordChart from "./SpecificationRecordChart";

const SPECIFICATION_LABEL_KEYS = Object.keys(PLANT_SPECIFICATION_LABELS);

async function getSpecificationRecordHistory(): Promise<PlantSpecificationsRecordHistory> {
  return {
    labels: Array.from({ length: 10 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + (i - 5));
      return date.toLocaleDateString(undefined, { dateStyle: "short" });
    }),
    dataset: Array.from({ length: 10 }, () => Math.random()),
  };
}

export default function PlantDescClient({
  plantType,
  suitabilityScore,
}: Readonly<{
  plantType: PlantType;
  suitabilityScore: number;
  // plantDesc: PlantSpecifications;
}>) {
  const scoreOutOf5 = useMemo(
    () => Math.fround(suitabilityScore * 5),
    [suitabilityScore],
  );

  return (
    <div className="flex h-full w-full flex-row items-stretch justify-stretch bg-white">
      <div className="flex h-full w-80 min-w-80 flex-col items-center justify-start gap-8 bg-gray-100 pt-20 shadow-inner">
        {/* placeholder square image */}
        <Image
          className="m-2"
          src="/plant-placeholder.svg"
          alt="Plant Image"
          width={80}
          height={80}
        />
        <div className="flex flex-col items-stretch gap-1">
          <div className="flex flex-row items-start justify-between gap-2">
            <span className="font-bold">Plant name</span>
            <span>{plantType}</span>
          </div>
          <div className="flex flex-row items-start justify-between gap-2">
            <span className="font-bold">Location</span>
            <span>{"<placeholder>"}</span>
          </div>
          <div className="flex flex-row items-start justify-between gap-2">
            <span className="font-bold">Time</span>
            <span>{"<placeholder>"}</span>
          </div>
          <div className="flex flex-row items-start justify-between gap-2">
            <span className="font-bold">Score</span>
            <span>{scoreOutOf5}/5</span>
          </div>
        </div>
        <QuickRecommendation suitabilityScore={suitabilityScore} />
      </div>
      <div className="flex h-full max-h-full flex-col overflow-y-auto p-2 pt-14">
        <div className="flex flex-row items-center gap-2">
          <IconButton title="Back" onClick={() => window.history.back()}>
            <LeftArrowIcon width={40} height={40} />
          </IconButton>
          <span className="font-bold">Back to search</span>
        </div>
        <PlantDescDetailedViews suitabilityScore={suitabilityScore} />
      </div>
    </div>
  );
}

function PlantDescDetailedViews({
  suitabilityScore,
}: Readonly<{
  suitabilityScore: number;
}>) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4">
        <PlantDescTab
          id={0}
          text="Overview"
          selected={selectedTab === 0}
          onSelect={setSelectedTab}
        />
        <PlantDescTab
          id={1}
          text="Analytic details"
          selected={selectedTab === 1}
          onSelect={setSelectedTab}
        />
      </div>
      <div className="relative p-2">
        <PlantDescContent
          className="flex flex-col gap-2 overflow-y-auto"
          selected={selectedTab === 0}
        >
          <OverviewContent suitabilityScore={suitabilityScore} />
        </PlantDescContent>
        <PlantDescContent
          className="flex max-h-full flex-col gap-2 overflow-y-auto"
          selected={selectedTab === 1}
        >
          <PlantAnalyticsDetail />
        </PlantDescContent>
      </div>
    </div>
  );
}

function PlantDescTab({
  id,
  text,
  selected,
  onSelect,
}: Readonly<{
  id: number;
  text: string;
  selected: boolean;
  onSelect: (id: number) => void;
}>) {
  const onClick = useCallback(() => onSelect(id), [id, onSelect]);

  return (
    <CustomButton onClick={onClick}>
      <span
        className={selected ? "font-bold underline underline-offset-2" : ""}
      >
        {text}
      </span>
    </CustomButton>
  );
}

function PlantDescContent({
  className,
  selected,
  children,
}: Readonly<{ className: string; selected: boolean; children: ReactNode }>) {
  if (!selected) return <></>;

  return <div className={className}>{children}</div>;
}

function OverviewContent({
  suitabilityScore,
}: Readonly<{
  suitabilityScore: number;
}>) {
  const [progressBarRef, bounds] = useMeasure();
  const progressWidth = useMemo(
    () => bounds.width * suitabilityScore,
    [bounds, suitabilityScore],
  );
  const scoreOutOf5 = useMemo(
    () => Math.fround(suitabilityScore * 5),
    [suitabilityScore],
  );

  return (
    <div className="flex flex-row flex-wrap gap-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-bold">Current situation</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg">Suitability: {"High"}</span>
          <div
            ref={progressBarRef}
            className="relative h-4 w-48 overflow-hidden rounded-sm border bg-gray-100 md:w-96"
          >
            <div
              className="relative left-0 top-0 h-full w-full rounded-sm bg-gray-400 transition-all"
              style={{ width: progressWidth }}
            />
          </div>
          <div className="flex flex-row gap-1">
            <span>Score: </span>
            <span className="font-bold">{scoreOutOf5}/5</span>
          </div>
          <div className="flex flex-row flex-wrap gap-8">
            <div className="flex flex-col gap-1">
              <span>Overall risks</span>
              <ul className="list-disc pl-4">
                <li>Lorem ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-1">
              <span>Overall benefits</span>
              <ul className="list-disc pl-4">
                <li>Lorem ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit.</li>
                <li>Lorem ipsum dolor sit.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold">
            Suggestion for optimal result
          </span>
          <ul className="list-disc pl-4">
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
            <li>Lorem ipsum dolor sit.</li>
          </ul>
        </div>
      </div>
      <SimpleBox>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-1">
            <AsteriskIcon width={20} height={20} />
            <span className="font-bold">Suitability (t)</span>
          </div>
          <ul className="list-disc pl-4">
            <li>{"Low: 0 <= t < 2"}</li>
            <li>{"Medium: 2 <= t < 3"}</li>
            <li>{"High: 3 <= t <= 5"}</li>
          </ul>
        </div>
      </SimpleBox>
    </div>
  );
}

function isRecommended(suitabilityScore: number) {
  return suitabilityScore >= 0.6;
}

function QuickRecommendation({
  suitabilityScore,
}: Readonly<{ suitabilityScore: number }>) {
  console.log(suitabilityScore);
  if (isRecommended(suitabilityScore)) {
    return (
      <div className="flex flex-col items-center gap-2">
        <CheckIcon width={60} height={60} />
        <span className="text-lg font-bold">Yes!</span>
        <span className="font-bold">Highly recommended</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <CancelIcon width={60} height={60} />
      <span className="text-lg font-bold">No</span>
      <span className="font-bold">Please reconsider</span>
    </div>
  );
}

function PlantAnalyticsDetail() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [chartData, setChartData] = useState<
    PlantSpecificationsRecordHistory | undefined
  >(undefined);
  const [isLoadingChartData, setIsLoadingChartData] = useState(true);

  useEffect(() => {
    setIsLoadingChartData(true);

    let ignored = false;
    getSpecificationRecordHistory()
      .then((data) => {
        if (ignored) return;
        setChartData(data);
      })
      .catch((error) => {
        if (ignored) return;
        console.error(error);
        setChartData(undefined);
      })
      .finally(() => {
        if (ignored) return;
        setIsLoadingChartData(false);
      });

    return () => {
      ignored = true;
    };
  }, [selectedTab]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          {SPECIFICATION_LABEL_KEYS.map((label, index) => (
            <PlantAnalyticsTab
              key={label}
              id={index}
              text={
                PLANT_SPECIFICATION_LABELS[
                  label as PlantSpecificationsRecordKeys
                ]
              }
              selected={selectedTab === index}
              onSelect={setSelectedTab}
            />
          ))}
        </div>
        <div className="h-96 w-full rounded-md bg-gray-200 p-2">
          {isLoadingChartData ? (
            <div className="flex h-full w-full items-center justify-center">
              <span>Retrieving data...</span>
            </div>
          ) : (
            <></>
          )}
          <SpecificationRecordChart
            data={chartData}
            recordLabel={
              SPECIFICATION_LABEL_KEYS[
                selectedTab
              ] as PlantSpecificationsRecordKeys
            }
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 md:flex-nowrap">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Risks</span>
          <ul className="list-disc pl-4">
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
              facilis nemo sint iste aliquid minus ut, perspiciatis ab repellat
              expedita?
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
              facilis nemo sint iste aliquid minus ut, perspiciatis ab repellat
              expedita?
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
              facilis nemo sint iste aliquid minus ut, perspiciatis ab repellat
              expedita?
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
              facilis nemo sint iste aliquid minus ut, perspiciatis ab repellat
              expedita?
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Benefits</span>
          <ul className="list-disc pl-4">
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
              facilis nemo sint iste aliquid minus ut, perspiciatis ab repellat
              expedita?
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
              facilis nemo sint iste aliquid minus ut, perspiciatis ab repellat
              expedita?
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
              facilis nemo sint iste aliquid minus ut, perspiciatis ab repellat
              expedita?
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
              facilis nemo sint iste aliquid minus ut, perspiciatis ab repellat
              expedita?
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function PlantAnalyticsTab({
  id,
  text,
  selected,
  onSelect,
}: Readonly<{
  id: number;
  text: string;
  selected: boolean;
  onSelect: (id: number) => void;
}>) {
  const onClick = useCallback(() => onSelect(id), [id, onSelect]);

  return (
    <CustomButton
      className={`flex items-center justify-center overflow-hidden rounded-md p-2 transition-all hover:drop-shadow-md focus:drop-shadow-md ${selected ? "bg-gray-500" : "bg-gray-200"}`}
      onClick={onClick}
    >
      <span className={selected ? "text-white" : ""}>{text}</span>
    </CustomButton>
  );
}
