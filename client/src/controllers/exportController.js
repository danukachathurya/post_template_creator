import { toPng } from "html-to-image";
import { getQualityById, getSizeById } from "../models/postModel";

const waitForPaint = () =>
  new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

const waitForImages = (root) => {
  const images = Array.from(root.querySelectorAll("img"));

  return Promise.all(
    images.map(
      (image) =>
        new Promise((resolve) => {
          if (image.complete && image.naturalWidth > 0) {
            resolve();
            return;
          }

          image.onload = resolve;
          image.onerror = resolve;
        })
    )
  );
};

export const downloadPostImage = async ({ node, post }) => {
  if (!node) {
    throw new Error("Canvas is not ready.");
  }

  const size = getSizeById(post.size);
  const quality = getQualityById(post.quality);
  const originalStyle = node.getAttribute("style") || "";
  const originalClass = node.getAttribute("class") || "";

  try {
    node.classList.add("exporting");
    Object.assign(node.style, {
      aspectRatio: `${size.width} / ${size.height}`,
      boxShadow: "none",
      height: `${size.height}px`,
      margin: "0 auto",
      maxHeight: "none",
      maxWidth: "none",
      overflow: "hidden",
      transform: "none",
      width: `${size.width}px`
    });

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    await waitForImages(node);
    await waitForPaint();

    const dataUrl = await toPng(node, {
      backgroundColor: "#ffffff",
      cacheBust: true,
      height: size.height,
      pixelRatio: quality.scale,
      skipAutoScale: true,
      style: {
        height: `${size.height}px`,
        margin: "0",
        maxHeight: "none",
        maxWidth: "none",
        transform: "none",
        width: `${size.width}px`
      },
      width: size.width
    });

    const link = document.createElement("a");
    const safeHeadline = post.headline
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 44);

    link.download = `${safeHeadline || "facebook-post"}-${post.size}-${quality.id}.png`;
    link.href = dataUrl;
    link.click();
  } finally {
    node.setAttribute("style", originalStyle);
    node.setAttribute("class", originalClass);
  }
};
