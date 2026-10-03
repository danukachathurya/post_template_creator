import { forwardRef } from "react";
import { getSizeById } from "../models/postModel";
import { getTemplateById } from "../models/templateModel";

const getHeadlineSize = (headline, size, variant = "default") => {
  const length = headline.length;
  const portrait = size === "3:4";

  if (variant === "stacked") {
    if (length > 95) return portrait ? "5.3cqw" : "4.9cqw";
    if (length > 65) return portrait ? "6.25cqw" : "5.75cqw";
    return portrait ? "7.35cqw" : "6.85cqw";
  }

  if (variant === "feature") {
    if (length > 95) return portrait ? "5.05cqw" : "4.65cqw";
    if (length > 65) return portrait ? "5.85cqw" : "5.35cqw";
    return portrait ? "6.9cqw" : "6.35cqw";
  }

  if (variant === "compact") {
    if (length > 95) return portrait ? "4.7cqw" : "4.3cqw";
    if (length > 65) return portrait ? "5.35cqw" : "4.95cqw";
    return portrait ? "6.25cqw" : "5.8cqw";
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
  const emphasisCount = Math.max(2, Math.ceil(words.length * 0.38));
  const splitIndex = Math.max(1, words.length - emphasisCount);

  return {
    lead: words.slice(0, splitIndex).join(" "),
    emphasis: words.slice(splitIndex).join(" ")
  };
};

const TemplateFrame = ({ post, template }) => {
  const headline = post.headline.trim() || "Your headline goes here";
  const isPortrait = post.size === "3:4";
  const headlineStyle = {
    fontSize: getHeadlineSize(headline, post.size, "feature"),
    lineHeight: 1.08,
    letterSpacing: 0
  };

  if (template.id === "viral-punch") {
    return (
      <div className="relative flex h-full w-full overflow-hidden bg-[#101828]">
        <ImageArea image={post.image} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/95 via-[#101828]/25 to-[#101828]/10" />
        <div className="absolute left-[5.5%] top-[5%] h-[1.2cqw] w-[24%] bg-[#ffbe0b] shadow-xl" />
        <div className="absolute bottom-[5.5%] left-[5.5%] right-[5.5%]">
          <div className="w-full border-t-[1.2cqw] border-[#ffbe0b] bg-white p-[4.6%] shadow-2xl">
            <h2 className="headline-readable text-balance text-[#07111f]" style={headlineStyle}>
              {headline}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "creator-quote") {
    const quoteStyle = {
      fontSize: getHeadlineSize(headline, post.size, "compact"),
      lineHeight: 1.1,
      letterSpacing: 0
    };

    return (
      <div className="relative flex h-full w-full overflow-hidden bg-[#f4f7f5] p-[5.5%]">
        <div className="absolute left-0 top-0 h-full w-[26%] bg-[#115e59]" />
        <div className="relative z-10 grid h-full w-full grid-rows-[1fr_auto] gap-[4.5%]">
          <div className="overflow-hidden border-[0.75cqw] border-white shadow-2xl">
            <ImageArea image={post.image} />
          </div>
          <div className="bg-white p-[5%] shadow-2xl">
            <h2 className="headline-readable text-balance text-[#092f2b]" style={quoteStyle}>
              {headline}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "product-buzz") {
    const productStyle = {
      fontSize: getHeadlineSize(headline, post.size, "compact"),
      lineHeight: 1.08,
      letterSpacing: 0
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#f8fafc]">
        <div className="absolute inset-y-0 right-0 w-[36%] bg-[#1d4ed8]" />
        <div className="relative z-10 grid h-full w-full grid-rows-[1fr_auto] p-[5.5%]">
          <div className="overflow-hidden border-[0.8cqw] border-white shadow-2xl">
            <ImageArea image={post.image} />
          </div>
          <div className="mt-[5%] bg-white p-[4.6%] shadow-2xl">
            <h2 className="headline-readable text-balance text-[#0f172a]" style={productStyle}>
              {headline}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "question-hook") {
    const questionStyle = {
      fontSize: getHeadlineSize(headline, post.size, "feature"),
      lineHeight: 1.08,
      letterSpacing: 0
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#111827]">
        <ImageArea image={post.image} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#111827]/95 via-[#111827]/40 to-transparent" />
        <div className="absolute bottom-[6%] left-[6%] right-[6%] border-l-[1.4cqw] border-[#dc2626] bg-white/95 p-[5%] shadow-2xl">
          <h2 className="headline-readable text-balance text-[#111827]" style={questionStyle}>
            {headline}
          </h2>
        </div>
        <div className="absolute left-[6%] top-[6%] h-[1.15cqw] w-[30%] bg-[#dc2626]" />
        <div className="absolute right-[7%] top-[8%] h-[14cqw] w-[14cqw] rounded-full border-[1.1cqw] border-white/60" />
      </div>
    );
  }

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

  if (template.id === "split-debate") {
    const splitStyle = {
      fontSize: getHeadlineSize(headline, post.size, "compact"),
      lineHeight: 1.08,
      letterSpacing: 0
    };

    return (
      <div className="grid h-full w-full grid-cols-[58%_42%] overflow-hidden bg-[#0f172a]">
        <div className="relative h-full overflow-hidden">
          <ImageArea image={post.image} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]/60" />
        </div>
        <div className="relative flex h-full items-end bg-[#0f172a] p-[8%]">
          <div className="absolute right-0 top-0 h-[34%] w-[62%] bg-[#14b8a6]" />
          <div className="absolute right-[12%] top-[12%] h-[18cqw] w-[18cqw] border-[1.1cqw] border-white/25" />
          <h2 className="headline-readable relative z-10 text-balance text-white" style={splitStyle}>
            {headline}
          </h2>
        </div>
      </div>
    );
  }

  if (template.id === "magazine-clean") {
    const magazineStyle = {
      fontSize: getHeadlineSize(headline, post.size, "compact"),
      lineHeight: 1.1,
      letterSpacing: 0
    };

    return (
      <div className="grid h-full w-full grid-rows-[64%_36%] overflow-hidden bg-white p-[5.5%]">
        <div className="relative overflow-hidden shadow-2xl">
          <ImageArea image={post.image} />
        </div>
        <div className="relative flex items-end bg-white pt-[5%]">
          <div className="absolute left-0 top-[5%] h-[0.9cqw] w-[32%] bg-[#111827]" />
          <h2 className="headline-readable text-balance text-[#111827]" style={magazineStyle}>
            {headline}
          </h2>
        </div>
      </div>
    );
  }

  if (template.id === "impact-frame") {
    const impactStyle = {
      fontSize: getHeadlineSize(headline, post.size, "feature"),
      lineHeight: 1.08,
      letterSpacing: 0
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#18181b] p-[4.8%]">
        <div className="absolute inset-[3%] border-[1.4cqw] border-[#facc15]" />
        <div className="relative h-full w-full overflow-hidden">
          <ImageArea image={post.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-[5.5%] left-[5.5%] right-[5.5%]">
            <h2 className="headline-readable text-balance text-white drop-shadow-2xl" style={impactStyle}>
              {headline}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "news-bar") {
    const newsBarStyle = {
      fontSize: getHeadlineSize(headline, post.size, "feature"),
      lineHeight: 1.06,
      letterSpacing: 0
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#0f172a]">
        <ImageArea image={post.image} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent" />
        <div className="absolute left-[5%] top-[5%] h-[1.05cqw] w-[22%] bg-[#e11d48]" />
        <div className="absolute bottom-0 left-0 right-0 border-t-[1.15cqw] border-[#e11d48] bg-[#020617]/94 px-[5.5%] py-[5%]">
          <h2 className="headline-readable text-balance text-white" style={newsBarStyle}>
            {headline}
          </h2>
        </div>
      </div>
    );
  }

  if (template.id === "cinematic-focus") {
    const focusStyle = {
      fontSize: getHeadlineSize(headline, post.size, "feature"),
      lineHeight: 1.05,
      letterSpacing: 0
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-black">
        <ImageArea image={post.image} className="absolute inset-0 scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
        <div className="absolute bottom-[7%] left-[7%] right-[7%] text-center">
          <h2 className="headline-readable text-balance text-white drop-shadow-2xl" style={focusStyle}>
            {headline}
          </h2>
          <div className="mx-auto mt-[4%] h-[0.9cqw] w-[28%] bg-[#f97316]" />
        </div>
      </div>
    );
  }

  if (template.id === "impact-slab") {
    const slabStyle = {
      fontSize: getHeadlineSize(headline, post.size, "feature"),
      lineHeight: 1.06,
      letterSpacing: 0
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#111827]">
        <ImageArea image={post.image} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/95 via-[#111827]/35 to-transparent" />
        <div className="absolute left-[5.5%] right-[5.5%] bottom-[5.5%] bg-white p-[5%] shadow-2xl">
          <div className="mb-[3%] h-[1cqw] w-[26%] bg-[#facc15]" />
          <h2 className="headline-readable text-balance text-[#111827]" style={slabStyle}>
            {headline}
          </h2>
        </div>
      </div>
    );
  }

  if (template.id === "redline-report") {
    const redlineStyle = {
      fontSize: getHeadlineSize(headline, post.size, "feature"),
      lineHeight: 1.06,
      letterSpacing: 0
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#111827]">
        <ImageArea image={post.image} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/92 via-[#111827]/35 to-transparent" />
        <div className="absolute bottom-[6%] left-[6%] right-[8%]">
          <div className="mb-[3.5%] h-[1.1cqw] w-[34%] bg-[#dc2626]" />
          <h2 className="headline-readable max-w-[92%] text-balance text-white drop-shadow-2xl" style={redlineStyle}>
            {headline}
          </h2>
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-[2.4%] bg-[#dc2626]" />
      </div>
    );
  }

  if (template.id === "poster-impact") {
    const posterStyle = {
      fontSize: getHeadlineSize(headline, post.size, "feature"),
      lineHeight: 1.04,
      letterSpacing: 0
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#020617] p-[4.5%]">
        <div className="relative h-full w-full overflow-hidden">
          <ImageArea image={post.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/10" />
          <div className="absolute inset-[3%] border-[0.8cqw] border-white/80" />
          <div className="absolute bottom-[7%] left-[7%] right-[7%]">
            <h2 className="headline-readable text-balance text-white drop-shadow-2xl" style={posterStyle}>
              {headline}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (template.id === "deep-news") {
    const deepStyle = {
      fontSize: getHeadlineSize(headline, post.size, "compact"),
      lineHeight: 1.08,
      letterSpacing: 0
    };

    return (
      <div className="grid h-full w-full grid-rows-[1fr_auto] overflow-hidden bg-[#0f172a]">
        <div className="relative overflow-hidden">
          <ImageArea image={post.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 to-transparent" />
        </div>
        <div className="border-t-[1cqw] border-[#38bdf8] bg-[#0f172a] px-[6%] py-[5.5%]">
          <h2 className="headline-readable text-balance text-white" style={deepStyle}>
            {headline}
          </h2>
        </div>
      </div>
    );
  }

  if (template.id === "yellow-priority") {
    const { lead, emphasis } = splitHeadlineForEmphasis(headline);
    const priorityStyle = {
      fontSize: getHeadlineSize(headline, post.size, "stacked"),
      letterSpacing: 0,
      lineHeight: 1.02
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-[#020617]">
        <ImageArea image={post.image} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black via-black/75 to-transparent" />
        <div className="absolute bottom-[5.8%] left-[5.5%] right-[5.5%] text-center">
          <h2 className="headline-readable text-balance text-white drop-shadow-2xl" style={priorityStyle}>
            <span className="block">{lead}</span>
            {emphasis && (
              <span className="mt-[1.5%] block text-[#facc15]">
                {emphasis}
              </span>
            )}
          </h2>
        </div>
      </div>
    );
  }

  if (template.id === "minimal-premium") {
    const minimalStyle = {
      fontSize: getHeadlineSize(headline, post.size, "compact"),
      lineHeight: 1.1,
      letterSpacing: 0
    };

    return (
      <div className="grid h-full w-full grid-rows-[58%_42%] overflow-hidden bg-[#f8fafc] p-[5.5%]">
        <div className="relative overflow-hidden">
          <ImageArea image={post.image} />
        </div>
        <div className="relative flex items-center bg-white px-[5%] shadow-2xl">
          <div className="absolute left-[5%] top-0 h-[1cqw] w-[24%] bg-[#be123c]" />
          <h2 className="headline-readable text-balance text-[#0f172a]" style={minimalStyle}>
            {headline}
          </h2>
        </div>
      </div>
    );
  }

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
