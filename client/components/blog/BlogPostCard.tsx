import { Link } from "react-router-dom";
import { User, Calendar } from "lucide-react";
import { normalizeSlug } from "@site/lib/utils";
import type { PreloadedPostDocument } from "@site/lib/cms/publicLoaders";

interface BlogPostCardProps {
  post: PreloadedPostDocument;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const displayDate = post.published_at || post.created_at;
  const cleanSlug = normalizeSlug(post.slug);
  const fallbackOgImage = typeof post.og_image === "string" ? post.og_image : post.og_image?.url || "";
  const cardImage = post.featured_image || fallbackOgImage;
  const categoryName = post.post_categories?.name || "Blog";

  return (
    <Link
      to={`/blog/${cleanSlug}/`}
      style={{
        display: "block",
        background: "#fff",
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        textDecoration: "none",
        color: "inherit"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      }}
    >
      {/* Image Container with Category Badge */}
      <div style={{ position: "relative", width: "100%", height: "220px", overflow: "hidden" }}>
        {cardImage ? (
          <img
            src={cardImage}
            alt={post.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
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
          top: "12px",
          left: "12px",
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

      {/* Content Container */}
      <div style={{ padding: "20px" }}>
        {/* Title */}
        <h3 style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#111",
          marginBottom: "10px",
          lineHeight: "1.4",
          margin: "0 0 10px 0",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p style={{
            fontSize: "14px",
            color: "#666",
            lineHeight: "1.6",
            marginBottom: "16px",
            margin: "0 0 16px 0",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}>
            {post.excerpt}
          </p>
        )}

        {/* Author and Date Row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "13px",
          color: "#888",
          marginBottom: "16px",
          margin: "0 0 16px 0"
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <User style={{ width: "14px", height: "14px" }} />
            Author
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Calendar style={{ width: "14px", height: "14px" }} />
            {new Date(displayDate || Date.now()).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Read More Link */}
        <a href={`/blog/${cleanSlug}/`} style={{
          color: "#C9A84C",
          fontWeight: "600",
          fontSize: "14px",
          textDecoration: "none",
          transition: "color 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#d1ab58";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#C9A84C";
        }}>
          Read More →
        </a>
      </div>
    </Link>
  );
}
