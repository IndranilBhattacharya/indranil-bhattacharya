// components/HorizontalScroll/StaticContent.tsx
import React from "react";
import { sections } from "./data";

/**
 * StaticContent component renders SEO-friendly content that gets served during SSR
 * This content is structured semantically for search engines while being visually hidden from users
 */
export const StaticContent: React.FC = () => {
  return (
    <div className="sr-only" aria-hidden="true">
      {/* Main heading for SEO */}
      <h1>Interactive Portfolio Showcase</h1>

      {/* Semantic article sections for each content piece */}
      {sections.map((section) => (
        <article key={section.id}>
          {/* Proper heading hierarchy */}
          <h2>{section.title}</h2>
          <p>
            <strong>{section.subtitle}</strong>
          </p>

          {/* Content with semantic markup */}
          <div>
            {section.content.map((text, idx) => (
              <p
                key={idx}
                // Add structured data attributes
                itemProp="description"
                // Use semantic HTML5 time elements where applicable
                {...(section.date && {
                  datetime: section.date,
                })}
              >
                {text}
              </p>
            ))}
          </div>
        </article>
      ))}

      {/* Additional SEO metadata */}
      <footer>
        <p itemProp="author">Portfolio by [Your Name]</p>
        <p itemProp="keywords">
          web development, interactive design, portfolio, professional work
        </p>
      </footer>
    </div>
  );
};
