import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return errorResponse("Unauthorized", 401);

  const payload = await verifyToken(token);
  if (!payload) return errorResponse("Invalid or expired session", 401);

  return successResponse(payload, "Authenticated");
}