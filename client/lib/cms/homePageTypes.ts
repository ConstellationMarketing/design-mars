// Type definitions for structured homepage content
// Each section maps directly to a static component's data needs

export interface HeroContent {
  h1Title: string; // H1 title text (all caps, ~20px) between headline and phone button
  headline: string;
  highlightedText: string;
  tagline: string; // Gold tagline text below headline
  buttonText: string; // CTA button text
  phone: string;
  phoneLabel: string;
}

export interface PartnerLogo {
  src: string;
  alt: string;
}

export interface AboutFeature {
  number: string;
  title: string;
  description: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutContent {
  sectionLabel: string;
  heading: string;
  description: string;
  phone: string;
  phoneLabel: string;
  contactLabel: string;
  contactText: string;
  attorneyImage: string;
  attorneyImageAlt: string;
  features: AboutFeature[];
  stats: AboutStat[];
}

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

export interface AwardsContent {
  sectionLabel: string;
  heading: string;
  description: string;
  logos: Array<{ src: string; alt: string }>;
}

export interface TestimonialItem {
  text: string;
  author: string;
  ratingImage: string;
  ratingImageAlt?: string;
}

export interface TestimonialsContent {
  sectionLabel: string;
  heading: string;
  backgroundImage: string;
  backgroundImageAlt?: string;
  items: TestimonialItem[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  steps: ProcessStep[];
}

export interface GoogleReviewItem {
  text: string;
  author: string;
  ratingImage: string;
  ratingImageAlt?: string;
}

export interface GoogleReviewsContent {
  sectionLabel: string;
  heading: string;
  description: string;
  reviews: GoogleReviewItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heading: string;
  description: string;
  videoThumbnail: string;
  videoThumbnailAlt?: string;
  videoUrl: string;
  items: FaqItem[];
}

export interface CaseStatItem {
  label: string;
  amount: string;
}

export interface StatsContent {
  totalAmount: string;
  totalLabel: string;
  cases: CaseStatItem[];
}

export interface AboutFeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface HomeAboutContent {
  heading: string;
  experienceTitle: string;
  yearsNumber: string;
  yearsLabel: string;
  experienceDescription: string;
  features: AboutFeatureItem[];
}

export interface ContactContent {
  sectionLabel: string;
  heading: string;
  description: string;
  phone: string;
  phoneLabel: string;
  address: string;
  formHeading: string;
  availabilityText: string;
  image: string;
  imageAlt: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

// Complete homepage content structure
export interface HomePageContent {
  hero: HeroContent;
  partnerLogos: PartnerLogo[];
  stats: StatsContent;
  homeAbout: HomeAboutContent;
  about: AboutContent;
  practiceAreasIntro: PracticeAreasIntroContent;
  practiceAreas: PracticeAreaItem[];
  awards: AwardsContent;
  testimonials: TestimonialsContent;
  process: ProcessContent;
  googleReviews: GoogleReviewsContent;
  faq: FaqContent;
  contact: ContactContent;
  /** Maps heading keys (e.g. "about.heading") to HTML tag names (e.g. "h2") */
  headingTags?: Record<string, string>;
}

// Default content - empty defaults, content comes exclusively from the CMS
export const defaultHomeContent: HomePageContent = {
  hero: {
    h1Title: "",
    headline: "",
    highlightedText: "",
    tagline: "",
    buttonText: "Request Free Consultation",
    phone: "",
    phoneLabel: "",
  },
  partnerLogos: [],
  stats: {
    totalAmount: "$1,662,903,076",
    totalLabel: "WON FOR CLIENTS",
    cases: [
      { label: "BUGHUARE CAR ACCIDENT", amount: "$1 MILLION" },
      { label: "CAR ACCIDENT", amount: "$1 MILLION" },
      { label: "CAR ACCIDENT", amount: "$1 MILLION" },
      { label: "TRUCK ACCIDENT", amount: "$3.8 MILLION" },
    ],
  },
  homeAbout: {
    heading: "When It Matters Most, We're On Your Side.",
    experienceTitle: "OVER",
    yearsNumber: "150",
    yearsLabel: "YEARS OF EXPERIENCE",
    experienceDescription: "Constellation Law is a top rated law firm with 150 years of collective experience. Our partners worked for the largest firm in Atlanta, and now leverage their backgrounds and legal knowledge to stand up to the corporations they once defended",
    features: [
      {
        title: "AMAZING TEAM",
        description: "Our award-winning legal team brings over 150 years of collective experience to every case, ensuring you receive the skilled representation you deserve.",
      },
      {
        title: "YOUR NEEDS COME FIRST",
        description: "We prioritize your recovery and peace of mind. Our client-focused approach means you get personalized attention and dedicated advocacy throughout your case.",
      },
      {
        title: "WE COME TO YOU 24/7",
        description: "Injured and can't travel? We come to you. Our attorneys are available 24/7 for consultations at your hospital, home, or wherever is most convenient.",
      },
      {
        title: "MULTILINGUAL STAFF",
        description: "Language should never be a barrier to justice. Our multilingual team ensures clear communication in Spanish, Portuguese, and other languages.",
      },
      {
        title: "NO FEES UNTIL WE WIN",
        description: "You don't pay attorney fees unless we win your case. This contingency fee structure means we're invested in your success and you can focus on healing without financial stress.",
      },
    ],
  },
  about: {
    sectionLabel: "",
    heading: "",
    description: "",
    phone: "",
    phoneLabel: "",
    contactLabel: "",
    contactText: "",
    attorneyImage: "",
    attorneyImageAlt: "",
    features: [],
    stats: [],
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
  awards: {
    sectionLabel: "",
    heading: "",
    description: "",
    logos: [],
  },
  testimonials: {
    sectionLabel: "",
    heading: "",
    backgroundImage: "",
    backgroundImageAlt: "",
    items: [],
  },
  process: {
    sectionLabel: "",
    headingLine1: "",
    headingLine2: "",
    steps: [],
  },
  googleReviews: {
    sectionLabel: "",
    heading: "",
    description: "",
    reviews: [],
  },
  faq: {
    heading: "",
    description: "",
    videoThumbnail: "",
    videoThumbnailAlt: "",
    videoUrl: "",
    items: [],
  },
  contact: {
    sectionLabel: "",
    heading: "",
    description: "",
    phone: "",
    phoneLabel: "",
    address: "",
    formHeading: "",
    availabilityText: "",
    image: "",
    imageAlt: "",
    backgroundImage: "",
    backgroundImageAlt: "",
  },
};
