// Type definitions for structured Contact page content
// Each section maps directly to a static component's data needs

export interface ContactHeroContent {
  h1Title: string; // H1 title text (all caps, ~20px)
  headline: string; // White uppercase text
  highlightedText: string; // Large white text
  tagline: string; // Gold tagline text
  buttonText: string; // CTA button text
  phone: string; // Phone number for button
  phoneLabel: string; // Phone label
  backgroundImage?: string; // Hero background image URL
}

export interface ContactMethodItem {
  icon: string; // Lucide icon name
  title: string; // "Phone", "Email", "Office"
  detail: string; // Primary detail (phone number, email, address line 1)
  subDetail: string; // Secondary detail (availability, response time, address line 2)
}

export interface ContactMethodsContent {
  methods: ContactMethodItem[];
  heading?: string; // Section heading "Get In Touch Today"
}

export interface ContactFormBenefit {
  id: string;
  icon: string; // Image URL from media library
  title: string;
  description: string;
}

export interface ContactFormContent {
  heading: string; // "Send Us a Message"
  subtext: string; // Description below heading
  formTitle: string; // "Free Case Evaluation"
  benefitsTitle: string; // "Why Contact Constellation Law?"
  benefits: ContactFormBenefit[];
}

export interface OfficeHoursItem {
  day: string;
  hours: string;
}

export interface OfficeHoursContent {
  heading: string; // "Office Hours"
  items: OfficeHoursItem[];
  note: string; // Additional note
}

export interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  sectionLabel: string; // "– The Process"
  heading: string; // "What to Expect When You Contact Us"
  subtitle: string; // Subtitle text
  steps: ProcessStepItem[];
}

export interface VisitOfficeContent {
  heading: string; // "Visit Our Office"
  subtext: string; // Description text
  mapEmbedUrl: string; // Google Maps embed URL
}

export interface CTAContent {
  heading: string; // "Ready to Discuss Your Case?"
  description: string; // Subtitle text
  primaryButton: {
    label: string; // "Call Us Now"
    phone: string; // Phone number
  };
  secondaryButton: {
    label: string; // "Schedule Consultation"
    sublabel: string; // "Free Case Review"
    link: string; // Link URL
  };
}

// Complete Contact page content structure
export interface ContactPageContent {
  hero: ContactHeroContent;
  contactMethods: ContactMethodsContent;
  form: ContactFormContent;
  officeHours: OfficeHoursContent;
  process: ProcessContent;
  visitOffice: VisitOfficeContent;
  cta: CTAContent;
  /** Maps heading keys (e.g. "form.heading") to HTML tag names (e.g. "h2") */
  headingTags?: Record<string, string>;
}

// Default content - empty defaults, content comes exclusively from the CMS
export const defaultContactContent: ContactPageContent = {
  hero: {
    h1Title: "",
    headline: "",
    highlightedText: "",
    tagline: "",
    buttonText: "",
    phone: "",
    phoneLabel: "",
    backgroundImage: "",
  },
  contactMethods: {
    methods: [],
    heading: "Get In Touch Today",
  },
  form: {
    heading: "",
    subtext: "",
    formTitle: "Free Case Evaluation",
    benefitsTitle: "Why Contact Constellation Law?",
    benefits: [
      { id: '1', icon: '', title: 'Top-Rated Legal Team', description: 'Our attorneys have been recognized for excellence and have a proven track record of success in personal injury cases.' },
      { id: '2', icon: '', title: '24/7 Availability', description: "Accidents don't happen on a schedule. We're available around the clock when you need it most." },
      { id: '3', icon: '', title: 'No Fees Until We Win', description: "You don't pay attorney fees unless we successfully recover compensation. Your consultation is completely free." },
      { id: '4', icon: '', title: 'Personal Attention', description: "Every client receives personalized attention from our experienced attorneys. You're not just a case number to us." }
    ],
  },
  officeHours: {
    heading: "",
    items: [],
    note: "",
  },
  process: {
    sectionLabel: "",
    heading: "",
    subtitle: "",
    steps: [],
  },
  visitOffice: {
    heading: "",
    subtext: "",
    mapEmbedUrl: "",
  },
  cta: {
    heading: "",
    description: "",
    primaryButton: {
      label: "",
      phone: "",
    },
    secondaryButton: {
      label: "",
      sublabel: "",
      link: "",
    },
  },
};
