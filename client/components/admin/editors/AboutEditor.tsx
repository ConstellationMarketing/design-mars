import type { AboutPageContent } from "@site/lib/cms/aboutPageTypes";
import { Section, ArrayEditor, ImageField, RichTextField, HeadingField, Input, Label, Textarea, GlobalSectionInfo } from "./EditorShared";

interface AboutEditorProps {
  content: AboutPageContent;
  onChange: (c: AboutPageContent) => void;
}

export default function AboutEditor({ content, onChange }: AboutEditorProps) {
  const update = <K extends keyof AboutPageContent>(key: K, value: AboutPageContent[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <HeroSection content={content} update={update} />
      <AboutSectionEditor content={content} update={update} />
      <PracticeAreasIntroSection content={content} update={update} />
      <ValuesSection content={content} update={update} />
      <AwardsSection content={content} update={update} />
      <GlobalSectionInfo sectionTitle="Call to Action" managedIn="About Us" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
type Updater = <K extends keyof AboutPageContent>(key: K, value: AboutPageContent[K]) => void;
type SectionProps = { content: AboutPageContent; update: Updater };

function useHeadingTag(content: AboutPageContent, update: Updater) {
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
        <div>
          <Label>CTA Button Text</Label>
          <Input value={hero.buttonText} onChange={(e) => set({ buttonText: e.target.value })} placeholder="Request Free Consultation" />
          <p className="text-xs text-gray-500 mt-1">The text displayed on the hero CTA button</p>
        </div>
        <div>
          <Label>Hero Background Image URL</Label>
          <Input value={hero.backgroundImage || ""} onChange={(e) => set({ backgroundImage: e.target.value })} placeholder="https://..." />
          <p className="text-xs text-gray-500 mt-1">Full URL to the hero background image</p>
        </div>
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
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

        <h4 className="font-medium mt-4">Features</h4>
        <RichTextField
          label="Features Description"
          value={homeAbout.featuresDescription}
          onChange={(v) => set({ featuresDescription: v })}
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
          label="Section Label"
          value={intro.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("practiceAreasIntro.sectionLabel")}
          onTagChange={(t) => ht.set("practiceAreasIntro.sectionLabel", t)}
        />
        <div>
          <Label>Values Title</Label>
          <Input value={intro.valuesTitle} onChange={(e) => set({ valuesTitle: e.target.value })} placeholder="Our Values" />
        </div>

        <h4 className="font-medium mt-4">Values (3 items)</h4>
        <ArrayEditor
          items={intro.values}
          onChange={(items) => set({ values: items })}
          itemLabel="Value"
          newItem={() => ({ id: "excellence" as const, title: "", description: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Icon Type</Label>
                <select
                  value={item.id}
                  onChange={(e) => upd({ ...item, id: e.target.value as "excellence" | "integrity" | "compassion" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
                >
                  <option value="excellence">Excellence (Trophy)</option>
                  <option value="integrity">Integrity (Crown)</option>
                  <option value="compassion">Compassion (People)</option>
                </select>
              </div>
              <div>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} placeholder="e.g. Excellence" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={item.description} onChange={(e) => upd({ ...item, description: e.target.value })} placeholder="Description text..." rows={3} />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function ValuesSection({ content, update }: SectionProps) {
  const values = content.values;
  const set = (patch: Partial<typeof values>) => update("values", { ...values, ...patch });
  const ht = useHeadingTag(content, update);

  const iconOptions = [
    { label: "Trophy", value: "Trophy" },
    { label: "Crown", value: "Crown" },
    { label: "Users", value: "Users" },
    { label: "Heart", value: "Heart" },
    { label: "Star", value: "Star" },
    { label: "Shield", value: "Shield" },
    { label: "Zap", value: "Zap" },
    { label: "Award", value: "Award" },
  ];

  return (
    <Section title="Our Values" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Section Heading"
          value={values.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("values.sectionLabel")}
          onTagChange={(t) => ht.set("values.sectionLabel", t)}
        />
        <div>
          <Label>Title</Label>
          <Input value={values.heading} onChange={(e) => set({ heading: e.target.value })} placeholder="Our Values" />
        </div>
        <div>
          <Label>Background Color</Label>
          <Input type="color" value={values.backgroundColor || "#f5f5f5"} onChange={(e) => set({ backgroundColor: e.target.value })} />
        </div>
        <ImageField
          label="Background Image (Optional)"
          value={values.backgroundImage || ""}
          onChange={(url) => set({ backgroundImage: url })}
          altValue={values.backgroundImageAlt || ""}
          onAltChange={(backgroundImageAlt) => set({ backgroundImageAlt })}
          onSelectAsset={(asset) => set({
            backgroundImage: asset.url,
            backgroundImageAlt: asset.suggestedAltText || values.backgroundImageAlt || "",
          })}
          folder="backgrounds"
        />

        <h4 className="font-medium mt-4">Values (3 items)</h4>
        <ArrayEditor
          items={values.items}
          onChange={(items) => set({ items })}
          itemLabel="Value"
          newItem={() => ({ icon: "Trophy", title: "", description: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Icon</Label>
                <select
                  value={item.icon}
                  onChange={(e) => upd({ ...item, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} placeholder="e.g. Excellence" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={item.description} onChange={(e) => upd({ ...item, description: e.target.value })} placeholder="Description text..." rows={3} />
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
