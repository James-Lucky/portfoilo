// Dashboard Analytics & Updates
export type TAnalyticsRange = "7d" | "30d" | "6m";

export type TUpdateCategory = "blog" | "website" | "inquiry";

export type TInquiryStatus = "new" | "replied" | "archived";

export interface IDashboardMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  helperText: string;
}

export interface IChartDataPoint {
  label: string;
  views: number;
  visitors: number;
}

export interface IRecentUpdateItem {
  id: string;
  title: string;
  description: string;
  category: TUpdateCategory;
  timestamp: string;
}

export interface IRecentInquiryItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  date: string;
  status: TInquiryStatus;
}

// Website Content Management System (CMS)
export type TWebsiteTab =
  | "profile"
  | "skills"
  | "education"
  | "certifications"
  | "experience"
  | "projects"
  | "socials";

export interface IWebsiteStat {
  id: string;
  value: string;
  label: string;
}

export interface IWebsiteProfile {
  fullName: string;
  roleTitle: string;
  avatarUrl: string;
  resumeUrl: string;
  resumeFileName?: string;
  bioParagraphOne: string;
  bioParagraphTwo: string;
  stats: IWebsiteStat[];
}

export interface IWebsiteSkill {
  id: string;
  name: string;
  iconUrl?: string;
  category: string;
}

export interface IWebsiteEducation {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

export interface IWebsiteCertification {
  id: string;
  title: string;
  issuer: string;
  imageUrl: string;
  credentialUrl: string;
}

export interface IWebsiteExperience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface IWebsiteProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
}

export interface IWebsiteSocials {
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  youtube: string;
  telegram: string;
  discord: string;
}

export interface IWebsiteCMSData {
  profile: IWebsiteProfile;
  skills: IWebsiteSkill[];
  education: IWebsiteEducation[];
  certifications: IWebsiteCertification[];
  experiences: IWebsiteExperience[];
  projects: IWebsiteProject[];
  socials: IWebsiteSocials;
}

// Blog Management
export type TBlogStatus = "draft" | "published";

export type TBlogFilter = "all" | TBlogStatus;

export type TBlogCategory =
  | "Technology"
  | "Development"
  | "Programming"
  | "AI & ML"
  | "Design"
  | "Business"
  | "Other";

export interface IBlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  category: TBlogCategory;
  featuredImage: string;
  content: string;
}

export interface IBlogPayload extends IBlogFormData {
  status: TBlogStatus;
}

export interface IBlogItem extends IBlogPayload {
  id: string;
  updatedAt: string;
}

