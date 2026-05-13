import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export async function GET(request, context) {
  return handler(request, context);
}

export async function POST(request, context) {
  return handler(request, context);
}
