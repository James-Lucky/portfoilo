import { NextResponse } from "next/server";
import { BYPASS_TOKEN } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Bypass authentication successful",
  });

  response.cookies.set({
    name: "admin_token",
    value: BYPASS_TOKEN,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: "/",
  });

  return response;
}

