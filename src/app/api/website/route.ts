import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Website from "@/models/Website.model";
import ActivityLog from "@/models/ActivityLog.model";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await Website.findOne();
    return successResponse(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return errorResponse(message, 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const updated = await Website.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });

    await ActivityLog.create({
      title: "Website Content Updated",
      description: "Profile, skills or portfolio sections modified",
      category: "website",
    });

    return successResponse(updated, "Website updated successfully");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return errorResponse(message, 500);
  }
}