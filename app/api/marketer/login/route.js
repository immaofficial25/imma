import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Marketer from "@/models/Marketer";
import {
  createMarketerSessionToken,
  setMarketerAuthCookie,
  verifyMarketerPassword,
} from "@/lib/marketer-auth";

export const runtime = "nodejs";

export async function POST(request) {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const marketerId = String(formData.get("marketerId") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!marketerId || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  await connectDB();
  const marketer = await Marketer.findOne({ marketerId, isActive: true }).select(
    "+passwordHash"
  );

  if (!marketer?.passwordHash) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await verifyMarketerPassword(password, marketer.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const { token, exp } = createMarketerSessionToken({ marketerId });
  const response = NextResponse.redirect(new URL("/marketer", url), 303);
  setMarketerAuthCookie(response, { token, exp });
  return response;
}
