import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog.model";
import { successResponse, errorResponse } from "@/lib/api-response";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: IParams) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const blog = await Blog.findById(id);
    if (!blog) return errorResponse("Blog not found", 404);
    return successResponse(blog);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return errorResponse(message, 500);
  }
}

export async function PATCH(req: NextRequest, { params }: IParams) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await req.json();

    const updated = await Blog.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return errorResponse("Blog not found", 404);

    return successResponse(updated, "Article updated");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return errorResponse(message, 500);
  }
}

export async function DELETE(_req: NextRequest, { params }: IParams) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) return errorResponse("Blog not found", 404);

    return successResponse(null, "Article deleted");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return errorResponse(message, 500);
  }
}