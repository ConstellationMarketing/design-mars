import type { ContactPageContent } from "@site/lib/cms/contactPageTypes";
import { Section, ArrayEditor, GlobalSectionInfo, RichTextField, HeadingField, Input, Label, Textarea, ImageField } from "./EditorShared";

interface ContactEditorProps {
  content: ContactPageContent;
  onChange: (c: ContactPageContent) => void;
}

export default function ContactEditor({ content, onChange }: ContactEditorProps) {
  const update = <K extends keyof ContactPageContent>(key: K, value: ContactPageContent[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <HeroSection content={content} update={update} />
      <ContactMethodsSection content={content} update={update} />
      <FormSection content={content} update={update} />
      <OfficeHoursInfoSection content={content} update={update} />
      <GlobalSectionInfo sectionTitle="Call to Action" managedIn="About Us" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
type Updater = <K extends keyof ContactPageContent>(key: K, value: ContactPageContent[K]) => void;
type SectionProps = { content: ContactPageContent; update: Updater };

function useHeadingTag(content: ContactPageContent, update: Updater) {
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

  return (
    <Section title="Hero Section">
      <div className="grid gap-4">
        <div>
          <Label>Highlighted Text</Label>
          <Input value={hero.highlightedText} onChange={(e) => set({ highlightedText: e.target.value })} placeholder="e.g., CONTACT US" />
        </div>
        <div>
          <Label>Headline</Label>
          <Input value={hero.headline} onChange={(e) => set({ headline: e.target.value })} placeholder="e.g., GET IN TOUCH" />
        </div>
        <div>
          <Label>H1 Title</Label>
          <Input value={hero.h1Title} onChange={(e) => set({ h1Title: e.target.value })} placeholder="e.g., – LET'S TALK" />
        </div>
        <div>
          <Label>Button Text</Label>
          <Input value={hero.buttonText} onChange={(e) => set({ buttonText: e.target.value })} placeholder="e.g., CALL NOW" />
        </div>
        <div>
          <Label>Background Image</Label>
          <Input value={hero.backgroundImage || ""} onChange={(e) => set({ backgroundImage: e.target.value })} placeholder="Image URL" />
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function ContactMethodsSection({ content, update }: SectionProps) {
  const cm = content.contactMethods;
  const set = (patch: Partial<typeof cm>) => update("contactMethods", { ...cm, ...patch });

  return (
    <Section title="Contact Methods" defaultOpen={false}>
      <div className="grid gap-4 mb-6">
        <div>
          <Label>Section Heading</Label>
          <Input value={cm.heading || ""} onChange={(e) => set({ heading: e.target.value })} placeholder="e.g., Get In Touch Today" />
        </div>
      </div>
      <ArrayEditor
        items={cm.methods}
        onChange={(items) => set({ methods: items })}
        itemLabel="Method"
        newItem={() => ({ icon: "Phone", title: "", detail: "", subDetail: "" })}
        renderItem={(item, _, upd) => (
          <div className="grid gap-3">
            <div>
              <ImageField
                label="Icon"
                value={item.icon}
                onChange={(v) => upd({ ...item, icon: v })}
                folder="contact-icons"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Detail</Label>
                <Input value={item.detail} onChange={(e) => upd({ ...item, detail: e.target.value })} />
              </div>
              <div>
                <Label>Sub-Detail</Label>
                <Input value={item.subDetail} onChange={(e) => upd({ ...item, subDetail: e.target.value })} />
              </div>
            </div>
          </div>
        )}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function FormSection({ content, update }: SectionProps) {
  const form = content.form;
  const set = (patch: Partial<typeof form>) => update("form", { ...form, ...patch });

  return (
    <Section title="Contact Form" defaultOpen={false}>
      <div className="grid gap-4">
        <div className="border-t pt-6 mt-6">
          <p className="text-sm font-semibold mb-4">Contact Form Section</p>
          <div className="grid gap-4">
            <div>
              <Label>Form Title</Label>
              <Input value={form.formTitle} onChange={(e) => set({ formTitle: e.target.value })} placeholder="e.g., Free Case Evaluation" />
            </div>
            <div>
              <Label>Benefits Title</Label>
              <Input value={form.benefitsTitle} onChange={(e) => set({ benefitsTitle: e.target.value })} placeholder="e.g., Why Contact Constellation Law?" />
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-2">Benefits</p>
              <ArrayEditor
                items={form.benefits}
                onChange={(items) => set({ benefits: items })}
                itemLabel="Benefit"
                newItem={() => ({ id: Date.now().toString(), icon: '', title: '', description: '' })}
                renderItem={(item, _, upd) => (
                  <div className="grid gap-3">
                    <div>
                      <ImageField
                        label="Icon"
                        value={item.icon}
                        onChange={(v) => upd({ ...item, icon: v })}
                        folder="benefit-icons"
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} placeholder="e.g., Top-Rated Legal Team" />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={item.description} onChange={(e) => upd({ ...item, description: e.target.value })} rows={2} placeholder="Benefit description" />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function OfficeHoursInfoSection({ content, update }: SectionProps) {
  const oh = content.officeHours;
  const oi = content.officeInfo;
  const setOh = (patch: Partial<typeof oh>) => update("officeHours", { ...oh, ...patch });
  const setOi = (patch: Partial<typeof oi>) => update("officeInfo", { ...oi, ...patch });

  return (
    <Section title="Office Hours & Information" defaultOpen={false}>
      <div className="grid gap-6">
        {/* Office Hours Left Column */}
        <div className="border-b pb-6">
          <p className="text-sm font-semibold mb-4">Left Column: Office Hours</p>
          <div className="grid gap-4">
            <div>
              <Label>Section Title</Label>
              <Input value={oh.sectionTitle} onChange={(e) => setOh({ sectionTitle: e.target.value })} placeholder="e.g., Office Hours & Information" />
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-2">Hours</p>
              <ArrayEditor
                items={oh.hours}
                onChange={(items) => setOh({ hours: items })}
                itemLabel="Hour Entry"
                newItem={() => ({ day: "", time: "", highlight: false })}
                renderItem={(item, _, upd) => (
                  <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Day/Label</Label>
                        <Input value={item.day} onChange={(e) => upd({ ...item, day: e.target.value })} placeholder="e.g., Monday - Friday" />
                      </div>
                      <div>
                        <Label>Time</Label>
                        <Input value={item.time} onChange={(e) => upd({ ...item, time: e.target.value })} placeholder="e.g., 8:00 AM - 6:00 PM" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={item.highlight}
                        onChange={(e) => upd({ ...item, highlight: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label className="text-sm">Highlight in gold</label>
                    </div>
                  </div>
                )}
              />
            </div>
            <div>
              <Label>"What to Expect" Heading</Label>
              <Input value={oh.expectationsTitle} onChange={(e) => setOh({ expectationsTitle: e.target.value })} placeholder="e.g., What to Expect" />
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-2">Expectations List</p>
              <ArrayEditor
                items={oh.expectations}
                onChange={(items) => setOh({ expectations: items })}
                itemLabel="Expectation"
                newItem={() => ""}
                renderItem={(item, _, upd) => (
                  <Input value={item} onChange={(e) => upd(e.target.value)} placeholder="e.g., Free, no-obligation consultation" />
                )}
              />
            </div>
          </div>
        </div>

        {/* Office Info Right Column */}
        <div>
          <p className="text-sm font-semibold mb-4">Right Column: Office Information</p>
          <div className="grid gap-4">
            <div>
              <Label>Section Title</Label>
              <Input value={oi.sectionTitle} onChange={(e) => setOi({ sectionTitle: e.target.value })} placeholder="e.g., Find Our Office" />
            </div>
            <div>
              <Label>Firm Name</Label>
              <Input value={oi.firmName} onChange={(e) => setOi({ firmName: e.target.value })} placeholder="e.g., Constellation Law" />
            </div>
            <div>
              <Label>Address Street</Label>
              <Input value={oi.address} onChange={(e) => setOi({ address: e.target.value })} placeholder="e.g., 84 Peachtree Street" />
            </div>
            <div>
              <Label>City & Zip</Label>
              <Input value={oi.city} onChange={(e) => setOi({ city: e.target.value })} placeholder="e.g., Atlanta, GA 30303" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={oi.phone} onChange={(e) => setOi({ phone: e.target.value })} placeholder="e.g., 404-555-5555" />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={oi.email} onChange={(e) => setOi({ email: e.target.value })} placeholder="e.g., info@constellationlaw.com" />
            </div>
            <div>
              <Label>Note</Label>
              <Textarea value={oi.note} onChange={(e) => setOi({ note: e.target.value })} rows={3} placeholder="Convenient parking available. MARTA accessible. We can also visit you at the hospital or your home if needed." />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
