import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog.model";
import ActivityLog from "@/models/ActivityLog.model";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query = status && status !== "all" ? { status } : {};
    const blogs = await Blog.find(query).sort({ updatedAt: -1 });

    return successResponse(blogs);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return errorResponse(message, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newBlog = await Blog.create(body);

    await ActivityLog.create({
      title: newBlog.status === "published" ? "Published New Blog" : "Saved Blog Draft",
      description: newBlog.title,
      category: "blog",
    });

    return successResponse(newBlog, "Article created", 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return errorResponse(message, 500);
  }
}