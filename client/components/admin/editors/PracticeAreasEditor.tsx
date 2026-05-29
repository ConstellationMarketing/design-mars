import type { PracticeAreasPageContent, ValueItemWithIcon } from "@site/lib/cms/practiceAreasPageTypes";
import { Section, ArrayEditor, ImageField, RichTextField, HeadingField, Input, Label, Textarea } from "./EditorShared";

interface PracticeAreasEditorProps {
  content: PracticeAreasPageContent;
  onChange: (c: PracticeAreasPageContent) => void;
}

export default function PracticeAreasEditor({ content, onChange }: PracticeAreasEditorProps) {
  const update = <K extends keyof PracticeAreasPageContent>(key: K, value: PracticeAreasPageContent[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <HeroSection content={content} update={update} />
      <PracticeAreasIntroSection content={content} update={update} />
      <PracticeAreasGridSection content={content} update={update} />
      <ValuesSection content={content} update={update} />
      <PracticeItemsSection content={content} update={update} />
    </div>
  );
}

/* ========== Types ========== */
type Updater = <K extends keyof PracticeAreasPageContent>(key: K, value: PracticeAreasPageContent[K]) => void;
type SectionProps = { content: PracticeAreasPageContent; update: Updater };

function useHeadingTag(content: PracticeAreasPageContent, update: Updater) {
  return {
    get: (key: string) => content.headingTags?.[key] ?? "h2",
    set: (key: string, tag: string) =>
      update("headingTags", { ...content.headingTags, [key]: tag }),
  };
}

/* ========== Section 1: Hero Section (from Home) ========== */
function HeroSection({ content, update }: SectionProps) {
  const hero = content.hero;
  const set = (patch: Partial<typeof hero>) => update("hero", { ...hero, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Hero Section">
      <div className="grid gap-4">
        <p className="text-xs text-gray-600 mb-2">Fully independent from Home page</p>
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
          folder="practice-areas"
        />
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
      </div>
    </Section>
  );
}

/* ========== Section 2: Practice Areas Intro ========== */
function PracticeAreasIntroSection({ content, update }: SectionProps) {
  const intro = content.practiceAreasIntro;
  const set = (patch: Partial<typeof intro>) => update("practiceAreasIntro", { ...intro, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Practice Areas Intro" defaultOpen={false}>
      <div className="grid gap-4">
        <p className="text-xs text-gray-600 mb-2">Fully independent from Home page</p>
        <HeadingField
          label="Heading"
          value={intro.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("practiceAreasIntro.heading")}
          onTagChange={(t) => ht.set("practiceAreasIntro.heading", t)}
        />
        <div>
          <Label>Button Link</Label>
          <Input value={intro.buttonLink} onChange={(e) => set({ buttonLink: e.target.value })} />
        </div>
        <div>
          <Label>Button Text Line 1</Label>
          <Input value={intro.buttonTextLine1} onChange={(e) => set({ buttonTextLine1: e.target.value })} />
        </div>
        <div>
          <Label>Button Text Line 2</Label>
          <Input value={intro.buttonTextLine2} onChange={(e) => set({ buttonTextLine2: e.target.value })} />
        </div>
      </div>
    </Section>
  );
}

/* ========== Section 3: Practice Areas Grid ========== */
function PracticeAreasGridSection({ content, update }: SectionProps) {
  const areas = content.practiceAreas;
  const set = (patch: Partial<typeof areas>) => update("practiceAreas", patch as typeof areas);
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Practice Areas Grid" defaultOpen={false}>
      <div className="grid gap-4">
        <p className="text-xs text-gray-600 mb-2">Fully independent from Home page</p>
        <ArrayEditor
          items={areas}
          onChange={(items) => set(items as any)}
          itemLabel="Practice Area"
          newItem={() => ({ title: "", image: "", imageAlt: "", link: "/practice-areas/", learnMoreLink: "", consultationLink: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
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
                <Label>Link</Label>
                <Input value={item.link} onChange={(e) => upd({ ...item, link: e.target.value })} />
              </div>
              <div>
                <Label>Learn More Link (optional)</Label>
                <Input value={item.learnMoreLink || ""} onChange={(e) => upd({ ...item, learnMoreLink: e.target.value })} />
              </div>
              <div>
                <Label>Consultation Link (optional)</Label>
                <Input value={item.consultationLink || ""} onChange={(e) => upd({ ...item, consultationLink: e.target.value })} />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ========== Section 4: Values Section (from About) ========== */
function ValuesSection({ content, update }: SectionProps) {
  const values = content.values;
  const set = (patch: Partial<typeof values>) => update("values", { ...values, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Values Section (Our Values)" defaultOpen={false}>
      <div className="grid gap-4">
        <p className="text-xs text-gray-600 mb-2">Fully independent from About page</p>
        <HeadingField
          label="Values Title"
          value={values.valuesTitle}
          onChange={(v) => set({ valuesTitle: v })}
          tag={ht.get("values.valuesTitle")}
          onTagChange={(t) => ht.set("values.valuesTitle", t)}
        />
        <ArrayEditor
          items={values.values}
          onChange={(items) => set({ values: items })}
          itemLabel="Value"
          newItem={() => ({ id: "excellence" as const, badgeText: "", title: "", description: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Badge Text</Label>
                <Input value={item.badgeText || ""} onChange={(e) => upd({ ...item, badgeText: e.target.value })} placeholder="e.g., 150+, $0, 24/7" />
              </div>
              <div>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
              </div>
              <RichTextField
                label="Description"
                value={item.description}
                onChange={(v) => upd({ ...item, description: v })}
              />
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ========== Section 5: Practice Items ========== */
function PracticeItemsSection({ content, update }: SectionProps) {
  const items = content.practiceItems;
  const set = (patch: Partial<typeof items>) => update("practiceItems", patch as typeof items);

  return (
    <Section title="Practice Items" defaultOpen={true}>
      <div className="grid gap-4">
        <p className="text-xs text-gray-600 mb-2">Fully independent from Home page - alternating text/image layout</p>
        <ArrayEditor
          items={items}
          onChange={(newItems) => set(newItems as any)}
          itemLabel="Practice Item"
          newItem={() => ({ id: Math.random().toString(36).substring(7), icon: "", title: "", description: "", bullets: ["", "", "", ""], image: "", learnMoreUrl: "", getHelpUrl: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <ImageField
                label="Icon URL"
                value={item.icon}
                onChange={(url) => upd({ ...item, icon: url })}
                folder="practice-areas"
              />
              <div>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
              </div>
              <RichTextField
                label="Description"
                value={item.description}
                onChange={(v) => upd({ ...item, description: v })}
              />
              <div>
                <Label>Bullet 1</Label>
                <Input value={item.bullets[0] || ""} onChange={(e) => upd({ ...item, bullets: [e.target.value, item.bullets[1] || "", item.bullets[2] || "", item.bullets[3] || ""] })} />
              </div>
              <div>
                <Label>Bullet 2</Label>
                <Input value={item.bullets[1] || ""} onChange={(e) => upd({ ...item, bullets: [item.bullets[0] || "", e.target.value, item.bullets[2] || "", item.bullets[3] || ""] })} />
              </div>
              <div>
                <Label>Bullet 3</Label>
                <Input value={item.bullets[2] || ""} onChange={(e) => upd({ ...item, bullets: [item.bullets[0] || "", item.bullets[1] || "", e.target.value, item.bullets[3] || ""] })} />
              </div>
              <div>
                <Label>Bullet 4</Label>
                <Input value={item.bullets[3] || ""} onChange={(e) => upd({ ...item, bullets: [item.bullets[0] || "", item.bullets[1] || "", item.bullets[2] || "", e.target.value] })} />
              </div>
              <ImageField
                label="Image"
                value={item.image}
                onChange={(url) => upd({ ...item, image: url })}
                folder="practice-areas"
              />
              <div>
                <Label>Learn More URL</Label>
                <Input value={item.learnMoreUrl} onChange={(e) => upd({ ...item, learnMoreUrl: e.target.value })} />
              </div>
              <div>
                <Label>Get Help Now URL</Label>
                <Input value={item.getHelpUrl} onChange={(e) => upd({ ...item, getHelpUrl: e.target.value })} />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}
