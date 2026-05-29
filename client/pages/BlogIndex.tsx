import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import BlogHero from "@site/components/blog/BlogHero";
import RecentBlogPosts from "@site/components/blog/RecentBlogPosts";
import { useBlogContent } from "@site/hooks/useBlogContent";
import { Loader2 } from "lucide-react";

export default function BlogIndex() {
  const { hero, recentPosts, meta, title, publishedAt, updatedAt, isLoading } = useBlogContent();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-brand-accent" />
        </div>
      </Layout>
    );
  }

  const heroBackgroundImage = hero.backgroundImage || 'https://atzgmwcxbdnswerpqzzi.supabase.co/storage/v1/object/public/media/library/1779351750724-20d0za.webp';

  return (
    <Layout heroBackgroundImage={heroBackgroundImage}>
      <Seo
        title={title || "Blog"}
        meta={meta}
        publishedTime={publishedAt}
        updatedTime={updatedAt}
      />

      {/* Hero - CMS-driven, matches About page style */}
      <BlogHero hero={hero} />

      {/* Recent Blog Posts - 6 latest */}
      <RecentBlogPosts data={recentPosts} />
    </Layout>
  );
}
