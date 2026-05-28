import type { VideoTestimonialsContent } from "@site/lib/cms/homePageTypes";

interface VideoTestimonialsSectionProps {
  content?: VideoTestimonialsContent;
  headingTag?: string;
}

/**
 * Extracts video URL from either a direct URL or an iframe code snippet
 * Handles: YouTube URLs, embed URLs, iframe HTML, and other embed codes
 */
function getVideoEmbedUrl(input: string): string {
  if (!input?.trim()) return "";

  const trimmed = input.trim();

  // If it's an iframe code, extract the src attribute
  if (trimmed.includes("<iframe")) {
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/);
    if (srcMatch?.[1]) {
      return srcMatch[1];
    }
  }

  // If it's already an embed URL, return it as-is
  if (trimmed.includes("/embed/") || trimmed.includes("youtube-nocookie")) {
    return trimmed;
  }

  // Convert YouTube watch URL to embed format
  const youtubeWatchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (youtubeWatchMatch?.[1]) {
    return `https://www.youtube.com/embed/${youtubeWatchMatch[1]}`;
  }

  // Convert Vimeo URL to embed format
  const vimeoMatch = trimmed.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch?.[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // If it looks like a URL, return it (assume it's already in correct format)
  if (trimmed.startsWith("http")) {
    return trimmed;
  }

  return trimmed;
}

export default function VideoTestimonialsSection({
  content,
  headingTag,
}: VideoTestimonialsSectionProps) {
  if (!content || !content.videos || content.videos.length === 0) {
    return null;
  }

  const data = content;
  const videos = data.videos;

  // Determine background style
  const bgStyle: React.CSSProperties = {
    backgroundColor: data.backgroundColor || "#cfab57",
  };

  if (data.backgroundImage) {
    bgStyle.backgroundImage = `url(${data.backgroundImage})`;
    bgStyle.backgroundSize = "cover";
    bgStyle.backgroundPosition = "center";
  }

  return (
    <div className="w-full py-16 md:py-24" style={bgStyle}>
      <div className="max-w-[1280px] mx-auto w-[95%]">
        {/* Title */}
        {data.heading && (
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block">
              {headingTag ? (
                // @ts-ignore
                <headingTag className="text-2xl md:text-5xl font-bold text-black block">
                  {data.heading}
                </headingTag>
              ) : (
                <h2 className="text-2xl md:text-[48px] font-bold text-black">
                  {data.heading}
                </h2>
              )}
              <div className="h-px bg-black mt-4"></div>
            </div>
          </div>
        )}

        {/* Video Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {videos.map((video, index) => {
            const embedUrl = getVideoEmbedUrl(video.videoUrl);

            // Debug log to help troubleshoot
            if (embedUrl) {
              console.log(`Video ${index + 1}: Original="${video.videoUrl}" → Converted="${embedUrl}"`);
            }

            return (
              <div key={index} className="flex flex-col items-center">
                {/* Video Container */}
                <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg">
                  {embedUrl && (
                    <iframe
                      src={embedUrl}
                      title={video.title || `Video ${index + 1}`}
                      className="w-full h-auto"
                      style={{
                        aspectRatio: "16 / 9",
                        minHeight: "300px",
                        border: "none"
                      }}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  )}
                </div>

                {/* Video Title */}
                {video.title && (
                  <p className="mt-4 text-black font-semibold text-center text-sm md:text-base">
                    {video.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
