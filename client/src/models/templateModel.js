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
    id: "impact-frame",
    name: "Impact Frame",
    badge: "",
    accent: "#facc15",
    palette: "bg-[#18181b]",
    headlineClass: "text-white",
    description: "Strong framed layout that gives the image instant stopping power."
  },
  {
    id: "news-bar",
    name: "News Bar",
    badge: "",
    accent: "#e11d48",
    palette: "bg-[#0f172a]",
    headlineClass: "text-white",
    description: "Clean full-photo news layout with a strong dark headline band."
  },
  {
    id: "cinematic-focus",
    name: "Cinematic Focus",
    badge: "",
    accent: "#f97316",
    palette: "bg-[#020617]",
    headlineClass: "text-white",
    description: "High-drama poster crop with centered lower headline placement."
  },
  {
    id: "impact-slab",
    name: "Impact Slab",
    badge: "",
    accent: "#facc15",
    palette: "bg-[#111827]",
    headlineClass: "text-[#111827]",
    description: "Bold white headline slab over a dark image fade."
  },
  {
    id: "redline-report",
    name: "Redline Report",
    badge: "",
    accent: "#dc2626",
    palette: "bg-[#111827]",
    headlineClass: "text-white",
    description: "Serious breaking-news composition with strong redline accents."
  },
  {
    id: "poster-impact",
    name: "Poster Impact",
    badge: "",
    accent: "#ffffff",
    palette: "bg-[#020617]",
    headlineClass: "text-white",
    description: "Poster-style full-image design with oversized headline contrast."
  },
  {
    id: "deep-news",
    name: "Deep News",
    badge: "",
    accent: "#38bdf8",
    palette: "bg-[#0f172a]",
    headlineClass: "text-white",
    description: "Dark editorial layout for serious topics and authority posts."
  },
  {
    id: "yellow-priority",
    name: "Yellow Priority",
    badge: "",
    accent: "#facc15",
    palette: "bg-[#020617]",
    headlineClass: "text-white",
    description: "Large centered viral headline with yellow emphasis styling."
  }
];

export const getTemplateById = (templateId) =>
  templates.find((template) => template.id === templateId) || templates[0];
