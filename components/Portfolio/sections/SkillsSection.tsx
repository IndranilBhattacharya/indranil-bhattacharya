// components/Portfolio/sections/SkillsSection.tsx
import { cn } from "@/lib/utils";
import React, { useRef } from "react";

// Define our skill category type
interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    color: string;
  }[];
}

// Organize skills by category
const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React/Next.js", level: 90, color: "bg-blue-500" },
      { name: "TypeScript", level: 85, color: "bg-blue-400" },
      { name: "HTML/CSS", level: 95, color: "bg-blue-600" },
      { name: "GSAP/Framer Motion", level: 80, color: "bg-blue-300" },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", level: 85, color: "bg-green-500" },
      { name: "Python", level: 75, color: "bg-green-400" },
      { name: "PostgreSQL", level: 80, color: "bg-green-600" },
      { name: "MongoDB", level: 85, color: "bg-green-300" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git/GitHub", level: 90, color: "bg-purple-500" },
      { name: "Docker", level: 75, color: "bg-purple-400" },
      { name: "AWS", level: 70, color: "bg-purple-600" },
      { name: "CI/CD", level: 80, color: "bg-purple-300" },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  // Create refs for animation targets
  const titleRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Section header */}
      <div ref={titleRef} className="mb-16 text-center">
        <h2
          className={cn(
            "text-5xl font-bold mb-6",
            "bg-gradient-to-r from-blue-500 to-purple-500",
            "bg-clip-text text-transparent"
          )}
        >
          Technical Skills
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A comprehensive overview of my technical expertise and proficiency
          across various technologies and tools.
        </p>
      </div>

      {/* Skills categories */}
      <div
        ref={categoriesRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className={cn(
              "bg-white/5 rounded-xl p-6",
              "backdrop-blur-sm",
              "transform transition-transform duration-500",
              "hover:-translate-y-2"
            )}
          >
            <h3 className="text-xl font-semibold mb-6">{category.title}</h3>
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        skill.color,
                        "transform-gpu transition-transform duration-1000",
                        "origin-left"
                      )}
                      style={{
                        width: `${skill.level}%`,
                        transform: "scaleX(0)", // Initial state for animation
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional skills cloud - optional decorative element */}
      <div className="mt-16 text-center opacity-60">
        <p className="text-sm text-gray-400">
          Additional technologies I work with:
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {[
            "Redux",
            "GraphQL",
            "Jest",
            "Webpack",
            "Sass",
            "Firebase",
            "Vercel",
            "Netlify",
            "Material-UI",
            "Tailwind CSS",
          ].map((tech) => (
            <span
              key={tech}
              className={cn(
                "px-3 py-1 bg-white/5 rounded-full text-sm",
                "transform transition-transform duration-300",
                "hover:-translate-y-1"
              )}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
