"use client";

import React, { useState, useEffect } from "react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* ---------------- PROJECT DATA ---------------- */

const projects = [
  /* UI AND UX */
  {
    image: "/portfolio.png",
    title: "My Portfolio",
    description:
      "A personal website built with Next.js and Tailwind CSS to showcase my skills, projects, and certifications.",
    tags: ["Next JS", "Tailwind CSS"],
    link: "https://www.behance.net/gallery/250094761/Portfolio",
    category: "uiux",
    date: "2026-03",
  },

  /* PERSONAL */

  {
    image: "/mindscript.png",
    title: "MindScript",
    description:
      "AI powered text generation platform with real-time responses and user session management.",
    tags: ["Next JS", "Node", "MongoDB", "Tailwind", "AI"],
    link: "https://github.com/jameslucky007/Mind-Script",
    category: "personal",
    date: "2025-01",
  },

  {
    image: "/email-spam.png",
    title: "Email Spam Classification",
    description:
      "ML based spam detection system with real-time classification.",
    tags: ["Next JS", "Python", "Flask", "ML"],
    link: "https://email-spam-frontend.vercel.app/",
    category: "personal",
    date: "2024-01",
  },

  /* CLIENT / FREELANCE */

  {
    image: "/redsecureme.png",
    title: "RedSecureMe",
    description:
      "Cybersecurity business website built for client brand positioning.",
    tags: ["Next Js", "Tailwind"],
    link: "https://redsecureme.com/",
    category: "freelance",
    date: "2023-08",
  },

  {
    image: "/alyasmin.png",
    title: "Alyasmin Beauty Salon",
    description:
      "Responsive salon website focused on service presentation and booking UX.",
    tags: ["wordpress"],
    link: "https://alyasminbeautysalon.com/",
    category: "freelance",
    date: "2024-09",
  },

  {
    image: "/revosha.png",
    title: "Revosha",
    description:
      "Modern brand website with clean layout and responsive structure.",
    tags: ["Next Js", "Tailwind", "Node JS", "MongoDB"],
    link: "https://www.revosha.com/",
    category: "freelance",
    date: "2025-06",
  },

  {
    image: "/kwiq24.png",
    title: "Kwiq 24",
    description:
      "Sleek website for a local business, emphasizing user-friendly design.",
    tags: ["Next Js", "Tailwind", "Email JS", "prisma"],
    link: "https://kwiq24.in/",
    category: "freelance",
    date: "2026-05",
  },

  {
    image: "/trustdentlogo.png",
    title: "Trust Dent",
    description:
      "A digital dental care platform connecting patients, dentists and dental labs with appointments, digital reports, treatment information and patient management tools.",
    tags: ["Next Js", "Tailwind", "Node", "Express", "React"],
    link: "https://trustdents.com/",
    category: "freelance",
    date: "2026-09",
  },
];

/* ---------------- CATEGORIES ---------------- */

const categories = [
  { label: "Personal Project", value: "personal" },
  { label: "UI/UX", value: "uiux" },
  { label: "Websites", value: "freelance" },
  { label: "Applications", value: "apps" },
  { label: "AI", value: "ai" },
  { label: "Others", value: "others" },
];

const ITEMS_PER_PAGE = 3;

const Project = () => {
  const [activeCategory, setActiveCategory] = useState("personal");
  const [currentPage, setCurrentPage] = useState(0);

  /* SORT RECENT PROJECTS FIRST */

  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredProjects = sortedProjects.filter(
    (proj) => proj.category === activeCategory
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;

  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* Reset page when category changes */

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(0);
  }, [activeCategory]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="py-12 px-4" id="projects">
      <div className="max-w-5xl mx-auto">
        {/* ---------- Heading ---------- */}

        <h2 className="text-2xl sm:text-3xl font-bold text-blue-300 mb-6">
          Projects
        </h2>

        {/* ---------- Filter Buttons ---------- */}

        <div className="flex flex-wrap gap-4 mb-10">
          {categories.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setActiveCategory(btn.value)}
              className={`px-4 py-2 rounded-full text-sm border transition-all duration-300
              ${
                activeCategory === btn.value
                  ? "bg-blue-500/20 text-blue-300 border-blue-400"
                  : "bg-[#151a23] text-gray-400 border-[#263141] hover:text-white hover:border-blue-400"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* ---------- Project Cards ---------- */}

        <div className="space-y-8">
          {currentProjects.map((proj, idx) => (
            <a
              key={idx}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col md:flex-row items-start rounded-xl 
              bg-[#222b3a] hover:bg-[#263141]
              transition-all duration-300 p-6 shadow-xl hover:scale-[1.02]"
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="w-57.5 h-30 object-cover rounded-md 
                mb-4 md:mb-0 md:mr-8 border border-[#2e3a50]"
                style={{ aspectRatio: "16/9" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xl font-semibold text-blue-300">
                    {proj.title}
                  </div>

                  <span className="text-xs text-gray-400">
                    {proj.date}
                  </span>
                </div>

                <p className="text-[#d0d7de] mb-3 leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#151a23] text-blue-300 px-2 py-1 rounded text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ---------- Pagination ---------- */}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-10">
            {/* Left Arrow */}

            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-blue-400 disabled:opacity-30"
            >
              <FiChevronLeft size={24} />
            </button>

            {/* Dots */}

            <div className="flex gap-3">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300
                    ${
                      currentPage === index
                        ? "bg-blue-400 scale-125"
                        : "bg-gray-500"
                    }`}
                />
              ))}
            </div>

            {/* Right Arrow */}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="text-blue-400 disabled:opacity-30"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* ---------- Contact ---------- */}

      <div className="max-w-5xl mx-auto mt-14">
        <a
          href="mailto:luckya.developer@gmail.com"
          className="group flex items-center justify-between 
          bg-[#222b3a] hover:bg-[#263141]
          transition-all duration-300 p-8 rounded-xl"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
              Connect Me
            </h2>

            <p className="text-slate-400 text-sm sm:text-base mt-1">
              luckya.developer@gmail.com
            </p>
          </div>

          <FiArrowUpRight
            className="text-blue-400 text-2xl 
            transform transition-transform duration-300
            group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </div>
    </section>
  );
};

export default Project;