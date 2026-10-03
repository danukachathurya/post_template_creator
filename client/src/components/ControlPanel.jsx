import { Clipboard, Download, ImagePlus, Save, Type } from "lucide-react";
import { qualities, sizes } from "../models/postModel";
import { templates } from "../models/templateModel";

const ControlPanel = ({
  post,
  onChange,
  onImageChange,
  onPasteImage,
  onDownload,
  onSave,
  isSaving,
  isDownloading
}) => {
  const updatePost = (key, value) => onChange({ ...post, [key]: value });

  return (
    <aside className="w-full border-r border-slate-200 bg-white lg:h-screen lg:max-w-[390px] lg:overflow-y-auto">
      <div className="border-b border-slate-200 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-rose-600">
          Facebook Post Creator
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-950">Design a feed-ready post</h1>
      </div>

      <div className="space-y-6 px-5 py-5">
        <section>
          <label htmlFor="headline" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Type className="h-4 w-4" />
            Headline
          </label>
          <textarea
            id="headline"
            value={post.headline}
            onChange={(event) => updatePost("headline", event.target.value)}
            maxLength={200}
            rows={4}
            className="w-full resize-none rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
            placeholder="Type a powerful Facebook headline"
          />
          <div className="mt-1 text-right text-xs text-slate-500">{post.headline.length}/200</div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <ImagePlus className="h-4 w-4" />
              Picture
            </label>
            <button
              type="button"
              onClick={onPasteImage}
              aria-label="Paste image from clipboard"
              title="Paste image from clipboard"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:border-rose-300 hover:bg-rose-50"
            >
              <Clipboard className="h-4 w-4" />
            </button>
          </div>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center transition hover:border-rose-300 hover:bg-rose-50">
            <ImagePlus className="mb-2 h-6 w-6 text-slate-500" />
            <span className="text-sm font-medium text-slate-800">
              Upload a post image
            </span>
            <span className="mt-1 text-xs text-slate-500">JPG, PNG, or WebP</span>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onImageChange}
            />
          </label>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Template</h2>
          <div className="grid grid-cols-1 gap-3">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => updatePost("templateId", template.id)}
                className={`rounded-md border p-3 text-left transition ${
                  post.templateId === template.id
                    ? "border-rose-500 bg-rose-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-900">{template.name}</span>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: template.accent }}
                  />
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">{template.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Post Size</h2>
          <div className="grid grid-cols-2 gap-2">
            {sizes.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => updatePost("size", size.id)}
                className={`rounded-md border px-3 py-3 text-sm font-semibold transition ${
                  post.size === size.id
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {size.name} {size.label}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Download Quality</h2>
          <div className="grid grid-cols-3 gap-2">
            {qualities.map((quality) => (
              <button
                key={quality.id}
                type="button"
                onClick={() => updatePost("quality", quality.id)}
                className={`rounded-md border px-2 py-3 text-center transition ${
                  post.quality === quality.id
                    ? "border-rose-500 bg-rose-50 text-rose-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <span className="block text-sm font-semibold">{quality.label}</span>
                <span className="block text-[11px] leading-4 text-slate-500">{quality.detail}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving" : "Save"}
          </button>
          <button
            type="button"
            onClick={onDownload}
            disabled={isDownloading}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {isDownloading ? "Exporting" : "Download"}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ControlPanel;
