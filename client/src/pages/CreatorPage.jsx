import { useEffect, useRef, useState } from "react";
import ControlPanel from "../components/ControlPanel.jsx";
import PostCanvas from "../components/PostCanvas.jsx";
import { downloadPostImage } from "../controllers/exportController.js";
import {
  fileToDataUrl,
  getImageFromPasteEvent,
  readImageFromClipboard
} from "../controllers/imageController.js";
import { saveDraft } from "../controllers/postController.js";
import { defaultPost } from "../models/postModel.js";

const CreatorPage = () => {
  const [post, setPost] = useState(defaultPost);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const canvasRef = useRef(null);

  const uploadImageFile = async (file, successMessage = "Image uploaded.") => {
    if (!file) return;

    try {
      const image = await fileToDataUrl(file);
      setPost((current) => ({ ...current, image }));
      setNotice(successMessage);
    } catch (error) {
      setNotice(error.message);
    }
  };

  const handleImageChange = (event) => {
    uploadImageFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handlePasteImage = async () => {
    try {
      const imageFile = await readImageFromClipboard();
      await uploadImageFile(imageFile, "Clipboard image uploaded.");
    } catch (error) {
      setNotice(error.message);
    }
  };

  useEffect(() => {
    const handlePaste = (event) => {
      const imageFile = getImageFromPasteEvent(event);

      if (!imageFile) return;

      event.preventDefault();
      uploadImageFile(imageFile, "Pasted image uploaded.");
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    setNotice("");

    try {
      await downloadPostImage({ node: canvasRef.current, post });
      setNotice("Download created.");
    } catch (error) {
      setNotice(error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setNotice("");

    try {
      await saveDraft(post);
      setNotice("Draft saved.");
    } catch (error) {
      setNotice(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <ControlPanel
          post={post}
          onChange={setPost}
          onImageChange={handleImageChange}
          onPasteImage={handlePasteImage}
          onDownload={handleDownload}
          onSave={handleSave}
          isSaving={isSaving}
          isDownloading={isDownloading}
        />
        <section className="relative flex flex-1 flex-col">
          {notice && (
            <div className="absolute left-1/2 top-4 z-20 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-md border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-panel">
              {notice}
            </div>
          )}
          <PostCanvas ref={canvasRef} post={post} />
        </section>
      </div>
    </main>
  );
};

export default CreatorPage;
