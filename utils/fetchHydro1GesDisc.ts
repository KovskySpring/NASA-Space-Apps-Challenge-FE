export default async function fetchHydro1GesDisc(config: {
  projectName: string;
  productName: string;
  variableShortName: string;
  location: Readonly<[number, number]>;
}) {
  const { projectName, productName, variableShortName } = config;
  const variable = `${projectName}:${productName}:${variableShortName}`;
  const location = `GEOM:POINT(${config.location[0]}, ${config.location[1]})`;

  const last10Year = new Date();
  last10Year.setFullYear(last10Year.getFullYear() - 10);

  const currentTime = new Date();

  const startDate = last10Year.toISOString().split(".")[0];
  const endDate = currentTime.toISOString().split(".")[0];
  const type = "asc2";

  const url = new URL(`${process.env.NEXT_PUBLIC_HOST}/api/gesdisc-proxy`);
  url.searchParams.append("variable", variable);
  url.searchParams.append("location", location);
  url.searchParams.append("startDate", startDate);
  url.searchParams.append("endDate", endDate);
  url.searchParams.append("type", type);

  const res = await fetch(url.toString());
  const data = await res.text();
  const lastLine = data.split("\n").pop();
  const lastValue = lastLine?.split(" ")[1];

  try {
    const value = parseFloat(lastValue ?? "");
    if (isNaN(value)) {
      throw new Error("Invalid value");
    }
    return value;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
