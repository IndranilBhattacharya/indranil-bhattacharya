// components/HorizontalScroll/types.ts
export interface Section {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor?: string;
}

export const sections: Section[] = [
  {
    id: "1",
    title: "First Section",
    subtitle: "Description for first section",
    backgroundColor: "bg-blue-900",
  },
  {
    id: "2",
    title: "Second Section",
    subtitle: "Description for second section",
    backgroundColor: "bg-purple-900",
  },
  {
    id: "3",
    title: "Third Section",
    subtitle: "Description for third section",
    backgroundColor: "bg-indigo-900",
  },
];
