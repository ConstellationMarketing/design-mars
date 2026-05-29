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
export interface PracticeAreasValueItem {
  id: "excellence" | "integrity" | "compassion" | string;
  badgeText: string;
  title: string;
  description: string;
}

export interface PracticeAreasValuesContent {
  sectionLabel: string;
  valuesTitle: string;
  values: PracticeAreasValueItem[];
}

// ========== Section 4: Practice Items (alternating layout)
export interface PracticeItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  learnMoreUrl: string;
  getHelpUrl: string;
}

// ========== Complete page structure
export interface PracticeAreasPageContent {
  hero: PracticeAreasHeroContent;
  practiceAreasIntro: PracticeAreasIntroContent;
  practiceAreas: PracticeAreaItem[];
  values: PracticeAreasValuesContent;
  practiceItems: PracticeItem[];
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
        badgeText: "150+",
        title: "Cases Won",
        description: "We have successfully handled over 150 cases with outstanding results.",
      },
      {
        id: "integrity",
        badgeText: "$0",
        title: "Upfront Fees",
        description: "We work on a contingency basis - you only pay if we win your case.",
      },
      {
        id: "compassion",
        badgeText: "24/7",
        title: "Availability",
        description: "Our attorneys are available around the clock for consultations and emergencies.",
      },
    ],
  },
  practiceItems: [
    {
      id: "1",
      icon: "",
      title: "Car Accidents",
      description: "When you've been injured in a car accident, we fight to get you the compensation you deserve.",
      bullets: ["Free consultation", "No fees until we win", "Maximum compensation", "24/7 availability"],
      image: "",
      learnMoreUrl: "/practice-areas/car-accidents/",
      getHelpUrl: "/contact/"
    },
    {
      id: "2",
      icon: "",
      title: "Truck Accidents",
      description: "Commercial truck accidents often result in severe injuries. We have the expertise to take on trucking companies.",
      bullets: ["Complex liability cases", "Corporate defendants", "Severe injury expertise", "Proven track record"],
      image: "",
      learnMoreUrl: "/practice-areas/truck-accidents/",
      getHelpUrl: "/contact/"
    },
    {
      id: "3",
      icon: "",
      title: "Motorcycle Accidents",
      description: "Motorcyclists face unique challenges on the road. We fight for full compensation for medical bills and lost wages.",
      bullets: ["Bias-free representation", "Specialized knowledge", "Comprehensive damages", "Experienced advocacy"],
      image: "",
      learnMoreUrl: "/practice-areas/motorcycle-accidents/",
      getHelpUrl: "/contact/"
    }
  ],
};
