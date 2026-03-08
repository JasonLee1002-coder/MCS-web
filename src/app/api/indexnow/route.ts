import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "94ce3922543309ce70f4a6d4a9f5cfea";
const HOST = "www.mcstation.ai";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body as { urls?: string[] };

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "A non-empty 'urls' array is required." },
        { status: 400 }
      );
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      return NextResponse.json({
        success: true,
        submitted: urls.length,
        status: response.status,
      });
    }

    const errorText = await response.text();
    return NextResponse.json(
      {
        success: false,
        status: response.status,
        error: errorText,
      },
      { status: response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
