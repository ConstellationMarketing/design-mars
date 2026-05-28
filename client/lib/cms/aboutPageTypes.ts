// Type definitions for structured About page content
// IDENTICAL TO HomePageContent but completely separate - no inheritance
// This ensures About and Home page editing remain 100% independent

export interface HeroContent {
  h1Title: string; // H1 title text (all caps, ~20px) between headline and phone button
  headline: string;
  highlightedText: string;
  tagline: string; // Gold tagline text below headline
  buttonText: string; // CTA button text
  phone: string;
  phoneLabel: string;
  backgroundImage?: string; // Hero background image URL
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
  logoImage: string;
  logoImageAlt: string;
  teamImage: string;
  teamImageAlt: string;
}

export interface TestimonialItem {
  text: string;
  author: string;
  clientType: string;
  badgeType: string; // "google", "facebook", "yelp", etc.
  badgeServiceName: string; // e.g., "Google"
  badgeLogo?: string; // Service logo (e.g., Google logo)
  badgeLogoAlt?: string;
  badgeStarCount: number; // e.g., 5
  badgeRating: string; // e.g., "5.0"
}

export interface TestimonialsContent {
  sectionLabel: string;
  heading: string;
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
  featuresDescription: string;
}

export interface VideoItem {
  title: string;
  videoUrl: string;
  thumbnailImage?: string;
  thumbnailImageAlt?: string;
}

export interface VideoTestimonialsContent {
  sectionLabel: string;
  heading: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  videos: VideoItem[];
}

export interface AttorneyItem {
  name: string;
  title: string;
  yearsExperience: string;
  photo: string;
  photoAlt: string;
  link?: string;
}

export interface AttorneysContent {
  sectionLabel: string;
  heading: string;
  buttonText: string;
  buttonLink: string;
  attorneys: AttorneyItem[];
}

