// components/Portfolio/sections/ProjectsSection.tsx
import React, { useRef } from "react";
import cn from "@/utils/cn";

// Define our project type for better type safety
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
}

// Sample project data - you can replace this with your actual projects
const projects: Project[] = [
  {
    id: "project1",
    title: "Interactive Dashboard",
    description:
      "A real-time analytics dashboard built with React and D3.js, featuring dynamic data visualization and user interaction.",
    technologies: ["React", "TypeScript", "D3.js", "Tailwind CSS"],
    imageUrl: "/api/placeholder/800/600", // Using placeholder for now
    link: "#",
  },
  {
    id: "project2",
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management and payment processing.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "/api/placeholder/800/600",
    link: "#",
  },
  // Add more projects as needed
];

export const ProjectsSection: React.FC = () => {
  // Create refs for staggered animations
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Section header with staggered animation */}
      <div ref={titleRef} className="mb-16 text-center">
        <h2
          className={cn(
            "text-5xl font-bold mb-6",
            "bg-gradient-to-r from-blue-500 to-purple-500",
            "bg-clip-text text-transparent"
          )}
        >
          Featured Projects
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A collection of my recent work, showcasing my expertise in web
          development, interactive design, and problem-solving.
        </p>
      </div>

      {/* Projects grid with staggered animations */}
      <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className={cn(
              "group relative rounded-xl overflow-hidden",
              "transform transition-transform duration-500",
              "hover:-translate-y-2"
            )}
          >
            {/* Project image with overlay */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-800">
              <img
                src={project.imageUrl}
                alt={project.title}
                className={cn(
                  "w-full h-full object-cover",
                  "transition-transform duration-500",
                  "group-hover:scale-105"
                )}
              />
              {/* Overlay with project details */}
              <div
                className={cn(
                  "absolute inset-0 bg-black/80",
                  "opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-500",
                  "flex flex-col justify-center p-8"
                )}
              >
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-500/20 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className={cn(
                    "inline-flex items-center",
                    "text-blue-400 hover:text-blue-300",
                    "transition-colors duration-300"
                  )}
                >
                  View Project
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
