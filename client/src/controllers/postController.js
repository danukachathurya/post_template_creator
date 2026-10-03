export const saveDraft = async (post) => {
  const payload = {
    headline: post.headline,
    imageUrl: post.image,
    templateId: post.templateId,
    size: post.size,
    quality: post.quality
  };

  const response = await fetch("http://localhost:5000/api/posts", {
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
