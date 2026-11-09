import { NextRequest } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return errorResponse("No file provided", 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const isPdf = file.type === "application/pdf";

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio_cms",
          resource_type: isPdf ? "raw" : "auto",
        },
        (error, result) => {
          if (error || !result) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return successResponse(
      { url: uploadResult.secure_url, originalName: file.name },
      "File uploaded successfully"
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return errorResponse(message, 500);
  }
}