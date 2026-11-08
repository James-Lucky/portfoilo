"use client";

import { useState, ChangeEvent } from "react";
import {
  IWebsiteCertification,
  IWebsiteCMSData,
  IWebsiteEducation,
  IWebsiteExperience,
  IWebsiteProject,
  IWebsiteSkill,
  TWebsiteTab,
} from "@/types/PagesTypes";

const INITIAL_CMS_DATA: IWebsiteCMSData = {
  profile: {
    fullName: "Lakki Ali (Lucky)",
    roleTitle: "Software Developer & Freelance MERN Stack Developer",
    avatarUrl: "/avatar.jpg",
    resumeUrl: "/resume.pdf",
    resumeFileName: "Lakki_Ali_Resume.pdf",
    bioParagraphOne:
      "I'm a passionate Software Developer focused on creating accessible, pixel-perfect user interfaces through thoughtful design and robust engineering. Currently, I am a B.Tech AI & Data Science student and a freelance MERN Stack Developer dedicated to building exceptional digital experiences in UI/UX design and web app development.",
    bioParagraphTwo:
      "My skills include strong proficiency in Data Structures and Algorithms (C++) and full-stack development with MongoDB, Express, React, and Node.js. I thrive on transforming ideas into visually appealing and high-performance solutions.",
    stats: [
      { id: "st-1", value: "10+", label: "Projects Completed" },
      { id: "st-2", value: "2+", label: "Years Coding" },
      { id: "st-3", value: "5+", label: "Technologies Used" },
      { id: "st-4", value: "10+", label: "Satisfied Clients" },
    ],
  },
  skills: [
    { id: "sk-1", name: "HTML5", category: "Frontend" },
    { id: "sk-2", name: "CSS3", category: "Frontend" },
    { id: "sk-3", name: "JavaScript", category: "Frontend" },
    { id: "sk-4", name: "Tailwind CSS", category: "Frontend" },
    { id: "sk-5", name: "React", category: "Frontend" },
    { id: "sk-6", name: "TypeScript", category: "Language" },
    { id: "sk-7", name: "Next.js", category: "Frontend" },
    { id: "sk-8", name: "Node.js", category: "Backend" },
    { id: "sk-9", name: "Express", category: "Backend" },
    { id: "sk-10", name: "MongoDB", category: "Database" },
    { id: "sk-11", name: "Python", category: "Language" },
    { id: "sk-12", name: "C++", category: "Language" },
    { id: "sk-13", name: "Git", category: "Tools" },
    { id: "sk-14", name: "Android Studio", category: "Tools" },
    { id: "sk-15", name: "Firebase", category: "Backend" },
    { id: "sk-16", name: "Linux", category: "Tools" },
    { id: "sk-17", name: "Figma", category: "Design" },
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Tech in Artificial Intelligence & Data Science",
      institution: "Dr. Akhilesh Das Gupta Institute of Professional Studies (GGSIPU)",
      duration: "2023 - 2027",
      description:
        "Currently pursuing a Bachelor of Technology with a focus on Artificial Intelligence and Data Science, gaining in-depth knowledge in Machine Learning, Data Structures, and Full-Stack Web Development.",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      title: "WordPress",
      issuer: "Great Learning",
      imageUrl: "",
      credentialUrl: "https://example.com/cert-wordpress",
    },
    {
      id: "cert-2",
      title: "AWS Solutions Architecture",
      issuer: "Forage",
      imageUrl: "",
      credentialUrl: "https://example.com/cert-aws",
    },
    {
      id: "cert-3",
      title: "Robotics",
      issuer: "Robokwik",
      imageUrl: "",
      credentialUrl: "https://example.com/cert-robotics",
    },
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Freelancer",
      company: "Self-Employed",
      duration: "2024 - Present",
      description:
        "Created multiple custom websites for diverse clients, managing everything from initial UI/UX wireframes to full-stack deployment and SEO optimization.",
      technologies: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    },
    {
      id: "exp-2",
      role: "Software Developer Intern",
      company: "IGDTUW",
      duration: "Jun 2024 - Aug 2024",
      description:
        "Worked on frontend architecture and API integration, collaborating with cross-functional teams to deliver responsive web modules.",
      technologies: ["HTML & CSS", "JavaScript", "React.js", "Git"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Enbiitfy",
      description:
        "Building an AI tool & modern digital solutions platform powered by Next.js, Tailwind CSS, and OpenAI.",
      imageUrl: "",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      technologies: ["Next.js", "Tailwind CSS", "Node.js", "OpenAI"],
    },
    {
      id: "proj-2",
      title: "Trust Dent",
      description:
        "A modern dental clinic platform connecting patients with seamless online appointment booking and treatment tracking.",
      imageUrl: "",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      technologies: ["React", "Tailwind CSS", "Node.js", "Express"],
    },
    {
      id: "proj-3",
      title: "Kwik 24",
      description:
        "Fast-track web application with clean dashboard analytics and user management.",
      imageUrl: "",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "proj-4",
      title: "My Portfolio",
      description:
        "A personal developer portfolio showcasing skills, certifications, experience, and dark-themed interactive UI.",
      imageUrl: "",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    },
  ],
  socials: {
    email: "luckyali@example.com",
    linkedin: "https://linkedin.com/in/lakkiali",
    github: "https://github.com/lakkiali",
    twitter: "https://x.com/lakkiali",
    instagram: "https://instagram.com/lakkiali",
    youtube: "https://youtube.com/@lakkiali",
    telegram: "https://t.me/lakkiali",
    discord: "https://discord.com/users/lakkiali",
  },
};

