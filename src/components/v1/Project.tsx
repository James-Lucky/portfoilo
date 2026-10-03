"use client";

import React, { useState } from "react";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* ---------------- PROJECT DATA ---------------- */

const projects = [
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

  {
    image: "/redsecureme.png",
    title: "RedSecureMe",
    description:
      "Cybersecurity business website built for client brand positioning.",
    tags: ["Next Js", "Tailwind"],
    link: "https://redsecureme.com/",
    category: "client",
    date: "2023-08",
  },

  {
    image: "/alyasmin.png",
    title: "Alyasmin Beauty Salon",
    description:
      "Responsive salon website focused on service presentation and booking UX.",
    tags: ["wordpress"],
    link: "https://alyasminbeautysalon.com/",
    category: "client",
    date: "2024-09",
  },

  {
    image: "/revosha.png",
    title: "Revosha",
    description:
      "Modern brand website with clean layout and responsive structure.",
    tags: ["Next Js", "Tailwind", "Node JS", "MongoDB"],
    link: "https://www.revosha.com/",
    category: "client",
    date: "2025-06",
  },

  {
    image: "/kwiq24.png",
    title: "Kwiq 24",
    description:
      "Sleek website for a local business, emphasizing user-friendly design.",
    tags: ["Next Js", "Tailwind", "Email JS", "prisma"],
    link: "https://kwiq24.in/",
    category: "client",
    date: "2026-05",
  },

  {
    image: "/trustdent-banner.png",
    title: "Trust Dent",
    description:
      "A digital dental care platform connecting patients, dentists and dental labs with appointments, digital reports, treatment information and patient management tools.",
    tags: ["Next Js", "Tailwind", "Node", "Express", "React"],
    link: "https://trustdents.com/",
    category: "client",
    date: "2026-08",
  },

    {
    image: "/embidly.png",
    title: "Embidly",
    description:
      "floating AI ChatBot for any website or web app. Powered by Mistral AI, Google Gemini, or OpenAI.",
    tags: ["React", "Tailwind", "Node", "Express",],
    link: "https://www.npmjs.com/package/embidly",
    category: "Personal",
    date: "2026-09",
  },
];

/* ---------------- PROJECT COMPONENT ---------------- */

const ITEMS_PER_PAGE = 4;

const Project = () => {
  const [currentPage, setCurrentPage] = useState(0);

  /* SORT PROJECTS - NEWEST FIRST */

  const sortedProjects = [...projects].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  /* PAGINATION */

  const totalPages = Math.ceil(
    sortedProjects.length / ITEMS_PER_PAGE
  );

  const startIndex = currentPage * ITEMS_PER_PAGE;

  const currentProjects = sortedProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* NEXT PAGE */

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  /* PREVIOUS PAGE */

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section className="py-12 px-4" id="projects">
      <div className="max-w-5xl mx-auto">

        {/* ---------- Heading ---------- */}

        <h2 className="text-2xl sm:text-3xl font-bold text-blue-300 mb-10">
          Projects
        </h2>

        {/* ---------- Project Cards ---------- */}

        <div className="space-y-8">
          {currentProjects.map((proj) => (
            <a
              key={proj.title}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col md:flex-row items-start rounded-xl
              bg-[#222b3a] hover:bg-[#263141]
              transition-all duration-300 p-6 shadow-xl hover:scale-[1.02]"
            >
              {/* ---------- Project Image ---------- */}

              <img
                src={proj.image}
                alt={proj.title}
                className="w-[230px] h-[130px] object-cover rounded-md
                mb-4 md:mb-0 md:mr-8 border border-[#2e3a50]"
                style={{ aspectRatio: "16/9" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* ---------- Project Information ---------- */}

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

                {/* ---------- Technologies ---------- */}

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

            {/* Previous */}

            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              aria-label="Previous page"
              className="text-blue-400 disabled:opacity-30 transition-opacity"
            >
              <FiChevronLeft size={24} />
            </button>

            {/* Page Dots */}

            <div className="flex gap-3">
              {Array.from({ length: totalPages }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    aria-label={`Go to page ${index + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300
                      ${
                        currentPage === index
                          ? "bg-blue-400 scale-125"
                          : "bg-gray-500"
                      }`}
                  />
                )
              )}
            </div>

            {/* Next */}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              aria-label="Next page"
              className="text-blue-400 disabled:opacity-30 transition-opacity"
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