import mongoose, { Schema, Document } from "mongoose";
import { IWebsiteCMSData } from "@/types/PagesTypes";

export interface IWebsiteDocument extends IWebsiteCMSData, Document {
  createdAt: Date;
  updatedAt: Date;
}

const websiteSchema = new Schema<IWebsiteDocument>(
  {
    profile: {
      fullName: { type: String, default: "" },
      roleTitle: { type: String, default: "" },
      avatarUrl: { type: String, default: "" },
      resumeUrl: { type: String, default: "" },
      resumeFileName: { type: String, default: "" },
      bioParagraphOne: { type: String, default: "" },
      bioParagraphTwo: { type: String, default: "" },
      stats: [
        {
          id: String,
          value: String,
          label: String,
        },
      ],
    },
    skills: [
      {
        id: String,
        name: String,
        iconUrl: String,
        category: String,
      },
    ],
    education: [
      {
        id: String,
        degree: String,
        institution: String,
        duration: String,
        description: String,
      },
    ],
    certifications: [
      {
        id: String,
        title: String,
        issuer: String,
        imageUrl: String,
        credentialUrl: String,
      },
    ],
    experiences: [
      {
        id: String,
        role: String,
        company: String,
        duration: String,
        description: String,
        technologies: [String],
      },
    ],
    projects: [
      {
        id: String,
        title: String,
        description: String,
        imageUrl: String,
        liveUrl: String,
        githubUrl: String,
        technologies: [String],
      },
    ],
    socials: {
      email: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      telegram: { type: String, default: "" },
      discord: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Website =
  mongoose.models.Website ||
  mongoose.model<IWebsiteDocument>("Website", websiteSchema);

export default Website;