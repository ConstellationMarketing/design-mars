import { useState, useEffect } from "react";
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
      <div className="max-w-[1280px] mx-auto w-[95%]">
        {/* Blog Content Card with title inside - left aligned 2 column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="bg-white border-l-4 border-brand-accent p-8 md:p-10" style={{ boxShadow: "8px 8px 16px rgba(0, 0, 0, 0.15)" }}>
            {/* Title inside box */}
            {data.heading && (
              <div className="mb-6 pb-6 border-b border-brand-accent">
                {headingTag ? (
                  // @ts-ignore
                  <headingTag className="text-xl md:text-[48px] font-bold text-black">
                    {data.heading}
                  </headingTag>
                ) : (
                  <h2 className="text-xl md:text-[48px] font-bold text-black">
                    {data.heading}
                  </h2>
                )}
              </div>
            )}

            {/* Description and blog posts with dividers */}
            <div className="mb-8">
              {/* Description */}
              {data.description && (
                <div className="pb-5 border-b border-gray-300">
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{data.description}</p>
                </div>
              )}

              {/* Blog Posts */}
              {!loading && posts.length > 0 && (
                <div className="space-y-0">
                  {posts.map((post, index) => (
                    <div key={index} className="border-b border-gray-300">
                      <Link
                        to={`/blog/${post.slug}/`}
                        className="block py-5 group hover:text-brand-accent transition-colors duration-300"
                      >
                        <h3 className="font-poppins font-semibold text-gray-700 group-hover:text-brand-accent text-sm md:text-base">
                          {post.title}
                        </h3>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {loading && (
                <p className="text-gray-500 py-5">Loading blog posts...</p>
              )}

              {!loading && posts.length === 0 && (
                <p className="text-gray-500 py-5">No blog posts available.</p>
              )}
            </div>

            {/* Button */}
            {data.buttonText && data.buttonLink && (
              <div className="flex justify-start">
                <div className="inline-block border-2 border-brand-accent p-1 hover:border-black transition-all duration-300 hover:bg-black">
                  <Link
                    to={data.buttonLink}
                    className="group inline-block bg-brand-accent border-2 border-black px-10 py-5 hover:bg-black hover:border-black transition-all duration-300"
                  >
                    <span className="font-poppins text-[18px] font-semibold uppercase text-black group-hover:text-white transition-colors duration-300">
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
