// Type definitions for Practice Areas page content
// Three independent sections: Hero (from Home), Practice Areas Intro (from Home), Values (from About)
// Each section has FULLY INDEPENDENT data - no sharing with Home or About pages

// ========== Section 1: Hero (copied from Home, completely independent)
export interface PracticeAreasHeroContent {
  h1Title: string;
  headline: string;
  highlightedText: string;
  tagline: string;
  buttonText: string;
  phone: string;
  phoneLabel: string;
  backgroundImage?: string;
}

// ========== Section 2: Practice Areas Intro (copied from Home, completely independent)
export interface PracticeAreaItem {
  title: string;
  image: string;
  imageAlt: string;
  link: string;
  learnMoreLink?: string;
  consultationLink?: string;
}

export interface PracticeAreasIntroContent {
  sectionLabel: string;
  heading: string;
  buttonLink: string;
  buttonTextLine1: string;
  buttonTextLine2: string;
}

// ========== Section 3: Values / Practice Areas Intro (copied from About, completely independent)
export interface ValueItemWithIcon {
  id: "excellence" | "integrity" | "compassion" | string;
  iconType?: "excellence" | "integrity" | "compassion";
  title: string;
  description: string;
}

export interface PracticeAreasValuesContent {
  sectionLabel: string;
  valuesTitle: string;
  values: ValueItemWithIcon[];
}

// ========== Complete page structure
export interface PracticeAreasPageContent {
  hero: PracticeAreasHeroContent;
  practiceAreasIntro: PracticeAreasIntroContent;
  practiceAreas: PracticeAreaItem[];
  values: PracticeAreasValuesContent;
  headingTags?: Record<string, string>;
}

// ========== Default content with pre-filled values from Home and About
export const defaultPracticeAreasContent: PracticeAreasPageContent = {
  hero: {
    h1Title: "",
    headline: "",
    highlightedText: "",
    tagline: "",
    buttonText: "Request Free Consultation",
    phone: "",
    phoneLabel: "",
    backgroundImage: "https://atzgmwcxbdnswerpqzzi.supabase.co/storage/v1/object/public/media/library/1779351750724-20d0za.webp",
  },
  practiceAreasIntro: {
    sectionLabel: "",
    heading: "Where We Fight For You",
    buttonLink: "/practice-areas/",
    buttonTextLine1: "SEE ALL AREAS OF PRACTICE",
    buttonTextLine2: "",
  },
  practiceAreas: [
    {
      title: "CAR ACCIDENTS",
      image: "",
      imageAlt: "Car accidents",
      link: "/practice-areas/car-accidents/",
      learnMoreLink: "/practice-areas/car-accidents/",
      consultationLink: "/contact/"
    },
    {
      title: "TRUCK ACCIDENTS",
      image: "",
      imageAlt: "Truck accidents",
      link: "/practice-areas/truck-accidents/",
      learnMoreLink: "/practice-areas/truck-accidents/",
      consultationLink: "/contact/"
    },
    {
      title: "MOTORCYCLE ACCIDENTS",
      image: "",
      imageAlt: "Motorcycle accidents",
      link: "/practice-areas/motorcycle-accidents/",
      learnMoreLink: "/practice-areas/motorcycle-accidents/",
      consultationLink: "/contact/"
    },
    {
      title: "WRONGFUL DEATH",
      image: "",
      imageAlt: "Wrongful death",
      link: "/practice-areas/wrongful-death/",
      learnMoreLink: "/practice-areas/wrongful-death/",
      consultationLink: "/contact/"
    },
    {
      title: "PERSONAL INJURY",
      image: "",
      imageAlt: "Personal injury",
      link: "/practice-areas/personal-injury/",
      learnMoreLink: "/practice-areas/personal-injury/",
      consultationLink: "/contact/"
    },
    {
      title: "SLIP & FALL",
      image: "",
      imageAlt: "Slip and fall",
      link: "/practice-areas/slip-fall/",
      learnMoreLink: "/practice-areas/slip-fall/",
      consultationLink: "/contact/"
    },
    {
      title: "MEDICAL MALPRACTICE",
      image: "",
      imageAlt: "Medical malpractice",
      link: "/practice-areas/medical-malpractice/",
      learnMoreLink: "/practice-areas/medical-malpractice/",
      consultationLink: "/contact/"
    },
    {
      title: "WORKERS COMPENSATION",
      image: "",
      imageAlt: "Workers compensation",
      link: "/practice-areas/workers-compensation/",
      learnMoreLink: "/practice-areas/workers-compensation/",
      consultationLink: "/contact/"
    },
  ],
  values: {
    sectionLabel: "Our Values",
    valuesTitle: "What Guides Our Practice",
    values: [
      {
        id: "excellence",
        iconType: "excellence",
        title: "Excellence",
        description: "We strive for excellence in every case, every motion, and every interaction with our clients.",
      },
      {
        id: "integrity",
        iconType: "integrity",
        title: "Integrity",
        description: "Our commitment to honesty and ethical practice is the foundation of our firm's reputation.",
      },
      {
        id: "compassion",
        iconType: "compassion",
        title: "Compassion",
        description: "We understand that behind every case is a person with real challenges and real needs.",
      },
    ],
  },
};
