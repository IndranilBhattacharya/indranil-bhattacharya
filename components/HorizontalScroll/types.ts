// components/HorizontalScroll/types.ts

/**
 * Represents a single section in the horizontal scroll
 * Each section contains content and metadata for both SEO and display purposes
 */
export interface Section {
  /** Unique identifier for the section */
  id: string;

  /** Main heading text */
  title: string;

  /** Subheading text */
  subtitle: string;

  /** Array of content paragraphs */
  content: string[];

  /** Tailwind background color class */
  backgroundColor: string;

  /** Optional date for time-based content */
  date?: string;
}

/**
 * Props for the SectionContent component
 */
export interface SectionContentProps {
  /** Section data to render */
  section: Section;

  /** Flag indicating if we're on client-side */
  isClient: boolean;
}
