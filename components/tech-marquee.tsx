"use client"

import React from "react"
import Image from "next/image"

// Using standard CDN URLs for 100% authentic official logos
// We use "white" color for Next.js to ensure visibility on dark background
const techs = [
    {
        name: "Node.js",
        src: "https://cdn.simpleicons.org/nodedotjs/339933",
    },
    {
        name: "React.js",
        src: "https://cdn.simpleicons.org/react/61DAFB",
    },
    {
        name: "Next.js",
        // Next.js logo is black by default, which is invisible on dark bg. 
        // We request the white version.
        src: "https://cdn.simpleicons.org/nextdotjs/white",
    },
    {
        name: "Vite",
        src: "https://cdn.simpleicons.org/vite/646CFF",
    },
    {
        name: "WordPress",
        src: "https://cdn.simpleicons.org/wordpress/21759B",
    },
    {
        name: "HTML5",
        src: "https://cdn.simpleicons.org/html5/E34F26",
    },
    {
        name: "PHP",
        src: "https://cdn.simpleicons.org/php/777BB4",
    },
]

export function TechMarquee() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10 lg:py-16">
            {/* Background blur/fade effect for smoother integration */}
            <div className="flex w-full overflow-hidden mask-image-gradient">
                <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 lg:gap-24 py-4">
                    {techs.map((tech) => (
                        <div
                            key={tech.name}
                            className="group flex items-center gap-4 transition-all duration-300"
                        >
                            <div className="relative h-12 w-12 lg:h-16 lg:w-16 transition-transform duration-300 group-hover:scale-110 drop-shadow-xl">
                                {/* 
                  Using unoptimized images for external CDNs to avoid Next.js config requirements 
                  for simple icons, or ensure the domain is allowed if we used Image. 
                  For now, standard img tag or unoptimized Image is safest for external SVG reliability.
                */}
                                <img
                                    src={tech.src}
                                    alt={tech.name}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <span className="hidden lg:block text-xl font-bold text-white transition-colors duration-300 drop-shadow-md">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
                <div aria-hidden="true" className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 lg:gap-24 py-4">
                    {techs.map((tech) => (
                        <div
                            key={`${tech.name}-clone`}
                            className="group flex items-center gap-4 transition-all duration-300"
                        >
                            <div className="relative h-12 w-12 lg:h-16 lg:w-16 transition-transform duration-300 group-hover:scale-110 drop-shadow-xl">
                                <img
                                    src={tech.src}
                                    alt={tech.name}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <span className="hidden lg:block text-xl font-bold text-white transition-colors duration-300 drop-shadow-md">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .mask-image-gradient {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
        </div>
    )
}
