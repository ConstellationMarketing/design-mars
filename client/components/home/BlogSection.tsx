import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogSectionContent, PreloadedPostDocument } from "@site/lib/cms/homePageTypes";
import { loadRecentPosts } from "@site/lib/cms/publicLoaders";

interface BlogSectionProps {
  content?: BlogSectionContent;
  headingTag?: string;
}

export default function BlogSection({
  content,
  headingTag,
}: BlogSectionProps) {
  const [posts, setPosts] = useState<PreloadedPostDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const recentPosts = await loadRecentPosts(3);
        setPosts(recentPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (!content) {
    return null;
  }

  const data = content;

  // Determine background style
  const bgStyle: React.CSSProperties = {
    backgroundColor: data.backgroundColor || "#f5f5f5",
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
                <headingTag className="text-4xl md:text-5xl font-bold text-black block">
                  {data.heading}
                </headingTag>
              ) : (
                <h2 className="text-4xl md:text-5xl font-bold text-black">
                  {data.heading}
                </h2>
              )}
              <div className="h-px bg-brand-accent mt-4"></div>
            </div>
          </div>
        )}

        {/* Blog Content Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-t-4 border-brand-accent rounded-lg p-8 md:p-12 shadow-lg">
            {/* Description paragraphs from first post or default */}
            <div className="space-y-4 mb-8 text-gray-700 text-base leading-relaxed">
              {data.description && (
                <p>{data.description}</p>
              )}

              {!loading && posts.length > 0 && (
                <>
                  {posts.slice(0, 2).map((post, index) => (
                    <p key={index}>{post.excerpt || post.title}</p>
                  ))}
                </>
              )}

              {loading && (
                <p className="text-gray-500">Loading blog posts...</p>
              )}
            </div>

            {/* Button */}
            {data.buttonText && data.buttonLink && (
              <div className="flex justify-start">
                <div className="inline-block border-2 border-brand-accent p-1 hover:border-black transition-all duration-300 hover:bg-black">
                  <Link
                    to={data.buttonLink}
                    className="group inline-block bg-brand-accent border-2 border-black px-6 md:px-8 py-2 md:py-3 hover:bg-black hover:border-black transition-all duration-300"
                  >
                    <span className="font-poppins text-[12px] md:text-[14px] font-semibold uppercase text-black group-hover:text-white transition-colors duration-300">
                      {data.buttonText}
                    </span>
                    <span className="ml-2 text-black group-hover:text-white transition-colors duration-300">›</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
