import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/admin";
import { hashMarketerPassword } from "@/lib/marketer-auth";
import Marketer from "@/models/Marketer";

export const runtime = "nodejs";

export async function POST(request) {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const marketerId = String(formData.get("marketerId") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
  const isActiveRaw = String(formData.get("isActive") ?? "").trim();
  const isActive = isActiveRaw ? isActiveRaw === "true" : true;

  if (!marketerId) {
    return NextResponse.json({ error: "Missing marketerId" }, { status: 400 });
  }

  if (!password || password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  await connectDB();

  try {
    const passwordHash = await hashMarketerPassword(password);
    await Marketer.create({
      marketerId,
      passwordHash,
      name: name || undefined,
      email: email || undefined,
      phoneNumber: phoneNumber || undefined,
      isActive,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create marketer";
    if (err && typeof err === "object" && "code" in err && err.code === 11000) {
      return NextResponse.json({ error: "Marketer ID already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const referer = request.headers.get("referer");
  const redirectUrl = new URL(referer ?? "/admin", url);
  return NextResponse.redirect(redirectUrl, 303);
}
