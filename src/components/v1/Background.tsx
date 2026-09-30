"use client";

import React, { useEffect, useRef } from "react";

const Background = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetCoords = useRef({ x: 0, y: 0 });
  const currentCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    targetCoords.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    currentCoords.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetCoords.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const updatePosition = () => {
      const speed = 0.08;

      const dx = targetCoords.current.x - currentCoords.current.x;
      const dy = targetCoords.current.y - currentCoords.current.y;

      currentCoords.current.x += dx * speed;
      currentCoords.current.y += dy * speed;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(
          ${currentCoords.current.x - 300}px,
          ${currentCoords.current.y - 300}px,
          0
        )`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#090d16]">
      <div className="absolute inset-0 z-0 opacity-40 filter blur-[100px] sm:blur-[140px]">
        <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-cyan-500/20 -top-10 -left-10 animate-float-1" />
        <div className="absolute w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full bg-violet-600/15 bottom-10 right-10 animate-float-2" />
        <div className="absolute w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] rounded-full bg-blue-600/20 top-1/3 left-1/4 sm:left-1/3 animate-float-3" />
      </div>

      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 will-change-transform opacity-75"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(29, 78, 216, 0.04) 40%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
        }}
      />
    </div>
  );
};

export default Background;