import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_HYDRO1_GES_DISC_API}/timeseries.cgi`,
  );

  const searchParams = request.nextUrl.searchParams;

  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url.toString());
    return response;
  } catch (error) {
    console.error(error);
    return new Response("Not Found", { status: 404 });
  }
}
