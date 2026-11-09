import mongoose, { Schema, Document } from "mongoose";
import { TBlogCategory, TBlogStatus } from "@/types/PagesTypes";

export interface IBlogDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  category: TBlogCategory;
  featuredImage: string;
  content: string;
  status: TBlogStatus;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlogDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, default: "" },
    category: {
      type: String,
      enum: [
        "Technology",
        "Development",
        "Programming",
        "AI & ML",
        "Design",
        "Business",
        "Other",
      ],
      default: "Technology",
    },
    featuredImage: { type: String, default: "" },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Blog =
  mongoose.models.Blog || mongoose.model<IBlogDocument>("Blog", blogSchema);

export default Blog;