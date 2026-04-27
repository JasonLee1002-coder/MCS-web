import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * GET /reports/cpos-0427
 * Serves the CPOS test report HTML — internal use only, not indexed.
 */
export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "reports",
    "cpos-test-0427.html",
  );
  const html = fs.readFileSync(filePath, "utf-8");
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}
