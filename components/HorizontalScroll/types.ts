// components/HorizontalScroll/types.ts

/**
 * Represents a single section in the horizontal scroll
 * @interface Section
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
}

/**
 * Props for the SectionContent component
 * @interface SectionContentProps
 */
export interface SectionContentProps {
  /** Section data to render */
  section: Section;
  /** Flag indicating if we're on client-side */
  isClient: boolean;
}
