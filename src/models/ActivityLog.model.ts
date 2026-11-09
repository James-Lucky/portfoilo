import mongoose, { Schema, Document } from "mongoose";
import { TUpdateCategory } from "@/types/PagesTypes";

export interface IActivityLogDocument extends Document {
  title: string;
  description: string;
  category: TUpdateCategory;
  createdAt: Date;
}

const activityLogSchema = new Schema<IActivityLogDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["blog", "website", "inquiry"],
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const ActivityLog =
  mongoose.models.ActivityLog ||
  mongoose.model<IActivityLogDocument>("ActivityLog", activityLogSchema);

export default ActivityLog;