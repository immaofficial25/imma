import { NextResponse } from "next/server";
import { clearMarketerAuthCookie } from "@/lib/marketer-auth";

export const runtime = "nodejs";

export async function POST(request) {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const response = NextResponse.redirect(new URL("/marketer/login", url), 303);
  clearMarketerAuthCookie(response);
  return response;
}