const TABS: { key: TWebsiteTab; label: string }[] = [
  { key: "profile", label: "Profile & About" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "certifications", label: "Certifications" },
  { key: "experience", label: "Experience" },
  { key: "projects", label: "Projects" },
  { key: "socials", label: "Social & Contact" },
];

export default function WebsitePage() {
  const [cmsData, setCmsData] = useState<IWebsiteCMSData>(INITIAL_CMS_DATA);
  const [activeTab, setActiveTab] = useState<TWebsiteTab>("profile");
  const [isSaving, setIsSaving] = useState(false);

  // Local state for adding a new skill quickly
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("Frontend");

  // Profile & Bio handlers
  const handleProfileChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCmsData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [name]: value },
    }));
  };

  const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setCmsData((prev) => ({
      ...prev,
      profile: { ...prev.profile, avatarUrl: previewUrl },
    }));
  };

  const handleResumeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setCmsData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        resumeUrl: fileUrl,
        resumeFileName: file.name,
      },
    }));
  };

  const handleStatChange = (
    id: string,
    field: "value" | "label",
    val: string
  ) => {
    setCmsData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        stats: prev.profile.stats.map((st) =>
          st.id === id ? { ...st, [field]: val } : st
        ),
      },
    }));
  };

  // Skills handlers
  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const created: IWebsiteSkill = {
      id: `sk-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
    };
    setCmsData((prev) => ({
      ...prev,
      skills: [...prev.skills, created],
    }));
    setNewSkillName("");
  };

  const handleRemoveSkill = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  // Education handlers
  const handleAddEducation = () => {
    const newEdu: IWebsiteEducation = {
      id: `edu-${Date.now()}`,
      degree: "New Degree / Course",
      institution: "Institution Name",
      duration: "2024 - 2028",
      description: "",
    };
    setCmsData((prev) => ({
      ...prev,
      education: [newEdu, ...prev.education],
    }));
  };

  const handleUpdateEducation = (
    id: string,
    field: keyof IWebsiteEducation,
    value: string
  ) => {
    setCmsData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const handleDeleteEducation = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Certifications handlers
  const handleAddCertification = () => {
    const newCert: IWebsiteCertification = {
      id: `cert-${Date.now()}`,
      title: "New Certificate Title",
      issuer: "Issuing Organization",
      imageUrl: "",
      credentialUrl: "",
    };
    setCmsData((prev) => ({
      ...prev,
      certifications: [newCert, ...prev.certifications],
    }));
  };

  const handleUpdateCertification = (
    id: string,
    field: keyof IWebsiteCertification,
    value: string
  ) => {
    setCmsData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const handleDeleteCertification = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newExp: IWebsiteExperience = {
      id: `exp-${Date.now()}`,
      role: "Software Engineer",
      company: "Company Name",
      duration: "Jan 2026 - Present",
      description: "",
      technologies: ["React", "TypeScript"],
    };
    setCmsData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const handleUpdateExperience = (
    id: string,
    field: keyof IWebsiteExperience,
    value: string | string[]
  ) => {
    setCmsData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleDeleteExperience = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  // Projects handlers
  const handleAddProject = () => {
    const newProj: IWebsiteProject = {
      id: `proj-${Date.now()}`,
      title: "New Portfolio Project",
      description: "",
      imageUrl: "",
      liveUrl: "",
      githubUrl: "",
      technologies: ["Next.js", "Tailwind CSS"],
    };
    setCmsData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
  };

  const handleUpdateProject = (
    id: string,
    field: keyof IWebsiteProject,
    value: string | string[]
  ) => {
    setCmsData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const handleDeleteProject = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  // Socials handler
  const handleSocialChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCmsData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
  };

  // Save entire CMS payload
  const handleSaveWebsite = () => {
    setIsSaving(true);
    console.log("Updated Website CMS Payload:", cmsData);
    setTimeout(() => {
      setIsSaving(false);
      alert("Website changes saved! Connect your API to update live data.");
    }, 300);
  };

  return (
    <main className="min-h-screen w-full bg-[#f4f4f4] px-4 py-6 sm:px-6 md:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>


            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Website Management
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Manage your profile, resume, skills, projects, certifications and social links.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveWebsite}
            disabled={isSaving}
            className="self-start rounded-lg bg-[#262626] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:opacity-60 sm:self-auto"
          >
            {isSaving ? "Saving..." : "Save All Changes"}
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex overflow-x-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-2xs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 rounded-lg px-4 py-2 text-xs font-medium transition sm:text-sm ${
                activeTab === tab.key
                  ? "bg-[#262626] text-white shadow-2xs"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. PROFILE, AVATAR, RESUME & STATS TAB */}
        {activeTab === "profile" && (
          <section className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
              <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Hero & About Information
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Update your avatar, display name, bio paragraphs and PDF resume.
                </p>
              </div>

              <div className="space-y-6 p-5 sm:p-6">
                {/* Avatar & Resume Upload Row */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Profile Image Box */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Profile Picture
                    </label>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white text-xs font-semibold text-gray-500">
                        {cmsData.profile.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={cmsData.profile.avatarUrl}
                            alt="Avatar preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          "IMG"
                        )}
                      </div>

                      <div className="min-w-0 flex-1 space-y-2">
                        <input
                          type="url"
                          name="avatarUrl"
                          value={cmsData.profile.avatarUrl}
                          onChange={handleProfileChange}
                          placeholder="Paste image URL or upload file..."
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 outline-none focus:border-gray-700"
                        />

                        <label className="inline-block cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100">
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Resume Upload Box */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Resume (PDF / Drive Link)
                    </label>

                    <div className="space-y-2.5">
                      <input
                        type="url"
                        name="resumeUrl"
                        value={cmsData.profile.resumeUrl}
                        onChange={handleProfileChange}
                        placeholder="https://example.com/resume.pdf"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 outline-none focus:border-gray-700"
                      />

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label className="inline-block cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100">
                          Upload PDF Resume
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                            className="hidden"
                          />
                        </label>

                        {cmsData.profile.resumeFileName && (
                          <span className="truncate text-xs text-gray-500">
                            Active: {cmsData.profile.resumeFileName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name & Role Headline */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Full Display Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={cmsData.profile.fullName}
                      onChange={handleProfileChange}
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Role / Tagline
                    </label>
                    <input
                      type="text"
                      name="roleTitle"
                      value={cmsData.profile.roleTitle}
                      onChange={handleProfileChange}
                      className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-700"
                    />
                  </div>
                </div>

                {/* Bio Paragraphs */}
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      About Bio — Paragraph 1
                    </label>
                    <textarea
                      rows={3}
                      name="bioParagraphOne"
                      value={cmsData.profile.bioParagraphOne}
                      onChange={handleProfileChange}
                      className="w-full resize-y rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      About Bio — Paragraph 2
                    </label>
                    <textarea
                      rows={3}
                      name="bioParagraphTwo"
                      value={cmsData.profile.bioParagraphTwo}
                      onChange={handleProfileChange}
                      className="w-full resize-y rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Highlight Counters (10+ Projects, 2+ Years, etc.) */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
              <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Highlight Counters
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Numbers displayed under your About section (e.g., 10+ Projects Completed).
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
                {cmsData.profile.stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="space-y-2.5 rounded-xl border border-gray-200 bg-gray-50/60 p-4"
                  >
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Counter Value
                      </label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) =>
                          handleStatChange(stat.id, "value", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-base font-semibold text-gray-900 outline-none focus:border-gray-700"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Label
                      </label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) =>
                          handleStatChange(stat.id, "label", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-gray-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 2. SKILLS TAB */}
        {activeTab === "skills" && (
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
            <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                Technical Skills Grid ({cmsData.skills.length})
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Add or remove skills displayed in your portfolio skill cards.
              </p>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              {/* Add Skill Bar */}
              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Skill name (e.g., Docker, GraphQL, Redux)..."
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 outline-none focus:border-gray-700"
                />

                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-700 outline-none focus:border-gray-700"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Language">Language</option>
                  <option value="Tools">Tools</option>
                  <option value="Design">Design</option>
                </select>

                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="rounded-lg bg-[#262626] px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
                >
                  + Add Skill
                </button>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {cmsData.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs transition hover:border-gray-300"
                  >
                    <div>
                      <span className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                        {skill.category}
                      </span>
                      <p className="mt-2 truncate text-sm font-semibold text-gray-900">
                        {skill.name}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="mt-3 self-end text-xs font-medium text-red-500 transition hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3. EDUCATION TAB */}
        {activeTab === "education" && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-xs sm:px-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Education History
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Manage your academic degrees, institutions and timelines.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddEducation}
                className="rounded-lg bg-[#262626] px-4 py-2 text-xs font-medium text-white transition hover:bg-black sm:text-sm"
              >
                + Add Education
              </button>
            </div>

            {cmsData.education.map((edu) => (
              <div
                key={edu.id}
                className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-6"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">
                      Degree / Course
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        handleUpdateEducation(edu.id, "degree", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">
                      College / Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        handleUpdateEducation(
                          edu.id,
                          "institution",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">
                      Duration (e.g., 2023 - 2027)
                    </label>
                    <input
                      type="text"
                      value={edu.duration}
                      onChange={(e) =>
                        handleUpdateEducation(
                          edu.id,
                          "duration",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={edu.description}
                    onChange={(e) =>
                      handleUpdateEducation(
                        edu.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-700"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Delete Entry
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* 4. CERTIFICATIONS TAB */}
        {activeTab === "certifications" && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-xs sm:px-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Certifications ({cmsData.certifications.length})
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Manage certificate cards, preview images and verification links.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddCertification}
                className="rounded-lg bg-[#262626] px-4 py-2 text-xs font-medium text-white transition hover:bg-black sm:text-sm"
              >
                + Add Certificate
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cmsData.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col justify-between space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-xs"
                >
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">
                        Certificate Title
                      </label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) =>
                          handleUpdateCertification(
                            cert.id,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-700"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">
                        Issued By (e.g., AWS, Great Learning)
                      </label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) =>
                          handleUpdateCertification(
                            cert.id,
                            "issuer",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-700"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">
                        Certificate Image URL
                      </label>
                      <input
                        type="url"
                        value={cert.imageUrl}
                        onChange={(e) =>
                          handleUpdateCertification(
                            cert.id,
                            "imageUrl",
                            e.target.value
                          )
                        }
                        placeholder="https://example.com/cert.jpg"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 outline-none focus:border-gray-700"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">
                        Credential / View Link
                      </label>
                      <input
                        type="url"
                        value={cert.credentialUrl}
                        onChange={(e) =>
                          handleUpdateCertification(
                            cert.id,
                            "credentialUrl",
                            e.target.value
                          )
                        }
                        placeholder="https://..."
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 outline-none focus:border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-gray-100 pt-3">
                    <button
                      type="button"
                      onClick={() => handleDeleteCertification(cert.id)}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. EXPERIENCE TAB */}
        {activeTab === "experience" && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-xs sm:px-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Work Experience ({cmsData.experiences.length})
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Add or edit your internships, freelance work and tech tags.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddExperience}
                className="rounded-lg bg-[#262626] px-4 py-2 text-xs font-medium text-white transition hover:bg-black sm:text-sm"
              >
                + Add Experience
              </button>
            </div>

            {cmsData.experiences.map((exp) => (
              <div
                key={exp.id}
                className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-6"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">
                      Role / Position
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) =>
                        handleUpdateExperience(exp.id, "role", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        handleUpdateExperience(
                          exp.id,
                          "company",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700">
                      Timeline (e.g., 2024 - Present)
                    </label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) =>
                        handleUpdateExperience(
                          exp.id,
                          "duration",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">
                    Responsibilities & Achievements
                  </label>
                  <textarea
                    rows={3}
                    value={exp.description}
                    onChange={(e) =>
                      handleUpdateExperience(
                        exp.id,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-700"
                  />
                </div>

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-semibold text-gray-700">
                      Technologies Used (comma separated)
                    </label>
                    <input
                      type="text"
                      value={exp.technologies.join(", ")}
                      onChange={(e) =>
                        handleUpdateExperience(
                          exp.id,
                          "technologies",
                          e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean)
                        )
                      }
                      placeholder="React, Next.js, Tailwind CSS"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 outline-none focus:border-gray-700"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="self-end rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Delete Experience
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* 6. PROJECTS TAB */}
        {activeTab === "projects" && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-xs sm:px-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Featured Projects ({cmsData.projects.length})
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Manage your portfolio projects (Enbiitfy, Trust Dent, Kwik 24, etc.).
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddProject}
                className="rounded-lg bg-[#262626] px-4 py-2 text-xs font-medium text-white transition hover:bg-black sm:text-sm"
              >
                + Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {cmsData.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex flex-col justify-between space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-xs sm:p-6"
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-700">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) =>
                            handleUpdateProject(
                              proj.id,
                              "title",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 outline-none focus:border-gray-700"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-700">
                          Thumbnail Image URL
                        </label>
                        <input
                          type="url"
                          value={proj.imageUrl}
                          onChange={(e) =>
                            handleUpdateProject(
                              proj.id,
                              "imageUrl",
                              e.target.value
                            )
                          }
                          placeholder="https://example.com/project.png"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 outline-none focus:border-gray-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) =>
                          handleUpdateProject(
                            proj.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-700"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-700">
                          Live Demo URL
                        </label>
                        <input
                          type="url"
                          value={proj.liveUrl}
                          onChange={(e) =>
                            handleUpdateProject(
                              proj.id,
                              "liveUrl",
                              e.target.value
                            )
                          }
                          placeholder="https://..."
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 outline-none focus:border-gray-700"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-semibold text-gray-700">
                          GitHub Repo URL
                        </label>
                        <input
                          type="url"
                          value={proj.githubUrl || ""}
                          onChange={(e) =>
                            handleUpdateProject(
                              proj.id,
                              "githubUrl",
                              e.target.value
                            )
                          }
                          placeholder="https://github.com/..."
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 outline-none focus:border-gray-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-700">
                        Tech Stack Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={proj.technologies.join(", ")}
                        onChange={(e) =>
                          handleUpdateProject(
                            proj.id,
                            "technologies",
                            e.target.value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean)
                          )
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 outline-none focus:border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-gray-100 pt-3">
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(proj.id)}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
                    >
                      Delete Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. SOCIAL LINKS & CONTACT TAB */}
        {activeTab === "socials" && (
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
            <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                Social Media & Contact Links
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Manage the social icons in your sidebar and the &ldquo;Connect Me&rdquo; footer email.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Contact Email (&ldquo;Connect Me&rdquo; section)
                </label>
                <input
                  type="email"
                  name="email"
                  value={cmsData.socials.email}
                  onChange={handleSocialChange}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-700"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={cmsData.socials.linkedin}
                  onChange={handleSocialChange}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-700"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="github"
                  value={cmsData.socials.github}
                  onChange={handleSocialChange}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-700"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  X (Twitter) URL
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={cmsData.socials.twitter}
                  onChange={handleSocialChange}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-700"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Instagram URL
                </label>
                <input
                  type="url"
                  name="instagram"
                  value={cmsData.socials.instagram}
                  onChange={handleSocialChange}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-700"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  name="youtube"
                  value={cmsData.socials.youtube}
                  onChange={handleSocialChange}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-700"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Telegram URL
                </label>
                <input
                  type="url"
                  name="telegram"
                  value={cmsData.socials.telegram}
                  onChange={handleSocialChange}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-700"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Discord URL
                </label>
                <input
                  type="url"
                  name="discord"
                  value={cmsData.socials.discord}
                  onChange={handleSocialChange}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-700"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}