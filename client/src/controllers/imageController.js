export const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Image could not be loaded."));
    reader.readAsDataURL(file);
  });

export const getImageFromPasteEvent = (event) => {
  const items = Array.from(event.clipboardData?.items || []);
  const imageItem = items.find((item) => item.type.startsWith("image/"));

  return imageItem?.getAsFile() || null;
};

export const readImageFromClipboard = async () => {
  if (!navigator.clipboard?.read) {
    throw new Error("Press Ctrl+V after copying an image.");
  }

  const clipboardItems = await navigator.clipboard.read();

  for (const clipboardItem of clipboardItems) {
    const imageType = clipboardItem.types.find((type) => type.startsWith("image/"));

    if (imageType) {
      const blob = await clipboardItem.getType(imageType);
      return new File([blob], "clipboard-image.png", { type: imageType });
    }
  }

  throw new Error("No image found in clipboard.");
};
