import { User, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { normalizeSlug } from "@site/lib/utils";
import { loadRecentPosts } from "@site/lib/cms/publicLoaders";
import type { PreloadedPostDocument } from "@site/lib/cms/publicLoaders";

interface FeaturedArticleProps {
  sectionTitle: string;
}

export default function FeaturedArticle({ sectionTitle }: FeaturedArticleProps) {
  const [post, setPost] = useState<PreloadedPostDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedPost() {
      try {
        const recentPosts = await loadRecentPosts(1);
        if (recentPosts.length > 0) {
          setPost(recentPosts[0]);
        }
      } catch (err) {
        console.error("Error fetching featured post:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedPost();
  }, []);

  if (loading || !post) {
    return null;
  }

  const displayDate = post.published_at || post.created_at;
  const cleanSlug = normalizeSlug(post.slug);
  const fallbackOgImage = typeof post.og_image === "string" ? post.og_image : post.og_image?.url || "";
  const cardImage = post.featured_image || fallbackOgImage;
  const categoryName = post.post_categories?.name || "Blog";

  return (
    <section style={{ background: "#f5f5f5", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={{ display: "inline-block" }}>
            <h2 style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#111",
              margin: "0 0 12px 0",
              fontFamily: "Poppins, sans-serif"
            }}>
              {sectionTitle}
            </h2>
            <div style={{
              width: "80px",
              height: "2px",
              background: "#C9A84C",
              margin: "0 auto"
            }}></div>
          </div>
        </div>

        {/* Featured Post - Two Column Layout */}
        <div style={{
          display: "flex",
          gap: "48px",
          alignItems: "stretch",
          "@media (max-width: 768px)": {
            flexDirection: "column",
            gap: "0"
          }
        }} className="flex gap-12 lg:gap-12 md:flex-col">
          {/* Left - Image */}
          <div style={{
            position: "relative",
            flex: "1",
            minWidth: 0
          }}>
            {cardImage ? (
              <img
                src={cardImage}
                alt={post.title}
                style={{
                  width: "100%",
                  height: "380px",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            ) : (
              <div style={{
                width: "100%",
                height: "380px",
                background: "linear-gradient(135deg, #183658 0%, #0f2742 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <span style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "60px",
                  fontWeight: "300",
                  fontFamily: "Poppins, sans-serif"
                }}>
                  {post.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Category Badge */}
            <span style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              background: "#C9A84C",
              color: "#111",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              padding: "4px 10px",
              letterSpacing: "1px",
              borderRadius: "2px"
            }}>
              {categoryName}
            </span>
          </div>

          {/* Right - Content */}
          <div style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "16px",
            paddingLeft: "48px"
          }} className="md:pl-0 md:pt-6">
            {/* Title */}
            <h3 style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#111",
              lineHeight: "1.4",
              margin: 0,
              fontFamily: "Poppins, sans-serif"
            }}>
              {post.title}
            </h3>

            {/* Excerpt */}
            {post.excerpt && (
              <p style={{
                fontSize: "16px",
                color: "#555",
                lineHeight: "1.7",
                margin: 0
              }}>
                {post.excerpt}
              </p>
            )}

            {/* Author and Date */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontSize: "14px",
              color: "#888"
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <User style={{ width: "14px", height: "14px" }} />
                Author
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Calendar style={{ width: "14px", height: "14px" }} />
                {new Date(displayDate || Date.now()).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* CTA Button */}
            <div style={{ marginTop: "8px" }}>
              <Link
                to={`/blog/${cleanSlug}/`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  background: "#C9A84C",
                  color: "#111",
                  fontWeight: "700",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  textDecoration: "none",
                  border: "2px solid #8B6914",
                  outline: "1px solid #C9A84C",
                  outlineOffset: "4px",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#d1ab58";
                  e.currentTarget.style.borderColor = "#a0821a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#C9A84C";
                  e.currentTarget.style.borderColor = "#8B6914";
                }}
              >
                READ FULL ARTICLE →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
