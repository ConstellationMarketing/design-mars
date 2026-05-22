import type { VideoTestimonialsContent } from "@site/lib/cms/homePageTypes";

interface VideoTestimonialsSectionProps {
  content?: VideoTestimonialsContent;
  headingTag?: string;
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
      <div className="max-w-7xl mx-auto px-4">
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
                <h2 className="text-2xl md:text-5xl font-bold text-black">
                  {data.heading}
                </h2>
              )}
              <div className="h-px bg-black mt-4"></div>
            </div>
          </div>
        )}

        {/* Video Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {videos.map((video, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Video Container */}
              <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg">
                {video.videoUrl && (
                  <iframe
                    src={video.videoUrl}
                    title={video.title || `Video ${index + 1}`}
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
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
          ))}
        </div>
      </div>
    </div>
  );
}
