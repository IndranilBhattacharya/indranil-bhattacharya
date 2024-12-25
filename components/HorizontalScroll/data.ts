// components/HorizontalScroll/data.ts
import { Section } from "./types";

/**
 * Sample sections data for the horizontal scroll
 * In a real application, this might come from an API or CMS
 */
export const sections: Section[] = [
  {
    id: "section1",
    title: "First Section",
    subtitle: "Welcome",
    content: [
      "This is the first section content. It demonstrates the horizontal scrolling effect.",
      "Additional content to show the layout and spacing of our design.",
    ],
    backgroundColor: "bg-blue-900",
  },
  {
    id: "section2",
    title: "Second Section",
    subtitle: "Continue",
    content: [
      "Here is the second section with its own unique content.",
      "More content to fill the space and show the scrolling effect.",
    ],
    backgroundColor: "bg-purple-900",
  },
  {
    id: "section3",
    title: "Third Section",
    subtitle: "Final",
    content: [
      "This is the final section of our horizontal scroll layout.",
      "The last piece of content demonstrating the full scroll effect.",
    ],
    backgroundColor: "bg-indigo-900",
  },
];
