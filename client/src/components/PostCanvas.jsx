import { forwardRef } from "react";
import { getSizeById } from "../models/postModel";
import { getTemplateById } from "../models/templateModel";

const getHeadlineSize = (headline, size, variant = "default") => {
  const length = headline.length;
  const portrait = size === "3:4";

  if (variant === "compact") {
    if (length > 95) return portrait ? "4.7cqw" : "4.3cqw";
    if (length > 65) return portrait ? "5.35cqw" : "4.95cqw";
    return portrait ? "6.25cqw" : "5.8cqw";
  }

  if (variant === "compact-large") {
    if (length > 95) return portrait ? "5.1cqw" : "4.7cqw";
    if (length > 65) return portrait ? "5.8cqw" : "5.4cqw";
    return portrait ? "6.8cqw" : "6.3cqw";
  }

  if (variant === "feature") {
    if (length > 95) return portrait ? "5.05cqw" : "4.65cqw";
    if (length > 65) return portrait ? "5.85cqw" : "5.35cqw";
    return portrait ? "6.9cqw" : "6.35cqw";
  }

  if (length > 95) return portrait ? "4.95cqw" : "4.55cqw";
  if (length > 65) return portrait ? "5.65cqw" : "5.2cqw";
  return portrait ? "6.65cqw" : "6.15cqw";
};

const splitHeadlineForEmphasis = (headline) => {
  const colonIndex = headline.indexOf(":");

  if (colonIndex > -1 && colonIndex < headline.length - 1) {
    return {
      lead: headline.slice(0, colonIndex + 1).trim(),
      emphasis: headline.slice(colonIndex + 1).trim()
    };
  }

  const words = headline.split(/\s+/).filter(Boolean);
  const emphasisCount = Math.max(1, Math.ceil(words.length * 0.38));
  const splitIndex = Math.max(1, words.length - emphasisCount);

  return {
    lead: words.slice(0, splitIndex).join(" "),
    emphasis: words.slice(splitIndex).join(" ")
  };
};

const TemplateFrame = ({ post, template }) => {
  const headline = post.headline.trim() || "Your headline goes here";
  const isPortrait = post.size === "3:4";

  if (template.id === "cinematic-bottom") {
    const cinematicStyle = {
      fontSize: getHeadlineSize(headline, post.size, "feature"),
      lineHeight: 1.08,
      letterSpacing: 0
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#020617]">
        <ImageArea image={post.image} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/15" />
        <div className="absolute bottom-[6%] left-[6%] right-[6%]">
          <div className="mb-[4%] h-[0.95cqw] w-[28%] bg-[#f97316]" />
          <h2 className="headline-readable text-balance text-white drop-shadow-2xl" style={cinematicStyle}>
            {headline}
          </h2>
        </div>
      </div>
    );
  }

  if (template.id === "northline-canada") {
    const canadaStyle = {
      fontSize: getHeadlineSize(headline, post.size, "compact-large"),
      lineHeight: 1.08,
      letterSpacing: 0,
      textShadow: "0 1px 2px #000, 0 2px 8px rgba(0, 0, 0, 0.95), 0 4px 18px rgba(0, 0, 0, 0.85)"
    };

    return (
      <div className="relative h-full w-full overflow-hidden">
        <ImageArea image={post.image} className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        <div className="absolute bottom-[6%] left-[6%] right-[6%]">
          <div className="mb-[2.5%] flex items-center gap-[1.5%] drop-shadow-lg">
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="h-[3.4cqw] w-[3.4cqw] shrink-0 fill-[#d52b1e] drop-shadow-md"
            >
              <path d="m32 3 5 15 12-7-2 13 14-2-12 12 5 4-15-2-4 14-3-4-3 4-4-14-15 2 5-4L3 22l14 2-2-13 12 7 5-15Zm-2 46h4v12h-4z" />
            </svg>
            <span className="text-[2.1cqw] font-semibold uppercase tracking-[0.2em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]">
              Canadian Essence
            </span>
          </div>
          <h2 className="headline-readable text-balance text-white" style={canadaStyle}>
            {headline}
          </h2>
        </div>
      </div>
    );
  }

  if (template.id === "goldline-impact") {
    const { lead, emphasis } = splitHeadlineForEmphasis(headline);
    const impactStyle = {
      fontSize: getHeadlineSize(headline, post.size, "feature"),
      lineHeight: 0.98,
      letterSpacing: "-0.025em",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.95), 0 5px 16px rgba(0, 0, 0, 0.8)"
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#111111]">
        <ImageArea image={post.image} className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black via-black/75 to-transparent" />
        <div className="absolute bottom-[5%] left-[6%] right-[6%]">
          <h2 className="headline-readable text-balance font-black text-[#f5bd3b]" style={impactStyle}>
            <span className="block">{lead}</span>
            {emphasis && (
              <span className="mt-[1%] block">
                {emphasis}
              </span>
            )}
          </h2>
        </div>
      </div>
    );
  }

  const headlineStyle = {
    fontSize: getHeadlineSize(headline, post.size, "feature"),
    lineHeight: 1.08,
    letterSpacing: 0
  };

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#0f172a]">
      <ImageArea image={post.image} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/25 to-transparent" />
      <div className="absolute left-[5.5%] top-[5%] h-[1.2cqw] w-[24%] bg-[#e11d48] shadow-xl" />
      <div className="absolute bottom-0 left-0 right-0">
        <div className={`${isPortrait ? "px-[5.5%] pb-[5.5%] pt-[18%]" : "px-[5.5%] pb-[5.5%] pt-[12%]"} bg-gradient-to-t from-[#0f172a] via-[#0f172a]/95 to-transparent`}>
          <div className="max-w-[94%]">
            <h2 className="headline-readable text-balance text-white" style={headlineStyle}>
              {headline}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageArea = ({ image, className = "" }) => (
  <div className={`h-full w-full bg-slate-200 ${className}`}>
    {image ? (
      <img src={image} alt="" className="h-full w-full object-cover" />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#f8fafc_0%,#e2e8f0_52%,#fecaca_100%)] p-[8%] text-center">
        <div>
          <div className="mx-auto mb-[5%] h-[12cqw] w-[12cqw] rounded-md border-[0.8cqw] border-white bg-white/50" />
        </div>
      </div>
    )}
  </div>
);

const PostCanvas = forwardRef(({ post }, ref) => {
  const size = getSizeById(post.size);
  const template = getTemplateById(post.templateId);

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-slate-100 px-4 py-6 lg:px-8">
      <div className="canvas-checker w-full max-w-[760px] rounded-md border border-slate-200 p-4 shadow-panel">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase text-slate-500">
          <span>{template.name}</span>
          <span>{size.width} x {size.height}px</span>
        </div>
        <div
          ref={ref}
          className="mx-auto overflow-hidden bg-white shadow-2xl [container-type:inline-size]"
          style={{
            aspectRatio: `${size.width} / ${size.height}`,
            width: post.size === "3:4" ? "min(100%, 460px)" : "min(100%, 620px)"
          }}
        >
          <TemplateFrame post={post} template={template} />
        </div>
      </div>
    </div>
  );
});

PostCanvas.displayName = "PostCanvas";

export default PostCanvas;
