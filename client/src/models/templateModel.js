export const templates = [
  {
    id: "sample-news",
    name: "Pro News",
    badge: "Breaking",
    accent: "#e11d48",
    palette: "bg-[#f8fafc]",
    headlineClass: "text-white bg-[#111827]",
    description: "Premium lower-third news style with strong feed contrast."
  },
  {
    id: "cinematic-bottom",
    name: "Cinematic Bottom",
    badge: "",
    accent: "#f97316",
    palette: "bg-[#020617]",
    headlineClass: "text-white",
    description: "Movie-poster style crop with a powerful bottom headline."
  },
  {
    id: "northline-canada",
    name: "Northline Canada",
    badge: "",
    accent: "#d52b1e",
    palette: "bg-[#fffdfb]",
    headlineClass: "text-[#17212b]",
    description: "Minimal editorial layout with a subtle Canadian-red accent."
  },
  {
    id: "goldline-impact",
    name: "Goldline Impact",
    description: "Full-photo editorial design with bold white and gold headline emphasis."
  }
];

export const getTemplateById = (templateId) =>
  templates.find((template) => template.id === templateId) || templates[0];
