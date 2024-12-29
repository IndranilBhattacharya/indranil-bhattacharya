// components/Portfolio/sections/TestimonialSection.tsx
import { cn } from "@/lib/utils";
import React, { useRef } from "react";

// Define our testimonial type for type safety and better code organization
interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company: string;
  imageUrl: string;
}

// Sample testimonial data - you can replace these with real testimonials
const testimonials: Testimonial[] = [
  {
    id: "t1",
    content:
      "An exceptional developer who consistently delivers high-quality work. Their attention to detail and problem-solving skills are outstanding.",
    author: "Jane Smith",
    role: "Tech Lead",
    company: "Innovation Labs",
    imageUrl: "/api/placeholder/100/100",
  },
  {
    id: "t2",
    content:
      "Working together on our project was a fantastic experience. Their technical expertise and ability to translate complex requirements into elegant solutions is impressive.",
    author: "John Davis",
    role: "Product Manager",
    company: "TechCorp",
    imageUrl: "/api/placeholder/100/100",
  },
];

// Define our social link type for consistency
interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
  hoverColor: string;
}

// Social media links configuration
const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/yourusername",
    hoverColor: "hover:text-gray-100",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yourprofile",
    hoverColor: "hover:text-blue-400",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/yourhandle",
    hoverColor: "hover:text-blue-400",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
];

export const TestimonialSection: React.FC = () => {
  // Create refs for animation targets
  const titleRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

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
          Testimonials & Connect
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Feedback from clients and collaborators, plus ways to connect and
          follow my work.
        </p>
      </div>

      {/* Testimonials grid */}
      <div
        ref={testimonialsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={cn(
              "bg-white/5 rounded-xl p-8",
              "backdrop-blur-sm",
              "transform transition-all duration-500",
              "hover:-translate-y-2 hover:bg-white/10"
            )}
          >
            {/* Testimonial content */}
            <p className="text-gray-300 mb-6 italic">
              &quot;{testimonial.content}&quot;
            </p>

            {/* Author info */}
            <div className="flex items-center">
              <img
                src={testimonial.imageUrl}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold">{testimonial.author}</h4>
                <p className="text-sm text-gray-400">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Social links section */}
      <div ref={socialsRef} className="text-center">
        <h3 className="text-2xl font-semibold mb-8">Let&apos;s Connect</h3>

        <div className="flex justify-center gap-8">
          {socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-gray-400 transition-colors duration-300",
                social.hoverColor
              )}
              aria-label={`Connect on ${social.platform}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12">
          <a
            href="mailto:your.email@example.com"
            className={cn(
              "inline-flex items-center gap-2",
              "px-8 py-3 rounded-full",
              "bg-blue-500 hover:bg-blue-600",
              "transition-colors duration-300"
            )}
          >
            <span>Get in Touch</span>
            <svg
              className="w-5 h-5"
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
  );
};
