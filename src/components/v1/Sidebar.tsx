"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaDiscord,
  FaBehance,
  FaTelegramPlane,
} from "react-icons/fa";
import { TbBrandLeetcode, TbBrandLinktree } from "react-icons/tb";
import { FaSquareXTwitter } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const [active, setActive] = useState("about");

  const links = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "certification", label: "Certifications" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
  ];

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el) => el !== null);

    const checkActiveSection = () => {
      const scrollY = window.scrollY;
      const offset = 100;

      let currentSectionId = active;

      for (const section of sections) {
        const top = section.offsetTop - offset;
        const bottom = section.offsetTop + section.offsetHeight - offset;

        if (scrollY >= top && scrollY < bottom) {
          currentSectionId = section.id;
          break;
        }
      }

      if (currentSectionId !== active) {
        setActive(currentSectionId);
      }
    };

    window.addEventListener("scroll", checkActiveSection);

    checkActiveSection();

    return () => window.removeEventListener("scroll", checkActiveSection);
  }, [active, links]);

  const handleClick = (id: string) => {
    setActive(id);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="lg:max-w-md lg:p-10 lg:ml-12 lg:fixed lg:h-screen text-white lg:w-1/3 p-6 relative z-30 flex flex-col items-center lg:items-start text-center lg:text-left bar mt-12">
      <div className="lg:sticky lg:top-10 w-full flex flex-col items-center lg:items-start">
        <div className="relative flex items-center justify-center mb-8 lg:mb-12 mt-4 w-32 h-32 lg:w-40 lg:h-40">
          <Link href={"/"} className="z-10 w-full h-full">
            <Image
              className="rounded-full w-full h-full object-cover border-[3px] border-blue-400/30 shadow-[0_0_20px_rgba(96,165,250,0.2)] transition-all duration-300 hover:border-blue-400/60"
              src="/Profile.webp"
              alt="Profile"
              width={160}
              height={160}
            />
          </Link>

          {/* Rotating SVG Text around image */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[118%] h-[118%] pointer-events-none opacity-80"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <defs>
                <path
                  id="circlePath"
                  d="M50,50 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0"
                />
              </defs>

              <text
                fontSize="6.5"
                fontWeight="500"
                fill="#93c5fd"
                className="uppercase tracking-widest"
              >
                <textPath
                  href="#circlePath"
                  startOffset="0%"
                  textLength="301.5"
                >
                  {"Developer • Engineer • Designer • Developer • Engineer • Designer • "}
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>
        <nav className="mt-6 lg:mt-8 space-y-2 text-l font-semibold tracking-wide flex flex-col items-center lg:items-start">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(link.id);
              }}
              className={`nav-link ${active === link.id ? "active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 lg:mt-10 flex flex-wrap justify-center lg:justify-start space-x-4">
          <a
            href="https://www.linkedin.com/in/lucky-developer/"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/James-Lucky"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://leetcode.com/u/LuckyBucky007/"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TbBrandLeetcode />
          </a>
          <a
            href="https://www.behance.net/lakkiali1"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaBehance />
          </a>
          <a
            href="https://discord.gg/eERs5fcA"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord />
          </a>
        </div>

        <div className="mt-4 flex flex-wrap justify-center lg:justify-start space-x-4">
          <a
            href="https://www.instagram.com/iam_luckya/"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-2xl"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-2xl"
          >
            <FaYoutube />
          </a>
          <a
            href="https://t.me/LuckyA008"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-2xl"
          >
            <FaTwitter />
          </a>
          <a
            href="https://x.com/Lucky8603249624"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-200 text-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSquareXTwitter />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
