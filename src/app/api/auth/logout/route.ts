import { NextRequest } from "next/server";
import { clearSessionRedirect } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  return clearSessionRedirect(new URL("/", request.url));
}

export async function POST(request: NextRequest) {
  return clearSessionRedirect(new URL("/", request.url));
}