export interface BlogSectionContent {
  sectionLabel: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
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

// Complete About page content structure - IDENTICAL TO HomePageContent
export interface AboutPageContent {
  hero: HeroContent;
  partnerLogos: PartnerLogo[];
  stats: StatsContent;
  homeAbout: HomeAboutContent;
  about: AboutContent;
  practiceAreasIntro: PracticeAreasIntroContent;
  practiceAreas: PracticeAreaItem[];
  awards: AwardsContent;
  testimonials: TestimonialsContent;
  videoTestimonials: VideoTestimonialsContent;
  attorneys: AttorneysContent;
  blog: BlogSectionContent;
  process: ProcessContent;
  googleReviews: GoogleReviewsContent;
  faq: FaqContent;
  contact: ContactContent;
  /** Maps heading keys (e.g. "about.heading") to HTML tag names (e.g. "h2") */
  headingTags?: Record<string, string>;
}

// Default content for About page - all default text says "About Us — [section name]"
export const defaultAboutContent: AboutPageContent = {
  hero: {
    h1Title: "About Us — H1 Title",
    headline: "About Us — Headline",
    highlightedText: "About Us — Highlighted Text",
    tagline: "About Us — Tagline",
    buttonText: "Request Free Consultation",
    phone: "",
    phoneLabel: "",
    backgroundImage: "https://atzgmwcxbdnswerpqzzi.supabase.co/storage/v1/object/public/media/library/1779351750724-20d0za.webp",
  },
  partnerLogos: [],
  stats: {
    totalAmount: "About Us — Total Amount",
    totalLabel: "About Us — Total Label",
    cases: [
      { label: "About Us — Case 1", amount: "About Us — Amount 1" },
      { label: "About Us — Case 2", amount: "About Us — Amount 2" },
      { label: "About Us — Case 3", amount: "About Us — Amount 3" },
      { label: "About Us — Case 4", amount: "About Us — Amount 4" },
    ],
  },
  homeAbout: {
    heading: "About Us — When It Matters Most, We're On Your Side.",
    experienceTitle: "About Us — OVER",
    yearsNumber: "About Us — 150",
    yearsLabel: "About Us — YEARS OF EXPERIENCE",
    experienceDescription: "About Us — Constellation Law is a top rated law firm with 150 years of collective experience. Our partners worked for the largest firm in Atlanta, and now leverage their backgrounds and legal knowledge to stand up to the corporations they once defended",
    featuresDescription: "About Us — Features Description",
  },
  about: {
    sectionLabel: "About Us — Section Label",
    heading: "About Us — Heading",
    description: "About Us — Description",
    phone: "",
    phoneLabel: "",
    contactLabel: "About Us — Contact Label",
    contactText: "About Us — Contact Text",
    attorneyImage: "",
    attorneyImageAlt: "",
    features: [],
    stats: [],
  },
  practiceAreasIntro: {
    sectionLabel: "About Us — Section Label",
    heading: "About Us — Where We Fight For You",
    buttonLink: "/practice-areas/",
    buttonTextLine1: "About Us — SEE ALL AREAS OF PRACTICE",
    buttonTextLine2: "",
  },
  practiceAreas: [
    {
      title: "About Us — CAR ACCIDENTS",
      image: "",
      imageAlt: "Car accidents",
      link: "/practice-areas/car-accidents/",
      learnMoreLink: "/practice-areas/car-accidents/",
      consultationLink: "/contact/"
    },
    {
      title: "About Us — TRUCK ACCIDENTS",
      image: "",
      imageAlt: "Truck accidents",
      link: "/practice-areas/truck-accidents/",
      learnMoreLink: "/practice-areas/truck-accidents/",
      consultationLink: "/contact/"
    },
    {
      title: "About Us — MOTORCYCLE ACCIDENTS",
      image: "",
      imageAlt: "Motorcycle accidents",
      link: "/practice-areas/motorcycle-accidents/",
      learnMoreLink: "/practice-areas/motorcycle-accidents/",
      consultationLink: "/contact/"
    },
    {
      title: "About Us — WRONGFUL DEATH",
      image: "",
      imageAlt: "Wrongful death",
      link: "/practice-areas/wrongful-death/",
      learnMoreLink: "/practice-areas/wrongful-death/",
      consultationLink: "/contact/"
    },
    {
      title: "About Us — PERSONAL INJURY",
      image: "",
      imageAlt: "Personal injury",
      link: "/practice-areas/personal-injury/",
      learnMoreLink: "/practice-areas/personal-injury/",
      consultationLink: "/contact/"
    },
    {
      title: "About Us — SLIP & FALL",
      image: "",
      imageAlt: "Slip and fall",
      link: "/practice-areas/slip-fall/",
      learnMoreLink: "/practice-areas/slip-fall/",
      consultationLink: "/contact/"
    },
    {
      title: "About Us — MEDICAL MALPRACTICE",
      image: "",
      imageAlt: "Medical malpractice",
      link: "/practice-areas/medical-malpractice/",
      learnMoreLink: "/practice-areas/medical-malpractice/",
      consultationLink: "/contact/"
    },
    {
      title: "About Us — WORKERS COMPENSATION",
      image: "",
      imageAlt: "Workers compensation",
      link: "/practice-areas/workers-compensation/",
      learnMoreLink: "/practice-areas/workers-compensation/",
      consultationLink: "/contact/"
    },
  ],
  awards: {
    sectionLabel: "About Us — Section Label",
    heading: "About Us — Press & Recognition",
    description: "About Us — Description",
    logoImage: "",
    logoImageAlt: "",
    teamImage: "",
    teamImageAlt: "",
  },
  testimonials: {
    sectionLabel: "About Us — Section Label",
    heading: "About Us — Committed To Excellence",
    items: [],
  },
  videoTestimonials: {
    sectionLabel: "About Us — Section Label",
    heading: "About Us — Hear What Our Clients Have to Say",
    backgroundColor: "#cfab57",
    backgroundImage: "",
    backgroundImageAlt: "",
    videos: [],
  },
  attorneys: {
    sectionLabel: "About Us — Section Label",
    heading: "About Us — Meet the Attorneys",
    buttonText: "About Us — SEE ALL ATTORNEYS",
    buttonLink: "/attorneys/",
    attorneys: [],
  },
  blog: {
    sectionLabel: "About Us — Section Label",
    heading: "About Us — News & Blog",
    description: "About Us — Stay informed with our latest legal insights, case updates, and industry news.",
    buttonText: "About Us — MORE NEWS",
    buttonLink: "/blog/",
    backgroundColor: "#f5f5f5",
    backgroundImage: "",
    backgroundImageAlt: "",
  },
  process: {
    sectionLabel: "About Us — Section Label",
    headingLine1: "About Us — Heading Line 1",
    headingLine2: "About Us — Heading Line 2",
    steps: [],
  },
  googleReviews: {
    sectionLabel: "About Us — Section Label",
    heading: "About Us — Heading",
    description: "About Us — Description",
    reviews: [],
  },
  faq: {
    heading: "About Us — FAQ Heading",
    description: "About Us — FAQ Description",
    videoThumbnail: "",
    videoThumbnailAlt: "",
    videoUrl: "",
    items: [],
  },
  contact: {
    sectionLabel: "About Us — Section Label",
    heading: "About Us — Contact Heading",
    description: "About Us — Contact Description",
    phone: "",
    phoneLabel: "",
    address: "",
    formHeading: "About Us — Form Heading",
    availabilityText: "About Us — Availability Text",
    image: "",
    imageAlt: "",
    backgroundImage: "",
    backgroundImageAlt: "",
  },
};
