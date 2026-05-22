import type { HomePageContent } from "@site/lib/cms/homePageTypes";
import { Section, ArrayEditor, ImageField, RichTextField, HeadingField, Input, Label, Textarea } from "./EditorShared";

interface HomeEditorProps {
  content: HomePageContent;
  onChange: (c: HomePageContent) => void;
}

export default function HomeEditor({ content, onChange }: HomeEditorProps) {
  const update = <K extends keyof HomePageContent>(key: K, value: HomePageContent[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <HeroSection content={content} update={update} />
      <PartnerLogosSection content={content} update={update} />
      <StatsSectionEditor content={content} update={update} />
      <AboutSectionEditor content={content} update={update} />
      <PracticeAreasIntroSection content={content} update={update} />
      <AwardsSection content={content} update={update} />
      <TestimonialsSection content={content} update={update} />
      <VideoTestimonialsSection content={content} update={update} />
      <ProcessSection content={content} update={update} />
      <GoogleReviewsSection content={content} update={update} />
      <FaqSectionEditor content={content} update={update} />
      <ContactSectionEditor content={content} update={update} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
type Updater = <K extends keyof HomePageContent>(key: K, value: HomePageContent[K]) => void;
type SectionProps = { content: HomePageContent; update: Updater };

function useHeadingTag(content: HomePageContent, update: Updater) {
  return {
    get: (key: string) => content.headingTags?.[key] ?? "h2",
    set: (key: string, tag: string) =>
      update("headingTags", { ...content.headingTags, [key]: tag }),
  };
}

/* ------------------------------------------------------------------ */
function HeroSection({ content, update }: SectionProps) {
  const hero = content.hero;
  const set = (patch: Partial<typeof hero>) => update("hero", { ...hero, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Hero Section">
      <div className="grid gap-4">
        <HeadingField
          label="H1 Title"
          value={hero.h1Title}
          onChange={(v) => set({ h1Title: v })}
          tag={ht.get("hero.h1Title") === "h2" ? "h1" : ht.get("hero.h1Title")}
          onTagChange={(t) => ht.set("hero.h1Title", t)}
        />
        <div>
          <Label>Full Headline</Label>
          <Input value={hero.headline} onChange={(e) => set({ headline: e.target.value })} />
          <p className="text-xs text-gray-500 mt-1">The complete headline sentence displayed in the hero</p>
        </div>
        <div>
          <Label>Highlighted Text</Label>
          <Input value={hero.highlightedText} onChange={(e) => set({ highlightedText: e.target.value })} />
          <p className="text-xs text-gray-500 mt-1">Enter the exact portion of the headline to display in accent color</p>
        </div>
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function PartnerLogosSection({ content, update }: SectionProps) {
  return (
    <Section title="Partner Logos" defaultOpen={false}>
      <ArrayEditor
        items={content.partnerLogos}
        onChange={(items) => update("partnerLogos", items)}
        itemLabel="Logo"
        newItem={() => ({ src: "", alt: "" })}
        renderItem={(item, _, upd) => (
          <div className="grid gap-3">
            <ImageField
              label="Logo Image"
              value={item.src}
              onChange={(url) => upd({ ...item, src: url })}
              altValue={item.alt}
              onAltChange={(alt) => upd({ ...item, alt })}
              onSelectAsset={(asset) => upd({
                ...item,
                src: asset.url,
                alt: asset.suggestedAltText || item.alt,
              })}
              folder="logos"
            />
            <div>
              <Label>Alt Text</Label>
              <Input value={item.alt} onChange={(e) => upd({ ...item, alt: e.target.value })} />
            </div>
          </div>
        )}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function StatsSectionEditor({ content, update }: SectionProps) {
  const stats = content.stats;
  const set = (patch: Partial<typeof stats>) => update("stats", { ...stats, ...patch });

  return (
    <Section title="Stats Section (Case Wins)" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Total Amount Won</Label>
          <Input value={stats.totalAmount} onChange={(e) => set({ totalAmount: e.target.value })} placeholder="$1,662,903,076" />
        </div>
        <div>
          <Label>Total Label</Label>
          <Input value={stats.totalLabel} onChange={(e) => set({ totalLabel: e.target.value })} placeholder="WON FOR CLIENTS" />
        </div>
        <h4 className="font-medium mt-2">Case Types & Amounts</h4>
        <ArrayEditor
          items={stats.cases}
          onChange={(items) => set({ cases: items })}
          itemLabel="Case Type"
          newItem={() => ({ label: "", amount: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Case Type Label</Label>
                <Input value={item.label} onChange={(e) => upd({ ...item, label: e.target.value })} placeholder="e.g. CAR ACCIDENT" />
              </div>
              <div>
                <Label>Amount Won</Label>
                <Input value={item.amount} onChange={(e) => upd({ ...item, amount: e.target.value })} placeholder="e.g. $1 MILLION" />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function AboutSectionEditor({ content, update }: SectionProps) {
  const homeAbout = content.homeAbout;
  const set = (patch: Partial<typeof homeAbout>) => update("homeAbout", { ...homeAbout, ...patch });

  return (
    <Section title="About Section" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Heading</Label>
          <Input
            value={homeAbout.heading}
            onChange={(e) => set({ heading: e.target.value })}
            placeholder="When It Matters Most, We're On Your Side."
          />
        </div>

        <h4 className="font-medium mt-4">Experience Box (Left Side)</h4>
        <div>
          <Label>Experience Title (above number)</Label>
          <Input value={homeAbout.experienceTitle} onChange={(e) => set({ experienceTitle: e.target.value })} placeholder="OVER" />
        </div>
        <div>
          <Label>Years Number</Label>
          <Input value={homeAbout.yearsNumber} onChange={(e) => set({ yearsNumber: e.target.value })} placeholder="150" />
        </div>
        <div>
          <Label>Years Label (below number)</Label>
          <Input value={homeAbout.yearsLabel} onChange={(e) => set({ yearsLabel: e.target.value })} placeholder="YEARS OF EXPERIENCE" />
        </div>
        <div>
          <Label>Experience Description</Label>
          <Textarea
            value={homeAbout.experienceDescription}
            onChange={(e) => set({ experienceDescription: e.target.value })}
            placeholder="Description text about the firm..."
            rows={4}
          />
        </div>

        <h4 className="font-medium mt-4">Features (Right Side - 5 items)</h4>
        <ArrayEditor
          items={homeAbout.features}
          onChange={(items) => set({ features: items })}
          itemLabel="Feature"
          newItem={() => ({ title: "", description: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Feature Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} placeholder="e.g. AMAZING TEAM" />
              </div>
              <div>
                <Label>Feature Description</Label>
                <Textarea
                  value={item.description}
                  onChange={(e) => upd({ ...item, description: e.target.value })}
                  placeholder="Feature description text..."
                  rows={3}
                />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function LegacyAboutSectionEditor({ content, update }: SectionProps) {
  const about = content.about;
  const set = (patch: Partial<typeof about>) => update("about", { ...about, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Unused - Legacy About Section" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={about.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("about.sectionLabel")}
          onTagChange={(t) => ht.set("about.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle</Label>
          <Input value={about.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
        <RichTextField label="Description" value={about.description} onChange={(v) => set({ description: v })} />
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Contact Label</Label>
            <Input value={about.contactLabel} onChange={(e) => set({ contactLabel: e.target.value })} />
          </div>
          <div>
            <Label>Contact Text</Label>
            <Input value={about.contactText} onChange={(e) => set({ contactText: e.target.value })} />
          </div>
        </div>
        <ImageField
          label="Attorney Image"
          value={about.attorneyImage}
          onChange={(url) => set({ attorneyImage: url })}
          altValue={about.attorneyImageAlt}
          onAltChange={(attorneyImageAlt) => set({ attorneyImageAlt })}
          onSelectAsset={(asset) => set({
            attorneyImage: asset.url,
            attorneyImageAlt: asset.suggestedAltText || about.attorneyImageAlt,
          })}
          folder="team"
        />
        <div>
          <Label>Attorney Image Alt</Label>
          <Input value={about.attorneyImageAlt} onChange={(e) => set({ attorneyImageAlt: e.target.value })} />
        </div>

        <h4 className="font-medium mt-2">Features</h4>
        <ArrayEditor
          items={about.features}
          onChange={(items) => set({ features: items })}
          itemLabel="Feature"
          newItem={() => ({ number: String(about.features.length + 1), title: "", description: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label>Number</Label>
                  <Input value={item.number} onChange={(e) => upd({ ...item, number: e.target.value })} />
                </div>
                <div className="col-span-3">
                  <Label>Title</Label>
                  <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
                </div>
              </div>
              <RichTextField label="Description" value={item.description} onChange={(v) => upd({ ...item, description: v })} />
            </div>
          )}
        />

        <h4 className="font-medium mt-2">Stats</h4>
        <ArrayEditor
          items={about.stats}
          onChange={(items) => set({ stats: items })}
          itemLabel="Stat"
          newItem={() => ({ value: "", label: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Value</Label>
                <Input value={item.value} onChange={(e) => upd({ ...item, value: e.target.value })} />
              </div>
              <div>
                <Label>Label</Label>
                <Input value={item.label} onChange={(e) => upd({ ...item, label: e.target.value })} />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function PracticeAreasIntroSection({ content, update }: SectionProps) {
  const intro = content.practiceAreasIntro;
  const set = (patch: Partial<typeof intro>) => update("practiceAreasIntro", { ...intro, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Practice Areas Intro" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Title"
          value={intro.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("practiceAreasIntro.sectionLabel")}
          onTagChange={(t) => ht.set("practiceAreasIntro.sectionLabel", t)}
        />
        <div>
          <Label>Main Heading</Label>
          <Input value={intro.heading} onChange={(e) => set({ heading: e.target.value })} placeholder="Where We Fight For You" />
        </div>
        <div>
          <Label>Button Link</Label>
          <Input value={intro.buttonLink} onChange={(e) => set({ buttonLink: e.target.value })} placeholder="/practice-areas/" />
        </div>
        <div>
          <Label>Button Text</Label>
          <Input value={intro.buttonTextLine1 || ""} onChange={(e) => set({ buttonTextLine1: e.target.value })} placeholder="SEE ALL AREAS OF PRACTICE" />
        </div>

        <h4 className="font-medium mt-4">Practice Areas (8 items)</h4>
        <ArrayEditor
          items={content.practiceAreas}
          onChange={(items) => update("practiceAreas", items)}
          itemLabel="Practice Area"
          newItem={() => ({ title: "", image: "", imageAlt: "", link: "/practice-areas", learnMoreLink: "/practice-areas", consultationLink: "/contact/" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} placeholder="e.g. CAR ACCIDENTS" />
              </div>
              <ImageField
                label="Image"
                value={item.image}
                onChange={(url) => upd({ ...item, image: url })}
                altValue={item.imageAlt}
                onAltChange={(imageAlt) => upd({ ...item, imageAlt })}
                onSelectAsset={(asset) => upd({
                  ...item,
                  image: asset.url,
                  imageAlt: asset.suggestedAltText || item.imageAlt,
                })}
                folder="practice-areas"
              />
              <div>
                <Label>Image Alt Text</Label>
                <Input value={item.imageAlt} onChange={(e) => upd({ ...item, imageAlt: e.target.value })} placeholder="Describe the image" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Main Link</Label>
                  <Input value={item.link} onChange={(e) => upd({ ...item, link: e.target.value })} placeholder="/practice-areas/car-accidents/" />
                </div>
                <div>
                  <Label>"Learn More" Link</Label>
                  <Input value={item.learnMoreLink || ""} onChange={(e) => upd({ ...item, learnMoreLink: e.target.value })} placeholder="/practice-areas/car-accidents/" />
                </div>
              </div>
              <div>
                <Label>"Free Consultation" Link</Label>
                <Input value={item.consultationLink || ""} onChange={(e) => upd({ ...item, consultationLink: e.target.value })} placeholder="/contact/" />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function AwardsSection({ content, update }: SectionProps) {
  const awards = content.awards;
  const set = (patch: Partial<typeof awards>) => update("awards", { ...awards, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Awards & Memberships" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={awards.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("awards.sectionLabel")}
          onTagChange={(t) => ht.set("awards.sectionLabel", t)}
        />
        <div>
          <Label>Title</Label>
          <Input value={awards.heading} onChange={(e) => set({ heading: e.target.value })} placeholder="Press & Recognition" />
        </div>
        <RichTextField label="Description" value={awards.description} onChange={(v) => set({ description: v })} />

        <h4 className="font-medium mt-6">Left Side - Logo Image</h4>
        <ImageField
          label="Logo Image"
          value={awards.logoImage}
          onChange={(url) => set({ logoImage: url })}
          altValue={awards.logoImageAlt}
          onAltChange={(alt) => set({ logoImageAlt: alt })}
          onSelectAsset={(asset) => set({
            logoImage: asset.url,
            logoImageAlt: asset.suggestedAltText || awards.logoImageAlt,
          })}
          folder="awards"
        />

        <h4 className="font-medium mt-6">Right Side - Team Photo</h4>
        <ImageField
          label="Team Photo"
          value={awards.teamImage}
          onChange={(url) => set({ teamImage: url })}
          altValue={awards.teamImageAlt}
          onAltChange={(alt) => set({ teamImageAlt: alt })}
          onSelectAsset={(asset) => set({
            teamImage: asset.url,
            teamImageAlt: asset.suggestedAltText || awards.teamImageAlt,
          })}
          folder="awards"
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function TestimonialsSection({ content, update }: SectionProps) {
  const t = content.testimonials;
  const set = (patch: Partial<typeof t>) => update("testimonials", { ...t, ...patch });
  const ht = useHeadingTag(content, update);

  const badgeOptions = [
    { label: "Google", value: "google" },
    { label: "Facebook", value: "facebook" },
    { label: "Yelp", value: "yelp" },
    { label: "Trustpilot", value: "trustpilot" },
    { label: "Avvo", value: "avvo" },
  ];

  return (
    <Section title="Testimonials" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={t.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("testimonials.sectionLabel")}
          onTagChange={(t2) => ht.set("testimonials.sectionLabel", t2)}
        />
        <div>
          <Label>Title</Label>
          <Input value={t.heading} onChange={(e) => set({ heading: e.target.value })} placeholder="Committed To Excellence" />
        </div>
        <ArrayEditor
          items={t.items}
          onChange={(items) => set({ items })}
          itemLabel="Testimonial"
          newItem={() => ({ text: "", author: "", clientType: "", badgeType: "google", badgeServiceName: "Google", badgeLogo: "", badgeLogoAlt: "", badgeStarCount: 5, badgeRating: "5.0" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Testimonial Text</Label>
                <Textarea value={item.text} onChange={(e) => upd({ ...item, text: e.target.value })} placeholder="Enter testimonial text..." />
              </div>
              <div>
                <Label>Author Name</Label>
                <Input value={item.author} onChange={(e) => upd({ ...item, author: e.target.value })} placeholder="e.g., Maria Gonzalez" />
              </div>
              <div>
                <Label>Client Type</Label>
                <Input value={item.clientType} onChange={(e) => upd({ ...item, clientType: e.target.value })} placeholder="e.g., CAR ACCIDENT CLIENT" />
              </div>
              <h4 className="font-medium mt-4">Badge Section</h4>
              <div>
                <Label>Badge Type</Label>
                <select
                  value={item.badgeType}
                  onChange={(e) => upd({ ...item, badgeType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
                >
                  {badgeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Service Name (e.g., Google)</Label>
                <Input value={item.badgeServiceName || ""} onChange={(e) => upd({ ...item, badgeServiceName: e.target.value })} placeholder="Google" />
              </div>
              <ImageField
                label="Service Logo"
                value={item.badgeLogo}
                onChange={(url) => upd({ ...item, badgeLogo: url })}
                altValue={item.badgeLogoAlt || ""}
                onAltChange={(badgeLogoAlt) => upd({ ...item, badgeLogoAlt })}
                onSelectAsset={(asset) => upd({
                  ...item,
                  badgeLogo: asset.url,
                  badgeLogoAlt: asset.suggestedAltText || item.badgeLogoAlt || "",
                })}
                folder="badges"
              />
              <div>
                <Label>Number of Stars</Label>
                <select
                  value={item.badgeStarCount || 5}
                  onChange={(e) => upd({ ...item, badgeStarCount: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>
              <div>
                <Label>Rating Number</Label>
                <Input value={item.badgeRating || ""} onChange={(e) => upd({ ...item, badgeRating: e.target.value })} placeholder="5.0" />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function VideoTestimonialsSection({ content, update }: SectionProps) {
  const vt = content.videoTestimonials;
  const set = (patch: Partial<typeof vt>) => update("videoTestimonials", { ...vt, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Video Testimonials" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={vt.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("videoTestimonials.sectionLabel")}
          onTagChange={(t) => ht.set("videoTestimonials.sectionLabel", t)}
        />
        <div>
          <Label>Title</Label>
          <Input value={vt.heading} onChange={(e) => set({ heading: e.target.value })} placeholder="Hear What Our Clients Have to Say" />
        </div>
        <div>
          <Label>Background Color</Label>
          <Input type="color" value={vt.backgroundColor || "#cfab57"} onChange={(e) => set({ backgroundColor: e.target.value })} />
        </div>
        <ImageField
          label="Background Image (Optional)"
          value={vt.backgroundImage}
          onChange={(url) => set({ backgroundImage: url })}
          altValue={vt.backgroundImageAlt || ""}
          onAltChange={(backgroundImageAlt) => set({ backgroundImageAlt })}
          onSelectAsset={(asset) => set({
            backgroundImage: asset.url,
            backgroundImageAlt: asset.suggestedAltText || vt.backgroundImageAlt || "",
          })}
          folder="backgrounds"
        />
        <h4 className="font-medium mt-4">Videos (2 recommended)</h4>
        <ArrayEditor
          items={vt.videos}
          onChange={(items) => set({ videos: items })}
          itemLabel="Video"
          newItem={() => ({ title: "", videoUrl: "", thumbnailImage: "", thumbnailImageAlt: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Video Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} placeholder="Video title" />
              </div>
              <div>
                <Label>Video URL (embed URL from YouTube/Vimeo)</Label>
                <Input value={item.videoUrl} onChange={(e) => upd({ ...item, videoUrl: e.target.value })} placeholder="https://www.youtube.com/embed/VIDEO_ID" />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function ProcessSection({ content, update }: SectionProps) {
  const p = content.process;
  const set = (patch: Partial<typeof p>) => update("process", { ...p, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Process Steps" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={p.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("process.sectionLabel")}
          onTagChange={(t) => ht.set("process.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle Line 1</Label>
          <Input value={p.headingLine1} onChange={(e) => set({ headingLine1: e.target.value })} />
        </div>
        <div>
          <Label>Subtitle Line 2</Label>
          <Input value={p.headingLine2} onChange={(e) => set({ headingLine2: e.target.value })} />
        </div>
        <ArrayEditor
          items={p.steps}
          onChange={(items) => set({ steps: items })}
          itemLabel="Step"
          newItem={() => ({ number: "", title: "", description: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label>Number</Label>
                  <Input value={item.number} onChange={(e) => upd({ ...item, number: e.target.value })} />
                </div>
                <div className="col-span-3">
                  <Label>Title</Label>
                  <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
                </div>
              </div>
              <RichTextField label="Description" value={item.description} onChange={(v) => upd({ ...item, description: v })} />
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function GoogleReviewsSection({ content, update }: SectionProps) {
  const r = content.googleReviews;
  const set = (patch: Partial<typeof r>) => update("googleReviews", { ...r, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Google Reviews" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={r.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("googleReviews.sectionLabel")}
          onTagChange={(t) => ht.set("googleReviews.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle</Label>
          <Input value={r.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
        <RichTextField label="Description" value={r.description} onChange={(v) => set({ description: v })} />
        <ArrayEditor
          items={r.reviews}
          onChange={(items) => set({ reviews: items })}
          itemLabel="Review"
          newItem={() => ({ text: "", author: "", ratingImage: "", ratingImageAlt: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Author</Label>
                <Input value={item.author} onChange={(e) => upd({ ...item, author: e.target.value })} />
              </div>
              <RichTextField label="Review Text" value={item.text} onChange={(v) => upd({ ...item, text: v })} />
              <ImageField
                label="Rating Image"
                value={item.ratingImage}
                onChange={(url) => upd({ ...item, ratingImage: url })}
                altValue={item.ratingImageAlt || ""}
                onAltChange={(ratingImageAlt) => upd({ ...item, ratingImageAlt })}
                onSelectAsset={(asset) => upd({
                  ...item,
                  ratingImage: asset.url,
                  ratingImageAlt: asset.suggestedAltText || item.ratingImageAlt || "",
                })}
                folder="logos"
              />
              <div>
                <Label>Rating Image Alt Text</Label>
                <Input value={item.ratingImageAlt || ""} onChange={(e) => upd({ ...item, ratingImageAlt: e.target.value })} placeholder="e.g. 5 star rating" />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function FaqSectionEditor({ content, update }: SectionProps) {
  const faq = content.faq;
  const set = (patch: Partial<typeof faq>) => update("faq", { ...faq, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="FAQ Section" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Heading"
          value={faq.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("faq.heading")}
          onTagChange={(t) => ht.set("faq.heading", t)}
        />
        <RichTextField label="Description" value={faq.description} onChange={(v) => set({ description: v })} />
        <ImageField
          label="Video Thumbnail"
          value={faq.videoThumbnail}
          onChange={(url) => set({ videoThumbnail: url })}
          altValue={faq.videoThumbnailAlt || ""}
          onAltChange={(videoThumbnailAlt) => set({ videoThumbnailAlt })}
          onSelectAsset={(asset) => set({
            videoThumbnail: asset.url,
            videoThumbnailAlt: asset.suggestedAltText || faq.videoThumbnailAlt || "",
          })}
          folder="backgrounds"
        />
        <div>
          <Label>Video Thumbnail Alt Text</Label>
          <Input value={faq.videoThumbnailAlt || ""} onChange={(e) => set({ videoThumbnailAlt: e.target.value })} placeholder="Describe the thumbnail image" />
        </div>
        <div>
          <Label>Video URL</Label>
          <Input value={faq.videoUrl} onChange={(e) => set({ videoUrl: e.target.value })} />
        </div>
        <ArrayEditor
          items={faq.items}
          onChange={(items) => set({ items })}
          itemLabel="FAQ"
          newItem={() => ({ question: "", answer: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Question</Label>
                <Input value={item.question} onChange={(e) => upd({ ...item, question: e.target.value })} />
              </div>
              <RichTextField label="Answer" value={item.answer} onChange={(v) => upd({ ...item, answer: v })} />
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function ContactSectionEditor({ content, update }: SectionProps) {
  const c = content.contact;
  const set = (patch: Partial<typeof c>) => update("contact", { ...c, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Contact Section" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={c.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("contact.sectionLabel")}
          onTagChange={(t) => ht.set("contact.sectionLabel", t)}
        />
        <div>
          <Label>Subtitle</Label>
          <Input value={c.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
        <RichTextField label="Description" value={c.description} onChange={(v) => set({ description: v })} />
        <ImageField
          label="Section Image"
          value={c.image}
          onChange={(url) => set({ image: url })}
          altValue={c.imageAlt}
          onAltChange={(imageAlt) => set({ imageAlt })}
          onSelectAsset={(asset) => set({
            image: asset.url,
            imageAlt: asset.suggestedAltText || c.imageAlt,
          })}
          folder="team"
        />
        <div>
          <Label>Image Alt Text</Label>
          <Input value={c.imageAlt} onChange={(e) => set({ imageAlt: e.target.value })} placeholder="Describe the image" />
        </div>
        <ImageField
          label="Background Image"
          value={c.backgroundImage || ""}
          onChange={(url) => set({ backgroundImage: url })}
          altValue={c.backgroundImageAlt || ""}
          onAltChange={(backgroundImageAlt) => set({ backgroundImageAlt })}
          onSelectAsset={(asset) => set({
            backgroundImage: asset.url,
            backgroundImageAlt: asset.suggestedAltText || c.backgroundImageAlt || "",
          })}
          folder="backgrounds"
        />
        <div>
          <Label>Background Image Alt Text</Label>
          <Input value={c.backgroundImageAlt || ""} onChange={(e) => set({ backgroundImageAlt: e.target.value })} placeholder="Describe the background image" />
        </div>
        <p className="text-xs text-gray-500 italic">Phone and address are managed in Site Settings &gt; Contact Info</p>
        <div>
          <Label>Form Heading</Label>
          <Input value={c.formHeading} onChange={(e) => set({ formHeading: e.target.value })} />
        </div>
        <div>
          <Label>Availability Text</Label>
          <Input value={c.availabilityText || ""} onChange={(e) => set({ availabilityText: e.target.value })} placeholder="Our intake team is available 24 hours a day, seven days a week" />
        </div>
      </div>
    </Section>
  );
}
