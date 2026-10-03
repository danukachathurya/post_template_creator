export const defaultPost = {
  headline: "Your headline goes here",
  image: "",
  templateId: "sample-news",
  size: "1:1",
  quality: "high"
};

export const sizes = [
  {
    id: "1:1",
    name: "Square",
    label: "1:1",
    width: 1080,
    height: 1080
  },
  {
    id: "3:4",
    name: "Portrait",
    label: "3:4",
    width: 1080,
    height: 1440
  }
];

export const qualities = [
  {
    id: "standard",
    label: "Standard",
    scale: 1,
    detail: "Fast download"
  },
  {
    id: "high",
    label: "High",
    scale: 2,
    detail: "Recommended"
  },
  {
    id: "ultra",
    label: "Ultra",
    scale: 3,
    detail: "Sharpest export"
  }
];

export const getSizeById = (sizeId) =>
  sizes.find((size) => size.id === sizeId) || sizes[0];

export const getQualityById = (qualityId) =>
  qualities.find((quality) => quality.id === qualityId) || qualities[1];
