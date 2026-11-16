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
    id: "pro-news-anton",
    name: "Pro News Anton",
    badge: "Breaking",
    accent: "#2563eb",
    palette: "bg-[#111827]",
    headlineClass: "text-white bg-[#111827]",
    description: "A clean Pro News layout with bold Anton lettering and a blue accent."
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
    id: "cinematic-bottom-anton",
    name: "Cinematic Bottom Anton",
    badge: "",
    accent: "#fbbf24",
    palette: "bg-[#020617]",
    headlineClass: "text-white",
    description: "The cinematic full-image layout with bold Anton headlines."
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
    id: "canada-essence",
    name: "Canada Essence",
    badge: "",
    accent: "#d52b1e",
    palette: "bg-[#17212b]",
    headlineClass: "text-white",
    description: "Canadian Essence branding with a clear Anton headline over a dark photo fade."
  },
  {
    id: "pure-clean",
    name: "Pure Clean",
    badge: "",
    accent: "#334155",
    palette: "bg-white",
    headlineClass: "text-slate-950",
    description: "A plain, clean layout with an unobstructed photo and simple headline."
  },
  {
    id: "goldline-impact",
    name: "Goldline Impact",
    description: "Full-photo editorial design with bold white and gold headline emphasis."
  }
];

export const getTemplateById = (templateId) =>
  templates.find((template) => template.id === templateId) || templates[0];
