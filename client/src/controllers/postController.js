export const saveDraft = async (post) => {
  const payload = {
    headline: post.headline,
    pageName: post.pageName || "",
    logoStyleId: post.logoStyleId || "classic",
    imageUrl: post.image,
    templateId: post.templateId,
    size: post.size,
    quality: post.quality
  };

  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Draft could not be saved.");
  }

  return response.json();
};
