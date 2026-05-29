import type { BlogHeroData, RecentPostsConfig, FeaturedArticleConfig } from "@site/lib/cms/publicLoaders";
import { Section, ImageField, HeadingField, Input, Label } from "./EditorShared";

interface BlogEditorProps {
  content: { hero: BlogHeroData; recentPosts: RecentPostsConfig; featuredArticle: FeaturedArticleConfig };
  onSave: (c: { hero: BlogHeroData; recentPosts: RecentPostsConfig; featuredArticle: FeaturedArticleConfig }) => void;
}

export default function BlogEditor({ content, onSave }: BlogEditorProps) {
  const update = <K extends keyof typeof content>(key: K, value: typeof content[K]) => {
    onSave({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <HeroSection content={content} update={update} />
      <FeaturedArticleSection content={content} update={update} />
      <RecentPostsSection content={content} update={update} />
    </div>
  );
}

/* ========== Types ========== */
type Updater = <K extends keyof typeof content>(key: K, value: any) => void;

interface SectionProps {
  content: { hero: BlogHeroData; recentPosts: RecentPostsConfig; featuredArticle: FeaturedArticleConfig };
  update: Updater;
}

function useHeadingTag(content: { hero: BlogHeroData }, update: Updater) {
  return {
    get: (key: string) => content.hero.headingTags?.[key as keyof typeof content.hero.headingTags] ?? "h2",
    set: (key: string, tag: string) => {
      const hero = content.hero as any;
      update("hero", { ...hero, headingTags: { ...hero.headingTags, [key]: tag } });
    },
  };
}

/* ========== Section 1: Hero Section ========== */
function HeroSection({ content, update }: SectionProps) {
  const hero = content.hero;
  const set = (patch: Partial<typeof hero>) => update("hero", { ...hero, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Hero Section">
      <div className="grid gap-4">
        <p className="text-xs text-gray-600 mb-2">Fully independent from Home, About, and Practice Areas pages</p>
        <HeadingField
          label="H1 Title"
          value={hero.h1Title}
          onChange={(v) => set({ h1Title: v })}
          tag={ht.get("hero.h1Title")}
          onTagChange={(t) => ht.set("hero.h1Title", t)}
        />
        <div>
          <Label>Headline</Label>
          <Input value={hero.headline} onChange={(e) => set({ headline: e.target.value })} />
        </div>
        <div>
          <Label>Highlighted Text</Label>
          <Input value={hero.highlightedText} onChange={(e) => set({ highlightedText: e.target.value })} />
        </div>
        <div>
          <Label>Tagline</Label>
          <Input value={hero.tagline} onChange={(e) => set({ tagline: e.target.value })} />
        </div>
        <div>
          <Label>Button Text</Label>
          <Input value={hero.buttonText} onChange={(e) => set({ buttonText: e.target.value })} />
        </div>
        <ImageField
          label="Background Image"
          value={hero.backgroundImage || ""}
          onChange={(url) => set({ backgroundImage: url })}
          folder="blog"
        />
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
      </div>
    </Section>
  );
}

/* ========== Section 2: Featured Article Section ========== */
function FeaturedArticleSection({ content, update }: SectionProps) {
  const featuredArticle = content.featuredArticle;
  const set = (patch: Partial<typeof featuredArticle>) => update("featuredArticle", { ...featuredArticle, ...patch });

  return (
    <Section title="Featured Article Section" defaultOpen={false}>
      <div className="grid gap-4">
        <p className="text-xs text-gray-600 mb-2">Configure the featured article section title (displays the latest blog post automatically)</p>
        <div>
          <Label>Section Title</Label>
          <Input value={featuredArticle.sectionTitle} onChange={(e) => set({ sectionTitle: e.target.value })} placeholder="e.g., Featured Article" />
        </div>
      </div>
    </Section>
  );
}

/* ========== Section 3: Recent Posts Section ========== */
function RecentPostsSection({ content, update }: SectionProps) {
  const recentPosts = content.recentPosts;
  const set = (patch: Partial<typeof recentPosts>) => update("recentPosts", { ...recentPosts, ...patch });

  return (
    <Section title="Recent Posts Section" defaultOpen={false}>
      <div className="grid gap-4">
        <p className="text-xs text-gray-600 mb-2">Configure the recent blog posts display</p>
        <div>
          <Label>Section Label</Label>
          <Input value={recentPosts.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} placeholder="e.g., LATEST INSIGHTS" />
        </div>
        <div>
          <Label>Heading</Label>
          <Input value={recentPosts.heading} onChange={(e) => set({ heading: e.target.value })} placeholder="e.g., Recent Blog Posts" />
        </div>
        <div>
          <Label>Post Count</Label>
          <Input type="number" value={recentPosts.postCount} onChange={(e) => set({ postCount: parseInt(e.target.value) || 6 })} min="1" max="20" />
        </div>
      </div>
    </Section>
  );
}
