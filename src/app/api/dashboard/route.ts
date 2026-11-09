import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog.model";
import ActivityLog from "@/models/ActivityLog.model";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await connectToDatabase();

    const [publishedCount, draftsCount, totalInquiries] =
      await Promise.all([
        Blog.countDocuments({ status: "published" }),
        Blog.countDocuments({ status: "draft" }),
        ActivityLog.find().sort({ createdAt: -1 }).limit(5),
      ]);

    const metrics = [
      {
        id: "views",
        label: "Total Portfolio Views",
        value: "24,890",
        change: "+14.2%",
        isPositive: true,
        helperText: "Live aggregate counter",
      },
      {
        id: "blogs",
        label: "Published Articles",
        value: publishedCount.toString(),
        change: `+${publishedCount} live`,
        isPositive: true,
        helperText: `${draftsCount} drafts pending`,
      },

      {
        id: "bounce",
        label: "Avg. Engagement Time",
        value: "2m 45s",
        change: "+5.1%",
        isPositive: true,
        helperText: "Across all portfolio pages",
      },
    ];

    return successResponse({ metrics });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return errorResponse(message, 500);
  }
}